import { test, expect } from '@playwright/test';

const CDOC_URL = '/dd_e2e/cdocs/custom_instrumentation/';

const content = (page: import('@playwright/test').Page) =>
  page.locator('.cdoc__content');

// A pill by its visible label (the filter menu renders one radiogroup of pills
// per trait, styling the selected pill in Datadog purple).
const pill = (page: import('@playwright/test').Page, label: string) =>
  page.locator('.cdocs-filter-bar__pill', { hasText: label });

test.describe('cdocs filterable doc (SSR)', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('renders the default filter (Java / OpenTelemetry) when nothing is set', async ({ page }) => {
    await page.goto(CDOC_URL);
    await expect(pill(page, 'Java')).toHaveAttribute('aria-checked', 'true');
    // Java OTel partial content is present; the C++ danger notice is not.
    await expect(content(page)).toContainText('DD_TRACE_OTEL_ENABLED');
    await expect(content(page)).not.toContainText('C++ does not support');
  });

  test('a URL param filters the server-rendered content', async ({ page }) => {
    await page.goto(`${CDOC_URL}?prog_lang=cpp&api_type=otel_api`);
    await expect(pill(page, 'C++')).toHaveAttribute('aria-checked', 'true');
    // Server dropped the Java content and kept only the C++/OTel danger notice.
    await expect(content(page)).toContainText('C++ does not support the OpenTelemetry API');
    await expect(content(page)).not.toContainText('DD_TRACE_OTEL_ENABLED');
  });

  test('clicking a pill swaps content via client-side navigation (no full reload)', async ({ page }) => {
    await page.goto(CDOC_URL);

    // Wait for the filter bar island to hydrate; a click landing before its
    // handlers are live is silently dropped (and Playwright still reports the
    // click as successful).
    await expect(page.locator('.cdocs-filter-bar[data-hydrated="true"]')).toBeAttached();

    // Mark the current document; a view-transition swap keeps the same document,
    // a full reload would clear this flag.
    await page.evaluate(() => ((window as unknown as { __noReload?: boolean }).__noReload = true));

    await pill(page, 'Python').click();

    // URL updates to reflect the new selection, and the pill becomes selected.
    await expect(page).toHaveURL(new RegExp('prog_lang=python'));
    await expect(pill(page, 'Python')).toHaveAttribute('aria-checked', 'true');
    // New (Python) server-rendered content is swapped in; the Java-only import
    // is gone.
    await expect(content(page)).toContainText('trace.get_current_span');
    await expect(content(page)).not.toContainText('io.opentelemetry.api.trace.Span');
    // The document was not fully reloaded.
    expect(await page.evaluate(() => (window as unknown as { __noReload?: boolean }).__noReload)).toBe(true);
  });

  test('a selection persists across navigation via the cookie', async ({ page }) => {
    await page.goto(`${CDOC_URL}?prog_lang=python&api_type=dd_api`);
    await expect(content(page)).toContainText('ddtrace');

    // Navigate back to the bare URL (no params); the cookie should restore the
    // previous selection.
    await page.goto(CDOC_URL);
    await expect(pill(page, 'Python')).toHaveAttribute('aria-checked', 'true');
    await expect(content(page)).toContainText('ddtrace');
  });
});
