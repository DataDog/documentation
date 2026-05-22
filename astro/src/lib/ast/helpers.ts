/**
 * Helpers for building Markdoc ASTs programmatically.
 *
 * Components in their `ast/` subfolder use these to construct Markdoc `Node`
 * trees that Markdoc's `format()` then serializes to plaintext. Building the
 * AST directly (rather than concatenating strings) gives precise control
 * over structure: attribute escaping, table alignment, tag wrapping, etc.
 * are all handled by the formatter.
 *
 * `@markdoc/markdoc` ships a CJS build whose named exports don't round-trip
 * cleanly under Node's ESM loader during Astro's SSG step. Pulling the
 * default export here and re-exporting keeps every other module on the
 * named-import path.
 */

import Markdoc from '@markdoc/markdoc';
import type { Node as MarkdocNode } from '@markdoc/markdoc';

const { Ast, format, parse } = Markdoc;

export { Ast, format, parse };

export function documentNode(children: MarkdocNode[]): MarkdocNode {
  return new Ast.Node('document', {}, children);
}

export function textNode(content: string): MarkdocNode {
  return new Ast.Node('text', { content });
}

export function inlineNode(children: MarkdocNode[]): MarkdocNode {
  return new Ast.Node('inline', {}, children);
}

export function headingNode(level: number, text: string): MarkdocNode {
  return new Ast.Node('heading', { level }, [inlineNode([textNode(text)])]);
}

export function paragraphNode(children: MarkdocNode[]): MarkdocNode {
  return new Ast.Node('paragraph', {}, children);
}

export function paragraphFromText(text: string): MarkdocNode {
  return paragraphNode([inlineNode([textNode(text)])]);
}

export function fenceNode(language: string, content: string): MarkdocNode {
  const c = content.endsWith('\n') ? content : `${content}\n`;
  return new Ast.Node('fence', { content: c, language });
}

export function tagNode(
  name: string,
  attributes: Record<string, unknown>,
  children: MarkdocNode[] = [],
): MarkdocNode {
  return new Ast.Node('tag', attributes, children, name);
}

/**
 * Parse a markdown string and return the block-level children of the
 * resulting document. Use this for free-form markdown content (descriptions,
 * etc.) where the structure isn't known up front.
 */
export function nodesFromMd(md: string): MarkdocNode[] {
  if (!md) {
    return [];
  }
  return parse(md).children;
}

/**
 * Build a standard Markdown table node. Cells are treated as plain text.
 * Use `tableNodeMd` when cells may contain inline markdown.
 */
export function tableNode(headers: string[], rows: string[][]): MarkdocNode {
  const th = (text: string): MarkdocNode => {
    return new Ast.Node('th', {}, [inlineNode([textNode(text)])]);
  };
  const td = (text: string): MarkdocNode => {
    return new Ast.Node('td', {}, [inlineNode([textNode(text)])]);
  };
  const headRow = new Ast.Node('tr', {}, headers.map(th));
  const thead = new Ast.Node('thead', {}, [headRow]);
  const bodyRows = rows.map((row) => {
    return new Ast.Node('tr', {}, row.map(td));
  });
  const tbody = new Ast.Node('tbody', {}, bodyRows);
  return new Ast.Node('table', {}, [thead, tbody]);
}

/**
 * Build a Markdown table whose cells can contain inline markdown. Each cell
 * is parsed; if it parses to a single paragraph, its inline children are
 * inlined into the cell. Otherwise the cell falls back to plain text.
 */
export function tableNodeMd(headers: string[], rows: string[][]): MarkdocNode {
  const cellChildren = (text: string): MarkdocNode[] => {
    const parsed = nodesFromMd(text);
    if (parsed.length === 1 && parsed[0].type === 'paragraph') {
      return parsed[0].children;
    }
    return [inlineNode([textNode(text)])];
  };
  const th = (text: string): MarkdocNode => {
    return new Ast.Node('th', {}, cellChildren(text));
  };
  const td = (text: string): MarkdocNode => {
    return new Ast.Node('td', {}, cellChildren(text));
  };
  const headRow = new Ast.Node('tr', {}, headers.map(th));
  const thead = new Ast.Node('thead', {}, [headRow]);
  const bodyRows = rows.map((row) => {
    return new Ast.Node('tr', {}, row.map(td));
  });
  const tbody = new Ast.Node('tbody', {}, bodyRows);
  return new Ast.Node('table', {}, [thead, tbody]);
}

/**
 * Serialize a list of block-level nodes as plaintext. Wraps them in a
 * document node, calls Markdoc's `format()`, and ensures a trailing newline.
 */
export function formatNodes(children: MarkdocNode[]): string {
  return format(documentNode(children)).trim() + '\n';
}
