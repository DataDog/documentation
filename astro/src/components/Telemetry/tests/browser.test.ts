import { test, expect } from "@playwright/test";

/**
 * Covers only what the unit tests cannot: that the bundled script actually
 * executes, assigns the globals, and respects the environment gate. The option
 * objects themselves are asserted in `src/lib/telemetry/initOptions.test.ts` —
 * RUM never initializes in development, so there is no end-to-end init to
 * observe here.
 */

const PAGE = "/api/latest/authentication/";

test.describe("Telemetry", () => {
  test("resolves its build-time constants, and throws nothing on load", async ({
    page,
  }) => {
    // The regression this guards against: a build-time constant referenced from
    // client code as a Vite `define` is replaced in the production build but
    // *not* under `astro dev`, where it reaches the browser as an undefined
    // identifier and throws before `init()` runs. Telemetry then silently does
    // nothing while both SDK globals still exist — the SDK bundles assign them
    // on import — so nothing else in this file would notice.
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto(PAGE);
    await expect
      .poll(() =>
        page.evaluate(() => window.DD_LOGS?.getInitConfiguration()?.service),
      )
      .toBe("docs");

    expect(pageErrors).toEqual([]);
  });

  // Weak on its own: the SDK packages assign these globals on import, so this
  // passes even if the script below the imports throws. The preceding test is
  // what makes it meaningful.
  test("assigns the SDK globals the Ask AI package depends on", async ({
    page,
  }) => {
    await page.goto(PAGE);

    // Deferred, so poll rather than reading once after load.
    await expect
      .poll(() =>
        page.evaluate(() => ({
          rum: typeof window.DD_RUM,
          logs: typeof window.DD_LOGS,
        })),
      )
      .toEqual({ rum: "object", logs: "object" });
  });

  test("exposes the API surface the Ask AI package calls, not just some object", async ({
    page,
  }) => {
    await page.goto(PAGE);
    await expect
      .poll(() => page.evaluate(() => typeof window.DD_RUM?.addAction))
      .toBe("function");

    expect(
      await page.evaluate(() => ({
        setGlobalContextProperty:
          typeof window.DD_RUM?.setGlobalContextProperty,
        getInternalContext: typeof window.DD_RUM?.getInternalContext,
        logger: typeof window.DD_LOGS?.logger?.info,
      })),
    ).toEqual({
      setGlobalContextProperty: "function",
      getInternalContext: "function",
      logger: "function",
    });
  });

  test("does not start a RUM session in development", async ({ page }) => {
    await page.goto(PAGE);
    await expect
      .poll(() => page.evaluate(() => typeof window.DD_RUM))
      .toBe("object");

    // `getInternalContext()` returns undefined until a session starts. The
    // development credentials carry no application ID, so RUM cannot init —
    // this is the assertion that proves the environment gate holds.
    expect(
      await page.evaluate(() => window.DD_RUM?.getInternalContext()),
    ).toBeUndefined();

    // No session cookie either. `_dd_s` is domain-scoped, so a stray session
    // here would be visible to every other site on the domain.
    const cookies = await page.context().cookies();
    expect(cookies.map((cookie) => cookie.name)).not.toContain("_dd_s");
  });

  test("initializes Browser Logs in development, routed to the console", async ({
    page,
  }) => {
    await page.goto(PAGE);
    // Poll on the init configuration rather than on the global: the script
    // assigns `window.DD_LOGS` before it calls `init()`, so the global existing
    // does not yet mean the SDK is configured.
    //
    // Logs initializes in every environment, unlike RUM.
    await expect
      .poll(() =>
        page.evaluate(() => window.DD_LOGS?.getInitConfiguration()?.service),
      )
      .toBe("docs");

    // The development credentials set the console handler, so a log call must
    // reach the console instead of the HTTP intake.
    const consoleMessages: string[] = [];
    page.on("console", (message) => consoleMessages.push(message.text()));
    await page.evaluate(() =>
      window.DD_LOGS?.logger.info("telemetry browser test"),
    );
    await expect
      .poll(() =>
        consoleMessages.some((text) => text.includes("telemetry browser test")),
      )
      .toBe(true);
  });

  test("does not set the device-ID cookie outside live", async ({ page }) => {
    await page.goto(PAGE);
    const cookies = await page.context().cookies();
    expect(cookies.map((cookie) => cookie.name)).not.toContain("_dd_device_id");
  });

  test("marks the environment on <html> for both hosts to read", async ({
    page,
  }) => {
    await page.goto(PAGE);
    await expect(page.locator("html")).toHaveAttribute(
      "data-env",
      "development",
    );
  });
});
