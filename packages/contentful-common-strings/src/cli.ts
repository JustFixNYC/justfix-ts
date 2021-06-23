import fs from "fs";
import yargs from "yargs";
import { fetchContentfulCommonStrings } from "./fetch-common-strings.js";

export function main() {
  yargs
    .scriptName("contentful-common-strings")
    .usage("$0 <cmd> [args]")
    .command(
      "fetch [outfile]",
      "Fetch Contentful common strings and write them to a JSON file.",
      (yargs) => {},
      async (argv) => {
        const map = await fetchContentfulCommonStrings();
        const outfile =
          (argv["outfile"] as string | undefined) ||
          "contentful-common-strings.json";
        fs.writeFileSync(outfile, JSON.stringify(map, null, 2));
        console.log(`Wrote ${outfile}.`);
      }
    )
    .help().argv;
}
