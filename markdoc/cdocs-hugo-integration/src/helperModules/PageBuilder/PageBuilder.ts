import { ParsedFile } from '../../schemas/compilationResults';
import { RenderableTreeNode } from 'cdocs-markdoc';
import prettier from 'prettier';
import fs from 'fs';
import path from 'path';
import { FiltersManifest, pruneManifestForClient } from 'cdocs-data';
import { buildRenderableTree, getMinifiedIfFunctionsByRef } from '../treeManagement';
import { customComponents } from '../../markdocParserConfig';
import yaml from 'js-yaml';
import { PageTemplate } from './PageTemplate';
import { renderToString } from 'react-dom/server';
import { HugoConfig } from '../../schemas/config/hugo';
import { render } from '../markdocCustomization/renderer';
import { FurtherReadingTemplate } from '../markdocCustomization/tags/furtherReading';
import { CompilationError } from '../../schemas/compilationResults';
import { Frontmatter } from '../../schemas/frontmatter';

const stylesStr = fs.readFileSync(path.resolve(__dirname, 'assets/styles.css'), 'utf8');

const clientFiltersManagerScriptStr = fs.readFileSync(
  path.resolve(__dirname, 'compiledScripts/markdoc-client-filters-manager.min.js'),
  'utf8'
);

/**
 * A class that functions as a module, providing methods
 * for building Hugo-compatible .md files from .mdoc.md files.
 *
 * The PageBuilder uses the parsed Markdoc file to build:
 *
 * - the filter selector component, if one is present
 * - the main HTML content
 * - a script that initializes the ClientFiltersManager
 *   with the necessary data to re-render the page
 *   when the user changes a filter setting.
 */
export class PageBuilder {
  /**
   * Build the .md output for a given parsed .mdoc.md file.
   */
  static build(p: {
    parsedFile: ParsedFile;
    hugoConfig: HugoConfig;
    filtersManifest: FiltersManifest;
  }): { html: string; errors: CompilationError[] } {
    const variables = p.filtersManifest.defaultValsByTraitId;

    const { renderableTree, errors } = buildRenderableTree({
      parsedFile: p.parsedFile,
      variables,
      filtersManifest: p.filtersManifest
    });

    const pageInitScript = this.#getPageInitScript({
      renderableTree,
      filtersManifest: p.filtersManifest
    });

    let articleHtml = render({
      node: renderableTree,
      markdocConfig: { variables },
      hugoConfig: p.hugoConfig,
      components: customComponents
    });

    articleHtml = prettier.format(articleHtml, { parser: 'html' });

    if (p.parsedFile.frontmatter.further_reading) {
      const jsx = FurtherReadingTemplate({
        furtherReadingConfig: p.parsedFile.frontmatter.further_reading,
        hugoConfig: p.hugoConfig
      });

      articleHtml = articleHtml.replace('</article>', renderToString(jsx) + '</article>');
    }

    const pageJsx = PageTemplate({
      valsByTraitId: p.filtersManifest.defaultValsByTraitId,
      filtersManifest: p.filtersManifest,
      articleHtml
    });

    let pageHtml = renderToString(pageJsx);
    pageHtml += `\n<div x-init='${pageInitScript}'></div>`;

    pageHtml = this.#addFrontMatter({
      pageContents: pageHtml,
      frontMatter: p.parsedFile.frontmatter
    });

    return { html: pageHtml, errors };
  }

  /**
   * Remove the line breaks from a string.
   */
  static #removeLineBreaks(str: string): string {
    return str.replace(/(\r\n|\n|\r)/gm, '');
  }

  /**
   * Provide the CSS styles for the rendered page.
   * If debug mode is enabled, include additional styles
   * to reveal hidden elements on the page.
   */
  static getStylesStr() {
    return this.#removeLineBreaks(stylesStr);
  }

  /**
   * Provide the JavaScript code for the ClientFiltersManager.
   */
  static getClientFiltersManagerScriptStr() {
    return clientFiltersManagerScriptStr;
  }

  /**
   * Add a front matter string to a page contents string.
   */
  static #addFrontMatter(p: { pageContents: string; frontMatter: Frontmatter }): string {
    const { content_filters, ...rest } = p.frontMatter;
    return `---\n${yaml.dump(rest)}---\n${p.pageContents}`;
  }

  /**
   * Build the snippet of JavaScript that is used to initialize the ClientFiltersManager
   * with all of the necessary data required to re-render the page when the user changes
   * a filter setting.
   */
  static #getPageInitScript(p: {
    renderableTree: RenderableTreeNode;
    filtersManifest: FiltersManifest;
  }): string {
    const initFunctionName = 'initPage';
    const docReadyExecutionScript = `if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(initPage, 1);
} else {
  document.addEventListener("DOMContentLoaded", ${initFunctionName});
}
`;

    const initFunctionStr = `const ${initFunctionName} = () => { 
clientFiltersManager.initialize({
    ifFunctionsByRef: ${JSON.stringify(getMinifiedIfFunctionsByRef(p.renderableTree))},
    filtersManifest: ${JSON.stringify(pruneManifestForClient(p.filtersManifest))}
  });
}; `;

    return this.#removeLineBreaks(initFunctionStr + docReadyExecutionScript);
  }
}
