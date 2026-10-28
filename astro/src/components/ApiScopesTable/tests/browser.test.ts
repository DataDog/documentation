import { test, expect, type Locator, type Page } from "@playwright/test";

test.describe("ApiScopesTable — visual", () => {
  test("matches screenshot", async ({ page }) => {
    await page.goto("/dd_e2e/components/api-scopes-table");
    const table = page.locator(".api-scopes-table").first();
    await expect(table).toHaveScreenshot("api-scopes-table.png");
  });
});

// The tests below run against the real scopes page: what matters is how an
// anchor jump interacts with the site's sticky header, which the e2e pages
// don't have.

const SCOPES_PATH = "/api/latest/scopes/";

/** The heading of the group section that holds the given anchor. */
function headingForAnchor(page: Page, id: string) {
  return page
    .locator(`.api-scopes-table__group:has(#${id})`)
    .locator(".api-scopes-table__heading");
}

/** True when the element at the heading's center is the heading itself, not
 * something (like the sticky header) painted over it. */
async function isUncovered(heading: Locator): Promise<boolean> {
  return heading.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const topmost = document.elementFromPoint(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
    );
    return topmost !== null && element.contains(topmost);
  });
}

test.describe("ApiScopesTable anchors", () => {
  for (const anchor of ["dashboards", "ci-visibility-git-hub-accounts"]) {
    test(`#${anchor} scrolls its heading into view, clear of the header`, async ({
      page,
    }) => {
      await page.goto(`${SCOPES_PATH}#${anchor}`, {
        waitUntil: "domcontentloaded",
      });
      const heading = headingForAnchor(page, anchor);

      await expect(heading).toBeInViewport();
      await expect.poll(() => isUncovered(heading)).toBe(true);
    });
  }
});

test.describe("Endpoint scope link", () => {
  test("lands on the endpoint's section of the scopes page", async ({
    page,
  }) => {
    await page.goto("/api/latest/dashboards/get-a-dashboard/", {
      waitUntil: "domcontentloaded",
    });

    await page
      .locator(".api-endpoint__oauth-scopes a", { hasText: "scope" })
      .first()
      .click();

    await expect(page).toHaveURL(/\/api\/latest\/scopes\/#dashboards$/);
    await expect(headingForAnchor(page, "dashboards")).toBeInViewport();
  });
});

test.describe("ApiScopesTable plaintext twin", () => {
  test("replaces the tag with tables on the scopes page's .md", async ({
    request,
  }) => {
    const response = await request.get("/api/latest/scopes.md");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).not.toContain("{% api-scopes");
    expect(body).toMatch(/^\| Scope name +\| Description +\|/m);
    // The scopes page passes headingLevel=2.
    expect(body).toMatch(/^## API Management/m);
  });

  test("prefixes endpoint links with the page's language", async ({
    request,
  }) => {
    const body = await (await request.get("/ja/api/latest/scopes.md")).text();

    expect(body).toMatch(/\]\([^)]*\/ja\/api\/latest\/[^)]+\.md#/);
  });
});
