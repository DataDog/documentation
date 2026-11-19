/**
 * The browser side of Cdocs preferences, started once per product docs page:
 *
 * - Adds every resolved filter value to the URL, on every page load and
 *   view-transition navigation, so the URL bar shows the variant on screen.
 *   The URL's values aren't stored: only the filter bar stores a value, when
 *   the reader picks one.
 * - When the page is idle, loads the stored preferences and the traits list.
 * - When the reader hovers over, touches, or focuses a link to a Cdocs page,
 *   adds the stored preferences that page accepts as params.
 * - Does the same for a view-transition navigation to another page, in case
 *   the link wasn't updated first. (On a full page load, the
 *   `CdocsBareUrlRedirect` head script does it.)
 */
import type { TransitionBeforePreparationEvent } from "astro:transitions/client";
import type { CdocsTraitsList } from "./pageLists";
import { readCdocsPageState, type CdocsPageState } from "./pageState";
import { addPreferencesToHref } from "./preferenceLinks";
import { readPreferences } from "./preferences";

interface StartOptions {
  /** Defaults to `requestIdleCallback`, where the browser has it. */
  scheduleIdle?: (callback: () => void) => void;
  fetchTraitsList?: (url: string) => Promise<CdocsTraitsList>;
  /** How long a navigation waits for the traits list. */
  traitsListWaitMs?: number;
}

/**
 * Most navigations don't wait at all: the traits list loads once, when the
 * first page goes idle, and then stays loaded across view transitions. A
 * navigation waits only when the reader follows a link to another page before
 * that first fetch finishes, such as on a slow connection. Past this cap, it
 * goes ahead without preferences rather than leave the click unanswered.
 */
const TRAITS_LIST_WAIT_MS = 300;

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
  const traitsListWaitMs = options.traitsListWaitMs ?? TRAITS_LIST_WAIT_MS;

  let pageState: CdocsPageState | null = null;
  let preferences: Record<string, string> = {};
  let traitsList: CdocsTraitsList | null = null;
  let traitsListRequest: {
    url: string;
    promise: Promise<CdocsTraitsList | null>;
  } | null = null;

  function handlePageLoad() {
    pageState = readCdocsPageState(document);
    if (!pageState) return;

    syncUrlWithResolvedValues(pageState);

    const state = pageState;
    scheduleIdle(() => {
      preferences = readPreferences();
      loadTraitsList(state.traitsListUrl);
    });
  }

  /** The traits list, fetched once per URL, or `null` if the fetch failed. */
  function loadTraitsList(url: string): Promise<CdocsTraitsList | null> {
    if (traitsListRequest?.url === url) return traitsListRequest.promise;
    const request = {
      url,
      promise: fetchTraitsList(url).then(
        (loadedTraitsList) => {
          traitsList = loadedTraitsList;
          return loadedTraitsList;
        },
        () => {
          // Without the traits list, links are left alone. The next page
          // load tries again.
          if (traitsListRequest === request) traitsListRequest = null;
          return null;
        },
      ),
    };
    traitsListRequest = request;
    return request.promise;
  }

  function handleLinkIntent(event: Event) {
    if (!pageState || !traitsList) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest("a[href]");
    if (!anchor) return;

    const newHref = hrefWithPreferences(
      anchor.getAttribute("href")!,
      pageState,
      traitsList,
    );
    if (newHref) anchor.setAttribute("href", newHref);
  }

  /**
   * Add the stored preferences to a view-transition navigation to another
   * Cdocs page. The traits list may not be loaded yet, so this happens in the
   * page loader, which Astro waits for, up to `traitsListWaitMs`.
   *
   * A navigation within the page, like a filter bar change, already has the
   * page's values, and a back or forward navigation returns to a URL as it was.
   */
  function handleBeforePreparation(event: Event) {
    const preparation = event as TransitionBeforePreparationEvent;
    const state = pageState;
    if (!state || preparation.navigationType === "traverse") return;
    if (preparation.formData) return;
    if (preparation.to.pathname === preparation.from.pathname) return;

    const loadPage = preparation.loader;
    preparation.loader = async () => {
      const loadedTraitsList = await Promise.race([
        loadTraitsList(state.traitsListUrl),
        wait(traitsListWaitMs).then(() => null),
      ]);
      if (loadedTraitsList) {
        preferences = readPreferences();
        const newHref = hrefWithPreferences(
          preparation.to.href,
          state,
          loadedTraitsList,
        );
        if (newHref) preparation.to = new URL(newHref, preparation.to);
      }
      await loadPage();
    };
  }

  function hrefWithPreferences(
    href: string,
    state: CdocsPageState,
    loadedTraitsList: CdocsTraitsList,
  ): string | null {
    return addPreferencesToHref({
      href,
      pageUrl: window.location.href,
      traitsList: loadedTraitsList,
      // Params in the URL bar win over stored preferences.
      preferences: { ...preferences, ...currentUrlParams() },
      pathPrefix: state.pathPrefix,
    });
  }

  // `astro:page-load` fires after each view-transition navigation. It also
  // fires on the first load, which repeats a harmless write.
  handlePageLoad();
  document.addEventListener("astro:page-load", handlePageLoad);
  document.addEventListener(
    "astro:before-preparation",
    handleBeforePreparation,
  );
  for (const eventName of LINK_INTENT_EVENTS) {
    document.addEventListener(eventName, handleLinkIntent, {
      capture: true,
      passive: true,
    });
  }

  return () => {
    document.removeEventListener("astro:page-load", handlePageLoad);
    document.removeEventListener(
      "astro:before-preparation",
      handleBeforePreparation,
    );
    for (const eventName of LINK_INTENT_EVENTS) {
      document.removeEventListener(eventName, handleLinkIntent, {
        capture: true,
      });
    }
  };
}

// Private functions ------------------------------------------------

/**
 * Put every resolved value in the URL, in place, with params in alphabetical
 * order, the same as variant URLs. A URL value the page didn't use is
 * replaced. Other params, such as one for a filter that's hidden, are kept, so
 * the head script doesn't add a stored value for it again on the next load.
 */
function syncUrlWithResolvedValues(pageState: CdocsPageState) {
  const resolvedVals = Object.entries(pageState.valsByTraitId);
  if (resolvedVals.length === 0) return;

  const url = new URL(window.location.href);
  for (const [traitId, value] of resolvedVals) {
    url.searchParams.set(traitId, value);
  }
  url.searchParams.sort();
  if (url.href === window.location.href) return;
  // Astro's router keeps its own data in the history state.
  window.history.replaceState(
    window.history.state,
    "",
    url.pathname + url.search + url.hash,
  );
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
