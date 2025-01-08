/**
 * Functions for determining ("resolving") which
 * filters and options should be displayed in a given user's
 * page customization menu, based on their existing preferences.
 *
 * Organized as isolated functions to control bundle size,
 * since this code must run in the browser to support precompiled pages.
 * It should not use Node features / backend logic
 * (for example, file system access).
 */

import { GLOBAL_PLACEHOLDER_REGEX } from './schemas/regexes';
import {
  ResolvedPageFilters,
  ResolvedPageFilter,
  PageFiltersManifest,
  PageFiltersClientSideManifest
} from './schemas/pageFilters';
import { PageFilterConfig } from './schemas/yaml/frontMatter';

/**
 * Resolve the page filters object that is used
 * to populate the page customization menu.
 *
 * If the user chooses Postgres as their database,
 * this impacts what options should show
 * in the "Database version" filter. Resolution is the process
 * that populates the correct values.
 *
 * Resolution merges a user's customization choices in the UI
 * with the page's filter configuration (defined in its frontmatter)
 * to determine which customization values and options to display.
 * Resolution involves replacing placeholders
 * with user-selected values, determining any default values
 * resulting from the user's earlier selections, and so on.
 */
export function resolvePageFilters(p: {
  valsByFilterId: Record<string, string>;
  filtersManifest: PageFiltersManifest | PageFiltersClientSideManifest;
}): ResolvedPageFilters {
  const resolvedPageFilters: ResolvedPageFilters = {};
  const valsByFilterIdDup = { ...p.valsByFilterId };

  const pageFiltersConfig = Object.values(p.filtersManifest.filtersById).map((filter) => {
    return filter.config;
  });

  pageFiltersConfig.forEach((filterConfig) => {
    // If the options source contains a placeholder, resolve it
    const filterConfigDup = resolveFilterOptionsSource({
      pageFilterConfig: filterConfig,
      selectedValsByFilterId: valsByFilterIdDup
    });

    // Update the value for the filter,
    // if the current value is no longer valid after placeholder resolution
    const defaultValue =
      filterConfigDup.default_value ||
      p.filtersManifest.optionSetsById[filterConfigDup.options_source].find(
        (option) => option.default
      )!.id;

    const possibleVals = p.filtersManifest.optionSetsById[
      filterConfigDup.options_source
    ].map((option) => option.id);
    let currentValue = p.valsByFilterId[filterConfigDup.id];
    if (currentValue && !possibleVals.includes(currentValue)) {
      currentValue = defaultValue;
      valsByFilterIdDup[filterConfigDup.id] = defaultValue;
    }

    // Add the resolved filter to the returned object
    const resolvedFilter: ResolvedPageFilter = {
      id: filterConfigDup.id,
      displayName: filterConfigDup.display_name,
      defaultValue,
      currentValue,
      options: p.filtersManifest.optionSetsById[filterConfigDup.options_source].map(
        (option) => ({
          id: option.id,
          displayName: option.display_name
        })
      )
    };

    resolvedPageFilters[filterConfigDup.id] = resolvedFilter;
  });

  return resolvedPageFilters;
}

/**
 * Replace any placeholders in the options source of a page filter.
 * For example, if the options source is "<COLOR>_<FINISH>_paint_options",
 * and the user's existing preferences are { color: 'red', finish: 'gloss' },
 * the resolved options source would be "red_gloss_paint_options".
 */
export function resolveFilterOptionsSource(p: {
  pageFilterConfig: PageFilterConfig;
  selectedValsByFilterId: Record<string, string>;
}): PageFilterConfig {
  // Make a copy in order to preserve the placeholders
  // for future use
  const filterConfigDup = { ...p.pageFilterConfig };

  // Replace any placeholder in the options source with the selected value
  if (GLOBAL_PLACEHOLDER_REGEX.test(filterConfigDup.options_source)) {
    // Resolve the options source
    filterConfigDup.options_source = filterConfigDup.options_source.replace(
      GLOBAL_PLACEHOLDER_REGEX,
      (_match: string, placeholder: string) => {
        return p.selectedValsByFilterId[placeholder.toLowerCase()];
      }
    );
  }

  return filterConfigDup;
}
