import { ParseStatus, z } from "zod";

export const BooleanVariableSchema = z
  .object({
    identifier: z.string(),
    displayName: z.string(),
    type: z.literal("boolean"),
    default: z.boolean(),
  })
  .strict();

export type BooleanVariable = z.infer<typeof BooleanVariableSchema>;

export const StringVariableSchema = z
  .object({
    identifier: z.string(),
    displayName: z.string(),
    type: z.literal("string"),
    default: z.string(),
    options: z.array(z.string()),
  })
  .strict();

export type StringVariable = z.infer<typeof StringVariableSchema>;

export const NumberVariableSchema = z.object({
  identifier: z.string(),
  displayName: z.string(),
  type: z.literal("number"),
  default: z.number(),
  options: z.union([
    z.object({
      type: z.literal("range"),
      data: z
        .object({
          min: z.number(),
          max: z.number(),
        })
        .strict(),
    }),
    z
      .object({
        type: z.literal("list"),
        data: z.array(z.number()),
      })
      .strict(),
  ]),
});

export type NumberVariable = z.infer<typeof NumberVariableSchema>;

export const PageVariableSchema = z.discriminatedUnion("type", [
  BooleanVariableSchema,
  StringVariableSchema,
  NumberVariableSchema,
]);

export type PageVariable = z.infer<typeof PageVariableSchema>;

export const GlobalVariableConfigSchema = z.record(
  z.discriminatedUnion("type", [
    BooleanVariableSchema.omit({ identifier: true }),
    StringVariableSchema.omit({ identifier: true }),
    NumberVariableSchema.omit({ identifier: true }),
  ])
);

export type GlobalVariableConfig = z.infer<typeof GlobalVariableConfigSchema>;

export const FrontmatterSchema = z.object({
  title: z.string(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;
