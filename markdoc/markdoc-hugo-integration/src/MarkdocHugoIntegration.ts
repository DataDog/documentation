/**
 * The external interface of the integration.
 * This class is responsible for compiling Markdoc files
 * and reporting any errors encountered during compilation.
 */

import fs from 'fs';
import { PrefOptionsConfig } from './schemas/yaml/prefOptions';
import { HugoConfig, HugoConfigSchema } from './schemas/config/hugo';
import { MdocFileParser } from './helperModules/MdocFileParser';
import { FileNavigator } from './helperModules/FileNavigator';
import { YamlConfigParser } from './helperModules/YamlConfigParser';
import { PageBuilder } from './helperModules/PageBuilder';
import {
  ParsingErrorReport,
  ParsedFile,
  CompilationResult
} from './schemas/compilationResults';
import { PagePrefsManifestSchema } from './schemas/pagePrefs';
import { Allowlist } from './schemas/yaml/allowlist';

export class MarkdocHugoIntegration {
  hugoConfig: HugoConfig;
  prefOptionsConfigByLang: Record<string, PrefOptionsConfig>;
  allowlistsByLang: Record<string, Allowlist> = {};

  // Errors from the markup-string-to-AST parsing process,
  // which include additional helpful data, like line numbers
  parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]> = {};
  // All other errors caught during compilation
  validationErrorsByFilePath: Record<string, string[]> = {};
  private compiledFiles: string[] = [];

  /**
   * Validate and store the provided configuration.
   */
  constructor(args: { hugoConfig: HugoConfig }) {
    this.hugoConfig = HugoConfigSchema.parse(args.hugoConfig);

    // Load the English allowlist configuration
    this.allowlistsByLang = YamlConfigParser.loadAllowlistsByLang({
      prefsConfigDir: this.hugoConfig.dirs.prefsConfig,
      langs: this.hugoConfig.languages
    });

    // Load English pref configuration
    this.prefOptionsConfigByLang = {
      en: YamlConfigParser.loadPrefsConfigFromLangDir({
        dir: this.hugoConfig.dirs.prefsConfig + '/en',
        allowlist: this.allowlistsByLang.en
      })
    };

    // Load translated pref configurations, backfilling with English
    this.hugoConfig.languages.forEach((lang) => {
      if (lang === 'en') {
        return;
      }

      let translatedPrefOptionsConfig: PrefOptionsConfig;
      try {
        translatedPrefOptionsConfig = YamlConfigParser.loadPrefsConfigFromLangDir({
          dir: this.hugoConfig.dirs.prefsConfig + '/' + lang,
          allowlist: this.allowlistsByLang[lang]
        });
      } catch (e) {
        // If no prefs config directory exists for this language,
        // assume no translated prefs exist
        if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
          translatedPrefOptionsConfig = {};
        } else {
          throw e;
        }
      }

      this.prefOptionsConfigByLang[lang] = {
        ...this.prefOptionsConfigByLang.en,
        ...translatedPrefOptionsConfig
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
    const lang = markdocFilepath.replace(this.hugoConfig.dirs.content, '').split('/')[1];
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
    const parsedFile = MdocFileParser.parseMdocFile({
      file: markdocFilepath,
      partialsDir: this.hugoConfig.dirs.partials
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
    this.compiledFiles = [];

    const markdocFilepaths = FileNavigator.findInDir(
      this.hugoConfig.dirs.content,
      /\.mdoc$/
    );

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
        prefOptionsConfig: this.prefOptionsConfigByLang[lang]
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
    prefOptionsConfig: PrefOptionsConfig;
  }): string | null {
    let prefOptionsConfigForPage: PrefOptionsConfig;
    const lang = p.markdocFilepath
      .replace(this.hugoConfig.dirs.content, '')
      .split('/')[1];
    this.validationErrorsByFilePath[p.markdocFilepath] = [];

    if (!this.hugoConfig.languages.includes(lang)) {
      this.validationErrorsByFilePath[p.markdocFilepath] = [
        `Language "${lang}" is not supported.`
      ];
      return null;
    }

    // generate the prefs manifest
    const draftPrefsManifest = YamlConfigParser.buildPagePrefsManifest({
      frontmatter: p.parsedFile.frontmatter,
      prefOptionsConfig: this.prefOptionsConfigByLang[lang],
      allowlist: this.allowlistsByLang[lang]
    });

    if (draftPrefsManifest.errors.length > 0) {
      draftPrefsManifest.errors.forEach((error) => {
        this.validationErrorsByFilePath[p.markdocFilepath].push(error);
      });
      return null;
    }

    const prefsManifest = PagePrefsManifestSchema.parse(draftPrefsManifest);

    // verify that all possible placeholder values
    // yield an existing options set
    try {
      prefOptionsConfigForPage = YamlConfigParser.getPrefOptionsForPage(
        p.parsedFile.frontmatter,
        p.prefOptionsConfig
      );
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

    // build the HTML and write it to an .md file
    try {
      const { html, errors } = PageBuilder.build({
        parsedFile: p.parsedFile,
        prefOptionsConfig: prefOptionsConfigForPage,
        prefsManifest,
        hugoConfig: this.hugoConfig
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
    const writePath = p.markdocFilepath.replace(/\.mdoc$/, '.md');
    fs.writeFileSync(writePath, p.pageContents);
    return writePath;
  }
}
