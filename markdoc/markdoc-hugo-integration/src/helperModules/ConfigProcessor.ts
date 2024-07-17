import { PrefOptionsConfig, PrefOptionsConfigSchema } from '../schemas/yaml/prefOptions';
import { FileManager } from './FileManager';
import { GLOBAL_PLACEHOLDER_REGEX } from '../schemas/regexes';
import { Frontmatter } from '../schemas/yaml/frontMatter';
import fs from 'fs';
import yaml from 'js-yaml';
import {
  SitewidePrefIdsConfigSchema,
  SitewidePrefIdsConfig
} from '../schemas/yaml/sitewidePrefs';
import { PLACEHOLDER_REGEX } from '../schemas/regexes';

/**
 * A module responsible for finding, parsing, and validating
 * configurations that define the preference settings available to users,
 * the default values for each preference, and so on.
 */
export class ConfigProcessor {
  /**
   * When given a directory that contains YAML files of preference options,
   * load all of the preference options into a single object,
   * and validate the object as a whole.
   */
  static loadPrefOptionsFromDir(dir: string): PrefOptionsConfig {
    const filenames = FileManager.findInDir(dir, /\.ya?ml$/);
    const prefOptions: PrefOptionsConfig = {};

    filenames.forEach((filename) => {
      const prefOptionsConfig = this.loadPrefsYamlFromStr(filename);
      for (const [optionsListId, optionsList] of Object.entries(prefOptionsConfig)) {
        // Verify that no duplicate options set IDs exist
        if (prefOptions[optionsListId]) {
          throw new Error(
            `Duplicate options list ID '${optionsListId}' found in file ${filename}`
          );
        }
        prefOptions[optionsListId] = optionsList;
      }
    });

    PrefOptionsConfigSchema.parse(prefOptions);
    return prefOptions;
  }

  static loadPrefsYamlFromStr(yamlFile: string): PrefOptionsConfig {
    const yamlFileContent = fs.readFileSync(yamlFile, 'utf8');
    const parsedYaml = yaml.load(yamlFileContent) as PrefOptionsConfig;
    return PrefOptionsConfigSchema.parse(parsedYaml);
  }

  static loadSitewidePrefsConfigFromFile(yamlFile: string): string[] {
    const yamlFileContent = fs.readFileSync(yamlFile, 'utf8');
    const parsedYaml = yaml.load(yamlFileContent) as SitewidePrefIdsConfig;
    SitewidePrefIdsConfigSchema.parse(parsedYaml);
    return parsedYaml.valid_sitewide_preference_identifiers;
  }

  /**
   * For a given page, derive the default values for each preference
   * from the frontmatter and the preference options configuration.
   *
   * This is useful for rendering the default version of a page,
   * before the user has interacted with any preference controls.
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
      let optionsSetId = fmPrefConfig.options_source;
      optionsSetId = optionsSetId.replace(
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

      defaultValuesByPrefId[fmPrefConfig.identifier] =
        fmPrefConfig.default_value ||
        prefOptionsConfig[optionsSetId].find((option) => option.default)!.identifier;
    }

    return defaultValuesByPrefId;
  }

  /**
   * Verify that all placeholders refer to valid pref IDs,
   * and that all potential options sources generated
   * by those placeholders are valid.
   */
  static validatePlaceholders(
    frontmatter: Frontmatter,
    prefOptionsConfig: PrefOptionsConfig
  ): void {
    if (!frontmatter.page_preferences) {
      return;
    }

    this.validatePlaceholderReferences(frontmatter);

    // Verify that all possible options_source identifiers are valid

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
        ].map((option) => option.identifier);

        optionsSetIdsByPrefId[fmPrefConfig.identifier] = fmPrefConfig.options_source;
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
        ].map((option) => option.identifier);
      }
    }
  }

  /**
   * Verify that each placeholder refers to a valid page pref ID.
   *
   * For example, if there is a <COLOR> placeholder, there must
   * also be a page pref with the identifier 'color', and it must
   * have been defined in the frontmatter before the placeholder is referenced.
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
            `Placeholder ${match[0]} does not refer to a valid page preference identifier. Make sure that '${referencedId}' is spelled correctly, and that the '${referencedId}' parameter is defined in the page_preferences list before it is referenced in ${match[0]}.`
          );
        }
      }

      // add this pref ID to the list of valid pref IDs
      // that may be referenced by placeholders later in the list
      validPrefIds.push(fmPrefConfig.identifier);
    }
  }

  /**
   * When given arrays of segments, such as
   * [['red', 'blue'], ['gloss', 'matte'], ['paint'], ['options']],
   * generate all possible combinations of the segments in snake_case,
   * such as ['red_gloss_paint_options', 'red_matte_paint_options',
   * 'blue_gloss_paint_options', 'blue_matte_paint_options'].
   */
  static buildSnakeCaseCombinations(arr: any[], str: string = '', final: any[] = []) {
    if (arr.length > 1) {
      arr[0].forEach((v: string) =>
        this.buildSnakeCaseCombinations(
          arr.slice(1),
          str + (str === '' ? '' : '_') + v,
          final
        )
      );
    } else {
      arr[0].forEach((v: string) => final.push(str + (str === '' ? '' : '_') + v));
    }
    return final;
  }
}
