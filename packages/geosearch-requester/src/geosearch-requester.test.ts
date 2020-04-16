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
});
