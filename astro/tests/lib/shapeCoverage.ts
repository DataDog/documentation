/**
 * Finds the gaps between the shapes a spec shows and the shape snapshot cases.
 *
 * A gap is a shape that nothing in `shapeClasses.ts` maps, or a rendering
 * class with no case in `shapeCases.ts`. The full-spec coverage check prints
 * these as a warning, so an upstream spec change never fails the build.
 */

import {
  NO_RENDER_EFFECT,
  PAGE_SNAPSHOT,
} from "../fixtures/api-shapes/shapeClasses";

/** Shapes found in one place in the spec, such as an operation or the tag list. */
export interface ShapeSample {
  /** How the warning names this sample, such as `v2 GetDowntime`. */
  label: string;
  shapes: Set<string>;
}

export interface UnmappedShape {
  shape: string;
  operationCount: number;
  sampleLabels: string[];
}

export interface ShapeCoverageGaps {
  unmappedShapes: UnmappedShape[];
  caselessClasses: string[];
}

export interface ShapeCoverageSources {
  /** The bucket a shape maps to, or `undefined` when nothing maps it. */
  bucketOf: (shape: string) => string | undefined;
  /** Every rendering class, including any no live shape maps to. */
  classIds: Iterable<string>;
  casedClassIds: Iterable<string>;
}

const SAMPLES_PER_SHAPE = 3;
const BUCKETS_WITHOUT_CASES = new Set<string>([
  NO_RENDER_EFFECT,
  PAGE_SNAPSHOT,
]);

export function findShapeCoverageGaps(
  shapeSamples: ShapeSample[],
  sources: ShapeCoverageSources,
): ShapeCoverageGaps {
  return {
    unmappedShapes: findUnmappedShapes(shapeSamples, sources.bucketOf),
    caselessClasses: findCaselessClasses(sources),
  };
}

/** The warning text for `gaps`, or `undefined` when there are none. */
export function formatShapeCoverageGaps(
  gaps: ShapeCoverageGaps,
): string | undefined {
  const lines: string[] = [];
  if (gaps.unmappedShapes.length > 0) {
    lines.push("Spec shapes with no entry in shapeClasses.ts:");
    for (const { shape, operationCount, sampleLabels } of gaps.unmappedShapes) {
      lines.push(
        `  ${shape} (${operationCount} operations, e.g. ${sampleLabels.join(", ")})`,
      );
    }
  }
  if (gaps.caselessClasses.length > 0) {
    lines.push("Rendering classes with no case in shapeCases.ts:");
    for (const classId of gaps.caselessClasses) lines.push(`  ${classId}`);
  }
  return lines.length > 0 ? lines.join("\n") : undefined;
}

function findUnmappedShapes(
  shapeSamples: ShapeSample[],
  bucketOf: ShapeCoverageSources["bucketOf"],
): UnmappedShape[] {
  const unmappedByShape = new Map<string, UnmappedShape>();
  for (const { label, shapes } of shapeSamples) {
    for (const shape of shapes) {
      if (bucketOf(shape) !== undefined) continue;
      const unmapped = unmappedByShape.get(shape) ?? {
        shape,
        operationCount: 0,
        sampleLabels: [],
      };
      unmapped.operationCount++;
      if (unmapped.sampleLabels.length < SAMPLES_PER_SHAPE)
        unmapped.sampleLabels.push(label);
      unmappedByShape.set(shape, unmapped);
    }
  }
  return [...unmappedByShape.values()].sort((a, b) =>
    a.shape.localeCompare(b.shape),
  );
}

function findCaselessClasses(sources: ShapeCoverageSources): string[] {
  const casedClassIds = new Set(sources.casedClassIds);
  return [...new Set(sources.classIds)]
    .filter(
      (classId) =>
        !BUCKETS_WITHOUT_CASES.has(classId) && !casedClassIds.has(classId),
    )
    .sort();
}
