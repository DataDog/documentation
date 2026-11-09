import { describe, test, expect } from 'vitest';
import { buildFiltersManifest } from '../../../src';
import { FiltersConfigSchema } from '../../../src/schemas/frontmatter';
import { paintColorsFrontmatter } from '../../config/mocks/valid/paintColorsData/frontmatter';
import { paintColorsCustomizationConfig } from '../../config/mocks/valid/paintColorsData/customizationConfig';
import { paintColorsManifest } from '../../config/mocks/valid/paintColorsData/filtersManifest';

describe('buildFiltersManifest', () => {
  test('creates the expected object when given valid data', () => {
    const actualManifest = buildFiltersManifest({
      frontmatter: paintColorsFrontmatter,
      customizationConfig: paintColorsCustomizationConfig,
    });

    const expectedManifest = paintColorsManifest;

    expect(actualManifest).toEqual(expectedManifest);
  });

  test('throws an error when a semver trait has a possible value that cannot be parsed as a semver', () => {
    const invalidCustomizationConfig = {
      ...paintColorsCustomizationConfig,
      optionsById: {
        ...paintColorsCustomizationConfig.optionsById,
        not_a_valid_semver: {
          id: 'not_a_valid_semver',
          label: 'Invalid semver',
        },
      },
      optionGroupsById: {
        ...paintColorsCustomizationConfig.optionGroupsById,
        palette_version_options: [
          ...paintColorsCustomizationConfig.optionGroupsById['palette_version_options'],
          { id: 'not_a_valid_semver', label: 'Invalid semver' },
        ],
      },
    };

    const manifest = buildFiltersManifest({
      frontmatter: paintColorsFrontmatter,
      customizationConfig: invalidCustomizationConfig,
    });

    expect(manifest.errors.length).toEqual(1);
    expect(manifest.errors[0].message).toContain('Invalid semver option');
    expect(manifest.errors[0].data!.searchTerm).toEqual('not_a_valid_semver');
  });

  test('populates missing labels in frontmatter', () => {
    const frontmatter = { ...paintColorsFrontmatter };
    frontmatter.content_filters![0].label = undefined;

    const actualManifest = buildFiltersManifest({
      frontmatter,
      customizationConfig: paintColorsCustomizationConfig,
    });

    const expectedManifest = paintColorsManifest;

    expect(actualManifest).toEqual(expectedManifest);
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
    expect(manifest.errors[0].data!.searchTerm).toEqual(
      '<FINISH>_<COLOUR>_paint_options',
    );
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

describe('buildFiltersManifest conditional filter validation', () => {
  // A minimal customization config for conditional filter tests
  const conditionalCustomizationConfig = {
    traitsById: {
      lang: {
        id: 'lang',
        label: 'Language',
        type: 'text' as const,
        internal_notes: '',
      },
      variant: {
        id: 'variant',
        label: 'Variant',
        type: 'text' as const,
        internal_notes: '',
      },
    },
    optionsById: {
      java: { id: 'java', label: 'Java' },
      python: { id: 'python', label: 'Python' },
      jvm: { id: 'jvm', label: 'JVM' },
    },
    optionGroupsById: {
      lang_options: [
        { id: 'java', label: 'Java', default: true as const },
        { id: 'python', label: 'Python' },
      ],
      java_variant_options: [
        { id: 'jvm', label: 'JVM', default: true as const },
      ],
    },
  };

  test('rejects both show_if and hide_if on the same filter (schema validation)', () => {
    const result = FiltersConfigSchema.safeParse([
      {
        label: 'Language',
        trait_id: 'lang',
        option_group_id: 'lang_options',
      },
      {
        label: 'Variant',
        trait_id: 'variant',
        option_group_id: '<LANG>_variant_options',
        show_if: [{ lang: ['java'] }],
        hide_if: [{ lang: ['python'] }],
      },
    ]);

    expect(result.success).toBe(false);
  });

  test('rejects both show_if and hide_if via buildFiltersManifest', () => {
    const frontmatter = {
      title: 'My Page',
      content_filters: [
        {
          label: 'Language',
          trait_id: 'lang',
          option_group_id: 'lang_options',
        },
        {
          label: 'Variant',
          trait_id: 'variant',
          option_group_id: 'java_variant_options',
          show_if: [{ lang: ['java'] }],
          hide_if: [{ lang: ['python'] }],
        },
      ],
    };

    const manifest = buildFiltersManifest({
      frontmatter,
      customizationConfig: conditionalCustomizationConfig,
    });

    expect(manifest.errors.length).toBeGreaterThanOrEqual(1);
    expect(manifest.errors[0].message).toContain('both show_if and hide_if');
  });

  test('rejects show_if referencing a nonexistent trait', () => {
    const frontmatter = {
      title: 'My Page',
      content_filters: [
        {
          label: 'Language',
          trait_id: 'lang',
          option_group_id: 'lang_options',
        },
        {
          label: 'Variant',
          trait_id: 'variant',
          option_group_id: 'java_variant_options',
          show_if: [{ nonexistent_trait: ['java'] }],
        },
      ],
    };

    const manifest = buildFiltersManifest({
      frontmatter,
      customizationConfig: conditionalCustomizationConfig,
    });

    expect(manifest.errors.length).toBeGreaterThanOrEqual(1);
    expect(manifest.errors[0].message).toContain('nonexistent_trait');
    expect(manifest.errors[0].message).toContain('does not exist');
  });

  test('rejects hide_if referencing a nonexistent trait', () => {
    const frontmatter = {
      title: 'My Page',
      content_filters: [
        {
          label: 'Language',
          trait_id: 'lang',
          option_group_id: 'lang_options',
        },
        {
          label: 'Variant',
          trait_id: 'variant',
          option_group_id: 'java_variant_options',
          hide_if: [{ nonexistent_trait: ['java'] }],
        },
      ],
    };

    const manifest = buildFiltersManifest({
      frontmatter,
      customizationConfig: conditionalCustomizationConfig,
    });

    expect(manifest.errors.length).toBeGreaterThanOrEqual(1);
    expect(manifest.errors[0].message).toContain('nonexistent_trait');
    expect(manifest.errors[0].message).toContain('does not exist');
  });

  test('rejects show_if referencing a trait without a filter on the page', () => {
    // 'os' exists as a trait but has no filter on this page
    const configWithExtraTrait = {
      ...conditionalCustomizationConfig,
      traitsById: {
        ...conditionalCustomizationConfig.traitsById,
        os: {
          id: 'os',
          label: 'Operating System',
          type: 'text' as const,
          internal_notes: '',
        },
      },
    };

    const frontmatter = {
      title: 'My Page',
      content_filters: [
        {
          label: 'Language',
          trait_id: 'lang',
          option_group_id: 'lang_options',
        },
        {
          label: 'Variant',
          trait_id: 'variant',
          option_group_id: 'java_variant_options',
          show_if: [{ os: ['linux'] }],
        },
      ],
    };

    const manifest = buildFiltersManifest({
      frontmatter,
      customizationConfig: configWithExtraTrait,
    });

    expect(manifest.errors.length).toBeGreaterThanOrEqual(1);
    expect(manifest.errors[0].message).toContain('os');
    expect(manifest.errors[0].message).toContain(
      'does not have a corresponding filter',
    );
  });

  test('rejects show_if referencing an invalid option value for the trait', () => {
    const frontmatter = {
      title: 'My Page',
      content_filters: [
        {
          label: 'Language',
          trait_id: 'lang',
          option_group_id: 'lang_options',
        },
        {
          label: 'Variant',
          trait_id: 'variant',
          option_group_id: 'java_variant_options',
          show_if: [{ lang: ['go'] }],
        },
      ],
    };

    const manifest = buildFiltersManifest({
      frontmatter,
      customizationConfig: conditionalCustomizationConfig,
    });

    expect(manifest.errors.length).toBeGreaterThanOrEqual(1);
    expect(manifest.errors[0].message).toContain("'go'");
    expect(manifest.errors[0].message).toContain('not a valid option');
  });

  test('rejects hide_if referencing an invalid option value for the trait', () => {
    const frontmatter = {
      title: 'My Page',
      content_filters: [
        {
          label: 'Language',
          trait_id: 'lang',
          option_group_id: 'lang_options',
        },
        {
          label: 'Variant',
          trait_id: 'variant',
          option_group_id: 'java_variant_options',
          hide_if: [{ lang: ['ruby'] }],
        },
      ],
    };

    const manifest = buildFiltersManifest({
      frontmatter,
      customizationConfig: conditionalCustomizationConfig,
    });

    expect(manifest.errors.length).toBeGreaterThanOrEqual(1);
    expect(manifest.errors[0].message).toContain("'ruby'");
    expect(manifest.errors[0].message).toContain('not a valid option');
  });

  test('rejects empty show_if array (schema validation)', () => {
    const result = FiltersConfigSchema.safeParse([
      {
        label: 'Language',
        trait_id: 'lang',
        option_group_id: 'lang_options',
      },
      {
        label: 'Variant',
        trait_id: 'variant',
        option_group_id: 'java_variant_options',
        show_if: [],
      },
    ]);

    expect(result.success).toBe(false);
  });

  test('rejects empty hide_if array (schema validation)', () => {
    const result = FiltersConfigSchema.safeParse([
      {
        label: 'Language',
        trait_id: 'lang',
        option_group_id: 'lang_options',
      },
      {
        label: 'Variant',
        trait_id: 'variant',
        option_group_id: 'java_variant_options',
        hide_if: [],
      },
    ]);

    expect(result.success).toBe(false);
  });

  test('rejects empty condition object in show_if (schema validation)', () => {
    const result = FiltersConfigSchema.safeParse([
      {
        label: 'Language',
        trait_id: 'lang',
        option_group_id: 'lang_options',
      },
      {
        label: 'Variant',
        trait_id: 'variant',
        option_group_id: 'java_variant_options',
        show_if: [{}],
      },
    ]);

    expect(result.success).toBe(false);
  });

  test('rejects empty condition object in hide_if (schema validation)', () => {
    const result = FiltersConfigSchema.safeParse([
      {
        label: 'Language',
        trait_id: 'lang',
        option_group_id: 'lang_options',
      },
      {
        label: 'Variant',
        trait_id: 'variant',
        option_group_id: 'java_variant_options',
        hide_if: [{}],
      },
    ]);

    expect(result.success).toBe(false);
  });
});
