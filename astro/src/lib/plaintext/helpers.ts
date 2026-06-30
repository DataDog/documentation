/**
 * Helpers for building Markdoc ASTs programmatically.
 *
 * Components in their `ast/` subfolder use these to construct Markdoc `Node`
 * trees that Markdoc's `format()` then serializes to plaintext. Building the
 * AST directly (rather than concatenating strings) gives precise control
 * over structure: attribute escaping, table alignment, tag wrapping, etc.
 * are all handled by the formatter.
 */

import Markdoc from "@markdoc/markdoc";
import type { Node as MarkdocNode } from "@markdoc/markdoc";

// @markdoc/markdoc ships a CJS build whose named exports don't round-trip
// cleanly under Node's ESM loader during Astro's SSG step. Pulling from the
// default export and re-exporting keeps every other module on the named-import path.
const { Ast, format, parse } = Markdoc;

export { Ast, format, parse };

export const NO_CONTENT: MarkdocNode[] = [];

export function documentNode(children: MarkdocNode[]): MarkdocNode {
  return new Ast.Node("document", {}, children);
}

export function plaintext(content: string): MarkdocNode {
  return new Ast.Node("text", { content });
}

export function inline(children: MarkdocNode[]): MarkdocNode {
  return new Ast.Node("inline", {}, children);
}

export function heading(level: number, text: string): MarkdocNode {
  return new Ast.Node("heading", { level }, [inline([plaintext(text)])]);
}

export function paragraph(children: MarkdocNode[]): MarkdocNode {
  return new Ast.Node("paragraph", {}, children);
}

export function paragraphFromText(text: string): MarkdocNode {
  return paragraph([inline([plaintext(text)])]);
}

export function fence(language: string, content: string): MarkdocNode {
  const c = content.endsWith("\n") ? content : `${content}\n`;
  return new Ast.Node("fence", { content: c, language });
}

export function listItem(children: MarkdocNode[]): MarkdocNode {
  return new Ast.Node("item", {}, children);
}

export function list(
  order: "ordered" | "unordered",
  items: MarkdocNode[],
): MarkdocNode {
  return new Ast.Node("list", { ordered: order === "ordered" }, items);
}

export function link(href: string, text: string): MarkdocNode {
  return new Ast.Node("link", { href }, [plaintext(text)]);
}

export function bold(children: MarkdocNode[]): MarkdocNode {
  return new Ast.Node("strong", {}, children);
}

export function tag(
  name: string,
  attributes: Record<string, unknown>,
  children: MarkdocNode[] = [],
): MarkdocNode {
  return new Ast.Node("tag", attributes, children, name);
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
 * Build a Markdown table whose cells can contain inline markdown. Each cell
 * is parsed; if it parses to a single paragraph, its inline children are
 * inlined into the cell. Otherwise the cell falls back to plain text.
 */
export function tableMd(headers: string[], rows: string[][]): MarkdocNode {
  const cellChildren = (text: string): MarkdocNode[] => {
    const parsed = nodesFromMd(text);
    if (parsed.length === 1 && parsed[0].type === "paragraph") {
      return parsed[0].children;
    }
    return [inline([plaintext(text)])];
  };
  const th = (text: string): MarkdocNode => {
    return new Ast.Node("th", {}, cellChildren(text));
  };
  const td = (text: string): MarkdocNode => {
    return new Ast.Node("td", {}, cellChildren(text));
  };
  const headRow = new Ast.Node("tr", {}, headers.map(th));
  const thead = new Ast.Node("thead", {}, [headRow]);
  const bodyRows = rows.map((row) => {
    return new Ast.Node("tr", {}, row.map(td));
  });
  const tbody = new Ast.Node("tbody", {}, bodyRows);
  return new Ast.Node("table", {}, [thead, tbody]);
}

/**
 * Serialize a list of block-level nodes as a Markdoc string. Wraps them in a
 * document node, calls Markdoc's `format()`, and ensures a trailing newline.
 */
export function buildMarkdocStr(children: MarkdocNode[]): string {
  return format(documentNode(children)).trim() + "\n";
}
