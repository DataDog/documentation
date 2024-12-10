import { z } from 'zod';
import { GlossarySchema } from './yaml/glossary';

export const AuthorConsoleDataSchema = z.object({
  glossary: GlossarySchema
});
