import { describe, it, expect } from "vitest";
import {
  findShapeCoverageGaps,
  formatShapeCoverageGaps,
} from "./shapeCoverage";

const BUCKETS: Record<string, string> = {
  "method:get": "operation-method",
  "op:x-hidden": "no-render-effect",
  "tag-desc:table": "page-snapshot",
};

function gapsOf(
  shapeSamples: Array<{ label: string; shapes: string[] }>,
  casedClassIds: string[],
) {
  return findShapeCoverageGaps(
    shapeSamples.map(({ label, shapes }) => ({
      label,
      shapes: new Set(shapes),
    })),
    {
      bucketOf: (shape) => BUCKETS[shape],
      classIds: ["operation-method"],
      casedClassIds,
    },
  );
}

describe("findShapeCoverageGaps", () => {
  it("reports nothing when every shape is mapped and every class has a case", () => {
    const gaps = gapsOf(
      [
        { label: "v2 GetA", shapes: ["method:get", "op:x-hidden"] },
        { label: "v2 tags", shapes: ["tag-desc:table"] },
      ],
      ["operation-method"],
    );
    expect(gaps).toEqual({ unmappedShapes: [], caselessClasses: [] });
  });

  it("reports an unmapped shape with up to three sample operations", () => {
    const gaps = gapsOf(
      ["GetA", "GetB", "GetC", "GetD"].map((operationId) => ({
        label: `v2 ${operationId}`,
        shapes: ["method:get", "res:new-shape"],
      })),
      ["operation-method"],
    );
    expect(gaps.unmappedShapes).toEqual([
      {
        shape: "res:new-shape",
        operationCount: 4,
        sampleLabels: ["v2 GetA", "v2 GetB", "v2 GetC"],
      },
    ]);
  });

  it("reports a class with no case, but not the NO_RENDER_EFFECT or PAGE_SNAPSHOT buckets", () => {
    const gaps = gapsOf(
      [{ label: "v2 GetA", shapes: ["method:get", "op:x-hidden"] }],
      [],
    );
    expect(gaps.caselessClasses).toEqual(["operation-method"]);
  });
});

describe("formatShapeCoverageGaps", () => {
  it("returns undefined when there are no gaps", () => {
    expect(
      formatShapeCoverageGaps({ unmappedShapes: [], caselessClasses: [] }),
    ).toBeUndefined();
  });

  it("lists each gap with its samples", () => {
    const message = formatShapeCoverageGaps({
      unmappedShapes: [
        {
          shape: "res:new-shape",
          operationCount: 4,
          sampleLabels: ["v2 GetA", "v2 GetB", "v2 GetC"],
        },
      ],
      caselessClasses: ["operation-method"],
    });
    expect(message).toContain(
      "res:new-shape (4 operations, e.g. v2 GetA, v2 GetB, v2 GetC)",
    );
    expect(message).toContain("operation-method");
  });
});
