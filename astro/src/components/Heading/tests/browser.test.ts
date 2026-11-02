import { test, expect, type Page } from "@playwright/test";

// The unit tests cover the markup. These cover how the link looks, which
// depends on the global link styles it has to override.

/** A screenshot area around the heading and its link. The link's border is
 * drawn around the font's full height, which reaches a few pixels below the
 * heading's own box, so a plain locator screenshot would crop off the hover
 * underline. */
async function clipAround(page: Page, id: string) {
  const heading = await page.locator(`#${id}`).boundingBox();
  const link = await page.locator(`#${id} .heading__link`).boundingBox();
  if (!heading || !link) throw new Error(`#${id} or its link is not visible`);
  const pad = 4;
  const top = Math.min(heading.y, link.y) - pad;
  const bottom = Math.max(heading.y + heading.height, link.y + link.height);
  return {
    x: heading.x,
    y: top,
    width: heading.width,
    height: bottom + pad - top,
  };
}

test.describe("Heading component — visual", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/heading");
  });

  for (const level of [2, 3, 4, 5]) {
    test(`h${level} matches screenshot`, async ({ page }) => {
      const id = `heading-level-${level}`;
      await expect(page).toHaveScreenshot(`heading-h${level}.png`, {
        clip: await clipAround(page, id),
      });
    });
  }

  test("h2 matches screenshot on hover", async ({ page }) => {
    const id = "heading-level-2";
    await page.locator(`#${id} .heading__link`).hover();
    await expect(page).toHaveScreenshot("heading-h2-hover.png", {
      clip: await clipAround(page, id),
    });
  });
});
