"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reresolve = reresolve;
exports.reresolveIfNode = reresolveIfNode;
exports.reresolveFunctionNode = reresolveFunctionNode;
exports.reresolveVariableNode = reresolveVariableNode;
const functions_1 = __importDefault(require("../functions"));
const conditional_1 = require("../tags/conditional");
const utils_1 = require("../utils");
/**
 * Given a new config, re-resolves a client renderable tree nodes in place,
 * updating its value and re-resolving its children/dependencies.
 */
function reresolve(node, config) {
    if (!config) {
        throw new Error('Config is required to refresh client renderable tree nodes.');
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
    if ((0, utils_1.isClientVariable)(node)) {
        node = reresolveVariableNode(node, config);
        return node;
    }
    if ((0, utils_1.isClientFunction)(node)) {
        node = reresolveFunctionNode(node, config);
        return node;
    }
    if (!(0, utils_1.isTag)(node)) {
        return node;
    }
    node.children = node.children.map((child) => {
        if ((0, utils_1.isTag)(child) || (0, utils_1.isClientVariable)(child) || (0, utils_1.isClientFunction)(child)) {
            return reresolve(child, config);
        }
        return child;
    });
    if ('if' in node) {
        node = reresolveIfNode(node, config);
        return node;
    }
    return node;
}
function reresolveIfNode(ifNode, config) {
    // re-resolve the if node's dependencies
    let condition = ifNode.if;
    if ((0, utils_1.isClientVariable)(condition)) {
        condition = reresolveVariableNode(condition, config);
    }
    else if ((0, utils_1.isClientFunction)(condition)) {
        condition = reresolveFunctionNode(condition, config);
    }
    // re-evaluate whether the node is visible
    if ((0, conditional_1.truthy)(condition)) {
        ifNode.attributes.display = 'true';
    }
    else {
        ifNode.attributes.display = 'false';
    }
    return ifNode;
}
function reresolveFunctionNode(functionNode, config) {
    // refresh each dynamic parameter (functions and variables)
    for (const [key, value] of Object.entries(functionNode.parameters)) {
        if (value.$$mdtype === 'Variable') {
            functionNode.parameters[key] = reresolveVariableNode(value, config);
        }
        else if (value.$$mdtype === 'Function') {
            functionNode.parameters[key] = reresolveFunctionNode(value, config);
        }
    }
    // re-evaluate the function
    const evaluationFunction = functions_1.default[functionNode.name];
    if (!evaluationFunction)
        throw new Error(`Unknown function: ${functionNode.name}`);
    if (!evaluationFunction.transform)
        throw new Error(`Function ${functionNode.name} has no transform method`);
    const value = evaluationFunction.transform(functionNode.parameters, config).value;
    functionNode.value = value;
    return functionNode;
}
function reresolveVariableNode(variableNode, config) {
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
    let value;
    for (const key of variableNode.path) {
        value = value ? value[key] : config.variables[key];
    }
    variableNode.value = value;
    return variableNode;
}
