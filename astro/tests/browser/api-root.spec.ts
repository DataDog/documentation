import { test, expect } from "@playwright/test";

// `/api/` renders the `/api/latest/` landing page in place (no redirect stub,
// which would break cross-document view transitions from Hugo), then swaps
// the address bar to the canonical URL.
test.describe("API root", () => {
  test("serves the landing page at /api/ and moves the address bar to /api/latest/", async ({
    page,
  }) => {
    const response = await page.goto("/api/?q=1#client-libraries");
    expect(response?.status()).toBe(200);
    expect(response?.request().redirectedFrom()).toBeNull();
    expect(response?.url()).toMatch(/\/api\/\?q=1$/);
    await expect(page.locator(".prose h1").first()).toBeVisible();
    await expect(page).toHaveURL(/\/api\/latest\/\?q=1#client-libraries$/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/api\/latest\/$/,
    );
  });

  test("does the same for a translated root", async ({ page }) => {
    const response = await page.goto("/fr/api/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/fr\/api\/latest\/$/);
  });

  test("leaves the address bar alone on /api/latest/", async ({ page }) => {
    await page.goto("/api/latest/");
    expect(
      await page.evaluate(
        () => performance.getEntriesByType("navigation").length,
      ),
    ).toBe(1);
    await expect(page).toHaveURL(/\/api\/latest\/$/);
  });
});
