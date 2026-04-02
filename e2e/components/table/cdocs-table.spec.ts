import { test, expect } from '@playwright/test';
import { hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/cdocs/components/table/';
const CONTENT_AREA = '#mainContent';


test.describe('Cdocs table component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForSelector(CONTENT_AREA);
    await hideOverlays(page);
  });

  test('page renders as expected', async ({ page }) => {
    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'table-initial.png'
    );
  });
});
