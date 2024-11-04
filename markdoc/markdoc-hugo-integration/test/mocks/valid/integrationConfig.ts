import { HugoGlobalConfig, IntegrationConfig } from '../../../src/schemas/config/hugo';
import { VALID_SITE_DIR } from '../../config/constants';
import { HugoFunctions } from '../../../src/helperModules/HugoFunctions';

const mockIntegrationConfig: IntegrationConfig = {
  siteParams: { img_url: 'https://example.com' },
  env: 'development',
  languages: ['en', 'ja'],
  siteConfig: {
    baseURL: 'https://example.com/'
  },
  siteDir: VALID_SITE_DIR
};

const mockHugoGlobalConfig: HugoGlobalConfig = {
  siteParams: { img_url: 'https://example.com' },
  env: 'development',
  languages: ['en', 'ja'],
  siteConfig: {
    baseURL: 'https://example.com/'
  },
  siteDir: VALID_SITE_DIR,
  dirs: HugoFunctions.getSubdirsByType(VALID_SITE_DIR)
};

export { mockHugoGlobalConfig, mockIntegrationConfig };
