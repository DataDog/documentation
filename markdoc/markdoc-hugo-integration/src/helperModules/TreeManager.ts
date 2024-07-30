import { PrefOptionsConfig } from '../schemas/yaml/prefOptions';
import { ParsedFile } from './FileParser';
import MarkdocStaticCompiler, {
  RenderableTreeNodes,
  RenderableTreeNode,
  ClientFunction,
  ClientFunctionSchema
} from 'markdoc-static-compiler';

/**
 * A set of functions for working with Markdoc's renderable tree.
 */
export class TreeManager {
  /**
   * Collect the top-level client functions inside the renderable tree,
   * and return them in a dictionary with the function's ref string as the key.
   */
  static getIfFunctionsByRef(node: RenderableTreeNodes): Record<string, ClientFunction> {
    let clientFunctions: Record<string, ClientFunction> = {};

    if (!node || typeof node !== 'object') return clientFunctions;

    if (Array.isArray(node)) {
      node.forEach((n) => {
        const functions = this.getIfFunctionsByRef(n);
        clientFunctions = { ...clientFunctions, ...functions };
      });
    }

    if ('$$mdtype' in node && node.$$mdtype === 'Tag' && node.if) {
      let clientFunction;
      try {
        clientFunction = ClientFunctionSchema.parse(node.if);
      } catch (e) {
        return clientFunctions;
      }
      clientFunctions[clientFunction.ref] = clientFunction;
    }

    if ('children' in node && node.children) {
      const functions = this.getIfFunctionsByRef(node.children);
      clientFunctions = { ...clientFunctions, ...functions };
    }

    return clientFunctions;
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
}
