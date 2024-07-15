import fs from 'fs';
import { PrefOptionsConfig } from './schemas/yaml/prefOptions';
import { validatePlaceholders } from './helpers/frontmatterValidation';
import {
  loadPrefOptionsFromDir,
  loadSitewidePrefsConfigFromFile,
  getDefaultValuesByPrefId
} from './helpers/configIngestion';
import { parseMarkdocFile } from './helpers/compilation';
import MarkdocStaticCompiler from 'markdoc-static-compiler';
import { findInDir } from './helpers/filesystem';
import prettier from 'prettier';

export class MarkdocHugoIntegration {
  prefOptionsConfig: PrefOptionsConfig;
  sitewidePrefNames: string[] = [];
  markdocFiles: string[] = [];
  partialsDir: string;

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
    this.prefOptionsConfig = loadPrefOptionsFromDir(p.prefOptionsConfigDir);
    this.sitewidePrefNames = loadSitewidePrefsConfigFromFile(p.sitewidePrefsFilepath);
    this.markdocFiles = findInDir(p.contentDir, /\.mdoc$/);
    this.partialsDir = p.partialsDir;
  }

  /**
   * Compile all detected Markdoc files to HTML.
   */
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
      const variables = getDefaultValuesByPrefId(frontmatter, this.prefOptionsConfig);

      const renderableTree = MarkdocStaticCompiler.transform(ast, {
        variables,
        partials
      });

      const html = MarkdocStaticCompiler.renderers.html(renderableTree);
      const styledHtml = `<style>.markdoc__hidden { background-color: lightgray; }</style>${html}`;
      fs.writeFileSync(
        markdocFile.replace(/\.mdoc$/, '.html'),
        prettier.format(styledHtml, { parser: 'html' })
      );
    }
  }
}
