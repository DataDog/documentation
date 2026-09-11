import { describe, it, expect } from "vitest";
import { describeBestEffortFallback } from "./stamp.ts";

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
