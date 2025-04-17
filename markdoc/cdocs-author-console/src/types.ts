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

export interface OptionConfig {
  id: string;
  label: string;
}

/**
 * `waiting`: The form has no unsaved changes, but is not valid unless the user takes further action.
 * `pending`: The form has unsaved changes, regardless of their validity.
 * `done`: The form has been saved, or canceled. Either way, the form is in a valid state.
 */
export type FormStatus = 'waiting' | 'pending' | 'done';
