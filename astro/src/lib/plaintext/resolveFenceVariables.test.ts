import { describe, it, expect } from "vitest";
import { format, parse } from "@lib/plaintext/helpers";
import { resolveFenceVariables } from "./resolveFenceVariables";

const VARIABLES = {
  sdkVersions: { "datadog-api-client-java": "9.9.9" },
};

/** Parse `source`, resolve fence variables, and format it back to text. */
function resolved(source: string): string {
  const document = parse(source);
  resolveFenceVariables(document.children, VARIABLES);
  return format(document);
}

describe("resolveFenceVariables", () => {
  it("replaces a variable inside a fence with its value", () => {
    const output = resolved(
      "```xml\n<version>{% $sdkVersions.datadog-api-client-java %}</version>\n```\n",
    );

    expect(output).toContain("<version>9.9.9</version>");
    expect(output).not.toContain("$sdkVersions");
  });

  it("leaves a process=false fence unchanged", () => {
    const output = resolved(
      "```xml {% process=false %}\n{% $sdkVersions.datadog-api-client-java %}\n```\n",
    );

    expect(output).toContain("{% $sdkVersions.datadog-api-client-java %}");
  });

  it("keeps the Markdoc tags in a fence that shows them as an example", () => {
    // The plaintext config has no tag schemas, so Markdoc would reduce
    // `{% alert %}…{% /alert %}` to its inner text. The tag lines must stay.
    const output = resolved(
      '```markdoc\n{% alert level="info" %}\nHello.\n{% /alert %}\n```\n',
    );

    expect(output).toContain('{% alert level="info" %}');
    expect(output).toContain("{% /alert %}");
  });

  it("resolves fences nested inside other nodes", () => {
    const output = resolved(
      '{% tabs %}\n{% tab label="Java" %}\n```xml\n<version>{% $sdkVersions.datadog-api-client-java %}</version>\n```\n{% /tab %}\n{% /tabs %}\n',
    );

    expect(output).toContain("<version>9.9.9</version>");
  });
});
