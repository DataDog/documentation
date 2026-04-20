---
title: API Docs Generation Flow
---

## Overview

API documentation is **auto-generated** — do not edit files under `content/en/api/` directly. All source changes should go to the [datadog-api-spec](https://github.com/DataDog/datadog-api-spec) repo.

## Flow Chart

{{< mermaid >}}
flowchart TD
    A["**External Source**\ndatadog-api-spec repo\n(GitHub)"] -->|"full_spec.yaml (v1, v2)"| B

    B["**Step 1: Spec Ingestion**\nassets/scripts/build-api-derefs.js\n(triggered by: make build-api-derefs)"]
    B -->|"Dereferences all $ref pointers\nusing json-schema-ref-parser"| C

    C["**Dereferenced Specs**\ndata/api/v{1,2}/full_spec_deref.json\nstatic/resources/json/full_spec_v{1,2}.json\n(Postman-compatible)"]
    C --> D

    D["**Step 2: Page & Resource Generation**\nassets/scripts/build-api-pages.js\n(triggered by: make build-api-pages / yarn build:apiPages)"]
    D --> E1
    D --> E2
    D --> E3
    D --> E4

    E1["content/en/api/{v1,v2,latest}/{tag}/_index.md\n(Hugo content files per tag)"]
    E2["content/en/api/{v1,v2}/{tag}/examples.json\n(request/response examples + HTML schema tables)"]
    E3["data/api/v{1,2}/translate_{tags,actions}.json\n(i18n translation maps)"]
    E4["config/_default/menus/api.{en,fr,ja,ko}.yaml\n(sidebar navigation, auto-updated)"]

    E1 --> F
    E2 --> F
    E3 --> F
    E4 --> F

    F["**Step 3: Hugo Site Build**\nyarn run build:hugo"]
    F --> G1
    F --> G2
    F --> G3

    G1["layouts/api/baseof.html\n+ layouts/api/list.html\n(page structure & template)"]
    G2["layouts/partials/api/load-specs.html\n(loads full_spec_deref.json into Hugo Store)"]
    G3["layouts/partials/api/*.html\n(arguments, request-body, response,\ncurl, openapi-code-*, regions, intro...)"]

    G1 --> H
    G2 --> H
    G3 --> H

    H["**Output**\n/public/api/latest/{tag}/{operation}/index.html"]
    H --> I["Published to docs.datadoghq.com/api/latest/"]
{{< /mermaid >}}

## Key Files

| Stage | File | Purpose |
|-------|------|---------|
| Source | `datadog-api-spec` (external) | OpenAPI YAML specs for v1 and v2 |
| Deref build | `assets/scripts/build-api-derefs.js` | Resolves `$ref` pointers into flat JSON |
| Page build | `assets/scripts/build-api-pages.js` | Generates content files, examples, menus |
| Spec (dereffed) | `data/api/v{1,2}/full_spec_deref.json` | Input to Hugo templates |
| Spec (Postman) | `static/resources/json/full_spec_v{1,2}.json` | Public download, empty tags stripped |
| Content pages | `content/en/api/{v1,v2,latest}/{tag}/_index.md` | Hugo content nodes per API tag |
| Examples data | `content/en/api/{v1,v2}/{tag}/examples.json` | Schema tables + code examples |
| i18n | `data/api/v{1,2}/translate_tags.json` | Tag name translations |
| Menu | `config/_default/menus/api.en.yaml` | Sidebar nav (auto-updated, has hardcoded entries too) |
| Base layout | `layouts/api/baseof.html` | HTML shell with sidebar + toolbar |
| Main template | `layouts/api/list.html` | Renders endpoint sections |
| Spec loader | `layouts/partials/api/load-specs.html` | Loads and caches spec data in Hugo |
| Render partials | `layouts/partials/api/*.html` | Arguments, request/response, code snippets |

## Make Targets

```
make dependencies
  └── make build-api-derefs   → runs build-api-derefs.js
  └── make build-api-pages    → runs build-api-pages.js (yarn build:apiPages)

make build / yarn build
  └── yarn run build:hugo     → Hugo processes content + layouts → /public/
```

## Notes

- `full_spec_deref.json` is the primary input to Hugo; `full_spec.yaml` is the fallback if the deref file is absent.
- Schema tables are rendered recursively up to **10 levels** deep.
- The `latest/` directory mirrors the newest stable API version for canonical URLs.
- Menu items marked `generated: true` are overwritten on each build; all others are preserved.
- Translated content (`fr`, `ja`, `ko`, `es`) is auto-generated from the i18n JSON files.
```
