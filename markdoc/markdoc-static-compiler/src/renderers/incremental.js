'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = render;
exports.renderNodes = renderNodes;
const incremental_dom_1 = require('incremental-dom');
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
function render(nodesToRender, elementToPatch, config) {
    (0, incremental_dom_1.patch)(elementToPatch, () => renderNodes(nodesToRender, config));
}
function renderNodes(node, config) {
    if (typeof node === 'string' || typeof node === 'number') {
        (0, incremental_dom_1.text)(String(node));
        return;
    }
    if (node === null || typeof node !== 'object') {
        (0, incremental_dom_1.text)('');
        return;
    }
    if (Array.isArray(node)) {
        for (const n of node) {
            renderNodes(n, config);
        }
        return;
    }
    if ((0, utils_1.isClientVariable)(node)) {
        if (config) {
            // TODO: Fix the return value of refresh so casting is not necessary
            node = (0, reresolver_1.reresolve)(node, config);
        }
        (0, incremental_dom_1.text)(String(node.value));
        return;
    }
    if ((0, utils_1.isClientFunction)(node)) {
        if (config) {
            // TODO: Fix the return value of refresh with a generic type
            node = (0, reresolver_1.reresolve)(node, config);
        }
        return;
    }
    if (!(0, utils_1.isTag)(node)) {
        return;
    }
    const { name, attributes = {}, children = [] } = node;
    const statics = [];
    Object.keys(attributes).forEach((k) => {
        statics.push([k, attributes[k]]);
    });
    if ('if' in node) {
        if (config && config.variables !== undefined) {
            node = (0, reresolver_1.reresolve)(node, config);
        }
        let wrapperTagClass = '';
        // Using a class instead of a direct "display: false"
        // makes testing easier, as the markdoc__hidden class
        // can be configured to instead be highlighted or otherwise annotated
        if ((attributes === null || attributes === void 0 ? void 0 : attributes.display) === 'false') {
            wrapperTagClass = `markdoc__hidden`;
        }
        (0, incremental_dom_1.elementOpen)(name, null, null, 'class', wrapperTagClass);
        renderNodes(children, config);
        (0, incremental_dom_1.elementClose)(name);
        return;
    }
    if (!name) {
        renderNodes(children, config);
        return;
    }
    if (voidElements.has(name)) {
        (0, incremental_dom_1.elementVoid)(name, '', statics);
    } else {
        (0, incremental_dom_1.elementOpen)(name, '', statics);
        if (children.length) renderNodes(children, config);
        (0, incremental_dom_1.elementClose)(name);
    }
}
