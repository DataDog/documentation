import { describe, it, expect } from "vitest";
import {
  resolveRef,
  schemaToFields,
  paramsToFields,
  topLevelSchemaToFields,
  getBestDiscriminant,
  unionOptionLabels,
  stripReadOnlyFields,
  stripWriteOnlyFields,
} from "@lib/api/refResolver";
import type { SchemaField } from "@lib/api/schemas/schemaField";

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

  // Hugo cuts a cycle off at the field that repeats, so prod shows that
  // field with nothing under it.
  it("leaves a field that repeats its schema with no recursive row under it", () => {
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

    const [children] = schemaToFields(spec, {
      $ref: "#/components/schemas/Tree",
    });
    expect(children.name).toBe("children");
    expect(children).not.toHaveProperty("children");
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
});

describe("paramsToFields", () => {
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

  const jobLog = {
    type: "object",
    required: ["message"],
    properties: { message: { type: "string" }, status: { type: "string" } },
  };

  it.each([
    {
      label: "arrays of objects",
      spec: {},
      schema: { type: "array", items: jobLog },
    },
    {
      label: "arrays of $ref objects",
      spec: { components: { schemas: { JobLog: jobLog } } },
      schema: { type: "array", items: { $ref: "#/components/schemas/JobLog" } },
    },
    {
      label: "arrays of arrays of objects",
      spec: {},
      schema: { type: "array", items: { type: "array", items: jobLog } },
    },
  ])("marks required fields in $label", ({ spec, schema }) => {
    const fields = topLevelSchemaToFields(spec, schema);
    expect(fields.map((f) => [f.name, f.required])).toEqual([
      ["message", true],
      ["status", false],
    ]);
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
});

describe("type column: enum and format", () => {
  const typeOf = (schema: object) =>
    schemaToFields({}, { type: "object", properties: { f: schema } })[0].type;

  it("reports enum ahead of format when both are present", () => {
    expect(typeOf({ type: "string", format: "uuid", enum: ["x"] })).toBe(
      "enum",
    );
  });

  it("keeps object for a field with properties but no type", () => {
    expect(typeOf({ properties: { a: { type: "string" } } })).toBe("object");
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
          oneOf: [{ $ref: "#/components/schemas/Nested" }, { type: "string" }],
        },
      },
    };
    expect(
      schemaToFields(spec, schema)[0].unionOptions?.map((o) => o.type),
    ).toEqual(["<oneOf>", "string"]);
  });
});

const field = (name: string, extra: Partial<SchemaField> = {}) => ({
  name,
  type: "string",
  required: false,
  deprecated: false,
  readOnly: false,
  description: "",
  ...extra,
});

describe.each([
  { flag: "readOnly", strip: stripReadOnlyFields },
  { flag: "writeOnly", strip: stripWriteOnlyFields },
] as const)("strip $flag fields", ({ flag, strip }) => {
  const flagged = { [flag]: true };

  it("drops flagged fields and keeps the rest", () => {
    const fields = [field("name"), field("secret", flagged), field("tags")];
    expect(strip(fields).map((f) => f.name)).toEqual(["name", "tags"]);
  });

  it("drops flagged fields nested in children", () => {
    const fields = [
      field("data", {
        type: "object",
        children: [field("attributes"), field("secret", flagged)],
      }),
    ];
    const [data] = strip(fields);
    expect(data.children?.map((c) => c.name)).toEqual(["attributes"]);
  });

  it("drops a flagged object together with its subtree", () => {
    const fields = [
      field("credentials", {
        type: "object",
        ...flagged,
        children: [field("access_key"), field("secret_key")],
      }),
      field("name"),
    ];
    expect(strip(fields).map((f) => f.name)).toEqual(["name"]);
  });

  it("removes the children key when every child was flagged", () => {
    const fields = [
      field("wrapper", { type: "object", children: [field("a", flagged)] }),
    ];
    const [wrapper] = strip(fields);
    expect("children" in wrapper).toBe(false);
  });

  it("filters inside union options", () => {
    const fields = [
      field("variant", {
        type: "oneOf",
        unionOptions: [
          {
            label: "<type=a>",
            type: "object",
            fields: [field("keep"), field("drop", flagged)],
          },
        ],
      }),
    ];
    const [variant] = strip(fields);
    expect(variant.unionOptions?.[0].fields.map((f) => f.name)).toEqual([
      "keep",
    ]);
  });

  it("does not mutate the input tree", () => {
    const fields = [
      field("data", {
        type: "object",
        children: [field("secret", flagged), field("name")],
      }),
    ];
    strip(fields);
    expect(fields[0].children).toHaveLength(2);
  });

  it("returns an empty array when everything is flagged", () => {
    expect(strip([field("a", flagged)])).toEqual([]);
  });
});

describe("stripWriteOnlyFields", () => {
  it("keeps read-only fields, which belong in a response", () => {
    const fields = [field("id", { readOnly: true })];
    expect(stripWriteOnlyFields(fields).map((f) => f.name)).toEqual(["id"]);
  });
});

describe("writeOnly flagging", () => {
  it("flags a write-only property", () => {
    const schema = {
      type: "object",
      properties: {
        secret: { type: "string", writeOnly: true },
        name: { type: "string" },
      },
    };
    const [secret, name] = schemaToFields({}, schema);

    expect(secret.writeOnly).toBe(true);
    expect(name.writeOnly).toBeUndefined();
  });

  it("flags a write-only object, array, and union property", () => {
    const schema = {
      type: "object",
      properties: {
        credentials: {
          type: "object",
          writeOnly: true,
          properties: { key: { type: "string" } },
        },
        keys: { type: "array", writeOnly: true, items: { type: "string" } },
        either: {
          writeOnly: true,
          oneOf: [{ type: "string" }, { type: "integer" }],
        },
      },
    };

    expect(schemaToFields({}, schema).map((f) => f.writeOnly)).toEqual([
      true,
      true,
      true,
    ]);
  });

  it("omits the key entirely when the property is not write-only", () => {
    const schema = { type: "object", properties: { name: { type: "string" } } };

    expect("writeOnly" in schemaToFields({}, schema)[0]).toBe(false);
  });
});

describe("additionalProperties", () => {
  const fieldNamed = (fields: SchemaField[], name: string) =>
    fields.find((field) => field.name === name)!;

  it("adds no child for `true` or an empty additionalProperties", () => {
    const schema = {
      type: "object",
      properties: {
        open: { type: "object", additionalProperties: true },
        empty: { type: "object", additionalProperties: {} },
      },
    };

    const fields = schemaToFields({}, schema);
    expect(fieldNamed(fields, "open").children).toBeUndefined();
    expect(fieldNamed(fields, "empty").children).toBeUndefined();
  });
});

describe("row levels under an array of oneOf", () => {
  /** An object `depth` levels deep, each level a single `next` property. */
  const nestedObject = (depth: number): any =>
    depth === 0
      ? { type: "string" }
      : { type: "object", properties: { next: nestedObject(depth - 1) } };

  /** How many `next` rows deep the deepest branch goes. */
  const nextRowDepth = (fields: SchemaField[]): number =>
    Math.max(
      0,
      ...fields.map((field) => {
        const below = [
          ...(field.children ?? []),
          ...(field.unionOptions ?? []).flatMap((option) => option.fields),
        ];
        return (field.name === "next" ? 1 : 0) + nextRowDepth(below);
      }),
    );

  it("counts a oneOf in array items at the array's level, as Hugo does", () => {
    const variant = nestedObject(15);
    const propertyOneOf = {
      type: "object",
      properties: { union: { oneOf: [variant] } },
    };
    const arrayOfOneOf = {
      type: "object",
      properties: { union: { type: "array", items: { oneOf: [variant] } } },
    };

    const propertyDepth = nextRowDepth(schemaToFields({}, propertyOneOf));
    expect(propertyDepth).toBe(9);
    expect(nextRowDepth(schemaToFields({}, arrayOfOneOf))).toBe(propertyDepth);
  });

  it("drops option rows that would land past the depth cap, as Hugo does", () => {
    /** `next` rows down to `depth`, then a two-option oneOf. */
    const nestedUnion = (depth: number): any =>
      depth === 0
        ? { oneOf: [{ type: "string" }, { type: "integer" }] }
        : { type: "object", properties: { next: nestedUnion(depth - 1) } };
    const deepestNext = (fields: SchemaField[]): SchemaField =>
      fields[0].children ? deepestNext(fields[0].children) : fields[0];

    const atCap = deepestNext(schemaToFields({}, nestedUnion(11)));
    expect(atCap.type).toBe("oneOf");
    expect(atCap.unionOptions ?? []).toEqual([]);

    const belowCap = deepestNext(schemaToFields({}, nestedUnion(10)));
    expect(belowCap.unionOptions).toHaveLength(2);
  });

  it("keeps a scalar option's enum values on an option row at the cap, as Hugo does", () => {
    const enumBranch = { type: "string", enum: ["avg", "max"], default: "avg" };
    /** `next` rows down to `depth`, then a oneOf with an enum branch. */
    const nestedEnumUnion = (depth: number): any =>
      depth === 0
        ? { oneOf: [enumBranch, { type: "integer" }] }
        : { type: "object", properties: { next: nestedEnumUnion(depth - 1) } };
    const deepestNext = (fields: SchemaField[]): SchemaField =>
      fields[0].children ? deepestNext(fields[0].children) : fields[0];

    const [enumOption, integerOption] =
      deepestNext(schemaToFields({}, nestedEnumUnion(10))).unionOptions ?? [];
    expect(enumOption).toMatchObject({
      type: "enum",
      enumValues: ["avg", "max"],
      defaultValue: "avg",
      fields: [],
    });
    expect(integerOption).toMatchObject({ type: "integer", fields: [] });
  });
});

describe("$ref chains", () => {
  const spec = {
    components: {
      schemas: {
        BaseQuery: {
          $ref: "#/components/schemas/EventQuery",
          description: "Base query.",
        },
        EventQuery: {
          type: "object",
          description: "Event query.",
          properties: {
            data_source: { type: "string" },
            search: {
              type: "object",
              properties: { query: { type: "string" } },
            },
          },
        },
        Loop: { $ref: "#/components/schemas/Loop" },
      },
    },
  };

  it("follows a schema that is only a reference to another schema", () => {
    const schema = {
      type: "object",
      properties: { base_query: { $ref: "#/components/schemas/BaseQuery" } },
    };

    const [baseQuery] = schemaToFields(spec, schema);
    expect(baseQuery.type).toBe("object");
    expect(baseQuery.description).toBe("Base query.");
    expect(baseQuery.children?.map((child) => child.name)).toEqual([
      "data_source",
      "search",
    ]);
  });

  it("stops at a reference that points back at itself", () => {
    const schema = {
      type: "object",
      properties: { loop: { $ref: "#/components/schemas/Loop" } },
    };

    const [loop] = schemaToFields(spec, schema);
    expect(loop.description).toBe("Circular reference to Loop.");
  });
});

describe("array options of a oneOf", () => {
  it("counts the item fields at the option's field level", () => {
    /** An object `depth` levels deep, each level a single `next` property. */
    const nestedObject = (depth: number): any =>
      depth === 0
        ? { type: "string" }
        : { type: "object", properties: { next: nestedObject(depth - 1) } };
    const nextRowDepth = (fields: SchemaField[]): number =>
      Math.max(
        0,
        ...fields.map((field) => {
          const below = [
            ...(field.children ?? []),
            ...(field.unionOptions ?? []).flatMap((option) => option.fields),
          ];
          return (field.name === "next" ? 1 : 0) + nextRowDepth(below);
        }),
      );
    const variant = nestedObject(15);
    const objectOption = {
      type: "object",
      properties: { union: { oneOf: [variant] } },
    };
    const arrayOption = {
      type: "object",
      properties: { union: { oneOf: [{ type: "array", items: variant }] } },
    };

    expect(nextRowDepth(schemaToFields({}, arrayOption))).toBe(
      nextRowDepth(schemaToFields({}, objectOption)),
    );
  });
});

describe("union options of a oneOf", () => {
  const definition = {
    oneOf: [
      {
        description: "Topology map widget.",
        oneOf: [
          {
            type: "object",
            description: "Data streams.",
            properties: { title: { type: "string" } },
          },
          { type: "object", description: "Service map." },
        ],
      },
    ],
  };

  it("puts the inner options directly under the option, as Hugo does", () => {
    const schema = { type: "object", properties: { definition } };

    const [field] = schemaToFields({}, schema);
    const [option] = field.unionOptions ?? [];
    expect(option.type).toBe("<oneOf>");
    expect(
      option.fields.map((inner) => [inner.name, inner.type, inner.description]),
    ).toEqual([
      ["Object 1", "object", "Data streams."],
      ["Object 2", "object", "Service map."],
    ]);
    expect(option.fields[0].children?.map((child) => child.name)).toEqual([
      "title",
    ]);
  });
});

describe("a $ref's own description and deprecated flag", () => {
  const spec = {
    components: {
      schemas: {
        LogQuery: {
          type: "object",
          description: "The log query.",
          properties: { index: { type: "string" } },
        },
      },
    },
  };
  const ref = "#/components/schemas/LogQuery";

  it("marks the property deprecated when the $ref says so", () => {
    const schema = {
      type: "object",
      properties: { apm_query: { $ref: ref, deprecated: true } },
    };

    const [apmQuery] = schemaToFields(spec, schema);
    expect(apmQuery.deprecated).toBe(true);
    expect(apmQuery.description).toBe("The log query.");
  });
});

describe("default values", () => {
  it("keeps false and 0 defaults", () => {
    const fields = schemaToFields(
      {},
      {
        type: "object",
        properties: {
          enabled: { type: "boolean", default: false },
          count: { type: "integer", default: 0 },
        },
      },
    );

    expect(fields.map((field) => field.defaultValue)).toEqual(["false", "0"]);
  });

  // A bare empty string would render as an empty code span.
  it("writes an empty-string default as a quoted empty string", () => {
    const [property] = schemaToFields(
      {},
      {
        type: "object",
        properties: { prefix: { type: "string", default: "" } },
      },
    );
    const [primitive] = schemaToFields({}, { type: "string", default: "" });
    const [param] = paramsToFields({}, [
      { name: "prefix", in: "query", schema: { type: "string", default: "" } },
    ]);

    expect(property.defaultValue).toBe('""');
    expect(primitive.defaultValue).toBe('""');
    expect(param.defaultValue).toBe('""');
  });
});

describe("a deprecated union variant", () => {
  const spec = {
    components: {
      schemas: {
        ApmResourceStatsQuery: {
          type: "object",
          deprecated: true,
          description: "APM resource stats query.",
          properties: { data_source: { type: "string", enum: ["apm"] } },
        },
        MetricsQuery: {
          type: "object",
          description: "Metrics query.",
          properties: { data_source: { type: "string", enum: ["metrics"] } },
        },
      },
    },
  };
  const variants = [
    { $ref: "#/components/schemas/ApmResourceStatsQuery" },
    { $ref: "#/components/schemas/MetricsQuery" },
  ];

  it("marks its option deprecated, as Hugo does", () => {
    const schema = {
      type: "object",
      properties: { query: { oneOf: variants } },
    };

    const [query] = schemaToFields(spec, schema);
    expect(query.unionOptions?.map((option) => option.deprecated)).toEqual([
      true,
      undefined,
    ]);
  });

  it("marks an inner option row deprecated", () => {
    const schema = {
      type: "object",
      properties: { query: { oneOf: [{ oneOf: variants }] } },
    };

    const [query] = schemaToFields(spec, schema);
    const [outer] = query.unionOptions ?? [];
    expect(outer.fields.map((field) => field.deprecated)).toEqual([
      true,
      false,
    ]);
  });
});
