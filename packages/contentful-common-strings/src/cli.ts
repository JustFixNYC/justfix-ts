import fs from "fs";
import yargs from "yargs";
import {
  fetchContentfulCommonStrings,
  DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG as CONFIG_DEFAULTS,
} from "./fetch-common-strings.js";

export function main() {
  yargs
    .scriptName("contentful-common-strings")
    .usage("$0 <cmd> [args]")
    .command(
      "fetch",
      "Fetch Contentful common strings and write them to a JSON file.",
      (yargs) => {
        yargs.option("o", {
          alias: "outfile",
          default: "--",
          describe: "The file to write the JSON to, or '--' to use stdout",
          type: "string",
        });

        yargs.option("origin", {
          default: CONFIG_DEFAULTS.origin,
          describe: "Contentful API origin",
          type: "string",
        });

        yargs.option("tag", {
          default: CONFIG_DEFAULTS.tag,
          describe: "Only entries with this Contentful tag will be retrieved",
          type: "string",
        });

        yargs.option("spaceId", {
          default: CONFIG_DEFAULTS.spaceId,
          describe: "Contentful space ID",
          type: "string",
        });

        yargs.option("accessToken", {
          default: CONFIG_DEFAULTS.accessToken,
          describe: "Contentful access token",
          type: "string",
        });
      },
      async (argv: {
        outfile: string;
        origin: string;
        tag: string;
        spaceId: string;
        accessToken: string;
      }) => {
        const { origin, tag, spaceId, accessToken } = argv;
        const map = await fetchContentfulCommonStrings({
          origin,
          tag,
          spaceId,
          accessToken,
        });
        const output = JSON.stringify(map, null, 2) + "\n";
        if (argv.outfile === "--") {
          process.stdout.write(output);
        } else {
          fs.writeFileSync(argv.outfile, output);
          console.log(`Wrote ${argv.outfile}.`);
        }
      }
    )
    .help()
    .demandCommand().argv;
}
