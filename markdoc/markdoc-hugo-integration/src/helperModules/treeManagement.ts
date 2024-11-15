/**
 * A set of functions for working with Markdoc's renderable tree.
 * For example, we collect conditions from the renderable tree
 * so we can attach them to their corresponding elements
 * using event listeners.
 *
 * The renderable tree is used to render HTML output at compile time.
 * Read more about Markdoc's phases: https://markdoc.dev/docs/render
 */

import { ParsedFile } from '../schemas/compilationResults';
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
import { PageFiltersManifest } from '../schemas/pageFilters';

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
 *
 * @param p A ParsedFile object and a FilterOptionsConfig object.
 * @returns A renderable tree and any errors encountered.
 */
export function buildRenderableTree(p: {
  parsedFile: ParsedFile;
  variables: Record<string, any>;
  filtersManifest: PageFiltersManifest;
}): { renderableTree: RenderableTreeNode; errors: string[] } {
  const errors: string[] = [];

  const renderableTree = MarkdocStaticCompiler.transform(p.parsedFile.ast, {
    variables: {
      ...p.filtersManifest.defaultValsByFilterId,
      ...JSON.parse(JSON.stringify(p.variables))
    },
    partials: p.parsedFile.partials,
    ...transformConfig
  });

  addHeaderAnchorstoTree(renderableTree);

  const referencedValsByFilterId = collectReferencedValuesByVarId(renderableTree);

  const referencedFilterIds = Object.keys(referencedValsByFilterId);

  // ensure that all variable ids appearing
  // in the renderable tree are valid page filter ids
  const pageFilterIds = Object.keys(p.filtersManifest.defaultValsByFilterId);
  const invalidFilterIds = referencedFilterIds.filter(
    (id) => !pageFilterIds.includes(id)
  );

  if (invalidFilterIds.length > 0) {
    errors.push(`Invalid filter IDs found in markup: ${invalidFilterIds}`);
  }

  // ensure that all referenced values are valid
  Object.keys(referencedValsByFilterId).forEach((filterId) => {
    const referencedValues = referencedValsByFilterId[filterId];
    const possibleValues = p.filtersManifest.filtersById[filterId]?.possibleValues;

    // Skip adding error for a bad filter ID,
    // since those are already caught above
    if (!possibleValues) {
      return;
    }

    const invalidValues = referencedValues.filter(
      (value) => !possibleValues.includes(value)
    );
    if (invalidValues.length > 0) {
      errors.push(
        `Invalid value found in markup: "${invalidValues}" is not a valid value for the filter ID "${filterId}".`
      );
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
      node.attributes.id = node.attributes.id || anchorize(node.children[0]);
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
 * @param node A renderable tree.
 * @returns A list of variable IDs found in the tree.
 */
function collectReferencedValuesByVarId(
  node: RenderableTreeNodes
): Record<string, string[]> {
  let referencedValuesByVarId: Record<string, string[]> = {};

  if (!node) return referencedValuesByVarId;

  // If the node is an array, collect referenced values recursively
  if (Array.isArray(node)) {
    node.forEach((n) => {
      const valuesById = collectReferencedValuesByVarId(n);
      Object.keys(valuesById).forEach((id) => {
        if (id in referencedValuesByVarId) {
          referencedValuesByVarId[id] = referencedValuesByVarId[id].concat(
            valuesById[id]
          );
        } else {
          referencedValuesByVarId[id] = valuesById[id];
        }
      });
    });
  }

  if (typeof node !== 'object') return referencedValuesByVarId;

  // Collect referenced values from the node's children if present
  if ('children' in node && node.children) {
    const valuesById = collectReferencedValuesByVarId(node.children);
    Object.keys(valuesById).forEach((id) => {
      if (id in referencedValuesByVarId) {
        referencedValuesByVarId[id] = referencedValuesByVarId[id].concat(valuesById[id]);
      } else {
        referencedValuesByVarId[id] = valuesById[id];
      }
      referencedValuesByVarId[id] = Array.from(new Set(referencedValuesByVarId[id]));
    });
  }

  if (typeof node !== 'object' || !('$$mdtype' in node)) {
    return referencedValuesByVarId;
  }

  // Collect referenced values from an `if` tag
  if (node.$$mdtype === 'Tag' && 'if' in node) {
    const valuesById = collectReferencedValuesByVarId(
      // @ts-ignore
      node.if
    );
    Object.keys(valuesById).forEach((id) => {
      if (id in referencedValuesByVarId) {
        referencedValuesByVarId[id] = referencedValuesByVarId[id].concat(valuesById[id]);
      } else {
        referencedValuesByVarId[id] = valuesById[id];
      }
      referencedValuesByVarId[id] = Array.from(new Set(referencedValuesByVarId[id]));
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
      if (varId in referencedValuesByVarId) {
        referencedValuesByVarId[varId].push(value);
      } else {
        referencedValuesByVarId[varId] = [value];
      }
      referencedValuesByVarId[varId] = Array.from(
        new Set(referencedValuesByVarId[varId])
      );

      const parameters = Object.values(node.parameters);
      parameters.forEach((p) => {
        const valuesById = collectReferencedValuesByVarId(p);
        Object.keys(valuesById).forEach((id) => {
          if (id in referencedValuesByVarId) {
            referencedValuesByVarId[id] = referencedValuesByVarId[id].concat(
              valuesById[id]
            );
          } else {
            referencedValuesByVarId[id] = valuesById[id];
          }
          referencedValuesByVarId[id] = Array.from(new Set(referencedValuesByVarId[id]));
        });
      });
    }
  }

  delete referencedValuesByVarId.undefined;
  return referencedValuesByVarId;
}
