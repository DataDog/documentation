import { HugoConfig, HugoGlobalConfig } from '../../../src/schemas/config/hugo';
import { VALID_SITE_DIR } from '../../config/constants';
import { HugoFunctions } from '../../../src/helperModules/HugoFunctions';
import { PageConfig } from '../../../src/schemas/config/hugo';

const mockHugoGlobalConfig: HugoGlobalConfig = {
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
  },
  dirs: HugoFunctions.getSubdirsByType(VALID_SITE_DIR)
};

const mockPageConfig: PageConfig = {
  lang: 'en',
  path: 'example/path/to/file.mdoc.md'
};

const mockHugoConfig: HugoConfig = { global: mockHugoGlobalConfig, page: mockPageConfig };

export { mockHugoGlobalConfig, mockPageConfig, mockHugoConfig };
