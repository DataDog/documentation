import { describe, it, expect } from "vitest";
import type { OpenAPIV3 } from "openapi-types";
import {
  collectDisplayNames,
  relabelCaption,
  resolveLabel,
} from "./displayNames";

function spec(
  tags: Record<string, unknown>[],
  operations: Record<string, unknown>[],
): OpenAPIV3.Document {
  const paths: Record<string, Record<string, unknown>> = {};
  operations.forEach((operation, index) => {
    paths[`/path-${index}`] = { get: operation };
  });
  return {
    openapi: "3.0.0",
    info: { title: "test", version: "1" },
    tags,
    paths,
  } as unknown as OpenAPIV3.Document;
}

describe("collectDisplayNames", () => {
  it("keys category labels by canonical category slug", () => {
    const names = collectDisplayNames([
      spec(
        [{ name: "Case Management", "x-displayName": "Work Management" }],
        [],
      ),
    ]);
    expect(names.categoryNamesBySlug.get("case-management")).toBe(
      "Work Management",
    );
  });

  it("keys operation labels by canonical category and operation slugs", () => {
    const names = collectDisplayNames([
      spec(
        [],
        [
          {
            operationId: "CreateCase",
            summary: "Create a case",
            tags: ["Case Management"],
            "x-displayName": "Create a work item",
          },
        ],
      ),
    ]);
    expect(
      names.operationSummariesByKey.get("case-management:create-a-case"),
    ).toBe("Create a work item");
  });

  it("applies an override from one version to the shared logical operation", () => {
    const v1 = spec(
      [],
      [
        {
          operationId: "ListThings",
          summary: "List things",
          tags: ["Things"],
          "x-displayName": "List widgets",
        },
      ],
    );
    const v2 = spec(
      [],
      [{ operationId: "ListThings", summary: "List things", tags: ["Things"] }],
    );
    const names = collectDisplayNames([v1, v2]);
    expect(names.operationSummariesByKey.get("things:list-things")).toBe(
      "List widgets",
    );
  });

  it("lets later specs win when versions disagree", () => {
    const operation = (label: string) => ({
      operationId: "ListThings",
      summary: "List things",
      tags: ["Things"],
      "x-displayName": label,
    });
    const names = collectDisplayNames([
      spec(
        [{ name: "Things", "x-displayName": "Old" }],
        [operation("v1 label")],
      ),
      spec(
        [{ name: "Things", "x-displayName": "New" }],
        [operation("v2 label")],
      ),
    ]);
    expect(names.categoryNamesBySlug.get("things")).toBe("New");
    expect(names.operationSummariesByKey.get("things:list-things")).toBe(
      "v2 label",
    );
  });

  it("ignores blank and non-string labels", () => {
    const names = collectDisplayNames([
      spec(
        [
          { name: "Blank", "x-displayName": "   " },
          { name: "Numeric", "x-displayName": 7 },
        ],
        [
          {
            operationId: "Op",
            summary: "Do thing",
            tags: ["Blank"],
            "x-displayName": "",
          },
        ],
      ),
    ]);
    expect(names.categoryNamesBySlug.size).toBe(0);
    expect(names.operationSummariesByKey.size).toBe(0);
  });

  it("does not mutate the specs", () => {
    const source = spec(
      [{ name: "Things", "x-displayName": "Widgets" }],
      [
        {
          operationId: "ListThings",
          summary: "List things",
          tags: ["Things"],
          "x-displayName": "List widgets",
        },
      ],
    );
    const before = JSON.stringify(source);
    collectDisplayNames([source]);
    expect(JSON.stringify(source)).toBe(before);
  });
});

describe("resolveLabel", () => {
  it("prefers a translation over the display label", () => {
    expect(resolveLabel("Traduit", "Display", "Raw")).toBe("Traduit");
  });

  it("falls back to the display label, then the raw spec value", () => {
    expect(resolveLabel(undefined, "Display", "Raw")).toBe("Display");
    expect(resolveLabel(undefined, undefined, "Raw")).toBe("Raw");
  });
});

describe("relabelCaption", () => {
  it("replaces the canonical summary with the display label", () => {
    expect(
      relabelCaption(
        'Create a case returns "CREATED" response',
        "Create a case",
        "Create a work item",
      ),
    ).toBe('Create a work item returns "CREATED" response');
  });

  it("leaves captions unchanged without a display label", () => {
    expect(
      relabelCaption('Create a case returns "OK"', "Create a case", undefined),
    ).toBe('Create a case returns "OK"');
  });
});
