import { z } from 'zod';
import { TraitGlossarySchema } from './glossaries/traitGlossary';
import { OptionGlossarySchema } from './glossaries/optionGlossary';
import { OptionGroupGlossarySchema } from './glossaries/optionGroupGlossary';

export const CustomizationConfigSchema = z.object({
  traitsById: TraitGlossarySchema,
  optionsById: OptionGlossarySchema,
  optionGroupsById: OptionGroupGlossarySchema,
});

export type CustomizationConfig = z.infer<typeof CustomizationConfigSchema>;

export const CustomizationConfigByLangSchema = z.record(CustomizationConfigSchema);

export type CustomizationConfigByLang = z.infer<typeof CustomizationConfigByLangSchema>;
