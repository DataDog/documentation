export { FileSearcher } from './modules/FileSearcher';

export { FiltersManifestBuilder } from './modules/FiltersManifestBuilder';

export { YamlConfigParser } from './modules/YamlConfigParser';

export {
  resolveCustomizations as resolvePageFilters,
  resolveFilterOptionsSource,
} from './modules/filterResolution';

export { CdocsCoreError, CdocsCoreErrorSchema } from './schemas/errors';

export {
  Frontmatter,
  FrontmatterSchema,
  CustomizationConfig as PageFilterConfig,
  CustomizationConfigSchema as PageFilterConfigSchema,
} from './schemas/frontMatter';

export {
  CustomizationsManifest as PageFiltersManifest,
  CustomizationsManifestSchema as PageFiltersManifestSchema,
  ResolvedCustomization as ResolvedPageFilter,
  ResolvedCustomizationSchema as ResolvedPageFilterSchema,
  ClientCustomizationsManifest as PageFiltersClientSideManifest,
  ClientCustomizationsManifestSchema as PageFiltersClientSideManifestSchema,
  ResolvedCustomizations as ResolvedPageFilters,
  ResolvedCustomizationsSchema as ResolvedPageFiltersSchema,
} from './schemas/customizations';

export { CdocsDataManager } from './modules/CdocsDataManager';

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
  ContentFiltersConfig,
  ContentFiltersConfigSchema,
  ContentFiltersConfigByLang,
  ContentFiltersConfigByLangSchema,
} from './schemas/contentFiltersConfig';
