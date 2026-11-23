import { test, expect, type Page } from "@playwright/test";

const PAGE_WITH_CONTENT = "/dd_e2e/components/footer/";

/** The footer islands are `client:visible`, so they need to be scrolled to. */
async function hydrateFooter(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForFunction(
    () => document.querySelectorAll("footer astro-island[ssr]").length === 0,
  );
}

test.describe("Footer — Hugo-identical dimensions and behavior", () => {
  test("uses the Hugo dark-purple footer background", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const footer = page.locator("footer");
    const bg = await footer.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    // #110617 as rgb.
    expect(bg).toBe("rgb(17, 6, 23)");
  });

  test("renders all four nav sections at ≥1200px", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    await expect(page.locator(".footer-section--product")).toBeVisible();
    await expect(page.locator(".footer-section--resources")).toBeVisible();
    await expect(page.locator(".footer-section--about")).toBeVisible();
    await expect(page.locator(".footer-section--blog")).toBeVisible();
  });

  test("shows every product panel expanded at desktop, headers inert", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await hydrateFooter(page);

    // Upstream disables the headers above the breakpoint (`:disabled="!mobile"`),
    // because the panels are permanently open there.
    const productHeader = page.locator(
      ".footer-section--product .footer__section-header",
    );
    await expect(productHeader).toBeDisabled();
    await expect(productHeader).toHaveAttribute("aria-expanded", "true");

    const firstCategoryPanel = page.locator(".footer__category-panel").first();
    await expect(firstCategoryPanel).toBeVisible();

    // Upstream splits the two states: the panel is visible above the breakpoint
    // (`isVisible` = `!mobile || ...`) but the header is never marked open
    // (`isOpen` = `mobile && ...`). Conflating them paints every heading in the
    // accent color at desktop, where Hugo renders them white.
    await expect(productHeader).not.toHaveClass(/footer__section-header--open/);
    await expect(page.locator(".footer__section-header--open")).toHaveCount(0);
    await expect(page.locator(".footer__category-header--open")).toHaveCount(0);
  });

  test("category headings and their inline icons render", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const icons = page.locator(".footer__category-icon svg");
    expect(await icons.count()).toBeGreaterThan(0);

    // Product > Observability > Infrastructure — the nesting the sync added.
    const observability = page.locator(
      '[data-footer-category="observability"]',
    );
    await expect(observability).toContainText("Observability");
    await expect(
      observability.locator(".footer__subcategory-label", {
        hasText: "Infrastructure",
      }),
    ).toBeVisible();
  });

  test("mobile accordion keeps only one section open at a time", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await hydrateFooter(page);

    const productHeader = page.locator(
      ".footer-section--product .footer__section-header",
    );
    const resourcesHeader = page.locator(
      ".footer-section--resources .footer__section-header",
    );
    const productPanel = page.locator("#footer-section-product");
    const resourcesPanel = page.locator("#footer-section-resources");

    // Everything starts closed, matching upstream's `openSection: ''`.
    await expect(productPanel).toBeHidden();
    await expect(resourcesPanel).toBeHidden();

    await productHeader.click();
    await expect(productHeader).toHaveAttribute("aria-expanded", "true");
    await expect(productPanel).toBeVisible();

    await resourcesHeader.click();
    await expect(resourcesPanel).toBeVisible();
    await expect(productPanel).toBeHidden();
    await expect(productHeader).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile product categories open one at a time inside the section", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await hydrateFooter(page);

    await page
      .locator(".footer-section--product .footer__section-header")
      .click();

    const categories = page.locator("[data-footer-category]");
    const first = categories.nth(0);
    const second = categories.nth(1);
    const firstPanel = first.locator(".footer__category-panel");
    const secondPanel = second.locator(".footer__category-panel");

    await expect(firstPanel).toBeHidden();

    await first.locator(".footer__category-header").click();
    await expect(firstPanel).toBeVisible();

    await second.locator(".footer__category-header").click();
    await expect(secondPanel).toBeVisible();
    await expect(firstPanel).toBeHidden();
  });

  test("collapsing the product section also closes its open category", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await hydrateFooter(page);

    const sectionHeader = page.locator(
      ".footer-section--product .footer__section-header",
    );
    await sectionHeader.click();

    const category = page.locator("[data-footer-category]").first();
    await category.locator(".footer__category-header").click();
    await expect(category.locator(".footer__category-panel")).toBeVisible();

    await sectionHeader.click();
    await sectionHeader.click();

    await expect(category.locator(".footer__category-panel")).toBeHidden();
  });

  test("language selector opens on click and shows the current language", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await hydrateFooter(page);

    const selector = page.locator(".footer__lang-toggle");
    const button = selector.locator("button").first();
    const popup = selector.locator('[role="listbox"]');

    await expect(button).toHaveAttribute("aria-expanded", "false");
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(popup).toBeVisible();
    await expect(popup).toContainText("English");
  });

  test("renders the Datadog logo row instead of a free-trial CTA", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    await expect(page.locator("footer img.footer__logo")).toBeVisible();
    await expect(page.locator("footer")).toContainText("Download mobile app");
    await expect(
      page.locator('footer [data-trigger="free-trial"]'),
    ).toHaveCount(0);
  });

  test("social links use SVG icons, not icon-font glyphs", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    // Four social links (Twitter, Instagram, Youtube, LinkedIn) with aria-labels.
    const twitter = page.locator('a[aria-label="Twitter link"]');
    await expect(twitter).toBeVisible();
    // The inner element is a <span class="social-icon"> containing an <svg>.
    await expect(twitter.locator("svg")).toHaveCount(1);

    // No <i class="icon-..."> icon-font glyphs anywhere in the footer.
    const footer = page.locator("footer");
    await expect(footer.locator('i[class*="icon-"]')).toHaveCount(0);
  });

  test("Instagram icon inherits the footer text color (not the default black fill)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    // Instagram's SVG has no explicit fill, so it must inherit currentColor
    // (white) from the footer — otherwise it renders black and is invisible.
    const instagramSvg = page.locator(
      'a[aria-label="Instagram link"] .social-icon svg',
    );
    const fill = await instagramSvg.evaluate((el) => getComputedStyle(el).fill);
    expect(fill).toBe("rgb(255, 255, 255)");
  });

  test("Youtube icon is sized up to match Hugo (compensating for its padded viewBox)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const youtubeIcon = page.locator(
      'a[aria-label="Youtube link"] .social-icon--youtube-tetra',
    );
    const fontSize = await youtubeIcon.evaluate(
      (el) => getComputedStyle(el).fontSize,
    );
    expect(fontSize).toBe("30px");
  });

  test("copyright contains the current year", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const year = new Date().getFullYear().toString();
    await expect(page.locator("footer")).toContainText(`© Datadog ${year}`);
  });
});
