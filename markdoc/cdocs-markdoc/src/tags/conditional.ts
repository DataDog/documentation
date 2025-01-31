/**
 * CDOCS-MODIFICATIONS
 *
 * The original Markdoc removes any conditional data, replacing it
 * with its rendered value. The version below keeps conditional data,
 * allowing the client to re-resolve the value when the variables change.
 *
 * The most complex updates are around supporting `else` tags that are nested
 * inside an `if` tag, with each `else` tag possibly containing its own condition
 * (functioning as an `else if` in practice). The cdocs solution follows
 * the same processing pattern as the original Markdoc, but because all content
 * must be retained whether it should be displayed or not, the logic is more complex.
 *
 * To support this complexity, Markdoc's original Condition type
 * has been replaced with the ConditionalContent,
 * TransformedConditionalContent, and ResolvedConditionalContent types.
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

import {
  Node,
  MaybePromise,
  RenderableTreeNode,
  RenderableTreeNodes,
  Schema
} from '../types';

type ConditionalContent = {
  condition: ClientFunction | ClientVariable;
  inline: boolean;
  children: Node[];
};

type TransformedConditionalContent = {
  condition: ClientFunction | ClientVariable;
  children: MaybePromise<RenderableTreeNodes>[];
  inline: boolean;
};

type ResolvedConditionalContent = {
  condition: ClientFunction | ClientVariable;
  children: RenderableTreeNode[];
  inline: boolean;
};

export function truthy(param: any) {
  if (typeof param === 'object' && 'value' in param) {
    return param.value !== false && param.value !== undefined && param.value !== null;
  }
  return param !== false && param !== undefined && param !== null;
}

function joinConditions(
  conditions: (ClientFunction | ClientVariable)[]
): ClientFunction | ClientVariable {
  if (conditions.length === 0) {
    throw new Error('Cannot join zero conditions');
  }

  if (conditions.length === 1) {
    return conditions[0];
  }

  let joinedConditions: ClientFunction | ClientVariable = conditions[0];

  for (let i = 1; i < conditions.length; i++) {
    joinedConditions = joinTwoConditions(joinedConditions, conditions[i]);
  }

  return joinedConditions as ClientFunction;
}

function joinTwoConditions(
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
 * The cdocs analog to Markdoc's renderConditions function.
 */
function buildConditionalContentEntries(node: Node): ConditionalContent[] {
  const contentEntries: ConditionalContent[] = [];

  let currentContentEntry: ConditionalContent = {
    condition: node.attributes.primary,
    inline: node.attributes.inline,
    children: []
  };

  contentEntries.push(currentContentEntry);

  for (const child of node.children) {
    if (child.type === 'tag' && child.tag === 'else') {
      let condition: ClientFunction | ClientVariable;

      // Check whether the else tag has its own condition
      // (i.e. it functions as an `else if`)
      const elseCondition =
        'primary' in child.attributes ? child.attributes.primary : null;

      // Negate and add any preceding conditions,
      // since the contents of an else tag should only show if
      // nothing else has shown so far
      if (elseCondition) {
        condition = joinConditions([
          ...contentEntries.map((entry) => negateCondition(entry.condition)),
          elseCondition
        ]);
      } else {
        condition = joinConditions(
          contentEntries.map((entry) => negateCondition(entry.condition))
        );
      }

      currentContentEntry = {
        condition,
        inline: node.attributes.inline,
        children: []
      };

      contentEntries.push(currentContentEntry);
    } else {
      currentContentEntry.children.push(child);
    }
  }

  return contentEntries;
}

export const tagIf: Schema = {
  attributes: {
    primary: { type: Object, render: false }
  },

  transform(node, config) {
    // Wrap any conditional content in an enclosing span or div
    // whose visibility can be toggled on and off in the browser
    const buildEnclosingTag = (resolvedCondition: ResolvedConditionalContent) => {
      const enclosingTag: Tag = {
        $$mdtype: 'Tag',
        name: resolvedCondition.inline ? 'span' : 'div',
        if: resolvedCondition.condition,
        attributes: {
          display: truthy(resolvedCondition.condition) ? 'true' : 'false'
        },
        children: resolvedCondition.children
      };

      return enclosingTag;
    };

    const contentEntries = buildConditionalContentEntries(node);
    const transformedEntries: TransformedConditionalContent[] = [];

    for (const { condition, inline, children } of contentEntries) {
      const nodes = children.flatMap<MaybePromise<RenderableTreeNodes>>((child) =>
        child.transform(config)
      );
      transformedEntries.push({ condition, children: nodes, inline });
    }

    const allNodes = transformedEntries.flatMap<MaybePromise<RenderableTreeNodes>>(
      (condition) => {
        return condition.children;
      }
    );

    if (allNodes.some(isPromise)) {
      return Promise.all(allNodes).then(() => {
        return transformedEntries.map((entry) => {
          entry.children = entry.children.flat();
          return buildEnclosingTag(entry as ResolvedConditionalContent);
        });
      });
    } else {
      return transformedEntries.map((entry) => {
        entry.children = entry.children.flat();
        return buildEnclosingTag(entry as ResolvedConditionalContent);
      });
    }
  }
};

export const tagElse: Schema = {
  selfClosing: true,
  attributes: {
    primary: { type: Object, render: false }
  }
};
