/**
 * AST-level filtering for the cdocs plaintext pipeline.
 *
 * Walks a parsed Markdoc node list and:
 *   - evaluates `{% if %}`/`{% else /%}` against the config's variables and
 *     functions, keeping only the matching branch (non-matching content is
 *     dropped, mirroring the server-side dropping the HTML page relies on);
 *   - inlines `{% partial /%}` includes by parsing their source and processing
 *     it in turn (so conditionals inside partials are evaluated too);
 *   - rewrites internal doc links to their `.md` twin (so following a link in
 *     plaintext stays in plaintext);
 *   - strips explicit heading IDs (both the `{% #id %}` tag form and the
 *     `{#id}` text form), which anchor in-page links in HTML but are clutter
 *     in plaintext;
 *   - strips HTML comments.
 *
 * Everything else passes through unchanged, so Markdoc's `format()` can later
 * serialize standard nodes and custom tags (`{% alert %}`, fences, ...) back to
 * text. Pure: the caller injects `resolvePartial`, so this is unit-testable
 * without disk access.
 */
import Markdoc from '@markdoc/markdoc';
import type { Node, Config } from '@markdoc/markdoc';
import { rewriteInternalDocLink } from './rewriteDocLink';

const { parse } = Markdoc;

/** Returns the raw source of a partial for a `{% partial file=... /%}` ref, or null. */
export type PartialResolver = (file: string) => string | null | undefined;

const HTML_COMMENT = /<!--[\s\S]*?-->/g;

/**
 * Removes HTML comments from a sibling node list, including comments that span
 * several nodes. A multi-line comment is tokenized by Markdoc into separate
 * `text` nodes joined by `softbreak`s (none of which holds a full `<!-- … -->`
 * pair), so a per-node regex misses it — we track an open comment across the
 * siblings and drop everything until its `-->`. Non-text nodes (softbreaks,
 * links, ...) inside an open comment are dropped too. Fenced code is untouched
 * because its content lives in a `fence` node's attributes, not a text node.
 */
function stripCommentsFromSiblings(nodes: Node[]): Node[] {
  const out: Node[] = [];
  let insideComment = false;

  for (const node of nodes) {
    if (node.type !== 'text' || typeof node.attributes?.content !== 'string') {
      // Non-text sibling: keep it, unless it falls within an open comment span.
      if (!insideComment) out.push(node);
      continue;
    }

    let content = node.attributes.content;
    if (insideComment) {
      const end = content.indexOf('-->');
      // Still inside the comment: drop this whole text node.
      if (end === -1) continue;
      content = content.slice(end + 3);
      insideComment = false;
    }

    // Drop any complete comments, then detect an unterminated `<!--` that opens
    // a comment continuing into later siblings.
    content = content.replace(HTML_COMMENT, '');
    const open = content.indexOf('<!--');
    if (open !== -1) {
      content = content.slice(0, open);
      insideComment = true;
    }

    node.attributes.content = content;
    out.push(node);
  }

  return out;
}

// A trailing explicit heading ID in text form: `## Title {#some-id}`. Hugo docs
// use both this and the `{% #some-id %}` tag form; the tag form parses into the
// heading's `id` attribute/annotation, while this one survives as literal text.
const TRAILING_HEADING_ID = /\s*\{#[^}]+\}\s*$/;

/**
 * Removes explicit heading IDs from a heading node. IDs anchor in-page links in
 * the HTML build but are meaningless clutter in plaintext. The `{% #id %}` tag
 * form lands in the node's `id` attribute (with a matching annotation); the
 * `{#id}` text form survives as a trailing token in the heading's text leaf.
 */
function stripHeadingId(node: Node): void {
  if (node.type !== 'heading') return;

  const hadIdAttr = Boolean(node.attributes && 'id' in node.attributes);
  if (hadIdAttr) {
    delete node.attributes.id;
    node.annotations = (node.annotations ?? []).filter((a) => a.name !== 'id');
  }

  const textLeaves: Node[] = [];
  const collect = (n: Node) => {
    if (n.type === 'text' && typeof n.attributes?.content === 'string') textLeaves.push(n);
    (n.children ?? []).forEach(collect);
  };
  collect(node);

  // Strip the text-form ID (`{#id}`) wherever it trails.
  for (const leaf of textLeaves) {
    leaf.attributes!.content = leaf.attributes!.content.replace(TRAILING_HEADING_ID, '');
  }
  // The tag-form ID leaves the preceding space on the last text leaf (e.g.
  // "Setup " from "## Setup {% #id %}"); trim it so the heading isn't left
  // with trailing whitespace.
  const last = textLeaves[textLeaves.length - 1];
  if (hadIdAttr && last) {
    last.attributes!.content = last.attributes!.content.replace(/\s+$/, '');
  }
}

// A markdown link reference definition line: `[label]: destination …`. Some
// source docs keep a block of these but glue them directly under an HTML
// comment (no blank line), so markdown-it never registers them as definitions
// — they survive as literal text, and once filtering drops the content that
// referenced them they are dead. (Genuinely-used references are inlined by
// markdown-it at parse time, so nothing in the output still needs them.)
const REFERENCE_DEFINITION = /^\s{0,3}\[[^\]]+\]:\s+\S/;

function isReferenceDefinitionText(content: string): boolean {
  const lines = content.split('\n').map((line) => line.trim()).filter(Boolean);
  return lines.length > 0 && lines.every((line) => REFERENCE_DEFINITION.test(line));
}

/** True when a paragraph's text content is nothing but reference definitions. */
function isReferenceDefinitionParagraph(node: Node): boolean {
  if (node.type !== 'paragraph') return false;

  const textLeaves: Node[] = [];
  const collect = (n: Node) => {
    if (n.type === 'text') textLeaves.push(n);
    else (n.children ?? []).forEach(collect);
  };
  collect(node);

  let sawDefinition = false;
  for (const leaf of textLeaves) {
    const content = leaf.attributes?.content ?? '';
    if (content.trim() === '') continue;
    if (!isReferenceDefinitionText(content)) return false;
    sawDefinition = true;
  }
  return sawDefinition;
}

/** True when a (processed) node subtree carries no visible text or leaf tags. */
function isBlank(node: Node): boolean {
  if (node.type === 'text') {
    return (node.attributes?.content ?? '').trim() === '';
  }
  // A leaf tag with no children (image, hr, ...) is meaningful content.
  const children = node.children ?? [];
  if (children.length === 0) {
    return node.type === 'inline' || node.type === 'paragraph';
  }
  return children.every(isBlank);
}

export function processNodes(
  nodes: Node[],
  config: Config,
  resolvePartial: PartialResolver | undefined,
  seenPartials: Set<string>,
): Node[] {
  return nodes.flatMap((node) =>
    processNode(node, config, resolvePartial, seenPartials),
  );
}

function processNode(
  node: Node,
  config: Config,
  resolvePartial: PartialResolver | undefined,
  seenPartials: Set<string>,
): Node[] {
  if (node.type === 'comment') {
    return [];
  }
  if (node.type === 'tag' && node.tag === 'if') {
    return processIf(node, config, resolvePartial, seenPartials);
  }
  if (node.type === 'tag' && node.tag === 'partial') {
    return processPartial(node, config, resolvePartial, seenPartials);
  }
  // Point internal doc links at their `.md` twin (external/asset/anchor links
  // are left as-is by the rewriter). Children (the link text) still recurse.
  if (node.type === 'link' && typeof node.attributes?.href === 'string') {
    node.attributes.href = rewriteInternalDocLink(node.attributes.href);
  }
  // Drop explicit heading IDs — they anchor in-page links in HTML but are just
  // clutter in plaintext.
  stripHeadingId(node);
  // Recurse so nested conditionals/partials (e.g. inside an alert) resolve too,
  // then strip HTML comments across the (now-processed) sibling list — comments
  // are internal authoring notes and never belong in plaintext output.
  node.children = stripCommentsFromSiblings(
    processNodes(node.children ?? [], config, resolvePartial, seenPartials),
  );
  // Drop paragraphs that held nothing but comments/whitespace (so stripping
  // comments doesn't leave stray blank blocks) or nothing but now-orphaned
  // link reference definitions.
  if (
    node.type === 'paragraph' &&
    (isBlank(node) || isReferenceDefinitionParagraph(node))
  ) {
    return [];
  }
  return [node];
}

function processIf(
  node: Node,
  config: Config,
  resolvePartial: PartialResolver | undefined,
  seenPartials: Set<string>,
): Node[] {
  const condition = node.attributes?.primary;
  const truthy = Boolean(condition?.resolve ? condition.resolve(config) : condition);

  // Children are split by a sentinel `{% else /%}` tag into the truthy branch
  // (before) and the falsy branch (after). else-if is not handled (POC).
  const before: Node[] = [];
  const after: Node[] = [];
  let seenElse = false;
  for (const child of node.children ?? []) {
    if (child.type === 'tag' && child.tag === 'else') {
      seenElse = true;
      continue;
    }
    (seenElse ? after : before).push(child);
  }

  const chosen = truthy ? before : after;
  return processNodes(chosen, config, resolvePartial, seenPartials);
}

function processPartial(
  node: Node,
  config: Config,
  resolvePartial: PartialResolver | undefined,
  seenPartials: Set<string>,
): Node[] {
  const file = node.attributes?.file;
  if (typeof file !== 'string' || !resolvePartial) {
    return [];
  }
  // Cycle guard: a partial that (transitively) includes itself is dropped.
  if (seenPartials.has(file)) {
    return [];
  }
  const source = resolvePartial(file);
  if (source == null) {
    // Missing partial: drop rather than surface a broken include (POC).
    return [];
  }
  const nextSeen = new Set(seenPartials).add(file);
  const partialAst = parse(source);
  return processNodes(partialAst.children ?? [], config, resolvePartial, nextSeen);
}
