// Types and schemas
export {
  CdocsError as CdocsCoreError,
  CdocsErrorSchema as CdocsCoreErrorSchema,
} from './schemas/errors';

export {
  Frontmatter,
  FrontmatterSchema,
  FilterConfig,
  FilterConfigSchema,
} from './schemas/frontmatter';

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

// Compilation utilities
export { loadCustomizationConfig } from './api/compilation/loadCustomizationConfig';
export { buildFiltersManifest } from './api/compilation/buildFiltersManifest';
export { pruneManifestForClient } from './api/compilation/pruneManifestForClient';

// Shared utilities
export { resolveFilters } from './api/shared/resolveFilters';

// Browser utilities
export { getTraitValsFromUrl } from './api/browser/getTraitValsFromUrl';
export { writeTraitValsToUrl } from './api/browser/writeTraitValsToUrl';
export { CdocsClientStorage } from './api/browser/CdocsClientStorage';
