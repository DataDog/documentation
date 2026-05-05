import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { apiSchemasLoader, apiSchemasSchema } from './data/api/loaders/apiSchemas';
import { apiCodeExamplesLoader, apiCodeExamplesSchema } from './data/api/loaders/apiCodeExamples';
import { apiOperationsLoader, apiOperationsSchema } from './data/api/loaders/apiOperations';
import { apiCategoriesLoader, apiCategoriesSchema } from './data/api/loaders/apiCategories';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(['static', 'interactive']).optional(),
  }),
});

const apiSchemas = defineCollection({
  loader: apiSchemasLoader(),
  schema: apiSchemasSchema,
});

const apiCodeExamples = defineCollection({
  loader: apiCodeExamplesLoader(),
  schema: apiCodeExamplesSchema,
});

const apiOperations = defineCollection({
  loader: apiOperationsLoader(),
  schema: apiOperationsSchema,
});

const apiCategories = defineCollection({
  loader: apiCategoriesLoader(),
  schema: apiCategoriesSchema,
});

export const collections = { docs, apiSchemas, apiCodeExamples, apiOperations, apiCategories };
