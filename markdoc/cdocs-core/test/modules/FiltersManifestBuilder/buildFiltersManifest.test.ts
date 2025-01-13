import { describe, test, expect } from 'vitest';
import { FiltersManifestBuilder } from '../../../src/modules/FiltersManifestBuilder';
import {
  paintColorsFrontmatter,
  paintColorsContentFiltersConfig,
} from '../../mocks/valid/paintColorsConfig';
import _ from 'lodash';
import { SNAPSHOTS_DIR } from '../../config/constants';
import { PageFiltersManifest } from '../../../src/schemas/pageFilters';

describe('FiltersManifestBuilder.build', () => {
  test('creates the expected object when given valid data', async () => {
    const manifest = FiltersManifestBuilder.build({
      frontmatter: paintColorsFrontmatter,
      contentFiltersConfig: paintColorsContentFiltersConfig,
    });

    const expectedManifest: PageFiltersManifest = {
      filtersById: {
        color: {
          config: {
            display_name: 'Color',
            id: 'color',
            options_source: 'color_options',
          },
          defaultValsByOptionGroupId: {
            color_options: 'blue',
          },
          possibleVals: ['blue', 'red'],
        },
        finish: {
          config: {
            display_name: 'Finish',
            id: 'finish',
            options_source: 'finish_options',
          },
          defaultValsByOptionGroupId: {
            finish_options: 'eggshell',
          },
          possibleVals: ['matte', 'eggshell', 'gloss'],
        },
        paint: {
          config: {
            display_name: 'Paint color',
            id: 'paint',
            options_source: '<FINISH>_<COLOR>_paint_options',
          },
          defaultValsByOptionGroupId: {
            matte_blue_paint_options: 'powder_blue',
            matte_red_paint_options: 'brick',
            eggshell_blue_paint_options: 'elegant_royal',
            eggshell_red_paint_options: 'rose',
            gloss_blue_paint_options: 'sky_blue',
            gloss_red_paint_options: 'fire_engine',
          },
          possibleVals: [
            'powder_blue',
            'brick',
            'scarlet',
            'elegant_royal',
            'robins_egg',
            'rose',
            'ruby',
            'sky_blue',
            'navy',
            'fire_engine',
            'crimson',
          ],
        },
      },
      optionGroupsById: {
        color_options: [
          {
            id: 'blue',
            display_name: 'Blue',
            default: true,
          },
          {
            id: 'red',
            display_name: 'Red',
          },
        ],
        finish_options: [
          {
            id: 'matte',
            display_name: 'Matte',
          },
          {
            id: 'eggshell',
            display_name: 'Eggshell',
            default: true,
          },
          {
            id: 'gloss',
            display_name: 'Gloss',
          },
        ],
        matte_blue_paint_options: [
          {
            id: 'powder_blue',
            display_name: 'Powder Blue',
            default: true,
          },
        ],
        matte_red_paint_options: [
          {
            id: 'brick',
            display_name: 'Brick',
            default: true,
          },
          {
            id: 'scarlet',
            display_name: 'Scarlet',
          },
        ],
        eggshell_blue_paint_options: [
          {
            id: 'elegant_royal',
            display_name: 'Elegant Royal',
            default: true,
          },
          {
            id: 'robins_egg',
            display_name: "Robin's Egg",
          },
        ],
        eggshell_red_paint_options: [
          {
            id: 'rose',
            display_name: 'Rose',
            default: true,
          },
          {
            id: 'ruby',
            display_name: 'Ruby',
          },
        ],
        gloss_blue_paint_options: [
          {
            id: 'sky_blue',
            display_name: 'Sky Blue',
            default: true,
          },
          {
            id: 'navy',
            display_name: 'Navy',
          },
        ],
        gloss_red_paint_options: [
          {
            id: 'fire_engine',
            display_name: 'Fire Engine',
            default: true,
          },
          {
            id: 'crimson',
            display_name: 'Crimson',
          },
        ],
      },
      errors: [],
      defaultValsByFilterId: {
        color: 'blue',
        finish: 'eggshell',
        paint: 'elegant_royal',
      },
    };
    expect(_.isEqual(manifest, expectedManifest)).toBe(true);
    await expect(JSON.stringify(manifest, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/FiltersManifestBuilder/valid/filtersManifest.snap.json`,
    );
  });

  test('detects an invalid placeholder', () => {
    const invalidFrontmatter = {
      title: 'My Page',
      content_filters: [
        {
          display_name: 'Color',
          id: 'color',
          options_source: 'color_options',
        },
        {
          display_name: 'Finish',
          id: 'finish',
          options_source: 'finish_options',
        },
        {
          display_name: 'Paint color',
          id: 'paint',
          // invalid placeholder 'COLOUR'
          options_source: '<FINISH>_<COLOUR>_paint_options',
        },
      ],
    };

    const manifest = FiltersManifestBuilder.build({
      frontmatter: invalidFrontmatter,
      contentFiltersConfig: paintColorsContentFiltersConfig,
    });

    expect(manifest.errors.length).toEqual(1);
    expect(manifest.errors[0].message).toContain('Invalid placeholder:');
  });

  test('detects a nonexistent options source', () => {
    // Intentionally omit a referenced option group from the mock config
    const { matte_blue_paint_options, ...invalidOptionGroupGlossary } =
      paintColorsContentFiltersConfig.optionGroupGlossary;

    const invalidContentFiltersConfig = {
      filterGlossary: { ...paintColorsContentFiltersConfig.filterGlossary },
      optionGlossary: { ...paintColorsContentFiltersConfig.optionGlossary },
      optionGroupGlossary: invalidOptionGroupGlossary,
    };

    const manifest = FiltersManifestBuilder.build({
      frontmatter: paintColorsFrontmatter,
      contentFiltersConfig: invalidContentFiltersConfig,
    });

    expect(manifest.errors.length).toEqual(1);
    expect(manifest.errors[0].message).toContain('Invalid options source:');
  });
});
