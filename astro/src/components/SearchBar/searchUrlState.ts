/**
 * URL state helpers for the search query.
 *
 * Hugo syncs the live search query to `?s=` as the user types, and seeds the
 * search from that param on load (its InstantSearch `routing.stateMapping`,
 * `hugo/assets/scripts/components/instantsearch.js`). These helpers are the
 * Astro equivalent of that mapping.
 *
 * The pure functions take the search and href strings as input, so they are
 * unit-tested without a browser. Pattern follows `Tabs/tabSync.ts`, which
 * splits the same way: pure builders plus one impure writer.
 */

/** Hugo's param name, and already what `navigateToSearchPage` emits. */
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
 * Write the query to the address bar without adding a history entry.
 *
 * Hugo's router uses `pushState`, which leaves one entry per debounce window
 * and makes Back walk the query backwards; this site's other synced params
 * (`tabSync`, `regionState`) use `replaceState`, and so does this.
 */
export function writeSearchQueryParam(query: string): void {
  // Pass the current state through: Astro's ClientRouter (BaseLayout.astro)
  // keeps its navigation data in `history.state`.
  window.history.replaceState(
    window.history.state,
    "",
    buildSearchUrl(window.location.href, query),
  );
}
