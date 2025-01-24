import { z } from 'zod';

export const CdocsErrorSchema = z.object({
  message: z.string(),
  data: z.record(z.any()).optional(), // Associated debugging information such as the lines containing the error, etc.
});

export type CdocsError = z.infer<typeof CdocsErrorSchema>;
