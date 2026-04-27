/**
 * Markdown twin of `ApiCodeExample.astro`.
 *
 * Renders code examples as a Markdoc `{% tabs %}` block with one tab per
 * language. Per-language entries (e.g. multiple curl variants for the same
 * endpoint) are emitted in sequence inside the tab, each preceded by its
 * description as a bold heading. Region variants are not duplicated — the
 * default region's code is used (the region URL table at the top of the
 * endpoint covers per-region differences).
 */

import type { CodeExampleSet, CodeExampleEntry } from '../../../data/api/examples';

function renderEntry(entry: CodeExampleEntry, includeHeading: boolean): string {
  const heading = includeHeading && entry.description ? `**${entry.description}**\n\n` : '';
  return `${heading}\`\`\`${entry.syntax}\n${entry.code}\n\`\`\``;
}

function renderTab(set: CodeExampleSet): string {
  const includeHeading = set.entries.length > 1;
  return set.entries.map((e) => renderEntry(e, includeHeading)).join('\n\n');
}

export function renderApiCodeExampleMd(examples: CodeExampleSet[]): string {
  if (!examples || examples.length === 0) return '';

  const lines: string[] = ['{% tabs %}'];
  for (const set of examples) {
    lines.push(`{% tab label="${set.label}" %}`);
    lines.push('');
    lines.push(renderTab(set));
    lines.push('');
    lines.push('{% /tab %}');
  }
  lines.push('{% /tabs %}');

  return lines.join('\n');
}
