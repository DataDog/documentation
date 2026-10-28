import { describe, expect, it } from "vitest";
import {
  extractSources,
  inlineRefChips,
  normalizeHref,
  parseMarkdown,
  renderMessageWithSources,
} from "./markdown";

describe("parseMarkdown", () => {
  it("renders GitHub-flavored markdown with hard line breaks", () => {
    const html = parseMarkdown("one\ntwo");
    expect(html).toContain("<br>");
  });

  it("opens links in a new tab, with a safe rel", () => {
    const html = parseMarkdown("[docs](https://docs.datadoghq.com/)");
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('class="conv-search-md-link"');
  });

  it("highlights a fenced code block", () => {
    const html = parseMarkdown("```python\ndef f():\n    pass\n```");
    expect(html).toContain("hljs");
    expect(html).toContain("hljs-keyword");
  });
});

describe("inlineRefChips", () => {
  it("converts [N] tokens into numbered chips", () => {
    const html = inlineRefChips("<p>See [1] and [23].</p>");
    expect(html).toContain('data-source-number="1"');
    expect(html).toContain('data-source-number="23"');
    expect(html).toContain("conv-search-source-ref-wrap");
  });

  it("leaves tokens inside a <pre> block alone", () => {
    const html = inlineRefChips("<pre><code>array[1]</code></pre>");
    expect(html).toBe("<pre><code>array[1]</code></pre>");
  });

  it("leaves tokens inside inline <code> alone", () => {
    const html = inlineRefChips("<p>Use <code>items[0]</code> here.</p>");
    expect(html).not.toContain("conv-search-source-ref-btn");
  });

  it("converts tokens outside code even when code is present", () => {
    const html = inlineRefChips("<pre><code>a[1]</code></pre><p>See [2].</p>");
    expect(html).toContain("<pre><code>a[1]</code></pre>");
    expect(html).toContain('data-source-number="2"');
  });

  it("ignores tokens with more than three digits", () => {
    const html = inlineRefChips("<p>[1234]</p>");
    expect(html).not.toContain("conv-search-source-ref-btn");
  });
});

describe("extractSources", () => {
  it("parses the pipe-delimited format and strips it from the answer", () => {
    const { displayMarkdown, sources } = extractSources(
      "The answer.\n\n[sources]\n1 | Agent install | https://docs.datadoghq.com/agent/\n2 | API keys | https://docs.datadoghq.com/keys/",
    );

    expect(displayMarkdown).toBe("The answer.");
    expect(sources).toEqual([
      {
        number: 1,
        href: "https://docs.datadoghq.com/agent/",
        label: "Agent install",
      },
      {
        number: 2,
        href: "https://docs.datadoghq.com/keys/",
        label: "API keys",
      },
    ]);
  });

  it("skips pipe-delimited lines whose URL is rejected", () => {
    const { sources } = extractSources(
      "Answer.\n[sources]\n1 | Bad | javascript:alert(1)\n2 | Good | https://docs.datadoghq.com/",
    );
    expect(sources).toHaveLength(1);
    expect(sources[0]?.number).toBe(2);
  });

  it("falls back to the legacy fenced-JSON block", () => {
    const { displayMarkdown, sources } = extractSources(
      'Answer.\n```sources\n[{"title": "Agent", "url": "https://docs.datadoghq.com/agent/"}]\n```',
    );

    expect(displayMarkdown).toBe("Answer.");
    expect(sources).toEqual([
      {
        number: 1,
        href: "https://docs.datadoghq.com/agent/",
        label: "Agent",
      },
    ]);
  });

  it("repairs single quotes, unquoted keys, and trailing commas in the fallback", () => {
    const { sources } = extractSources(
      "Answer.\n```json\n{sources: [{title: 'Agent', url: 'https://docs.datadoghq.com/agent/',},]}\n```",
    );

    expect(sources).toEqual([
      {
        number: 1,
        href: "https://docs.datadoghq.com/agent/",
        label: "Agent",
      },
    ]);
  });

  it("deduplicates repeated URLs in the fallback", () => {
    const { sources } = extractSources(
      'Answer.\n```sources\n[{"url": "https://docs.datadoghq.com/a/"}, {"url": "https://docs.datadoghq.com/a/"}]\n```',
    );
    expect(sources).toHaveLength(1);
  });

  it("returns no sources when there is no source block", () => {
    const { displayMarkdown, sources } = extractSources("Just an answer.");
    expect(displayMarkdown).toBe("Just an answer.");
    expect(sources).toEqual([]);
  });

  it("strips a truncated source marker left by a cut-off stream", () => {
    const { displayMarkdown } = extractSources("Answer.\n\n[source");
    expect(displayMarkdown).toBe("Answer.");
  });
});

describe("normalizeHref", () => {
  it("rejects the javascript: scheme", () => {
    expect(normalizeHref("javascript:alert(1)")).toBe("");
  });

  it("rejects the data: scheme", () => {
    expect(normalizeHref("data:text/html,<script>alert(1)</script>")).toBe("");
  });

  it("rejects an empty or unparseable value", () => {
    expect(normalizeHref("")).toBe("");
    expect(normalizeHref("   ")).toBe("");
  });

  it("resolves a relative URL against the origin", () => {
    expect(normalizeHref("/agent/")).toBe(`${window.location.origin}/agent/`);
  });

  it("passes through http and https URLs", () => {
    expect(normalizeHref("https://docs.datadoghq.com/agent/")).toBe(
      "https://docs.datadoghq.com/agent/",
    );
  });
});

describe("renderMessageWithSources", () => {
  it("attaches tooltips to chips and appends source cards", () => {
    const html = renderMessageWithSources(
      "See [1].\n\n[sources]\n1 | Agent install | https://docs.datadoghq.com/agent/",
    );

    expect(html).toContain("conv-search-source-tooltip");
    expect(html).toContain("conv-search-sources-cards");
    expect(html).toContain("Agent install");
  });

  it("appends no source section when there are no sources", () => {
    const html = renderMessageWithSources("Just an answer.");
    expect(html).not.toContain("conv-search-sources");
  });
});
