import { describe, expect, test } from 'vitest';
import { validateOptionGroupId } from '../../../src';

const alwaysValidIds = ['paint_options', 'paint_options_v2', 'paint_options_v378'];

const validUnresolvedIds = [
  '<WALL_COLOR>_paint_options',
  '<COLOR>_paint_options',
  '<FINISH>_<COLOR>_paint_options',
];

const invalidIds = [
  'wall_color',
  'wall_color_options_1',
  'wall color paint options',
  'wall-color-paint-options',
  'wallColorPaintOptions',
  '<wall_color>_paint_options',
  'wall_color_paint_options_v2x',
];

describe('validateOptionGroupId()', () => {
  test('returns true for valid IDs with placeholders', () => {
    [...alwaysValidIds, ...validUnresolvedIds].forEach((id) => {
      const result = validateOptionGroupId({ id, allowPlaceholders: true });
      expect(result.isValid).toBe(true);
    });
  });

  test('returns true for valid IDs without placeholders', () => {
    alwaysValidIds.forEach((id) => {
      const result = validateOptionGroupId({ id, allowPlaceholders: false });
      expect(result.isValid).toBe(true);
    });
  });

  test('returns false with an error for placeholder IDs when placeholders are not allowed', () => {
    validUnresolvedIds.forEach((id) => {
      const result = validateOptionGroupId({ id, allowPlaceholders: false });
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  test('returns false with an error message for invalid IDs', () => {
    invalidIds.forEach((id) => {
      const result = validateOptionGroupId({ id, allowPlaceholders: true });
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
