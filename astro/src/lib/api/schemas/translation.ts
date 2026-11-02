import { z } from "zod";

export const TagTranslationSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

export const ActionTranslationSchema = z
  .object({
    summary: z.string().optional(),
    description: z.string().optional(),
    request_description: z.string().optional(),
    request_schema_description: z.string().optional(),
  })
  .strict();

export type TagTranslation = z.infer<typeof TagTranslationSchema>;
export type ActionTranslation = z.infer<typeof ActionTranslationSchema>;
