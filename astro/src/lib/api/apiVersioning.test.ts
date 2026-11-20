import { describe, expect, it } from "vitest";
import type { OpenAPIV3 } from "openapi-types";
import type { SchemaField } from "./schemas/schemaField";
import {
  API_BASE_VERSION,
  diffVersionedSchemaFields,
  getOperationDateVersions,
  projectOperationForDateVersion,
  versionSdkCodeExamples,
} from "./apiVersioning";

const spec = {
  openapi: "3.0.0",
  info: { title: "Versioned API", version: "1" },
  paths: {},
  components: {
    schemas: {
      Dashboard: {
        "x-datadog-api-versioned": true,
        oneOf: [
          { $ref: "#/components/schemas/Dashboard_V1" },
          { $ref: "#/components/schemas/Dashboard_20270101" },
          { $ref: "#/components/schemas/Dashboard_20270415" },
        ],
      },
      Dashboard_V1: {
        type: "object",
        properties: { title: { type: "string" } },
      },
      Dashboard_20270101: {
        type: "object",
        properties: { title: { type: "string" }, owner: { type: "string" } },
      },
      Dashboard_20270415: {
        type: "object",
        properties: { owner: { type: "string" } },
      },
    },
  },
} as OpenAPIV3.Document;

const operation: OpenAPIV3.OperationObject = {
  operationId: "CreateDashboard",
  responses: {
    "200": {
      description: "OK",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Dashboard" },
        },
      },
    },
  },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/Dashboard" },
      },
    },
  },
};

describe("getOperationDateVersions", () => {
  it("discovers the base and dated variants through schema references", () => {
    expect(getOperationDateVersions(spec, operation)).toEqual([
      API_BASE_VERSION,
      "2027-01-01",
      "2027-04-15",
    ]);
  });
});

describe("projectOperationForDateVersion", () => {
  const projectedSchemaRef = (version: string) => {
    const projected = projectOperationForDateVersion(spec, operation, version);
    const response = projected.responses?.["200"] as OpenAPIV3.ResponseObject;
    return response.content?.["application/json"].schema;
  };

  it("projects the base branch", () => {
    expect(projectedSchemaRef(API_BASE_VERSION)).toEqual({
      $ref: "#/components/schemas/Dashboard_V1",
    });
  });

  it("projects an exact dated branch", () => {
    expect(projectedSchemaRef("2027-04-15")).toEqual({
      $ref: "#/components/schemas/Dashboard_20270415",
    });
  });
});

describe("diffVersionedSchemaFields", () => {
  const field = (name: string, children?: SchemaField[]): SchemaField => ({
    name,
    type: children ? "object" : "string",
    required: false,
    deprecated: false,
    readOnly: false,
    description: "",
    ...(children ? { children } : {}),
  });

  it("marks added and removed fields, including nested fields", () => {
    const previous = [field("title"), field("settings", [field("theme")])];
    const current = [field("owner"), field("settings", [field("timezone")])];

    expect(diffVersionedSchemaFields(current, previous, "2027-04-15")).toEqual([
      expect.objectContaining({
        name: "owner",
        versionChange: { type: "added", version: "2027-04-15" },
      }),
      expect.objectContaining({
        name: "settings",
        children: [
          expect.objectContaining({
            name: "timezone",
            versionChange: { type: "added", version: "2027-04-15" },
          }),
          expect.objectContaining({
            name: "theme",
            versionChange: { type: "removed", version: "2027-04-15" },
          }),
        ],
      }),
      expect.objectContaining({
        name: "title",
        versionChange: { type: "removed", version: "2027-04-15" },
      }),
    ]);
  });
});

describe("versionSdkCodeExamples", () => {
  it("rewrites the Python v1 namespace for a dated API package", () => {
    const [versioned] = versionSdkCodeExamples(
      [
        {
          language: "python",
          label: "Python",
          entries: [
            {
              description: "Example",
              code: "from datadog_api_client.v1.api.dashboards_api import DashboardsApi",
              syntax: "python",
            },
          ],
        },
      ],
      "2027-04-15",
    );

    expect(versioned.entries[0].code).toContain(
      "datadog_api_client.v1_20270415.api",
    );
  });
});
