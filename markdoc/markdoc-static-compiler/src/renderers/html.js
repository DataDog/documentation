'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = render;
const markdown_it_1 = __importDefault(require('markdown-it'));
const { escapeHtml } = (0, markdown_it_1.default)().utils;
const reresolver_1 = require('../reresolver');
const utils_1 = require('../utils');
// HTML elements that do not have a matching close tag
// Defined in the HTML standard: https://html.spec.whatwg.org/#void-elements
const voidElements = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
]);
const softBlack = '#3B444B';
function render(node, config) {
    if (typeof node === 'string' || typeof node === 'number') return escapeHtml(String(node));
    if (node === null || typeof node !== 'object') {
        return '';
    }
    if (Array.isArray(node))
        return node
            .map((n) => {
                return render(n, config);
            })
            .join('');
    if ((0, utils_1.isClientVariable)(node)) {
        if (config && config.variables !== undefined) {
            // TODO: Fix reresolve return type so recasting isn't necessary
            node = (0, reresolver_1.reresolve)(node, config);
        }
        return escapeHtml(String(node.value));
    }
    if ((0, utils_1.isClientFunction)(node)) {
        if (config && config.variables !== undefined) {
            node = (0, reresolver_1.reresolve)(node, config);
        }
        return '';
    }
    if (!(0, utils_1.isTag)(node)) {
        return '';
    }
    const { name, attributes, children = [] } = node;
    if ('if' in node) {
        if (config && config.variables !== undefined) {
            node = (0, reresolver_1.reresolve)(node, config);
        }
        let wrapperTagClass = '';
        if ((attributes === null || attributes === void 0 ? void 0 : attributes.display) === 'false') {
            wrapperTagClass = `class="markdoc__hidden"`;
        }
        let wrapperTagOutput = `<${name} ${wrapperTagClass}>`;
        wrapperTagOutput += render(children, config);
        wrapperTagOutput += `</${name}>`;
        return wrapperTagOutput;
    }
    if (!name) return render(children, config);
    let output = `<${name}`;
    for (const [k, v] of Object.entries(attributes !== null && attributes !== void 0 ? attributes : {}))
        output += ` ${k.toLowerCase()}="${escapeHtml(String(v))}"`;
    output += '>';
    if (voidElements.has(name)) return output;
    if (children.length) output += render(children, config);
    output += `</${name}>`;
    return output;
}
