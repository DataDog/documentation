/**
 * A module responsible for finding, parsing, and validating
 * configurations that define the filter settings available to users,
 * the default values for each filter, and so on.
 */

import {
  MinifiedFilterOptionsConfig,
  MinifiedFilterOptionsConfigSchema,
  FilterOptionsConfig,
  FilterOptionsConfigSchema,
  RawFilterOptionsConfig,
  RawFilterOptionsConfigSchema
} from '../schemas/yaml/filterOptions';
import { FileNavigator } from './FileNavigator';
import { GLOBAL_PLACEHOLDER_REGEX } from '../schemas/regexes';
import {
  Frontmatter,
  MinifiedPageFilterConfig,
  MinifiedPageFiltersConfig,
  MinifiedPageFiltersConfigSchema,
  PageFiltersConfig
} from '../schemas/yaml/frontMatter';
import {
  Allowlist,
  AllowlistSchema,
  AllowlistConfigSchema,
  AllowlistConfigEntry
} from '../schemas/yaml/allowlist';
import fs from 'fs';
import yaml from 'js-yaml';
import { PLACEHOLDER_REGEX } from '../schemas/regexes';
import { PageFiltersManifest } from '../schemas/pageFilters';
import { PageFilterConfig } from '../schemas/yaml/frontMatter';

/**
 * A module responsible for all data ingestion from
 * the YAML files that define the available filters
 * and their options.
 */
export class YamlConfigParser {
  /**
   * Combine a page's frontmatter, the global allowlist,
   * and the global filter config into a single object
   * that defines the filters available on the page.
   */
  static buildPageFiltersManifest(p: {
    frontmatter: Frontmatter;
    filterOptionsConfig: FilterOptionsConfig;
    allowlist: Allowlist;
  }): PageFiltersManifest {
    // Create an empty manifest to populate
    const manifest: PageFiltersManifest = {
      filtersById: {},
      optionSetsById: {},
      errors: [],
      defaultValsByFilterId: {}
    };

    // Return the empty manifest if the page has no filters
    if (!p.frontmatter.page_filters) {
      return manifest;
    }

    // Process each entry in the frontmatter's page_filters list
    for (const fmFilterConfig of p.frontmatter.page_filters) {
      // Replace any placeholders in the options source
      const optionsSetId = fmFilterConfig.options_source;
      const resolvedOptionsSetId = optionsSetId.replace(
        GLOBAL_PLACEHOLDER_REGEX,
        (_match: string, placeholder: string) => {
          const value = manifest.defaultValsByFilterId[placeholder.toLowerCase()];
          return value || '';
        }
      );

      const resolvedOptionSet = p.filterOptionsConfig[resolvedOptionsSetId];

      if (resolvedOptionSet) {
        manifest.defaultValsByFilterId[fmFilterConfig.id] =
          fmFilterConfig.default_value ||
          resolvedOptionSet.find((option) => option.default)!.id;
      }
    }

    // Key the configs by filter ID first, for convenience
    const filterConfigByFilterId: Record<string, PageFilterConfig> =
      p.frontmatter.page_filters.reduce(
        (obj, filterConfig) => ({ ...obj, [filterConfig.id]: filterConfig }),
        {}
      );

    // Keep track of the filter IDs that have been processed,
    // to ensure correct definition order in frontmatter
    const processedFilterIds: string[] = [];

    // Fill out the manifest in the order that the filters
    // appeared in the frontmatter
    p.frontmatter.page_filters.forEach((pageFilterConfig) => {
      // Validate the filter ID
      if (!p.allowlist.filtersById[pageFilterConfig.id]) {
        manifest.errors.push(
          `Unrecognized filter ID: The filter ID '${pageFilterConfig.id}' is not in the allowlist.`
        );
      }

      const hasDynamicOptions = pageFilterConfig.options_source.match(PLACEHOLDER_REGEX);

      // Get the options set ID for this filter,
      // or all possible options set IDs if the filter's options_source
      // contains placeholders
      let optionsSetIds: string[] = [];

      if (hasDynamicOptions) {
        let hasFatalError = false;

        // break the options source ID into segments
        // that can be used to generate all possible options set IDs
        const segments = pageFilterConfig.options_source.split('_').map((segment) => {
          // build non-placeholder segment (array of solitary possible value)
          if (!segment.match(PLACEHOLDER_REGEX)) {
            return [segment];
          }

          // build placeholder segment (array of all possible values)
          const referencedFilterId = segment.slice(1, -1).toLowerCase();
          const referencedFilterConfig = filterConfigByFilterId[referencedFilterId];
          if (
            !referencedFilterConfig ||
            !processedFilterIds.includes(referencedFilterId)
          ) {
            manifest.errors.push(
              `Invalid placeholder: The placeholder ${segment} in the options source '${pageFilterConfig.options_source}' refers to an unrecognized filter ID. The file frontmatter must contain a filter with the ID '${referencedFilterId}', and it must be defined before the filter with the ID ${pageFilterConfig.id}.`
            );
            hasFatalError = true;
            return [segment];
          }

          const referencedOptionsSet =
            p.filterOptionsConfig[referencedFilterConfig.options_source];
          return referencedOptionsSet.map((option) => option.id);
        });

        if (!hasFatalError) {
          optionsSetIds = this.buildSnakeCaseCombinations(segments);
        } else {
          optionsSetIds = [];
        }
      } else {
        optionsSetIds = [pageFilterConfig.options_source];
      }

      // Populate the default value for each options set ID
      const defaultValuesByOptionsSetId: Record<string, string> = {};
      const possibleValues: string[] = [];

      optionsSetIds.forEach((optionsSetId) => {
        const optionsSet = p.filterOptionsConfig[optionsSetId];
        if (!optionsSet) {
          manifest.errors.push(
            `Invalid options source: The options source '${optionsSetId}', which is required for the filter ID '${pageFilterConfig.id}', does not exist.`
          );
          return;
        }

        optionsSet.forEach((option) => {
          if (!p.allowlist.optionsById[option.id]) {
            manifest.errors.push(
              `Invalid option ID: The option ID '${option.id}' is not in the options allowlist.`
            );
          }

          if (option.default) {
            defaultValuesByOptionsSetId[optionsSetId] = option.id;
          }

          possibleValues.push(option.id);
        });
      });

      manifest.filtersById[pageFilterConfig.id] = {
        config: pageFilterConfig,
        defaultValuesByOptionsSetId,
        possibleValues
      };

      processedFilterIds.push(pageFilterConfig.id);
    });

    // Add any options sets that were referenced by the filters
    Object.keys(manifest.filtersById).forEach((filterId) => {
      const filterManifest = manifest.filtersById[filterId];
      const optionsSetIds = Object.keys(filterManifest.defaultValuesByOptionsSetId);
      optionsSetIds.forEach((optionsSetId) => {
        if (!manifest.optionSetsById[optionsSetId]) {
          manifest.optionSetsById[optionsSetId] = p.filterOptionsConfig[optionsSetId];
        }
      });
    });

    return manifest;
  }

  /**
   * For a given language directory, load the filter options
   * associated with that language, and validate the object as a whole.
   */
  static loadFiltersConfigFromLangDir(p: {
    dir: string;
    allowlist: Allowlist;
  }): Readonly<FilterOptionsConfig> {
    const optionSetsDir = `${p.dir}/filter_option_sets`;
    const filterOptionsConfig = this.loadFilterOptionsFromDir(optionSetsDir);

    Object.values(filterOptionsConfig).forEach((optionsList) => {
      const displayNamesByAllowedOptionId: Record<string, string> = Object.values(
        p.allowlist.optionsById
      ).reduce((acc, entry) => ({ ...acc, [entry.id]: entry.display_name }), {});

      optionsList.forEach((option) => {
        const defaultDisplayName = displayNamesByAllowedOptionId[option.id];
        if (!defaultDisplayName) {
          throw new Error(
            `The option ID '${option.id}' does not exist in the options allowlist.`
          );
        }
        if (!option.display_name) {
          option.display_name = defaultDisplayName;
        }
      });
    });

    return FilterOptionsConfigSchema.parse(filterOptionsConfig);
  }

  /**
   * Load all of the allowlists for all languages,
   * keyed by language code.
   */
  static loadAllowlistsByLang(p: {
    filtersConfigDir: string;
    langs: string[];
    defaultLang?: string;
  }): Record<string, Allowlist> {
    const defaultLang = p.defaultLang || 'en';
    const allowlistsByLang: Record<string, Allowlist> = {};

    const defaultAllowlist = this.loadAllowlistFromLangDir(
      `${p.filtersConfigDir}/${defaultLang}`
    );

    p.langs.forEach((lang) => {
      if (lang === defaultLang) {
        allowlistsByLang[lang] = defaultAllowlist;
        return;
      }
      const langDir = `${p.filtersConfigDir}/${lang}`;
      const translatedAllowlist = this.loadAllowlistFromLangDir(langDir);

      // merge the translated allowlist with the default allowlist
      const mergedAllowlist: Allowlist = {
        filtersById: {
          ...defaultAllowlist.filtersById,
          ...translatedAllowlist.filtersById
        },
        optionsById: {
          ...defaultAllowlist.optionsById,
          ...translatedAllowlist.optionsById
        }
      };

      allowlistsByLang[lang] = mergedAllowlist;
    });

    return allowlistsByLang;
  }

  /**
   * For a given language, load the filter and options allowlists.
   */
  static loadAllowlistFromLangDir(dir: string): Allowlist {
    const result: Allowlist = { filtersById: {}, optionsById: {} };

    // Load and validate the filters allowlist
    const filtersAllowlistFilePath = `${dir}/allowlists/filter_ids.yaml`;
    try {
      const filtersAllowlistConfigStr = fs.readFileSync(filtersAllowlistFilePath, 'utf8');
      const filtersAllowlist = AllowlistConfigSchema.parse(
        yaml.load(filtersAllowlistConfigStr)
      );
      result.filtersById = filtersAllowlist.allowed.reduce<
        Record<string, AllowlistConfigEntry>
      >((acc, entry) => {
        acc[entry.id] = entry;
        return acc;
      }, {});
    } catch (e) {
      // If the file is not found, use an empty list
      if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
        result.filtersById = {};
      } else {
        throw e;
      }
    }

    // Load and validate the options allowlist
    const optionsAllowlistFilePath = `${dir}/allowlists/filter_options.yaml`;
    try {
      const optionsAllowlistStr = fs.readFileSync(optionsAllowlistFilePath, 'utf8');
      const optionsAllowlist = AllowlistConfigSchema.parse(
        yaml.load(optionsAllowlistStr)
      );
      result.optionsById = optionsAllowlist.allowed.reduce<
        Record<string, AllowlistConfigEntry>
      >((acc, entry) => {
        acc[entry.id] = entry;
        return acc;
      }, {});
    } catch (e) {
      // If the file is not found, use an empty list
      if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
        result.optionsById = {};
      } else {
        throw e;
      }
    }

    return result;
  }

  /**
   * Load all of the filter options files in a directory
   * into a single object, and validate the object as a whole.
   * For example, duplicate options set IDs are not allowed.
   *
   * @param dir The directory containing the filter options YAML files.
   * @returns A read-only FilterOptionsConfig object.
   */
  private static loadFilterOptionsFromDir(dir: string): RawFilterOptionsConfig {
    const filenames = FileNavigator.findInDir(dir, /\.ya?ml$/);
    const rawFilterOptions: RawFilterOptionsConfig = {};

    filenames.forEach((filename) => {
      const filterOptionsConfig = RawFilterOptionsConfigSchema.parse(
        this.loadFiltersYamlFromStr(filename)
      );
      for (const [optionsListId, optionsList] of Object.entries(filterOptionsConfig)) {
        // Verify that no duplicate options set IDs exist
        if (rawFilterOptions[optionsListId]) {
          throw new Error(
            `Duplicate options list ID '${optionsListId}' found in file ${filename}`
          );
        }
        rawFilterOptions[optionsListId] = optionsList;
      }
    });

    return rawFilterOptions;
  }

  /**
   * Load a filter options configuration from a YAML file.
   *
   * @param yamlFile The path to a YAML file containing filter options.
   * @returns A read-only FilterOptionsConfig object.
   */
  static loadFiltersYamlFromStr(yamlFile: string): RawFilterOptionsConfig {
    const yamlFileContent = fs.readFileSync(yamlFile, 'utf8');
    const parsedYaml = yaml.load(yamlFileContent);
    return RawFilterOptionsConfigSchema.parse(parsedYaml);
  }

  /**
   * For a given page, derive the default values for each filter
   * from the frontmatter and the filter options configuration.
   *
   * This is useful for rendering the default version of a page,
   * before the user has interacted with any filter controls.
   */
  static getDefaultValuesByFilterId(
    frontmatter: Frontmatter,
    filterOptionsConfig: FilterOptionsConfig
  ): Record<string, string> {
    if (!frontmatter.page_filters) {
      return {};
    }
    const defaultValuesByFilterId: Record<string, string> = {};

    for (const fmFilterConfig of frontmatter.page_filters) {
      // replace placeholders
      const optionsSetId = fmFilterConfig.options_source;
      const resolvedOptionsSetId = optionsSetId.replace(
        GLOBAL_PLACEHOLDER_REGEX,
        (_match: string, placeholder: string) => {
          const value = defaultValuesByFilterId[placeholder.toLowerCase()];
          return value;
        }
      );

      defaultValuesByFilterId[fmFilterConfig.id] =
        fmFilterConfig.default_value ||
        filterOptionsConfig[resolvedOptionsSetId].find((option) => option.default)!.id;
    }

    return defaultValuesByFilterId;
  }

  /**
   * Narrow a FilterOptionsConfig object to only include the options
   * that are relevant to a specific page, based on the page's frontmatter.
   * Verify that all placeholders refer to valid filter IDs,
   * and that all potential options sources generated
   * by those placeholders are valid.
   *
   * @param frontmatter A Frontmatter object, parsed from the front matter of an .mdoc file.
   * @param filterOptionsConfig A FilterOptionsConfig object, parsed
   * from the filter options YAML files.
   */
  static getFilterOptionsForPage(
    frontmatter: Frontmatter,
    filterOptionsConfig: FilterOptionsConfig
  ): Readonly<FilterOptionsConfig> {
    const filterOptionsConfigForPage: FilterOptionsConfig = {};

    if (!frontmatter.page_filters) {
      return filterOptionsConfigForPage;
    }

    this.validatePlaceholderReferences(frontmatter);

    // Verify that all possible options_source IDs are valid

    const validValuesByOptionsSetId: Record<string, string[]> = {};
    const optionsSetIdsByFilterId: Record<string, string> = {};

    for (const fmFilterConfig of frontmatter.page_filters) {
      const placeholderMatches = fmFilterConfig.options_source.match(
        GLOBAL_PLACEHOLDER_REGEX
      );

      // if this options_source does not contain any placeholders,
      // it should be a valid options set ID
      if (!placeholderMatches) {
        if (!filterOptionsConfig[fmFilterConfig.options_source]) {
          throw new Error(
            `Invalid options_source found in page_filters: ${fmFilterConfig.options_source}`
          );
        }
        validValuesByOptionsSetId[fmFilterConfig.options_source] = filterOptionsConfig[
          fmFilterConfig.options_source
        ].map((option) => option.id);

        optionsSetIdsByFilterId[fmFilterConfig.id] = fmFilterConfig.options_source;

        // add this options source to the filterOptionsConfigForPage object
        filterOptionsConfigForPage[fmFilterConfig.options_source] =
          filterOptionsConfig[fmFilterConfig.options_source];

        continue;
      }

      // if placeholders are contained,
      // generate a list of all possible options sources
      const optionsSetIdSegments = fmFilterConfig.options_source.split('_');
      const possibleSegmentValues: Array<Array<string>> = [];

      for (const segment of optionsSetIdSegments) {
        if (segment.match(PLACEHOLDER_REGEX)) {
          const referencedFilterId = segment.slice(1, -1).toLowerCase();
          const referencedOptionsSetId = optionsSetIdsByFilterId[referencedFilterId];
          possibleSegmentValues.push(validValuesByOptionsSetId[referencedOptionsSetId]);
        } else {
          possibleSegmentValues.push([segment]);
        }
      }

      const potentialOptionsSetIds =
        this.buildSnakeCaseCombinations(possibleSegmentValues);

      // validate that all potential options set IDs are valid
      for (const potentialOptionsSetId of potentialOptionsSetIds) {
        if (!filterOptionsConfig[potentialOptionsSetId]) {
          throw new Error(
            `Invalid options_source could be populated by the placeholders in ${fmFilterConfig.options_source}: An options source with the ID '${potentialOptionsSetId}' does not exist.`
          );
        }
        validValuesByOptionsSetId[potentialOptionsSetId] = filterOptionsConfig[
          potentialOptionsSetId
        ].map((option) => option.id);

        // add this options source to the filterOptionsConfigForPage object
        filterOptionsConfigForPage[potentialOptionsSetId] =
          filterOptionsConfig[potentialOptionsSetId];
      }
    }

    return filterOptionsConfigForPage;
  }

  /**
   * Verify that each placeholder refers to a valid page filter ID.
   *
   * For example, if there is a <COLOR> placeholder, there must
   * also be a page filter with the ID 'color', and it must
   * have been defined in the frontmatter before the placeholder is referenced.
   *
   * @param frontmatter A Frontmatter object.
   */
  static validatePlaceholderReferences(frontmatter: Frontmatter): void {
    if (!frontmatter.page_filters) {
      return;
    }

    const validFilterIds: string[] = [];

    for (const fmFilterConfig of frontmatter.page_filters) {
      const placeholderMatches =
        fmFilterConfig.options_source.match(GLOBAL_PLACEHOLDER_REGEX) || [];

      for (const placeholder of placeholderMatches) {
        const match = placeholder.match(PLACEHOLDER_REGEX);
        if (!match) {
          throw new Error(
            `Invalid placeholder found in options_source: ${fmFilterConfig.options_source}`
          );
        }

        const referencedId = match[1].toLowerCase();
        if (!validFilterIds.includes(referencedId)) {
          throw new Error(
            `Placeholder ${match[0]} does not refer to a valid page filter ID. Make sure that '${referencedId}' is spelled correctly, and that the '${referencedId}' parameter is defined in the page_filters list before it is referenced in ${match[0]}.`
          );
        }
      }

      // add this filter ID to the list of valid filter IDs
      // that may be referenced by placeholders later in the list
      validFilterIds.push(fmFilterConfig.id);
    }
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
   * YamlConfigParser.buildSnakeCaseCombinations(segments);
   * // returns ['red_gloss_paint_options', 'red_matte_paint_options', 'blue_gloss_paint_options', 'blue_matte_paint_options']
   */
  static buildSnakeCaseCombinations(arr: any[], str: string = '', final: any[] = []) {
    if (arr.length > 1) {
      arr[0].forEach((segment: string) =>
        this.buildSnakeCaseCombinations(
          arr.slice(1),
          str + (str === '' ? '' : '_') + segment,
          final
        )
      );
    } else {
      arr[0].forEach((segment: string) =>
        final.push(str + (str === '' ? '' : '_') + segment)
      );
    }
    return final;
  }

  /**
   * Shorten the keys in a FilterOptionsConfig object to save space
   * when storing the object inline at the bottom of an .md file.
   */
  static minifyFilterOptionsConfig(
    filterOptionsConfig: FilterOptionsConfig
  ): MinifiedFilterOptionsConfig {
    const minifiedConfig: MinifiedFilterOptionsConfig = {};
    for (const [optionsListId, optionsList] of Object.entries(filterOptionsConfig)) {
      minifiedConfig[optionsListId] = optionsList.map((option) => ({
        n: option.display_name,
        d: option.default,
        i: option.id
      }));
    }
    MinifiedFilterOptionsConfigSchema.parse(minifiedConfig);
    return minifiedConfig;
  }

  /**
   * Shorten the keys in a PageFiltersConfig object to save space
   * when storing the object inline at the bottom of an
   * .md file.
   */
  static minifyPageFiltersConfig(
    pageFiltersConfig: PageFiltersConfig
  ): MinifiedPageFiltersConfig {
    const minifiedConfig: Array<MinifiedPageFilterConfig> = [];
    pageFiltersConfig.forEach((config) => {
      minifiedConfig.push({
        n: config.display_name,
        i: config.id,
        o: config.options_source,
        d: config.default_value
      });
    });
    MinifiedPageFiltersConfigSchema.parse(minifiedConfig);
    return minifiedConfig;
  }
}
