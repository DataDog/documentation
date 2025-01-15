// Types and schemas
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

export { TraitGlossary, TraitGlossarySchema } from './schemas/glossaries/traitGlossary';

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
export { loadCustomizationConfig } from './utils/compilation/loadCustomizationConfig';
export { buildFiltersManifest } from './utils/compilation/buildFiltersManifest';
export { pruneManifestForClient } from './utils/compilation/pruneManifestForClient';
export { resolveFilters } from './utils/shared/resolveFilters';
