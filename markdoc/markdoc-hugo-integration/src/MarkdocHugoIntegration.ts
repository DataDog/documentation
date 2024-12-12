import fs from 'fs';
import { FilterOptionsConfig } from './schemas/yaml/filterOptions';
import { IntegrationConfig } from './schemas/config/integration';
import { HugoGlobalConfig } from './schemas/config/hugo';
import { MdocFileParser } from './helperModules/MdocFileParser';
import { FileNavigator } from './helperModules/FileNavigator';
import { YamlConfigParser } from './helperModules/YamlConfigParser';
import { PageBuilder } from './helperModules/PageBuilder';
import {
  CompilationError,
  ParsedFile,
  CompilationResult
} from './schemas/compilationResults';
import { PageFiltersManifestSchema } from './schemas/pageFilters';
import { Glossary } from './schemas/yaml/glossary';
import { FiltersManifestBuilder } from './helperModules/FiltersManifestBuilder';
import { HugoGlobalConfigBuilder } from './helperModules/HugoGlobalConfigBuilder';
import { AuthorConsoleData } from './schemas/authorConsole';
import { AuthorConsoleBuilder } from './helperModules/AuthorConsoleBuilder';

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

  errorsByFilePath: Record<string, CompilationError[]> = {};

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

  async injectAuthorConsole() {
    const consoleData: AuthorConsoleData = {
      glossary: this.glossariesByLang.en,
      buildStatus: {
        hasErrors: this.#hasErrors(),
        errorsByFilePath: this.errorsByFilePath,
        timestamp: Date.now()
      }
    };

    const consoleHtml = await AuthorConsoleBuilder.buildHtml({
      data: consoleData
    });

    if (this.hugoGlobalConfig.env === 'development') {
      // write it to the static folder
      const consolePath =
        this.hugoGlobalConfig.dirs.static + '/markdoc/console/index.html';
      fs.mkdirSync(this.hugoGlobalConfig.dirs.static + '/markdoc/console', {
        recursive: true
      });
      fs.writeFileSync(consolePath, consoleHtml);
    }

    return consoleHtml;
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
    if (parsedFile.errors.length > 0) {
      this.#addFileErrors({
        filePath: markdocFilepath,
        errors: parsedFile.errors
      });
      return null;
    }

    return parsedFile;
  }

  #addFileError(p: { filePath: string; error: CompilationError }) {
    if (!this.errorsByFilePath[p.filePath]) {
      this.errorsByFilePath[p.filePath] = [];
    }
    this.errorsByFilePath[p.filePath].push({ ...p.error });
  }

  #addFileErrors(p: { filePath: string; errors: CompilationError[] }) {
    if (!this.errorsByFilePath[p.filePath]) {
      this.errorsByFilePath[p.filePath] = [...p.errors];
    } else {
      this.errorsByFilePath[p.filePath].concat([...p.errors]);
    }
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
      errorsByFilePath: this.errorsByFilePath,
      compiledFilePaths: this.compiledFilePaths
    };
  }

  /**
   * Pretty-print any errors to the console.
   */
  logErrorsToConsole() {
    const errorsByFilePath = this.errorsByFilePath;

    if (Object.keys(errorsByFilePath).length > 0) {
      console.error(`Syntax errors found in Markdoc files:`);

      for (const filePath in errorsByFilePath) {
        const fileErrors = errorsByFilePath[filePath];
        if (fileErrors.length === 0) {
          continue;
        }

        console.error(`\nIn file ${filePath}:`);
        errorsByFilePath[filePath].forEach((error) => {
          console.error(`  - ${JSON.stringify(error, null, 2)}`);
        });
      }
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
    const lang = p.markdocFilepath
      .replace(this.hugoGlobalConfig.dirs.content, '')
      .split('/')[1];

    if (!this.hugoGlobalConfig.languages.includes(lang)) {
      this.#addFileError({
        filePath: p.markdocFilepath,
        error: {
          message: `Language "${lang}" is not supported.`
        }
      });
      return null;
    }

    // generate the filters manifest
    const draftFiltersManifest = FiltersManifestBuilder.build({
      frontmatter: p.parsedFile.frontmatter,
      filterOptionsConfig: this.filterOptionsConfigByLang[lang],
      glossary: this.glossariesByLang[lang]
    });

    if (draftFiltersManifest.errors.length > 0) {
      this.#addFileErrors({
        filePath: p.markdocFilepath,
        errors: draftFiltersManifest.errors
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

      errors.forEach((error) => {
        this.#addFileError({
          filePath: p.markdocFilepath,
          error
        });
      });

      const compiledFilepath = this.#writeFile({
        parsedFile: p.parsedFile,
        markdocFilepath: p.markdocFilepath,
        pageContents: html
      });

      return compiledFilepath;
    } catch (e) {
      let error: CompilationError;
      if (e instanceof Error) {
        error = {
          message: e.message
        };
      } else if (typeof e === 'string') {
        error = {
          message: e
        };
      } else {
        error = {
          message: JSON.stringify(e)
        };
      }

      this.#addFileError({
        filePath: p.markdocFilepath,
        error
      });

      return null;
    }
  }

  /**
   * Clear any stored errors.
   */
  #resetErrors() {
    this.errorsByFilePath = {};
  }

  /**
   * Whether any errors have been detected during compilation.
   */
  #hasErrors() {
    const hasErrors = Object.values(this.errorsByFilePath).some(
      (errors) => errors.length > 0
    );
    return hasErrors;
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
