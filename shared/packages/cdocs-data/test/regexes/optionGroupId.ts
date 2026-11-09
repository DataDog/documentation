import { OPTION_GROUP_ID_REGEX } from '../../src/schemas/regexes';
import { describe, test, expect } from 'vitest';

describe('Option group ID regex', () => {
  const shouldNotMatch = [
    'does_not_end_correctly', // must end with _options
    'ALL_CAPS_options', // must be lowercase except for placeholders
    '<lowercase>_options', // placeholders must be uppercase
  ];

  const shouldMatch = [
    'paint_options',
    '<COLOR>_paint_options',
    'matte_<COLOR>_paint_options',
    '<FINISH>_<COLOR>_paint_options',
    '<PAINT_FINISH>_<PAINT_COLOR>_paint_options',
  ];

  shouldNotMatch.forEach((invalidPlaceholder) => {
    test(`does not match invalid placeholder: ${invalidPlaceholder}`, () => {
      expect(OPTION_GROUP_ID_REGEX.test(invalidPlaceholder)).toBe(false);
    });
  });

  shouldMatch.forEach((validPlaceholder) => {
    test(`matches valid placeholder: ${validPlaceholder}`, () => {
      expect(OPTION_GROUP_ID_REGEX.test(validPlaceholder)).toBe(true);
    });
  });
});
