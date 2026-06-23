**For:** Technical writers, documentation contributors, and anyone interested in how the Docs team is optimizing for AI agents

The Docs Content team works with the Webops Platform team to make Datadog documentation accessible to AI agents. This page describes the infrastructure in place and what's in progress.

For content questions, reach out in #docs-eng. For platform or engineering requests, reach out in #webops-platform.

## Markdown pages

Every published docs page has a corresponding Markdown version available at the same URL with a `.md` suffix (for example, `docs.datadoghq.com/tracing/` → `docs.datadoghq.com/tracing/.md`). These Markdown pages strip out navigation chrome, styling, and JavaScript, giving agents clean, parseable content.

The Markdown pages are built nightly from the HTML output using the Markdoc format. For technical details on the plaintext build — including the `pages.json` listing, content hashes, and Markdoc parsing — see [Access Datadog documentation content as plain text](https://datadoghq.atlassian.net/wiki/x/ZwTpawE).

## Content negotiation

When a visiting bot requests a docs page and indicates it accepts Markdown (through the `Accept` header), the platform redirects it to the `.md` version automatically. Agents that follow web standards get clean Markdown without needing to know about the `.md` suffix convention.

## agent-only shortcode

The `agent-only` shortcode lets writers include content that is visible to agents but hidden from human readers. The content stays in the page HTML but is hidden visually with CSS, so agents parsing the page source or Markdown can read it.

This is intended for cases where content is valuable to agents but would clutter the page for humans. If a human would find the content useful too, it belongs in the visible page.

**Hugo syntax:**

```
{{< agent-only >}}
Instructions that only AI agents should see.
{{< /agent-only >}}
```

**Cdocs (Markdoc) syntax:**

```
{% agent-only %}
Instructions that only AI agents should see.
{% /agent-only %}
```

The shortcode supports standalone blocks, not inline content. For more inline needs, reach out in #docs-eng.

## llms.txt

The docs site publishes an [llms.txt](https://docs.datadoghq.com/llms.txt) file following the [llms.txt proposed standard](https://llmstxt.org/). This file gives agents a structured index of documentation — page titles, categories, and direct links to Markdown content — so they can discover relevant pages without crawling the site.

The current `llms.txt` indexes all English-language pages. Work is in progress to restructure it into a tree format: a lightweight root file linking to product-level files (for example, `/tracing/llms.txt`, `/logs/llms.txt`). This lets agents progressively discover content without fetching a single oversized file. See WEB-8586 for details.

## What's next

This is an active area of investment. Planned and in-progress work includes:

- Tree-structured llms.txt for progressive disclosure (WEB-8586)
- Closing the remaining coverage gap in the nightly Markdown build

If you have ideas or requests, reach out in #docs-eng or #webops-platform.
