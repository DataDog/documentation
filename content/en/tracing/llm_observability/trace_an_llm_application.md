---
title: Trace an LLM Application
kind: guide
---
<div class="alert alert-info">LLM Observability is in public beta.</a></div>

## Overview

Your application can submit data to LLM Observability in two ways: with Datadog's [Python SDK][12], or with the [LLM Observability API][13].

Each request fulfilled by your application is represented as a trace on the [LLM Observability traces page][2] in Datadog:

{{< img src="tracing/llm_observability/llm-observability-overview.png" alt="An LLM Observability trace displaying each span of a request" style="width:100%;" >}}

A given trace contains spans representing each choice made by an agent or each step of a workflow. A *span* represents some unit of work that your application is performing. Spans have a start time, duration, name, tags, and attributes.

Multiple spans combine to form a trace, and a *root span* is the first span in a trace.

A trace can contain several kinds of spans: Agent, LLM, Workflow, and so on. The *span kind* categorizes the type of work the span is performing. Different span kinds have different parent-child relationships, and only some kinds can be the root span of a trace. For details, see [Span Kinds][4].

## Instrument an LLM application

<div class="alert alert-info">This guide uses the LLM Observability SDK for Python. If your application is not written in Python, you can complete the steps below with API requests instead of SDK function calls.</a></div>

To trace an LLM application:

1. [Install the LLM Observability SDK][1].
1. [Start your application with the required environment variables][5], including your Datadog API key. If you don't have an API key, you can [create one in Datadog][3].
1. In your code, [use the SDK to create spans](#span-creation-example) representing your application's tasks.
    - See the span creation example below.
    - For additional examples and detailed usage, see the [Quickstart][10] and the [SDK documentation for tracing spans][11]. 
1. [Annotate your spans][7] with input data, output data, metadata (such as `max_tokens`), and key-value tags (such as `version:1.0.0`).
1. Explore the resulting traces on the [LLM Observability traces page][2], and the resulting metrics on the out-of-the-box [LLM Observability dashboard][14].

Optionally, you can also:

- Associate multiple interactions with one user by specifying a `session_id`. See [Tracking user sessions][6] in the SDK documentation.
- [Persist a span between contexts or scopes][8] by manually starting and stopping it.
- [Override the name of the LLM application with a different name][9] when starting a root span, which can be useful for differentiating between services or running an experiment.

### Span creation example

To create a span, use the LLM Observability SDK's `LLMObs.<SPAN_KIND>()` as a context manager, replacing `<SPAN_KIND>` with the desired [span kind][4]. 

The example below creates a workflow span:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

[1]: /tracing/llm_observability/sdk/#installation
[2]: https://app.datadoghq.com/llm/traces
[3]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: /tracing/llm_observability/span_kinds
[5]: /tracing/llm_observability/sdk/#running-an-llm-application
[6]: /tracing/llm_observability/sdk/#tracking-user-sessions
[7]: /tracing/llm_observability/sdk/#annotating-a-span
[8]: /tracing/llm_observability/sdk/#persisting-a-span-across-contexts
[9]: /tracing/llm_observability/sdk/#tracing-multiple-applications
[10]: /tracing/llm_observability/quickstart/
[11]: /tracing/llm_observability/sdk/#tracing-spans
[12]: /tracing/llm_observability/sdk
[13]: /tracing/llm_observability/api
[14]: https://app.datadoghq.com/dash/integration/llm_analytics
