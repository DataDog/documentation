import { describe, expect, test } from 'vitest';
import { mockWizardFilters } from './config/mocks/wizardFilters';
import { mockNewCustomizationConfig } from './config/mocks/newCustomizationConfig';
import { mockExistingCustomizationConfig } from './config/mocks/existingCustomizationConfig';
import { getNetNewConfig } from '../src/dataUtils';

describe('dataUtils', () => {
  test('getNetNewConfig', () => {
    const newConfig = getNetNewConfig({
      filters: mockWizardFilters,
      customizationConfig: mockExistingCustomizationConfig
    });

    console.log('newConfig', JSON.stringify(newConfig, null, 2));
    console.log('mockNewCustomizationConfig', JSON.stringify(mockNewCustomizationConfig, null, 2));

    expect(newConfig).toEqual(mockNewCustomizationConfig);
  });

  test.todo('buildFrontmatterData', () => {});
  test.todo('mergeCustomizationConfigs', () => {});
  test.todo('buildWizardFilter', () => {});
  test.todo('buildConfigYaml', () => {});
});
