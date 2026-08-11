import { test, expect } from "@playwright/test";

test.describe("CollapseContent component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/collapse-content");
  });

  test("hydrates its Preact controller", async ({ page }) => {
    const section = page.locator(".collapse-content").first();
    await expect(section).toHaveAttribute("data-hydrated", "true");
  });

  test("renders and is collapsed by default", async ({ page }) => {
    const section = page.locator(".collapse-content").first();
    await expect(section).toBeVisible();
    await expect(section).not.toHaveAttribute("open", "");
    await expect(section.locator(".collapse-content__body")).toBeHidden();
  });

  test("clicking the header reveals and hides the body", async ({ page }) => {
    const section = page.locator(".collapse-content").first();
    const body = section.locator(".collapse-content__body");

    await section.locator(".collapse-content__header").click();
    await expect(body).toBeVisible();

    await section.locator(".collapse-content__header").click();
    await expect(body).toBeHidden();
  });

  test("an expanded section starts open", async ({ page }) => {
    const section = page.locator(".collapse-content--expanded");
    await expect(section).toHaveAttribute("open", "");
    await expect(section.locator(".collapse-content__body")).toBeVisible();
  });

  test("syncs aria-expanded on toggle", async ({ page }) => {
    const section = page.locator(".collapse-content").first();
    const header = section.locator(".collapse-content__header");

    await expect(header).toHaveAttribute("aria-expanded", "false");
    await header.click();
    await expect(header).toHaveAttribute("aria-expanded", "true");
  });

  test("opens the section whose id matches the URL hash", async ({ page }) => {
    await page.goto(
      "/dd_e2e/components/collapse-content#deep-linkable",
    );
    const section = page.locator("#deep-linkable");
    await expect(section).toHaveAttribute("open", "");
    await expect(section.locator(".collapse-content__body")).toBeVisible();
  });
});
