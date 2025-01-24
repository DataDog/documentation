import { describe, test, expect } from 'vitest';
import { loadCustomizationConfig } from '../../../src';
import {
  INVALID_CONFIGS_DIR,
  VALID_CUSTOMIZATION_CONFIG_DIR,
  SNAPSHOTS_DIR,
} from '../../config/constants';
import fs from 'fs';

describe('loadCustomizationConfig', () => {
  const langs = ['en', 'piglatin'];

  const { customizationConfigByLang } = loadCustomizationConfig({
    configDir: VALID_CUSTOMIZATION_CONFIG_DIR,
    langs,
  });

  test('uses translated config data when present', () => {
    const piglatinColorTraitLabel =
      customizationConfigByLang.piglatin.traitsById.color.label;
    expect(piglatinColorTraitLabel).toBe('Olorcay');
  });

  test('backfills English data when translations are not available', () => {
    const piglatinPaintTraitLabel =
      customizationConfigByLang.piglatin.traitsById.paint.label;
    expect(piglatinPaintTraitLabel).toBe('Paint color');
  });

  test('contains the expected trait IDs in both languages', () => {
    const expectedTraitIds = ['color', 'finish', 'paint'].sort();
    const actualEnTraitIds = Object.keys(customizationConfigByLang.en.traitsById).sort();
    const actualPiglatinTraitIds = Object.keys(
      customizationConfigByLang.piglatin.traitsById,
    ).sort();

    expect(actualEnTraitIds).toEqual(expectedTraitIds);
    expect(actualPiglatinTraitIds).toEqual(expectedTraitIds);
  });

  test('contains the expected option group IDs in both languages', () => {
    const expectedOptionGroupIds = [
      'color_options',
      'finish_options',
      'matte_blue_paint_options',
      'matte_red_paint_options',
      'eggshell_blue_paint_options',
      'eggshell_red_paint_options',
      'gloss_blue_paint_options',
      'gloss_red_paint_options',
    ].sort();

    const actualEnOptionGroupIds = Object.keys(
      customizationConfigByLang.en.optionGroupsById,
    ).sort();

    const actualPiglatinOptionGroupIds = Object.keys(
      customizationConfigByLang.piglatin.optionGroupsById,
    ).sort();

    expect(actualEnOptionGroupIds).toEqual(expectedOptionGroupIds);
    expect(actualPiglatinOptionGroupIds).toEqual(expectedOptionGroupIds);
  });

  test('loads a configuration from YAML that matches the snapshot', async () => {
    const stringifiedConfig = JSON.stringify(customizationConfigByLang, null, 2);

    await expect(stringifiedConfig).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/api/loadCustomizationConfig/validConfig.snap.json',
    );
  });

  // Invalid data handling
  const invalidDirs = fs.readdirSync(INVALID_CONFIGS_DIR);
  const errorsByDir: Record<string, Array<any>> = {};

  invalidDirs.forEach((invalidDir) => {
    let thrownError: any = null;

    try {
      const { customizationConfigByLang } = loadCustomizationConfig({
        configDir: `${INVALID_CONFIGS_DIR}/${invalidDir}`,
        langs,
      });
    } catch (error) {
      thrownError = error;
      errorsByDir[invalidDir] = thrownError;
    }

    test(`throws an error when processing the invalid directory: '${invalidDir}'`, () => {
      expect(thrownError).not.toBeNull();
    });
  });

  test(`the errors match the snapshot`, async () => {
    const stringifiedErrors = JSON.stringify(errorsByDir, null, 2);
    await expect(stringifiedErrors).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/api/loadCustomizationConfig/invalidDirectoryErrors.snap.json`,
    );
  });
});
