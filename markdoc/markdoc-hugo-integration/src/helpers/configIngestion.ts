import fs from 'fs';
import { PrefOptionsConfig, PrefOptionsConfigSchema } from '../schemas/yaml/prefOptions';
import { findInDir } from './filesystem';
import yaml from 'js-yaml';
import {
  SitewidePrefIdsConfig,
  SitewidePrefIdsConfigSchema
} from '../schemas/yaml/sitewidePrefs';

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
