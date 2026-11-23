import { describe, it, expect } from "vitest";
import { parseCommandLineArguments } from "./fetchApiCodeExamples.ts";

describe("parseCommandLineArguments", () => {
  it("defaults to the network pins, no forced refetch, and a fatal failure", () => {
    expect(parseCommandLineArguments([])).toEqual({
      pinsPath: null,
      force: false,
      bestEffort: false,
    });
  });

  it("accepts --pins as a separate argument", () => {
    expect(parseCommandLineArguments(["--pins", "/tmp/pins.json"])).toEqual({
      pinsPath: "/tmp/pins.json",
      force: false,
      bestEffort: false,
    });
  });

  it("accepts --pins=<path>", () => {
    expect(parseCommandLineArguments(["--pins=/tmp/pins.json"])).toEqual({
      pinsPath: "/tmp/pins.json",
      force: false,
      bestEffort: false,
    });
  });

  it("accepts --force", () => {
    expect(parseCommandLineArguments(["--force"])).toEqual({
      pinsPath: null,
      force: true,
      bestEffort: false,
    });
  });

  it("accepts --best-effort", () => {
    expect(parseCommandLineArguments(["--best-effort"])).toEqual({
      pinsPath: null,
      force: false,
      bestEffort: true,
    });
  });

  it("combines flags", () => {
    expect(
      parseCommandLineArguments(["--best-effort", "--pins=/tmp/p.json"]),
    ).toEqual({
      pinsPath: "/tmp/p.json",
      force: false,
      bestEffort: true,
    });
  });

  it("rejects --pins with no value, rather than silently going to network", () => {
    expect(() => parseCommandLineArguments(["--pins"])).toThrow(/--pins/);
  });

  it("rejects an unknown flag by name", () => {
    expect(() => parseCommandLineArguments(["--pinz", "x"])).toThrow(/--pinz/);
  });
});
