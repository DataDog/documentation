---
title: Querying spans and traces
further_reading:
  - link: "tracing/trace_explorer/query_syntax/"
    tag: "Documentation"
    text: "Trace Explorer Query Syntax"
---

## Overview
This page discusses using Datadog's [LLM Observability Trace Explorer][1] to query your LLM application's spans and traces.

#### Querying across spans versus traces
In LLM Observability, a _span_ represents a unit of work representing a single operation in your LLM application. A _trace_ represents the end-to-end operations involved in processing a request in your LLM application, often consisting of one or more nested spans. For more information about this terminology, see [LLM Observability Terms and Concepts][2].

In the [LLM Observability Trace Explorer][1], choose whether to search across traces or spans:
- Select **Traces** to find traces where the root span matches your query.
- Select **Spans** to search across all your spans, including nested child spans.

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

The LLM Observability Trace Explorer shares the same query syntax as Datadog's [APM Trace Explorer][6]. For query syntax details, including wildcard search, handling numerical values, escaping special characters, and more, see [Trace Explorer Query Syntax][6].

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

Use the `@evaluations` attribute to find spans or traces by [evaluation][3] result.

#### Custom evaluations
You can search spans by the results of [custom evaluations][4]. For example, if you have a custom evaluation called `user_mood` with categorical values `happy`, `sad`, and `tired`, you could use the query: `@evaluations.custom.user_mood:happy`.

| Query | Match |
| ----- | ----- |
| `@evaluations.custom.user_satisfaction:>5` | Spans or traces that scored higher than 5 according to a custom evaluation called `user_satisfaction` |
| `@evaluations.custom.user_mood:happy` | Spans or traces that were evaluated as `happy` according to a custom evaluation called `user_mood` that has the categorical values `happy`, `sad`, and `tired` |

#### Out-of-the-box evaluations
| Query | Match |
| ----- | ----- |
| `@evaluations.failure_to_answer:"failed to answer"` | Spans or traces where the LLM failed to deliver an appropriate response |
| `@evaluations.hallucination:"hallucination found"` | Spans or traces where a hallucination is detected |
| `@evaluations.input_sentiment:negative` | Spans or traces with negative input sentiment |
| `@evaluations.input_toxicity:toxic` | Spans or traces where harmful or inappropriate content is detected in the input |
| `@evaluations.language_mismatch:mismatched` | Spans or traces where the user's prompt and the LLM's response are in different languages |
| `@evaluations.output_sentiment:negative` | Spans or traces with negative output sentiment |
| `@evaluations.output_toxicity:toxic` | Spans or traces where harmful or inappropriate content is detected in the output |
| `@evaluations.prompt_injection:found` | Spans or traces where prompt injection is detected |
| `@evaluations.topic_relevancy:irrelevant` | Spans or traces where the prompt input diverges from the LLM application's intended topic |

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
| `@child.@evaluations.hallucination:"hallucination found"` | Traces with a hallucinating sub-span |
| `@child.@meta.span.name:retrieval AND @meta.span. kind:workflow`| Workflow traces that contain a retrieval span |

Use the `@trace` attribute to access trace-level information, such as estimated total cost, number of LLM calls, or number of tools.

| Query | Match |
| ----- | ----- |
| `@trace.llm_calls:>3` | Traces with more than 3 LLM calls |
| `@trace.tool_calls:>=4` | Traces with 4 or more tool calls |
| `@trace.number_of_tools:<5` | Traces that call fewer than 5 different tools |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /llm_observability/terms/
[3]: /llm_observability/evaluations/
[4]: /llm_observability/evaluations/submit_evaluations
[5]: /llm_observability/terms/#span-kinds
[6]: /tracing/trace_explorer/query_syntax/
[7]: /llm_observability/instrumentation/sdk/#annotating-metadata
