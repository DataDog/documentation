import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of nested ApiSchemaTable islands.
import preactRenderer from "@astrojs/preact/server.js";
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

  // Hugo shows no alert for a deprecated operation. Its description and the
  // "(deprecated)" version label already say so.
  it("shows no alert for a deprecated endpoint", async () => {
    const html = await renderEndpoint({ deprecated: true });

    expect(html).not.toContain("alert--warning");
    expect(html).not.toContain("This endpoint is deprecated.");
  });

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

describe("ApiEndpoint argument tables", () => {
  const field = (name: string) => ({
    name,
    type: "string",
    required: true,
    deprecated: false,
    readOnly: false,
    description: `The ${name}.`,
  });

  async function renderEndpoint(overrides: Record<string, unknown>) {
    const container = await AstroContainer.create();
    container.addServerRenderer({
      renderer: preactRenderer,
      name: "@astrojs/preact",
    });
    return container.renderToString(ApiEndpoint, {
      props: {
        data: JSON.stringify({ ...endpointWithTwoRegions, ...overrides }),
      },
    });
  }

  it("titles each argument table by parameter location, as Hugo does", async () => {
    const html = await renderEndpoint({
      pathParams: [field("app_id")],
      queryParams: [field("version")],
      headerParams: [field("x_header")],
    });

    expect(html).toMatch(
      /<h4[^>]*>Path Parameters<\/h4>[\s\S]*data-field-name="app_id"[\s\S]*<h4[^>]*>Query Strings<\/h4>[\s\S]*data-field-name="version"[\s\S]*<h4[^>]*>Header Parameters<\/h4>[\s\S]*data-field-name="x_header"/,
    );
  });

  it("omits the title for a parameter location with no parameters", async () => {
    const html = await renderEndpoint({ pathParams: [field("app_id")] });

    expect(html).toContain("Path Parameters");
    expect(html).not.toContain("Query Strings");
    expect(html).not.toContain("Header Parameters");
  });
});

describe("ApiEndpoint request heading", () => {
  async function renderEndpoint(overrides: Record<string, unknown>) {
    const container = await AstroContainer.create();
    container.addServerRenderer({
      renderer: preactRenderer,
      name: "@astrojs/preact",
    });
    return container.renderToString(ApiEndpoint, {
      props: {
        data: JSON.stringify({ ...endpointWithTwoRegions, ...overrides }),
      },
    });
  }

  const requestBody = (required: boolean) => ({
    required,
    description: "Thing payload.",
    schema: [],
    examples: [],
  });

  it("titles a required body Request, then Body Data (required), as Hugo does", async () => {
    const html = await renderEndpoint({ requestBody: requestBody(true) });

    expect(html).toMatch(
      /<h3[^>]*>Request<\/h3>\s*<h4[^>]*>Body Data \(required\)<\/h4>/,
    );
    expect(html).not.toContain("Request Body");
  });

  it("leaves the marker off an optional body, as Hugo does", async () => {
    const html = await renderEndpoint({ requestBody: requestBody(false) });

    expect(html).toMatch(/<h4[^>]*>Body Data<\/h4>/);
    expect(html).not.toContain("(optional)");
  });
});
