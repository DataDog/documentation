import { isDifferentPage } from '../helpers/history';

const origin = 'https://docs.datadoghq.com';

describe('isDifferentPage (popstate reload check)', () => {
    test('a path change reloads the content', () => {
        expect(
            isDifferentPage(
                '/database_monitoring/bits_database_optimization/',
                `${origin}/database_monitoring/database_investigator/`
            )
        ).toBe(true);
    });

    test('a path change to a URL with a hash reloads the content', () => {
        expect(isDifferentPage('/logs/', `${origin}/agent/#installation`)).toBe(true);
    });

    test('a hash-only change does not reload the content', () => {
        expect(isDifferentPage('/agent/', `${origin}/agent/#installation`)).toBe(false);
        expect(isDifferentPage('/agent/', `${origin}/agent/`)).toBe(false);
    });

    test('a query-only change does not reload the content', () => {
        expect(isDifferentPage('/glossary/', `${origin}/glossary/?product=apm`)).toBe(false);
    });

    test('a trailing slash difference does not reload the content', () => {
        expect(isDifferentPage('/agent', `${origin}/agent/`)).toBe(false);
        expect(isDifferentPage('/', origin)).toBe(false);
    });
});
