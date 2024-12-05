import fs from 'fs';
import { FilterOptionsConfig } from './schemas/yaml/filterOptions';
import { IntegrationConfig } from './schemas/config/integration';
import { HugoGlobalConfig } from './schemas/config/hugo';
import { MdocFileParser } from './helperModules/MdocFileParser';
import { FileNavigator } from './helperModules/FileNavigator';
import { YamlConfigParser } from './helperModules/YamlConfigParser';
import { PageBuilder } from './helperModules/PageBuilder';
import {
  ParsingErrorReport,
  ParsedFile,
  CompilationResult
} from './schemas/compilationResults';
import { PageFiltersManifestSchema } from './schemas/pageFilters';
import { Glossary } from './schemas/yaml/glossary';
import { FiltersManifestBuilder } from './helperModules/FiltersManifestBuilder';
import { HugoGlobalConfigBuilder } from './helperModules/HugoGlobalConfigBuilder';

/**
 * The external interface of the integration.
 * This class is instantiated by the docs site build code,
 * and is responsible for compiling Markdoc files
 * and reporting the result of the compilation,
 * including any errors encountered during compilation.
 */
export class MarkdocHugoIntegration {
  hugoGlobalConfig: HugoGlobalConfig;
  filterOptionsConfigByLang: Record<string, FilterOptionsConfig>;
  glossariesByLang: Record<string, Glossary> = {};
  private compiledFilePaths: string[] = [];

  // Errors from the markup-string-to-AST parsing process,
  // which include additional helpful data, like line numbers
  parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]> = {};

  // All other errors caught during compilation
  validationErrorsByFilePath: Record<string, string[]> = {};

  /**
   * Validate and store the provided configuration.
   */
  constructor(args: { config: IntegrationConfig }) {
    this.hugoGlobalConfig = HugoGlobalConfigBuilder.build(args.config);

    // Load the English glossary configuration
    this.glossariesByLang = YamlConfigParser.loadGlossariesByLang({
      filtersConfigDir: this.hugoGlobalConfig.dirs.filtersConfig,
      langs: this.hugoGlobalConfig.languages
    });

    // Load English filter configuration
    this.filterOptionsConfigByLang = {
      en: YamlConfigParser.loadFiltersConfigFromLangDir({
        dir: this.hugoGlobalConfig.dirs.filtersConfig + '/en',
        glossary: this.glossariesByLang.en
      })
    };

    // Load translated filter configurations, backfilling with English
    this.hugoGlobalConfig.languages.forEach((lang) => {
      if (lang === 'en') {
        return;
      }

      let translatedFilterOptionsConfig: FilterOptionsConfig;
      try {
        translatedFilterOptionsConfig = YamlConfigParser.loadFiltersConfigFromLangDir({
          dir: this.hugoGlobalConfig.dirs.filtersConfig + '/' + lang,
          glossary: this.glossariesByLang[lang]
        });
      } catch (e) {
        // If no filters config directory exists for this language,
        // assume no translated filters exist
        if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
          translatedFilterOptionsConfig = {};
        } else {
          throw e;
        }
      }

      this.filterOptionsConfigByLang[lang] = {
        ...this.filterOptionsConfigByLang.en,
        ...translatedFilterOptionsConfig
      };
    });
  }

  /**
   * Provide a string that includes the shared styles and scripts
   * required to display and re-render any page.
   * Any page-specific content or scripts are not included;
   * those are inline in the compiled files.
   */
  buildAssetsPartial() {
    return `<style>${PageBuilder.getStylesStr()}</style>
<script>${PageBuilder.getClientFiltersManagerScriptStr()}</script>`;
  }

  #getFileLanguage(markdocFilepath: string): string {
    const lang = markdocFilepath
      .replace(this.hugoGlobalConfig.dirs.content, '')
      .split('/')[1];
    if (!lang) {
      throw new Error(`No language detected in file path: ${markdocFilepath}`);
    }
    return lang;
  }

  /**
   * Parse a single Markdoc file into a collection
   * of data structures, such as the AST and the frontmatter.
   */
  #parseMdocFile(markdocFilepath: string): ParsedFile | null {
    const parsedFile = MdocFileParser.parseMdocFile({
      file: markdocFilepath,
      partialsDir: this.hugoGlobalConfig.dirs.partials
    });

    // if the file has errors, log the errors for later output
    // and continue to the next file
    if (parsedFile.errorReports.length > 0) {
      this.parsingErrorReportsByFilePath[markdocFilepath] = parsedFile.errorReports;
      return null;
    }

    return parsedFile;
  }

  /**
   * Compile all Markdoc files detected in the content folder
   * to Markdown.
   */
  compileMdocFiles(): CompilationResult {
    this.#resetErrors();
    this.compiledFilePaths = [];

    const markdocFilepaths = FileNavigator.findInDir(
      this.hugoGlobalConfig.dirs.content,
      /\.mdoc.md$/
    );

    for (const markdocFilepath of markdocFilepaths) {
      const parsedFile = this.#parseMdocFile(markdocFilepath);
      if (!parsedFile) {
        continue;
      }

      const lang = this.#getFileLanguage(markdocFilepath);

      // Skip files that are not in the list of languages to compile
      if (!this.hugoGlobalConfig.languages.includes(lang)) {
        continue;
      }

      const compiledFilepath = this.#compileMdocFile({
        markdocFilepath,
        parsedFile,
        filterOptionsConfig: this.filterOptionsConfigByLang[lang]
      });

      if (compiledFilepath) {
        this.compiledFilePaths.push(compiledFilepath);
      }
    }

    this.compiledFilePaths.sort();

    if (this.#hasErrors()) {
      this.logErrorsToConsole();
    }

    return {
      hasErrors: this.#hasErrors(),
      parsingErrorReportsByFilePath: this.parsingErrorReportsByFilePath,
      validationErrorsByFilePath: this.validationErrorsByFilePath,
      compiledFilePaths: this.compiledFilePaths
    };
  }

  /**
   * Pretty-print any errors to the console.
   */
  logErrorsToConsole() {
    const errorReportsByFilePath = this.parsingErrorReportsByFilePath;
    if (Object.keys(errorReportsByFilePath).length > 0) {
      console.error(`Syntax errors found in Markdoc files:`);

      for (const filePath in errorReportsByFilePath) {
        const reports = errorReportsByFilePath[filePath];
        if (reports.length === 0) {
          continue;
        }

        console.error(`\nIn file ${filePath}:`);
        errorReportsByFilePath[filePath].forEach((report) => {
          console.error(
            `  - ${report.error.message} at line(s) ${report.lines.join(', ')}`
          );
        });
      }
    }

    for (const filePath in this.validationErrorsByFilePath) {
      if (this.validationErrorsByFilePath[filePath].length === 0) {
        continue;
      }

      console.error(`\nIn file ${filePath}:`);
      this.validationErrorsByFilePath[filePath].forEach((error) => {
        console.error(`  - ${error}`);
      });
    }
  }

  /**
   * Compile a single Markdoc file to Markdown or HTML,
   * depending on the configuration, and write the output to a file.
   * If the compilation succeeds, return the path to the compiled file.
   */
  #compileMdocFile(p: {
    markdocFilepath: string;
    parsedFile: ParsedFile;
    filterOptionsConfig: FilterOptionsConfig;
  }): string | null {
    let filterOptionsConfigForPage: FilterOptionsConfig;
    const lang = p.markdocFilepath
      .replace(this.hugoGlobalConfig.dirs.content, '')
      .split('/')[1];
    this.validationErrorsByFilePath[p.markdocFilepath] = [];

    if (!this.hugoGlobalConfig.languages.includes(lang)) {
      this.validationErrorsByFilePath[p.markdocFilepath] = [
        `Language "${lang}" is not supported.`
      ];
      return null;
    }

    // generate the filters manifest
    const draftFiltersManifest = FiltersManifestBuilder.build({
      frontmatter: p.parsedFile.frontmatter,
      filterOptionsConfig: this.filterOptionsConfigByLang[lang],
      glossary: this.glossariesByLang[lang]
    });

    if (draftFiltersManifest.errors.length > 0) {
      draftFiltersManifest.errors.forEach((error) => {
        this.validationErrorsByFilePath[p.markdocFilepath].push(error);
      });
      return null;
    }

    const filtersManifest = PageFiltersManifestSchema.parse(draftFiltersManifest);

    // build the HTML and write it to an .md file
    try {
      const { html, errors } = PageBuilder.build({
        parsedFile: p.parsedFile,
        filtersManifest: filtersManifest,
        hugoConfig: {
          global: this.hugoGlobalConfig,
          page: {
            path: p.markdocFilepath,
            lang
          }
        }
      });

      const compiledFilepath = this.#writeFile({
        parsedFile: p.parsedFile,
        markdocFilepath: p.markdocFilepath,
        pageContents: html
      });

      errors.forEach((error) => {
        this.validationErrorsByFilePath[p.markdocFilepath].push(error);
      });

      return compiledFilepath;
    } catch (e) {
      if (e instanceof Error) {
        this.validationErrorsByFilePath[p.markdocFilepath].push(e.message);
      } else if (typeof e === 'string') {
        this.validationErrorsByFilePath[p.markdocFilepath].push(e);
      } else {
        this.validationErrorsByFilePath[p.markdocFilepath].push(JSON.stringify(e));
      }
      return null;
    }
  }

  /**
   * Clear any stored errors.
   */
  #resetErrors() {
    this.parsingErrorReportsByFilePath = {};
    this.validationErrorsByFilePath = {};
  }

  /**
   * Whether any errors have been detected during compilation.
   */
  #hasErrors() {
    const hasParsingErrors = Object.keys(this.parsingErrorReportsByFilePath).length > 0;
    const hasValidationErrors = Object.values(this.validationErrorsByFilePath).some(
      (errors) => errors.length > 0
    );
    return hasParsingErrors || hasValidationErrors;
  }

  /**
   * Write the compiled output file to disk.
   */
  #writeFile(p: {
    parsedFile: ParsedFile;
    markdocFilepath: string;
    pageContents: string;
  }): string {
    const writePath = p.markdocFilepath.replace(/\.mdoc\.md$/, '.md');
    fs.writeFileSync(writePath, p.pageContents);
    return writePath;
  }
}
