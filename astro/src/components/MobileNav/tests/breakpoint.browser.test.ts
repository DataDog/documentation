import { test, expect } from "@playwright/test";

// The mobile nav only renders below the 992px breakpoint.
test.use({ viewport: { width: 390, height: 800 } });

const PAGE_URL = "/api/latest/action-connection/";

test.describe("Mobile nav across the 992px breakpoint", () => {
  test("closes when the viewport widens past the breakpoint, so the page is not left grayed out", async ({
    page,
  }) => {
    await page.goto(PAGE_URL);

    const hamburger = page.locator(
      '.mobile-nav__hamburger[data-hydrated="true"]',
    );
    await hamburger.click();
    const backdrop = page.locator("#mobile-nav-bg");
    await expect(backdrop).toHaveClass(/mobile-nav__backdrop--open/);
    await expect(backdrop).toBeVisible();

    await page.setViewportSize({ width: 1200, height: 800 });

    await expect(backdrop).not.toHaveClass(/mobile-nav__backdrop--open/);
    await expect(backdrop).toBeHidden();
    await expect(page.locator("#mobile-nav")).not.toHaveClass(
      /mobile-nav__panel--open/,
    );
    expect(
      await page.evaluate(() => document.documentElement.style.overflow),
    ).toBe("");

    // Narrowing again shows the closed state, not a nav that reopened itself.
    await page.setViewportSize({ width: 390, height: 800 });
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");
    await expect(backdrop).toBeHidden();
  });
});
