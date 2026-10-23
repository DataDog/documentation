import { describe, it, expect } from "vitest";
import { buildCurlCommand } from "@lib/api/curlBuilder";

const securitySchemes = {
  AuthZ: { type: "oauth2", "x-env-name": "DD_BEARER_TOKEN" },
  apiKeyAuth: {
    type: "apiKey",
    in: "header",
    name: "DD-API-KEY",
    "x-env-name": "DD_API_KEY",
  },
  apiKeyAuthQuery: {
    type: "apiKey",
    in: "query",
    name: "api_key",
    "x-env-name": "DD_API_KEY",
  },
  appKeyAuth: {
    type: "apiKey",
    in: "header",
    name: "DD-APPLICATION-KEY",
    "x-env-name": "DD_APP_KEY",
  },
  appKeyAuthQuery: {
    type: "apiKey",
    in: "query",
    name: "application_key",
    "x-env-name": "DD_APP_KEY",
  },
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    "x-env-name": "DD_BEARER_TOKEN",
  },
};

const bearerExport =
  'export DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>"';
const bearerHeader = '-H "Authorization: Bearer ${DD_BEARER_TOKEN}"';

describe("buildCurlCommand", () => {
  it("generates a simple GET request", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard",
    });

    expect(result).toContain("curl -X GET");
    expect(result).toContain("https://api.${DD_SITE}/api/v1/dashboard");
    expect(result).toContain("DD-API-KEY");
    expect(result).toContain("DD-APPLICATION-KEY");
    expect(result).toContain('-H "Accept: application/json"');
  });

  it("generates a POST request with body", () => {
    const body = JSON.stringify({ title: "My Dashboard" }, null, 2);
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v1/dashboard",
      requestBodyJson: body,
    });

    expect(result).toContain("curl -X POST");
    expect(result).toContain('-H "Content-Type: application/json"');
    expect(result).toContain("-d @- << EOF");
    expect(result).toContain('"title": "My Dashboard"');
    expect(result).toContain("EOF");
  });

  /** As Hugo does: the example is exported, and the URL references it by name. */
  it("exports a path parameter's example", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard/{dashboard_id}",
      pathParams: [{ name: "dashboard_id", example: "abc-123" }],
    });

    expect(result).toContain(
      '# Path parameters\nexport dashboard_id="abc-123"',
    );
    expect(result).toContain("/api/v1/dashboard/${dashboard_id}");
    expect(result).not.toContain("/api/v1/dashboard/abc-123");
  });

  it("exports a path parameter that has no example", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard/{dashboard_id}",
      pathParams: [{ name: "dashboard_id" }],
    });

    expect(result).toContain(
      '# Path parameters\nexport dashboard_id="CHANGE_ME"',
    );
    expect(result).toContain("/api/v1/dashboard/${dashboard_id}");
  });

  it("exports a required query parameter that has no example", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/usage/aws_lambda",
      queryParams: [{ name: "start_hr", required: true }],
    });

    expect(result).toContain(
      '# Required query arguments\nexport start_hr="CHANGE_ME"',
    );
    expect(result).toContain("?start_hr=${start_hr}");
  });

  it("exports every path parameter, with or without an example", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v2/org/{org_id}/user/{user_id}",
      pathParams: [{ name: "org_id", example: "abc123" }, { name: "user_id" }],
    });

    expect(result).toContain(
      [
        "# Path parameters",
        'export org_id="abc123"',
        'export user_id="CHANGE_ME"',
      ].join("\n"),
    );
    expect(result).toContain("/api/v2/org/${org_id}/user/${user_id}");
  });

  /** As Hugo does: the example is exported, and the URL references it by name. */
  it("exports a required query parameter's example", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard",
      queryParams: [{ name: "filter", example: "active", required: true }],
    });

    expect(result).toContain(
      '# Required query arguments\nexport filter="active"',
    );
    expect(result).toContain("/api/v1/dashboard?filter=${filter}");
  });

  /** As Hugo does: each item gets its own variable and a repeated key. */
  it("exports one placeholder per item of an exploded array query parameter", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v2/reference-tables/tables/table-123/rows",
      queryParams: [
        {
          name: "row_id",
          example: "row1,row2",
          required: true,
          explodedItemCount: 2,
        },
      ],
    });

    expect(result).toContain(
      '# Required query arguments\nexport row_id_0="row_id_0"\nexport row_id_1="row_id_1"\n',
    );
    expect(result).toContain("/rows?row_id=${row_id_0}&row_id=${row_id_1}");
  });

  /** Unlike Hugo: bash rejects `export filter[env]=...`. */
  it("exports a bracketed query parameter under a valid shell variable name", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v2/apm/services",
      queryParams: [
        { name: "filter[env]", required: true },
        { name: "filter[timestamp][start]", required: true },
      ],
    });

    expect(result).toContain(
      '# Required query arguments\nexport filter_env="CHANGE_ME"\nexport filter_timestamp_start="CHANGE_ME"\n',
    );
    expect(result).toContain(
      "/services?filter%5Benv%5D=${filter_env}&filter%5Btimestamp%5D%5Bstart%5D=${filter_timestamp_start}",
    );
  });

  it("names each item of a bracketed exploded array with a valid shell variable name", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v2/usage/hourly_usage",
      queryParams: [
        {
          name: "filter[product_families]",
          required: true,
          explodedItemCount: 2,
        },
      ],
    });

    expect(result).toContain(
      'export filter_product_families_0="filter_product_families_0"\nexport filter_product_families_1="filter_product_families_1"\n',
    );
    expect(result).toContain(
      "/hourly_usage?filter%5Bproduct_families%5D=${filter_product_families_0}&filter%5Bproduct_families%5D=${filter_product_families_1}",
    );
  });

  /** As Hugo does: an optional filter's example would narrow the results. */
  it("leaves out optional query parameters, even with an example", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard",
      queryParams: [
        { name: "filter", example: "active", required: false },
        { name: "page", example: "0", required: false },
      ],
    });

    expect(result).not.toContain("filter");
    expect(result).not.toContain("page");
    expect(result).toContain('"https://api.${DD_SITE}/api/v1/dashboard"');
  });

  it("only includes required query params without examples", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard",
      queryParams: [
        { name: "required_param", required: true },
        { name: "optional_param", required: false },
      ],
    });

    expect(result).toContain("required_param=");
    expect(result).not.toContain("optional_param");
  });

  it("uses custom site domain", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard",
      site: "datadoghq.eu",
    });

    expect(result).toContain('export DD_SITE="datadoghq.eu"');
  });

  it("reads the site from DD_SITE in the URL", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard",
      site: "datadoghq.eu",
    });

    expect(result).toContain('"https://api.${DD_SITE}/api/v1/dashboard"');
    expect(result).not.toContain("https://api.datadoghq.eu");
  });

  it("lists the other sites in a comment after DD_SITE", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard",
      site: "datadoghq.com",
      otherSites: ["us3.datadoghq.com", "datadoghq.eu"],
    });

    expect(result).toContain(
      'export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, datadoghq.eu',
    );
  });

  it("adds no site comment when there are no other sites", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard",
      otherSites: [],
    });

    expect(result).toContain('export DD_SITE="datadoghq.com"\n');
  });

  it("orders headers as Hugo does: Accept, Content-Type, then auth", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v1/dashboard",
      requestBodyJson: "{}",
      security: [{ apiKeyAuth: [] }],
    });

    expect(result).toContain(
      [
        '-H "Accept: application/json" \\',
        '-H "Content-Type: application/json" \\',
        '-H "DD-API-KEY: ${DD_API_KEY}" \\',
        "-d @- << EOF",
      ].join("\n"),
    );
  });

  it("leaves out Content-Type on a POST with no request body, as Hugo does", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v1/monitor/unmute_all",
    });

    expect(result).not.toContain("Content-Type");
  });

  it("sends Content-Type when the operation has a request body but no JSON example", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v2/example",
      hasRequestBody: true,
    });

    expect(result).toContain('-H "Content-Type: application/json"');
  });

  it("sends a required header parameter's example after Content-Type, before auth", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v2/security/threat-intel-feed",
      headerParams: [{ name: "ti_vendor", example: "acme", required: true }],
      requestBodyJson: "{}",
      security: [{ apiKeyAuth: [] }],
    });

    expect(result).toContain(
      [
        '-H "Content-Type: application/json" \\',
        '-H "ti_vendor: acme" \\',
        '-H "DD-API-KEY: ${DD_API_KEY}" \\',
      ].join("\n"),
    );
  });

  it("sends CHANGE_ME for a required header parameter with no example", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v2/security/threat-intel-feed",
      headerParams: [{ name: "ti_vendor", required: true }],
      requestBodyJson: "{}",
    });

    expect(result).toContain('-H "ti_vendor: CHANGE_ME" \\');
  });

  it("leaves out optional header parameters and Content-Encoding, as Hugo's curl does", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v2/security/threat-intel-feed",
      headerParams: [
        { name: "If-None-Match", example: "abc" },
        { name: "Content-Encoding", example: "gzip", required: true },
      ],
      requestBodyJson: "{}",
    });

    expect(result).not.toContain("If-None-Match");
    expect(result).not.toContain("Content-Encoding");
  });

  it("leaves out the Accept header when the operation has a 204 response, as Hugo does", () => {
    const result = buildCurlCommand({
      method: "DELETE",
      path: "/api/v2/downtime/{downtime_id}",
      hasNoContentResponse: true,
    });

    expect(result).not.toContain("Accept:");
  });

  it("sends a multipart body as form fields, as Hugo does", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v2/saml_configurations/idp_metadata",
      security: [{ apiKeyAuth: [] }],
      multipartFormFields: [
        { name: "idp_file", type: "string", binary: true },
        { name: "label", type: "string", binary: false },
      ],
    });

    expect(result).toContain(
      [
        '-H "Accept: application/json" \\',
        '-H "Content-Type: multipart/form-data" \\',
        '-H "DD-API-KEY: ${DD_API_KEY}" \\',
        "-F idp_file=@string \\",
        "-F label=string",
      ].join("\n"),
    );
    expect(result).not.toContain("-d @-");
  });

  it("sends the multipart Content-Type even when the body has no properties", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v2/srcmap",
      security: [{ apiKeyAuth: [] }],
      multipartFormFields: [],
    });

    expect(result).toContain('-H "Content-Type: multipart/form-data"');
    expect(result).not.toContain("-F ");
    expect(result.trimEnd()).not.toMatch(/\\$/);
  });

  it("uses a fixed host in the URL, with no DD_SITE export", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v2/on-call/pages",
      host: "navy.oncall.datadoghq.com",
      otherSites: ["datadoghq.eu"],
      security: [{ apiKeyAuth: [] }],
    });

    expect(result).toContain(
      'curl -X POST "https://navy.oncall.datadoghq.com/api/v2/on-call/pages"',
    );
    expect(result).not.toContain("DD_SITE");
    expect(result).toContain('export DD_API_KEY="<DD_API_KEY>"');
  });

  it("lists the other sites' hosts in a comment above a fixed-host curl", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v2/on-call/pages",
      site: "datadoghq.com",
      host: "navy.oncall.datadoghq.com",
      otherHosts: [
        { site: "us3.datadoghq.com", host: "teal.oncall.datadoghq.com" },
        { site: "datadoghq.eu", host: "beige.oncall.datadoghq.eu" },
      ],
      security: [{ apiKeyAuth: [] }],
    });

    expect(result).toContain(
      "# For sites other than datadoghq.com, replace the host below with: teal.oncall.datadoghq.com (us3.datadoghq.com), beige.oncall.datadoghq.eu (datadoghq.eu)\n" +
        'curl -X POST "https://navy.oncall.datadoghq.com/api/v2/on-call/pages"',
    );
  });

  it("writes no other-hosts comment without other hosts", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v2/on-call/pages",
      host: "navy.oncall.datadoghq.com",
      security: [{ apiKeyAuth: [] }],
    });

    expect(result).not.toContain("# For sites other than");
  });

  it("uses custom subdomain", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/logs",
      site: "datadoghq.com",
      subdomain: "http-intake",
    });

    expect(result).toContain("https://http-intake.${DD_SITE}/api/v1/logs");
  });

  it("respects security requirements for auth headers", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard",
      security: [{ apiKeyAuth: [] }],
    });

    expect(result).toContain("DD-API-KEY");
    expect(result).not.toContain("DD-APPLICATION-KEY");
  });

  describe("bearer token auth", () => {
    it("uses a bearer token when a requirement is AuthZ alone", () => {
      const result = buildCurlCommand({
        method: "GET",
        path: "/api/v1/dashboard",
        security: [
          { apiKeyAuth: [], appKeyAuth: [] },
          { AuthZ: ["dashboards_read"] },
        ],
        securitySchemes,
      });

      expect(result).toContain(
        "# Use a Personal Access Token or Service Access Token",
      );
      expect(result).toContain(bearerExport);
      expect(result).toContain(bearerHeader);
      expect(result).not.toContain("DD_API_KEY");
      expect(result).not.toContain("DD-APPLICATION-KEY");
    });

    it("does not use a bearer token when AuthZ is combined with other schemes", () => {
      const result = buildCurlCommand({
        method: "GET",
        path: "/api/v1/dashboard",
        security: [{ apiKeyAuth: [], AuthZ: [] }],
        securitySchemes,
      });

      expect(result).not.toContain("DD_BEARER_TOKEN");
      expect(result).toContain('-H "DD-API-KEY: ${DD_API_KEY}"');
    });

    it("falls back to global security when the operation has none", () => {
      const result = buildCurlCommand({
        method: "GET",
        path: "/api/v1/dashboard",
        globalSecurity: [{ apiKeyAuth: [], appKeyAuth: [] }, { AuthZ: [] }],
        securitySchemes,
      });

      expect(result).toContain(bearerHeader);
    });

    it("prefers operation security over global security", () => {
      const result = buildCurlCommand({
        method: "GET",
        path: "/api/v1/validate",
        security: [{ apiKeyAuth: [] }],
        globalSecurity: [{ apiKeyAuth: [], appKeyAuth: [] }, { AuthZ: [] }],
        securitySchemes,
      });

      expect(result).not.toContain("DD_BEARER_TOKEN");
      expect(result).toContain('-H "DD-API-KEY: ${DD_API_KEY}"');
      expect(result).not.toContain("DD-APPLICATION-KEY");
    });
  });

  describe("auth from security schemes", () => {
    it("renders query-param auth instead of headers", () => {
      const result = buildCurlCommand({
        method: "GET",
        path: "/api/v1/dashboard",
        queryParams: [{ name: "filter", example: "active", required: true }],
        security: [{ apiKeyAuthQuery: [], appKeyAuthQuery: [] }],
        securitySchemes,
      });

      expect(result).toContain(
        "/api/v1/dashboard?filter=${filter}&api_key=${DD_API_KEY}&application_key=${DD_APP_KEY}",
      );
      expect(result).toContain('export DD_API_KEY="<DD_API_KEY>"');
      expect(result).not.toContain("DD-API-KEY:");
    });

    it("renders an http bearer scheme as an Authorization header", () => {
      const result = buildCurlCommand({
        method: "GET",
        path: "/api/v2/example",
        security: [{ bearerAuth: [] }, { apiKeyAuth: [] }],
        securitySchemes,
      });

      expect(result).toContain(bearerHeader);
      expect(result).toContain('export DD_BEARER_TOKEN="<DD_BEARER_TOKEN>"');
      expect(result).not.toContain("DD-API-KEY");
    });

    it("omits auth when the operation declares no security", () => {
      const result = buildCurlCommand({
        method: "GET",
        path: "/api/v2/oauth2/.well-known/sites",
        security: [],
        globalSecurity: [{ apiKeyAuth: [], appKeyAuth: [] }],
        securitySchemes,
      });

      expect(result).not.toContain("DD_API_KEY");
      expect(result).not.toContain("Authorization");
    });
  });
});
