/**
 * Because this test suite is intended to function as a working example,
 * all of its logic is executed up front in the describe block,
 * then the results are tested piece by piece.
 */
import { describe, test, expect } from 'vitest';
import {
  FrontMatter,
  loadCustomizationConfig,
  buildFiltersManifest,
  resolveFilters,
} from '../../../src';

const GENERATED_DATA_DIR = __dirname + '/generatedData';
const CUSTOMIZATION_CONFIG_DIR = __dirname + '/customization_config';

describe('Simple example', () => {
  const langs = ['en', 'piglatin'];

  // Load the customization config
  const { customizationConfigByLang } = loadCustomizationConfig({
    configDir: CUSTOMIZATION_CONFIG_DIR,
    langs,
  });

  // "Parse" the frontmatter (the parse result
  // is hardcoded here, but would come from parsing a file)
  const frontmatter: FrontMatter = {
    title: 'Simple Example Page',
    content_filters: [
      {
        label: 'Favorite color',
        trait_id: 'favorite_color',
        option_group_id: 'favorite_color_options',
      },
    ],
  };

  // Build the English filters manifest for the page
  const manifest = buildFiltersManifest({
    frontmatter,
    customizationConfig: customizationConfigByLang.en,
  });

  // Resolve the filters using the default value (purple)
  const defaultResolvedFilters = resolveFilters({
    valsByTraitId: manifest.defaultValsByTraitId,
    filtersManifest: manifest,
  });

  console.log('\nDefault favorite color value:');
  console.log(defaultResolvedFilters.favorite_color.currentValue); // purple

  // Change the user's selection to pink
  const userSelectionsByTraitId = {
    favorite_color: 'pink',
  };

  // Resolve the filters again
  const customResolvedFilters = resolveFilters({
    valsByTraitId: userSelectionsByTraitId,
    filtersManifest: manifest,
  });

  console.log('\nManually updated favorite color value:');
  console.log(defaultResolvedFilters.favorite_color.currentValue); // pink

  // Change the user's selection to an invalid value
  // (for example, carried over in local storage from a previous page
  // that had different options for its favorite_color filter)
  const invalidUserSelectionsByTraitId = {
    favorite_color: 'red',
  };

  // Resolve the filters again -- the value should reset to the default,
  // since the user's selection is invalid
  const gracefullyResolvedFilters = resolveFilters({
    valsByTraitId: invalidUserSelectionsByTraitId,
    filtersManifest: manifest,
  });

  console.log('\nGracefully resolved favorite color value:');
  console.log(defaultResolvedFilters.favorite_color.currentValue); // purple

  test('loads a customization config that matches the snapshot', async () => {
    const snapshot = JSON.stringify(customizationConfigByLang, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      GENERATED_DATA_DIR + '/01_customizationConfigByLang.snap.json',
    );
  });

  test('builds a filters manifest that matches the snapshot', async () => {
    const snapshot = JSON.stringify(manifest, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      GENERATED_DATA_DIR + '/02_filtersManifest.snap.json',
    );
  });

  test('resolves default filters that match the snapshot', async () => {
    const snapshot = JSON.stringify(defaultResolvedFilters, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      GENERATED_DATA_DIR + '/03_defaultResolvedFilters.snap.json',
    );
  });

  test('resolves custom filters that match the snapshot', async () => {
    const snapshot = JSON.stringify(customResolvedFilters, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      GENERATED_DATA_DIR + '/04_customResolvedFilters.snap.json',
    );
  });

  test('gracefully resolves invalid values to filters that match the default filters', async () => {
    expect(gracefullyResolvedFilters).toEqual(defaultResolvedFilters);

    const snapshot = JSON.stringify(gracefullyResolvedFilters, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      GENERATED_DATA_DIR + '/05_gracefullyResolvedFilters.snap.json',
    );
  });
});
