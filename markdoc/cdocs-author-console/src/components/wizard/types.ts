/**
 * A filter configuration bundled with new configuration
 * to add to the customization config (if any).
 */
export interface WizardFilter {
  label?: string;
  trait_id: string;
  option_group_id: string;
  // Any new traits required for this filter to work
  newTraitConfig?: {
    id: string;
    label: string;
    internal_notes?: string;
  };
  // Any new options required for this filter to work
  newOptionConfigs?: {
    id: string;
    label: string;
  }[];
  // Any new option groups required for this filter to work
  newOptionGroupsConfig?: {
    id: string;
    label: string;
    options: {
      id: string;
      default: boolean;
      // label?: string; // can support this in the form later
    }[];
  }[];
}
