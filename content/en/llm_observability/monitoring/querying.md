---
title: Querying spans and traces
further_reading:
  - link: "tracing/trace_explorer/query_syntax/"
    tag: "Documentation"
    text: "Trace Explorer Query Syntax"
---

## Overview
This page discusses using Datadog's [LLM Observability Trace Explorer][1] to query your LLM application's spans and traces.

In Datadog, a _span_ represents a unit of work representing a single operation in your LLM application. A _trace_ represents the end-to-end operations involved in processing a request in your LLM application, often consisting of one or more nested spans. For more information about this terminology, see [LLM Observability Terms and Concepts][2].

To toggle between searching spans and traces, use the drop-down menu on the left of the query field. When searching traces, a query returns traces where the root span matches the query.

### Query by attribute
_Span attributes_ are structured, key-value metadata attached directly to each span, capturing details about the span’s execution, such as performance metrics, resource identifiers, or parameter values. 

Attribute queries take the form `@key:value`. All attribute keys are prepended with `@`.

For example, the query `@duration:>5s` returns spans that took more than 5 seconds to complete.

### Query by tag
_Span tags_ are high-level key-value pairs used to group, segment, and correlate telemetry data across spans, services, or environments. Tags often indicate broader context, such as application name, environment, or deployment region, and are attached to spans to enable efficient search and aggregation.

Tag queries take the form `key:value`. In contrast to attribute keys, tag keys are not prepended with `@`.

For example, the query `ml_app:my_llm_app` returns spans from an application named `my_llm_app`.

### Query LLM input and output
You can also search for free text in the input and output of your LLM application's spans. Wrap your free text query with `"`.

For example, the query `"what's the weather"` returns agent, workflow, or LLM spans that contain the string `what's the weather` in the input or output.

<div class="alert alert-info">Free text queries are limited to the first 20,500 characters of a trace's input or output.</div>

### Operators

You can combine multiple search terms using the Boolean operators `AND` (intersection), `OR` (union), and `-` (exclusion).

For example, the query `@duration:>5s AND -"foo"` returns spans that took more than 5 seconds to complete and do **not** contain the string `foo` in the input or output.

### Query syntax

The LLM Observability Trace Explorer shares the same query syntax as Datadog's [APM Trace Explorer][6]. For query syntax details, including wildcard search, handling numerical values, escaping special characters, and more, see [Trace Explorer Query Syntax][6].

## Example queries

`@status:error`
: Finds spans or traces that have a status of `error`.

`@meta.error.type:<error_type_name>`
: Finds spans or traces by error type. For example, `<error_type_name>` could be `"Max turns exceeded"`.

`@duration:>5s`
: Finds spans or traces that took more than 5 seconds to complete.

`@trace.total_tokens:>=1000`
: Finds traces that consumed 1000 or more total tokens.

### Evaluation queries

Use the `@evaluations` attribute to find spans or traces by [evaluation][3] result.

`@evaluations.failure_to_answer:"failed to answer"`
: Finds spans or traces where the LLM failed to deliver an appropriate response.

`@evaluations.hallucination:"hallucination found"`
: Finds spans or traces where a hallucination is detected.

`@evaluations.input_sentiment:negative`
: Finds spans or traces with negative input sentiment.

`@evaluations.input_toxicity:toxic`
: Finds spans or traces where harmful or inappropriate content is detected in the input.

`@evaluations.language_mismatch:mismatched`
: Finds spans or traces where the user's prompt and the LLM's response are in different languages.

`@evaluations.output_sentiment:negative`
: Finds spans or traces with negative output sentiment.

`@evaluations.output_toxicity:toxic`
: Finds spans or traces where harmful or inappropriate content is detected in the output.

`@evaluations.prompt_injection:found`
: Finds spans or traces where prompt injection is detected.

`@evaluations.topic_relevancy:irrelevant`
: Finds spans or traces where the prompt input diverges from the LLM application's intended topic.

You can also search spans by the results of [custom evaluations][4]. For example, if you have a custom evaluation called `user_mood` with categorical values `happy`, `sad`, and `tired`, you could use the query: `@evaluations.custom.user_mood:happy`.

### Metadata queries

Use the `@meta` attribute to find spans by metadata information.

`@meta.span.kind:<span_kind>`
: Finds spans by [_span kind_][5]. For example, `<span_kind>` could be `llm`, `workflow`, `tool`, etc. 

`@meta.model_provider:openai`
: Finds spans or traces where the model provider is OpenAI.

`@meta.model_name:gpt-4.1`
: Finds spans or traces where the model is GPT-4.1.

### Trace-level queries

To search traces based on attributes of its nested spans, use the `@child` attribute.

`@child.@evaluations.hallucination:"hallucination found"`
: Finds traces with a hallucinating sub-span.

`@child.@meta.span.name:retrieval AND @meta.span.kind:workflow`
: Finds workflow traces that contain a retrieval span.

Use the `@trace` attribute to access trace-level information, such as estimated total cost, number of LLM calls, or number of tools.

`@trace.llm_calls:>3`
: Finds traces with more than 3 LLM calls.

`@trace.tool_calls:>=4`
: Finds traces with 4 or more tool calls.

`@trace.number_of_tools:<5`
: Finds traces that call fewer than 5 different tools.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /llm_observability/terms/
[3]: /llm_observability/evaluations/
[4]: /llm_observability/evaluations/submit_evaluations
[5]: /llm_observability/terms/#span-kinds
[6]: /tracing/trace_explorer/query_syntax/