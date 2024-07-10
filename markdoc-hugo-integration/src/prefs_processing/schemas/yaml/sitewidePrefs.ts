import { z } from 'zod';
import { SNAKE_CASE_REGEX } from './../regexes';

export const SitewidePrefIdsConfigSchema = z
  .object({
    valid_sitewide_preference_identifiers: z.array(z.string().regex(SNAKE_CASE_REGEX)).min(1)
  })
  .strict();

export type SitewidePrefIdsConfig = z.infer<typeof SitewidePrefIdsConfigSchema>;
