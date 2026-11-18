/**
 * A server can resolve filters from a customization config it received as
 * plain data (for example, a JSON module generated at build time), without
 * reading `customization_config` from disk.
 */
import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { Frontmatter, loadCustomizationConfig } from '../../src';
import { buildFiltersManifest } from '../../src/api/compilation/buildFiltersManifest';
import { resolveFilters } from '../../src/api/shared/resolveFilters';

const PACKAGE_DIR = path.join(__dirname, '../..');
const DIST_DIR = path.join(PACKAGE_DIR, 'dist');
const CUSTOMIZATION_CONFIG_DIR = path.join(
  __dirname,
  '../integration/complexExample/customization_config',
);

// The subpath exports a server uses to resolve filters
const SERVER_SUBPATHS = ['./buildFiltersManifest', './resolveFilters'];

// Modules that read the file system or parse YAML
const FILESYSTEM_MODULES = ['fs', 'path', 'js-yaml'];

describe('Resolving filters from config passed as data', () => {
  const { customizationConfigByLang } = loadCustomizationConfig({
    configDir: CUSTOMIZATION_CONFIG_DIR,
    langs: ['en'],
  });

  // What a server receives: the loaded config, serialized and parsed again
  const configAsData = JSON.parse(JSON.stringify(customizationConfigByLang));

  const frontmatter: Frontmatter = {
    title: 'Animals',
    content_filters: [
      {
        label: 'Habitat',
        trait_id: 'habitat',
        option_group_id: 'habitat_options',
      },
      {
        label: 'Animal',
        trait_id: 'animal',
        option_group_id: '<HABITAT>_animal_options',
      },
    ],
  };

  function resolveWith(customizationConfig: typeof configAsData.en) {
    const filtersManifest = buildFiltersManifest({ frontmatter, customizationConfig });
    return resolveFilters({
      valsByTraitId: { habitat: 'ocean' },
      filtersManifest,
    });
  }

  test('resolves the same filters as the config loaded from disk', () => {
    expect(resolveWith(configAsData.en)).toEqual(
      resolveWith(customizationConfigByLang.en),
    );
  });

  test('exposes the server functions as subpath exports', () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(PACKAGE_DIR, 'package.json'), 'utf8'),
    );
    for (const subpath of SERVER_SUBPATHS) {
      expect(packageJson.exports[subpath], subpath).toBeDefined();
    }
  });

  test('server subpath exports do not import file system modules', () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(PACKAGE_DIR, 'package.json'), 'utf8'),
    );
    for (const subpath of SERVER_SUBPATHS) {
      const entryPath = path.join(PACKAGE_DIR, packageJson.exports[subpath].import);
      const bareImports = collectBareImports(entryPath);
      const filesystemImports = bareImports.filter(
        (specifier) =>
          FILESYSTEM_MODULES.includes(specifier.replace(/^node:/, '')) ||
          specifier.startsWith('js-yaml/'),
      );
      expect(filesystemImports, subpath).toEqual([]);
    }
  });
});

/**
 * Follow the relative imports of a built module, and return every
 * package import (such as `fs` or `semver/functions/gte.js`) it reaches.
 */
function collectBareImports(entryPath: string): string[] {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error('Run `yarn build` before running this test.');
  }

  const bareImports = new Set<string>();
  const visited = new Set<string>();
  const queue = [entryPath];
  const importRegex = /(?:import|export)[^'"]*from\s*['"]([^'"]+)['"]|import\(['"]([^'"]+)['"]\)/g;

  while (queue.length > 0) {
    const modulePath = queue.pop()!;
    if (visited.has(modulePath)) continue;
    visited.add(modulePath);

    const source = fs.readFileSync(modulePath, 'utf8');
    for (const match of source.matchAll(importRegex)) {
      const specifier = match[1] ?? match[2];
      if (specifier.startsWith('.')) {
        queue.push(path.resolve(path.dirname(modulePath), specifier));
      } else {
        bareImports.add(specifier);
      }
    }
  }

  return [...bareImports];
}
