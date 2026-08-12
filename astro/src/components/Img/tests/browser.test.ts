import { test, expect } from "@playwright/test";

test.describe("Img component — visual", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/img");
  });

  test("basic image matches screenshot", async ({ page }) => {
    const figure = page.locator("main").locator(".img__figure").first();
    await expect(figure).toHaveScreenshot("img-basic.png");
  });

  test("image with caption renders a figcaption", async ({ page }) => {
    const figure = page
      .locator("main")
      .locator(".img__figure")
      .filter({ has: page.locator("figcaption") })
      .first();
    await expect(figure.locator("figcaption")).toBeVisible();
    await expect(figure).toHaveScreenshot("img-caption.png");
  });

  test("popup-disabled image has no link wrapper", async ({ page }) => {
    const figures = page.locator("main").locator(".img__figure");
    const count = await figures.count();

    let found = false;
    for (let i = 0; i < count; i++) {
      const figure = figures.nth(i);
      if ((await figure.locator(".img__link--popup").count()) === 0) {
        await expect(figure.locator("img")).toBeVisible();
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });

  test("inline image renders without a figure wrapper", async ({ page }) => {
    const inlineImg = page.locator("main").locator("p img.img__image").first();
    await expect(inlineImg).toBeVisible();
  });

  test("video renders with controls", async ({ page }) => {
    const video = page.locator("main").locator("video.img__video").first();
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute("controls", "");
  });
});

test.describe("Img component — lightbox", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/img");
    // client:idle hydrates asynchronously; wait for the lightbox's click
    // listener to attach so the trigger click doesn't fall through to a
    // real navigation.
    await page.waitForFunction(() => {
      const island = document.querySelector(
        'astro-island[component-url*="ImgLightbox"]',
      );
      return island?.getAttribute("ssr") === null;
    });
  });

  test("clicking a popup-enabled image opens the lightbox with the full-size image", async ({
    page,
  }) => {
    const trigger = page.locator("main").locator(".img__link--popup").first();
    const expectedSrc = await trigger.getAttribute("data-lightbox-src");

    await trigger.click();

    const overlay = page.locator(".img-lightbox__overlay");
    await expect(overlay).toBeVisible();
    const lightboxImage = overlay.locator("img");
    await expect(lightboxImage).toHaveAttribute("src", expectedSrc ?? "");
  });

  test("Escape closes the lightbox", async ({ page }) => {
    const trigger = page.locator("main").locator(".img__link--popup").first();
    await trigger.click();

    const overlay = page.locator(".img-lightbox__overlay");
    await expect(overlay).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(overlay).toBeHidden();
  });
});
