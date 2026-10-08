import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

test.describe("SearchBar component — visual", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/search-bar");
  });

  // Scope to the standalone demo bar inside `.prose`; the header's mobile-nav
  // SearchBar is also `.search-bar` but lives outside the page content.
  test("closed state matches screenshot", async ({ page }) => {
    const bar = page.locator(".prose .search-bar").first();
    await expect(bar).toBeVisible();
    await expect(bar).toHaveScreenshot("search-bar-closed.png");
  });

  test("focused but empty state does not show the popup", async ({ page }) => {
    const bar = page.locator(".prose .search-bar").first();
    const input = bar.locator(".search-bar__input");
    await input.click();
    await expect(bar.locator(".search-bar__popup")).toHaveCount(0);
  });

  test("renders the side-nav placement on API pages", async ({ page }) => {
    await page.goto("/api/latest/");
    const sidenavSearch = page
      .locator(".api-side-nav__search .search-bar")
      .first();
    await expect(sidenavSearch).toBeVisible();
  });
});

test.describe("SearchBar component — mobile-nav placement", () => {
  // The mobile nav only renders below 992px; the desktop default viewport hides
  // it. A real browser is needed here because the search bar lives behind the
  // hamburger toggle and the overlay's slide-in transition.
  test.use({ viewport: { width: 480, height: 800 } });

  test("the mobile nav exposes a functional search bar when opened", async ({
    page,
  }) => {
    await page.goto("/dd_e2e/components/header");

    // The search bar is inside the closed (off-screen) overlay until opened.
    const mobileSearch = page
      .locator(".mobile-nav__search .search-bar")
      .first();
    const input = mobileSearch.locator(".search-bar__input");

    // Wait for the toggle island to hydrate so the click can't race its handler.
    await page.locator('.navbar-toggler[data-hydrated="true"]').click();
    await expect(
      page.locator("#mobile-nav.mobile-nav__panel--open"),
    ).toBeVisible();

    await expect(mobileSearch).toBeVisible();
    await input.click();
    await expect(input).toBeFocused();
    // Empty query shows no popup (mirrors the side-nav behavior).
    await expect(page.locator(".search-bar__popup")).toHaveCount(0);
  });
});

// --- `?s=` URL sync -------------------------------------------------------
//
// Covers what unit tests can't: a real reload, real history, and the 992px
// `display: none` rules that the resize cases depend on.
// See `plans/27_search_url_sync.md`.

/** Serve the search fixture instead of querying Typesense. */
const searchFixture = readFileSync(
  fileURLToPath(
    new URL("../__fixtures__/typesense_basic.json", import.meta.url),
  ),
  "utf8",
);

async function stubSearch(page: Page) {
  await page.route("**/multi_search**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: searchFixture,
    });
  });
}

const hydratedSideNavBar = ".api-side-nav__search .search-bar[data-hydrated]";

test.describe("SearchBar — `?s=` URL sync", () => {
  test.beforeEach(async ({ page }) => {
    await stubSearch(page);
  });

  test("restores the query and its results from `?s=` on load", async ({
    page,
  }) => {
    await page.goto("/api/latest/?s=dashboard");

    const input = page.locator(`${hydratedSideNavBar} .search-bar__input`);
    await expect(input).toHaveValue("dashboard");
    await expect(page.locator(".search-bar__popup")).toBeVisible();
    await expect(page.locator(".search-hit").first()).toBeVisible();
  });

  test("does not steal focus on restore", async ({ page }) => {
    await page.goto("/api/latest/?s=dashboard");
    const input = page.locator(`${hydratedSideNavBar} .search-bar__input`);
    await expect(input).toHaveValue("dashboard");
    await expect(input).not.toBeFocused();
  });

  test("survives a reload: the query and results come back", async ({
    page,
  }) => {
    await page.goto("/api/latest/");
    const input = page.locator(`${hydratedSideNavBar} .search-bar__input`);
    await input.fill("dashboard");

    await expect(page).toHaveURL(/[?&]s=dashboard/);

    await page.reload();
    await expect(
      page.locator(`${hydratedSideNavBar} .search-bar__input`),
    ).toHaveValue("dashboard");
    await expect(page.locator(".search-bar__popup")).toBeVisible();
  });

  test("Back returns to the searched URL, with the query restored", async ({
    page,
  }) => {
    await page.goto("/api/latest/");
    await page
      .locator(`${hydratedSideNavBar} .search-bar__input`)
      .fill("dashboard");
    await expect(page).toHaveURL(/[?&]s=dashboard/);

    await page.goto("/api/latest/action-connection/");
    await page.goBack();

    // `?s=` is written with replaceState, so the searched URL replaced the
    // clean one and Back lands on it, with the query restored.
    await expect(page).toHaveURL(/[?&]s=dashboard/);
    await expect(
      page.locator(`${hydratedSideNavBar} .search-bar__input`),
    ).toHaveValue("dashboard");
  });

  test("the popup does not survive the viewport crossing 992px", async ({
    page,
  }) => {
    await page.goto("/api/latest/?s=dashboard");
    await expect(page.locator(".search-bar__popup")).toBeVisible();

    // Without the rect guard in usePopupPosition, a zero-width popup stays
    // pinned to the top-left corner.
    await page.setViewportSize({ width: 480, height: 800 });
    await expect(page.locator(".search-bar__popup")).toHaveCount(0);
  });

  test("carries the query from the side nav into the mobile nav on shrink", async ({
    page,
  }) => {
    await page.goto("/api/latest/");
    await page
      .locator(`${hydratedSideNavBar} .search-bar__input`)
      .fill("dashboard");

    await page.setViewportSize({ width: 480, height: 800 });
    await page.locator('.navbar-toggler[data-hydrated="true"]').click();
    await expect(
      page.locator("#mobile-nav.mobile-nav__panel--open"),
    ).toBeVisible();

    // The drawer's input already holds the query, because the two islands
    // mirror each other as the user types.
    await expect(
      page.locator(".mobile-nav__search .search-bar__input"),
    ).toHaveValue("dashboard");
    await expect(page).toHaveURL(/[?&]s=dashboard/);
  });
});

test.describe("SearchBar — `?s=` URL sync at a phone viewport", () => {
  test.use({ viewport: { width: 480, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await stubSearch(page);
  });

  test("restores the text into the closed drawer without painting a popup", async ({
    page,
  }) => {
    await page.goto("/api/latest/?s=dashboard");

    const input = page.locator(".mobile-nav__search .search-bar__input");
    await expect(input).toHaveValue("dashboard");
    await expect(page.locator(".search-bar__popup")).toHaveCount(0);
  });

  test("carries the query from the mobile nav into the side nav on widen", async ({
    page,
  }) => {
    await page.goto("/api/latest/");
    await page.locator('.navbar-toggler[data-hydrated="true"]').click();
    await expect(
      page.locator("#mobile-nav.mobile-nav__panel--open"),
    ).toBeVisible();

    await page
      .locator(".mobile-nav__search .search-bar__input")
      .fill("dashboard");
    await expect(page).toHaveURL(/[?&]s=dashboard/);

    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(
      page.locator(`${hydratedSideNavBar} .search-bar__input`),
    ).toHaveValue("dashboard");
  });
});
