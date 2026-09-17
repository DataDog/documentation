/**
 * End-to-end check that the four production API keys with `url_paths` really
 * produce the plaintext note when the routes run against real data.
 *
 * This lives in `tests/integration/` on purpose: the unit config redirects
 * `@shared/site_support.yaml` to a fixture of invented keys, so a unit test
 * could not tell whether the real paths resolve.
 */
import { describe, expect, it } from "vitest";
import { GET as categoryGET } from "../../src/pages/[...lang]/api/latest/[category].md";
import { getUnsupportedRegions } from "@config/siteSupport";

const SITE = new URL("https://docs.datadoghq.com");

function ctx(params: Record<string, string | undefined>, pathname: string) {
  return {
    params,
    url: new URL(pathname, SITE),
  } as unknown as Parameters<typeof categoryGET>[0];
}

const AFFECTED = ["agentless-scanning", "on-call", "workflow-automation"];

describe("site-support note on real API category pages", () => {
  it.each(AFFECTED)("resolves regions for /api/latest/%s", (slug) => {
    expect(getUnsupportedRegions(`/api/latest/${slug}`).length).toBeGreaterThan(
      0,
    );
  });

  it.each(AFFECTED)(
    "renders the note on the %s category page",
    async (slug) => {
      const pathname = `/api/latest/${slug}.md`;
      const res = (await categoryGET(
        ctx({ lang: undefined, category: slug }, pathname),
      )) as Response;
      expect(res.status).toBe(200);
      const body = await res.text();
      expect(body).toContain("{% callout %}");
      expect(body).toContain("not supported for the following sites");
    },
  );

  it("covers app-builder by its cascade path, not its key name", () => {
    // The key is `app_builder_override`; the path is `/api/latest/app-builder`.
    expect(
      getUnsupportedRegions("/api/latest/app-builder").length,
    ).toBeGreaterThan(0);
    expect(
      getUnsupportedRegions("/api/latest/app-builder/some-endpoint").length,
    ).toBeGreaterThan(0);
  });

  it("leaves an unaffected category alone", async () => {
    const pathname = "/api/latest/dashboards.md";
    const res = (await categoryGET(
      ctx({ lang: undefined, category: "dashboards" }, pathname),
    )) as Response;
    const body = await res.text();
    expect(body).not.toContain("not supported for the following sites");
  });
});
