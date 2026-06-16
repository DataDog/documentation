# Code review

Review the changes on the current branch for the `astro/` site. This command supersedes the generic review skill for work inside `astro/` — it knows this project's checklists and rules.

## 1. Establish the diff

1. Ask the user what code to review. Usually, this will be `git diff --staged`, not the entire branch against master. This is a very large feature branch, don't review all of it.

2. Review **only what's in the identified diff.** Don't flag pre-existing issues in untouched code. If you spot one and it's important, note it separately as "out of scope," don't block on it.

3. Ignore changes outside `astro/` for the purposes of these checklists, but flag them (see Project rules below) — they shouldn't be there.

## 2. Route each change to its checklist

Work through the diff and apply every checklist that matches. A single PR can hit several.

### If CSS or HTML changed

1. QA against [the CSS checklist](../../docs/css/checklists/all.md).

2. Verify that the CSS checklist and its referenced documentation are up to date. Has a decision been made that would change this information? Query on any recommended changes.

### If a component was added or changed

For each affected component:

1. Determine whether it's static or interactive.

2. QA against the relevant sections of [the component checklist](../../docs/components/checklists/all.md).

3. Verify that the component checklist and its referenced documentation are up to date. Has a decision been made that would change this information? Query on any recommended changes.

### The API spec pipeline changed (`src/lib/api/`, schemas, fixtures, `.md.ts` routes)

1. QA against [the API spec pipeline checklist](../../docs/api/checklists/all.md).

2. Verify that the API spec pipeline checklist and its referenced documentation are up to date. Has a decision been made that would change this information? Query on any recommended changes.

## 3. Enforce the project rules

Apply any rules in [astro/CLAUDE.md](../../CLAUDE.md), such as "No files outside `astro/` are modified."

## 4. Verify, don't just read

Run the checks and report results:

- `npm run test:unit` — headless unit/integration tests.

- `npx astro check` — TypeScript (strict mode) and Astro diagnostics.

- If components changed visually, note whether Playwright baselines were updated (`npm run test:browser`); don't silently accept stale or missing snapshots.

If a check fails, include the relevant output. Don't report the change as clean if something failed or was skipped — say what failed and what was skipped.

## 5. Report

Summarize findings grouped by severity:

- **Blocking** — correctness bugs, out-of-scope edits, failing tests/checks,
  missing schema/snapshot updates, i18n violations.
- **Should fix** — checklist items not satisfied, missing test coverage,
  readability problems in the changed code.
- **Nits** — optional polish.

For each finding, cite the file and line (`path:line`) and state the concrete fix. If the diff is clean, say so plainly and list which checklists and checks you ran so the result is auditable.
