import { describe, it, expect } from "vitest";
import { resolveSdkRef } from "./sdkRefs.ts";

describe("resolveSdkRef", () => {
  const pinnedTag = "v2.65.0";

  it("uses the pinned tag on master without asking about branches", async () => {
    let asked = false;
    const ref = await resolveSdkRef({
      repo: "datadog-api-client-go",
      pinnedTag,
      docsBranch: "master",
      sdkBranchExists: async () => {
        asked = true;
        return true;
      },
    });
    expect(ref).toBe(pinnedTag);
    expect(asked).toBe(false);
  });

  it("prefers a same-named SDK branch when one exists", async () => {
    const ref = await resolveSdkRef({
      repo: "datadog-api-client-go",
      pinnedTag,
      docsBranch: "someone/coordinated-change",
      sdkBranchExists: async () => true,
    });
    expect(ref).toBe("someone/coordinated-change");
  });

  it("falls back to the pinned tag when no such branch exists", async () => {
    const ref = await resolveSdkRef({
      repo: "datadog-api-client-go",
      pinnedTag,
      docsBranch: "someone/ordinary-docs-fix",
      sdkBranchExists: async () => false,
    });
    expect(ref).toBe(pinnedTag);
  });

  it("asks about the branch it was given, in the repo it was given", async () => {
    const asked: Array<[string, string]> = [];
    await resolveSdkRef({
      repo: "datadog-api-client-rust",
      pinnedTag: "0.36.0",
      docsBranch: "someone/thing",
      sdkBranchExists: async (repo, branch) => {
        asked.push([repo, branch]);
        return false;
      },
    });
    expect(asked).toEqual([["datadog-api-client-rust", "someone/thing"]]);
  });
});
