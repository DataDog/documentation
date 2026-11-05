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
