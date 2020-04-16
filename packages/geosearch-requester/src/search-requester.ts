/**
 * The default amount of milliseconds to wait before we actually issue
 * a search request.
 */
const DEFAULT_THROTTLE_MS = 250;

type AbortControllerFactory = () => AbortController|undefined;

/**
 * Options for the requester constructor.
 */
export interface SearchRequesterOptions<SearchResults> {
  /**
   * A factory that returns an AbortController [1] instance,
   * or undefined if the platform doesn't support aborting
   * fetch requests.
   * 
   * If not provided, a default implementation will be used.
   * 
   * [1] https://developer.mozilla.org/en-US/docs/Web/API/AbortController
   */
  createAbortController?: AbortControllerFactory;

  /**
   * A reference to the platform's Fetch API [1]. Note that
   * this will always be called with "this" bound to the
   * global scope.
   * 
   * If not provided, this will default to the `fetch` global.
   * However, if the `fetch` global is undefined, an exception
   * will be thrown.
   * 
   * [1] https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   */
  fetch?: typeof window.fetch,

  /**
   * The number of milliseconds to wait before we actually issue
   * a search request. This is primarily intended to allow
   * keyboard-based autocomplete UIs to not spam the server
   * when the user is typing quickly.
   * 
   * If not provided, this defaults to 250 ms.
   */
  throttleMs?: number,

  /**
   * An optional callback that is called whenever a search
   * request has been aborted (because we've been given a
   * newer search request that takes priority).
   */
  onAbort?: (searchText: string) => void;

  /**
   * A callback that's called whenever an error occurs fetching
   * autocomplete results.
   */
  onError: (e: Error) => void;

  /**
   * A callback that's called whenever results are fetched for
   * the most recently issued query. This will never be
   * called for stale queries.
   */
  onResults: (results: SearchResults) => void;
}

/**
 * Default AbortControllerFactory that returns an AbortController if
 * one exists in global scope, but returns undefined otherwise.
 */
const defaultCreateAbortController: AbortControllerFactory = () => {
  return typeof(AbortController) !== 'undefined' ? new AbortController() : undefined;
}

/**
 * An error class for a non-200 HTTP status code response from the
 * seach service.
 */
export class SearchHttpStatusError extends Error {
  constructor(readonly status: number) {
    super(`Received HTTP ${status}`);
  }
}

/**
 * This class can be used to issue search requests
 * based on a query whose value may change over time
 * due to e.g. keyboard input.
 */
export abstract class SearchRequester<SearchResults> {
  private requestId: number;
  private abortController?: AbortController;
  private throttleTimeout: number|null;
  private createAbortController: AbortControllerFactory;
  private fetch: typeof window.fetch;

  constructor(readonly options: SearchRequesterOptions<SearchResults>) {
    this.requestId = 0;
    this.createAbortController = options.createAbortController || defaultCreateAbortController;
    this.abortController = this.createAbortController();
    this.throttleTimeout = null;

    if (!options.fetch && typeof fetch === 'undefined') {
      throw new Error(
        `A fetch implementation was not passed to ${this.constructor.name}, ` +
        "and one does not exist in the global scope!"
      );
    }
    this.fetch = options.fetch || fetch;
  }

  /**
   * Convert a search query into a URL that returns a JSON response with a
   * HTTP 200 status code when it succeeds.
   */
  abstract searchQueryToURL(query: string): string;

  /**
   * Fetch results for the given query, returning null if the
   * network request was aborted.
   */
  private fetchResults(value: string): Promise<SearchResults|null> {
    const url = this.searchQueryToURL(value);

    // It's important that we pull fetch out as its own variable,
    // as this will bind its "this" context to the global scope
    // when it's called, which is important for most/all window.fetch()
    // implementations.
    const {fetch} = this;

    return fetch(url, {
      signal: this.abortController && this.abortController.signal
    }).then(res => {
      if (res.status !== 200) {
        throw new SearchHttpStatusError(res.status);
      }
      return res.json();
    }).catch((e) => {
      if (e instanceof DOMException && e.name === 'AbortError') {
        // Don't worry about it, the user just aborted the request.
        if (this.options.onAbort) {
          this.options.onAbort(value);
        }
        return null;
      } else {
        throw e;
      }
    });
  }

  /**
   * Fetch results for the given query, returning null if the
   * query was superseded by a newer one.
   */
  private async fetchResultsForLatestRequest(value: string): Promise<SearchResults|null> {
    const originalRequestId = this.requestId;
    let results = await this.fetchResults(value);
    if (this.requestId === originalRequestId) {
      return results;
    }
    return null;
  }
  
  /**
   * Abort any currently in-flight requests.
   */
  private resetSearchRequest() {
    if (this.throttleTimeout !== null) {
      window.clearTimeout(this.throttleTimeout);
      this.throttleTimeout = null;
    }
    this.requestId++;
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = this.createAbortController();
    }
  }

  /**
   * Change the current search request to a new query. Return
   * whether the new query is non-empty.
   */
  changeSearchRequest(value: string): boolean {
    this.resetSearchRequest();
    if (value.length > 0) {
      this.throttleTimeout = window.setTimeout(() => {
        this.fetchResultsForLatestRequest(value).catch(this.options.onError).then(results => {
          if (results) {
            this.options.onResults(results);
          }
        });
      }, this.options.throttleMs || DEFAULT_THROTTLE_MS);
      return true;
    }
    return false;
  }

  /**
   * Clean up all resources used by the requester.
   */
  shutdown() {
    this.resetSearchRequest();
  }
}
