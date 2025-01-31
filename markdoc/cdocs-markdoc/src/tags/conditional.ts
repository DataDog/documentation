/**
 * CDOCS-MODIFICATIONS
 *
 * The original Markdoc removes any conditional data, replacing it
 * with its rendered value. The version below keeps conditional data,
 * allowing the client to re-resolve the value when the variables change.
 *
 * Any conditional content is wrapped in an enclosing span or div
 * with the added buildEnclosingTag() function. Each enclosing tag
 * in the renderable tree has a display attribute that is set to 'true'
 * or 'false' based on the initial resolved value of the condition.
 *
 * In rendered HTML, the visibility of this enclosing tag can be toggled
 * as the user's customizations selections change.
 */

import { isPromise } from '../utils';
import { ClientFunction, ClientVariable, type Tag } from '../types';
import { FunctionRefGenerator } from '../functions';
import { Config } from '../types';

import {
  Node,
  MaybePromise,
  RenderableTreeNode,
  RenderableTreeNodes,
  Schema
} from '../types';

type Condition = { condition: ClientFunction | ClientVariable; children: Node[] };

export function truthy(param: any) {
  if (typeof param === 'object' && 'value' in param) {
    return param.value !== false && param.value !== undefined && param.value !== null;
  }
  return param !== false && param !== undefined && param !== null;
}

/**
 * Join two conditions with an "and" function.
 */
function joinConditions(
  condition1: ClientFunction | ClientVariable,
  condition2: ClientFunction | ClientVariable
): ClientFunction {
  const joinedConditions: ClientFunction = {
    $$mdtype: 'Function',
    name: 'and',
    parameters: {
      '0': condition1,
      '1': condition2
    },
    value: truthy(condition1) && truthy(condition2),
    ref: FunctionRefGenerator.generate()
  };

  return joinedConditions;
}

/**
 * Wrap a given condition in a "not" function
 * that flips the outcome of the condition.
 */
function negateCondition(condition: ClientFunction | ClientVariable): ClientFunction {
  return {
    $$mdtype: 'Function',
    name: 'not',
    parameters: {
      '0': condition
    },
    value: !truthy(condition),
    ref: FunctionRefGenerator.generate()
  };
}

/**
 * For a given if tag and any of its nested else tags,
 * create a series of conditions that represent each
 * tag, its condition, and its children.
 */
function renderConditions(node: Node): Condition[] {
  const conditions: Condition[] = [];

  let currentCondition: Condition = {
    condition: node.attributes.primary,
    children: []
  };

  for (const child of node.children) {
    if (child.type === 'tag' && child.tag === 'else') {
      const precedingCondition = currentCondition.condition;

      const elseCondition =
        'primary' in child.attributes ? child.attributes.primary : null;

      if (elseCondition) {
        const elseTagCondition = joinConditions(
          negateCondition(precedingCondition),
          elseCondition
        );

        currentCondition = {
          condition: elseTagCondition,
          children: []
        };
      } else {
        currentCondition = {
          condition: negateCondition(precedingCondition),
          children: []
        };
      }
    } else {
      currentCondition.children.push(child);
    }
  }

  console.log('rendered conditions:', JSON.stringify(conditions, null, 2));
  return conditions;
}

export const tagIf: Schema = {
  attributes: {
    primary: { type: Object, render: true }
  },

  transform(node, config) {
    const conditions = renderConditions(node);

    const buildEnclosingTag = (children: RenderableTreeNode[]) => {
      const enclosingTag: Tag = {
        $$mdtype: 'Tag',
        name: node.attributes.inline ? 'span' : 'div',
        if: node.attributes.primary,
        attributes: {
          display: truthy(node.attributes.primary) ? 'true' : 'false'
        },
        children
      };

      return enclosingTag;
    };

    const nodes = node.children.flatMap<MaybePromise<RenderableTreeNodes>>((child) =>
      child.transform(config)
    );
    if (nodes.some(isPromise)) {
      return Promise.all(nodes).then((nodes) => {
        const tag = buildEnclosingTag(nodes.flat());
        return [tag];
      });
    } else {
      return [buildEnclosingTag(nodes as RenderableTreeNode[])];
    }
  }
};

export const tagElse: Schema = {
  selfClosing: true,
  attributes: {
    primary: { type: Object, render: false }
  }
};

/* ORIGINAL FILE --------------------------------------------------

import { isPromise } from '../utils';

import {
  MaybePromise,
  Node,
  RenderableTreeNode,
  RenderableTreeNodes,
  Schema,
  Value,
} from '../types';

type Condition = { condition: Value; children: Node[] };

export function truthy(value: any) {
  return value !== false && value !== undefined && value !== null;
}

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

export const tagElse: Schema = {
  selfClosing: true,
  attributes: {
    primary: { type: Object, render: false },
  },
};

-------------------------------------------------------------------*/
