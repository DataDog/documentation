import { test, expect } from '@playwright/test';

const PAGE_WITH_CONTENT = '/docs/components/header/';

test.describe('Header — Hugo-identical dimensions and behavior', () => {
  test('banner is 30px tall, fixed, and spans the viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const banner = page.locator('.announcement-banner');
    const box = await banner.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(30);
    expect(Math.round(box!.y)).toBe(0);
    expect(Math.round(box!.width)).toBe(1400);
  });

  test('header is 130px tall at ≥992px', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const header = page.locator('.main-nav-wrapper .main-nav');
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(130);
    expect(Math.round(box!.y)).toBe(30);
  });

  test('header is 60px tall below the 992px breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const header = page.locator('.main-nav-wrapper .main-nav');
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(60);
    expect(Math.round(box!.y)).toBe(30);
  });

  test('header shrinks with scroll on desktop and clamps at 65px', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/api/latest/authentication/');
    await page.waitForLoadState('networkidle');

    const headerHeight = async () =>
      Math.round((await page.locator('.main-nav-wrapper .main-nav').boundingBox())!.height);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(350);
    expect(await headerHeight()).toBe(130);

    await page.evaluate(() => window.scrollTo(0, 30));
    await page.waitForTimeout(350);
    const mid = await headerHeight();
    // Linear shrink between 130 → 65 means 30px of scroll removes 30px of height.
    // Allow a small tolerance for subpixel rounding.
    expect(mid).toBeGreaterThanOrEqual(95);
    expect(mid).toBeLessThanOrEqual(115);

    await page.evaluate(() => window.scrollTo(0, 70));
    await page.waitForTimeout(350);
    expect(await headerHeight()).toBe(65);

    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(350);
    expect(await headerHeight()).toBe(65);
  });

  test('header does not shrink below the desktop breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto('/api/latest/authentication/');
    await page.waitForLoadState('networkidle');

    const headerHeight = async () =>
      Math.round((await page.locator('.main-nav-wrapper .main-nav').boundingBox())!.height);

    expect(await headerHeight()).toBe(60);
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(60);
    expect(await headerHeight()).toBe(60);
  });

  test('hover over Product opens the mega-menu and switches category after 160ms', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    const trigger = page.locator('.product-dropdown a.dropdown').first();
    await trigger.hover();

    const megaMenu = page.locator('.product-menu');
    await expect(megaMenu).toBeVisible();

    // Observability is the default.
    const obs = page.locator('.product-category--observability');
    await expect(obs).toBeVisible();

    // Hover a different category and wait for the 160ms debounce.
    await page.locator('.category-toggle--security').hover();
    await page.waitForTimeout(250);
    const security = page.locator('.product-category--security');
    await expect(security).toBeVisible();
    await expect(obs).toBeHidden();
  });

  test('hamburger opens the mobile overlay at 500px', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    const toggle = page.locator('.navbar-toggler');
    await toggle.click();

    const overlay = page.locator('#mobile-nav');
    const bg = page.locator('#mobile-nav-bg');
    await expect(overlay).toBeVisible();
    await expect(bg).toBeVisible();
  });
});

test.describe('Header — visual', () => {
  test('desktop default state', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.main-nav-wrapper .main-nav')).toHaveScreenshot('header-desktop.png');
  });

  test('mobile collapsed with hamburger visible', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.navbar-toggler')).toBeVisible();
    await expect(page.locator('.main-nav-wrapper .main-nav')).toHaveScreenshot('header-mobile.png');
  });

  test('mobile nav overlay open', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    await page.locator('.navbar-toggler').click();
    const overlay = page.locator('#mobile-nav');
    await expect(overlay).toBeVisible();

    await expect(page.locator('.main-nav-wrapper .main-nav')).toHaveScreenshot('header-mobile-overlay-open.png');
  });

  test('mega menu open after hovering Product', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    const trigger = page.locator('.product-dropdown a.dropdown').first();
    await trigger.hover();

    const megaMenu = page.locator('.product-menu');
    await expect(megaMenu).toBeVisible();
    // Allow category-switch debounce and any entry animation to settle.
    await page.waitForTimeout(250);

    await expect(page.locator('.main-nav-wrapper .main-nav')).toHaveScreenshot('header-mega-menu-open.png');
  });

  test('scrolled-shrunk header state', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/api/latest/authentication/');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => window.scrollTo(0, 500));
    // Wait for the shrink transition to clamp at 65px.
    await page.waitForTimeout(350);

    await expect(page.locator('.main-nav-wrapper .main-nav')).toHaveScreenshot('header-scrolled-shrunk.png');
  });
});
