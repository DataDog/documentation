import { test, expect } from "@playwright/test";

/**
 * GTM is resolved server-side (unlike Telemetry, which gates client-side), so
 * the assertions here are about whether the markup exists at all, not about
 * runtime behavior of a script that already loaded.
 */

const PAGE = "/api/latest/authentication/";

test.describe("GoogleTagManager", () => {
  test("does not render the GTM script in development", async ({ page }) => {
    await page.goto(PAGE);
    const scripts = await page
      .locator("script")
      .evaluateAll((elements) =>
        elements.map((element) => element.textContent ?? ""),
      );
    expect(scripts.some((text) => text.includes("googletagmanager.com"))).toBe(
      false,
    );
  });

  test("does not render the <noscript> fallback in development", async ({
    page,
  }) => {
    await page.goto(PAGE);
    const html = await page.content();
    expect(html).not.toContain("googletagmanager.com/ns.html");
  });
});
