/**
 * A few type checking functions to simplify rendering control flow.
 * These functions satisfy TypeScript's type checker when it can't
 * correctly infer the type of a variable on its own.
 */
import { Tag, ClientVariable, ClientFunction } from 'cdocs-markdoc';

export function isTag(tag: any): tag is Tag {
  return !!(tag?.$$mdtype === 'Tag');
}

export function isClientVariable(variable: any): variable is ClientVariable {
  return !!(variable?.$$mdtype === 'Variable');
}

export function isClientFunction(func: any): func is ClientFunction {
  return !!(func?.$$mdtype === 'Function');
}

export function truthy(param: any) {
  if (typeof param === 'object' && 'value' in param) {
    return param.value !== false && param.value !== undefined && param.value !== null;
  }
  return param !== false && param !== undefined && param !== null;
}
