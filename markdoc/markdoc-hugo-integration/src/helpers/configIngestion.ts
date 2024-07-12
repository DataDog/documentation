import fs from 'fs';
import { PrefOptionsConfig, PrefOptionsConfigSchema } from '../schemas/yaml/prefOptions';
import { findInDir } from './filesystem';
import yaml from 'js-yaml';
import {
  SitewidePrefIdsConfig,
  SitewidePrefIdsConfigSchema
} from '../schemas/yaml/sitewidePrefs';
import { GLOBAL_PLACEHOLDER_REGEX } from '../schemas/regexes';
import { Frontmatter } from '../schemas/yaml/frontMatter';

/**
 * When given a directory that contains YAML files of preference options,
 * load all of the preference options into a single object,
 * and validate the object as a whole.
 */
export function loadPrefOptionsFromDir(dir: string): PrefOptionsConfig {
  const filenames = findInDir(dir, /\.ya?ml$/);
  const prefOptions: PrefOptionsConfig = {};

  filenames.forEach((filename) => {
    const prefOptionsConfig = loadPrefsYamlFromStr(filename);
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

function loadPrefsYamlFromStr(yamlFile: string): PrefOptionsConfig {
  const yamlFileContent = fs.readFileSync(yamlFile, 'utf8');
  const parsedYaml = yaml.load(yamlFileContent) as PrefOptionsConfig;
  return PrefOptionsConfigSchema.parse(parsedYaml);
}

export function loadSitewidePrefsConfigFromFile(yamlFile: string): string[] {
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
export function getDefaultValuesByPrefId(
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
