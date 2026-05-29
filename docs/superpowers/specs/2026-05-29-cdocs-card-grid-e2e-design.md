# Cdocs Card Grid E2E Tests + Package Bump Design

**Date:** 2026-05-29
**Branch:** heston/cdocs-link-cards

## Context

PR #282 in `corp-node-packages` adds `card-grid` and `image-card` as Markdoc tags to `cdocs-hugo-integration` (v4.3.0-rc1). The documentation repo is currently pinned to v4.2.0. A Hugo-rendered e2e spec already exists at `e2e/components/card-grid/card-grid.spec.ts` with 13 tests covering rendering, tooltips, responsive behavior, and hover. No cdocs equivalent exists yet.

## Goal

Bump `cdocs-hugo-integration` to v4.3.0-rc1 and add a full-mirror cdocs e2e spec so the Markdoc rendering path is verified end-to-end against the same behavioral surface as the Hugo shortcode tests.

## What We're Building

### 1. Package bump

**File:** `package.json`

Change the `cdocs-hugo-integration` S3 URL from `v4.2.0` to `v4.3.0-rc1`. The rc→stable bump will follow in a separate commit once PR #282 merges.

### 2. Fixture page

**File:** `content/en/dd_e2e/cdocs/components/card_grid.mdoc.md`

Markdoc version of the existing `content/en/dd_e2e/card_grid.md`, with the same 7 sections in the same order:

| Section | Index | Content |
|---------|-------|---------|
| Image grid (4 cards, default `card_width`) | 0 | 4 image cards, default settings |
| Image grid (7 cards, last row centering) | 1 | 7 image cards to test grid overflow centering |
| Text-only grid | 2 | 3 cards with `title`, one with `subtitle`, no `src` |
| Custom `card_width` (200px) | 3 | 3 image cards with `card_width="200px"` |
| Custom `image_width` | 4 | 3 image cards with `image_width="50"` |
| Single card | 5 | 1 image card |
| Tooltips | 6 | 2 image cards with `tooltip` attribute |

Markdoc syntax uses `{% card-grid %}` / `{% image-card ... /%}` / `{% /card-grid %}`.

### 3. E2e spec

**File:** `e2e/components/card-grid/cdocs-card-grid.spec.ts`

Full mirror of `e2e/components/card-grid/card-grid.spec.ts`, with:
- `PAGE_URL` pointing to `/dd_e2e/cdocs/components/card_grid/`
- Identical `SECTION` index map, selectors, and all 13 tests
- Screenshot baseline named `cdocs-card-grid-initial.png` (distinct from the Hugo `card-grid-initial.png`)

Lives alongside the existing Hugo spec in the same directory.

### 4. Screenshot baseline

**Directory:** `e2e/components/card-grid/cdocs-card-grid.spec.ts-snapshots/`

Generated on first run with `--update-snapshots`. Committed to the branch so CI doesn't fail on first pass.

## File Map

| File | Action |
|------|--------|
| `package.json` | Modify — bump `cdocs-hugo-integration` to `v4.3.0-rc1` |
| `content/en/dd_e2e/cdocs/components/card_grid.mdoc.md` | Create — Markdoc fixture page |
| `e2e/components/card-grid/cdocs-card-grid.spec.ts` | Create — full-mirror Playwright spec |
| `e2e/components/card-grid/cdocs-card-grid.spec.ts-snapshots/cdocs-card-grid-initial.png` | Create — screenshot baseline (generated) |

## Out of Scope

- Updating the Hugo `card-grid.spec.ts` or its fixture — those are already correct
- The rc→stable bump — follow-up after PR #282 merges
- CSS or rendering changes — this is tests only
