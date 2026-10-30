import { describe, it, expect } from "vitest";
import type { OpenAPIV3 } from "openapi-types";
import { multipartFormExamples } from "./multipartFormExamples";

const spec = {
  openapi: "3.0.0",
  info: { title: "test", version: "1" },
  paths: {},
  components: {
    schemas: {
      IdpForm: {
        type: "object",
        properties: {
          idp_file: { type: "string", format: "binary" },
        },
      },
    },
  },
} as OpenAPIV3.Document;

const binaryField = { type: "string", format: "binary" } as const;

describe("multipartFormExamples", () => {
  it("adds the @ when the example names a file without it", () => {
    const result = multipartFormExamples(spec, {
      schema: { $ref: "#/components/schemas/IdpForm" },
      examples: { default: { value: { idp_file: "metadata.xml" } } },
    });

    expect(result.examples[0].value).toBe("-F 'idp_file=@metadata.xml'");
  });

  it("writes a field that isn't a file as its value", () => {
    const result = multipartFormExamples(spec, {
      schema: {
        type: "object",
        properties: { name: { type: "string" }, upload: binaryField },
      },
      example: { name: "my-app", upload: "app.zip" },
    });

    expect(result.examples[0].value).toBe(
      "-F 'name=my-app'\n-F 'upload=@app.zip'",
    );
  });

  it("escapes single quotes for the shell", () => {
    const result = multipartFormExamples(spec, {
      schema: { type: "object", properties: { note: { type: "string" } } },
      example: { note: "it's" },
    });

    expect(result.examples[0].value).toBe(`-F 'note=it'\\''s'`);
  });

  it("titles several examples by their summaries, dropping duplicates", () => {
    const sourceMap = { source_map: "main.js.map" };
    const result = multipartFormExamples(spec, {
      schema: {
        type: "object",
        properties: {
          source_map: binaryField,
          symbols_archive: binaryField,
        },
      },
      examples: {
        default: { summary: "Source map upload", value: sourceMap },
        js_sourcemap: { summary: "Source map upload", value: sourceMap },
        ios_symbols: { value: { symbols_archive: "MyApp.dSYM.zip" } },
      },
    });

    expect(result.showTitles).toBe(true);
    expect(result.examples.map((example) => example.name)).toEqual([
      "Source map upload",
      "ios_symbols",
    ]);
  });

  it("builds the example from the schema when the spec's is empty", () => {
    const result = multipartFormExamples(spec, {
      schema: {
        type: "object",
        properties: {
          idp_file: binaryField,
          image: { ...binaryField, example: "screenshot.png" },
          label: { type: "string", example: "prod" },
        },
      },
      examples: { default: { value: {} } },
    });

    expect(result.examples).toEqual([
      {
        name: "Example",
        value:
          "-F 'idp_file=@/path/to/file'\n" +
          "-F 'image=@screenshot.png'\n" +
          "-F 'label=prod'",
        language: "bash",
      },
    ]);
  });

  it("gives no example when the schema has no fields and the spec has no example", () => {
    const result = multipartFormExamples(spec, { schema: { type: "object" } });

    expect(result).toEqual({ examples: [], showTitles: false });
  });
});
