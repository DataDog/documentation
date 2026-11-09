import { z } from 'zod';
import { TraitGlossarySchema } from './glossaries/traitGlossary.js';
import { OptionGlossarySchema } from './glossaries/optionGlossary.js';
import { OptionGroupGlossarySchema } from './glossaries/optionGroupGlossary.js';

export const CustomizationConfigSchema = z.object({
  traitsById: TraitGlossarySchema,
  optionsById: OptionGlossarySchema,
  optionGroupsById: OptionGroupGlossarySchema,
});

export type CustomizationConfig = z.infer<typeof CustomizationConfigSchema>;

export const CustomizationConfigByLangSchema = z.record(
  z.string(),
  CustomizationConfigSchema,
);

export type CustomizationConfigByLang = z.infer<typeof CustomizationConfigByLangSchema>;
