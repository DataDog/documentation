import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./ApiChangelogFilterBar.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { markSelfAsHydrated } from "@lib/componentUtils/markSelfAsHydrated";
import type { ChangelogFilter } from "@lib/api/changelog";

const cl = classListFactory(styles);

export interface ChangelogFilterTab {
  filter: ChangelogFilter;
  label: string;
  href: string;
}

interface Props {
  tabs: ChangelogFilterTab[];
  activeFilter: ChangelogFilter;
  labels: { nav: string };
}

/**
 * The changelog's filter tabs. Each tab is a plain link to its filter's static
 * page, but a click marks the tab active right away, so the bar responds while
 * the browser loads the next page behind the current one.
 */
export default function ApiChangelogFilterBar({
  tabs,
  activeFilter,
  labels,
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [shownFilter, setShownFilter] = useState(activeFilter);

  useEffect(() => {
    markSelfAsHydrated(rootRef);
  }, []);

  useResetOnBackForwardRestore(() => setShownFilter(activeFilter));

  const handleTabClick = (event: MouseEvent, filter: ChangelogFilter) => {
    if (opensElsewhere(event)) return;
    setShownFilter(filter);
  };

  return (
    <nav
      class={cl("api-changelog-filter-bar")}
      aria-label={labels.nav}
      ref={rootRef}
    >
      <ul class={cl("api-changelog-filter-bar__list")}>
        {tabs.map((tab) => (
          <FilterTab
            key={tab.filter}
            tab={tab}
            isActive={tab.filter === shownFilter}
            onClick={(event) => handleTabClick(event, tab.filter)}
          />
        ))}
      </ul>
    </nav>
  );
}

interface FilterTabProps {
  tab: ChangelogFilterTab;
  isActive: boolean;
  onClick: (event: MouseEvent) => void;
}

function FilterTab({ tab, isActive, onClick }: FilterTabProps) {
  return (
    <li class={cl("api-changelog-filter-bar__item")}>
      <a
        class={cl(
          "api-changelog-filter-bar__tab",
          isActive && "api-changelog-filter-bar__tab--active",
        )}
        href={tab.href}
        aria-current={isActive ? "page" : undefined}
        onClick={onClick}
      >
        {tab.label}
      </a>
    </li>
  );
}

/** Modified and middle clicks open a new tab or window, leaving this page put. */
function opensElsewhere(event: MouseEvent): boolean {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

/**
 * A page restored from the back-forward cache keeps whichever tab was clicked
 * before leaving, so put back the tab that matches the page.
 */
function useResetOnBackForwardRestore(reset: () => void) {
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) reset();
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);
}
