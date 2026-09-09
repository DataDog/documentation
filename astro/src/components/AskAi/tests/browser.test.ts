import { test, expect, type Page } from "@playwright/test";

/**
 * Covers what the package's own unit tests cannot: that the bundled mount
 * script executes on a real page, and that the searchbar island and the mount
 * script end up sharing one widget. Everything about the panel's own behavior
 * is asserted inside `shared/packages/ask-ai`.
 */

const PAGE = "/api/latest/authentication/";

/**
 * The Datadog-user lookup is cross-origin. Left alone it either succeeds or is
 * blocked by CORS depending on the network the suite runs on, and a blocked
 * request logs a console error that has nothing to do with the widget.
 */
async function stubDatadogUserLookup(page: Page): Promise<void> {
  await page.route("**/www.datadoghq.com/locate", async (route) => {
    // Echoed rather than `*`: the fetch sends credentials, and a wildcard is
    // rejected for credentialed requests.
    const origin = route.request().headers()["origin"] ?? "";
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: {
        "access-control-allow-origin": origin,
        "access-control-allow-credentials": "true",
      },
      body: JSON.stringify({ user_status: false }),
    });
  });
}

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
 * mount script's URL, which carries the component's `AskAi.astro` name.
 */
async function readLoadTimings(page: Page) {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    const askAiModule = performance
      .getEntriesByType("resource")
      .find((entry) => entry.name.includes("ask-ai"));

    return {
      domContentLoadedMs: navigation.domContentLoadedEventEnd,
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
    await stubDatadogUserLookup(page);

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
    await stubDatadogUserLookup(page);

    // Same throwaway load as above: Vite's dep optimizer reloads the first page
    // to pull a new dependency, which would land the module's request in the
    // wrong navigation's resource timeline.
    await page.goto(PAGE);
    await page.waitForLoadState("networkidle");

    await page.goto(PAGE);
    await expect(page.locator(".conv-search-float-btn")).toBeVisible();

    const timings = await readLoadTimings(page);

    // The mount script registers its idle callback while the deferred module
    // scripts are still running, and `DOMContentLoaded` is dispatched before the
    // browser yields to an idle period — so the request cannot start any earlier
    // than this, whatever the machine's speed.
    expect(timings.askAiModuleStartMs).not.toBeNull();
    expect(timings.askAiModuleStartMs).toBeGreaterThan(
      timings.domContentLoadedMs,
    );
  });

  test("keeps the disclaimer tooltip hidden until the info button is hovered", async ({
    page,
  }) => {
    await stubDatadogUserLookup(page);
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
    await stubDatadogUserLookup(page);
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
    await stubDatadogUserLookup(page);
    await page.goto(PAGE);

    // Two SearchBar islands hydrate on this page (the API side nav and the
    // mobile nav), and each mounts the widget itself rather than being handed a
    // handle. This is the only place that idempotency is observable.
    await expect(page.locator(".search-bar")).toHaveCount(2);

    const input = page.locator(".api-side-nav__search .search-bar__input");
    await input.click();
    // Under the widget's auto-submit threshold, so the query is prefilled and
    // never sent — this test makes no request to the AI backend.
    await input.fill("dashboard");

    const row = page.locator(".search-bar__ai-suggestion");
    await expect(row).toContainText("Ask AI about");
    await row.click();

    await expect(page.locator(".conv-search-sidebar.open")).toBeVisible();
    await expect(page.locator(".conv-search-input")).toHaveValue("dashboard");
    await expect(page.locator(".conv-search-sidebar")).toHaveCount(1);
  });
});
