import { isPromise } from '../utils';
import { type Tag } from '../types';

import {
  MaybePromise,
  Node,
  RenderableTreeNode,
  RenderableTreeNodes,
  Schema,
  Value,
} from '../types';

function createUuid() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

type Condition = { condition: Value; children: Node[] };

export function truthy(param: any) {
  if (typeof param === 'object' && 'value' in param) {
    return (
      param.value !== false && param.value !== undefined && param.value !== null
    );
  }
  return param !== false && param !== undefined && param !== null;
}

/* OLD
export function truthy(value: any) {
  return value !== false && value !== undefined && value !== null;
}
*/

function renderConditions(node: Node) {
  const conditions: Condition[] = [
    { condition: node.attributes.primary, children: [] },
  ];
  for (const child of node.children) {
    if (child.type === 'tag' && child.tag === 'else')
      conditions.push({
        condition:
          'primary' in child.attributes ? child.attributes.primary : true,
        children: [],
      });
    else conditions[conditions.length - 1].children.push(child);
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

export const tagIf: Schema = {
  attributes: {
    primary: { type: Object, render: true },
  },

  transform(node, config) {
    // after building the children, wrap them in a show tag
    const buildEnclosingTag = (children: RenderableTreeNode[]) => {
      const enclosingTag: Tag = {
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

    const nodes = node.children.flatMap<MaybePromise<RenderableTreeNodes>>(
      (child) => child.transform(config)
    );
    if (nodes.some(isPromise)) {
      return Promise.all(nodes).then((nodes) => {
        const tag = buildEnclosingTag(nodes.flat());
        return [tag];
      });
    }
    return [buildEnclosingTag(nodes as RenderableTreeNode[])];
  },
};

export const tagElse: Schema = {
  selfClosing: true,
  attributes: {
    primary: { type: Object, render: false },
  },
};
