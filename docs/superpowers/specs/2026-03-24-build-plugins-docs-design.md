# Build Plugins Documentation Design Spec

## Context

Datadog provides build plugins (`@datadog/webpack-plugin`, `@datadog/vite-plugin`, `@datadog/esbuild-plugin`, `@datadog/rollup-plugin`, `@datadog/rspack-plugin`) that integrate with JavaScript bundlers to automate RUM-related tasks at build time. These plugins are GA and need public documentation added to the Datadog documentation site.

Three plugin features are in scope:
1. **Source Maps** — Automated source map uploads to Datadog at build time (replaces manual `datadog-ci sourcemaps upload`)
2. **Action Name Deobfuscation** — Restores readable action names in minified builds via a build-time privacy dictionary
3. **Source Code Context** — Enables inline source code display in Error Tracking by injecting service/version metadata at build time

The documentation must scale to 10+ plugins over time (e.g., future micro-frontends auto-tagging plugin).

## Design Decisions

### Placement: Peer of `setup/`, not child

Build plugins are **build-time enhancements**, not a setup method. Users must already have RUM configured via Client-Side, Auto-Instrumentation, or Agentic Onboarding before using build plugins. Placing them under `setup/` would incorrectly imply they are a fourth instrumentation type.

Instead, `build_plugins/` sits as a peer directory alongside `advanced_configuration`, `optimizing_performance/`, and the feature pages:

```
content/en/real_user_monitoring/application_monitoring/browser/
├── setup/                          # (existing, unchanged)
├── build_plugins/                  # NEW
│   ├── _index.md                   # Hub page
│   ├── source_maps.md              # Automated source map uploads
│   ├── action_name_deobfuscation.md # Action name deobfuscation
│   └── source_code_context.md      # Source code context for errors
├── tracking_user_actions.md        # (existing, add cross-link)
├── advanced_configuration.mdoc.md  # (existing)
├── ...
```

This mirrors the `optimizing_performance/` pattern — a subdirectory for a category of related tooling.

### Bundler information on hub page only

All five bundlers (webpack, vite, esbuild, rollup, rspack) are supported by every plugin. Installation and bundler-specific plugin registration are documented once on the hub `_index.md`. Individual plugin pages cover only their feature-specific configuration, avoiding redundancy.

### Agent-optimized page structure

Given that LLM agents will be a significant traffic source:

- **Each plugin page is self-contained** — an agent reading one page gets the full picture without needing to follow links
- **No tabs** — agents cannot interact with tabbed UI. Bundler examples on the hub use sequential code blocks with `### Heading` per bundler
- **Hub page is substantive** — covers shared concepts (what build plugins are, auth, bundler support) so agents landing there get value without navigating further
- **Redundant prerequisites on each plugin page** — agents may land directly on a plugin page via search

### Section consistency with existing pages

Based on analysis of existing browser/ documentation patterns:

| Element | Pattern | Source |
|---------|---------|--------|
| `## Overview` as first section | Standard across all browser/ pages | All pages |
| `## Prerequisites` section | Used on setup pages, appropriate for plugins | `setup/server/*.md` |
| `further_reading` frontmatter | Present on ~80% of browser/ pages | Standard |
| `whatsnext` shortcode on hub | Used on `setup/_index.md`, `_index.md` | Standard |
| Mechanics explained inline in Overview | Not as standalone "How It Works" section | `tracking_user_actions.md` |
| `## Configuration` with option descriptions | Matches `advanced_configuration.mdoc.md` | Standard |

## Page Specifications

### Page 1: `_index.md` — Build Plugins Hub

**Title:** "Build Plugins"
**Description:** "Integrate Datadog build plugins with your JavaScript bundler to automate source map uploads, action name deobfuscation, and other RUM tasks at build time."

**Frontmatter:**
```yaml
---
title: Build Plugins
description: "Integrate Datadog build plugins with your JavaScript bundler to automate source map uploads, action name deobfuscation, and other RUM tasks at build time."
algolia:
  tags: ['build plugins', 'webpack', 'vite', 'esbuild', 'rollup', 'rspack', 'bundler']
further_reading:
- link: 'https://github.com/DataDog/build-plugins'
  tag: 'Source Code'
  text: 'Datadog Build Plugins GitHub Repository'
- link: '/real_user_monitoring/application_monitoring/browser/setup/client'
  tag: 'Documentation'
  text: 'RUM Browser Client-Side Setup'
---
```

**Sections:**

#### `## Overview`
One paragraph explaining what build plugins are: Datadog build plugins integrate with your JavaScript bundler to automate common RUM tasks during your build process. They support webpack, Vite, esbuild, Rollup, and Rspack. List the available plugins with one-line descriptions.

Mention that build plugins are complementary to the RUM SDK — you still configure the SDK as described in the [Browser Monitoring Setup](/real_user_monitoring/application_monitoring/browser/setup/).

#### `## Installation`
Sequential code blocks per bundler. Each block shows:
1. `npm install` command
2. Minimal bundler config registering the plugin

Structure:
```
### Webpack
[code block: npm install @datadog/webpack-plugin]
[code block: webpack.config.js with datadogWebpackPlugin()]

### Vite
[code block: npm install @datadog/vite-plugin]
[code block: vite.config.js with datadogVitePlugin()]

### esbuild
[code block: npm install @datadog/esbuild-plugin]
[code block: esbuild.config.js with datadogEsbuildPlugin()]

### Rollup
[code block: npm install @datadog/rollup-plugin]
[code block: rollup.config.js with datadogRollupPlugin()]

### Rspack
[code block: npm install @datadog/rspack-plugin]
[code block: rspack.config.js with datadogRspackPlugin()]
```

#### `## Configuration`
Document the shared configuration options that apply to all plugins:
- `auth.apiKey` (required for upload features) — Datadog API key. Can also be set via `DATADOG_API_KEY` env var.
- `auth.site` (optional, default: `datadoghq.com`) — Datadog site. Can also be set via `DATADOG_SITE` or `DD_SITE` env var.
- `logLevel` (optional, default: `warn`) — `debug`, `info`, `warn`, `error`, or `none`

Show a complete config skeleton with plugin-specific options as commented placeholders:

```javascript
datadogWebpackPlugin({
  auth: {
    apiKey: process.env.DATADOG_API_KEY,
    site: 'datadoghq.com',
  },
  logLevel: 'warn',
  // Source map uploads (see Source Maps plugin page)
  errorTracking: {
    sourcemaps: { /* ... */ },
  },
  // RUM build-time features (see individual plugin pages)
  rum: {
    privacy: { /* ... */ },
    sourceCodeContext: { /* ... */ },
  },
})
```

#### `## Available plugins`
`whatsnext` shortcode with `desc="Configure individual build plugins:"` linking to each plugin page:
- Source Maps: Automatically upload source maps to Datadog during your build.
- Action Name Deobfuscation: Restore readable action names in minified builds.
- Source Code Context: Display source code inline in Error Tracking stack traces.

#### `## Further reading`
Via `further_reading` frontmatter partial.

---

### Page 2: `source_maps.md` — Source Maps

**Title:** "Source Maps"
**Description:** "Automatically upload JavaScript source maps to Datadog at build time to de-obfuscate stack traces in Error Tracking and RUM."

**Frontmatter:**
```yaml
---
title: Source Maps
description: "Automatically upload JavaScript source maps to Datadog at build time to de-obfuscate stack traces in Error Tracking and RUM."
algolia:
  tags: ['source maps', 'build plugins', 'error tracking']
further_reading:
- link: '/real_user_monitoring/guide/upload-javascript-source-maps'
  tag: 'Documentation'
  text: 'Upload JavaScript Source Maps (manual method)'
- link: '/real_user_monitoring/error_tracking'
  tag: 'Documentation'
  text: 'Error Tracking'
- link: 'https://github.com/DataDog/build-plugins'
  tag: 'Source Code'
  text: 'Datadog Build Plugins GitHub Repository'
---
```

**Sections:**

#### `## Overview`
Explain that this plugin automatically uploads JavaScript source maps to Datadog during your build, enabling de-obfuscated stack traces in [Error Tracking](/real_user_monitoring/error_tracking) and [RUM](/real_user_monitoring/). This replaces the need to manually run `datadog-ci sourcemaps upload` or configure CI/CD pipelines for source map uploads.

The plugin hooks into the build process, discovers all `.js` files with corresponding `.map` source map files, and uploads them to the Datadog Sourcemap Intake API with git metadata.

#### `## Prerequisites`
- A Datadog API key (set via `auth.apiKey` or `DATADOG_API_KEY` environment variable)
- Source maps enabled in your bundler configuration (the plugin uploads them but does not generate them — see [Upload JavaScript Source Maps](/real_user_monitoring/guide/upload-javascript-source-maps#instrument-your-code) for bundler-specific source map generation setup)
- The RUM SDK initialized with `service` and `version` parameters that match the plugin's `service` and `releaseVersion` configuration

#### `## Configuration`
Document the `errorTracking.sourcemaps` configuration object:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `errorTracking.sourcemaps.service` | String | Yes | — | Service name. Must match the RUM SDK `service` initialization parameter. |
| `errorTracking.sourcemaps.releaseVersion` | String | Yes | — | Release version. Must match the RUM SDK `version` initialization parameter. |
| `errorTracking.sourcemaps.minifiedPathPrefix` | String | Yes | — | URL prefix or absolute path where your minified JavaScript files are served (for example, `https://example.com/static/` or `/static/`). |
| `errorTracking.sourcemaps.bailOnError` | Boolean | No | `false` | If `true`, the build fails when a source map upload error occurs. |
| `errorTracking.sourcemaps.dryRun` | Boolean | No | `false` | If `true`, the plugin validates and prepares uploads without sending data to Datadog. |
| `errorTracking.sourcemaps.maxConcurrency` | Number | No | `20` | Maximum number of concurrent source map uploads. |

Environment variable overrides:
- `DATADOG_SITE` or `DD_SITE` — overrides `auth.site` for the intake URL
- `DATADOG_SOURCEMAP_INTAKE_URL` — overrides the full intake URL directly

#### `## Example`
A complete, realistic configuration block showing the source maps plugin configured within the shared plugin config:

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
      },
      errorTracking: {
        sourcemaps: {
          service: 'my-application',
          releaseVersion: '1.0.0',
          minifiedPathPrefix: 'https://example.com/static/',
        },
      },
    }),
  ],
};
```

`<div class="alert alert-info">` callout: This example uses webpack. The configuration object is identical across all supported bundlers — only the import and plugin function name differ. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions for your bundler.

#### `## Further reading`
Via `further_reading` frontmatter partial.

---

### Page 3: `action_name_deobfuscation.md` — Action Name Deobfuscation

**Title:** "Action Name Deobfuscation"
**Description:** "Restore readable RUM action names in minified builds by generating a build-time privacy dictionary that maps obfuscated values to original text."

**Frontmatter:**
```yaml
---
title: Action Name Deobfuscation
description: "Restore readable RUM action names in minified builds by generating a build-time privacy dictionary that maps obfuscated values to original text."
algolia:
  tags: ['action names', 'build plugins', 'privacy', 'deobfuscation']
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/tracking_user_actions'
  tag: 'Documentation'
  text: 'Tracking User Actions'
- link: '/data_security/real_user_monitoring'
  tag: 'Documentation'
  text: 'RUM Data Security'
- link: 'https://github.com/DataDog/build-plugins'
  tag: 'Source Code'
  text: 'Datadog Build Plugins GitHub Repository'
---
```

**Sections:**

#### `## Overview`
When you enable the [`enablePrivacyForActionName`](/real_user_monitoring/application_monitoring/browser/tracking_user_actions#mask-all-action-names) initialization parameter, action names are masked for privacy. In minified builds, action names can also become unreadable because bundlers obfuscate DOM element text and attributes used to generate them.

This build plugin solves both problems by instrumenting your source code at build time. It uses a WebAssembly-based code transformer to identify relevant strings and creates a privacy dictionary that maps obfuscated values back to their original text. A runtime helper injected into your bundle collects these mappings so the RUM SDK can resolve readable action names.

#### `## Prerequisites`
- The RUM SDK initialized with `trackUserInteractions: true` and `enablePrivacyForActionName: true` (see [Mask all action names](/real_user_monitoring/application_monitoring/browser/tracking_user_actions#mask-all-action-names))
- The Datadog build plugin installed and registered with your bundler (see [Build Plugins](/real_user_monitoring/application_monitoring/browser/build_plugins/))

#### `## Configuration`
Document the `rum.privacy` configuration object:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `rum.privacy.include` | Array of RegExp or String | No | JS/TS files (`/\.(?:c\|m)?(?:j\|t)sx?$/`) | File patterns to process for action name deobfuscation. |
| `rum.privacy.exclude` | Array of RegExp or String | No | `node_modules`, `.preval.` files | File patterns to skip. |

#### `## Example`
A complete configuration block:

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {},  // Uses default include/exclude patterns
      },
    }),
  ],
};
```

And a customized example:

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {
          include: [/\.jsx?$/, /\.tsx?$/],
          exclude: [/\/node_modules\//, /\/test\//],
        },
      },
    }),
  ],
};
```

`<div class="alert alert-info">` callout: This example uses webpack. The configuration object is identical across all supported bundlers. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions for your bundler.

#### `## Further reading`
Via `further_reading` frontmatter partial.

---

### Page 4: `source_code_context.md` — Source Code Context

**Title:** "Source Code Context"
**Description:** "Display source code inline in Error Tracking stack traces by injecting service and version metadata at build time."

**Frontmatter:**
```yaml
---
title: Source Code Context
description: "Display source code inline in Error Tracking stack traces by injecting service and version metadata at build time."
algolia:
  tags: ['source code context', 'build plugins', 'error tracking', 'stack traces']
further_reading:
- link: '/real_user_monitoring/guide/upload-javascript-source-maps'
  tag: 'Documentation'
  text: 'Upload JavaScript Source Maps'
- link: '/real_user_monitoring/error_tracking'
  tag: 'Documentation'
  text: 'Error Tracking'
- link: '/real_user_monitoring/guide/debug-symbols'
  tag: 'Documentation'
  text: 'Debug Symbols'
- link: 'https://github.com/DataDog/build-plugins'
  tag: 'Source Code'
  text: 'Datadog Build Plugins GitHub Repository'
---
```

**Sections:**

#### `## Overview`
When viewing errors in [Error Tracking](/real_user_monitoring/error_tracking), Datadog can display the source code lines surrounding each frame in the stack trace. This build plugin enables that feature by injecting a small runtime snippet into your bundle that associates stack traces with your `service` and `version` metadata.

The injected snippet is SSR-safe and stores context in `window.DD_SOURCE_CODE_CONTEXT`, which the RUM SDK reads to tag errors with the correct service and version for source code resolution. This works in conjunction with [uploaded source maps](/real_user_monitoring/guide/upload-javascript-source-maps) — source maps provide the file mapping, and source code context provides the service/version association.

#### `## Prerequisites`
- Source maps uploaded to Datadog, either through the [Source Maps build plugin](/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps) or [manually](/real_user_monitoring/guide/upload-javascript-source-maps)
- The RUM SDK initialized with matching `service` and `version` parameters
- The Datadog build plugin installed and registered with your bundler (see [Build Plugins](/real_user_monitoring/application_monitoring/browser/build_plugins/))

#### `## Configuration`
Document the `rum.sourceCodeContext` configuration object:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `rum.sourceCodeContext.service` | String | Yes | — | Service name. Must match the RUM SDK `service` initialization parameter. |
| `rum.sourceCodeContext.version` | String | No | — | Release version. If set, must match the RUM SDK `version` initialization parameter. |

#### `## Example`
A complete configuration block, showing source code context combined with source maps (a common pairing):

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
      },
      errorTracking: {
        sourcemaps: {
          service: 'my-application',
          releaseVersion: '1.0.0',
          minifiedPathPrefix: 'https://example.com/static/',
        },
      },
      rum: {
        sourceCodeContext: {
          service: 'my-application',
          version: '1.0.0',
        },
      },
    }),
  ],
};
```

`<div class="alert alert-info">` callout: This example uses webpack. The configuration object is identical across all supported bundlers. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions for your bundler.

#### `## Further reading`
Via `further_reading` frontmatter partial.

---

## Cross-links to Add to Existing Pages

### `upload-javascript-source-maps.md`
Add a `div` callout after the Overview section:

```html
<div class="alert alert-info">To automate source map uploads as part of your build process, see <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps">Build Plugins: Source Maps</a>.</div>
```

### `tracking_user_actions.md`
Add a `div` callout in the "Mask all action names" section, after the `enablePrivacyForActionName` code example:

```html
<div class="alert alert-info">If your application uses a JavaScript bundler, the <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation">Action Name Deobfuscation build plugin</a> automatically restores readable action names in minified builds.</div>
```

### `debug-symbols.md`
Add a `div` callout after the opening paragraph (line 6), before the error message description:

```html
<div class="alert alert-info">To automatically associate stack traces with your service and version for source code resolution, use the <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context">Source Code Context build plugin</a>.</div>
```

### `browser/_index.md`
Add a `nextlink` entry in the `whatsnext` block, after the "Troubleshooting" entry:

```hugo
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins">}}<u>Build Plugins</u>: Integrate Datadog build plugins with your JavaScript bundler to automate source map uploads, action name deobfuscation, and other RUM tasks at build time.{{< /nextlink >}}
```

## Scalability

Adding a new plugin (e.g., micro-frontends) requires:
1. Create `micro_frontends.md` in the `build_plugins/` directory following the same section pattern (Overview, Prerequisites, Configuration, Example)
2. Add a `nextlink` entry in the `_index.md` `whatsnext` block
3. Add cross-links from the relevant existing feature page

No structural changes needed. The flat directory + hub pattern supports 10+ pages as demonstrated by CI Tests (`/tests/setup/`) and APM libraries (`/dd_libraries/`).

**Known trade-off:** The "bundler info on hub only" decision assumes all plugins share identical configuration across bundlers. If a future plugin has bundler-specific configuration, that plugin's page can include bundler-specific sections (using `### Webpack`, `### Vite` headings, not tabs) without affecting the other pages.

## Implementation Notes

**Verify configuration key paths before implementation.** The config namespaces documented in this spec (`errorTracking.sourcemaps`, `rum.privacy`, `rum.sourceCodeContext`) were derived from the build-plugins repository source code. Before writing the actual documentation pages, verify these paths against the current TypeScript types in the build-plugins repo (specifically the published package type definitions) to ensure they haven't changed. Pay particular attention to:
- `releaseVersion` (source maps) vs `version` (source code context) — intentional asymmetry across different config namespaces
- The `rum.privacy` namespace for action name deobfuscation (not `rum.actionNameDeobfuscation`)

## Out of Scope
- SDK injection plugin documentation
- Metrics and output plugin documentation (not RUM-specific)
- Micro-frontends plugin (does not exist yet)
- Changes to the `setup/_index.md` comparison table (build plugins are not a setup method)
