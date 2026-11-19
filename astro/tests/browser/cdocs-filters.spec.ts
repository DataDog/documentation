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

  test("a loaded URL's filter values aren't stored", async ({ page }) => {
    await page.goto(`${CDOC_URL}?prog_lang=python&api_type=dd_api`);
    await expect(content(page)).toContainText("ddtrace");
    await expect(
      page.locator('.cdocs-filter-bar[data-hydrated="true"]'),
    ).toBeAttached();

    expect(
      await page.evaluate(() =>
        localStorage.getItem("datadog-docs-content-filters"),
      ),
    ).toBeNull();
  });

  test("clicking a pill stores its value in localStorage, in Hugo's format", async ({
    page,
  }) => {
    await page.goto(CDOC_URL);
    await expect(
      page.locator('.cdocs-filter-bar[data-hydrated="true"]'),
    ).toBeAttached();

    await pill(page, "Datadog").click();
    await expect(page).toHaveURL(new RegExp("api_type=dd_api"));

    // Only the clicked filter: the language is still the default.
    await expect
      .poll(() =>
        page.evaluate(() =>
          JSON.parse(
            localStorage.getItem("datadog-docs-content-filters") ?? "{}",
          ),
        ),
      )
      .toEqual({
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

test.describe("cdocs URLs for crawlers", () => {
  const canonical = (page: import("@playwright/test").Page) =>
    page.locator('link[rel="canonical"]');

  test("a value the page doesn't offer redirects to the one it shows", async ({
    request,
  }) => {
    const response = await request.get(
      `${CDOC_URL}?utm_source=x&prog_lang=cobol&api_type=dd_api`,
      { maxRedirects: 0 },
    );
    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe(
      `${CDOC_URL}?api_type=dd_api&prog_lang=java&utm_source=x`,
    );
  });

  test("the Cdocs sitemap lists each variant's canonical URL", async ({
    request,
  }) => {
    const response = await request.get("/sitemap-cdocs.xml");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/xml");
    const locs = [...(await response.text()).matchAll(/<loc>(.*?)<\/loc>/g)]
      .map(([, loc]) => new URL(loc.replaceAll("&amp;", "&")))
      .filter((url) => url.pathname === CDOC_URL)
      .map((url) => `${url.pathname}${url.search}`);
    // Four languages, two APIs, with the bare URL for the default variant.
    expect(locs).toHaveLength(8);
    expect(locs[0]).toBe(CDOC_URL);
    expect(locs).toContain(`${CDOC_URL}?api_type=dd_api&prog_lang=python`);
  });

  test("valid params render without a redirect, in any order", async ({
    request,
  }) => {
    const response = await request.get(
      `${CDOC_URL}?prog_lang=python&api_type=dd_api`,
      { maxRedirects: 0 },
    );
    expect(response.status()).toBe(200);
  });

  test("the default variant's canonical URL is the bare URL, and its URL keeps its params", async ({
    page,
  }) => {
    await page.goto(`${CDOC_URL}?prog_lang=java`);
    await expect(canonical(page)).toHaveAttribute(
      "href",
      new RegExp(`${CDOC_URL}$`),
    );
    await expect(page).toHaveURL(new RegExp("prog_lang=java"));
  });

  test("another variant's canonical URL has its values, in alphabetical order", async ({
    page,
  }) => {
    await page.goto(`${CDOC_URL}?prog_lang=python&api_type=dd_api`);
    await expect(canonical(page)).toHaveAttribute(
      "href",
      new RegExp(`${CDOC_URL}\\?api_type=dd_api&prog_lang=python$`),
    );
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
    // Hold the traits list back until the click, so the link isn't updated
    // first. Releasing it right after stays inside the navigation's wait cap.
    let releaseTraitsList = () => {};
    const traitsListReleased = new Promise<void>(
      (resolve) => (releaseTraitsList = resolve),
    );
    await page.route("**/cdocs-traits-index.json*", async (route) => {
      await traitsListReleased;
      await route.continue();
    });
    await page.reload();
    await page.evaluate(
      () => ((window as unknown as { __noReload?: boolean }).__noReload = true),
    );

    await page
      .getByRole("link", { name: "Custom instrumentation", exact: true })
      .click();
    releaseTraitsList();

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
