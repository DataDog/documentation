export {
  CdocsError as CdocsCoreError,
  CdocsErrorSchema as CdocsCoreErrorSchema,
} from './schemas/errors';

export {
  FrontMatter,
  FrontMatterSchema,
  FilterConfig,
  FilterConfigSchema,
} from './schemas/frontMatter';

export {
  FiltersManifest,
  FiltersManifestSchema,
  ResolvedFilter,
  ResolvedFilterSchema,
  ClientSideFiltersManifest,
  ClientSideFiltersManifestSchema,
  ResolvedFilters,
  ResolvedFiltersSchema,
} from './schemas/pageFilters';

export {
  TraitGlossary as FilterGlossary,
  TraitGlossarySchema as FilterGlossarySchema,
} from './schemas/glossaries/traitGlossary';

export {
  OptionGlossary,
  OptionGlossarySchema,
} from './schemas/glossaries/optionGlossary';

export {
  OptionGroupGlossary,
  OptionGroupGlossarySchema,
} from './schemas/glossaries/optionGroupGlossary';

export {
  CustomizationConfig,
  CustomizationConfigSchema,
  CustomizationConfigByLang,
  CustomizationConfigByLangSchema,
} from './schemas/customizationConfig';

// Utilities
export { loadCustomizationConfig } from './utils/loadCustomizationConfig';
export { buildFiltersManifest } from './utils/buildFiltersManifest';
export { buildClientFiltersManifest } from './utils/buildClientFiltersManifest';
export { resolveFilters } from './utils/resolveFilters';
