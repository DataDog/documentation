# Prompt

We need to write a plan for investigating the reports created by plan 30, and processing those reports into two lists for each QA'd page: A list of changes that were automatically made, with a place for the user to give feedback or approve the change, and a list of "no action taken" review items for a human, where the human needs to give you more information, such as whether the mismatch is an issue in the first place. Both of these lists should be written in Markdown.

Each item should include a plaintext and HTML link to Hugo prod, the local Astro page, and the Astro staging page (https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/, which can be thought of as Astro prod, since it's the unchanged version the user would be comparing against when reviewing fixes). These links can be listed at the top of a section if multiple items use the same links (as is expected since we're QAing by page). Also include helpful items like what string the user should search for to quickly find the right spot on each plaintext page, steps to follow on each HTML page, what success looks like, etc., and any brief context to help the user understand the item. Keep formatting like bold to a minimum, it just makes the raw Markdown harder for people to read.

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

- [ ] 1.1 `dashboards` ⏸
- [ ] 1.2 `aws-integration` ⏸
- [ ] 1.3 `usage-metering` ⏸
- [ ] 1.4 `screenboards` (absent in Astro; one item) ⏸
- [ ] 1.5 `dashboard-lists` ⏸
- [ ] 1.6 `monitors` ⏸
- [ ] 1.7 `incidents` ⏸
- [ ] 1.8 `authentication/validate-api-key` ⏸
- [ ] 1.9 `dashboard-lists/get-all-dashboard-lists` ⏸
- [ ] 1.10 `usage-metering/get-hourly-usage-for-lambda` ⏸
- [ ] 1.11 `aws-integration/list-all-aws-integrations` ⏸
- [ ] 1.12 `incidents/create-an-incident` ⏸
- [ ] 1.13 `monitors/create-a-monitor` ⏸
- [ ] 1.14 `dashboards/get-a-dashboard` (about 2,400 findings; may take more than one step) ⏸

### Phase 2: automatic fixes, five per step

Claude works through the "automatic fix" items, page by page in Phase 1 order. For each one:

- write a failing test, then the fix (red → green)
- run Prettier on touched files and the scoped tests
- add the entry to `<slug>-fixes.md`
- in the investigation file, mark the item `done: F<n>`

After five fixes, ⏸. An item covered by an earlier fix doesn't count toward the five.

Claude can't confirm fixes against the tool, because the tool reads `dist/`, and only the user's `yarn build` updates it. Until then, Claude checks fixes on the local dev server.

Fix log (Claude adds a line per batch):

- [ ] Batch 1:

### Phase 3: human review lists

For each page, Claude moves the "human review" items into `<slug>-review.md`, using the template. Investigation done, so these steps are small. Several pages fit in one step.

- [ ] 3a. The eight index and small operation pages (1.1–1.8) ⏸
- [ ] 3b. 1.9–1.12 ⏸
- [ ] 3c. 1.13–1.14 ⏸

### Phase 4: wrap-up

- [ ] 4a. Run `yarn test-ai`. Recommend that the user run `yarn build` and rerun `node qa/content/compare.ts` to confirm the counts dropped. List the fix and review files. ⏸ Done.

## Handoff notes

- 0a (2026-10-16): Reran the tool on the new `dist/` (built 18:27 UTC) with no `--refresh`. Prod snapshot is from 17:09 UTC. Counts barely moved: get-a-dashboard has 1,873 astro-wrong. All six link forms return 200 with the right content type for validate-api-key, `.md` included. Claude started the dev server (`astro dev`, a daemon; stop it with `astro dev stop`). Created `qa/content/review/`, which isn't gitignored. Next: 1.1 `dashboards`.
