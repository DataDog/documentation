import { HugoConfig, HugoGlobalConfig } from '../../../src/schemas/config/hugo';
import { VALID_SITE_DIR } from '../../config/constants';
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
  dirs: {
    content: VALID_SITE_DIR + '/content',
    filtersConfig: VALID_SITE_DIR + '/content_filters',
    partials: VALID_SITE_DIR + '/layouts/partials',
    images: VALID_SITE_DIR + '/static/images'
  }
};

const mockPageConfig: PageConfig = {
  lang: 'en',
  path: 'example/path/to/file.mdoc.md'
};

const mockHugoConfig: HugoConfig = { global: mockHugoGlobalConfig, page: mockPageConfig };

export { mockHugoGlobalConfig, mockPageConfig, mockHugoConfig };
