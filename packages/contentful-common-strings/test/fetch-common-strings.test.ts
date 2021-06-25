import {
  ContentfulCommonStringsConfig,
  DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG,
  getContentfulEntriesURL,
  toCommonStringsMap,
} from "../src/fetch-common-strings";
import { TEST_CONTENTFUL_DOC } from "./util";

const RAW_ENTRIES_RESPONSE = {
  sys: { type: "Array" },
  total: 1,
  skip: 0,
  limit: 100,
  items: [
    {
      metadata: {
        tags: [{ sys: { type: "Link", linkType: "Tag", id: "common" } }],
      },
      sys: {
        space: { sys: { type: "Link", linkType: "Space", id: "markmr2gi204" } },
        id: "6JHYqWl0h2QWvObWQfNH4m",
        type: "Entry",
        createdAt: "2021-06-16T11:01:57.811Z",
        updatedAt: "2021-06-16T12:44:37.768Z",
        environment: {
          sys: { id: "master", type: "Link", linkType: "Environment" },
        },
        revision: 6,
        contentType: {
          sys: { type: "Link", linkType: "ContentType", id: "string" },
        },
      },
      fields: {
        id: { en: "covidMoratoriumBanner" },
        value: {
          en: TEST_CONTENTFUL_DOC,
        },
      },
    },
  ],
};

describe("toCommonStringsMap", () => {
  it("works", () => {
    expect(toCommonStringsMap(RAW_ENTRIES_RESPONSE)).toEqual({
      covidMoratoriumBanner: { en: TEST_CONTENTFUL_DOC },
    });
  });
});

describe("getContentfulEntriesURL", () => {
  const cfg: ContentfulCommonStringsConfig = {
    ...DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG,
    tag: "mytag",
    spaceId: "myspace",
    accessToken: "mytoken",
  };

  it("Includes tag by default", () => {
    expect(getContentfulEntriesURL(cfg)).toEqual(
      "https://cdn.contentful.com/spaces/myspace/entries?locale=*&metadata.tags.sys.id%5Bin%5D=mytag&access_token=mytoken"
    );
  });

  it("Doesn't include tag if it's falsy", () => {
    expect(getContentfulEntriesURL({ ...cfg, tag: "" })).toEqual(
      "https://cdn.contentful.com/spaces/myspace/entries?locale=*&access_token=mytoken"
    );
  });
});
