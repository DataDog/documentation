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

  it("renders a Code Example section", () => {
    const out = render(baseEndpoint);
    expect(out).toContain("### Code Example");
    expect(out).toContain('label="Curl"');
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
});
