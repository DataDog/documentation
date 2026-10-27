import { describe, it, expect } from "vitest";
import type { OpenAPIV3 } from "openapi-types";
import {
  buildPlaintextCurl,
  extractOauthScopes,
  extractOauthScopesMatch,
  extractPermissionsMatch,
  extractCurlExamples,
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

  it("returns undefined for a single permission, where any/all is moot", () => {
    expect(
      extractPermissionsMatch(withPermissions("AND", ["a_read"])),
    ).toBeUndefined();
  });

  it("returns undefined when there are no permissions", () => {
    expect(extractPermissionsMatch({ responses: {} })).toBeUndefined();
  });
});

describe("extractOauthScopes", () => {
  // Each entry in `security` is an alternative: any one of them is enough.
  it("lists every scope when separate AuthZ entries are alternatives", () => {
    const security = [
      { AuthZ: ["monitors_write"] },
      { AuthZ: ["monitors_draft_write"] },
    ];

    expect(extractOauthScopes(security)).toEqual([
      "monitors_write",
      "monitors_draft_write",
    ]);
    expect(extractOauthScopesMatch(security)).toBe("any");
  });

  it("ignores security entries other than AuthZ", () => {
    const security: OpenAPIV3.SecurityRequirementObject[] = [
      { apiKeyAuth: [], appKeyAuth: [] },
      { AuthZ: ["dashboards_read"] },
    ];

    expect(extractOauthScopes(security)).toEqual(["dashboards_read"]);
    expect(extractOauthScopesMatch(security)).toBeUndefined();
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

  it("gives other non-JSON bodies no example", () => {
    const body = bodyFor({
      "application/x-www-form-urlencoded": {
        schema: objectSchema("name"),
        example: { name: "x" },
      },
    });

    expect(body?.examples).toEqual([]);
  });
});

describe("extractRequestBody request files", () => {
  const body = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object" as const,
          properties: { title: { type: "string" as const } },
        },
        examples: { spec: { summary: "Spec", value: { title: "from-spec" } } },
      },
    },
  } as OpenAPIV3.RequestBodyObject;
  const requestFileExamples = {
    examples: [
      { name: "First file", value: '{\n  "title": "first"\n}' },
      { name: "Second file", value: '{\n  "title": "second"\n}' },
    ],
    showTitles: true,
    isFallbackFile: false,
  };

  // Prod's Example tab shows Hugo's request files, never the spec's examples.
  it("shows the request files in place of the spec's examples", () => {
    const extracted = extractRequestBody(
      spec,
      { responses: {}, requestBody: body },
      requestFileExamples,
    );

    expect(extracted?.examples).toEqual(requestFileExamples.examples);
  });

  it("takes the request files' titling", () => {
    const extracted = extractRequestBody(
      spec,
      { responses: {}, requestBody: body },
      { ...requestFileExamples, showTitles: false },
    );

    expect(extracted?.showExampleTitles).toBe(false);
  });
});

describe("extractCurlExamples", () => {
  const schema = {
    type: "object" as const,
    properties: { title: { type: "string" as const, example: "from-schema" } },
  };
  const bodyWithExamples = (
    examples: Record<string, OpenAPIV3.ExampleObject>,
  ) =>
    ({
      required: true,
      content: { "application/json": { schema, examples } },
    }) as OpenAPIV3.RequestBodyObject;
  const specExample = {
    spec: { summary: "Spec", value: { title: "from-spec" } },
  };

  const requestFiles = {
    examples: [
      { name: "Create a cost monitor", value: '{\n  "title": "cost"\n}' },
      { name: "Create a RUM monitor", value: '{\n  "title": "rum"\n}' },
    ],
    showTitles: true,
    isFallbackFile: false,
  };

  // Decision A: prod repeats every spec example in every request-file card.
  // Astro sends each card's own request file instead.
  it("builds one curl per request file, titled with its CodeExamples description", () => {
    const curlExamples = extractCurlExamples(
      spec,
      { responses: {}, requestBody: bodyWithExamples(specExample) },
      requestFiles,
    );

    expect(curlExamples).toEqual([
      {
        title: "Create a cost monitor",
        bodies: [
          { requestBodyJson: '{\n  "title": "cost"\n}', commentLines: [] },
        ],
      },
      {
        title: "Create a RUM monitor",
        bodies: [
          { requestBodyJson: '{\n  "title": "rum"\n}', commentLines: [] },
        ],
      },
    ]);
  });

  it("leaves the curl untitled when the request file is the fallback file", () => {
    const curlExamples = extractCurlExamples(
      spec,
      { responses: {}, requestBody: bodyWithExamples(specExample) },
      {
        examples: [{ name: "Example", value: "{}" }],
        showTitles: false,
        isFallbackFile: true,
      },
    );

    expect(curlExamples.map((curlExample) => curlExample.title)).toEqual([
      undefined,
    ]);
  });

  // Hugo's curl label bar shows the description even when the Example tab
  // leaves a single request example untitled.
  it("titles a single request file's curl with its CodeExamples description", () => {
    const curlExamples = extractCurlExamples(
      spec,
      { responses: {}, requestBody: bodyWithExamples(specExample) },
      {
        examples: [{ name: "Update a thing returns OK", value: "{}" }],
        showTitles: false,
        isFallbackFile: false,
      },
    );

    expect(curlExamples.map((curlExample) => curlExample.title)).toEqual([
      "Update a thing returns OK",
    ]);
  });

  describe("content encoding", () => {
    const contentEncodingParam = (
      schema: OpenAPIV3.SchemaObject,
    ): OpenAPIV3.ParameterObject => ({
      name: "Content-Encoding",
      in: "header",
      required: false,
      schema,
    });
    const compressibleOperation = (
      schema: OpenAPIV3.SchemaObject,
      summary = "Send logs",
    ): OpenAPIV3.OperationObject => ({
      summary,
      responses: {},
      parameters: [contentEncodingParam(schema)],
      requestBody: bodyWithExamples(specExample),
    });
    const encodingSchema: OpenAPIV3.SchemaObject = {
      type: "string",
      enum: ["deflate", "zstd1", "gzip"],
      example: "deflate",
    };
    const requestFilesTitled = (...names: string[]) => ({
      examples: names.map((name) => ({ name, value: "[]" })),
      showTitles: true,
      isFallbackFile: false,
    });
    const encodings = (curlExamples: ReturnType<typeof extractCurlExamples>) =>
      curlExamples.map((curlExample) => curlExample.bodies[0].contentEncoding);

    // Hugo reads the encoding from the card's title.
    it("compresses a request file whose title names an encoding", () => {
      const curlExamples = extractCurlExamples(
        spec,
        compressibleOperation(encodingSchema),
        requestFilesTitled(
          "Send deflate logs returns OK",
          "Send gzip logs returns OK",
          "Send logs returns OK",
        ),
      );

      expect(encodings(curlExamples)).toEqual(["deflate", "gzip", undefined]);
    });

    it("compresses with the header's example when the title says compression", () => {
      const curlExamples = extractCurlExamples(
        spec,
        compressibleOperation(encodingSchema),
        requestFilesTitled("Submit metrics with compression returns OK"),
      );

      expect(encodings(curlExamples)).toEqual(["deflate"]);
    });

    it("compresses with a required header's example", () => {
      const operation = compressibleOperation(encodingSchema);
      (operation.parameters![0] as OpenAPIV3.ParameterObject).required = true;

      expect(encodings(extractCurlExamples(spec, operation))).toEqual([
        "deflate",
      ]);
    });

    // Without request files, Hugo's card is titled with the summary.
    it("reads the operation's summary when there are no request files", () => {
      const curlExamples = extractCurlExamples(
        spec,
        compressibleOperation(encodingSchema, "Send gzip logs"),
      );

      expect(encodings(curlExamples)).toEqual(["gzip"]);
    });

    // Hugo has a curl shape only for gzip and deflate.
    it("ignores other encodings", () => {
      const curlExamples = extractCurlExamples(
        spec,
        compressibleOperation(encodingSchema),
        requestFilesTitled("Send zstd1 logs returns OK"),
      );

      expect(encodings(curlExamples)).toEqual([undefined]);
    });
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

  it("gives a text response no example when the spec has none", () => {
    const response = responseFor({
      "text/csv": { schema: { type: "string" } },
    });

    expect(response.contentType).toBe("text/csv");
    expect(response.examples).toBeUndefined();
  });

  it("doesn't mark a JSON response with fields, or a primitive array, as having no body", () => {
    const withFields = responseFor({
      "application/json": { schema: objectSchema("id") },
    });
    const primitiveArray = responseFor({
      "application/json": {
        schema: { type: "array", items: { type: "string" } },
      },
    });

    expect(withFields.emptyBody).toBeUndefined();
    expect(withFields.contentType).toBeUndefined();
    expect(primitiveArray.emptyBody).toBeUndefined();
  });

  it("builds the example from the schema, as Hugo does, ignoring the spec's examples", () => {
    const response = responseFor({
      "application/json": {
        schema: {
          type: "object",
          properties: { id: { type: "string" } },
        },
        examples: { default: { value: { id: "from-spec" } } },
      },
    });

    expect(response.examples).toEqual([
      {
        name: "Example",
        value: JSON.stringify({ id: "string" }, null, 2),
      },
    ]);
  });

  it("prefers application/json when a response offers several content types", () => {
    const response = responseFor({
      "text/csv": { schema: objectSchema("row") },
      "application/json": { schema: objectSchema("data") },
    });

    expect(response.schema?.map((field) => field.name)).toEqual(["data"]);
  });
});

describe("compressed curl", () => {
  const params = {
    path: [],
    query: [],
    header: [
      {
        name: "Content-Encoding",
        in: "header",
        schema: { type: "string" as const, enum: ["gzip", "deflate"] },
      },
    ],
  };

  it("compresses the body with the body's content encoding", () => {
    const curl = buildPlaintextCurl(
      spec,
      "post",
      "/api/v2/logs",
      { responses: { "202": { description: "OK" } } },
      params,
      { requestBodyJson: "[]", commentLines: [], contentEncoding: "gzip" },
    );

    expect(curl).toContain('-H "Content-Encoding: gzip"');
    expect(curl).toContain("--data-binary @-");
  });
});

describe("curl parameter examples", () => {
  /** Hugo's curl uses the example or `"CHANGE_ME"`, never the default. */
  it("exports CHANGE_ME, not the default, for a path parameter with no example", () => {
    const curl = buildPlaintextCurl(
      spec,
      "get",
      "/api/v2/rum/config/retention-quota/{scope_type}",
      { responses: { "200": { description: "OK" } } },
      {
        path: [
          {
            name: "scope_type",
            in: "path",
            required: true,
            schema: { type: "string", default: "application" },
          },
        ],
        query: [],
        header: [],
      },
    );

    expect(curl).toContain('export scope_type="CHANGE_ME"');
  });

  it("exports the example from a parameter's $ref schema, as Hugo does", () => {
    const specWithMapKind = {
      ...spec,
      components: {
        ...spec.components,
        schemas: {
          ...spec.components?.schemas,
          SourcemapMapKind: { type: "string", example: "js" },
        },
      },
    } as OpenAPIV3.Document;
    const curl = buildPlaintextCurl(
      specWithMapKind,
      "delete",
      "/api/v2/rum/sourcemaps",
      { responses: { "200": { description: "OK" } } },
      {
        path: [],
        query: [
          {
            name: "mapkind",
            in: "query",
            required: true,
            schema: { $ref: "#/components/schemas/SourcemapMapKind" },
          },
        ],
        header: [],
      },
    );

    expect(curl).toContain('export mapkind="js"');
  });
});

describe("curl query parameters", () => {
  const operation = { responses: { "200": { description: "OK" } } };
  const curlFor = (query: OpenAPIV3.ParameterObject[]) =>
    buildPlaintextCurl(spec, "get", "/api/v1/graph/snapshot", operation, {
      path: [],
      query,
      header: [],
    });

  it("treats x-docs-curl-required as required, as Hugo does", () => {
    const curl = curlFor([
      {
        name: "metric_query",
        in: "query",
        schema: { type: "string" },
        "x-docs-curl-required": true,
      } as OpenAPIV3.ParameterObject,
    ]);

    expect(curl).toContain('export metric_query="CHANGE_ME"');
    expect(curl).toContain("?metric_query=${metric_query}");
  });

  /** Hugo's curl uses the example or `"CHANGE_ME"`, never the default. */
  it("exports CHANGE_ME, not the default, for a required query parameter with no example", () => {
    const curl = curlFor([
      {
        name: "start",
        in: "query",
        required: true,
        schema: { type: "integer", default: 10 },
      },
    ]);

    expect(curl).toContain('export start="CHANGE_ME"');
  });

  /** Hugo splits an array only when `explode` is set explicitly. */
  it("keeps one variable for an array query parameter without explode", () => {
    const curl = curlFor([
      {
        name: "row_id",
        in: "query",
        required: true,
        example: ["row1", "row2"],
        schema: { type: "array", items: { type: "string" } },
      },
    ]);

    expect(curl).toContain("?row_id=${row_id}");
  });
});
