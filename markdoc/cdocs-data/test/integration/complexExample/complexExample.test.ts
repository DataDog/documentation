/**
 * Because this test suite is also intended to function as a
 * continually verified working example,
 * all of its logic is executed up front in the describe block,
 * then the results are tested piece by piece.
 */
import { describe, test, expect } from 'vitest';
import {
  Frontmatter,
  loadCustomizationConfig,
  buildFiltersManifest,
  resolveFilters,
} from '../../../src';
import { SNAPSHOTS_DIR } from '../../config/constants';

const CUSTOMIZATION_CONFIG_DIR = __dirname + '/customization_config';

describe('Complex example', () => {
  const langs = ['en'];

  // Load the customization config, which includes
  // - a habitat trait, such as "ocean"
  // - an animal trait, such as "octopus"
  // - various options and option groups to support the above
  const { customizationConfigByLang } = loadCustomizationConfig({
    configDir: CUSTOMIZATION_CONFIG_DIR,
    langs,
  });

  // "Parse" the frontmatter (the parse result
  // is hardcoded here, but would come from parsing a file)
  const frontmatter: Frontmatter = {
    title: 'All About Animals',
    content_filters: [
      {
        label: 'Habitat',
        trait_id: 'habitat',
        option_group_id: 'habitat_options',
      },
      {
        label: 'Animal',
        trait_id: 'animal',
        option_group_id: '<HABITAT>_animal_options',
        // The option group will dynamically resolve to 'ocean_animal_options',
        // 'desert_animal_options', or 'forest_animal_options'.
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

  /*
  console.log('\nDefault habitat and animal:');
  console.log(defaultResolvedFilters.habitat.currentValue); // ocean
  console.log(defaultResolvedFilters.animal.currentValue); // octopus
  */

  // Update the user's habitat selection
  // to a non-default option
  const userSelectionsByTraitId = {
    ...manifest.defaultValsByTraitId,
    habitat: 'forest',
  };

  // Resolve the filters again
  const forestResolvedFilters = resolveFilters({
    valsByTraitId: userSelectionsByTraitId,
    filtersManifest: manifest,
  });

  // Notice that the animal automatically updates,
  // since forest octopi do not exist. The forest habitat's
  // default animal should automatically be used instead.
  /*
  console.log(`\nHabitat and animal after 'forest' is selected:`);
  console.log(forestResolvedFilters.habitat.currentValue); // forest
  console.log(forestResolvedFilters.animal.currentValue); // owl
  */

  // Change the user's selection to an invalid value
  // (for example, carried over in local storage from a previous page
  // that had different options for habitat)
  const invalidUserSelectionsByTraitId = {
    ...manifest.defaultValsByTraitId,
    habitat: 'mountains', // this option does not exist in this page's scope
  };

  // Resolve the filters again -- the value should reset to the default,
  // since the user's selection is invalid
  const gracefullyResolvedFilters = resolveFilters({
    valsByTraitId: invalidUserSelectionsByTraitId,
    filtersManifest: manifest,
  });

  /*
  console.log('\nGracefully resolved habitat and animal:');
  console.log(defaultResolvedFilters.habitat.currentValue); // ocean
  console.log(defaultResolvedFilters.animal.currentValue); // octopus
  */

  // BEGIN TESTS ----------------------------------------------------------

  const expectedTraitIds = ['habitat', 'animal'].sort();
  const expectedOptionGroupIds = [
    'habitat_options',
    'ocean_animal_options',
    'desert_animal_options',
    'forest_animal_options',
  ].sort();

  test('loads a customization config that matches the snapshot', async () => {
    const snapshot = JSON.stringify(customizationConfigByLang, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/complexExample/01_customizationConfigByLang.snap.json',
    );
  });

  test('loads a customization config that contains the expected trait IDs', () => {
    const actualTraitIds = Object.keys(customizationConfigByLang.en.traitsById).sort();
    expect(actualTraitIds).toEqual(expectedTraitIds);
  });

  test('loads a customization config that contains the expected option group IDs', () => {
    const actualOptionGroupIds = Object.keys(
      customizationConfigByLang.en.optionGroupsById,
    ).sort();
    expect(actualOptionGroupIds).toEqual(expectedOptionGroupIds);
  });

  test('builds an error-free filters manifest', () => {
    expect(manifest.errors.length).toBe(0);
  });

  test('builds a manifest containing the expected trait IDs', () => {
    const actualTraitIds = Object.keys(manifest.filtersByTraitId).sort();
    expect(actualTraitIds).toEqual(expectedTraitIds);
  });

  test('builds a manifest containing the expected option group IDs', () => {
    const actualOptionGroupIds = Object.keys(manifest.optionGroupsById).sort();
    expect(actualOptionGroupIds).toEqual(expectedOptionGroupIds);
  });

  test('builds a manifest that matches the snapshot', async () => {
    const snapshot = JSON.stringify(manifest, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/complexExample/02_filtersManifest.snap.json',
    );
  });

  test('resolves correctly defaulted filters that match the snapshot', async () => {
    expect(defaultResolvedFilters.habitat.currentValue).toBe('ocean');
    expect(defaultResolvedFilters.animal.currentValue).toBe('octopus');

    const snapshot = JSON.stringify(defaultResolvedFilters, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/complexExample/03_defaultResolvedFilters.snap.json',
    );
  });

  test('correctly resolves forest filters that match the snapshot', async () => {
    expect(forestResolvedFilters.habitat.currentValue).toBe('forest');
    expect(forestResolvedFilters.animal.currentValue).toBe('owl');

    const snapshot = JSON.stringify(forestResolvedFilters, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/complexExample/04_forestResolvedFilters.snap.json',
    );
  });

  test('resolves gracefully filters that match the default resolved filters and the snapshot', async () => {
    expect(gracefullyResolvedFilters).toEqual(defaultResolvedFilters);

    const snapshot = JSON.stringify(gracefullyResolvedFilters, null, 2);

    await expect(snapshot).toMatchFileSnapshot(
      SNAPSHOTS_DIR + '/complexExample/05_gracefullyResolvedFilters.snap.json',
    );
  });
});
