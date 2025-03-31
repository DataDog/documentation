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
 * A filter configuration bundled with new configuration
 * to add to the customization config (if any).
 */
export interface WizardFilter {
  uuid: string;
  label?: string;
  trait_id: string;
  option_group_id: string;
  // Any new traits required for this filter to work
  newTraitConfig?: TraitConfig;
  // Any new options required for this filter to work
  newOptionConfigs?: NewOptionConfig[];
  // Any new option groups required for this filter to work
  newOptionGroupConfigs?: NewOptionGroupConfig[];
}
