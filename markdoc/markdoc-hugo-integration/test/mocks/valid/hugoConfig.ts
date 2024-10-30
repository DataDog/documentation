import { HugoConfig } from '../../../src/schemas/hugoConfig';

const mockHugoConfig: HugoConfig = {
  siteParams: { img_url: 'https://example.com' },
  env: 'development',
  languages: ['en', 'ja'],
  baseURL: 'https://example.com'
};

export { mockHugoConfig };
