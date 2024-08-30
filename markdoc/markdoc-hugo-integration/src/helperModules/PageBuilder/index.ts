import { PrefOptionsConfig } from '../../schemas/yaml/prefOptions';
import { ParsedFile } from '../MdocFileParser';
import { YamlConfigParser } from '../YamlConfigParser';
import MarkdocStaticCompiler, { RenderableTreeNode } from 'markdoc-static-compiler';
import prettier from 'prettier';
import fs from 'fs';
import path from 'path';
import { buildFilterSelectorUi } from './components/ContentFilter';
import { Frontmatter } from '../../schemas/yaml/frontMatter';
import { buildRenderableTree, getMinifiedIfFunctionsByRef } from '../treeManagement';
import { resolvePagePrefs } from '../prefsResolution';
import { customComponents } from '../../markdocParserConfig';
import yaml from 'js-yaml';
import { PageTemplate } from './templates/PageTemplate';
import { renderToString } from 'react-dom/server';

const stylesStr = fs.readFileSync(path.resolve(__dirname, 'assets/styles.css'), 'utf8');

const clientPrefsManagerScriptStr = fs.readFileSync(
  path.resolve(__dirname, 'compiledScripts/markdoc-client-prefs-manager.js'),
  'utf8'
);

const minifiedClientPrefsManagerScriptStr = fs.readFileSync(
  path.resolve(__dirname, 'compiledScripts/markdoc-client-prefs-manager.min.js'),
  'utf8'
);

/**
 * All of the data required to build an HTML or Markdown page
 * from an .mdoc file.
 */
export interface PageBuildArgs {
  parsedFile: ParsedFile;
  prefOptionsConfig: PrefOptionsConfig;
  includeAssetsInline: boolean;
  debug: boolean;
  outputFormat: 'html' | 'markdown';
}

/**
 * A class that functions as a module, providing methods
 * for building HTML or Markdown strings from parsed .mdoc files.
 *
 * The PageBuilder uses the parsed Markdoc file to build
 * the filter selector component, the main HTML content, and a script
 * that initializes the client-side renderer
 * with the necessary data to re-render the page
 * when the user changes a preference setting.
 */
export class PageBuilder {
  /**
   * Build the HTML output for a given parsed .mdoc file.
   * This HTML output can be processed by Hugo to generate a static page.
   */
  static build(args: PageBuildArgs): string {
    const defaultValsByPrefId = YamlConfigParser.getDefaultValuesByPrefId(
      args.parsedFile.frontmatter,
      args.prefOptionsConfig
    );

    const renderableTree = buildRenderableTree({
      parsedFile: args.parsedFile,
      prefOptionsConfig: args.prefOptionsConfig,
      defaultValsByPrefId
    });

    const pageInitScript = this.#getPageInitScript({
      pageBuildArgs: args,
      defaultValsByPrefId,
      renderableTree
    });

    let articleHtml = MarkdocStaticCompiler.renderers.html(
      renderableTree,
      undefined,
      customComponents
    );

    articleHtml = prettier.format(articleHtml, { parser: 'html' });

    const pageJsx = PageTemplate({
      frontmatter: args.parsedFile.frontmatter,
      prefOptionsConfig: args.prefOptionsConfig,
      valsByPrefId: defaultValsByPrefId,
      articleHtml
    });

    let pageHtml = renderToString(pageJsx);
    pageHtml += `\n<div x-init='${pageInitScript}'></div>`;

    if (args.includeAssetsInline) {
      pageHtml = this.#addInlineAssets({
        pageContents: pageHtml,
        debug: args.debug
      });
    }

    if (args.debug) {
      pageHtml = prettier.format(pageHtml, { parser: 'html' });
    }

    if (args.outputFormat === 'markdown') {
      pageHtml = this.#addFrontmatter({
        pageContents: pageHtml,
        frontmatter: args.parsedFile.frontmatter
      });
    }

    return pageHtml;
  }

  /**
   * Remove the line breaks from a string.
   */
  static #removeLineBreaks(str: string): string {
    return str.replace(/(\r\n|\n|\r)/gm, '');
  }

  static #getFilterSelectorHtml(p: {
    frontmatter: Frontmatter;
    prefOptionsConfig: PrefOptionsConfig;
    defaultValsByPrefId: Record<string, string>;
  }): string {
    let filterSelectorHtml = '';

    if (p.frontmatter.page_preferences) {
      const resolvedPagePrefs = resolvePagePrefs({
        pagePrefsConfig: p.frontmatter.page_preferences,
        prefOptionsConfig: p.prefOptionsConfig,
        valsByPrefId: p.defaultValsByPrefId
      });
      filterSelectorHtml = buildFilterSelectorUi(resolvedPagePrefs);
    }

    return filterSelectorHtml;
  }

  /**
   * Provide the CSS styles for the rendered page.
   * If debug mode is enabled, include additional styles
   * to reveal hidden elements on the page.
   */
  static getStylesStr(debug: boolean) {
    let result = stylesStr;
    if (debug) {
      result = `
      ${result}
      .markdoc__hidden {
        background-color: lightgray;
      }
      `;
    } else {
      result = this.#removeLineBreaks(result);
    }
    return result;
  }

  /**
   * Provide the JavaScript code for the client-side renderer.
   */
  static getClientPrefsManagerScriptStr(debug: boolean) {
    return minifiedClientPrefsManagerScriptStr;
  }

  /**
   * Add a frontmatter string to a page contents string.
   */
  static #addFrontmatter(p: { pageContents: string; frontmatter: Frontmatter }): string {
    const { page_preferences, ...rest } = p.frontmatter;
    return `---\n${yaml.dump(rest)}---\n${p.pageContents}`;
  }

  /**
   * Build the snippet of JavaScript that is used to initialize the client-side renderer
   * with all of the necessary data required to re-render the page when the user changes
   * a preference setting.
   */
  static #getPageInitScript(p: {
    pageBuildArgs: PageBuildArgs;
    defaultValsByPrefId: Record<string, string>;
    renderableTree: RenderableTreeNode;
  }): string {
    // If debug mode is enabled, pretty-print data structures
    let stringificationSpace: undefined | number = undefined;
    if (p.pageBuildArgs.debug) {
      stringificationSpace = 2;
    }

    let initFunctionStr = '';
    if (!p.pageBuildArgs.parsedFile.frontmatter.page_preferences) {
      initFunctionStr = `const initPage = () => clientPrefsManager.initialize({});\n`;
    } else {
      let pagePrefsConfigStr;

      if (p.pageBuildArgs.parsedFile.frontmatter.page_preferences) {
        pagePrefsConfigStr = JSON.stringify(
          YamlConfigParser.minifyPagePrefsConfig(
            p.pageBuildArgs.parsedFile.frontmatter.page_preferences
          ),
          null,
          stringificationSpace
        );
      }

      initFunctionStr = `const initPage = () => { 
  clientPrefsManager.initialize({
    pagePrefsConfig: ${pagePrefsConfigStr},
    prefOptionsConfig: ${JSON.stringify(
      YamlConfigParser.minifyPrefOptionsConfig(p.pageBuildArgs.prefOptionsConfig),
      null,
      stringificationSpace
    )},
    selectedValsByPrefId: ${JSON.stringify(
      p.defaultValsByPrefId,
      null,
      stringificationSpace
    )},
    ifFunctionsByRef: ${JSON.stringify(
      getMinifiedIfFunctionsByRef(p.renderableTree),
      null,
      stringificationSpace
    )}
  });
};\n`;
    }

    let script = `
    ${initFunctionStr}
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(initPage, 1);
    } else {
      document.addEventListener("DOMContentLoaded", initPage);
    }
  `;

    if (p.pageBuildArgs.debug) {
      script = prettier.format(script, { parser: 'html' });
    } else {
      script = this.#removeLineBreaks(script);
    }

    return script;
  }

  /**
   * If the page should act as a standalone HTML page,
   * wrap the page contents in an HTML document
   * that includes the CSS and JavaScript assets that would
   * normally be included in the head of the layout template.
   */
  static #addInlineAssets(p: { pageContents: string; debug: boolean }) {
    return `
<!DOCTYPE html>
<html>
  <head>
    <script>
      ${this.getClientPrefsManagerScriptStr(p.debug)}
    </script>
    <style>
      ${this.getStylesStr(p.debug)}
    </style>
  </head>
  <body>
    ${p.pageContents}
  </body>
</html>
`;
  }
}
