/**
 * Examples for a `multipart/form-data` request body, written as the curl
 * `-F` fields that send it. A JSON example would misrepresent a body that
 * isn't sent as JSON, and its file fields as strings.
 */

import type { OpenAPIV3 } from "openapi-types";
import { resolveRef } from "./refResolver";

type SchemaOrRef = OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;

interface FormExample {
  name: string;
  value: string;
  language: string;
}

/** Stands in for a file the spec doesn't name. */
const PLACEHOLDER_FILE_PATH = "/path/to/file";

export function multipartFormExamples(
  spec: OpenAPIV3.Document,
  bodyContent: OpenAPIV3.MediaTypeObject,
): { examples: FormExample[]; showTitles: boolean } {
  const properties = formProperties(spec, bodyContent.schema);
  const fieldsFor = (value: Record<string, unknown>) =>
    formFieldLines(properties, bodyContent.encoding ?? {}, value);

  const specExamples = namedSpecExamples(spec, bodyContent).filter(
    ({ value }) => Object.keys(value).length > 0,
  );
  const named =
    specExamples.length > 0
      ? specExamples
      : [{ name: "Example", value: schemaFormValue(properties) }];

  const examples = uniqueByValue(
    named
      .map(({ name, value }) => ({
        name,
        value: fieldsFor(value),
        language: "bash",
      }))
      .filter((example) => example.value !== ""),
  );
  return { examples, showTitles: examples.length > 1 };
}

/** The spec's `example` or `examples`, each named by its summary or key. */
function namedSpecExamples(
  spec: OpenAPIV3.Document,
  bodyContent: OpenAPIV3.MediaTypeObject,
): Array<{ name: string; value: Record<string, unknown> }> {
  if (isRecord(bodyContent.example)) {
    return [{ name: "Example", value: bodyContent.example }];
  }
  return Object.entries(bodyContent.examples ?? {}).flatMap(
    ([exampleId, exampleOrRef]) => {
      const example: OpenAPIV3.ExampleObject | undefined = resolve(
        spec,
        exampleOrRef,
      );
      if (!isRecord(example?.value)) return [];
      return [{ name: example.summary || exampleId, value: example.value }];
    },
  );
}

/**
 * The form's fields by name, including those of every `oneOf`, `anyOf` or
 * `allOf` variant, so a field can be looked up whichever variant sends it.
 */
function formProperties(
  spec: OpenAPIV3.Document,
  schemaOrRef: SchemaOrRef | undefined,
): Record<string, OpenAPIV3.SchemaObject> {
  const schema: OpenAPIV3.SchemaObject | undefined = resolve(spec, schemaOrRef);
  if (!schema) return {};

  const properties: Record<string, OpenAPIV3.SchemaObject> = {};
  for (const [name, property] of Object.entries(schema.properties ?? {})) {
    properties[name] = resolve(spec, property) ?? {};
  }
  const variants = [
    ...(schema.oneOf ?? []),
    ...(schema.anyOf ?? []),
    ...(schema.allOf ?? []),
  ];
  for (const variant of variants) {
    for (const [name, property] of Object.entries(
      formProperties(spec, variant),
    )) {
      properties[name] ??= property;
    }
  }
  return properties;
}

/** A value for each field, from its example or, for a file, a placeholder. */
function schemaFormValue(
  properties: Record<string, OpenAPIV3.SchemaObject>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.keys(properties)
      .sort()
      .map((name) => {
        const property = properties[name];
        const example = property.example;
        const hasExample = example !== undefined && example !== "";
        if (hasExample) return [name, example];
        return [name, isFile(property) ? PLACEHOLDER_FILE_PATH : property.type];
      }),
  );
}

/** One `-F` line per field, in the order the example lists them. */
function formFieldLines(
  properties: Record<string, OpenAPIV3.SchemaObject>,
  encoding: Record<string, OpenAPIV3.EncodingObject>,
  value: Record<string, unknown>,
): string {
  return Object.entries(value)
    .map(([name, fieldValue]) => {
      const contentType = encoding[name]?.contentType;
      const typeSuffix = contentType ? `;type=${contentType}` : "";
      const formValue = formFieldValue(properties[name], fieldValue);
      return `-F ${shellQuote(`${name}=${formValue}${typeSuffix}`)}`;
    })
    .join("\n");
}

/** A file as curl's `@<path>`, an object as JSON, anything else as text. */
function formFieldValue(
  property: OpenAPIV3.SchemaObject | undefined,
  fieldValue: unknown,
): string {
  if (property && isFile(property)) {
    const path = String(fieldValue ?? "").replace(/^@/, "");
    return `@${path || PLACEHOLDER_FILE_PATH}`;
  }
  if (typeof fieldValue === "object" && fieldValue !== null) {
    return JSON.stringify(fieldValue);
  }
  return String(fieldValue);
}

function isFile(property: OpenAPIV3.SchemaObject): boolean {
  return property.format === "binary";
}

function shellQuote(text: string): string {
  return `'${text.replaceAll("'", `'\\''`)}'`;
}

function uniqueByValue(examples: FormExample[]): FormExample[] {
  const seenValues = new Set<string>();
  return examples.filter((example) => {
    if (seenValues.has(example.value)) return false;
    seenValues.add(example.value);
    return true;
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function resolve<T extends object>(
  spec: OpenAPIV3.Document,
  objectOrRef: T | OpenAPIV3.ReferenceObject | undefined,
): T | undefined {
  if (objectOrRef && "$ref" in objectOrRef) {
    return resolveRef(spec, objectOrRef.$ref);
  }
  return objectOrRef;
}
