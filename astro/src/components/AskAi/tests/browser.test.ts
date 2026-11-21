import { test, expect, type Page } from "@playwright/test";

/**
 * Covers what the package's own unit tests cannot: that the bundled mount
 * script executes on a real page, and that the searchbar island and the mount
 * script end up sharing one widget. Everything about the panel's own behavior
 * is asserted inside `shared/packages/ask-ai`.
 */

const PAGE = "/api/latest/authentication/";

/**
 * Answers the one AI request this suite makes, so the source chips are rendered
 * by the real code path rather than by markup fabricated in the test. The
 * package parses sources out of the answer text, so the canned message carries
 * a `[sources]` block; the wire format is SSE, one JSON event per `data:` line.
 */
async function stubDocsAiAnswer(page: Page): Promise<void> {
  const fragments = [
    "Use an API key and an application key.\n\n",
    "[sources]\n",
    "1 | Authentication | https://docs.datadoghq.com/api/latest/authentication/\n",
    "2 | Sending metrics to Datadog | https://docs.datadoghq.com/metrics/\n",
  ];
  const body =
    fragments
      .map(
        (content) =>
          `data: ${JSON.stringify({ type: "markdown_fragment", content })}\n`,
      )
      .join("") + "data: [DONE]\n";

  await page.route("**/docs-ai/chat", async (route) => {
    const origin = route.request().headers()["origin"] ?? "";
    await route.fulfill({
      status: 200,
      contentType: "text/event-stream",
      headers: {
        "access-control-allow-origin": origin,
        "access-control-allow-headers": "content-type,x-docs-ai-api-key",
      },
      body,
    });
  });
}

/**
 * Resource-timing facts about the page's own load, read after the widget has
 * mounted. `ask-ai` matches case-sensitively, so it cannot collide with the
 * mount script's URL, which carries the component's `AskAi.astro` name. The
 * `chunk-url:` stub is excluded: under the dev server its URL also ends in the
 * package's path, but it is a one-line module the mount script imports eagerly.
 */
async function readLoadTimings(page: Page) {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    const askAiModule = performance
      .getEntriesByType("resource")
      .find(
        (entry) =>
          entry.name.includes("ask-ai") && !entry.name.includes("chunk-url"),
      );

    return {
      loadEventEndMs: navigation.loadEventEnd,
      askAiModuleStartMs: askAiModule?.startTime ?? null,
      // Reported so a miss on the match above is legible in the failure output
      // rather than looking like the module was never requested.
      askAiModuleUrl: askAiModule?.name ?? null,
    };
  });
}

test.describe("Ask AI", () => {
  test("mounts a floating button that opens the panel, throwing nothing", async ({
    page,
  }) => {
    // A throwaway load first: under `astro dev`, the first page to pull a
    // dependency through Vite's optimizer gets reloaded mid-load, and the
    // requests that reload cancels surface as console errors. Recording from
    // the second load keeps the assertion about the widget.
    await page.goto(PAGE);
    await page.waitForLoadState("networkidle");

    // A widget that mounts while throwing looks identical to a working one in
    // any test that only checks for the button, so the console is part of the
    // assertion rather than a separate test.
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    await page.goto(PAGE);

    const floatButton = page.locator(".conv-search-float-btn");
    await expect(floatButton).toBeVisible();

    await floatButton.click();
    await expect(page.locator(".conv-search-sidebar.open")).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });

  test("fetches the package only after the page has finished loading", async ({
    page,
  }) => {
    // Same throwaway load as above: Vite's dep optimizer reloads the first page
    // to pull a new dependency, which would land the module's request in the
    // wrong navigation's resource timeline.
    await page.goto(PAGE);
    await page.waitForLoadState("networkidle");

    // On a fast local server `load` beats the first idle period anyway, so hold
    // it open: preloaded fonts delay the `load` event.
    await page.route(/\.woff2?$/, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await route.continue();
    });

    await page.goto(PAGE);
    await expect(page.locator(".conv-search-float-btn")).toBeVisible();

    const timings = await readLoadTimings(page);

    // Starting any earlier puts a large high-priority script in the page's own
    // load, where Lighthouse counts it in the network dependency tree.
    expect(timings.askAiModuleStartMs).not.toBeNull();
    expect(timings.askAiModuleStartMs).toBeGreaterThan(timings.loadEventEndMs);
  });

  test("makes no Datadog-user lookup off Datadog's domain", async ({
    page,
  }) => {
    // The lookup is blocked by CORS anywhere but Datadog's domain, so making it
    // here would only log an error. Both mount sites share one config, so the
    // widget mounting is enough to prove neither asked.
    const locateRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("datadoghq.com/locate")) {
        locateRequests.push(request.url());
      }
    });

    await page.goto(PAGE);
    await expect(page.locator(".conv-search-float-btn")).toBeVisible();
    await page.waitForLoadState("networkidle");

    expect(locateRequests).toEqual([]);
  });

  test("keeps the disclaimer tooltip hidden until the info button is hovered", async ({
    page,
  }) => {
    await page.goto(PAGE);

    await page.locator(".conv-search-float-btn").click();
    await expect(page.locator(".conv-search-sidebar.open")).toBeVisible();

    const trigger = page.locator(".conv-search-info-btn");
    const tooltip = page.locator(".conv-search-info-tooltip-content");

    // Asserted present before hidden: `toBeHidden` also passes for an element
    // that does not exist, which would make this whole test vacuous if the
    // class were ever renamed.
    await expect(tooltip).toHaveCount(1);

    // The package supplies these rules itself. Hugo's site-wide tooltip
    // stylesheet used to be what hid this, and Astro never loaded it, so the
    // disclaimer sat permanently open in the panel header.
    await expect(tooltip).toBeHidden();

    // Hugo's `.tooltip-trigger` sets this with `!important`; the package now
    // has to say so itself, or the affordance differs between the two sites.
    await expect(trigger).toHaveCSS("cursor", "help");

    await trigger.hover();
    await expect(tooltip).toBeVisible();

    // Escaping the panel would mean the widget's own `overflow: hidden` clips
    // it, which is the whole reason it opens downward rather than upward.
    const panelBox = await page.locator(".conv-search-sidebar").boundingBox();
    const tooltipBox = await tooltip.boundingBox();
    expect(panelBox).not.toBeNull();
    expect(tooltipBox).not.toBeNull();
    expect(tooltipBox!.x).toBeGreaterThanOrEqual(panelBox!.x);
    expect(tooltipBox!.x + tooltipBox!.width).toBeLessThanOrEqual(
      panelBox!.x + panelBox!.width,
    );
    expect(tooltipBox!.y + tooltipBox!.height).toBeLessThanOrEqual(
      panelBox!.y + panelBox!.height,
    );

    await page.locator(".conv-search-title").hover();
    await expect(tooltip).toBeHidden();
  });

  test("sizes the source chips the way Hugo does", async ({ page }) => {
    await stubDocsAiAnswer(page);
    await page.goto(PAGE);

    await page.locator(".conv-search-float-btn").click();
    await expect(page.locator(".conv-search-sidebar.open")).toBeVisible();

    await page.locator(".conv-search-input").fill("How do I authenticate?");
    await page.locator(".conv-search-send").click();

    const cards = page.locator(".conv-search-source-card");
    await expect(cards).toHaveCount(2);

    // The package's rule is `height: 36px` with `padding: 7px 16px` and a 1px
    // border — copied verbatim from Hugo, where the Bootstrap reboot's global
    // `box-sizing: border-box` makes 36px the whole chip. Astro ships no such
    // reset, so under content-box the chip renders 16px taller.
    const box = await cards.first().boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(36);

    // Pins the mechanism rather than just the symptom: the reset has to reach
    // the widget's root and, through the descendant selector, the chip itself.
    await expect(page.locator(".conv-search-sidebar")).toHaveCSS(
      "box-sizing",
      "border-box",
    );
    await expect(cards.first()).toHaveCSS("box-sizing", "border-box");
  });

  test("the searchbar's Ask AI row opens the one mounted panel", async ({
    page,
  }) => {
    await page.goto(PAGE);

    // Two SearchBar islands hydrate on this page (the API side nav and the
    // mobile nav), and each mounts the widget itself rather than being handed a
    // handle. This is the only place that idempotency is observable.
    await expect(page.locator(".search-bar")).toHaveCount(2);

    // Waited on rather than assumed: the input is controlled, so a value filled
    // before the island hydrates is thrown away when Preact renders its own
    // empty `value`, leaving an empty query and no Ask AI row to click. That
    // race is invisible in the failure, which reports only a missing row.
    const searchBar = page.locator(
      '.api-side-nav__search .search-bar[data-hydrated="true"]',
    );
    await expect(searchBar).toBeVisible();

    const input = searchBar.locator(".search-bar__input");
    await input.click();
    // Under the widget's auto-submit threshold, so the query is prefilled and
    // never sent — this test makes no request to the AI backend.
    await input.fill("dashboard");
    await expect(input).toHaveValue("dashboard");

    const row = page.locator(".search-bar__ai-suggestion");
    await expect(row).toContainText("Ask AI about");
    await row.click();

    await expect(page.locator(".conv-search-sidebar.open")).toBeVisible();
    await expect(page.locator(".conv-search-input")).toHaveValue("dashboard");
    await expect(page.locator(".conv-search-sidebar")).toHaveCount(1);
  });
});
