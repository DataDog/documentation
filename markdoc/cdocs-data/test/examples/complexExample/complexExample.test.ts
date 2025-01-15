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

describe('Complex example', () => {
  const langs = ['en'];

  // Load the customization config
  const { customizationConfigByLang } = loadCustomizationConfig({
    configDir: CUSTOMIZATION_CONFIG_DIR,
    langs,
  });

  // "Parse" the frontmatter (the parse result
  // is hardcoded here, but would come from parsing a file)
  const frontmatter: FrontMatter = {
    title: 'Paint Catalog',
    content_filters: [
      {
        label: 'Finish',
        trait_id: 'paint_finish',
        option_group_id: 'paint_finish_options',
      },
      {
        label: 'Color',
        trait_id: 'paint_color',
        option_group_id: '<PAINT_FINISH>_paint_color_options',
        // The option group will dynamically resolve to 'matte_paint_color_options',
        // 'eggshell_paint_color_options', or 'glossy_paint_color_options'.
      },
    ],
  };

  // Build the English filters manifest for the page
  const manifest = buildFiltersManifest({
    frontmatter,
    customizationConfig: customizationConfigByLang.en,
  });

  // Resolve the filters using the default values
  const defaultResolvedFilters = resolveFilters({
    valsByTraitId: manifest.defaultValsByTraitId,
    filtersManifest: manifest,
  });

  console.log('\nDefault paint finish and color:');
  console.log(defaultResolvedFilters.paint_finish.currentValue); // eggshell
  console.log(defaultResolvedFilters.paint_color.currentValue); // sunlit_sands

  // Update the user's paint finish selection
  // to a non-default option
  const userSelectionsByTraitId = {
    ...manifest.defaultValsByTraitId,
    paint_finish: 'glossy',
  };

  // Resolve the filters again
  const glossyResolvedFilters = resolveFilters({
    valsByTraitId: userSelectionsByTraitId,
    filtersManifest: manifest,
  });

  // Notice that the paint color automatically updates,
  // since the glossy finish has a different default paint color
  // than the default (eggshell) finish
  console.log(`\nPaint finish and color after the 'glossy' finish is selected:`);
  console.log(glossyResolvedFilters.paint_finish.currentValue); // glossy
  console.log(glossyResolvedFilters.paint_color.currentValue); // golden_mirage

  // Change the user's selection to an invalid value
  // (for example, carried over in local storage from a previous page
  // that had different options for paint finish)
  const invalidUserSelectionsByTraitId = {
    ...manifest.defaultValsByTraitId,
    paint_finish: 'semi_gloss',
  };

  // Resolve the filters again -- the value should reset to the default,
  // since the user's selection is invalid
  const gracefullyResolvedFilters = resolveFilters({
    valsByTraitId: invalidUserSelectionsByTraitId,
    filtersManifest: manifest,
  });

  console.log('\nGracefully resolved paint finish and color:');
  console.log(defaultResolvedFilters.paint_finish.currentValue); // eggshell
  console.log(defaultResolvedFilters.paint_color.currentValue); // sunlit_sands

  test('loads a customization config that matches the snapshot', async () => {
    const snapshot = JSON.stringify(customizationConfigByLang, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      GENERATED_DATA_DIR + '/01_customizationConfigByLang.snap.json',
    );
  });

  test('builds an error-free filters manifest that matches the snapshot', async () => {
    expect(manifest.errors.length).toBe(0);

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

  test('correctly resolves glossy filters that match the snapshot', async () => {
    expect(glossyResolvedFilters.paint_finish.currentValue).toBe('glossy');

    const snapshot = JSON.stringify(glossyResolvedFilters, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      GENERATED_DATA_DIR + '/04_glossyResolvedFilters.snap.json',
    );
  });

  test('resolves gracefully filters that match the default resolved filters and the snapshot', async () => {
    expect(gracefullyResolvedFilters).toEqual(defaultResolvedFilters);

    const snapshot = JSON.stringify(gracefullyResolvedFilters, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      GENERATED_DATA_DIR + '/05_gracefullyResolvedFilters.snap.json',
    );
  });
});
