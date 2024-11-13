import { PrefOptionsConfig } from '../../schemas/yaml/prefOptions';
import { ParsedFile } from '../../schemas/compilationResults';
import { YamlConfigParser } from '../YamlConfigParser';
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
import { PagePrefsManifest } from '../../schemas/pagePrefs';
import { render } from '../renderer';
import { FurtherReadingTemplate } from '../../components/furtherReading';

const stylesStr = fs.readFileSync(path.resolve(__dirname, 'assets/styles.css'), 'utf8');

const clientPrefsManagerScriptStr = fs.readFileSync(
  path.resolve(__dirname, 'compiledScripts/markdoc-client-prefs-manager.min.js'),
  'utf8'
);

/**
 * A class that functions as a module, providing methods
 * for building Hugo-compatible .md files from .mdoc files.
 *
 * The PageBuilder uses the parsed Markdoc file to build:
 *
 * - the filter selector component, if one is present
 * - the main HTML content
 * - a script that initializes the ClientPrefsManager
 *   with the necessary data to re-render the page
 *   when the user changes a preference setting.
 */
export class PageBuilder {
  /**
   * Build the .md output for a given parsed .mdoc file.
   */
  static build(p: {
    parsedFile: ParsedFile;
    prefOptionsConfig: PrefOptionsConfig;
    hugoConfig: HugoConfig;
    prefsManifest: PagePrefsManifest;
  }): { html: string; errors: string[] } {
    const variables = p.prefsManifest.defaultValsByPrefId;

    const { renderableTree, errors } = buildRenderableTree({
      parsedFile: p.parsedFile,
      variables,
      prefsManifest: p.prefsManifest
    });

    const pageInitScript = this.#getPageInitScript({
      renderableTree,
      prefsManifest: p.prefsManifest
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
      valsByPrefId: p.prefsManifest.defaultValsByPrefId,
      prefsManifest: p.prefsManifest,
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
   * Provide the JavaScript code for the ClientPrefsManager.
   */
  static getClientPrefsManagerScriptStr() {
    return clientPrefsManagerScriptStr;
  }

  /**
   * Add a frontmatter string to a page contents string.
   */
  static #addFrontmatter(p: { pageContents: string; frontmatter: Frontmatter }): string {
    const { page_preferences, ...rest } = p.frontmatter;
    return `---\n${yaml.dump(rest)}---\n${p.pageContents}`;
  }

  /**
   * Build the snippet of JavaScript that is used to initialize the ClientPrefsManager
   * with all of the necessary data required to re-render the page when the user changes
   * a preference setting.
   */
  static #getPageInitScript(p: {
    renderableTree: RenderableTreeNode;
    prefsManifest: PagePrefsManifest;
  }): string {
    const initFunctionName = 'initPage';
    const docReadyExecutionScript = `if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(initPage, 1);
} else {
  document.addEventListener("DOMContentLoaded", ${initFunctionName});
}
`;

    // If the page does not have any preferences,
    // don't pass any data to the prefs manager
    if (!Object.keys(p.prefsManifest.prefsById).length) {
      return this.#removeLineBreaks(
        `const ${initFunctionName} = () => clientPrefsManager.initialize({}); ` +
          docReadyExecutionScript
      );
    }

    const initFunctionStr = `const ${initFunctionName} = () => { 
clientPrefsManager.initialize({
    pagePrefsConfig: ${JSON.stringify(
      YamlConfigParser.minifyPagePrefsConfig(
        Object.values(p.prefsManifest.prefsById).map((p) => p.config)
      )
    )},
    prefOptionsConfig: ${JSON.stringify(
      YamlConfigParser.minifyPrefOptionsConfig(p.prefsManifest.optionSetsById)
    )},
    selectedValsByPrefId: ${JSON.stringify(p.prefsManifest.defaultValsByPrefId)},
    ifFunctionsByRef: ${JSON.stringify(getMinifiedIfFunctionsByRef(p.renderableTree))}
  });
}; `;

    return this.#removeLineBreaks(initFunctionStr + docReadyExecutionScript);
  }
}
