/**
 * AST twin of `ApiCodeExample.astro`.
 *
 * Wraps code examples in a Markdoc `{% tabs %}` tag with one `{% tab %}`
 * child per language. Each tab contains a sequence of fenced code blocks;
 * when a language has multiple entries, each is preceded by a bold heading
 * paragraph carrying its description.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type {
  CodeExampleSet,
  CodeExampleEntry,
} from "@lib/api/schemas/codeExamples";
import {
  bold,
  fence,
  inline,
  paragraph,
  tag,
  plaintext,
} from "@lib/plaintext/helpers";

export function apiCodeExampleNode(
  examples: CodeExampleSet[],
): MarkdocNode | null {
  if (!examples || examples.length === 0) {
    return null;
  }

  const tabs = examples.map((set) => {
    return tag("tab", { label: set.label }, renderCodeExampleTab(set));
  });

  return tag("tabs", {}, tabs);
}

function renderCodeExampleTab(set: CodeExampleSet): MarkdocNode[] {
  const includeHeading = set.entries.length > 1;
  const contents: MarkdocNode[] = [];
  for (const entry of set.entries) {
    contents.push(...renderCodeExampleContent(entry, includeHeading));
  }
  return contents;
}

function renderCodeExampleContent(
  entry: CodeExampleEntry,
  includeHeading: boolean,
): MarkdocNode[] {
  const contents: MarkdocNode[] = [];
  if (includeHeading && entry.description) {
    contents.push(boldParagraph(entry.description));
  }
  contents.push(fence(entry.syntax, entry.code));
  return contents;
}

function boldParagraph(text: string): MarkdocNode {
  return paragraph([inline([bold([plaintext(text)])])]);
}
