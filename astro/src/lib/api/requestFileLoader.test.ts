import { describe, expect, it } from "vitest";
import { getRequestFileExamples } from "./requestFileLoader";

// Reads the frozen copies in tests/fixtures/api/request-files/ (see its
// README), through the alias override in vitest.unit.config.ts.
describe("getRequestFileExamples", () => {
  it("returns the operation's request file, named by its CodeExamples description", () => {
    const { examples } = getRequestFileExamples(
      "CreateIncident",
      "v2",
      "incidents",
    );

    expect(examples.map((example) => example.name)).toEqual([
      'Create an incident returns "CREATED" response',
    ]);
    expect(JSON.parse(examples[0].value).data.attributes.title).toBe(
      "Example-Incident",
    );
  });

  it("keeps the file's text as written", () => {
    const {
      examples: [example],
    } = getRequestFileExamples("CreateIncident", "v2", "incidents");

    expect(example.value.startsWith('{\n  "data": {\n')).toBe(true);
  });

  // Entries without a file are skipped, not replaced by entries further down
  // the list to make up the 3.
  it("reads only the first 3 CodeExamples entries, skipping those without a file", () => {
    const { examples } = getRequestFileExamples(
      "CreateMonitor",
      "v1",
      "monitors",
    );

    expect(examples.map((example) => example.name)).toEqual([
      'Create a Cost Monitor returns "OK" response',
      'Create a RUM formula and functions monitor returns "OK" response',
    ]);
  });

  it("returns nothing for an operation without request files", () => {
    expect(
      getRequestFileExamples("ListIncidents", "v2", "incidents").examples,
    ).toEqual([]);
  });

  // Some v2 filenames exist in two tag folders, so the folder is part of the key.
  it("reads only from the operation's own tag folder", () => {
    expect(
      getRequestFileExamples("CreateIncident", "v2", "monitors").examples,
    ).toEqual([]);
  });

  // When none of the first 3 entries has a file, `request.<operationId>.json`
  // is shown, untitled.
  it("falls back to the file without a suffix when no CodeExamples entry has a file", () => {
    const { examples, showTitles, isFallbackFile } = getRequestFileExamples(
      "UpdateRole",
      "v2",
      "roles",
    );

    expect(examples).toHaveLength(1);
    expect(JSON.parse(examples[0].value).data.attributes.name).toBe(
      "developers-updated",
    );
    expect(showTitles).toBe(false);
    expect(isFallbackFile).toBe(true);
  });

  it("doesn't mark CodeExamples request files as the fallback", () => {
    expect(
      getRequestFileExamples("CreateIncident", "v2", "incidents")
        .isFallbackFile,
    ).toBe(false);
  });

  // The examples are titled when the operation has more than one
  // CodeExamples entry, counting entries without a file and past the first 3.
  it("titles the examples when the operation has more than one CodeExamples entry", () => {
    expect(
      getRequestFileExamples("CreateMonitor", "v1", "monitors").showTitles,
    ).toBe(true);
  });

  it("doesn't title the example of an operation with one CodeExamples entry", () => {
    expect(
      getRequestFileExamples("CreateIncident", "v2", "incidents").showTitles,
    ).toBe(false);
  });
});
