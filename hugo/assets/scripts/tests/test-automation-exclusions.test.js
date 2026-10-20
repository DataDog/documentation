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

// SDK annotation availability does not establish framework tag capabilities.
describe('Weaver annotation example compatibility', () => {
    test('scopes custom string tag syntax to supported framework versions', () => {
        const weaver = guide.split('**Weaver:**')[1].split(/^## /m)[0];
        expect(weaver).toMatch(/\.tagged\(TestAutomationExclusions\.NO_AUTO_RETRY\)/);
        const compatibility = weaver.match(/\*\*Framework compatibility:\*\* ([^\n]+)/)?.[1];
        expect(compatibility).toBeDefined();
        expect(compatibility).toMatch(/Weaver 0\.8\.4 and 0\.9\.0 support these custom string tags/);
        expect(compatibility).toMatch(/Weaver 0\.13\.0 does not support this API/);
    });
});
