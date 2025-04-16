import { describe, expect, test } from 'vitest';
import { mockWizardFilters } from './config/mocks/wizardFilters';
import { mockNewCustomizationConfig } from './config/mocks/newCustomizationConfig';
import { mockExistingCustomizationConfig } from './config/mocks/existingCustomizationConfig';
import { mockFrontmatter } from './config/mocks/frontmatter';
import { mockMergedCustomizationConfig } from './config/mocks/mergedCustomizationConfig';
import {
  getNetNewConfig,
  buildFrontmatterData,
  mergeCustomizationConfigs,
  buildConfigYaml,
  buildWizardFilter
} from '../src/dataUtils';
import { SNAPSHOTS_DIR } from './config/constants';

describe('dataUtils', () => {
  test('getNetNewConfig', () => {
    const newConfig = getNetNewConfig({
      filters: mockWizardFilters,
      customizationConfig: mockExistingCustomizationConfig
    });

    expect(newConfig).toEqual(mockNewCustomizationConfig);
  });

  test('buildFrontmatterData', () => {
    const frontmatter = buildFrontmatterData({
      filters: mockWizardFilters
    });
    expect(frontmatter).toEqual(mockFrontmatter);
  });

  test('mergeCustomizationConfigs', () => {
    const mergedConfig = mergeCustomizationConfigs(mockNewCustomizationConfig, mockExistingCustomizationConfig);
    expect(mergedConfig).toEqual(mockMergedCustomizationConfig);
  });

  test('buildConfigYaml', async () => {
    const configYaml = buildConfigYaml(mockNewCustomizationConfig);
    Object.keys(configYaml).forEach(async (key) => {
      await expect(configYaml[key]).toMatchFileSnapshot(SNAPSHOTS_DIR + '/configYaml/' + key + '.snap.yaml');
    });
  });

  test('buildWizardFilter', () => {
    const filter = buildWizardFilter({
      traitId: 'color',
      optionGroupId: 'traffic_light_color_options',
      customizationConfig: mockExistingCustomizationConfig
    });

    filter.uuid = 'SANITIZED';
    const mockFilter = { ...mockWizardFilters[0], uuid: 'SANITIZED' };
    expect(filter).toEqual(mockFilter);
  });
});
