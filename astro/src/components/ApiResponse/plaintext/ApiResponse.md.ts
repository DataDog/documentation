/**
 * Markdown twin of `ApiResponse.astro`.
 *
 * Renders responses as a Markdoc `{% tabs %}` block with one outer tab per
 * status code. Each panel may include a description, then an inner `{% tabs %}`
 * block with Model and Example tabs (if both schema and examples are present).
 */

import type { ResponseData } from '../../../data/api/endpoints';
import { renderApiSchemaTableMd } from '../../ApiSchemaTable/plaintext/ApiSchemaTable.md';
import { htmlToMd } from '../../../data/api/htmlToMd';

function renderExamples(examples: NonNullable<ResponseData['examples']>): string {
  return examples
    .map((ex) => {
      const heading = examples.length > 1 ? `**${ex.name}**\n\n` : '';
      return `${heading}\`\`\`json\n${ex.value}\n\`\`\``;
    })
    .join('\n\n');
}

function renderInnerTabs(r: ResponseData): string {
  const hasSchema = (r.schema?.length ?? 0) > 0;
  const hasExamples = (r.examples?.length ?? 0) > 0;

  if (!hasSchema && !hasExamples) return '';

  if (hasSchema && hasExamples) {
    return [
      '{% tabs %}',
      '{% tab label="Model" %}',
      '',
      renderApiSchemaTableMd(r.schema!),
      '',
      '{% /tab %}',
      '{% tab label="Example" %}',
      '',
      renderExamples(r.examples!),
      '',
      '{% /tab %}',
      '{% /tabs %}',
    ].join('\n');
  }

  if (hasSchema) return renderApiSchemaTableMd(r.schema!);
  return renderExamples(r.examples!);
}

function renderResponsePanel(r: ResponseData): string {
  const parts: string[] = [];
  if (r.description) parts.push(htmlToMd(r.description));
  const inner = renderInnerTabs(r);
  if (inner) parts.push(inner);
  return parts.join('\n\n');
}

export function renderApiResponseMd(responses: ResponseData[]): string {
  if (!responses || responses.length === 0) return '';

  const lines: string[] = ['{% tabs %}'];
  for (const r of responses) {
    lines.push(`{% tab label="${r.statusCode}" %}`);
    lines.push('');
    const body = renderResponsePanel(r);
    if (body) {
      lines.push(body);
      lines.push('');
    }
    lines.push('{% /tab %}');
  }
  lines.push('{% /tabs %}');

  return lines.join('\n');
}
