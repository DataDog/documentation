import { ClientVariable, ClientFunction, Config } from 'cdocs-markdoc/src/types';
import functions from 'cdocs-markdoc/src/functions';

/**
 * Given a ClientFunction node, re-evaluate it to see
 * if its return value has changed. This logic is run anytime
 * a user updates their filter preference for a page.
 *
 * For example, for the Markdoc tag `{% if equals($color, 'blue') %}`,
 * the ClientFunction will represent the `equals` function,
 * and the ClientFunction's parameters are
 * the variables and values that the function is comparing.
 */
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

/**
 * Given a ClientVariable node, re-evaluate it to see if its value has changed.
 * This logic is run anytime a user updates their filter preference for a page.
 *
 * For example, for the Markdoc tag `{% if equals($color, 'blue') %}`,
 * a ClientVariable will represents the `$color` variable,
 * and its value will evaluate to the current value of the `color` trait.
 */
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
