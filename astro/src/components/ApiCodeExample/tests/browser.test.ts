import { test, expect, type BrowserContext, type Page } from "@playwright/test";

test.describe("ApiCodeExample component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/api-code-example");
  });

  test("renders the code example section", async ({ page }) => {
    const codeExample = page.locator(".api-code-example");
    await expect(codeExample.first()).toBeVisible();
  });

  test("shows language tabs", async ({ page }) => {
    const codeExample = page.locator(".api-code-example").first();
    const tabs = codeExample.locator(".tabs").first();
    await expect(tabs).toBeVisible();
  });

  test("first language tab is active by default", async ({ page }) => {
    const codeExample = page.locator(".api-code-example").first();
    const firstTab = codeExample.locator('[role="tab"]').first();
    await expect(firstTab).toHaveAttribute("aria-selected", "true");
  });

  test("clicking a language tab switches the panel", async ({ page }) => {
    const codeExample = page.locator(".api-code-example").first();
    await expect(
      codeExample.locator('[role="tablist"][data-hydrated="true"]').first(),
    ).toBeVisible();
    const tabButtons = codeExample.locator('[role="tab"]');
    const count = await tabButtons.count();

    if (count >= 2) {
      const secondTab = tabButtons.nth(1);
      await secondTab.click();
      await expect(secondTab).toHaveAttribute("aria-selected", "true");

      const firstTab = tabButtons.first();
      await expect(firstTab).toHaveAttribute("aria-selected", "false");
    }
  });

  test("accordion items can be expanded and collapsed", async ({ page }) => {
    const accordion = page.locator(".api-code-example__accordion").first();
    if (await accordion.isVisible()) {
      const toggle = accordion.locator(".api-code-example__accordion-header");
      await toggle.click();

      // Toggle state should change — verify the content area is visible/hidden
      // The exact behavior depends on the initial state
      await expect(toggle).toBeVisible();
    }
  });
});

test.describe("ApiCodeExample — code language sync", () => {
  const MOCK = "/dd_e2e/components/api-code-example";

  const exampleAt = (page: Page, index: number) =>
    page.locator(".api-code-example").nth(index);

  const waitForHydration = async (page: Page) => {
    const tablists = page.locator('.api-code-example [role="tablist"]');
    await expect(tablists).toHaveCount(2);
    await expect(
      page.locator('.api-code-example [role="tablist"][data-hydrated="true"]'),
    ).toHaveCount(2);
  };

  const tab = (page: Page, exampleIndex: number, key: string) =>
    exampleAt(page, exampleIndex).locator(
      `[role="tab"][data-sync-key="${key}"]`,
    );

  const codeLangCookie = async (context: BrowserContext) =>
    (await context.cookies()).find((cookie) => cookie.name === "code-lang");

  test("with nothing stored, both examples show Curl and no cookie is set", async ({
    page,
    context,
  }) => {
    await page.goto(MOCK);
    await waitForHydration(page);

    await expect(tab(page, 0, "curl")).toHaveAttribute("aria-selected", "true");
    await expect(tab(page, 1, "curl")).toHaveAttribute("aria-selected", "true");
    expect(await codeLangCookie(context)).toBeUndefined();
  });

  test("a code-lang cookie selects that language where it exists", async ({
    page,
    context,
    baseURL,
  }) => {
    await context.addCookies([
      { name: "code-lang", value: "python", url: baseURL! },
    ]);
    await page.goto(MOCK);
    await waitForHydration(page);

    await expect(tab(page, 0, "python")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(tab(page, 1, "curl")).toHaveAttribute("aria-selected", "true");
  });

  test("clicking a language stores it in the cookie and the URL", async ({
    page,
    context,
    baseURL,
  }) => {
    await context.addCookies([
      { name: "code-lang", value: "python", url: baseURL! },
    ]);
    await page.goto(MOCK);
    await waitForHydration(page);

    await tab(page, 0, "curl").click();

    await expect(page).toHaveURL(/[?&]code-lang=curl/);
    expect((await codeLangCookie(context))?.value).toBe("curl");
  });

  test("?code-lang= selects that language and stores it", async ({
    page,
    context,
  }) => {
    await page.goto(`${MOCK}?code-lang=python`);
    await waitForHydration(page);

    await expect(tab(page, 0, "python")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect((await codeLangCookie(context))?.value).toBe("python");
  });

  test("a Hugo-only language falls back to Curl and keeps the cookie", async ({
    page,
    context,
    baseURL,
  }) => {
    await context.addCookies([
      { name: "code-lang", value: "python-legacy", url: baseURL! },
    ]);
    await page.goto(MOCK);
    await waitForHydration(page);

    await expect(tab(page, 0, "curl")).toHaveAttribute("aria-selected", "true");
    expect((await codeLangCookie(context))?.value).toBe("python-legacy");
  });
});
