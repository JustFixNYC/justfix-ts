import {
  Document as ContentfulDocument,
  BLOCKS,
} from "@contentful/rich-text-types";
import { ContentfulCommonStrings } from "../src";

const doc: ContentfulDocument = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        {
          nodeType: "text",
          value: "Hello!",
          marks: [],
          data: {},
        },
      ],
      data: {},
    },
  ],
};

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
