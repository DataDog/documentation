import { describe, it, expect, beforeAll } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from "@astrojs/preact/server.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeSnapshotHtml } from "../lib/normalizeSnapshotHtml";

import CategoryPage from "../../src/pages/[...lang]/api/latest/[category].astro";
import OperationPage from "../../src/pages/[...lang]/api/latest/[category]/[operation].astro";
import ChangelogPage from "../../src/pages/[...lang]/api/changelog/[...path].astro";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_DIR = path.join(__dirname, "api-html-snapshots");
const BASE_URL = "http://localhost:4321";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageComponent = any;

interface AuditPage {
  name: string;
  component: PageComponent;
  params: Record<string, string | undefined>;
  urlPath: string;
}

/**
 * Audit set. Each entry covers a meaningful rendering
 * variation of markup this project builds from the spec: category landing
 * pages are sampled at the page level, and one multi-version operation page
 * guards the per-op route's structure. Operation content is covered by the
 * fragment snapshots in `api-shape-snapshots.test.ts`. The
 * hand-written `.mdoc` pages are absent by design — Astro renders their
 * markup, so there is nothing here that a snapshot would protect.
 *
 * Pages render via AstroContainer against the frozen fixture in
 * tests/fixtures/api/ (wired by the frozen-api-spec plugin in
 * vitest.unit.config.ts), so snapshots are stable across live spec updates.
 */
const AUDIT_PAGES: AuditPage[] = [
  // Page structure only. The shape snapshots cover operation content, so
  // operation pages are limited to the multi-version case.
  {
    name: "05-authentication-landing",
    component: CategoryPage,
    params: { category: "authentication" },
    urlPath: "/api/latest/authentication/",
  },

  // aws-integration: multi-version case — v1 and v2 share one page.
  {
    name: "08-aws-integration-landing",
    component: CategoryPage,
    params: { category: "aws-integration" },
    urlPath: "/api/latest/aws-integration/",
  },
  {
    name: "08-aws-integration-list",
    component: OperationPage,
    params: {
      category: "aws-integration",
      operation: "list-all-aws-integrations",
    },
    urlPath: "/api/latest/aws-integration/list-all-aws-integrations/",
  },

  // dashboard-lists: v1 tag has x-deprecated, which the category page ignores.
  {
    name: "10-dashboard-lists-landing",
    component: CategoryPage,
    params: { category: "dashboard-lists" },
    urlPath: "/api/latest/dashboard-lists/",
  },

  // screenboards: empty category (no operations to sample).
  {
    name: "11-screenboards-landing",
    component: CategoryPage,
    params: { category: "screenboards" },
    urlPath: "/api/latest/screenboards/",
  },

  // The changelog landing page, from tests/fixtures/api/changelog/.
  {
    name: "13-changelog",
    component: ChangelogPage,
    params: {},
    urlPath: "/api/changelog/",
  },
];

/**
 * Slice the document down to its `<main>` element. The surrounding chrome
 * (side nav listing every operation, inline scripts/styles, footer) is
 * identical across pages and dwarfs the per-page content — keeping it would
 * mean every snapshot carries ~600KB of noise that never varies between the
 * pages we're auditing.
 */
function extractMain(html: string): string {
  const start = html.search(/<main\b/);
  const endTag = "</main>";
  const end = html.lastIndexOf(endTag);
  if (start === -1 || end === -1 || end < start) {
    throw new Error("Could not locate <main>...</main> in rendered page");
  }
  return html.slice(start, end + endTag.length);
}

/**
 * Pull the SEO tags out of `<head>`: the title, the description/social `<meta>`
 * tags, and the canonical/alternate `<link>`s. The rest of the head (fonts,
 * scripts, styles) is shared chrome, dropped for the same reason as in
 * `extractMain`.
 */
function extractSeoHead(html: string): string {
  const head = html.slice(0, html.search(/<\/head>/));
  const seoTags = head.match(
    /<title>[^<]*<\/title>|<meta\s+(?:name|property|itemprop)=[^>]*>|<link\s+rel="(?:canonical|alternate)"[^>]*>/g,
  );
  if (!seoTags) {
    throw new Error("Could not locate SEO tags in rendered <head>");
  }
  return `<head>${seoTags.join("")}</head>`;
}

/**
 * Pull out the visually hidden hint that points AI agents at the page's `.md`
 * twin. It sits outside `<main>`, so `extractMain` alone would drop it.
 */
function extractAgentHint(html: string): string {
  const hint = html.match(
    /<div class="[^"]*\bagent-hint\b[^"]*"[^>]*>[\s\S]*?<\/div>/,
  );
  if (!hint) {
    throw new Error("Could not locate the agent hint in rendered <body>");
  }
  return hint[0];
}

describe("API page HTML snapshots", () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
    container.addServerRenderer({
      renderer: preactRenderer,
      name: "@astrojs/preact",
    });
  });

  for (const page of AUDIT_PAGES) {
    // Rendering complex pages and running Prettier can exceed the default 5s
    // timeout — especially for operation pages with large schema tables.
    it(`${page.name} (${page.urlPath}) matches snapshot`, async () => {
      const html = await container.renderToString(page.component, {
        params: page.params,
        request: new Request(`${BASE_URL}${page.urlPath}`),
      });
      const normalized = await normalizeSnapshotHtml(
        extractSeoHead(html) + extractAgentHint(html) + extractMain(html),
      );
      await expect(normalized).toMatchFileSnapshot(
        path.join(SNAPSHOT_DIR, `${page.name}.html`),
      );
    }, 60_000);
  }
});
