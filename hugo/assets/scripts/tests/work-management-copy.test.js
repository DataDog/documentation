const fs = require('fs');
const yaml = require('js-yaml');
const { applyWorkManagementCopy, renameText } = require('../work-management-copy');
const bp = require('../build-api-pages');
const loadSpec = () => yaml.safeLoad(fs.readFileSync('./data/api/v2/full_spec.yaml', 'utf8'));

describe('Work Management documentation copy', () => {
    it('preserves code literals, links, and API identifiers in prose', () => {
        expect(
            renameText('Cases in Case Management use `case`, `cases_write`, and [cases](https://example.com/cases).')
        ).toBe('Work items in Work Management use `case`, `cases_write`, and [work items](https://example.com/cases).');
        expect(renameText('POST /api/v2/cases creates a case.')).toBe('POST /api/v2/cases creates a work item.');
        expect(renameText('A case management project and the case’s status.')).toBe(
            'A Work Management project and the work item’s status.'
        );
    });

    it('changes only documentation fields throughout the real specification', () => {
        const original = loadSpec();
        const renamed = applyWorkManagementCopy(JSON.parse(JSON.stringify(original)));
        const compare = (before, after, path = []) => {
            if (before === null || typeof before !== 'object') {
                expect(after).toEqual(before);
                return;
            }
            for (const [key, value] of Object.entries(before)) {
                if (
                    ['description', 'summary', 'tags'].includes(key) &&
                    !path.some((p) => ['example', 'examples', 'default', 'enum'].includes(p))
                )
                    continue;
                compare(value, after[key], [...path, key]);
            }
        };
        compare(original, renamed);
        const operation = renamed.paths['/api/v2/cases'].post;
        expect(operation.summary).toBe('Create a work item');
        expect(operation.description).toBe('Create a work item');
        expect(operation.operationId).toBe('CreateCase');
        expect(operation.tags).toEqual(['Work Management']);
        expect(operation.security).toEqual(original.paths['/api/v2/cases'].post.security);
        expect(renamed.components.schemas.CaseResourceType.enum).toEqual(['case']);
        expect(renamed.components.schemas.CaseCreateAttributes.description).toMatch(/Work item/);
        for (const [path, methods] of Object.entries(original.paths)) {
            for (const [method, operation] of Object.entries(methods)) {
                if (!operation.tags || !operation.tags.some((tag) => tag.startsWith('Case Management'))) {
                    expect(renamed.paths[path][method]).toEqual(operation);
                }
            }
        }
        const snapshot = JSON.stringify(renamed);
        expect(JSON.stringify(applyWorkManagementCopy(renamed))).toBe(snapshot);
    });

    it('keeps existing page and menu URLs while updating English labels', () => {
        const spec = applyWorkManagementCopy(loadSpec());
        const writes = new Map();
        const write = jest.spyOn(fs, 'writeFileSync').mockImplementation((path, body) => writes.set(path, body));
        const mkdir = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
        const log = jest.spyOn(console, 'log').mockImplementation(() => {});
        try {
            bp.createEndpointPages([spec], ['./data/api/v2/full_spec.yaml']);
            bp.updateMenu([spec], ['./data/api/v2/full_spec.yaml'], ['en']);
            expect(writes.get('./content/en/api/latest/case-management/create-a-case/index.md')).toContain(
                'title: Create a work item'
            );
            expect(writes.has('./content/en/api/latest/work-management/create-a-work-item/index.md')).toBe(false);
            const menu = yaml.safeLoad(writes.get('./config/_default/menus/api.en.yaml')).menu.api;
            expect(menu.find((entry) => entry.identifier === 'case-management').name).toBe('Work Management');
            expect(menu.find((entry) => entry.identifier === 'case-management-create-a-case')).toMatchObject({
                name: 'Create a work item',
                url: '/api/latest/case-management/create-a-case/',
                params: { operationids: ['CreateCase'] }
            });
        } finally {
            write.mockRestore();
            mkdir.mockRestore();
            log.mockRestore();
        }
    });
});
