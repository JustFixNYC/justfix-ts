import { Document as ContentfulDocument } from "@contentful/rich-text-types";

export type ContentfulCommonStringsMapping = {
  [key: string]: { [locale: string]: ContentfulDocument | undefined };
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
