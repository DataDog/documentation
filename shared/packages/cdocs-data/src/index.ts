// Types and schemas ------------------------------------------------
export {
  CdocsError as CdocsCoreError,
  CdocsErrorSchema as CdocsCoreErrorSchema,
} from './schemas/errors.js';

export {
  Frontmatter,
  FrontmatterSchema,
  FilterConfig,
  FilterConfigSchema,
} from './schemas/frontmatter.js';

export {
  FiltersManifest,
  FiltersManifestSchema,
  ResolvedFilter,
  ResolvedFilterSchema,
  ClientSideFiltersManifest,
  ClientSideFiltersManifestSchema,
  ResolvedFilters,
  ResolvedFiltersSchema,
} from './schemas/pageFilters.js';

export {
  TraitGlossary,
  TraitGlossarySchema,
  TraitGlossaryEntry,
  TraitGlossaryEntrySchema,
} from './schemas/glossaries/traitGlossary.js';

export {
  OptionGlossaryEntry,
  OptionGlossaryEntrySchema,
  OptionGlossary,
  OptionGlossarySchema,
} from './schemas/glossaries/optionGlossary.js';

export {
  OptionGroupGlossaryEntry,
  OptionGroupGlossaryEntrySchema,
  OptionGroupGlossary,
  OptionGroupGlossarySchema,
} from './schemas/glossaries/optionGroupGlossary.js';

export {
  CustomizationConfig,
  CustomizationConfigSchema,
  CustomizationConfigByLang,
  CustomizationConfigByLangSchema,
} from './schemas/customizationConfig.js';

// Compilation utilities --------------------------------------------
export { loadCustomizationConfig } from './api/compilation/loadCustomizationConfig.js';
export { buildFiltersManifest } from './api/compilation/buildFiltersManifest.js';
export { pruneManifestForClient } from './api/compilation/pruneManifestForClient.js';

// Constants --------------------------------------------------------
export { CDOCS_NOOP } from './schemas/constants.js';

// Shared utilities -------------------------------------------------
export { resolveFilters } from './api/shared/resolveFilters.js';
export { semverIsAtLeast } from './api/shared/semverIsAtLeast.js';
export { convertTraitValueToSemver } from './api/shared/convertTraitValueToSemver.js';
export { validateOptionGroupId } from './api/shared/validateOptionGroupId.js';
export { shouldDisplayFilter } from './api/shared/shouldDisplayFilter.js';

// Browser utilities ------------------------------------------------
export { CdocsClientStorage } from './api/browser/CdocsClientStorage.js';
export { getTraitValsFromUrl } from './api/browser/getTraitValsFromUrl.js';
export { writeTraitValsToUrl } from './api/browser/writeTraitValsToUrl.js';
