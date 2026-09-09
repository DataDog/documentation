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
