import { test, expect } from "@playwright/test";

const CDOC_URL = "/dd_e2e/cdocs/custom_instrumentation/";

const content = (page: import("@playwright/test").Page) =>
  page.locator(".cdoc__content");

// A pill by its visible label (the filter menu renders one radiogroup of pills
// per trait, styling the selected pill in Datadog purple).
const pill = (page: import("@playwright/test").Page, label: string) =>
  page.locator(".cdocs-filter-bar__pill", { hasText: label });

test.describe("cdocs filterable doc (SSR)", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("renders the default filter (Java / OpenTelemetry) when nothing is set", async ({
    page,
  }) => {
    await page.goto(CDOC_URL);
    await expect(pill(page, "Java")).toHaveAttribute("aria-checked", "true");
    // Java OTel partial content is present; the C++ danger notice is not.
    await expect(content(page)).toContainText("DD_TRACE_OTEL_ENABLED");
    await expect(content(page)).not.toContainText("C++ does not support");
  });

  test("a URL param filters the server-rendered content", async ({ page }) => {
    await page.goto(`${CDOC_URL}?prog_lang=cpp&api_type=otel_api`);
    await expect(pill(page, "C++")).toHaveAttribute("aria-checked", "true");
    // Server dropped the Java content and kept only the C++/OTel danger notice.
    await expect(content(page)).toContainText(
      "C++ does not support the OpenTelemetry API",
    );
    await expect(content(page)).not.toContainText("DD_TRACE_OTEL_ENABLED");
  });

  test("clicking a pill swaps content via client-side navigation (no full reload)", async ({
    page,
  }) => {
    await page.goto(CDOC_URL);

    // Wait for the filter bar island to hydrate; a click landing before its
    // handlers are live is silently dropped (and Playwright still reports the
    // click as successful).
    await expect(
      page.locator('.cdocs-filter-bar[data-hydrated="true"]'),
    ).toBeAttached();

    // Mark the current document; a view-transition swap keeps the same document,
    // a full reload would clear this flag.
    await page.evaluate(
      () => ((window as unknown as { __noReload?: boolean }).__noReload = true),
    );

    await pill(page, "Python").click();

    // URL updates to reflect the new selection, and the pill becomes selected.
    await expect(page).toHaveURL(new RegExp("prog_lang=python"));
    await expect(pill(page, "Python")).toHaveAttribute("aria-checked", "true");
    // New (Python) server-rendered content is swapped in; the Java-only import
    // is gone.
    await expect(content(page)).toContainText("trace.get_current_span");
    await expect(content(page)).not.toContainText(
      "io.opentelemetry.api.trace.Span",
    );
    // The document was not fully reloaded.
    expect(
      await page.evaluate(
        () => (window as unknown as { __noReload?: boolean }).__noReload,
      ),
    ).toBe(true);
  });

  test("clicking a pill goes to the variant URL, with every value in alphabetical order", async ({
    page,
  }) => {
    await page.goto(`${CDOC_URL}?prog_lang=java&unknown=1`);
    await expect(
      page.locator('.cdocs-filter-bar[data-hydrated="true"]'),
    ).toBeAttached();

    await pill(page, "Python").click();

    // The unknown param is dropped, and the default API value is filled in.
    await expect(page).toHaveURL(
      new RegExp(`${CDOC_URL}\\?api_type=otel_api&prog_lang=python$`),
    );
    await expect(pill(page, "Python")).toHaveAttribute("aria-checked", "true");
  });

  test("a click on another filter before the new page arrives keeps the first click", async ({
    page,
  }) => {
    await page.goto(CDOC_URL);
    await expect(
      page.locator('.cdocs-filter-bar[data-hydrated="true"]'),
    ).toBeAttached();

    // Hold Python's page, so the second click lands before it arrives.
    await page.route(/prog_lang=python/, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // The second click aborts the first request, which closes its route.
      await route.continue().catch(() => {});
    });

    await pill(page, "Python").click();
    await pill(page, "Datadog").click();

    await expect(page).toHaveURL(
      new RegExp(`${CDOC_URL}\\?api_type=dd_api&prog_lang=python$`),
    );
    await expect(pill(page, "Python")).toHaveAttribute("aria-checked", "true");
    await expect(pill(page, "Datadog")).toHaveAttribute("aria-checked", "true");
  });

  test("the URL's filter values are stored in localStorage, in Hugo's format", async ({
    page,
  }) => {
    await page.goto(`${CDOC_URL}?prog_lang=python&api_type=dd_api`);
    await expect(content(page)).toContainText("ddtrace");

    await expect
      .poll(() =>
        page.evaluate(() =>
          JSON.parse(
            localStorage.getItem("datadog-docs-content-filters") ?? "{}",
          ),
        ),
      )
      .toMatchObject({
        prog_lang: { value: "python", timestamp: expect.any(Number) },
        api_type: { value: "dd_api", timestamp: expect.any(Number) },
      });
  });

  test("clicking a pill stores the new value in localStorage", async ({
    page,
  }) => {
    await page.goto(CDOC_URL);
    await expect(
      page.locator('.cdocs-filter-bar[data-hydrated="true"]'),
    ).toBeAttached();

    await pill(page, "Datadog").click();
    await expect(page).toHaveURL(new RegExp("api_type=dd_api"));

    await expect
      .poll(() =>
        page.evaluate(() =>
          JSON.parse(
            localStorage.getItem("datadog-docs-content-filters") ?? "{}",
          ),
        ),
      )
      .toMatchObject({
        api_type: { value: "dd_api", timestamp: expect.any(Number) },
      });
  });

  test("a bare URL renders the defaults, whatever the cookies say", async ({
    page,
    context,
    baseURL,
  }) => {
    await context.addCookies([
      {
        name: "cdocs_prefs",
        value: JSON.stringify({
          prog_lang: { value: "python", timestamp: Date.now() },
        }),
        url: baseURL,
      },
    ]);
    await page.goto(CDOC_URL);
    await expect(pill(page, "Java")).toHaveAttribute("aria-checked", "true");
  });

  test("the resolved values are in the HTML", async ({ page }) => {
    await page.goto(`${CDOC_URL}?prog_lang=python`);
    const state = await page
      .locator("#cdocs-page-state")
      .evaluate((element) => JSON.parse(element.textContent ?? ""));
    expect(state.valsByTraitId).toEqual({
      prog_lang: "python",
      api_type: "otel_api",
    });
  });
});

test.describe("links to cdocs pages", () => {
  const LINKS_URL = "/dd_e2e/cdocs/links/";

  test.beforeEach(async ({ page }) => {
    await page.goto(LINKS_URL);
    await page.evaluate(() =>
      localStorage.setItem(
        "datadog-docs-content-filters",
        JSON.stringify({ prog_lang: { value: "python", timestamp: 1 } }),
      ),
    );
    await page.reload();
  });

  test("hovering a bare Cdocs link adds the stored preferences", async ({
    page,
  }) => {
    const link = page.getByRole("link", {
      name: "Custom instrumentation",
      exact: true,
    });

    // The traits list loads when the page is idle, so hover until it's in.
    await expect(async () => {
      await link.hover();
      await expect(link).toHaveAttribute(
        "href",
        "/dd_e2e/cdocs/custom_instrumentation/?prog_lang=python",
      );
    }).toPass();

    await link.click();
    await expect(pill(page, "Python")).toHaveAttribute("aria-checked", "true");
  });

  test("params already on a link are kept", async ({ page }) => {
    const link = page.getByRole("link", {
      name: "Custom instrumentation with the Datadog API",
    });

    await expect(async () => {
      await link.hover();
      await expect(link).toHaveAttribute(
        "href",
        "/dd_e2e/cdocs/custom_instrumentation/?api_type=dd_api&prog_lang=python",
      );
    }).toPass();
  });

  test("links to pages that aren't Cdocs pages are left alone", async ({
    page,
  }) => {
    const cdocsLink = page.getByRole("link", {
      name: "Custom instrumentation",
      exact: true,
    });
    const otherLink = page.getByRole("link", { name: "Alert component" });

    // Wait until Cdocs links are being updated, then check the other one.
    await expect(async () => {
      await cdocsLink.hover();
      await expect(cdocsLink).toHaveAttribute("href", /prog_lang=python/);
    }).toPass();
    await otherLink.hover();
    await expect(otherLink).toHaveAttribute(
      "href",
      "/dd_e2e/components/alert/",
    );
  });
});

test.describe("bare cdocs URLs", () => {
  const LINKS_URL = "/dd_e2e/cdocs/links/";

  /** Store preferences in Hugo's format, from a page on the site. */
  async function storePreferences(
    page: import("@playwright/test").Page,
    valsByTraitId: Record<string, string>,
  ) {
    await page.goto(LINKS_URL);
    await page.evaluate((vals) => {
      const stored = Object.fromEntries(
        Object.entries(vals).map(([traitId, value]) => [
          traitId,
          { value, timestamp: 1 },
        ]),
      );
      localStorage.setItem(
        "datadog-docs-content-filters",
        JSON.stringify(stored),
      );
    }, valsByTraitId);
  }

  test("a bare URL redirects to the stored preferences, and stays out of the history", async ({
    page,
  }) => {
    await storePreferences(page, { prog_lang: "python" });

    await page.goto(CDOC_URL);

    await expect(page).toHaveURL(
      new RegExp(`${CDOC_URL}\\?api_type=otel_api&prog_lang=python$`),
    );
    await expect(pill(page, "Python")).toHaveAttribute("aria-checked", "true");

    // Back skips the bare URL, which `location.replace` swapped out.
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`${LINKS_URL}$`));
  });

  test("params already in the URL are kept", async ({ page }) => {
    await storePreferences(page, { prog_lang: "python", api_type: "dd_api" });

    await page.goto(`${CDOC_URL}?prog_lang=cpp`);

    await expect(page).toHaveURL(
      new RegExp(`${CDOC_URL}\\?api_type=dd_api&prog_lang=cpp$`),
    );
  });

  test("without stored preferences, the URL gets the defaults in place", async ({
    page,
  }) => {
    await page.goto(CDOC_URL);

    await expect(page).toHaveURL(
      new RegExp(`${CDOC_URL}\\?api_type=otel_api&prog_lang=java$`),
    );
    await expect(pill(page, "Java")).toHaveAttribute("aria-checked", "true");
  });

  test("a view-transition navigation to a bare URL gets the stored preferences", async ({
    page,
  }) => {
    await storePreferences(page, { prog_lang: "python" });
    // Hold the traits list back, so the link isn't updated before the click.
    await page.route("**/cdocs-traits-index.json*", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.continue();
    });
    await page.reload();
    await page.evaluate(
      () => ((window as unknown as { __noReload?: boolean }).__noReload = true),
    );

    await page
      .getByRole("link", { name: "Custom instrumentation", exact: true })
      .click();

    await expect(page).toHaveURL(
      new RegExp(`${CDOC_URL}\\?api_type=otel_api&prog_lang=python$`),
    );
    await expect(pill(page, "Python")).toHaveAttribute("aria-checked", "true");
    expect(
      await page.evaluate(
        () => (window as unknown as { __noReload?: boolean }).__noReload,
      ),
    ).toBe(true);
  });
});
