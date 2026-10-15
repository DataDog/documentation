import { test, expect, type Page } from "@playwright/test";

// Link styles from `src/styles/global.css`, checked on the typography showcase
// page. As in Hugo, links are body-text colored, turn brand-colored on hover,
// and have a muted underline drawn below the descenders.
const TYPOGRAPHY_URL = "/dd_e2e/integration/typography/";

test.describe("prose links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TYPOGRAPHY_URL);
  });

  test("use the body text color", async ({ page }) => {
    const link = page.locator(".prose p a", { hasText: "standard link" });

    await expect(link).toHaveCSS(
      "color",
      await tokenColor(page, "--color-text"),
    );
  });

  test("have a thin, muted underline below the descenders", async ({
    page,
  }) => {
    const link = page.locator(".prose p a", { hasText: "standard link" });

    await expect(link).toHaveCSS("text-decoration-line", "underline");
    await expect(link).toHaveCSS("text-decoration-thickness", "1px");
    await expect(link).toHaveCSS("text-underline-position", "under");
    // --space-2xs (0.125rem) at the 18px root size.
    await expect(link).toHaveCSS("text-underline-offset", "2.25px");
    await expect(link).toHaveCSS(
      "text-decoration-color",
      await tokenColor(page, "--color-text-muted"),
    );
  });

  test("turn the brand color on hover", async ({ page }) => {
    const link = page.locator(".prose p a", { hasText: "standard link" });
    const brand = await tokenColor(page, "--color-brand");

    await link.hover();

    await expect(link).toHaveCSS("color", brand);
    await expect(link).toHaveCSS("text-decoration-color", brand);
  });
});

/** Resolves a color token to the browser's computed `rgb(...)` string. */
async function tokenColor(page: Page, tokenName: string): Promise<string> {
  return page.evaluate((name) => {
    const probe = document.createElement("div");
    probe.style.color = `var(${name})`;
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  }, tokenName);
}
