/**
 * AST twin of `ApiRequestBodyTabs.astro`.
 *
 * - Schema only:   the schema table.
 * - Examples only: a sequence of fenced blocks (JSON by default), each under its bold
 *                  name when titles are shown.
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
  /** Defaults to JSON. */
  language?: string;
}

interface Props {
  schema: SchemaField[];
  examples: Example[];
  /** Defaults to titling the examples when there is more than one. */
  showExampleTitles?: boolean;
}

export function apiRequestBodyTabsNodes({
  schema,
  examples,
  showExampleTitles = examples.length > 1,
}: Props): MarkdocNode[] {
  const hasSchema = schema.length > 0;
  const hasExamples = examples.length > 0;

  if (hasSchema && !hasExamples) {
    const table = apiSchemaTableNode(schema);
    return table ? [table] : NO_CONTENT;
  }

  if (!hasSchema && hasExamples) {
    return exampleNodes(examples, showExampleTitles);
  }

  if (hasSchema && hasExamples) {
    const table = apiSchemaTableNode(schema);
    const modelChildren = table ? [table] : NO_CONTENT;
    const tabs = tag("tabs", {}, [
      tag("tab", { label: "Model" }, modelChildren),
      tag(
        "tab",
        { label: "Example" },
        exampleNodes(examples, showExampleTitles),
      ),
    ]);
    return [tabs];
  }

  return NO_CONTENT;
}

export function exampleNodes(
  examples: Example[],
  showTitles = examples.length > 1,
): MarkdocNode[] {
  const contents: MarkdocNode[] = [];
  for (const ex of examples) {
    if (showTitles) {
      contents.push(paragraph([inline([bold([plaintext(ex.name)])])]));
    }
    contents.push(fence(ex.language ?? "json", ex.value));
  }
  return contents;
}
