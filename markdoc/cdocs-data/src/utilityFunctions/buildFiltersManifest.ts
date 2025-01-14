import { GLOBAL_PLACEHOLDER_REGEX } from '../schemas/regexes';
import { FrontMatter } from '../schemas/frontMatter';
import { PLACEHOLDER_REGEX } from '../schemas/regexes';
import { FiltersManifest, ClientSideFiltersManifest } from '../schemas/pageFilters';
import { FilterConfig } from '../schemas/frontMatter';
import { CdocsError } from '../schemas/errors';
import { CustomizationConfig } from '../schemas/customizationConfig';

/**
 * Combine a page's frontmatter, the global glossary,
 * and the global filter config into a single object
 * that defines the filters available on the page.
 */
export function buildFiltersManifest(p: {
  frontmatter: FrontMatter;
  customizationConfig: CustomizationConfig;
}): FiltersManifest {
  // Create an empty manifest to populate
  const manifest: FiltersManifest = {
    filtersByTraitId: {},
    optionGroupsById: {},
    errors: [],
    defaultValsByTraitId: {},
  };

  // Return the empty manifest if the page has no filters
  if (!p.frontmatter.content_filters) {
    return manifest;
  }

  // Collect default values for each filter, keyed by filter ID,
  // used to resolve placeholders in options sources
  manifest.defaultValsByTraitId = getDefaultValsByTraitId({
    customizationConfig: p.customizationConfig,
    filterConfigs: p.frontmatter.content_filters,
  });

  // Key the configs by filter ID, for convenient access during processing
  const filterConfigByTraitId: Record<string, FilterConfig> =
    p.frontmatter.content_filters.reduce(
      (obj, filter) => ({ ...obj, [filter.trait_id]: filter }),
      {},
    );

  // Keep track of the trait IDs that have been processed,
  // to ensure correct definition order in frontmatter
  const processedTraitIds: string[] = [];

  // Fill out the manifest for each filter,
  // in the order that the filters appeared in the frontmatter
  p.frontmatter.content_filters.forEach((filter) => {
    // Validate the filter ID
    if (!p.customizationConfig.traitGlossary[filter.trait_id]) {
      manifest.errors.push({
        message: `Unrecognized trait ID: The trait ID '${filter.trait_id}' is not in the glossary.`,
        searchTerm: filter.trait_id,
      });
    }

    // Get all possible options set IDs for this filter,
    // so each one can have its range of values processed
    // and the options set itself can be attached to the manifest
    let optionGroupIds: string[] = [];
    const hasDynamicOptions = filter.option_group_id.match(PLACEHOLDER_REGEX);

    if (hasDynamicOptions) {
      const { optionGroupIds: dynamicOptionGroupIds, errors } =
        buildDynamicOptionGroupIds({
          traitId: filter.trait_id,
          // filterOptionsConfig: p.filterOptionsConfig,
          customizationConfig: p.customizationConfig,
          filterConfigsByTraitId: filterConfigByTraitId,
          precedingFilterIds: processedTraitIds,
        });

      if (errors.length > 0) {
        manifest.errors.push(...errors);
      }

      optionGroupIds = dynamicOptionGroupIds;
    } else {
      optionGroupIds = [filter.option_group_id];
    }

    // Collect a default value for every possible options set ID,
    // along with all possible selected values for the filter
    const { defaultValsByOptionGroupId, possibleVals, errors } =
      getPossibleDefaultsAndSelectedValues({
        traitId: filter.trait_id,
        optionGroupIds: optionGroupIds,
        // glossary: p.glossary,
        customizationConfig: p.customizationConfig,
        // filterOptionsConfig: p.filterOptionsConfig,
      });

    if (errors.length > 0) {
      manifest.errors.push(...errors);
    }

    manifest.filtersByTraitId[filter.trait_id] = {
      config: filter,
      defaultValsByOptionGroupId,
      possibleVals: possibleVals,
    };

    processedTraitIds.push(filter.trait_id);
  });

  // Attach any options sets that were referenced by the filters
  Object.keys(manifest.filtersByTraitId).forEach((traitId) => {
    const filterManifest = manifest.filtersByTraitId[traitId];
    const optionGroupIds = Object.keys(filterManifest.defaultValsByOptionGroupId);
    optionGroupIds.forEach((optionGroupId) => {
      if (!manifest.optionGroupsById[optionGroupId]) {
        manifest.optionGroupsById[optionGroupId] =
          p.customizationConfig.optionGroupGlossary[optionGroupId];
      }
    });
  });

  return manifest;
}

/**
 * Collect all possible default values,
 * and all possible selected values,
 * for a given list of options set IDs.
 */
function getPossibleDefaultsAndSelectedValues(p: {
  traitId: string;
  optionGroupIds: string[];
  customizationConfig: CustomizationConfig;
}): {
  defaultValsByOptionGroupId: Record<string, string>;
  possibleVals: string[];
  errors: CdocsError[];
} {
  // Populate the default value for each options set ID
  const defaultValsByOptionGroupId: Record<string, string> = {};
  const possibleVals: string[] = [];
  const errors: CdocsError[] = [];

  p.optionGroupIds.forEach((optionGroupId) => {
    const optionGroup = p.customizationConfig.optionGroupGlossary[optionGroupId];
    if (!optionGroup) {
      errors.push({
        message: `Invalid options source: The options source '${optionGroupId}', which is required for the filter ID '${p.traitId}', does not exist.`,
      });
      return;
    }

    optionGroup.forEach((option) => {
      if (!p.customizationConfig.optionGlossary[option.id]) {
        errors.push({
          message: `Invalid option ID: The option ID '${option.id}' is not in the options glossary.`,
        });
      }

      if (option.default) {
        defaultValsByOptionGroupId[optionGroupId] = option.id;
      }

      possibleVals.push(option.id);
    });
  });

  return {
    defaultValsByOptionGroupId: defaultValsByOptionGroupId,
    possibleVals,
    errors,
  };
}

/**
 * For filters whose options source contains placeholders,
 * build all possible option group IDs that could be referenced
 * by the filter, based on the preceding filters.
 */
function buildDynamicOptionGroupIds(p: {
  traitId: string;
  // filterOptionsConfig: FilterOptionsConfig;
  filterConfigsByTraitId: Record<string, FilterConfig>;
  precedingFilterIds: string[];
  customizationConfig: CustomizationConfig;
}): { optionGroupIds: string[]; errors: CdocsError[] } {
  const filterConfig = p.filterConfigsByTraitId[p.traitId];

  let optionGroupIds: string[] = [];
  const errors: CdocsError[] = [];

  console.log('filterConfig', filterConfig);

  const segments = filterConfig.option_group_id.split('_').map((segment) => {
    // build non-placeholder segment (array of solitary possible value)
    if (!segment.match(PLACEHOLDER_REGEX)) {
      return [segment];
    }

    // build placeholder segment (array of all possible values)
    const referencedTraitId = segment.slice(1, -1).toLowerCase();
    const referencedFilterConfig = p.filterConfigsByTraitId[referencedTraitId];
    if (!referencedFilterConfig || !p.precedingFilterIds.includes(referencedTraitId)) {
      errors.push({
        message: `Invalid placeholder: The placeholder ${segment} in the options source '${filterConfig.option_group_id}' refers to an unrecognized trait ID. The file frontmatter must contain a filter with the trait ID '${referencedTraitId}', and it must be defined before the filter with the trait ID ${filterConfig.trait_id}.`,
        searchTerm: filterConfig.option_group_id,
      });
      return [segment];
    }

    const referencedOptionGroup =
      p.customizationConfig.optionGroupGlossary[referencedFilterConfig.option_group_id];

    if (!referencedOptionGroup) {
      errors.push({
        message: `The option group ID '${referencedFilterConfig.option_group_id}' referenced by the placeholder ${segment} in the options source '${filterConfig.option_group_id}' does not exist.`,
        searchTerm: filterConfig.option_group_id,
      });
      return [segment];
    }

    return referencedOptionGroup.map((option) => option.id);
  });

  // Only finish building the options set IDs if there are no errors,
  // to avoid generating invalid options set IDs
  if (errors.length === 0) {
    optionGroupIds = buildSnakeCaseCombinations(segments);
  } else {
    optionGroupIds = [];
  }

  return { optionGroupIds: optionGroupIds, errors };
}

/**
 * Derive the default values for each filter,
 * and return them keyed by filter ID.
 */
function getDefaultValsByTraitId(p: {
  // filterOptionsConfig: FilterOptionsConfig;
  filterConfigs: FilterConfig[];
  customizationConfig: CustomizationConfig;
}): Record<string, string> {
  const defaultValsByTraitId: Record<string, string> = {};

  // Process each entry in the frontmatter's filters list
  for (const filter of p.filterConfigs) {
    // Replace any placeholders in the options source
    const optionGroupId = filter.option_group_id;
    const resolvedOptionGroupId = optionGroupId.replace(
      GLOBAL_PLACEHOLDER_REGEX,
      (_match: string, placeholder: string) => {
        const value = defaultValsByTraitId[placeholder.toLowerCase()];
        return value || '';
      },
    );

    // Resolve the default option set for this filter
    const resolvedOptionGroup =
      p.customizationConfig.optionGroupGlossary[resolvedOptionGroupId];

    if (resolvedOptionGroup) {
      defaultValsByTraitId[filter.trait_id] =
        filter.default_value || resolvedOptionGroup.find((option) => option.default)!.id;
    }
  }

  return defaultValsByTraitId;
}

/**
 * When given arrays of the segments of a potential snake_case string,
 * generate all possible combinations of the segments in snake_case.
 *
 * @param {any[]} arr An array of arrays of strings. Each array represents
 * a set of possible values for a segment of a snake_case string.
 * @returns {string[]} An array of all possible snake_case combinations.
 *
 * @example
 * const segments = [['red', 'blue'], ['gloss', 'matte'], ['paint'], ['options']];
 * FiltersManifestBuilder.buildSnakeCaseCombinations(segments);
 * // returns ['red_gloss_paint_options', 'red_matte_paint_options', 'blue_gloss_paint_options', 'blue_matte_paint_options']
 */
function buildSnakeCaseCombinations(arr: any[], str: string = '', final: any[] = []) {
  if (arr.length > 1) {
    arr[0].forEach((segment: string) =>
      buildSnakeCaseCombinations(
        arr.slice(1),
        str + (str === '' ? '' : '_') + segment,
        final,
      ),
    );
  } else {
    arr[0].forEach((segment: string) =>
      final.push(str + (str === '' ? '' : '_') + segment),
    );
  }
  return final;
}
