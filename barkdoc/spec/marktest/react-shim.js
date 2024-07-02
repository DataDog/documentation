"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Fragment: 'Fragment',
    createElement(tag, attributes, ...children) {
        const output = {};
        if (tag)
            output.tag = tag;
        if (attributes)
            output.attributes = attributes;
        if (children.length)
            output.children = children.flat(Infinity);
        return output;
    },
};
