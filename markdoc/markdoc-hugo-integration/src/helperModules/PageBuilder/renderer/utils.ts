import { Tag, ClientVariable, ClientFunction } from 'markdoc-static-compiler';

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
