import { ContentfulCommonStrings } from "../src";
import { TEST_CONTENTFUL_DOC } from "./util";

describe("ContentfulCommonStrings ", () => {
  const ccs = new ContentfulCommonStrings({
    boop: {
      en: TEST_CONTENTFUL_DOC,
    },
  });

  it("returns localized strings that exist", () => {
    expect(ccs.get("boop", "en")).toBe(TEST_CONTENTFUL_DOC);
  });

  it("returns null when a localization doesn't exist", () => {
    expect(ccs.get("boop", "es")).toBe(null);
  });

  it("returns null when a string doesn't exist", () => {
    expect(ccs.get("blarg", "en")).toBe(null);
  });
});
