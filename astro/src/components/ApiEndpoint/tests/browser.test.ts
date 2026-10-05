import { test, expect } from "@playwright/test";

test.describe("ApiEndpoint component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/api-endpoint");
  });

  test("renders at least one endpoint section", async ({ page }) => {
    const endpoint = page.locator(".api-endpoint");
    await expect(endpoint.first()).toBeVisible();
  });

  test("renders API method badge", async ({ page }) => {
    const badge = page.locator(".api-method-badge");
    await expect(badge.first()).toBeVisible();
  });

  test("exposes the operation slug as the section anchor", async ({ page }) => {
    // ApiEndpoint stopped rendering its own summary heading once the
    // operation page took over the version-tabs layout (the page renders
    // a single H1 above the tabs). The slug anchor moved onto the section.
    const endpoint = page.locator(".api-endpoint").first();
    const id = await endpoint.getAttribute("id");
    expect(id).toBeTruthy();
  });

  test("renders the URL path", async ({ page }) => {
    const endpoint = page.locator(".api-endpoint").first();
    const code = endpoint.locator("code").first();
    await expect(code).toBeVisible();
  });

  test("renders deprecated alert on deprecated endpoint", async ({ page }) => {
    const deprecatedEndpoint = page.locator(".api-endpoint").nth(1);
    const alert = deprecatedEndpoint.locator(".alert--warning");
    await expect(alert).toBeVisible();
  });

  test("renders response section when responses exist", async ({ page }) => {
    const endpoint = page.locator(".api-endpoint").first();
    const response = endpoint.locator(".api-response");
    await expect(response).toBeVisible();
  });

  test("renders code examples when they exist", async ({ page }) => {
    const endpoint = page.locator(".api-endpoint").first();
    const codeExample = endpoint.locator(".api-code-example");
    await expect(codeExample).toBeVisible();
  });

  test("shows only the active region URL (default: datadoghq.com)", async ({
    page,
  }) => {
    const endpoint = page.locator(".api-endpoint").first();
    const visibleUrl = endpoint.locator('[data-region="us"]').first();
    await expect(visibleUrl).toBeVisible();
    await expect(visibleUrl).toContainText("datadoghq.com");

    // EU variant is rendered in the DOM but hidden.
    const euUrl = endpoint.locator('[data-region="eu"]').first();
    await expect(euUrl).toBeHidden();
  });
});

test.describe("ApiEndpoint region switching", () => {
  test("swapping the region swaps the visible endpoint URL", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.goto("/dd_e2e/components/api-endpoint");

    await expect(
      page.locator('.region-selector[data-hydrated="true"]').first(),
    ).toBeVisible();
    await page.locator(".region-selector .select__control").selectOption("eu");

    const endpoint = page.locator(".api-endpoint").first();
    const euUrl = endpoint.locator('[data-region="eu"]').first();
    await expect(euUrl).toBeVisible();
    await expect(euUrl).toContainText("datadoghq.eu");

    const usUrl = endpoint.locator('[data-region="us"]').first();
    await expect(usUrl).toBeHidden();
  });

  test("swapping the region swaps the visible curl command", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.goto("/dd_e2e/components/api-endpoint");

    await expect(
      page.locator('.region-selector[data-hydrated="true"]').first(),
    ).toBeVisible();
    await page.locator(".region-selector .select__control").selectOption("eu");

    const codeExample = page.locator(".api-code-example").first();
    const euVariant = codeExample.locator('[data-region="eu"]').first();
    await expect(euVariant).toBeVisible();
    await expect(euVariant).toContainText("datadoghq.eu");

    const usVariant = codeExample.locator('[data-region="us"]').first();
    await expect(usVariant).toBeHidden();
  });

  test("renders the OAuth scopes sentence in the body font, as Hugo does", async ({
    page,
  }) => {
    await page.goto("/dd_e2e/components/api-endpoint");
    const oauthScopes = page.locator(".api-endpoint__oauth-scopes").first();
    await expect(oauthScopes).toBeVisible();

    const [scopesStyle, bodyStyle] = await oauthScopes.evaluate((el) => {
      const pick = (style: CSSStyleDeclaration) => ({
        fontSize: style.fontSize,
        color: style.color,
      });
      return [
        pick(getComputedStyle(el)),
        pick(getComputedStyle(document.body)),
      ];
    });
    expect(scopesStyle).toEqual(bodyStyle);
  });

  test("renders the permissions sentence in the body font, as Hugo does", async ({
    page,
  }) => {
    await page.goto("/dd_e2e/components/api-endpoint");
    const permissions = page.locator(".api-endpoint__permissions").first();
    await expect(permissions).toBeVisible();

    const [permissionsStyle, bodyStyle] = await permissions.evaluate((el) => {
      const pick = (style: CSSStyleDeclaration) => ({
        fontSize: style.fontSize,
        color: style.color,
      });
      return [
        pick(getComputedStyle(el)),
        pick(getComputedStyle(document.body)),
      ];
    });
    expect(permissionsStyle).toEqual(bodyStyle);
  });

  test("leaves only the heading margin between Overview and the description", async ({
    page,
  }) => {
    await page.goto("/dd_e2e/components/api-endpoint");
    const overviewHeading = page
      .locator(".api-endpoint__overview-heading")
      .first();
    await expect(overviewHeading).toBeVisible();

    // Measure the rendered gap, not just the heading's margin: a top margin
    // on the description collapses with it and can widen the gap.
    const { gap, headingMarginBottom } = await overviewHeading.evaluate(
      (heading) => ({
        gap:
          heading.nextElementSibling!.getBoundingClientRect().top -
          heading.getBoundingClientRect().bottom,
        headingMarginBottom: parseFloat(getComputedStyle(heading).marginBottom),
      }),
    );
    expect(gap).toBeCloseTo(headingMarginBottom, 0);
  });
});
