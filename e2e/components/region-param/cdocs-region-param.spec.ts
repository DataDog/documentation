import { test, expect } from '@playwright/test';
import { hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/cdocs/components/region_param/';
const CONTENT_AREA = '#mainContent';


test.describe('Cdocs region param component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForSelector(CONTENT_AREA);
    await hideOverlays(page);
  });

  test('page renders as expected', async ({ page }) => {
    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'region-param-initial.png'
    );
  });

  test('selecting a different site updates region params', async ({ page }) => {
    await expect(page.locator('span.js-region-param[data-region-param="dd_site"]')).toHaveText('datadoghq.com');

    await page.click('.js-region-select .btn');
    await page.click('.js-region-select .dropdown-item[data-value="eu"]');

    await expect(page.locator('span.js-region-param[data-region-param="dd_site"]')).toHaveText('datadoghq.eu');

    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'region-param-eu-selected.png'
    );

    await page.click('.js-region-select .btn');
    await page.click('.js-region-select .dropdown-item[data-value="us"]');
  });
});
