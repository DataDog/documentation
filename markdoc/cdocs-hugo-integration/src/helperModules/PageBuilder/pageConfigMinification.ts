/**
 * Utility functions for minifying
 * and expanding client-side config.
 */

import { ClientFunction, ClientVariable } from 'cdocs-markdoc/src/types';

/**
 * The minified version of a ClientVariable,
 * which can be reresolved on the client side
 * to contain a different value than it was originally
 * resolved with on the server side.
 *
 * Unminified ClientVariable example:
 *
 * {
 *   $$mdtype: 'Variable',
 *   path: ['color'],
 *   value: 'blue'
 * }
 *
 * Minified ClientVariable example:
 *
 * {
 *   m: 'V',
 *   p: ['color'],
 *   v: 'blue'
 * }
 */
export interface MinifiedClientVariable {
  m: 'V';
  p: string[];
  v: any;
}

/**
 * The minified version of a ClientFunction,
 * which can be reresolved on the client side
 * to contain different parameters
 * (and thus yield a different return value)
 * than it was originally
 * resolved with on the server side.
 *
 * Unminified ClientFunction example:
 *
 * {
 *   $$mdtype: "Function",
 *   name: "equals",
 *   parameters: {
 *     0: {
 *       $$mdtype: "Variable",
 *       path: ["color"],
 *       value: "blue"
 *     },
 *     1: "blue",
 *   },
 *   value: true,
 *   ref: "someRef"
 * }
 *
 * Minified ClientFunction example:
 *
 * {
 *   m: "F",
 *   n: "e",
 *   p: {
 *     0: {
 *          m: "V",
 *          p: ["color"],
 *          v: "blue"
 *     },
 *     1: "blue"
 *   },
 *   v: true,
 *   r: "someRef"
 * }
 */
export interface MinifiedClientFunction {
  m: 'F';
  n: 'a' | 'o' | 'e' | 'n' | 'def' | 'deb';
  p: Record<string, any>;
  v: any;
  r: string;
}

/**
 * The mapping of minified client function names
 * to their expanded versions.
 */
export const CLIENT_FUNCTION_EXPAND_MAP = {
  F: 'Function',
  a: 'and',
  o: 'or',
  e: 'equals',
  n: 'not',
  def: 'default',
  deb: 'debug'
};

/**
 * The mapping of expanded client function names
 * to their minified versions.
 */
export const CLIENT_FUNCTION_MINIFY_MAP = {
  Function: 'F',
  and: 'a',
  or: 'o',
  equals: 'e',
  not: 'n',
  default: 'def',
  debug: 'deb'
};

/**
 * Expand a minified client variable.
 */
export const expandClientVariable = (v: MinifiedClientVariable): ClientVariable => {
  const vDup = JSON.parse(JSON.stringify(v)) as MinifiedClientVariable;

  return {
    $$mdtype: 'Variable',
    path: vDup.p,
    value: vDup.v
  };
};

/**
 * Minify a client variable.
 */
export const minifyClientVariable = (v: ClientVariable): MinifiedClientVariable => {
  const vDup = JSON.parse(JSON.stringify(v)) as ClientVariable;

  return {
    m: 'V',
    p: vDup.path,
    v: vDup.value
  };
};

/**
 * Minify a client function.
 */
export const minifyClientFunction = (f: ClientFunction): MinifiedClientFunction => {
  const fDup = JSON.parse(JSON.stringify(f)) as ClientFunction;

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
    p: fDup.parameters,
    v: fDup.value,
    r: fDup.ref
  } as MinifiedClientFunction;
};

/**
 * Expand a minified client function.
 */
export const expandClientFunction = (f: MinifiedClientFunction) => {
  const fDup = JSON.parse(JSON.stringify(f)) as MinifiedClientFunction;

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
