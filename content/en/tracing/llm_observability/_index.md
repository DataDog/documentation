---
title: LLM Observability
kind: documentation
---

{{< img src="tracing/llm_observability/llm-observability-overview.png" alt="An LLM Observability trace displaying each span of a request" style="width:100%;" >}}

With LLM Observability, you can monitor the quality, security, and performance of your LLM applications. 

Each request fulfilled by your application is represented as a trace in the [LLM Observability traces list][3] in Datadog. A trace contains [spans][1] representing each choice made by an agent or each step of a given workflow. Each trace also includes input and output, execution duration, privacy issues, errors, and more.

A trace can represent:
- An individual LLM inference, including tokens, error rates, latencies
- A predetermined LLM *workflow*, a grouping of LLM calls and their contextual operations such as tool calls or preprocessing steps
- A dynamic LLM workflow executed by an LLM agent

You can submit data to LLM Observability in two ways: with the Python SDK or with a call to the [API][2].

## Getting started

{{< whatsnext desc="Get started with LLM Observability:" >}}
   {{< nextlink href="/tracing/llm_observability/sdk_quickstart" >}}SDK Quickstart{{< /nextlink >}}
   {{< nextlink href="/tracing/llm_observability/tracing_an_LLM_application" >}}Learn more about tracing LLM applications{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /tracing/llm_observability/spans/
[2]: /tracing/llm_observability/api
[3]: https://app.datadoghq.com/llm/traces