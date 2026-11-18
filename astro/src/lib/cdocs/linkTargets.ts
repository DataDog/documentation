/**
 * Cdocs pages as link targets, for adding params to links on the server.
 *
 * The browser adds stored preferences to links with the traits list, which
 * only says which params a page accepts. The server can check whole
 * combinations of values instead, so a link gets only the values its page
 * offers together.
 */
import { buildFiltersManifest } from "cdocs-data/buildFiltersManifest";
import type { CustomizationConfig } from "cdocs-data";
import configByLang from "virtual:cdocs-config";
import type { CdocContentFilter } from "./filters";
import { getCdocsEntries } from "./pageLists";
import { settleValues, shownValues } from "./variants";

const DEFAULT_LANG = "en";

/** What the server needs to add params to a link to a Cdocs page. */
export interface CdocsLinkTarget {
  /** Every trait the page accepts as a param, in frontmatter order. */
  traitIds: string[];
  /**
   * Whether a URL with these params shows them all. A value fails if the page
   * doesn't offer it, another value rules it out, or its filter is hidden.
   * Traits not given take their defaults, as they would on the page.
   */
  showsValues: (valsByTraitId: Record<string, string>) => boolean;
}

/** The link target for one Cdocs page, from its frontmatter filters. */
export function buildCdocsLinkTarget(p: {
  contentFilters: CdocContentFilter[];
  customizationConfig?: CustomizationConfig;
}): CdocsLinkTarget {
  const filtersManifest = buildFiltersManifest({
    frontmatter: { title: "", content_filters: p.contentFilters },
    customizationConfig: p.customizationConfig ?? configByLang[DEFAULT_LANG],
  });

  return {
    traitIds: p.contentFilters.map((filter) => filter.trait_id),
    showsValues: (valsByTraitId) => {
      const shown = shownValues(
        settleValues(filtersManifest, p.contentFilters, valsByTraitId),
      );
      return Object.entries(valsByTraitId).every(
        ([traitId, value]) => shown[traitId] === value,
      );
    },
  };
}

let linkTargetsPromise: Promise<Map<string, CdocsLinkTarget>> | null = null;

/**
 * Every Cdocs page's link target, by page ID. Computed once per server
 * process, like the traits list.
 */
export function getCdocsLinkTargets(): Promise<Map<string, CdocsLinkTarget>> {
  linkTargetsPromise ??= getCdocsEntries().then(
    (entries) =>
      new Map(
        entries.map((entry) => [
          entry.id,
          buildCdocsLinkTarget({ contentFilters: entry.data.content_filters! }),
        ]),
      ),
  );
  return linkTargetsPromise;
}
