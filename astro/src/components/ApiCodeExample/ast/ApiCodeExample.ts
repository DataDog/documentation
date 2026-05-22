/**
 * AST twin of `ApiCodeExample.astro` / `renderApiCodeExampleMd`.
 *
 * Wraps code examples in a Markdoc `{% tabs %}` tag with one `{% tab %}`
 * child per language. Each tab contains a sequence of fenced code blocks;
 * when a language has multiple entries, each is preceded by a bold heading
 * paragraph carrying its description.
 */

import type { Node as MarkdocNode } from '@markdoc/markdoc';
import type { CodeExampleSet, CodeExampleEntry } from '@lib/api/schemas/codeExamples';
import { Ast, fenceNode, inlineNode, paragraphNode, tagNode, textNode } from '@lib/ast/helpers';

export function apiCodeExampleNode(examples: CodeExampleSet[]): MarkdocNode | null {
  if (!examples || examples.length === 0) {
    return null;
  }

  const tabs = examples.map((set) => {
    return tagNode('tab', { label: set.label }, renderTab(set));
  });

  return tagNode('tabs', {}, tabs);
}

function renderTab(set: CodeExampleSet): MarkdocNode[] {
  const includeHeading = set.entries.length > 1;
  const nodes: MarkdocNode[] = [];
  for (const entry of set.entries) {
    nodes.push(...renderEntry(entry, includeHeading));
  }
  return nodes;
}

function renderEntry(entry: CodeExampleEntry, includeHeading: boolean): MarkdocNode[] {
  const out: MarkdocNode[] = [];
  if (includeHeading && entry.description) {
    out.push(boldParagraph(entry.description));
  }
  out.push(fenceNode(entry.syntax, entry.code));
  return out;
}

function boldParagraph(text: string): MarkdocNode {
  const strong = new Ast.Node('strong', {}, [textNode(text)]);
  return paragraphNode([inlineNode([strong])]);
}
