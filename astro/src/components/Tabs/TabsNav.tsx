import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./Tabs.module.css";
import { classListFactory } from "../../utils/classListFactory";
import { addStyleFactory } from "../../utils/addStyleFactory";
import { removeStyleFactory } from "../../utils/removeStyleFactory";
import { markSelfAsHydrated } from "../../utils/markSelfAsHydrated";
import {
  loadExternalContext,
  type ExternalContext,
} from "../../utils/loadExternalContext";

const cl = classListFactory(styles);
const addStyle = addStyleFactory(styles);
const removeStyle = removeStyleFactory(styles);

interface TabsNavProps {
  labels: string[];
  externalContext: ExternalContext<{
    tabsComponent: string;
    tabPanelComponents: string[];
  }>;
  /** If set, skips overflow detection and trusts the SSR-applied variant. */
  variant?: "tabs" | "pills";
}

// Renders the nav and buttons for a tabs group, manages active-tab state, and
// toggles visibility on the panels rendered server-side by Tabs.astro.
// Panels stay in the Astro shell because their content is arbitrary HTML that
// shouldn't cross the island prop boundary (nested islands would break).
export function TabsNav({ labels, externalContext, variant }: TabsNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const tabPanelsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const thisElement = ref.current;
    if (!thisElement) return;

    const loaded = loadExternalContext(externalContext);
    if (!loaded) return;

    const { tabsComponent, tabPanelComponents } = loaded;

    tabPanelsRef.current = tabPanelComponents;

    if (variant) {
      markSelfAsHydrated(ref);
      return;
    }

    // Use pills if tabs won't fit (skipped if variant is explicitly set)
    const checkOverflow = () => {
      addStyle(thisElement.classList, "tabs__nav--measuring");
      const overflows = thisElement.scrollWidth > thisElement.clientWidth;
      removeStyle(thisElement.classList, "tabs__nav--measuring");
      if (overflows) {
        addStyle(tabsComponent.classList, "tabs--pills");
      } else {
        removeStyle(tabsComponent.classList, "tabs--pills");
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    markSelfAsHydrated(ref);

    return () => window.removeEventListener("resize", checkOverflow);
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
      {labels.map((label, i) => (
        <button
          role="tab"
          class={
            i === activeIndex
              ? cl("tabs__button", "tabs__button--active")
              : cl("tabs__button")
          }
          aria-selected={i === activeIndex ? "true" : "false"}
          aria-controls={externalContext.entries.tabPanelComponents[i]}
          data-tab-index={i}
          onClick={() => setActiveTab(i)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
