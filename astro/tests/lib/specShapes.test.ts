import { describe, it, expect } from "vitest";
import { detectOperationShapes, detectTagShapes } from "./specShapes";

/** Builds a one-operation spec and returns that operation's shapes. */
function shapesOf(
  operation: Record<string, unknown>,
  extras: { pathItem?: Record<string, unknown>; components?: unknown } = {},
): Set<string> {
  const spec = {
    paths: {
      "/api/v2/things/{thing_id}": {
        ...extras.pathItem,
        post: { operationId: "CreateThing", ...operation },
      },
    },
    components: extras.components ?? {},
  };
  const [operationShapes] = detectOperationShapes(spec, "v2");
  return operationShapes.shapes;
}

describe("detectOperationShapes", () => {
  it("identifies each operation by version, operationId, method and path", () => {
    const spec = {
      paths: {
        "/api/v1/a": { get: { operationId: "GetA" }, delete: {} },
      },
    };
    const operations = detectOperationShapes(spec, "v1").map(
      ({ version, operationId, method, path }) => ({
        version,
        operationId,
        method,
        path,
      }),
    );
    expect(operations).toEqual([
      { version: "v1", operationId: "GetA", method: "get", path: "/api/v1/a" },
      {
        version: "v1",
        operationId: "delete /api/v1/a",
        method: "delete",
        path: "/api/v1/a",
      },
    ]);
  });

  it("detects parameter shapes, including path-level and $ref parameters", () => {
    const shapes = shapesOf(
      {
        parameters: [
          { $ref: "#/components/parameters/FilterEnv" },
          {
            name: "page[size]",
            in: "query",
            schema: { type: "integer", format: "int64", maximum: 100 },
          },
        ],
      },
      {
        pathItem: {
          parameters: [
            {
              name: "thing_id",
              in: "path",
              required: true,
              description: "The `id`.",
              schema: { type: "string" },
            },
          ],
        },
        components: {
          parameters: {
            FilterEnv: {
              name: "filter[env]",
              in: "query",
              required: true,
              style: "form",
              explode: false,
              schema: { type: "string", enum: ["prod", "staging"] },
            },
          },
        },
      },
    );
    for (const shape of [
      "param:path-level",
      "param:in:path",
      "param:in:query",
      "param:required-query",
      "param:style:form",
      "param:explode:false",
      "param:bracket-name-required",
      "param:bracket-name-optional",
      "param-desc:inline-code",
      "param:no-description",
      "param:enum",
      "param:format:int64",
      "param:maximum",
    ])
      expect(shapes).toContain(shape);
    expect(shapes).not.toContain("param:required-path");
  });

  it("detects request body shapes", () => {
    const shapes = shapesOf({
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["data", "missing"],
              properties: {
                data: {
                  oneOf: [
                    { type: "string" },
                    { type: "object", properties: {} },
                  ],
                },
                tags: {
                  type: "array",
                  items: { type: "array", items: { type: "string" } },
                },
                level: { type: "integer", enum: [1, 2] },
              },
            },
          },
          "multipart/form-data": {
            schema: { type: "string", format: "binary" },
          },
        },
      },
    });
    for (const shape of [
      "req:body-required",
      "req:required",
      "req:content-type:application/json",
      "req:content-type:multipart/form-data",
      "req:multiple-content-types",
      "req:top-level-string",
      "req:required-not-in-properties",
      "req:oneOf",
      "req:oneOf-inline-variant",
      "req:oneOf-primitive-variant",
      "req:empty-properties",
      "req:array-of-arrays",
      "req:enum-non-string",
      "req:format:binary",
    ])
      expect(shapes).toContain(shape);
    expect(shapes).not.toContain("req:none");
  });

  it("detects response shapes and walks only 2xx schemas", () => {
    const shapes = shapesOf(
      {
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  additionalProperties: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },
          },
          "204": { description: "No content" },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      {
        components: {
          responses: {
            NotFound: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      errors: {
                        type: "array",
                        items: { type: "string", nullable: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    );
    for (const shape of [
      "res:code:200",
      "res:code:204",
      "res:code:404",
      "res:multiple-2xx",
      "res:no-content-2xx",
      "res:ref-response",
      "res:additionalProperties:array",
      "res:map-of-arrays",
    ])
      expect(shapes).toContain(shape);
    // The 404 schema's nullable item isn't walked.
    expect(shapes).not.toContain("res:nullable");
  });

  it("detects Markdown features in descriptions", () => {
    const shapes = shapesOf({
      description: [
        "Intro with **bold**, a [link](/api/) and `code`.",
        "",
        "| A | B |",
        "|---|---|",
        "- item",
        "1. step",
        "```json\n{}\n```",
        "<div>html</div>",
        "## Heading",
        "{{< callout >}}x{{< /callout >}}",
      ].join("\n"),
    });
    for (const feature of [
      "bold",
      "link",
      "inline-code",
      "multi-paragraph",
      "table",
      "bullet-list",
      "numbered-list",
      "code-fence",
      "raw-html",
      "heading",
      "hugo-shortcode",
    ])
      expect(shapes).toContain(`op-desc:${feature}`);
  });

  it("detects operation extensions, permissions and security", () => {
    const shapes = shapesOf({
      deprecated: true,
      "x-unstable": "Beta.",
      "x-menu-order": 3,
      "x-permission": { operator: "AND", permissions: ["a_read", "b_read"] },
      "x-custom-thing": true,
      "x-undo": { type: "safe" },
      security: [
        { apiKeyAuth: [], appKeyAuth: [] },
        { AuthZ: ["things_read"] },
        {},
      ],
      servers: [
        {
          url: "https://{subdomain}.{site}",
          variables: { site: {}, region: {}, subdomain: { default: "ip" } },
        },
      ],
    });
    for (const shape of [
      "op:deprecated",
      "op:x-unstable",
      "op:x-menu-order",
      "op:x-permission:AND:many",
      "op:x-custom-thing",
      "op:security:apiKeyAuth",
      "op:security:AuthZ",
      "op:security-and-combo",
      "op:security-optional",
      "op:oauth-scopes",
      "op:servers-override",
      "op:servers-extra-variables",
      "op:servers-subdomain",
      "op:no-description",
    ])
      expect(shapes).toContain(shape);
    expect(shapes).not.toContain("op:x-undo");
  });

  it("ignores a servers[0] subdomain of api, the global default", () => {
    const shapes = shapesOf({
      servers: [
        {
          url: "https://{subdomain}.{site}",
          variables: { subdomain: { default: "api" } },
        },
        {
          url: "https://{subdomain}.{site}",
          variables: { subdomain: { default: "ip" } },
        },
      ],
    });
    expect(shapes).toContain("op:servers-override");
    expect(shapes).not.toContain("op:servers-subdomain");
  });

  it("marks a recursive $ref once instead of looping", () => {
    const shapes = shapesOf(
      {
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Node" },
            },
          },
        },
      },
      {
        components: {
          schemas: {
            Node: {
              type: "object",
              properties: {
                children: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Node" },
                },
              },
            },
          },
        },
      },
    );
    expect(shapes).toContain("req:recursive-ref");
    expect(shapes).toContain("req:body-optional");
  });
});

describe("detectTagShapes", () => {
  it("detects Markdown features and external docs on tags", () => {
    const shapes = detectTagShapes({
      tags: [
        {
          name: "A",
          description: "See [docs](/a/).",
          externalDocs: { url: "https://example.com" },
        },
        { name: "B" },
      ],
    });
    expect([...shapes].sort()).toEqual(["tag-desc:link", "tag:externalDocs"]);
  });
});
