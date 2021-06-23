import { ContentfulCommonStringsMapping } from ".";
import fetch from "cross-fetch";

type ContentfulCommonStringsConfig = {
  origin: string;
  tag: string;
  spaceId: string;
  accessToken: string;
};

const CONFIG_DEFAULTS: ContentfulCommonStringsConfig = {
  origin: "https://cdn.contentful.com",
  tag: "common",
  spaceId: "markmr2gi204",
  accessToken: "Fli_OMdKgUFw6tEX3uv6HqvptuG6A6jn9bZVPlHZj8E",
};

function toCommonStringsMap(raw: any): ContentfulCommonStringsMapping {
  const result: ContentfulCommonStringsMapping = {};

  for (let item of raw.items) {
    const fields = item.fields;
    const key = fields.id && fields.id.en;
    const value = fields.value;
    if (key && value) {
      result[key] = value;
    }
  }

  return result;
}

function getContentfulEntriesURL(
  options?: Partial<ContentfulCommonStringsConfig>
): string {
  const config = { ...CONFIG_DEFAULTS, ...options };
  const search = new URLSearchParams();
  search.append("locale", "*");
  search.append("metadata.tags.sys.id[in]", config.tag);
  search.append("access_token", config.accessToken);
  return `${config.origin}/spaces/${
    config.spaceId
  }/entries?${search.toString()}`;
}

export async function fetchContentfulCommonStrings(
  options?: Partial<ContentfulCommonStringsConfig>
): Promise<ContentfulCommonStringsMapping> {
  const res = await fetch(getContentfulEntriesURL(options));
  if (!res.ok) {
    throw new Error(`Contentful API returned HTTP ${res.status}`);
  }

  return toCommonStringsMap(await res.json());
}
