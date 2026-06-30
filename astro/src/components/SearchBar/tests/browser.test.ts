import { test, expect } from '@playwright/test';

test.describe('SearchBar component — visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/test_pages/components/search-bar');
  });

  // Scope to the standalone demo bar inside `.prose`; the header's mobile-nav
  // SearchBar is also `.search-bar` but lives outside the page content.
  test('closed state matches screenshot', async ({ page }) => {
    const bar = page.locator('.prose .search-bar').first();
    await expect(bar).toBeVisible();
    await expect(bar).toHaveScreenshot('search-bar-closed.png');
  });

  test('focused but empty state does not show the popup', async ({ page }) => {
    const bar = page.locator('.prose .search-bar').first();
    const input = bar.locator('.search-bar__input');
    await input.click();
    await expect(bar.locator('.search-bar__popup')).toHaveCount(0);
  });

  test('renders the side-nav placement on API pages', async ({ page }) => {
    await page.goto('/api/latest/');
    const sidenavSearch = page.locator('.api-side-nav__search .search-bar').first();
    await expect(sidenavSearch).toBeVisible();
  });
});

test.describe('SearchBar component — mobile-nav placement', () => {
  // The mobile nav only renders below 992px; the desktop default viewport hides
  // it. A real browser is needed here because the search bar lives behind the
  // hamburger toggle and the overlay's slide-in transition.
  test.use({ viewport: { width: 480, height: 800 } });

  test('the mobile nav exposes a functional search bar when opened', async ({ page }) => {
    await page.goto('/docs/test_pages/components/header');

    // The search bar is inside the closed (off-screen) overlay until opened.
    const mobileSearch = page.locator('.mobile-nav__search .search-bar').first();
    const input = mobileSearch.locator('.search-bar__input');

    // Wait for the toggle island to hydrate so the click can't race its handler.
    await page.locator('.navbar-toggler[data-hydrated="true"]').click();
    await expect(page.locator('#mobile-nav.mobile-nav__panel--open')).toBeVisible();

    await expect(mobileSearch).toBeVisible();
    await input.click();
    await expect(input).toBeFocused();
    // Empty query shows no popup (mirrors the side-nav behavior).
    await expect(page.locator('.search-bar__popup')).toHaveCount(0);
  });
});
