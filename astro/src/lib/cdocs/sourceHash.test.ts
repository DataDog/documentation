import { describe, it, expect } from "vitest";
import { hashCdocsSource, type HashCdocsSourceInput } from "./sourceHash";

const partialSourceByFile: Record<string, string> = {
  "@partials/intro.mdoc": 'Intro. {% partial file="@partials/nested.mdoc" /%}',
  "@partials/nested.mdoc": "Nested.",
  "@partials/unused.mdoc": "Unused.",
  "@partials/loop.mdoc": 'Loop. {% partial file="@partials/loop.mdoc" /%}',
};

const frontmatter = { title: "Setup", content_filters: [{ trait_id: "os" }] };

const baseInput: HashCdocsSourceInput = {
  frontmatter,
  body: '# Setup\n\n{% partial file="@partials/intro.mdoc" /%}\n',
  filtersManifest: { defaultValsByTraitId: { os: "linux" } },
  resolvePartial: (file) => partialSourceByFile[file],
};

function hashWithPartial(file: string, source: string) {
  return hashCdocsSource({
    ...baseInput,
    resolvePartial: (requestedFile) =>
      requestedFile === file ? source : partialSourceByFile[requestedFile],
  });
}

describe("hashCdocsSource", () => {
  it("is a 32-character hex md5, the same for the same input", () => {
    const hash = hashCdocsSource(baseInput);

    expect(hash).toMatch(/^[0-9a-f]{32}$/);
    expect(hashCdocsSource({ ...baseInput })).toBe(hash);
  });

  it("changes when the body changes", () => {
    expect(hashCdocsSource({ ...baseInput, body: "# Other\n" })).not.toBe(
      hashCdocsSource(baseInput),
    );
  });

  it("changes when the frontmatter changes", () => {
    expect(
      hashCdocsSource({
        ...baseInput,
        frontmatter: { ...frontmatter, title: "Install" },
      }),
    ).not.toBe(hashCdocsSource(baseInput));
  });

  it("changes when the filter config changes", () => {
    expect(
      hashCdocsSource({
        ...baseInput,
        filtersManifest: { defaultValsByTraitId: { os: "windows" } },
      }),
    ).not.toBe(hashCdocsSource(baseInput));
  });

  it("changes when a partial the page includes changes", () => {
    expect(hashWithPartial("@partials/intro.mdoc", "Changed.")).not.toBe(
      hashCdocsSource(baseInput),
    );
  });

  it("changes when a partial included by a partial changes", () => {
    expect(hashWithPartial("@partials/nested.mdoc", "Changed.")).not.toBe(
      hashCdocsSource(baseInput),
    );
  });

  it("doesn't change when a partial the page doesn't include changes", () => {
    expect(hashWithPartial("@partials/unused.mdoc", "Changed.")).toBe(
      hashCdocsSource(baseInput),
    );
  });

  it("finds a partial inside a conditional", () => {
    const body =
      '{% if equals($os, "linux") %}\n{% partial file="@partials/nested.mdoc" /%}\n{% /if %}\n';
    const hashFor = (nestedSource: string) =>
      hashCdocsSource({
        ...baseInput,
        body,
        resolvePartial: (file) =>
          file === "@partials/nested.mdoc" ? nestedSource : undefined,
      });

    expect(hashFor("Changed.")).not.toBe(hashFor("Nested."));
  });

  it("handles a partial that includes itself, and a missing partial", () => {
    expect(
      hashCdocsSource({
        ...baseInput,
        body: '{% partial file="@partials/loop.mdoc" /%}\n{% partial file="@partials/missing.mdoc" /%}\n',
      }),
    ).toMatch(/^[0-9a-f]{32}$/);
  });
});
