/**
 * A set of functions for working with Markdoc's renderable tree.
 * For example, we collect conditions from the renderable tree
 * so we can attach them to their corresponding elements
 * using event listeners.
 *
 * The renderable tree is used to render HTML output at compile time.
 * Read more about Markdoc's phases: https://markdoc.dev/docs/render
 */

import { PrefOptionsConfig } from '../schemas/yaml/prefOptions';
import { ParsedFile } from './MdocFileParser';
import MarkdocStaticCompiler, {
  RenderableTreeNodes,
  RenderableTreeNode,
  ClientFunctionSchema,
  Tag
} from 'markdoc-static-compiler';
import {
  MinifiedClientFunction,
  minifyClientFunction
} from './PageBuilder/pageConfigMinification';
import { transformConfig } from '../markdocParserConfig';
import { anchorize } from './stringProcessing';

/**
 * Collect the top-level client functions inside the renderable tree,
 * and return them in a dictionary with the function's ref string as the key.
 */
export function getMinifiedIfFunctionsByRef(
  node: RenderableTreeNodes
): Record<string, MinifiedClientFunction> {
  let clientFunctionsByRef: Record<string, MinifiedClientFunction> = {};

  if (!node || typeof node !== 'object') return clientFunctionsByRef;

  if (Array.isArray(node)) {
    node.forEach((n) => {
      const functions = getMinifiedIfFunctionsByRef(n);
      clientFunctionsByRef = { ...clientFunctionsByRef, ...functions };
    });
  }

  if ('$$mdtype' in node && node.$$mdtype === 'Tag' && node.if) {
    let clientFunction;
    try {
      clientFunction = ClientFunctionSchema.parse(node.if);
    } catch (e) {
      return clientFunctionsByRef;
    }
    // @ts-ignore, this is typesafe since the above parse succeeded
    clientFunctionsByRef[clientFunction.ref] = minifyClientFunction(clientFunction);
  }

  if ('children' in node && node.children) {
    const functions = getMinifiedIfFunctionsByRef(node.children);
    clientFunctionsByRef = { ...clientFunctionsByRef, ...functions };
  }

  return clientFunctionsByRef;
}

/**
 * Build a renderable tree from the AST, frontmatter, partials, and default values.
 * The renderable tree is used to render HTML output at compile time,
 * and when the end user changes a content preference setting.
 *
 * @param p A ParsedFile object and a PrefOptionsConfig object.
 * @returns A renderable tree.
 */
export function buildRenderableTree(p: {
  parsedFile: ParsedFile;
  prefOptionsConfig: PrefOptionsConfig;
  defaultValsByPrefId: Record<string, string>;
  variables: Record<string, any>;
}): RenderableTreeNode {
  const renderableTree = MarkdocStaticCompiler.transform(p.parsedFile.ast, {
    variables: {
      ...p.defaultValsByPrefId,
      ...JSON.parse(JSON.stringify(p.variables))
    },
    partials: p.parsedFile.partials,
    ...transformConfig
  });

  addHeaderAnchorstoTree(renderableTree);

  // ensure that all variable ids appearing
  // in the renderable tree are valid page pref ids
  const referencedVarIds = collectVarIdsFromTree(renderableTree);
  const pagePrefIds = Object.keys(p.defaultValsByPrefId);
  const invalidVarIds = referencedVarIds.filter((id) => !pagePrefIds.includes(id));

  if (invalidVarIds.length > 0) {
    throw new Error(
      `Invalid reference found in markup: ${invalidVarIds} is not a valid ID.`
    );
  }

  return renderableTree;
}

/**
 * Markdoc does not automatically add anchor links to headers,
 * so this function adds them to the renderable tree.
 *
 * Markdoc does provide a way to manually set the anchor
 * link for a given header in the markup, so if a header already
 * has an ID, this function will not overwrite it.
 */
function addHeaderAnchorstoTree(node: RenderableTreeNodes): void {
  const headerTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  if (!node) return;
  if (typeof node !== 'object') return;

  if ('name' in node && headerTags.includes(node.name as string)) {
    node = node as Tag;
    if (node.attributes !== null && node.children !== null) {
      node.attributes.id = node.attributes.id || anchorize(node.children[0] as string);
    }
  }

  if ('children' in node && Array.isArray(node.children)) {
    node.children.forEach((child) => addHeaderAnchorstoTree(child));
  }
}

/**
 * Collect all variable IDs referenced in the markup.
 * (The markup must first be parsed into a renderable tree.)
 *
 * @param node A renderable tree.
 * @returns A list of variable IDs found in the tree.
 */
function collectVarIdsFromTree(node: RenderableTreeNodes): string[] {
  let varIds: string[] = [];

  if (!node) return varIds;

  if (Array.isArray(node)) {
    node.forEach((n) => {
      const ids = collectVarIdsFromTree(n);
      varIds = varIds.concat(ids);
    });
  }

  if (typeof node !== 'object') return varIds;

  if ('children' in node && node.children) {
    const ids = collectVarIdsFromTree(node.children);
    varIds = varIds.concat(ids);
  }

  if ('parameters' in node && node.parameters) {
    const ids = collectVarIdsFromTree(Object.values(node.parameters));
    varIds = varIds.concat(ids);
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
    varIds.push(node.path?.join('.'));
  }

  if (
    typeof node === 'object' &&
    '$$mdtype' in node &&
    node.$$mdtype === 'Tag' &&
    'if' in node
  ) {
    const ids = collectVarIdsFromTree(
      // @ts-ignore
      node.if
    );
    varIds = varIds.concat(ids);
  }

  // remove duplicates
  return Array.from(new Set(varIds));
}
