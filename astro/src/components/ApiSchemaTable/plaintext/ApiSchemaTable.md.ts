/**
 * Markdown twin of `ApiSchemaTable.tsx`.
 *
 * Walks the SchemaField tree depth-first and emits a flat Markdown table with
 * a leading `Parent field` column. The HTML version uses an interactive
 * tree (expand/collapse); the Markdown version is fully expanded since the
 * output is consumed by AI agents that can't interact with the page.
 *
 * Union options (`oneOf` / `anyOf`) appear as additional rows. The union
 * field renders first with type `<oneOf>` / `<anyOf>`; each option label
 * (e.g. `Option 1`, `AWSIntegration`) appears beneath it as a row whose
 * parent is the union field's name. The option's nested fields then carry
 * the option label as their parent.
 */

import type { SchemaField } from '../../../data/api/resolver';
import { htmlToMdInline } from '../../../data/api/htmlToMd';

const UNNAMED_FIELD_LABEL = '<items>';

function escapeCell(s: string): string {
  return s.replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
}

function fieldName(field: SchemaField): string {
  const name = field.name || UNNAMED_FIELD_LABEL;
  return field.required ? `${name} [*required*]` : name;
}

function fieldType(field: SchemaField): string {
  if (field.type === 'oneOf') return '<oneOf>';
  if (field.type === 'anyOf') return '<anyOf>';
  return field.type;
}

function fieldDescription(field: SchemaField): string {
  const parts: string[] = [];
  if (field.description) parts.push(htmlToMdInline(field.description));
  if (field.deprecated) parts.push('**Deprecated.**');
  if (field.readOnly) parts.push('Read-only.');
  if (field.enumValues && field.enumValues.length > 0) {
    parts.push(`Allowed values: \`${field.enumValues.join('`, `')}\`.`);
  }
  if (field.defaultValue !== undefined) {
    parts.push(`Default: \`${field.defaultValue}\`.`);
  }
  return parts.join(' ');
}

interface Row {
  parent: string;
  field: string;
  type: string;
  description: string;
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

/**
 * Render an array of schema fields as a Markdown table. Returns an empty
 * string when there are no fields (caller decides whether to omit the
 * surrounding section).
 */
export function renderApiSchemaTableMd(fields: SchemaField[]): string {
  if (!fields || fields.length === 0) return '';

  const rows: Row[] = [];
  walkFields(fields, '', rows);

  const lines: string[] = [
    '| Parent field | Field | Type | Description |',
    '| --- | --- | --- | --- |',
  ];

  for (const row of rows) {
    lines.push(
      `| ${escapeCell(row.parent)} | ${escapeCell(row.field)} | ${escapeCell(row.type)} | ${escapeCell(row.description)} |`,
    );
  }

  return lines.join('\n');
}
