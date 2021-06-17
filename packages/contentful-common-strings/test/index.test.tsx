import { Document as ContentfulDocument } from "@contentful/rich-text-types";
import { ContentfulCommonStrings } from "../src";

// This *is* a ContentfulDocument but the typing
// is stupid and doesn't recognize it as such, so we'll force it.
const doc: ContentfulDocument = {
  nodeType: "document",
  data: {},
  content: [
    {
      nodeType: "paragraph",
      content: [
        {
          nodeType: "text",
          value: "Hello!",
          marks: [],
          data: {},
        },
      ],
    },
  ],
} as any;

describe("ContentfulCommonStrings ", () => {
  const ccs = new ContentfulCommonStrings({
    boop: {
      en: doc,
    },
  });

  it("returns localized strings that exist", () => {
    expect(ccs.get("boop", "en")).toBe(doc);
  });

  it("returns null when a localization doesn't exist", () => {
    expect(ccs.get("boop", "es")).toBe(null);
  });

  it("returns null when a string doesn't exist", () => {
    expect(ccs.get("blarg", "en")).toBe(null);
  });
});
