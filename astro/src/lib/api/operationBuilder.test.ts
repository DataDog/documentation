import { describe, it, expect } from "vitest";
import type { OpenAPIV3 } from "openapi-types";
import { extractPermissionsMatch, extractResponses } from "./operationBuilder";

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
