import {
  Document as ContentfulDocument,
  BLOCKS,
} from "@contentful/rich-text-types";

export const TEST_CONTENTFUL_DOC: ContentfulDocument = {
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
