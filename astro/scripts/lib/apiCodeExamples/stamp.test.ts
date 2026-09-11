import { describe, it, expect } from "vitest";
import { describeBestEffortFallback, parseStamp } from "./stamp.ts";

const WHOLE_STAMP = {
  docsBranch: "someone/other-branch",
  refs: { "datadog-api-client-go": "v2.45.0" },
  exampleFileCount: 13396,
  legacyFileCount: 148,
};

describe("parseStamp", () => {
  it("returns the stamp when every field is present", () => {
    expect(parseStamp(JSON.stringify(WHOLE_STAMP))).toEqual(WHOLE_STAMP);
  });

  it("returns null for a stamp missing a field", () => {
    // What a developer who staged a tree under an older StageStamp has on
    // disk. Reported as "no tree" rather than described with undefined counts.
    const { legacyFileCount: _dropped, ...older } = WHOLE_STAMP;
    expect(parseStamp(JSON.stringify(older))).toBeNull();
  });

  it("returns null for a stamp whose field has the wrong type", () => {
    expect(
      parseStamp(JSON.stringify({ ...WHOLE_STAMP, exampleFileCount: "13396" })),
    ).toBeNull();
  });

  it("returns null for text that is not JSON", () => {
    expect(parseStamp("{ truncated mid-writ")).toBeNull();
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
