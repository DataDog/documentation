/**
 * The real `hugo/data/changelog/` files must parse and validate.
 *
 * This lives in `tests/integration/` because the unit config redirects
 * `@hugo-site/data/changelog` to a fixture. Unknown products and operation
 * IDs are allowed by design, so they're not asserted on.
 */
import { describe, expect, it } from "vitest";
import { loadRawChangelogFiles, normalizeChangelog } from "@lib/api/changelog";

describe("hugo/data/changelog", () => {
  it("reads real data, not the unit-test fixture", () => {
    expect(Object.keys(loadRawChangelogFiles())).not.toEqual([
      "ai-impact",
      "dashboards",
      "incidents",
    ]);
  });

  it("parses and validates every file, with at least one entry", () => {
    expect(normalizeChangelog(loadRawChangelogFiles()).length).toBeGreaterThan(
      0,
    );
  });
});
