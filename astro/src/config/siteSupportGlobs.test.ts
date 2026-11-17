/**
 * Checks Astro's url_paths matcher against the shared conformance table.
 *
 * Hugo runs the same table through its own glob-to-regex translation on every
 * build. Both sites passing the same cases is what keeps the two
 * implementations from disagreeing about which pages get a banner.
 */
import { parse as parseYaml } from "yaml";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import GLOB_CASES_RAW from "@shared/tests/site_support_globs.yaml?raw";
import { compileUrlPath } from "./siteSupport";

const CasesSchema = z.object({
  cases: z
    .array(
      z.object({
        pattern: z.string(),
        matches: z.array(z.string()).default([]),
        does_not_match: z.array(z.string()).default([]),
      }),
    )
    .min(1),
});

const { cases } = CasesSchema.parse(parseYaml(GLOB_CASES_RAW));

describe("url_paths conformance table", () => {
  for (const { pattern, matches, does_not_match } of cases) {
    describe(pattern, () => {
      const isMatch = compileUrlPath(pattern);
      for (const path of matches) {
        it(`matches ${path}`, () => expect(isMatch(path)).toBe(true));
      }
      for (const path of does_not_match) {
        it(`does not match ${path}`, () => expect(isMatch(path)).toBe(false));
      }
    });
  }
});
