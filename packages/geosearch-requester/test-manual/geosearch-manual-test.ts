import { GeoSearchRequester } from "../src";

import { getHTMLElement } from "@justfixnyc/util";

const inputEl = getHTMLElement("input", "#input");
const resultsEl = getHTMLElement("ol", "#results");
const logEl = getHTMLElement("pre", "#log");

function log(msg: string, level: "info" | "error" = "info") {
  const item = document.createElement("div");
  item.className = level;
  item.textContent = msg;
  logEl.appendChild(item);
}

function changeSearchRequest() {
  const { value } = inputEl;
  if (!gsr.changeSearchRequest(value)) {
    resultsEl.textContent = "";
  }
}

const gsr = new GeoSearchRequester({
  onAbort(searchText) {
    log(`A search request for "${searchText}" was aborted.`);
  },
  onError(e) {
    log(`Network error: ${e}`, "error");
    console.log(e);
  },
  onResults(results) {
    resultsEl.textContent = "";
    for (let { properties: props } of results.features) {
      const li = document.createElement("li");
      li.textContent = `${props.name}, ${props.borough} (BBL ${props.pad_bbl})`;
      resultsEl.appendChild(li);
    }
  },
});

inputEl.onkeyup = changeSearchRequest;

// If we're on a browser like Firefox that caches form fields on page
// reloads, this will automatically start searching for the current
// field value.
changeSearchRequest();
