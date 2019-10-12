import { GeoSearchRequester } from "../geosearch-requester";

const inputEl = document.getElementsByTagName('input')[0];
const resultsEl = document.getElementsByTagName('ol')[0];
const logEl = document.getElementsByTagName('pre')[0];

function log(msg: string, level: 'info'|'error' = 'info') {
  const item = document.createElement('div');
  item.className = level;
  item.textContent = msg;
  logEl.appendChild(item);
}

function changeSearchRequest() {
  const {value} = inputEl;
  gsr.changeSearchRequest(value);
}

const gsr = new GeoSearchRequester({
  onAbort(searchText) {
    log(`A search request for "${searchText}" was aborted.`);
  },
  onError(e) {
    log(`Network error: ${e}`, 'error');
    console.log(e);
  },
  onResults(results) {
    resultsEl.textContent = "";
    for (let {properties: props} of results.features) {
      const li = document.createElement('li');
      li.textContent = `${props.name}, ${props.borough} (BBL ${props.pad_bbl})`;
      resultsEl.appendChild(li);
    }
  }
});

inputEl.onkeyup = changeSearchRequest;

// If we're on a browser like Firefox that caches form fields on page
// reloads, this will automatically start searching for the current
// field value.
changeSearchRequest();
