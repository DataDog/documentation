import { test, expect } from "@playwright/test";

/**
 * Browser coverage for the parts the unit tests cannot reach: that the banner
 * is genuinely hidden for a supported site, that switching the site selector
 * reveals it without a navigation, and that the `.md` twin carries the note.
 *
 * The test page is covered by a test-only `url_paths` entry in
 * `tests/fixtures/siteSupport/dd_e2e.yaml`, merged outside the live build.
 * A browser test runs against a real build in a separate process, so it cannot
 * mock build-time data — hence the fixture rather than a real product key.
 */
// The interactive page carries a region selector, which only `.astro` test
// pages can add. The `.mdoc` page below it covers the `.md` twin. Both paths
// are covered by the same fixture entry.
const PAGE = "/dd_e2e/components/site-support-banner";
const MDOC_PAGE = "/dd_e2e/components/site-support";

test.describe("SiteSupportBanner", () => {
  test.beforeEach(async ({ context, page }) => {
    await context.clearCookies();
    await page.goto(PAGE);
  });

  test("hides the banner on a supported site", async ({ page }) => {
    // Default region is `us`, which supports the fixture product. Every
    // unsupported variant is in the DOM, so each is checked rather than
    // matching the class once (which Playwright's strict mode rejects).
    for (const regionKey of ["gov", "gov2"]) {
      await expect(
        page.locator(`.site-support-banner[data-region="${regionKey}"]`),
      ).toBeHidden();
    }
  });

  test("renders every unsupported variant into the HTML", async ({ page }) => {
    // Hidden, but present — the variants are built statically for SEO.
    await expect(
      page.locator('.site-support-banner[data-region="gov"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('.site-support-banner[data-region="gov2"]'),
    ).toHaveCount(1);
  });

  test("reveals the banner after switching to an unsupported site", async ({
    page,
  }) => {
    await expect(
      page.locator('.region-selector[data-hydrated="true"]').first(),
    ).toBeVisible();
    await page.locator(".region-selector .select__control").selectOption("gov");

    const banner = page.locator('.site-support-banner[data-region="gov"]');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText("not supported");
    // The other unsupported variant stays hidden: one banner, not all of them.
    await expect(
      page.locator('.site-support-banner[data-region="gov2"]'),
    ).toBeHidden();
  });

  test("names the reader's own site in the revealed banner", async ({
    page,
  }) => {
    await expect(
      page.locator('.region-selector[data-hydrated="true"]').first(),
    ).toBeVisible();
    await page.locator(".region-selector .select__control").selectOption("gov");
    await expect(
      page.locator('.site-support-banner[data-region="gov"]'),
    ).toContainText("US1-FED");
  });

  test("switching sites does not navigate", async ({ page }) => {
    // Region switching uses history.replaceState, so the banner has to be
    // revealed by CSS rather than re-rendered by the server.
    await expect(
      page.locator('.region-selector[data-hydrated="true"]').first(),
    ).toBeVisible();
    const before = await page.evaluate(() => performance.now());
    await page.locator(".region-selector .select__control").selectOption("gov");
    await expect(
      page.locator('.site-support-banner[data-region="gov"]'),
    ).toBeVisible();
    // A navigation would reset the performance timeline.
    const after = await page.evaluate(() => performance.now());
    expect(after).toBeGreaterThan(before);
  });
});

test.describe("SiteSupportBanner plaintext (.md)", () => {
  test("adds the site-support note naming every unsupported host", async ({
    request,
  }) => {
    const response = await request.get(`${MDOC_PAGE}.md`);
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("{% callout %}");
    expect(body).toContain(
      "This product or feature is not supported for the following sites:",
    );
    expect(body).toContain("app.ddog-gov.com");
    // The note sits below the page's H1, mirroring the HTML order.
    expect(body.indexOf("# Site support banner")).toBeLessThan(
      body.indexOf("{% callout %}"),
    );
  });

  test("omits the note on an unaffected page", async ({ request }) => {
    const response = await request.get("/dd_e2e/components/alert.md");
    const body = await response.text();
    expect(body).not.toContain(
      "This product or feature is not supported for the following sites:",
    );
  });
});
