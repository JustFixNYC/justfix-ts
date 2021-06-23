import { fetchContentfulCommonStrings } from "./fetch-common-strings.js";

export async function main() {
  const map = await fetchContentfulCommonStrings();
  console.log(JSON.stringify(map, null, 2));
}
