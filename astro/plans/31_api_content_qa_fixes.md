# Prompt

We need to write a plan for investigating the reports created by plan 30, and processing those reports into two lists for each QA'd page: A list of changes that were automatically made, with a place for the user to give feedback or approve the change, and a list of "no action taken" review items for a human, where the human needs to give you more information, such as whether the mismatch is an issue in the first place. Both of these lists should be written in Markdown.

Each item should include a plaintext and HTML link to Hugo prod, the local Astro page, and the Astro staging page (https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/, which can be thought of as Astro prod, since it's the unchanged version the user would be comparing against when reviewing fixes). These links can be listed at the top of a section if multiple items use the same links (as is expected since we're QAing by page). Also include helpful items like what string the user should search for to quickly find the right spot on each plaintext page, steps to follow on each HTML page, what success looks like, etc., and any brief context to help the user understand the item. Keep formatting like bold to a minimum, it just makes the raw Markdown harder for people to read.

When content is too large to compare by hand (for example, thousands of schema rows), give the reviewer a JS snippet to paste into the browser console on each HTML page. It should count the relevant items (rows, links, examples) so the reviewer can check that the counts match. Give the expected count for each site, and check each snippet's selectors against the fetched HTML before including it.

The above artifacts can be created in the following way:

For each page that was QA'd, investigate the items and recommend either "automatic fix" or "human review". You can write this to a file for the page, `<identifier>-investigation.md` or something like that. In order to shift more fixes to the "automatically done" category, you can ask the user questions along the way as needed to give you the confidence you need. Just be sure to give them links/search terms/context as described above so they can easily see what you're talking about.

Prompt the user to compact between pages.

Once the investigation artifacts have been created for each page, work through each one. For each investigation artifact, create the two list files we want to end up with as described above (already-made fixes and items needing more review). Make five automatic fixes at a time before asking the user to compact, updating the "already-made fixes" list along the way. When the automatic fixes are done, move on to making the "human review" list, which is just a matter of transferring the human review items into a readable list as described.

In your plan below, include example templates so I can see what the list entries will look like. Also make the plan easy to check off, so Claude can pick up where it left off after compaction or other breaks.

# Plan

## Inputs

- Reports from plan 30: `qa/content/out/pages/<slug>.json` (authoritative) and `qa/content/out/summary.md`. Each finding has an `id`, `kind`, `verdict`, `locationKey`, `field`, `hugoText` / `astroText`, and `htmlCheck`.
- Before starting, rerun `node qa/content/compare.ts` so the reports match the current `dist/`. Don't use `--refresh`: the prod snapshot should stay fixed for the whole plan.
- The bias rule from plan 30 still applies: an item that might be real is never dropped. If Claude can't confirm it, it goes to human review.

## Files

All output goes in `qa/content/review/`. It is committed, not gitignored, so review notes aren't lost. For each page, the files are named by the report slug, for example `dashboards__get-a-dashboard`:

- `<slug>-investigation.md`: working notes, one item per root cause, each marked "automatic fix" or "human review".
- `<slug>-fixes.md`: fixes already made, with a place for feedback.
- `<slug>-review.md`: items where no action was taken and a human has to decide.

## Links

Each page section starts with one links block, which its items share. For page path `<path>`, for example `api/latest/authentication/validate-api-key`:

| Site | Plaintext | HTML |
|---|---|---|
| Hugo prod | `https://docs.datadoghq.com/<path>.md` | `https://docs.datadoghq.com/<path>/` |
| Astro local | `http://localhost:4321/<path>.md` | `http://localhost:4321/<path>/` |
| Astro staging | `https://docs-staging.datadoghq.com/jen.gilbert/astro-base/<path>.md` | `https://docs-staging.datadoghq.com/jen.gilbert/astro-base/<path>/` |

Astro local shows fixes made in this plan when `yarn dev` is running. Staging stays unchanged, so it's the "before" for every fix.

Step 0 checks that all six URL forms load. If any doesn't (for example, the dev server doesn't serve `.md`), Claude asks the user before choosing a substitute.

## Items

One item is one root cause, not one finding. For example, a single item covers 1,300 missing dashboard response rows that all have the same cause. Each item lists how many findings it covers and up to three sample finding ids, so it can be traced back to the JSON.

Ids:

- Investigation items are `I1`, `I2`, and so on, per page.
- When an item moves to a list, it keeps its number: `I3` becomes `F3` in the fixes file or `R3` in the review file. This keeps the trail readable.

If one fix covers items on several pages (shared renderer code is likely), it's made and listed on the first page where it comes up. Later pages list a matching item as "covered by `<slug>` F3". Claude still checks it on that page and changes it to human review if it isn't actually covered.

## Templates

### Investigation file

```markdown
# Investigation: authentication/validate-api-key

Report: qa/content/out/pages/authentication__validate-api-key.json (run 2026-10-16)

Links:
- Hugo prod: https://docs.datadoghq.com/api/latest/authentication/validate-api-key.md | https://docs.datadoghq.com/api/latest/authentication/validate-api-key/
- Astro local: http://localhost:4321/api/latest/authentication/validate-api-key.md | http://localhost:4321/api/latest/authentication/validate-api-key/
- Astro staging: https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/authentication/validate-api-key.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/authentication/validate-api-key/

## I1. Response field description is cut short

Recommendation: automatic fix
Findings: 2 (changed, astro-wrong). Samples: 3f9a1c2d0b11, 3f9a1c2d0b11-2
Location: v1, response 200, model table, field `valid`

Hugo .md: "valid | boolean | Return true if the authentication is valid."
Astro .md: "valid | boolean | Return true if"
Prod HTML: matches Hugo .md.

Cause: <file:line and a one-line explanation, or "unknown">
Proposed fix: <one or two lines>
Confidence: high. Prod HTML and the spec both have the full text.

## I2. ...

Recommendation: human review
Question for the user: <the specific thing Claude needs to know>

## I3. ...

Recommendation: human review
Cause: drift: PR #<number>, <title>. Prod has this change and Astro doesn't yet.
Drift PR: https://github.com/DataDog/documentation/pull/<number>
Proposed fix: none. Port the PR's change instead.
```

### Fixes file

```markdown
# Fixes: authentication/validate-api-key

Links:
- Hugo prod: <plaintext> | <HTML>
- Astro local (fixed): <plaintext> | <HTML>
- Astro staging (before): <plaintext> | <HTML>

## F1. Response field description is cut short

What was wrong: Astro cut the `valid` field description off after "Return true if".
What changed: <one or two lines>, in `src/lib/api/...`. Test: `src/lib/api/....test.ts`.
Findings covered: 2. Samples: 3f9a1c2d0b11, 3f9a1c2d0b11-2

To check the plaintext: search for `valid | boolean` on each `.md` page.
To check the HTML: open the page, select the v1 tab, expand "Response", then select the 200 tab and "Model".
Success: local shows "Return true if the authentication is valid." the same way Hugo prod does. Staging still shows the cut-off text.

Status: [ ] approved
Feedback:
```

### Review file

```markdown
# Human review: authentication/validate-api-key

Links:
- Hugo prod: <plaintext> | <HTML>
- Astro local: <plaintext> | <HTML>
- Astro staging: <plaintext> | <HTML>

## R2. Astro lists more enum values than prod

Findings: 12 (changed). Samples: 8e5659672ed6, e7c37b301305
Context: Astro lists 1mo, 3mo, 6mo and others that prod doesn't. The spec Astro reads (api-spec/) has them, so this is probably spec drift and Astro is right. Claude couldn't confirm that prod was built from an older spec.

To check the plaintext: search for `live_span` on each `.md` page.
To check the HTML: open the page, expand "Response", and find `live_span` under "Model".
Question: Is Astro's longer list correct? If so, mark this "no change".
Drift PR (drift items only): https://github.com/DataDog/documentation/pull/<number>

Decision: [ ] Astro is wrong  [ ] no change  [ ] other
Notes:
```

## Phases

The ⏸ symbol marks a compaction point. At each one, Claude ticks the checkboxes, writes a line or two in Handoff notes (where it stopped and what comes next), stops, and tells the user to compact. After a break, Claude resumes from the first unchecked box and the Handoff notes, not from memory.

Context rules from plan 30 still apply. Never `cat` whole pages, reports or HTML. Read findings with `node -e` filters or `grep`, a few at a time.

### Phase 0: setup

- [x] 0a. Rerun the tool. Check that the six link forms load for one page. Create `qa/content/review/`. ⏸

### Phase 1: investigate, one page per step

For each page, Claude groups findings into root causes, checks samples against the prod HTML and the code, and writes the investigation file. Where a question would move an item from "human review" to "automatic fix", Claude asks it, with links, search terms and context, and records the answer in the item. Pages run smallest first, so the templates settle before the big pages.

Drift check: before recommending an automatic fix, Claude checks whether a recent Hugo PR caused the difference, meaning prod has a change that Astro hasn't caught up with yet. Claude lists the Hugo-side commits this branch doesn't have with `git fetch origin master` and `git log --oneline $(git merge-base HEAD origin/master)..origin/master -- hugo/`. It looks at the ones that touch the API templates, shortcodes, or spec, and finds the PR with `gh pr list --repo DataDog/documentation --state merged --search <sha>`. If a PR explains the item, Claude doesn't fix it. The item goes to human review, and its Cause line reads "drift: PR #<number>, <title>" followed by the PR link. The PR link also goes in the review file entry, so the reviewer can open it.

- [x] 1.1 `dashboards` ⏸
- [x] 1.2 `aws-integration` ⏸
- [x] 1.3 `usage-metering` ⏸
- [x] 1.4 `screenboards` (absent in Astro; one item) ⏸
- [x] 1.5 `dashboard-lists` ⏸
- [x] 1.6 `monitors` ⏸
- [x] 1.7 `incidents` ⏸
- [x] 1.8 `authentication/validate-api-key` ⏸
- [x] 1.9 `dashboard-lists/get-all-dashboard-lists` ⏸
- [x] 1.10 `usage-metering/get-hourly-usage-for-lambda` ⏸
- [x] 1.11 `aws-integration/list-all-aws-integrations` ⏸
- [x] 1.12 `incidents/create-an-incident` ⏸
- [x] 1.13 `monitors/create-a-monitor` ⏸
- [x] 1.14 `dashboards/get-a-dashboard` (about 2,400 findings; may take more than one step) ⏸

### Phase 2: automatic fixes, five per step

Stop gate: when Phase 1 is done, Claude stops and asks the user before making any automatic fix. Don't start Phase 2 without an explicit go-ahead.

Claude works through the "automatic fix" items, page by page in Phase 1 order. For each one:

- write a failing test, then the fix (red → green)
- run Prettier on touched files and the scoped tests
- add the entry to `<slug>-fixes.md`
- in the investigation file, mark the item `done: F<n>`

After five fixes, ⏸. An item covered by an earlier fix doesn't count toward the five.

Claude can't confirm fixes against the tool, because the tool reads `dist/`, and only the user's `yarn build` updates it. Until then, Claude checks fixes on the local dev server.

Fix log (Claude adds a line per batch):

- [x] Batch 1: monitors F1 (operation slugs drop punctuation), incidents F2 (both badges in the .md), dashboard-lists/get-all-dashboard-lists F1 (scope link in the .md), usage-metering/get-hourly-usage-for-lambda F1 (responses fall back to the first content type) and F2 ("(deprecated)" version label). Covered: incidents I1, lambda I4. ⏸
- [ ] Batch 2:

### Phase 3: human review lists

For each page, Claude moves the "human review" items into `<slug>-review.md`, using the template. Investigation done, so these steps are small. Several pages fit in one step.

- [ ] 3a. The eight index and small operation pages (1.1–1.8) ⏸
- [ ] 3b. 1.9–1.12 ⏸
- [ ] 3c. 1.13–1.14 ⏸

### Phase 4: wrap-up

- [ ] 4a. Run `yarn test-ai`. Recommend that the user run `yarn build` and rerun `node qa/content/compare.ts` to confirm the counts dropped. List the fix and review files. ⏸ Done.

## Handoff notes

- 0a done 2026-10-16. Reran the tool without `--refresh`. All six link forms return 200 with the right content type, including `.md` on the dev server. Created `qa/content/review/`. This branch is 23 Hugo commits behind `origin/master`. Two of them touch `hugo/data/api` (PRs #40737 and #40713, spec regenerations), so check them first during the drift check. Next: 1.1 `dashboards`.
- 1.1 done. I2 (breadcrumb "API" instead of "API Reference") is human review. The user cleared these as no change on every page: I1, the tag description in frontmatter and meta; I3, "(preview)" with no "→" or `{% #anchor %}`; I4, the region-selector row order and bold method. On later pages, mark matching items "no change, per dashboards I<n>" without asking. Next: 1.2 `aws-integration`.
- 1.2 done. No automatic fixes. I2 (breadcrumb) is human review. I1, I3 and I4 are no change, per dashboards. A "(deprecated)" badge counts as dashboards I3. #40737 (CCM permissions, changelog) caused no findings on this page. Next: 1.3 `usage-metering`.
- 1.3 done. No automatic fixes. Same four items as dashboards: I2 (breadcrumb) is human review, I1/I3/I4 no change. 35 deprecated + 4 preview badges, all parentheses-only. No drift. Added the Phase 2 stop gate. Next: 1.4 `screenboards`.
- 1.4 done. No automatic fixes. I1 (page absent: prod serves an empty stub, and the tag is retired from the spec) is human review, per the user. The option to redirect to dashboards is noted. Next: 1.5 `dashboard-lists`.
- 1.5 done. No automatic fixes. New: I1, Astro's page-level "This endpoint is deprecated." (the v1 tag has x-deprecated and v2 doesn't; v1 metadata wins), is human review, per the user. I3 (breadcrumb) is human review. I2 and I4 are no change, per dashboards. Next: 1.6 `monitors`.
- 1.6 done. First automatic fix: I1, operation slugs. `toSlug` hyphenates apostrophes and slashes, and Hugo deletes them. 25 operations site-wide, no redirects, per the user. Later pages with apostrophe slug findings fall under monitors I1. I3 (breadcrumb) is human review. I2, I4 and I5 are no change, per dashboards. Next: 1.7 `incidents`.
- 1.7 done. I1 (three apostrophe slugs) falls under monitors I1. New automatic fix: I2. The .md plaintext twin uses `else if`, so it drops "(preview)" when an operation is also deprecated. The HTML shows both badges. Affects 17 operations site-wide. I4 (breadcrumb) is human review. I3, I5 and I6 are no change. Next: 1.8 `authentication/validate-api-key`.
- 1.8 done. First operation page. No automatic fixes. Human review, per the user, for every operation page: I1, breadcrumbs that skip the category; I2, Astro's "Read-only."; I3, Astro's curl builder (exports, header order); I4, the five .md format differences (version heading, no Overview, language tabs, Instructions label, Parent field). I5 (Hugo .md merges run commands) is no change. Later operation pages refer back to these. Next: 1.9 `dashboard-lists/get-all-dashboard-lists`.
- 1.9 done. New automatic fix: I1. The .md plaintext twin doesn't link "scope" in the OAuth sentence, and the HTML does. New human review, per the user: I2, the overview split and placement (description and permissions as separate blocks; the .md puts the description above the table); I3, response examples from the spec's `examples.default` instead of being built from the schema. Read-only, curl, breadcrumbs and .md format are per 1.8. Next: 1.10 `usage-metering/get-hourly-usage-for-lambda`.
- 1.10 done. Three new automatic fixes. I1: response models and examples are missing when the content type isn't exactly `application/json` (63 operations; fall back to the first type, like the request builder). I2: deprecated operations get the label "(deprecated)" instead of "(latest)" (user). I6: curl references `${START_HR}` without exporting it (user). New human review: I3, Astro's "This endpoint is deprecated." alert (user). Next: 1.11 `aws-integration/list-all-aws-integrations`.
- 1.11 done. Two new automatic fixes. I1: line breaks in .md table cells break the tables (`tableMd`). I2: `additionalProperties` is ignored, so `<any-key>` rows are missing (284 schemas; user). New human review: I3, Astro shows "Default: false.", which Hugo drops as falsy (user). I4 (Hugo .md drops other defaults) is no change. Three more .md forms (enum, deprecated marker, oneOf spacing) are added to the .md format item. Next: 1.12 `incidents/create-an-incident`.
- 1.12 done. First POST page. No new automatic fixes. The additionalProperties fix (1.11 I2) must also handle oneOf. New human review: I1, request examples come from the spec because Hugo's `request.*.json` files (784, under hugo/content) aren't staged for Astro; I2, "Request Body (required)" heading vs "Request" plus a "Body Data (required)" label. I11 (help link as .md) is no change. Next: 1.13 `monitors/create-a-monitor`.
- 1.13 done. No new automatic fixes. New human review, per the user: I1, OAuth scope with more than one AuthZ entry (Hugo shows the last, Astro the first; 17 operations); I2, read-only fields left out of request tables (26 rows here). I3 (three request and curl examples vs one) falls under 1.12 I1. I7: Hugo's .md shortens enum lists and descriptions; no change. Hugo also drops a default of `0`. Next: 1.14 `dashboards/get-a-dashboard` (about 2,400 findings).
- 1.14 done. Phase 1 is complete. New automatic fixes, all in `src/lib/api/refResolver.ts` unless noted: I1, an array of oneOf uses up an extra nesting level, so rows past the cap are cut (about 988 rows); I2, follow `$ref` chains (`ProductAnalyticsBaseQuery`, about 189 rows); I4, per the user, drop the nameless `<items>` wrapper row under array-typed oneOf options (9 schemas); I5, per the user, a `$ref`'s own `description` and `deprecated` win over the target's (about 200 and 98 refs); I6, the plaintext twin drops enum values on oneOf option rows (`ApiSchemaTable.ts:61-68`). New human review, per the user: I9, the "(recursive)" row; I10, bare URLs left unlinked in the .md. The investigation file has console snippets to count rows (prod 13486, Astro 12167). Next: the stop gate. Ask the user before Phase 2.
- Batch 1 done. Five fixes, each red → green, with the fixes files written and the investigation items marked `done`. Scoped headless suites pass (1313 tests) and `astro check` has 0 errors. Side notes in the fixes files: local `scopes.md` lacks prod's per-category scope sections, and non-JSON responses show no Example tab where prod shows `{}`. Next: batch 2, starting with lambda I6 (curl variables), then aws-integration/list-all-aws-integrations I1 and I2, then get-a-dashboard I1 and I2.
