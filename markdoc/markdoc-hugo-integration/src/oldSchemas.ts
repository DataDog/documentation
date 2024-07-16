import { z } from 'zod';

export const StringVariableSchema = z
  .object({
    identifier: z.string(),
    displayName: z.string(),
    default: z.string(),
    options: z.array(z.string())
  })
  .strict();

export type StringVariable = z.infer<typeof StringVariableSchema>;

export const PageVariableSchema = StringVariableSchema;

export type PageVariable = z.infer<typeof PageVariableSchema>;

export const GlobalVariableConfigSchema = z.record(
  StringVariableSchema.omit({ identifier: true })
);

export type GlobalVariableConfig = z.infer<typeof GlobalVariableConfigSchema>;
