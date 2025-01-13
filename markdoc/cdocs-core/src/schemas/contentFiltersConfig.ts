import { z } from 'zod';
import { FilterGlossarySchema } from './glossaries/filterGlossary';
import { OptionGlossarySchema } from './glossaries/optionGlossary';
import { OptionGroupGlossarySchema } from './glossaries/optionGroupGlossary';

/*
export const ContentFiltersConfigSchema = z.object({
  filterGlossariesByLang: z.record(FilterGlossarySchema),
  optionGlossariesByLang: z.record(OptionGlossarySchema),
  optionGroupGlossariesByLang: z.record(OptionGroupGlossarySchema),
});

export type ContentFiltersConfig = z.infer<typeof ContentFiltersConfigSchema>;
*/

export const ContentFiltersConfigSchema = z.object({
  filterGlossary: FilterGlossarySchema,
  optionGlossary: OptionGlossarySchema,
  optionGroupGlossary: OptionGroupGlossarySchema,
});

export type ContentFiltersConfig = z.infer<typeof ContentFiltersConfigSchema>;

export const ContentFiltersConfigByLangSchema = z.record(ContentFiltersConfigSchema);

export type ContentFiltersConfigByLang = z.infer<typeof ContentFiltersConfigByLangSchema>;
