import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync, spawnSync } from 'child_process';
import { inflateSync } from 'zlib';

const hugoRoot = path.resolve(__dirname, '../../..');
const shells = ['bash', 'zsh'].filter(shell => spawnSync(shell, ['-c', 'exit 0']).status === 0);
const logBody = JSON.stringify([{ message: 'JSON fixture' }]);
const literalBody = 'hello $HOME ${NOW} $(printf expanded) `printf expanded` \\ world\nsecond line';
const fixture = relativePath => fs.readFileSync(path.join(hugoRoot, relativePath), 'utf8');
const examples = [
    { name: 'json', exampleValue: JSON.stringify([{ message: literalBody }]) },
    { name: 'raw', contentType: 'text/plain', exampleValue: literalBody },
    { name: 'logplex', contentType: 'application/logplex-1', exampleValue: 'hello\nworld' },
    { name: 'body-fallback' },
    { name: 'scratch-fallback', body: '' },
    {
        name: 'metrics-v1',
        endpointPath: '/api/v1/series',
        exampleValue: fixture('content/en/api/v1/metrics/dynamic-points.json.sh'),
        dynamic: true,
    },
    {
        name: 'distribution-points',
        endpointPath: '/api/v1/distribution_points',
        exampleValue: fixture('content/en/api/v1/metrics/distribution-points.json.sh'),
        dynamic: true,
    },
    {
        name: 'metrics-v2',
        endpointPath: '/api/v2/series',
        exampleValue: fixture('content/en/api/v2/metrics/dynamic-points.json.sh'),
        dynamic: true,
    },
];

let siteDir;
let commands;

beforeAll(() => {
    siteDir = fs.mkdtempSync(path.join(os.tmpdir(), 'api-curl-test-'));
    for (const directory of ['layouts/partials/api', 'data']) {
        fs.mkdirSync(path.join(siteDir, directory), { recursive: true });
    }
    for (const name of ['curl', 'curl-auth', 'arguments-data']) {
        fs.copyFileSync(
            path.join(hugoRoot, `layouts/partials/api/${name}.html`),
            path.join(siteDir, `layouts/partials/api/${name}.html`),
        );
    }
    fs.writeFileSync(path.join(siteDir, 'hugo.toml'), 'baseURL = "https://example.com/"\ndisableKinds = ["taxonomy", "term", "RSS", "sitemap"]\n');
    fs.writeFileSync(path.join(siteDir, 'layouts/index.html'), `
        {{ range .Site.Data.examples }}
          {{ $scratch := newScratch }}
          {{ $scratch.Set "jsonRequestBody" "scratch body" }}
          <pre id="{{ .name }}">{{ partial "api/curl.html" (merge . (dict "dollarScratch" $scratch)) }}</pre>
        {{ end }}
    `);
    fs.writeFileSync(path.join(siteDir, 'data/examples.json'), JSON.stringify(examples.map(example => ({
        body: logBody,
        title: 'Send deflate data',
        contentType: 'application/json',
        ...example,
        ...(example.dynamic ? { exampleDefinition: { 'x-variables': { NOW: '$(date +%s)' } } } : {}),
        endpoint: {
            actionType: 'post',
            pathKey: example.endpointPath || '/api/v2/logs',
            regions: { local: 'https://example.com' },
            action: {
                requestBody: { content: { 'application/json': {} } },
                responses: {},
                parameters: [{ in: 'header', name: 'Content-Encoding', schema: { enum: ['gzip', 'deflate'] } }],
            },
        },
        securitySchemes: { apiKey: { in: 'header', name: 'DD-API-KEY', 'x-env-name': 'DD_API_KEY' } },
        authData: { requirement: { apiKey: [] }, useBearerToken: false },
    }))));
    execFileSync(process.env.HUGO_BIN || path.join(hugoRoot, 'node_modules/.bin/hugo'), ['--source', siteDir], { stdio: 'pipe' });
    const container = document.createElement('div');
    container.innerHTML = fs.readFileSync(path.join(siteDir, 'public/index.html'), 'utf8');
    container.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    commands = Object.fromEntries(Array.from(container.querySelectorAll('pre'), pre => [pre.id, pre.textContent]));
}, 30000);

afterAll(() => {
    if (siteDir) fs.rmSync(siteDir, { recursive: true, force: true });
});

describe.each(shells)('deflate curl examples in %s', shell => {
    test.each(examples.map(example => [example.name, example]))('%s preserves the selected payload and headers', (name, example) => {
        const command = commands[example.name];
        const before = Math.floor(Date.now() / 1000);
        // Capture the binary body and arguments without sending an HTTP request.
        const result = spawnSync(shell, ['-c', `curl() { printf '%s\\n' "$@" >&2; cat; }\n${command}`], {
            env: { ...process.env, DD_API_KEY: 'test-api-key' },
            timeout: 10000,
        });
        expect(result.status).toBe(0);
        const args = result.stderr.toString().trim().split('\n');
        expect(args).toEqual([
            '-X', 'POST', `https://example.com${example.endpointPath || '/api/v2/logs'}`,
            '-H', 'Accept: application/json',
            '-H', `Content-Type: ${example.contentType || 'application/json'}`,
            '-H', 'Content-Encoding: deflate',
            '-H', 'DD-API-KEY: test-api-key',
            '--data-binary', '@-',
        ]);
        const body = inflateSync(result.stdout).toString();
        if (example.dynamic) {
            const points = JSON.parse(body).series[0].points;
            const timestamp = example.name === 'metrics-v2' ? points[0].timestamp : points[0][0];
            expect(timestamp).toBeGreaterThanOrEqual(before);
            expect(timestamp).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
            expect(body).toBe(example.exampleValue.trimEnd().replace('${NOW}', String(timestamp)));
            expect(command).toContain('<<EOF');
        } else {
            expect(body).toBe(example.exampleValue || (example.body === '' ? 'scratch body' : logBody));
            expect(command).toContain("<<'EOF'");
        }
    });
});
