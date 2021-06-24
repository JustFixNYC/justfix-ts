import { Document as ContentfulDocument } from "@contentful/rich-text-types";
export {
  ContentfulCommonStringsConfig,
  DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG,
  fetchContentfulCommonStrings,
} from "./fetch-common-strings";

/**
 * A Contentful common string's value, available in various locales.
 */
export type ContentfulCommonStringsEntry = {
  [locale: string]: ContentfulDocument | undefined;
};

/**
 * A mapping from ids to values for Contentful common strings.
 */
export type ContentfulCommonStringsMapping = {
  [id: string]: ContentfulCommonStringsEntry;
};

/**
 * A convenience class that makes it easy to access Contentful common strings.
 */
export class ContentfulCommonStrings {
  constructor(private readonly mapping: ContentfulCommonStringsMapping) {}

  /**
   * Return the Contentful common string with the given id in the given locale,
   * or `null` if it doesn't exist.
   */
  get(id: string, locale: string): ContentfulDocument | null {
    const locales = this.mapping[id];
    const result = locales && locales[locale];
    if (result === undefined) return null;
    return result;
  }
}
