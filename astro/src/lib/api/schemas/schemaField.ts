export interface SchemaField {
  name: string;
  /** Display string, e.g. "string", "integer", "[object]", "enum" */
  type: string;
  required: boolean;
  deprecated: boolean;
  readOnly: boolean;
  /** Markdown string from the spec's description field */
  description: string;
  enumValues?: string[];
  defaultValue?: string;
  /** Nested objects/arrays (recursive) */
  children?: SchemaField[];
  /** oneOf / anyOf variant options */
  unionOptions?: { label: string; fields: SchemaField[] }[];
}
