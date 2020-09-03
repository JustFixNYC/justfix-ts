import { SearchRequester, SearchRequesterOptions } from "./search-requester";

export { SearchHttpStatusError as GeoSearchHttpStatusError } from "./search-requester";

export type GeoSearchRequesterOptions = SearchRequesterOptions<
  GeoSearchResults
> & {
  /**
   * (Optional)
   * A custom base url for GeoAutocomplete endpoint, like `https://www.boop.com/v1/autocomplete`.
   * If not defined, the standard NYC Planning Labs GeoSearch Autocomplete url is used.
   */
  customGeoAutocompleteUrl?: string;
};

/**
 * For documentation about this endpoint, see:
 *
 * https://geosearch.planninglabs.nyc/docs/#autocomplete
 */
export const GEO_AUTOCOMPLETE_URL =
  'https://geosearch.planninglabs.nyc/v1/autocomplete';

/**
 * The keys here were obtained experimentally, I'm not actually sure
 * if/where they are formally specified.
 */
export enum GeoSearchBoroughGid {
  Manhattan = 'whosonfirst:borough:1',
  Bronx = 'whosonfirst:borough:2',
  Brooklyn = 'whosonfirst:borough:3',
  Queens = 'whosonfirst:borough:4',
  StatenIsland = 'whosonfirst:borough:5',
}

/**
 * This is what the NYC Geosearch API returns from its
 * autocomplete endpoint.
 *
 * Note that some of the fields are "unknown", which
 * just implies that they exist but we're not really
 * sure what type they are (nor do we particularly
 * care, at the moment, for our purposes).
 */
export interface GeoSearchResults {
  bbox: unknown;
  features: GeoSearchFeature[];
}

export interface GeoSearchFeature {
  geometry: unknown;
  properties: GeoSearchProperties;
}

/**
 * Note that these are by no means all the
 * properties, they're just the ones we care about.
 */
export interface GeoSearchProperties {
  /** e.g. "Brooklyn" */
  borough: string;

  /** e.g. "whosonfirst:borough:2" */
  borough_gid: GeoSearchBoroughGid;

  /** e.g. "150" */
  housenumber: string;

  /** e.g. "COURT STREET" */
  street: string;

  /** e.g. "150 COURT STREET" */
  name: string;

  /** e.g. "150 COURT STREET, Brooklyn, New York, NY, USA" */
  label: string;

  /**
   * The 10-digit padded Borough-Block-Lot (BBL) number for the
   * property, e.g. "3002920026".
   */
  pad_bbl: string;
}

/**
 * This class can be used to issue NYC Planning Labs GeoSearch requests
 * based on a query whose value may change over time
 * due to e.g. keyboard input.
 */
export class GeoSearchRequester extends SearchRequester<GeoSearchResults> {
  constructor(readonly options: GeoSearchRequesterOptions) {
    super(options);
  }
  searchQueryToURL(query: string): string {
    return `${
      this.options.customGeoAutocompleteUrl || GEO_AUTOCOMPLETE_URL
    }?text=${encodeURIComponent(query)}`;
  }
}
