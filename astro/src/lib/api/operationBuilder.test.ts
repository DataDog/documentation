import { describe, it, expect } from "vitest";
import type { OpenAPIV3 } from "openapi-types";
import {
  buildCurlByRegion,
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

  // Scopes in one entry are all required, so there's no match to state.
  it("keeps the scopes of a single entry, without a match", () => {
    const security = [{ AuthZ: ["usage_read", "billing_read"] }];

    expect(extractOauthScopes(security)).toEqual([
      "usage_read",
      "billing_read",
    ]);
    expect(extractOauthScopesMatch(security)).toBeUndefined();
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

  // Without request files, prod shows the example Hugo builds from the
  // schema (examples.json), never the spec's examples.
  it("builds the example from the schema when there are no request files", () => {
    const extracted = extractRequestBody(
      spec,
      { responses: {}, requestBody: body },
      { examples: [], showTitles: true },
    );

    expect(extracted?.examples).toEqual([
      { name: "Example", value: '{\n  "title": "string"\n}' },
    ]);
    expect(extracted?.showExampleTitles).toBe(false);
  });

  it("leaves read-only fields out of the schema-built example", () => {
    const withReadOnlyField = {
      ...body,
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: { type: "string" as const, readOnly: true },
              title: { type: "string" as const },
            },
          },
        },
      },
    };
    const extracted = extractRequestBody(spec, {
      responses: {},
      requestBody: withReadOnlyField,
    });

    expect(JSON.parse(extracted!.examples[0].value)).toEqual({
      title: "string",
    });
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

  it("leaves the curl untitled when the request file is untitled", () => {
    const curlExamples = extractCurlExamples(
      spec,
      { responses: {}, requestBody: bodyWithExamples(specExample) },
      { examples: [{ name: "Example", value: "{}" }], showTitles: false },
    );

    expect(curlExamples.map((curlExample) => curlExample.title)).toEqual([
      undefined,
    ]);
  });

  // Prod's curl sends the spec's example, not the Example tab's body.
  it("sends the spec's example, without comment lines, when it's the only one", () => {
    const curlExamples = extractCurlExamples(spec, {
      responses: {},
      requestBody: bodyWithExamples(specExample),
    });

    expect(curlExamples).toHaveLength(1);
    expect(curlExamples[0].title).toBeUndefined();
    expect(curlExamples[0].bodies).toHaveLength(1);
    expect(JSON.parse(curlExamples[0].bodies[0].requestBodyJson!)).toEqual({
      title: "from-spec",
    });
    expect(curlExamples[0].bodies[0].commentLines).toEqual([]);
  });

  // Hugo ranges over the examples map, which Go iterates in key order, and
  // heads each curl with the example's summary (or id) and description.
  it("sends each of several spec examples in key order, headed by its summary or id", () => {
    const curlExamples = extractCurlExamples(spec, {
      responses: {},
      requestBody: bodyWithExamples({
        weekly: {
          summary: "Weekly update",
          description: "Runs every week.\nOn Mondays.",
          value: { title: "weekly" },
        },
        default: { value: { title: "default" } },
      }),
    });

    expect(curlExamples).toHaveLength(1);
    expect(
      curlExamples[0].bodies.map((body) => ({
        title: JSON.parse(body.requestBodyJson!).title,
        commentLines: body.commentLines,
      })),
    ).toEqual([
      { title: "default", commentLines: ["## default"] },
      {
        title: "weekly",
        commentLines: [
          "## Weekly update",
          "# Runs every week.",
          "# On Mondays.",
        ],
      },
    ]);
  });

  it("builds the body from the schema when there are no examples", () => {
    const curlExamples = extractCurlExamples(spec, {
      responses: {},
      requestBody: bodyWithExamples({}),
    });

    expect(JSON.parse(curlExamples[0].bodies[0].requestBodyJson!)).toEqual({
      title: "from-schema",
    });
  });

  it("sends no JSON body for a non-JSON request body", () => {
    const curlExamples = extractCurlExamples(spec, {
      responses: {},
      requestBody: {
        content: {
          "multipart/form-data": { schema, example: { title: "upload" } },
        },
      },
    });

    expect(curlExamples).toEqual([
      {
        title: undefined,
        bodies: [{ requestBodyJson: undefined, commentLines: [] }],
      },
    ]);
  });

  it("builds one curl without a body when the operation has none", () => {
    expect(extractCurlExamples(spec, { responses: {} })).toEqual([
      {
        title: undefined,
        bodies: [{ requestBodyJson: undefined, commentLines: [] }],
      },
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

describe("curl Accept header", () => {
  const noParams = { path: [], query: [], header: [] };
  const curlFor = (responses: OpenAPIV3.ResponsesObject) =>
    buildPlaintextCurl(
      spec,
      "delete",
      "/api/v2/downtime/{downtime_id}",
      { responses },
      noParams,
    );

  it("leaves out the Accept header when the operation has a 204 response", () => {
    expect(curlFor({ "204": { description: "OK" } })).not.toContain("Accept:");
  });

  it("keeps the Accept header when the operation has no 204 response", () => {
    expect(curlFor({ "200": { description: "OK" } })).toContain(
      '-H "Accept: application/json"',
    );
  });
});

describe("curl Content-Type header", () => {
  const noParams = { path: [], query: [], header: [] };

  it("leaves out Content-Type when the operation has no request body", () => {
    const curl = buildPlaintextCurl(
      spec,
      "post",
      "/api/v1/monitor/unmute_all",
      { responses: { "200": { description: "OK" } } },
      noParams,
    );

    expect(curl).not.toContain("Content-Type");
  });

  it("sends Content-Type when the operation has a request body", () => {
    const curl = buildPlaintextCurl(
      spec,
      "post",
      "/api/v2/example",
      {
        requestBody: {
          content: { "text/plain": { schema: { type: "string" } } },
        },
        responses: { "200": { description: "OK" } },
      },
      noParams,
    );

    expect(curl).toContain('-H "Content-Type: application/json"');
  });
});

describe("curl header parameters", () => {
  it("sends a required header parameter with its example", () => {
    const curl = buildPlaintextCurl(
      spec,
      "post",
      "/api/v2/security/threat-intel-feed",
      { responses: { "200": { description: "OK" } } },
      {
        path: [],
        query: [],
        header: [
          {
            name: "ti_vendor",
            in: "header",
            required: true,
            schema: { type: "string", example: "acme" },
          },
        ],
      },
    );

    expect(curl).toContain('-H "ti_vendor: acme"');
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

  it("splits a required, exploded array query parameter into one variable per item", () => {
    const curl = curlFor([
      {
        name: "row_id",
        in: "query",
        required: true,
        explode: true,
        example: ["row1", "row2"],
        schema: { type: "array", items: { type: "string" } },
      },
    ]);

    expect(curl).toContain("?row_id=${row_id_0}&row_id=${row_id_1}");
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

  it("leaves out an optional query parameter that has an example", () => {
    const curl = curlFor([{ name: "title", in: "query", example: "My graph" }]);

    expect(curl).not.toContain("title");
  });
});

describe("curl for a multipart body", () => {
  const noParams = { path: [], query: [], header: [] };
  const operation = {
    responses: { "200": { description: "OK" } },
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              label: { type: "string" },
              idp_file: { type: "string", format: "binary" },
            },
          },
        },
      },
    },
  } as OpenAPIV3.OperationObject;

  it("writes one -F per property, in key order, with @ for binary fields", () => {
    const curl = buildPlaintextCurl(
      spec,
      "post",
      "/api/v2/saml_configurations/idp_metadata",
      operation,
      noParams,
    );

    expect(curl).toContain('-H "Content-Type: multipart/form-data"');
    expect(curl).toContain("-F idp_file=@string \\\n-F label=string");
  });
});

describe("curl for per-region hosts", () => {
  const noParams = { path: [], query: [], header: [] };
  const operation = {
    responses: { "200": { description: "OK" } },
    servers: [
      {
        url: "https://{site}",
        variables: {
          site: {
            default: "navy.oncall.datadoghq.com",
            enum: ["navy.oncall.datadoghq.com", "beige.oncall.datadoghq.eu"],
          },
        },
      },
    ],
  } as OpenAPIV3.OperationObject;

  it("uses each region's host in its curl", () => {
    const curlByRegion = buildCurlByRegion(
      spec,
      "post",
      "/api/v2/on-call/pages",
      operation,
      noParams,
    );

    expect(curlByRegion.us).toContain(
      '"https://navy.oncall.datadoghq.com/api/v2/on-call/pages"',
    );
    expect(curlByRegion.eu).toContain(
      '"https://beige.oncall.datadoghq.eu/api/v2/on-call/pages"',
    );
  });

  it("uses the first region's host in the .md curl", () => {
    const curl = buildPlaintextCurl(
      spec,
      "post",
      "/api/v2/on-call/pages",
      operation,
      noParams,
    );

    expect(curl).toContain(
      '"https://navy.oncall.datadoghq.com/api/v2/on-call/pages"',
    );
    expect(curl).not.toContain("DD_SITE");
  });

  it("lists the other regions' hosts in the .md curl", () => {
    const curl = buildPlaintextCurl(
      spec,
      "post",
      "/api/v2/on-call/pages",
      operation,
      noParams,
    );

    expect(curl).toContain(
      "# For sites other than datadoghq.com, replace the host below with: beige.oncall.datadoghq.eu (datadoghq.eu)",
    );
  });

  it("leaves the other-hosts comment out of the HTML curl", () => {
    const curlByRegion = buildCurlByRegion(
      spec,
      "post",
      "/api/v2/on-call/pages",
      operation,
      noParams,
    );

    expect(curlByRegion.us).not.toContain("# For sites other than");
  });
});
