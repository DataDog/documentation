const fs = require('fs');
const path = require('path');

const guide = fs.readFileSync(
    path.join(__dirname, '../../../content/en/tests/guides/test_automation_exclusions.md'),
    'utf8'
);
const sdkRequirements = new Map(
    Array.from(guide.matchAll(/^\|[^|]+\| `([^`]+)` \| ([^|]+) \|$/gm),
        ([, sdk, availability]) => [sdk, availability.trim()])
);

// Each imported API needs its own compatibility requirement, rather than the
// older minimum versions for Test Optimization or a test framework.
describe('test automation annotation SDK requirements', () => {
    test.each([
        ['dd-trace', /from ['"]dd-trace\/test-optimization['"]|require\(['"]dd-trace\/test-optimization['"]\)/, 'dd-trace-js'],
        ['dd-trace-java', /import datadog\.trace\.api\.civisibility\.(NoAutoRetry|PreventFailureSuppression)/, 'dd-trace-java'],
        ['ddtrace', /from ddtrace\.testing import/, 'dd-trace-py'],
    ])('documents availability for examples that import %s annotations', (sdk, imports, repository) => {
        expect(guide).toMatch(imports);
        expect(sdkRequirements.has(sdk)).toBe(true);
        const availability = sdkRequirements.get(sdk);
        if (availability === 'Unreleased') {
            expect(guide).toMatch(/class="alert alert-warning"[^>]*>[^<]*not available in published SDK releases/);
        } else {
            const releasedVersion = new RegExp(
                `^\\[v?\\d+\\.\\d+\\.\\d+\\]\\(https://github\\.com/DataDog/${repository}/releases/tag/v?\\d+\\.\\d+\\.\\d+\\)$`
            );
            expect(availability).toMatch(releasedVersion);
        }
    });
});
