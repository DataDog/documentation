import { test, expect, type Page } from '@playwright/test';

const PAGE_URL = '/dd_e2e/cdocs/components/collapse_content/';
const CONTENT_AREA = '#mainContent';

// --- Selectors ---

function section(id: string) {
  return `details#${id}`;
}

function summary(id: string) {
  return `${section(id)} > summary`;
}

function contentEl(id: string) {
  return `${section(id)} .collapsible-content`;
}

// --- Helpers ---

async function hideOverlays(page: Page) {
  await page.addStyleTag({
    content: `
      .conv-search-float-btn { display: none !important; }
      body > header { display: none !important; }
      .announcement-banner { display: none !important; }
    `,
  });
}

// --- Tests ---

test.describe('Cdocs collapse content component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForSelector(CONTENT_AREA);
    await hideOverlays(page);
  });

  test('page renders as expected', async ({ page }) => {
    await expect(page.locator(CONTENT_AREA)).toHaveScreenshot(
      'collapse-content-initial.png'
    );
  });

  test('expanded section is open on initial load', async ({ page }) => {
    const details = page.locator(section('collapse-expanded-h4'));
    await expect(details).toHaveAttribute('open', '');
    await expect(page.locator(contentEl('collapse-expanded-h4'))).toBeVisible();
  });

  test('collapsed sections are closed on initial load', async ({ page }) => {
    for (const id of [
      'collapse-collapsed-h4',
      'collapse-h1',
      'collapse-h2',
      'collapse-h3',
      'collapse-h5',
      'collapse-rich',
    ]) {
      await expect(page.locator(section(id))).not.toHaveAttribute('open', '');
      await expect(page.locator(contentEl(id))).not.toBeVisible();
    }
  });

  test('clicking a collapsed section expands it', async ({ page }) => {
    const sum = page.locator(summary('collapse-collapsed-h4'));
    const cont = page.locator(contentEl('collapse-collapsed-h4'));
    const details = page.locator(section('collapse-collapsed-h4'));

    await expect(cont).not.toBeVisible();
    await sum.click();
    await expect(details).toHaveAttribute('open', '');
    await expect(cont).toBeVisible();

    await expect(details).toHaveScreenshot('collapse-content-expanded.png');
  });

  test('clicking an expanded section collapses it', async ({ page }) => {
    const sum = page.locator(summary('collapse-expanded-h4'));
    const cont = page.locator(contentEl('collapse-expanded-h4'));
    const details = page.locator(section('collapse-expanded-h4'));

    await expect(cont).toBeVisible();
    await sum.click();
    await expect(details).not.toHaveAttribute('open', '');
    await expect(cont).not.toBeVisible();
  });

  test('each heading level renders the correct tag', async ({ page }) => {
    const cases: [string, string][] = [
      ['collapse-h1', 'h1'],
      ['collapse-h2', 'h2'],
      ['collapse-h3', 'h3'],
      ['collapse-expanded-h4', 'h4'],
      ['collapse-collapsed-h4', 'h4'],
      ['collapse-h5', 'h5'],
    ];
    for (const [id, tag] of cases) {
      const heading = page.locator(
        `${section(id)} ${tag}.header-text-inner`
      );
      await expect(heading).toHaveCount(1);
    }
  });

  test('rich content section shows code block and alert when expanded', async ({
    page,
  }) => {
    const sum = page.locator(summary('collapse-rich'));
    await sum.click();
    await expect(page.locator(contentEl('collapse-rich'))).toBeVisible();

    // Verify nested components are present
    await expect(
      page.locator(`${contentEl('collapse-rich')} .code-snippet`)
    ).toBeVisible();
    await expect(
      page.locator(`${contentEl('collapse-rich')} .alert-info`)
    ).toBeVisible();

    await expect(
      page.locator(section('collapse-rich'))
    ).toHaveScreenshot('collapse-content-rich-expanded.png');
  });

  test.describe('keyboard navigation', () => {
    test('Enter toggles a collapsed section', async ({ page }) => {
      const sum = page.locator(summary('collapse-collapsed-h4'));
      const cont = page.locator(contentEl('collapse-collapsed-h4'));
      const details = page.locator(section('collapse-collapsed-h4'));

      await sum.focus();
      await page.keyboard.press('Enter');
      await expect(details).toHaveAttribute('open', '');
      await expect(cont).toBeVisible();

      await page.keyboard.press('Enter');
      await expect(details).not.toHaveAttribute('open', '');
      await expect(cont).not.toBeVisible();
    });

    test('Space toggles a collapsed section', async ({ page }) => {
      const sum = page.locator(summary('collapse-h1'));
      const cont = page.locator(contentEl('collapse-h1'));
      const details = page.locator(section('collapse-h1'));

      await sum.focus();
      await page.keyboard.press('Space');
      await expect(details).toHaveAttribute('open', '');
      await expect(cont).toBeVisible();

      await page.keyboard.press('Space');
      await expect(details).not.toHaveAttribute('open', '');
      await expect(cont).not.toBeVisible();
    });
  });
});
