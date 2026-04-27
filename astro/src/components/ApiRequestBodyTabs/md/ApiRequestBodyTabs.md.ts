/**
 * Markdown twin of `ApiRequestBodyTabs.astro`.
 *
 * - Schema only:    the schema table.
 * - Examples only:  fenced JSON code blocks.
 * - Both:           a Markdoc `{% tabs %}` block with Model and Example tabs.
 */

import type { SchemaField } from "../../../data/api/resolver";
import { renderApiSchemaTableMd } from "../../ApiSchemaTable/plaintext/ApiSchemaTable.md";

interface Example {
  name: string;
  value: string;
}

interface Props {
  schema: SchemaField[];
  examples: Example[];
}

function renderExamples(examples: Example[]): string {
  return examples
    .map((ex) => {
      const heading = examples.length > 1 ? `**${ex.name}**\n\n` : "";
      return `${heading}\`\`\`json\n${ex.value}\n\`\`\``;
    })
    .join("\n\n");
}

export function renderApiRequestBodyTabsMd({
  schema,
  examples,
}: Props): string {
  const hasSchema = schema.length > 0;
  const hasExamples = examples.length > 0;

  if (hasSchema && !hasExamples) {
    return renderApiSchemaTableMd(schema);
  }

  if (!hasSchema && hasExamples) {
    return renderExamples(examples);
  }

  if (hasSchema && hasExamples) {
    return [
      "{% tabs %}",
      '{% tab label="Model" %}',
      "",
      renderApiSchemaTableMd(schema),
      "",
      "{% /tab %}",
      '{% tab label="Example" %}',
      "",
      renderExamples(examples),
      "",
      "{% /tab %}",
      "{% /tabs %}",
    ].join("\n");
  }

  return "";
}
