import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import {
  PrefOptionsConfig,
  PrefOptionsConfigSchema
} from './prefs_processing/schemas/yaml/prefOptions';
import {
  SitewidePrefIdsConfig,
  SitewidePrefIdsConfigSchema
} from './prefs_processing/schemas/yaml/sitewidePrefs';
import {
  Frontmatter,
  FrontmatterSchema
} from './prefs_processing/schemas/yaml/frontMatter';
import MarkdocStaticCompiler, { Node } from 'markdoc-static-compiler';
import {
  GLOBAL_PLACEHOLDER_REGEX,
  PLACEHOLDER_REGEX
} from './prefs_processing/schemas/regexes';

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
    this.prefOptionsConfig = this.#loadPrefOptionsFromYaml(
      p.prefOptionsConfigDir
    );

    // ingest the list of valid sitewide preference names
    this.sitewidePrefNames = this.#loadValidSitewidePrefNames(
      p.sitewidePrefsFilepath
    );

    // scan the provided content directory for markdoc files
    this.markdocFiles = findInDir(p.contentDir, /\.mdoc$/);

    // create the debug folder if it doesn't exist
    if (!fs.existsSync(DEBUG_PATH)) {
      fs.mkdirSync(DEBUG_PATH);
    }
  }

  // Compile all detected Markdoc files to Hugo-compatible HTML
  compile() {
    for (const markdocFile of this.markdocFiles) {
      console.log(`\n\nCompiling ${markdocFile}`);
      const markdocStr = fs.readFileSync(markdocFile, 'utf8');
      const ast = MarkdocStaticCompiler.parse(markdocStr);

      // write ast to DEBUG_PATH
      fs.writeFileSync(
        `${DEBUG_PATH}/asts.${path.basename(markdocFile)}.json`,
        JSON.stringify(ast, null, 2)
      );

      // write frontmatter tag to DEBUG_PATH
      const frontmatter = yaml.load(ast.attributes.frontmatter) as Frontmatter;
      fs.writeFileSync(
        `${DEBUG_PATH}/frontmatter.${path.basename(markdocFile)}.json`,
        JSON.stringify(frontmatter, null, 2) || '__EMPTY__'
      );
      FrontmatterSchema.parse(frontmatter);

      // verify that all possible placeholder values
      // yield an existing options set
      this.#validatePlaceholders(frontmatter, this.prefOptionsConfig);

      // derive the default value of each preference
      const defaultValuesByPrefId = this.#getDefaultValuesByPrefId(
        frontmatter,
        this.prefOptionsConfig
      );
      fs.writeFileSync(
        `${DEBUG_PATH}/defaultValues.${path.basename(markdocFile)}.json`,
        JSON.stringify(defaultValuesByPrefId, null, 2)
      );

      // build the renderable tree
      const partialPaths = this.#extractPartialPaths(ast);
      fs.writeFileSync(
        `${DEBUG_PATH}/partialPathDetection.${path.basename(markdocFile)}.json`,
        JSON.stringify(partialPaths, null, 2)
      );
    }
  }

  #validatePlaceholders(
    frontmatter: Frontmatter,
    prefOptionsConfig: PrefOptionsConfig
  ): void {
    if (!frontmatter.page_preferences) {
      return;
    }

    // verify that each placeholder refers to a valid pref ID
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

    const validValuesByOptionsSetId: Record<string, string[]> = {};
    const optionsSetIdsByPrefId: Record<string, string> = {};

    // verify that all possible options_source identifiers are valid
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
        validValuesByOptionsSetId[fmPrefConfig.options_source] =
          prefOptionsConfig[fmPrefConfig.options_source].map(
            (option) => option.identifier
          );

        optionsSetIdsByPrefId[fmPrefConfig.identifier] =
          fmPrefConfig.options_source;
        continue;
      }

      // if placeholders are contained,
      // generate a list of all possible options sources
      const optionsSetIdSegments = fmPrefConfig.options_source.split('_');
      const cartesianInput: Array<Array<string>> = [];

      for (const segment of optionsSetIdSegments) {
        if (segment.match(PLACEHOLDER_REGEX)) {
          const referencedPrefId = segment.slice(1, -1).toLowerCase();
          console.log('referencedPrefId', referencedPrefId);
          const referencedOptionsSetId =
            optionsSetIdsByPrefId[referencedPrefId];
          console.log('referencedOptionsSetId', referencedOptionsSetId);
          cartesianInput.push(
            validValuesByOptionsSetId[referencedOptionsSetId]
          );
        } else {
          cartesianInput.push([segment]);
        }
      }

      console.log('cartesianInput', JSON.stringify(cartesianInput, null, 2));

      const loopOver = (arr: any[], str: string = '', final: any[] = []) => {
        if (arr.length > 1) {
          arr[0].forEach((v: string) =>
            loopOver(arr.slice(1), str + (str === '' ? '' : '_') + v, final)
          );
        } else {
          arr[0].forEach((v: string) =>
            final.push(str + (str === '' ? '' : '_') + v)
          );
        }
        return final;
      };

      const potentialOptionsSetIds = loopOver(cartesianInput);

      console.log(
        'potentialOptionsSetIds',
        JSON.stringify(potentialOptionsSetIds, null, 2)
      );

      // validate that all potential options set IDs are valid
      for (const potentialOptionsSetId of potentialOptionsSetIds) {
        if (!prefOptionsConfig[potentialOptionsSetId]) {
          throw new Error(
            `Invalid options_source could be yielded by the placeholders in ${fmPrefConfig.options_source}: An options source with the ID '${potentialOptionsSetId}' does not exist.`
          );
        }
        validValuesByOptionsSetId[potentialOptionsSetId] = prefOptionsConfig[
          potentialOptionsSetId
        ].map((option) => option.identifier);
      }
    }
  }

  #getDefaultValuesByPrefId(
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
        prefOptionsConfig[optionsSetId].find((option) => option.default)!
          .identifier;
    }

    return defaultValuesByPrefId;
  }

  #extractPartialPaths(node: Node): string[] {
    let partialPaths: string[] = [];
    if (node.tag === 'partial') {
      const filePathAnnotations = node.annotations.filter(
        (annotation) =>
          annotation.name === 'file' && annotation.type === 'attribute'
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
      for (const [optionsListId, optionsList] of Object.entries(
        prefOptionsConfig
      )) {
        // validate that this ID has not already been used
        if (prefOptions[optionsListId]) {
          throw new Error(
            `Duplicate options list ID '${optionsListId}' found in file ${filename}`
          );
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
