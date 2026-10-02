import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ApiEndpoint from "../ApiEndpoint.astro";
import { getAllowedRegions } from "@config/regions";

const endpointWithTwoRegions = {
  operationId: "testOp",
  summary: "Test endpoint",
  slug: "test-endpoint",
  method: "GET",
  path: "/api/v1/foo",
  description: "",
  version: "v1",
  deprecated: false,
  unstable: false,
  regionUrls: {
    us: "https://api.datadoghq.com/api/v1/foo",
    eu: "https://api.datadoghq.eu/api/v1/foo",
  },
  responses: [],
  codeExamples: [],
};

describe("ApiEndpoint region rendering", () => {
  it("renders a URL span for every supported region", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpoint, {
      props: { data: JSON.stringify(endpointWithTwoRegions) },
    });

    expect(html).toContain('data-region="us"');
    expect(html).toContain("https://api.datadoghq.com/api/v1/foo");
    expect(html).toContain('data-region="eu"');
    expect(html).toContain("https://api.datadoghq.eu/api/v1/foo");
  });

  it('renders a "Not supported" message for allowed regions missing from regionUrls', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpoint, {
      props: { data: JSON.stringify(endpointWithTwoRegions) },
    });

    // Every allowed region except us and eu is missing from regionUrls. Spot-
    // checked rather than enumerated, so a new region needs no edit here.
    expect(html).toContain("Not supported in the US3 region");
    expect(html).toContain("Not supported in the AP1 region");
    expect(html).toContain("Not supported in the US1-FED region");
  });

  it("emits one `data-region` for every allowed region", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpoint, {
      props: { data: JSON.stringify(endpointWithTwoRegions) },
    });

    // Derived from the allow-list, not a copy of it. A hardcoded list here had
    // gone stale — it omitted uk1 and gov2 — and `toContain` per key cannot
    // notice a region that is missing from the list itself.
    const allowed = getAllowedRegions();
    expect(allowed.length).toBeGreaterThan(1);
    for (const region of allowed) {
      expect(html, `data-region for ${region.key}`).toContain(
        `data-region="${region.key}"`,
      );
    }
  });
});

describe("ApiEndpoint permissions and OAuth scopes", () => {
  async function renderEndpoint(overrides: Record<string, unknown>) {
    const container = await AstroContainer.create();
    return container.renderToString(ApiEndpoint, {
      props: {
        data: JSON.stringify({ ...endpointWithTwoRegions, ...overrides }),
      },
    });
  }

  it("states a single permission as a sentence, as Hugo does", async () => {
    const html = await renderEndpoint({ permissions: ["dashboards_read"] });

    expect(html).toMatch(
      /This endpoint requires the <code>dashboards_read<\/code> permission\./,
    );
    expect(html).not.toContain("Permissions:");
  });

  it("says any of the listed permissions when the match is any", async () => {
    const html = await renderEndpoint({
      permissions: ["apps_run", "apps_write"],
      permissionsMatch: "any",
    });

    expect(html).toMatch(
      /This endpoint requires any of the following permissions:/,
    );
    expect(html).toMatch(
      /<li><code>apps_run<\/code><\/li>\s*<li><code>apps_write<\/code><\/li>/,
    );
  });

  it("says all of the listed permissions when the match is all", async () => {
    const html = await renderEndpoint({
      permissions: ["apps_write", "workflows_run"],
      permissionsMatch: "all",
    });

    expect(html).toMatch(
      /This endpoint requires all of the following permissions:/,
    );
  });

  it("links the word scope to the API section's entry on the scopes page", async () => {
    const html = await renderEndpoint({
      oauthScopes: ["dashboards_read"],
      oauthScopesAnchor: "dashboards",
    });

    expect(html).toMatch(
      /authorization <a href="\/api\/latest\/scopes\/#dashboards">scope<\/a> to access this endpoint\./,
    );
  });
});
