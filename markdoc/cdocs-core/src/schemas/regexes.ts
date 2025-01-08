/**
 * A regex that matches a snake-case string,
 * such as `my_snake_case_string` or `this_other_string`.
 */
export const SNAKE_CASE_REGEX = /^[a-z0-9]+(_[a-z0-9]+)*$/;

/**
 * A regex that matches a placeholder,
 * such as `<COLOR>` or `<MY_PLACEHOLDER>`.
 */
export const PLACEHOLDER_REGEX = /<([A-Z0-9_]+)>/;

/**
 * A regex that matches all placeholders in a string.
 * Placeholders have the format `<MY_PLACEHOLDER>`.
 */
export const GLOBAL_PLACEHOLDER_REGEX = /<([A-Z0-9_]+)>/g;

/**
 * A regex that matches a filter option set ID.
 *
 * The ID must:
 * - be in snake case
 * - be all lowercase except for placeholders,
 *   which are uppercase and bracketed (`<PLACEHOLDER>`, `<MY_PLACEHOLDER>`)
 * - end with the literal string "_options"
 *
 * Valid ID examples:
 * - `paint_options`
 * - `<COLOR>_paint_options`
 * - `matte_<COLOR>_paint_options`
 * - `<FINISH>_<COLOR>_paint_options`
 */
export const FILTER_OPTIONS_ID_REGEX =
  /^([a-z0-9]+|<([A-Z0-9_]+)>)(_([a-z0-9]+)|_<([A-Z0-9_]+)>)*_options$/;
