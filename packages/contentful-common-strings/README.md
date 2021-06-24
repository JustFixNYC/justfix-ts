This module provides tooling for retrieving and displaying common rich-text content
shared by JustFix.nyc projects.

Each common string has an alphanumeric id and a value. The value is a localizable
rich text value. For example, the original motiviation for this package is the common
string with id `covidMoratoriumBanner`, which has a value containing the rich text
to show users about the current state of the COVID Moratorium, localized in both
English and Spanish.

This package contains tooling to retrieve all entries from a pre-configured Contentful space that have been given a particular [tag](https://www.contentful.com/help/tags/). Each of these entries is expected to have a short text field called `id` and a localized rich text field called `value`.

These entries can be retrieved in one of two ways:

1. A command-line program called `contentful-common-strings`. This can be useful for static sites that want to have the entries rendered at build time.

2. Via the [`fetchContentfulCommonStrings`](src/fetch-common-strings.ts) function, which can be run from node or the browser.

Functionality provided by the [`ContentfulCommonStrings`](src/index.ts) class makes it convenient to retrieve a common string's rich text document representation by its id. The front-end can then render them using a package like [`@contentful/rich-text-react-renderer`](https://www.npmjs.com/package/@contentful/rich-text-react-renderer).

For an example of this package in use, see the [manual test][] code.

To use the manual test, you can run `yarn watch` and then visit http://localhost:8080/.

[manual test]: test-manual/contentful-common-strings-manual-test.tsx
