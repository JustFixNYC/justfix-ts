import fs from "fs";
import yargs from "yargs";
import {
  fetchContentfulCommonStrings,
  DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG as CONFIG_DEFAULTS,
} from "./fetch-common-strings.js";
import { ContentfulCommonStringsMapping } from "./index.js";

/** Filename indicating stdout rather than an actual file. */
const STDOUT = "--";

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
          default: STDOUT,
          describe: `The file to write the JSON to, or '${STDOUT}' to use stdout`,
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

        yargs.option("dev", {
          default: false,
          describe:
            "Enable offline developer mode (network errors will not crash this program)",
          type: "boolean",
        });
      },
      async (argv: {
        outfile: string;
        origin: string;
        tag: string;
        spaceId: string;
        accessToken: string;
        dev: boolean;
      }) => {
        const { origin, tag, spaceId, accessToken, dev, outfile } = argv;
        let map: ContentfulCommonStringsMapping = {};
        try {
          map = await fetchContentfulCommonStrings({
            origin,
            tag,
            spaceId,
            accessToken,
          });
        } catch (e) {
          if (dev) {
            process.stderr.write(`${e}\nOffline development mode enabled, `);
            if (outfile !== STDOUT && fs.existsSync(outfile)) {
              process.stderr.write(`keeping existing ${outfile}.\n`);
              return;
            } else {
              process.stderr.write(`outputting empty JSON.\n`);
            }
          } else {
            throw e;
          }
        }
        const output = JSON.stringify(map, null, 2) + "\n";
        if (outfile === STDOUT) {
          process.stdout.write(output);
        } else {
          fs.writeFileSync(outfile, output);
          console.log(`Wrote ${outfile}.`);
        }
      }
    )
    .help()
    .demandCommand().argv;
}
