# API docs QA script

## Prompt

Recently, we implemented API docs in Astro (see [the plan for the page content](./03_create_api_docs_pages.md) and [the plan for the containing shell](./02_create_api_docs_shell.md)). But they aren't perfect, so we need to programmatically assess and fix them.

The Hugo version and the Astro version do not use the exact same HTML, nor do they need to. So to compare them, we should just verify that the visible verbiage within the page content area of each page is the same, and fix any discrepancies by updating the Astro build.

This is a QA script that we're using for development purposes, not a build step or something we will run automatically. Organize it so it's easy to delete later.

Write a plan for creating this QA tool in the section below.

## Claude's plan

### Overview

A single self-contained script in `astro/qa/` that compares the built Hugo and Astro API pages by extracting visible text from each page's content area, diffing them, and producing a report. The entire `qa/` directory can be deleted when no longer needed.

### File organization

```
astro/qa/
├── compare.ts        ← Main script: orchestrates extraction, diffing, and reporting
├── extract.ts        ← HTML → normalized text extraction for both Hugo and Astro pages
├── diff.ts           ← Text comparison utilities (word-level diff, similarity score)
├── report.ts         ← Output formatting (console summary + optional JSON report)
├── tsconfig.json     ← Standalone TS config (extends astro's, adds ts-node settings)
└── README.md         ← One-paragraph usage instructions
```

No new npm dependencies — use `cheerio` (already available via Astro's Markdoc pipeline) or, if it isn't available, add it as a devDependency in `astro/package.json`. Add a run script to `astro/package.json`:

```json
"qa:compare": "npx tsx qa/compare.ts"
```

### Content area selectors

The two sites use different HTML structures. The script targets only the main content area (no nav, header, footer, toolbars):

| Site  | Content area selector | Endpoint selector |
|-------|----------------------|-------------------|
| Hugo  | `.main-api` (after removing `.api-toolbar` children) | `.row.endpoint` |
| Astro | `main.api-main` (after removing `.api-toolbar` children) | `section[data-testid="api-endpoint"]` |

### Text extraction strategy (`extract.ts`)

For each HTML file:

1. **Parse** the HTML with cheerio.
2. **Select** the content area using the site-appropriate selector.
3. **Remove noise elements** before extracting text:
   - `<script>`, `<style>`, `<noscript>` tags
   - `.api-toolbar` (region selector, breadcrumbs)
   - Hidden elements: `[aria-hidden="true"]`, `[style*="display: none"]`
   - SVG icons (they add invisible text or labels)
4. **Extract text**: Call `.text()` on the content area.
5. **Normalize**:
   - Collapse all whitespace (newlines, tabs, multiple spaces) to single spaces
   - Trim leading/trailing whitespace
   - Normalize Unicode (NFC)
   - Strip zero-width characters

Export two functions:
- `extractPageText(htmlPath, site: 'hugo' | 'astro'): string` — full page text
- `extractEndpointTexts(htmlPath, site: 'hugo' | 'astro'): Map<string, string>` — text keyed by endpoint identifier (operation heading text, lowercased)

### Endpoint matching

Hugo endpoints don't have `data-operation-id` attributes, so we can't match by operationId directly. Instead, match endpoints between Hugo and Astro by their **heading text** (the `<h2>` or `<h3>` endpoint title, lowercased and trimmed). This is the user-visible name and should be identical between the two sites if content parity holds.

When headings don't match 1:1 (e.g., an endpoint exists in one site but not the other), report these as "unmatched endpoints."

### Comparison approach (`diff.ts`)

Two levels of comparison:

**Level 1 — Page-level quick check:**
- Compare the full extracted text of each page (Hugo vs. Astro).
- Compute a similarity score (e.g., Levenshtein ratio or simpler: shared-word-count / total-word-count).
- Pages with 100% match are marked as passing. Pages below threshold are flagged for endpoint-level drill-down.

**Level 2 — Endpoint-level drill-down:**
For flagged pages, compare each matched endpoint pair:
- Split both texts into words.
- Find words present in Hugo but missing from Astro ("missing words") and vice versa ("extra words").
- Report a concise diff showing the first few differences per endpoint.

Keep the diffing simple — no need for a full line-by-line diff algorithm. Word-set comparison is enough to identify what content is missing or extra. If more detail is needed later, we can add a proper diff library.

### Reporting (`report.ts`)

**Console output** (default):

```
API Docs QA Report
==================

Pages compared: 125
Pages only in Hugo: 11  (action-connection, cases, ...)
Pages only in Astro: 0

Matching pages: 87 / 125 (69.6%)

Mismatched pages:
  dashboards (92.3% similar)
    - "create-a-dashboard": Missing words: "Note:", "dashboard_lists"
    - "delete-a-dashboard": Extra words: "Deprecated"
  logs (88.1% similar)
    ...

Full details written to: qa/report.json
```

**JSON report** (optional, written to `qa/report.json`):
```json
{
  "timestamp": "...",
  "summary": { "total": 125, "matched": 87, "mismatched": 38, "hugoOnly": [...], "astroOnly": [...] },
  "pages": [
    {
      "slug": "dashboards",
      "similarity": 0.923,
      "status": "mismatch",
      "endpoints": [
        { "heading": "create-a-dashboard", "similarity": 0.95, "missingWords": [...], "extraWords": [...] }
      ]
    }
  ]
}
```

### Assumptions and trade-offs

- **Pre-built HTML required**: Both `public/api/latest/` (Hugo) and `astro/dist/api/latest/` (Astro) must already be built before running the script. The script reads static HTML files, it does not run either build.
- **Hidden tab content is included**: Both sites render all tab content (inactive response tabs, code example tabs) in the DOM for SEO. The script extracts all of it. This is correct because both sites should have the same hidden content too.
- **Code examples are included**: Code block text is part of the visible verbiage. Whitespace normalization should handle minor formatting differences, but if code example diffs are too noisy, we can add a flag to exclude `<pre>` / `<code>` elements.
- **Region-specific URLs are excluded**: The `.api-toolbar` is stripped, and region URL patterns (which differ by `data-region`) are either hidden or in the toolbar. If region URLs within endpoint content cause noise, add them to the noise-removal step.
- **No browser rendering**: We use cheerio (server-side HTML parsing), not a headless browser. This means we can't evaluate CSS `display: none` rules from external stylesheets — only inline styles and `aria-hidden`. This is acceptable since both sites render all content in the DOM.

### Running the tool

```bash
# 1. Build both sites (if not already built)
#    Hugo: from repo root
yarn run build:hugo
#    Astro: from astro/
cd astro && npm run build

# 2. Run the comparison
npm run qa:compare

# 3. (Optional) Run with flags
npm run qa:compare -- --json          # Write JSON report
npm run qa:compare -- --page logs     # Compare only one page
npm run qa:compare -- --no-code       # Exclude code blocks from comparison
```

### Implementation order

1. **Create `astro/qa/` directory** and `tsconfig.json`.
2. **Implement `extract.ts`** — HTML parsing and text extraction. Test manually against one Hugo and one Astro page to verify selectors are correct.
3. **Implement `diff.ts`** — word-level comparison and similarity scoring.
4. **Implement `report.ts`** — console and JSON output formatting.
5. **Implement `compare.ts`** — main script that ties it all together: discovers pages, runs extraction, diffing, and reporting.
6. **Add `qa:compare` script** to `astro/package.json`.
7. **Run and iterate** — execute the tool, review the report, and fix Astro build discrepancies one category at a time. Each fix-and-rerun cycle should reduce the mismatch count.

### What's out of scope

- **Automated fixing**: The script reports discrepancies; fixes are made manually to the Astro data pipeline and components.
- **Visual/layout comparison**: We compare text only, not CSS styling, spacing, or visual layout.
- **Performance benchmarking**: No build-time or page-size comparisons.
- **CI integration**: This is a dev tool, not a CI step.

