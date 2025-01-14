import { z } from 'zod';
import { FrontMatterSchema as CdocsFrontMatterSchema } from 'cdocs-data';

/**
 * The list of further reading links, as parsed directly from
 * the front matter YAML of a given file.
 */
export const FurtherReadingConfigSchema = z
  .array(
    z
      .object({
        link: z.string(),
        text: z.string(),
        tag: z.string().optional()
      })
      .strict()
  )
  .min(1);

/**
 * The list of further reading links, as parsed directly from
 * the front matter YAML of a given file.
 *
 * @example
 * [
 *   {
 *     link: "https://exampleblogpost.com",
 *     text: "Example blog post",
 *     tag: "blog"
 *   },
 *   {
 *     link: "https://random.com",
 *     text: "Some random link with no applicable tag"
 *   }
 * ]
 */
export type FurtherReadingConfig = z.infer<typeof FurtherReadingConfigSchema>;

export const FrontMatterSchema = CdocsFrontMatterSchema.extend({
  further_reading: FurtherReadingConfigSchema.optional()
});

export type FrontMatter = z.infer<typeof FrontMatterSchema>;
