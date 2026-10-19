/**
 * AST twin of `ApiSchemaTable.tsx`.
 *
 * Walks the SchemaField tree depth-first and builds a Markdown `table` AST
 * node with a leading `Parent field` column. Behavior mirrors the string
 * renderer: unions appear as a `<oneOf>` / `<anyOf>` row followed by one
 * row per option label, with nested fields attributed to the option label.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { SchemaField } from "@lib/api/schemas/schemaField";
import { ANY_KEY_FIELD_NAME } from "@lib/api/refResolver";
import { tableMd } from "@lib/plaintext/helpers";

type UnionOption = NonNullable<SchemaField["unionOptions"]>[number];

interface SchemaTableRow {
  parent: string;
  field: string;
  type: string;
  description: string;
}

const UNNAMED_FIELD_LABEL = "<items>";

/** Hugo's `.md` names the parent of an `<any-key>` row this way. */
const ANY_KEY_PARENT_LABEL = "additionalProperties";

export function apiSchemaTableNode(fields: SchemaField[]): MarkdocNode | null {
  if (!fields || fields.length === 0) {
    return null;
  }

  const rows = schemaFieldsToTableRows(fields, "");

  const headers = ["Parent field", "Field", "Type", "Description"];
  const bodyRows = rows.map((row) => {
    return [row.parent, row.field, row.type, row.description];
  });

  return tableMd(headers, bodyRows);
}

function schemaFieldsToTableRows(
  fields: SchemaField[],
  parent: string,
): SchemaTableRow[] {
  const rows: SchemaTableRow[] = [];
  for (const field of fields) {
    rows.push({
      parent: field.name === ANY_KEY_FIELD_NAME ? ANY_KEY_PARENT_LABEL : parent,
      field: getFieldName(field),
      type: getFieldType(field),
      description: getFieldDescription(field),
    });

    if (field.children && field.children.length > 0) {
      rows.push(
        ...schemaFieldsToTableRows(
          field.children,
          field.name || UNNAMED_FIELD_LABEL,
        ),
      );
    }

    if (field.unionOptions && field.unionOptions.length > 0) {
      for (const opt of field.unionOptions) {
        rows.push({
          parent: field.name || UNNAMED_FIELD_LABEL,
          field: opt.label,
          // The branch's own type: a scalar variant reads `double`, not `object`.
          type: getFieldType({ type: opt.type } as SchemaField),
          description: getOptionDescription(opt),
        });
        rows.push(...schemaFieldsToTableRows(opt.fields, opt.label));
      }
    }
  }
  return rows;
}

function getFieldName(field: SchemaField): string {
  const name = field.name || UNNAMED_FIELD_LABEL;
  return field.required ? `${name} [*required*]` : name;
}

function getFieldType(field: SchemaField): string {
  if (field.type === "oneOf") {
    return "<oneOf>";
  }
  if (field.type === "anyOf") {
    return "<anyOf>";
  }
  return field.type;
}

function getFieldDescription(field: SchemaField): string {
  const parts: string[] = [];
  if (field.description) {
    parts.push(field.description);
  }
  if (field.deprecated) {
    parts.push("**Deprecated.**");
  }
  if (field.readOnly) {
    parts.push("Read-only.");
  }
  parts.push(...valueParts(field));
  return parts.join(" ");
}

/** An option row gets the same enum and default parts as a field row. */
function getOptionDescription(option: UnionOption): string {
  return [option.description ?? "", ...valueParts(option)]
    .filter(Boolean)
    .join(" ");
}

function valueParts(
  source: Pick<SchemaField, "enumValues" | "defaultValue">,
): string[] {
  const parts: string[] = [];
  if (source.enumValues && source.enumValues.length > 0) {
    parts.push(`Allowed values: \`${source.enumValues.join("`, `")}\`.`);
  }
  if (source.defaultValue !== undefined) {
    parts.push(`Default: \`${source.defaultValue}\`.`);
  }
  return parts;
}
