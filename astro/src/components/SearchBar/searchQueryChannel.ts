/**
 * Shared query channel for the two SearchBar islands (API side nav and mobile
 * nav). Both are mounted at every viewport width, and either can be the one
 * the user types into, so this module owns `?s=` on their behalf:
 *
 *   1. One debounced writer of `?s=`, shared by both islands.
 *   2. A listener set that mirrors each island's text into the other. Because
 *      the hidden input already holds the query, resizing across the 992px
 *      breakpoint needs no extra handling.
 *
 * Islands on a page share one instance of this module, so its state is
 * page-wide. The URL, not this module, is the source of truth for the query.
 */

import {
  readSearchQueryFromUrl,
  writeSearchQueryParam,
} from "./searchUrlState";

/**
 * Origin of a change from Back/forward rather than from an island, so no
 * island ignores it as its own echo.
 */
export const EXTERNAL_ORIGIN_ID = "__external__";

export interface SearchQueryChange {
  query: string;
  /** Id of the island that published, so it can ignore its own echo. */
  originId: string;
}

type SearchQueryListener = (change: SearchQueryChange) => void;

const listeners = new Set<SearchQueryListener>();
let pendingWriteTimerId: ReturnType<typeof setTimeout> | undefined;

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

function broadcast(change: SearchQueryChange): void {
  for (const listener of listeners) listener(change);
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
  listener: SearchQueryListener,
): () => void {
  listeners.add(listener);

  // One `popstate` listener for the whole page rather than one per island.
  if (listeners.size === 1) {
    window.addEventListener("popstate", onPopState);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("popstate", onPopState);
    }
  };
}
