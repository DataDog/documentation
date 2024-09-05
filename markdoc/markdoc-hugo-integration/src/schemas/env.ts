import { z } from 'zod';

// TODO: Verify that these are the correct
// possibilities with websites
export const EnvSchema = z.union([
  z.literal('development'),
  z.literal('preview'),
  z.literal('live')
]);

export type Env = z.infer<typeof EnvSchema>;
