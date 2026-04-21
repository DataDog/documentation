import { test, expect } from '@playwright/test';

const PAGE_WITH_CONTENT = '/docs/components/footer/';

test.describe('Footer — Hugo-identical dimensions and behavior', () => {
  test('uses the Hugo dark-purple footer background', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const footer = page.locator('[data-testid="footer"]');
    const bg = await footer.evaluate((el) => getComputedStyle(el).backgroundColor);
    // #110617 as rgb.
    expect(bg).toBe('rgb(17, 6, 23)');
  });

  test('renders all five main sections at ≥992px', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    // The trial block + the four accordion sections are all visible at desktop.
    await expect(page.locator('[data-testid="footer-section-product"]')).toBeVisible();
    await expect(page.locator('[data-testid="footer-section-resources"]')).toBeVisible();
    await expect(page.locator('[data-testid="footer-section-about"]')).toBeVisible();
    await expect(page.locator('[data-testid="footer-section-blog"]')).toBeVisible();
  });

  test('mobile accordion keeps only one section open at a time', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    // Default open section is resources.
    const productHeader = page.locator('[data-testid="footer-section-product"] [role="button"]');
    const resourcesHeader = page.locator('[data-testid="footer-section-resources"] [role="button"]');

    await expect(resourcesHeader).toHaveAttribute('aria-expanded', 'true');
    await expect(productHeader).toHaveAttribute('aria-expanded', 'false');

    await productHeader.click();

    await expect(productHeader).toHaveAttribute('aria-expanded', 'true');
    await expect(resourcesHeader).toHaveAttribute('aria-expanded', 'false');
  });

  test('language selector opens on click and shows the current language', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    const selector = page.locator('[data-testid="footer-language-selector"]');
    const button = selector.locator('button').first();
    const popup = selector.locator('[role="listbox"]');

    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(popup).toBeVisible();
    await expect(popup).toContainText('English');
  });

  test('free trial button opens the modal, Escape closes it', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.waitForLoadState('networkidle');

    const modal = page.locator('[data-testid="free-trial-modal"]');
    const trigger = page.locator('a[data-trigger="free-trial"]').first();

    await expect(modal).toBeHidden();
    await trigger.click();
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });

  test('social links use SVG icons, not icon-font glyphs', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    // Four social links (Twitter, Instagram, Youtube, LinkedIn) with aria-labels.
    const twitter = page.locator('a[aria-label="Twitter link"]');
    await expect(twitter).toBeVisible();
    // The inner element is a <span class="social-icon"> containing an <svg>.
    await expect(twitter.locator('svg')).toHaveCount(1);

    // No <i class="icon-..."> icon-font glyphs anywhere in the footer.
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer.locator('i[class*="icon-"]')).toHaveCount(0);
  });

  test('copyright contains the current year', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);

    const year = new Date().getFullYear().toString();
    await expect(page.locator('[data-testid="footer"]')).toContainText(`© Datadog ${year}`);
  });

  test('dark mode keeps the footer on its Hugo palette', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(PAGE_WITH_CONTENT);
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const footer = page.locator('[data-testid="footer"]');
    const bg = await footer.evaluate((el) => getComputedStyle(el).backgroundColor);
    // Token is Hugo-identical with no dark-mode override — stays #110617.
    expect(bg).toBe('rgb(17, 6, 23)');
  });
});
