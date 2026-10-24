import { describe, it, expect } from "vitest";
import { format } from "@markdoc/markdoc";
import { documentNode } from "@lib/plaintext/helpers";
import { apiEndpointNodes } from "../ApiEndpoint";
import type { EndpointData } from "@lib/api/schemas/views";

const baseEndpoint: EndpointData = {
  operationId: "getThing",
  summary: "Get a thing",
  slug: "get-a-thing",
  method: "GET",
  path: "/api/v2/things/{thing_id}",
  description: "Returns a thing by id.",
  version: "v2",
  deprecated: false,
  unstable: false,
  regionUrls: {
    us: "https://api.datadoghq.com/api/v2/things/{thing_id}",
    eu: "https://api.datadoghq.eu/api/v2/things/{thing_id}",
  },
  pathParams: [
    {
      name: "thing_id",
      type: "string",
      required: true,
      deprecated: false,
      readOnly: false,
      description: "Thing identifier",
    },
  ],
  responses: [
    {
      statusCode: "200",
      description: "OK",
      schema: [
        {
          name: "id",
          type: "string",
          required: true,
          deprecated: false,
          readOnly: false,
          description: "Identifier",
        },
      ],
      examples: [{ name: "Example", value: '{"id":"abc"}' }],
    },
  ],
  codeExamples: [
    {
      language: "curl",
      label: "Curl",
      entries: [
        { description: "Get a thing", code: "curl -X GET ...", syntax: "bash" },
      ],
    },
  ],
};

function render(ep: EndpointData): string {
  return format(documentNode(apiEndpointNodes(ep)));
}

describe("apiEndpointNodes", () => {
  it("does not emit its own summary heading", () => {
    const out = render(baseEndpoint);
    expect(out).not.toMatch(/^#\s+Get a thing/m);
  });

  it("renders a region URL table with a row per supported region", () => {
    const out = render(baseEndpoint);
    expect(out).toContain("Datadog site");
    expect(out).toContain("API endpoint");
    expect(out).toContain("app.datadoghq.com");
    expect(out).toContain("app.datadoghq.eu");
    expect(out).toContain("| GET https://");
    expect(out).not.toContain("**GET**");
  });

  it("lists unsupported regions last, labeled from the region config", () => {
    const out = render(baseEndpoint);
    const regionTable = out.slice(0, out.indexOf("\n\n"));
    const rows = regionTable.split("\n");
    expect(rows.slice(-3)).toEqual([
      expect.stringMatching(
        /^\| uk1\.datadoghq\.com +\| GET Not supported in the UK1 region +\|$/,
      ),
      expect.stringMatching(
        /^\| app\.ddog-gov\.com +\| GET Not supported in the US1-FED region +\|$/,
      ),
      expect.stringMatching(
        /^\| us2\.ddog-gov\.com +\| GET Not supported in the US2-FED region +\|$/,
      ),
    ]);
    expect(out).not.toMatch(/app\.datadoghq\.com +\| GET Not supported/);
  });

  it("renders no alert when the endpoint is deprecated, as Hugo does", () => {
    const dep = render({ ...baseEndpoint, deprecated: true });
    expect(dep).not.toContain("{% alert");
    expect(dep).not.toContain("This endpoint is deprecated.");
  });

  it("renders the unstable alert on a deprecated endpoint, as Hugo does", () => {
    const out = render({
      ...baseEndpoint,
      deprecated: true,
      unstable: true,
      unstableMessage: "Subject to change.",
    });
    expect(out).toContain("{% alert");
    expect(out).toContain("Subject to change.");
  });

  it("renders an unstable alert when the endpoint is unstable", () => {
    const out = render({
      ...baseEndpoint,
      unstable: true,
      unstableMessage: "Subject to change.",
    });
    expect(out).toContain("{% alert");
    expect(out).toContain("Subject to change.");
  });

  it("includes the endpoint description", () => {
    const out = render(baseEndpoint);
    expect(out).toContain("Returns a thing by id.");
  });

  it("puts the description under an Overview heading after the region table", () => {
    const out = render(baseEndpoint);
    expect(out).toMatch(
      /\| GET [^\n]*\n\n### Overview\n\nReturns a thing by id\./,
    );
  });

  /** As Hugo does: the permissions and OAuth sentences sit under Overview. */
  it("shows the Overview heading above the permissions sentence when there is no description", () => {
    const out = render({
      ...baseEndpoint,
      description: "",
      permissions: ["things_read"],
    });
    expect(out).toMatch(
      /### Overview\n\nThis endpoint requires the `things_read` permission\./,
    );
  });

  it("shows the Overview heading above the OAuth sentence when there is no description", () => {
    const out = render({
      ...baseEndpoint,
      description: "",
      oauthScopes: ["things_read"],
    });
    expect(out).toMatch(/### Overview\n\nOAuth apps require the `things_read`/);
  });

  /** Unlike Hugo, which shows an empty Overview heading. */
  it("leaves out the Overview heading when nothing goes under it", () => {
    const out = render({ ...baseEndpoint, description: "" });
    expect(out).not.toContain("### Overview");
  });

  it("renders an Arguments section with a schema table for path params", () => {
    const out = render(baseEndpoint);
    expect(out).toContain("### Arguments");
    expect(out).toContain("thing_id [*required*]");
  });

  it("renders a Response section with an outer tabs block", () => {
    const out = render(baseEndpoint);
    expect(out).toContain("### Response");
    expect(out).toContain('label="200"');
  });

  it("renders a Code Example section", () => {
    const out = render(baseEndpoint);
    expect(out).toContain("### Code Example");
    expect(out).toContain('label="Curl"');
  });

  it("renders permissions and OAuth scopes when present", () => {
    const out = render({
      ...baseEndpoint,
      permissions: ["things_read"],
      oauthScopes: ["things:read"],
    });
    expect(out).toContain(
      "This endpoint requires the `things_read` permission.",
    );
    expect(out).toContain("OAuth apps");
    expect(out).toContain("things:read");
  });

  it("links the OAuth scope to its section of the scopes page", () => {
    const ep = {
      ...baseEndpoint,
      oauthScopes: ["things:read"],
      oauthScopesAnchor: "things",
    };
    expect(render(ep)).toContain(
      "authorization [scope](/api/latest/scopes/#things) to access",
    );
    expect(format(documentNode(apiEndpointNodes(ep, "fr")))).toContain(
      "[scope](/fr/api/latest/scopes/#things)",
    );
  });

  it("lists alternative OAuth scopes after one of the following", () => {
    const out = render({
      ...baseEndpoint,
      oauthScopes: ["monitors_write", "monitors_draft_write"],
      oauthScopesMatch: "any",
      oauthScopesAnchor: "monitors",
    });
    expect(out).toContain(
      "OAuth apps require one of the following authorization [scopes](/api/latest/scopes/#monitors) to access this endpoint: `monitors_write`, `monitors_draft_write`.",
    );
  });

  it("leaves the OAuth scope unlinked without an anchor", () => {
    const out = render({ ...baseEndpoint, oauthScopes: ["things:read"] });
    expect(out).toContain("authorization scope to access");
  });

  it("lists multiple permissions with their any/all match", () => {
    const out = render({
      ...baseEndpoint,
      permissions: ["apps_write", "workflows_run"],
      permissionsMatch: "all",
    });
    expect(out).toContain(
      "This endpoint requires all of the following permissions:",
    );
    expect(out).toContain("- `apps_write`");
    expect(out).toContain("- `workflows_run`");
  });

  it("titles each argument table by parameter location", () => {
    const param = {
      name: "version",
      type: "string",
      required: true,
      deprecated: false,
      readOnly: false,
      description: "The version.",
    };
    const out = render({
      ...baseEndpoint,
      queryParams: [param],
      headerParams: [{ ...param, name: "x_header" }],
    });
    const pathAt = out.indexOf("#### Path Parameters");
    const queryAt = out.indexOf("#### Query Strings");
    const headerAt = out.indexOf("#### Header Parameters");
    expect(pathAt).toBeGreaterThan(-1);
    expect(queryAt).toBeGreaterThan(pathAt);
    expect(headerAt).toBeGreaterThan(queryAt);
  });
  it("titles a required body Request, then Body Data (required)", () => {
    const out = render({
      ...baseEndpoint,
      requestBody: {
        required: true,
        description: "Thing payload.",
        schema: [],
        examples: [],
        showExampleTitles: false,
      },
    });
    expect(out).toMatch(
      /^### Request\n\n#### Body Data \(required\)\n\nThing payload\./m,
    );
    expect(out).not.toContain("Request Body");
  });

  it("leaves the marker off an optional body", () => {
    const out = render({
      ...baseEndpoint,
      requestBody: {
        required: false,
        schema: [],
        examples: [],
        showExampleTitles: false,
      },
    });
    expect(out).toMatch(/^#### Body Data$/m);
    expect(out).not.toContain("(optional)");
  });
});
