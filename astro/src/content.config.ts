import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// A single filter entry from a cdoc's `content_filters` frontmatter. Mirrors
// the shape cdocs-data validates (RawFilterConfig), trimmed to the fields the
// Astro port currently uses. `show_if`/`hide_if` are preserved so authored docs
// validate, but conditional-display resolution is not implemented in the PoC.
const contentFilterSchema = z.object({
  trait_id: z.string(),
  option_group_id: z.string(),
  label: z.string().optional(),
  default_value: z.string().optional(),
  show_if: z.array(z.record(z.string(), z.array(z.string()))).optional(),
  hide_if: z.array(z.record(z.string(), z.array(z.string()))).optional(),
});

const en = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/en' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(['static', 'interactive']).optional(),
    // cdocs (filterable product docs) fields:
    content_filters: z.array(contentFilterSchema).optional(),
    // Preserved from Hugo but unused in the PoC (redirects handled later).
    aliases: z.array(z.string()).optional(),
    // Pages only reachable through a filtered parent view.
    private: z.boolean().optional(),
    further_reading: z
      .array(z.object({ link: z.string().optional(), text: z.string().optional() }))
      .optional(),
  }),
});

export const collections = { en };
