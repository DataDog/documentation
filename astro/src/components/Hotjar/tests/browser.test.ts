import { test, expect } from "@playwright/test";

/**
 * Hotjar is resolved server-side, so the dev server (development env) should
 * serve no Hotjar markup at all. Per-environment IDs are covered by the unit
 * tests.
 */

const PAGE = "/api/latest/authentication/";

test.describe("Hotjar", () => {
  test("does not render Hotjar markup in development", async ({ page }) => {
    await page.goto(PAGE);
    const html = await page.content();
    expect(html).not.toContain("hotjar");
  });
});
