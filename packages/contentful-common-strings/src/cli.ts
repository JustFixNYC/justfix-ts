import { fetchContentfulCommonStrings } from "./fetch-common-strings.js";

async function main() {
  const map = await fetchContentfulCommonStrings();
  console.log(JSON.stringify(map, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
