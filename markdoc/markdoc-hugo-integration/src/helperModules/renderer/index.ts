import MarkdownIt from 'markdown-it';
import type {
  ClientVariable,
  RenderableTreeNodes,
  Config as MarkdocConfig
} from 'markdoc-static-compiler';
import { IntegrationConfig } from '../../schemas/config/integration';
const { escapeHtml } = MarkdownIt().utils;
import { reresolve } from './reresolver';
import { isTag, isClientVariable, isClientFunction } from './utils';
import { CustomHtmlComponent } from './CustomHtmlComponent';

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

function render(p: {
  node: RenderableTreeNodes;
  markdocConfig?: MarkdocConfig;
  integrationConfig: IntegrationConfig;
  components?: Record<string, any>;
}): string {
  if (typeof p.node === 'string' || typeof p.node === 'number')
    return escapeHtml(String(p.node));

  if (p.node === null || typeof p.node !== 'object') {
    return '';
  }

  if (Array.isArray(p.node))
    return p.node
      .map((n) => {
        return render({ ...p, node: n });
      })
      .join('');

  if (isClientVariable(p.node)) {
    if (p.markdocConfig && p.markdocConfig.variables !== undefined) {
      // TODO: Fix reresolve return type so recasting isn't necessary
      p.node = reresolve(p.node, p.markdocConfig) as ClientVariable;
    }
    return escapeHtml(String(p.node.value));
  }

  if (isClientFunction(p.node)) {
    if (p.markdocConfig && p.markdocConfig.variables !== undefined) {
      p.node = reresolve(p.node, p.markdocConfig);
    }
    return '';
  }

  if (p.node.$$mdtype === 'Node') {
    const nodeType = p.node.type as string;
    if (
      nodeType &&
      typeof nodeType === 'string' &&
      p.components &&
      nodeType in p.components
    ) {
      const Klass = p.components[nodeType];
      return new Klass(p.node, p.markdocConfig, p.components).render();
    }
  }

  if (!isTag(p.node)) {
    return '';
  }

  const { name, attributes, children = [] } = p.node;

  if (p.components && name in p.components) {
    const Klass = p.components[name];
    return new Klass({
      tag: p.node,
      markdocConfig: p.markdocConfig,
      components: p.components,
      integrationConfig: p.integrationConfig
    }).render();
  }

  if ('if' in p.node && p.node.if) {
    let ref = '';
    if ('ref' in p.node.if) {
      ref = `data-if=${p.node.if.ref}`;
    }
    if (p.markdocConfig && p.markdocConfig.variables !== undefined) {
      p.node = reresolve(p.node, p.markdocConfig); // TODO: Fix with generic type
    }
    let wrapperTagClasses = 'mdoc__toggleable';
    if (attributes?.display === 'false') {
      wrapperTagClasses += ` mdoc__hidden`;
    }
    let wrapperTagOutput = `<${name} class="${wrapperTagClasses}" ${ref}>`;
    wrapperTagOutput += render({ ...p, node: children });
    wrapperTagOutput += `</${name}>`;
    return wrapperTagOutput;
  }

  if (!name)
    return render({
      node: children,
      markdocConfig: p.markdocConfig,
      integrationConfig: p.integrationConfig
    });

  let output = `<${name}`;
  for (const [k, v] of Object.entries(attributes ?? {}))
    output += ` ${k.toLowerCase()}="${escapeHtml(String(v))}"`;
  output += '>';

  if (voidElements.has(name)) return output;

  if (children.length)
    output += render({
      node: children,
      markdocConfig: p.markdocConfig,
      components: p.components,
      integrationConfig: p.integrationConfig
    });
  output += `</${name}>`;

  return output;
}

export { render, CustomHtmlComponent };
