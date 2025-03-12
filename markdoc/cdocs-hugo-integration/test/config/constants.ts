import path from 'path';

// Where all test snapshots should be stored
export const SNAPSHOTS_DIR = __dirname + '/../__snapshots__';

// Where all mock data should be stored
export const MOCKS_DIR = path.join(__dirname, '.', 'mocks');

// Valid example site
export const VALID_SITE_DIR = MOCKS_DIR + '/validSite';
export const VALID_FILTERS_CONFIG_DIR = VALID_SITE_DIR + '/customization_config/';
export const VALID_CONTENT_DIR = VALID_SITE_DIR + '/content';
export const VALID_PARTIALS_DIR = VALID_SITE_DIR + '/layouts/partials';

// Invalid example site
export const INVALID_SITE_DIR = MOCKS_DIR + '/invalidSite';
