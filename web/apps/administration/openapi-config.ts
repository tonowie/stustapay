import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../../../api/administration.json",
  apiFile: "./src/api/generated/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./src/api/generated/api.ts",
  exportName: "api",
  tag: true,
  hooks: true,
};

export default config;