---
title: Trace an LLM Application
kind: guide
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
LLM Observability is not available in the US1-FED site.
</div>
{{% /site-region %}}

<div class="alert alert-info">LLM Observability is in public beta.</a></div>

## Overview

Your application can submit data to LLM Observability in two ways: with Datadog's [Python SDK][12], or with the [LLM Observability API][13].

Each request fulfilled by your application is represented as a trace on the [LLM Observability traces page][2] in Datadog:

{{< img src="tracing/llm_observability/llm-observability-overview.png" alt="An LLM Observability trace displaying each span of a request" style="width:100%;" >}}

A given trace contains spans representing each choice made by an agent or each step of a workflow. A *span* represents some unit of work that your application is performing. Spans have a start time, duration, name, tags, and attributes.

Multiple spans combine to form a trace, and a *root span* is the first span in a trace.

A trace can contain several kinds of spans. The *span kind* categorizes the type of work the span is performing. 

Only three span kinds can be the root span of a trace:

- **LLM span**: An individual LLM inference. LLM spans allow you to track inputs and outputs to your LLM calls; track tokens, error rates, and latencies for your LLM calls; and break down important metrics by models and model providers.
- **Workflow span**: A grouping of LLM calls and their contextual operations, such as tool calls or preprocessing steps.
- **Agent span**: A dynamic LLM workflow executed by an LLM agent.

Different span kinds also have different parent-child relationships. For details, see [Span Kinds][4].

## Instrument an LLM application

<div class="alert alert-info">This guide uses the LLM Observability SDK for Python. If your application is not written in Python, you can complete the steps below with API requests instead of SDK function calls.</a></div>

To trace an LLM application:

1. [Install the LLM Observability SDK][1].
1. Configure the SDK by providing [the required environment variables][5] in your application startup command.
1. In your code, use the SDK to create spans representing your application's tasks.
    - See the span creation example below.
    - For additional examples and detailed usage, see the [Quickstart][10] and the [SDK documentation for tracing spans][11]. 
1. [Annotate your spans][7] with input data, output data, metadata (such as `temperature`), metrics (such as `input_tokens`), and key-value tags (such as `version:1.0.0`).
1. Explore the resulting traces on the [LLM Observability traces page][2], and the resulting metrics on the out-of-the-box [LLM Observability dashboard][14].

Optionally, you can also:

- Associate multiple interactions with one user by specifying a `session_id`. See [Tracking user sessions][6] in the SDK documentation.
- [Persist a span between contexts or scopes][8] by manually starting and stopping it.
- [Override the name of the LLM application with a different name][9] when starting a root span, which can be useful for differentiating between services or running an experiment.
- Submit feedback from the users of your LLM application (thumbs up/thumbs down, rating from 1 to 5, and so on) as custom [evaluations][18] via the [SDK][15] or the [API][16]. This allows you to visualize the feedback in your traces and also in the [cluster map view][17], where you can monitor any patterns in different topics of your LLM applications against these evaluations.

### Span creation example

To create a span, use the LLM Observability SDK's `llmobs.decorators.<SPAN_KIND>()` as a function decorator, replacing `<SPAN_KIND>` with the desired [span kind][4].

The example below creates a workflow span:

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

For more information on alternative tracing methods and tracing features, see the [SDK documentation][12].

[1]: /tracing/llm_observability/sdk/#installation
[2]: https://app.datadoghq.com/llm/traces
[3]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: /tracing/llm_observability/span_kinds
[5]: /tracing/llm_observability/sdk/#command-line-setup
[6]: /tracing/llm_observability/sdk/#tracking-user-sessions
[7]: /tracing/llm_observability/sdk/#annotating-a-span
[8]: /tracing/llm_observability/sdk/#persisting-a-span-across-contexts
[9]: /tracing/llm_observability/sdk/#tracing-multiple-applications
[10]: /tracing/llm_observability/quickstart/
[11]: /tracing/llm_observability/sdk/#tracing-spans
[12]: /tracing/llm_observability/sdk
[13]: /tracing/llm_observability/api
[14]: https://app.datadoghq.com/dash/integration/llm_analytics
[15]: /tracing/llm_observability/sdk/#evaluations
[16]: /tracing/llm_observability/api/?tab=model#evaluations-api
[17]: https://app.datadoghq.com/llm/clusters
[18]: /tracing/llm_observability/submit_evaluations
