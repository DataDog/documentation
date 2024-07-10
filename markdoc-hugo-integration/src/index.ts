import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { PrefOptionsConfig, PrefOptionsConfigSchema } from './prefs_processing/schemas/yaml/prefOptions';
import { SitewidePrefIdsConfig, SitewidePrefIdsConfigSchema } from './prefs_processing/schemas/yaml/sitewidePrefs';
import MarkdocStaticCompiler, { Node } from 'markdoc-static-compiler';

const DEBUG_PATH = __dirname + '/../debug';

export class MarkdocToHugoCompiler {
  prefOptionsConfig: PrefOptionsConfig;
  sitewidePrefNames: string[] = [];
  markdocFiles: string[] = [];
  compiledFiles: string[] = [];

  constructor(p: {
    sitewidePrefsFilepath: string;
    prefOptionsConfigDir: string;
    contentDir: string;
    partialsDir: string;
  }) {
    // ingest the pref options sets
    this.prefOptionsConfig = this.#loadPrefOptionsFromYaml(p.prefOptionsConfigDir);
    // ingest sitewide preference names
    this.sitewidePrefNames = this.#loadValidSitewidePrefNames(p.sitewidePrefsFilepath);
    // register markdoc files
    this.markdocFiles = findInDir(p.contentDir, /\.mdoc$/);
  }

  // Compile all detected Markdoc files to Hugo-compatible HTML
  compile() {
    for (const markdocFile of this.markdocFiles) {
      const markdocStr = fs.readFileSync(markdocFile, 'utf8');
      const ast = MarkdocStaticCompiler.parse(markdocStr);
      // write the file to the debug folder
      fs.writeFileSync(`${DEBUG_PATH}/${path.basename(markdocFile)}.json`, JSON.stringify(ast, null, 2));
      const partialPaths = this.#extractPartialPaths(ast);
      fs.writeFileSync(
        `${DEBUG_PATH}/${path.basename(markdocFile)}.partialPaths.json`,
        JSON.stringify(partialPaths, null, 2)
      );
      console.log(JSON.stringify(ast, null, 2));
    }
  }

  #extractPartialPaths(node: Node): string[] {
    let partialPaths: string[] = [];
    if (node.tag === 'partial') {
      const filePathAnnotations = node.annotations.filter(
        (annotation) => annotation.name === 'file' && annotation.type === 'attribute'
      );
      if (!filePathAnnotations) {
        throw new Error('Partial tag must have a file attribute');
      } else if (filePathAnnotations.length !== 1) {
        throw new Error('Partial tag must have exactly one file attribute');
      } else if (!filePathAnnotations[0].value) {
        throw new Error('Partial tag file attribute must have a value');
      }
      partialPaths.push(filePathAnnotations[0].value);
    }
    if (node.children.length) {
      for (const child of node.children) {
        partialPaths = partialPaths.concat(this.#extractPartialPaths(child));
      }
    }
    return partialPaths;
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
    return PrefOptionsConfigSchema.parse(parsedYaml);
  }

  #loadValidSitewidePrefNames(yamlFile: string): string[] {
    const yamlFileContent = fs.readFileSync(yamlFile, 'utf8');
    const parsedYaml = yaml.load(yamlFileContent) as SitewidePrefIdsConfig;
    SitewidePrefIdsConfigSchema.parse(parsedYaml);
    return parsedYaml.valid_sitewide_preference_identifiers;
  }
}

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
