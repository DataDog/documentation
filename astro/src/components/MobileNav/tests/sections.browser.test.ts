import { test, expect, type Page } from '@playwright/test';

// The mobile nav only renders below the 992px breakpoint.
test.use({ viewport: { width: 390, height: 844 } });

// Non-API page so the docs accordion (not the API category list) is shown.
const DOCS_PAGE = '/docs/test_pages/components/header';

async function openMobileNav(page: Page) {
  await page.goto(DOCS_PAGE);
  await page.locator('.mobile-nav__hamburger[data-hydrated="true"]').click();
  const panel = page.locator('#mobile-nav.mobile-nav__panel--open');
  await expect(panel).toBeVisible();
  return panel;
}

test.describe('Mobile nav docs accordion', () => {
  test('caret chevrons are visible on expandable sections', async ({ page }) => {
    const panel = await openMobileNav(page);
    // Every expandable section summary should have a visible caret.
    const firstCaret = panel.locator('.mobile-nav__caret').first();
    await expect(firstCaret).toBeVisible();
    // The SVG arrow inside should have non-zero dimensions.
    const box = await firstCaret.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(0);
    expect(box!.height).toBeGreaterThan(0);
  });

  test('clicking a top-level section expands it', async ({ page }) => {
    const panel = await openMobileNav(page);
    // Find an expandable section (details[data-level="0"]) that is currently closed.
    const section = panel.locator('details[data-level="0"]').first();
    await expect(section).not.toHaveAttribute('open');
    // Click its own summary (not a nested summary) to expand.
    await section.locator(':scope > summary').click();
    await expect(section).toHaveAttribute('open');
  });

  test('nested subsections with children show carets and are expandable', async ({
    page,
  }) => {
    const panel = await openMobileNav(page);
    // Expand a top-level section to reveal nested subsections.
    const topSection = panel.locator('details[data-level="0"]').first();
    await topSection.locator(':scope > summary').click();
    await expect(topSection).toHaveAttribute('open');
    // A nested details (level 1) should now be visible.
    const nestedSection = topSection.locator('details[data-level="1"]').first();
    await expect(nestedSection).toBeVisible();
    // It should have a caret.
    await expect(nestedSection.locator('.mobile-nav__caret').first()).toBeVisible();
    // It should be expandable by clicking.
    await nestedSection.locator(':scope > summary').click();
    await expect(nestedSection).toHaveAttribute('open');
  });
});
