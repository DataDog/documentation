import { Tag, ClientVariable, ClientFunction, functions, Config } from 'cdocs-markdoc';

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
  if (!evaluationFunction) throw new Error(`Unknown function: ${functionNode.name}`);
  if (!evaluationFunction.transform)
    throw new Error(`Function ${functionNode.name} has no transform method`);
  const value = evaluationFunction.transform(functionNode.parameters, config).value;

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
      value: undefined
    };
  if (config.variables instanceof Function) {
    return {
      $$mdtype: 'Variable',
      path: variableNode.path,
      value: config.variables(variableNode.path)
    };
  }
  let value: any;
  for (const key of variableNode.path) {
    value = value ? value[key] : config.variables[key];
  }
  variableNode.value = value;
  return variableNode;
}
