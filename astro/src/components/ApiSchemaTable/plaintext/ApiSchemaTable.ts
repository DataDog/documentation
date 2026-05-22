/**
 * AST twin of `ApiSchemaTable.tsx` / `renderApiSchemaTableMd`.
 *
 * Walks the SchemaField tree depth-first and builds a Markdown `table` AST
 * node with a leading `Parent field` column. Behavior mirrors the string
 * renderer: unions appear as a `<oneOf>` / `<anyOf>` row followed by one
 * row per option label, with nested fields attributed to the option label.
 */

import type { Node as MarkdocNode } from '@markdoc/markdoc';
import type { SchemaField } from '@lib/api/schemas/schemaField';
import { tableNodeMd } from '@lib/plaintext/helpers';

interface Row {
  parent: string;
  field: string;
  type: string;
  description: string;
}

const UNNAMED_FIELD_LABEL = '<items>';

export function apiSchemaTableNode(fields: SchemaField[]): MarkdocNode | null {
  if (!fields || fields.length === 0) {
    return null;
  }

  const rows: Row[] = [];
  walkFields(fields, '', rows);

  const headers = ['Parent field', 'Field', 'Type', 'Description'];
  const bodyRows = rows.map((row) => {
    return [row.parent, row.field, row.type, row.description];
  });

  return tableNodeMd(headers, bodyRows);
}

function fieldName(field: SchemaField): string {
  const name = field.name || UNNAMED_FIELD_LABEL;
  return field.required ? `${name} [*required*]` : name;
}

function fieldType(field: SchemaField): string {
  if (field.type === 'oneOf') {
    return '<oneOf>';
  }
  if (field.type === 'anyOf') {
    return '<anyOf>';
  }
  return field.type;
}

function fieldDescription(field: SchemaField): string {
  const parts: string[] = [];
  if (field.description) {
    parts.push(field.description);
  }
  if (field.deprecated) {
    parts.push('**Deprecated.**');
  }
  if (field.readOnly) {
    parts.push('Read-only.');
  }
  if (field.enumValues && field.enumValues.length > 0) {
    parts.push(`Allowed values: \`${field.enumValues.join('`, `')}\`.`);
  }
  if (field.defaultValue !== undefined) {
    parts.push(`Default: \`${field.defaultValue}\`.`);
  }
  return parts.join(' ');
}

function walkFields(fields: SchemaField[], parent: string, rows: Row[]): void {
  for (const f of fields) {
    rows.push({
      parent,
      field: fieldName(f),
      type: fieldType(f),
      description: fieldDescription(f),
    });

    if (f.children && f.children.length > 0) {
      walkFields(f.children, f.name || UNNAMED_FIELD_LABEL, rows);
    }

    if (f.unionOptions && f.unionOptions.length > 0) {
      for (const opt of f.unionOptions) {
        rows.push({
          parent: f.name || UNNAMED_FIELD_LABEL,
          field: opt.label,
          type: 'object',
          description: '',
        });
        walkFields(opt.fields, opt.label, rows);
      }
    }
  }
}
