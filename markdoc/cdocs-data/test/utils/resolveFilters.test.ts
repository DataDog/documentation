import { describe, test, expect } from 'vitest';
import { resolveFilters } from '../../src';
import { paintColorsManifest } from '../config/mocks/valid/paintColorsData/filtersManifest';

describe('resolveFilters', () => {
  test('correctly resolves default filters', () => {
    const resolvedFilters = resolveFilters({
      valsByTraitId: paintColorsManifest.defaultValsByTraitId,
      filtersManifest: paintColorsManifest,
    });

    Object.keys(paintColorsManifest.defaultValsByTraitId).forEach((traitId) => {
      const defaultVal = paintColorsManifest.defaultValsByTraitId[traitId];
      const resolvedVal = resolvedFilters[traitId].currentValue;
      expect(resolvedVal).toBe(defaultVal);
    });
  });

  test('correctly resolves non-default filters', () => {
    const updatedValsByTraitId = {
      ...paintColorsManifest.defaultValsByTraitId,
      color: 'red',
      finish: 'gloss',
    };

    const resolvedFilters = resolveFilters({
      valsByTraitId: updatedValsByTraitId,
      filtersManifest: paintColorsManifest,
    });

    const resolvedPaintColor = resolvedFilters.paint.currentValue;
    expect(resolvedPaintColor).toBe('fire_engine_g');
  });
});
