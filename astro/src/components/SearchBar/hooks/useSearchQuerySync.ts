import { useCallback, useEffect, useRef } from "preact/hooks";
import type { Dispatch, StateUpdater } from "preact/hooks";
import { readSearchQueryFromUrl } from "../searchUrlState";
import {
  publishSearchQuery,
  subscribeToSearchQuery,
} from "../searchQueryChannel";

interface SearchQuerySyncParams {
  setQuery: Dispatch<StateUpdater<string>>;
  setOpen: Dispatch<StateUpdater<boolean>>;
  /** The form element, used to test whether this instance is the visible one. */
  anchorRef: { current: HTMLElement | null };
  debounceMs: number;
}

interface SearchQuerySync {
  /**
   * Record a user edit. Call this only from `onInput` and the clear handler:
   * mirrored and restored updates must not republish.
   */
  publishQuery: (value: string) => void;
}

/** Distinguishes islands on the shared channel, so each ignores its own echo. */
let nextIslandId = 0;

/**
 * True after Astro's ClientRouter has swapped the document. Module state
 * survives a swap, so this separates client-side navigations from full page
 * loads, and keeps each cdocs navigation from reopening the results.
 */
let hasSwappedDocument = false;
if (typeof document !== "undefined") {
  document.addEventListener("astro:after-swap", () => {
    hasSwappedDocument = true;
  });
}

/**
 * Whether this instance is the one the user can see. At any width, the 992px
 * `display: none` rules lay out only one of the two islands. The exception is
 * the mobile drawer, which is laid out below 992px but parked offscreen to the
 * right until it opens.
 */
function isAnchorOnScreen(anchor: HTMLElement | null): boolean {
  const rect = anchor?.getClientRects()[0];
  if (!rect) return false;
  return rect.left < window.innerWidth;
}

/**
 * Binds one SearchBar island to the shared query state: restores `?s=` on
 * load, mirrors the other island's text, and returns the callback that
 * publishes this island's own edits.
 */
export function useSearchQuerySync({
  setQuery,
  setOpen,
  anchorRef,
  debounceMs,
}: SearchQuerySyncParams): SearchQuerySync {
  const islandIdRef = useRef<string>();
  if (islandIdRef.current === undefined) {
    islandIdRef.current = `search-bar-${nextIslandId++}`;
  }
  const islandId = islandIdRef.current;

  // Both islands restore the text, but only the visible one opens its results.
  useEffect(() => {
    const restoredQuery = readSearchQueryFromUrl(window.location.search);
    if (!restoredQuery) return;
    setQuery(restoredQuery);
    if (!hasSwappedDocument && isAnchorOnScreen(anchorRef.current)) {
      setOpen(true);
    }
  }, []);

  // Mirror the text only. `open` stays per-instance so that only one popup
  // is ever shown.
  useEffect(
    () =>
      subscribeToSearchQuery((change) => {
        if (change.originId === islandId) return;
        setQuery(change.query);
      }),
    [islandId, setQuery],
  );

  const publishQuery = useCallback(
    (value: string) => publishSearchQuery(value, islandId, debounceMs),
    [islandId, debounceMs],
  );

  return { publishQuery };
}
