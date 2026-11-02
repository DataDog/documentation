import { describe, it, expect } from "vitest";
import type { OpenAPIV3 } from "openapi-types";
import { buildSchemaExample } from "./schemaExampleBuilder";

const spec = {
  openapi: "3.0.0",
  info: { title: "test", version: "1" },
  paths: {},
  components: {
    schemas: {
      Author: {
        type: "object",
        properties: {
          email: { type: "string" },
          handle: { type: "string" },
        },
      },
      Handle: { type: "string", example: "from-ref" },
      Named: {
        type: "object",
        properties: { name: { type: "string", example: "from-ref" } },
      },
    },
  },
} as OpenAPIV3.Document;

const responseExample = (schema: unknown) =>
  buildSchemaExample(spec, "response", schema as OpenAPIV3.SchemaObject);

describe("buildSchemaExample", () => {
  it("returns a response schema's top-level example as is", () => {
    expect(
      responseExample({
        type: "object",
        properties: { id: { type: "string" } },
        example: { id: "top" },
      }),
    ).toEqual({ id: "top" });
  });

  it("wraps a top-level array of scalars", () => {
    expect(
      responseExample({ type: "array", items: { type: "string" } }),
    ).toEqual([]);
  });
});

describe("buildSchemaExample with a schema that refers to itself", () => {
  // LogsAPIError: `details` is an array of LogsAPIError. Hugo's dereferenced
  // spec has the string "[Circular]" where the cycle closes, so its walk
  // writes an empty array there.
  const circularSpec = {
    ...spec,
    components: {
      schemas: {
        LogsAPIError: {
          type: "object",
          properties: {
            code: { type: "string" },
            details: {
              type: "array",
              items: { $ref: "#/components/schemas/LogsAPIError" },
            },
            message: { type: "string" },
          },
        },
        LogsAPIErrorResponse: {
          type: "object",
          properties: {
            error: { $ref: "#/components/schemas/LogsAPIError" },
          },
        },
      },
    },
  } as OpenAPIV3.Document;

  it("stops at the cycle, as Hugo does", () => {
    const example = buildSchemaExample(circularSpec, "response", {
      $ref: "#/components/schemas/LogsAPIErrorResponse",
    });

    expect(example).toEqual({
      error: { code: "string", details: [], message: "string" },
    });
  });

  it("still repeats a schema that isn't its own ancestor", () => {
    const siblingSpec = {
      ...spec,
      components: {
        schemas: {
          Named: {
            type: "object",
            properties: { name: { type: "string" } },
          },
          Pair: {
            type: "object",
            properties: {
              first: { $ref: "#/components/schemas/Named" },
              second: { $ref: "#/components/schemas/Named" },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const example = buildSchemaExample(siblingSpec, "response", {
      $ref: "#/components/schemas/Pair",
    });

    expect(example).toEqual({
      first: { name: "string" },
      second: { name: "string" },
    });
  });
});
