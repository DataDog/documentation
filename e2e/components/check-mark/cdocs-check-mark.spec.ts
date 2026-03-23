import { test, expect } from '@playwright/test';

const PAGE_URL = '/dd_e2e/cdocs/components/check_mark/';
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

test.describe('Cdocs check mark component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForSelector(CONTENT_AREA);
    await hideOverlays(page);
  });

  test('page renders as expected', async ({ page }) => {
    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'check-mark-initial.png'
    );
  });
});
