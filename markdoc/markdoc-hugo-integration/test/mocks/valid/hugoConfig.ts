import { HugoConfig } from '../../../src/schemas/config/hugo';
import { VALID_SITE_DIR } from '../../config/constants';

const mockHugoConfig: HugoConfig = {
  siteParams: { img_url: 'https://example.com' },
  env: 'development',
  languages: ['en', 'ja'],
  siteConfig: {
    baseURL: 'https://example.com/'
  },
  dirs: {
    content: VALID_SITE_DIR + '/content',
    prefsConfig: VALID_SITE_DIR + '/preferences_config',
    partials: VALID_SITE_DIR + '/partials',
    images: VALID_SITE_DIR + '/static/images'
  }
};

export { mockHugoConfig };
