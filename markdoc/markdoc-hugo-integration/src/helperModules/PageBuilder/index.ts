import { PrefOptionsConfig } from '../../schemas/yaml/prefOptions';
import { ParsedFile } from '../FileParser';
import { ConfigProcessor } from '../ConfigProcessor';
import MarkdocStaticCompiler, {
  RenderableTreeNodes,
  RenderableTreeNode
} from 'markdoc-static-compiler';
import prettier from 'prettier';
import fs from 'fs';
import path from 'path';
import { Chooser } from './components/Chooser';
import { renderToString } from 'react-dom/server';
import { SharedRenderer } from '../SharedRenderer';
import { Frontmatter } from '../../schemas/yaml/frontMatter';

const stylesStr = fs.readFileSync(path.resolve(__dirname, 'assets/styles.css'), 'utf8');

const clientRendererScriptStr = fs.readFileSync(
  path.resolve(__dirname, 'compiledScripts/markdoc-client-renderer.js'),
  'utf8'
);

const minifiedClientRendererScriptStr = fs.readFileSync(
  path.resolve(__dirname, 'compiledScripts/markdoc-client-renderer.min.js'),
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
 * a chooser component, the main HTML content, and a script
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
    const defaultValsByPrefId = ConfigProcessor.getDefaultValuesByPrefId(
      args.parsedFile.frontmatter,
      args.prefOptionsConfig
    );

    const renderableTree = this.#buildRenderableTree({
      parsedFile: args.parsedFile,
      prefOptionsConfig: args.prefOptionsConfig,
      defaultValsByPrefId
    });

    const chooserHtml = this.#getChooserHtml({
      frontmatter: args.parsedFile.frontmatter,
      prefOptionsConfig: args.prefOptionsConfig,
      defaultValsByPrefId
    });

    const rerenderScript = this.#getRerenderScript({
      pageBuildArgs: args,
      defaultValsByPrefId,
      renderableTree
    });

    // Build the page content HTML
    let pageContents = `
<div id="markdoc-chooser">${chooserHtml}</div>
<div id="markdoc-content">${MarkdocStaticCompiler.renderers.html(renderableTree)}</div>
${rerenderScript}
`;

    if (args.includeAssetsInline) {
      pageContents = this.#addInlineAssets({
        pageContents,
        debug: args.debug
      });
    }

    if (args.debug) {
      pageContents = prettier.format(pageContents, { parser: 'html' });
    }

    if (args.outputFormat === 'markdown') {
      pageContents = this.#addFrontmatter({
        pageContents,
        frontmatter: args.parsedFile.frontmatter
      });
    }

    return pageContents;
  }

  /**
   * Remove the line breaks from a string.
   */
  static #removeLineBreaks(str: string): string {
    return str.replace(/(\r\n|\n|\r)/gm, '');
  }

  static #getChooserHtml(p: {
    frontmatter: Frontmatter;
    prefOptionsConfig: PrefOptionsConfig;
    defaultValsByPrefId: Record<string, string>;
  }): string {
    let chooser = '';

    if (p.frontmatter.page_preferences) {
      const resolvedPagePrefs = SharedRenderer.resolvePagePrefs({
        pagePrefsConfig: p.frontmatter.page_preferences,
        prefOptionsConfig: p.prefOptionsConfig,
        valsByPrefId: p.defaultValsByPrefId
      });
      chooser = renderToString(Chooser(resolvedPagePrefs));
    }

    return chooser;
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
  static getClientRendererScriptStr(debug: boolean) {
    if (debug) {
      return minifiedClientRendererScriptStr;
    } else {
      return clientRendererScriptStr;
    }
  }

  /**
   * Collect all variable identifiers referenced in the markup.
   * (The markup must first be parsed into a renderable tree.)
   *
   * @param node A renderable tree.
   * @returns A list of variable identifiers found in the tree.
   */
  static #collectVarIdsFromTree(node: RenderableTreeNodes): string[] {
    let variableIdentifiers: string[] = [];

    if (!node) return variableIdentifiers;

    if (Array.isArray(node)) {
      node.forEach((n) => {
        const identifiers = this.#collectVarIdsFromTree(n);
        variableIdentifiers = variableIdentifiers.concat(identifiers);
      });
    }

    if (typeof node !== 'object') return variableIdentifiers;

    if ('children' in node && node.children) {
      const identifiers = this.#collectVarIdsFromTree(node.children);
      variableIdentifiers = variableIdentifiers.concat(identifiers);
    }

    if ('parameters' in node && node.parameters) {
      const identifiers = this.#collectVarIdsFromTree(Object.values(node.parameters));
      variableIdentifiers = variableIdentifiers.concat(identifiers);
    }

    if (typeof node === 'object' && '$$mdtype' in node && node.$$mdtype === 'Variable') {
      // @ts-ignore, TODO:
      //
      // This only works if we assume that the variable path is one level deep,
      // which is what we're supporting for now. In other words, there cannot be a variable
      // like `$user.database.version` in the markup -- no nested data is allowed,
      // just variables like `$database`, and `$database_version`.
      //
      // We may wind up needing to support nested data because we may need to
      // group all pref variables under a parent $prefs object or similar.
      variableIdentifiers.push(node.path?.join('.'));
    }

    if (
      typeof node === 'object' &&
      '$$mdtype' in node &&
      node.$$mdtype === 'Tag' &&
      'if' in node
    ) {
      const identifiers = this.#collectVarIdsFromTree(
        // @ts-ignore
        node.if
      );
      variableIdentifiers = variableIdentifiers.concat(identifiers);
    }

    const uniqueIdentifiers = Array.from(new Set(variableIdentifiers));

    // return the unique identifiers
    return Array.from(uniqueIdentifiers);
  }

  /**
   * Build a renderable tree from the AST, frontmatter, partials, and default values.
   * The renderable tree is used to render HTML output at compile time,
   * and when the end user changes a content preference setting.
   *
   * @param p A ParsedFile object and a PrefOptionsConfig object.
   * @returns A renderable tree.
   */
  static #buildRenderableTree(p: {
    parsedFile: ParsedFile;
    prefOptionsConfig: PrefOptionsConfig;
    defaultValsByPrefId: Record<string, string>;
  }): RenderableTreeNode {
    const renderableTree = MarkdocStaticCompiler.transform(p.parsedFile.ast, {
      variables: p.defaultValsByPrefId,
      partials: p.parsedFile.partials
    });

    // ensure that all variable ids appearing
    // in the renderable tree are valid page pref ids
    const referencedVarIds = this.#collectVarIdsFromTree(renderableTree);
    const pagePrefIds = Object.keys(p.defaultValsByPrefId);
    const invalidVarIds = referencedVarIds.filter((id) => !pagePrefIds.includes(id));

    if (invalidVarIds.length > 0) {
      throw new Error(
        `Invalid reference found in markup: ${invalidVarIds} is not a valid identifier.`
      );
    }

    return renderableTree;
  }

  /**
   * Add a frontmatter string to a page contents string.
   */
  static #addFrontmatter(p: { pageContents: string; frontmatter: Frontmatter }): string {
    return `---\ntitle: ${p.frontmatter.title}\n---\n${p.pageContents}`;
  }

  /**
   * Build the snippet of JavaScript that is used to initialize the client-side renderer
   * with all of the necessary data required to re-render the page when the user changes
   * a preference setting.
   */
  static #getRerenderScript(p: {
    pageBuildArgs: PageBuildArgs;
    defaultValsByPrefId: Record<string, string>;
    renderableTree: RenderableTreeNode;
  }): string {
    let renderableTreeStr;
    let prefOptionsConfigStr;
    let defaultValsByPrefIdStr;
    let pagePrefsConfigStr;

    if (p.pageBuildArgs.debug) {
      renderableTreeStr = JSON.stringify(p.renderableTree, null, 2);
      prefOptionsConfigStr = JSON.stringify(p.pageBuildArgs.prefOptionsConfig, null, 2);
      defaultValsByPrefIdStr = JSON.stringify(p.defaultValsByPrefId, null, 2);
      pagePrefsConfigStr = JSON.stringify(
        p.pageBuildArgs.parsedFile.frontmatter.page_preferences,
        null,
        2
      );
    } else {
      renderableTreeStr = JSON.stringify(p.renderableTree);
      prefOptionsConfigStr = JSON.stringify(p.pageBuildArgs.prefOptionsConfig);
      defaultValsByPrefIdStr = JSON.stringify(p.defaultValsByPrefId);
      pagePrefsConfigStr = JSON.stringify(
        p.pageBuildArgs.parsedFile.frontmatter.page_preferences
      );
    }

    let script = `
  <script>
    clientRenderer.initialize({
        pagePrefsConfig: ${pagePrefsConfigStr},
        prefOptionsConfig: ${prefOptionsConfigStr},
        selectedValsByPrefId: ${defaultValsByPrefIdStr},
        renderableTree: ${renderableTreeStr}
    });
  </script>
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
      ${this.getClientRendererScriptStr(p.debug)}
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
