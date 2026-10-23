import { describe, expect, it } from "vitest";
import { getRequestFileExamples } from "./requestFileLoader";

// Reads the frozen copies in tests/fixtures/api/request-files/ (see its
// README), through the alias override in vitest.unit.config.ts.
describe("getRequestFileExamples", () => {
  it("returns the operation's request file, named by its CodeExamples description", () => {
    const examples = getRequestFileExamples(
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
    const [example] = getRequestFileExamples(
      "CreateIncident",
      "v2",
      "incidents",
    );

    expect(example.value.startsWith('{\n  "data": {\n')).toBe(true);
  });

  // Hugo takes the first 3 CodeExamples entries, then skips any without a
  // file. It doesn't reach further down the list to make up the 3.
  it("reads only the first 3 CodeExamples entries, skipping those without a file", () => {
    const examples = getRequestFileExamples("CreateMonitor", "v1", "monitors");

    expect(examples.map((example) => example.name)).toEqual([
      'Create a Cost Monitor returns "OK" response',
      'Create a RUM formula and functions monitor returns "OK" response',
    ]);
  });

  it("returns nothing for an operation without request files", () => {
    expect(getRequestFileExamples("ListIncidents", "v2", "incidents")).toEqual(
      [],
    );
  });

  // Some v2 filenames exist in two tag folders, so the folder is part of the key.
  it("reads only from the operation's own tag folder", () => {
    expect(getRequestFileExamples("CreateIncident", "v2", "monitors")).toEqual(
      [],
    );
  });
});
