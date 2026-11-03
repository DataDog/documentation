/**
 * `LEGACY_REDIRECTS` checked against the pages the live spec actually builds.
 *
 * This lives in `tests/integration/` because a category rename in the spec is
 * what breaks a redirect, and the unit config redirects `@api-spec` to a frozen
 * fixture that never changes.
 */
import { describe, expect, it } from "vitest";
import { LEGACY_REDIRECTS } from "@lib/api/legacyRedirects";
import { getCategoriesView } from "@lib/api/viewsBuilder";

async function builtPagePaths(): Promise<Set<string>> {
  const categories = await getCategoriesView();
  const paths = new Set(["/api/latest/"]);
  for (const category of categories) {
    paths.add(`/api/latest/${category.slug}/`);
    for (const operation of category.operations) {
      paths.add(`/api/latest/${category.slug}/${operation.slug}/`);
    }
  }
  return paths;
}

function withTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

describe("LEGACY_REDIRECTS against the live spec", () => {
  it("points every redirect at a page the site builds", async () => {
    const paths = await builtPagePaths();
    for (const { from, to } of LEGACY_REDIRECTS) {
      expect(paths, `${from} redirects to unbuilt page ${to}`).toContain(to);
    }
  });

  it("never redirects away from a page the site builds", async () => {
    const paths = await builtPagePaths();
    for (const { from } of LEGACY_REDIRECTS) {
      expect(paths, `${from} shadows a built page`).not.toContain(
        withTrailingSlash(from),
      );
    }
  });
});
