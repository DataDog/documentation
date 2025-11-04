---
title: Out-of-the-Box Dashboards
description: Learn about the out-of-the-box dashboards available for LLM Observability.
further_reading:
  - link: "/llm_observability/monitoring/"
    tag: "Documentation"
    text: "Learn about LLM Observability monitoring"
  - link: "/llm_observability/evaluations/"
    tag: "Documentation"
    text: "Learn about LLM Observability evaluations"
  - link: "/dashboards/"
    tag: "Documentation"
    text: "Learn about Dashboards"
---

## Overview

Datadog provides five out-of-the-box dashboards for LLM Observability that automatically populate when you instrument your LLM applications. These dashboards help you monitor operational health, analyze chain execution, evaluate quality and safety, and get a comprehensive overview of your LLM applications.

The five out-of-the-box dashboards are:

- [LLM Observability Overview](#llm-observability-overview): Comprehensive single-pane view of costs, performance, and safety
- [LLM Observability Operational Insights](#llm-observability-operational-insights): High-level operational metrics and performance tracking
- [LLM Observability LLM Chain Insights](#llm-observability-llm-chain-insights): Detailed span-level analysis of chains and workflows
- [LLM Observability Evaluation Insights](#llm-observability-evaluation-insights): Quality, safety, and custom evaluation monitoring
- [LLM Observability Agent Monitoring](#llm-observability-agent-monitoring): Agent behavior, orchestration, tools, and tasks performance

<div class="alert alert-info">If you see empty dashboards, start by instrumenting your LLM application with the <a href="/llm_observability/instrumentation/sdk/">Datadog SDK</a> or <a href="/llm_observability/instrumentation/api/">API</a>.</div>

## LLM Observability Overview

The [LLM Observability Overview dashboard][8] is a comprehensive dashboard providing a single-pane view of costs, performance, and safety for your LLM applications.

### Purpose

This dashboard provides unified monitoring for:

- Cost estimation and token usage
- Performance and latency metrics
- Quality and safety evaluations
- Tool and task execution

### Sections

**Top Overview**

High-level metrics:

- **OpenAI Estimated Cost**: Cost breakdown by model (GPT-3.5, GPT-4, and more)
- **Total Number of Traces**: Overall trace count
- **Trace Success Rate**: Percentage of successful traces (color-coded: >95% green, 50-95% yellow, <50% red)
- **Token Generation Rate**: Tokens generated per second
- **Which tools are being used?**: Top tool usage by call count
- **Quality Check Violations**: Count of quality and safety issues detected

**LLM Analytics**

Breakdown of LLM calls by model and provider:

Widgets:

- **Model Usage (sunburst chart)**: Usage distribution by `model_name` and `model_provider`
- **Tokens per LLM Call (table)**: Average prompt and completion tokens per model with trend visualization
- **Error Rate (timeseries)**: Error rate by model and provider with thresholds:
  - <5% = OK
  - 5-20% = Warning
  - >20% = Error
- **LLM Latency (table)**: p50, p75, p95 latency by model (color-coded: >3s red, 2-3s yellow, <2s green)
- Link to view error traces

**Traces**

End-to-end execution flow metrics.

A trace represents the entire execution from request receipt to response.

Widgets:

- **Trace latency (timeseries)**: p50, p75, p95 latency over time
- **Trace Error Rate (timeseries)**: Error percentage by `ml_app` with markers:
  - 0-5% = OK
  - 5-20% = Warning
  - >20% = Error
- **Trace Execution Time Breakdown by Span Kind (sunburst)**: Average duration by span type (LLM, tool, task, and more)
- Link to view related spans

**Tools**

External API and software interface calls.

A tool represents an external API call (for example, calculator, weather API).

Widgets:

- **Usage over time (table)**: Tool call count, latency (trend), and errors by tool name
- **Usage Breakdown by # of Executions (sunburst)**: Top tools by execution count
- **Tool Error Rate**: Percentage of tool spans with errors (>5% flagged red)

**Tasks**

Internal non-LLM operations.

A task represents an internal operation without external requests (for example, data preprocessing).

Widgets:

- **Usage over Time (table)**: Task call count, latency (trend), and errors by task name
- **Usage Breakdown by # of Executions (sunburst)**: Top tasks by execution count (by `ml_app` and task name)
- **Task Error Rate**: Percentage of task spans with errors (>5% flagged red)

**Evaluation and Quality Checks**

Evaluation insights:

Top-level metrics:

- **Negative Sentiment**: Count of negative interactions
- **Positive Sentiment**: Count of positive sessions
- **Toxic Messages**: Toxicity detections
- **Prompt Injection Attempts**: Security threat count
- **Rate of "real" user engagement**: Percentage of on-topic, non-malicious interactions:
  - >70% = Green
  - 50-70% = Yellow
  - <50% = Red
- **Bad Faith or Off-Topic Interactions**: Combined count

User metrics:

- **Total Interaction Count**: Total messages
- **Unique Users**: Cardinality of `user_id`
- **User Messages per Session**: Average messages per session

Outlier Users:

Tables identifying problematic users by:

- Prompt injection attempts
- Off-topic prompts
- Toxic prompts
- Negative sentiment

Each table links to view user traces.

### Filtering

Use the `ml_app` template variable to filter the entire dashboard by LLM application.

## LLM Observability Operational Insights

The [LLM Observability Operational Insights dashboard][1] is the main integration dashboard that tracks high-level operational metrics and performance for your LLM applications.

### Key metrics

This dashboard tracks:

- Model usage, cost, and latency
- LLM application performance
- Token consumption (prompt and completion)
- Trace success and error rates
- Time to first token

### Sections

**Overview**

The Overview section provides high-level metrics:

- Active ML applications with LLM calls
- Trace success and error rate
- Total traces and spans
- Token generation rate
- LLM calls
- Monitor creation link for [LLM Observability monitors][2]

**LLM Requests**

Detailed LLM request metrics including:

- Response times (p50, p95)
- Model usage breakdown
- Token usage by prompt and completion
- Cache hit percentage

**Traces**

End-to-end trace metrics:

- Trace execution time
- Error rates by ML application
- Duration percentiles (p50, p75, p95)


## LLM Observability LLM Chain Insights

The [LLM Observability LLM Chain Insights dashboard][3] provides deep visibility into your LLM chains and a detailed breakdown of all spans in your LLM applications.

### Purpose

Get comprehensive insights into:

- Tool executions (external API or software calls)
- Tasks (internal operations)
- Retrievals (vector search and RAG)
- Embeddings (embedding model calls)

### Sections

**Overview**

High-level span metrics:

- Total traces and spans
- Span kind usage breakdown
- Error rate by span kind
- Timeline of total spans

**Tools**

A tool execution represents an external API or software call that helps your LLM agent.

Metrics tracked:

- Tool error rate
- Average tools per trace
- Tool usage by name
- Usage count, duration, and errors (table view)
- Top tools by success and error
- Tools by p95 duration
- Link to view tool spans

**Tasks**

A task represents a single non-LLM operation without external requests (for example, data preprocessing).

Metrics tracked:

- Task error rate
- Average tasks per trace
- Task usage over time
- Usage count, duration, and errors (table view)
- Top tasks by success and error
- Tasks by p95 duration

**Embeddings**

An embedding represents a standalone call to an embedding model or function.

Metrics tracked:

- Embedding error rate
- Average usage per chain
- Usage breakdown and timeline
- Usage count, duration, and errors (table view)
- Usage by success and error
- Usage by p95 duration

**Retrievals**

A retrieval represents a vector search returning ranked documents from a knowledge base.

Metrics tracked:

- Retrieval error rate
- Average retrievals per chain
- Retrievals over time
- Usage count, duration, and errors (table view)
- Retrievals by success and error
- Retrievals by p95 duration
- Top documents retrieved
- Average document retrieval score

### Filtering

Use the `ml_app` template variable at the top of the dashboard to filter by specific LLM applications.


This dashboard helps you understand the internal composition and performance of your LLM chains at a granular span level.

## LLM Observability Agent Monitoring

The LLM Observability Agent Monitoring dashboard provides visibility into agent-driven workflows, including tool and task orchestration, success and error rates, and latency distribution across agent actions.

### Purpose

Monitor agent behavior and execution health:

- Agent action volume and latency
- Success, failure, and retry patterns
- Tool and task usage and performance
- Bottlenecks across agent steps

### Sections

**Overview**

High-level agent metrics:

- Total agent actions and traces with agent spans
- Agent success and error rate
- Average actions per trace and per session
- Time to first agent action

**Agent Actions**

Execution insights across agent steps:

- Action count, duration percentiles (p50, p75, p95)
- Errors by action type and `ml_app`
- Actions timeline and breakdown by action category

**Tools**

External API calls initiated by agents:

- Tool usage by name and provider
- Tool error rate and duration percentiles
- Average tools per trace and per agent action

**Tasks**

Internal non-LLM operations initiated by agents:

- Task usage over time and by name
- Task error rate and duration percentiles
- Average tasks per trace and per agent action

**Retrievals and Embeddings**

Data access and embedding operations within agent workflows:

- Retrieval count, error rate, p95 duration, and top documents
- Embedding usage, error rate, and duration percentiles

### Filtering

Use the `ml_app` template variable (and additional dashboard variables where present) to filter by specific LLM applications and agents.

## LLM Observability Evaluation Insights

The [LLM Observability Evaluation Insights dashboard][4] provides comprehensive oversight of your LLM applications' quality, safety, and privacy evaluations.

### Purpose

Monitor evaluations to ensure your LLM applications deliver:

- High quality responses
- Safe interactions
- Protection from malicious use
- Compliance with privacy standards

### Sections

**Overview**

High-level security and quality metrics:

- Total unanswered traces
- Total negative interactions
- Total malicious interactions
- Total security checks triggered
- Link to view traces

**User Analytics**

<div class="alert alert-info">To populate this section, add <code>session_id</code> to your application spans. See the SDK documentation for <a href="/llm_observability/instrumentation/sdk?tab=python#tracking-user-sessions">Python</a>, <a href="/llm_observability/instrumentation/sdk?tab=nodejs#tracking-user-sessions">Node.js</a>, <a href="/llm_observability/instrumentation/sdk?tab=java#tracking-user-sessions">Java</a>, or the <a href="/llm_observability/instrumentation/api?tab=model#span">API</a>.</div>

Metrics tracked:

- User messages per session
- Average session length
- Error rate per session
- Average error rate per session

Sentiment analysis:

- Input and output sentiment trends (positive and negative)
- Sentiment trigger counts

**Quality Evaluations**

<div class="alert alert-info">To populate this section, enable evaluations in <a href="/llm_observability/evaluations/">LLM Observability Settings</a>.</div>

The Quality Evaluations section includes:

*Topic Relevancy*

Evaluates whether prompt-response pairs stay on the intended topic. For example, an e-commerce bot receiving pizza recipe questions is flagged.

Configure topics on the [Cluster Map][5] to improve accuracy. View topic relevancy traces from the dashboard.

*Failure to Answer*

Identifies when the LLM doesn't provide satisfactory answers. View failure to answer traces from the dashboard.

*Language Mismatch*

Detects when the LLM responds in a different language than the user's question. View language mismatch traces from the dashboard.

*Toxicity*

Evaluates input prompts and outputs for toxic language.

Metrics:

- Input toxicity detections
- Output toxicity detections
- Link to view toxicity traces

*Hallucination*

Identifies claims that contradict the provided input context. View hallucination traces from the dashboard.

**Security & Safety Evaluations**

<div class="alert alert-info">To populate this section, enable evaluations in <a href="/llm_observability/evaluations/">LLM Observability Settings</a>.</div>

*Prompt Injection*

Identifies malicious attempts to manipulate LLM responses. View prompt injection traces from the dashboard.

*Sensitive Data Scanner*

Powered by [Sensitive Data Scanner][6], this feature scans, identifies, and redacts sensitive information in prompt-response pairs.

Widgets:

- Detection timeline by security type
- Top detections (top list)

*Malicious Users*

Table tracking users by:

- Prompt injection attempts
- Off-topic conversations
- Toxic conversations

**Custom Evaluations**

Submit your own [custom evaluations][7] based on:

- Business success metrics
- Direct user feedback

Types supported:

- Score evaluations (numeric)
- Categorical evaluations (labeled)

<div class="alert alert-info">Clone this dashboard to customize widgets and filters for your specific use case.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/31342/llm-observability-operational-insights-overview
[2]: https://app.datadoghq.com/monitors/create/llm-observability
[3]: https://app.datadoghq.com/dash/integration/31340/llm-observability-llm-chain-insights
[4]: https://app.datadoghq.com/dash/integration/31341/llm-observability-evaluation-insights
[5]: /llm_observability/monitoring/cluster_map/
[6]: /llm_observability/evaluations/#sensitive-data-scanner-integration
[7]: /llm_observability/evaluations/submit_evaluations
[8]: https://app.datadoghq.com/dash/integration/31275/llm-observability-overview