import { GLOBAL_PLACEHOLDER_REGEX } from '../schemas/regexes';
import { Frontmatter } from '../schemas/frontMatter';
import { PLACEHOLDER_REGEX } from '../schemas/regexes';
import {
  PageFiltersManifest,
  PageFiltersClientSideManifest,
} from '../schemas/pageFilters';
import { CustomizationConfig } from '../schemas/frontMatter';
import { CdocsCoreError } from '../schemas/errors';
import { ContentFiltersConfig } from '../schemas/contentFiltersConfig';

/**
 * A module responsible for combining ingested configuration data
 * into a single object that defines the filters available on a page,
 * validating the data in the process.
 */
export class FiltersManifestBuilder {
  /**
   * Convert a standard compile-time page filters manifest
   * to a lighter version to be used client-side.
   */
  static minifyManifest(manifest: PageFiltersManifest): PageFiltersClientSideManifest {
    const result: PageFiltersClientSideManifest = {
      filtersById: {},
      defaultValsByFilterId: { ...manifest.defaultValsByFilterId },
      optionGroupsById: { ...manifest.optionGroupsById },
    };

    Object.keys(manifest.filtersById).forEach((filterId) => {
      const filter = manifest.filtersById[filterId];
      result.filtersById[filterId] = {
        config: { ...filter.config },
        defaultValsByOptionGroupId: { ...filter.defaultValsByOptionGroupId },
      };
    });

    return result;
  }

  /**
   * Combine a page's frontmatter, the global glossary,
   * and the global filter config into a single object
   * that defines the filters available on the page.
   */
  static build(p: {
    frontmatter: Frontmatter;
    // filterOptionsConfig: FilterOptionsConfig;
    contentFiltersConfig: ContentFiltersConfig;
    // glossary: Glossary;
  }): PageFiltersManifest {
    // Create an empty manifest to populate
    const manifest: PageFiltersManifest = {
      filtersById: {},
      optionGroupsById: {},
      errors: [],
      defaultValsByFilterId: {},
    };

    // Return the empty manifest if the page has no filters
    if (!p.frontmatter.customizations) {
      return manifest;
    }

    // Collect default values for each filter, keyed by filter ID,
    // used to resolve placeholders in options sources
    manifest.defaultValsByFilterId = this.getDefaultValsByFilterId({
      contentFiltersConfig: p.contentFiltersConfig,
      customizations: p.frontmatter.customizations,
    });

    // Key the configs by filter ID, for convenient access during processing
    const filterConfigByFilterId: Record<string, CustomizationConfig> =
      p.frontmatter.customizations.reduce(
        (obj, filterConfig) => ({ ...obj, [filterConfig.filter_id]: filterConfig }),
        {},
      );

    // Keep track of the filter IDs that have been processed,
    // to ensure correct definition order in frontmatter
    const processedFilterIds: string[] = [];

    // Fill out the manifest for each filter,
    // in the order that the filters appeared in the frontmatter
    p.frontmatter.customizations.forEach((customization) => {
      // Validate the filter ID
      if (!p.contentFiltersConfig.filterGlossary[customization.filter_id]) {
        manifest.errors.push({
          message: `Unrecognized filter ID: The filter ID '${customization.filter_id}' is not in the glossary.`,
          searchTerm: customization.filter_id,
        });
      }

      // Get all possible options set IDs for this filter,
      // so each one can have its range of values processed
      // and the options set itself can be attached to the manifest
      let optionGroupIds: string[] = [];
      const hasDynamicOptions = customization.option_group_id.match(PLACEHOLDER_REGEX);

      if (hasDynamicOptions) {
        const { optionGroupIds: dynamicOptionGroupIds, errors } =
          this.buildDynamicOptionGroupIds({
            filterId: customization.filter_id,
            // filterOptionsConfig: p.filterOptionsConfig,
            contentFiltersConfig: p.contentFiltersConfig,
            filterConfigsByFilterId: filterConfigByFilterId,
            precedingFilterIds: processedFilterIds,
          });

        if (errors.length > 0) {
          manifest.errors.push(...errors);
        }

        optionGroupIds = dynamicOptionGroupIds;
      } else {
        optionGroupIds = [customization.option_group_id];
      }

      // Collect a default value for every possible options set ID,
      // along with all possible selected values for the filter
      const { defaultValsByOptionGroupId, possibleVals, errors } =
        this.getPossibleDefaultsAndSelectedValues({
          filterId: customization.filter_id,
          optionGroupIds: optionGroupIds,
          // glossary: p.glossary,
          contentFiltersConfig: p.contentFiltersConfig,
          // filterOptionsConfig: p.filterOptionsConfig,
        });

      if (errors.length > 0) {
        manifest.errors.push(...errors);
      }

      manifest.filtersById[customization.filter_id] = {
        config: customization,
        defaultValsByOptionGroupId,
        possibleVals: possibleVals,
      };

      processedFilterIds.push(customization.filter_id);
    });

    // Attach any options sets that were referenced by the filters
    Object.keys(manifest.filtersById).forEach((filterId) => {
      const filterManifest = manifest.filtersById[filterId];
      const optionGroupIds = Object.keys(filterManifest.defaultValsByOptionGroupId);
      optionGroupIds.forEach((optionGroupId) => {
        if (!manifest.optionGroupsById[optionGroupId]) {
          manifest.optionGroupsById[optionGroupId] =
            p.contentFiltersConfig.optionGroupGlossary[optionGroupId];
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
  static getPossibleDefaultsAndSelectedValues(p: {
    filterId: string;
    optionGroupIds: string[];
    // glossary: Glossary;
    // filterOptionsConfig: FilterOptionsConfig;
    contentFiltersConfig: ContentFiltersConfig;
  }): {
    defaultValsByOptionGroupId: Record<string, string>;
    possibleVals: string[];
    errors: CdocsCoreError[];
  } {
    // Populate the default value for each options set ID
    const defaultValsByOptionGroupId: Record<string, string> = {};
    const possibleVals: string[] = [];
    const errors: CdocsCoreError[] = [];

    p.optionGroupIds.forEach((optionGroupId) => {
      const optionGroup = p.contentFiltersConfig.optionGroupGlossary[optionGroupId];
      if (!optionGroup) {
        errors.push({
          message: `Invalid options source: The options source '${optionGroupId}', which is required for the filter ID '${p.filterId}', does not exist.`,
        });
        return;
      }

      optionGroup.forEach((option) => {
        if (!p.contentFiltersConfig.optionGlossary[option.id]) {
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
  static buildDynamicOptionGroupIds(p: {
    filterId: string;
    // filterOptionsConfig: FilterOptionsConfig;
    filterConfigsByFilterId: Record<string, CustomizationConfig>;
    precedingFilterIds: string[];
    contentFiltersConfig: ContentFiltersConfig;
  }): { optionGroupIds: string[]; errors: CdocsCoreError[] } {
    const filterConfig = p.filterConfigsByFilterId[p.filterId];

    let optionGroupIds: string[] = [];
    const errors: CdocsCoreError[] = [];

    const segments = filterConfig.option_group_id.split('_').map((segment) => {
      // build non-placeholder segment (array of solitary possible value)
      if (!segment.match(PLACEHOLDER_REGEX)) {
        return [segment];
      }

      // build placeholder segment (array of all possible values)
      const referencedFilterId = segment.slice(1, -1).toLowerCase();
      const referencedFilterConfig = p.filterConfigsByFilterId[referencedFilterId];
      if (!referencedFilterConfig || !p.precedingFilterIds.includes(referencedFilterId)) {
        errors.push({
          message: `Invalid placeholder: The placeholder ${segment} in the options source '${filterConfig.option_group_id}' refers to an unrecognized filter ID. The file frontmatter must contain a filter with the ID '${referencedFilterId}', and it must be defined before the filter with the ID ${filterConfig.filter_id}.`,
          searchTerm: filterConfig.option_group_id,
        });
        return [segment];
      }

      const referencedOptionGroup =
        p.contentFiltersConfig.optionGroupGlossary[
          referencedFilterConfig.option_group_id
        ];

      return referencedOptionGroup.map((option) => option.id);
    });

    // Only finish building the options set IDs if there are no errors,
    // to avoid generating invalid options set IDs
    if (errors.length === 0) {
      optionGroupIds = this.buildSnakeCaseCombinations(segments);
    } else {
      optionGroupIds = [];
    }

    return { optionGroupIds: optionGroupIds, errors };
  }

  /**
   * Derive the default values for each filter,
   * and return them keyed by filter ID.
   */
  static getDefaultValsByFilterId(p: {
    // filterOptionsConfig: FilterOptionsConfig;
    customizations: CustomizationConfig[];
    contentFiltersConfig: ContentFiltersConfig;
  }): Record<string, string> {
    const defaultValsByFilterId: Record<string, string> = {};

    // Process each entry in the frontmatter's customizations list
    for (const customization of p.customizations) {
      // Replace any placeholders in the options source
      const optionGroupId = customization.option_group_id;
      const resolvedOptionGroupId = optionGroupId.replace(
        GLOBAL_PLACEHOLDER_REGEX,
        (_match: string, placeholder: string) => {
          const value = defaultValsByFilterId[placeholder.toLowerCase()];
          return value || '';
        },
      );

      // Resolve the default option set for this filter
      const resolvedOptionGroup =
        p.contentFiltersConfig.optionGroupGlossary[resolvedOptionGroupId];

      if (resolvedOptionGroup) {
        defaultValsByFilterId[customization.filter_id] =
          customization.default_value ||
          resolvedOptionGroup.find((option) => option.default)!.id;
      }
    }

    return defaultValsByFilterId;
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
  static buildSnakeCaseCombinations(arr: any[], str: string = '', final: any[] = []) {
    if (arr.length > 1) {
      arr[0].forEach((segment: string) =>
        this.buildSnakeCaseCombinations(
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
}
