---
title: Prompt Tracking
description: Use Prompt Tracking to track your prompt templates and versions.

further_reading:
  - link: https://www.datadoghq.com/blog/llm-prompt-tracking
    tag: Blog
    text: Track, compare, and optimize your LLM prompts with Datadog LLM Observability

---

{{< img src="llm_observability/monitoring/llm-prompt-tracking-hero.png" alt="Prompts view for an app in LLM Observability." style="width:100%;" >}}

In Datadog's LLM Observability, the _Prompt Tracking_ feature links prompt templates and versions to LLM calls. Prompt Tracking works alongside LLM Observability's traces, spans, and Playground.

Prompt Tracking enables you to:
- See all prompts used by your LLM application or agent, with call volume and latency over time
- Compare prompts or versions by calls, latency, tokens used, and cost
- See detailed information about a prompt: review its version history, view a text diff, and jump to traces using a specific version
- Filter [Trace Explorer][1] by prompt name, ID, or version to isolate impacted requests
- Reproduce a run by populating [LLM Observability Playground][2] with the exact template and variables from any span

## Set up Prompt Tracking

### With structured prompt metadata
To use Prompt Tracking, you can submit structured prompt metadata (ID, optional version, template, variables).

#### LLM Observability Python SDK
If you are using the LLM Observability Python SDK (`dd-trace` v3.16.0+), attach prompt metadata to the LLM span using the `prompt` argument or helper. See the [LLM Observability Python SDK documentation][3].

#### LLM Observability Node.js SDK
If you are using the LLM Observability Node.js SDK (`dd-trace` v5.83.0+), attach prompt metadata to the LLM span using the `prompt` option. See the [LLM Observability Node.js SDK documentation][6].

#### LLM Observability API
If you are using the LLM Observability API intake, submit prompt metadata to the Spans API endpoint. See the [LLM Observability HTTP API reference documentation][4].

<div class="alert alert-info">If you are using prompt templates, LLM Observability can automatically attach version information based on prompt content.</div>

### With LangChain templates
If you are using LangChain prompt templates, Datadog automatically captures prompt metadata without code changes. IDs are derived from module or template names. To override these IDs, see [LLM Observability Auto-instrumentation: LangChain][5].

## Use Prompt Tracking in LLM Observability

View your app in LLM Observability and select **Prompts** on the left. The _Prompts view_ features the following information:

- **Prompt Call Count**: A timeseries chart displaying calls per prompt (or per version) over time
- **Recent Prompt Updates**: Information about recent prompt updates, including time of last update, call count, average latency, and average tokens per call
- **Most Tokens Used**: Prompts ranked by total (input or output) tokens
- **Highest Latency Prompts**: Prompts ranked by average duration

{{< img src="llm_observability/monitoring/prompt_details.png" alt="Detail view for a single prompt." style="width:100%;" >}}

Click on a prompt to open a detailed side-panel view that features information about version activity and various metrics. You can also see a diff view of two versions, open Trace Explorer pre-filtered to spans that use a selected version, or start a Playground session pre-populated with the selected version's template and variables.

{{< img src="llm_observability/monitoring/prompt_tracking_trace_explorer3.png" alt="Prompts view for an app in LLM Observability." style="width:100%;" >}}

You can use the LLM Observability Trace Explorer to locate requests by prompt usage. You can use a prompt's name, ID, and version as facets for both trace-level and span-level search. Click any LLM span to see the prompt that generated it.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/playground
[3]: /llm_observability/instrumentation/sdk/?tab=python#prompt-tracking
[4]: /llm_observability/instrumentation/api/?tab=model#prompt
[5]: /llm_observability/instrumentation/auto_instrumentation?tab=python#langchain
[6]: /llm_observability/instrumentation/sdk/?tab=nodejs#prompt-tracking
