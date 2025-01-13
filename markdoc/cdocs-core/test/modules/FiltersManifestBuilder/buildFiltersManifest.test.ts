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
            label: 'Color',
            filter_id: 'color',
            option_group_id: 'color_options',
          },
          defaultValsByOptionGroupId: {
            color_options: 'blue',
          },
          possibleVals: ['blue', 'red'],
        },
        finish: {
          config: {
            label: 'Finish',
            filter_id: 'finish',
            option_group_id: 'finish_options',
          },
          defaultValsByOptionGroupId: {
            finish_options: 'eggshell',
          },
          possibleVals: ['matte', 'eggshell', 'gloss'],
        },
        paint: {
          config: {
            label: 'Paint color',
            filter_id: 'paint',
            option_group_id: '<FINISH>_<COLOR>_paint_options',
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
            label: 'Blue',
            default: true,
          },
          {
            id: 'red',
            label: 'Red',
          },
        ],
        finish_options: [
          {
            id: 'matte',
            label: 'Matte',
          },
          {
            id: 'eggshell',
            label: 'Eggshell',
            default: true,
          },
          {
            id: 'gloss',
            label: 'Gloss',
          },
        ],
        matte_blue_paint_options: [
          {
            id: 'powder_blue',
            label: 'Powder Blue',
            default: true,
          },
        ],
        matte_red_paint_options: [
          {
            id: 'brick',
            label: 'Brick',
            default: true,
          },
          {
            id: 'scarlet',
            label: 'Scarlet',
          },
        ],
        eggshell_blue_paint_options: [
          {
            id: 'elegant_royal',
            label: 'Elegant Royal',
            default: true,
          },
          {
            id: 'robins_egg',
            label: "Robin's Egg",
          },
        ],
        eggshell_red_paint_options: [
          {
            id: 'rose',
            label: 'Rose',
            default: true,
          },
          {
            id: 'ruby',
            label: 'Ruby',
          },
        ],
        gloss_blue_paint_options: [
          {
            id: 'sky_blue',
            label: 'Sky Blue',
            default: true,
          },
          {
            id: 'navy',
            label: 'Navy',
          },
        ],
        gloss_red_paint_options: [
          {
            id: 'fire_engine',
            label: 'Fire Engine',
            default: true,
          },
          {
            id: 'crimson',
            label: 'Crimson',
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
      `${SNAPSHOTS_DIR}/modules/FiltersManifestBuilder/valid/filtersManifest.snap.json`,
    );
  });

  test('detects an invalid placeholder', () => {
    const invalidFrontmatter = {
      title: 'My Page',
      customizations: [
        {
          label: 'Color',
          filter_id: 'color',
          option_group_id: 'color_options',
        },
        {
          label: 'Finish',
          filter_id: 'finish',
          option_group_id: 'finish_options',
        },
        {
          label: 'Paint color',
          filter_id: 'paint',
          // invalid placeholder 'COLOUR'
          option_group_id: '<FINISH>_<COLOUR>_paint_options',
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
