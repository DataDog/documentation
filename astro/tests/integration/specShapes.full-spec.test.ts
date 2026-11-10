/**
 * Shape snapshot coverage against the full live spec.
 *
 * Runs the shape detector on every live operation and warns, without failing,
 * when a shape has no entry in `shapeClasses.ts` or a rendering class has no
 * case in `shapeCases.ts`. An upstream spec change never breaks the build: the
 * warning is the prompt to map the new shape or add a case.
 *
 * Picked up by `vitest.integration.config.ts`, which omits the frozen-fixture
 * plugin so `@api-spec` resolves to the live spec staged by `yarn fetch:spec`.
 */

import { describe, it, expect } from "vitest";
import { parse as parseYaml } from "yaml";
import V1_SPEC_RAW from "@api-spec/v1/full_spec.yaml?raw";
import V2_SPEC_RAW from "@api-spec/v2/full_spec.yaml?raw";
import type { ApiVersion } from "@lib/api/schemas/version";
import { detectOperationShapes, detectTagShapes } from "../lib/specShapes";
import {
  findShapeCoverageGaps,
  formatShapeCoverageGaps,
  type ShapeSample,
} from "../lib/shapeCoverage";
import {
  SHAPE_CLASS_PATHS,
  shapeBucket,
} from "../fixtures/api-shapes/shapeClasses";
import { SHAPE_CASES } from "../fixtures/api-shapes/shapeCases";

function shapeSamplesOf(raw: string, version: ApiVersion): ShapeSample[] {
  const spec = parseYaml(raw);
  const operationSamples = detectOperationShapes(spec, version).map(
    ({ operationId, shapes }) => ({
      label: `${version} ${operationId}`,
      shapes,
    }),
  );
  return [
    ...operationSamples,
    { label: `${version} tags`, shapes: detectTagShapes(spec) },
  ];
}

describe("shape snapshot coverage across the full spec", () => {
  it("warns about unmapped shapes and classes without a case", () => {
    const shapeSamples = [
      ...shapeSamplesOf(V1_SPEC_RAW, "v1"),
      ...shapeSamplesOf(V2_SPEC_RAW, "v2"),
    ];
    expect(shapeSamples.length).toBeGreaterThan(2);

    const gaps = findShapeCoverageGaps(shapeSamples, {
      bucketOf: shapeBucket,
      classIds: Object.keys(SHAPE_CLASS_PATHS),
      casedClassIds: SHAPE_CASES.map(({ classId }) => classId),
    });
    const warning = formatShapeCoverageGaps(gaps);
    if (warning) console.warn(`Shape snapshot coverage gaps:\n${warning}`);
  });
});
