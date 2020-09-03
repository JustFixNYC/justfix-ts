import { GeoSearchRequester, GeoSearchRequesterOptions } from "./index";

function makeOpts(opts?: Partial<GeoSearchRequesterOptions>): GeoSearchRequesterOptions {
  return {
    fetch: jest.fn(),
    onError: jest.fn(),
    onResults: jest.fn(),
    ...opts
  };
}

describe("GeoSearchRequester", () => {
  it("throws an error when fetch implementation doesn't exist", () => {
    expect(() => new GeoSearchRequester(makeOpts({fetch: undefined})))
      .toThrow(/A fetch implementation was not passed to GeoSearchRequester, and one does not exist in the global scope/i);
  });
  it("allows for custom GeoAutocomplete urls to be passed in", () => {
    var r = new GeoSearchRequester(makeOpts({customGeoAutocompleteUrl: "https://www.boop.com/autocomplete"}));
    expect(r.searchQueryToURL("Boopy Boop")).toBe("https://www.boop.com/autocomplete?text=Boopy%20Boop");
  });
  it("uses the standard GeoAutocomplete url when no custom one is defined", () => {
    var r = new GeoSearchRequester(makeOpts());
    expect(r.searchQueryToURL("Boopy Boop")).toBe("https://geosearch.planninglabs.nyc/v1/autocomplete?text=Boopy%20Boop");
  });
});
