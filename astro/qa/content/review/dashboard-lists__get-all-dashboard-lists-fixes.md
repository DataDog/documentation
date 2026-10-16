# Fixes: dashboard-lists/get-all-dashboard-lists

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/dashboard-lists/get-all-dashboard-lists.md | https://docs.datadoghq.com/api/latest/dashboard-lists/get-all-dashboard-lists/
- Astro local (fixed): http://localhost:4321/api/latest/dashboard-lists/get-all-dashboard-lists.md | http://localhost:4321/api/latest/dashboard-lists/get-all-dashboard-lists/
- Astro staging (before): https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboard-lists/get-all-dashboard-lists.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/dashboard-lists/get-all-dashboard-lists/

## F1. .md drops the link on "scope" in the OAuth sentence

What was wrong: the plaintext twin wrote the OAuth sentence with no link. The HTML linked "scope" to the scopes page.
What changed: the twin links "scope" to `/api/latest/scopes/#<anchor>` whenever the component does, localized like the component's link, in `src/components/ApiEndpoint/plaintext/ApiEndpoint.ts`. The operation `.md` route passes its locale in. The page-wide `.md` link rewrite turns it into `scopes.md#<anchor>`. Test: `src/components/ApiEndpoint/plaintext/tests/unit.test.ts`. Five plaintext page snapshots gained the link.
Findings covered: 1. Samples: bdf4ff53f296

To check the plaintext: search for `authorization scope` (staging) or `authorization [scope]` (local and prod) on each `.md` page.
Success: local has `authorization [scope](http://localhost:4321/api/latest/scopes.md#dashboard-lists)`, matching prod's link, and the link loads. Staging has no link.

Side note, not fixed: local `scopes.md` has no per-category scope sections, while prod's has headings like "Dashboard Lists, Dashboard Secure Embed, …". The scopes page wasn't part of this QA run.

Status: [ ] approved
Feedback:
