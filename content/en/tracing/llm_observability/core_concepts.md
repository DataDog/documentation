---
title: Core Concepts
---

<div class="alert alert-info">LLM Observability is in public beta.</a></div>

## Spans

A span is a unit of work representing an operation in your LLM application, and is the building block of a trace.

### Span Attributes

A span consists of the following attributes:
- Name
- Start time and duration
- Error type, message, and traceback
- Inputs and Outputs (e.g. LLM prompts and completions)
- Metadata (e.g. LLM parameters such as `temperature`, `max_tokens`)
- Metrics (e.g. `prompt_tokens`, `completion_tokens`)
- Tags

### Span Kinds

LLM Observability categorizes spans by their span kind, which defines the type of work the span is performing. This can give you more granular insights on what operations are being performed by your LLM application. LLM Observability currently supports the following span kinds:
- **LLM**: A call to an LLM.
- **Workflow**: A sequence of operations which include LLM calls and any supporting operations.
- **Agent**: A series of decisions and operations made by an autonomous agent.
- **Tool**: A call to external programs or services, such as a web API or a database.
- **Task**: Any standalone step in a workflow or agent that does not involve a call to an external service.
- **Embedding**: A call to an embedding model or function.
- **Retrieval**: A data retrieval operation from an external knowledge base.

To learn more about each span kind, see the [Span kind][1] page.


## Traces

A trace represents the work involved in processing a request in your LLM application, and consists of one or more nested spans. A *root span* is the first span in a trace, and marks the beginning and end of the trace.

Datadog’s LLM Observability product is designed to support observability for LLM applications with varying complexity. Based on the structure and complexity of your traces, you can unlock the following features of LLM Observability:

### 1. LLM Inference Monitoring

A trace comprised of a single LLM span as the root.

The basic level of a LLM trace is a single LLM span. Tracing individual LLM inferences unlocks basic LLM Observability features, allowing you to:
1. Track inputs and outputs to your LLM calls
2. Track token usage, error rates, and latencies for your LLM calls
3. Break down important metrics by models and model providers

The SDK provides integrations to automatically capture LLM calls to specific providers. See [Auto-instrumentation][2] for more information. If you are using an LLM provider that is not supported, you will need to manually instrument your application.

{{< img src="tracing/llm_observability/llm-observability-llm-span.png" alt="A single LLM span" style="width:100%;" >}}

### 2. LLM Workflow Monitoring

A trace comprised of a root workflow span with nested LLM, task, tool, embedding, and retrieval spans.

Your application likely includes operations that surround LLM calls which play a large role in your overall application performance—for instance, tool calls to external APIs or preprocessing task steps.

By tracing LLM calls and contextual task or tool operations together under workflow spans, you can unlock more granular insights and a more holistic view regarding your LLM application.

{{< img src="tracing/llm_observability/llm-observability-workflow-trace.png" alt="A trace visualizing a more complex LLM workflow" style="width:100%;" >}}

### 3. LLM Agent Monitoring

A trace comprised of a root agent span with nested LLM, task, tool, embedding, retrieval, and workflow spans.

What if your LLM application has complex autonomous logic such as decision making that can’t be captured by a static workflow? You are likely using an LLM Agent. Agents may execute multiple different workflows depending on the user input.

You can instrument your LLM application to trace and group together all workflows and contextual operations run by a single LLM agent as an agent trace.

{{< img src="tracing/llm_observability/llm-observability-agent-trace.png" alt="A trace visualizing an LLM agent" style="width:100%;" >}}


## Evaluations

Evaluations are a method for measuring the performance of your LLM application. For example, quality checks like failure to answer or topic relevancy are different types of evaluations that you can track for your LLM application.

Datadog's LLM Observability associates evaluations with individual spans so that you can view the inputs and outputs that led to a specific evaluation. Datadog provides a few out-of-the-box evaluations for your traces, but you can also submit your own evaluations to LLM Observability (see the [Evaluations guide][3] for more information).


[1]: /tracing/llm_observability/span_kinds
[2]: /tracing/llm_observability/auto_instrumentation
[3]: /tracing/llm_observability/submit_evaluations