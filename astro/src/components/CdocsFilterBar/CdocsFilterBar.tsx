import { navigate } from "astro:transitions/client";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import styles from "./CdocsFilterBar.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { markSelfAsHydrated } from "@lib/componentUtils/markSelfAsHydrated";
import { writePreferences } from "@lib/cdocs/preferences";
import type { ClientSideFiltersManifest } from "cdocs-data";
import type { CdocContentFilter } from "@lib/cdocs/filters";
import {
  buildFilterOptionLinks,
  type CdocsFilterLinks,
  type CdocsFilterOptionLink,
} from "@lib/cdocs/filterOptionLinks";

const cl = classListFactory(styles);

interface Props {
  /** The page path, without params. */
  bareUrl: string;
  filtersManifest: ClientSideFiltersManifest;
  contentFilters: CdocContentFilter[];
  /** The values the page was rendered with. */
  valsByTraitId: Record<string, string>;
}

/**
 * The cdocs customization menu: one group of "pills" per filter, with the
 * selected pill in Datadog purple.
 *
 * Selecting a pill does a client-side navigation via `navigate()` from
 * astro:transitions/client to that option's URL, so the freshly SSR-rendered
 * (re-filtered) content swaps in under Astro's view transitions rather than a
 * full-page reload.
 *
 * The new page takes a server render to arrive, so the bar redraws from the
 * reader's picks right away: the clicked pill is selected, a dependent filter
 * shows its new options, and every pill's URL keeps the earlier picks. A
 * reader can pick several filters before the page arrives, and the last
 * navigation carries all of them.
 *
 * The clicked value is stored as the reader's preference. The bar is the only
 * place that stores one, so a value the reader didn't pick, such as a default
 * or a value from a loaded URL, isn't stored.
 */
export default function CdocsFilterBar({
  bareUrl,
  filtersManifest,
  contentFilters,
  valsByTraitId,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [pickedValsByTraitId, setPickedValsByTraitId] = useState(valsByTraitId);
  const filterLinks = useMemo(
    () =>
      buildFilterOptionLinks({
        bareUrl,
        filtersManifest,
        contentFilters,
        valsByTraitId: pickedValsByTraitId,
      }),
    [pickedValsByTraitId],
  );

  // Signal hydration so tests (and any consumer) can wait for the pill click
  // handlers to be live; a click landing before hydration is silently dropped.
  useEffect(() => {
    markSelfAsHydrated(rootRef);
  }, []);

  if (filterLinks.length === 0) return null;

  const selectOption = (traitId: string, option: CdocsFilterOptionLink) => {
    writePreferences({ [traitId]: option.id });
    setPickedValsByTraitId(valsOf(option));
    navigate(option.url);
  };

  return (
    <div class={cl("cdocs-filter-bar")} ref={rootRef}>
      {filterLinks.map((filter) => (
        <FilterPillGroup
          key={filter.traitId}
          filter={filter}
          onSelect={selectOption}
        />
      ))}
    </div>
  );
}

/** Every shown value of the option's variant. */
function valsOf(option: CdocsFilterOptionLink): Record<string, string> {
  return Object.fromEntries(
    option.labels.map((label) => [label.traitId, label.optionId]),
  );
}

interface FilterPillGroupProps {
  filter: CdocsFilterLinks;
  onSelect: (traitId: string, option: CdocsFilterOptionLink) => void;
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
        {filter.options.map((option) => (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={option.isSelected}
            data-trait-id={filter.traitId}
            data-option-id={option.id}
            class={cl(
              "cdocs-filter-bar__pill",
              option.isSelected && "cdocs-filter-bar__pill--selected",
            )}
            onClick={() => onSelect(filter.traitId, option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
