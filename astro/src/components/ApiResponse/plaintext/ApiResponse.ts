/**
 * AST twin of `ApiResponse.astro`.
 *
 * Emits an outer `{% tabs %}` tag with one `{% tab %}` per status code.
 * Each panel may include a description (parsed as markdown) and then an
 * inner `{% tabs %}` tag with Model and Example tabs when both schema and
 * examples are present; otherwise it includes whichever is available.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { ResponseData } from "@lib/api/schemas/views";
import { NO_CONTENT, nodesFromMd, tag } from "@lib/plaintext/helpers";
import { apiSchemaTableNode } from "@components/ApiSchemaTable/plaintext/ApiSchemaTable";
import { exampleNodes } from "@components/ApiRequestBodyTabs/plaintext/ApiRequestBodyTabs";

export function apiResponseNode(responses: ResponseData[]): MarkdocNode | null {
  if (!responses || responses.length === 0) {
    return null;
  }

  const tabs = responses.map((r) => {
    return tag("tab", { label: r.statusCode }, panelNodes(r));
  });

  return tag("tabs", {}, tabs);
}

function panelNodes(r: ResponseData): MarkdocNode[] {
  const contents: MarkdocNode[] = [];
  if (r.description) {
    contents.push(...nodesFromMd(r.description));
  }
  contents.push(...innerNodes(r));
  return contents;
}

// Produces the schema/examples section of a response panel:
// a schema table, example nodes, or a tabs widget combining both.
function innerNodes(r: ResponseData): MarkdocNode[] {
  const hasSchema = (r.schema?.length ?? 0) > 0;
  const hasExamples = (r.examples?.length ?? 0) > 0;

  if (!hasSchema && !hasExamples) {
    return NO_CONTENT;
  }

  if (hasSchema && hasExamples) {
    const table = apiSchemaTableNode(r.schema!);
    return [
      tag("tabs", {}, [
        tag("tab", { label: "Model" }, table ? [table] : NO_CONTENT),
        tag("tab", { label: "Example" }, exampleNodes(r.examples!)),
      ]),
    ];
  }

  if (hasSchema) {
    const table = apiSchemaTableNode(r.schema!);
    return table ? [table] : NO_CONTENT;
  }

  return exampleNodes(r.examples!);
}
