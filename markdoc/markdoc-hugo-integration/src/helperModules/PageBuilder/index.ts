import { ParsedFile } from '../../schemas/compilationResults';
import { RenderableTreeNode } from 'markdoc-static-compiler';
import prettier from 'prettier';
import fs from 'fs';
import path from 'path';
import { Frontmatter } from '../../schemas/yaml/frontMatter';
import { buildRenderableTree, getMinifiedIfFunctionsByRef } from '../treeManagement';
import { customComponents } from '../../markdocParserConfig';
import yaml from 'js-yaml';
import { PageTemplate } from './templates/PageTemplate';
import { renderToString } from 'react-dom/server';
import { HugoConfig } from '../../schemas/config/hugo';
import { PageFiltersManifest } from '../../schemas/pageFilters';
import { render } from '../renderer';
import { FurtherReadingTemplate } from '../../components/furtherReading';
import { FiltersManifestBuilder } from '../FiltersManifestBuilder';

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
    filtersManifest: PageFiltersManifest;
  }): { html: string; errors: string[] } {
    const variables = p.filtersManifest.defaultValsByFilterId;

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
      valsByFilterId: p.filtersManifest.defaultValsByFilterId,
      filtersManifest: p.filtersManifest,
      articleHtml
    });

    let pageHtml = renderToString(pageJsx);
    pageHtml += `\n<div x-init='${pageInitScript}'></div>`;

    pageHtml = this.#addFrontmatter({
      pageContents: pageHtml,
      frontmatter: p.parsedFile.frontmatter
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
   * Add a frontmatter string to a page contents string.
   */
  static #addFrontmatter(p: { pageContents: string; frontmatter: Frontmatter }): string {
    const { content_filters, ...rest } = p.frontmatter;
    return `---\n${yaml.dump(rest)}---\n${p.pageContents}`;
  }

  /**
   * Build the snippet of JavaScript that is used to initialize the ClientFiltersManager
   * with all of the necessary data required to re-render the page when the user changes
   * a filter setting.
   */
  static #getPageInitScript(p: {
    renderableTree: RenderableTreeNode;
    filtersManifest: PageFiltersManifest;
  }): string {
    const initFunctionName = 'initPage';
    const docReadyExecutionScript = `if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(initPage, 1);
} else {
  document.addEventListener("DOMContentLoaded", ${initFunctionName});
}
`;

    // If the page does not have any filters,
    // don't pass any data to the filters manager
    if (!Object.keys(p.filtersManifest.filtersById).length) {
      return this.#removeLineBreaks(
        `const ${initFunctionName} = () => clientFiltersManager.initialize({}); ` +
          docReadyExecutionScript
      );
    }

    const initFunctionStr = `const ${initFunctionName} = () => { 
clientFiltersManager.initialize({
    ifFunctionsByRef: ${JSON.stringify(getMinifiedIfFunctionsByRef(p.renderableTree))},
    filtersManifest: ${JSON.stringify(
      FiltersManifestBuilder.minifyManifest(p.filtersManifest)
    )}
  });
}; `;

    return this.#removeLineBreaks(initFunctionStr + docReadyExecutionScript);
  }
}
