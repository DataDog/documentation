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
  AllowlistsByType,
  Allowlist,
  AllowlistSchema,
  RawAllowlistSchema
} from '../schemas/yaml/allowlist';
import fs from 'fs';
import yaml from 'js-yaml';
import {
  SitewidePrefIdsConfigSchema,
  SitewidePrefIdsConfig
} from '../schemas/yaml/sitewidePrefs';
import { PLACEHOLDER_REGEX } from '../schemas/regexes';

export class YamlConfigParser {
  static loadPrefsConfigFromLangDir(p: {
    dir: string;
    allowlistsByType: AllowlistsByType;
  }): Readonly<PrefOptionsConfig> {
    const optionSetsDir = `${p.dir}/option_sets`;

    const prefOptionsConfig = this.loadPrefOptionsFromDir(optionSetsDir);

    Object.values(prefOptionsConfig).forEach((optionsList) => {
      const displayNamesByAllowedOptionId: Record<string, string> =
        p.allowlistsByType.options.reduce(
          (acc, entry) => ({ ...acc, [entry.id]: entry.display_name }),
          {}
        );

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
   * Load the pref and options allowlists from a prefs config directory.
   */
  static loadAllowlistsFromLangDir(dir: string): AllowlistsByType {
    const result: AllowlistsByType = { prefs: [], options: [] };

    // Load and validate the prefs allowlist
    const prefsAllowlistFilePath = `${dir}/allowlists/prefs.yaml`;
    try {
      const prefsAllowlistStr = fs.readFileSync(prefsAllowlistFilePath, 'utf8');
      const prefsAllowlist = RawAllowlistSchema.parse(yaml.load(prefsAllowlistStr));
      result.prefs = prefsAllowlist.allowed;
    } catch (e) {
      // If the file is not found, use an empty list
      if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
        result.prefs = [];
      } else {
        throw e;
      }
    }

    // Load and validate the options allowlist
    const optionsAllowlistFilePath = `${dir}/allowlists/options.yaml`;
    try {
      const optionsAllowlistStr = fs.readFileSync(optionsAllowlistFilePath, 'utf8');
      const optionsAllowlist = RawAllowlistSchema.parse(yaml.load(optionsAllowlistStr));
      result.options = optionsAllowlist.allowed;
    } catch (e) {
      // If the file is not found, use an empty list
      if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
        result.options = [];
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

  // TODO: Not in use yet, old demo code.
  static loadSitewidePrefsConfigFromFile(yamlFile: string): string[] {
    const yamlFileContent = fs.readFileSync(yamlFile, 'utf8');
    const parsedYaml = yaml.load(yamlFileContent) as SitewidePrefIdsConfig;
    SitewidePrefIdsConfigSchema.parse(parsedYaml);
    return parsedYaml.valid_sitewide_preference_ids;
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
          if (!value) {
            throw new Error(
              `The placeholder <${placeholder}> is invalid. Make sure that '${placeholder}' is spelled correctly, and that the '${placeholder.toLowerCase()}' parameter is defined in the page_preferences list before it is referenced as <${placeholder}>.`
            );
          }
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
