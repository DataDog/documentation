import { MarkdocHugoIntegration } from '../../src';
import { describe, test, expect } from 'vitest';
import { VALID_SITE_DIR } from '../config/constants';

const siteDir = VALID_SITE_DIR;

describe('MarkdocHugoIntegration (optimized Markdown output)', () => {
  const initArgs = {
    directories: {
      content: siteDir + '/content',
      options: siteDir + '/preferences_config/options',
      partials: siteDir + '/partials'
    }
  };

  const invalidHugoConfigs = [
    // no env property
    {
      siteParams: {
        img_url: 'https://example.com'
      }
    },
    // no img_url in siteParams
    {
      siteParams: {
        irrelevant_key: 'irrelevant_value'
      },
      env: 'development'
    },
    // no branch in siteParams when env is 'preview'
    {
      siteParams: {
        img_url: 'https://example.com'
      },
      env: 'preview'
    }
  ];

  for (const hugoConfig of invalidHugoConfigs) {
    test(`throws an error when provided with Hugo config ${JSON.stringify(
      hugoConfig
    )}`, () => {
      expect(() => {
        // @ts-expect-error, invalidity is intentional
        new MarkdocHugoIntegration({ ...initArgs, hugoConfig });
      }).toThrow();
    });
  }
});
