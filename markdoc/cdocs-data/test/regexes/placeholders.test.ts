import { describe, test, expect } from 'vitest';
import { PLACEHOLDER_REGEX } from '../../src/schemas/regexes';

describe('Placeholder regex', () => {
  const shouldNotMatch = [
    // lowercase
    '<lowercase>',
    'prefix_<lowercase>',
    '<lowercase>_suffix',
    'prefix_<lowercase>_suffix',
    // mixed case
    '<mIxedCase>',
    'prefix_<mIxedCase>',
    '<mIxedCase>_suffix',
    'prefix_<mIxedCase>_suffix',
    // numbers
    '<HAS_NUMBER1>',
    'prefix_<HAS_NUMBER1>',
    '<HAS_NUMBER1>_suffix',
    'prefix_<HAS_NUMBER1>_suffix',
    // leading underscores
    '<_LEADING_UNDERSCORE>',
    'prefix_<_LEADING_UNDERSCORE>',
    '<_LEADING_UNDERSCORE>_suffix',
    'prefix_<_LEADING_UNDERSCORE>_suffix',
    // trailing undercores
    '<TRAILING_UNDERSCORE_>',
    'prefix_<TRAILING_UNDERSCORE_>',
    '<TRAILING_UNDERSCORE>_suffix',
    // standalone underscore
    '<_>',
    // hyphenated
    '<HYPHENATED-PLACEHOLDER>',
    'prefix_<HYPHENATED-PLACEHOLDER>',
    '<HYPHENATED-PLACEHOLDER>_suffix',
    'prefix_<HYPHENATED-PLACEHOLDER>_suffix',
  ];

  const shouldMatch = [
    '<WORD>',
    'prefix_<WORD>',
    '<WORD>_suffix',
    'prefix_<WORD>_suffix',
    '<TWO_WORDS>',
    'prefix_<TWO_WORDS>',
    '<TWO_WORDS>_suffix',
    'prefix_<TWO_WORDS>_suffix',
    '<THREE_WORD_PLACEHOLDER>',
    'prefix_<THREE_WORD_PLACEHOLDER>',
    '<THREE_WORD_PLACEHOLDER>_suffix',
    'prefix_<THREE_WORD_PLACEHOLDER>_suffix',
  ];

  /*
  shouldNotMatch.forEach((invalidPlaceholder) => {
    test(`does not match invalid placeholder: ${invalidPlaceholder}`, () => {
      expect(PLACEHOLDER_REGEX.test(invalidPlaceholder)).toBe(false);
    });
  });
  */

  shouldMatch.forEach((validPlaceholder) => {
    test(`matches valid placeholder: ${validPlaceholder}`, () => {
      expect(PLACEHOLDER_REGEX.test(validPlaceholder)).toBe(true);
    });
  });
});
