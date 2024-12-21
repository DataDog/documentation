"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalAttributes = void 0;
const class_1 = require("./schema-types/class");
const id_1 = require("./schema-types/id");
const utils_1 = require("./utils");
const utils_2 = require("./utils");
exports.globalAttributes = {
    class: { type: class_1.Class, render: true },
    id: { type: id_1.Id, render: true },
};
exports.default = {
    findSchema(node, { nodes = {}, tags = {} } = {}) {
        return node.tag ? tags[node.tag] : nodes[node.type];
    },
    attributes(node, config = {}) {
        var _a;
        const schema = (_a = this.findSchema(node, config)) !== null && _a !== void 0 ? _a : {};
        const output = {};
        const attrs = Object.assign(Object.assign({}, exports.globalAttributes), schema.attributes);
        for (const [key, attr] of Object.entries(attrs)) {
            if (attr.render == false)
                continue;
            const name = typeof attr.render === 'string' ? attr.render : key;
            let value = node.attributes[key];
            if (typeof attr.type === 'function') {
                const instance = new attr.type();
                if (instance.transform) {
                    value = instance.transform(value, config);
                }
            }
            value = value === undefined ? attr.default : value;
            if (value === undefined)
                continue;
            output[name] = value;
        }
        if (schema.slots) {
            for (const [key, slot] of Object.entries(schema.slots)) {
                if (slot.render === false)
                    continue;
                const name = typeof slot.render === 'string' ? slot.render : key;
                if (node.slots[key])
                    output[name] = this.node(node.slots[key], config);
            }
        }
        return output;
    },
    children(node, config = {}) {
        const children = node.children.flatMap((child) => this.node(child, config));
        if (children.some(utils_1.isPromise)) {
            return Promise.all(children);
        }
        return children;
    },
    node(node, config = {}) {
        var _a;
        const schema = (_a = this.findSchema(node, config)) !== null && _a !== void 0 ? _a : {};
        if (schema && schema.transform instanceof Function)
            return schema.transform(node, config);
        const children = this.children(node, config);
        if (!schema || !schema.render)
            return children;
        const attributes = this.attributes(node, config);
        if ((0, utils_1.isPromise)(attributes) || (0, utils_1.isPromise)(children)) {
            return Promise.all([attributes, children]).then((values) => (0, utils_2.buildTag)(schema.render, ...values));
        }
        return (0, utils_2.buildTag)(schema.render, attributes, children);
    },
};
