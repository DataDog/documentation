import { HugoConfig, HugoGlobalConfig } from '../../../src/schemas/config/hugo';
import { IntegrationConfig } from '../../../src/schemas/config/integration';
import { VALID_SITE_DIR } from '../../config/constants';
import { HugoFunctions } from '../../../src/helperModules/HugoFunctions';
import { PageConfig } from '../../../src/schemas/config/hugo';

const mockIntegrationConfig: IntegrationConfig = {
  siteParams: { img_url: 'https://example.com' },
  env: 'development',
  languages: ['en', 'ja'],
  siteConfig: {
    baseURL: 'https://example.com/'
  },
  siteDir: VALID_SITE_DIR,
  i18n: {
    en: {
      example_key: {
        other: 'test'
      }
    },
    ja: {
      example_key: {
        other: 'テスト'
      }
    }
  }
};

const mockHugoGlobalConfig: HugoGlobalConfig = {
  ...mockIntegrationConfig,
  dirs: HugoFunctions.getSubdirsByType(VALID_SITE_DIR),
  i18n: {
    en: {
      example_key: {
        other: 'test'
      }
    },
    ja: {
      example_key: {
        other: 'テスト'
      }
    }
  }
};

const mockPageConfig: PageConfig = {
  lang: 'en',
  path: 'example/path/to/file.mdoc'
};

const mockHugoConfig: HugoConfig = { global: mockHugoGlobalConfig, page: mockPageConfig };

export { mockHugoGlobalConfig, mockIntegrationConfig, mockPageConfig, mockHugoConfig };
