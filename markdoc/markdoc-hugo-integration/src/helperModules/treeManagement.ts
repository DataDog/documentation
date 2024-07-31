import { PrefOptionsConfig } from '../schemas/yaml/prefOptions';
import { ParsedFile } from './FileParser';
import MarkdocStaticCompiler, {
  RenderableTreeNodes,
  RenderableTreeNode,
  ClientFunction,
  ClientFunctionSchema,
  ClientVariable
} from 'markdoc-static-compiler';

/**
 * A set of functions for working with Markdoc's renderable tree.
 */

export interface MinifiedClientVariable {
  m: 'V';
  p: string[];
  v: any;
}

export interface MinifiedClientFunction {
  m: 'F';
  n: 'a' | 'o' | 'e' | 'n' | 'def' | 'deb';
  p: Record<string, any>;
  v: any;
  r: string;
}

export const CLIENT_FUNCTION_EXPAND_MAP = {
  F: 'Function',
  a: 'and',
  o: 'or',
  e: 'equals',
  n: 'not',
  def: 'default',
  deb: 'debug'
};

export const CLIENT_FUNCTION_MINIFY_MAP = {
  Function: 'F',
  and: 'a',
  or: 'o',
  equals: 'e',
  not: 'n',
  default: 'def',
  debug: 'deb'
};

export const expandClientVariable = (v: MinifiedClientVariable): ClientVariable => {
  return {
    $$mdtype: 'Variable',
    path: v.p,
    value: v.v
  };
};

export const minifyClientVariable = (v: ClientVariable) => {
  return {
    m: 'V',
    p: v.path,
    v: v.value
  };
};

export const minifyClientFunction = (f: ClientFunction) => {
  const fDup = { ...f };

  // recursively minify any nested functions and variables
  Object.keys(fDup.parameters).forEach((pKey) => {
    const parameter = fDup.parameters[pKey];
    if (
      typeof parameter === 'object' &&
      '$$mdtype' in parameter &&
      parameter.$$mdtype === 'Function'
    ) {
      fDup.parameters[pKey] = minifyClientFunction(parameter);
    } else if (
      typeof parameter === 'object' &&
      '$$mdtype' in parameter &&
      parameter.$$mdtype === 'Variable'
    ) {
      fDup.parameters[pKey] = minifyClientVariable(parameter);
    }
  });

  return {
    m: CLIENT_FUNCTION_MINIFY_MAP[fDup.$$mdtype],
    n: CLIENT_FUNCTION_MINIFY_MAP[fDup.name],
    p: f.parameters,
    v: f.value,
    r: f.ref
  };
};

export const expandClientFunction = (f: MinifiedClientFunction) => {
  const fDup = { ...f };

  // recursively expand any nested functions
  Object.keys(fDup.p).forEach((pKey) => {
    const parameter = fDup.p[pKey];
    if (typeof parameter === 'object' && 'm' in parameter && parameter.m === 'F') {
      fDup.p[pKey] = expandClientFunction(parameter);
    } else if (typeof parameter === 'object' && 'm' in parameter && parameter.m === 'V') {
      fDup.p[pKey] = expandClientVariable(parameter);
    }
  });

  return {
    $$mdtype: CLIENT_FUNCTION_EXPAND_MAP[fDup.m],
    name: CLIENT_FUNCTION_EXPAND_MAP[fDup.n],
    parameters: fDup.p,
    value: fDup.v,
    ref: fDup.r
  };
};

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
}): RenderableTreeNode {
  const renderableTree = MarkdocStaticCompiler.transform(p.parsedFile.ast, {
    variables: p.defaultValsByPrefId,
    partials: p.parsedFile.partials
  });

  // ensure that all variable ids appearing
  // in the renderable tree are valid page pref ids
  const referencedVarIds = collectVarIdsFromTree(renderableTree);
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
function collectVarIdsFromTree(node: RenderableTreeNodes): string[] {
  let variableIdentifiers: string[] = [];

  if (!node) return variableIdentifiers;

  if (Array.isArray(node)) {
    node.forEach((n) => {
      const identifiers = collectVarIdsFromTree(n);
      variableIdentifiers = variableIdentifiers.concat(identifiers);
    });
  }

  if (typeof node !== 'object') return variableIdentifiers;

  if ('children' in node && node.children) {
    const identifiers = collectVarIdsFromTree(node.children);
    variableIdentifiers = variableIdentifiers.concat(identifiers);
  }

  if ('parameters' in node && node.parameters) {
    const identifiers = collectVarIdsFromTree(Object.values(node.parameters));
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
    const identifiers = collectVarIdsFromTree(
      // @ts-ignore
      node.if
    );
    variableIdentifiers = variableIdentifiers.concat(identifiers);
  }

  const uniqueIdentifiers = Array.from(new Set(variableIdentifiers));

  // return the unique identifiers
  return Array.from(uniqueIdentifiers);
}
