---
title: Prompt Tracking
---

In Datadog's LLM Observability, the _Prompt Tracking_ feature links prompt templates and versions to LLM calls. Prompt Tracking works alongside LLM Observability's traces, spans, and Playground.

Prompt Tracking enables you to:
- See all prompts used by your LLM application or agent, with call volume and latency over time
- Compare prompts or versions by calls, latency, tokens used, and cost
- See detailed information about a prompt: review its version history, view a text diff, and jump to traces using a specific version
- Filter [Trace Explorer][1] by prompt name, ID, or version to isolate impacted requests
- Reproduce a run by populating [LLM Observability Playground][2] with the exact template and variables from any span

## Set up Prompt Tracking

### With the LLM Observability SDK

### With LangChain templates


## Use Prompt Tracking in LLM Observability


[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/playground