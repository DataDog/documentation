import { test, expect } from '@playwright/test';

// The plaintext (`.md`) twin of a cdoc: the HTML page links to it and the Copy
// button loads it, and the endpoint returns filter-resolved `text/markdown`.
const CDOC_URL = '/dd_e2e/cdocs/custom_instrumentation/';
const MAIN_COPY_BUTTON = '.copy-page-button:not(.copy-page-button--icon)';

test.describe('cdocs plaintext (.md)', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('the page links to the .md version, preserving the filter query', async ({
    page,
  }) => {
    await page.goto(`${CDOC_URL}?prog_lang=python&api_type=dd_api`);
    const link = page.locator('.cdoc-rightnav__plaintext-link');
    await expect(link).toHaveAttribute(
      'href',
      '/dd_e2e/cdocs/custom_instrumentation.md?prog_lang=python&api_type=dd_api',
    );
  });

  test('the .md endpoint returns filter-resolved text/markdown', async ({
    request,
  }) => {
    const response = await request.get(
      '/dd_e2e/cdocs/custom_instrumentation.md?prog_lang=python&api_type=dd_api',
    );
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/markdown');

    const body = await response.text();
    // Datadog API + Python content is kept; Java and OTel content is dropped.
    expect(body).toContain('ddtrace');
    expect(body).not.toContain('io.opentelemetry');
    expect(body).not.toContain('DD_TRACE_OTEL_ENABLED');
    // HTML comments and unmatched conditionals are gone.
    expect(body).not.toContain('<!--');
  });

  test('a .md path with no matching entry 404s', async ({ request }) => {
    const response = await request.get('/this/is/not/a/page.md');
    expect(response.status()).toBe(404);
  });

  test('the Copy button copies the plaintext to the clipboard', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(`${CDOC_URL}?prog_lang=python&api_type=dd_api`);
    // Chromium rejects clipboard writes from an unfocused document, so make
    // sure this page owns focus before clicking (parallel workers otherwise
    // leave it in the background).
    await page.bringToFront();

    const button = page.locator(MAIN_COPY_BUTTON);
    await expect(button).toHaveAttribute('data-hydrated', 'true', {
      timeout: 5000,
    });
    await button.click();

    // Feedback flips to "Copied", and the clipboard holds the resolved
    // plaintext. Both labels are always in the DOM (the slot is width-locked to
    // the longer string), so assert on the `--visible` one — checking the label
    // container's text would pass no matter which is shown. The flip happens
    // only after the clipboard write resolves, so this also fails loudly if the
    // write is rejected.
    await expect(
      button.locator('.copy-page-button__label-text--visible'),
    ).toHaveText('Copied');
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain('ddtrace');
    expect(clipboard).not.toContain('io.opentelemetry');
  });
});
