/**
 * Optional `x-displayName` labels from the OpenAPI spec.
 *
 * Labels replace the visible category and operation names only. Slugs, URLs,
 * anchors, operation IDs, and scope links keep deriving from the canonical
 * `tags[].name` and `summary`, so the spec itself is never rewritten.
 *
 * Lookups are keyed by canonical slugs, the same keys that group v1 and v2
 * variants into one logical operation, so an override in either version
 * labels both. Later specs in `API_VERSIONS` win when versions disagree.
 */

import type { OpenAPIV3 } from "openapi-types";
import { API_VERSIONS, getOpenApiDocument } from "./specParser";
import { toCategorySlug, toOperationSlug } from "./categorySlug";

export interface DisplayNames {
  categoryNamesBySlug: Map<string, string>;
  /** Keyed by `<categorySlug>:<operationSlug>`. */
  operationSummariesByKey: Map<string, string>;
}

const HTTP_METHODS = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
] as const;

let _displayNames: DisplayNames | null = null;

/** Memoized display labels across every API version's spec. */
export function getDisplayNames(): DisplayNames {
  if (_displayNames) return _displayNames;
  _displayNames = collectDisplayNames(
    API_VERSIONS.map((version) => getOpenApiDocument(version)),
  );
  return _displayNames;
}

export function collectDisplayNames(specs: OpenAPIV3.Document[]): DisplayNames {
  const categoryNamesBySlug = new Map<string, string>();
  const operationSummariesByKey = new Map<string, string>();

  for (const spec of specs) {
    for (const tag of spec.tags ?? []) {
      const label = readDisplayName(tag);
      if (label) categoryNamesBySlug.set(toCategorySlug(tag.name), label);
    }
    for (const operation of collectOperationsFromSpec(spec)) {
      const label = readDisplayName(operation);
      const primaryTag = operation.tags?.[0];
      if (!label || !primaryTag) continue;
      operationSummariesByKey.set(
        toOperationKey(primaryTag, operation.summary ?? ""),
        label,
      );
    }
  }

  return { categoryNamesBySlug, operationSummariesByKey };
}

/** Builds the `operationSummariesByKey` key from canonical spec values. */
export function toOperationKey(primaryTag: string, summary: string): string {
  return `${toCategorySlug(primaryTag)}:${toOperationSlug(summary)}`;
}

/** Translation first, then the display label, then the raw spec value. */
export function resolveLabel(
  translated: string | undefined,
  displayName: string | undefined,
  canonical: string,
): string {
  return translated ?? displayName ?? canonical;
}

/**
 * SDK example captions in `CodeExamples.json` embed the canonical summary
 * (e.g. `Create a case returns "CREATED" response`).
 */
export function relabelCaption(
  caption: string,
  canonicalSummary: string,
  displayName: string | undefined,
): string {
  if (!displayName || !canonicalSummary) return caption;
  return caption.replaceAll(canonicalSummary, displayName);
}

function readDisplayName(source: object): string | undefined {
  const label = (source as { "x-displayName"?: unknown })["x-displayName"];
  return typeof label === "string" && label.trim() !== "" ? label : undefined;
}

function collectOperationsFromSpec(
  spec: OpenAPIV3.Document,
): OpenAPIV3.OperationObject[] {
  const operations: OpenAPIV3.OperationObject[] = [];
  for (const pathItem of Object.values(spec.paths ?? {})) {
    if (!pathItem) continue;
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (operation) operations.push(operation);
    }
  }
  return operations;
}
