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
    expect(result).toContain("https://api.datadoghq.com/api/v1/dashboard");
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

  it("interpolates path parameters with example values", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard/{dashboard_id}",
      pathParams: [{ name: "dashboard_id", example: "abc-123" }],
    });

    expect(result).toContain("/api/v1/dashboard/abc-123");
    expect(result).not.toContain("{dashboard_id}");
  });

  it("uses uppercase placeholder when no example is provided", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard/{dashboard_id}",
      pathParams: [{ name: "dashboard_id" }],
    });

    expect(result).toContain("${DASHBOARD_ID}");
  });

  it("includes query parameters with example values", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard",
      queryParams: [
        { name: "filter", example: "active", required: false },
        { name: "page", example: "0", required: false },
      ],
    });

    expect(result).toContain("?filter=active&page=0");
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

    expect(result).toContain("https://api.datadoghq.eu/api/v1/dashboard");
    expect(result).toContain('DD_SITE="datadoghq.eu"');
  });

  it("uses custom subdomain", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/logs",
      site: "datadoghq.com",
      subdomain: "http-intake",
    });

    expect(result).toContain("https://http-intake.datadoghq.com/api/v1/logs");
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
        queryParams: [{ name: "filter", example: "active" }],
        security: [{ apiKeyAuthQuery: [], appKeyAuthQuery: [] }],
        securitySchemes,
      });

      expect(result).toContain(
        "/api/v1/dashboard?filter=active&api_key=${DD_API_KEY}&application_key=${DD_APP_KEY}",
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
