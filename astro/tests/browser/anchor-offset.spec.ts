import { test, expect, type Page } from "@playwright/test";

// An anchor jump must land its target just below the fixed header and the
// sticky API toolbar: not under them, and not far below them either (which is
// what happens when two offsets stack).
const MAX_GAP_PX = 40;

/** What the browser paints at the target's top edge, if that is part of a
 * fixed or sticky element (the header, the toolbar, or any later addition).
 * Returns null when the top edge is uncovered. Checks paint order rather than
 * positions, and works for zero-height targets like the scopes anchors. */
function stickyCoverAtTopEdge(page: Page, id: string): Promise<string | null> {
  return page.evaluate((targetId) => {
    const target = document.getElementById(targetId);
    if (!target) return `no element #${targetId}`;
    const rect = target.getBoundingClientRect();
    const topmost = document.elementFromPoint(
      rect.left + rect.width / 2,
      rect.top + 1,
    );
    if (!topmost) return "top edge is outside the viewport";
    for (let el: Element | null = topmost; el; el = el.parentElement) {
      const position = getComputedStyle(el).position;
      if (position === "fixed" || position === "sticky") {
        return `${el.tagName.toLowerCase()}.${[...el.classList].join(".")}`;
      }
    }
    return null;
  }, id);
}

/** Distance from the bottom of the sticky toolbar to the top of the target. */
function gapBelowToolbar(page: Page, id: string): Promise<number> {
  return page.evaluate((targetId) => {
    const target = document.getElementById(targetId);
    const toolbar = document.querySelector(".api-toolbar");
    if (!target || !toolbar) return Number.NaN;
    return (
      target.getBoundingClientRect().top -
      toolbar.getBoundingClientRect().bottom
    );
  }, id);
}

// Endpoint version panels are not listed: they sit at the top of the page,
// below the title and version pills, so the page has nothing to scroll.
const ANCHORS = [
  {
    name: "overview heading",
    path: "/api/latest/rate-limits/",
    id: "increase-your-rate-limit",
  },
  {
    name: "scopes table anchor",
    path: "/api/latest/scopes/",
    id: "dashboards",
  },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
];

for (const viewport of VIEWPORTS) {
  test.describe(`Anchor offset (${viewport.name})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const anchor of ANCHORS) {
      test(`${anchor.name} lands just below the sticky toolbar`, async ({
        page,
      }) => {
        await page.goto(`${anchor.path}#${anchor.id}`, {
          waitUntil: "domcontentloaded",
        });

        // Nothing sticky is painted over the target...
        await expect
          .poll(() => stickyCoverAtTopEdge(page, anchor.id))
          .toBeNull();
        // ...and it isn't pushed far below the toolbar either, which a
        // coverage check alone can't see.
        await expect
          .poll(() => gapBelowToolbar(page, anchor.id))
          .toBeLessThanOrEqual(MAX_GAP_PX);
      });
    }
  });
}

test.describe("Overview page headings", () => {
  test("link to their own anchor", async ({ page }) => {
    await page.goto("/api/latest/rate-limits/");

    const link = page.locator("#increase-your-rate-limit > a");
    await expect(link).toHaveAttribute("href", "#increase-your-rate-limit");
  });
});
