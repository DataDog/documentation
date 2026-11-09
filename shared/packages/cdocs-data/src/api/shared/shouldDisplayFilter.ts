import { FilterConfig } from '../../schemas/frontmatter.js';

type Condition = Record<string, string[]>;

/**
 * Evaluate whether a single condition matches
 * the current trait values. A condition matches if
 * ALL of its entries match (AND logic).
 * An entry matches if the current trait value
 * is in the entry's array of allowed values.
 */
function conditionMatches(
  condition: Condition,
  valsByTraitId: Record<string, string>,
): boolean {
  return Object.entries(condition).every(([traitId, allowedValues]) => {
    const currentValue = valsByTraitId[traitId];
    return currentValue !== undefined && allowedValues.includes(currentValue);
  });
}

/**
 * Evaluate whether any condition in a list of conditions
 * matches the current trait values (OR logic).
 */
function anyConditionMatches(
  conditions: Condition[],
  valsByTraitId: Record<string, string>,
): boolean {
  return conditions.some((condition) => conditionMatches(condition, valsByTraitId));
}

/**
 * Determine whether a filter should be displayed,
 * given the current user trait selections
 * and the filter's show_if / hide_if configuration.
 *
 * - No conditions: always display.
 * - show_if: display if ANY condition matches (OR of ANDs).
 * - hide_if: hide if ANY condition matches (OR of ANDs).
 */
export function shouldDisplayFilter(p: {
  filterConfig: FilterConfig;
  valsByTraitId: Record<string, string>;
}): boolean {
  const { show_if, hide_if } = p.filterConfig;

  if (!show_if && !hide_if) {
    return true;
  }

  if (show_if) {
    return anyConditionMatches(show_if, p.valsByTraitId);
  }

  // hide_if
  return !anyConditionMatches(hide_if!, p.valsByTraitId);
}

/**
 * Given a filter's show_if/hide_if configuration and a specific
 * parent trait, return the parent option values for which the filter
 * would ALWAYS be hidden (regardless of other traits' values).
 *
 * This is used during manifest building to skip validation
 * of dynamic option groups that correspond to excluded parent values.
 *
 * For show_if: a parent value V is excluded if EVERY condition
 * either mentions the parent trait with V not in the allowed list,
 * or does not mention the parent trait at all. However, if any
 * condition does NOT mention the parent trait, then V is never
 * excluded (because that condition could match for any parent value).
 *
 * More precisely: V is excluded when every condition that could
 * possibly match explicitly requires a different parent value.
 * A condition that doesn't mention the parent trait can match
 * regardless of the parent value, so V would not be excluded.
 *
 * For hide_if: conservative approach — only exclude values when
 * a condition references only the parent trait and includes V.
 * Multi-trait hide_if conditions don't guarantee the filter is
 * always hidden for V (other trait values could prevent the match).
 */
export function getExcludedTraitValues(p: {
  filterConfig: FilterConfig;
  parentTraitId: string;
  parentOptionIds: string[];
}): string[] {
  const { show_if, hide_if } = p.filterConfig;

  if (!show_if && !hide_if) {
    return [];
  }

  if (show_if) {
    return getExcludedForShowIf(show_if, p.parentTraitId, p.parentOptionIds);
  }

  return getExcludedForHideIf(hide_if!, p.parentTraitId, p.parentOptionIds);
}

function getExcludedForShowIf(
  conditions: Condition[],
  parentTraitId: string,
  parentOptionIds: string[],
): string[] {
  // If any condition doesn't mention the parent trait,
  // then no parent value can be excluded (that condition
  // could match for any parent value).
  const allConditionsMentionParent = conditions.every(
    (condition) => parentTraitId in condition,
  );

  if (!allConditionsMentionParent) {
    return [];
  }

  // Every condition mentions the parent trait.
  // A parent value V is excluded if no condition allows it.
  const allowedValues = new Set<string>();
  for (const condition of conditions) {
    for (const val of condition[parentTraitId]) {
      allowedValues.add(val);
    }
  }

  return parentOptionIds.filter((id) => !allowedValues.has(id));
}

function getExcludedForHideIf(
  conditions: Condition[],
  parentTraitId: string,
  parentOptionIds: string[],
): string[] {
  // A parent value V is excluded only if there exists a condition
  // that references ONLY the parent trait and includes V.
  // Multi-trait conditions can't guarantee exclusion without
  // knowing other trait values.
  const blockedValues = new Set<string>();

  for (const condition of conditions) {
    const keys = Object.keys(condition);
    if (keys.length === 1 && keys[0] === parentTraitId) {
      for (const val of condition[parentTraitId]) {
        blockedValues.add(val);
      }
    }
  }

  return parentOptionIds.filter((id) => blockedValues.has(id));
}
