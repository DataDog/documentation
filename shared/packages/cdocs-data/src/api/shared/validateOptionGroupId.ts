import {
  OPTION_GROUP_ID_REGEX,
  RESOLVED_OPTION_GROUP_ID_REGEX,
} from '../../schemas/regexes.js';

/**
 * Validate a string representing an option group ID, or a resolved version of it.
 * (Resolved option group IDs cannot contain placeholders.)
 */
export function validateOptionGroupId(p: { id: string; allowPlaceholders: boolean }): {
  isValid: boolean;
  error?: string;
} {
  let error = `Invalid option group ID: "${p.id}". The option ID must be in snake case (some_example_options). It must end with "_options" or a version number ("_options_v2", "_options_v3", etc.).`;

  if (p.allowPlaceholders) {
    error +=
      'It can include placeholders, which should be uppercase and bracketed (<WALL_COLOR>_paint_options).';
  }

  const regex = p.allowPlaceholders
    ? OPTION_GROUP_ID_REGEX
    : RESOLVED_OPTION_GROUP_ID_REGEX;

  if (regex.test(p.id)) {
    return { isValid: true };
  } else {
    return {
      isValid: false,
      error,
    };
  }
}
