import { Tag, ClientVariable, ClientFunction } from '../types';
import { Config } from '../types';
import functions from '../functions';
import { truthy } from '../tags/conditional';
import { isClientFunction, isClientVariable, isTag } from '../utils';
import { isVariable } from '../ast/base';

/**
 * Given a new config, re-resolves a client renderable tree nodes in place,
 * updating its value and re-resolving its children/dependencies.
 */
export function reresolve(
  node: Tag | ClientVariable | ClientFunction,
  config: Config
): Tag | ClientVariable | ClientFunction {
  if (!config) {
    throw new Error(
      'Config is required to refresh client renderable tree nodes.'
    );
  }

  if (node === null || typeof node !== 'object') {
    return node;
  }

  if (Array.isArray(node)) {
    for (const n of node) {
      if ('$$mdtype' in n) {
        reresolve(n, config);
      }
    }
    return node;
  }

  if (isClientVariable(node)) {
    node = reresolveVariableNode(node, config);
    return node;
  }

  if (isClientFunction(node)) {
    node = reresolveFunctionNode(node, config);
    return node;
  }

  if (!isTag(node)) {
    return node;
  }

  node.children = node.children.map((child) => {
    if (isTag(child) || isClientVariable(child) || isClientFunction(child)) {
      return reresolve(child, config);
    }
    return child;
  });

  if ('if' in node) {
    node = reresolveIfNode(node as Tag, config);
    return node;
  }

  return node;
}

export function reresolveIfNode(ifNode: Tag, config: Config): Tag {
  // re-resolve the if node's dependencies
  let condition = ifNode.if;
  if (isClientVariable(condition)) {
    condition = reresolveVariableNode(condition, config);
  } else if (isClientFunction(condition)) {
    condition = reresolveFunctionNode(condition, config);
  }

  // re-evaluate whether the node is visible
  if (truthy(condition)) {
    ifNode.attributes.display = 'true';
  } else {
    ifNode.attributes.display = 'false';
  }

  return ifNode;
}

export function reresolveFunctionNode(
  functionNode: ClientFunction,
  config: Config
): ClientFunction {
  // refresh each dynamic parameter (functions and variables)
  for (const [key, value] of Object.entries(functionNode.parameters)) {
    if (value.$$mdtype === 'Variable') {
      functionNode.parameters[key] = reresolveVariableNode(value, config);
    } else if (value.$$mdtype === 'Function') {
      functionNode.parameters[key] = reresolveFunctionNode(value, config);
    }
  }

  // re-evaluate the function
  const evaluationFunction = functions[functionNode.name];
  if (!evaluationFunction)
    throw new Error(`Unknown function: ${functionNode.name}`);
  if (!evaluationFunction.transform)
    throw new Error(`Function ${functionNode.name} has no transform method`);
  const value = evaluationFunction.transform(
    functionNode.parameters,
    config
  ).value;

  functionNode.value = value;
  return functionNode;
}

export function reresolveVariableNode(
  variableNode: ClientVariable,
  config: Config
): ClientVariable {
  if (config.variables === undefined)
    return {
      $$mdtype: 'Variable',
      path: variableNode.path,
      value: undefined,
    };
  if (config.variables instanceof Function) {
    return {
      $$mdtype: 'Variable',
      path: variableNode.path,
      value: config.variables(variableNode.path),
    };
  }
  let value: any;
  for (const key of variableNode.path) {
    value = value ? value[key] : config.variables[key];
  }
  variableNode.value = value;
  return variableNode;
}
