import { z } from 'zod';

export const CdocsCoreErrorSchema = z.object({
  message: z.string(),
  lines: z.array(z.number()).optional(),
  searchTerm: z.string().optional()
});

export type CdocsCoreError = z.infer<typeof CdocsCoreErrorSchema>;
