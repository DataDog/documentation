/**
 * End-to-end check that the real `url_paths` on API category pages produce the
 * plaintext note when the routes run against real data.
 *
 * The cases come from the dataset itself, so adding, removing or renaming a
 * key's `url_paths` needs no edit here.
 *
 * This lives in `tests/integration/` on purpose: the unit config redirects
 * `@shared/site_support.yaml` to a fixture of invented keys, so a unit test
 * could not tell whether the real paths resolve.
 */
import { describe, expect, it } from "vitest";
import { GET as categoryGET } from "../../src/pages/[...lang]/api/latest/[category].md";
import {
  getSiteSupportDataset,
  getUnsupportedRegions,
} from "@config/siteSupport";

const SITE = new URL("https://docs.datadoghq.com");

/** Matches a `url_paths` entry that names one whole API category page. */
const CATEGORY_PATH = /^\/api\/latest\/([a-z0-9-]+)$/;

function ctx(params: Record<string, string | undefined>, pathname: string) {
  return {
    params,
    url: new URL(pathname, SITE),
    site: SITE,
  } as unknown as Parameters<typeof categoryGET>[0];
}

async function renderCategory(slug: string): Promise<Response> {
  const pathname = `/api/latest/${slug}.md`;
  return (await categoryGET(
    ctx({ lang: undefined, category: slug }, pathname),
  )) as Response;
}

/**
 * Every API category a key claims through `url_paths`, with whether the key
 * also cascades to the category's operation pages.
 */
function collectCoveredCategories(): { slug: string; cascades: boolean }[] {
  return Object.values(getSiteSupportDataset().site_support_ids).flatMap(
    (entry) =>
      entry.url_paths.flatMap((pattern) => {
        const slug = CATEGORY_PATH.exec(pattern)?.[1];
        if (!slug) return [];
        const cascades = entry.url_paths.includes(`/api/latest/${slug}/**`);
        return [{ slug, cascades }];
      }),
  );
}

const coveredCategories = collectCoveredCategories();

describe("site-support note on real API category pages", () => {
  it.each(coveredCategories)(
    "renders the note on the $slug category page",
    async ({ slug }) => {
      expect(
        getUnsupportedRegions(`/api/latest/${slug}`).length,
      ).toBeGreaterThan(0);
      const res = await renderCategory(slug);
      expect(res.status).toBe(200);
      const body = await res.text();
      expect(body).toContain("{% callout %}");
      expect(body).toContain("not supported for the following sites");
    },
  );

  it.each(coveredCategories.filter(({ cascades }) => cascades))(
    "cascades to the $slug operation pages",
    ({ slug }) => {
      expect(
        getUnsupportedRegions(`/api/latest/${slug}/some-endpoint`).length,
      ).toBeGreaterThan(0);
    },
  );

  it("leaves an unaffected category alone", async () => {
    // Picks the first real category no `url_paths` entry claims, rather than
    // naming one, so marking any given category unsupported can't break this.
    const { getCategoryStubsView } = await import("@lib/api/viewsBuilder");
    const unaffected = (await getCategoryStubsView("en")).find(
      (category) =>
        getUnsupportedRegions(`/api/latest/${category.slug}`).length === 0,
    );
    expect(unaffected).toBeDefined();

    const res = await renderCategory(unaffected!.slug);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).not.toContain("not supported for the following sites");
    // Building the category list parses the full live API spec, which can
    // exceed the default timeout when the whole suite runs at once. The
    // headroom is for that contention, not for slow work.
  }, 120_000);
});
