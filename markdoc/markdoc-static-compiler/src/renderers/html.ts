import MarkdownIt from 'markdown-it';
import type { ClientVariable, RenderableTreeNodes, Tag } from '../types';
const { escapeHtml } = MarkdownIt().utils;
import { Config } from '../types';
import { reresolve } from '../reresolver';
import { isTag, isClientVariable, isClientFunction } from '../utils';
import { CustomHtmlComponent } from '../CustomHtmlComponent';

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

export default function render(
  node: RenderableTreeNodes,
  config?: Config,
  components?: Record<string, any>
): string {
  if (typeof node === 'string' || typeof node === 'number')
    return escapeHtml(String(node));

  if (node === null || typeof node !== 'object') {
    return '';
  }

  if (Array.isArray(node))
    return node
      .map((n) => {
        return render(n, config, components);
      })
      .join('');

  if (isClientVariable(node)) {
    if (config && config.variables !== undefined) {
      // TODO: Fix reresolve return type so recasting isn't necessary
      node = reresolve(node, config) as ClientVariable;
    }
    return escapeHtml(String(node.value));
  }

  if (isClientFunction(node)) {
    if (config && config.variables !== undefined) {
      node = reresolve(node, config);
    }
    return '';
  }

  if (node.$$mdtype === 'Node') {
    const nodeType = node.type as string;
    if (nodeType === 'fence') {
      console.log('fence encountered in renderer:', JSON.stringify(node, null, 2));
      console.log('components:', JSON.stringify(components, null, 2));
    }
    if (
      nodeType &&
      typeof nodeType === 'string' &&
      components &&
      nodeType in components
    ) {
      const Klass = components[nodeType];
      return new Klass(node, config, components).render();
    }
  }

  if (!isTag(node)) {
    return '';
  }

  const { name, attributes, children = [] } = node;

  if (components && name in components) {
    const Klass = components[name];
    return new Klass(node, config, components).render();
  }

  if ('if' in node && node.if) {
    let ref = '';
    if ('ref' in node.if) {
      ref = `data-if=${node.if.ref}`;
    }
    if (config && config.variables !== undefined) {
      node = reresolve(node, config); // TODO: Fix with generic type
    }
    let wrapperTagClasses = 'mdoc__toggleable';
    if (attributes?.display === 'false') {
      wrapperTagClasses += ` mdoc__hidden`;
    }
    let wrapperTagOutput = `<${name} class="${wrapperTagClasses}" ${ref}>`;
    wrapperTagOutput += render(children, config, components);
    wrapperTagOutput += `</${name}>`;
    return wrapperTagOutput;
  }

  if (!name) return render(children, config);

  let output = `<${name}`;
  for (const [k, v] of Object.entries(attributes ?? {}))
    output += ` ${k.toLowerCase()}="${escapeHtml(String(v))}"`;
  output += '>';

  if (voidElements.has(name)) return output;

  if (children.length) output += render(children, config, components);
  output += `</${name}>`;

  return output;
}
