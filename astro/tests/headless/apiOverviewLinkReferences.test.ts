import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OVERVIEW_DIR = join(import.meta.dirname, "../../src/content/en/api/latest");

describe("API Overview link reference definitions", () => {
  // Markdoc resolves a reference label across the whole document and keeps
  // the first definition, so a label defined again inside a tab silently
  // repoints every other use of it. Hugo rendered each tab separately.
  it("define each label once per page", () => {
    const duplicates: string[] = [];
    for (const filename of readdirSync(OVERVIEW_DIR)) {
      if (!filename.endsWith(".mdoc")) continue;
      const source = readFileSync(join(OVERVIEW_DIR, filename), "utf8");
      const labels = [...source.matchAll(/^\[([^\]]+)\]:/gm)].map(
        (match) => match[1],
      );
      const seen = new Set<string>();
      for (const label of labels) {
        if (seen.has(label)) duplicates.push(`${filename}: [${label}]`);
        seen.add(label);
      }
    }

    expect(duplicates).toEqual([]);
  });
});
