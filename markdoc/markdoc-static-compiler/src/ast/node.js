"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const transformer_1 = __importDefault(require("../transformer"));
class Node {
    constructor(type = 'node', attributes = {}, children = [], tag) {
        this.$$mdtype = 'Node';
        this.errors = [];
        this.lines = [];
        this.inline = false;
        this.attributes = attributes;
        this.children = children;
        this.type = type;
        this.tag = tag;
        this.annotations = [];
        this.slots = {};
    }
    *walk() {
        for (const child of [...Object.values(this.slots), ...this.children]) {
            yield child;
            yield* child.walk();
        }
    }
    push(node) {
        this.children.push(node);
    }
    resolve(config = {}) {
        return Object.assign(new Node(), this, {
            children: this.children.map((child) => child.resolve(config)),
            attributes: (0, base_1.resolve)(this.attributes, config),
            slots: Object.fromEntries(Object.entries(this.slots).map(([name, slot]) => [
                name,
                slot.resolve(config),
            ])),
        });
    }
    findSchema(config = {}) {
        return transformer_1.default.findSchema(this, config);
    }
    transformAttributes(config = {}) {
        return transformer_1.default.attributes(this, config);
    }
    transformChildren(config) {
        return transformer_1.default.children(this, config);
    }
    transform(config) {
        return transformer_1.default.node(this, config);
    }
}
exports.default = Node;
