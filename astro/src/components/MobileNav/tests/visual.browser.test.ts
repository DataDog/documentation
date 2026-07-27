import { test, expect } from '@playwright/test';

// The mobile nav only renders below the 992px breakpoint.
test.use({ viewport: { width: 390, height: 844 } });

// A category landing page gives a deterministic state: the API category list is
// shown in place of the docs accordion, the active category is expanded and
// highlighted, and its summary carries aria-current — so the inline
// scroll-into-view also runs.
const API_CATEGORY_URL = '/api/latest/action-connection/';

test.describe('Mobile nav — visual', () => {
  test('API category tree overlay open', async ({ page }) => {
    await page.goto(API_CATEGORY_URL);
    await page.waitForLoadState('networkidle');

    // Wait for the toggle island to hydrate so the click can't race its handler.
    await page.locator('.mobile-nav__hamburger[data-hydrated="true"]').click();
    const panel = page.locator('#mobile-nav.mobile-nav__panel--open');
    await expect(panel).toBeVisible();

    // The API list (not the docs accordion) is what we're capturing.
    await expect(page.locator('.mobile-nav__list--api')).toBeVisible();

    await expect(panel).toHaveScreenshot('mobile-nav-api-overlay-open.png', {
      animations: 'disabled',
    });
  });
});
