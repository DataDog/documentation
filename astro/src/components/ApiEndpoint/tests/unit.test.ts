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
