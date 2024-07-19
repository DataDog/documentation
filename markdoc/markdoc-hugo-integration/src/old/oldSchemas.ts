import { z } from 'zod';

export const PagePrefSchema = z
  .object({
    identifier: z.string(),
    displayName: z.string(),
    default: z.string(),
    options: z.array(z.string())
  })
  .strict();

export type PagePref = z.infer<typeof PagePrefSchema>;

/*
export const GlobalVariableConfigSchema = z.record(
  StringVariableSchema.omit({ identifier: true })
);

export type GlobalVariableConfig = z.infer<typeof GlobalVariableConfigSchema>;
*/
