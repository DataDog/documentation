/**
 * Invariants the type column depends on, checked against the full live spec.
 *
 * `displayType` reports a schema's `format` in place of its `type`, matching
 * Hugo's `format || type`. That is only lossless while every format implies
 * exactly one base type — `int64` means integer, `date-time` means string.
 * OpenAPI defines the built-in formats that way, but a vendor format added to
 * the spec later could break it, at which point the type column would start
 * hiding information. This file fails loudly if that happens.
 *
 * Picked up by `vitest.integration.config.ts`, which omits the frozen-fixture
 * plugin so `@hugo-site/data/api` resolves to the real Hugo data directory.
 */

import { describe, it, expect } from "vitest";
import { API_VERSIONS, getOpenApiDocument } from "@lib/api/specParser";

/** Walk every schema object in a spec, guarding against shared/cyclic nodes. */
function eachSchema(root: unknown, visit: (node: Record<string, unknown>) => void) {
  const seen = new Set<unknown>();
  const walk = (node: unknown, depth: number) => {
    if (!node || typeof node !== "object" || depth > 14 || seen.has(node)) return;
    seen.add(node);
    if (!Array.isArray(node)) visit(node as Record<string, unknown>);
    for (const value of Object.values(node)) walk(value, depth + 1);
  };
  walk(root, 0);
}

describe("type column invariants across the full spec", () => {
  it("every format implies exactly one base type", () => {
    const byFormat = new Map<string, Set<string>>();

    for (const version of API_VERSIONS) {
      const spec = getOpenApiDocument(version) as unknown as Record<string, unknown>;
      eachSchema((spec.components as Record<string, unknown>)?.schemas, (node) => {
        if (typeof node.format !== "string") return;
        const base = typeof node.type === "string" ? node.type : "(no type)";
        const types = byFormat.get(node.format) ?? new Set<string>();
        types.add(base);
        byFormat.set(node.format, types);
      });
    }

    // Sanity check that the walk found the formats we know are in the spec,
    // so an empty result can't pass this test silently.
    expect(byFormat.has("int64")).toBe(true);
    expect(byFormat.has("date-time")).toBe(true);

    const ambiguous = [...byFormat.entries()]
      .filter(([, types]) => types.size > 1)
      .map(([format, types]) => `${format} → ${[...types].sort().join(", ")}`);

    expect(
      ambiguous,
      "displayType reports `format` instead of `type`, which assumes each " +
        "format has one base type. These formats now appear with several, so " +
        "the type column would hide the base type. Either qualify these in " +
        "`displayType` or align the spec.",
    ).toEqual([]);
  });

  it("no schema carries a format without a type", () => {
    const orphans: string[] = [];

    for (const version of API_VERSIONS) {
      const spec = getOpenApiDocument(version) as unknown as Record<string, unknown>;
      eachSchema((spec.components as Record<string, unknown>)?.schemas, (node) => {
        if (typeof node.format === "string" && typeof node.type !== "string") {
          orphans.push(`${version}: format "${node.format}" with no type`);
        }
      });
    }

    // A format with no type would render as the format alone with nothing to
    // fall back to, so the base type has to come from somewhere.
    expect(orphans).toEqual([]);
  });
});
