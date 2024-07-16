import fs from 'fs';
import { PrefOptionsConfig } from './schemas/yaml/prefOptions';
import { validatePlaceholders } from './helpers/frontmatterValidation';
import { FileParser, ParsingErrorReport } from './FileParser';
import MarkdocStaticCompiler from 'markdoc-static-compiler';
import { findInDir } from './helpers/filesystem';
import prettier from 'prettier';
import { ConfigProcessor } from './ConfigProcessor';

export class MarkdocHugoIntegration {
  prefOptionsConfig: PrefOptionsConfig;
  sitewidePrefNames: string[] = [];
  markdocFiles: string[] = [];
  partialsDir: string;
  // Errors from the AST parsing process,
  // which come with some extra information, like line numbers
  parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]> = {};
  // All other errors caught during compilation
  validationErrorsByFilePath: Record<string, string> = {};

  /**
   * Ingest the available configuration files
   * and scan the content directory for Markdoc files.
   */
  constructor(p: {
    sitewidePrefsFilepath: string;
    prefOptionsConfigDir: string;
    contentDir: string;
    partialsDir: string;
  }) {
    this.prefOptionsConfig = ConfigProcessor.loadPrefOptionsFromDir(
      p.prefOptionsConfigDir
    );
    this.sitewidePrefNames = ConfigProcessor.loadSitewidePrefsConfigFromFile(
      p.sitewidePrefsFilepath
    );
    this.markdocFiles = findInDir(p.contentDir, /\.mdoc$/);
    this.partialsDir = p.partialsDir;
  }

  /**
   * Compile all detected Markdoc files to HTML.
   */
  compile() {
    for (const markdocFile of this.markdocFiles) {
      const { ast, frontmatter, partials, errorReports } = FileParser.parseMdocFile(
        markdocFile,
        this.partialsDir
      );

      // if the file has errors, log the errors for later output
      // and continue to the next file
      if (errorReports.length > 0) {
        this.parsingErrorReportsByFilePath[markdocFile] = errorReports;
        continue;
      }

      // verify that all possible placeholder values
      // yield an existing options set
      try {
        validatePlaceholders(frontmatter, this.prefOptionsConfig);
      } catch (e) {
        if (e instanceof Error) {
          this.validationErrorsByFilePath[markdocFile] = e.message;
        } else if (typeof e === 'string') {
          this.validationErrorsByFilePath[markdocFile] = e;
        } else {
          this.validationErrorsByFilePath[markdocFile] = JSON.stringify(e);
        }
        continue;
      }

      // build the renderable tree and write the file to HTML
      try {
        const renderableTree = FileParser.buildRenderableTree({
          ast,
          partials,
          frontmatter,
          prefOptionsConfig: this.prefOptionsConfig
        });

        const html = MarkdocStaticCompiler.renderers.html(renderableTree);
        const styledHtml = `<style>.markdoc__hidden { background-color: lightgray; }</style>${html}`;
        fs.writeFileSync(
          markdocFile.replace(/\.mdoc$/, '.html'),
          prettier.format(styledHtml, { parser: 'html' })
        );
      } catch (e) {
        if (e instanceof Error) {
          this.validationErrorsByFilePath[markdocFile] = e.message;
        } else if (typeof e === 'string') {
          this.validationErrorsByFilePath[markdocFile] = e;
        } else {
          this.validationErrorsByFilePath[markdocFile] = JSON.stringify(e);
        }
      }
    }

    return {
      hasErrors: this.hasErrors(),
      parsingErrorReportsByFilePath: this.parsingErrorReportsByFilePath,
      validationErrorsByFilePath: this.validationErrorsByFilePath
    };
  }

  hasErrors() {
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
}
