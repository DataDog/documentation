# Investigation: monitors

Report: qa/content/out/pages/monitors.json (run 2026-10-16)

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/monitors.md | https://docs.datadoghq.com/api/latest/monitors/
- Astro local: http://localhost:4321/api/latest/monitors.md | http://localhost:4321/api/latest/monitors/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/monitors.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/monitors/

Six findings, all unreviewed: one `missing-in-astro`, one `extra-in-astro` and four `structure`. The HTML coverage check matched all 314 prod HTML chunks. Drift check: none of #40737, #40713 or #40657 touches Monitors.

## I1. Operation slug differs when the summary has an apostrophe or slash

Recommendation: automatic fix (user, 2026-10-16). done: F1
Findings: 2 (one missing-in-astro, one extra-in-astro, both links). Samples: 96c462cb0131, 2cf430f37726
Location: the h2 link for "Get a monitor's details"
Search: `monitor's details` on each .md page.

Hugo .md: `## [Get a monitor's details →](https://docs.datadoghq.com/api/latest/monitors/get-a-monitors-details.md){% #get-a-monitors-details %}`
Astro .md and HTML: the link goes to `/api/latest/monitors/get-a-monitor-s-details/`.
URLs:

- https://docs.datadoghq.com/api/latest/monitors/get-a-monitors-details/ returns 200 on prod. http://localhost:4321/api/latest/monitors/get-a-monitors-details/ returns 404 on Astro.
- `get-a-monitor-s-details` is the reverse: 404 on prod, 200 on Astro.

Cause: `toSlug` (`src/lib/api/categorySlug.ts:17`) replaces each run of non-alphanumeric characters with `-`. Astro uses it for operation slugs (`src/lib/api/viewsBuilder.ts:296`). Hugo's `anchorize` deletes punctuation and turns only spaces into `-`.
Scope: 25 operations across the site. 24 have an apostrophe, such as "Get an SLO's details", "List an incident's impacts" and "Get a rule's details". The other is "Trigger tests from CI/CD pipelines": prod has `trigger-tests-from-cicd-pipelines`, Astro has `trigger-tests-from-ci-cd-pipelines`. No tag name has these characters, so category slugs don't change. Other punctuation in summaries (parentheses, hyphens) already slugs the same in both.
Proposed fix: in `toSlug`, delete every character that isn't a letter, digit, space or hyphen, then hyphenate as before. Add tests for "Get a monitor's details" → `get-a-monitors-details` and "Trigger tests from CI/CD pipelines" → `trigger-tests-from-cicd-pipelines`. Update the snapshots affected by the slug change. No redirects from the old Astro slugs, since Astro isn't live.
Success: http://localhost:4321/api/latest/monitors/get-a-monitors-details/ and http://localhost:4321/api/latest/synthetics/trigger-tests-from-cicd-pipelines/ return 200. The monitors .md links to `get-a-monitors-details.md`.
User (2026-10-16): automatic fix, no redirects.

## I2. Frontmatter description differs

Recommendation: no change (per dashboards I1)
Findings: 1 (structure). Samples: 9a0b8ab7b8ea
Location: frontmatter `description`

Cause: same as dashboards I1.

## I3. Breadcrumb label is "API" instead of "API Reference"

Recommendation: human review (per dashboards I2)
Findings: 1 (structure). Samples: e2ef0169c1e6
Location: frontmatter `breadcrumbs`

Hugo .md: "Docs > API Reference > Monitors"
Astro .md: "Docs > API > Monitors"

Cause: same as dashboards I2.

## I4. Badges are "(deprecated)" and "(preview)" instead of bare words

Recommendation: no change (per dashboards I3)
Findings: 1 (structure), 9 headings. Samples: cdbc170ec920
Location: h2 of the 9 badged operations, such as "Mute all monitors"

Cause: same as dashboards I3. All 9 heading pairs differ only by the parentheses.

## I5. Endpoint table rows are in a different order

Recommendation: no change (per dashboards I4)
Findings: 1 (structure), 31 endpoint tables. Samples: efc6b1551f58
Location: every operation's endpoint table on this page

Cause: same as dashboards I4.
