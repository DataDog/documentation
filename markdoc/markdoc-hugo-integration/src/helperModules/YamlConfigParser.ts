/**
 * A module responsible for finding, parsing, and validating
 * configurations that define the preference settings available to users,
 * the default values for each preference, and so on.
 */

import {
  MinifiedPrefOptionsConfig,
  MinifiedPrefOptionsConfigSchema,
  PrefOptionsConfig,
  PrefOptionsConfigSchema,
  RawPrefOptionsConfig,
  RawPrefOptionsConfigSchema
} from '../schemas/yaml/prefOptions';
import { FileNavigator } from './FileNavigator';
import { GLOBAL_PLACEHOLDER_REGEX } from '../schemas/regexes';
import {
  Frontmatter,
  MinifiedPagePrefConfig,
  MinifiedPagePrefsConfig,
  MinifiedPagePrefsConfigSchema,
  PagePrefsConfig
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
import { PagePrefsManifest } from '../schemas/pagePrefs';
import { PagePrefConfig } from '../schemas/yaml/frontMatter';

/**
 * A module responsible for all data ingestion from
 * the YAML files that define the available preferences
 * and their options.
 */
export class YamlConfigParser {
  /**
   * Combine a page's frontmatter, the global allowlist,
   * and the global preference config into a single object
   * that defines the preferences available on the page.
   */
  static buildPagePrefsManifest(p: {
    frontmatter: Frontmatter;
    prefOptionsConfig: PrefOptionsConfig;
    allowlist: Allowlist;
  }): PagePrefsManifest {
    // Create an empty manifest to populate
    const manifest: PagePrefsManifest = {
      prefsById: {},
      optionSetsById: {},
      errors: [],
      defaultValsByPrefId: {}
    };

    // Return the empty manifest if the page has no prefs
    if (!p.frontmatter.page_preferences) {
      return manifest;
    }

    // Process each entry in the frontmatter's page_preferences list
    for (const fmPrefConfig of p.frontmatter.page_preferences) {
      // Replace any placeholders in the options source
      const optionsSetId = fmPrefConfig.options_source;
      const resolvedOptionsSetId = optionsSetId.replace(
        GLOBAL_PLACEHOLDER_REGEX,
        (_match: string, placeholder: string) => {
          const value = manifest.defaultValsByPrefId[placeholder.toLowerCase()];
          return value || '';
        }
      );

      const resolvedOptionSet = p.prefOptionsConfig[resolvedOptionsSetId];

      if (resolvedOptionSet) {
        manifest.defaultValsByPrefId[fmPrefConfig.id] =
          fmPrefConfig.default_value ||
          resolvedOptionSet.find((option) => option.default)!.id;
      }
    }

    // Key the configs by pref ID first, for convenience
    const prefConfigByPrefId: Record<string, PagePrefConfig> =
      p.frontmatter.page_preferences.reduce(
        (obj, prefConfig) => ({ ...obj, [prefConfig.id]: prefConfig }),
        {}
      );

    // Keep track of the pref IDs that have been processed,
    // to ensure correct definition order in frontmatter
    const processedPrefIds: string[] = [];

    // Fill out the manifest in the order that the prefs
    // appeared in the frontmatter
    p.frontmatter.page_preferences.forEach((pagePrefConfig) => {
      // Validate the pref ID
      if (!p.allowlist.prefsById[pagePrefConfig.id]) {
        manifest.errors.push(
          `Unrecognized pref ID: The pref ID '${pagePrefConfig.id}' is not in the allowlist.`
        );
      }

      const hasDynamicOptions = pagePrefConfig.options_source.match(PLACEHOLDER_REGEX);

      // Get the options set ID for this pref,
      // or all possible options set IDs if the pref's options_source
      // contains placeholders
      let optionsSetIds: string[] = [];

      if (hasDynamicOptions) {
        let hasFatalError = false;

        // break the options source ID into segments
        // that can be used to generate all possible options set IDs
        const segments = pagePrefConfig.options_source.split('_').map((segment) => {
          // build non-placeholder segment (array of solitary possible value)
          if (!segment.match(PLACEHOLDER_REGEX)) {
            return [segment];
          }

          // build placeholder segment (array of all possible values)
          const referencedPrefId = segment.slice(1, -1).toLowerCase();
          const referencedPrefConfig = prefConfigByPrefId[referencedPrefId];
          if (!referencedPrefConfig || !processedPrefIds.includes(referencedPrefId)) {
            manifest.errors.push(
              `Invalid placeholder: The placeholder ${segment} in the options source '${pagePrefConfig.options_source}' refers to an unrecognized pref ID. The file frontmatter must contain a pref with the ID '${referencedPrefId}', and it must be defined before the pref with the ID ${pagePrefConfig.id}.`
            );
            hasFatalError = true;
            return [segment];
          }

          const referencedOptionsSet =
            p.prefOptionsConfig[referencedPrefConfig.options_source];
          return referencedOptionsSet.map((option) => option.id);
        });

        if (!hasFatalError) {
          optionsSetIds = this.buildSnakeCaseCombinations(segments);
        } else {
          optionsSetIds = [];
        }
      } else {
        optionsSetIds = [pagePrefConfig.options_source];
      }

      // Populate the default value for each options set ID
      const defaultValuesByOptionsSetId: Record<string, string> = {};
      const possibleValues: string[] = [];

      optionsSetIds.forEach((optionsSetId) => {
        const optionsSet = p.prefOptionsConfig[optionsSetId];
        if (!optionsSet) {
          manifest.errors.push(
            `Invalid options source: The options source '${optionsSetId}', which is required for the pref ID '${pagePrefConfig.id}', does not exist.`
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

      manifest.prefsById[pagePrefConfig.id] = {
        config: pagePrefConfig,
        defaultValuesByOptionsSetId,
        possibleValues
      };

      processedPrefIds.push(pagePrefConfig.id);
    });

    // Add any options sets that were referenced by the prefs
    Object.keys(manifest.prefsById).forEach((prefId) => {
      const prefManifest = manifest.prefsById[prefId];
      const optionsSetIds = Object.keys(prefManifest.defaultValuesByOptionsSetId);
      optionsSetIds.forEach((optionsSetId) => {
        if (!manifest.optionSetsById[optionsSetId]) {
          manifest.optionSetsById[optionsSetId] = p.prefOptionsConfig[optionsSetId];
        }
      });
    });

    return manifest;
  }

  /**
   * For a given language directory, load the preference options
   * associated with that language, and validate the object as a whole.
   */
  static loadPrefsConfigFromLangDir(p: {
    dir: string;
    allowlist: Allowlist;
  }): Readonly<PrefOptionsConfig> {
    const optionSetsDir = `${p.dir}/option_sets`;
    const prefOptionsConfig = this.loadPrefOptionsFromDir(optionSetsDir);

    Object.values(prefOptionsConfig).forEach((optionsList) => {
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

    return PrefOptionsConfigSchema.parse(prefOptionsConfig);
  }

  /**
   * Load all of the allowlists for all languages,
   * keyed by language code.
   */
  static loadAllowlistsByLang(p: {
    prefsConfigDir: string;
    langs: string[];
    defaultLang?: string;
  }): Record<string, Allowlist> {
    const defaultLang = p.defaultLang || 'en';
    const allowlistsByLang: Record<string, Allowlist> = {};

    const defaultAllowlist = this.loadAllowlistFromLangDir(
      `${p.prefsConfigDir}/${defaultLang}`
    );

    p.langs.forEach((lang) => {
      if (lang === defaultLang) {
        allowlistsByLang[lang] = defaultAllowlist;
        return;
      }
      const langDir = `${p.prefsConfigDir}/${lang}`;
      const translatedAllowlist = this.loadAllowlistFromLangDir(langDir);

      // merge the translated allowlist with the default allowlist
      const mergedAllowlist: Allowlist = {
        prefsById: { ...defaultAllowlist.prefsById, ...translatedAllowlist.prefsById },
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
   * For a given language, load the pref and options allowlists.
   */
  static loadAllowlistFromLangDir(dir: string): Allowlist {
    const result: Allowlist = { prefsById: {}, optionsById: {} };

    // Load and validate the prefs allowlist
    const prefsAllowlistFilePath = `${dir}/allowlists/prefs.yaml`;
    try {
      const prefsAllowlistConfigStr = fs.readFileSync(prefsAllowlistFilePath, 'utf8');
      const prefsAllowlist = AllowlistConfigSchema.parse(
        yaml.load(prefsAllowlistConfigStr)
      );
      result.prefsById = prefsAllowlist.allowed.reduce<
        Record<string, AllowlistConfigEntry>
      >((acc, entry) => {
        acc[entry.id] = entry;
        return acc;
      }, {});
    } catch (e) {
      // If the file is not found, use an empty list
      if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
        result.prefsById = {};
      } else {
        throw e;
      }
    }

    // Load and validate the options allowlist
    const optionsAllowlistFilePath = `${dir}/allowlists/options.yaml`;
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
   * Load all of the preference options files in a directory
   * into a single object, and validate the object as a whole.
   * For example, duplicate options set IDs are not allowed.
   *
   * @param dir The directory containing the preference options YAML files.
   * @returns A read-only PrefOptionsConfig object.
   */
  private static loadPrefOptionsFromDir(dir: string): RawPrefOptionsConfig {
    const filenames = FileNavigator.findInDir(dir, /\.ya?ml$/);
    const rawPrefOptions: RawPrefOptionsConfig = {};

    filenames.forEach((filename) => {
      const prefOptionsConfig = RawPrefOptionsConfigSchema.parse(
        this.loadPrefsYamlFromStr(filename)
      );
      for (const [optionsListId, optionsList] of Object.entries(prefOptionsConfig)) {
        // Verify that no duplicate options set IDs exist
        if (rawPrefOptions[optionsListId]) {
          throw new Error(
            `Duplicate options list ID '${optionsListId}' found in file ${filename}`
          );
        }
        rawPrefOptions[optionsListId] = optionsList;
      }
    });

    return rawPrefOptions;
  }

  /**
   * Load a preference options configuration from a YAML file.
   *
   * @param yamlFile The path to a YAML file containing preference options.
   * @returns A read-only PrefOptionsConfig object.
   */
  static loadPrefsYamlFromStr(yamlFile: string): RawPrefOptionsConfig {
    const yamlFileContent = fs.readFileSync(yamlFile, 'utf8');
    const parsedYaml = yaml.load(yamlFileContent);
    return RawPrefOptionsConfigSchema.parse(parsedYaml);
  }

  /**
   * For a given page, derive the default values for each preference
   * from the frontmatter and the preference options configuration.
   *
   * This is useful for rendering the default version of a page,
   * before the user has interacted with any preference controls.
   *
   * @param {Frontmatter} frontmatter A Frontmatter object.
   * @param {PrefOptionsConfig} prefOptionsConfig A PrefOptionsConfig object.
   */
  static getDefaultValuesByPrefId(
    frontmatter: Frontmatter,
    prefOptionsConfig: PrefOptionsConfig
  ): Record<string, string> {
    if (!frontmatter.page_preferences) {
      return {};
    }
    const defaultValuesByPrefId: Record<string, string> = {};

    for (const fmPrefConfig of frontmatter.page_preferences) {
      // replace placeholders
      const optionsSetId = fmPrefConfig.options_source;
      const resolvedOptionsSetId = optionsSetId.replace(
        GLOBAL_PLACEHOLDER_REGEX,
        (_match: string, placeholder: string) => {
          const value = defaultValuesByPrefId[placeholder.toLowerCase()];
          return value;
        }
      );

      defaultValuesByPrefId[fmPrefConfig.id] =
        fmPrefConfig.default_value ||
        prefOptionsConfig[resolvedOptionsSetId].find((option) => option.default)!.id;
    }

    return defaultValuesByPrefId;
  }

  /**
   * Narrow a PrefOptionsConfig object to only include the options
   * that are relevant to a specific page, based on the page's frontmatter.
   * Verify that all placeholders refer to valid pref IDs,
   * and that all potential options sources generated
   * by those placeholders are valid.
   *
   * @param frontmatter A Frontmatter object, parsed from the front matter of an .mdoc file.
   * @param prefOptionsConfig A PrefOptionsConfig object, parsed
   * from the preference options YAML files.
   */
  static getPrefOptionsForPage(
    frontmatter: Frontmatter,
    prefOptionsConfig: PrefOptionsConfig
  ): Readonly<PrefOptionsConfig> {
    const prefOptionsConfigForPage: PrefOptionsConfig = {};

    if (!frontmatter.page_preferences) {
      return prefOptionsConfigForPage;
    }

    this.validatePlaceholderReferences(frontmatter);

    // Verify that all possible options_source IDs are valid

    const validValuesByOptionsSetId: Record<string, string[]> = {};
    const optionsSetIdsByPrefId: Record<string, string> = {};

    for (const fmPrefConfig of frontmatter.page_preferences) {
      const placeholderMatches = fmPrefConfig.options_source.match(
        GLOBAL_PLACEHOLDER_REGEX
      );

      // if this options_source does not contain any placeholders,
      // it should be a valid options set ID
      if (!placeholderMatches) {
        if (!prefOptionsConfig[fmPrefConfig.options_source]) {
          throw new Error(
            `Invalid options_source found in page_preferences: ${fmPrefConfig.options_source}`
          );
        }
        validValuesByOptionsSetId[fmPrefConfig.options_source] = prefOptionsConfig[
          fmPrefConfig.options_source
        ].map((option) => option.id);

        optionsSetIdsByPrefId[fmPrefConfig.id] = fmPrefConfig.options_source;

        // add this options source to the prefOptionsConfigForPage object
        prefOptionsConfigForPage[fmPrefConfig.options_source] =
          prefOptionsConfig[fmPrefConfig.options_source];

        continue;
      }

      // if placeholders are contained,
      // generate a list of all possible options sources
      const optionsSetIdSegments = fmPrefConfig.options_source.split('_');
      const possibleSegmentValues: Array<Array<string>> = [];

      for (const segment of optionsSetIdSegments) {
        if (segment.match(PLACEHOLDER_REGEX)) {
          const referencedPrefId = segment.slice(1, -1).toLowerCase();
          const referencedOptionsSetId = optionsSetIdsByPrefId[referencedPrefId];
          possibleSegmentValues.push(validValuesByOptionsSetId[referencedOptionsSetId]);
        } else {
          possibleSegmentValues.push([segment]);
        }
      }

      const potentialOptionsSetIds =
        this.buildSnakeCaseCombinations(possibleSegmentValues);

      // validate that all potential options set IDs are valid
      for (const potentialOptionsSetId of potentialOptionsSetIds) {
        if (!prefOptionsConfig[potentialOptionsSetId]) {
          throw new Error(
            `Invalid options_source could be populated by the placeholders in ${fmPrefConfig.options_source}: An options source with the ID '${potentialOptionsSetId}' does not exist.`
          );
        }
        validValuesByOptionsSetId[potentialOptionsSetId] = prefOptionsConfig[
          potentialOptionsSetId
        ].map((option) => option.id);

        // add this options source to the prefOptionsConfigForPage object
        prefOptionsConfigForPage[potentialOptionsSetId] =
          prefOptionsConfig[potentialOptionsSetId];
      }
    }

    return prefOptionsConfigForPage;
  }

  /**
   * Verify that each placeholder refers to a valid page pref ID.
   *
   * For example, if there is a <COLOR> placeholder, there must
   * also be a page pref with the ID 'color', and it must
   * have been defined in the frontmatter before the placeholder is referenced.
   *
   * @param frontmatter A Frontmatter object.
   */
  static validatePlaceholderReferences(frontmatter: Frontmatter): void {
    if (!frontmatter.page_preferences) {
      return;
    }

    const validPrefIds: string[] = [];

    for (const fmPrefConfig of frontmatter.page_preferences) {
      const placeholderMatches =
        fmPrefConfig.options_source.match(GLOBAL_PLACEHOLDER_REGEX) || [];

      for (const placeholder of placeholderMatches) {
        const match = placeholder.match(PLACEHOLDER_REGEX);
        if (!match) {
          throw new Error(
            `Invalid placeholder found in options_source: ${fmPrefConfig.options_source}`
          );
        }

        const referencedId = match[1].toLowerCase();
        if (!validPrefIds.includes(referencedId)) {
          throw new Error(
            `Placeholder ${match[0]} does not refer to a valid page preference ID. Make sure that '${referencedId}' is spelled correctly, and that the '${referencedId}' parameter is defined in the page_preferences list before it is referenced in ${match[0]}.`
          );
        }
      }

      // add this pref ID to the list of valid pref IDs
      // that may be referenced by placeholders later in the list
      validPrefIds.push(fmPrefConfig.id);
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
   * Shorten the keys in a PrefOptionsConfig object to save space
   * when storing the object inline at the bottom of an .md file.
   */
  static minifyPrefOptionsConfig(
    prefOptionsConfig: PrefOptionsConfig
  ): MinifiedPrefOptionsConfig {
    const minifiedPrefOptionsConfig: MinifiedPrefOptionsConfig = {};
    for (const [optionsListId, optionsList] of Object.entries(prefOptionsConfig)) {
      minifiedPrefOptionsConfig[optionsListId] = optionsList.map((option) => ({
        n: option.display_name,
        d: option.default,
        i: option.id
      }));
    }
    MinifiedPrefOptionsConfigSchema.parse(minifiedPrefOptionsConfig);
    return minifiedPrefOptionsConfig;
  }

  /**
   * Shorten the keys in a PagePrefsConfig object to save space
   * when storing the object inline at the bottom of an
   * .md file.
   */
  static minifyPagePrefsConfig(
    pagePrefsConfig: PagePrefsConfig
  ): MinifiedPagePrefsConfig {
    const minifiedPagePrefsConfig: Array<MinifiedPagePrefConfig> = [];
    pagePrefsConfig.forEach((pagePrefConfig) => {
      minifiedPagePrefsConfig.push({
        n: pagePrefConfig.display_name,
        i: pagePrefConfig.id,
        o: pagePrefConfig.options_source,
        d: pagePrefConfig.default_value
      });
    });
    MinifiedPagePrefsConfigSchema.parse(minifiedPagePrefsConfig);
    return minifiedPagePrefsConfig;
  }
}
