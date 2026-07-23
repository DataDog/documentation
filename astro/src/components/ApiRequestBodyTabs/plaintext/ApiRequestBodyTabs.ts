/**
 * AST twin of `ApiRequestBodyTabs.astro`.
 *
 * - Schema only:   the schema table.
 * - Examples only: a sequence of JSON fenced blocks.
 * - Both:          a `{% tabs %}` tag with Model and Example tabs.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { SchemaField } from "@lib/api/schemas/schemaField";
import {
  NO_CONTENT,
  bold,
  fence,
  inline,
  paragraph,
  tag,
  plaintext,
} from "@lib/plaintext/helpers";
import { apiSchemaTableNode } from "@components/ApiSchemaTable/plaintext/ApiSchemaTable";

interface Example {
  name: string;
  value: string;
}

interface Props {
  schema: SchemaField[];
  examples: Example[];
}

export function apiRequestBodyTabsNodes({
  schema,
  examples,
}: Props): MarkdocNode[] {
  const hasSchema = schema.length > 0;
  const hasExamples = examples.length > 0;

  if (hasSchema && !hasExamples) {
    const table = apiSchemaTableNode(schema);
    return table ? [table] : NO_CONTENT;
  }

  if (!hasSchema && hasExamples) {
    return exampleNodes(examples);
  }

  if (hasSchema && hasExamples) {
    const table = apiSchemaTableNode(schema);
    const modelChildren = table ? [table] : NO_CONTENT;
    const tabs = tag("tabs", {}, [
      tag("tab", { label: "Model" }, modelChildren),
      tag("tab", { label: "Example" }, exampleNodes(examples)),
    ]);
    return [tabs];
  }

  return NO_CONTENT;
}

export function exampleNodes(examples: Example[]): MarkdocNode[] {
  const includeHeading = examples.length > 1;
  const contents: MarkdocNode[] = [];
  for (const ex of examples) {
    if (includeHeading) {
      contents.push(paragraph([inline([bold([plaintext(ex.name)])])]));
    }
    contents.push(fence("json", ex.value));
  }
  return contents;
}
