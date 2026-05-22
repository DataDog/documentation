/**
 * AST twin of `ApiRequestBodyTabs.astro`.
 *
 * - Schema only:   the schema table.
 * - Examples only: a sequence of JSON fenced blocks.
 * - Both:          a `{% tabs %}` tag with Model and Example tabs.
 */

import type { Node as MarkdocNode } from '@markdoc/markdoc';
import type { SchemaField } from '@lib/api/schemas/schemaField';
import { Ast, fenceNode, inlineNode, paragraphNode, tagNode, textNode } from '@lib/plaintext/helpers';
import { apiSchemaTableNode } from '@components/ApiSchemaTable/plaintext/ApiSchemaTable';

interface Example {
  name: string;
  value: string;
}

interface Props {
  schema: SchemaField[];
  examples: Example[];
}

export function apiRequestBodyTabsNodes({ schema, examples }: Props): MarkdocNode[] {
  const hasSchema = schema.length > 0;
  const hasExamples = examples.length > 0;

  if (hasSchema && !hasExamples) {
    const table = apiSchemaTableNode(schema);
    return table ? [table] : [];
  }

  if (!hasSchema && hasExamples) {
    return exampleNodes(examples);
  }

  if (hasSchema && hasExamples) {
    const table = apiSchemaTableNode(schema);
    const modelChildren = table ? [table] : [];
    const tabs = tagNode('tabs', {}, [
      tagNode('tab', { label: 'Model' }, modelChildren),
      tagNode('tab', { label: 'Example' }, exampleNodes(examples)),
    ]);
    return [tabs];
  }

  return [];
}

export function exampleNodes(examples: Example[]): MarkdocNode[] {
  const includeHeading = examples.length > 1;
  const nodes: MarkdocNode[] = [];
  for (const ex of examples) {
    if (includeHeading) {
      const strong = new Ast.Node('strong', {}, [textNode(ex.name)]);
      nodes.push(paragraphNode([inlineNode([strong])]));
    }
    nodes.push(fenceNode('json', ex.value));
  }
  return nodes;
}
