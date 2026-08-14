import { test, expect } from '@playwright/test';

// A non-filterable page (no `content_filters` frontmatter) still lives in
// content/en and must be served by the same SSR catch-all route as cdocs.
// It renders its content but shows no filter bar.
const STATIC_URL = '/dd_e2e/components/alert/';
const CDOC_URL = '/dd_e2e/cdocs/custom_instrumentation/';

test.describe('non-filterable content page (SSR)', () => {
  test('renders content and shows no filter bar', async ({ page }) => {
    const response = await page.goto(STATIC_URL);
    expect(response?.status()).toBe(200);

    await expect(page.locator('.cdoc__content')).toContainText(
      'A static alert banner',
    );
    // No filters in frontmatter -> no filter bar rendered.
    await expect(page.locator('.cdocs-filter-bar')).toHaveCount(0);
  });

  test('a filterable page still renders its filter bar (regression)', async ({
    page,
  }) => {
    await page.goto(CDOC_URL);
    await expect(page.locator('.cdocs-filter-bar')).toHaveCount(1);
  });
});
