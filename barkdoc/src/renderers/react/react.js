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
exports.default = dynamic;
const utils_1 = require("../../utils");
function tagName(name, components) {
    return typeof name !== 'string'
        ? name // This can be an object, e.g. when React.forwardRef is used
        : name[0] !== name[0].toUpperCase()
            ? name
            : components instanceof Function
                ? components(name)
                : components[name];
}
function dynamic(node, React, { components = {} } = {}) {
    function deepRender(value) {
        if (value == null || typeof value !== 'object')
            return value;
        if (Array.isArray(value))
            return value.map((item) => deepRender(item));
        if (value.$$mdtype === 'Tag')
            return render(value);
        if (typeof value !== 'object')
            return value;
        const output = {};
        for (const [k, v] of Object.entries(value))
            output[k] = deepRender(v);
        return output;
    }
    function render(node) {
        if (Array.isArray(node))
            return React.createElement(React.Fragment, null, ...node.map(render));
        if (node === null || typeof node !== 'object' || !(0, utils_1.isTag)(node))
            return node;
        const { name } = node, _a = node.attributes, _b = _a === void 0 ? {} : _a, { class: className } = _b, attrs = __rest(_b, ["class"]), { children = [] } = node;
        if (className)
            attrs.className = className;
        return React.createElement(tagName(name, components), Object.keys(attrs).length == 0 ? null : deepRender(attrs), ...children.map(render));
    }
    return render(node);
}
