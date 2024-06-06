---
title: Tracing Concepts
---

<div class="alert alert-info">LLM Observability is in public beta.</a></div>

## Spans

A span is a unit of work representing an operation in your LLM application, and is the building block of a trace.

### Span Attributes

A span consists of the following attributes:
- Name of the traced operation
- Operation timestamp data
- Error information including type, message, and traceback
- Inputs and Outputs to the traced operation (e.g. LLM prompts and completions)
- Metadata relevant to the traced operation (e.g. LLM parameters such as `temperature`, `max_tokens`)
- Metrics relevant to the traced operation (e.g. `prompt_tokens`, `completion_tokens`)
- Tags

### Span Kinds

LLM Observability categorizes spans by their span kind, which defines the type of work the span is performing. This can give you more granular insights on what operations are being performed by your LLM application. LLM Observability currently supports the following span kinds:
- *LLM*: A call to an LLM.
- *Workflow*: A sequence of operations which include LLM calls and any supporting operations.
- *Agent*: A series of decisions and operations made by an autonomous agent.
- *Tool*: A call to external programs or services, such as a web API or a database.
- *Task*: Any standalone step in a workflow or agent that does not involve a call to an external service.
- *Embedding*: A call to an embedding model or function.
- *Retrieval*: A data retrieval operation from an external knowledge base.

To learn more about each span kind, see the [Span kind][1] page.


## Traces

A trace represents the work involved in processing a request in your LLM application, and consists of one or more nested spans. A *root span* is the first span in a trace, and marks the beginning and end of the trace.

Datadog’s LLM Observability product is designed to support observability for a variety of LLM applications, from simple to complex:

### LLM Inference Monitoring

The basic level of a LLM trace is a singular LLM span. Tracing individual LLM inferences unlocks basic LLM Observability features, allowing you to:
1. Track inputs and outputs to your LLM calls
2. Track token usage, error rates, and latencies for your LLM calls
3. Break down important metrics by models and model providers

The SDK provides integrations to automatically capture LLM calls to specific providers. See [LLM integrations][2] for more information. If you are using an LLM provider that is not supported, you will need to manually instrument your application.

{{< img src="tracing/llm_observability/llm-observability-llm-span.png" alt="A singular LLM span" style="width:100%;" >}}

### LLM Workflow Monitoring

Your application likely includes operations that surround LLM calls which play a large role in your overall application performance, for instance tool calls to external APIs or preprocessing task steps.

By tracing LLM, task, tool, and other spans together under workflow spans, you can unlock more granular insights and a more holistic view regarding your LLM application.

{{< img src="tracing/llm_observability/llm-observability-workflow-trace.png" alt="A trace visualizing a more complex LLM workflow" style="width:100%;" >}}

### LLM Agent Monitoring

What if your LLM application has complex autonomous logic such as decision making that can’t be captured by a static workflow? You are likely using an LLM Agent. Agents may execute multiple different workflows depending on the user input.

In addition to tracing LLM workflows, you can instrument your LLM application to trace and group together all workflows and contextual operations run by a single LLM agent as an agent trace.

{{< img src="tracing/llm_observability/llm-observability-agent-trace.png" alt="A trace visualizing an LLM agent" style="width:100%;" >}}


[1]: /tracing/llm_observability/span_kinds
[2]: /tracing/llm_observability/sdk/#llm-integrations