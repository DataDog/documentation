/**
 * A server can resolve filters from a customization config it received as
 * plain data (for example, a JSON module generated at build time), without
 * reading `customization_config` from disk.
 */
import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import * as rootExports from '../../src';
import { CustomizationConfig, CustomizationConfigByLang, Frontmatter } from '../../src';
import { loadCustomizationConfig } from '../../src/api/compilation/loadCustomizationConfig';
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

// Entries that must not reach the file system: the server subpaths, and the
// root entry, so that importing from `cdocs-data` never bundles the loader
const FILESYSTEM_FREE_ENTRIES = ['.', ...SERVER_SUBPATHS];

// Modules that read the file system or parse YAML
const FILESYSTEM_MODULES = ['fs', 'path', 'js-yaml'];

interface PackageExport {
  import: string;
  types: string;
}

describe('Resolving filters from config passed as data', () => {
  const { customizationConfigByLang } = loadCustomizationConfig({
    configDir: CUSTOMIZATION_CONFIG_DIR,
    langs: ['en'],
  });

  // What a server receives: the loaded config, serialized and parsed again.
  // The annotation is what a server's module declaration claims, too.
  const configAsData: CustomizationConfigByLang = JSON.parse(
    JSON.stringify(customizationConfigByLang),
  );

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

  function resolveWith(customizationConfig: CustomizationConfig) {
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
    const packageExports = readPackageExports();
    for (const subpath of SERVER_SUBPATHS) {
      expect(packageExports[subpath], subpath).toBeDefined();
    }
  });

  test('exposes the YAML loader only as its own subpath export', () => {
    const packageExports = readPackageExports();
    expect(packageExports['./loadCustomizationConfig']).toBeDefined();
    expect(rootExports).not.toHaveProperty('loadCustomizationConfig');
  });

  test('the root and server exports do not import file system modules', () => {
    const packageExports = readPackageExports();
    for (const subpath of FILESYSTEM_FREE_ENTRIES) {
      const entryPath = path.join(PACKAGE_DIR, packageExports[subpath].import);
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

/** The `exports` map from the package's `package.json`. */
function readPackageExports(): Record<string, PackageExport> {
  const packageJson: { exports: Record<string, PackageExport> } = JSON.parse(
    fs.readFileSync(path.join(PACKAGE_DIR, 'package.json'), 'utf8'),
  );
  return packageJson.exports;
}

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
  const importRegex =
    /(?:import|export)[^'"]*from\s*['"]([^'"]+)['"]|import\(['"]([^'"]+)['"]\)/g;

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
