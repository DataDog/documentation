# Card Grid Shortcode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a `card-grid`/`image-card` Hugo shortcode pair that replaces ~100 hardcoded card grid partials, then migrate existing partials to use it.

**Architecture:** Two Hugo shortcodes (parent `card-grid`, child `image-card`) with a flexbox CSS layout that uses CSS custom properties for responsive card sizing. The parent renders a flex container; each child renders a card link. Images use the existing `img.html` partial. Migration is mechanical: extract card data from each partial, write shortcode calls in the content `.md` file, delete the partial.

**Tech Stack:** Hugo shortcodes (Go templates), SCSS, Playwright for e2e tests.

**Spec:** `docs/superpowers/specs/2026-05-12-card-grid-shortcode-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `layouts/shortcodes/card-grid.html` | Parent shortcode — flex container with `--card-min-width` CSS custom property |
| Create | `layouts/shortcodes/image-card.html` | Child shortcode — renders one card link with optional image, title, subtitle |
| Modify | `assets/styles/components/_cards.scss` | Add `.card-grid` and `.card-grid-card` styles |
| Create | `content/en/dd_e2e/card_grid.md` | E2E fixture page with all shortcode variations |
| Create | `e2e/components/card-grid/card-grid.spec.ts` | Playwright tests |
| Delete | ~90 partials in `layouts/partials/` | Replaced by shortcode (one delete per migration) |
| Modify | ~90 content files in `content/en/` | Replace `{{< partial >}}` calls with `{{< card-grid >}}`/`{{< image-card >}}` |

---

## Task 1: Create the shortcode templates

**Files:**
- Create: `layouts/shortcodes/card-grid.html`
- Create: `layouts/shortcodes/image-card.html`

- [ ] **Step 1: Create `card-grid.html`**

```go-html-template
{{ $min_width := .Get "min_width" | default "150px" }}
<div class="card-grid" style="--card-min-width: {{ $min_width }};">
  {{ .Inner }}
</div>
```

- [ ] **Step 2: Create `image-card.html`**

The `img.html` partial expects a `root` context with `.Site.Params` and `.Scratch`. In Hugo shortcodes, the shortcode context (`.`) has both, so pass `"root" .` — NOT `"root" $.Page`. This matches how existing shortcodes like `container-languages.html:10` call `img.html`.

```go-html-template
{{ $href := .Get "href" }}
{{ $src := .Get "src" }}
{{ $alt := .Get "alt" | default "" }}
{{ $title := .Get "title" }}
{{ $subtitle := .Get "subtitle" }}
{{ $img_width := .Get "img_width" | default "150" }}

<a class="card-grid-card h-100" href="{{ $href }}">
  <div class="card-body text-center py-2 px-1 d-flex align-items-center justify-content-center">
    {{ with $src }}
      {{ partial "img.html" (dict "root" $ "src" . "class" "img-fluid" "alt" $alt "width" $img_width) }}
    {{ end }}
    {{ with $title }}
      <h5 class="m-0">{{ . }}</h5>
    {{ end }}
    {{ with $subtitle }}
      <small>{{ . }}</small>
    {{ end }}
  </div>
</a>
```

Note: `$` is used instead of `.` for `root` because we're inside a `{{ with }}` block where `.` gets rebound to the value of `$src`. `$` always refers to the top-level shortcode context.

- [ ] **Step 3: Commit**

```bash
git add layouts/shortcodes/card-grid.html layouts/shortcodes/image-card.html
git commit -m "feat: add card-grid and image-card shortcodes"
```

---

## Task 2: Add CSS styles

**Files:**
- Modify: `assets/styles/components/_cards.scss` (append to end of file)

- [ ] **Step 1: Add styles to `_cards.scss`**

Append this block at the end of `assets/styles/components/_cards.scss`:

```scss
.card-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 14px;
}

.card-grid-card {
  flex: 1 1 var(--card-min-width, 150px);
  min-width: var(--card-min-width, 150px);
  max-width: calc(var(--card-min-width, 150px) * 1.5);
  text-decoration: none;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: transparent;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.4);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/styles/components/_cards.scss
git commit -m "feat: add card-grid flexbox styles"
```

---

## Task 3: Create e2e fixture page

**Files:**
- Create: `content/en/dd_e2e/card_grid.md`

This fixture page must exist before the Playwright tests can run. It uses integration logos already present in `static/images/integrations_logos/`.

- [ ] **Step 1: Create the fixture page**

```markdown
---
title: Card Grid
draft: true
private: true
---

## Image grid (4 cards, default min_width)

{{< card-grid >}}
  {{< image-card href="/getting_started/" src="integrations_logos/linux.png" alt="Linux" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/docker.png" alt="Docker" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/python.png" alt="Python" >}}
{{< /card-grid >}}

## Image grid (7 cards, last row centering)

{{< card-grid >}}
  {{< image-card href="/getting_started/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/php.png" alt="PHP" >}}
{{< /card-grid >}}

## Text-only grid

{{< card-grid min_width="200px" >}}
  {{< image-card href="/getting_started/" title="Containers" >}}
  {{< image-card href="/getting_started/" title="Jobs" subtitle="(Preview)" >}}
  {{< image-card href="/getting_started/" title="Functions" >}}
{{< /card-grid >}}

## Custom min_width (200px)

{{< card-grid min_width="200px" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/linux.png" alt="Linux" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/docker.png" alt="Docker" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/java.png" alt="Java" >}}
{{< /card-grid >}}

## Custom img_width

{{< card-grid >}}
  {{< image-card href="/getting_started/" src="integrations_logos/linux.png" alt="Linux" img_width="50" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/docker.png" alt="Docker" img_width="50" >}}
  {{< image-card href="/getting_started/" src="integrations_logos/java.png" alt="Java" img_width="50" >}}
{{< /card-grid >}}

## Single card

{{< card-grid >}}
  {{< image-card href="/getting_started/" src="integrations_logos/linux.png" alt="Linux" >}}
{{< /card-grid >}}
```

- [ ] **Step 2: Verify the page renders**

Start the Hugo dev server and load `http://localhost:1313/dd_e2e/card_grid/` in a browser. Confirm:
- All six sections render
- Images load (check the Imgix URL in the `<picture>` element's `srcset`)
- Text-only cards show title and subtitle
- The 7-card grid's last row is visually centered

Run: `yarn run start` (then open the URL)

- [ ] **Step 3: Commit**

```bash
git add content/en/dd_e2e/card_grid.md
git commit -m "test: add card-grid e2e fixture page"
```

---

## Task 4: Write Playwright e2e tests

**Files:**
- Create: `e2e/components/card-grid/card-grid.spec.ts`

Tests follow the patterns in `e2e/components/tabs/cdocs-tabs.spec.ts` and `e2e/components/ui/cdocs-ui.spec.ts`. The Hugo dev server must be running on `localhost:1313` (configured in `playwright.config.ts`).

- [ ] **Step 1: Create the test file**

```typescript
import { test, expect, type Page } from '@playwright/test';
import { hideOverlays } from '../../helpers';

const PAGE_URL = '/dd_e2e/card_grid/';
const CONTENT_AREA = '#mainContent';

// Section indices (0-based DOM order matching fixture page headings)
const SECTION = {
    IMAGE_4: 0,
    IMAGE_7: 1,
    TEXT_ONLY: 2,
    CUSTOM_MIN_WIDTH: 3,
    CUSTOM_IMG_WIDTH: 4,
    SINGLE: 5
} as const;

function gridSection(page: Page, index: number) {
    return page.locator('.card-grid').nth(index);
}

test.describe('card-grid shortcode', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGE_URL);
        await page.waitForSelector(CONTENT_AREA);
        await hideOverlays(page);
    });

    test('page renders as expected', async ({ page }) => {
        await expect(page.locator(CONTENT_AREA)).toHaveScreenshot('card-grid-initial.png');
    });

    test('correct number of cards in each grid', async ({ page }) => {
        await expect(gridSection(page, SECTION.IMAGE_4).locator('.card-grid-card')).toHaveCount(4);
        await expect(gridSection(page, SECTION.IMAGE_7).locator('.card-grid-card')).toHaveCount(7);
        await expect(gridSection(page, SECTION.TEXT_ONLY).locator('.card-grid-card')).toHaveCount(3);
        await expect(gridSection(page, SECTION.CUSTOM_MIN_WIDTH).locator('.card-grid-card')).toHaveCount(3);
        await expect(gridSection(page, SECTION.CUSTOM_IMG_WIDTH).locator('.card-grid-card')).toHaveCount(3);
        await expect(gridSection(page, SECTION.SINGLE).locator('.card-grid-card')).toHaveCount(1);
    });

    test('cards are links with valid href', async ({ page }) => {
        const cards = gridSection(page, SECTION.IMAGE_4).locator('.card-grid-card');
        for (let i = 0; i < 4; i++) {
            const card = cards.nth(i);
            await expect(card).toHaveAttribute('href', /\/.+/);
            const tagName = await card.evaluate(el => el.tagName.toLowerCase());
            expect(tagName).toBe('a');
        }
    });

    test('image cards render images', async ({ page }) => {
        const cards = gridSection(page, SECTION.IMAGE_4).locator('.card-grid-card');
        for (let i = 0; i < 4; i++) {
            await expect(cards.nth(i).locator('img')).toBeVisible();
        }
    });

    test('text-only cards render title without images', async ({ page }) => {
        const cards = gridSection(page, SECTION.TEXT_ONLY).locator('.card-grid-card');
        await expect(cards.nth(0).locator('h5')).toHaveText('Containers');
        await expect(cards.nth(1).locator('h5')).toHaveText('Jobs');
        await expect(cards.nth(2).locator('h5')).toHaveText('Functions');
        // No images in text-only cards
        await expect(cards.nth(0).locator('img')).toHaveCount(0);
    });

    test('subtitle renders when present', async ({ page }) => {
        const jobsCard = gridSection(page, SECTION.TEXT_ONLY).locator('.card-grid-card').nth(1);
        await expect(jobsCard.locator('small')).toHaveText('(Preview)');
        // First card has no subtitle
        const containersCard = gridSection(page, SECTION.TEXT_ONLY).locator('.card-grid-card').nth(0);
        await expect(containersCard.locator('small')).toHaveCount(0);
    });

    test('custom min_width sets CSS custom property', async ({ page }) => {
        const grid = gridSection(page, SECTION.CUSTOM_MIN_WIDTH);
        const minWidth = await grid.evaluate(el =>
            getComputedStyle(el).getPropertyValue('--card-min-width').trim()
        );
        expect(minWidth).toBe('200px');
    });

    test('default min_width is 150px', async ({ page }) => {
        const grid = gridSection(page, SECTION.IMAGE_4);
        const minWidth = await grid.evaluate(el =>
            getComputedStyle(el).getPropertyValue('--card-min-width').trim()
        );
        expect(minWidth).toBe('150px');
    });

    test('custom img_width applies to images', async ({ page }) => {
        const card = gridSection(page, SECTION.CUSTOM_IMG_WIDTH).locator('.card-grid-card').first();
        const imgWidth = await card.locator('img').getAttribute('width');
        expect(imgWidth).toBe('50');
    });

    test('last row is centered in 7-card grid', async ({ page }) => {
        const grid = gridSection(page, SECTION.IMAGE_7);
        const gridBox = await grid.boundingBox();
        const cards = grid.locator('.card-grid-card');
        const cardCount = await cards.count();

        // Find the last row: cards whose top position is the same as the last card's
        const lastCardBox = await cards.nth(cardCount - 1).boundingBox();
        const lastRowCards: { left: number; right: number }[] = [];
        for (let i = 0; i < cardCount; i++) {
            const box = await cards.nth(i).boundingBox();
            if (box && lastCardBox && Math.abs(box.y - lastCardBox.y) < 2) {
                lastRowCards.push({ left: box.x, right: box.x + box.width });
            }
        }

        // The last row should have fewer cards than would fill the grid
        expect(lastRowCards.length).toBeGreaterThan(0);
        expect(lastRowCards.length).toBeLessThan(4);

        // Check centering: leftmost card's distance from grid left edge should
        // roughly equal rightmost card's distance from grid right edge
        if (gridBox && lastRowCards.length > 0) {
            const leftGap = lastRowCards[0].left - gridBox.x;
            const rightGap = (gridBox.x + gridBox.width) - lastRowCards[lastRowCards.length - 1].right;
            expect(Math.abs(leftGap - rightGap)).toBeLessThan(20);
        }
    });

    test('responsive: fewer columns at narrow viewport', async ({ page }) => {
        // Default viewport is 1280px (from playwright.config.ts)
        const grid = gridSection(page, SECTION.IMAGE_4);
        const cardsWide = grid.locator('.card-grid-card');

        // At 1280px, 4 cards with min-width 150px should fit in one row
        const firstCardWide = await cardsWide.nth(0).boundingBox();
        const lastCardWide = await cardsWide.nth(3).boundingBox();
        // Same row = same y position
        if (firstCardWide && lastCardWide) {
            expect(Math.abs(firstCardWide.y - lastCardWide.y)).toBeLessThan(2);
        }

        // Shrink viewport to 400px — cards should wrap
        await page.setViewportSize({ width: 400, height: 720 });
        await page.waitForTimeout(100);

        const firstCardNarrow = await cardsWide.nth(0).boundingBox();
        const lastCardNarrow = await cardsWide.nth(3).boundingBox();
        // Different rows = different y positions
        if (firstCardNarrow && lastCardNarrow) {
            expect(lastCardNarrow.y).toBeGreaterThan(firstCardNarrow.y + 10);
        }
    });

    test('hover shows box-shadow', async ({ page }) => {
        const card = gridSection(page, SECTION.IMAGE_4).locator('.card-grid-card').first();

        const shadowBefore = await card.evaluate(el =>
            getComputedStyle(el).boxShadow
        );

        await card.hover();

        const shadowAfter = await card.evaluate(el =>
            getComputedStyle(el).boxShadow
        );

        expect(shadowAfter).not.toBe(shadowBefore);
        expect(shadowAfter).not.toBe('none');
    });
});
```

- [ ] **Step 2: Run the tests**

The Hugo dev server must be running on port 1313 first (`yarn run start` in another terminal).

Run: `npx playwright test e2e/components/card-grid/card-grid.spec.ts`

On the first run, the screenshot test (`page renders as expected`) will fail because there's no baseline snapshot yet. This is expected. After confirming the visual output looks correct:

Run: `npx playwright test e2e/components/card-grid/card-grid.spec.ts --update-snapshots`

This creates the baseline screenshot in `e2e/components/card-grid/card-grid.spec.ts-snapshots/`.

- [ ] **Step 3: Commit**

```bash
git add e2e/components/card-grid/card-grid.spec.ts e2e/components/card-grid/card-grid.spec.ts-snapshots/
git commit -m "test: add Playwright e2e tests for card-grid shortcode"
```

---

## Task 5: Migrate first batch of partials (pilot — 5 partials)

Migrate 5 representative partials to validate the shortcode works in production content. Pick partials that cover different patterns:

1. `layouts/partials/apm/apm-single-step.html` — 4 cards, basic image grid, `width="200"`
2. `layouts/partials/profiling/profiling-languages.html` — 11 cards, many items, `width="400"`
3. `layouts/partials/continuous_integration/ci-pipelines-getting-started.html` — data-driven (slice/range), `width="150"`
4. `layouts/partials/serverless/google-cloud-run-workloads.html` — text-only cards (no images)
5. `layouts/partials/support/support.html` — image + title cards (uses `tile-nav` CSS class)

**Files per partial:**
- Delete: `layouts/partials/<path>.html`
- Modify: the corresponding content `.md` file

### 5a: Migrate `apm-single-step.html`

- [ ] **Step 1: Replace partial call in content file**

File: `content/en/tracing/trace_collection/single-step-apm/_index.md`

Find the line:
```
{{< partial name="apm/apm-single-step.html" >}}
```

Replace with:
```
{{< card-grid min_width="200px" >}}
  {{< image-card href="linux/" src="integrations_logos/linux.png" alt="linux" img_width="200" >}}
  {{< image-card href="docker/" src="integrations_logos/docker.png" alt="docker" img_width="200" >}}
  {{< image-card href="kubernetes/" src="integrations_logos/kubernetes.png" alt="kubernetes" img_width="200" >}}
  {{< image-card href="windows/" src="integrations_logos/windows.png" alt="windows" img_width="200" >}}
{{< /card-grid >}}
```

Note: the original partial uses `{{ .Page.Permalink }}linux/` for hrefs. Since the shortcode is called from within the page's content, relative paths like `linux/` resolve correctly — Hugo treats them relative to the page URL.

- [ ] **Step 2: Delete the old partial**

```bash
rm layouts/partials/apm/apm-single-step.html
```

- [ ] **Step 3: Verify in dev server**

Load `http://localhost:1313/tracing/trace_collection/single-step-apm/` and confirm:
- 4 cards render with correct images
- Links go to the right subpages
- Hover state works

### 5b: Migrate `profiling-languages.html`

- [ ] **Step 4: Replace partial call in content file**

File: `content/en/profiler/_index.md`

Find the line:
```
{{< partial name="profiling/profiling-languages.html" >}}
```

Replace with:
```
{{< card-grid >}}
  {{< image-card href="/profiler/enabling/?prog_lang=go" src="integrations_logos/go-metro.png" alt="go" img_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=java" src="integrations_logos/java.png" alt="Java" img_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=java&runtime=graalvm_native_image" src="integrations_logos/graalvm.png" alt="GraalVM" img_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=node_js" src="integrations_logos/nodejs.png" alt="Node.js" img_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=php" src="integrations_logos/php.png" alt="PHP" img_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=python" src="integrations_logos/python.png" alt="Python" img_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=ruby" src="integrations_logos/ruby.png" alt="Ruby" img_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=dot_net" src="integrations_logos/dotnet_text.png" alt=".NET" img_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=rust" src="integrations_logos/rust.png" alt="Rust" img_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=c" src="integrations_logos/c.png" alt="C" img_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=cpp" src="integrations_logos/cpp.png" alt="C++" img_width="400" >}}
{{< /card-grid >}}
```

Note: the original partial uses absolute paths (`/profiler/enabling/?prog_lang=go`), not relative. Preserve this since the hrefs include query parameters.

- [ ] **Step 5: Delete the old partial**

```bash
rm layouts/partials/profiling/profiling-languages.html
```

### 5c: Migrate `ci-pipelines-getting-started.html` (data-driven)

- [ ] **Step 6: Find the content file**

Run: `grep -rn "ci-pipelines-getting-started" content/en/ --include="*.md"`

- [ ] **Step 7: Replace partial call**

The partial defines a `$providers` slice with 10 entries. Each dict has `href`, `src`, `alt`. All use `"width" "150"`. Convert each dict entry to an `image-card` shortcode call.

```
{{< card-grid >}}
  {{< image-card href="/continuous_integration/pipelines/awscodepipeline/" src="integrations_logos/aws-codepipeline_small.svg" alt="aws codepipeline" >}}
  {{< image-card href="/continuous_integration/pipelines/azure/" src="integrations_logos/azure-pipelines_small.svg" alt="azure devops extension" >}}
  {{< image-card href="/continuous_integration/pipelines/buildkite/" src="integrations_logos/buildkite_small.svg" alt="buildkite" >}}
  {{< image-card href="/continuous_integration/pipelines/circleci/" src="integrations_logos/circleci.png" alt="circleci orb" >}}
  {{< image-card href="/continuous_integration/pipelines/codefresh/" src="integrations_logos/codefresh_small.svg" alt="codefresh" >}}
  {{< image-card href="/continuous_integration/pipelines/github/" src="integrations_logos/github_small.svg" alt="github actions" >}}
  {{< image-card href="/continuous_integration/pipelines/gitlab/" src="integrations_logos/gitlab-logo-100.svg" alt="gitlab" >}}
  {{< image-card href="/continuous_integration/pipelines/jenkins/" src="integrations_logos/jenkins.png" alt="jenkins" >}}
  {{< image-card href="/continuous_integration/pipelines/teamcity/" src="integrations_logos/teamcity_small.svg" alt="teamcity" >}}
  {{< image-card href="/continuous_integration/pipelines/custom/" src="integrations_logos/docs_other_ci_providers.png" alt="other ci providers" >}}
{{< /card-grid >}}
```

- [ ] **Step 8: Delete the old partial**

```bash
rm layouts/partials/continuous_integration/ci-pipelines-getting-started.html
```

### 5d: Migrate `google-cloud-run-workloads.html` (text-only)

- [ ] **Step 9: Find the content file**

Run: `grep -rn "google-cloud-run-workloads" content/en/ --include="*.md"`

- [ ] **Step 10: Replace partial call**

```
{{< card-grid min_width="200px" >}}
  {{< image-card href="/serverless/google_cloud_run/containers" title="Containers" >}}
  {{< image-card href="/serverless/google_cloud_run/jobs" title="Jobs" subtitle="(Preview)" >}}
  {{< image-card href="/serverless/google_cloud_run/functions" title="Functions" >}}
  {{< image-card href="/serverless/google_cloud_run/functions_1st_gen" title="Functions" subtitle="(1st generation)" >}}
{{< /card-grid >}}
```

- [ ] **Step 11: Delete the old partial**

```bash
rm layouts/partials/serverless/google-cloud-run-workloads.html
```

### 5e: Migrate `support.html` (image + title)

- [ ] **Step 12: Find the content file**

Run: `grep -rn 'partial.*support/support' content/en/ --include="*.md"`

- [ ] **Step 13: Assess scope**

`support.html` is more complex than a plain card grid — it has two card grids, descriptive text between them, i18n strings, a footer section, and uses `tile-nav` CSS class. The card grids inside it can be migrated, but the partial as a whole can't be replaced by a single shortcode call.

**Decision:** Skip this partial for now. It's in the "deferred" category because the surrounding structure (i18n text blocks, footer with social links) goes beyond what the card-grid shortcode handles. Mark it for a future cleanup.

### Pilot batch commit

- [ ] **Step 14: Verify all migrated pages in dev server**

Load each page and confirm cards render correctly:
- `http://localhost:1313/tracing/trace_collection/single-step-apm/`
- `http://localhost:1313/profiler/`
- CI pipelines page (URL from step 6)
- `http://localhost:1313/serverless/google_cloud_run/`

- [ ] **Step 15: Commit the pilot batch**

```bash
git add -A content/en/ layouts/partials/
git commit -m "refactor: migrate first 4 card grid partials to shortcode"
```

---

## Task 6: Migrate remaining partials (bulk)

Migrate the remaining ~86 partials that don't have conditional logic. This is mechanical work — the same pattern repeated for each partial.

**For each partial**, the process is:

1. Read the partial file to extract card data (`href`, `src`, `alt`, `width`).
2. Run `grep -rn "partial-name" content/en/ --include="*.md"` to find the content file(s) that reference it. Some partials are used on multiple pages.
3. Replace the `{{< partial >}}` call with `{{< card-grid >}}`/`{{< image-card >}}` calls.
4. Delete the partial file.

**Partials to skip** (deferred per spec):
- `actions/expressions.html`
- `apm/apm-compatibility.html`
- `code_analysis/sca-getting-started.html`
- `continuous_delivery/cd-getting-started.html`
- `continuous_testing/ct-cicd-integrations.html`
- `platforms/platforms.html`
- `support/support.html`

- [ ] **Step 1: Get the full list of partials to migrate**

```bash
find layouts/partials -name "*.html" -type f | xargs grep -l "cards-dd" | sort
```

Cross-reference against the skip list above. Every partial not in the skip list gets migrated.

- [ ] **Step 2: Migrate in batches of ~10, committing after each batch**

Group by directory for coherent commits (e.g., all `apm/` partials in one batch, all `rum/` partials in another).

For each batch:
1. Extract card data from each partial.
2. Find and update each content file.
3. Delete the old partial files.
4. Spot-check one page per batch in the dev server.
5. Commit with a message like `refactor: migrate apm card grid partials to shortcode`.

- [ ] **Step 3: After all batches, run the full Playwright test suite**

```bash
npx playwright test e2e/components/card-grid/card-grid.spec.ts
```

Confirm all tests still pass — the fixture page is unaffected by partial migrations, but this validates the shortcode and CSS haven't drifted.

- [ ] **Step 4: Final commit if any stragglers**

```bash
git status
```

Check for any remaining unstaged changes and commit them.

---

## Task 7: Update screenshot baseline

After all migrations are complete, the screenshot baseline from Task 4 should still be valid since the fixture page hasn't changed. But if any CSS tweaks were made during migration:

- [ ] **Step 1: Run Playwright tests and check for screenshot diff**

```bash
npx playwright test e2e/components/card-grid/card-grid.spec.ts
```

- [ ] **Step 2: If screenshot test fails, update baseline**

```bash
npx playwright test e2e/components/card-grid/card-grid.spec.ts --update-snapshots
```

Visually inspect the new screenshot to confirm it looks correct.

- [ ] **Step 3: Commit if baseline changed**

```bash
git add e2e/components/card-grid/card-grid.spec.ts-snapshots/
git commit -m "test: update card-grid screenshot baseline"
```
