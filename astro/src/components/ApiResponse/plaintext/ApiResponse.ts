/**
 * AST twin of `ApiResponse.astro`.
 *
 * Emits an outer `{% tabs %}` tag with one `{% tab %}` per status code.
 * Each panel may include a description (parsed as markdown) and then an
 * inner `{% tabs %}` tag with Model and Example tabs when both a model (schema
 * rows, a schema description, a non-JSON content type, or an empty body) and
 * examples are present; otherwise it includes whichever is available.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { ResponseData } from "@lib/api/schemas/views";
import { NO_CONTENT, nodesFromMd, tableMd, tag } from "@lib/plaintext/helpers";
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
  // A top-level array of primitives has no rows, but Hugo still shows its
  // Model tab, with the schema description and no table. A non-JSON body's
  // Model is its content type.
  const hasModel =
    hasSchema ||
    Boolean(r.schemaDescription) ||
    Boolean(r.contentType) ||
    Boolean(r.emptyBody);

  if (!hasSchema && !hasExamples) {
    return r.contentType ? modelNodes(r) : NO_CONTENT;
  }

  if (hasModel && hasExamples) {
    return [
      tag("tabs", {}, [
        tag("tab", { label: "Model" }, modelNodes(r)),
        tag("tab", { label: "Example" }, exampleNodes(r.examples!)),
      ]),
    ];
  }

  if (hasSchema) {
    return modelNodes(r);
  }

  return exampleNodes(r.examples!);
}

// The schema description (when present) followed by the schema table.
function modelNodes(r: ResponseData): MarkdocNode[] {
  const nodes: MarkdocNode[] = [];
  if (r.schemaDescription) {
    nodes.push(...nodesFromMd(r.schemaDescription));
  }
  if (r.contentType) {
    // MISSING_TRANSLATION_LABEL: This label is not in the i18n file yet.
    nodes.push(...nodesFromMd(`Content type: \`${r.contentType}\``));
  }
  // Like Hugo's `.md`, an empty JSON object's Model is a header-only table.
  if (r.emptyBody) {
    nodes.push(tableMd(["Field", "Type", "Description"], []));
  }
  const table = r.schema?.length ? apiSchemaTableNode(r.schema) : null;
  if (table) {
    nodes.push(table);
  }
  return nodes.length > 0 ? nodes : NO_CONTENT;
}
