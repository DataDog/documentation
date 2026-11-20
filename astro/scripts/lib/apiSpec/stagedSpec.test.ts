import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  describeBestEffortFallback,
  missingRequiredFiles,
  parseStamp,
  REQUIRED_SPEC_FILES,
} from "./stagedSpec.ts";

describe("parseStamp", () => {
  it("reads a stamp of the current shape", () => {
    const stamp = { source: "production", etag: '"abc"', fileCount: 25 };
    expect(parseStamp(JSON.stringify(stamp))).toEqual(stamp);
  });

  it("accepts a null etag, which a local --bundle stamp carries", () => {
    const stamp = { source: "/tmp/api.tgz", etag: null, fileCount: 25 };
    expect(parseStamp(JSON.stringify(stamp))).toEqual(stamp);
  });

  it("returns null for malformed JSON", () => {
    expect(parseStamp("{not json")).toBeNull();
  });

  it("returns null for a stamp of an older shape, costing one refetch", () => {
    expect(parseStamp(JSON.stringify({ source: "production" }))).toBeNull();
  });
});

describe("missingRequiredFiles", () => {
  let stagedDir: string;

  beforeEach(async () => {
    stagedDir = await mkdtemp(path.join(tmpdir(), "api-spec-test-"));
  });

  afterEach(async () => {
    await rm(stagedDir, { recursive: true, force: true });
  });

  async function stage(relativePaths: readonly string[]): Promise<void> {
    for (const relative of relativePaths) {
      await mkdir(path.dirname(path.join(stagedDir, relative)), {
        recursive: true,
      });
      await writeFile(path.join(stagedDir, relative), "{}");
    }
  }

  it("is empty when every required file is staged", async () => {
    await stage(REQUIRED_SPEC_FILES);
    expect(await missingRequiredFiles(stagedDir)).toEqual([]);
  });

  it("names each missing file", async () => {
    await stage(
      REQUIRED_SPEC_FILES.filter((file) => file !== "v2/full_spec.yaml"),
    );
    expect(await missingRequiredFiles(stagedDir)).toEqual([
      "v2/full_spec.yaml",
    ]);
  });

  it("covers both spec versions and both CodeExamples.json files", () => {
    expect([...REQUIRED_SPEC_FILES].sort()).toEqual([
      "v1/CodeExamples.json",
      "v1/full_spec.yaml",
      "v2/CodeExamples.json",
      "v2/full_spec.yaml",
    ]);
  });
});

describe("describeBestEffortFallback", () => {
  it("names the source of a surviving tree and calls it possibly stale", () => {
    const message = describeBestEffortFallback({
      source: "production",
      etag: null,
      fileCount: 25,
    });
    expect(message).toMatch(/production/);
    expect(message).toMatch(/stale/);
  });

  it("says plainly that the API docs cannot load when nothing is staged", () => {
    expect(describeBestEffortFallback(null)).toMatch(/No complete api-spec\//);
  });
});
