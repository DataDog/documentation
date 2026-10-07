import { useCallback, useEffect, useRef } from "preact/hooks";
import type { Dispatch, StateUpdater } from "preact/hooks";
import { readSearchQueryFromUrl } from "../searchUrlState";
import {
  publishSearchQuery,
  subscribeToSearchQuery,
} from "../searchQueryStore";

interface Args {
  setQuery: Dispatch<StateUpdater<string>>;
  setOpen: Dispatch<StateUpdater<boolean>>;
  /** The form element, used to test whether this instance is the laid-out one. */
  anchorRef: { current: HTMLElement | null };
  debounceMs: number;
}

interface SearchQuerySync {
  /**
   * Record a user edit. Call this from `onInput` and from the clear handler,
   * and from nowhere else: mirrored and restored updates must not republish.
   */
  publishQuery: (value: string) => void;
}

/** Distinguishes islands on the shared channel, so each ignores its own echo. */
let nextIslandId = 0;

/**
 * True once Astro's ClientRouter has swapped the document. Module state
 * survives a swap (the document is never reloaded), so this is a precise test
 * for "this mount is a client-side navigation, not a real page load" — without
 * it, every cdocs navigation would re-pop the results.
 *
 * It is a swap flag rather than a has-restored-once flag because both islands
 * mount during a single real load: a first-mount-wins flag would let whichever
 * island hydrated first consume the restore and leave the visible one closed.
 */
let hasSwappedDocument = false;
if (typeof document !== "undefined") {
  document.addEventListener("astro:after-swap", () => {
    hasSwappedDocument = true;
  });
}

/**
 * Is this instance the one the user can actually see?
 *
 * The two SearchBar islands are hidden by complementary `display: none` rules
 * at 992px, so at any width exactly one of them is laid out — a rect test is
 * therefore a more direct question than asking which `variant` this is. The
 * mobile panel is the one exception: it is laid out below 992px but parked
 * offscreen until the drawer opens, so an offscreen rect counts as hidden.
 */
function isAnchorOnScreen(anchor: HTMLElement | null): boolean {
  const rect = anchor?.getClientRects()[0];
  if (!rect) return false;
  return rect.left < window.innerWidth;
}

/**
 * Binds one SearchBar island to the shared query state: restores `?s=` on
 * load, mirrors the other island's text as it is typed, and hands back the
 * callback that publishes this island's own edits.
 */
export function useSearchQuerySync({
  setQuery,
  setOpen,
  anchorRef,
  debounceMs,
}: Args): SearchQuerySync {
  const islandIdRef = useRef<string>();
  if (islandIdRef.current === undefined) {
    islandIdRef.current = `search-bar-${nextIslandId++}`;
  }
  const islandId = islandIdRef.current;

  // Restore. Both islands take the text; only the visible one pops the
  // results, so a phone reload leaves the query in the closed drawer rather
  // than painting a popup beside an offscreen input.
  useEffect(() => {
    const restoredQuery = readSearchQueryFromUrl(window.location.search);
    if (!restoredQuery) return;
    setQuery(restoredQuery);
    if (!hasSwappedDocument && isAnchorOnScreen(anchorRef.current)) {
      setOpen(true);
    }
  }, []);

  // Mirror. Text only: `open` stays per-instance, since a second popup
  // portaled to document.body behind the first is never wanted.
  useEffect(
    () =>
      subscribeToSearchQuery((detail) => {
        if (detail.originId === islandId) return;
        setQuery(detail.query);
      }),
    [islandId, setQuery],
  );

  const publishQuery = useCallback(
    (value: string) => publishSearchQuery(value, islandId, debounceMs),
    [islandId, debounceMs],
  );

  return { publishQuery };
}
