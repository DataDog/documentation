/**
 * Functions for resolving filters config into filters content
 * (such as options displayed in the filtering UI).
 * The resolution steps must run every time the user
 * updates their filters.
 *
 * Examples:
 * - Replace placeholders in an options source with actual values.
 * - Replace a previously chosen value with the default value
 *   if the chosen value is not valid.
 *
 * Organized as isolated functions to control bundle size.
 * This code must run on both the server and the client.
 * It cannot contain or import anything containing features unique to Node
 * (for example, file system access), or esbuild will fail to bundle it
 * for the client.
 */

import { GLOBAL_PLACEHOLDER_REGEX } from '../schemas/regexes';
import {
  ResolvedPageFilters,
  ResolvedPageFilter,
  PageFiltersManifest
} from '../schemas/pageFilters';
import {
  PageFilterConfig,
  MinifiedPageFiltersConfig,
  MinifiedPageFilterConfig
} from '../schemas/yaml/frontMatter';
import {
  MinifiedFilterOptionsConfig,
  FilterOptionsConfig
} from '../schemas/yaml/filterOptions';

/**
 * Resolve the page filters object that is used
 * to populate the content filtering UI (AKA the filter selector),
 * replacing any placeholders with actual values.
 */
export function resolvePageFilters(p: {
  valsByFilterId: Record<string, string>;
  filtersManifest: PageFiltersManifest;
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
      valsByFilterId: valsByFilterIdDup
    });

    // Update the value for the filter,
    // if the current value is no longer valid after placeholder resolution
    const defaultValue =
      filterConfigDup.default_value ||
      p.filtersManifest.optionSetsById[filterConfigDup.options_source].find(
        (option) => option.default
      )!.id;

    const possibleValues = p.filtersManifest.optionSetsById[
      filterConfigDup.options_source
    ].map((option) => option.id);
    let currentValue = p.valsByFilterId[filterConfigDup.id];
    if (currentValue && !possibleValues.includes(currentValue)) {
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

export function resolveMinifiedPageFilters(p: {
  pageFiltersConfig: MinifiedPageFiltersConfig;
  filterOptionsConfig: MinifiedFilterOptionsConfig;
  valsByFilterId: Record<string, string>;
}): ResolvedPageFilters {
  const resolvedPageFilters: ResolvedPageFilters = {};
  // Make a copy of the selected values,
  // so we can update a value to the default
  // if the incoming value is invalid
  const valsByFilterIdDup = { ...p.valsByFilterId };

  p.pageFiltersConfig.forEach((filterConfig) => {
    // If the options source contains a placeholder, resolve it
    const filterConfigDup = resolveMinifiedFilterOptionsSource({
      pageFilterConfig: filterConfig,
      valsByFilterId: valsByFilterIdDup
    });

    // Update the value for the filter,
    // if the current value is no longer valid after placeholder resolution
    const defaultValue =
      filterConfigDup.d ||
      p.filterOptionsConfig[filterConfigDup.o].find((option) => option.d)!.i;

    const possibleValues = p.filterOptionsConfig[filterConfigDup.o].map(
      (option) => option.i
    );
    let currentValue = p.valsByFilterId[filterConfigDup.i];
    if (currentValue && !possibleValues.includes(currentValue)) {
      currentValue = defaultValue;
      valsByFilterIdDup[filterConfigDup.i] = defaultValue;
    }

    // Add the resolved filter to the returned object
    const resolvedFilter: ResolvedPageFilter = {
      id: filterConfigDup.i,
      displayName: filterConfigDup.n,
      defaultValue,
      currentValue,
      options: p.filterOptionsConfig[filterConfigDup.o].map((option) => ({
        id: option.i,
        displayName: option.n
      }))
    };

    resolvedPageFilters[filterConfigDup.i] = resolvedFilter;
  });

  return resolvedPageFilters;
}

export function resolveMinifiedFilterOptionsSource(p: {
  pageFilterConfig: MinifiedPageFilterConfig;
  valsByFilterId: Record<string, string>;
}): MinifiedPageFilterConfig {
  const filterConfigDup = { ...p.pageFilterConfig };

  // Replace any placeholder in the options source with the selected value
  if (GLOBAL_PLACEHOLDER_REGEX.test(filterConfigDup.o)) {
    // Resolve the options source
    filterConfigDup.o = filterConfigDup.o.replace(
      GLOBAL_PLACEHOLDER_REGEX,
      (_match: string, placeholder: string) => {
        return p.valsByFilterId[placeholder.toLowerCase()];
      }
    );
  }

  return filterConfigDup;
}

/**
 * Resolve any placeholders in the options source of a page filter.
 * For example, if the options source is "<COLOR>_<FINISH>_paint_options",
 * and the values of the dependencies are { color: 'red', finish: 'gloss' },
 * the resolved options source would be "red_gloss_paint_options".
 *
 * @param p The page filter configuration object and the selected values by filter ID.
 * @returns A copy of the page filter configuration object with any placeholders in the options source resolved.
 */
export function resolveFilterOptionsSource(p: {
  pageFilterConfig: PageFilterConfig;
  valsByFilterId: Record<string, string>;
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
        return p.valsByFilterId[placeholder.toLowerCase()];
      }
    );
  }

  return filterConfigDup;
}
