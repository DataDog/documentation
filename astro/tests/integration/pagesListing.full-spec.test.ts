/**
 * Coverage validation against the full live spec.
 *
 * Unlike the frozen-fixture unit tests, this builds pages.json from the real
 * pageSources against the actual Hugo API data (this file is picked up by
 * vitest.integration.config.ts, which omits the frozen-fixture plugin). It
 * confirms every category and operation the live spec exports is represented.
 */

import { describe, it, expect } from "vitest";
import { buildPagesListing } from "@lib/pagesListing/buildPagesListing";
import { pageSources } from "@lib/pagesListing/pageSources";
import { PagesListingSchema } from "@lib/pagesListing/schema";
import { getCategoriesView } from "@lib/api/viewsBuilder";

const SITE = "https://docs.datadoghq.com";

describe("pages.json coverage against full spec", () => {
  it("emits landing + specials + one entry per category and per operation", { timeout: 60_000 }, async () => {
    const listing = await buildPagesListing(pageSources, SITE);
    expect(() => PagesListingSchema.parse(listing)).not.toThrow();

    const keys = new Set(Object.keys(listing));
    const categories = await getCategoriesView("en");

    // Fixed pages.
    for (const path of [
      "/api/latest.md",
      "/api/latest/using-the-api.md",
      "/api/latest/scopes.md",
      "/api/latest/rate-limits.md",
    ]) {
      expect(keys.has(`${SITE}${path}`), `missing ${path}`).toBe(true);
    }

    // Every category and operation.
    let expectedOps = 0;
    for (const cat of categories) {
      expect(
        keys.has(`${SITE}/api/latest/${cat.slug}.md`),
        `missing category ${cat.slug}`,
      ).toBe(true);
      for (const op of cat.operations) {
        expectedOps++;
        expect(
          keys.has(`${SITE}/api/latest/${cat.slug}/${op.slug}.md`),
          `missing operation ${cat.slug}/${op.slug}`,
        ).toBe(true);
      }
    }

    // Total count == fixed(4) + categories + operations.
    expect(keys.size).toBe(4 + categories.length + expectedOps);
    expect(expectedOps).toBeGreaterThan(100);
  });

  it("gives every entry a 32-char mdocHash and source 'astro'", { timeout: 60_000 }, async () => {
    const listing = await buildPagesListing(pageSources, SITE);
    for (const entry of Object.values(listing)) {
      expect(entry.mdocHash).toHaveLength(32);
      expect(entry.source).toBe("astro");
    }
  });
});
