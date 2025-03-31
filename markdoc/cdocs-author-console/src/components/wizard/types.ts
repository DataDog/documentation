export interface WizardFilter {
  label?: string;
  trait_id: string;
  option_group_id: string;
  newTraitConfig?: {
    id: string;
    label: string;
    internal_notes?: string;
  };
  newOptionGroupConfig?: {
    id: string;
    label: string;
    options: {
      id: string;
      default: boolean;
      // label?: string; // can support this in the form later
    }[];
  };
  newOptionConfigs?: {
    id: string;
    label: string;
  }[];
}
