import argparse
import csv
import json
import logging
import os.path

from stustapay.core.config import Config
from stustapay.core.database import create_db_pool
from stustapay.core.subcommand import SubCommand
from stustapay.core.util import BaseModel


class TagSecretSchema(BaseModel):
    key0: str
    key1: str
    description: str


class PopulateCli(SubCommand):
    def __init__(self, args, config: Config, **rest):
        del rest  # unused
        self.args = args
        self.config = config
        self.logger = logging.getLogger(__name__)

    @staticmethod
    def argparse_register(subparser: argparse.ArgumentParser):
        subparsers = subparser.add_subparsers(dest="action")
        tag_secret_parser = subparsers.add_parser(
            "load-tag-secret", formatter_class=argparse.ArgumentDefaultsHelpFormatter
        )
        tag_secret_parser.add_argument(
            "-f",
            "--secret-file",
            type=str,
            required=True,
            help=f"path to .json file with the following structure:\n\n"
            f"{json.dumps(TagSecretSchema.schema_json(), indent=2)}\n\n"
            f"Whitespaces used as visual alignment in the hex representation of the keys will be stripped",
        )
        tag_secret_parser.add_argument(
            "--dry-run",
            action="store_true",
            help="perform a dry run, i.e. do not write anything to the database",
        )

        tag_parser = subparsers.add_parser("load-tags", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
        tag_parser.add_argument(
            "-f",
            "--csv-file",
            type=str,
            required=True,
            help="Name of .csv file with tag configuration, expects 4 columns: [serial number,ID,PIN code,UID]",
        )
        tag_parser.add_argument(
            "--restriction-type", type=str, help="tag restriction type, if omitted will assume tags have no restriction"
        )
        tag_parser.add_argument("--tag-secret-id", type=int, required=True, help="id of tag secret in database")
        tag_parser.add_argument(
            "--dry-run", action="store_true", help="perform a dry run, i.e. do not write anything to the database"
        )

    async def load_tag_secret(self):
        if not os.path.exists(self.args.secret_file) or not os.path.isfile(self.args.secret_file):
            self.logger.error(f"Secret file: {self.args.secret_file} does not exist")
            return

        secret = TagSecretSchema.parse_file(self.args.secret_file)

        self.logger.info(f"Creating secret '{secret.description}'")

        db_pool = await create_db_pool(cfg=self.config.database)
        key0 = secret.key0.replace(" ", "")
        key1 = secret.key1.replace(" ", "")

        secret_id = None
        if not self.args.dry_run:
            secret_id = await db_pool.fetchval(
                "insert into user_tag_secret (key0, key1, description) "
                "values (decode($1, 'hex'), decode($2, 'hex'), $3) returning id",
                key0,
                key1,
                secret.description,
            )

        self.logger.info(f"Created secret '{secret.description}. ID {secret_id = }")

    async def load_tags(self):
        if not os.path.exists(self.args.csv_file) or not os.path.isfile(self.args.csv_file):
            self.logger.error(f"CSV file: {self.args.csv_file} does not exist")
            return

        db_pool = await create_db_pool(cfg=self.config.database)

        restriction_rows = await db_pool.fetch("select * from restriction_type")
        restrictions = [row["name"] for row in restriction_rows]
        if self.args.restriction_type is not None and self.args.restriction_type not in restrictions:
            self.logger.error(f"Restriction type '{self.args.restriction_type}' does not exist")
            return

        with open(self.args.csv_file, "r") as csvfile:
            csv_reader = csv.reader(csvfile, delimiter=",")
            next(csv_reader, None)
            async with db_pool.acquire() as conn:
                async with conn.transaction():
                    for row in csv_reader:
                        if any(x == "" for x in row):
                            self.logger.warning(f"Skipping row in csv: {row}")
                            continue

                        self.logger.debug(f"loading tag data into db: {row}")

                        if not self.args.dry_run:
                            # row is: [serial number,ID,PIN code,UID]
                            await conn.execute(
                                "insert into user_tag(uid, pin, serial, restriction, secret) "
                                "values ($1, $2, $3, $4, $5)",
                                int(row[3], 16),  # UID
                                row[2],  # PIN
                                row[1],  # ID
                                self.args.restriction_type,
                                self.args.tag_secret_id,
                            )

    async def run(self):
        if self.args.action == "load-tags":
            return await self.load_tags()
        if self.args.action == "load-tag-secret":
            return await self.load_tag_secret()
        else:
            self.logger.error(f"Unknown action: {self.args.action}")