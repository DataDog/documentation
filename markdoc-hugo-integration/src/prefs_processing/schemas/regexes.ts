export const SNAKE_CASE_REGEX = /^[a-z0-9]+(_[a-z0-9]+)*$/;
export const PLACEHOLDER_REGEX = /<([A-Z0-9_]+)>/;
export const GLOBAL_PLACEHOLDER_REGEX = /<([A-Z0-9_]+)>/g;

/**
 * A regex that matches a preference options set identifier.
 *
 * The identifier must:
 * - be in snake case
 * - be all lowercase except for placeholders,
 *   which are uppercase and bracketed (<PLACEHOLDER>, <MY_PLACEHOLDER>)
 * - end with the literal string "_options"
 *
 * Valid examples:
 * - paint_options
 * - <COLOR>_paint_options
 * - matte_<COLOR>_paint_options
 * - <FINISH>_<COLOR>_paint_options
 */
export const PREF_OPTIONS_ID_REGEX = /^([a-z0-9]+|<([A-Z0-9_]+)>)(_([a-z0-9]+)|_<([A-Z0-9_]+)>)*_options$/;
