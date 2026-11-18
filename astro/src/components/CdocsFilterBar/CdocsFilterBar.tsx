import { navigate } from "astro:transitions/client";
import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./CdocsFilterBar.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { markSelfAsHydrated } from "@lib/componentUtils/markSelfAsHydrated";
import type {
  CdocsFilterLinks,
  CdocsFilterOptionLink,
} from "@lib/cdocs/filterOptionLinks";

const cl = classListFactory(styles);

interface Props {
  filterLinks: CdocsFilterLinks[];
}

/** The pill a reader clicked, shown as selected until the new page arrives. */
interface PendingSelection {
  traitId: string;
  optionId: string;
}

/**
 * The cdocs customization menu: one group of "pills" per filter, with the
 * selected pill in Datadog purple.
 *
 * Selecting a pill does a client-side navigation via `navigate()` from
 * astro:transitions/client to that option's URL, so the freshly SSR-rendered
 * (re-filtered) content swaps in under Astro's view transitions rather than a
 * full-page reload. The server builds each URL, so a value the new option
 * doesn't offer is already dropped or reset. The clicked pill shows as
 * selected right away, since the new page takes a server render to arrive.
 */
export default function CdocsFilterBar({ filterLinks }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [pendingSelection, setPendingSelection] =
    useState<PendingSelection | null>(null);

  // Signal hydration so tests (and any consumer) can wait for the pill click
  // handlers to be live; a click landing before hydration is silently dropped.
  useEffect(() => {
    markSelfAsHydrated(rootRef);
  }, []);

  // New props mean the new page arrived, and its selection is the real one.
  useEffect(() => {
    setPendingSelection(null);
  }, [filterLinks]);

  if (filterLinks.length === 0) return null;

  const selectOption = (traitId: string, option: CdocsFilterOptionLink) => {
    setPendingSelection({ traitId, optionId: option.id });
    navigate(option.url);
  };

  return (
    <div class={cl("cdocs-filter-bar")} ref={rootRef}>
      {filterLinks.map((filter) => (
        <FilterPillGroup
          key={filter.traitId}
          filter={filter}
          pendingOptionId={
            pendingSelection?.traitId === filter.traitId
              ? pendingSelection.optionId
              : undefined
          }
          onSelect={selectOption}
        />
      ))}
    </div>
  );
}

interface FilterPillGroupProps {
  filter: CdocsFilterLinks;
  /** The clicked option, when its page hasn't arrived yet. */
  pendingOptionId?: string;
  onSelect: (traitId: string, option: CdocsFilterOptionLink) => void;
}

/** A single filter rendered as a labeled radiogroup of pill buttons. */
function FilterPillGroup({
  filter,
  pendingOptionId,
  onSelect,
}: FilterPillGroupProps) {
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
          const selected = pendingOptionId
            ? option.id === pendingOptionId
            : option.isSelected;
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
              onClick={() => onSelect(filter.traitId, option)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
