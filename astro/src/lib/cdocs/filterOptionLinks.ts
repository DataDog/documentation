/**
 * The filter bar's options as links: for each shown filter on a variant,
 * where a reader ends up by picking each option.
 *
 * The filter bar navigates to these links when a reader picks an option, and
 * the plaintext filter bar lists them, so an agent can reach the other
 * variants.
 */
import { buildFiltersManifest } from "cdocs-data/buildFiltersManifest";
import type { CustomizationConfig } from "cdocs-data";
import configByLang from "virtual:cdocs-config";
import type { CdocContentFilter } from "./filters";
import {
  buildVariant,
  settleValues,
  shownValues,
  type CdocsVariantLabel,
} from "./variants";

const DEFAULT_LANG = "en";

/** A filter option, with the URL a reader gets by picking it. */
export interface CdocsFilterOptionLink {
  id: string;
  label: string;
  /** Whether this is the filter's current value. */
  isSelected: boolean;
  /** The variant URL with this option picked, alphabetical by trait. */
  url: string;
  /** Labels for each value of that variant, in frontmatter order. */
  labels: CdocsVariantLabel[];
}

/** A shown filter, with a link for each of its options. */
export interface CdocsFilterLinks {
  traitId: string;
  label: string;
  options: CdocsFilterOptionLink[];
}

/**
 * Each shown filter on a variant, with the URL a reader gets by picking each
 * of its options.
 *
 * Picking an option keeps the other values where they're still valid. A
 * dependent value the new option doesn't offer resets to its default, and a
 * filter the new option hides is dropped, so every URL is a valid variant.
 */
export function buildFilterOptionLinks(p: {
  bareUrl: string;
  contentFilters: CdocContentFilter[];
  /** The variant's current values. */
  valsByTraitId: Record<string, string>;
  customizationConfig?: CustomizationConfig;
}): CdocsFilterLinks[] {
  const filtersManifest = buildFiltersManifest({
    frontmatter: { title: "", content_filters: p.contentFilters },
    customizationConfig: p.customizationConfig ?? configByLang[DEFAULT_LANG],
  });
  const current = settleValues(
    filtersManifest,
    p.contentFilters,
    p.valsByTraitId,
  );
  const currentVals = shownValues(current);

  const filterLinks: CdocsFilterLinks[] = [];
  for (const filter of p.contentFilters) {
    const resolvedFilter = current.resolvedFilters[filter.trait_id];
    if (!resolvedFilter.isShown) continue;
    filterLinks.push({
      traitId: filter.trait_id,
      label: resolvedFilter.label,
      options: resolvedFilter.options.map((option) => {
        const { variant } = buildVariant(
          p.bareUrl,
          undefined,
          settleValues(filtersManifest, p.contentFilters, {
            ...currentVals,
            [filter.trait_id]: option.id,
          }),
        );
        return {
          id: option.id,
          label: option.label,
          isSelected: option.id === resolvedFilter.currentValue,
          url: variant.url,
          labels: variant.labels,
        };
      }),
    });
  }
  return filterLinks;
}
