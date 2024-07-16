// Where all test snapshots should be stored
export const SNAPSHOTS_DIR = __dirname + '/__snapshots__';

// Where all mock data should be stored
export const MOCKS_DIR = __dirname + '/mocks';

// Valid example site
export const VALID_EXAMPLE_SITE_DIR = __dirname + '/mocks/valid/simple_site';
export const VALID_PREF_OPTIONS_DIR =
  VALID_EXAMPLE_SITE_DIR + '/preferences_config/options';
export const VALID_SITEWIDE_PREFS_FILE =
  VALID_EXAMPLE_SITE_DIR + '/preferences_config/sitewide_preferences.yaml';
export const VALID_CONTENT_DIR = VALID_EXAMPLE_SITE_DIR + '/content';
export const VALID_PARTIALS_DIR = VALID_EXAMPLE_SITE_DIR + '/partials';

// Authoring mistakes site
export const AUTHORING_MISTAKES_SITE_DIR =
  __dirname + '/mocks/invalid/site_with_authoring_mistakes';
