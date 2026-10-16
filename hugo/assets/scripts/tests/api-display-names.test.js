const fs = require('fs');
const yaml = require('js-yaml');
const { applyApiDisplayNames } = require('../api-display-names');
const bp = require('../build-api-pages');

const fixture = () => ({
    tags: [{ name: 'Pets', 'x-displayName': 'Animal Care', description: 'Manage animals.' }],
    paths: {
        '/api/v2/pets': {
            post: {
                tags: ['Pets'],
                summary: 'Create a pet',
                'x-displayName': 'Create an animal',
                operationId: 'CreatePet',
                description: 'Create an animal.',
                requestBody: { content: { 'application/json': { example: { type: 'pet' } } } },
                security: [{ AuthZ: ['pets_write'] }]
            }
        }
    }
});

describe('API display labels from the source specification', () => {
    it('preserves operation IDs, wire values, descriptions, and original routing labels', () => {
        const before = fixture();
        const after = applyApiDisplayNames(JSON.parse(JSON.stringify(before)));
        expect(after.tags[0]).toMatchObject({ name: 'Animal Care', 'x-docs-original-name': 'Pets' });
        expect(after.paths['/api/v2/pets'].post).toEqual({
            ...before.paths['/api/v2/pets'].post,
            tags: ['Animal Care'],
            summary: 'Create an animal',
            'x-docs-original-summary': 'Create a pet'
        });
        const snapshot = JSON.stringify(after);
        expect(JSON.stringify(applyApiDisplayNames(after))).toBe(snapshot);
    });

    it('leaves specs with no display overrides unchanged', () => {
        const spec = fixture();
        delete spec.tags[0]['x-displayName'];
        delete spec.paths['/api/v2/pets'].post['x-displayName'];
        const before = JSON.stringify(spec);
        expect(JSON.stringify(applyApiDisplayNames(spec))).toBe(before);
    });

    it('generates new English titles and menu labels at the existing URLs', () => {
        const writes = new Map();
        const write = jest.spyOn(fs, 'writeFileSync').mockImplementation((path, body) => writes.set(path, body));
        const read = jest.spyOn(fs, 'readFileSync').mockReturnValue(
            yaml.safeDump({
                menu: {
                    api: [
                        { identifier: 'pets', name: 'Pets', generated: true },
                        { identifier: 'pets-create-a-pet', name: 'Create a pet', generated: true }
                    ]
                }
            })
        );
        const mkdir = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
        const log = jest.spyOn(console, 'log').mockImplementation(() => {});
        try {
            const spec = applyApiDisplayNames(fixture());
            bp.createEndpointPages([spec], ['./data/api/v2/full_spec.yaml']);
            bp.updateMenu([spec], ['./data/api/v2/full_spec.yaml'], ['en', 'fr']);
            expect(writes.get('./content/en/api/latest/pets/create-a-pet/index.md')).toContain(
                'title: Create an animal'
            );
            expect(writes.has('./content/en/api/latest/animal-care/create-an-animal/index.md')).toBe(false);
            const menu = yaml.safeLoad(writes.get('./config/_default/menus/api.en.yaml')).menu.api;
            expect(menu.find((entry) => entry.identifier === 'pets').name).toBe('Animal Care');
            expect(menu.find((entry) => entry.identifier === 'pets-create-a-pet')).toMatchObject({
                name: 'Create an animal',
                url: '/api/latest/pets/create-a-pet/',
                params: { operationids: ['CreatePet'], originalsummary: 'Create a pet' }
            });
            const translated = yaml.safeLoad(writes.get('./config/_default/menus/api.fr.yaml')).menu.api;
            expect(translated.find((entry) => entry.identifier === 'pets').name).toBe('Pets');
        } finally {
            write.mockRestore();
            read.mockRestore();
            mkdir.mockRestore();
            log.mockRestore();
        }
    });
});
