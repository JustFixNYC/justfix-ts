import { Document as ContentfulDocument } from "@contentful/rich-text-types";
export {
  ContentfulCommonStringsConfig,
  DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG,
  fetchContentfulCommonStrings,
} from "./fetch-common-strings";

export type ContentfulCommonStringsEntry = {
  [locale: string]: ContentfulDocument | undefined;
};

export type ContentfulCommonStringsMapping = {
  [key: string]: ContentfulCommonStringsEntry;
};

export class ContentfulCommonStrings {
  constructor(private readonly mapping: ContentfulCommonStringsMapping) {}

  get(key: string, locale: string): ContentfulDocument | null {
    const locales = this.mapping[key];
    const result = locales && locales[locale];
    if (result === undefined) return null;
    return result;
  }
}
