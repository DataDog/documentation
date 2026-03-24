# Build Plugins Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add documentation for Datadog build plugins (source maps, action name deobfuscation, source code context) to the RUM browser documentation.

**Architecture:** Create a new `build_plugins/` directory as a peer of `setup/` under `browser/`, containing a hub `_index.md` and three plugin pages. Add cross-links from four existing pages.

**Tech Stack:** Hugo markdown, Hugo shortcodes (`whatsnext`, `nextlink`, `partial`), HTML alert divs

**Spec:** `docs/superpowers/specs/2026-03-24-build-plugins-docs-design.md`

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/_index.md` | Hub page: overview, installation per bundler, shared config, links to plugins |
| Create | `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps.md` | Source maps plugin documentation |
| Create | `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation.md` | Action name deobfuscation plugin documentation |
| Create | `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context.md` | Source code context plugin documentation |
| Modify | `content/en/real_user_monitoring/application_monitoring/browser/_index.md:35` | Add nextlink for Build Plugins in whatsnext block |
| Modify | `content/en/real_user_monitoring/guide/upload-javascript-source-maps.md:20-21` | Add alert-info callout pointing to build plugin |
| Modify | `content/en/real_user_monitoring/application_monitoring/browser/tracking_user_actions.md:53` | Add alert-info callout for deobfuscation plugin |
| Modify | `content/en/real_user_monitoring/guide/debug-symbols.md:6` | Add alert-info callout for source code context plugin |

---

### Task 1: Create build_plugins directory and hub _index.md

**Files:**
- Create: `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/_index.md`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p content/en/real_user_monitoring/application_monitoring/browser/build_plugins
```

- [ ] **Step 2: Write the hub _index.md**

Create `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/_index.md` with this content:

```markdown
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

## Overview

Datadog build plugins integrate with your JavaScript bundler to automate common RUM tasks during your build process. They are available for webpack, Vite, esbuild, Rollup, and Rspack.

Build plugins are complementary to the RUM Browser SDK. You still need to configure the SDK as described in the [Browser Monitoring Setup][1]. Build plugins add build-time automation on top of your existing SDK configuration.

Available plugins:
- **[Source Maps][2]**: Automatically upload source maps to Datadog during your build, enabling de-obfuscated stack traces.
- **[Action Name Deobfuscation][3]**: Restore readable action names in minified builds by generating a build-time privacy dictionary.
- **[Source Code Context][4]**: Display source code inline in Error Tracking stack traces by injecting service and version metadata.

## Installation

Install the Datadog build plugin package for your bundler:

### Webpack

```bash
npm install --save-dev @datadog/webpack-plugin
```

```javascript
// webpack.config.js
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      // configuration
    }),
  ],
};
```

### Vite

```bash
npm install --save-dev @datadog/vite-plugin
```

```javascript
// vite.config.js
import { datadogVitePlugin } from '@datadog/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    datadogVitePlugin({
      // configuration
    }),
  ],
});
```

### esbuild

```bash
npm install --save-dev @datadog/esbuild-plugin
```

```javascript
// esbuild.config.js
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
  plugins: [
    datadogEsbuildPlugin({
      // configuration
    }),
  ],
});
```

### Rollup

```bash
npm install --save-dev @datadog/rollup-plugin
```

```javascript
// rollup.config.js
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
  plugins: [
    datadogRollupPlugin({
      // configuration
    }),
  ],
};
```

### Rspack

```bash
npm install --save-dev @datadog/rspack-plugin
```

```javascript
// rspack.config.js
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
  plugins: [
    datadogRspackPlugin({
      // configuration
    }),
  ],
};
```

## Configuration

The following shared configuration options apply to all plugins:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `auth.apiKey` | String | Yes (for upload features) | — | Your Datadog API key. Can also be set with the `DATADOG_API_KEY` environment variable. |
| `auth.site` | String | No | `datadoghq.com` | Your Datadog site. Can also be set with the `DATADOG_SITE` or `DD_SITE` environment variable. |
| `logLevel` | String | No | `warn` | Log verbosity level. One of `debug`, `info`, `warn`, `error`, or `none`. |

The following example shows the full configuration skeleton with all available plugin options:

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

## Available plugins

{{< whatsnext desc="Configure individual build plugins:" >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps" >}}<u>Source Maps</u>: Automatically upload source maps to Datadog during your build.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation" >}}<u>Action Name Deobfuscation</u>: Restore readable action names in minified builds.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context" >}}<u>Source Code Context</u>: Display source code inline in Error Tracking stack traces.{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/setup/
[2]: /real_user_monitoring/application_monitoring/browser/build_plugins/source_maps
[3]: /real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation
[4]: /real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context
```

- [ ] **Step 3: Commit**

```bash
git add content/en/real_user_monitoring/application_monitoring/browser/build_plugins/_index.md
git commit -m "docs: add build plugins hub page for RUM browser"
```

---

### Task 2: Create source_maps.md

**Files:**
- Create: `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps.md`

- [ ] **Step 1: Write source_maps.md**

Create `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps.md` with this content:

```markdown
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

## Overview

The Source Maps build plugin automatically uploads JavaScript source maps to Datadog during your build, enabling de-obfuscated stack traces in [Error Tracking][1] and [RUM][2]. This replaces the need to manually run `datadog-ci sourcemaps upload` or configure CI/CD pipelines for source map uploads.

The plugin hooks into the build process, discovers all `.js` files with corresponding `.map` source map files from the build output, and uploads them to Datadog with git metadata.

## Prerequisites

- A Datadog API key, set with `auth.apiKey` or the `DATADOG_API_KEY` environment variable.
- Source maps enabled in your bundler configuration. The plugin uploads source maps but does not generate them. See [Upload JavaScript Source Maps][3] for bundler-specific source map generation setup.
- The RUM SDK initialized with `service` and `version` parameters that match the plugin's `service` and `releaseVersion` configuration.
- The Datadog build plugin installed and registered with your bundler. See [Build Plugins][4] for installation instructions.

## Configuration

Configure the `errorTracking.sourcemaps` object in your build plugin options:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `errorTracking.sourcemaps.service` | String | Yes | — | Service name. Must match the RUM SDK `service` initialization parameter. |
| `errorTracking.sourcemaps.releaseVersion` | String | Yes | — | Release version. Must match the RUM SDK `version` initialization parameter. |
| `errorTracking.sourcemaps.minifiedPathPrefix` | String | Yes | — | URL prefix or absolute path where your minified JavaScript files are served. For example, `https://example.com/static/` or `/static/`. |
| `errorTracking.sourcemaps.bailOnError` | Boolean | No | `false` | If `true`, the build fails when a source map upload error occurs. |
| `errorTracking.sourcemaps.dryRun` | Boolean | No | `false` | If `true`, the plugin validates and prepares uploads without sending data to Datadog. |
| `errorTracking.sourcemaps.maxConcurrency` | Number | No | `20` | Maximum number of concurrent source map uploads. |

The following environment variables override configuration values:
- `DATADOG_SITE` or `DD_SITE`: Overrides `auth.site` for the intake URL.
- `DATADOG_SOURCEMAP_INTAKE_URL`: Overrides the full intake URL directly.

## Example

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

<div class="alert alert-info">This example uses webpack. The configuration object is identical across all supported bundlers — only the import and plugin function name differ. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions for your bundler.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/error_tracking
[2]: /real_user_monitoring/
[3]: /real_user_monitoring/guide/upload-javascript-source-maps#instrument-your-code
[4]: /real_user_monitoring/application_monitoring/browser/build_plugins/
```

- [ ] **Step 2: Commit**

```bash
git add content/en/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps.md
git commit -m "docs: add source maps build plugin page"
```

---

### Task 3: Create action_name_deobfuscation.md

**Files:**
- Create: `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation.md`

- [ ] **Step 1: Write action_name_deobfuscation.md**

Create `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation.md` with this content:

```markdown
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

## Overview

When you enable the [`enablePrivacyForActionName`][1] initialization parameter, action names are masked for privacy. In minified builds, action names can also become unreadable because bundlers obfuscate DOM element text and attributes used to generate them.

The Action Name Deobfuscation build plugin solves both problems by instrumenting your source code at build time. It uses a WebAssembly-based code transformer to identify relevant strings and creates a privacy dictionary that maps obfuscated values back to their original text. A runtime helper injected into your bundle collects these mappings so the RUM SDK can resolve readable action names.

## Prerequisites

- The RUM SDK initialized with `trackUserInteractions: true` and `enablePrivacyForActionName: true`. See [Mask all action names][1].
- The Datadog build plugin installed and registered with your bundler. See [Build Plugins][2] for installation instructions.

## Configuration

Configure the `rum.privacy` object in your build plugin options:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `rum.privacy.include` | Array of RegExp or String | No | JS/TS files (`/\.(?:c\|m)?(?:j\|t)sx?$/`) | File patterns to process for action name deobfuscation. |
| `rum.privacy.exclude` | Array of RegExp or String | No | `node_modules`, `.preval.` files | File patterns to skip. |

## Example

With default settings (processes all JS/TS files, excludes `node_modules`):

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {},
      },
    }),
  ],
};
```

With custom include and exclude patterns:

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

<div class="alert alert-info">These examples use webpack. The configuration object is identical across all supported bundlers. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions for your bundler.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/tracking_user_actions#mask-all-action-names
[2]: /real_user_monitoring/application_monitoring/browser/build_plugins/
```

- [ ] **Step 2: Commit**

```bash
git add content/en/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation.md
git commit -m "docs: add action name deobfuscation build plugin page"
```

---

### Task 4: Create source_code_context.md

**Files:**
- Create: `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context.md`

- [ ] **Step 1: Write source_code_context.md**

Create `content/en/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context.md` with this content:

```markdown
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

## Overview

When viewing errors in [Error Tracking][1], Datadog can display the source code lines surrounding each frame in the stack trace. The Source Code Context build plugin enables this feature by injecting a small runtime snippet into your bundle that associates stack traces with your `service` and `version` metadata.

The injected snippet is SSR-safe and stores context in `window.DD_SOURCE_CODE_CONTEXT`, which the RUM SDK reads to tag errors with the correct service and version for source code resolution. This works in conjunction with [uploaded source maps][2] — source maps provide the file mapping, and source code context provides the service and version association.

## Prerequisites

- Source maps uploaded to Datadog, either through the [Source Maps build plugin][3] or [manually][2].
- The RUM SDK initialized with matching `service` and `version` parameters.
- The Datadog build plugin installed and registered with your bundler. See [Build Plugins][4] for installation instructions.

## Configuration

Configure the `rum.sourceCodeContext` object in your build plugin options:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `rum.sourceCodeContext.service` | String | Yes | — | Service name. Must match the RUM SDK `service` initialization parameter. |
| `rum.sourceCodeContext.version` | String | No | — | Release version. If set, must match the RUM SDK `version` initialization parameter. |

## Example

The following example shows source code context combined with source maps, a common pairing:

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

<div class="alert alert-info">This example uses webpack. The configuration object is identical across all supported bundlers. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions for your bundler.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/error_tracking
[2]: /real_user_monitoring/guide/upload-javascript-source-maps
[3]: /real_user_monitoring/application_monitoring/browser/build_plugins/source_maps
[4]: /real_user_monitoring/application_monitoring/browser/build_plugins/
```

- [ ] **Step 2: Commit**

```bash
git add content/en/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context.md
git commit -m "docs: add source code context build plugin page"
```

---

### Task 5: Add cross-links to existing pages

**Files:**
- Modify: `content/en/real_user_monitoring/application_monitoring/browser/_index.md:35`
- Modify: `content/en/real_user_monitoring/guide/upload-javascript-source-maps.md:20`
- Modify: `content/en/real_user_monitoring/application_monitoring/browser/tracking_user_actions.md:53`
- Modify: `content/en/real_user_monitoring/guide/debug-symbols.md:6`

- [ ] **Step 1: Add Build Plugins nextlink to browser/_index.md**

In `content/en/real_user_monitoring/application_monitoring/browser/_index.md`, add a new `nextlink` entry before the closing `{{< /whatsnext >}}` tag (currently line 36), after the Troubleshooting entry:

```hugo
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins">}}<u>Build Plugins</u>: Integrate Datadog build plugins with your JavaScript bundler to automate source map uploads, action name deobfuscation, and other RUM tasks at build time.{{< /nextlink >}}
```

- [ ] **Step 2: Add callout to upload-javascript-source-maps.md**

In `content/en/real_user_monitoring/guide/upload-javascript-source-maps.md`, add after the existing `alert-info` div on line 20 (after the "Only errors collected by..." callout), before `## Instrument your code`:

```html
<div class="alert alert-info">To automate source map uploads as part of your build process, see <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps">Build Plugins: Source Maps</a>.</div>
```

- [ ] **Step 3: Add callout to tracking_user_actions.md**

In `content/en/real_user_monitoring/application_monitoring/browser/tracking_user_actions.md`, add after the paragraph on line 53 ("When enabled, all action names are replaced..."), before `## Track user interactions`:

```html
<div class="alert alert-info">If your application uses a JavaScript bundler, the <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation">Action Name Deobfuscation build plugin</a> automatically restores readable action names in minified builds.</div>
```

- [ ] **Step 4: Add callout to debug-symbols.md**

In `content/en/real_user_monitoring/guide/debug-symbols.md`, add after the opening paragraph on line 6 ("The RUM Debug Symbols page lists..."), before the error message paragraph:

```html
<div class="alert alert-info">To automatically associate stack traces with your service and version for source code resolution, use the <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context">Source Code Context build plugin</a>.</div>
```

- [ ] **Step 5: Commit**

```bash
git add content/en/real_user_monitoring/application_monitoring/browser/_index.md \
      content/en/real_user_monitoring/guide/upload-javascript-source-maps.md \
      content/en/real_user_monitoring/application_monitoring/browser/tracking_user_actions.md \
      content/en/real_user_monitoring/guide/debug-symbols.md
git commit -m "docs: add cross-links to build plugins from existing pages"
```

---

### Task 6: Run Vale linter and fix issues

- [ ] **Step 1: Run Vale on all new and modified files**

```bash
vale content/en/real_user_monitoring/application_monitoring/browser/build_plugins/_index.md
vale content/en/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps.md
vale content/en/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation.md
vale content/en/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context.md
```

- [ ] **Step 2: Fix any Vale warnings**

Common substitutions to watch for: "ensure" -> "helps ensure", "via" -> "with"/"through", remove "simply"/"just"/"easy", "utilize" -> "use"

- [ ] **Step 3: Commit fixes if any**

```bash
git add content/en/real_user_monitoring/application_monitoring/browser/build_plugins/
git commit -m "docs: fix Vale linter warnings in build plugins pages"
```

---

### Task 7: Create draft PR

- [ ] **Step 1: Push branch and create draft PR**

```bash
git push -u origin richard.klein/build-plugins-docs
gh pr create --draft --title "[DOCS-XXXXX] Add build plugins documentation for RUM Browser" --body "$(cat <<'EOF'
## What does this PR do? What is the motivation?

Adds documentation for Datadog build plugins (`@datadog/webpack-plugin`, `@datadog/vite-plugin`, etc.) to the RUM Browser documentation. These plugins automate build-time tasks: source map uploads, action name deobfuscation, and source code context injection.

### New pages
- **Build Plugins hub** (`browser/build_plugins/_index.md`): Overview, installation per bundler, shared config
- **Source Maps** (`build_plugins/source_maps.md`): Automated source map uploads
- **Action Name Deobfuscation** (`build_plugins/action_name_deobfuscation.md`): Privacy dictionary for minified builds
- **Source Code Context** (`build_plugins/source_code_context.md`): Inline source code in Error Tracking

### Modified pages
- `browser/_index.md`: Added Build Plugins to navigation
- `guide/upload-javascript-source-maps.md`: Cross-link to build plugin alternative
- `browser/tracking_user_actions.md`: Cross-link to deobfuscation plugin
- `guide/debug-symbols.md`: Cross-link to source code context plugin

### Design decisions
- Placed as peer of `setup/` (not child) since build plugins are enhancements, not a setup method
- No tabs — sequential code blocks for LLM agent accessibility
- Each plugin page is self-contained for direct search/agent access
- Bundler installation on hub page only (all plugins support all bundlers)

Merge readiness:
- [ ] Ready for merge

### Additional notes

Design spec: `docs/superpowers/specs/2026-03-24-build-plugins-docs-design.md`
EOF
)"
```
