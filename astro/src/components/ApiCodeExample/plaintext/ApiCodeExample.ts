/**
 * AST twin of `ApiCodeExample.astro`.
 *
 * Wraps code examples in a Markdoc `{% tabs %}` tag with one `{% tab %}`
 * child per language. Each tab contains a sequence of fenced code blocks,
 * with no title above each one: prod's `.md` writes none, and each example's
 * first comment already repeats its description.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type {
  CodeExampleSet,
  CodeExampleEntry,
} from "@lib/api/schemas/codeExamples";
import { fence, tag } from "@lib/plaintext/helpers";
import { apiCodeInstructionsNodes } from "@components/ApiCodeInstructions/plaintext/ApiCodeInstructions";

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
  const contents: MarkdocNode[] = set.entries.map(codeExampleFence);
  if (set.instructions) {
    contents.push(
      ...apiCodeInstructionsNodes({
        language: set.language,
        ...set.instructions,
      }),
    );
  }
  return contents;
}

function codeExampleFence(entry: CodeExampleEntry): MarkdocNode {
  return fence(entry.syntax, entry.code);
}
