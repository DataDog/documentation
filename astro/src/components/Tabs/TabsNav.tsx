import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./Tabs.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { addStyleFactory } from "@lib/cssUtils/addStyleFactory";
import { removeStyleFactory } from "@lib/cssUtils/removeStyleFactory";
import { markSelfAsHydrated } from "@lib/componentUtils/markSelfAsHydrated";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";
import {
  indexForKey,
  resolveSyncKey,
  writeSyncCookie,
  writeSyncQueryParam,
  type TabSync,
} from "./tabSync";

const cl = classListFactory(styles);
const addStyle = addStyleFactory(styles);
const removeStyle = removeStyleFactory(styles);

interface TabsNavProps {
  labels: string[];
  externalContext: ExternalContext<{
    tabsEl: string;
    tabPanelEls: string[];
  }>;
  /** If set, skips overflow detection and trusts the SSR-applied variant. */
  variant?: "tabs" | "pills";
  /**
   * Parallel array marking individual tabs as non-interactive. Used by the
   * single-version pill on the API operation page so the version label is
   * still visible but no click handlers fire.
   */
  disabled?: boolean[];
  /**
   * Keeps this group in step with every other group of the same name, the
   * `?<group>=` URL param, and a `<group>` cookie. See `tabSync.ts`.
   */
  sync?: TabSync;
}

// Renders the nav and buttons for a tabs group, manages active-tab state, and
// toggles visibility on the panels rendered server-side by Tabs.astro.
// Panels stay in the Astro shell because their content is arbitrary HTML that
// shouldn't cross the island prop boundary (nested islands would break).
export function TabsNav({
  labels,
  externalContext,
  variant,
  disabled,
  sync,
}: TabsNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const tabPanelsRef = useRef<HTMLElement[]>([]);
  const panelIdsRef = useRef<string[]>([]);

  // The first paint always uses index 0. On mount, a URL hash that matches one
  // of our panel IDs wins; otherwise a synced group starts on its stored key.
  useEffect(() => {
    const thisElement = ref.current;
    if (!thisElement) return;

    const loaded = loadExternalContext(externalContext);
    if (!loaded) return;

    const { tabsEl, tabPanelEls } = loaded;

    tabPanelsRef.current = tabPanelEls;
    panelIdsRef.current = externalContext.entries.tabPanelEls;

    const activateFromHash = (): boolean => {
      const hash = window.location.hash.slice(1);
      if (!hash) return false;
      const idx = panelIdsRef.current.indexOf(hash);
      if (idx >= 0) {
        setActiveTab(idx);
        return true;
      }
      return activatePanelHoldingAnchor(hash);
    };
    const activatedFromHash = activateFromHash();
    window.addEventListener("hashchange", activateFromHash);

    if (sync && !activatedFromHash) activateFromSyncState(sync);

    const followSyncedClick = (event: MouseEvent) => {
      if (sync) followClickInGroup(event, sync);
    };
    if (sync) document.addEventListener("click", followSyncedClick);

    // Use pills if tabs won't fit (skipped if variant is explicitly set)
    const checkOverflow = () => {
      // Measure in the tabs layout, not the current one: pill buttons are
      // narrower, so measuring with pills applied reports a fit, switches to
      // tabs, and the next resize switches back. This all runs before the
      // browser paints, so the reader never sees the layout used to measure.
      removeStyle(tabsEl.classList, "tabs--pills");
      addStyle(thisElement.classList, "tabs__nav--measuring");
      const overflows = thisElement.scrollWidth > thisElement.clientWidth;
      removeStyle(thisElement.classList, "tabs__nav--measuring");
      if (overflows) {
        addStyle(tabsEl.classList, "tabs--pills");
      } else {
        removeStyle(tabsEl.classList, "tabs--pills");
      }
    };

    if (!variant) {
      checkOverflow();
      window.addEventListener("resize", checkOverflow);
    }

    markSelfAsHydrated(ref);

    return () => {
      window.removeEventListener("hashchange", activateFromHash);
      window.removeEventListener("resize", checkOverflow);
      document.removeEventListener("click", followSyncedClick);
    };
  }, []);

  const setActiveTab = (index: number) => {
    setActiveIndex(index);
    tabPanelsRef.current.forEach((tabPanel, i) => {
      const active = i === index;
      tabPanel.hidden = !active;
      if (active) {
        addStyle(tabPanel.classList, "tabs__panel--active");
      } else {
        removeStyle(tabPanel.classList, "tabs__panel--active");
      }
    });
  };

  const activateFromSyncState = ({ group, keys }: TabSync) => {
    const resolved = resolveSyncKey({
      group,
      search: window.location.search,
      cookieString: document.cookie,
    });
    if (!resolved) return;
    setActiveTab(indexForKey(keys, resolved.key));
    // Match Hugo: a value that arrives in the URL is remembered for later
    // pages. Write it as it arrived, so Hugo can still read values that
    // Astro has no tab for (`python-legacy`).
    if (resolved.source === "query") writeSyncCookie(group, resolved.value);
  };

  // Every synced group listens on `document`, so a click in any group of the
  // same name reaches it, even across separately bundled islands. A group
  // that lacks the clicked key stays where it is, unless it sets
  // `fallbackToFirstTab`.
  const followClickInGroup = (
    event: MouseEvent,
    { group, keys, fallbackToFirstTab }: TabSync,
  ) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLElement>("[data-sync-group]");
    if (button?.dataset.syncGroup !== group) return;
    // The button's own handler already selected the tab. Matching by key here
    // would pick the first of two labels that share a key (`C`, `C++`).
    if (ref.current?.contains(button)) return;
    const index = keys.indexOf(button.dataset.syncKey ?? "");
    if (index >= 0) setActiveTab(index);
    else if (fallbackToFirstTab) setActiveTab(0);
  };

  // A hash that names an element inside one of our panels (a heading in a
  // tab) opens that panel. The browser could not scroll to the element while
  // its panel was hidden, so scroll to it once the panel is visible.
  const activatePanelHoldingAnchor = (anchorId: string): boolean => {
    const anchor = document.getElementById(anchorId);
    if (!anchor) return false;
    const idx = tabPanelsRef.current.findIndex((panel) =>
      panel.contains(anchor),
    );
    if (idx < 0) return false;
    setActiveTab(idx);
    requestAnimationFrame(() => anchor.scrollIntoView());
    return true;
  };

  // Changing tabs changes panel heights, here and in every synced group, so
  // anything below them moves. Keep the clicked button under the pointer by
  // scrolling the window by however far it moved. Measure in the next frame:
  // other synced groups switch in their own `document` listeners, which run
  // after this click handler, and the frame still comes before the paint.
  const keepButtonInPlace = (button: HTMLElement, topBefore: number) => {
    requestAnimationFrame(() => {
      const moved = button.getBoundingClientRect().top - topBefore;
      if (moved !== 0) window.scrollBy({ top: moved, behavior: "instant" });
    });
  };

  const selectTab = (index: number, button: HTMLElement) => {
    const topBefore = button.getBoundingClientRect().top;
    setActiveTab(index);
    keepButtonInPlace(button, topBefore);
    const key = sync?.keys[index];
    // A label made only of symbols has an empty key; there is nothing to store.
    if (!sync || !key) return;
    writeSyncCookie(sync.group, key);
    writeSyncQueryParam(sync.group, key);
  };

  return (
    <div ref={ref} class={cl("tabs__nav")} role="tablist">
      {labels.map((label, i) => {
        const isDisabled = disabled?.[i] === true;
        return (
          <button
            role="tab"
            class={
              i === activeIndex
                ? cl("tabs__button", "tabs__button--active")
                : cl("tabs__button")
            }
            aria-selected={i === activeIndex ? "true" : "false"}
            aria-controls={externalContext.entries.tabPanelEls[i]}
            aria-disabled={isDisabled ? "true" : undefined}
            disabled={isDisabled || undefined}
            data-tab-index={i}
            data-sync-group={sync?.group}
            data-sync-key={sync?.keys[i]}
            onClick={(event) => {
              if (!isDisabled) selectTab(i, event.currentTarget);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
