import { test, expect } from "@playwright/test";
import { chooseSelectOption } from "@components/Select/tests/chooseSelectOption";

test.describe("LanguageSelector — lang_pref cookie", () => {
  test("switching to English overwrites a French lang_pref cookie", async ({
    page,
    context,
    baseURL,
  }) => {
    await context.addCookies([
      { name: "lang_pref", value: "fr", url: baseURL! },
    ]);
    await page.goto("/fr/api/latest/authentication/");
    const selector = page.locator('.language-selector[data-hydrated="true"]');

    await chooseSelectOption(selector, "en");

    await page.waitForURL(/\/api\/latest\/authentication\/$/);
    expect(new URL(page.url()).pathname).toBe("/api/latest/authentication/");
    const cookies = await context.cookies();
    expect(cookies.find((cookie) => cookie.name === "lang_pref")?.value).toBe(
      "en",
    );
  });
});
