# Card Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the Hugo `card-grid` / `image-card` shortcode pair to the Astro site as a Markdoc tag pair, with a plaintext twin and a from-scratch hover tooltip.

**Architecture:** A `transform()` on the parent `card-grid` tag in `markdoc.config.mjs` does the coordination Hugo does with `.Parent.Get` — it merges the parent's `image_width` down into each child, assigns stable per-card ids, and collects which cards need tooltips. `CardGrid.astro` renders a plain wrapper and mounts one Preact tooltip island per grid, only when at least one card has a tooltip. `ImageCard.astro` renders each card as static markup. The plaintext twin collapses the whole grid to a flat Markdown link list.

**Tech Stack:** Astro 7, Markdoc (`@markdoc/markdoc` + `@astrojs/markdoc`), Preact, TypeScript (strict), CSS modules with BEM via `classListFactory`, Vitest (unit, happy-dom), Playwright (browser).

**Spec:** `astro/plans/22_card_grid.md` — read it before starting. Background notes (Hugo templates, live rendered HTML, plaintext behavior) are in `astro/plans/tempdocs/card-grid.md`, which is gitignored and may be absent.

## Global Constraints

- **Work only inside `astro/`.** Everything outside belongs to the live Hugo site. Do not edit Hugo files, including `hugo/i18n/en.json` — if a string needs an i18n key that does not exist, hardcode the English and leave a `TODO` comment.
- **Test red to green.** Every test is written and confirmed failing before the code that satisfies it. This is a repo requirement, not a preference.
- **Never run `vitest` directly.** Use `yarn test:headless-ai <path>` for unit tests and `yarn test:browser-ai <file>` for browser tests. Direct vitest invocation misses required env variables.
- **Do not run the full `yarn test-ai` until Task 10.** Scope test runs tightly during development.
- **Do not run the prod build** (`yarn build`). Recommend it to the user as a final step.
- **Full BEM class names only**, so `classListFactory` works: `block`, `block__element`, `block__element--modifier`. Never camelCase or shorthand.
- **Use design tokens, not hardcoded values**, so dark mode and alternate views work later. Token names must be reusable, not coupled to one component.
- **Widths are unitless numbers.** `card_width="225"` and `image_width="100"`, not `"225px"`. This diverges from Hugo deliberately and matches cdocs.
- **Descriptive variable names.** `card`, not `c`. Type-mapped names where they help: an array of cards is `cards`.
- Branch is `heston/card-grid`. Never push to `master`, never force-push, never use `--no-verify` or `HUSKY=0`.
- This is a **public repository**. No internal information in code, comments, or commit messages.

## File Structure

**Created:**

| File | Responsibility |
|---|---|
| `src/lib/images/buildImageUrl.ts` | Build the CDN `imageUrl` + `srcset` pair. Shared by `Img.astro` and `ImageCard.astro`. |
| `src/lib/images/tests/buildImageUrl.unit.test.ts` | Unit tests for the above. |
| `src/components/CardGrid/cardGridTypes.ts` | Props shared across the Astro/Preact boundary. |
| `src/components/CardGrid/CardGrid.astro` | Grid wrapper; conditionally mounts the tooltip island. |
| `src/components/CardGrid/CardGrid.module.css` | Grid layout. |
| `src/components/CardGrid/ImageCard.astro` | One card. Static, no interactivity. |
| `src/components/CardGrid/ImageCard.module.css` | Card styling. |
| `src/components/CardGrid/CardGridTooltips.tsx` | Preact island: one shared tooltip bubble per grid. |
| `src/components/CardGrid/CardGridTooltips.module.css` | Bubble styling. |
| `src/components/CardGrid/plaintext/CardGrid.ts` | Plaintext twin: grid → flat link list. |
| `src/components/CardGrid/plaintext/tests/unit.test.ts` | Twin unit tests. |
| `src/components/CardGrid/tests/schema.unit.test.ts` | Validation-error tests. |
| `src/components/CardGrid/tests/transform.unit.test.ts` | Inheritance + tooltip-collection tests. |
| `src/components/CardGrid/tests/ImageCard.unit.test.ts` | Card render-branch tests. |
| `src/components/CardGrid/tests/CardGrid.unit.test.ts` | Grid wrapper + conditional-island tests. |
| `src/components/CardGrid/tests/CardGridTooltips.unit.test.ts` | Island behavior tests. |
| `src/components/CardGrid/tests/browser.test.ts` | Playwright tests. |

**Modified:**

| File | Change |
|---|---|
| `markdoc.schema.mjs` | Add `card-grid` and `image-card` attribute schemas + the `card-grid` validator. |
| `markdoc.config.mjs` | Register both tags; add the `card-grid` transform. |
| `src/components/Img/Img.astro:21-23` | Replace inline URL construction with `buildImageUrl`. |
| `src/lib/plaintext/twinTransform.ts` | Register the `card-grid` twin adapter. |
| `src/styles/tokens/colors.css` | Add `--color-border-card`, `--color-tooltip-bg`, `--color-tooltip-text`. |
| `src/styles/tokens/shadows.css` | Add `--shadow-card-hover`. |
| `src/styles/tokens/layout.css` | Add `--card-grid-card-min-height`, `--card-grid-card-min-height-titled`. |

**Not created — a correction to the spec.** Spec section 8 asks for a demo page at `src/pages/dd_e2e/components/card-grid.astro`. That is unnecessary: `src/content/en/dd_e2e/components/card-grid.mdoc` already exists and auto-routes through the catch-all at `src/pages/[...slug].astro` (any `en` collection entry renders there). Its plaintext twin auto-routes through `src/pages/[...slug].md.ts`. The demo URL is `/dd_e2e/components/card-grid`, live with no new file.

## Verified Deviations From the Spec

Three spec details did not survive contact with the code. Follow the plan, not the spec, on these:

1. **URL escaping (spec §7).** The spec says to escape `(` / `)` as `%28` / `%29` via an `escapeLinkUrl` port. Markdoc's own `format()` already escapes parens in link hrefs (as `\(`), verified directly. Hand-rolling percent-encoding on top would double-escape and change the URL. **Do not port `escapeLinkUrl`.** Bracket escaping in link *text* is still needed — `format()` does not do that one.
2. **Border-radius token (spec §6).** The spec names `--radius-sm`. The real token is `--border-radius` (4px), which equals Hugo's `0.25rem`. `--border-radius-sm` also exists but is 2px — wrong value.
3. **Demo page (spec §8).** Not needed; see the note above.

---

### Task 1: `buildImageUrl` helper

Extract the CDN URL construction currently inline in `Img.astro` so `ImageCard.astro` can share it. This must not change `Img`'s output — the helper returns byte-identical strings.

**Files:**
- Create: `src/lib/images/buildImageUrl.ts`
- Create: `src/lib/images/tests/buildImageUrl.unit.test.ts`
- Modify: `src/components/Img/Img.astro:21-23`

**Interfaces:**
- Consumes: `IMAGES_URL` from `@config/images`.
- Produces: `buildImageUrl(src: string): { imageUrl: string; srcset: string; popupHref: string }` — used by Task 5 (`ImageCard.astro`).

- [ ] **Step 1: Write the failing test**

Create `src/lib/images/tests/buildImageUrl.unit.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { buildImageUrl } from "../buildImageUrl";
import { IMAGES_URL } from "@config/images";

describe("buildImageUrl", () => {
  it("builds the base image URL under the CDN images path", () => {
    const { imageUrl } = buildImageUrl("logos/aws.svg");

    expect(imageUrl).toBe(`${IMAGES_URL}/images/logos/aws.svg`);
  });

  it("builds a 1x/2x srcset capped at 850px", () => {
    const { srcset } = buildImageUrl("logos/aws.svg");

    expect(srcset).toBe(
      `${IMAGES_URL}/images/logos/aws.svg?auto=format&fit=max&w=850 1x, ` +
        `${IMAGES_URL}/images/logos/aws.svg?auto=format&fit=max&w=850&dpr=2 2x`,
    );
  });

  it("builds a full-size popup href with no width cap", () => {
    const { popupHref } = buildImageUrl("logos/aws.svg");

    expect(popupHref).toBe(
      `${IMAGES_URL}/images/logos/aws.svg?fit=max&auto=format`,
    );
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test:headless-ai src/lib/images/tests/buildImageUrl.unit.test.ts`

Expected: FAIL — cannot resolve `../buildImageUrl`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/images/buildImageUrl.ts`:

```ts
import { IMAGES_URL } from "@config/images";

export interface BuiltImageUrls {
  /** The bare CDN URL for the image, with no transform params. */
  imageUrl: string;
  /** 1x/2x srcset, capped at 850px wide. */
  srcset: string;
  /** Full-size URL, used as the lightbox target. */
  popupHref: string;
}

/**
 * Build the CDN URLs for a content-relative image path (e.g. "logos/aws.svg").
 *
 * Shared by `Img.astro` and `ImageCard.astro` — the one genuine cross-boundary
 * contract between them. The components do not otherwise share markup: a card
 * is already an `<a>`, so it cannot reuse `Img`'s figure/lightbox wrapper.
 */
export function buildImageUrl(src: string): BuiltImageUrls {
  const imageUrl = `${IMAGES_URL}/images/${src}`;
  return {
    imageUrl,
    srcset:
      `${imageUrl}?auto=format&fit=max&w=850 1x, ` +
      `${imageUrl}?auto=format&fit=max&w=850&dpr=2 2x`,
    popupHref: `${imageUrl}?fit=max&auto=format`,
  };
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test:headless-ai src/lib/images/tests/buildImageUrl.unit.test.ts`

Expected: PASS (3 tests).

- [ ] **Step 5: Refactor `Img.astro` to use the helper**

In `src/components/Img/Img.astro`, replace these three lines (currently at 21-23):

```astro
const imageUrl = `${IMAGES_URL}/images/${src}`;

const srcset = `${imageUrl}?auto=format&fit=max&w=850 1x, ${imageUrl}?auto=format&fit=max&w=850&dpr=2 2x`;
const popupHref = `${imageUrl}?fit=max&auto=format`;
```

with:

```astro
const { imageUrl, srcset, popupHref } = buildImageUrl(src);
```

Then update the imports at the top of the frontmatter: remove `import { IMAGES_URL } from "@config/images";` (it is now unused — confirm no other reference remains in the file) and add:

```astro
import { buildImageUrl } from "@lib/images/buildImageUrl";
```

- [ ] **Step 6: Verify the `Img` tests still pass unchanged**

Run: `yarn test:headless-ai src/components/Img`

Expected: PASS, with no snapshot updates. If a snapshot changed, the helper is not returning identical strings — fix the helper, do not update the snapshot.

- [ ] **Step 7: Commit**

```bash
git add src/lib/images src/components/Img/Img.astro
git commit -m "Extract buildImageUrl helper shared by Img and card images"
```

---

### Task 2: Schema and validation

Declare both tags' attributes and the four validation errors. No rendering yet — this task is pure schema.

**Files:**
- Modify: `markdoc.schema.mjs` (add to the `tags` object, after the `img` entry)
- Create: `src/components/CardGrid/tests/schema.unit.test.ts`

**Interfaces:**
- Produces: `schema.tags["card-grid"]` and `schema.tags["image-card"]`, consumed by Task 3's config registration.
- Attribute shapes (used by every later task):
  - `card-grid`: `card_width: number` (default `150`), `image_width?: number` (**no default**)
  - `image-card`: `href: string` (required), `src?: string`, `alt: string` (default `""`), `title?: string`, `subtitle?: string`, `tooltip?: string`, `image_width?: number` (**no default**)

**The missing `image_width` defaults are load-bearing.** Task 3's transform reads `child.attributes` off the raw AST, which reflects only what the author literally typed. A schema default on the child would make every card look like it set the value explicitly, and the parent could never win the inheritance. The `150` fallback is applied at render time in Task 5 instead. `card_width` is not inherited, so it keeps its schema default.

- [ ] **Step 1: Write the failing test**

Create `src/components/CardGrid/tests/schema.unit.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import Markdoc from "@markdoc/markdoc";
import schema from "../../../../markdoc.schema.mjs";

const config = { tags: schema.tags, nodes: schema.nodes };

function validateMdoc(source: string) {
  return Markdoc.validate(Markdoc.parse(source), config);
}

function errorIds(source: string): string[] {
  return validateMdoc(source).map((entry) => entry.error.id);
}

describe("card-grid validation", () => {
  it("accepts a well-formed grid", () => {
    const ids = errorIds(
      `{% card-grid %}\n{% image-card href="/a/" title="A" /%}\n{% /card-grid %}`,
    );

    expect(ids).toEqual([]);
  });

  it("rejects a grid with no image-card children", () => {
    const ids = errorIds(`{% card-grid %}\n{% /card-grid %}`);

    expect(ids).toContain("card-grid-empty");
  });

  it("rejects a non-image-card tag child", () => {
    const ids = errorIds(
      `{% card-grid %}\n{% alert %}nope{% /alert %}\n{% /card-grid %}`,
    );

    expect(ids).toContain("card-grid-invalid-child");
  });

  it("names the offending tag in the invalid-child message", () => {
    const errors = validateMdoc(
      `{% card-grid %}\n{% alert %}nope{% /alert %}\n{% /card-grid %}`,
    );
    const invalidChild = errors.find(
      (entry) => entry.error.id === "card-grid-invalid-child",
    );

    expect(invalidChild?.error.message).toContain("alert");
  });

  it("rejects non-whitespace text between cards", () => {
    const ids = errorIds(
      `{% card-grid %}\nstray text\n{% image-card href="/a/" title="A" /%}\n{% /card-grid %}`,
    );

    expect(ids).toContain("card-grid-text-child");
  });

  it("allows whitespace-only text between cards", () => {
    const ids = errorIds(
      `{% card-grid %}\n\n{% image-card href="/a/" title="A" /%}\n\n{% image-card href="/b/" title="B" /%}\n\n{% /card-grid %}`,
    );

    expect(ids).toEqual([]);
  });

  it("rejects a card with neither src nor title", () => {
    const ids = errorIds(
      `{% card-grid %}\n{% image-card href="/a/" /%}\n{% /card-grid %}`,
    );

    expect(ids).toContain("image-card-no-content");
  });

  it("accepts a card with src but no title", () => {
    const ids = errorIds(
      `{% card-grid %}\n{% image-card href="/a/" src="logos/aws.svg" /%}\n{% /card-grid %}`,
    );

    expect(ids).toEqual([]);
  });

  it("requires href on a card", () => {
    const ids = errorIds(
      `{% card-grid %}\n{% image-card title="A" /%}\n{% /card-grid %}`,
    );

    expect(ids).toContain("attribute-missing-required");
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test:headless-ai src/components/CardGrid/tests/schema.unit.test.ts`

Expected: FAIL — the well-formed case reports `tag-undefined` for `card-grid`, and none of the custom error ids appear.

- [ ] **Step 3: Write the implementation**

In `markdoc.schema.mjs`, add these two entries to the `tags` object, immediately after the `img` entry:

```js
    "card-grid": {
      attributes: {
        card_width: { type: Number, default: 150 },
        // No default: the transform distinguishes "author set this on the
        // child" from "inherit from the parent" by reading the raw AST
        // attributes. A default here would make every child look explicit.
        image_width: { type: Number },
      },
      validate(node) {
        const errors = [];
        const cards = [];

        for (const child of node.children) {
          if (child.type === "text") {
            // Markdoc emits a text node for the newlines between tags; only
            // text with real content is an authoring mistake.
            if (String(child.attributes.content ?? "").trim() !== "") {
              errors.push({
                id: "card-grid-text-child",
                level: "error",
                message:
                  "`card-grid` can only contain `image-card` tags, not text.",
              });
            }
            continue;
          }
          if (child.type !== "tag") continue;
          if (child.tag !== "image-card") {
            errors.push({
              id: "card-grid-invalid-child",
              level: "error",
              message: `\`${child.tag}\` is not a valid child of \`card-grid\`. Only \`image-card\` is allowed.`,
            });
            continue;
          }
          cards.push(child);
        }

        if (cards.length === 0) {
          errors.push({
            id: "card-grid-empty",
            level: "error",
            message: "`card-grid` must contain at least one `image-card`.",
          });
        }

        for (const card of cards) {
          const { src, title } = card.attributes;
          if (src == null && title == null) {
            errors.push({
              id: "image-card-no-content",
              level: "error",
              message:
                "`image-card` needs a `src`, a `title`, or both. Without one it renders as an empty clickable box.",
            });
          }
        }

        return errors;
      },
    },
    "image-card": {
      selfClosing: true,
      attributes: {
        href: { type: String, required: true },
        src: { type: String },
        alt: { type: String, default: "" },
        title: { type: String },
        subtitle: { type: String },
        tooltip: { type: String },
        // No default — see the note on `card-grid.image_width`.
        image_width: { type: Number },
      },
    },
```

Markdoc wraps a paragraph around loose text, so the text child may arrive as a `paragraph` node rather than a bare `text` node. If the `card-grid-text-child` test fails after this step, walk one level: treat a `paragraph` child whose concatenated descendant text is non-whitespace the same way. Do not loosen the whitespace test to make it pass.

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test:headless-ai src/components/CardGrid/tests/schema.unit.test.ts`

Expected: PASS (9 tests).

- [ ] **Step 5: Commit**

```bash
git add markdoc.schema.mjs src/components/CardGrid/tests/schema.unit.test.ts
git commit -m "Add card-grid and image-card Markdoc schemas with validation"
```

---

### Task 3: Transform — inheritance and tooltip collection

The transform is where `image_width` inheritance and per-card id assignment happen. It is the highest-value thing to test in this feature.

**Files:**
- Modify: `markdoc.config.mjs` (add both tags to the `tags` object, after the `stepper-finished` entry)
- Create: `src/components/CardGrid/tests/transform.unit.test.ts`

**Interfaces:**
- Consumes: `schema.tags["card-grid"]`, `schema.tags["image-card"]` (Task 2); `generateElementId` from `./src/lib/componentUtils/generateElementId.ts` (already imported in `markdoc.config.mjs`).
- Produces: the rendered tag tree the components receive.
  - `CardGrid.astro` props: `{ id: string; card_width: number; image_width?: number; tooltipCardIds: string[]; tooltipLabelsByCardId: Record<string, string> }`
  - `ImageCard.astro` props: `{ id: string; href: string; src?: string; alt: string; title?: string; subtitle?: string; tooltip?: string; image_width?: number }`

Note `tooltipLabelsByCardId` — the island needs each card's tooltip text, and the ids alone do not carry it. The spec sketch passes a bare `tooltips` array; a record keyed by card id is used instead so the island cannot mismatch a label to a card.

- [ ] **Step 1: Write the failing test**

Create `src/components/CardGrid/tests/transform.unit.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import Markdoc from "@markdoc/markdoc";
import config from "../../../../markdoc.config.mjs";

/**
 * Transform a `.mdoc` source string and return the single top-level
 * card-grid tag, with its children.
 *
 * `Markdoc.transform` returns one Tag whose `children` hold the rendered
 * tags. Astro's `component()` render value is `{ type: "local", path }`, so
 * a tag is identified by its render path rather than by a tag name.
 */
function transformGrid(source: string) {
  const rendered = Markdoc.transform(Markdoc.parse(source), config);
  const grid = rendered.children.find(
    (child: any) => child?.name?.path?.endsWith("CardGrid.astro"),
  );
  if (!grid) throw new Error("no card-grid tag in transform output");
  return grid;
}

function cardAttributes(source: string) {
  return transformGrid(source).children.map((card) => card.attributes);
}

describe("card-grid transform", () => {
  it("passes card_width through to the grid", () => {
    const grid = transformGrid(
      `{% card-grid card_width="225" %}\n{% image-card href="/a/" title="A" /%}\n{% /card-grid %}`,
    );

    expect(grid.attributes.card_width).toBe(225);
  });

  it("defaults card_width to 150", () => {
    const grid = transformGrid(
      `{% card-grid %}\n{% image-card href="/a/" title="A" /%}\n{% /card-grid %}`,
    );

    expect(grid.attributes.card_width).toBe(150);
  });

  it("pushes the parent image_width down to a child that did not set one", () => {
    const [card] = cardAttributes(
      `{% card-grid image_width="100" %}\n{% image-card href="/a/" src="logos/a.svg" /%}\n{% /card-grid %}`,
    );

    expect(card.image_width).toBe(100);
  });

  it("lets a child override the parent image_width", () => {
    const [card] = cardAttributes(
      `{% card-grid image_width="100" %}\n{% image-card href="/a/" src="logos/a.svg" image_width="200" /%}\n{% /card-grid %}`,
    );

    expect(card.image_width).toBe(200);
  });

  it("leaves image_width undefined when neither sets it", () => {
    const [card] = cardAttributes(
      `{% card-grid %}\n{% image-card href="/a/" src="logos/a.svg" /%}\n{% /card-grid %}`,
    );

    expect(card.image_width).toBeUndefined();
  });

  it("gives every card a distinct id scoped to the grid", () => {
    const grid = transformGrid(
      `{% card-grid %}\n{% image-card href="/a/" title="A" /%}\n{% image-card href="/b/" title="B" /%}\n{% /card-grid %}`,
    );
    const ids = grid.children.map((card) => card.attributes.id);

    expect(new Set(ids).size).toBe(2);
    for (const id of ids) {
      expect(id.startsWith(grid.attributes.id)).toBe(true);
    }
  });

  it("collects only the cards that have a tooltip", () => {
    const grid = transformGrid(
      `{% card-grid %}\n` +
        `{% image-card href="/a/" src="logos/a.svg" tooltip="Alpha" /%}\n` +
        `{% image-card href="/b/" src="logos/b.svg" /%}\n` +
        `{% image-card href="/c/" src="logos/c.svg" tooltip="Gamma" /%}\n` +
        `{% /card-grid %}`,
    );
    const [alpha, , gamma] = grid.children.map((card) => card.attributes.id);

    expect(grid.attributes.tooltipCardIds).toEqual([alpha, gamma]);
  });

  it("maps each tooltip card id to its label", () => {
    const grid = transformGrid(
      `{% card-grid %}\n` +
        `{% image-card href="/a/" src="logos/a.svg" tooltip="Alpha" /%}\n` +
        `{% image-card href="/b/" src="logos/b.svg" /%}\n` +
        `{% /card-grid %}`,
    );
    const [alphaId] = grid.attributes.tooltipCardIds;

    expect(grid.attributes.tooltipLabelsByCardId).toEqual({ [alphaId]: "Alpha" });
  });

  it("leaves tooltipCardIds empty when no card has a tooltip", () => {
    const grid = transformGrid(
      `{% card-grid %}\n{% image-card href="/a/" title="A" /%}\n{% /card-grid %}`,
    );

    expect(grid.attributes.tooltipCardIds).toEqual([]);
  });

  it("skips whitespace text nodes between cards", () => {
    const grid = transformGrid(
      `{% card-grid %}\n\n{% image-card href="/a/" title="A" /%}\n\n{% image-card href="/b/" title="B" /%}\n\n{% /card-grid %}`,
    );

    expect(grid.children).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test:headless-ai src/components/CardGrid/tests/transform.unit.test.ts`

Expected: FAIL — `no card-grid tag in transform output`, because the tag is not registered in `markdoc.config.mjs`.

- [ ] **Step 3: Write the implementation**

In `markdoc.config.mjs`, add these two entries to the `tags` object, immediately after the `"stepper-finished"` entry:

```js
    "card-grid": {
      render: component("./src/components/CardGrid/CardGrid.astro"),
      ...schema.tags["card-grid"],
      // Does the coordination Hugo does with `.Parent.Get`: merges the grid's
      // `image_width` down into each card, assigns per-card ids, and collects
      // which cards need a tooltip so the grid can decide whether to hydrate.
      //
      // Same two constraints as the `tabs` transform above: do not eager-render
      // the slot (it drops Astro's hydration-script prefix), and re-emit each
      // card through its registered `render` so it keeps its CSS-module classes.
      transform(node, config) {
        const gridRender = config.tags["card-grid"].render;
        const cardRender = config.tags["image-card"].render;

        const attributes = node.transformAttributes(config);
        const gridId = generateElementId("card-grid");
        const parentImageWidth = attributes.image_width;

        const cards = [];
        const tooltipCardIds = [];
        const tooltipLabelsByCardId = {};

        for (const child of node.children) {
          if (child.type !== "tag" || child.tag !== "image-card") continue;

          const cardId = `${gridId}-card-${cards.length}`;
          const cardAttributes = child.transformAttributes(config);
          const tooltip = cardAttributes.tooltip;

          if (tooltip) {
            tooltipCardIds.push(cardId);
            tooltipLabelsByCardId[cardId] = tooltip;
          }

          cards.push(
            new Markdoc.Tag(cardRender, {
              ...cardAttributes,
              id: cardId,
              // Child wins, then the parent fills in. When neither is set this
              // stays undefined and ImageCard.astro applies the 150 default.
              // This works only because neither schema declares a default.
              image_width: child.attributes.image_width ?? parentImageWidth,
            }),
          );
        }

        return new Markdoc.Tag(
          gridRender,
          { ...attributes, id: gridId, tooltipCardIds, tooltipLabelsByCardId },
          cards,
        );
      },
    },
    "image-card": {
      // Rendered via the `card-grid` transform; the schema declares attributes
      // only. It still needs a `render` entry because `@astrojs/markdoc` only
      // resolves component imports for tags that appear in the .mdoc AST.
      render: component("./src/components/CardGrid/ImageCard.astro"),
      ...schema.tags["image-card"],
    },
```

Note `child.transformAttributes(config)` is used for the card's rendered attributes (so `alt` picks up its `""` default), while the raw `child.attributes.image_width` is read for the inheritance decision. That distinction is the whole mechanism — do not collapse the two.

`image-card` is self-closing, so the cards are constructed with no children.

- [ ] **Step 4: Create placeholder components so the config resolves**

The transform references two component files that do not exist yet. Create minimal versions now; Tasks 4 and 5 fill them in.

`src/components/CardGrid/CardGrid.astro`:

```astro
---
const { id } = Astro.props;
---

<div id={id}><slot /></div>
```

`src/components/CardGrid/ImageCard.astro`:

```astro
---
const { id, href } = Astro.props;
---

<a id={id} href={href}></a>
```

- [ ] **Step 5: Run the test and verify it passes**

Run: `yarn test:headless-ai src/components/CardGrid/tests/transform.unit.test.ts`

Expected: PASS (10 tests).

- [ ] **Step 6: Commit**

```bash
git add markdoc.config.mjs src/components/CardGrid
git commit -m "Add card-grid transform with image_width inheritance"
```

---

### Task 4: Design tokens

Add the tokens the components need before writing their CSS, so no hardcoded values are ever committed.

**Files:**
- Modify: `src/styles/tokens/colors.css`
- Modify: `src/styles/tokens/shadows.css`
- Modify: `src/styles/tokens/layout.css`

**Interfaces:**
- Produces: the custom properties consumed by Tasks 5, 6, and 7's CSS modules.

Values are ported from `hugo/assets/styles/components/_cards.scss:37-84`. Existing tokens cover the rest: `--space-md` (1rem gap), `--border-radius` (4px ≈ Hugo's `0.25rem`), `--color-brand` (already `#632ca6`, Hugo's `$ddpurple`), and `--color-text` for the card title.

- [ ] **Step 1: Add the color tokens**

In `src/styles/tokens/colors.css`, add to the `:root` block. Put the card border in the "Colors — Surface" group:

```css
  --color-border-card: #dee2e6;
```

and add a new group at the end of the block:

```css
  /* Colors — Tooltip. Named as a general primitive rather than
     --card-grid-tooltip-*, since other components will want tooltips. */
  --color-tooltip-bg: #000;
  --color-tooltip-text: #fff;
```

- [ ] **Step 2: Add the shadow token**

In `src/styles/tokens/shadows.css`, add to the `:root` block:

```css
  --shadow-card-hover: 0 2px 4px 2px rgba(0, 0, 0, 0.4);
```

- [ ] **Step 3: Add the layout tokens**

In `src/styles/tokens/layout.css`, add to the `:root` block:

```css
  /* Card grid card heights. Component-scoped names are correct here: these
     are specific to this layout, not a reusable scale. */
  --card-grid-card-min-height: 100px;
  --card-grid-card-min-height-titled: 140px;
```

If `layout.css` has no `:root` block, add these to `src/styles/tokens/spacing.css` instead and note the choice in the commit message.

- [ ] **Step 4: Verify the token files still parse**

Run: `yarn test:headless-ai src/lib/images/tests/buildImageUrl.unit.test.ts`

Expected: PASS. This is a smoke check that nothing in the style pipeline broke; the test itself is unrelated.

- [ ] **Step 5: Commit**

```bash
git add src/styles/tokens
git commit -m "Add card and tooltip design tokens"
```

---

### Task 5: `ImageCard.astro`

Render one card. Four branches, ported from `hugo/layouts/shortcodes/image-card.html:9-21`.

**Files:**
- Create: `src/components/CardGrid/cardGridTypes.ts`
- Modify: `src/components/CardGrid/ImageCard.astro` (replacing the Task 3 placeholder)
- Create: `src/components/CardGrid/ImageCard.module.css`
- Create: `src/components/CardGrid/tests/ImageCard.unit.test.ts`

**Interfaces:**
- Consumes: `buildImageUrl` (Task 1); the transform's card attributes (Task 3); the tokens (Task 4).
- Produces: `ImageCardProps` and `CardGridProps` in `cardGridTypes.ts`, consumed by Tasks 6 and 7.

Branch rules:

| Condition | Output |
|---|---|
| `src` set | `<picture><img class="image-card__image" …></picture>` at `image_width ?? 150` |
| `title` set **with** `src` | `<p class="image-card__title">` |
| `title` set **without** `src` | `<h5 class="image-card__title">` |
| `subtitle` set | `<small class="image-card__subtitle">` |
| `title` set | `image-card--has-title` modifier on the anchor |
| `tooltip` set | `aria-label={tooltip}` on the anchor |

- [ ] **Step 1: Write the failing test**

Create `src/components/CardGrid/tests/ImageCard.unit.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ImageCard from "../ImageCard.astro";

async function renderCard(props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  return container.renderToString(ImageCard as never, {
    props: { id: "card-grid-abc123-card-0", ...props },
  });
}

describe("ImageCard component", () => {
  it("renders an anchor to the card href", async () => {
    const html = await renderCard({ href: "/integrations/aws/", title: "AWS" });

    expect(html).toContain("image-card");
    expect(html).toContain('href="/integrations/aws/"');
  });

  it("renders an image when src is set", async () => {
    const html = await renderCard({
      href: "/integrations/aws/",
      src: "logos/aws.svg",
      alt: "AWS",
    });

    expect(html).toContain("image-card__image");
    expect(html).toContain("<picture");
    expect(html).toContain('alt="AWS"');
    expect(html).toContain("logos/aws.svg");
  });

  it("defaults the image width to 150 when none is set", async () => {
    const html = await renderCard({
      href: "/integrations/aws/",
      src: "logos/aws.svg",
    });

    expect(html).toContain('width="150"');
  });

  it("uses the resolved image_width when one is set", async () => {
    const html = await renderCard({
      href: "/integrations/aws/",
      src: "logos/aws.svg",
      image_width: 200,
    });

    expect(html).toContain('width="200"');
    expect(html).not.toContain('width="150"');
  });

  it("renders a title-only card's title as an h5", async () => {
    const html = await renderCard({
      href: "/getting_started/",
      title: "Getting Started",
    });

    expect(html).toMatch(/<h5[^>]*image-card__title/);
    expect(html).toContain("Getting Started");
  });

  it("renders a title alongside an image as a paragraph, not an h5", async () => {
    const html = await renderCard({
      href: "/integrations/datadog/",
      src: "logos/dd.png",
      title: "Datadog",
    });

    expect(html).toMatch(/<p[^>]*image-card__title/);
    expect(html).not.toContain("<h5");
  });

  it("renders a subtitle when set", async () => {
    const html = await renderCard({
      href: "/serverless/jobs",
      title: "Jobs",
      subtitle: "(Preview)",
    });

    expect(html).toContain("image-card__subtitle");
    expect(html).toContain("(Preview)");
  });

  it("omits the subtitle element when unset", async () => {
    const html = await renderCard({ href: "/serverless/jobs", title: "Jobs" });

    expect(html).not.toContain("image-card__subtitle");
  });

  it("applies the has-title modifier only when a title is set", async () => {
    const titled = await renderCard({ href: "/a/", title: "A" });
    const untitled = await renderCard({ href: "/a/", src: "logos/a.svg" });

    expect(titled).toContain("image-card--has-title");
    expect(untitled).not.toContain("image-card--has-title");
  });

  it("labels the anchor with the tooltip text for screen readers", async () => {
    const html = await renderCard({
      href: "/integrations/aws/",
      src: "logos/aws.svg",
      tooltip: "Amazon Web Services integration",
    });

    expect(html).toContain('aria-label="Amazon Web Services integration"');
  });

  it("omits aria-label when there is no tooltip", async () => {
    const html = await renderCard({ href: "/a/", src: "logos/a.svg" });

    expect(html).not.toContain("aria-label");
  });

  it("does not emit Bootstrap tooltip data attributes", async () => {
    const html = await renderCard({
      href: "/a/",
      src: "logos/a.svg",
      tooltip: "Alpha",
    });

    expect(html).not.toContain("data-bs-");
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test:headless-ai src/components/CardGrid/tests/ImageCard.unit.test.ts`

Expected: FAIL — the placeholder renders a bare anchor with none of these classes.

- [ ] **Step 3: Write the shared types**

Create `src/components/CardGrid/cardGridTypes.ts`:

```ts
/** Props `ImageCard.astro` receives from the `card-grid` transform. */
export interface ImageCardProps {
  /** Per-card element id, assigned by the transform and scoped to the grid. */
  id: string;
  href: string;
  src?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  tooltip?: string;
  /** Already resolved by the transform: child value, else the grid's. */
  image_width?: number;
}

/** Props `CardGrid.astro` receives from the `card-grid` transform. */
export interface CardGridProps {
  id: string;
  card_width: number;
  image_width?: number;
  /** Ids of the cards that have a tooltip. Empty means: do not hydrate. */
  tooltipCardIds: string[];
  /** Tooltip text per card id. Keyed so a label cannot drift off its card. */
  tooltipLabelsByCardId: Record<string, string>;
}

/** Applied when a card sets no `image_width` and its grid sets none either. */
export const DEFAULT_IMAGE_WIDTH = 150;
```

- [ ] **Step 4: Write the component**

Replace `src/components/CardGrid/ImageCard.astro` entirely:

```astro
---
import styles from "./ImageCard.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { buildImageUrl } from "@lib/images/buildImageUrl";
import { DEFAULT_IMAGE_WIDTH, type ImageCardProps } from "./cardGridTypes";

type Props = ImageCardProps;

const cl = classListFactory(styles);

const { id, href, src, alt = "", title, subtitle, tooltip, image_width } =
  Astro.props;

const imageWidth = image_width ?? DEFAULT_IMAGE_WIDTH;
const image = src ? buildImageUrl(src) : null;

// Hugo renders a titled image card's title as a paragraph and a title-only
// card's as an h5 (image-card.html:15). Preserved so the visual weight of a
// text-only grid matches the Hugo site.
const TitleElement = src ? "p" : "h5";
---

<a
  id={id}
  class={cl("image-card", title && "image-card--has-title")}
  href={href}
  aria-label={tooltip}
>
  <div class={cl("image-card__body")}>
    {
      image && (
        <picture>
          <img
            class={cl("image-card__image")}
            srcset={image.srcset}
            width={imageWidth}
            loading="lazy"
            alt={alt}
          />
        </picture>
      )
    }
    {title && <TitleElement class={cl("image-card__title")}>{title}</TitleElement>}
    {subtitle && <small class={cl("image-card__subtitle")}>{subtitle}</small>}
  </div>
</a>
```

- [ ] **Step 5: Write the card CSS**

Create `src/components/CardGrid/ImageCard.module.css`. Values ported from `hugo/assets/styles/components/_cards.scss:37-84`; Hugo's nine Bootstrap utility classes on the body become four real properties.

```css
.image-card {
  display: flex;
  border: var(--border-width) solid var(--color-border-card);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--color-text);
}

.image-card:hover {
  box-shadow: var(--shadow-card-hover);
}

.image-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-xs);
  width: 100%;
  min-height: var(--card-grid-card-min-height);
}

.image-card--has-title .image-card__body {
  min-height: var(--card-grid-card-min-height-titled);
}

.image-card__image {
  max-width: 100%;
  height: auto;
}

.image-card__title {
  margin: 0;
  color: var(--color-text);
}

.image-card__subtitle {
  color: var(--color-brand);
}
```

- [ ] **Step 6: Run the test and verify it passes**

Run: `yarn test:headless-ai src/components/CardGrid/tests/ImageCard.unit.test.ts`

Expected: PASS (12 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/CardGrid
git commit -m "Render image cards with title, subtitle, and image branches"
```

---

### Task 6: `CardGrid.astro`

The grid wrapper, and the conditional hydration decision.

**Files:**
- Modify: `src/components/CardGrid/CardGrid.astro` (replacing the Task 3 placeholder)
- Create: `src/components/CardGrid/CardGrid.module.css`
- Create: `src/components/CardGrid/tests/CardGrid.unit.test.ts`

**Interfaces:**
- Consumes: `CardGridProps` (Task 5); `CardGridTooltips` (Task 7 — write a minimal stub in Step 3 here, then fill it in during Task 7).

- [ ] **Step 1: Write the failing test**

Create `src/components/CardGrid/tests/CardGrid.unit.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of the tooltip island.
import preactRenderer from "@astrojs/preact/server.js";
import CardGrid from "../CardGrid.astro";

async function renderGrid(props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container.renderToString(CardGrid as never, {
    props: {
      id: "card-grid-abc123",
      card_width: 150,
      tooltipCardIds: [],
      tooltipLabelsByCardId: {},
      ...props,
    },
    slots: { default: "<a>card</a>" },
  });
}

describe("CardGrid component", () => {
  it("renders a grid wrapper carrying its id", async () => {
    const html = await renderGrid({});

    expect(html).toContain("card-grid");
    expect(html).toContain('id="card-grid-abc123"');
  });

  it("exposes card_width as the --card-min-width custom property in px", async () => {
    const html = await renderGrid({ card_width: 225 });

    expect(html).toContain("--card-min-width: 225px");
  });

  it("renders its cards", async () => {
    const html = await renderGrid({});

    expect(html).toContain("<a>card</a>");
  });

  it("mounts no tooltip island when no card has a tooltip", async () => {
    const html = await renderGrid({ tooltipCardIds: [] });

    expect(html).not.toContain("astro-island");
  });

  it("mounts a tooltip island when at least one card has a tooltip", async () => {
    const html = await renderGrid({
      tooltipCardIds: ["card-grid-abc123-card-0"],
      tooltipLabelsByCardId: { "card-grid-abc123-card-0": "Alpha" },
    });

    expect(html).toContain("astro-island");
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test:headless-ai src/components/CardGrid/tests/CardGrid.unit.test.ts`

Expected: FAIL — the placeholder emits no `card-grid` class and no `--card-min-width`.

- [ ] **Step 3: Write a stub island so the import resolves**

Create `src/components/CardGrid/CardGridTooltips.tsx` as a stub. Task 7 replaces it:

```tsx
export default function CardGridTooltips() {
  return null;
}
```

- [ ] **Step 4: Write the component**

Replace `src/components/CardGrid/CardGrid.astro` entirely:

```astro
---
import styles from "./CardGrid.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import CardGridTooltips from "./CardGridTooltips";
import type { CardGridProps } from "./cardGridTypes";

type Props = CardGridProps;

const cl = classListFactory(styles);

const { id, card_width, tooltipCardIds, tooltipLabelsByCardId } = Astro.props;

// `--card-min-width` stays an inline style rather than a token: it is a
// per-instance value the author sets, not a theme value.
const gridStyle = `--card-min-width: ${card_width}px`;

// Hydrate only when a card actually needs a tooltip. Most grids have none, and
// this keeps the tooltip code out of their client bundle entirely.
const needsTooltips = tooltipCardIds.length > 0;
---

<div id={id} class={cl("card-grid")} style={gridStyle}>
  <slot />
  {
    needsTooltips && (
      <CardGridTooltips
        client:idle
        externalContext={{ scope: id, entries: { cardEls: tooltipCardIds } }}
        tooltipLabelsByCardId={tooltipLabelsByCardId}
      />
    )
  }
</div>
```

- [ ] **Step 5: Write the grid CSS**

Create `src/components/CardGrid/CardGrid.module.css`:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--card-min-width), 1fr)
  );
  gap: var(--space-md);
  margin-block: var(--space-md);
}
```

- [ ] **Step 6: Run the test and verify it passes**

Run: `yarn test:headless-ai src/components/CardGrid/tests/CardGrid.unit.test.ts`

Expected: PASS (5 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/CardGrid
git commit -m "Render the card grid wrapper with conditional tooltip hydration"
```

---

### Task 7: `CardGridTooltips.tsx`

The tooltip island. Written from scratch — Hugo used Bootstrap's `Tooltip` plugin, and there is no Bootstrap and no tooltip primitive in this site.

**Files:**
- Modify: `src/components/CardGrid/CardGridTooltips.tsx` (replacing the Task 6 stub)
- Create: `src/components/CardGrid/CardGridTooltips.module.css`
- Create: `src/components/CardGrid/tests/CardGridTooltips.unit.test.ts`

**Interfaces:**
- Consumes: `loadExternalContext` and `ExternalContext` from `@lib/componentUtils/loadExternalContext`; `tooltipLabelsByCardId` from the transform (Task 3).

Design notes to preserve:

- One bubble per grid, reused for every card. Positioned with `getBoundingClientRect()` at show time, so there is no layout work while idle.
- Placement is centered above the card, matching Bootstrap's default, so the port looks unchanged.
- `mouseenter` / `mouseleave` for pointer, `focus` / `blur` for keyboard, `Escape` to dismiss.
- **Accessibility divergence, and the reason must stay in a code comment.** Bootstrap moves the `title` attribute into its own markup, leaving the anchor with no accessible name. Instead the anchor carries `aria-label` (Task 5) and the bubble carries `aria-hidden="true"`. `aria-describedby` would double-announce text identical to the label. Without the comment, a future reader will "fix" this into a `role="tooltip"`.

- [ ] **Step 1: Write the failing test**

Create `src/components/CardGrid/tests/CardGridTooltips.unit.test.ts`:

```ts
// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import CardGridTooltips from "../CardGridTooltips";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

const GRID_ID = "card-grid-abc123";
const CARD_IDS = [`${GRID_ID}-card-0`, `${GRID_ID}-card-1`];
const LABELS = {
  [CARD_IDS[0]]: "Amazon Web Services",
  [CARD_IDS[1]]: "Google Cloud",
};

/**
 * Build server-equivalent grid markup (plain BEM classes, as classListFactory
 * emits) and mount the island into it, mirroring production where the DOM
 * exists before the island hydrates.
 */
function mountTooltips() {
  const grid = document.createElement("div");
  grid.id = GRID_ID;
  grid.className = "card-grid";

  for (const cardId of CARD_IDS) {
    const card = document.createElement("a");
    card.id = cardId;
    card.className = "image-card";
    card.href = "/integrations/";
    card.setAttribute("aria-label", LABELS[cardId]);
    grid.appendChild(card);
  }

  const islandHost = document.createElement("div");
  grid.appendChild(islandHost);
  document.body.appendChild(grid);

  render(
    h(CardGridTooltips, {
      externalContext: { scope: GRID_ID, entries: { cardEls: CARD_IDS } },
      tooltipLabelsByCardId: LABELS,
    }),
    islandHost,
  );

  return {
    grid,
    cards: CARD_IDS.map((id) => document.getElementById(id) as HTMLElement),
    bubble: () => grid.querySelector(".card-grid__tooltip") as HTMLElement,
  };
}

describe("CardGridTooltips", () => {
  it("renders a hidden bubble before any interaction", () => {
    const { bubble } = mountTooltips();

    expect(bubble()).toBeTruthy();
    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      false,
    );
  });

  it("marks the bubble aria-hidden so it does not double-announce", () => {
    const { bubble } = mountTooltips();

    expect(bubble().getAttribute("aria-hidden")).toBe("true");
  });

  it("shows the hovered card's label", async () => {
    const user = userEvent.setup();
    const { cards, bubble } = mountTooltips();

    await user.hover(cards[0]);

    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      true,
    );
    expect(bubble().textContent).toBe("Amazon Web Services");
  });

  it("hides the bubble on mouseleave", async () => {
    const user = userEvent.setup();
    const { cards, bubble } = mountTooltips();

    await user.hover(cards[0]);
    await user.unhover(cards[0]);

    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      false,
    );
  });

  it("shows only one tooltip at a time when moving between cards", async () => {
    const user = userEvent.setup();
    const { grid, cards, bubble } = mountTooltips();

    await user.hover(cards[0]);
    await user.unhover(cards[0]);
    await user.hover(cards[1]);

    expect(grid.querySelectorAll(".card-grid__tooltip")).toHaveLength(1);
    expect(bubble().textContent).toBe("Google Cloud");
  });

  it("shows the tooltip on keyboard focus", () => {
    const { cards, bubble } = mountTooltips();

    cards[0].dispatchEvent(new FocusEvent("focus"));

    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      true,
    );
  });

  it("hides the tooltip on blur", () => {
    const { cards, bubble } = mountTooltips();

    cards[0].dispatchEvent(new FocusEvent("focus"));
    cards[0].dispatchEvent(new FocusEvent("blur"));

    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      false,
    );
  });

  it("hides the tooltip when Escape is pressed", async () => {
    const user = userEvent.setup();
    const { cards, bubble } = mountTooltips();

    await user.hover(cards[0]);
    await user.keyboard("{Escape}");

    expect(bubble().classList.contains("card-grid__tooltip--visible")).toBe(
      false,
    );
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test:headless-ai src/components/CardGrid/tests/CardGridTooltips.unit.test.ts`

Expected: FAIL — the stub renders `null`, so no bubble exists.

- [ ] **Step 3: Write the island**

Replace `src/components/CardGrid/CardGridTooltips.tsx` entirely:

```tsx
import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./CardGridTooltips.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";

const cl = classListFactory(styles);

interface Props {
  externalContext: ExternalContext<{ cardEls: string[] }>;
  tooltipLabelsByCardId: Record<string, string>;
}

interface TooltipState {
  label: string;
  /** Viewport coordinates of the card's top-center edge. */
  top: number;
  left: number;
}

export default function CardGridTooltips({
  externalContext,
  tooltipLabelsByCardId,
}: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loaded = loadExternalContext(externalContext);
    if (!loaded) return;

    const hide = () => setTooltip(null);

    // Measured on show rather than tracked, so an idle grid does no layout work.
    const showFor = (card: HTMLElement) => {
      const label = tooltipLabelsByCardId[card.id];
      if (!label) return;
      const rect = card.getBoundingClientRect();
      setTooltip({
        label,
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };

    const teardowns: Array<() => void> = [];
    for (const card of loaded.cardEls) {
      const show = () => showFor(card);
      card.addEventListener("mouseenter", show);
      card.addEventListener("mouseleave", hide);
      card.addEventListener("focus", show);
      card.addEventListener("blur", hide);
      teardowns.push(() => {
        card.removeEventListener("mouseenter", show);
        card.removeEventListener("mouseleave", hide);
        card.removeEventListener("focus", show);
        card.removeEventListener("blur", hide);
      });
    }

    document.addEventListener("keydown", onEscape);
    teardowns.push(() => document.removeEventListener("keydown", onEscape));

    return () => {
      for (const teardown of teardowns) teardown();
    };
  }, [externalContext, tooltipLabelsByCardId]);

  // One bubble per grid, reused by every card, so only one can ever be visible.
  //
  // aria-hidden is deliberate, and so is the absence of role="tooltip" and
  // aria-describedby. Each card anchor already carries aria-label with this
  // exact text (ImageCard.astro), so a described-by relationship would make a
  // screen reader announce the same string twice. The bubble is purely a
  // visual affordance for sighted pointer users. Do not "fix" this by adding
  // tooltip semantics without also removing the aria-label.
  return (
    <div
      ref={bubbleRef}
      class={cl("card-grid__tooltip", tooltip && "card-grid__tooltip--visible")}
      aria-hidden="true"
      style={
        tooltip
          ? { top: `${tooltip.top}px`, left: `${tooltip.left}px` }
          : undefined
      }
    >
      {tooltip?.label ?? ""}
    </div>
  );
}
```

- [ ] **Step 4: Write the bubble CSS**

Create `src/components/CardGrid/CardGridTooltips.module.css`. `translate(-50%, -100%)` centers the bubble over the card and lifts it above the top edge, matching Bootstrap's `top` placement.

```css
.card-grid__tooltip {
  position: absolute;
  z-index: 1;
  transform: translate(-50%, -100%);
  margin-top: calc(-1 * var(--space-xs));
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius);
  background: var(--color-tooltip-bg);
  color: var(--color-tooltip-text);
  font-size: var(--font-size-sm);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
}

.card-grid__tooltip--visible {
  opacity: 1;
  visibility: visible;
}
```

If `--font-size-sm` does not exist in `src/styles/tokens/typography.css`, use the nearest existing small-text token rather than a hardcoded value. Check the file before writing.

- [ ] **Step 5: Run the test and verify it passes**

Run: `yarn test:headless-ai src/components/CardGrid/tests/CardGridTooltips.unit.test.ts`

Expected: PASS (8 tests).

- [ ] **Step 6: Re-run the grid test**

Run: `yarn test:headless-ai src/components/CardGrid/tests/CardGrid.unit.test.ts`

Expected: PASS (5 tests) — the real island still SSRs to an `astro-island` wrapper.

- [ ] **Step 7: Commit**

```bash
git add src/components/CardGrid
git commit -m "Add the card grid tooltip island"
```

---

### Task 8: Plaintext twin

Collapse the grid to a flat Markdown link list, matching what `html-to-mdoc` produces today so the Hugo cutover shows no diff in the published `.md` twins.

**Files:**
- Create: `src/components/CardGrid/plaintext/CardGrid.ts`
- Create: `src/components/CardGrid/plaintext/tests/unit.test.ts`
- Modify: `src/lib/plaintext/twinTransform.ts`

**Interfaces:**
- Consumes: `list`, `listItem`, `inline`, `link` from `@lib/plaintext/helpers`.
- Produces: `cardGridNode(cards: PlaintextCard[]): MarkdocNode`, registered in `twinTransform.ts`.

Only `href`, `title`, and `subtitle` survive. `src`, `alt`, `image_width`, and `tooltip` are dropped — none of them affect plaintext.

Display text, in priority order (from `html-to-mdoc` in the corp-node-packages repo: `packages/html-to-mdoc/src/elementProcessing/processors/utils/cardGridLink.ts`, `buildCardGridDisplayText`):

1. `title`
2. else the href's `tab` query param — the "same path, different tab" case. Without this, every card in the `mcp_server` grid collapses to `setup`, since they share a pathname.
3. else the final non-empty path segment.

A `subtitle` appends as `" - <subtitle>"` regardless of which branch produced the base text.

**Escaping — corrected from the spec.** Markdoc's `format()` already escapes `(` and `)` in link hrefs (verified: it emits `\(`, not `%28`). Do **not** port `escapeLinkUrl`; percent-encoding on top would double-escape. `format()` does *not* escape `[` / `]` in link text, so that one is still needed.

Href resolution: the twin takes hrefs as authored. Absolute-URL resolution and the `.md` suffix are handled by the site-wide link rewriting, not here — do not reimplement `buildCardGridHref`.

- [ ] **Step 1: Write the failing test**

Create `src/components/CardGrid/plaintext/tests/unit.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { cardGridNode } from "../CardGrid";
import { buildMarkdocStr } from "@lib/plaintext/helpers";

function renderCards(cards: Parameters<typeof cardGridNode>[0]): string {
  return buildMarkdocStr([cardGridNode(cards)]);
}

describe("cardGridNode", () => {
  it("emits one unordered list item per card", () => {
    const md = renderCards([
      { href: "/a/", title: "Alpha" },
      { href: "/b/", title: "Beta" },
    ]);

    expect(md).toBe("- [Alpha](/a/)\n- [Beta](/b/)\n");
  });

  it("prefers the title as display text", () => {
    const md = renderCards([{ href: "/mcp_server/setup/?tab=cursor", title: "Cursor" }]);

    expect(md).toContain("[Cursor]");
  });

  it("falls back to the tab query param when there is no title", () => {
    const md = renderCards([{ href: "/mcp_server/setup/?tab=cursor" }]);

    expect(md).toContain("[cursor]");
  });

  it("distinguishes cards that share a path but differ by tab", () => {
    const md = renderCards([
      { href: "/mcp_server/setup/?tab=cursor" },
      { href: "/mcp_server/setup/?tab=claudecode" },
    ]);

    expect(md).toContain("[cursor]");
    expect(md).toContain("[claudecode]");
  });

  it("falls back to the final path segment when there is no title or tab", () => {
    const md = renderCards([
      { href: "/database_monitoring/setup_postgres/rds/" },
    ]);

    expect(md).toContain("[rds]");
  });

  it("ignores a trailing slash when taking the final path segment", () => {
    const withSlash = renderCards([{ href: "/a/b/c/" }]);
    const withoutSlash = renderCards([{ href: "/a/b/c" }]);

    expect(withSlash).toBe(withoutSlash);
  });

  it("appends a subtitle after the title", () => {
    const md = renderCards([
      { href: "/serverless/jobs", title: "Jobs", subtitle: "(Preview)" },
    ]);

    expect(md).toContain("[Jobs - (Preview)]");
  });

  it("appends a subtitle after a fallback display text too", () => {
    const md = renderCards([{ href: "/a/b/rds/", subtitle: "(Preview)" }]);

    expect(md).toContain("[rds - (Preview)]");
  });

  it("escapes square brackets in link text", () => {
    const md = renderCards([{ href: "/a/", title: "Alpha [beta]" }]);

    expect(md).toContain("Alpha \\[beta\\]");
  });

  it("drops images, alt text, widths, and tooltips", () => {
    const md = renderCards([
      {
        href: "/a/",
        title: "Alpha",
        src: "logos/a.svg",
        alt: "A logo",
        tooltip: "Alpha tooltip",
        image_width: 200,
      },
    ]);

    expect(md).toBe("- [Alpha](/a/)\n");
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `yarn test:headless-ai src/components/CardGrid/plaintext/tests/unit.test.ts`

Expected: FAIL — cannot resolve `../CardGrid`.

- [ ] **Step 3: Write the twin**

Create `src/components/CardGrid/plaintext/CardGrid.ts`:

```ts
/**
 * AST twin of the `{% card-grid %}` component (`CardGrid.astro`).
 *
 * A grid collapses to a flat unordered list of links — one item per card, no
 * nesting and no images. This matches what the Hugo plaintext build
 * (`html-to-mdoc`'s cardGrid processor) emits today, so the Hugo-to-Astro
 * cutover produces no diff in the already-published `.md` twins.
 *
 * Only `href`, `title`, and `subtitle` survive; a grid carries no semantics
 * once its images are stripped.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { inline, link, list, listItem } from "@lib/plaintext/helpers";

export interface PlaintextCard {
  href: string;
  title?: string;
  subtitle?: string;
  // Accepted and ignored, so callers can pass a card through unchanged.
  src?: string;
  alt?: string;
  tooltip?: string;
  image_width?: number;
}

/**
 * Markdoc's `format()` escapes parens in link hrefs on its own, but leaves
 * brackets in link text alone — and an unescaped `]` would close the link
 * early. So text is escaped here and URLs are not.
 */
function escapeLinkText(text: string): string {
  return text.replace(/([[\]])/g, "\\$1");
}

/** The href's `tab` query param, if it has one. */
function tabQueryParam(href: string): string | null {
  const queryStart = href.indexOf("?");
  if (queryStart === -1) return null;
  const [query] = href.slice(queryStart + 1).split("#");
  return new URLSearchParams(query).get("tab");
}

/** The last non-empty path segment, ignoring any query string or fragment. */
function finalPathSegment(href: string): string {
  const path = href.split(/[?#]/)[0];
  const segments = path.split("/").filter((segment) => segment !== "");
  return segments[segments.length - 1] ?? "";
}

/**
 * Display text, in priority order: the title, else the `tab` query param, else
 * the final path segment.
 *
 * The tab branch exists because grids often link to one page's several tabs
 * (`/mcp_server/setup/?tab=cursor`, `?tab=claudecode`, ...). Those share a
 * pathname, so without it every card would read `setup`.
 */
function displayText({ title, subtitle, href }: PlaintextCard): string {
  const baseText = title ?? tabQueryParam(href) ?? finalPathSegment(href);
  return subtitle ? `${baseText} - ${subtitle}` : baseText;
}

export function cardGridNode(cards: PlaintextCard[]): MarkdocNode {
  const items = cards.map((card) =>
    listItem([inline([link(card.href, escapeLinkText(displayText(card)))])]),
  );
  return list("unordered", items);
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `yarn test:headless-ai src/components/CardGrid/plaintext/tests/unit.test.ts`

Expected: PASS (10 tests).

If the exact-string assertions in the first test fail on whitespace, adjust the *expected strings* to match what Markdoc's `format()` actually emits — the formatter owns list serialization, and matching it is the point. Do not restructure the AST to force a particular string.

- [ ] **Step 5: Register the twin**

In `src/lib/plaintext/twinTransform.ts`, add the import next to the other component twin imports:

```ts
import {
  cardGridNode,
  type PlaintextCard,
} from "@components/CardGrid/plaintext/CardGrid";
```

Then add this adapter to `twinAdaptersByTag`, after the `img` entry:

```ts
  "card-grid": (node) => {
    const cards: PlaintextCard[] = [];
    for (const child of node.children) {
      if (child.type !== "tag" || child.tag !== "image-card") continue;
      cards.push({
        href: String(attr(child, "href") ?? ""),
        title: attr(child, "title") as string | undefined,
        subtitle: attr(child, "subtitle") as string | undefined,
      });
    }
    return cardGridNode(cards);
  },
```

- [ ] **Step 6: Verify the twin transform tests still pass**

Run: `yarn test:headless-ai src/lib/plaintext`

Expected: PASS. If `twinTransform.unit.test.ts` has a snapshot covering the full component test page, it may legitimately change now that `card-grid` renders as a link list instead of round-tripping as a raw tag. Read the diff: a link list is correct; anything else is a bug.

- [ ] **Step 7: Commit**

```bash
git add src/components/CardGrid/plaintext src/lib/plaintext/twinTransform.ts
git commit -m "Add card-grid plaintext twin emitting a flat link list"
```

---

### Task 9: Browser tests

Cover only what unit tests cannot reach: real hover, real focus, real navigation, and whether an island actually hydrates.

**Files:**
- Create: `src/components/CardGrid/tests/browser.test.ts`

**Interfaces:**
- Consumes: the mock document at `src/content/en/dd_e2e/components/card-grid.mdoc`, served at `/dd_e2e/components/card-grid`. That page already routes through `src/pages/[...slug].astro` — no new page file is needed.

Section order on that page, which the selectors depend on:

1. Basic card (src, href, alt)
2. Card with title and subtitle
3. Title-only card (no src)
4. Card with tooltip
5. Cards inheriting `image_width` from card-grid
6. Card overriding `image_width`
7. Custom `card_width`

So `.card-grid` at index 3 is the tooltip grid, and index 0 has no tooltip.

- [ ] **Step 1: Write the failing test**

Create `src/components/CardGrid/tests/browser.test.ts`:

```ts
import { test, expect } from "@playwright/test";

// Grid order matches the section order in
// src/content/en/dd_e2e/components/card-grid.mdoc.
const TOOLTIP_GRID_INDEX = 3;
const PLAIN_GRID_INDEX = 0;

test.describe("CardGrid component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/card-grid");
  });

  test("renders every grid on the page", async ({ page }) => {
    await expect(page.locator(".card-grid")).toHaveCount(7);
  });

  test("shows a tooltip on hover and hides it on mouseleave", async ({
    page,
  }) => {
    const grid = page.locator(".card-grid").nth(TOOLTIP_GRID_INDEX);
    const card = grid.locator(".image-card").first();
    const tooltip = grid.locator(".card-grid__tooltip");

    await card.hover();
    await expect(tooltip).toHaveClass(/card-grid__tooltip--visible/);
    await expect(tooltip).toHaveText("Amazon Web Services integration");

    await page.mouse.move(0, 0);
    await expect(tooltip).not.toHaveClass(/card-grid__tooltip--visible/);
  });

  test("shows the tooltip on keyboard focus", async ({ page }) => {
    const grid = page.locator(".card-grid").nth(TOOLTIP_GRID_INDEX);
    const tooltip = grid.locator(".card-grid__tooltip");

    await grid.locator(".image-card").first().focus();

    await expect(tooltip).toHaveClass(/card-grid__tooltip--visible/);
  });

  test("hides the tooltip when Escape is pressed", async ({ page }) => {
    const grid = page.locator(".card-grid").nth(TOOLTIP_GRID_INDEX);
    const tooltip = grid.locator(".card-grid__tooltip");

    await grid.locator(".image-card").first().hover();
    await expect(tooltip).toHaveClass(/card-grid__tooltip--visible/);

    await page.keyboard.press("Escape");

    await expect(tooltip).not.toHaveClass(/card-grid__tooltip--visible/);
  });

  test("clicking a card navigates, so the tooltip does not swallow the click", async ({
    page,
  }) => {
    const grid = page.locator(".card-grid").nth(TOOLTIP_GRID_INDEX);

    await grid.locator(".image-card").first().click();

    await expect(page).toHaveURL(/\/integrations\/aws\//);
  });

  test("hydrates no tooltip island in a grid with no tooltips", async ({
    page,
  }) => {
    const grid = page.locator(".card-grid").nth(PLAIN_GRID_INDEX);

    await expect(grid.locator(".card-grid__tooltip")).toHaveCount(0);
  });

  test("applies the inherited image width to every card in the grid", async ({
    page,
  }) => {
    // Section 5: {% card-grid image_width="100" %} with two cards, neither
    // setting its own width.
    const images = page.locator(".card-grid").nth(4).locator(".image-card__image");

    await expect(images).toHaveCount(2);
    await expect(images.nth(0)).toHaveAttribute("width", "100");
    await expect(images.nth(1)).toHaveAttribute("width", "100");
  });

  test("lets a card override the grid's image width", async ({ page }) => {
    // Section 6: grid sets 100, the single card sets 200.
    const image = page.locator(".card-grid").nth(5).locator(".image-card__image");

    await expect(image).toHaveAttribute("width", "200");
  });
});
```

- [ ] **Step 2: Run the test and verify the state of each case**

Run: `yarn test:browser-ai src/components/CardGrid/tests/browser.test.ts`

Expected: most cases PASS on the first run, since Tasks 5-7 already built the components. This step is a real check, not a formality — read every failure. A failing navigation test or a hydration test that finds a tooltip in the plain grid is a genuine bug in Task 6 or 7, not a test to loosen.

The one case likely to need adjustment is the click-navigation URL: confirm where `/integrations/aws/` actually resolves on the dev server, and correct the expected URL if it redirects.

- [ ] **Step 3: Fix any failures in the components, not the tests**

If a case fails, fix the component. Only change a test when the *expectation* was wrong (a URL that redirects, a grid index that is off by one) — never to accommodate a real defect.

- [ ] **Step 4: Add the visual snapshots**

Snapshots are generated last because they are rebase-fragile — a lesson from the `Img` build. Append to the same file:

```ts
test.describe("CardGrid visual snapshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dd_e2e/components/card-grid");
  });

  test("basic image card", async ({ page }) => {
    await expect(page.locator(".card-grid").nth(0)).toHaveScreenshot(
      "card-grid-basic.png",
    );
  });

  test("titled and subtitled card", async ({ page }) => {
    await expect(page.locator(".card-grid").nth(1)).toHaveScreenshot(
      "card-grid-titled.png",
    );
  });

  test("tooltip open", async ({ page }) => {
    const grid = page.locator(".card-grid").nth(3);
    await grid.locator(".image-card").first().hover();
    await expect(grid.locator(".card-grid__tooltip")).toHaveClass(
      /card-grid__tooltip--visible/,
    );
    await expect(grid).toHaveScreenshot("card-grid-tooltip-open.png");
  });
});
```

- [ ] **Step 5: Generate the snapshots**

Run: `yarn test:browser-ai src/components/CardGrid/tests/browser.test.ts --update-snapshots`

Then review each generated PNG before committing. A snapshot of a broken layout is worse than no snapshot.

- [ ] **Step 6: Run the browser suite once more against the committed snapshots**

Run: `yarn test:browser-ai src/components/CardGrid/tests/browser.test.ts`

Expected: PASS (11 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/CardGrid/tests
git commit -m "Add card-grid browser tests and visual snapshots"
```

---

### Task 10: Full regression run and cleanup

**Files:**
- No new files. Possible fixes anywhere touched by Tasks 1-9.

- [ ] **Step 1: Run the full test suite**

Run: `yarn test-ai`

This is the first full run — earlier tasks deliberately scoped tests tightly. Expected: PASS.

The most likely regression source is Task 1's `Img.astro` refactor. If an `Img` snapshot moved, the helper is not returning identical strings; fix `buildImageUrl`, not the snapshot.

The second most likely is the plaintext twin transform snapshot, which legitimately changes if it covers a page containing a card grid. Read that diff carefully: a flat link list is correct.

- [ ] **Step 2: Check the rendered page by eye**

Run: `yarn dev`, then open `http://localhost:4321/dd_e2e/components/card-grid`.

Confirm against `hugo/assets/styles/components/_cards.scss:37-84` and the live Hugo pages in the spec:

- All seven sections render.
- Titled cards are taller than untitled ones (140px vs 100px min-height).
- Hovering a card raises a shadow.
- The subtitle is Datadog purple.
- The tooltip appears centered above its card.
- Section 5's two cards are the same, smaller size; section 6's single card is larger.

- [ ] **Step 3: Check the plaintext output by eye**

Open `http://localhost:4321/dd_e2e/components/card-grid.md`.

Every grid should be a flat list of links. Section 4's tooltip card should read `- [aws](/integrations/aws/)` — no title is set there, and the href has no `tab` param, so it falls through to the final path segment.

- [ ] **Step 4: Compare semantics against the cdocs reference**

Open `~/repos/corp-node-packages/packages/cdocs-hugo-integration/test/__snapshots__/validSite/content/en/tags_and_elements/card_grid/_index.md`, which renders the same source document.

Class names and srcset breakpoints differ, for the reasons in spec sections 4 and 6. What must agree, case for case: which title element each card uses, which width each image gets, and which cards carry tooltip markup. **Compare semantics, not bytes.**

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "Fix regressions found in the card-grid full test run"
```

Skip this step if nothing needed fixing.

- [ ] **Step 6: Recommend the production build to the user**

Do not run it. Tell the user the feature is complete and that `yarn build` is the appropriate final verification before opening a PR.

---

## Self-Review

**Spec coverage.** Every section maps to a task: §1 schema → Task 2; §2 transform → Task 3; §3 components → Tasks 5, 6, 7; §4 shared image helper → Task 1; §5 tooltips → Task 7; §6 CSS and tokens → Tasks 4, 5, 6, 7; §7 plaintext twin → Task 8; §8 testing → distributed across every task, with browser tests in Task 9 and the full run in Task 10. The one spec item deliberately not implemented is §8's demo page, for the reason given under "Verified Deviations."

**Type consistency.** `buildImageUrl(src)` returns `{ imageUrl, srcset, popupHref }` in Task 1 and is destructured identically in Tasks 1 and 5. `ImageCardProps` and `CardGridProps` are defined in Task 5 and consumed unchanged in Tasks 5 and 6. `tooltipLabelsByCardId` is produced in Task 3, typed in Task 5, passed in Task 6, and consumed in Task 7 under the same name. `cardGridNode(cards: PlaintextCard[])` is defined in Task 8 Step 3 and called in Task 8 Step 5 with the same signature. `DEFAULT_IMAGE_WIDTH` is defined once in `cardGridTypes.ts`.

**Divergence from the spec's transform sketch.** The spec passes a bare `tooltips` array to the island. This plan passes `tooltipLabelsByCardId`, a record keyed by card id, so a label cannot drift onto the wrong card if the array and the id list ever fall out of order. The spec's `child.transformChildren(config)` call is also dropped, since `image-card` is self-closing and has no children.
