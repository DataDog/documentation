import { test, expect } from "@playwright/test";

const PAGE_WITH_CONTENT = "/dd_e2e/components/header/";

test.describe("Header — Hugo-identical dimensions and behavior", () => {
  // PAGE_WITH_CONTENT carries no announcement banner, so the header sits at the
  // very top (y:0). The banner-present case — where the header is offset below a
  // 30px banner — is covered in the AnnouncementBanner browser tests.
  test("header is 130px tall at ≥992px and sits at the top with no banner", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const header = page.locator(".header__wrapper .header__nav");
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(130);
    expect(Math.round(box!.y)).toBe(0);
  });

  test("header is 60px tall below the 992px breakpoint and sits at the top with no banner", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const header = page.locator(".header__wrapper .header__nav");
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(60);
    expect(Math.round(box!.y)).toBe(0);
  });

  test("header snaps to 65px after scrolling past the 30px threshold on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto("/api/latest/authentication/");
    await page.waitForLoadState("networkidle");

    const headerHeight = async () =>
      Math.round(
        (await page.locator(".header__wrapper .header__nav").boundingBox())!
          .height,
      );

    // At scroll 0, full height.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(350);
    expect(await headerHeight()).toBe(130);

    // At exactly 30px the threshold is not exceeded (> 30), so still full height.
    await page.evaluate(() => window.scrollTo(0, 30));
    await page.waitForTimeout(350);
    expect(await headerHeight()).toBe(130);

    // Past the threshold, header snaps to the compact height.
    await page.evaluate(() => window.scrollTo(0, 31));
    await page.waitForTimeout(350);
    expect(await headerHeight()).toBe(65);

    // Stays compact on further scroll.
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(350);
    expect(await headerHeight()).toBe(65);
  });

  test("header does not shrink below the desktop breakpoint", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto("/api/latest/authentication/");
    await page.waitForLoadState("networkidle");

    const headerHeight = async () =>
      Math.round(
        (await page.locator(".header__wrapper .header__nav").boundingBox())!
          .height,
      );

    expect(await headerHeight()).toBe(60);
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(60);
    expect(await headerHeight()).toBe(60);
  });

  test("hover over Product opens the mega-menu and switches category after 160ms", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState("networkidle");

    const trigger = page.locator(".product-dropdown a.dropdown").first();
    await trigger.hover();

    const megaMenu = page.locator(".product-menu");
    await expect(megaMenu).toBeVisible();

    // Observability is the default.
    const obs = page.locator(".product-menu__category--observability");
    await expect(obs).toBeVisible();

    // Hover a different category and wait for the 160ms debounce.
    await page.locator(".product-menu__category-toggle--security").hover();
    await page.waitForTimeout(250);
    const security = page.locator(".product-menu__category--security");
    await expect(security).toBeVisible();
    await expect(obs).toBeHidden();
  });

  // The mega-menu shares `.header__dropdown-menu` with the small dropdowns, so
  // that block's link and overflow rules must not leak into it.
  test.describe("mega-menu is not restyled by the shared dropdown rules", () => {
    test.beforeEach(async ({ page }) => {
      // Hugo caps the mega-menu at 80vh too, so pick a height where Hugo's
      // menu fits (80vh = 720px) and only an oversized menu would scroll.
      await page.setViewportSize({ width: 1400, height: 900 });
      await page.goto(PAGE_WITH_CONTENT);
      await page.waitForLoadState("networkidle");
      await page.locator(".product-dropdown a.dropdown").first().hover();
      await expect(page.locator(".product-menu")).toBeVisible();
    });

    test("pricing link is uppercase, bold, and brand purple like Hugo", async ({
      page,
    }) => {
      const pricingLink = page.locator(".product-menu__pricing-link");
      await expect(pricingLink).toHaveCSS("text-transform", "uppercase");
      await expect(pricingLink).toHaveCSS("font-weight", "700");
      await expect(pricingLink).toHaveCSS("color", "rgb(99, 44, 166)");
    });

    // The active category has `height: 100%` plus padding. Without
    // border-box sizing (Bootstrap's default in Hugo), the padding adds to the
    // height and the menu overflows into a scrollbar.
    test("mega-menu fits at a window height where Hugo's does", async ({
      page,
    }) => {
      const megaMenu = page.locator(".product-menu");
      const isScrollable = await megaMenu.evaluate(
        (menu) => menu.scrollHeight > menu.clientHeight,
      );
      expect(isScrollable).toBe(false);
    });
  });

  test("Security category banner is a styled link with a hover state", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState("networkidle");
    await page.locator(".product-dropdown a.dropdown").first().hover();
    await page.locator(".product-menu__category-toggle--security").hover();
    await page.waitForTimeout(250);

    const banner = page.locator(
      "#security-detail .product-menu__category-description--cta",
    );
    await expect(banner).toBeVisible();
    await expect(banner).toHaveAttribute(
      "href",
      "https://www.datadoghq.com/products/security/",
    );
    // `.header__dropdown-menu a` must not restyle the banner.
    await expect(banner).toHaveCSS("display", "flex");
    await expect(banner).toHaveCSS("text-transform", "none");
    await expect(banner).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(banner.locator(".product-menu__category-cta-label")).toHaveCSS(
      "text-transform",
      "uppercase",
    );

    const restingBackground = await banner.evaluate(
      (element) => getComputedStyle(element).backgroundImage,
    );
    await banner.hover();
    await expect(banner).toHaveCSS("outline-color", "rgb(139, 208, 255)");
    await expect(banner).toHaveCSS("color", "rgb(255, 255, 255)");
    const hoverBackground = await banner.evaluate(
      (element) => getComputedStyle(element).backgroundImage,
    );
    expect(hoverBackground).not.toBe(restingBackground);
  });

  test("GET STARTED FREE opens the free trial modal with the signup form", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    // The modal is mounted by the footer, which API pages include.
    await page.goto("/api/latest/authentication/");
    await page.waitForLoadState("networkidle");
    await page.waitForFunction(
      () => document.querySelector(".free-trial-modal__overlay") !== null,
    );

    await page.locator(".header__btn-gradient").click();

    const modal = page.locator(".free-trial-modal__overlay");
    await expect(modal).toBeVisible();
    await expect(modal.locator("iframe")).toHaveAttribute(
      "src",
      "https://app.datadoghq.com/signup_corp?lang=en",
    );
    // The click must not navigate away.
    await expect(page).toHaveURL(/\/api\/latest\/authentication\/$/);
  });

  test("hamburger opens the mobile overlay at 500px", async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState("networkidle");

    const toggle = page.locator(".navbar-toggler");
    await toggle.click();

    const overlay = page.locator("#mobile-nav");
    const bg = page.locator("#mobile-nav-bg");
    await expect(overlay).toBeVisible();
    await expect(bg).toBeVisible();
  });

  test("mobile overlay starts below the header when a banner is showing", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    // This test page always renders a banner, which pushes the header down.
    await page.goto("/dd_e2e/components/announcement-banner/");
    await page.waitForLoadState("networkidle");

    await page.locator(".navbar-toggler").click();

    const overlay = page.locator("#mobile-nav");
    const bg = page.locator("#mobile-nav-bg");
    await expect(overlay).toBeVisible();
    const headerBottom = (await page.locator(".header__nav").boundingBox())!;
    for (const layer of [overlay, bg]) {
      const layerBox = (await layer.boundingBox())!;
      expect(layerBox.y).toBeGreaterThanOrEqual(
        headerBottom.y + headerBottom.height,
      );
    }
  });

  test("mobile nav accordion: all sections collapsed by default, sections toggle independently", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState("networkidle");

    await page.locator(".navbar-toggler").click();

    // Match a top-level section by its own summary label (not a nested one).
    const topSectionByLabel = (label: string) =>
      page
        .locator('.mobile-nav__section[data-level="0"]', {
          has: page.locator(":scope > summary > span", { hasText: label }),
        })
        .first();

    // All sections start collapsed.
    const essentials = topSectionByLabel("Essentials");
    await expect(essentials).not.toHaveAttribute("open", "");

    // Sections open on click and multiple may be open at once (matching Hugo).
    const infrastructure = topSectionByLabel("Infrastructure");
    await expect(infrastructure).not.toHaveAttribute("open", "");
    await infrastructure.locator(".mobile-nav__section-toggle").first().click();
    await expect(infrastructure).toHaveAttribute("open", "");
    await expect(essentials).not.toHaveAttribute("open", "");
  });
});

test.describe("Header — visual", () => {
  test("desktop default state", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState("networkidle");

    await expect(
      page.locator(".header__wrapper .header__nav"),
    ).toHaveScreenshot("header-desktop.png");
  });

  test("mobile collapsed with hamburger visible", async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState("networkidle");

    await expect(page.locator(".navbar-toggler")).toBeVisible();
    await expect(
      page.locator(".header__wrapper .header__nav"),
    ).toHaveScreenshot("header-mobile.png");
  });

  test("mobile nav overlay open", async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState("networkidle");

    await page.locator(".navbar-toggler").click();
    const overlay = page.locator("#mobile-nav");
    await expect(overlay).toBeVisible();

    await expect(
      page.locator(".header__wrapper .header__nav"),
    ).toHaveScreenshot("header-mobile-overlay-open.png");
  });

  test("mega menu open after hovering Product", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState("networkidle");

    const trigger = page.locator(".product-dropdown a.dropdown").first();
    await trigger.hover();

    const megaMenu = page.locator(".product-menu");
    await expect(megaMenu).toBeVisible();
    // Allow category-switch debounce and any entry animation to settle.
    await page.waitForTimeout(250);

    await expect(
      page.locator(".header__wrapper .header__nav"),
    ).toHaveScreenshot("header-mega-menu-open.png");
  });

  test("scrolled-shrunk header state", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/api/latest/authentication/");
    await page.waitForLoadState("networkidle");

    await page.evaluate(() => window.scrollTo(0, 500));
    // Wait for the shrink transition to clamp at 65px.
    await page.waitForTimeout(350);

    await expect(
      page.locator(".header__wrapper .header__nav"),
    ).toHaveScreenshot("header-scrolled-shrunk.png");
  });
});
