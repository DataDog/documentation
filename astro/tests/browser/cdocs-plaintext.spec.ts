import { test, expect } from "@playwright/test";

// The plaintext (`.md`) twin of a cdoc: the HTML page links to it and the Copy
// button loads it, and the endpoint returns filter-resolved `text/markdown`.
const CDOC_URL = "/dd_e2e/cdocs/custom_instrumentation/";
const MAIN_COPY_BUTTON = ".copy-page-button:not(.copy-page-button--icon)";

test.describe("cdocs plaintext (.md)", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("the page links to the .md version, preserving the filter query", async ({
    page,
  }) => {
    await page.goto(`${CDOC_URL}?prog_lang=python&api_type=dd_api`);
    const link = page.locator(".cdoc-rightnav__plaintext-link");
    await expect(link).toHaveAttribute(
      "href",
      "/dd_e2e/cdocs/custom_instrumentation.md?prog_lang=python&api_type=dd_api",
    );
  });

  test("the .md endpoint returns filter-resolved text/markdown", async ({
    request,
  }) => {
    const response = await request.get(
      "/dd_e2e/cdocs/custom_instrumentation.md?prog_lang=python&api_type=dd_api",
    );
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/markdown");

    const body = await response.text();
    // Datadog API + Python content is kept; Java and OTel content is dropped.
    expect(body).toContain("ddtrace");
    expect(body).not.toContain("io.opentelemetry");
    expect(body).not.toContain("DD_TRACE_OTEL_ENABLED");
    // HTML comments and unmatched conditionals are gone.
    expect(body).not.toContain("<!--");
  });

  test("the .md endpoint lists the other variants below the title", async ({
    request,
  }) => {
    const response = await request.get(
      "/dd_e2e/cdocs/custom_instrumentation.md?prog_lang=python&api_type=dd_api",
    );
    const body = await response.text();

    expect(body).toContain(
      "This version is for Language: Python, API: Datadog.",
    );
    expect(body).toContain("- Python (this version)");
    expect(body).toContain(
      "- [Java](/dd_e2e/cdocs/custom_instrumentation.md?api_type=dd_api&prog_lang=java): Language: Java, API: Datadog",
    );
    expect(body).toContain(
      "- [OpenTelemetry](/dd_e2e/cdocs/custom_instrumentation.md?api_type=otel_api&prog_lang=python): Language: Python, API: OpenTelemetry",
    );
    // The list comes right after the title, before the page content.
    expect(body.indexOf("This page has a version")).toBeLessThan(
      body.indexOf("## Overview"),
    );
  });

  test("links to other Cdocs pages get the params they accept", async ({
    request,
  }) => {
    const response = await request.get(
      "/dd_e2e/cdocs/custom_instrumentation.md?prog_lang=python&api_type=dd_api",
    );
    const body = await response.text();

    // The API support page accepts `prog_lang` but not `api_type`.
    expect(body).toContain(
      "[OpenTelemetry API support](/dd_e2e/cdocs/api_support.md?prog_lang=python)",
    );
  });

  test("links to other Cdocs pages leave out values those pages don't offer", async ({
    request,
  }) => {
    const response = await request.get(
      "/dd_e2e/cdocs/custom_instrumentation.md?prog_lang=cpp&platform=metrics",
    );
    const body = await response.text();

    // The API support page has no C++ option, but it does have Metrics.
    expect(body).toContain(
      "[OpenTelemetry API support](/dd_e2e/cdocs/api_support.md?platform=metrics)",
    );
  });

  test("links to other Cdocs pages stay bare without params", async ({
    request,
  }) => {
    const response = await request.get(
      "/dd_e2e/cdocs/custom_instrumentation.md",
    );
    const body = await response.text();

    expect(body).toContain(
      "[OpenTelemetry API support](/dd_e2e/cdocs/api_support.md)",
    );
  });

  test("a .md path with no matching entry 404s", async ({ request }) => {
    const response = await request.get("/this/is/not/a/page.md");
    expect(response.status()).toBe(404);
  });

  test("the Copy button copies the plaintext to the clipboard", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(`${CDOC_URL}?prog_lang=python&api_type=dd_api`);
    // Chromium rejects clipboard writes from an unfocused document, so make
    // sure this page owns focus before clicking (parallel workers otherwise
    // leave it in the background).
    await page.bringToFront();

    const button = page.locator(MAIN_COPY_BUTTON);
    await expect(button).toHaveAttribute("data-hydrated", "true", {
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
      button.locator(".copy-page-button__label-text--visible"),
    ).toHaveText("Copied");
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain("ddtrace");
    expect(clipboard).not.toContain("io.opentelemetry");
  });
});
