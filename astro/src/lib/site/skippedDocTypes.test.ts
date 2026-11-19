import { afterEach, describe, expect, it, vi } from "vitest";
import {
  docTypeStaticPaths,
  isDocTypeSkipped,
  skippedDocTypes,
} from "./skippedDocTypes";

const getStaticPaths = () => [{ params: { lang: undefined } }];

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("skippedDocTypes", () => {
  it("skips nothing by default, so production builds can't omit docs", () => {
    vi.stubEnv("SKIP_DOC_TYPES", "");
    expect(skippedDocTypes()).toEqual([]);
    expect(isDocTypeSkipped("api")).toBe(false);
  });

  it("reads a comma-separated list, ignoring spaces", () => {
    vi.stubEnv("SKIP_DOC_TYPES", " api , ");
    expect(skippedDocTypes()).toEqual(["api"]);
    expect(isDocTypeSkipped("api")).toBe(true);
  });

  it("rejects an unknown doc type, so a typo can't build everything", () => {
    vi.stubEnv("SKIP_DOC_TYPES", "apis");
    expect(() => skippedDocTypes()).toThrow(/apis/);
  });
});

describe("docTypeStaticPaths", () => {
  it("passes the route's paths through by default", async () => {
    vi.stubEnv("SKIP_DOC_TYPES", "");
    expect(await docTypeStaticPaths("api", getStaticPaths)()).toEqual(
      getStaticPaths(),
    );
  });

  it("emits no paths when the route's doc type is skipped", async () => {
    vi.stubEnv("SKIP_DOC_TYPES", "api");
    expect(await docTypeStaticPaths("api", getStaticPaths)()).toEqual([]);
  });
});
