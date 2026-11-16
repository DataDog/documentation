/**
 * Checks the scopes page data against the full live spec, picked up by
 * `vitest.integration.config.ts` so `@api-spec` resolves to the real bundle.
 */

import { describe, expect, it } from "vitest";
import { getScopeGroupsView } from "@lib/api/scopesBuilder";
import { getCategoriesView, getOperationView } from "@lib/api/viewsBuilder";

describe("scopesBuilder against the full spec", () => {
  it("has an anchor for every endpoint page's scopes link", async () => {
    const anchors = new Set(
      getScopeGroupsView().flatMap((group) => group.anchors),
    );
    const missingAnchorLinks: string[] = [];
    for (const category of await getCategoriesView()) {
      for (const operation of category.operations) {
        const view = await getOperationView(category.slug, operation.slug);
        for (const variant of view?.variants ?? []) {
          const anchor = variant.oauthScopesAnchor;
          if (anchor && !anchors.has(anchor)) {
            missingAnchorLinks.push(
              `${category.slug}/${operation.slug} → #${anchor}`,
            );
          }
        }
      }
    }
    expect(missingAnchorLinks).toEqual([]);
  });

  it("emits each anchor exactly once", () => {
    const anchors = getScopeGroupsView().flatMap((group) => group.anchors);
    expect(anchors.length).toBeGreaterThan(0);
    expect(new Set(anchors).size).toBe(anchors.length);
  });
});
