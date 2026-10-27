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
import { stringify as stringifyYaml } from "yaml";
import type { BreadcrumbItem } from "@components/Breadcrumbs/breadcrumbsTypes";
import { absoluteUrl } from "@lib/site/siteUrl";
import { SDK_VERSIONS } from "@lib/site/sdkVersions";
import { resolveFenceVariables } from "@lib/plaintext/resolveFenceVariables";

// @markdoc/markdoc ships a CJS build whose named exports don't round-trip
// cleanly under Node's ESM loader during Astro's SSG step. Pulling from the
// default export and re-exporting keeps every other module on the named-import path.
const { Ast, format, parse } = Markdoc;

export { Ast, format, parse };

export const NO_CONTENT: MarkdocNode[] = [];

/**
 * `frontmatter` is the raw YAML between the `---` fences, which `format()`
 * writes back out above the children.
 */
export function documentNode(
  children: MarkdocNode[],
  frontmatter?: string,
): MarkdocNode {
  return new Ast.Node("document", frontmatter ? { frontmatter } : {}, children);
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
 *
 * Bare URLs become links, so `buildPlaintextPage` can
 * point the docs ones at their `.md` pages.
 */
export function nodesFromMd(md: string): MarkdocNode[] {
  if (!md) {
    return [];
  }
  const nodes = parse(md).children;
  linkBareUrls(nodes);
  return nodes;
}

/**
 * Build a Markdown table whose cells can contain inline markdown. Each cell
 * is parsed; if it parses to a single paragraph, its inline children are
 * inlined into the cell. Otherwise the cell falls back to plain text.
 *
 * A table row can't span lines, so line breaks in a cell collapse to spaces.
 */
export function tableMd(headers: string[], rows: string[][]): MarkdocNode {
  const cellChildren = (text: string): MarkdocNode[] => {
    const oneLineText = text.replace(/\s*\n\s*/g, " ");
    const parsed = nodesFromMd(oneLineText);
    if (parsed.length === 1 && parsed[0].type === "paragraph") {
      return parsed[0].children;
    }
    return [inline([plaintext(oneLineText)])];
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
 * document node (with optional raw YAML `frontmatter`), calls Markdoc's
 * `format()`, and ensures a trailing newline.
 *
 * Resolves `{% $sdkVersions.<client> %}` inside code fences first, as the HTML
 * pages do. Every API `.md` route and the twin pipeline end here, so no route
 * has to remember to do it. That step edits nodes in place, so it runs on a
 * copy: callers keep the AST they passed in unchanged.
 */
export function buildMarkdocStr(
  children: MarkdocNode[],
  frontmatter?: string,
): string {
  const copiedChildren = copyNodes(children);
  resolveFenceVariables(copiedChildren, { sdkVersions: SDK_VERSIONS });
  return format(documentNode(copiedChildren, frontmatter)).trim() + "\n";
}

/**
 * Deep copy of Markdoc AST nodes. `Ast.fromJSON` rebuilds real `Node` and
 * `Variable` instances, so the copy still transforms like the original.
 */
function copyNodes(nodes: MarkdocNode[]): MarkdocNode[] {
  return Ast.fromJSON(JSON.stringify(nodes)) as MarkdocNode[];
}

export interface PageFrontmatter {
  title: string;
  /** Left out of the frontmatter when empty. */
  description: string;
  /** The page's own breadcrumb trail, current page included. */
  breadcrumbs: BreadcrumbItem[];
}

/**
 * Serialize a whole plaintext (`.md`) page: YAML frontmatter, a banner
 * pointing at the top-level `llms.txt`, then `children`. `site` is the
 * route's `site`, so the banner link carries any preview base path.
 */
export function buildPlaintextPage(
  children: MarkdocNode[],
  frontmatter: PageFrontmatter,
  site: string | URL | undefined,
): string {
  const nodes = [llmsTxtBannerNode(site), ...children];
  pointDocsLinksAtMd(nodes, site!);
  return buildMarkdocStr(nodes, frontmatterYaml(frontmatter));
}

const DOCS_HOST = "docs.datadoghq.com";

/**
 * Point a docs page link at its `.md` twin, absolute, so agents following
 * links stay in plaintext. Root-relative hrefs already carry any preview
 * prefix, so they resolve against the site's origin, not `absoluteUrl()`.
 * Other hosts, file links, `.md` links, and the root pass through unchanged.
 */
export function mdLinkHref(href: string, site: string | URL): string {
  const siteUrl = new URL(site);
  const isRootRelative = href.startsWith("/") && !href.startsWith("//");
  if (!isRootRelative && !href.startsWith("http")) {
    return href;
  }
  const url = new URL(href, siteUrl.origin);
  if (url.host !== DOCS_HOST && url.host !== siteUrl.host) {
    return href;
  }
  const lastSegment = url.pathname.split("/").filter(Boolean).pop();
  if (!lastSegment || /\.[a-z0-9]+$/i.test(lastSegment)) {
    return href;
  }
  url.pathname = `${url.pathname.replace(/\/+$/, "")}.md`;
  return url.href;
}

/** A bare URL, stopping at whitespace and the brackets around it. */
const BARE_URL = /https?:\/\/[^\s<>()[\]]+/g;

/** Punctuation that ends a sentence, not the URL before it. */
const TRAILING_PUNCTUATION = /[.,;:!?'"]+$/;

/** Turn bare URLs in text into links. Text inside a link stays as is. */
function linkBareUrls(nodes: MarkdocNode[]): void {
  for (const node of nodes) {
    if (node.type === "link") continue;
    node.children = node.children.flatMap((child) => {
      return child.type === "text" ? textWithLinks(child) : [child];
    });
    linkBareUrls(node.children);
  }
}

function textWithLinks(textNode: MarkdocNode): MarkdocNode[] {
  const content = textNode.attributes.content;
  if (typeof content !== "string") return [textNode];

  const pieces: MarkdocNode[] = [];
  let textStart = 0;
  for (const match of content.matchAll(BARE_URL)) {
    const url = match[0].replace(TRAILING_PUNCTUATION, "");
    pieces.push(plaintext(content.slice(textStart, match.index)));
    pieces.push(link(url, url));
    textStart = match.index + url.length;
  }
  if (pieces.length === 0) return [textNode];
  pieces.push(plaintext(content.slice(textStart)));
  return pieces.filter((piece) => piece.attributes.content !== "");
}

function pointDocsLinksAtMd(nodes: MarkdocNode[], site: string | URL): void {
  for (const node of nodes) {
    for (const child of [node, ...node.walk()]) {
      if (child.type === "link" && typeof child.attributes.href === "string") {
        child.attributes.href = mdLinkHref(child.attributes.href, site);
      }
    }
  }
}

function frontmatterYaml({
  title,
  description,
  breadcrumbs,
}: PageFrontmatter): string {
  const fields = {
    title,
    ...(description ? { description } : {}),
    breadcrumbs: breadcrumbs.map((crumb) => crumb.label).join(" > "),
  };
  return stringifyYaml(fields, { lineWidth: 0 }).trimEnd();
}

function llmsTxtBannerNode(site: string | URL | undefined): MarkdocNode {
  if (!site) {
    throw new Error(
      "astro.config.mjs `site` must be set for the llms.txt banner to link canonically.",
    );
  }
  return new Ast.Node("blockquote", {}, [
    paragraph([
      inline([
        plaintext("For the complete documentation index, see "),
        link(absoluteUrl("/llms.txt", site), "llms.txt"),
        plaintext("."),
      ]),
    ]),
  ]);
}
