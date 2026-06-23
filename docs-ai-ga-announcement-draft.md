# Docs AI is now Generally Available

**Subject: Docs AI is now Generally Available**

Hi everyone,

**Docs AI is now Generally Available on docs.datadoghq.com.** Readers can ask natural-language questions and get AI-generated answers grounded in our published documentation, with citations linking back to source pages. The chat experience has been redesigned for usability since Preview.

[screenshot, light mode]
[screenshot, dark mode]

## What is Docs AI?

Docs AI is a conversational chat option on the documentation site, available alongside keyword search. Users type a natural-language question, like "How do I install the Datadog Agent on Kubernetes?", and receive a synthesized answer. Answers include numbered citations linking back to source pages, and users can ask follow-up questions within the same conversation.

## Why do customers care?

**Surface specific information faster:** Finding a specific metric name, configuration flag, or CLI command often requires clicking into a guide and scrolling through lengthy content. Docs AI extracts the exact snippet the user needs.

**No product knowledge required:** Users who don't know Datadog-specific terminology struggle to find what they need through keyword search. Docs AI understands natural-language questions regardless of whether the user uses the "right" terms.

**Meeting industry expectations:** Many modern platforms already offer conversational search on their docs. This brings Datadog documentation in line with the standard our users expect.

## What changed since Preview?

**Better answers through multi-step retrieval:** Instead of answering from small document chunks alone, Docs AI now fetches full parent pages on demand and intelligently selects the right sections to pass to the model. This and other improvements increased answer quality by over 20%.

**Quality monitoring with ddeval and LLM Observability:** Offline ddeval experiments gate changes on correctness, faithfulness, and retrieval accuracy. Live LLM Observability evaluations score every production query for answer quality, language match, and failure-to-answer detection.

**Available to 100% of visitors:** Feature flags have been removed.

## How to use it

This is a public-facing, unauthenticated experience. No login required. Visitors click the **Ask AI** button (next to the search bar on the homepage, or the floating button in the bottom-right corner on other pages) to open the chat panel. From there, they can type questions, copy responses, and rate answers using the thumbs-up/down buttons.

## Talking to customers about Docs AI

Docs AI is available to all visitors. Feel free to mention it. If a customer reports an issue, encourage them to use the thumbs-up/down buttons in the chat panel, and let us know in #docs-ai-feedback.

## Is it available in all regions?

Yes. Docs AI lives on the public documentation site, so it is not region-specific.

## Internal technical details

End-to-end cost per query is ~$0.01 across the full pipeline. The indexed corpus covers ~306k chunks across ~13k English docs pages, refreshed on every PR merged to master. For architecture, retrieval design, and evaluation methodology, see the [Docs AI Service documentation](https://datadoghq.atlassian.net/wiki/spaces/WEB/pages/6644302164/Docs+AI+Service).

## What's next?

- Continue tuning retrieval and generation quality based on live evaluation data and user feedback
- Expand the offline regression suite as usage patterns emerge

## Where can you learn more and ask questions?

- [Try it out on docs.datadoghq.com](https://docs.datadoghq.com)
- [Internal Docs AI documentation](https://datadoghq.atlassian.net/wiki/spaces/WEB/pages/6644302164/Docs+AI+Service)
- #docs-ai-feedback

Massive shout out to Reda El Issati for all his incredible work on this!

Best,
Brett Blue (he/him)
Staff Technical Writer, Documentation
