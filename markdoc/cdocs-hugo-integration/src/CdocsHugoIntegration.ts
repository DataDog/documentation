import fs from 'fs';
import {
  buildFiltersManifest,
  loadCustomizationConfig,
  CustomizationConfigByLang,
  CustomizationConfig
} from 'cdocs-data';
import { IntegrationConfig } from './schemas/config/integration';
import { HugoGlobalConfig } from './schemas/config/hugo';
import { MdocFileParser } from './helperModules/MdocFileParser';
import { PageBuilder } from './helperModules/PageBuilder/PageBuilder';
import {
  CompilationError,
  ParsedFile,
  CompilationResult
} from './schemas/compilationResults';
import { FileSearcher } from './helperModules/FileSearcher';
import { HugoGlobalConfigBuilder } from './helperModules/HugoGlobalConfigBuilder';

/**
 * The external interface of the integration.
 * This class is instantiated by the docs site build code,
 * and is responsible for compiling Markdoc files
 * and reporting the result of the compilation,
 * including any errors encountered during compilation.
 */
export class CdocsHugoIntegration {
  hugoGlobalConfig: HugoGlobalConfig;
  private compiledFilePaths: string[] = [];

  customizationConfigByLang: CustomizationConfigByLang;
  errorsByFilePath: Record<string, CompilationError[]> = {};

  /**
   * Load the configuration objects from YAML
   */
  constructor(args: { config: IntegrationConfig }) {
    this.hugoGlobalConfig = HugoGlobalConfigBuilder.build(args.config);

    const { customizationConfigByLang } = loadCustomizationConfig({
      configDir: this.hugoGlobalConfig.dirs.customizationConfig,
      langs: this.hugoGlobalConfig.languages
    });

    this.customizationConfigByLang = customizationConfigByLang;
  }

  /**
   * Provide a string that includes the shared styles and scripts
   * required to display and re-render any page.
   * Any page-specific content or scripts are not included;
   * those are inline in the compiled files.
   */
  buildAssetsPartial() {
    let stylesStr = PageBuilder.getStylesStr();
    if (this.hugoGlobalConfig.env === 'development') {
      // Add focus ring styles in development mode
      stylesStr += `
      html head *:focus,
      html body *:focus {
          outline: 4px auto -webkit-focus-ring-color !important;
      }`;
    }
    return `<style>${stylesStr}</style>
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

    const markdocFilepaths = FileSearcher.findInDir(
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
        customizationConfig: this.customizationConfigByLang[lang]
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
    customizationConfig: CustomizationConfig;
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
    const filtersManifest = buildFiltersManifest({
      frontmatter: p.parsedFile.frontmatter,
      customizationConfig: p.customizationConfig
    });

    if (filtersManifest.errors.length > 0) {
      this.#addFileErrors({
        filePath: p.markdocFilepath,
        errors: filtersManifest.errors
      });
      return null;
    }

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
