import { describe, it, expect } from "vitest";
import Markdoc from "@markdoc/markdoc";
import type { Config, RenderableTreeNode, Tag } from "@markdoc/markdoc";
import config from "../../../../markdoc.config.mjs";
import { FIXTURE_SDK_VERSIONS } from "../../../../tests/fixtures/api/sdkVersions";

// See `CardGrid/tests/transform.unit.test.ts` for why this cast is needed:
// Astro widens Markdoc's `render` type, so its config isn't assignable to
// Markdoc's own `Config`, but the runtime accepts it.
const markdocConfig = config as unknown as Config;

const TEST_VERSIONS = { "datadog-api-client-java": "9.9.9" };

/**
 * The `content` attribute of the first fence in `source`.
 *
 * `CodeBlock.astro` highlights `content`, not the fence's children, so that
 * attribute is what readers see.
 */
function renderedFenceContent(source: string): string {
  const document = Markdoc.transform(Markdoc.parse(source), {
    ...markdocConfig,
    variables: { ...markdocConfig.variables, sdkVersions: TEST_VERSIONS },
  });
  const fence = findFence(document);
  return fence.attributes.content as string;
}

function findFence(node: RenderableTreeNode): Tag {
  if (Markdoc.Tag.isTag(node)) {
    if (typeof node.attributes.content === "string") return node;
    for (const child of node.children) {
      try {
        return findFence(child);
      } catch {
        // Not in this branch; keep looking.
      }
    }
  }
  throw new Error("No fence in the transformed document");
}

describe("fence transform", () => {
  it("replaces a variable inside a fence with its value", () => {
    const source =
      "```xml\n<version>{% $sdkVersions.datadog-api-client-java %}</version>\n```\n";

    expect(renderedFenceContent(source)).toBe("<version>9.9.9</version>\n");
  });

  it("leaves the text unchanged when the fence sets process=false", () => {
    const source =
      "```xml {% process=false %}\n<version>{% $sdkVersions.datadog-api-client-java %}</version>\n```\n";

    expect(renderedFenceContent(source)).toBe(
      "<version>{% $sdkVersions.datadog-api-client-java %}</version>\n",
    );
  });

  it("keeps the source of a fence that shows Markdoc tags as an example", () => {
    // Markdoc turns tags inside a fence into real tags. Joining the children
    // would drop them, so the example would render empty.
    const source =
      '```markdoc\n{% alert level="info" %}\nHello.\n{% /alert %}\n```\n';

    expect(renderedFenceContent(source)).toBe(
      '{% alert level="info" %}\nHello.\n{% /alert %}\n',
    );
  });

  it("reads the frozen fixture versions by default, not the live stamp", () => {
    // `vitest.unit.config.ts` overrides the `__SDK_VERSIONS__` define with
    // `tests/fixtures/api/sdkVersions.ts`, as it does for the API spec.
    const source =
      "```xml\n<version>{% $sdkVersions.datadog-api-client-java %}</version>\n```\n";
    const document = Markdoc.transform(Markdoc.parse(source), markdocConfig);

    expect(findFence(document).attributes.content).toBe(
      `<version>${FIXTURE_SDK_VERSIONS["datadog-api-client-java"]}</version>\n`,
    );
  });

  it("doesn't change an ordinary fence", () => {
    const source = '```python\nprint("hello")\n```\n';

    expect(renderedFenceContent(source)).toBe('print("hello")\n');
  });
});
