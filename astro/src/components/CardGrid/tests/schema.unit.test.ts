import { describe, it, expect } from "vitest";
import Markdoc from "@markdoc/markdoc";
import type { Config } from "@markdoc/markdoc";
import schema from "../../../../markdoc.schema.mjs";

// The schema comes from an untyped `.mjs`, and its tags carry Astro render
// values that Markdoc's `Config` types as plain strings (see the note in
// transform.unit.test.ts). Cast once here so the validate() calls below stay
// typed.
const config = { tags: schema.tags, nodes: schema.nodes } as unknown as Config;

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

  it("rejects a card whose src and title are empty strings", () => {
    // An empty attribute is present but carries no content, so a null check
    // alone lets it through and the card renders as an empty clickable box —
    // exactly what this error exists to prevent.
    const ids = errorIds(
      `{% card-grid %}\n{% image-card href="/a/" src="" title="" /%}\n{% /card-grid %}`,
    );

    expect(ids).toContain("image-card-no-content");
  });

  it("accepts a card with src but no title", () => {
    // `alt` carries the accessible name here; see the nameless-card test below
    // for why an image-only card cannot omit every naming attribute.
    const ids = errorIds(
      `{% card-grid %}\n{% image-card href="/a/" src="logos/aws.svg" alt="AWS" /%}\n{% /card-grid %}`,
    );

    expect(ids).toEqual([]);
  });

  it("rejects an image-only card that has no accessible name", () => {
    // A link's accessible name comes from its visible title, its aria-label
    // (which ImageCard fills from `tooltip`), or the alt text of the image
    // inside it. With `alt` defaulting to "" — the correct value for a
    // decorative image — a card with none of the three renders as an anchor a
    // screen reader announces only as "link" (WCAG 4.1.2, Name Role Value).
    // Verified in a browser: a non-empty alt does name the anchor, an empty
    // one leaves it nameless.
    const ids = errorIds(
      `{% card-grid %}\n{% image-card href="/a/" src="logos/aws.svg" /%}\n{% /card-grid %}`,
    );

    expect(ids).toContain("image-card-no-accessible-name");
  });

  it.each([
    ["alt", `alt="Amazon Web Services"`],
    ["title", `title="AWS"`],
    ["tooltip", `tooltip="Amazon Web Services"`],
  ])("accepts an image-only card named by %s alone", (_label, attribute) => {
    const ids = errorIds(
      `{% card-grid %}\n{% image-card href="/a/" src="logos/aws.svg" ${attribute} /%}\n{% /card-grid %}`,
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
