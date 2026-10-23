/*
  WEB-9804 verification: confirms the desktop sidenav on the preview build (which now
  scopes Levels 2-4 to the current top-level section, see nav/left-nav.html) shows
  exactly the same VISIBLE content as production, for every top-level product section.

  This doesn't diff raw HTML -- it renders each page in a real browser and reads what's
  actually visible (Playwright's `:visible`), so CSS-hidden items (e.g. another section's
  collapsed Level 2, which was already display:none in prod) correctly don't count as a
  difference even though they're no longer in the DOM at all on preview.

  Run against the live preview + prod, not the local dev server:
    npx playwright test e2e/integration/nav-regression --reporter=list
*/
import { test, expect, type Page } from '@playwright/test';
import sections from './sections.json';

const PROD_BASE = 'https://docs.datadoghq.com';
const PREVIEW_BASE = 'https://docs-staging.datadoghq.com/david.jones/nav2';
const PREVIEW_PATH_PREFIX = '/david.jones/nav2';

type NavItem = { text: string; href: string };

async function visibleSidenavItems(page: Page, stripPrefix: string): Promise<NavItem[]> {
    const items = await page.locator('aside.sidenav a:visible').evaluateAll((els) =>
        els.map((el) => ({
            text: (el.textContent || '').trim().replace(/\s+/g, ' '),
            // Resolve to an absolute URL first (hrefs can be relative) and compare paths
            // only, so domain differences (docs.datadoghq.com vs. docs-staging...) don't count.
            path: new URL(el.getAttribute('href') || '', window.location.href).pathname,
        }))
    );
    return items.map((i) => ({
        text: i.text,
        href: i.path.startsWith(stripPrefix) ? i.path.slice(stripPrefix.length) : i.path,
    }));
}

function itemKey(item: NavItem) {
    return `${item.text}||${item.href}`;
}

async function activeTopLevelText(page: Page): Promise<string[]> {
    return page.locator('aside.sidenav > ul > li.nav-top-level.active > a span').allTextContents();
}

for (const section of sections as { identifier: string; url: string; name: string }[]) {
    test(`desktop sidenav parity: ${section.name} (/${section.url})`, async ({ page, context }) => {
        const prodPage = await context.newPage();
        await prodPage.goto(`${PROD_BASE}/${section.url}`, { waitUntil: 'load' });
        const prodItems = await visibleSidenavItems(prodPage, '');
        const prodActive = await activeTopLevelText(prodPage);
        await prodPage.close();

        await page.goto(`${PREVIEW_BASE}/${section.url}`, { waitUntil: 'load' });
        const previewItems = await visibleSidenavItems(page, PREVIEW_PATH_PREFIX);
        const previewActive = await activeTopLevelText(page);

        const prodKeys = new Set(prodItems.map(itemKey));
        const previewKeys = new Set(previewItems.map(itemKey));

        const missingFromPreview = prodItems.filter((i) => !previewKeys.has(itemKey(i)));
        const extraInPreview = previewItems.filter((i) => !prodKeys.has(itemKey(i)));

        expect(missingFromPreview, 'visible on prod but missing on preview').toEqual([]);
        expect(extraInPreview, 'visible on preview but not on prod').toEqual([]);
        expect(previewActive, 'active top-level section should match prod').toEqual(prodActive);
    });
}
