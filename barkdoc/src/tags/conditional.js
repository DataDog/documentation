"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagElse = exports.tagIf = void 0;
exports.truthy = truthy;
const utils_1 = require("../utils");
function createUuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
function truthy(param) {
    if (typeof param === 'object' && 'value' in param) {
        return (param.value !== false && param.value !== undefined && param.value !== null);
    }
    return param !== false && param !== undefined && param !== null;
}
/* OLD
export function truthy(value: any) {
  return value !== false && value !== undefined && value !== null;
}
*/
function renderConditions(node) {
    const conditions = [
        { condition: node.attributes.primary, children: [] },
    ];
    for (const child of node.children) {
        if (child.type === 'tag' && child.tag === 'else')
            conditions.push({
                condition: 'primary' in child.attributes ? child.attributes.primary : true,
                children: [],
            });
        else
            conditions[conditions.length - 1].children.push(child);
    }
    return conditions;
}
/* OLD
export const tagIf: Schema = {
  attributes: {
    primary: { type: Object, render: false },
  },

  transform(node, config) {
    const conditions = renderConditions(node);
    for (const { condition, children } of conditions)
      if (truthy(condition)) {
        const nodes = children.flatMap<MaybePromise<RenderableTreeNodes>>(
          (child) => child.transform(config)
        );
        if (nodes.some(isPromise)) {
          return Promise.all(nodes).then((nodes) => nodes.flat());
        }
        return nodes as RenderableTreeNode[];
      }
    return [];
  },
};
*/
exports.tagIf = {
    attributes: {
        primary: { type: Object, render: true },
    },
    transform(node, config) {
        // after building the children, wrap them in a show tag
        const buildEnclosingTag = (children) => {
            const enclosingTag = {
                $$mdtype: 'Tag',
                name: node.attributes.inline ? 'span' : 'div',
                if: node.attributes.primary,
                attributes: {
                    display: truthy(node.attributes.primary) ? 'true' : 'false',
                    // uuid: createUuid(),
                },
                children,
            };
            return enclosingTag;
        };
        const nodes = node.children.flatMap((child) => child.transform(config));
        if (nodes.some(utils_1.isPromise)) {
            return Promise.all(nodes).then((nodes) => {
                const tag = buildEnclosingTag(nodes.flat());
                return [tag];
            });
        }
        return [buildEnclosingTag(nodes)];
    },
};
exports.tagElse = {
    selfClosing: true,
    attributes: {
        primary: { type: Object, render: false },
    },
};
