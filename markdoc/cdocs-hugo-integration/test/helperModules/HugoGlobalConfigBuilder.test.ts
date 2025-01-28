import { describe, test, expect } from 'vitest';
import { HugoGlobalConfigSchema } from '../../src/schemas/config/hugo';
import { VALID_SITE_DIR, SNAPSHOTS_DIR } from '../config/constants';
import { IntegrationConfig } from '../../src/schemas/config/integration';
import { HugoGlobalConfigBuilder } from '../../src/helperModules/HugoGlobalConfigBuilder';

describe('HugoFunctions', () => {
  const integrationConfig: IntegrationConfig = {
    baseSiteDir: VALID_SITE_DIR,
    env: 'development'
  };

  const hugoConfig = HugoGlobalConfigBuilder.build(integrationConfig);

  test('builds a valid HugoGlobalConfig object', () => {
    expect(() => {
      HugoGlobalConfigSchema.parse(hugoConfig);
    }).not.toThrow();
  });

  test('matches the snapshot', async () => {
    await expect(JSON.stringify(hugoConfig, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/HugoGlobalConfigBuilder.snap.json`
    );
  });
});
