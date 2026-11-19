import type { OpenAPIV3 } from "openapi-types";
import { resolveRef } from "./refResolver";
import type { SchemaField } from "./schemas/schemaField";
import type { CodeExampleSet } from "./schemas/codeExamples";

export const API_BASE_VERSION = "base";

export type ApiDateVersion = typeof API_BASE_VERSION | string;

type SchemaOrRef = OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;

interface VersionedSchemaAlternative {
  version: ApiDateVersion;
  schema: OpenAPIV3.ReferenceObject;
}

type VersionedSchemaContainer = OpenAPIV3.SchemaObject & {
  "x-datadog-api-versioned": true;
};

const VERSIONED_COMPONENT_RE = /_(V1|(\d{4})(\d{2})(\d{2}))$/;

/**
 * Lists the base and dated schema versions used by an operation. Dates come
 * from the transformer-owned component naming contract: `Name_V1` is the
 * default schema and `Name_YYYYMMDD` is a dated schema.
 */
export function getOperationDateVersions(
  spec: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject,
): ApiDateVersion[] {
  const versions = new Set<ApiDateVersion>();
  forEachBodySchema(operation, (schema) => {
    for (const alternative of versionedAlternatives(spec, schema)) {
      versions.add(alternative.version);
    }
  });
  if (versions.size === 0) return [];
  const dates = [...versions]
    .filter((version) => version !== API_BASE_VERSION)
    .sort();
  return versions.has(API_BASE_VERSION) ? [API_BASE_VERSION, ...dates] : dates;
}

/**
 * Replaces every versioned request/response schema with the branch selected
 * for one API date. The returned operation is independent of the source.
 */
export function projectOperationForDateVersion(
  spec: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject,
  version: ApiDateVersion,
): OpenAPIV3.OperationObject {
  const projected = structuredClone(operation);
  forEachBodySchema(projected, (schema, replace) => {
    const alternatives = versionedAlternatives(spec, schema);
    if (alternatives.length === 0) return;
    const selected = selectAlternative(alternatives, version);
    if (selected) replace(structuredClone(selected.schema));
  });
  return projected;
}

function selectAlternative(
  alternatives: VersionedSchemaAlternative[],
  version: ApiDateVersion,
): VersionedSchemaAlternative | undefined {
  if (version === API_BASE_VERSION) {
    return alternatives.find(
      (alternative) => alternative.version === API_BASE_VERSION,
    );
  }
  const dated = alternatives
    .filter(
      (alternative) =>
        alternative.version !== API_BASE_VERSION &&
        alternative.version <= version,
    )
    .sort((a, b) => b.version.localeCompare(a.version));
  return (
    dated[0] ??
    alternatives.find((alternative) => alternative.version === API_BASE_VERSION)
  );
}

function versionedAlternatives(
  spec: OpenAPIV3.Document,
  schema: SchemaOrRef,
): VersionedSchemaAlternative[] {
  const container = resolveSchema(spec, schema);
  if (!isVersionedContainer(container) || !container.oneOf) return [];

  return container.oneOf.flatMap((alternative) => {
    if (!("$ref" in alternative)) return [];
    const version = versionFromRef(alternative.$ref);
    return version ? [{ version, schema: alternative }] : [];
  });
}

function resolveSchema(
  spec: OpenAPIV3.Document,
  schema: SchemaOrRef,
): OpenAPIV3.SchemaObject | undefined {
  return "$ref" in schema ? resolveRef(spec, schema.$ref) : schema;
}

function isVersionedContainer(
  schema: OpenAPIV3.SchemaObject | undefined,
): schema is VersionedSchemaContainer {
  return (
    schema !== undefined &&
    (
      schema as OpenAPIV3.SchemaObject & {
        "x-datadog-api-versioned"?: boolean;
      }
    )["x-datadog-api-versioned"] === true
  );
}

function versionFromRef(ref: string): ApiDateVersion | undefined {
  const component = ref.split("/").at(-1) ?? "";
  const match = VERSIONED_COMPONENT_RE.exec(component);
  if (!match) return undefined;
  if (match[1] === "V1") return API_BASE_VERSION;
  const date = `${match[2]}-${match[3]}-${match[4]}`;
  return Number.isNaN(Date.parse(`${date}T00:00:00Z`)) ? undefined : date;
}

type ReplaceSchema = (schema: SchemaOrRef) => void;

function forEachBodySchema(
  operation: OpenAPIV3.OperationObject,
  visit: (schema: SchemaOrRef, replace: ReplaceSchema) => void,
): void {
  const requestBody = operation.requestBody;
  if (requestBody && !("$ref" in requestBody)) {
    for (const media of Object.values(requestBody.content ?? {})) {
      if (!media.schema) continue;
      visit(media.schema, (schema) => {
        media.schema = schema;
      });
    }
  }

  for (const response of Object.values(operation.responses ?? {})) {
    if ("$ref" in response) continue;
    for (const media of Object.values(response.content ?? {})) {
      if (!media.schema) continue;
      visit(media.schema, (schema) => {
        media.schema = schema;
      });
    }
  }
}

/** Adds adjacent-version markers while retaining removed fields as rows. */
export function diffVersionedSchemaFields(
  current: SchemaField[],
  previous: SchemaField[],
  version: string,
): SchemaField[] {
  const previousByName = new Map(previous.map((field) => [field.name, field]));
  const currentNames = new Set(current.map((field) => field.name));

  const result = current.map((field) => {
    const previousField = previousByName.get(field.name);
    if (!previousField) {
      return withVersionChange(field, "added", version);
    }
    if (field.children || previousField.children) {
      return {
        ...field,
        children: diffVersionedSchemaFields(
          field.children ?? [],
          previousField.children ?? [],
          version,
        ),
      };
    }
    return field;
  });

  for (const previousField of previous) {
    if (!currentNames.has(previousField.name)) {
      result.push(withVersionChange(previousField, "removed", version));
    }
  }
  return result;
}

function withVersionChange(
  field: SchemaField,
  type: "added" | "removed",
  version: string,
): SchemaField {
  return {
    ...structuredClone(field),
    versionChange: { type, version },
  };
}

/** Rewrites generated SDK namespaces to their date-versioned equivalents. */
export function versionSdkCodeExamples(
  sets: CodeExampleSet[],
  version: string,
  majorVersion = "v1",
): CodeExampleSet[] {
  const compact = version.replaceAll("-", "");
  const majorLower = majorVersion.toLowerCase();
  const majorUpper = majorVersion.toUpperCase();
  return sets.map((set) => ({
    ...set,
    entries: set.entries.map((entry) => ({
      ...entry,
      code: versionSdkCode(
        entry.code,
        set.language,
        compact,
        majorLower,
        majorUpper,
      ),
      ...(entry.regionVariants && {
        regionVariants: Object.fromEntries(
          Object.entries(entry.regionVariants).map(([region, variant]) => [
            region,
            {
              code: versionSdkCode(
                variant.code,
                set.language,
                compact,
                majorLower,
                majorUpper,
              ),
            },
          ]),
        ),
      }),
    })),
  }));
}

function versionSdkCode(
  code: string,
  language: string,
  compact: string,
  majorLower: string,
  majorUpper: string,
): string {
  switch (language.toLowerCase()) {
    case "go":
      return code.replaceAll(
        `/api/datadog${majorUpper}"`,
        `/api/datadog${majorUpper}-${compact}"`,
      );
    case "python":
    case "python-legacy":
      return code.replaceAll(
        `datadog_api_client.${majorLower}.`,
        `datadog_api_client.${majorLower}_${compact}.`,
      );
    case "java":
      return code.replaceAll(
        `com.datadog.api.client.${majorLower}.`,
        `com.datadog.api.client.${majorLower}_${compact}.`,
      );
    case "ruby":
    case "ruby-legacy":
      return code.replaceAll(
        `DatadogAPIClient::${majorUpper}`,
        `DatadogAPIClient::${majorUpper}_${compact}`,
      );
    case "typescript":
    case "javascript":
      return code.replace(
        new RegExp(`\\b${majorLower}\\b`, "g"),
        `${majorLower}_${compact}`,
      );
    case "rust":
      return code.replaceAll(
        `datadog${majorUpper}`,
        `datadog${majorUpper}_${compact}`,
      );
    default:
      return code;
  }
}
