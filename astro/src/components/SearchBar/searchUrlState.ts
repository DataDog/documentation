/**
 * URL state helpers for the search query: the Astro equivalent of Hugo's
 * InstantSearch `routing.stateMapping`
 * (`hugo/assets/scripts/components/instantsearch.js`), which syncs the query
 * to `?s=` and restores it on load.
 *
 * Pure builders plus one impure writer, like `Tabs/tabSync.ts`.
 */

/** Hugo's param name, also used by `navigateToSearchPage`. */
export const SEARCH_QUERY_PARAM = "s";

/** The `?s=` value from a `location.search` string, or "" when absent. */
export function readSearchQueryFromUrl(search: string): string {
  return new URLSearchParams(search).get(SEARCH_QUERY_PARAM) ?? "";
}

/**
 * `href` with `?s=<query>` set, or the param removed when `query` is blank.
 * Other params and the hash are kept. The query is trimmed before it is
 * written, matching Hugo's `stateToRoute`.
 */
export function buildSearchUrl(href: string, query: string): string {
  const url = new URL(href);
  const trimmedQuery = query.trim();
  if (trimmedQuery) {
    url.searchParams.set(SEARCH_QUERY_PARAM, trimmedQuery);
  } else {
    url.searchParams.delete(SEARCH_QUERY_PARAM);
  }
  return url.toString();
}

/**
 * Write the query to the address bar without adding a history entry, like
 * `tabSync` and `regionState`. (Hugo uses `pushState`, which adds an entry per
 * debounce window.)
 */
export function writeSearchQueryParam(query: string): void {
  // Keep the existing state: Astro's ClientRouter stores its navigation data
  // in `history.state`.
  window.history.replaceState(
    window.history.state,
    "",
    buildSearchUrl(window.location.href, query),
  );
}
