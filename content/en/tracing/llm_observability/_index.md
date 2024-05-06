---
title: LLM Observability
kind: documentation
---

<div class="alert alert-info">LLM Observability is in public beta.</a></div>

{{< img src="tracing/llm_observability/llm-observability-overview.png" alt="An LLM Observability trace displaying each span of a request" style="width:100%;" >}}

With LLM Observability, you can monitor the quality, security, and performance of your LLM applications. Each request fulfilled by your application is represented as a trace on the [LLM Observability traces list page][3] in Datadog.

A trace can represent:
- An individual LLM inference, including tokens, error rates, latencies
- A predetermined LLM *workflow*, a grouping of LLM calls and their contextual operations such as tool calls or preprocessing steps
- A dynamic LLM workflow executed by an LLM agent

Each trace contains spans representing each choice made by an agent or each step of a given workflow. Each trace also includes input and output, execution duration, privacy issues, errors, and more.

## Getting started

{{< whatsnext desc="Get started with LLM Observability:" >}}
   {{< nextlink href="/tracing/llm_observability/sdk_quickstart" >}}Build a simple example with the Quickstart{{< /nextlink >}}
   {{< nextlink href="/tracing/llm_observability/tracing_an_LLM_application" >}}Trace your LLM application{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /tracing/llm_observability/spans/
[3]: /tracing/llm_observability/exploring_llm_traces