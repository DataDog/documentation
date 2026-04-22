import { test, expect } from '@playwright/test';

test.describe('Placeholder component — visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/placeholder');
  });

  const variants: Array<{ name: string; slug: string }> = [
    { name: 'HEADER', slug: 'header' },
    { name: 'ANNOUNCEMENT BANNER', slug: 'announcement-banner' },
    { name: 'FOOTER', slug: 'footer' },
  ];

  for (const variant of variants) {
    test(`${variant.name} placeholder matches screenshot`, async ({ page }) => {
      const placeholder = page
        .locator(`[data-placeholder-name="${variant.name}"]`)
        .first();
      await expect(placeholder).toHaveScreenshot(`placeholder-${variant.slug}.png`);
    });
  }
});
