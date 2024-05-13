---
title: LLM Observability
kind: documentation
---

<div class="alert alert-info">LLM Observability is in public beta.</a></div>


## Overview

{{< img src="tracing/llm_observability/llm-observability-overview.png" alt="An LLM Observability trace displaying each span of a request" style="width:100%;" >}}

With LLM Observability, you can monitor the quality, security, and performance of your LLM applications. Each request fulfilled by your application is represented as a trace on the [LLM Observability traces page][2] in Datadog.

A trace can represent:
- An individual LLM inference, including tokens, error rates, and latencies
- A predetermined LLM *workflow*: a grouping of LLM calls and their contextual operations, such as tool calls or preprocessing steps
- A dynamic LLM workflow executed by an LLM agent

Each trace contains spans representing each choice made by an agent or each step of a given workflow. A given trace can also include input and output, execution duration, privacy issues, errors, and more.

You can instrument your application with the LLM Observability SDK for Python, or by calling the LLM Observability API.

## Getting started

{{< whatsnext desc="Get started with LLM Observability:" >}}
   {{< nextlink href="/tracing/llm_observability/quickstart" >}}Build a simple example with the Quickstart{{< /nextlink >}}
   {{< nextlink href="/tracing/llm_observability/trace_an_llm_application" >}}Trace your LLM application{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /tracing/llm_observability/spans/
[2]: https://app.datadoghq.com/llm/traces