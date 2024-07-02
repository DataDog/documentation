"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reactStatic;
const utils_1 = require("../../utils");
function tagName(name, components) {
    return typeof name !== 'string'
        ? 'Fragment'
        : name[0] !== name[0].toUpperCase()
            ? name
            : components instanceof Function
                ? components(name)
                : components[name];
}
function renderArray(children) {
    return children.map(render).join(', ');
}
function deepRender(value) {
    if (value == null || typeof value !== 'object')
        return JSON.stringify(value);
    if (Array.isArray(value))
        return `[${value.map((item) => deepRender(item)).join(', ')}]`;
    if (value.$$mdtype === 'Tag')
        return render(value);
    if (typeof value !== 'object')
        return JSON.stringify(value);
    const object = Object.entries(value)
        .map(([k, v]) => [JSON.stringify(k), deepRender(v)].join(': '))
        .join(', ');
    return `{${object}}`;
}
function render(node) {
    if (Array.isArray(node))
        return `React.createElement(React.Fragment, null, ${renderArray(node)})`;
    if (node === null || typeof node !== 'object' || !(0, utils_1.isTag)(node))
        return JSON.stringify(node);
    const { name } = node, _a = node.attributes, _b = _a === void 0 ? {} : _a, { class: className } = _b, attrs = __rest(_b, ["class"]), { children = [] } = node;
    if (className)
        attrs.className = className;
    return `React.createElement(
    tagName(${JSON.stringify(name)}, components),
    ${Object.keys(attrs).length == 0 ? 'null' : deepRender(attrs)},
    ${renderArray(children)})`;
}
function reactStatic(node) {
    return `
  (({components = {}} = {}) => {
    ${tagName}
    return ${render(node)};
  })
`;
}
