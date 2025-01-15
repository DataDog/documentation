import path from 'path';

// Where all test snapshots should be stored
export const SNAPSHOTS_DIR = __dirname + '/../__snapshots__';

// Where all mock data should be stored
export const MOCKS_DIR = path.join(__dirname, 'mocks');
export const VALID_MOCKS_DIR = path.join(MOCKS_DIR, 'valid');
export const INVALID_MOCKS_DIR = path.join(MOCKS_DIR, 'invalid');

// A collection of invalid customization config directories
export const INVALID_CONFIGS_DIR = INVALID_MOCKS_DIR + '/customizationConfigDirs';

// Valid data
export const VALID_CUSTOMIZATION_CONFIG_DIR = VALID_MOCKS_DIR + '/customization_config/';
