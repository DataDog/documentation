import { CustomizationConfig, Frontmatter, FiltersManifest } from 'cdocs-data';

export interface NewOptionConfig {
  id: string;
  label: string;
}

export interface NewOptionGroupConfig {
  id: string;
  label: string;
  options: {
    id: string;
    default: boolean;
  }[];
}

export interface TraitConfig {
  id: string;
  label: string;
  internal_notes?: string;
}

/**
 * A filter configuration bundled with its customization config dependencies,
 * which may include dependencies that do not exist on the site.
 */
export interface WizardFilter {
  uuid: string;
  label?: string;
  trait_id: string;
  option_group_id: string;
  customizationConfig: CustomizationConfig;
}

export interface MarkdocTemplateData {
  filters: WizardFilter[];
  wizardCustomizationConfig: CustomizationConfig;
  filtersManifest: FiltersManifest;
  frontmatter: Frontmatter;
}
