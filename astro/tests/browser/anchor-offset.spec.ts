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

// The toolbar's height follows its content: the breadcrumb title wraps more
// as the window narrows, so the narrowest desktop width gets its own case.
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "narrow desktop", width: 992, height: 800 },
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

      // A click fires pointerdown, which stops StickyBarHeight's re-align,
      // so the new jump has to start it again.
      test(`clicking an in-page link to the ${anchor.name} lands just below the sticky toolbar`, async ({
        page,
      }) => {
        await page.goto(anchor.path);
        await clickInPageLink(page, anchor.id);

        await expect
          .poll(() => stickyCoverAtTopEdge(page, anchor.id))
          .toBeNull();
        await expect
          .poll(() => gapBelowToolbar(page, anchor.id))
          .toBeLessThanOrEqual(MAX_GAP_PX);
      });

      // The browser jumps again but fires no hashchange. Only a case where the
      // toolbar grows during the jump (mobile scopes) depends on the click
      // starting the re-align; the other cases pass without it.
      test(`clicking a link to the ${anchor.name} already in the URL lands just below the sticky toolbar`, async ({
        page,
      }) => {
        await page.goto(`${anchor.path}#${anchor.id}`);
        await expect
          .poll(() => stickyCoverAtTopEdge(page, anchor.id))
          .toBeNull();

        // Back to the top, so the jump starts from there. `scrollTo` is
        // instant: an animated wheel scroll would keep running after the
        // click and pull the page back up. The key press is reader input,
        // which stops the re-align, so only the click can start it again.
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.keyboard.press("Shift");

        await clickInPageLink(page, anchor.id);

        await expect
          .poll(() => stickyCoverAtTopEdge(page, anchor.id))
          .toBeNull();
        await expect
          .poll(() => gapBelowToolbar(page, anchor.id))
          .toBeLessThanOrEqual(MAX_GAP_PX);
      });
    }
  });
}

/** Adds a link to the target at the top of the page content and clicks it,
 * with real pointer events, as a reader would. */
async function clickInPageLink(page: Page, id: string) {
  await page.evaluate((targetId) => {
    const link = document.createElement("a");
    link.id = "test-in-page-link";
    link.href = `#${targetId}`;
    link.textContent = "Jump";
    document.querySelector(".prose")!.prepend(link);
  }, id);
  await page.click("#test-in-page-link");
}

test.describe("Overview page headings", () => {
  test("link to their own anchor", async ({ page }) => {
    await page.goto("/api/latest/rate-limits/");

    const link = page.locator("#increase-your-rate-limit > a");
    await expect(link).toHaveAttribute("href", "#increase-your-rate-limit");
  });
});
