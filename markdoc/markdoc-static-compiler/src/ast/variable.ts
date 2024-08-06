import type { Config, AstType } from '../types';

export default class Variable implements AstType {
  readonly $$mdtype = 'Variable';

  path;

  constructor(path: (string | number)[] = []) {
    this.path = path;
  }

  /* NEW */
  resolve({ variables }: Config = {}) {
    if (variables instanceof Function) {
      return variables(this.path);
    }

    const value = this.path.reduce((obj = {}, key) => obj[key], variables);

    return {
      $$mdtype: 'Variable',
      path: this.path,
      value,
    };
  }

  /* OLD
  resolve({ variables }: Config = {}) {
    return variables instanceof Function
      ? variables(this.path)
      : this.path.reduce((obj = {}, key) => obj[key], variables);
  }
  */
}
