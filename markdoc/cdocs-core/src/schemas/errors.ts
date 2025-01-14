import { z } from 'zod';

export const CdocsErrorSchema = z.object({
  message: z.string(),
  // TODO: Absorb lines and searchTerm into data
  lines: z.array(z.number()).optional(),
  searchTerm: z.string().optional(),
  data: z.record(z.any()).optional(),
});

export type CdocsError = z.infer<typeof CdocsErrorSchema>;
