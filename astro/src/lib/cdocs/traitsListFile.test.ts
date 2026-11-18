import { describe, it, expect } from "vitest";
import { cdocsTraitsListPath } from "./traitsListFile";

describe("cdocsTraitsListPath", () => {
  it("names the file after a hash of its contents, under _astro/", () => {
    expect(cdocsTraitsListPath('{"traits":[],"pages":{}}')).toMatch(
      /^_astro\/cdocs-traits\.[0-9a-f]{12}\.json$/,
    );
  });

  it("gives the same contents the same name", () => {
    const json = '{"traits":["os"],"pages":{"a":[0]}}';
    expect(cdocsTraitsListPath(json)).toBe(cdocsTraitsListPath(json));
  });

  it("gives different contents a different name", () => {
    expect(cdocsTraitsListPath('{"traits":["os"],"pages":{}}')).not.toBe(
      cdocsTraitsListPath('{"traits":["host"],"pages":{}}'),
    );
  });
});
