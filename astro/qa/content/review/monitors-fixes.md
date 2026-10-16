# Fixes: monitors

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/monitors.md | https://docs.datadoghq.com/api/latest/monitors/
- Astro local (fixed): http://localhost:4321/api/latest/monitors.md | http://localhost:4321/api/latest/monitors/
- Astro staging (before): https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/monitors.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/monitors/

## F1. Operation slug differs when the summary has an apostrophe or slash

What was wrong: Astro turned each apostrophe or slash into a hyphen, so "Get a monitor's details" lived at `get-a-monitor-s-details`. Prod uses `get-a-monitors-details`. 25 operations were affected.
What changed: `toSlug` in `src/lib/api/categorySlug.ts` deletes punctuation and hyphenates only spaces and hyphens, like Hugo's `anchorize`. No redirects from the old slugs. Test: `src/lib/api/categorySlug.test.ts`. Slug-only snapshot updates in the incidents and monitors view and page snapshots.
Findings covered: 2. Samples: 96c462cb0131, 2cf430f37726

To check the plaintext: search for `monitor's details` on each `.md` page.
To check the URLs: open http://localhost:4321/api/latest/monitors/get-a-monitors-details/ and http://localhost:4321/api/latest/synthetics/trigger-tests-from-cicd-pipelines/.
Success: both local URLs load, and the local `.md` links to `get-a-monitors-details.md`, as prod does. On staging, the same two URLs return 404.

Status: [ ] approved
Feedback:
