import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { PrefOptionsConfig } from './schemas/yaml/prefOptions';
import {
  SitewidePrefIdsConfig,
  SitewidePrefIdsConfigSchema
} from './schemas/yaml/sitewidePrefs';
import { Frontmatter, FrontmatterSchema } from './schemas/yaml/frontMatter';
import MarkdocStaticCompiler, { Node } from 'markdoc-static-compiler';
import { GLOBAL_PLACEHOLDER_REGEX } from './schemas/regexes';
import { validatePlaceholders } from './helpers/frontmatterValidation';
import {
  loadPrefOptionsFromDir,
  loadSitewidePrefsConfigFromFile
} from './helpers/configIngestion';

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
    this.prefOptionsConfig = loadPrefOptionsFromDir(p.prefOptionsConfigDir);

    // ingest the list of valid sitewide preference names
    this.sitewidePrefNames = loadSitewidePrefsConfigFromFile(p.sitewidePrefsFilepath);

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
      validatePlaceholders(frontmatter, this.prefOptionsConfig);

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
        prefOptionsConfig[optionsSetId].find((option) => option.default)!.identifier;
    }

    return defaultValuesByPrefId;
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
