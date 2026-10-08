/**
 * Shared query state for the two SearchBar islands (API side nav and mobile
 * nav). Both are mounted at every viewport width, and either can be the one
 * the user types into, so this module owns `?s=` on their behalf:
 *
 *   1. One debounced writer of `?s=`, shared by both islands.
 *   2. A `document` CustomEvent channel that mirrors each island's text into
 *      the other. Because the hidden input already holds the query, resizing
 *      across the 992px breakpoint needs no extra handling.
 *
 * Uses the same channel shape as `RegionSelector/regionState.ts`.
 */

import {
  readSearchQueryFromUrl,
  writeSearchQueryParam,
} from "./searchUrlState";

export const SEARCH_QUERY_CHANGE_EVENT = "dd-search-query-change";

/**
 * Origin of a change from Back/forward rather than from an island, so no
 * island ignores it as its own echo.
 */
export const EXTERNAL_ORIGIN_ID = "__external__";

export interface SearchQueryChangeDetail {
  query: string;
  /** Id of the island that published, so it can ignore its own echo. */
  originId: string;
}

let pendingWriteTimerId: ReturnType<typeof setTimeout> | undefined;
let subscriberCount = 0;

function cancelPendingWrite(): void {
  if (pendingWriteTimerId !== undefined) {
    clearTimeout(pendingWriteTimerId);
    pendingWriteTimerId = undefined;
  }
}

// A write still pending when ClientRouter swaps pages would land on the new
// page's URL.
if (typeof document !== "undefined") {
  document.addEventListener("astro:before-swap", cancelPendingWrite);
}

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
 * Record a user edit: broadcast it immediately, and write `?s=` after
 * `debounceMs`. Edits from either island reset the same timer, so only the
 * last value is written.
 */
export function publishSearchQuery(
  query: string,
  originId: string,
  debounceMs: number,
): void {
  broadcast({ query, originId });

  cancelPendingWrite();
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
