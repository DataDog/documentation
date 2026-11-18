/**
 * The browser side of Cdocs preferences, started once per product docs page:
 *
 * - Stores the filter values set by the page's URL params, on every page load
 *   and view-transition navigation. (The filter bar stores a value when the
 *   reader changes a filter.)
 * - When the page is idle, loads the stored preferences and the traits list.
 * - When the reader hovers over, touches, or focuses a link to a Cdocs page,
 *   adds the stored preferences that page accepts as params.
 */
import type { CdocsTraitsList } from "./cdocsPages";
import { readCdocsPageState, type CdocsPageState } from "./pageState";
import { addPreferencesToHref } from "./preferenceLinks";
import { readPreferences, writePreferences } from "./preferences";

interface StartOptions {
  /** Defaults to `requestIdleCallback`, where the browser has it. */
  scheduleIdle?: (callback: () => void) => void;
  fetchTraitsList?: (url: string) => Promise<CdocsTraitsList>;
}

// `pointerdown` covers a click on a link that was already under the pointer
// when the page appeared, which gets no `pointerover` until the pointer moves.
const LINK_INTENT_EVENTS = [
  "pointerover",
  "pointerdown",
  "touchstart",
  "focusin",
] as const;

/** Start the script. Returns a function that stops it, for tests. */
export function startCdocsPreferences(options: StartOptions = {}): () => void {
  const scheduleIdle = options.scheduleIdle ?? scheduleWhenIdle;
  const fetchTraitsList = options.fetchTraitsList ?? fetchTraitsListJson;

  let pageState: CdocsPageState | null = null;
  let preferences: Record<string, string> = {};
  let traitsList: CdocsTraitsList | null = null;
  let traitsListUrl: string | null = null;

  function handlePageLoad() {
    pageState = readCdocsPageState(document);
    if (!pageState) return;

    storeUrlValues(pageState);

    const state = pageState;
    scheduleIdle(() => {
      preferences = readPreferences();
      if (traitsListUrl === state.traitsListUrl) return;
      traitsListUrl = state.traitsListUrl;
      fetchTraitsList(state.traitsListUrl).then(
        (loadedTraitsList) => {
          traitsList = loadedTraitsList;
        },
        () => {
          // Without the traits list, links are left alone.
          traitsListUrl = null;
        },
      );
    });
  }

  function handleLinkIntent(event: Event) {
    if (!pageState || !traitsList) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest("a[href]");
    if (!anchor) return;

    const newHref = addPreferencesToHref({
      href: anchor.getAttribute("href")!,
      pageUrl: window.location.href,
      traitsList,
      // Params in the URL bar win over stored preferences.
      preferences: { ...preferences, ...currentUrlParams() },
      pathPrefix: pageState.pathPrefix,
    });
    if (newHref) anchor.setAttribute("href", newHref);
  }

  // `astro:page-load` fires after each view-transition navigation. It also
  // fires on the first load, which repeats a harmless write.
  handlePageLoad();
  document.addEventListener("astro:page-load", handlePageLoad);
  for (const eventName of LINK_INTENT_EVENTS) {
    document.addEventListener(eventName, handleLinkIntent, {
      capture: true,
      passive: true,
    });
  }

  return () => {
    document.removeEventListener("astro:page-load", handlePageLoad);
    for (const eventName of LINK_INTENT_EVENTS) {
      document.removeEventListener(eventName, handleLinkIntent, {
        capture: true,
      });
    }
  };
}

// Private functions ------------------------------------------------

/**
 * Store the URL params the page used. A param the page rejected (an unknown
 * option, for example) resolved to something else, so it's skipped.
 */
function storeUrlValues(pageState: CdocsPageState) {
  const urlParams = new URLSearchParams(window.location.search);
  const valsToStore: Record<string, string> = {};
  for (const [traitId, value] of Object.entries(pageState.valsByTraitId)) {
    if (urlParams.get(traitId) === value) valsToStore[traitId] = value;
  }
  if (Object.keys(valsToStore).length > 0) writePreferences(valsToStore);
}

function currentUrlParams(): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(window.location.search));
}

function scheduleWhenIdle(callback: () => void) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback);
  } else {
    setTimeout(callback, 1);
  }
}

async function fetchTraitsListJson(url: string): Promise<CdocsTraitsList> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return (await response.json()) as CdocsTraitsList;
}
