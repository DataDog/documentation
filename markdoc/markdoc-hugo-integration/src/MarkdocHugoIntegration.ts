import fs from 'fs';
import { z } from 'zod';
import { PrefOptionsConfig } from './schemas/yaml/prefOptions';
import { FileParser, ParsingErrorReport, ParsedFile } from './helperModules/FileParser';
import { FileNavigator } from './helperModules/FileNavigator';
import { ConfigProcessor } from './helperModules/ConfigProcessor';
import { PageBuilder } from './helperModules/PageBuilder';

const CompilationConfigSchema = z.object({
  directories: z
    .object({
      content: z.string(),
      partials: z.string(),
      options: z.string()
    })
    .strict(),
  config: z
    .object({
      outputFormat: z.enum(['html', 'markdown']).optional(),
      includeAssetsInline: z.boolean().optional(),
      debug: z.boolean().optional()
    })
    .optional()
});

type CompilationConfig = z.infer<typeof CompilationConfigSchema>;

export class MarkdocHugoIntegration {
  directories: {
    content: string;
    partials: string;
    options: string;
  };
  config: {
    includeAssetsInline: boolean;
    debug: boolean;
    outputFormat: 'html' | 'markdown';
  };
  // Errors from the AST parsing process,
  // which come with some extra information, like line numbers
  parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]> = {};
  // All other errors caught during compilation
  validationErrorsByFilePath: Record<string, string> = {};
  // Whether to create a self-contained HTML file (useful for testing)
  private compiledFiles: string[] = [];

  /**
   * Ingest the available configuration files
   * and scan the content directory for Markdoc files.
   */
  constructor(args: CompilationConfig) {
    CompilationConfigSchema.parse(args);
    this.directories = args.directories;
    this.config = {
      includeAssetsInline: args.config?.includeAssetsInline || false,
      debug: args.config?.debug || false,
      outputFormat: args.config?.outputFormat || 'markdown'
    };
  }

  buildAssetsPartial() {
    const styles = PageBuilder.getStylesStr();
    const script = PageBuilder.getClientRendererScriptStr();
    const partial = `
      <style>${styles}</style>
      <script>${script}</script>
    `;
    return partial;
  }

  /**
   * Compile all detected Markdoc files to HTML.
   */
  compile() {
    this.#resetErrors();
    this.compiledFiles = [];

    const prefOptionsConfig = ConfigProcessor.loadPrefOptionsFromDir(
      this.directories.options
    );
    const markdocFilepaths = FileNavigator.findInDir(this.directories.content, /\.mdoc$/);

    for (const markdocFilepath of markdocFilepaths) {
      const parsedFile = FileParser.parseMdocFile(
        markdocFilepath,
        this.directories.partials
      );

      // if the file has errors, log the errors for later output
      // and continue to the next file
      if (parsedFile.errorReports.length > 0) {
        this.parsingErrorReportsByFilePath[markdocFilepath] = parsedFile.errorReports;
        continue;
      }

      let prefOptionsConfigForPage: PrefOptionsConfig;

      // verify that all possible placeholder values
      // yield an existing options set
      try {
        prefOptionsConfigForPage = ConfigProcessor.getPrefOptionsForPage(
          parsedFile.frontmatter,
          prefOptionsConfig
        );
      } catch (e) {
        if (e instanceof Error) {
          this.validationErrorsByFilePath[markdocFilepath] = e.message;
        } else if (typeof e === 'string') {
          this.validationErrorsByFilePath[markdocFilepath] = e;
        } else {
          this.validationErrorsByFilePath[markdocFilepath] = JSON.stringify(e);
        }
        continue;
      }

      // build the HTMl string and write it to file
      try {
        const fileContents = PageBuilder.build({
          parsedFile,
          prefOptionsConfig: prefOptionsConfigForPage,
          includeAssetsInline: this.config.includeAssetsInline,
          debug: this.config.debug,
          outputMode: this.config.outputFormat
        });

        const compiledFilepath = this.#writeFile({
          parsedFile,
          markdocFilepath: markdocFilepath,
          pageContents: fileContents
        });

        this.compiledFiles.push(compiledFilepath);
      } catch (e) {
        if (e instanceof Error) {
          this.validationErrorsByFilePath[markdocFilepath] = e.message;
        } else if (typeof e === 'string') {
          this.validationErrorsByFilePath[markdocFilepath] = e;
        } else {
          this.validationErrorsByFilePath[markdocFilepath] = JSON.stringify(e);
        }
      }
    }

    this.compiledFiles.sort();

    return {
      hasErrors: this.#hasErrors(),
      parsingErrorReportsByFilePath: this.parsingErrorReportsByFilePath,
      validationErrorsByFilePath: this.validationErrorsByFilePath,
      compiledFiles: this.compiledFiles
    };
  }

  #resetErrors() {
    this.parsingErrorReportsByFilePath = {};
    this.validationErrorsByFilePath = {};
  }

  #hasErrors() {
    return (
      Object.keys(this.parsingErrorReportsByFilePath).length > 0 ||
      Object.keys(this.validationErrorsByFilePath).length > 0
    );
  }

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

  #writeFile(p: {
    parsedFile: ParsedFile;
    markdocFilepath: string;
    pageContents: string;
  }): string {
    let writePath: string;
    // HTML format
    if (this.config.outputFormat === 'html') {
      writePath = p.markdocFilepath.replace(/\.mdoc$/, '.html');
      fs.writeFileSync(writePath, p.pageContents);
      // Markdown format
    } else if (this.config.outputFormat === 'markdown') {
      writePath = p.markdocFilepath.replace(/\.mdoc$/, '.md');
      fs.writeFileSync(writePath, p.pageContents);
    } else {
      throw new Error(`Invalid output format: ${this.config.outputFormat}`);
    }
    return writePath;
  }
}
