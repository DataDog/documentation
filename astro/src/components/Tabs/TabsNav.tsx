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
}: TabsNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const tabPanelsRef = useRef<HTMLElement[]>([]);
  const panelIdsRef = useRef<string[]>([]);

  // The first paint always uses index 0. If the page loaded with a hash that
  // matches one of our panel IDs, jump to that tab on mount before the panel
  // visibility is locked to index 0.
  useEffect(() => {
    const thisElement = ref.current;
    if (!thisElement) return;

    const loaded = loadExternalContext(externalContext);
    if (!loaded) return;

    const { tabsEl, tabPanelEls } = loaded;

    tabPanelsRef.current = tabPanelEls;
    panelIdsRef.current = externalContext.entries.tabPanelEls;

    const activateFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const idx = panelIdsRef.current.indexOf(hash);
      if (idx >= 0) setActiveTab(idx);
    };
    activateFromHash();
    window.addEventListener("hashchange", activateFromHash);

    if (variant) {
      markSelfAsHydrated(ref);
      return () => window.removeEventListener("hashchange", activateFromHash);
    }

    // Use pills if tabs won't fit (skipped if variant is explicitly set)
    const checkOverflow = () => {
      addStyle(thisElement.classList, "tabs__nav--measuring");
      const overflows = thisElement.scrollWidth > thisElement.clientWidth;
      removeStyle(thisElement.classList, "tabs__nav--measuring");
      if (overflows) {
        addStyle(tabsEl.classList, "tabs--pills");
      } else {
        removeStyle(tabsEl.classList, "tabs--pills");
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    markSelfAsHydrated(ref);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      window.removeEventListener("hashchange", activateFromHash);
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
            onClick={() => {
              if (!isDisabled) setActiveTab(i);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
