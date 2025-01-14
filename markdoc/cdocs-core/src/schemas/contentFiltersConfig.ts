import { z } from 'zod';
import { TraitGlossarySchema } from './glossaries/traitGlossary';
import { OptionGlossarySchema } from './glossaries/optionGlossary';
import { OptionGroupGlossarySchema } from './glossaries/optionGroupGlossary';

export const ContentFiltersConfigSchema = z.object({
  traitGlossary: TraitGlossarySchema,
  optionGlossary: OptionGlossarySchema,
  optionGroupGlossary: OptionGroupGlossarySchema,
});

export type ContentFiltersConfig = z.infer<typeof ContentFiltersConfigSchema>;

export const ContentFiltersConfigByLangSchema = z.record(ContentFiltersConfigSchema);

export type ContentFiltersConfigByLang = z.infer<typeof ContentFiltersConfigByLangSchema>;
