import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { APIRoute } from "astro";

import { GET as landingGET } from "../../src/pages/[...lang]/api/latest.md";
import { GET as categoryGET } from "../../src/pages/[...lang]/api/latest/[category].md";
import { GET as operationGET } from "../../src/pages/[...lang]/api/latest/[category]/[operation].md";
import { GET as subPageGET } from "../../src/pages/[...lang]/api/latest/[...page].md";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_DIR = path.join(__dirname, "api-plaintext-snapshots");
const SITE = new URL("https://docs.datadoghq.com");

interface AuditPage {
  name: string;
  handler: APIRoute;
  params: Record<string, string | undefined>;
  urlPath: string;
}

function categoryPage(name: string, category: string): AuditPage {
  return {
    name,
    handler: categoryGET,
    params: { category },
    urlPath: `/api/latest/${category}.md`,
  };
}

function operationPage(
  name: string,
  category: string,
  operation: string,
): AuditPage {
  return {
    name,
    handler: operationGET,
    params: { category, operation },
    urlPath: `/api/latest/${category}/${operation}.md`,
  };
}

/**
 * Audit set: the plaintext twins of the pages in `api-html-snapshots.test.ts`,
 * under the same names so a rendering change can be compared across both, plus
 * the API landing page and one hand-written sub-page. Unlike the HTML audit,
 * the sub-page is included: its plaintext goes through this project's own
 * parse/format pipeline, not Astro's renderer.
 *
 * Spec-generated pages render against the frozen fixture in tests/fixtures/api/
 * (wired by the frozen-api-spec plugin in vitest.unit.config.ts). The landing
 * and sub-page frontmatter, and the sub-page body, come from the real `en`
 * content collection, so those two snapshots change when that content does.
 */
const AUDIT_PAGES: AuditPage[] = [
  {
    name: "01-api-landing",
    handler: landingGET,
    params: {},
    urlPath: "/api/latest.md",
  },
  {
    name: "02-rate-limits",
    handler: subPageGET,
    params: { page: "rate-limits" },
    urlPath: "/api/latest/rate-limits.md",
  },

  // One landing page + one representative operation per dynamic category.
  categoryPage("05-authentication-landing", "authentication"),
  operationPage(
    "05-authentication-validate-api-key",
    "authentication",
    "validate-api-key",
  ),

  categoryPage("06-dashboards-landing", "dashboards"),
  operationPage(
    "06-dashboards-get-a-dashboard",
    "dashboards",
    "get-a-dashboard",
  ),

  categoryPage("07-incidents-landing", "incidents"),
  operationPage(
    "07-incidents-create-an-incident",
    "incidents",
    "create-an-incident",
  ),

  // aws-integration: multi-version case — v1 and v2 share one page.
  categoryPage("08-aws-integration-landing", "aws-integration"),
  operationPage(
    "08-aws-integration-list",
    "aws-integration",
    "list-all-aws-integrations",
  ),

  categoryPage("09-monitors-landing", "monitors"),
  operationPage("09-monitors-create-a-monitor", "monitors", "create-a-monitor"),

  // dashboard-lists: category-level deprecation (with endpoints).
  categoryPage("10-dashboard-lists-landing", "dashboard-lists"),
  operationPage(
    "10-dashboard-lists-get-all-dashboard-lists",
    "dashboard-lists",
    "get-all-dashboard-lists",
  ),

  // screenboards: empty deprecated category (no operations to sample).
  categoryPage("11-screenboards-landing", "screenboards"),

  categoryPage("12-usage-metering-landing", "usage-metering"),
  operationPage(
    "12-usage-metering-get-hourly-usage-for-lambda",
    "usage-metering",
    "get-hourly-usage-for-lambda",
  ),
];

/** Calls the route the way the build does for an English page. */
async function renderPlaintext(page: AuditPage): Promise<string> {
  const context = {
    params: { lang: undefined, ...page.params },
    url: new URL(page.urlPath, SITE),
    site: SITE,
  } as unknown as Parameters<APIRoute>[0];
  const response = (await page.handler(context)) as Response;
  expect(response.status).toBe(200);
  return response.text();
}

describe("API page plaintext snapshots", () => {
  for (const page of AUDIT_PAGES) {
    // Operation pages with large schema tables can exceed the default timeout.
    it(`${page.name} (${page.urlPath}) matches snapshot`, async () => {
      const plaintext = await renderPlaintext(page);
      await expect(plaintext).toMatchFileSnapshot(
        path.join(SNAPSHOT_DIR, `${page.name}.md`),
      );
    }, 60_000);
  }
});
