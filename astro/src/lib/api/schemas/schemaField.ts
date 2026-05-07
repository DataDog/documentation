import { z } from "zod";

/**
 * Recursive schema. Uses Zod 4's getter pattern instead of `z.lazy()` so
 * the inferred type works without manual declaration. `z.strictObject()` is
 * used in place of `.object().strict()` because the chained `.strict()`
 * resolves the getters eagerly during construction, before the binding to
 * `SchemaFieldSchema` exists.
 */
export const SchemaFieldSchema = z.strictObject({
  name: z.string(),
  type: z
    .string()
    .describe('Display string, e.g. "string", "integer", "[object]", "enum"'),
  required: z.boolean(),
  deprecated: z.boolean(),
  readOnly: z.boolean(),
  description: z
    .string()
    .describe("Markdown string from the spec's description field"),
  enumValues: z.array(z.string()).optional(),
  defaultValue: z.string().optional(),
  get children() {
    return z
      .array(SchemaFieldSchema)
      .optional()
      .describe("Nested objects/arrays (recursive)");
  },
  get unionOptions() {
    return z
      .array(
        z.strictObject({
          label: z.string(),
          fields: z.array(SchemaFieldSchema),
        }),
      )
      .optional()
      .describe("oneOf / anyOf variant options");
  },
});

export type SchemaField = z.infer<typeof SchemaFieldSchema>;
