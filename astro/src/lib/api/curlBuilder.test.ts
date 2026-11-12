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

const bearerHeader = '-H "Authorization: Bearer ${DD_BEARER_TOKEN}"';

describe("buildCurlCommand", () => {
  const compressedOptions = {
    method: "POST",
    path: "/api/v2/logs",
    headerParams: [{ name: "Content-Encoding", example: "gzip" }],
    requestBodyJson: '[\n  {\n    "message": "Example-Log"\n  }\n]',
  };

  it("pipes a gzip body through gzip, as Hugo does", () => {
    const result = buildCurlCommand({
      ...compressedOptions,
      contentEncoding: "gzip",
    });

    expect(result).toContain(
      'echo $(cat << EOF\n[\n  {\n    "message": "Example-Log"\n  }\n]\nEOF\n) | gzip | curl -X POST "https://api.${DD_SITE}/api/v2/logs"',
    );
    expect(result).toContain(
      '-H "Content-Type: application/json" \\\n-H "Content-Encoding: gzip" \\\n',
    );
    expect(result.endsWith("\\\n--data-binary @-")).toBe(true);
    expect(result).not.toContain("-d @-");
  });

  it("pipes a deflate body through zlib, as Hugo does", () => {
    const result = buildCurlCommand({
      ...compressedOptions,
      contentEncoding: "deflate",
    });

    expect(result).toContain(
      "printf '%s' \"$(cat <<'EOF'\n[\n  {\n    \"message\": \"Example-Log\"\n  }\n]\nEOF\n)\" | python3 -c 'import sys, zlib; sys.stdout.buffer.write(zlib.compress(sys.stdin.buffer.read()))' | curl -X POST",
    );
    expect(result).toContain('-H "Content-Encoding: deflate" \\\n');
    expect(result.endsWith("\\\n--data-binary @-")).toBe(true);
  });

  /** Unlike Hugo: bash rejects `export filter[env]=...`. */
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

  it("uses custom site domain", () => {
    const result = buildCurlCommand({
      method: "GET",
      path: "/api/v1/dashboard",
      site: "datadoghq.eu",
    });

    expect(result).toContain('export DD_SITE="datadoghq.eu"');
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

  it("sends Content-Type when the operation has a request body but no JSON example", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v2/example",
      hasRequestBody: true,
    });

    expect(result).toContain('-H "Content-Type: application/json"');
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

  it("writes no other-hosts comment without other hosts", () => {
    const result = buildCurlCommand({
      method: "POST",
      path: "/api/v2/on-call/pages",
      host: "navy.oncall.datadoghq.com",
      security: [{ apiKeyAuth: [] }],
    });

    expect(result).not.toContain("# For sites other than");
  });

  describe("bearer token auth", () => {
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
  });
});
