import { describe, it, expect } from "vitest";
import { format } from "@markdoc/markdoc";
import { documentNode } from "@lib/plaintext/helpers";
import { apiCodeInstructionsNodes } from "../ApiCodeInstructions";

function render(): string {
  return format(
    documentNode(
      apiCodeInstructionsNodes({
        language: "python",
        exampleFile: "example.py",
        runCommandByRegion: {
          us: 'DD_SITE="datadoghq.com" python3 "example.py"',
          eu: 'DD_SITE="datadoghq.eu" python3 "example.py"',
        },
      }),
    ),
  );
}

describe("apiCodeInstructionsNodes", () => {
  it("renders the heading, install link, and example file", () => {
    const out = render();
    expect(out).toContain("Instructions");
    expect(out).toContain(
      "[install the library and its dependencies](/api/latest/?code-lang=python)",
    );
    expect(out).toContain("`example.py`");
  });

  it("uses the first region's run command", () => {
    const out = render();
    expect(out).toContain('DD_SITE="datadoghq.com" python3 "example.py"');
    expect(out).not.toContain("datadoghq.eu");
  });
});
