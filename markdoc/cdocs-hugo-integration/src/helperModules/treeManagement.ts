/**
 * A set of functions for working with Markdoc's renderable tree.
 * For example, we collect conditions from the renderable tree
 * so we can attach them to their corresponding elements
 * using event listeners.
 *
 * The renderable tree is used to render HTML output at compile time.
 * Read more about Markdoc's phases: https://markdoc.dev/docs/render
 */

import { CompilationError, ParsedFile } from '../schemas/compilationResults';
import CdocsMarkdoc, {
  RenderableTreeNodes,
  RenderableTreeNode,
  ClientFunctionSchema,
  Tag
} from 'cdocs-markdoc';
import {
  MinifiedClientFunction,
  minifyClientFunction
} from './PageBuilder/pageConfigMinification';
import { transformConfig } from '../markdocParserConfig';
import { HugoFunctions } from './HugoFunctions';
import { FiltersManifest } from 'cdocs-data';

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
 * and when the end user changes a content filter setting.
 */
export function buildRenderableTree(p: {
  parsedFile: ParsedFile;
  variables: Record<string, any>;
  filtersManifest: FiltersManifest;
}): { renderableTree: RenderableTreeNode; errors: CompilationError[] } {
  const errors: CompilationError[] = [];

  const renderableTree = CdocsMarkdoc.transform(p.parsedFile.ast, {
    variables: {
      ...p.filtersManifest.defaultValsByTraitId,
      ...JSON.parse(JSON.stringify(p.variables))
    },
    partials: p.parsedFile.partials,
    ...transformConfig
  });

  addHeaderAnchorstoTree(renderableTree);

  const referencedValsByTraitId = collectReferencedValsByVarId(renderableTree);

  const referencedTraitIds = Object.keys(referencedValsByTraitId);

  // ensure that all variable ids appearing
  // in the renderable tree are valid page filter ids
  const traitIds = Object.keys(p.filtersManifest.defaultValsByTraitId);
  const invalidTraitIds = referencedTraitIds.filter((id) => !traitIds.includes(id));

  if (invalidTraitIds.length > 0) {
    invalidTraitIds.forEach((id) => {
      errors.push({
        message: `Invalid filter ID found in markup: ${id}`,
        searchTerm: id
      });
    });
  }

  // ensure that all referenced values are valid
  Object.keys(referencedValsByTraitId).forEach((traitId) => {
    const referencedVals = referencedValsByTraitId[traitId];
    const possibleVals = p.filtersManifest.filtersByTraitId[traitId]?.possibleVals;

    // Skip adding error for a bad filter ID,
    // since those are already caught above
    if (!possibleVals) {
      return;
    }

    const invalidVals = referencedVals.filter((value) => !possibleVals.includes(value));
    if (invalidVals.length > 0) {
      invalidVals.forEach((val) => {
        errors.push({
          message: `Invalid value found in markup: "${val}" is not a valid value for the filter ID "${traitId}".`,
          searchTerm: val
        });
      });
    }
  });

  return { errors, renderableTree };
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
    if (
      node.attributes !== null &&
      node.children !== null &&
      typeof node.children[0] === 'string'
    ) {
      node.attributes.id =
        node.attributes.id || HugoFunctions.anchorize(node.children[0]);
    }
  }

  if ('children' in node && Array.isArray(node.children)) {
    node.children.forEach((child) => addHeaderAnchorstoTree(child));
  }
}

/**
 * Collect all variable IDs referenced in the markup,
 * along with an array of their expected values.
 * (The markup must first be parsed into a renderable tree.)
 *
 * @returns A list of variable IDs found in the tree.
 */
function collectReferencedValsByVarId(
  node: RenderableTreeNodes
): Record<string, string[]> {
  let referencedValsByVarId: Record<string, string[]> = {};

  if (!node) return referencedValsByVarId;

  // If the node is an array, collect referenced values recursively
  if (Array.isArray(node)) {
    node.forEach((n) => {
      const valsById = collectReferencedValsByVarId(n);
      Object.keys(valsById).forEach((id) => {
        if (id in referencedValsByVarId) {
          referencedValsByVarId[id] = referencedValsByVarId[id].concat(valsById[id]);
        } else {
          referencedValsByVarId[id] = valsById[id];
        }
      });
    });
  }

  if (typeof node !== 'object') return referencedValsByVarId;

  // Collect referenced values from the node's children if present
  if ('children' in node && node.children) {
    const valsById = collectReferencedValsByVarId(node.children);
    Object.keys(valsById).forEach((id) => {
      if (id in referencedValsByVarId) {
        referencedValsByVarId[id] = referencedValsByVarId[id].concat(valsById[id]);
      } else {
        referencedValsByVarId[id] = valsById[id];
      }
      referencedValsByVarId[id] = Array.from(new Set(referencedValsByVarId[id]));
    });
  }

  if (typeof node !== 'object' || !('$$mdtype' in node)) {
    return referencedValsByVarId;
  }

  // Collect referenced values from an `if` tag
  if (node.$$mdtype === 'Tag' && 'if' in node) {
    const valsById = collectReferencedValsByVarId(
      // @ts-ignore
      node.if
    );
    Object.keys(valsById).forEach((id) => {
      if (id in referencedValsByVarId) {
        referencedValsByVarId[id] = referencedValsByVarId[id].concat(valsById[id]);
      } else {
        referencedValsByVarId[id] = valsById[id];
      }
      referencedValsByVarId[id] = Array.from(new Set(referencedValsByVarId[id]));
    });
  }

  // Collect referenced values from a `function` tag
  if (node.$$mdtype === 'Function') {
    if (
      node.parameters &&
      typeof node.parameters === 'object' &&
      Object.keys(node.parameters).length === 2
    ) {
      // @ts-ignore
      const varId = node.parameters[0].path?.join('.');
      // @ts-ignore
      const value = node.parameters[1];
      if (varId in referencedValsByVarId) {
        referencedValsByVarId[varId].push(value);
      } else {
        referencedValsByVarId[varId] = [value];
      }
      referencedValsByVarId[varId] = Array.from(new Set(referencedValsByVarId[varId]));

      const parameters = Object.values(node.parameters);
      parameters.forEach((p) => {
        const valsById = collectReferencedValsByVarId(p);
        Object.keys(valsById).forEach((id) => {
          if (id in referencedValsByVarId) {
            referencedValsByVarId[id] = referencedValsByVarId[id].concat(valsById[id]);
          } else {
            referencedValsByVarId[id] = valsById[id];
          }
          referencedValsByVarId[id] = Array.from(new Set(referencedValsByVarId[id]));
        });
      });
    }
  }

  delete referencedValsByVarId.undefined;
  return referencedValsByVarId;
}
