import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { PrefOptionsConfig } from './schemas/yaml/prefOptions';
import {
  SitewidePrefIdsConfig,
  SitewidePrefIdsConfigSchema
} from './schemas/yaml/sitewidePrefs';
import { Frontmatter } from './schemas/yaml/frontMatter';
import { Node } from 'markdoc-static-compiler';
import { GLOBAL_PLACEHOLDER_REGEX } from './schemas/regexes';
import { validatePlaceholders } from './helpers/frontmatterValidation';
import {
  loadPrefOptionsFromDir,
  loadSitewidePrefsConfigFromFile
} from './helpers/configIngestion';
import { parseMarkdocFile } from './helpers/compilation';

const DEBUG_PATH = __dirname + '/../debug';

export class MarkdocToHugoCompiler {
  prefOptionsConfig: PrefOptionsConfig;
  sitewidePrefNames: string[] = [];
  markdocFiles: string[] = [];
  compiledFiles: string[] = [];
  partialsDir: string;

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

    this.partialsDir = p.partialsDir;

    // create the debug folder if it doesn't exist
    if (!fs.existsSync(DEBUG_PATH)) {
      fs.mkdirSync(DEBUG_PATH);
    }
  }

  // Compile all detected Markdoc files to Hugo-compatible HTML
  compile() {
    for (const markdocFile of this.markdocFiles) {
      const { ast, frontmatter, partials, errorReports } = parseMarkdocFile(
        markdocFile,
        this.partialsDir
      );

      if (errorReports.length > 0) {
        console.error(`Errors found in ${markdocFile}`);
        errorReports.forEach((report) => {
          console.error(
            `  - ${report.error.message} at line(s) ${report.lines.join(', ')}`
          );
        });
        throw new Error('Errors found in Markdoc file');
      }

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
