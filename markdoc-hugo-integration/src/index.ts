import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { PrefOptionsConfig, PrefOptionsConfigSchema } from './prefs_processing/schemas/yaml/prefOptions';

function findInDir(dir: string, filter: RegExp, fileList: string[] = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      findInDir(filePath, filter, fileList);
    } else if (filter.test(filePath)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

export class MarkdocToHtmlCompiler {
  prefOptionsConfig: PrefOptionsConfig;

  constructor(p: { preferencesConfigDir: string; contentDirectory: string; partialsDirectory: string }) {
    // ingest the pref options sets
    this.prefOptionsConfig = this.#loadPrefOptionsFromYaml(p.preferencesConfigDir + '/preference_options');
    // ingest site preference config from file
    // validate site preference config
    // ingest page preference options from provided directory
    // validate page preference options config
    // register mdoc partials
    // register mdoc files
  }

  compile() {
    // compile all mdoc files to a corresponding HTML file
  }

  watch() {
    // watch for changes in mdoc files and recompile
  }

  #loadPrefOptionsFromYaml(configDir: string) {
    const filenames = findInDir(configDir, /\.ya?ml$/);
    const prefOptions: PrefOptionsConfig = {};

    filenames.forEach((filename) => {
      const prefOptionsConfig = this.#loadPrefsYamlFromStr(filename);
      for (const [optionsListId, optionsList] of Object.entries(prefOptionsConfig)) {
        // validate that this ID has not already been used
        if (prefOptions[optionsListId]) {
          throw new Error(`Duplicate options list ID '${optionsListId}' found in file ${filename}`);
        }
        prefOptions[optionsListId] = optionsList;
      }
    });

    return prefOptions;
  }

  #loadPrefsYamlFromStr(yamlFile: string): PrefOptionsConfig {
    const yamlFileContent = fs.readFileSync(yamlFile, 'utf8');
    const parsedYaml = yaml.load(yamlFileContent) as PrefOptionsConfig;
    console.log('Parsed options file YAML:');
    console.log(JSON.stringify(parsedYaml, null, 2));
    return PrefOptionsConfigSchema.parse(parsedYaml);
  }
}
