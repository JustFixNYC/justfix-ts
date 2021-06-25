import { ContentfulCommonStringsMapping } from ".";
import fetch from "cross-fetch";

/**
 * Configuration for fetching common strings from the Contentful API.
 */
export type ContentfulCommonStringsConfig = {
  /** The origin of the API. */
  origin: string;

  /** The Contentful tag to filter, if any. */
  tag?: string;

  /** The Contentful space ID to access. */
  spaceId: string;

  /** The Contentful access token to use. */
  accessToken: string;
};

/**
 * Sensible default configuration for JustFix projects. While
 * embedding the access token may appear to be a security hazard,
 * it's not, as the tokens provide _read-only_ access, and we
 * only publish public information in our Contentful spaces.
 */
export const DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG: ContentfulCommonStringsConfig = {
  origin: "https://cdn.contentful.com",
  tag: "common",
  spaceId: "markmr2gi204",
  accessToken: "Fli_OMdKgUFw6tEX3uv6HqvptuG6A6jn9bZVPlHZj8E",
};

export function toCommonStringsMap(raw: any): ContentfulCommonStringsMapping {
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

export function getContentfulEntriesURL(
  options?: Partial<ContentfulCommonStringsConfig>
): string {
  const config = { ...DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG, ...options };
  const search = new URLSearchParams();
  search.append("locale", "*");
  if (config.tag) {
    search.append("metadata.tags.sys.id[in]", config.tag);
  }
  search.append("access_token", config.accessToken);
  return `${config.origin}/spaces/${
    config.spaceId
  }/entries?${search.toString()}`;
}

/**
 * Fetch Contentful common strings over HTTPS using the given optional
 * configuration overrides.
 *
 * This function can be used from node or the browser.
 *
 * @see {@link DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG} for details about
 * the configuration defaults.
 */
export async function fetchContentfulCommonStrings(
  options?: Partial<ContentfulCommonStringsConfig>
): Promise<ContentfulCommonStringsMapping> {
  const res = await fetch(getContentfulEntriesURL(options));
  if (!res.ok) {
    throw new Error(`Contentful API returned HTTP ${res.status}`);
  }

  return toCommonStringsMap(await res.json());
}
