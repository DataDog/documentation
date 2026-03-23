import { test, expect } from '@playwright/test';

const PAGE_URL = '/dd_e2e/cdocs/components/site_region/';
const CONTENT_AREA = '#mainContent';

async function hideOverlays(page: import('@playwright/test').Page) {
  await page.addStyleTag({
    content: `
      .conv-search-float-btn { display: none !important; }
      body > header { display: none !important; }
      .announcement-banner { display: none !important; }
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });
}

test.describe('Cdocs site region component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForSelector(CONTENT_AREA);
    await page.evaluate(() =>
      Promise.all([
        document.fonts.ready,
        ...Array.from(document.images, (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((r) => {
                img.onload = img.onerror = r;
              })
        ),
      ])
    );
    await hideOverlays(page);
  });

  test('page renders as expected', async ({ page }) => {
    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'site-region-initial.png'
    );
  });
});
