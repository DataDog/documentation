import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer } from "@astrojs/preact";
import { loadRenderers } from "astro:container";
import CodeBlock from "../CodeBlock.astro";

const renderCodeBlock = async (props: Record<string, unknown>) => {
  const renderers = await loadRenderers([getContainerRenderer()]);
  const container = await AstroContainer.create({ renderers });
  return container.renderToString(CodeBlock, { props });
};

describe("CodeBlock fallback for languages Shiki does not support", () => {
  it("adds no whitespace between the pre and code tags", async () => {
    const html = await renderCodeBlock({
      content: '{% alert level="info" %}',
      language: "not-a-shiki-language",
    });

    const pre = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/);
    expect(pre).not.toBeNull();
    expect(pre![1]).toMatch(/^<code[^>]*>[\s\S]*<\/code>$/);
  });
});

describe("CodeBlock language aliases", () => {
  it("highlights a block whose language is an alias of a Shiki language", async () => {
    const html = await renderCodeBlock({
      content: 'fmt.Println("hello")',
      language: "golang",
    });

    expect(html).toContain("code-block__highlighted");
    expect(html).not.toContain("code-block__pre");
  });

  it("keeps the author's language name in data-language", async () => {
    const html = await renderCodeBlock({
      content: 'fmt.Println("hello")',
      language: "golang",
    });

    expect(html).toContain('data-language="golang"');
  });
});
