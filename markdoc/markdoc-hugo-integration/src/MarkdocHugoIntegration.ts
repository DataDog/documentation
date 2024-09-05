/**
 * The external interface of the integration.
 * This class is responsible for compiling Markdoc files
 * and reporting any errors encountered during compilation.
 */

import fs from 'fs';
import { z } from 'zod';
import { PrefOptionsConfig } from './schemas/yaml/prefOptions';
import {
  MdocFileParser,
  ParsingErrorReport,
  ParsedFile
} from './helperModules/MdocFileParser';
import { FileNavigator } from './helperModules/FileNavigator';
import { YamlConfigParser } from './helperModules/YamlConfigParser';
import { PageBuilder } from './helperModules/PageBuilder';

/**
 * The schema for the config object passed to the MarkdocHugoIntegration class
 * from outside the module.
 */
const CompilationConfigSchema = z.object({
  directories: z
    .object({
      content: z.string(),
      partials: z.string(),
      options: z.string()
    })
    .strict(),
  siteParams: z.record(z.string(), z.any())
});

/**
 * The type of the config object passed to the MarkdocHugoIntegration class
 * from outside the module.
 */
type CompilationConfig = z.infer<typeof CompilationConfigSchema>;

export class MarkdocHugoIntegration {
  directories: {
    content: string;
    partials: string;
    options: string;
  };

  // Errors from the AST parsing process,
  // which come with some extra information, like line numbers
  parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]> = {};
  // All other errors caught during compilation
  validationErrorsByFilePath: Record<string, string> = {};
  private compiledFiles: string[] = [];

  /**
   * Ingest the available configuration files
   * and scan the content directory for Markdoc files.
   */
  constructor(args: CompilationConfig) {
    CompilationConfigSchema.parse(args);
    this.directories = args.directories;
    console.log('site params from inside integration', args.siteParams);
  }

  /**
   * Provide a string that includes the shared styles and scripts
   * required to display and re-render any page.
   * Any page-specific content or scripts are not included;
   * those are inlined in the compiled files.
   */
  buildAssetsPartial() {
    return `<style>${PageBuilder.getStylesStr()}</style>
<script>${PageBuilder.getClientPrefsManagerScriptStr()}</script>`;
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
   * to Markdown or HTML, depending on the configuration.
   *
   * If an array of filepaths is provided, only compile those files.
   */
  compileMdocFiles(filePaths?: string[]) {
    this.#resetErrors();
    this.compiledFiles = [];

    const prefOptionsConfig = YamlConfigParser.loadPrefOptionsFromDir(
      this.directories.options
    );
    const markdocFilepaths =
      filePaths || FileNavigator.findInDir(this.directories.content, /\.mdoc$/);

    for (const markdocFilepath of markdocFilepaths) {
      const parsedFile = this.#parseMdocFile(markdocFilepath);
      if (!parsedFile) {
        continue;
      }

      const compiledFilepath = this.#compileMdocFile({
        markdocFilepath,
        parsedFile,
        prefOptionsConfig
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
        prefOptionsConfig: prefOptionsConfigForPage
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
