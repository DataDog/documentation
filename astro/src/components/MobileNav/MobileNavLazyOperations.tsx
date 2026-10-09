/**
 * Fills a non-active API category's operation links into the mobile nav when
 * the user expands it. Renders nothing itself: `MobileNavApiList` ships every
 * non-active category as an empty `ul[data-category-slug]`, and this island
 * renders `MobileNavOperationItems` into it from `/api/mobile-nav.json`.
 *
 * The JSON is prefetched on mount (which `client:idle` already defers) at
 * mobile widths, so by the time a user expands a category the links can be
 * rendered synchronously in the click handler, before the `<details>` opens.
 */
import { render } from "preact";
import { useEffect } from "preact/hooks";
import styles from "./MobileNav.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";
import { markSelfAsHydrated } from "@lib/componentUtils/markSelfAsHydrated";
import { desktopMediaQuery } from "@lib/cssUtils/breakpoints";
import type { MobileNavData } from "@lib/api/mobileNavData";
import {
  getLoadedMobileNavData,
  loadMobileNavData,
} from "./mobileNavDataClient";
import MobileNavOperationItems from "./MobileNavOperationItems";

const cl = classListFactory(styles);

export interface MobileNavLazyOperationsLabels {
  Loading: string;
  "View category page": string;
}

interface Props {
  /** The localized URL of `mobile-nav.json` (see `mobileNavDataUrl`). */
  dataUrl: string;
  labels: MobileNavLazyOperationsLabels;
  externalContext: ExternalContext<{ list: string }>;
}

/** Where a lazy list is in its life cycle. Unset until first expanded. */
type LazyListState = "loading" | "loaded" | "failed";

export default function MobileNavLazyOperations({
  dataUrl,
  labels,
  externalContext,
}: Props) {
  useEffect(() => {
    const loaded = loadExternalContext(externalContext);
    if (!loaded) {
      return;
    }
    const listRoot = loaded.list;
    markSelfAsHydrated({ current: listRoot });

    if (shouldPrefetch()) {
      loadMobileNavData(dataUrl).catch(() => {
        // An expand retries and shows the fallback if it fails again.
      });
    }

    const handleClick = (event: MouseEvent) => {
      const lazyList = findLazyListBeingExpanded(event, listRoot);
      if (lazyList) {
        fillLazyList(lazyList, dataUrl, labels);
      }
    };
    // Capture, so `details.open` still reads the state before this click
    // toggles it (and the list is filled before the section opens).
    listRoot.addEventListener("click", handleClick, true);
    return () => listRoot.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}

/**
 * Prefetch only where the panel can be shown: at desktop widths it's
 * `display: none`, so the request would be wasted.
 */
function shouldPrefetch(): boolean {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (connection?.saveData) {
    return false;
  }
  return !window.matchMedia(desktopMediaQuery()).matches;
}

/**
 * The empty list of the category whose summary was clicked, if the click is
 * opening it and the list still needs filling.
 */
function findLazyListBeingExpanded(
  event: MouseEvent,
  listRoot: HTMLElement,
): HTMLUListElement | null {
  const summary = (event.target as Element | null)?.closest("summary");
  if (!summary || !listRoot.contains(summary)) {
    return null;
  }
  const details = summary.parentElement;
  if (!(details instanceof HTMLDetailsElement) || details.open) {
    return null;
  }
  const lazyList = details.querySelector<HTMLUListElement>(
    ":scope > ul[data-category-slug]",
  );
  if (!lazyList) {
    return null;
  }
  const state = lazyList.dataset.lazyState as LazyListState | undefined;
  if (state === "loading" || state === "loaded") {
    return null;
  }
  return lazyList;
}

/**
 * Render the category's links right away when the data is in memory;
 * otherwise show a loading row until it arrives, or a link to the category
 * page if it can't be fetched.
 */
function fillLazyList(
  lazyList: HTMLUListElement,
  dataUrl: string,
  labels: MobileNavLazyOperationsLabels,
) {
  const loadedData = getLoadedMobileNavData(dataUrl);
  if (loadedData) {
    renderOperations(lazyList, loadedData, labels);
    return;
  }

  renderLoadingRow(lazyList, labels);
  loadMobileNavData(dataUrl).then(
    (data) => renderOperations(lazyList, data, labels),
    () => renderFallbackLink(lazyList, labels),
  );
}

function renderOperations(
  lazyList: HTMLUListElement,
  data: MobileNavData,
  labels: MobileNavLazyOperationsLabels,
) {
  const category = data.categories.find(
    (candidate) => candidate.slug === lazyList.dataset.categorySlug,
  );
  if (!category) {
    renderFallbackLink(lazyList, labels);
    return;
  }
  setLazyListState(lazyList, "loaded");
  render(
    <MobileNavOperationItems
      categoryHref={category.href}
      operations={category.operations}
    />,
    lazyList,
  );
}

function renderLoadingRow(
  lazyList: HTMLUListElement,
  labels: MobileNavLazyOperationsLabels,
) {
  setLazyListState(lazyList, "loading");
  render(
    <li>
      <span
        class={cl("mobile-nav__link", "mobile-nav__link--compact")}
        data-level="1"
        style="--depth:1"
      >
        {labels.Loading}
      </span>
    </li>,
    lazyList,
  );
}

function renderFallbackLink(
  lazyList: HTMLUListElement,
  labels: MobileNavLazyOperationsLabels,
) {
  setLazyListState(lazyList, "failed");
  render(
    <li>
      <a
        href={lazyList.dataset.categoryHref}
        class={cl("mobile-nav__link", "mobile-nav__link--compact")}
        data-level="1"
        style="--depth:1"
      >
        {labels["View category page"]}
      </a>
    </li>,
    lazyList,
  );
}

function setLazyListState(lazyList: HTMLUListElement, state: LazyListState) {
  lazyList.dataset.lazyState = state;
  if (state === "loading") {
    lazyList.setAttribute("aria-busy", "true");
  } else {
    lazyList.removeAttribute("aria-busy");
  }
}
