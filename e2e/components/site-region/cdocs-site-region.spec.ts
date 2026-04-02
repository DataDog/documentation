import { test, expect } from '@playwright/test';

const PAGE_URL = '/dd_e2e/cdocs/components/site_region/';
const CONTENT_AREA = '#mainContent';

async function hideOverlays(page: import('@playwright/test').Page) {
  await page.addStyleTag({
    content: `
      .conv-search-float-btn { display: none !important; }
      body > header { display: none !important; }
      .announcement-banner { display: none !important; }
    `,
  });
}

test.describe('Cdocs site region component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForSelector(CONTENT_AREA);
    await hideOverlays(page);
  });

  test('page renders as expected', async ({ page }) => {
    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'site-region-initial.png'
    );
  });

  test('selecting a different site updates visible content', async ({ page }) => {
    await expect(page.locator('[data-region="us"]')).not.toHaveClass(/d-none/);

    await page.click('.js-region-select .btn');
    await page.click('.js-region-select .dropdown-item[data-value="eu"]');

    await expect(page.locator('[data-region="eu"]')).not.toHaveClass(/d-none/);
    await expect(page.locator('[data-region="us"]')).toHaveClass(/d-none/);

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'site-region-eu-selected.png'
    );

    await page.click('.js-region-select .btn');
    await page.click('.js-region-select .dropdown-item[data-value="us"]');
  });
});
