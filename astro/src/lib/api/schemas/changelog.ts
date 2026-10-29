import { z } from "zod";

/**
 * One file in `hugo/data/changelog/`, written by the API client generator.
 * Lenient: only `date` is required. `link` is accepted but never rendered.
 */
export const ChangelogFileSchema = z.object({
  entries: z.array(
    z.object({
      change_type: z.string().optional(),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      link: z.string().optional(),
      operations: z.array(z.string()).optional(),
      title: z.string().optional(),
    }),
  ),
});

export type ChangelogFile = z.infer<typeof ChangelogFileSchema>;
