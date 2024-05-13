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

To get started with LLM Observability, you can build a simple example with the [Quickstart][3], or follow [the guide for instrumenting your LLM application][4].

## Explore LLM Observability

<!-- Figma: https://www.figma.com/design/ZskpTxUOqzUwHpkEymfjhX/[LLM]-Welcome-Page?node-id=226-182352&t=U3OWFWD1OIpKKS8A-0 -->

### Troubleshoot with end-to-end tracing

View every step of your LLM application chains and calls to pinpoint problematic requests and identify the root cause of errors.

### Monitor operational metrics and optimize cost

Monitor the throughput, latency, and token usage trends for all your LLM applications.

### Evaluate the quality and effectiveness of your LLM applications

Identify problematic topics and monitor the quality of responses over time with topical clustering with checks like sentiment analysis.

### Safeguard sensitive data and identify malicious users

Automatically scan and redact any sensitive data in your AI applications and identify prompt injections.

[1]: /tracing/llm_observability/spans/
[2]: https://app.datadoghq.com/llm/traces
[3]: /tracing/llm_observability/quickstart
[4]: /tracing/llm_observability/trace_an_llm_application