import { navigate } from "astro:transitions/client";
import { useEffect, useRef } from "preact/hooks";
import styles from "./CdocsFilterBar.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { markSelfAsHydrated } from "@lib/componentUtils/markSelfAsHydrated";
import type { ResolvedFilter } from "@lib/cdocs/types";

const cl = classListFactory(styles);

interface Props {
  filters: ResolvedFilter[];
}

/**
 * The cdocs customization menu: one group of "pills" per filter, mirroring the
 * Hugo `cdocs-hugo-integration` menu (selected pill in Datadog purple).
 *
 * Selecting a pill sets the matching URL query param and does a client-side
 * navigation via `navigate()` from astro:transitions/client, so the freshly
 * SSR-rendered (re-filtered) content swaps in under Astro's view transitions
 * rather than a full-page reload.
 */
export default function CdocsFilterBar({ filters }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Signal hydration so tests (and any consumer) can wait for the pill click
  // handlers to be live; a click landing before hydration is silently dropped.
  useEffect(() => {
    markSelfAsHydrated(rootRef);
  }, []);

  if (filters.length === 0) return null;

  const selectOption = (traitId: string, optionId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(traitId, optionId);
    navigate(url.pathname + url.search);
  };

  return (
    <div class={cl("cdocs-filter-bar")} ref={rootRef}>
      {filters.map((filter) => (
        <FilterPillGroup
          key={filter.traitId}
          filter={filter}
          onSelect={selectOption}
        />
      ))}
    </div>
  );
}

interface FilterPillGroupProps {
  filter: ResolvedFilter;
  onSelect: (traitId: string, optionId: string) => void;
}

/** A single filter rendered as a labeled radiogroup of pill buttons. */
function FilterPillGroup({ filter, onSelect }: FilterPillGroupProps) {
  const labelId = `cdocs-filter-${filter.traitId}-label`;

  return (
    <div class={cl("cdocs-filter-bar__group")}>
      <p class={cl("cdocs-filter-bar__label")} id={labelId}>
        {filter.label}
      </p>
      <div
        class={cl("cdocs-filter-bar__pills")}
        role="radiogroup"
        aria-labelledby={labelId}
      >
        {filter.options.map((option) => {
          const selected = option.id === filter.currentValue;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              data-trait-id={filter.traitId}
              data-option-id={option.id}
              class={cl(
                "cdocs-filter-bar__pill",
                selected && "cdocs-filter-bar__pill--selected",
              )}
              onClick={() => onSelect(filter.traitId, option.id)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
