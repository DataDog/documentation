import { PrefOptionsConfig } from '../../schemas/yaml/prefOptions';
import { ParsedFile } from '../FileParser';
import { ConfigProcessor } from '../ConfigProcessor';
import MarkdocStaticCompiler, {
  RenderableTreeNodes,
  RenderableTreeNode
} from 'markdoc-static-compiler';
import prettier from 'prettier';
import { ResolvedPagePrefs } from '../../schemas/resolvedPagePrefs';
import fs from 'fs';
import path from 'path';
import { Chooser } from './components/chooser';
import { renderToString } from 'react-dom/server';
import { SharedRenderer } from '../SharedRenderer';

const stylesStr = fs.readFileSync(path.resolve(__dirname, 'assets/styles.css'), 'utf8');
const debugStyleOverrides = `
.markdoc__hidden {
  background-color: lightgray;
}
`;

const clientRendererScriptStr = fs.readFileSync(
  path.resolve(__dirname, 'compiledScripts/markdoc-client-renderer.js'),
  'utf8'
);

export class PageBuilder {
  static getChooserHtml(resolvedPagePrefs: ResolvedPagePrefs) {
    return renderToString(Chooser(resolvedPagePrefs));
  }

  /**
   * Build the HTML output for a given parsed .mdoc file.
   * This HTML output can be processed by Hugo to generate a static page.
   */
  static build(p: {
    parsedFile: ParsedFile;
    prefOptionsConfig: PrefOptionsConfig;
    includeAssetsInline: boolean;
    debug: boolean;
    outputMode: 'html' | 'markdown';
  }): string {
    const defaultValsByPrefId = ConfigProcessor.getDefaultValuesByPrefId(
      p.parsedFile.frontmatter,
      p.prefOptionsConfig
    );

    const renderableTree = this.buildRenderableTree({
      parsedFile: p.parsedFile,
      prefOptionsConfig: p.prefOptionsConfig,
      defaultValsByPrefId
    });

    // Build the chooser HTML, if any
    const frontmatter = p.parsedFile.frontmatter;

    let chooser = '';

    if (frontmatter.page_preferences) {
      const resolvedPrefs = SharedRenderer.resolvePagePrefs({
        pagePrefsConfig: frontmatter.page_preferences,
        prefOptionsConfig: p.prefOptionsConfig,
        valsByPrefId: defaultValsByPrefId
      });
      chooser = this.getChooserHtml(resolvedPrefs);
    }

    // Build the page content HTML
    let pageContents = `
      <div id="markdoc-chooser">${chooser}</div>
      <div id="markdoc-content">${MarkdocStaticCompiler.renderers.html(
        renderableTree
      )}</div>
      <script>
        clientRenderer.initialize({
            pagePrefsConfig: ${JSON.stringify(
              p.parsedFile.frontmatter.page_preferences,
              null,
              2
            )},
            prefOptionsConfig: ${JSON.stringify(p.prefOptionsConfig, null, 2)},
            selectedValsByPrefId: ${JSON.stringify(defaultValsByPrefId, null, 2)},
            renderableTree: ${JSON.stringify(renderableTree, null, 2)}
        });
      </script>
    `;

    if (p.includeAssetsInline) {
      pageContents = `
      <!DOCTYPE html>
      <html>
        <head>
          <script>
            ${this.getClientRendererScriptStr()}
          </script>
          <style>
            ${this.getStylesStr()}
          </style>
        </head>
        <body>
          ${pageContents}
        </body>
      </html>
    `;
    }

    pageContents = prettier.format(pageContents, { parser: 'html' });

    if (p.outputMode === 'markdown') {
      pageContents = `---\ntitle: ${p.parsedFile.frontmatter.title}\n---\n${pageContents}`;
    }
    return pageContents;
  }

  static getStylesStr() {
    return stylesStr;
  }

  static getClientRendererScriptStr() {
    return clientRendererScriptStr;
  }

  /**
   * Collect all variable identifiers referenced in the markup.
   * (The markup must first be parsed into a renderable tree.)
   *
   * @param node A renderable tree.
   * @returns A list of variable identifiers found in the tree.
   */
  static collectVarIdsFromTree(node: RenderableTreeNodes): string[] {
    let variableIdentifiers: string[] = [];

    if (!node) return variableIdentifiers;

    if (Array.isArray(node)) {
      node.forEach((n) => {
        const identifiers = this.collectVarIdsFromTree(n);
        variableIdentifiers = variableIdentifiers.concat(identifiers);
      });
    }

    if (typeof node !== 'object') return variableIdentifiers;

    if ('children' in node && node.children) {
      const identifiers = this.collectVarIdsFromTree(node.children);
      variableIdentifiers = variableIdentifiers.concat(identifiers);
    }

    if ('parameters' in node && node.parameters) {
      const identifiers = this.collectVarIdsFromTree(Object.values(node.parameters));
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
      const identifiers = this.collectVarIdsFromTree(
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
  static buildRenderableTree(p: {
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
    const referencedVarIds = this.collectVarIdsFromTree(renderableTree);
    const pagePrefIds = Object.keys(p.defaultValsByPrefId);
    const invalidVarIds = referencedVarIds.filter((id) => !pagePrefIds.includes(id));

    if (invalidVarIds.length > 0) {
      throw new Error(
        `Invalid reference found in markup: ${invalidVarIds} is not a valid identifier.`
      );
    }

    return renderableTree;
  }
}
