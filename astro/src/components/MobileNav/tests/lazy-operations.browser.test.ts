import { test, expect, type Page } from "@playwright/test";

// The mobile nav only renders below the 992px breakpoint.
test.use({ viewport: { width: 390, height: 844 } });

const CATEGORY_URL = "/api/latest/action-connection/";
const DATA_URL_PATTERN = "**/api/mobile-nav.json";

interface MobileNavData {
  categories: {
    slug: string;
    href: string;
    operations: { slug: string; summary: string }[];
  }[];
}

/** Open the overlay once the hamburger and lazy-loading islands are live. */
async function openMobileNav(page: Page) {
  await page.locator('.mobile-nav__list--api[data-hydrated="true"]').waitFor({
    state: "attached",
  });
  await page.locator('.mobile-nav__hamburger[data-hydrated="true"]').click();
  await expect(
    page.locator("#mobile-nav.mobile-nav__panel--open"),
  ).toBeVisible();
}

function lazyList(page: Page, slug?: string) {
  const selector = slug
    ? `ul[data-category-slug="${slug}"]`
    : "ul[data-category-slug]";
  return page.locator(`.mobile-nav__list--api ${selector}`).first();
}

/** The summary that expands the given lazy list. */
function summaryFor(page: Page, slug: string) {
  return page.locator(
    `.mobile-nav__list--api details:has(> ul[data-category-slug="${slug}"]) > summary`,
  );
}

async function firstLazySlug(page: Page): Promise<string> {
  const slug = await lazyList(page).getAttribute("data-category-slug");
  expect(slug).toBeTruthy();
  return slug as string;
}

test.describe("Mobile nav lazy-loaded API operations", () => {
  test("expanding a non-active category shows working operation links", async ({
    page,
  }) => {
    const dataResponse = page.waitForResponse(DATA_URL_PATTERN);
    await page.goto(CATEGORY_URL);
    const data = (await (await dataResponse).json()) as MobileNavData;
    await openMobileNav(page);

    const slug = await firstLazySlug(page);
    const category = data.categories.find(
      (candidate) => candidate.slug === slug,
    )!;
    await summaryFor(page, slug).click();

    const links = lazyList(page, slug).locator("a.mobile-nav__link");
    await expect(links).toHaveCount(category.operations.length);
    const firstHref = `${category.href}${category.operations[0].slug}/`;
    await expect(links.first()).toHaveAttribute("href", firstHref);
    await expect(links.first()).toBeVisible();

    await links.first().click();
    await expect(page).toHaveURL(new RegExp(`${firstHref}$`));
    await expect(
      page.locator(".mobile-nav__list--api .mobile-nav__link--active"),
    ).toHaveAttribute("href", firstHref);
  });

  test("shows a loading row until delayed data arrives", async ({ page }) => {
    let releaseData!: () => void;
    const dataReleased = new Promise<void>((resolve) => {
      releaseData = resolve;
    });
    await page.route(DATA_URL_PATTERN, async (route) => {
      await dataReleased;
      await route.continue();
    });

    await page.goto(CATEGORY_URL);
    await openMobileNav(page);
    const slug = await firstLazySlug(page);
    await summaryFor(page, slug).click();

    const list = lazyList(page, slug);
    await expect(list).toHaveAttribute("aria-busy", "true");
    await expect(list.locator("li")).toHaveCount(1);
    await expect(list.locator("a")).toHaveCount(0);
    await expect(list.locator(".mobile-nav__link")).toBeVisible();

    releaseData();
    await expect(list).toHaveAttribute("data-lazy-state", "loaded");
    await expect(list).not.toHaveAttribute("aria-busy");
    await expect(list.locator("a.mobile-nav__link").first()).toBeVisible();
  });

  test("falls back to the category page link when the data can't load", async ({
    page,
  }) => {
    await page.route(DATA_URL_PATTERN, (route) => route.abort());

    await page.goto(CATEGORY_URL);
    await openMobileNav(page);
    const slug = await firstLazySlug(page);
    const categoryHref = await lazyList(page, slug).getAttribute(
      "data-category-href",
    );
    await summaryFor(page, slug).click();

    const list = lazyList(page, slug);
    await expect(list).toHaveAttribute("data-lazy-state", "failed");
    const fallback = list.locator("a.mobile-nav__link");
    await expect(fallback).toHaveCount(1);
    await expect(fallback).toHaveAttribute("href", categoryHref!);
    await expect(fallback).toBeVisible();
  });

  test("renders the largest category within budget on a throttled CPU", async ({
    page,
  }) => {
    const dataResponse = page.waitForResponse(DATA_URL_PATTERN);
    await page.goto(CATEGORY_URL);
    const data = (await (await dataResponse).json()) as MobileNavData;
    await openMobileNav(page);

    // Expand a small category first, so the data is known to be parsed and
    // cached before the timed expand.
    const warmupSlug = await firstLazySlug(page);
    await summaryFor(page, warmupSlug).click();
    await expect(lazyList(page, warmupSlug)).toHaveAttribute(
      "data-lazy-state",
      "loaded",
    );

    const largestCategory = data.categories
      .filter((category) => category.slug !== "action-connection")
      .reduce((largest, category) =>
        category.operations.length > largest.operations.length
          ? category
          : largest,
      );

    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

    // With the data cached, the island renders synchronously in the click
    // handler, so the click call spans the whole render.
    const elapsedMs = await page.evaluate((slug) => {
      const list = document.querySelector(
        `.mobile-nav__list--api ul[data-category-slug="${slug}"]`,
      )!;
      const summary = list.parentElement!.querySelector("summary")!;
      const start = performance.now();
      summary.click();
      const elapsed = performance.now() - start;
      if (list.getAttribute("data-lazy-state") !== "loaded") {
        throw new Error(`Category ${slug} did not render synchronously`);
      }
      return elapsed;
    }, largestCategory.slug);

    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });

    await expect(
      lazyList(page, largestCategory.slug).locator("a.mobile-nav__link"),
    ).toHaveCount(largestCategory.operations.length);
    test.info().annotations.push({
      type: "render-ms",
      description: `${largestCategory.slug} (${largestCategory.operations.length} operations): ${elapsedMs.toFixed(1)} ms at 4x CPU throttle`,
    });
    expect(elapsedMs).toBeLessThan(50);
  });
});

test.describe("Mobile nav lazy-loaded API operations at desktop width", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("doesn't request the data", async ({ page }) => {
    const dataRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/api/mobile-nav.json")) {
        dataRequests.push(request.url());
      }
    });

    await page.goto(CATEGORY_URL);
    // The island decides whether to prefetch in the same effect that marks the
    // list hydrated, so any request would already have been issued.
    await page
      .locator('.mobile-nav__list--api[data-hydrated="true"]')
      .waitFor({ state: "attached" });
    await page.waitForLoadState("networkidle");
    expect(dataRequests).toEqual([]);
  });

  test("requests the data when the viewport narrows to mobile", async ({
    page,
  }) => {
    await page.goto(CATEGORY_URL);
    await page
      .locator('.mobile-nav__list--api[data-hydrated="true"]')
      .waitFor({ state: "attached" });

    const dataRequest = page.waitForRequest(DATA_URL_PATTERN);
    await page.setViewportSize({ width: 390, height: 844 });
    await dataRequest;
  });
});
