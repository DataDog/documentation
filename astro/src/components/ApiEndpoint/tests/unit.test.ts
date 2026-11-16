import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ApiEndpoint from "../ApiEndpoint.astro";

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

describe("ApiEndpoint anchor", () => {
  // The operation page wraps each version in a tab panel with a unique
  // `{slug}-{version}` id. A section id from the bare slug would repeat once
  // per version on the same page.
  it("does not set an id on the section", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpoint, {
      props: { data: JSON.stringify(endpointWithTwoRegions) },
    });

    const section = html.match(/<section[^>]*class="[^"]*api-endpoint[^>]*>/);
    expect(section).not.toBeNull();
    expect(section![0]).not.toMatch(/\sid=/);
  });
});

describe("ApiEndpoint status alerts", () => {
  async function renderEndpoint(overrides: Record<string, unknown>) {
    const container = await AstroContainer.create();
    return container.renderToString(ApiEndpoint, {
      props: {
        data: JSON.stringify({ ...endpointWithTwoRegions, ...overrides }),
      },
    });
  }

  it("shows the unstable alert on a deprecated endpoint, as Hugo does", async () => {
    const html = await renderEndpoint({
      deprecated: true,
      unstable: true,
      unstableMessage: "Subject to change.",
    });

    expect(html).toContain("alert--warning");
    expect(html).toContain("Subject to change.");
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

  it("lists alternative scopes after one of the following", async () => {
    const html = await renderEndpoint({
      oauthScopes: ["monitors_write", "monitors_draft_write"],
      oauthScopesMatch: "any",
      oauthScopesAnchor: "monitors",
    });

    expect(html).toMatch(
      /OAuth apps require one of the following authorization <a href="\/api\/latest\/scopes\/#monitors">scopes<\/a> to access this endpoint: <code>monitors_write<\/code>, <code>monitors_draft_write<\/code>\./,
    );
  });
});

describe("ApiEndpoint Overview heading", () => {
  async function renderEndpoint(overrides: Record<string, unknown>) {
    const container = await AstroContainer.create();
    return container.renderToString(ApiEndpoint, {
      props: {
        data: JSON.stringify({ ...endpointWithTwoRegions, ...overrides }),
      },
    });
  }

  /** As Hugo does: the permissions and OAuth sentences sit under Overview. */
  it("shows the heading above the permissions sentence when there is no description", async () => {
    const html = await renderEndpoint({ permissions: ["dashboards_read"] });

    expect(html).toMatch(
      /api-endpoint__overview-heading[^>]*>Overview<\/h3>[\s\S]*This endpoint requires the/,
    );
  });

  it("shows the heading above the OAuth sentence when there is no description", async () => {
    const html = await renderEndpoint({ oauthScopes: ["dashboards_read"] });

    expect(html).toMatch(
      /api-endpoint__overview-heading[^>]*>Overview<\/h3>[\s\S]*OAuth apps require the/,
    );
  });

  /** Unlike Hugo, which shows an empty Overview heading. */
  it("leaves out the heading when nothing goes under it", async () => {
    const html = await renderEndpoint({});

    expect(html).not.toContain("api-endpoint__overview-heading");
  });
});
