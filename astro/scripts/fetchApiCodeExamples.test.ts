import { describe, it, expect } from "vitest";
import {
  applyBetaExtensionRename,
  describeBestEffortFallback,
  parseCommandLineArguments,
  resolveNestedRustPath,
  resolveSdkRef,
  stagedRelativePathFor,
  stripHugoApiContentPrefix,
} from "./fetchApiCodeExamples.ts";

describe("resolveNestedRustPath", () => {
  it("splits a flat name on its first two underscores", () => {
    expect(
      resolveNestedRustPath("v1_aws-integration_CreateAWSAccount.rs"),
    ).toBe("v1/aws-integration/CreateAWSAccount.rs");
  });

  it("leaves a trailing suffix underscore intact", () => {
    // The whole reason for splitting twice rather than replacing globally.
    expect(
      resolveNestedRustPath(
        "v1_usage-metering_GetUsageNetworkHosts_1249907835.rs",
      ),
    ).toBe("v1/usage-metering/GetUsageNetworkHosts_1249907835.rs");
  });

  it("handles v2 the same way", () => {
    expect(resolveNestedRustPath("v2_incidents_CreateIncident.rs")).toBe(
      "v2/incidents/CreateIncident.rs",
    );
  });

  it("rejects a name with fewer than two underscores", () => {
    expect(resolveNestedRustPath("main.rs")).toBeNull();
    expect(resolveNestedRustPath("v1_CreateIncident.rs")).toBeNull();
  });

  it("rejects a name that does not start with a version segment", () => {
    expect(resolveNestedRustPath("datadog_api_helpers.rs")).toBeNull();
  });
});

describe("applyBetaExtensionRename", () => {
  it("renames .py so fresh output lands beside the legacy files", () => {
    expect(applyBetaExtensionRename("MuteMonitor.py")).toBe(
      "MuteMonitor.pybeta",
    );
  });

  it("renames .rb the same way", () => {
    expect(applyBetaExtensionRename("MuteMonitor.rb")).toBe(
      "MuteMonitor.rbbeta",
    );
  });

  it("leaves every other extension alone", () => {
    expect(applyBetaExtensionRename("MuteMonitor.go")).toBe("MuteMonitor.go");
    expect(applyBetaExtensionRename("MuteMonitor.ts")).toBe("MuteMonitor.ts");
    expect(applyBetaExtensionRename("MuteMonitor.rs")).toBe("MuteMonitor.rs");
  });

  it("is idempotent, so a second pass cannot produce .pybetabeta", () => {
    expect(applyBetaExtensionRename("MuteMonitor.pybeta")).toBe(
      "MuteMonitor.pybeta",
    );
    expect(applyBetaExtensionRename("MuteMonitor.rbbeta")).toBe(
      "MuteMonitor.rbbeta",
    );
  });

  it("keeps a suffixed filename's underscore", () => {
    expect(applyBetaExtensionRename("GetUsageHosts_1249907835.py")).toBe(
      "GetUsageHosts_1249907835.pybeta",
    );
  });
});

describe("stagedRelativePathFor", () => {
  it("passes a nested example through, renaming beta extensions", () => {
    expect(stagedRelativePathFor("v1/monitors/MuteMonitor.py")).toBe(
      "v1/monitors/MuteMonitor.pybeta",
    );
    expect(stagedRelativePathFor("v2/incidents/CreateIncident.go")).toBe(
      "v2/incidents/CreateIncident.go",
    );
  });

  it("nests a flat top-level Rust example", () => {
    expect(
      stagedRelativePathFor("v1_aws-integration_CreateAWSAccount.rs"),
    ).toBe("v1/aws-integration/CreateAWSAccount.rs");
  });

  it("excludes examples/datadog/, which go and python both ship", () => {
    expect(stagedRelativePathFor("datadog/main.go")).toBeNull();
  });

  it("excludes examples/tsconfig.json, which typescript ships", () => {
    expect(stagedRelativePathFor("tsconfig.json")).toBeNull();
  });

  it("excludes a directory that merely starts with the letter v", () => {
    // The Makefile's copy scope is `examples/v*`, but only v1 and v2 are real
    // API versions, and the loader's key space has room for nothing else.
    expect(stagedRelativePathFor("vendor/thing.go")).toBeNull();
  });
});

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

describe("stripHugoApiContentPrefix", () => {
  it("turns a git index path into a staged relative path", () => {
    expect(
      stripHugoApiContentPrefix("content/en/api/v1/monitors/MuteMonitor.py"),
    ).toBe("v1/monitors/MuteMonitor.py");
  });

  it("does not rename the legacy extensions", () => {
    // These are the 148 files whose whole purpose is to be reachable at the
    // legacy extension. Renaming them to .pybeta would shadow SDK output.
    expect(
      stripHugoApiContentPrefix(
        "content/en/api/v1/slack-integration/GetSlackIntegration.rb",
      ),
    ).toBe("v1/slack-integration/GetSlackIntegration.rb");
  });

  it("rejects a path outside the API content tree", () => {
    expect(stripHugoApiContentPrefix("content/en/agent/basic_agent.py")).toBe(
      null,
    );
    expect(stripHugoApiContentPrefix("v1/monitors/MuteMonitor.py")).toBeNull();
  });
});

describe("parseCommandLineArguments", () => {
  it("defaults to the network pins, no forced refetch, and a fatal failure", () => {
    expect(parseCommandLineArguments([])).toEqual({
      pinsPath: null,
      force: false,
      bestEffort: false,
    });
  });

  it("accepts --pins as a separate argument", () => {
    expect(parseCommandLineArguments(["--pins", "/tmp/pins.json"])).toEqual({
      pinsPath: "/tmp/pins.json",
      force: false,
      bestEffort: false,
    });
  });

  it("accepts --pins=<path>", () => {
    expect(parseCommandLineArguments(["--pins=/tmp/pins.json"])).toEqual({
      pinsPath: "/tmp/pins.json",
      force: false,
      bestEffort: false,
    });
  });

  it("accepts --force", () => {
    expect(parseCommandLineArguments(["--force"])).toEqual({
      pinsPath: null,
      force: true,
      bestEffort: false,
    });
  });

  it("accepts --best-effort", () => {
    expect(parseCommandLineArguments(["--best-effort"])).toEqual({
      pinsPath: null,
      force: false,
      bestEffort: true,
    });
  });

  it("combines flags", () => {
    expect(
      parseCommandLineArguments(["--best-effort", "--pins=/tmp/p.json"]),
    ).toEqual({
      pinsPath: "/tmp/p.json",
      force: false,
      bestEffort: true,
    });
  });

  it("rejects --pins with no value, rather than silently going to network", () => {
    expect(() => parseCommandLineArguments(["--pins"])).toThrow(/--pins/);
  });

  it("rejects an unknown flag by name", () => {
    expect(() => parseCommandLineArguments(["--pinz", "x"])).toThrow(/--pinz/);
  });
});

describe("describeBestEffortFallback", () => {
  it("names the branch whose tree is being reused when one is stamped", () => {
    const message = describeBestEffortFallback({
      docsBranch: "someone/other-branch",
      refs: {},
      exampleFileCount: 13396,
      legacyFileCount: 148,
    });
    expect(message).toContain("someone/other-branch");
    expect(message).toContain("13544");
  });

  it("warns that examples will be missing when no tree is staged", () => {
    // The offline-on-a-fresh-clone case. Saying "stale" here would be a lie:
    // there is nothing to fall back to, and every API page loses its SDK tabs.
    const message = describeBestEffortFallback(null);
    expect(message).toMatch(/without SDK code examples/i);
    expect(message).not.toMatch(/stale/i);
  });
});
