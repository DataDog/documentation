---
title: Querying spans and traces
aliases:
- /llm_observability/monitoring/querying/
description: Learn how to query Agent Observability spans and traces in the Trace Explorer, including how to search by attribute, tags, and trace-level properties.
further_reading:
  - link: "tracing/trace_explorer/query_syntax/"
    tag: "Documentation"
    text: "Trace Explorer Query Syntax"
  - link: "https://learn.datadoghq.com/courses/llm-obs-investigations"
    tag: "Learning Center"
    text: "Investigate with Agent Observability"

---

## Overview
This page discusses using Datadog's [Agent Observability Trace Explorer][1] to query your LLM application's spans and traces.

#### Querying across spans versus traces
In Agent Observability, a _span_ represents a unit of work representing a single operation in your LLM application. A _trace_ represents the end-to-end operations involved in processing a request in your LLM application, often consisting of one or more nested spans. For more information about this terminology, see [Agent Observability Terms and Concepts][2].

In the [Agent Observability Trace Explorer][1], choose whether to search across traces or spans:
- Select {{< ui >}}Traces{{< /ui >}} to find traces where the root span matches your query.
- Select {{< ui >}}Spans{{< /ui >}} to search across all your spans, including nested child spans.

Some search terms are only applicable to traces. For examples, see [Trace-level queries](#trace-level-queries).

### Query by attribute
_Span attributes_ are key-value pairs attached directly to each span. Attributes capture details about the span's execution, such as performance metrics, resource identifiers, or parameter values.

Attribute queries take the form `@key:value`. All attribute keys are prepended with `@`.

| Query | Match |
| ----- | ----- |
| `@duration:>5s` | Spans that took more than 5 seconds to complete |

### Query by tag
_Span tags_ are key-value pairs used to group, segment, and correlate telemetry data across spans, services, or environments. Tags often indicate broader context, such as application name, environment, or deployment region, and are attached to spans to facilitate efficient search and aggregation.

Tag queries take the form `key:value`. In contrast to attribute keys, tag keys are not prepended with `@`.

| Query | Match |
| ----- | ----- |
| `ml_app:my_llm_app` | Spans from an application named `my_llm_app` |

### Query LLM input and output
You can also use free text queries to search for specific keywords, phrases, or strings on any span that has an input or output pair. To use free text search, wrap your query with `"`.

| Query | Match |
| ----- | ----- |
| `"what's the weather"` | Agent, workflow, or LLM spans that contain the string `what's the weather` in the input or output |

<div class="alert alert-info">Free text queries are limited to the first 20,500 characters of a span's input or output.</div>

### Operators

You can combine multiple search terms using the Boolean operators `AND` (intersection), `OR` (union), and `-` (exclusion).

| Query | Match |
| ----- | ----- |
| `@duration:>5s AND -"foo"` | Spans that took more than 5 seconds to complete and do **not** contain the string `foo` in the input or output |

### Query syntax

The Agent Observability Trace Explorer shares the same query syntax as Datadog's [APM Trace Explorer][6]. For query syntax details, including wildcard search, handling numerical values, escaping special characters, and more, see [Trace Explorer Query Syntax][6].

## Example queries

| Query | Match |
| ----- | ----- |
| `@status:error` | Spans or traces that have a status of `error` |
| `@meta.error.type:"Max turns exceeded"` | Spans or traces that have the error type `Max turns exceeded` |
| `@duration:>5s` | Spans or traces that took more than 5 seconds to complete |
| `@trace.total_tokens:>=1000` | Traces that consumed 1000 or more total tokens |
| `ml_app:my_llm_app` | Spans or traces from an application named `my_llm_app` |
| `"what's the weather"` | Agent, workflow, or LLM spans that contain the string `what's the weather` in the input or output |

### Evaluation queries

Use the `@evaluation` attribute to find spans or traces by [evaluation][3] result.

#### Evaluations
You can search spans by the results of [evaluations][4]. For example, if you have an evaluation called `user_mood` with categorical values `happy`, `sad`, and `tired`, you could use the query: `@evaluation.user_mood.value:happy`.

| Query | Match |
| ----- | ----- |
| `@evaluation.user_satisfaction.value:>5` | Spans or traces that scored higher than 5 according to an evaluation called `user_satisfaction` |
| `@evaluation.user_mood.value:happy` | Spans or traces that were evaluated as `happy` according to an evaluation called `user_mood` that has the categorical values `happy`, `sad`, and `tired` |

### Feedback queries

Use the `@feedback` attribute to find spans or traces by [end-user feedback][8] submissions. For example, if your users are submitting feedback under the label `user_satisfaction` with categorical values `thumbs_up` or `thumbs_down`, you could use the query: `@feedback.user_satisfaction.value:thumbs_down`.

| Query | Match |
| ----- | ----- |
| `@feedback.user_satisfaction.value:thumbs_down` | Spans or traces that received a thumbs down rating for a feedback label called `user_satisfaction` |
| `@feedback.user_comment.assessment:fail` | Spans or traces with a failing assessment for a feedback label called `user_comment` |
| `@feedback.user_score.value:<2` | Spans or traces with a score less than 2 for a feedback label called `user_score` |

### Metadata queries

Use the `@meta` attribute to find spans by metadata information.

| Query | Match |
| ----- | ----- |
| `@meta.span.kind:llm` | Spans of the `llm` [_span kind_][5]. |
| `@meta.model_provider:openai` | Spans or traces where the model provider is OpenAI |
| `@meta.model_name:gpt-4.1` | Spans or traces where the model is GPT-4.1 |

#### Custom metadata

You can query spans and traces by [custom metadata fields][7] attached during instrumentation. Custom metadata fields are accessible under `@meta.metadata.<key>`.

| Query | Match |
| ----- | ----- |
| `@meta.metadata.config.debug_mode:false` | Spans or traces with custom metadata field `config.debug_mode` set to `false` |
| `@meta.metadata.job_id:job_14fb81c3` | Spans or traces with custom metadata field `job_id` set to `job_14fb81c3` |

### Trace-level queries

To search traces based on attributes of its nested spans, use the `@child` attribute.

| Query | Match |
| ----- | ----- |
| `@child.@evaluation.hallucination.value:"hallucination found"` | Traces with a hallucinating sub-span |
| `@child.@meta.span.kind:retrieval AND @meta.span.kind:workflow`| Workflow traces that contain a retrieval span |

Use the `@trace` attribute to access trace-level information, such as estimated total cost, number of LLM calls, or number of tools.

| Query | Match |
| ----- | ----- |
| `@trace.llm_calls:>3` | Traces with more than 3 LLM calls |
| `@trace.tool_calls:>=4` | Traces with 4 or more tool calls |
| `@trace.number_of_tools:<5` | Traces that call fewer than 5 different tools |

## Live mode

<div class="alert alert-info">Live mode is in Preview.</div>

Live mode shows the spans your LLM applications sent in the last 15 minutes as soon as Datadog receives them, before they are indexed. This works like [Live Search in the APM Trace Explorer][9]. Use live mode to watch a deployment roll out, confirm that new instrumentation is reporting, or follow a test session as it happens.

To turn on live mode, open the time selector in the [Trace Explorer][1] and choose the {{< ui >}}15 minutes{{< /ui >}} option marked with a lightning icon. The time selector stays highlighted while live mode is on, and the span list refreshes every few seconds. If you pick a time range longer than 15 minutes, the Trace Explorer leaves live mode and searches indexed data instead.

### All spans, before sampling

Live mode shows every span that Datadog receives through the APM trace intake in the rolling 15-minute window (see [Requirements](#requirements)). It does not apply [trace sampling][10]. Live mode includes spans that your `DD_LLMOBS_SAMPLE_RATE` or [tag-based sampling rules][11] later drop. After 15 minutes, you can only search the spans that sampling kept.

### Requirements

Live mode only shows spans that the SDK sends through Datadog's APM trace intake. The Python SDK (`ddtrace` 4.12.0 or later) uses this path by default. Other SDKs, and earlier `ddtrace` versions, send spans to a separate Agent Observability intake. Spans sent that way still show up in the Trace Explorer after they are indexed, but not in live mode.

With `ddtrace` 4.12.0 or later, spans use the APM trace intake whether you run the Datadog Agent or send data agentlessly (`DD_LLMOBS_AGENTLESS_ENABLED=1`).

**Note**: If you run the Datadog Agent, the Agent drops APM traces that [APM ingestion sampling][12] doesn't keep. The SDK sends the Agent Observability spans from those traces through the separate Agent Observability intake, so they don't appear in live mode. In agentless setups, the SDK sends every trace to the APM trace intake, so all spans appear in live mode.

The SDK switches to the separate Agent Observability intake when either of these environment variables is set:

| Environment variable | Effect |
| ----- | ----- |
| `DD_APM_TRACING_ENABLED=false` | Turns off APM tracing. Spans go to the separate Agent Observability intake and don't appear in live mode. |
| `DD_TRACE_ENABLED=false` | Turns off the tracer. Spans go to the separate Agent Observability intake and don't appear in live mode. |

When LLM Observability is on, the SDK sends APM traces with the `v0.4` trace API. If you set `DD_TRACE_API_VERSION=v0.5`, the SDK logs a warning and uses `v0.4` instead, because `v0.5` can't carry Agent Observability span data.

### Limitations

Live mode reads spans before Datadog enriches them after ingestion. As a result, live mode does not support these fields:

- Evaluations (`@evaluation.*`, `@evaluations.*`) and [end-user feedback][8] (`@feedback.*`)
- [Trace-level queries](#trace-level-queries) (`@trace.*` and `@child.*`)

The Trace Explorer hides these facets and columns while live mode is on. To query them, choose a time range longer than 15 minutes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /llm_observability/quickstart/terms/
[3]: /llm_observability/investigate/evaluations/
[4]: /llm_observability/investigate/evaluations/external_evaluations
[5]: /llm_observability/quickstart/terms/#span-kinds
[6]: /tracing/trace_explorer/query_syntax/
[7]: /llm_observability/instrument/sdk/#annotating-metadata
[8]: /llm_observability/investigate/evaluations/end_user_feedback
[9]: /tracing/trace_explorer/#live-search-for-15-minutes
[10]: /llm_observability/instrument/sdk/#trace-sampling
[11]: /llm_observability/instrument/sdk/#tag-based-sampling-rules
[12]: /tracing/trace_pipeline/ingestion_mechanisms/
