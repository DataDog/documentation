/**
 * Component-facing filter shapes.
 *
 * Filter resolution itself is delegated to the `cdocs-data` package (see
 * `filters.ts`); these are the trimmed shapes the Preact filter UI consumes,
 * derived from cdocs-data's `ResolvedFilter`.
 */

export interface ResolvedOption {
  id: string;
  label: string;
}

/** A page filter after resolution: what to show in the UI + the active value. */
export interface ResolvedFilter {
  traitId: string;
  label: string;
  options: ResolvedOption[];
  defaultValue: string;
  currentValue: string;
}
