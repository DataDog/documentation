import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const en = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/en' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(['static', 'interactive']).optional(),
  }),
});

export const collections = { en };
