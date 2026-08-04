import { describe, it, expect } from "vitest";
import { parse } from "@markdoc/markdoc";
import { buildMarkdocStr } from "@lib/plaintext/helpers";
import { stepperNodes } from "../Stepper";

const render = (nodes: ReturnType<typeof stepperNodes>): string =>
  buildMarkdocStr(nodes);

describe("stepperNodes", () => {
  it("renders each step as a numbered heading followed by its content", () => {
    const nodes = stepperNodes([
      { title: "First", children: parse("Do first.").children },
      { title: "Second", children: parse("Do second.").children },
    ]);
    const result = render(nodes);

    // Default level is h3, so headings use three hashes.
    expect(result).toContain("### Step 1: First");
    expect(result).toContain("Do first.");
    expect(result).toContain("### Step 2: Second");
    expect(result).toContain("Do second.");
    // Order is preserved.
    expect(result.indexOf("Step 1")).toBeLessThan(result.indexOf("Step 2"));
  });

  it("does not round-trip the stepper/step tag markup", () => {
    const result = render(stepperNodes([{ title: "Only" }]));
    expect(result).not.toContain("{% stepper");
    expect(result).not.toContain("{% step");
  });

  it("uses the configured heading level", () => {
    const result = render(
      stepperNodes([{ title: "Only" }], { level: "h2" }),
    );
    expect(result).toContain("## Step 1: Only");
  });

  it("omits the title portion when a step has none", () => {
    const result = render(stepperNodes([{ title: "" }]));
    expect(result).toContain("### Step 1");
    expect(result).not.toContain("Step 1:");
  });

  it("appends the finished block content after the steps", () => {
    const result = render(
      stepperNodes([{ title: "Only" }], {
        finished: parse("You finished.").children,
      }),
    );
    expect(result).toContain("You finished.");
    expect(result.indexOf("Step 1")).toBeLessThan(
      result.indexOf("You finished."),
    );
  });
});
