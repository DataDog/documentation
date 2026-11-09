import { GLOBAL_PLACEHOLDER_REGEX, PLACEHOLDER_REGEX } from '../../schemas/regexes.js';
import { Frontmatter, FilterConfig } from '../../schemas/frontmatter.js';
import { FiltersManifest, FiltersManifestSchema } from '../../schemas/pageFilters.js';
import { CdocsError } from '../../schemas/errors.js';
import { CustomizationConfig } from '../../schemas/customizationConfig.js';
import { v4 as uuidv4 } from 'uuid';
import { convertTraitValueToSemver } from '../shared/convertTraitValueToSemver.js';
import { getExcludedTraitValues } from '../shared/shouldDisplayFilter.js';

/**
 * Combine a page's frontmatter, the global glossary,
 * and the global filter config into a single object
 * that defines the filters available on the page.
 *
 * @param p.frontmatter The frontmatter for a page,
 * which has been obtained by parsing the page's Markdown
 * (or Markdoc, etc.) file.
 *
 * @param p.customizationConfig The global customization
 * configuration, which includes all traits, options, and
 * option groups that are available to the page.
 *
 * @returns A manifest that defines the filters available
 * on the page, including all data required to
 * render the filter and respond to user interactions.
 */
export function buildFiltersManifest(p: {
  frontmatter: Frontmatter;
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

  // Populate missing frontmatter values with defaults
  const filterConfigs = p.frontmatter.content_filters.map((rawFilterConfig) => {
    return {
      ...rawFilterConfig,
      label:
        rawFilterConfig.label ||
        p.customizationConfig.traitsById[rawFilterConfig.trait_id].label,
    };
  });

  // Collect default values for each filter, keyed by filter ID,
  // used to resolve placeholders in options sources
  manifest.defaultValsByTraitId = getDefaultValsByTraitId({
    customizationConfig: p.customizationConfig,
    filterConfigs,
  });

  // Key the configs by filter ID, for convenient access during processing
  const filterConfigByTraitId: Record<string, FilterConfig> = filterConfigs.reduce(
    (obj, filter) => ({ ...obj, [filter.trait_id]: filter }),
    {},
  );

  // Keep track of the trait IDs that have been processed,
  // to ensure correct definition order in frontmatter
  const processedTraitIds: string[] = [];

  // Fill out the manifest for each filter,
  // in the order that the filters appeared in the frontmatter
  filterConfigs.forEach((filter) => {
    // Validate show_if / hide_if trait references and option values
    const conditionalDisplayErrors = validateConditionalDisplayRefs({
      filterConfig: filter,
      customizationConfig: p.customizationConfig,
      filterConfigsByTraitId: filterConfigByTraitId,
    });
    if (conditionalDisplayErrors.length > 0) {
      manifest.errors.push(...conditionalDisplayErrors);
    }

    // Validate the filter ID
    if (!p.customizationConfig.traitsById[filter.trait_id]) {
      manifest.errors.push({
        message: `Unrecognized trait ID: The trait ID '${filter.trait_id}' is not in the glossary.`,
        data: { searchTerm: filter.trait_id },
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
          customizationConfig: p.customizationConfig,
          filterConfigsByTraitId: filterConfigByTraitId,
          precedingFilterIds: processedTraitIds,
        });

      if (errors.length > 0) {
        manifest.errors.push(...errors);
      }

      // Filter out option group IDs that correspond to excluded
      // parent trait values (from show_if / hide_if conditions)
      optionGroupIds = filterExcludedOptionGroupIds({
        filterConfig: filter,
        optionGroupIds: dynamicOptionGroupIds,
        filterConfigsByTraitId: filterConfigByTraitId,
        customizationConfig: p.customizationConfig,
      });
    } else {
      optionGroupIds = [filter.option_group_id];
    }

    // Collect a default value for every possible options set ID,
    // along with all possible selected values for the filter
    const { defaultValsByOptionGroupId, possibleVals, errors } =
      getPossibleDefaultsAndSelectedValues({
        traitId: filter.trait_id,
        optionGroupIds: optionGroupIds,
        customizationConfig: p.customizationConfig,
      });

    if (errors.length > 0) {
      manifest.errors.push(...errors);
    }

    manifest.filtersByTraitId[filter.trait_id] = {
      config: filter,
      defaultValsByOptionGroupId,
      possibleVals: possibleVals,
      optionLabelsByOptionId: Object.fromEntries(
        possibleVals.map((optionId) => [
          optionId,
          getOptionLabel({
            optionId,
            customizationConfig: p.customizationConfig,
          }),
        ]),
      ),
    };

    processedTraitIds.push(filter.trait_id);
  });

  // Attach any options sets that were referenced by the filters
  Object.keys(manifest.filtersByTraitId).forEach((traitId) => {
    const filterManifest = manifest.filtersByTraitId[traitId];
    const optionGroupIds = Object.keys(filterManifest.defaultValsByOptionGroupId);
    optionGroupIds.forEach((optionGroupId) => {
      if (!manifest.optionGroupsById[optionGroupId]) {
        if (p.customizationConfig.optionGroupsById[optionGroupId]) {
          manifest.optionGroupsById[optionGroupId] =
            p.customizationConfig.optionGroupsById[optionGroupId];
        }
      }
    });
  });

  // For traits with the semver type, verify that all possible values
  // are valid semver strings
  Object.keys(manifest.filtersByTraitId).forEach((traitId) => {
    const filterManifest = manifest.filtersByTraitId[traitId];
    const trait = p.customizationConfig.traitsById[traitId];
    if (trait.type === 'semver') {
      filterManifest.possibleVals.forEach((val) => {
        try {
          convertTraitValueToSemver(val);
        } catch (error) {
          manifest.errors.push({
            message: `Invalid semver option '${val}': The trait '${traitId}' is a semver trait, but its possible value '${val}' raises the following error when parsed as a semver: ${error}.`,
            data: { searchTerm: val },
          });
        }
      });
    }
  });

  FiltersManifestSchema.parse(manifest);
  return manifest;
}

/**
 * Look up the human-readable label for a given option ID
 * using the customization config.
 */
function getOptionLabel(p: {
  optionId: string;
  customizationConfig: CustomizationConfig;
}): string {
  const option = p.customizationConfig.optionsById[p.optionId];
  if (!option) {
    throw new Error(`Option ID '${p.optionId}' not found in customization config.`);
  }
  if (!option.label) {
    throw new Error(
      `Option ID '${p.optionId}' is missing a label in the customization config.`,
    );
  }
  return option.label;
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
    const optionGroup = p.customizationConfig.optionGroupsById[optionGroupId];
    if (!optionGroup) {
      errors.push({
        message: `Invalid options source: The options source '${optionGroupId}', which is required for the trait ID '${p.traitId}', does not exist.`,
      });
      return;
    }

    optionGroup.forEach((option) => {
      if (!p.customizationConfig.optionsById[option.id]) {
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
 * Filter out dynamic option group IDs that correspond to
 * excluded parent trait values (based on show_if / hide_if).
 *
 * Builds the set of excluded IDs by substituting each excluded
 * value into the template and expanding remaining placeholders,
 * then removes those IDs from the full list.
 */
function filterExcludedOptionGroupIds(p: {
  filterConfig: FilterConfig;
  optionGroupIds: string[];
  filterConfigsByTraitId: Record<string, FilterConfig>;
  customizationConfig: CustomizationConfig;
}): string[] {
  if (!p.filterConfig.show_if && !p.filterConfig.hide_if) {
    return p.optionGroupIds;
  }

  // Find all placeholders in the option_group_id
  const placeholders = p.filterConfig.option_group_id.match(GLOBAL_PLACEHOLDER_REGEX);
  if (!placeholders) {
    return p.optionGroupIds;
  }

  // Build the set of excluded option group IDs
  const excludedIds = new Set<string>();

  for (const placeholder of placeholders) {
    const parentTraitId = placeholder.slice(1, -1).toLowerCase();
    const parentFilterConfig = p.filterConfigsByTraitId[parentTraitId];
    if (!parentFilterConfig) continue;

    const parentOptionGroup =
      p.customizationConfig.optionGroupsById[parentFilterConfig.option_group_id];
    if (!parentOptionGroup) continue;

    const parentOptionIds = parentOptionGroup.map((opt) => opt.id);

    const excluded = getExcludedTraitValues({
      filterConfig: p.filterConfig,
      parentTraitId,
      parentOptionIds,
    });

    if (excluded.length === 0) continue;

    // For each excluded value, substitute it into the template
    // and expand remaining placeholders to get all excluded IDs
    for (const excludedValue of excluded) {
      const partialTemplate = p.filterConfig.option_group_id.replace(
        placeholder,
        excludedValue,
      );

      // If no more placeholders remain, this is a fully resolved excluded ID
      if (!PLACEHOLDER_REGEX.test(partialTemplate)) {
        excludedIds.add(partialTemplate);
        continue;
      }

      // Expand remaining placeholders to generate all excluded IDs
      // from this partial template
      for (const id of p.optionGroupIds) {
        // Check if this ID was generated from the excluded value
        // by testing if replacing the placeholder with the excluded value
        // in the template could produce this ID
        if (couldBeGeneratedFrom(id, partialTemplate, p)) {
          excludedIds.add(id);
        }
      }
    }
  }

  return p.optionGroupIds.filter((id) => !excludedIds.has(id));
}

/**
 * Check if an option group ID could have been generated
 * from a partially resolved template (one placeholder already
 * substituted, others still present).
 */
function couldBeGeneratedFrom(
  optionGroupId: string,
  partialTemplate: string,
  p: {
    filterConfigsByTraitId: Record<string, FilterConfig>;
    customizationConfig: CustomizationConfig;
  },
): boolean {
  // Build a regex from the partial template by replacing
  // remaining placeholders with patterns matching their possible values
  let regexStr = partialTemplate;

  const remainingPlaceholders = partialTemplate.match(GLOBAL_PLACEHOLDER_REGEX);
  if (!remainingPlaceholders) {
    return optionGroupId === partialTemplate;
  }

  for (const ph of remainingPlaceholders) {
    const traitId = ph.slice(1, -1).toLowerCase();
    const filterConfig = p.filterConfigsByTraitId[traitId];
    if (!filterConfig) return false;

    const optionGroup =
      p.customizationConfig.optionGroupsById[filterConfig.option_group_id];
    if (!optionGroup) return false;

    const possibleValues = optionGroup.map((opt) => opt.id).join('|');
    regexStr = regexStr.replace(ph, `(${possibleValues})`);
  }

  return new RegExp(`^${regexStr}$`).test(optionGroupId);
}

/**
 * For filters whose options source contains placeholders,
 * build all possible option group IDs that could be referenced
 * by the filter, based on the preceding filters.
 */
function buildDynamicOptionGroupIds(p: {
  traitId: string;
  filterConfigsByTraitId: Record<string, FilterConfig>;
  precedingFilterIds: string[];
  customizationConfig: CustomizationConfig;
}): { optionGroupIds: string[]; errors: CdocsError[] } {
  const filterConfig = p.filterConfigsByTraitId[p.traitId];

  let optionGroupIds: string[] = [];
  const errors: CdocsError[] = [];

  // Remove the placeholders from the option group ID,
  // since any underscores in the placeholder will cause unwanted segmentation.
  // The placeholders are stored for later use.
  let segmentableOptionGroupId = filterConfig.option_group_id;
  const placeholdersByUuid: Record<string, string> = {};

  const placeholders = filterConfig.option_group_id.match(GLOBAL_PLACEHOLDER_REGEX);

  placeholders?.forEach((placeholder) => {
    const uuid = uuidv4();
    placeholdersByUuid[uuid] = placeholder;
    segmentableOptionGroupId = segmentableOptionGroupId.replace(placeholder, uuid);
  });

  // A segment is an array of possible values for a single part of the option group ID.
  // The segment for a <COLOR> placeholder might be ['purple', 'green', 'blue'].
  // The segment for a non-placeholder is just its literal value in the option group ID, such as ['paint'].
  const segments = segmentableOptionGroupId.split('_').map((segment) => {
    // If it's not a placeholder, just return it
    // as a single-item array of possible values for that segment
    if (!Object.keys(placeholdersByUuid).includes(segment)) {
      return [segment];
    }

    // Otherwise, build the placeholder segment
    // (an array of all possible values for that placeholder)
    const placeholderText = placeholdersByUuid[segment]; // e.g. "<COLOR>"
    const referencedTraitId = placeholderText.slice(1, -1).toLowerCase(); // e.g. "color"

    // If the referenced trait has not been encountered in a filter config
    // so far, the placeholder is invalid
    const referencedFilterConfig = p.filterConfigsByTraitId[referencedTraitId];
    if (!referencedFilterConfig || !p.precedingFilterIds.includes(referencedTraitId)) {
      errors.push({
        message: `Invalid placeholder: The placeholder ${placeholderText} in the options source '${filterConfig.option_group_id}' refers to an unrecognized trait ID. The file frontmatter must contain a filter with the trait ID '${referencedTraitId}', and it must be defined before the filter with the trait ID ${filterConfig.trait_id}.`,
        data: { searchTerm: filterConfig.option_group_id },
      });
      return [segment];
    }

    // Return the current options for the referenced trait
    const referencedOptionGroup =
      p.customizationConfig.optionGroupsById[referencedFilterConfig.option_group_id];

    if (!referencedOptionGroup) {
      errors.push({
        message: `The option group ID '${referencedFilterConfig.option_group_id}' referenced by the placeholder ${segment} in the options source '${filterConfig.option_group_id}' does not exist.`,
        data: { searchTerm: filterConfig.option_group_id },
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
export function getDefaultValsByTraitId(p: {
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
      p.customizationConfig.optionGroupsById[resolvedOptionGroupId];

    if (resolvedOptionGroup) {
      defaultValsByTraitId[filter.trait_id] =
        filter.default_value || resolvedOptionGroup.find((option) => option.default)!.id;
    } else if (filter.show_if || filter.hide_if) {
      // For conditional filters, the resolved option group may not exist
      // when the default parent value leads to a hidden state.
      // No default is needed — resolveFilters will set isShown: false.
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
export function buildSnakeCaseCombinations(
  arr: string[][],
  str: string = '',
  final: string[] = [],
) {
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

/**
 * Validate that trait IDs and option values referenced
 * in a filter's show_if / hide_if conditions are valid.
 *
 * Checks:
 * - Each trait ID in conditions exists in the customization config
 * - Each trait ID in conditions has a corresponding filter on the page
 * - Each option value in conditions exists in the referenced trait's option group
 */
function validateConditionalDisplayRefs(p: {
  filterConfig: FilterConfig;
  customizationConfig: CustomizationConfig;
  filterConfigsByTraitId: Record<string, FilterConfig>;
}): CdocsError[] {
  const errors: CdocsError[] = [];

  // Check mutual exclusivity
  if (p.filterConfig.show_if && p.filterConfig.hide_if) {
    errors.push({
      message: `Filter '${p.filterConfig.trait_id}' has both show_if and hide_if; only one is allowed.`,
      data: { searchTerm: p.filterConfig.trait_id },
    });
    return errors;
  }

  const conditions = p.filterConfig.show_if || p.filterConfig.hide_if;
  if (!conditions) return [];

  const conditionType = p.filterConfig.show_if ? 'show_if' : 'hide_if';

  for (const condition of conditions) {
    for (const [traitId, values] of Object.entries(condition)) {
      // Check that the trait exists in the customization config
      if (!p.customizationConfig.traitsById[traitId]) {
        errors.push({
          message: `Invalid ${conditionType} reference: The trait '${traitId}' referenced in ${conditionType} for filter '${p.filterConfig.trait_id}' does not exist.`,
          data: { searchTerm: traitId },
        });
        continue;
      }

      // Check that the trait has a filter on the page
      const referencedFilterConfig = p.filterConfigsByTraitId[traitId];
      if (!referencedFilterConfig) {
        errors.push({
          message: `Invalid ${conditionType} reference: The trait '${traitId}' referenced in ${conditionType} for filter '${p.filterConfig.trait_id}' does not have a corresponding filter on this page.`,
          data: { searchTerm: traitId },
        });
        continue;
      }

      // Check that each option value exists in the trait's option group
      const optionGroup =
        p.customizationConfig.optionGroupsById[referencedFilterConfig.option_group_id];
      if (!optionGroup) continue; // Option group validation is handled elsewhere

      const validOptionIds = new Set(optionGroup.map((opt) => opt.id));
      for (const value of values) {
        if (!validOptionIds.has(value)) {
          errors.push({
            message: `Invalid ${conditionType} value: The value '${value}' for trait '${traitId}' in ${conditionType} for filter '${p.filterConfig.trait_id}' is not a valid option. Valid options are: ${[...validOptionIds].join(', ')}.`,
            data: { searchTerm: value },
          });
        }
      }
    }
  }

  return errors;
}
