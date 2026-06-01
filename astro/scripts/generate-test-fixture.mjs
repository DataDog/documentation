/**
 * Generates the minimal frozen API spec fixture used by vitest.
 *
 * Reads the live Hugo spec files and writes trimmed copies to
 * tests/fixtures/api/. Only the categories (tags) and paths
 * exercised by the test suite are kept. The full `components` section is
 * preserved as-is so that internal $ref pointers still resolve.
 *
 * Run from the astro/ directory:
 *   node scripts/generate-test-fixture.mjs
 *
 * After regenerating, run `npm test -- -u` to update snapshots.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const astroDir = path.resolve(__dirname, '..');
const docRoot = path.resolve(astroDir, '..');
const dataDir = path.join(docRoot, 'data', 'api');
const outDir = path.join(astroDir, 'tests', 'fixtures', 'api');

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

// Tags to retain per version. These are the 8 audit categories from
// viewsBuilder.test.ts plus the v2 variants needed for multi-version ops.
const KEEP_TAGS = {
  v1: new Set([
    'Authentication',
    'Dashboards',
    'Monitors',
    'Dashboard Lists',
    'Screenboards',
    'AWS Integration',
    'Usage Metering',
  ]),
  v2: new Set([
    'Incidents',
    'AWS Integration',
    'Monitors',
  ]),
};

function pathItemHasTagIn(pathItem, keepTags) {
  for (const method of HTTP_METHODS) {
    const op = pathItem[method];
    if (op && op.tags && op.tags.some((t) => keepTags.has(t))) {
      return true;
    }
  }
  return false;
}

function filterSpec(spec, keepTags) {
  const filteredTags = (spec.tags ?? []).filter((tag) => keepTags.has(tag.name));

  const filteredPaths = {};
  for (const [pathStr, pathItem] of Object.entries(spec.paths ?? {})) {
    if (pathItem && pathItemHasTagIn(pathItem, keepTags)) {
      filteredPaths[pathStr] = pathItem;
    }
  }

  return { ...spec, tags: filteredTags, paths: filteredPaths };
}

function collectOperationIds(spec, keepTags) {
  const ids = new Set();
  for (const pathItem of Object.values(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const op = pathItem?.[method];
      if (op && op.operationId && op.tags && op.tags.some((t) => keepTags.has(t))) {
        ids.add(op.operationId);
      }
    }
  }
  return ids;
}

function filterCodeExamples(examples, operationIds) {
  return Object.fromEntries(Object.entries(examples).filter(([id]) => operationIds.has(id)));
}

for (const version of ['v1', 'v2']) {
  const keepTags = KEEP_TAGS[version];

  console.log(`\n=== ${version} ===`);

  const specPath = path.join(dataDir, version, 'full_spec.yaml');
  const codeExPath = path.join(dataDir, version, 'CodeExamples.json');

  console.log(`Reading spec…`);
  const spec = parseYaml(readFileSync(specPath, 'utf-8'));

  const origPaths = Object.keys(spec.paths ?? {}).length;
  const origTags = (spec.tags ?? []).length;

  const filtered = filterSpec(spec, keepTags);
  const keptPaths = Object.keys(filtered.paths ?? {}).length;
  const keptTags = (filtered.tags ?? []).length;

  console.log(`Paths: ${origPaths} → ${keptPaths}`);
  console.log(`Tags:  ${origTags}  → ${keptTags}`);

  const outVersionDir = path.join(outDir, version);
  mkdirSync(outVersionDir, { recursive: true });

  const specOut = path.join(outVersionDir, 'partial_spec.yaml');
  writeFileSync(specOut, stringifyYaml(filtered));
  console.log(`Wrote ${specOut}`);

  // CodeExamples: keep only entries whose operationId is in the kept paths.
  const opIds = collectOperationIds(spec, keepTags);
  const allExamples = JSON.parse(readFileSync(codeExPath, 'utf-8'));
  const filteredExamples = filterCodeExamples(allExamples, opIds);
  const exOut = path.join(outVersionDir, 'CodeExamples.json');
  writeFileSync(exOut, JSON.stringify(filteredExamples, null, 2));
  console.log(`Wrote ${exOut} (${Object.keys(filteredExamples).length} / ${Object.keys(allExamples).length} operations)`);
}

console.log('\nDone. Run `npm test -- -u` to regenerate snapshots.');
