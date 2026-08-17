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
    // client:idle hydrates asynchronously; wait for every ImgController
    // island's click listener to attach so the trigger click doesn't fall
    // through to a real navigation.
    await page.waitForFunction(() => {
      const islands = document.querySelectorAll(
        'astro-island[component-url*="ImgController"]',
      );
      return (
        islands.length > 0 &&
        Array.from(islands).every((island) => island.getAttribute("ssr") === null)
      );
    });
  });

  test("clicking a popup-enabled image opens the lightbox with a viewport-sized image", async ({
    page,
  }) => {
    const trigger = page.locator("main").locator(".img__link--popup").first();
    const triggerHref = await trigger.getAttribute("href");

    await trigger.click();

    const overlay = page.locator(".img-lightbox__overlay:not([hidden])");
    await expect(overlay).toBeVisible();
    const lightboxImage = overlay.locator("img");
    const lightboxSrc = await lightboxImage.getAttribute("src");

    // The lightbox requests a viewport-sized/DPR-aware variant client-side
    // rather than reusing the trigger's static full-resolution href.
    expect(lightboxSrc?.startsWith(triggerHref?.split("?")[0] ?? "")).toBe(true);
    expect(lightboxSrc).toMatch(/w=\d+/);
    expect(lightboxSrc).toMatch(/h=\d+/);
    expect(lightboxSrc).toMatch(/dpr=\d+/);
  });

  test("Escape closes the lightbox", async ({ page }) => {
    const trigger = page.locator("main").locator(".img__link--popup").first();
    await trigger.click();

    const overlay = page.locator(".img-lightbox__overlay:not([hidden])");
    await expect(overlay).toBeVisible();

    // Without the timeout, the test is flaky under Under heavy parallel load.
    await expect(async () => {
      await page.keyboard.press("Escape");
      await expect(overlay).toBeHidden({ timeout: 500 });
    }).toPass();
  });
});
