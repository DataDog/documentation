/**
 * The external interface of the integration.
 * This class is responsible for compiling Markdoc files
 * and reporting any errors encountered during compilation.
 */

import fs from 'fs';
import { PrefOptionsConfig } from './schemas/yaml/prefOptions';
import { HugoConfig } from './schemas/hugoConfig';
import { MdocFileParser } from './helperModules/MdocFileParser';
import { FileNavigator } from './helperModules/FileNavigator';
import { YamlConfigParser } from './helperModules/YamlConfigParser';
import { PageBuilder } from './helperModules/PageBuilder';
import {
  CompilationConfig,
  CompilationConfigSchema,
  CompilationResult,
  ParsingErrorReport,
  ParsedFile
} from './schemas/compilation';

export class MarkdocHugoIntegration {
  directories: {
    content: string;
    partials: string;
    prefsConfig: string;
  };
  hugoConfig: HugoConfig;
  prefOptionsConfig: Record<string, PrefOptionsConfig>; // keyed by language code, e.g. 'en'

  // Errors from the AST parsing process,
  // which come with some extra information, like line numbers
  parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]> = {};
  // All other errors caught during compilation
  validationErrorsByFilePath: Record<string, string> = {};
  private compiledFiles: string[] = [];

  /**
   * Validate and store the provided configuration.
   */
  constructor(args: CompilationConfig) {
    CompilationConfigSchema.parse(args);
    this.directories = args.directories;
    this.hugoConfig = args.hugoConfig;
    this.prefOptionsConfig = {
      en: YamlConfigParser.loadPrefOptionsFromDir(
        this.directories.prefsConfig + '/en/option_sets'
      )
    };
    this.hugoConfig.languages.forEach((lang) => {
      const translatedPrefsConfig = YamlConfigParser.loadPrefOptionsFromDir(
        this.directories.prefsConfig + '/' + lang + '/option_sets'
      );
      // Overwrite the English options with translated options when available
      this.prefOptionsConfig[lang] = {
        ...this.prefOptionsConfig.en,
        ...translatedPrefsConfig
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
<script>${PageBuilder.getClientPrefsManagerScriptStr()}</script>`;
  }

  #getFileLanguage(markdocFilepath: string): string {
    const lang = markdocFilepath.replace(this.directories.content, '').split('/')[1];
    if (!lang) {
      throw new Error(`No language detected in file path: ${markdocFilepath}`);
    }
    return lang;
  }

  /**
   * Parse a single Markdoc file into a collection
   * of data structures, such as the AST and the frontmatter.
   *
   * @param markdocFilepath The path to the file.
   * @returns A ParsedFile object.
   */
  #parseMdocFile(markdocFilepath: string): ParsedFile | null {
    const parsedFile = MdocFileParser.parseMdocFile(
      markdocFilepath,
      this.directories.partials
    );

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
    this.compiledFiles = [];

    const markdocFilepaths = FileNavigator.findInDir(this.directories.content, /\.mdoc$/);

    for (const markdocFilepath of markdocFilepaths) {
      const parsedFile = this.#parseMdocFile(markdocFilepath);
      if (!parsedFile) {
        continue;
      }

      const lang = this.#getFileLanguage(markdocFilepath);

      // Skip files that are not in the list of languages to compile
      if (!this.hugoConfig.languages.includes(lang)) {
        continue;
      }

      const compiledFilepath = this.#compileMdocFile({
        markdocFilepath,
        parsedFile,
        prefOptionsConfig: this.prefOptionsConfig[lang]
      });

      if (compiledFilepath) {
        this.compiledFiles.push(compiledFilepath);
      }
    }

    this.compiledFiles.sort();

    if (this.#hasErrors()) {
      this.logErrorsToConsole();
    }

    return {
      hasErrors: this.#hasErrors(),
      parsingErrorReportsByFilePath: this.parsingErrorReportsByFilePath,
      validationErrorsByFilePath: this.validationErrorsByFilePath,
      compiledFiles: this.compiledFiles
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
        console.error(`\nIn file ${filePath}:`);
        errorReportsByFilePath[filePath].forEach((report) => {
          console.error(
            `  - ${report.error.message} at line(s) ${report.lines.join(', ')}`
          );
        });
      }
    }

    if (Object.keys(this.validationErrorsByFilePath).length > 0) {
      console.error(`Errors found in Markdoc files:`);

      for (const filePath in this.validationErrorsByFilePath) {
        console.error(`\nIn file ${filePath}:`);
        console.error(`  - ${this.validationErrorsByFilePath[filePath]}`);
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
    prefOptionsConfig: PrefOptionsConfig;
  }): string | null {
    let prefOptionsConfigForPage: PrefOptionsConfig;
    const lang = p.markdocFilepath.replace(this.directories.content, '').split('/')[1];

    if (!this.hugoConfig.languages.includes(lang)) {
      this.validationErrorsByFilePath[
        p.markdocFilepath
      ] = `Language "${lang}" is not supported.`;
      return null;
    }

    // verify that all possible placeholder values
    // yield an existing options set
    try {
      prefOptionsConfigForPage = YamlConfigParser.getPrefOptionsForPage(
        p.parsedFile.frontmatter,
        p.prefOptionsConfig
      );
    } catch (e) {
      if (e instanceof Error) {
        this.validationErrorsByFilePath[p.markdocFilepath] = e.message;
      } else if (typeof e === 'string') {
        this.validationErrorsByFilePath[p.markdocFilepath] = e;
      } else {
        this.validationErrorsByFilePath[p.markdocFilepath] = JSON.stringify(e);
      }
      return null;
    }

    // build the HTML and write it to an .md file
    try {
      const fileContents = PageBuilder.build({
        parsedFile: p.parsedFile,
        prefOptionsConfig: prefOptionsConfigForPage,
        hugoConfig: this.hugoConfig
      });

      const compiledFilepath = this.#writeFile({
        parsedFile: p.parsedFile,
        markdocFilepath: p.markdocFilepath,
        pageContents: fileContents
      });

      return compiledFilepath;
    } catch (e) {
      if (e instanceof Error) {
        this.validationErrorsByFilePath[p.markdocFilepath] = e.message;
      } else if (typeof e === 'string') {
        this.validationErrorsByFilePath[p.markdocFilepath] = e;
      } else {
        this.validationErrorsByFilePath[p.markdocFilepath] = JSON.stringify(e);
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
    return (
      Object.keys(this.parsingErrorReportsByFilePath).length > 0 ||
      Object.keys(this.validationErrorsByFilePath).length > 0
    );
  }

  /**
   * Write the compiled output file to disk.
   */
  #writeFile(p: {
    parsedFile: ParsedFile;
    markdocFilepath: string;
    pageContents: string;
  }): string {
    const writePath = p.markdocFilepath.replace(/\.mdoc$/, '.md');
    fs.writeFileSync(writePath, p.pageContents);
    return writePath;
  }
}
