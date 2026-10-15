# Authorization scopes table (WEB-10354)

## Prompt

Build the authorization scopes table on the Astro scopes page (`/api/latest/scopes/`), the equivalent of Hugo's `api-scopes` shortcode, so that the page matches the live Hugo page and the "scope" links on endpoint pages land on the right section.

## Research

### What Hugo does (`hugo/layouts/shortcodes/api-scopes.html`)

1. **Collect.** It walks v1 then v2, `paths` (Go map, so path keys in alphabetical order), then each method (also alphabetical). For every operation with tags and an `AuthZ` security requirement, each scope records:
   - `tags`: the operation's **first** tag, appended if not already present (insertion order).
   - `endpoints`: `{ summary, url: /api/latest/<tag|urlize>/#<summary|urlize> }`, appended every time with **no dedupe**.
   - `desc`: `components.securitySchemes.AuthZ.flows.authorizationCode.scopes[scope]` from the spec of the *current* operation. The last write wins, so v2 overrides v1.
2. **Group.** For each scope (alphabetical), it takes the union of its own tags with the tags of every *other* scope whose tag list intersects its own but isn't identical (`ne` on slices, so order matters). This is one hop, not a transitive closure. The tags are sorted, and the group key is `delimit tags ", "`. The group's scopes are `tags2Scopes[tag]` for each tag in sorted order, `uniq`'d. Identical keys collapse.
3. **Render.** It loops over groups by key (alphabetical). Each group gets an `<h4>{key}</h4>`, then one `<a id="slug">` per tag, then a three-column table (Scope name / Description / Endpoints that require this scope).

### Findings that affect the design

- **Hugo emits duplicate IDs.** Because the grouping is one hop, one tag can appear in several groups. The local Hugo build has 40 headings and 125 anchors for about 92 tags, for example `organizations` ×6 and `domain-allowlist` ×6. Browsers resolve `#organizations` to the first one.
- **The slug rules disagree for camelCase tags.** Hugo's anchor is `humanize | lower`, with spaces changed to `-`, and `humanize` splits camelCase. Astro's `oauthScopesAnchor` is `toSlug(primaryTag)`. The tags affected in the current spec:
  - `CI Visibility GitHub Accounts`: Hugo `ci-visibility-git-hub-accounts`, Astro `ci-visibility-github-accounts`
  - `High Availability MultiRegion`: Hugo `high-availability-multi-region`, Astro `high-availability-multiregion`

  Because Astro builds both the link and the anchor, they agree internally. Inbound external links that use the Hugo spelling would break.
- **Endpoint hrefs in Hugo use `urlize` on the raw tag**, which ignores Astro's `SLUG_OVERRIDES` (`case-management` → `cases`, and so on). Astro should link to its real routes: `toCategorySlug(tag)` plus `toSlug(summary)`, the same as `getOpSlug`.
- This branch is based on `heston/WEB-9156`, which ported the page prose. Line 19 of `scopes.mdoc` shows the raw `{{< api-scopes >}}` text, which is replaced with `{% api-scopes /%}`.
- Only the English scopes page exists. Endpoint links already go through `localizedHref`.
- `getOpenApiDocument()` is synchronous and memoized, so a scopes builder can be sync. That matters because plaintext twin adapters (`src/lib/plaintext/twinTransform.ts`) are sync.
- The unit fixtures (`tests/fixtures/api/v{1,2}/partial_spec.yaml`) contain `AuthZ` (71 and 50 hits), which is enough to drive unit tests. Edit them if a test needs an overlapping-group or camelCase-tag case.
- `tableMd()` in `@lib/plaintext/helpers` already renders Markdown tables for twins.

## Design

### 1. `src/lib/api/scopesBuilder.ts` (new, pure, memoized)

```ts
export interface ScopeEndpoint { summary: string; href: string } // href is unlocalized: /api/latest/<cat>/#<op>
export interface ScopeRow { name: string; description: string; endpoints: ScopeEndpoint[] }
export interface ScopeGroup {
  heading: string;          // "Monitors, Organizations"
  anchors: string[];        // tag anchors (plus Hugo aliases) emitted under this heading
  scopes: ScopeRow[];
}
export function getScopeGroupsView(): ScopeGroup[];
```

The top-level driver reads as narrative:

```ts
const scopesByName = collectScopesFromSpecs();       // step 1
const groups = groupScopesByOverlappingTags(scopesByName); // step 2, Hugo-faithful
return assignTagAnchorsToFirstGroup(groups);         // step 3
```

- **Collect** in Hugo's order: versions v1 then v2, sorted path keys excluding `x-*`, sorted method keys. The first tag only, using `extractOauthScopes()` for the scope list. Description comes from the current spec's `AuthZ` flow scopes, last write wins.
- **Endpoints:** dedupe by href. Hugo lists a v1/v2 pair that shares a summary twice, but Astro collapses them into one logical operation, so a second identical link adds nothing. Diff the result against the live page to confirm.
- **Group:** port Hugo's algorithm literally, including the one-hop union, order-sensitive tag-list equality, sorted keys, and `tags2Scopes` order. Don't "fix" it into a transitive closure, because the headings must match the live page.
- **Anchor slug:** `toSlug(tag)`, the same function that `viewsBuilder` uses for `oauthScopesAnchor`. A shared `toScopeAnchor(tag)` helper should be used by both, so the two can't drift.
- **Anchor dedupe:** emit each tag's anchor only under the **first** group heading that contains it. That's the same target a browser picks on the Hugo page, and the HTML stays valid.

### 2. `src/components/ApiScopesTable/` (new, static Astro)

- `ApiScopesTable.astro` and `ApiScopesTable.module.css` (BEM: `api-scopes-table`, `api-scopes-table__heading`, `__table`, `__scope-name`, `__description`, `__endpoints`, and so on, with design tokens only).
- A real `<table>` with a `<thead>`, not Hugo's div grid. It needs explicit `font-weight` on the text (see the body-weight-200 gotcha).
- Group headings are `<h3>`. Hugo uses `<h4>` directly under an `<h2>`, which skips a level. Match Hugo's visual size with CSS.
- Each anchor is an `id` on an empty `<span>` before the heading, for parity with Hugo's markup, or on the heading itself when the group has exactly one anchor.
- Endpoint links go through `localizedHref`.
- i18n: there are no existing keys for the three column headers, so the English strings are hardcoded with `TODO`s, as CLAUDE.md requires.

### 3. Markdoc tag `{% api-scopes /%}`

- Add it to `markdoc.schema.mjs` (no attributes, self-closing) and `markdoc.config.mjs` (`render: component("./src/components/ApiScopesTable/ApiScopesTable.astro")`).
- Replace `{{< api-scopes >}}` in `scopes.mdoc` with `{% api-scopes /%}`.

### 4. Plaintext twin

- `src/components/ApiScopesTable/plaintext/ApiScopesTable.ts` exports `apiScopesTableNodes(groups, site)`. Each group becomes a heading followed by `tableMd(["Scope name", "Description", "Endpoints"], rows)`, with the endpoints `<br>`-joined Markdown links built through `mdLinkHref` and `rewriteInternalDocLink`, matching how `CardGrid` builds its links.
- Register an `"api-scopes"` adapter in `twinTransform.ts` that calls `getScopeGroupsView()`.

## Tests (red first)

Unit tests (`yarn test:headless-ai <path>`):

- `scopesBuilder.unit.test.ts`, against fixtures:
  - Collection: first tag only, endpoints in Hugo order, deduped by href, v2 description overrides v1.
  - Grouping: one hop rather than transitive. The test uses a fixture with A∩B and B∩C but no A∩C. It checks that identical tag lists collapse and that groups and scopes are ordered alphabetically.
  - Anchors: each tag appears exactly once across all groups, under the first group that contains it. `toScopeAnchor` handles special characters (`CI Visibility GitHub Accounts`, `&`, `/`, leading or trailing punctuation).
  - Hugo aliases: `CI Visibility GitHub Accounts` also gets `ci-visibility-git-hub-accounts`, `High Availability MultiRegion` also gets `high-availability-multi-region`, and tags whose slugs already match (for example `CI Visibility Tests`) get no duplicate alias.
  - Endpoint hrefs use `toCategorySlug`, so an overridden category links to its override slug.
  - A snapshot of the full view for the fixture.
- Consistency: every operation view with `oauthScopesAnchor` has a matching anchor in `getScopeGroupsView()`. This is the "links land on the right section" criterion. Run it against the fixture in the unit suite, and against the real spec in the integration config if one exists for views.
- Plaintext twin unit test, plus a `twinTransform` test for `{% api-scopes /%}`.
- An `ApiScopesTable` render unit test covering BEM classes, the header row, and anchor IDs.

Browser tests (`yarn test:browser-ai <file>`), only what unit tests can't cover:

- Go to `/api/latest/scopes/#<anchor>` and check that the target heading is scrolled into view.
- From one endpoint page, click the "scope" link and check that the URL lands on the matching section.

## Parity check (manual, at the end)

Write a throwaway script, not committed, that diffs the Astro headings, anchors, scope rows and endpoint summaries against `hugo/public/api/latest/scopes/index.html` (built Oct 14) or the live page. The expected differences:

- Duplicate anchors are removed.
- Endpoint duplicates are deduped.
- Hrefs use override slugs.
- The two camelCase tags have both anchors: the Astro slug and the Hugo alias.

## Decisions

1. **Hugo-style anchor aliases: yes.** When Hugo's slug for a tag differs from `toSlug(tag)`, also emit the Hugo spelling as a second anchor, under the same first-occurrence rule. Port `humanize` only as far as the spec needs: split camelCase (`GitHub` → `Git Hub`, `MultiRegion` → `Multi Region`) without splitting acronym runs (`CI`), then lowercase and replace spaces with `-`. Test it against the two known tags and against the anchors in the local Hugo build.
2. **Heading level: `<h3>`**, styled to match Hugo's `<h4>`.

## Files

- New: `src/lib/api/scopesBuilder.ts` and its test
- New: `src/components/ApiScopesTable/{ApiScopesTable.astro, ApiScopesTable.module.css, plaintext/ApiScopesTable.ts, tests/…}`
- Edit: `src/lib/api/viewsBuilder.ts` (use the shared `toScopeAnchor`)
- Edit: `markdoc.schema.mjs`, `markdoc.config.mjs`, `src/lib/plaintext/twinTransform.ts`, `src/content/en/api/latest/scopes.mdoc`
- Possibly edit: `tests/fixtures/api/v{1,2}/partial_spec.yaml` (add an overlap or camelCase case)

## Phases

At each compaction point, stop and hand back to the user. The next phase starts from this plan plus the state on disk, so each phase must leave the tree in a state another session can pick up from.

### Phase 1: scopes data builder

1. If needed, add fixture cases to `partial_spec.yaml`: an A∩B / B∩C overlap, a camelCase tag, and a tag with a category slug override.
2. Write `scopesBuilder.unit.test.ts` covering collection, grouping, anchors, aliases and override hrefs. Run it and confirm it fails.
3. Implement `scopesBuilder.ts` (`collectScopesFromSpecs`, `groupScopesByOverlappingTags`, `assignTagAnchorsToFirstGroup`, `toScopeAnchor`, `toHugoScopeAnchor`).
4. Switch `viewsBuilder.ts` to `toScopeAnchor`, and add the anchor-consistency test.
5. Make the scoped tests pass and format the touched files.

**🛑 Compaction point 1.** The data layer is done and green. Report the group, anchor and alias counts from the real spec, compared with Hugo's 40 headings.

### Phase 2: component and Markdoc tag

1. Write the `ApiScopesTable` render unit test (BEM classes, `<h3>`, header row, anchor IDs including aliases, localized hrefs). Confirm it fails.
2. Implement `ApiScopesTable.astro` and `.module.css` (tokens, explicit font-weight, hardcoded English headers with `TODO`s).
3. Register `api-scopes` in `markdoc.schema.mjs` and `markdoc.config.mjs`, and replace the shortcode in `scopes.mdoc`.
4. Make the scoped tests pass, format, and check `/api/latest/scopes/` on the dev server.

**🛑 Compaction point 2.** The page renders. Ask the user to look at it visually before going on.

### Phase 3: plaintext twin

1. Write the twin unit test and the `twinTransform` test for `{% api-scopes /%}`. Confirm they fail.
2. Implement `plaintext/ApiScopesTable.ts`, and register the adapter in `twinTransform.ts`.
3. Make the scoped tests pass, format, and spot-check `/api/latest/scopes.md`.

**🛑 Compaction point 3.** The twin is done.

### Phase 4: browser tests, parity, regressions

1. Write the browser tests (anchor scroll target, endpoint "scope" link lands on its section). Confirm they fail where expected, then pass. Kill any stale `astro dev` on :4321 first.
2. Run the throwaway parity diff against the Hugo build, and report any differences beyond the expected ones listed above.
3. Run the full `yarn test-ai`.

**🛑 Compaction point 4 (done).** Report the results, and recommend the prod build to the user.
