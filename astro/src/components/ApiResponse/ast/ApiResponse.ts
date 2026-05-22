/**
 * AST twin of `ApiResponse.astro` / `renderApiResponseMd`.
 *
 * Emits an outer `{% tabs %}` tag with one `{% tab %}` per status code.
 * Each panel may include a description (parsed as markdown) and then an
 * inner `{% tabs %}` tag with Model and Example tabs when both schema and
 * examples are present; otherwise it includes whichever is available.
 */

import type { Node as MarkdocNode } from '@markdoc/markdoc';
import type { ResponseData } from '@lib/api/schemas/views';
import { nodesFromMd, tagNode } from '@lib/ast/helpers';
import { apiSchemaTableNode } from '@components/ApiSchemaTable/ast/ApiSchemaTable';
import { exampleNodes } from '@components/ApiRequestBodyTabs/ast/ApiRequestBodyTabs';

export function apiResponseNode(responses: ResponseData[]): MarkdocNode | null {
  if (!responses || responses.length === 0) {
    return null;
  }

  const tabs = responses.map((r) => {
    return tagNode('tab', { label: r.statusCode }, panelNodes(r));
  });

  return tagNode('tabs', {}, tabs);
}

function panelNodes(r: ResponseData): MarkdocNode[] {
  const nodes: MarkdocNode[] = [];
  if (r.description) {
    nodes.push(...nodesFromMd(r.description));
  }
  nodes.push(...innerNodes(r));
  return nodes;
}

function innerNodes(r: ResponseData): MarkdocNode[] {
  const hasSchema = (r.schema?.length ?? 0) > 0;
  const hasExamples = (r.examples?.length ?? 0) > 0;

  if (!hasSchema && !hasExamples) {
    return [];
  }

  if (hasSchema && hasExamples) {
    const table = apiSchemaTableNode(r.schema!);
    return [
      tagNode('tabs', {}, [
        tagNode('tab', { label: 'Model' }, table ? [table] : []),
        tagNode('tab', { label: 'Example' }, exampleNodes(r.examples!)),
      ]),
    ];
  }

  if (hasSchema) {
    const table = apiSchemaTableNode(r.schema!);
    return table ? [table] : [];
  }

  return exampleNodes(r.examples!);
}
