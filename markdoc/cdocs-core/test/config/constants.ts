import path from 'path';

// Where all test snapshots should be stored
export const SNAPSHOTS_DIR = __dirname + '/../__snapshots__';

// Where all mock data should be stored
export const MOCKS_DIR = path.join(__dirname, '..', 'mocks');

// Where all valid mock data should be stored
export const VALID_MOCKS_DIR = path.join(__dirname, '..', 'mocks', 'valid');

// Valid configuration data
export const VALID_FILTERS_CONFIG_DIR = VALID_MOCKS_DIR + '/content_filters/';
export const VALID_CONTENT_DIR = VALID_MOCKS_DIR + '/content';
