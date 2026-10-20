import { describe, it, expect } from "vitest";
import type { OpenAPIV3 } from "openapi-types";
import {
  buildCurlByRegion,
  buildPlaintextCurl,
  extractPermissionsMatch,
  extractRequestBody,
  extractResponses,
} from "./operationBuilder";

const spec = {
  openapi: "3.0.0",
  info: { title: "test", version: "1" },
  paths: {},
  components: {
    schemas: {
      DashboardSummary: {
        type: "object",
        description: "Dashboard summary response.",
        properties: { id: { type: "string", description: "Identifier." } },
      },
      Undescribed: {
        type: "object",
        properties: { id: { type: "string" } },
      },
    },
  },
} as OpenAPIV3.Document;

function responsesFor(schemaRef: string) {
  return extractResponses(spec, {
    responses: {
      "200": {
        description: "OK",
        content: { "application/json": { schema: { $ref: schemaRef } } },
      },
    },
  });
}

describe("extractResponses schema description", () => {
  it("carries the resolved schema's description", () => {
    const [response] = responsesFor("#/components/schemas/DashboardSummary");

    expect(response.schemaDescription).toBe("Dashboard summary response.");
  });

  it("omits schemaDescription when the schema has none", () => {
    const [response] = responsesFor("#/components/schemas/Undescribed");

    expect(response).not.toHaveProperty("schemaDescription");
  });
});

describe("write-only fields in responses", () => {
  // A write-only field (e.g. `webhookSecret`) is accepted on the way in but
  // never returned, so it belongs in the request body and nowhere in the
  // response.
  const workflowSchema = {
    type: "object" as const,
    properties: {
      name: { type: "string" as const, example: "my-workflow" },
      webhookSecret: {
        type: "string" as const,
        writeOnly: true,
        example: "s3cret",
      },
    },
  };

  const responseFor = (schema: OpenAPIV3.SchemaObject) =>
    extractResponses(spec, {
      responses: {
        "201": {
          description: "Created",
          content: { "application/json": { schema } },
        },
      },
    })[0];

  it("omits write-only fields from the response model", () => {
    const response = responseFor(workflowSchema);

    expect(response.schema?.map((field) => field.name)).toEqual(["name"]);
  });

  it("omits write-only fields from the generated response example", () => {
    const response = responseFor(workflowSchema);

    expect(JSON.parse(response.examples![0].value)).toEqual({
      name: "my-workflow",
    });
  });

  it("omits write-only fields nested inside the response model", () => {
    const response = responseFor({
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "string", example: "abc" },
            webhookSecret: {
              type: "string",
              writeOnly: true,
              example: "s3cret",
            },
          },
        },
      },
    });

    expect(response.schema?.[0].children?.map((field) => field.name)).toEqual([
      "id",
    ]);
    expect(JSON.parse(response.examples![0].value)).toEqual({
      data: { id: "abc" },
    });
  });

  it("keeps write-only fields in the request body and its example", () => {
    const body = extractRequestBody(spec, {
      responses: {},
      requestBody: {
        required: true,
        content: { "application/json": { schema: workflowSchema } },
      } as OpenAPIV3.RequestBodyObject,
    });

    expect(body?.schema.map((field) => field.name)).toEqual([
      "name",
      "webhookSecret",
    ]);
    expect(JSON.parse(body!.examples[0].value)).toEqual({
      name: "my-workflow",
      webhookSecret: "s3cret",
    });
  });
});

describe("extractPermissionsMatch", () => {
  const withPermissions = (operator: string, permissions: string[]) => ({
    responses: {},
    "x-permission": { operator, permissions },
  });

  it("returns any for OR with more than one permission", () => {
    expect(
      extractPermissionsMatch(withPermissions("OR", ["a_read", "b_read"])),
    ).toBe("any");
  });

  it("returns all for AND with more than one permission", () => {
    expect(
      extractPermissionsMatch(withPermissions("AND", ["a_read", "b_read"])),
    ).toBe("all");
  });

  it("returns undefined for a single permission, where any/all is moot", () => {
    expect(
      extractPermissionsMatch(withPermissions("AND", ["a_read"])),
    ).toBeUndefined();
  });

  it("returns undefined when there are no permissions", () => {
    expect(extractPermissionsMatch({ responses: {} })).toBeUndefined();
  });
});

describe("extractRequestBody content types", () => {
  const objectSchema = (field: string) => ({
    type: "object" as const,
    properties: { [field]: { type: "string" as const } },
  });

  const bodyFor = (content: Record<string, unknown>) =>
    extractRequestBody(spec, {
      responses: {},
      requestBody: { required: true, content } as OpenAPIV3.RequestBodyObject,
    });

  it("reads a text/json body, including an example", () => {
    const body = bodyFor({
      "text/json": {
        schema: objectSchema("series"),
        example: { series: "cpu" },
      },
    });

    expect(body?.schema.map((field) => field.name)).toEqual(["series"]);
    expect(body?.examples.length).toBeGreaterThan(0);
  });

  it("reads a multipart/form-data body's schema, without a JSON example", () => {
    const body = bodyFor({
      "multipart/form-data": {
        schema: objectSchema("idp_file"),
        example: { idp_file: "metadata.xml" },
      },
    });

    expect(body?.schema.map((field) => field.name)).toEqual(["idp_file"]);
    expect(body?.examples).toEqual([]);
  });

  it("prefers application/json when a body offers several content types", () => {
    const body = bodyFor({
      "multipart/form-data": { schema: objectSchema("upload") },
      "application/json": { schema: objectSchema("data") },
    });

    expect(body?.schema.map((field) => field.name)).toEqual(["data"]);
  });
});

describe("extractResponses content types", () => {
  const objectSchema = (field: string) => ({
    type: "object" as const,
    properties: { [field]: { type: "string" as const, example: "x" } },
  });

  const responseFor = (content: Record<string, unknown>) =>
    extractResponses(spec, {
      responses: {
        "200": { description: "OK", content } as OpenAPIV3.ResponseObject,
      },
    })[0];

  it("reads a JSON response with media type parameters, including an example", () => {
    const response = responseFor({
      "application/json;datetime-format=rfc3339": {
        schema: objectSchema("func_count"),
      },
    });

    expect(response.schema?.map((field) => field.name)).toEqual(["func_count"]);
    expect(response.examples?.length).toBeGreaterThan(0);
  });

  it("reads a text/csv response's schema, without a JSON example", () => {
    const response = responseFor({
      "text/csv": { schema: objectSchema("row") },
    });

    expect(response.schema?.map((field) => field.name)).toEqual(["row"]);
    expect(response.examples).toBeUndefined();
  });

  it("prefers application/json when a response offers several content types", () => {
    const response = responseFor({
      "text/csv": { schema: objectSchema("row") },
      "application/json": { schema: objectSchema("data") },
    });

    expect(response.schema?.map((field) => field.name)).toEqual(["data"]);
  });
});

describe("curl site comment", () => {
  const twoSiteSpec = {
    ...spec,
    servers: [
      {
        url: "https://{subdomain}.{site}",
        variables: {
          site: {
            default: "datadoghq.com",
            enum: ["datadoghq.com", "datadoghq.eu"],
          },
          subdomain: { default: "api" },
        },
      },
    ],
  } as OpenAPIV3.Document;
  const operation = { responses: {} } as OpenAPIV3.OperationObject;
  const noParams = { path: [], query: [], header: [] };

  it("lists the operation's other sites after DD_SITE in the .md curl", () => {
    const curl = buildPlaintextCurl(
      twoSiteSpec,
      "get",
      "/api/v1/validate",
      operation,
      noParams,
    );
    expect(curl).toContain('export DD_SITE="datadoghq.com" # Or datadoghq.eu');
  });

  it("leaves the site comment out of the per-site HTML curl", () => {
    const curlByRegion = buildCurlByRegion(
      twoSiteSpec,
      "get",
      "/api/v1/validate",
      operation,
      noParams,
    );
    expect(Object.keys(curlByRegion)).toHaveLength(2);
    for (const curl of Object.values(curlByRegion)) {
      expect(curl).not.toContain("# Or");
    }
  });
});
