import { ClientFunction, ClientVariable } from 'markdoc-static-compiler/src/types';

/**
 * Utility functions for minifying and expanding client-side data.
 * This is used to reduce the size of the inline script included
 * at the bottom of each compiled .md file.
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
  const vDup = JSON.parse(JSON.stringify(v)) as MinifiedClientVariable;

  return {
    $$mdtype: 'Variable',
    path: vDup.p,
    value: vDup.v
  };
};

export const minifyClientVariable = (v: ClientVariable): MinifiedClientVariable => {
  const vDup = JSON.parse(JSON.stringify(v)) as ClientVariable;

  return {
    m: 'V',
    p: vDup.path,
    v: vDup.value
  };
};

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
