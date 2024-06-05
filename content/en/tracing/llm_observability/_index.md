---
title: LLM Observability
kind: documentation
---

<div class="alert alert-info">LLM Observability is in public beta.</a></div>

<div class="alert alert-warning">By using LLM Observability, you acknowledge that Datadog is authorized to share your Company's data with OpenAI Global, LLC for the purpose of providing and improving LLM Observability.
</div>

{{% site-region region="gov" %}}
<div class="alert alert-warning">
LLM Observability is not available in the US1-FED site.
</div>

{{% /site-region %}}

## Overview

{{< img src="tracing/llm_observability/llm-observability-landing.png" alt="LLM Observability overview page with record of all prompt-response pair traces" style="width:100%;" >}}

With LLM Observability, you can monitor, troubleshoot, and evaluate your LLM-powered applications, such as chatbots. You can investigate the root cause of issues, monitor operational performance, and evaluate the quality, privacy, and safety of your LLM applications. 

Each request fulfilled by your application is represented as a trace on the [LLM Observability traces page][2] in Datadog.

A trace can represent:
- An individual LLM inference, including tokens, error rates, and latencies
- A predetermined LLM *workflow*: a grouping of LLM calls and their contextual operations, such as tool calls or preprocessing steps
- A dynamic LLM workflow executed by an LLM agent

Each trace contains spans representing each choice made by an agent or each step of a given workflow. A given trace can also include input and output, execution duration, privacy issues, errors, and more.

You can instrument your application with the LLM Observability SDK for Python, or by calling the LLM Observability API.

## Getting started

To get started with LLM Observability, you can build a simple example with the [Quickstart][3], or follow [the guide for instrumenting your LLM application][4].

## Explore LLM Observability

### Troubleshoot with end-to-end tracing

View every step of your LLM application chains and calls to pinpoint problematic requests and identify the root cause of errors.

{{< img src="tracing/llm_observability/llm-observability-overview.png" alt="An LLM Observability trace displaying each span of a request" style="width:100%;" >}}

### Monitor operational metrics and optimize cost

Monitor the throughput, latency, and token usage trends for all your LLM applications.

{{< img src="tracing/llm_observability/dashboard.png" alt="The out-of-the-box LLM Observability dashboard" style="width:100%;" >}}

### Evaluate the quality and effectiveness of your LLM applications

Identify problematic clusters and monitor the quality of responses over time with topical clustering and checks like sentiment, failure to answer, and so on.

{{< img src="tracing/llm_observability/clusters-page.png" alt="The clusters page in LLM Observability" style="width:100%;" >}}

### Safeguard sensitive data and identify malicious users

Automatically scan and redact any sensitive data in your AI applications and identify prompt injections.

{{< img src="tracing/llm_observability/prompt-injection.png" alt="An example of a prompt-injection attempt" style="width:100%;" >}}

[1]: /tracing/llm_observability/spans/
[2]: https://app.datadoghq.com/llm/traces
[3]: /tracing/llm_observability/quickstart
[4]: /tracing/llm_observability/trace_an_llm_application
