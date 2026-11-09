import { semverIsAtLeast } from '../../../src/api/shared/semverIsAtLeast';
import { convertTraitValueToSemver } from '../../../src/api/shared/convertTraitValueToSemver';
import { describe, test, expect } from 'vitest';
import {
  invalidTraitValues,
  invalidTargetValues,
  validTargetValues,
  validTraitValues,
} from './mockSemverArgs';

describe('semver comparisons', () => {
  test('convertTraitValueToSemver() returns cdocs_noop unchanged', () => {
    expect(convertTraitValueToSemver('cdocs_noop')).toBe('cdocs_noop');
  });

  test('convertTraitValueToSemver() processes valid trait values without error', () => {
    validTraitValues.forEach((traitValue) => {
      expect(() => convertTraitValueToSemver(traitValue)).not.toThrow();
    });
  });

  test('convertTraitValueToSemver() yields the expected semver strings', () => {
    const resultByTraitValue = {
      '1_2_3': '1.2.3',
      gt_1_2_3: '>1.2.3',
      gte_1_2_3: '>=1.2.3',
      lt_1_2_3: '<1.2.3',
      lte_1_2_3: '<=1.2.3',
      '5_0_0': '5.0.0',
    };

    validTraitValues.forEach((traitValue) => {
      const expectedSemver = resultByTraitValue[traitValue];
      expect(convertTraitValueToSemver(traitValue)).toBe(expectedSemver);
    });
  });

  test('semverIsAtLeast() throws an error if params are invalid', () => {
    invalidTraitValues.forEach((traitValue) => {
      invalidTargetValues.forEach((target) => {
        // @ts-ignore, intentional mistake
        expect(() => semverIsAtLeast({ traitValue, target })).toThrow();
      });
    });
  });

  test('semverIsAtLeast() does not throw an error if params are valid', () => {
    validTraitValues.forEach((traitValue) => {
      validTargetValues.forEach((target) => {
        expect(() => semverIsAtLeast({ traitValue, target })).not.toThrow();
      });
    });
  });

  test('semverIsAtLeast() returns true when the min version is met', () => {
    const trueComparisons = [
      // direct
      { traitValue: '1_2_3', target: '1' },
      { traitValue: '1_2_3', target: '1.2' },
      { traitValue: '1_2_3', target: '1.2.3' },
      { traitValue: '5_0_0', target: '5' },
      { traitValue: '5_1_2', target: '5.1' },
      // gt
      { traitValue: 'gt_1_2_3', target: '1.2.3' },
      { traitValue: 'gt_1_2_3', target: '1.2.4' },
      { traitValue: 'gt_1_2_3', target: '1' },
      // gte
      { traitValue: 'gte_1_2_3', target: '1.2.3' },
      { traitValue: 'gte_1_2_3', target: '1' },
      { traitValue: 'gte_5_0_0', target: '5' },
    ];

    trueComparisons.forEach(({ traitValue, target }) => {
      const result = semverIsAtLeast({ traitValue, target });
      expect(result).toBe(true);
    });
  });

  test('semverIsAtLeast() returns false when traitValue is cdocs_noop', () => {
    expect(semverIsAtLeast({ traitValue: 'cdocs_noop', target: '1.0.0' })).toBe(false);
  });

  test('semverIsAtLeast() returns false when the min version is not met', () => {
    const falseComparisons = [
      // direct
      { traitValue: '1_2_3', target: '2' },
      { traitValue: '1_2_3', target: '2.0' },
      { traitValue: '1_2_3', target: '2.0.0' },
      { traitValue: '5_0_0', target: '6' },
      { traitValue: '5_1_2', target: '5.2' },
      // gt
      { traitValue: 'gt_1_2_3', target: '2' },
      { traitValue: 'gt_1_2_3', target: '1.2.5' },
      // gte
      { traitValue: 'gte_1_2_3', target: '2' },
      { traitValue: 'gte_1_2_3', target: '1.3' },
      { traitValue: 'gte_1_2_3', target: '2.0.0' },
      { traitValue: 'gte_5_0_0', target: '6' },
    ];

    falseComparisons.forEach(({ traitValue, target }) => {
      const result = semverIsAtLeast({ traitValue, target });
      expect(result).toBe(false);
    });
  });

});
