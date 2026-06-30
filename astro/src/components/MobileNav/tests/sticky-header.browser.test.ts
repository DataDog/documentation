import { test, expect } from '@playwright/test';

// The mobile nav only renders below the 992px breakpoint, and a short viewport
// guarantees the menu list overflows so there is something to scroll.
test.use({ viewport: { width: 390, height: 600 } });

const PAGE_URL = '/api/latest/action-connection/';

test.describe('Mobile nav sticky header', () => {
  test('keeps the quick-links and search pinned while the menu scrolls', async ({
    page,
  }) => {
    await page.goto(PAGE_URL);

    // Open the overlay via the hamburger in the mobile header row. Wait for the
    // island to hydrate so the click can't race its handler.
    const hamburger = page.locator('.mobile-nav__hamburger[data-hydrated="true"]');
    await hamburger.click();
    const panel = page.locator('#mobile-nav.mobile-nav__panel--open');
    await expect(panel).toBeVisible();

    const header = page.locator('.mobile-nav__header');
    await expect(header).toHaveCSS('position', 'sticky');

    // Record the header's position, then scroll the panel and confirm it hasn't
    // moved (i.e. it stuck to the top instead of scrolling away).
    const before = await header.boundingBox();
    await panel.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
    const after = await header.boundingBox();

    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    expect(after!.y).toBeCloseTo(before!.y, 0);

    // The search input is still visible after scrolling to the bottom.
    await expect(header.locator('.search-bar__input')).toBeVisible();
  });
});
