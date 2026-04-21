import { test, expect } from '@playwright/test';

const PAGE_WITH_CONTENT = '/docs/components/header/';

test.describe('Header — Hugo-identical dimensions and behavior', () => {
  test('banner is 30px tall, fixed, and spans the viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const banner = page.locator('[data-testid="announcement-banner"]');
    const box = await banner.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(30);
    expect(Math.round(box!.y)).toBe(0);
    expect(Math.round(box!.width)).toBe(1400);
  });

  test('header is 130px tall at ≥992px', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const header = page.locator('[data-testid="header"] .main-nav');
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(130);
    expect(Math.round(box!.y)).toBe(30);
  });

  test('header is 60px tall below the 992px breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const header = page.locator('[data-testid="header"] .main-nav');
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
      Math.round((await page.locator('[data-testid="header"] .main-nav').boundingBox())!.height);

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
      Math.round((await page.locator('[data-testid="header"] .main-nav').boundingBox())!.height);

    expect(await headerHeight()).toBe(60);
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(60);
    expect(await headerHeight()).toBe(60);
  });

  test('hover over Product opens the mega-menu and switches category after 160ms', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    const trigger = page.locator('[data-testid="nav-dropdown-product"] a.dropdown').first();
    await trigger.hover();

    const megaMenu = page.locator('[data-testid="product-mega-menu"]');
    await expect(megaMenu).toBeVisible();

    // Observability is the default.
    const obs = page.locator('[data-testid="product-category-detail-observability"]');
    await expect(obs).toBeVisible();

    // Hover a different category and wait for the 160ms debounce.
    await page.locator('[data-testid="product-category-toggle-security"]').hover();
    await page.waitForTimeout(250);
    const security = page.locator('[data-testid="product-category-detail-security"]');
    await expect(security).toBeVisible();
    await expect(obs).toBeHidden();
  });

  test('hover over Solutions reveals industry/technology/use-case columns', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    const trigger = page.locator('[data-testid="nav-dropdown-solutions"] a.dropdown').first();
    await trigger.hover();

    const menu = page.locator('[data-testid="nav-dropdown-menu-solutions"]');
    await expect(menu).toBeVisible();
    // "Industry", "Technology", and "Use-case" are i18n labels for the three
    // top-level columns of the solutions dropdown. Match the column <p> headers
    // specifically, since the same words appear in link labels underneath.
    await expect(menu.getByRole('paragraph').filter({ hasText: 'Industry' })).toBeVisible();
    await expect(menu.getByRole('paragraph').filter({ hasText: 'Technology' })).toBeVisible();
    await expect(menu.getByRole('paragraph').filter({ hasText: 'Use-case' })).toBeVisible();
  });

  test('hamburger opens the mobile overlay at 500px', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    const toggle = page.locator('[data-testid="mobile-nav-toggle"]');
    await toggle.click();

    const overlay = page.locator('[data-testid="mobile-nav"]');
    const bg = page.locator('[data-testid="mobile-nav-bg"]');
    await expect(overlay).toBeVisible();
    await expect(bg).toBeVisible();
  });

  test('dark mode preserves the Hugo-colored header and banner', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const banner = page.locator('[data-testid="announcement-banner"]');

    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    const lightBg = await banner.evaluate((el) => getComputedStyle(el).backgroundColor);

    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    const darkBg = await banner.evaluate((el) => getComputedStyle(el).backgroundColor);

    // Banner is tokenized with Hugo-identical values that do not swap in dark
    // mode, so both backgrounds should match.
    expect(darkBg).toBe(lightBg);
  });
});
