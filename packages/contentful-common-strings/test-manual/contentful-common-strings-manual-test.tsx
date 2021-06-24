import React from "react";
import ReactDOM from "react-dom";
import { getHTMLElement } from "@justfixnyc/util";
import {
  ContentfulCommonStringsConfig,
  ContentfulCommonStringsEntry,
  DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG,
  fetchContentfulCommonStrings,
} from "../src";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const CONFIG_KEYS: (keyof ContentfulCommonStringsConfig)[] = Object.keys(
  DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG
) as any[];

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
          <h3>
            <code>{id}</code> ({locale})
          </h3>
          <div style={{ paddingLeft: "2em" }}>
            {documentToReactComponents(doc)}
          </div>
        </div>
      );
    })}
  </>
);

const ConfigForm: React.FC<{ config: ContentfulCommonStringsConfig }> = ({
  config,
}) => (
  <form method="get">
    <dl>
      {CONFIG_KEYS.map((key) => (
        <React.Fragment key={key}>
          <dt>
            <label htmlFor={key}>
              <code>{key}</code>
            </label>
          </dt>
          <dd>
            <input
              name={key}
              id={key}
              type="text"
              style={{ fontFamily: "monospace", width: "25em" }}
              defaultValue={config[key]}
            />
          </dd>
        </React.Fragment>
      ))}
    </dl>
    <button type="submit">Submit</button>
  </form>
);

function getConfigFromQuerystring() {
  const config = DEFAULT_CONTENTFUL_COMMON_STRINGS_CONFIG;
  const search = new URLSearchParams(window.location.search);

  for (let key of CONFIG_KEYS) {
    const value = search.get(key);
    if (value) {
      config[key] = value;
    }
  }

  return config;
}

async function main() {
  const config = getConfigFromQuerystring();
  const map = await fetchContentfulCommonStrings();

  ReactDOM.render(
    <>
      <h2>Configuration</h2>
      <ConfigForm config={config} />
      <h2>Common strings</h2>
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
