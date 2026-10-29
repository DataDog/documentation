# `shared/`

Data read by more than one site in this monorepo. Astro reads these files
through the `@shared` alias. Hugo will mount them as it adopts each one.

Documentation lives here rather than in file headers, because these files are
edited by scripts as well as by hand, and most YAML libraries drop comments on a
read/write round-trip.

The rules below are enforced at build time by the Zod schemas in
`astro/src/config/`. A violation fails the build with a message naming the
offending key, so the schema, not this file, is the authority.

## `regions.yaml`

Datadog regions (data centers). One block per region under a `regions:` key.

| Field           | Required | Meaning                                                                                |
| --------------- | -------- | -------------------------------------------------------------------------------------- |
| `key`           | yes      | Region key used in the `site` cookie and `?site=` query param                          |
| `label`         | yes      | Display name shown in the region selector                                              |
| `weight`        | yes      | Sort order in the selector, lower first                                                |
| `domain`        | yes      | API site domain; matches the OpenAPI spec `site` enum                                  |
| `exact_domains` | no       | Fully-qualified hosts mapping to this region, for spec enums that list whole hostnames |
| `values`        | yes      | Per-region substitution values                                                         |

Every region must define every key present in any region's `values`. A gap fails
the build rather than rendering an empty hostname on a live page.

All `values` entries are strings, ports included. Quote anything that would lose
a leading zero (`"065115117704"`) or that YAML would read as a number.

To add a region, add one block. See `astro/src/config/regions.ts`.

## `site_support.yaml`

Which Datadog sites do **not** support a given product or feature. Used to show
a banner when a reader has selected an unsupported site.

Entries sit under a `site_support_ids:` key. **Each entry key is a site support
ID.**

| Field         | Required | Meaning                                                  |
| ------------- | -------- | -------------------------------------------------------- |
| `regions`     | yes      | Region keys from `regions.yaml` that do NOT support this |
| `url_paths`   | no       | URL-path globs this ID applies to                        |
| `description` | no       | Note for writers                                         |

### How a page gets matched to an ID

1. **Frontmatter.** The page sets `site_support_id: <key>`. Most specific, and
   the common case for hand-authored pages.
2. **`url_paths`.** The ID claims URLs directly. This is how generated pages are
   covered, since they have no frontmatter to set — the API docs are built from
   the OpenAPI spec.

### `url_paths` globs

Only two wildcards are supported:

- `*` — matches within one path segment
- `**` — matches across any number of segments

A pattern covers its base path and everything beneath it, so
`/api/latest/app-builder/**` also matches `/api/latest/app-builder`.

Brace expansion (`{a,b}`), character classes and extglobs are rejected. Use one
entry per path instead:

```yaml
site_support_ids:
    on-call:
        regions: [gov, gov2]
        url_paths:
            - /api/latest/on-call/**
            - /api/latest/on-call-paging/**
```

The subset is restricted because Hugo has no glob function for arbitrary
strings and must translate these patterns to regex for `findRE` when it adopts
this file. Keeping the subset small keeps that translation trivial.

These are **URL** paths, not content paths. They differ from Hugo's cascade
`_target.path` by locale prefix, `_index.md` naming, and the `_vendor` tree.

Two IDs may not claim overlapping `url_paths`. A page resolving to two IDs is
ambiguous, so it fails the build rather than picking one.

### Hugo and Astro match differently

Hugo also matches an ID against page **path segments**: it splits the page path
and uses the first segment that is itself an ID. That is why `agentless-scanning`
and `agentless_scanning` both exist — one product, two IDs, split only so one
matches a hyphenated API URL and the other an underscored docs path.

**Astro does not do this.** It matches only frontmatter IDs and `url_paths`.

Three IDs match an Astro API route by segment — `agentless-scanning`, `on-call`
and `workflow-automation` — and all three carry explicit `url_paths`, so both
sites agree. A test fails if any other ID starts colliding with an Astro route,
which would mean Hugo shows a banner that Astro does not.

Removing Hugo's segment matching means giving explicit `url_paths` to every ID
that relies on it.

### While both sites run

Hugo reads its own copy of this data at `hugo/config/_default/params.yaml` under
`unsupported_sites`. The two are kept in step by an equivalence test in
`astro/src/config/`. Delete that test when Hugo reads this file directly.

## `otel_compatibility.yaml`

Which Datadog features each OpenTelemetry setup supports. A setup is one SDK
plus one receiver (the component the SDK sends to). The `otel-compatibility`
Hugo shortcode renders it on `/opentelemetry/compatibility/`. Hugo mounts this
file as `site.Data.otel_compatibility`. Astro does not read it yet, and there is
no Zod schema for it yet. The Hugo shortcode stops the build on an unknown ID or
support value.

### Top-level keys

| Key         | Meaning                                                  |
| ----------- | -------------------------------------------------------- |
| `sdks`      | SDKs, in display order                                   |
| `receivers` | Receivers, in display order                              |
| `pairs`     | Valid SDK and receiver combinations, in display order    |
| `features`  | One entry per Datadog feature, in table-row order        |

### `sdks` and `receivers`

| Field         | Required | Meaning                                                                       |
| ------------- | -------- | ----------------------------------------------------------------------------- |
| `id`          | yes      | Key used everywhere else in the file                                          |
| `label`       | yes      | Display name                                                                  |
| `description` | yes      | One sentence about what it is, shown on hover in the column headers           |
| `agent`       | no       | Receivers only: `included`, `optional`, or `none`. Shown in the column header. |

### `pairs`

| Field         | Required | Meaning                                                              |
| ------------- | -------- | -------------------------------------------------------------------- |
| `sdk`         | yes      | An SDK `id`                                                          |
| `receiver`    | yes      | A receiver `id`                                                      |
| `name`        | no       | Short name shown above the pair, such as `DDOT`                      |
| `recommended` | no       | `true` marks a recommended setup. The first two are compared by default. |
| `link`        | no       | Setup guide for this pair                                            |
| `confirmed`   | no       | `false` means the pair may not work. The picker offers it, but the full table leaves it out. |

A pair that isn't listed is disabled in the setup picker.

### `features`

| Field            | Required | Meaning                                                            |
| ---------------- | -------- | ------------------------------------------------------------------ |
| `id`             | yes      | Unique key                                                         |
| `label`          | yes      | Feature name                                                       |
| `abbr`           | no       | Abbreviation shown after the name, such as `DBM`                   |
| `link`           | no       | Feature docs                                                       |
| `requires_agent` | no       | `true` shows an "Agent required" marker on the row. Set it only when the docs state it. |
| `note`           | no       | Note about the feature as a whole, shown under its name            |
| `sdk`            | no       | Map of SDK `id` to a support value                                 |
| `receiver`       | no       | Map of receiver `id` to a support value                            |
| `overrides`      | no       | List of exact-pair values that replace the computed value          |

A **support value** is one of `supported`, `partial`, `not_supported`, or
`unknown`. An SDK or receiver that a feature doesn't list is `unknown`. An
`unknown` cell renders blank, which means not yet documented. Don't
write `yes` or `no`: YAML reads them as booleans, and the build fails.

Notes accept Markdown, so a note can link to another page. In compare view,
notes show as text under the cell; in the full table they show on hover.

To add a note or a short cell label, use a map instead of a single word:

```yaml
receiver:
  otlp_intake:
    support: partial
    label: Sampled          # shown in the cell instead of "Partial"
    note: Calculated from spans that reach Datadog.   # shown on hover and focus
```

An override names one pair:

```yaml
overrides:
  - sdk: ddot_sdk
    receiver: upstream_collector
    support: partial
    note: Java and .NET only.
```

### How a cell gets its value

1. If an override matches the pair, use it.
2. Otherwise, if the SDK value or the receiver value is `unknown`, the cell is
   blank.
3. Otherwise, use the lower of the two, in this order:
   `not_supported` < `partial` < `supported`.

Rule 2 keeps a cell blank until both sides are documented, so the file never
claims more than the docs state. When a feature's support depends on the
combination rather than on either part, add an override instead of changing
an SDK or receiver value.

The cell shows the `label` and `note` of the side that decided the value. When
both sides have the same value, it shows both notes.

### Add a feature

Add an entry under `features` where you want the row to appear. Give it a
value for each SDK and receiver you know about. Leave out the ones you don't.

### Add a setup

If the SDK or receiver is new, add it to `sdks` or `receivers` with a
one-sentence `description`. Then add a
`pairs` entry, and give each feature a value for the new SDK or receiver.
Features without a value show a blank cell.
