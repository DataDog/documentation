export interface CreatedPref {
  id: string;
  optionSetId: string;
  options: Array<{ id: string; value: string; default: boolean }>;
}
