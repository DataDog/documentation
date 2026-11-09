import { describe, it, expect } from "vitest";
import { parseCommandLineArguments } from "./fetchApiSpec.ts";

describe("parseCommandLineArguments", () => {
  it("defaults to the network bundle, no forced refetch, and a fatal failure", () => {
    expect(parseCommandLineArguments([])).toEqual({
      bundlePath: null,
      force: false,
      bestEffort: false,
    });
  });

  it("accepts --bundle as a separate argument", () => {
    expect(parseCommandLineArguments(["--bundle", "/tmp/api.tgz"])).toEqual({
      bundlePath: "/tmp/api.tgz",
      force: false,
      bestEffort: false,
    });
  });

  it("accepts --bundle=<path>", () => {
    expect(parseCommandLineArguments(["--bundle=/tmp/api.tgz"])).toEqual({
      bundlePath: "/tmp/api.tgz",
      force: false,
      bestEffort: false,
    });
  });

  it("combines flags", () => {
    expect(parseCommandLineArguments(["--best-effort", "--force"])).toEqual({
      bundlePath: null,
      force: true,
      bestEffort: true,
    });
  });

  it("rejects --bundle with no value, rather than silently going to network", () => {
    expect(() => parseCommandLineArguments(["--bundle"])).toThrow(/--bundle/);
    expect(() => parseCommandLineArguments(["--bundle", "--force"])).toThrow(
      /--bundle/,
    );
  });

  it("rejects an unknown flag by name", () => {
    expect(() => parseCommandLineArguments(["--bundel", "x"])).toThrow(
      /--bundel/,
    );
  });
});
