# API content QA: reporting

## Prompt

Compare a list of Astro API pages against their prod Hugo counterparts, on **content only** — not layout or look/feel. Compare the plaintext `.md` twins: Astro's from `dist`, Hugo's from prod (`https://docs.datadoghq.com/<path>.md`). The Markdown doesn't need to be identical, but Astro must not be missing content or have incorrect content vs. Hugo. A string diff may not be enough; supplement it by parsing both sides with Markdoc, so there's a traversable AST that makes the diff easier to interpret.

The user supplies the page list. Every page on it is an API page.

This is a dev-time QA tool, not a build step. Organize it so it's easy to delete.

## Goal and scope

The deliverable is a set of **JSON reports** describing every content and structural difference, with enough evidence (location, Hugo `.md` text, Astro text, Hugo HTML check) to work on the content further in later plans.

Out of scope for this plan: reviewing findings, assigning verdicts by hand, and fixing Astro. The tool sets only verdicts it can derive mechanically; everything else stays `unreviewed`.

## Research

### Inputs

- **Astro:** API pages are prerendered, so read `dist/client/api/**/<page>.md` directly. No server needed. `dist` is only as fresh as the last `yarn build`, which the user runs (Claude doesn't run the prod build). Record `dist`'s mtime in the report.
- **Hugo (prod only):** `curl https://docs.datadoghq.com/<path>.md` returns `200 text/markdown`. Cache responses under a gitignored folder so reruns are offline and stable. Hugo local is out of scope.
- **How Hugo's `.md` is made:** it isn't authored. A nightly process converts the built HTML with the `html-to-mdoc` package (`hugo/local/bin/js/html-to-mdoc.js` calls it), so a local Hugo dev server returns 404 for `.md`. Per the user, the converter is a stopgap and makes many mistakes and omissions. Symptoms so far: empty `#####` headings, unbalanced `{% tab %}` tags, the mangled curl block. Its source is in the user's local clone of the internal package repo, under `packages/html-to-mdoc`.
- **Consequence: Hugo's `.md` is a weak oracle.**
  - Content Hugo's `.md` has and Astro lacks is a strong signal.
  - Content Astro has and Hugo's `.md` lacks is usually the converter dropping it, so it's low priority.
  - **Blind spot:** if the converter dropped something and Astro also lacks it, the `.md`-to-`.md` diff can't see it. The prod Hugo HTML check (pipeline step 8) covers this.
- **Parseability:** `@markdoc/markdoc` parses both samples with **0 errors**, including Hugo's `{% #id %}` annotations and its unbalanced-looking `{% tab %}` tags.

### Observed noise (sample: `authentication`, `authentication/validate-api-key`)

Two kinds of difference turned up, and they're handled differently.

**Textual noise.** Normalize it silently; it never appears in reports:

| Kind | Hugo | Astro |
|---|---|---|
| Quotes | `'` straight | `’` curly |
| Paragraph wrapping | one line | hard-wrapped |
| Link host | `https://docs.datadoghq.com` | `http://localhost:4321` |
| Heading decoration | `Validate API key →` + `{% #validate-api-key %}` | plain |
| Bold/italic inside table cells | `GET` | `**GET**` |
| Tab syntax | `{% tab title="…" %}`, no `{% tabs %}` wrapper | `{% tabs %}{% tab label="…" %}` |

**Structural differences.** The comparison maps across these so content still aligns, but **every one is reported** as a `structure` finding, so the user can confirm it should exist. Either side may be the wrong one. Seen so far:

| Kind | Hugo | Astro |
|---|---|---|
| Site table row order | ap1, ap2, eu, … | app, us3, us5, … |
| Frontmatter `description` | site-wide generic default | real page description |
| Frontmatter breadcrumbs | `Docs > API Reference > …` | `Docs > API > …` |
| API version | `{% tab title="v1" %}` | `## v1 (latest)` heading |
| Operation description | under `### Overview` | directly under the version heading, **no "Overview" heading** |
| Code example language | empty `##### ` headings, so language only comes from the fence | `{% tab label="Go" %}` |
| Instructions label | `#### Instructions` heading | `**Instructions**` paragraph |
| Schema table | `Field \| Type \| Description` | adds a `Parent field` column |

### Observed real or possible differences

- Astro appends `Read-only.` to some field descriptions. This is either Astro adding information or spec drift.
- Hugo's curl example is mangled in its `.md` (no fence, `\#`, flattened lines). That's a Hugo `.md` bug, not an Astro one. **Hugo's `.md` is a lossy rendering**, so when the Hugo side is malformed, the tiebreaker is the Hugo HTML page, not its `.md`.
- **Spec drift:** prod Hugo builds from `hugo/data/api` at some commit, while Astro reads the published bundle (`api-spec/`). A text difference may be drift, not a bug. When Astro's text matches the current bundle, classify the finding as `drift`.

## Page list

Supplied by the user. The pasted Google Doc lost its links, so these paths were resolved against `dist/client`. The source doc also links Hugo local, which is out of scope.

| Label | Path | Why it's on the list |
|---|---|---|
| Dashboards | `/api/latest/dashboards` | category |
| Incidents | `/api/latest/incidents` | category |
| AWS Integration | `/api/latest/aws-integration` | category |
| Monitors | `/api/latest/monitors` | category |
| Dashboard Lists | `/api/latest/dashboard-lists` | category |
| Screenboards | `/api/latest/screenboards` | category; see note |
| Usage Metering | `/api/latest/usage-metering` | category |
| Authentication / Validate API key | `/api/latest/authentication/validate-api-key` | small operation |
| Dashboards / Get a dashboard | `/api/latest/dashboards/get-a-dashboard` | large schema |
| Incidents / Create an incident | `/api/latest/incidents/create-an-incident` | operation |
| AWS Integration / List all | `/api/latest/aws-integration/list-all-aws-integrations` | multi-version (v1 + v2) |
| Monitors / Create a monitor | `/api/latest/monitors/create-a-monitor` | operation |
| Dashboard Lists / Get all | `/api/latest/dashboard-lists/get-all-dashboard-lists` | deprecated category |
| Usage Metering / Get hourly usage for Lambda | `/api/latest/usage-metering/get-hourly-usage-for-lambda` | deprecated operation |

**Screenboards:** prod Hugo serves `/api/latest/screenboards.md` as a near-empty page: frontmatter and the llms.txt line, 7 lines in all. Astro has no Screenboards `.md`. `dist/client/api/screenboards/index.html` redirects to `/api/latest/dashboards/`. The tool reports page-level presence as a `structure` finding (`page-absent-in-astro`), so a missing page gets a verdict like anything else.

**AWS list-all variants:** `dist` also has `list-all-aws-integrations-v1/` and `-v2/` directories, which contain only `index.html` and no `.md`. These are presumably version-specific HTML routes; to be confirmed during calibration.

## Claude's plan

### File organization

```
astro/qa/content/
├── compare.ts          ← driver: load list → fetch → normalize → extract → align → diff → report
├── fetchPages.ts       ← read Astro dist; fetch and cache Hugo prod
├── normalize.ts        ← text-level normalization (pre-parse)
├── extractUnits.ts     ← Markdoc AST → flat list of located content units
├── alignUnits.ts       ← pair Hugo↔Astro units by location key, then fuzzy-match within a location
├── report.ts           ← JSON reports + summary.md
├── pages.txt           ← the user's page list (one path per line, e.g. /api/latest/authentication)
├── .cache/             ← gitignored Hugo responses
└── out/                ← gitignored reports
```

Run with `npx tsx qa/content/compare.ts [--refetch] [--page <path>]`. No new dependencies beyond confirming `tsx` is available. If a word-level diff library is needed, check what's already in `node_modules` first.

### Pipeline

1. **Normalize text** (both sides): NFC; curly quotes → straight; en/em dashes and nbsp → plain; strip zero-width characters; rewrite `http://localhost:4321` → `https://docs.datadoghq.com`; strip `{% #id %}` annotations and trailing ` →` in headings; strip the `> For the complete documentation index…` line.
2. **Parse** with `Markdoc.parse`.
3. **Extract located units.** Walk the AST, keeping a *location stack* built from headings and tab labels, then canonicalize it into a key:
   `version / section / responseCode? / (model|example)? / language?`
   - version: Hugo `tab title="v1"` ↔ Astro `## v1 (latest)` → `v1`
   - section: `overview | request | response | code-example | endpoint-table`. Hugo's `### Overview` maps to Astro's prose under the version heading.
   - language: Astro's tab label, or Hugo's fence language (`bash`↔`Curl`, `python`, …)
   - Unit kinds:
     - `prose`: paragraph or list-item text, inline formatting stripped
     - `tableRow`: the site/endpoint table compared as an unordered set with bold stripped. In schema tables, a row's key is its field path: Astro's `Parent field` + `Field` vs. Hugo's nesting and indentation, to be confirmed on a nested-schema page.
     - `code`: whitespace-normalized; for JSON fences, compare the parsed JSON
     - `link`: href set per location
     - `heading`
4. **Align.** Group units by location key. Within a group, pair units exactly first, then by similarity (≥ 0.8, word-level). Anything left over is `missing` (Hugo only) or `extra` (Astro only).
5. **Diff structure** separately from content. Build a canonical outline for each side: the heading tree, the tab structure, table column sets and row order, labels such as Instructions or Overview, and frontmatter keys. Diff the two outlines. Each difference becomes a `structure` finding naming the structural mapping it matched, for example `version-as-heading` or `overview-heading-absent`. Unmapped structural differences are listed as `structure-unmapped`.
6. **Classify** each finding:
   - `missing-in-astro` (high)
   - `changed` (medium; includes a word-level diff)
   - `structure` / `structure-unmapped` (needs a verdict; see below)
   - `extra-in-astro` (low)
   - `hugo-malformed` (e.g., an unfenced curl block)
   - `drift` (Astro matches the current spec bundle)

   Every finding carries a **verdict** field, so later work can fill it in: `unreviewed` (the default), `astro-wrong`, `hugo-wrong` (Hugo's HTML is wrong), `hugo-md-wrong` (only the converter output is wrong), `both-ok`, or `drift`. This plan only sets the verdicts the tool can derive (step 8 and spec-drift detection), and marks each as `auto`.
7. **Report.** JSON is the deliverable. Split it so later work can load one page at a time without reading everything:
   - `out/index.json`: run metadata (`dist` mtime, Hugo `.md` and HTML fetch dates, spec bundle version), and per-page counts by kind and verdict.
   - `out/pages/<path-slug>.json`: every finding for one page, with id, location key, kind, verdict (plus `auto: true` when tool-derived), Hugo `.md` text, Astro text, word-level diff for `changed`, and the HTML check result from step 8.
   - `out/structure.json`: one entry per distinct structural mapping across all pages, with counts, example pages, a Hugo vs. Astro snippet, and the finding ids it covers.

   Finding ids are stable across runs (hash of page, location key and kind), so later plans can key notes or verdicts to them.

   `out/summary.md` is a short human-readable view generated from the JSON (structural table, pages ranked by `missing-in-astro` and `changed` counts, Hugo-side problem counts). It exists for calibration reviews and to keep context small; it is not the deliverable.
8. **Adjudicate against the prod Hugo HTML.** This is a second stage, added after the `.md` diff is working. Fetch `https://docs.datadoghq.com/<path>/`. **Strip the page down at fetch time:** the prod HTML carries gigantic navs (site header, sidebar, API nav, footer) that would swamp both context and the coverage check. Cache only the content area (plus `<title>`), with `<script>`, `<style>`, `<svg>` and nav elements removed, as `.cache/hugo-html/<path>.html`. The raw page is never written to disk or read into context. Then extract the visible text with cheerio and normalize it the same way as the `.md`. It is used two ways:
   - **Arbiter:** for each content finding, look up both the Hugo-`.md` text and the Astro text in the HTML text.
     - HTML matches Astro, not the Hugo `.md`: auto-verdict `hugo-md-wrong`.
     - HTML matches the Hugo `.md`, not Astro: the finding is confirmed as `astro-wrong` (pending user review).
     - Neither matches: stays `unreviewed`.
   - **Coverage:** chunk the HTML text (paragraphs, table cells, code blocks) and flag any chunk found in neither the Hugo `.md` nor Astro's `.md`. These are `missing-in-astro` findings the converter hid. Chunks found in Astro but not the Hugo `.md` are converter omissions, counted only.

### Phases

Work is split into steps sized to fit one context window. **⏸ marks a compaction point.** At each one, Claude:

1. ticks the step in Status and writes a few lines in **Handoff notes** (what changed, what's next, any surprises),
2. stops and tells the user it's a good time to `/compact`.

After compaction, Claude resumes from Status and Handoff notes, not from memory.

To keep context small within a step: never `cat` whole `.md` pages, reports or HTML into context. Use `grep`, `head`, `sed -n`, or the summary file. Never `curl` a prod HTML page to stdout: its navs are huge. Pipe it through the stripper, or `grep -c` / `wc -c` only. Run the tool with `--page` on one page at a time while calibrating.

**Phase 1: calibrate** on `authentication/validate-api-key`, `dashboards/get-a-dashboard` (large schema), and `aws-integration/list-all-aws-integrations` (multi-version).

- 1a. Scaffold `qa/content/`, `pages.txt`, gitignore entries, and `fetchPages.ts` (cached prod `.md` + `dist` reads). Trim fixtures. ⏸
- 1b. `normalize.ts`: failing tests, then implementation. ⏸
- 1c. `extractUnits.ts` (location keys): failing tests, then implementation. ⏸
- 1d. `alignUnits.ts`, structure outline diff, `report.ts`, `compare.ts`. First run on `validate-api-key`. ⏸
- 1e. Tune normalization and mappings on the other two calibration pages until textual noise is gone and every structural difference is a named mapping. ⏸ **Review the report with the user.**

**Phase 2: HTML stage** (step 8).

- 2a. Find the content-area selector by inspecting the structure without dumping it (for example, list top-level element tags, ids and classes with byte sizes), then fetch, strip to the content area, and cache. Cheerio text extraction; chunking. ⏸
- 2b. Arbiter and coverage check; recalibrate on the same three pages. ⏸ **Review with the user.**

**Phase 3: full run.**

- 3a. Run all pages. Check the reports for tool problems only (crashes, empty pages, unmapped structure that is really noise), not for content verdicts. Fix the tool and rerun as needed. ⏸
- 3b. Hand off: point the user at `out/index.json` and `out/summary.md`, and list known limits of the reports. ⏸ **Done.**

### Tests

The QA tool is throwaway, but normalization and location keying are the parts most likely to silently hide real differences. Add small unit tests for `normalize.ts` and `extractUnits.ts` (red → green), using trimmed copies of the two sample pages as fixtures in `qa/content/fixtures/`.

### Open questions

- Table row order: treat as noise everywhere except ordered content (none seen yet in API pages)? **Default: noise.**
- Frontmatter: compare `title` only? **Default: title only.**
- Should `extra-in-astro` findings appear in the summary, or only in the JSON? **Default: summary shows counts only.**

## Status

- [x] Research and plan (this doc)
- [x] User supplied the page list (see Page list)
- [x] 1a scaffold + fetch
- [x] 1b normalize
- [x] 1c extractUnits
- [x] 1d align, structure, report, first run
- [x] 1e calibrate on all three pages (user review pending)
- [x] 2a HTML fetch + extraction
- [x] 2b arbiter + coverage (user review pending)
- [x] 3a full run, tool fixes
- [x] 3b hand off reports

### Handoff notes

(Claude appends a short entry at each ⏸.)

**1a (2026-10-16).**
- Added `qa/content/pages.txt` (14 paths) and `fetchPages.ts`. It reads Astro from `dist/client/<path>.md`, a flat file next to the page directory, not `<path>/index.md`. It caches Hugo `.md` in `.cache/hugo-md/<path>.md`, with a `.meta.json` that records the HTTP status and fetch time. The CLI is `node qa/content/fetchPages.ts [--refresh] [--page <path>]`, and it prints line counts only.
- Added `.cache/` and `out/` to `.gitignore`, and `.cache/`, `out/` and `fixtures/` to `.prettierignore`. Added `qa/**/*.test.ts` to `vitest.unit.config.ts`.
- Added the fixtures in `qa/content/fixtures/`, with a README. Each side has the full `authentication` page and a trimmed `validate-api-key` (Curl and Python examples only). All four parse with no Markdoc errors.
- `dist` was built at 2026-10-16T15:45Z, and Hugo was fetched at 2026-10-16T16:08Z. All 14 Hugo pages return 200. Screenboards is absent in Astro, as expected.
- Line counts differ most on `monitors/create-a-monitor` (Hugo 2383, Astro 1536) and `dashboards/get-a-dashboard` (Hugo 13944, Astro 12691). Look at these first in 1e.
- Next: 1b, `normalize.ts`. Write the failing tests against the fixtures first.


**1b (2026-10-16).**
- Added `qa/content/normalize.ts` with two exports. `normalizeCharacters` handles NFC, curly quotes, en and em dashes, nbsp and zero-width characters; step 8 reuses it on the HTML text. `normalizeMarkdown` applies that, then rewrites `http://localhost:4321` to the prod origin, strips `{% #id %}` annotations, strips a trailing ` →` in heading lines (including inside heading link text), and blanks the documentation index line.
- It deliberately leaves `{% tab %}`/`{% tabs %}` syntax, bold in table cells and heading levels alone. Those are structural, so `extractUnits` and the structure diff must handle them.
- Hard wrapping is not normalized here. `extractUnits` collapses whitespace per unit.
- `qa/content/normalize.test.ts` has 23 tests, all green. It includes noise-free and idempotence checks on all four fixtures, and checks that the `authentication` headings match after normalization.
- Next: 1c, `extractUnits.ts` (location keys and unit kinds). Write the failing tests against the `validate-api-key` fixtures first.

**1c (extractUnits):**

- `qa/content/extractUnits.ts` exports `extractUnits(normalizedMarkdown)`, `locationKeyOf(location)` and the `ContentUnit` / `UnitLocation` types. Input must already be normalized.
- Location key order is `operation / version / section / responseCode / panel / language / tab:<label>`, joined with `/`; empty is `page`. Two segments were added to the planned format:
  - `operation`: on category pages, each `##` heading that isn't a version scopes its content (`validate-api-key/endpoint-table`).
  - `tab:<label>`: any tab label the tool doesn't recognize, so its content is keyed rather than dropped.
- Headings: version and section headings (`overview`, `arguments`, `request`, `response`, `code-example`) are consumed as location and emit no unit. Empty headings (Hugo's `#####`) reset the language. Level ≥4 headings become `label` units (`form: "heading"`). A bold-only paragraph becomes a `label` (`form: "bold-paragraph"`), so Hugo's `#### Instructions` and Astro's `**Instructions**` align; the form difference is for the structure diff.
- Content with a version or operation but no section is keyed `overview`. A table whose first header is `Datadog site` is keyed `endpoint-table`.
- Language comes from a code-example tab label, otherwise from the first fence after the example starts (`bash`/`sh`/`shell`/`console` → `curl`).
- Schema rows (a header has `Field`): `field` is `Parent field.Field` when there is a parent; text is `field | other cells…`. Hugo's nested-field representation is still unconfirmed (1e, `get-a-dashboard`).
- Code: JSON fences are compared as `JSON.stringify(JSON.parse(…))`; others are whitespace-collapsed.
- Known behavior pinned by tests: Hugo's mangled curl block lands as languageless `prose` at `v1/code-example`, and Hugo's indented run command is merged into the Instructions paragraph (Markdoc has no indented code). Both will show as differences; flagging them `hugo-malformed` is a 1d/step-6 job.
- Not done here: frontmatter (title-only compare) and list nesting (an item's text includes any nested list's text). Handle in 1d if needed.
- Tests: `extractUnits.test.ts`, 37 green; whole `qa/content/` is 60 green.
- Next: 1d, `alignUnits.ts`, the structure outline diff, `report.ts` and `compare.ts`, then a first run on `validate-api-key`.

**1d (2026-10-16).**
- New files: `alignUnits.ts`, `diffStructure.ts`, `report.ts`, `compare.ts`, each with tests except `compare.ts`. `qa/content/` is 96 tests, all green. Run with `node qa/content/compare.ts [--refresh] [--page <path>]` under Node 24, not `tsx`. A full run replaces `out/`; a `--page` run writes only that page's JSON and prints its counts.
- `extractUnits.ts` now also exports `extractPage`, which returns `{ units, outline }`. The outline holds canonical strings for headings, tabs (the attribute syntax is dropped, so `title=` and `label=` are noise as planned), table headers, endpoint site order, labels with their form, and frontmatter keys other than `title`. The frontmatter title is a `prose` unit at the location `frontmatter`.
- Alignment works within a `kind@locationKey` group. It pairs exact text first, then schema rows by field, then by greedy word-LCS Dice ≥ 0.8; whatever is left is missing or extra. Two passes produce `hugo-malformed` findings with a `reason`:
  - `code-merged-into-paragraph`: Hugo prose equals Astro prose + " " + Astro code at the same location.
  - `unfenced-code`: languageless Hugo prose under code-example is paired with the most similar Astro code in a language Hugo has no units for, and carries `astroLocationKey`.
  - Both stay `unreviewed`. Step 8 can auto-set `hugo-md-wrong`.
- Structure: a mapping table in `diffStructure.ts` gives one `structure` finding per mapping per page, with location keys and distinct elements. Unexplained elements give one `structure-unmapped` finding per side and element. There are 8 mappings from research, plus `page-absent-in-astro` and `page-absent-in-hugo`, which `compare.ts` emits.
- Finding IDs are a sha1 of page, kind, location key, unit kind and an anchor, truncated to 12 hex characters. The anchor is the field, the mapping, or the text when there's no field. The plan said "page, location key and kind", but that collides within a location. Duplicates get `-2`, `-3` and so on.
- Result on `validate-api-key`: 1 `changed` (Astro's "Read-only."), 7 `hugo-malformed` (6 merged run commands and the curl block), 8 `structure` findings, nothing missing, extra or unmapped.
- A full-run crash check passes on all 14 pages in about 1 s. Leads for 1e:
  - `get-a-dashboard`: 13,470 schema rows at `v1/response/200/model` are missing in Astro, including top-level fields like `layout_type`. This is probably Hugo's nested-field representation or a field-path mismatch. Look at a few rows on each side with `grep`.
  - `monitors/create-a-monitor` has 671 missing. Category pages have many `structure-unmapped`, with `incidents` at 180.
  - `pages/dashboards__get-a-dashboard.json` is 5.8 MB and `summary.md` is 44 KB, so cap the unmapped list in the summary.
- Next: 1e. Calibrate on `get-a-dashboard` and `list-all-aws-integrations`, then review the report with the user.

**1e (2026-10-16).**
- The big counts were tool problems, not content:
  - **Table rows split by line breaks.** Astro's `.md` puts raw line breaks inside table cells, which ends the Markdown table, so later rows parse as paragraphs. New `repairTableRows.ts` rejoins those rows before parsing, and `extractPage` marks each one `malformed`. `malformedUnitFindings` reports each repaired row as `astro-malformed`, reason `table-cell-line-break`, and the row still aligns normally. The user chose this ("report + repair"); fixing the Astro `.md` is out of scope for this plan.
  - **Request heading.** Astro's `Request Body (required)` is now the request section, with mapping `request-heading-form`.
  - **Labels before the first section** are keyed `overview`, like their prose.
- New handling for real form differences, all reported, none silent:
  - **Operation badges.** The badge is stripped from the operation's location key and heading unit and recorded as outline `badge "<name>"`, so a missing badge is still unmapped. The heading's own form is mapping `operation-badge-form`.
  - **Legacy examples.** Hugo's legacy examples are rekeyed by their `code-lang=<lang>-legacy` install link to `<lang> [legacy]`.
  - **Arguments table.** Mapping `arguments-table-header`.
  - **Text forms.** New `textForms.ts` rewrites Hugo's phrasing into Astro's before alignment: `enum-values-form`, `deprecated-marker-form`, `oneof-array-type-spacing`. Each form applied on a page is one `structure` finding with its locations. Units keep `sourceText`, and findings quote it, so 2b's HTML lookup sees raw text.
  - **Paragraph splits.** A Hugo paragraph that equals consecutive Astro paragraphs joined is reported as `paragraph-split`. A near match is reported as `changed`, with the Astro paragraphs joined by a blank line.
- Summary: added an Astro malformed column, and the unmapped list is capped at 50.
- Tests: 130 green in `qa/content/`. A full run takes about 1.5 s; `out/pages` is 1.9 MB and `summary.md` 6 KB.
- Calibration pages after tuning:
  - `validate-api-key`: unchanged.
  - `get-a-dashboard`: 1,421 missing, 920 changed, 0 unmapped.
    - **Missing:** Astro leaves out some nested schemas, for example `query`'s children under `<data_source=product_analytics_extended>`.
    - **Changed:** larger enum lists in Astro (likely spec drift), Astro-only `Default:` sentences, and 184 rows where Hugo says "Deprecated - Use queries and formulas instead." and Astro gives the field's own description.
  - `list-all-aws-integrations`: 3 missing, 7 changed, 0 unmapped. The remaining findings are `Read-only.` and `Default:` additions, the response examples, and the v1 overview's added sentence.
- Leads for 3a:
  - `usage-metering/get-hourly-usage-for-lambda`: Hugo has `Model`/`Example` response tabs that Astro lacks.
  - `create-a-monitor`: a `heading h5 ""` at `v1/request/example`.
  - `heading h1 ""` on two pages: Hugo's mangled curl comment.
  - `incidents`: one operation is missing its preview badge in Astro.
- Next: the user reviews the 1e report, then 2a.
- **Change types (after the first 1e review).** The user asked for changes to be grouped by type. New `changeTypes.ts` tags each `changed` finding with `changeTypes`: any of `astro-adds-default`, `astro-adds-read-only`, `deprecated-marker-differs` and `enum-values-differ`, plus `other` if something else still differs.
  - Each type removes its part of the difference from the texts the diff was built from, so the tagging runs after text forms.
  - `out/changeTypes.json` groups findings by combination of types, with count, pages, one example and the finding IDs. `summary.md` has a Change types table.
  - Full run: of 1,041 changed findings, 664 are explained entirely by these types. Tests: 139 green.
- The user asked for an example of text forms, and one was given: Hugo's enum row next to Astro's. They haven't yet confirmed the text-form approach.

**2a (2026-10-16).**
- Continued after the 1e review without an explicit answer on text forms, so they stay as built.
- **Content area.** On prod, `div.main-api` holds the content: 43 KiB of the 1.08 MB `validate-api-key` page. New `extractHtml.ts` `stripToContent` keeps `<head><title>` plus that `div` and removes the chrome inside it: scripts, styles, svg, pictures and images, `nav`, `.api-toolbar`, `#page-copy-btn`, `.expand-all` and `.js-copy-button`. It removes chrome by selector, not by tag, because some buttons hold real text, such as the code example title in `h5 > button`. It throws if the content area is missing.
- **Fetching.** `fetchPages.ts` `loadHugoHtml` fetches `https://docs.datadoghq.com/<path>/` with Node `fetch`, which decompresses. It strips the page in memory and caches only the result, at `.cache/hugo-html/<path>.html` with `.meta.json`. `--refresh` refetches the HTML too. The fetcher CLI now prints each page's HTML size and chunk counts.
- **Chunks.** `extractHtmlChunks(strippedHtml)` returns `{kind, text, context, cells?, loose?}`. The text is normalized with `normalizeCharacters` and whitespace-collapsed.
  - `heading`: h1–h6.
  - `paragraph`: `p`.
  - `listItem`: an `li` without its nested lists, which are chunked separately.
  - `tableRow`: a schema `div.table-row` built from its `.column` cells, or a `tr`. The row text is the cells joined with ` | `. Schema headers (`.table-header`) are skipped.
  - `code`: a `pre`. Only the `us` region span is kept, because Hugo's `.md` shows only `datadoghq.com` in run commands.
  - `endpoint`: one chunk per `data-region` span in `p.api-url-info`, as `GET <url>`, with the region as the context.
  - `tab`: the links in a `ul.nav`, such as Model/Example, response codes and languages.
  - `loose: true` paragraphs: bare text and inline runs directly in a container. One such paragraph exists, on `create-a-monitor`: "This endpoint requires any of the following permissions:", followed by bare `li`s.
- **Context.** A chunk's context is its ancestor `.tab-pane` ids plus the nearest `data-code-lang-block`, joined with ` > `. For example, `get-a-dashboard-v1 > GetDashboard-200-v1 > GetDashboard-200-model`.
- **Full fetch.** All 14 pages return 200, in about 21 s. The cache is 7.3 MB, of which `get-a-dashboard` is 5.9 MB. That page has 13,490 rows, all with 3 cells, so nested schema rows don't nest in the DOM. Screenboards' content area is empty, which matches its 7-line `.md`.
- **For 2b:**
  - Hugo's HTML schema rows give the bare field name only, with nesting expressed in the DOM. Matching rows to Astro's `Parent field.Field` may need the parent path from the DOM.
  - The HTML shows every region's endpoint, as the `.md` table does.
  - Use `sourceText` for lookups.
- Tests: `extractHtml.test.ts` has 14 tests; `qa/content/` has 153, all green.
- Next: 2b, the arbiter and coverage check, then review with the user.

**2b (2026-10-16).**
- **Arbiter.** New `adjudicateHtml.ts` `adjudicate(findings, chunks)` gives every content finding an `htmlCheck` with a `result`, plus the HTML chunk compared (`htmlText`, truncated to 300 characters, and `htmlContext`).
  - `matches-astro` sets the auto verdict `hugo-md-wrong`. `matches-hugo-md` sets `astro-wrong`. Both carry `auto: true`.
  - `matches-neither`, `not-found`, `not-applicable` and `ambiguous` leave the verdict `unreviewed`.
  - `ambiguous` is new, not in the plan. It means different HTML chunks match different sides. Every candidate is judged, so the verdict can't depend on which same-field row happened to be closest.
  - Texts are compared as lowercase word tokens. Schema rows are compared without their field cell.
  - Candidates:
    - Schema rows match by field path, falling back to the bare field. They never match by description alone.
    - Other units match by token Dice of at least 0.5 against HTML chunks of compatible kinds.
  - Rules by finding kind:
    - `changed`: the whole text equals the chunk, or a side matches when the chunk has all its own token runs and none of the other side's. The runs come from a token-level re-diff of the post-text-form texts, and may have up to 2 extra tokens between words, to absorb Hugo's "enum" in "Allowed enum values".
    - `missing` / `extra`: only presence counts, so a missing finding can only become `astro-wrong` and an extra one `hugo-md-wrong`.
    - `paragraph-split`: one HTML paragraph means `matches-hugo-md`; separate paragraphs mean `matches-astro`.
    - `hugo-malformed`: the HTML has the code fenced and Astro's text ends with it.
    - Links and `astro-malformed`: `not-applicable`.
- **Coverage.** `checkCoverage` looks up every non-tab chunk in each side. Schema rows count by field. Anything else counts by token run in the units' `text`, `sourceText` and outline elements; the outline holds section headings.
  - A chunk found in neither `.md` becomes `missing-in-astro` with `foundBy: "html-coverage"`, `htmlText`, and location `html:<context>`.
  - Per-page counts are in `hugoHtml.coverage`.
  - **Full run: 0 chunks in neither `.md` on every page.** 2 chunks are in Astro only (`create-a-monitor`).
- **Tool fixes found while calibrating:**
  - `extractHtml`:
    - Block elements inside a cell are separated by spaces. The old text read "accountdefault: account".
    - `<br>` in code becomes a line break.
    - Heading `.badge`s are dropped; the outline diff compares badges.
    - `.enum-summary` ("Show N more") is chrome. The hidden enum values stay.
    - Chrome is removed again at extraction time, so older caches extract the same way.
    - Schema rows get `field`, as `parent.field` from the `.isNested`/`.hasChildData` DOM, which matches the `.md` field path on nearly every row.
  - `extractUnits`: a list item's nested lists are now separate units. Before, they were glued into the parent's text with no spaces.
- **Reports.**
  - `counts.byHtmlCheck`.
  - `hugoHtml` on each page: source, status, fetch time and coverage.
  - In the index: `hugoHtmlFetchedAt`, plus per-page `hugoHtmlStatus` and `coverage`.
  - `summary.md` has an HTML check table.
  - Coverage finding IDs anchor on `htmlText`.
- **Full-run tallies** (all pages):
  - `changed`: 423 `matches-astro`, 373 `matches-hugo-md`, 197 `ambiguous`, 49 `matches-neither`.
  - `missing-in-astro`: 1,430 `matches-hugo-md`.
  - `hugo-malformed`: 57 `matches-astro`.
  - `paragraph-split`: 6 `matches-hugo-md`.
- **What the verdicts showed on `get-a-dashboard`:**
  - Hugo's HTML hides long enum lists behind "Show N more", and Hugo's `.md` drops the hidden values. All 297 `enum-values-differ` rows are `hugo-md-wrong`.
  - Astro's `Default:` sentences are `hugo-md-wrong` (215): the HTML shows `default: x`.
  - `Read-only.` and 241 `deprecated-marker-differs` rows are `astro-wrong`. In those rows, Astro gives the field's description where Hugo says "Deprecated - Use queries and formulas instead."
  - Some `other` rows where Astro's description is newer are `astro-wrong`, but they are probably spec drift.
- **Open for review:**
  - **Drift.** Spec-drift detection (plan step 6) isn't built, so spec drift currently shows up as `astro-wrong (auto)`. It needs the spec bundle per field.
  - **Curl examples.** The curl `hugo-malformed` findings are `matches-neither`. The HTML has Hugo's curl, fenced, while Astro's curl differs (an added `DD_SITE` export). That content difference sits inside a malformed finding instead of a `changed` one.
- Tests: 184 green in `qa/content/`. `tsc` is clean for `qa/content`. A full run takes about 3 s, and `out/pages` is 2.6 MB.
- **2b review (user):** "Bias toward reporting a change when it's ambiguous. I'd rather investigate false alarms than miss something." Applied:
  - `ambiguous` now sets `astro-wrong` (auto). The result stays `ambiguous`, so reviewers can tell it apart.
  - Clearing Astro (`matches-astro` → `hugo-md-wrong`) needs strict evidence:
    - In `changed`, Astro-only runs must appear contiguously. Only Hugo-only runs may have gaps.
    - An `extra-in-astro` finding clears only when the chunk equals the text exactly.
  - `missing-in-astro` still counts containment, because that flags Astro.
  - Coverage token runs can't span two units: units are joined with ` | `.
  - When the HTML fences a `hugo-malformed` finding's code but Astro's differs, a separate `changed` code finding is emitted (`matches-hugo-md`, `astro-wrong`, tagged with change types). This catches the curl examples where Astro adds `DD_SITE`.
  - Drift: no detection that would excuse Astro. Spec drift stays reported as `astro-wrong`.
  - Result: 12 `changed` findings moved from `hugo-md-wrong` to `astro-wrong`, plus 6 new code findings. Coverage now flags 4 chunks: POST curl examples starting with a `## default` comment, which Hugo's `.md` turned into a heading and split. These are a 3a lead and should probably be classified `hugo-malformed`.
  - Tests: 188 green.
- Next: 3a.

**3a (2026-10-16).**
- Full run: all 14 pages, no crashes, about 3 s. `screenboards` has no Astro page (`page-absent-in-astro`), so it has no HTML check.
- **Broken curl blocks.** Hugo's `.md` breaks POST curl blocks at the `## default` comment: an empty `#` line parses as an h1, splitting each block into two prose fragments. Extraction now rejoins the fragments around a comment-line heading into one languageless unit. The rejoined text equals prod's curl.
  - `pairUnfencedCode` reports a Hugo block with no Astro example left as `hugo-malformed` with no Astro side. The arbiter turns it into `missing-in-astro` code (`astro-wrong`).
  - Unfenced code falls back to the most similar HTML code block when no block is a suffix of it.
  - Result: each page gets one `changed` curl finding (`astro-wrong`: Astro adds `DD_SITE` and reorders headers). `create-a-monitor` also gets 2 `missing-in-astro` curls, because prod repeats the same curl for all 3 request examples. The 4 coverage-only chunks and the `not-found` fragments are gone.
- **Structure mappings.** `curl-comment-heading` names the empty h1. `request-example-title` names the empty `#####` before each request example (prod's titles are blank too).
- **Unmapped structure left, all real content:**
  - `incidents`: prod shows `deprecated` and `preview` badges on Create a page from an incident; Astro shows only `(deprecated)`.
  - `get-hourly-usage-for-lambda`: Astro's responses have only the status text, with no Model or Example tabs.
- **Extra-in-Astro verdicts (bias).** An `extra-in-astro` finding is now `astro-wrong` unless the HTML has Astro's exact text, because the HTML then agrees with Hugo's `.md` in lacking it. The result stays `not-found` or `matches-neither`, so these can be told apart. `missing-in-astro` with `not-found` stays `unreviewed`, because clearing Astro needs positive evidence.
- **Tallies** (non-structure findings):
  - `missing-in-astro`: 1,432 `matches-hugo-md`, 95 `not-applicable` (links), 1 `matches-neither`.
  - `changed`: 411 `matches-astro`, 393 `matches-hugo-md`, 197 `ambiguous`, 49 `matches-neither`.
  - `extra-in-astro`: 19 `not-found` and 14 `matches-neither` (both `astro-wrong`), 4 `matches-astro`, 9 `not-applicable`.
  - `hugo-malformed`: 57 `matches-astro`, plus 10 `matches-neither`, each with its companion finding.
  - `astro-malformed`: 113. `paragraph-split`: 6 `matches-hugo-md`.
- Tests: 196 green in `qa/content/`; `tsc` is clean.
- Next: 3b.

**3b (2026-10-16).**
- Reports: `qa/content/out/index.json` (authoritative, per-page counts and HTML status), `out/pages/*.json` (findings), `out/summary.md` (human overview), `out/changeTypes.json` (findings grouped by change type), `out/structure.json` (outline diffs). Regenerate with `node qa/content/compare.ts`; add `--refresh` to refetch Hugo's `.md` and prod HTML.
- Full regression: `yarn test-ai` green (1,715 headless, 263 browser, 5 skipped). The prod build was not run.
- **Known limits.**
  - Verdicts are heuristic and lean toward flagging Astro: `ambiguous` and Astro-only text the HTML lacks become `astro-wrong (auto)`. Expect false alarms; the `htmlCheck.result` field tells them apart.
  - Spec drift isn't detected. Where the bundle spec is newer than prod, the difference is reported as `astro-wrong`.
  - Left `unreviewed`: `matches-neither`, `not-applicable` (links, `astro-malformed`), and Hugo-only text prod doesn't show.
  - `astro-malformed` findings (113, all line breaks inside table cells that break Astro's `.md` tables) aren't checked against the HTML.
  - Coverage "only in Astro" chunks are counted, not listed as findings.
  - Noise rules: table row order is ignored, and only frontmatter `title` is compared.
  - Prod HTML is a snapshot from its fetch time (`hugoHtmlFetchedAt`).
  - Content only: layout, styling and interactivity aren't compared.
  - 14 pages only; `screenboards` has no Astro page.

