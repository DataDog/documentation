import { describe, expect, it } from "vitest";
import { repairTableRowLineBreaks } from "./repairTableRows.ts";

const header = ["| Field | Type | Description |", "| --- | --- | --- |"];

describe("repairTableRowLineBreaks", () => {
  it("joins a row whose cell continues on indented lines", () => {
    const markdown = [
      ...header,
      "| reflow_type | enum | Reflow type.",
      "  If set to 'fixed', widgets have a layout.",
      "  Allowed values: `auto`. |",
      "| tags | [string] | Tags. |",
    ].join("\n");
    const repaired = repairTableRowLineBreaks(markdown);
    expect(repaired.markdown.split("\n")).toEqual([
      ...header,
      "| reflow_type | enum | Reflow type. If set to 'fixed', widgets have a layout. Allowed values: `auto`. |",
      "| tags | [string] | Tags. |",
    ]);
    expect([...repaired.repairedRowLines]).toEqual([2]);
  });

  it("joins a row whose cell continues after a blank line", () => {
    const markdown = [
      ...header,
      "| is_read_only | boolean | Whether this dashboard is read-only.",
      "",
      "This property is deprecated. |",
      "| layout_type | enum | Layout type. |",
    ].join("\n");
    const repaired = repairTableRowLineBreaks(markdown);
    expect(repaired.markdown.split("\n")).toEqual([
      ...header,
      "| is_read_only | boolean | Whether this dashboard is read-only. This property is deprecated. |",
      "| layout_type | enum | Layout type. |",
    ]);
    expect([...repaired.repairedRowLines]).toEqual([2]);
  });

  it("reports each repaired row at its line in the repaired markdown", () => {
    const markdown = [
      ...header,
      "| a | string | One",
      "  more. |",
      "| b | string | Two",
      "  more. |",
    ].join("\n");
    expect([...repairTableRowLineBreaks(markdown).repairedRowLines]).toEqual([
      2, 3,
    ]);
  });

  it("leaves well-formed tables and code fences alone", () => {
    const markdown = [
      ...header,
      "| a | string | One. |",
      "",
      "```ruby",
      "| a | b",
      "DatadogAPIClient.configure do |config|",
      "```",
    ].join("\n");
    const repaired = repairTableRowLineBreaks(markdown);
    expect(repaired.markdown).toBe(markdown);
    expect(repaired.repairedRowLines.size).toBe(0);
  });

  it("leaves an unterminated row alone when no line closes it", () => {
    const markdown = [
      ...header,
      "| a | string | One",
      "| b | string | Two. |",
    ].join("\n");
    expect(repairTableRowLineBreaks(markdown).markdown).toBe(markdown);
  });
});
