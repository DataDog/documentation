/**
 * CDOCS-MODIFICATIONS
 *
 * The original Markdoc variables resolved to a value.
 * The updated version returns an object that contains
 * the current resolved value, but also contains additional data
 * that can be used to re-resolve the variable in the browser
 * without needing to re-transform an AST.
 */
import type { Config, AstType } from '../types';

export default class Variable implements AstType {
  readonly $$mdtype = 'Variable';

  path;

  constructor(path: (string | number)[] = []) {
    this.path = path;
  }

  resolve({ variables }: Config = {}) {
    if (variables instanceof Function) {
      return variables(this.path);
    }

    const value = this.path.reduce((obj = {}, key) => obj[key], variables);

    return {
      $$mdtype: 'Variable',
      path: this.path,
      value
    };
  }
}

/* ORIGINAL FILE ----------------------------------------------------

import type { Config, AstType } from '../types';

export default class Variable implements AstType {
  readonly $$mdtype = 'Variable';

  path;

  constructor(path: (string | number)[] = []) {
    this.path = path;
  }

  resolve({ variables }: Config = {}) {
    return variables instanceof Function
      ? variables(this.path)
      : this.path.reduce((obj = {}, key) => obj[key], variables);
  }
}
  
------------------------------------------------------------------ */
