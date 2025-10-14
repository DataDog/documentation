---
title: LLM Observability
aliases:
    - /tracing/llm_observability/
further_reading:
- link: "https://www.datadoghq.com/blog/anthropic-integration-datadog-llm-observability/"
  tag: "Blog"
  text: "Monitor your Anthropic applications with Datadog LLM Observability"
- link: "https://www.datadoghq.com/blog/monitor-llm-prompt-injection-attacks/"
  tag: "Blog"
  text: "Best practices for monitoring LLM prompt injection attacks to protect sensitive data"
- link: "https://www.datadoghq.com/blog/vllm-integration/"
  tag: "Blog"
  text: "Optimize LLM application performance with Datadog's vLLM integration"
- link: "https://www.datadoghq.com/blog/datadog-gpu-monitoring/"
  tag: "Blog"
  text: "Optimize and troubleshoot AI infrastructure with Datadog GPU Monitoring"
- link: "https://www.datadoghq.com/blog/llm-observability-bedrock-agents/"
  tag: "Blog"
  text: "Monitor agents built on Amazon Bedrock with Datadog LLM Observability"
- link: "https://www.datadoghq.com/blog/monitor-mcp-servers/"
  tag: "Blog"
  text: "Identify common security risks in MCP servers"
- link: "https://www.datadoghq.com/blog/detect-abuse-ai-infrastructure/"
  tag: "Blog"
  text: "Abusing AI infrastructure: How mismanaged credentials and resources expose LLM applications"
---

{{< learning-center-callout header="Try Getting Started with LLM Observability in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/llm-obs-getting-started">}}
  Learn how to monitor your LLM application's performance, costs, traces, token usage, and errors to identify and resolve issues.
{{< /learning-center-callout >}}

## Overview

With LLM Observability, you can monitor, troubleshoot, and evaluate your LLM-powered applications, such as chatbots. You can investigate the root cause of issues, monitor operational performance, and evaluate the quality, privacy, and safety of your LLM applications.

Each request fulfilled by your application is represented as a trace on the [**LLM Observability** page][1] in Datadog.

{{< img src="llm_observability/traces.png" alt="A list of prompt-response pair traces on the LLM Observability page" style="width:100%;" >}}

A trace can represent:

- An individual LLM inference, including tokens, error information, and latency
- A predetermined LLM workflow, which is a grouping of LLM calls and their contextual operations, such as tool calls or preprocessing steps
- A dynamic LLM workflow executed by an LLM agent

Each trace contains spans representing each choice made by an agent or each step of a given workflow. A given trace can also include input and output, latency, privacy issues, errors, and more. For more information, see [Terms and Concepts][2].

## Troubleshoot with end-to-end tracing

View every step of your LLM application chains and calls to pinpoint problematic requests and identify the root cause of errors.

{{< img src="llm_observability/errors.png" alt="Errors that occurred in a trace on the Errors tab in a trace side panel" style="width:100%;" >}}

## Monitor operational metrics and optimize cost

Monitor the cost, latency, performance, and usage trends for all your LLM applications with [out-of-the-box dashboards][7].

{{< img src="llm_observability/dashboard_1.png" alt="The out-of-the-box LLM Observability Operational Insights dashboard in Datadog" style="width:100%;" >}}

## Evaluate the quality and effectiveness of your LLM applications

Identify problematic clusters and monitor the quality of responses over time with topical clustering and checks like sentiment, failure to answer, and so on.

{{< img src="llm_observability/cluster_map/box.png" alt="The box packing layout displays clusters of traces represented by colored circles, and includes a panel listing clusters with topics, trace counts, and failure rates." style="width:100%;" >}}

## Safeguard sensitive data and identify malicious users

Automatically scan and redact any sensitive data in your AI applications and identify prompt injections, among other evaluations.

{{< img src="llm_observability/prompt_injection.png" alt="An example of a prompt-injection attempt detected by LLM Observability" style="width:100%;" >}}

## See anomalies highlighted as insights

LLM Observability Insights provides a monitoring experience that helps users identify anomalies in their operational metrics—such as duration and error rate—and their [out-of-the-box (OOTB) evaluations][9].

Outlier detection is performed across key dimensions:
- Span name
- Workflow type
- [Cluster input/output topics][10]

These outliers are analyzed over the past week and automatically surfaced in the corresponding time window selected by the user. This enables teams to proactively detect regressions, performance drifts, or unexpected behavior in their LLM applications.

{{< img src="llm_observability/llm-insights.png" alt="An 'Insights' banner across the top of the LLM Observability Monitor page. The banner displays 10 insights and has a View Insights button that leads to a side panel with further details." style="width:100%;" >}}

## Use integrations with LLM Observability

The [LLM Observability SDK for Python][3] integrates with frameworks such as OpenAI, LangChain, AWS Bedrock, and Anthropic. It automatically traces and annotate LLM calls, capturing latency, errors, and token usage metrics—without code changes.

<div class="alert alert-info">Datadog offers a variety of artificial intelligence (AI) and machine learning (ML) capabilities. The <a href="/integrations/#cat-aiml">AI/ML integrations on the Integrations page and the Datadog Marketplace</a> are platform-wide Datadog functionalities. <br><br> For example, APM offers a native integration with OpenAI for monitoring your OpenAI usage, while Infrastructure Monitoring offers an integration with NVIDIA DCGM Exporter for monitoring compute-intensive AI workloads. These integrations are different from the LLM Observability offering.</div>

For more information, see the [Auto Instrumentation documentation][8].

## Ready to start?

See the [Setup documentation][5] for instructions on instrumenting your LLM application or follow the [Trace an LLM Application guide][6] to generate a trace using the [LLM Observability SDK for Python][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /llm_observability/terms
[3]: /llm_observability/setup/sdk
[4]: /llm_observability/setup/api
[5]: /llm_observability/setup
[6]: /llm_observability/quickstart
[7]: https://app.datadoghq.com/dash/integration/llm_operational_insights
[8]: /llm_observability/setup/auto_instrumentation
[9]: /llm_observability/evaluations/managed_evaluations
[10]: /llm_observability/monitoring/cluster_map
