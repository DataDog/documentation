import { test, expect } from '@playwright/test';

// The mobile nav only renders below the 992px breakpoint; a short viewport
// guarantees the API operation list overflows so scroll-into-view matters.
test.use({ viewport: { width: 390, height: 600 } });

const CATEGORY_URL = '/api/latest/action-connection/';

test.describe('Mobile nav active API page', () => {
  test('highlights the current operation in purple and scrolls it into view', async ({
    page,
  }) => {
    // Discover a real operation deep in the active category. The desktop side
    // nav is display:none at this viewport but still in the DOM, so its
    // operation links are a reliable source of valid hrefs.
    await page.goto(CATEGORY_URL);
    const operationHrefs = await page
      .locator('.api-side-nav__operation')
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute('href')).filter(Boolean),
      );
    expect(operationHrefs.length).toBeGreaterThan(0);
    // The last operation is the furthest down the list — the strongest test of
    // scroll-into-view.
    const targetHref = operationHrefs[operationHrefs.length - 1] as string;

    await page.goto(targetHref);

    // Open the overlay via the hamburger. Wait for the island to hydrate so the
    // click can't race its handler.
    await page.locator('.mobile-nav__hamburger[data-hydrated="true"]').click();
    const panel = page.locator('#mobile-nav.mobile-nav__panel--open');
    await expect(panel).toBeVisible();

    const activeOp = page.locator(
      '.mobile-nav__list--api .mobile-nav__link--active',
    );
    await expect(activeOp).toHaveCount(1);
    await expect(activeOp).toBeVisible();
    await expect(activeOp).toHaveAttribute('aria-current', 'page');

    // The active page is brand-colored (purple), distinct from a non-active
    // operation in the same list.
    const activeColor = await activeOp.evaluate(
      (el) => getComputedStyle(el).color,
    );
    const inactiveColor = await page
      .locator('.mobile-nav__list--api .mobile-nav__link:not(.mobile-nav__link--active)')
      .first()
      .evaluate((el) => getComputedStyle(el).color);
    expect(activeColor).not.toBe(inactiveColor);

    // The active page sits in the upper half of the panel's visible area
    // (near the top, below the sticky header) — not scrolled off-screen.
    const panelBox = await panel.boundingBox();
    const activeBox = await activeOp.boundingBox();
    expect(panelBox).not.toBeNull();
    expect(activeBox).not.toBeNull();
    expect(activeBox!.y).toBeGreaterThanOrEqual(panelBox!.y);
    expect(activeBox!.y).toBeLessThan(panelBox!.y + panelBox!.height / 2);
  });
});
