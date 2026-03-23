import { test, expect, type Page } from '@playwright/test';

const PAGE_URL = '/dd_e2e/cdocs/headings_and_toc/';

// --- Selectors ---

function pill(optionId: string): string {
  return `button.cdoc-pill[data-filter-id="database"][data-option-id="${optionId}"]`;
}

const TOC_NAV = '#TableOfContents';
const TOC_CONTAINER = '.js-toc-container';
const CONTENT_AREA = '#mainContent';

// --- Expected TOC H2 entries per database ---

const SHARED_H2S = [
  'Overview',
  'Test cases',
  'Overview',
  'Prerequisites',
];

const DATABASE_H2S: Record<string, string[]> = {
  postgres: [
    ...SHARED_H2S,
    'Installation',
    'Configuration',
    'Vacuuming and maintenance',
    'Troubleshooting',
  ],
  mysql: [
    ...SHARED_H2S,
    'Installation',
    'Configuration',
    'InnoDB monitoring',
    'Troubleshooting',
  ],
  mongo_db: [
    ...SHARED_H2S,
    'Installation',
    'Configuration',
    'Sharding metrics',
    'Troubleshooting',
  ],
};

// --- Helpers ---

async function clickPill(page: Page, optionId: string) {
  await page.click(pill(optionId));
}

/** Returns the visible top-level TOC link texts (H2 entries). */
async function getVisibleTocH2Texts(page: Page): Promise<string[]> {
  // Top-level links are direct children of the first <ul> inside #TableOfContents
  const links = page.locator(`${TOC_NAV} > ul > li > a`);
  const allTexts: string[] = [];
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    const link = links.nth(i);
    // Only include links whose parent <li> is visible
    const li = link.locator('..');
    if (await li.isVisible()) {
      allTexts.push((await link.textContent())?.trim() ?? '');
    }
  }
  return allTexts;
}

/** Collects all heading IDs from the visible content area. */
async function getVisibleHeadingIds(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const content = document.querySelector('#cdoc-content');
    if (!content) return [];
    const headings = content.querySelectorAll('h2, h3');
    const ids: string[] = [];
    for (const h of headings) {
      // Skip headings inside hidden cdoc__toggleable blocks
      const toggleable = h.closest('.cdoc__toggleable');
      if (toggleable && toggleable.classList.contains('cdoc__hidden')) continue;
      if (h.id) ids.push(h.id);
    }
    return ids;
  });
}

/** Scroll to top and wait for TOC highlight state to stabilize. */
async function stabilizeToc(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

/** Hide fixed/floating elements that can overlap content and block clicks. */
async function hideOverlays(page: Page) {
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

// --- Tests ---

test.describe('Cdocs headings and TOC', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForSelector('#cdoc-content');
    // Reset to default (postgres)
    await clickPill(page, 'postgres');
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

  test.describe('TOC shows correct H2s for each filter', () => {
    for (const db of ['postgres', 'mysql', 'mongo_db'] as const) {
      test(`TOC for ${db}`, async ({ page }) => {
        await clickPill(page, db);

        const tocTexts = await getVisibleTocH2Texts(page);
        expect(tocTexts).toEqual(DATABASE_H2S[db]);

        await stabilizeToc(page);
        await expect(page.locator(TOC_CONTAINER)).toHaveScreenshot(
          `toc-${db}.png`
        );
      });
    }
  });

  test.describe('all heading IDs are unique', () => {
    for (const db of ['postgres', 'mysql', 'mongo_db'] as const) {
      test(`no duplicate heading IDs for ${db}`, async ({ page }) => {
        await clickPill(page, db);

        const ids = await getVisibleHeadingIds(page);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBeGreaterThan(0);
        expect(ids.length).toBe(uniqueIds.size);
      });
    }
  });

  test('clicking Installation in TOC scrolls to heading and shows H3s', async ({
    page,
  }) => {
    // Switch to mongo_db (last non-default filter we test)
    await clickPill(page, 'mongo_db');

    // Click the "Installation" link in the TOC
    const installLink = page.locator(`${TOC_NAV} a`, {
      hasText: 'Installation',
    });
    await installLink.click();

    // Wait for scroll and TOC highlight state to settle
    await page.waitForTimeout(1000);

    // The Installation heading should be near the top of the viewport.
    // Multiple "Installation" h2s exist in the DOM (one per database, hidden via
    // .cdoc__hidden). Use the href from the TOC link to target the exact heading.
    const href = await installLink.getAttribute('href');
    const headingId = href!.replace('#', '');
    const heading = page.locator(`#${headingId}`);
    await expect(heading).toBeInViewport();

    // The TOC should now show the H3 children under Installation
    // (the parent link gets .toc_open, which reveals the nested <ul>)
    const installLi = installLink.locator('..');
    const nestedLinks = installLi.locator('ul a');
    await expect(nestedLinks).not.toHaveCount(0);

    const nestedTexts: string[] = [];
    const count = await nestedLinks.count();
    for (let i = 0; i < count; i++) {
      nestedTexts.push((await nestedLinks.nth(i).textContent())?.trim() ?? '');
    }
    expect(nestedTexts).toEqual(['Authentication', 'Permissions']);

    // Verify the nested H3 links are visible in the TOC
    for (let i = 0; i < count; i++) {
      await expect(nestedLinks.nth(i)).toBeVisible();
    }

    // Verify the Installation link is marked as active/open in the TOC
    await expect(installLink).toHaveClass(/toc_open/);
  });
});
