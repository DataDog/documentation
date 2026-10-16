# Fixes: incidents

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/incidents.md | https://docs.datadoghq.com/api/latest/incidents/
- Astro local (fixed): http://localhost:4321/api/latest/incidents.md | http://localhost:4321/api/latest/incidents/
- Astro staging (before): https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/incidents.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/incidents/

## F1. Operation slug differs when the summary has an apostrophe

Covered by monitors F1. Checked on this page: http://localhost:4321/api/latest/incidents/list-an-incidents-impacts/ returns 200.

## F2. Badge missing from the .md when an operation is both deprecated and preview

What was wrong: the plaintext twin wrote "(preview)" only when the operation wasn't deprecated, so 17 operations lost their preview badge in the .md. The HTML already showed both.
What changed: the twin writes each badge on its own, as the component does, in `src/components/ApiEndpointSummary/plaintext/ApiEndpointSummary.ts`. Test: `src/components/ApiEndpointSummary/plaintext/tests/unit.test.ts`.
Findings covered: 2. Samples: 3895d4bbc4b8, d1a4b3042ad8

To check the plaintext: search for `Create a page from an incident` on each `.md` page.
Success: local shows `(deprecated) (preview)` after the link. Prod shows "deprecated preview". The parentheses are expected, per dashboards I3. Staging shows only `(deprecated)`.

Status: [ ] approved
Feedback:
