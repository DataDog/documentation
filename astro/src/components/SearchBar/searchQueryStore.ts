/**
 * Shared query state for the search bars.
 *
 * Astro renders two `SearchBar` islands — the API side nav and the mobile nav
 * — and both are mounted at every viewport width, with complementary
 * `display: none` rules at 992px deciding which one is laid out. Either can be
 * the one the user types into, so neither can be the sole owner of `?s=`.
 *
 * This module is that shared owner. It holds:
 *   1. The single debounced writer of `?s=`, so two islands typing in turn
 *      produce one write rather than competing ones.
 *   2. A `document` CustomEvent channel, so each island mirrors the other's
 *      text as it is typed. Continuous mirroring is what makes resizing
 *      across the breakpoint work with no resize handling at all: the mobile
 *      input already holds the query before it becomes the visible one.
 *
 * Same channel shape as `RegionSelector/regionState.ts`, and framework-free
 * for the same reason — correctness does not depend on Vite handing both
 * islands the same module instance.
 */

import {
  readSearchQueryFromUrl,
  writeSearchQueryParam,
} from "./searchUrlState";

export const SEARCH_QUERY_CHANGE_EVENT = "dd-search-query-change";

/**
 * Origin of a change that came from outside any island (Back/forward), so no
 * island filters it out as its own echo.
 */
export const EXTERNAL_ORIGIN_ID = "__external__";

export interface SearchQueryChangeDetail {
  query: string;
  /** Id of the island that published, so it can ignore its own echo. */
  originId: string;
}

let pendingWriteTimerId: ReturnType<typeof setTimeout> | undefined;
let subscriberCount = 0;

function broadcast(detail: SearchQueryChangeDetail): void {
  document.dispatchEvent(
    new CustomEvent<SearchQueryChangeDetail>(SEARCH_QUERY_CHANGE_EVENT, {
      detail,
    }),
  );
}

const onPopState = () => {
  broadcast({
    query: readSearchQueryFromUrl(window.location.search),
    originId: EXTERNAL_ORIGIN_ID,
  });
};

/**
 * Record a user edit: broadcast it now, write `?s=` after `debounceMs`.
 *
 * Only the URL write is debounced. The broadcast is immediate because it is
 * what keeps the two inputs consistent, and a 200ms lag there would be
 * visible to anyone resizing mid-keystroke.
 */
export function publishSearchQuery(
  query: string,
  originId: string,
  debounceMs: number,
): void {
  broadcast({ query, originId });

  // One module-scoped timer, so keystrokes interleaved across the two islands
  // still collapse into a single write of the last value typed.
  if (pendingWriteTimerId !== undefined) {
    clearTimeout(pendingWriteTimerId);
  }
  pendingWriteTimerId = setTimeout(() => {
    pendingWriteTimerId = undefined;
    writeSearchQueryParam(query);
  }, debounceMs);
}

/** Subscribe to query changes from any island, or from Back/forward. */
export function subscribeToSearchQuery(
  listener: (detail: SearchQueryChangeDetail) => void,
): () => void {
  const handleChange = (e: Event) => {
    listener((e as CustomEvent<SearchQueryChangeDetail>).detail);
  };
  document.addEventListener(SEARCH_QUERY_CHANGE_EVENT, handleChange);

  // One `popstate` listener for the whole page rather than one per island.
  subscriberCount += 1;
  if (subscriberCount === 1) {
    window.addEventListener("popstate", onPopState);
  }

  return () => {
    document.removeEventListener(SEARCH_QUERY_CHANGE_EVENT, handleChange);
    subscriberCount -= 1;
    if (subscriberCount === 0) {
      window.removeEventListener("popstate", onPopState);
    }
  };
}
