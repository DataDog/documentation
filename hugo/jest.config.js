module.exports = {
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!geo-locate)'],
    testPathIgnorePatterns: ['/node_modules/', '/assets/scripts/tests/api-snapshots/', '/assets/scripts/tests/mocks/'],
    moduleNameMapper: {
        '^@params$': '<rootDir>/assets/scripts/tests/mocks/params.js'
    },
}
