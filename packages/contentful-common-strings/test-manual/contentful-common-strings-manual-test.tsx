import React from "react";
import ReactDOM from "react-dom";
import { getHTMLElement } from "@justfixnyc/util";
import {
  ContentfulCommonStringsEntry,
  fetchContentfulCommonStrings,
} from "../src";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const container = getHTMLElement("div", "#root");

const CommonStringsForId: React.FC<{
  id: string;
  entry: ContentfulCommonStringsEntry;
}> = ({ id, entry }) => (
  <>
    {Object.keys(entry).map((locale) => {
      const doc = entry[locale];

      if (!doc) return null;

      return (
        <div key={locale}>
          <h2>
            Common string <code>{id}</code> ({locale})
          </h2>
          <div style={{ paddingLeft: "2em" }}>
            {documentToReactComponents(doc)}
          </div>
        </div>
      );
    })}
  </>
);

async function main() {
  const map = await fetchContentfulCommonStrings();

  const el = ReactDOM.render(
    <>
      <p>
        Below are all the Contentful common strings for all available locales.
      </p>
      {Object.keys(map).map((id) => (
        <CommonStringsForId id={id} entry={map[id]} key={id} />
      ))}
    </>,
    container
  );
}

main();
