# StustaPay

See https://stustapay.de website for info about the project

## Initial configuration

Following steps describe the process of setting up your system instance.

### `.env` configuration

Configuration specific to an environment is performed in `.env` file

- `COMPOSE_PROJECT_NAME` - the identification of the project
- `DOMAIN_NAME` - set the system domain
- `APP_SECRET_TOKEN` - application security token. Can be generated using command `pwgen -s 64 1`

### HTTPS configuration

Acquire certificates for `admin.event.domain`, `customer.event.domain`, `terminal.event.domain`,  (`event.domain` being what you configured as `DOMAIN_NAME` in `.env`) and place the certificates and key files to the `ssl` directory with names `admin.crt`, `admin.key`, `customer.crt`, `customer.key`, `terminal.crt`, `terminal.key`.

For testing you can generate self-signed CA and certificates as follows (cd to the ssl directory before executing the commands). 
1. edit the `*.ext` files to use your domain
2. edit the `gen.sh` to use your domain
3. run `gen.sh` to generate certificates

### Event branding

TODO: define event name, theme and references (web site).

## Run the system

Change to directory `compose` and run `docker compose up --build`. Applications will start up and you can access web interfaces as follows
- Customer portal - http://admin.event.domain:8080
- Administration portal - http://customer.event.domain:8080
- Terminal server for app - http://terminal.event.domain:8080

### Create admin user

Before system can be used you need to manually create admin user. The process is as follows

1. configure and start up the system as described earlier
2. connect to one of the API nodes `docker exec -ti <apicontainername> bash`
3. create the admin by executing following command `python3 -m stustapay -c /etc/stustapay/config.yaml admin add-user --node-id 0`

This admin user should be used only to create new events and assign admins to these events.

### Generate secret keys

Secret keys are needed for NFCs and without those you can not activate terminals. There are 2 steps - first you need to generate 2 secret keys, then add them to an event.

Generate keys
1. use one of api containers `docker exec -ti stustapay-terminalserver-api-1 bash`
2. generate keys `python3 -m stustapay -c /etc/stustapay/config.yaml token generate-key`
3. Note down 2 keays 

Set the keys to an event
1. log-in to administration on https://admin.event.domain
2. go to event, select "User Tags" and open tab "Upload secret"
3. enter both keys - you will need to remove spaces added as separators by generator
4. hit "Add"

## General workflow

- customers always interact with the android app. the app is operated by workers on the event (entry, sales, ...)
- customer buys ticket via cash or card, gets a nft-tag in return (card or wristband)
- money can be topped up on the wristband by cash or card at top-up stations or online
- money can be payed out at a top-up stations as cash, to empty your leftover credits
- money can be payed out after the event to a bank account when people register their IBAN on the customerportal.
- money can be spent at food booths, bars, fun rides, ...
- people can be granted vouchers (as a reward for their helper shift, or as a make-good due to whatever problem)
- vouchers are automatically used when people buy stuff, since products can have voucher values.

## Configure the event

TODO

## Android app build

Following steps prepare build environment, build the app and then copy the build outputs to local directory. Commands assume you are in the `compose` directory

```bash
# prepare build environment
docker build -t stustaappbuild -f Dockerfile.app ..
# run the app build
docker run -t --name stustaappbuild stustaappbuild
# copy build outputs to directory appbuild
mkdir stustaappbuild
docker cp stustaappbuild:/usr/src/app/app/build/outputs/apk stustaappbuild
# remove the build container
docker rm stustaappbuild
```
