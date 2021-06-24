import React from "react";
import ReactDOM from "react-dom";
import { getHTMLElement } from "@justfixnyc/util";
import { fetchContentfulCommonStrings } from "../src";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const container = getHTMLElement("div", "#root");

async function main() {
  const map = await fetchContentfulCommonStrings();

  const keys = Object.keys(map);

  const el = ReactDOM.render(
    <div>
      {keys.map((key) => {
        const entry = map[key];
        const locales = Object.keys(entry);

        return (
          <React.Fragment key={key}>
            {locales.map((locale) => {
              const doc = entry[locale];

              if (!doc) return null;

              return (
                <div key={locale}>
                  <h2>
                    Common string <code>{key}</code> ({locale})
                  </h2>
                  <div style={{ paddingLeft: "2em" }}>
                    {documentToReactComponents(doc)}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>,
    container
  );
}

main();
