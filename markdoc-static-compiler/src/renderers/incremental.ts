import { elementOpen, elementClose, elementVoid, text, patch, attr } from 'incremental-dom';
import type { Statics } from 'incremental-dom';
import { Config } from '../types';
import { reresolve } from '../reresolver';
import { RenderableTreeNodes, ClientVariable, ClientFunction } from '../types';
import { isTag, isClientVariable, isClientFunction } from '../utils';

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

export default function render(nodesToRender: RenderableTreeNodes, elementToPatch: Element, config?: Config) {
  patch(elementToPatch, () => renderNodes(nodesToRender, config));
}

export function renderNodes(node: RenderableTreeNodes, config?: Config): any {
  if (typeof node === 'string' || typeof node === 'number') {
    text(String(node));
    return;
  }

  if (node === null || typeof node !== 'object') {
    text('');
    return;
  }

  if (Array.isArray(node)) {
    for (const n of node) {
      renderNodes(n, config);
    }
    return;
  }

  if (isClientVariable(node)) {
    if (config) {
      // TODO: Fix the return value of refresh so casting is not necessary
      node = reresolve(node, config) as ClientVariable;
    }
    text(String(node.value));
    return;
  }

  if (isClientFunction(node)) {
    if (config) {
      // TODO: Fix the return value of refresh with a generic type
      node = reresolve(node as ClientFunction, config) as ClientVariable;
    }
    return;
  }

  if (!isTag(node)) {
    return;
  }

  const { name, attributes = {}, children = [] } = node;

  const statics: Statics = [];

  Object.keys(attributes).forEach((k) => {
    statics.push([k, attributes[k]]);
  });

  if ('if' in node) {
    if (config && config.variables !== undefined) {
      node = reresolve(node, config);
    }
    let wrapperTagClass = '';
    // Using a class instead of a direct "display: false"
    // makes testing easier, as the markdoc__hidden class
    // can be configured to instead be highlighted or otherwise annotated
    if (attributes?.display === 'false') {
      wrapperTagClass = `markdoc__hidden`;
    }
    elementOpen(name, null, null, 'class', wrapperTagClass);
    renderNodes(children, config);
    elementClose(name);
    return;
  }

  if (!name) {
    renderNodes(children, config);
    return;
  }

  if (voidElements.has(name)) {
    elementVoid(name, '', statics);
  } else {
    elementOpen(name, '', statics);
    if (children.length) renderNodes(children, config);
    elementClose(name);
  }
}
