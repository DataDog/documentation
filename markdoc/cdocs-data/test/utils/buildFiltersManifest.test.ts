import { describe, test, expect } from 'vitest';
import { buildFiltersManifest } from '../../src';
import { paintColorsFrontmatter } from '../config/mocks/valid/paintColors/frontmatter';
import { paintColorsCustomizationConfig } from '../config/mocks/valid/paintColors/customizationConfig';
import { paintColorsManifest } from '../config/mocks/valid/paintColors/filtersManifest';
import _ from 'lodash';
import { SNAPSHOTS_DIR } from '../config/constants';

describe('buildFiltersManifest', () => {
  test('creates the expected object when given valid data', async () => {
    const manifest = buildFiltersManifest({
      frontmatter: paintColorsFrontmatter,
      customizationConfig: paintColorsCustomizationConfig,
    });

    const expectedManifest = paintColorsManifest;

    expect(_.isEqual(manifest, expectedManifest)).toBe(true);
    await expect(JSON.stringify(manifest, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/utils/buildFiltersManifest/validManifest.snap.json`,
    );
  });

  test('detects an invalid placeholder', () => {
    const invalidFrontmatter = {
      title: 'My Page',
      content_filters: [
        {
          label: 'Color',
          trait_id: 'color',
          option_group_id: 'color_options',
        },
        {
          label: 'Finish',
          trait_id: 'finish',
          option_group_id: 'finish_options',
        },
        {
          label: 'Paint color',
          trait_id: 'paint',
          // invalid placeholder 'COLOUR'
          option_group_id: '<FINISH>_<COLOUR>_paint_options',
        },
      ],
    };

    const manifest = buildFiltersManifest({
      frontmatter: invalidFrontmatter,
      customizationConfig: paintColorsCustomizationConfig,
    });

    expect(manifest.errors.length).toEqual(1);
    expect(manifest.errors[0].message).toContain('Invalid placeholder:');
  });

  test('detects a nonexistent options source', () => {
    // Intentionally omit a referenced option group from the mock config
    const { matte_blue_paint_options, ...invalidOptionGroupGlossary } =
      paintColorsCustomizationConfig.optionGroupsById;

    const invalidCustomizationConfig = {
      traitsById: { ...paintColorsCustomizationConfig.traitsById },
      optionsById: { ...paintColorsCustomizationConfig.optionsById },
      optionGroupsById: invalidOptionGroupGlossary,
    };

    const manifest = buildFiltersManifest({
      frontmatter: paintColorsFrontmatter,
      customizationConfig: invalidCustomizationConfig,
    });

    expect(manifest.errors.length).toEqual(1);
    expect(manifest.errors[0].message).toContain('Invalid options source:');
  });
});
