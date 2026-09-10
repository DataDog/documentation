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
          type: z
            .string()
            .describe(
              'The variant schema\'s own display type, e.g. "object", "string", "double", "[object]". Hugo renders each option row with the branch\'s type, not a blanket "object".',
            ),
          description: z
            .string()
            .optional()
            .describe("The variant schema's own description, if any"),
          enumValues: z
            .array(z.string())
            .optional()
            .describe("Permitted values when the variant is an enum"),
          defaultValue: z.string().optional(),
          fields: z
            .array(SchemaFieldSchema)
            .describe(
              "The variant's nested rows. Empty when the variant is a scalar, since its type is carried on the option itself.",
            ),
        }),
      )
      .optional()
      .describe("oneOf / anyOf variant options");
  },
});

export type SchemaField = z.infer<typeof SchemaFieldSchema>;
