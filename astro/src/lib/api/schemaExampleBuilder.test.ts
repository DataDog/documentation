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
  it("fills fields without an example with Hugo's type placeholders", () => {
    expect(
      responseExample({
        type: "object",
        properties: {
          count: { type: "integer" },
          name: { type: "string" },
          created: { type: "string", format: "date-time" },
          enabled: { type: "boolean" },
          tags: { type: "array" },
          meta: { type: "object" },
        },
      }),
    ).toEqual({
      count: "integer",
      name: "string",
      created: "2019-09-19T10:00:00.000Z",
      enabled: false,
      tags: [],
      meta: {},
    });
  });

  it("uses a field's own example", () => {
    expect(
      responseExample({
        type: "object",
        properties: {
          id: { type: "integer", example: 123 },
          tags: { type: "array", items: { type: "string" }, example: ["a"] },
        },
      }),
    ).toEqual({ id: 123, tags: ["a"] });
  });

  it("nests objects and arrays of objects, following $refs", () => {
    expect(
      responseExample({
        type: "object",
        properties: {
          lists: {
            type: "array",
            items: {
              type: "object",
              properties: {
                author: { $ref: "#/components/schemas/Author" },
                count: { type: "integer" },
              },
            },
          },
        },
      }),
    ).toEqual({
      lists: [
        { author: { email: "string", handle: "string" }, count: "integer" },
      ],
    });
  });

  it("writes additionalProperties as an <any-key> entry", () => {
    expect(
      responseExample({
        type: "object",
        properties: {
          rules: {
            type: "object",
            additionalProperties: { type: "boolean" },
          },
        },
      }),
    ).toEqual({ rules: { "<any-key>": false } });
  });

  it("uses the first oneOf variant", () => {
    expect(
      responseExample({
        type: "object",
        properties: {
          data: {
            oneOf: [
              { $ref: "#/components/schemas/Named" },
              { type: "object", properties: { other: { type: "string" } } },
            ],
          },
        },
      }),
    ).toEqual({ data: { name: "from-ref" } });
  });

  it("returns a response schema's top-level example as is", () => {
    expect(
      responseExample({
        type: "object",
        properties: { id: { type: "string" } },
        example: { id: "top" },
      }),
    ).toEqual({ id: "top" });
  });

  // Hugo's `getJsonWrapChars` leaves the default braces for an array of
  // objects, so prod shows the item object without the array around it.
  it("unwraps a top-level array of objects, as Hugo does", () => {
    expect(
      responseExample({
        type: "array",
        items: { type: "object", properties: { id: { type: "string" } } },
      }),
    ).toEqual({ id: "string" });
  });

  it("wraps a top-level array of scalars", () => {
    expect(
      responseExample({ type: "array", items: { type: "string" } }),
    ).toEqual([]);
  });

  it("skips write-only fields in responses and read-only fields in requests", () => {
    const schema = {
      type: "object",
      properties: {
        id: { type: "string", readOnly: true },
        secret: { type: "string", writeOnly: true },
      },
    } as OpenAPIV3.SchemaObject;

    expect(buildSchemaExample(spec, "response", schema)).toEqual({
      id: "string",
    });
    expect(buildSchemaExample(spec, "request", schema)).toEqual({
      secret: "string",
    });
  });

  it("lets keys beside a $ref override the referenced schema", () => {
    expect(
      responseExample({
        type: "object",
        properties: {
          handle: { $ref: "#/components/schemas/Handle", example: "me" },
        },
      }),
    ).toEqual({ handle: "me" });
  });
});
