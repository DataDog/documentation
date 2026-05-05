/**
 * Shared zod schema for the recursive `SchemaField` type used by both
 * `apiSchemas` and `apiOperations` collections.
 */

import { z } from 'astro/zod';
import type { SchemaField } from '../resolver';

export const SchemaFieldZod: z.ZodType<SchemaField> = z.lazy(() =>
  z.object({
    name: z.string(),
    type: z.string(),
    required: z.boolean(),
    deprecated: z.boolean(),
    readOnly: z.boolean(),
    description: z.string(),
    enumValues: z.array(z.string()).optional(),
    defaultValue: z.string().optional(),
    children: z.array(SchemaFieldZod).optional(),
    unionOptions: z
      .array(
        z.object({
          label: z.string(),
          fields: z.array(SchemaFieldZod),
        }),
      )
      .optional(),
  }),
);
