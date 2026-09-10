import { describe, it, expect } from "vitest";
import {
  resolveRef,
  schemaToFields,
  paramsToFields,
  topLevelSchemaToFields,
  getBestDiscriminant,
  unionOptionLabels,
  stripReadOnlyFields,
} from "@lib/api/refResolver";

describe("resolveRef", () => {
  it("resolves a simple $ref path", () => {
    const spec = {
      components: {
        schemas: {
          Foo: { type: "object", properties: { id: { type: "string" } } },
        },
      },
    };

    const result = resolveRef(spec, "#/components/schemas/Foo");
    expect(result).toEqual(spec.components.schemas.Foo);
  });

  it("returns undefined for an invalid path", () => {
    const spec = { components: {} };
    const result = resolveRef(spec, "#/components/schemas/Missing");
    expect(result).toBeUndefined();
  });

  it("handles JSON Pointer escapes (~1 for /)", () => {
    const spec = { components: { schemas: { "Foo/Bar": { type: "string" } } } };
    const result = resolveRef(spec, "#/components/schemas/Foo~1Bar");
    expect(result).toEqual({ type: "string" });
  });
});

describe("schemaToFields", () => {
  it("converts a simple object schema to fields", () => {
    const spec = {};
    const schema = {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", description: "The name" },
        count: { type: "integer", description: "A count" },
      },
    };

    const fields = schemaToFields(spec, schema);
    expect(fields).toHaveLength(2);

    const nameField = fields.find((f) => f.name === "name")!;
    expect(nameField.type).toBe("string");
    expect(nameField.required).toBe(true);
    expect(nameField.description).toBe("The name");

    const countField = fields.find((f) => f.name === "count")!;
    expect(countField.type).toBe("integer");
    expect(countField.required).toBe(false);
  });

  it("resolves $ref and returns the referenced schema fields", () => {
    const spec = {
      components: {
        schemas: {
          Widget: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
        },
      },
    };

    const schema = { $ref: "#/components/schemas/Widget" };
    const fields = schemaToFields(spec, schema);
    expect(fields).toHaveLength(1);
    expect(fields[0].name).toBe("id");
    expect(fields[0].type).toBe("string");
  });

  it("handles circular $ref references gracefully", () => {
    const spec = {
      components: {
        schemas: {
          Tree: {
            type: "object",
            properties: {
              children: {
                type: "array",
                items: { $ref: "#/components/schemas/Tree" },
              },
            },
          },
        },
      },
    };

    const schema = { $ref: "#/components/schemas/Tree" };
    // Should not throw — circular refs are caught
    const fields = schemaToFields(spec, schema);
    expect(fields).toBeDefined();
    expect(fields.length).toBeGreaterThan(0);
  });

  it("converts enum values", () => {
    const spec = {};
    const schema = {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["active", "inactive", "pending"],
          description: "Current status",
        },
      },
    };

    const fields = schemaToFields(spec, schema);
    expect(fields[0].enumValues).toEqual(["active", "inactive", "pending"]);
  });

  it("handles deprecated and readOnly flags", () => {
    const spec = {};
    const schema = {
      type: "object",
      properties: {
        old_field: { type: "string", deprecated: true, description: "Old" },
        generated: { type: "string", readOnly: true, description: "Auto" },
      },
    };

    const fields = schemaToFields(spec, schema);
    const oldField = fields.find((f) => f.name === "old_field")!;
    expect(oldField.deprecated).toBe(true);

    const genField = fields.find((f) => f.name === "generated")!;
    expect(genField.readOnly).toBe(true);
  });

  it("handles oneOf union types", () => {
    const spec = {};
    const schema = {
      oneOf: [
        { type: "string", description: "A string value" },
        { type: "number", description: "A number value" },
      ],
    };

    const fields = schemaToFields(spec, schema);
    expect(fields).toHaveLength(1);
    expect(fields[0].type).toBe("oneOf");
    expect(fields[0].unionOptions).toHaveLength(2);
    // No discriminant is available, so options fall back to positional
    // "Object N" labels, matching Hugo.
    expect(fields[0].unionOptions?.[0].label).toBe("Object 1");
    expect(fields[0].unionOptions?.[1].label).toBe("Object 2");
    // The variant's own description is carried through.
    expect(fields[0].unionOptions?.[0].description).toBe("A string value");
  });

  it("labels union options by discriminant when one is available", () => {
    const spec = {};
    const schema = {
      oneOf: [
        {
          type: "object",
          properties: {
            type: { type: "string", enum: ["toplist"] },
            requests: { type: "array", items: { type: "string" } },
          },
        },
        {
          type: "object",
          properties: {
            type: { type: "string", enum: ["timeseries"] },
            requests: { type: "array", items: { type: "string" } },
          },
        },
      ],
    };

    const fields = schemaToFields(spec, schema);
    expect(fields[0].unionOptions?.map((o) => o.label)).toEqual([
      "<type=toplist>",
      "<type=timeseries>",
    ]);
  });

  it("resolves $ref branches before deriving discriminant labels", () => {
    const spec = {
      components: {
        schemas: {
          ToplistWidget: {
            type: "object",
            description: "A toplist widget.",
            properties: { type: { type: "string", enum: ["toplist"] } },
          },
          NoteWidget: {
            type: "object",
            description: "A note widget.",
            properties: { type: { type: "string", enum: ["note"] } },
          },
        },
      },
    };
    const schema = {
      oneOf: [
        { $ref: "#/components/schemas/ToplistWidget" },
        { $ref: "#/components/schemas/NoteWidget" },
      ],
    };

    const fields = schemaToFields(spec, schema);
    expect(fields[0].unionOptions?.map((o) => o.label)).toEqual([
      "<type=toplist>",
      "<type=note>",
    ]);
  });

  it("resolves $ref discriminant properties, as the live spec uses", () => {
    // The real spec never inlines the discriminant enum — it points at a
    // dedicated `*DefinitionType` schema. Hugo sees these pre-dereferenced.
    const spec = {
      components: {
        schemas: {
          ToplistWidgetDefinitionType: {
            default: "toplist",
            enum: ["toplist"],
            type: "string",
          },
          NoteWidgetDefinitionType: {
            default: "note",
            enum: ["note"],
            type: "string",
          },
          ToplistWidget: {
            type: "object",
            properties: {
              type: {
                $ref: "#/components/schemas/ToplistWidgetDefinitionType",
              },
            },
          },
          NoteWidget: {
            type: "object",
            properties: {
              type: { $ref: "#/components/schemas/NoteWidgetDefinitionType" },
            },
          },
        },
      },
    };
    const schema = {
      oneOf: [
        { $ref: "#/components/schemas/ToplistWidget" },
        { $ref: "#/components/schemas/NoteWidget" },
      ],
    };

    const fields = schemaToFields(spec, schema);
    expect(fields[0].unionOptions?.map((o) => o.label)).toEqual([
      "<type=toplist>",
      "<type=note>",
    ]);
  });

  it("labels $ref union options positionally, not by ref name", () => {
    const spec = {
      components: {
        schemas: {
          AWSIntegration: {
            type: "object",
            description: "The definition of `AWSIntegration` object.",
            properties: { account_id: { type: "string" } },
          },
        },
      },
    };
    const schema = { oneOf: [{ $ref: "#/components/schemas/AWSIntegration" }] };

    const fields = schemaToFields(spec, schema);
    const option = fields[0].unionOptions?.[0];
    expect(option?.label).toBe("Object 1");
    expect(option?.label).not.toBe("AWSIntegration");
    // Ref name is preserved via the variant's description, as in Hugo.
    expect(option?.description).toBe(
      "The definition of `AWSIntegration` object.",
    );
  });

  it("reports an array of $ref-to-union as <oneOf>, not the schema name", () => {
    // Mirrors LogsProcessor: a named schema that is a bare oneOf. Hugo reads a
    // dereferenced spec and renders `[<oneOf>]`; reporting "LogsProcessor"
    // would hide the union.
    const spec = {
      components: {
        schemas: {
          LogsProcessor: {
            description: "A processor.",
            oneOf: [
              {
                type: "object",
                properties: { type: { type: "string", enum: ["grok-parser"] } },
              },
              {
                type: "object",
                properties: {
                  type: { type: "string", enum: ["date-remapper"] },
                },
              },
            ],
          },
        },
      },
    };
    const schema = {
      type: "object",
      properties: {
        processors: {
          type: "array",
          description: "Ordered list of processors.",
          items: { $ref: "#/components/schemas/LogsProcessor" },
        },
      },
    };

    const [processors] = schemaToFields(spec, schema);
    expect(processors.type).toBe("[<oneOf>]");
    // The options hang directly off the array — no blank intermediate row.
    expect(processors.children).toBeUndefined();
    expect(processors.unionOptions?.map((o) => o.label)).toEqual([
      "<type=grok-parser>",
      "<type=date-remapper>",
    ]);
    // The array keeps its own description, matching Hugo.
    expect(processors.description).toBe("Ordered list of processors.");
  });

  it("reports an array of inline union as <oneOf>", () => {
    const schema = {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: { oneOf: [{ type: "string" }, { type: "number" }] },
        },
      },
    };

    const [field] = schemaToFields({}, schema);
    expect(field.type).toBe("[<oneOf>]");
    expect(field.unionOptions).toHaveLength(2);
  });

  it("reports an array of anyOf as <anyOf>", () => {
    const schema = {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: { anyOf: [{ type: "string" }, { type: "number" }] },
        },
      },
    };

    expect(schemaToFields({}, schema)[0].type).toBe("[<anyOf>]");
  });

  it("reports an array of $ref-to-object as [object], not the schema name", () => {
    // Hugo shows the items' JSON type, never the referenced schema name:
    // `configVariables` renders as `[object]`, not `[SyntheticsConfigVariable]`.
    const spec = {
      components: {
        schemas: {
          LogsPipeline: {
            type: "object",
            properties: { name: { type: "string" } },
          },
        },
      },
    };
    const schema = {
      type: "object",
      properties: {
        pipelines: {
          type: "array",
          items: { $ref: "#/components/schemas/LogsPipeline" },
        },
      },
    };

    const [field] = schemaToFields(spec, schema);
    expect(field.type).toBe("[object]");
    expect(field.children?.map((c) => c.name)).toEqual(["name"]);
    expect(field.unionOptions).toBeUndefined();
  });

  it("resolves $ref-to-allOf array items to [object]", () => {
    const spec = {
      components: {
        schemas: {
          Base: { type: "object", properties: { id: { type: "string" } } },
          Extended: {
            allOf: [
              { $ref: "#/components/schemas/Base" },
              { type: "object", properties: { extra: { type: "string" } } },
            ],
          },
        },
      },
    };
    const schema = {
      type: "object",
      properties: {
        things: {
          type: "array",
          items: { $ref: "#/components/schemas/Extended" },
        },
      },
    };

    expect(schemaToFields(spec, schema)[0].type).toBe("[object]");
  });

  it("handles allOf by merging schemas", () => {
    const spec = {};
    const schema = {
      allOf: [
        {
          type: "object",
          properties: { id: { type: "string" } },
          required: ["id"],
        },
        {
          type: "object",
          properties: { name: { type: "string" } },
        },
      ],
    };

    const fields = schemaToFields(spec, schema);
    expect(fields).toHaveLength(2);
    const idField = fields.find((f) => f.name === "id")!;
    expect(idField.required).toBe(true);
    const nameField = fields.find((f) => f.name === "name")!;
    expect(nameField.required).toBe(false);
  });

  it("handles array type with item schema", () => {
    const spec = {};
    const schema = {
      type: "array",
      items: { type: "string" },
      description: "A list of strings",
    };

    const fields = schemaToFields(spec, schema);
    expect(fields).toHaveLength(1);
    expect(fields[0].type).toBe("[string]");
  });
});

describe("paramsToFields", () => {
  it("converts parameter objects to fields", () => {
    const spec = {};
    const params = [
      {
        name: "dashboard_id",
        in: "path",
        required: true,
        description: "The dashboard ID.",
        schema: { type: "string" },
      },
      {
        name: "page",
        in: "query",
        required: false,
        description: "Page number.",
        schema: { type: "integer", default: 0 },
      },
    ];

    const fields = paramsToFields(spec, params);
    expect(fields).toHaveLength(2);

    expect(fields[0].name).toBe("dashboard_id");
    expect(fields[0].required).toBe(true);
    expect(fields[0].type).toBe("string");

    expect(fields[1].name).toBe("page");
    expect(fields[1].required).toBe(false);
    expect(fields[1].defaultValue).toBe("0");
  });

  it("resolves $ref parameters", () => {
    const spec = {
      components: {
        parameters: {
          DashboardId: {
            name: "dashboard_id",
            in: "path",
            required: true,
            description: "The dashboard ID.",
            schema: { type: "string" },
          },
        },
      },
    };

    const params = [{ $ref: "#/components/parameters/DashboardId" }];
    const fields = paramsToFields(spec, params);
    expect(fields).toHaveLength(1);
    expect(fields[0].name).toBe("dashboard_id");
  });
});

describe("topLevelSchemaToFields", () => {
  it("unwraps a top-level array of objects to its items' fields", () => {
    const spec = {};
    const schema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
        required: ["id"],
      },
    };

    const fields = topLevelSchemaToFields(spec, schema);
    expect(fields).toHaveLength(2);
    expect(fields.map((f) => f.name)).toEqual(["id", "name"]);
  });

  it("unwraps a top-level array of $ref to its items' fields", () => {
    const spec = {
      components: {
        schemas: {
          Item: {
            type: "object",
            properties: { value: { type: "string" } },
          },
        },
      },
    };
    const schema = {
      type: "array",
      items: { $ref: "#/components/schemas/Item" },
    };

    const fields = topLevelSchemaToFields(spec, schema);
    expect(fields).toHaveLength(1);
    expect(fields[0].name).toBe("value");
  });

  it("returns no rows for a top-level array of primitives", () => {
    const spec = {};
    const schema = {
      type: "array",
      items: { type: "string" },
    };

    expect(topLevelSchemaToFields(spec, schema)).toEqual([]);
  });

  it("unwraps a top-level array-of-arrays to the innermost items", () => {
    const spec = {};
    const schema = {
      type: "array",
      items: {
        type: "array",
        items: {
          type: "object",
          properties: { x: { type: "integer" } },
        },
      },
    };

    const fields = topLevelSchemaToFields(spec, schema);
    expect(fields).toHaveLength(1);
    expect(fields[0].name).toBe("x");
  });

  it("falls through to schemaToFields for non-array schemas", () => {
    const spec = {};
    const schema = {
      type: "object",
      properties: {
        items: { type: "array", items: { type: "string" } },
      },
    };

    const fields = topLevelSchemaToFields(spec, schema);
    expect(fields).toHaveLength(1);
    expect(fields[0].name).toBe("items");
    expect(fields[0].type).toBe("[string]");
  });

  it("resolves $ref at the top level before checking for array", () => {
    const spec = {
      components: {
        schemas: {
          ListResponse: {
            type: "array",
            items: {
              type: "object",
              properties: { id: { type: "string" } },
            },
          },
        },
      },
    };
    const schema = { $ref: "#/components/schemas/ListResponse" };

    const fields = topLevelSchemaToFields(spec, schema);
    expect(fields).toHaveLength(1);
    expect(fields[0].name).toBe("id");
  });
});

describe("getBestDiscriminant", () => {
  /** Build a branch schema with a single-value string enum on `prop`. */
  const branch = (prop: string, value: string, extra: object = {}) => ({
    type: "object",
    properties: { [prop]: { type: "string", enum: [value] }, ...extra },
  });

  it("picks the property that uniquely names every branch", () => {
    const items = [branch("type", "toplist"), branch("type", "note")];
    expect(getBestDiscriminant({}, items)).toBe("type");
  });

  it("prefers the candidate covering the most branches", () => {
    const items = [
      branch("type", "a", { data_source: { type: "string", enum: ["x"] } }),
      branch("type", "a", { data_source: { type: "string", enum: ["y"] } }),
      branch("type", "a", { data_source: { type: "string", enum: ["z"] } }),
      branch("type", "a", { data_source: { type: "string", enum: ["w"] } }),
    ];
    // `type` is identical across branches (0 unique); `data_source` names all 4.
    expect(getBestDiscriminant({}, items)).toBe("data_source");
  });

  it("accepts a candidate that names all but one branch", () => {
    const items = [
      branch("type", "a"),
      branch("type", "b"),
      { type: "object", properties: { other: { type: "string" } } },
    ];
    expect(getBestDiscriminant({}, items)).toBe("type");
  });

  it("rejects a candidate that names too few branches", () => {
    const items = [
      branch("type", "a"),
      branch("type", "a"),
      branch("type", "a"),
      branch("type", "b"),
      branch("type", "c"),
    ];
    // Only 2 of 5 branches are uniquely named: under the all-but-one and
    // 75% thresholds.
    expect(getBestDiscriminant({}, items)).toBeUndefined();
  });

  it("rejects a property defined as a non-enum string on any branch", () => {
    const items = [
      branch("type", "a"),
      { type: "object", properties: { type: { type: "string" } } },
    ];
    expect(getBestDiscriminant({}, items)).toBeUndefined();
  });

  it("returns undefined when no branch has properties", () => {
    expect(
      getBestDiscriminant({}, [{ type: "string" }, { type: "number" }]),
    ).toBeUndefined();
  });
});

describe("unionOptionLabels", () => {
  it('falls back to "Object N" for branches without a unique name', () => {
    const items = [
      { type: "object", properties: { type: { type: "string", enum: ["a"] } } },
      { type: "object", properties: { type: { type: "string", enum: ["b"] } } },
      { type: "object", properties: { other: { type: "string" } } },
    ];
    expect(unionOptionLabels({}, items)).toEqual([
      "<type=a>",
      "<type=b>",
      "Object 3",
    ]);
  });

  it('falls back to "Object N" for branches sharing a name', () => {
    // 6 of 8 branches are uniquely named — exactly the 75% threshold, so
    // `type` is still used as the discriminant and only the two branches
    // sharing `a` fall back.
    const items = ["a", "a", "b", "c", "d", "e", "f", "g"].map((value) => ({
      type: "object",
      properties: { type: { type: "string", enum: [value] } },
    }));
    expect(unionOptionLabels({}, items)).toEqual([
      "Object 1",
      "Object 2",
      "<type=b>",
      "<type=c>",
      "<type=d>",
      "<type=e>",
      "<type=f>",
      "<type=g>",
    ]);
  });

  it("uses raw angle brackets, not HTML entities", () => {
    const items = [
      { type: "object", properties: { type: { type: "string", enum: ["a"] } } },
      { type: "object", properties: { type: { type: "string", enum: ["b"] } } },
    ];
    expect(unionOptionLabels({}, items)[0]).not.toContain("&lt;");
  });
});

describe("type column: enum and format", () => {
  const typeOf = (schema: object) =>
    schemaToFields({}, { type: "object", properties: { f: schema } })[0].type;

  it("reports enum for an enumerated field, not its base type", () => {
    // Hugo's typeColumn: `else if (value.enum) typeVal = 'enum'`.
    expect(typeOf({ type: "string", enum: ["contains", "isNot"] })).toBe("enum");
    expect(typeOf({ type: "integer", enum: [1, 2] })).toBe("enum");
  });

  it("still carries the permitted values in enumValues", () => {
    const [field] = schemaToFields(
      {},
      {
        type: "object",
        properties: { f: { type: "string", enum: ["a", "b"] } },
      },
    );
    expect(field.type).toBe("enum");
    expect(field.enumValues).toEqual(["a", "b"]);
  });

  it("reports enum ahead of format when both are present", () => {
    expect(typeOf({ type: "string", format: "uuid", enum: ["x"] })).toBe("enum");
  });

  it("reports the format alone, not `type (format)`", () => {
    expect(typeOf({ type: "integer", format: "int64" })).toBe("int64");
    expect(typeOf({ type: "string", format: "date-time" })).toBe("date-time");
    expect(typeOf({ type: "number", format: "double" })).toBe("double");
    expect(typeOf({ type: "string", format: "uuid" })).toBe("uuid");
  });

  it("falls back to the base type when there is no format", () => {
    expect(typeOf({ type: "string" })).toBe("string");
    expect(typeOf({ type: "boolean" })).toBe("boolean");
  });

  it("does NOT apply the format rule to parameters", () => {
    // Parameters render from `layouts/partials/api/arguments.html`, which
    // prints `.schema.type` and ignores `format`. So `list_id` is `integer`,
    // not `int64` — the opposite of the body rule above.
    const params = [
      {
        name: "list_id",
        in: "path",
        schema: { type: "integer", format: "int64" },
      },
      { name: "start", in: "query", schema: { type: "string", format: "date-time" } },
      { name: "name", in: "query", schema: { type: "string" } },
    ];
    expect(paramsToFields({}, params).map((f) => f.type)).toEqual([
      "integer",
      "string",
      "string",
    ]);
  });

  it("still reports enum for an enumerated parameter", () => {
    const params = [
      {
        name: "sort",
        in: "query",
        schema: { type: "string", enum: ["asc", "desc"] },
      },
    ];
    const [field] = paramsToFields({}, params);
    expect(field.type).toBe("enum");
    expect(field.enumValues).toEqual(["asc", "desc"]);
  });

  it("resolves a $ref'd parameter schema before typing it", () => {
    const spec = {
      components: {
        schemas: {
          PageSize: { type: "integer", format: "int32" },
        },
      },
    };
    const params = [
      {
        name: "page_size",
        in: "query",
        schema: { $ref: "#/components/schemas/PageSize" },
      },
    ];
    expect(paramsToFields(spec, params)[0].type).toBe("integer");
  });
});

describe("union option types", () => {
  it("reports a scalar variant's own type, not object", () => {
    // SyntheticsAssertionTargetValue: a number branch and a string branch.
    // Hugo renders these as `double` and `string`.
    const spec = {
      components: {
        schemas: {
          TargetValueNumber: {
            description: "Numeric value.",
            type: "number",
            format: "double",
          },
          TargetValueString: { description: "String value.", type: "string" },
        },
      },
    };
    const schema = {
      type: "object",
      properties: {
        target: {
          oneOf: [
            { $ref: "#/components/schemas/TargetValueNumber" },
            { $ref: "#/components/schemas/TargetValueString" },
          ],
        },
      },
    };

    const [target] = schemaToFields(spec, schema);
    expect(target.type).toBe("oneOf");
    expect(target.unionOptions?.map((o) => [o.label, o.type])).toEqual([
      ["Object 1", "double"],
      ["Object 2", "string"],
    ]);
  });

  it("gives a scalar variant no nested rows", () => {
    const schema = {
      type: "object",
      properties: {
        value: { oneOf: [{ type: "string" }, { type: "boolean" }] },
      },
    };
    const [value] = schemaToFields({}, schema);
    expect(value.unionOptions?.map((o) => o.fields.length)).toEqual([0, 0]);
    expect(value.unionOptions?.map((o) => o.type)).toEqual([
      "string",
      "boolean",
    ]);
  });

  it("keeps object variants as object, with their rows", () => {
    const schema = {
      type: "object",
      properties: {
        thing: {
          oneOf: [
            { type: "object", properties: { a: { type: "string" } } },
            { type: "string" },
          ],
        },
      },
    };
    const [thing] = schemaToFields({}, schema);
    expect(thing.unionOptions?.map((o) => o.type)).toEqual([
      "object",
      "string",
    ]);
    expect(thing.unionOptions?.[0].fields.map((f) => f.name)).toEqual(["a"]);
    expect(thing.unionOptions?.[1].fields).toEqual([]);
  });

  it("reports an array variant with its item type", () => {
    const schema = {
      type: "object",
      properties: {
        thing: {
          oneOf: [
            { type: "array", items: { type: "string" } },
            { type: "string" },
          ],
        },
      },
    };
    expect(
      schemaToFields({}, schema)[0].unionOptions?.map((o) => o.type),
    ).toEqual(["[string]", "string"]);
  });

  it("carries enum values from a scalar variant onto the option", () => {
    const schema = {
      type: "object",
      properties: {
        thing: {
          oneOf: [
            { type: "string", enum: ["a", "b"] },
            { type: "integer" },
          ],
        },
      },
    };
    const [thing] = schemaToFields({}, schema);
    expect(thing.unionOptions?.[0].type).toBe("enum");
    expect(thing.unionOptions?.[0].enumValues).toEqual(["a", "b"]);
    expect(thing.unionOptions?.[1].type).toBe("integer");
  });

  it("reports a nested union variant as <oneOf>", () => {
    const spec = {
      components: {
        schemas: {
          Nested: { oneOf: [{ type: "string" }, { type: "integer" }] },
        },
      },
    };
    const schema = {
      type: "object",
      properties: {
        thing: {
          oneOf: [
            { $ref: "#/components/schemas/Nested" },
            { type: "string" },
          ],
        },
      },
    };
    expect(
      schemaToFields(spec, schema)[0].unionOptions?.map((o) => o.type),
    ).toEqual(["<oneOf>", "string"]);
  });
});

describe("stripReadOnlyFields", () => {
  const field = (name: string, extra: object = {}) => ({
    name,
    type: "string",
    required: false,
    deprecated: false,
    readOnly: false,
    description: "",
    ...extra,
  });

  it("drops read-only fields and keeps the rest", () => {
    const fields = [
      field("name"),
      field("creator", { readOnly: true }),
      field("monitor_id", { readOnly: true }),
      field("tags"),
    ];
    expect(stripReadOnlyFields(fields).map((f) => f.name)).toEqual([
      "name",
      "tags",
    ]);
  });

  it("drops read-only fields nested in children", () => {
    const fields = [
      field("data", {
        type: "object",
        children: [field("attributes"), field("id", { readOnly: true })],
      }),
    ];
    const [data] = stripReadOnlyFields(fields);
    expect(data.children?.map((c) => c.name)).toEqual(["attributes"]);
  });

  it("drops a read-only object together with its subtree", () => {
    const fields = [
      field("creator", {
        type: "object",
        readOnly: true,
        children: [field("email"), field("handle")],
      }),
      field("name"),
    ];
    expect(stripReadOnlyFields(fields).map((f) => f.name)).toEqual(["name"]);
  });

  it("removes the children key when every child was read-only", () => {
    const fields = [
      field("wrapper", {
        type: "object",
        children: [field("a", { readOnly: true })],
      }),
    ];
    const [wrapper] = stripReadOnlyFields(fields);
    expect(wrapper.children).toBeUndefined();
    expect("children" in wrapper).toBe(false);
  });

  it("filters inside union options", () => {
    const fields = [
      field("variant", {
        type: "oneOf",
        unionOptions: [
          {
            label: "<type=a>",
            fields: [field("keep"), field("drop", { readOnly: true })],
          },
        ],
      }),
    ];
    const [variant] = stripReadOnlyFields(fields);
    expect(variant.unionOptions?.[0].fields.map((f) => f.name)).toEqual([
      "keep",
    ]);
  });

  it("does not mutate the input tree", () => {
    const fields = [
      field("data", {
        type: "object",
        children: [field("id", { readOnly: true }), field("name")],
      }),
    ];
    stripReadOnlyFields(fields);
    expect(fields[0].children).toHaveLength(2);
  });

  it("returns an empty array when everything is read-only", () => {
    expect(
      stripReadOnlyFields([field("a", { readOnly: true })]),
    ).toEqual([]);
  });
});
