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

Datadog’s LLM Observability product is designed to support observability for a variety of LLM applications, from simple to complex: 

### LLM inference monitoring

The basic level of a LLM trace is a singular LLM span. Tracing individual LLM inferences unlocks basic LLM Observability features, allowing you to:
1. Track inputs and outputs to your LLM calls
2. Track token usage, error rates, and latencies for your LLM calls
3. Break down important metrics by models and model providers

The Python SDK provides some out-of-the-box integrations to automatically capture LLM calls to specific providers. See [Datadog's list of supported integrations][19] for more information. If you are using an LLM provider that is not supported, you will need to manually instrument your application.

{{< img src="tracing/llm_observability/llm-observability-llm-span.png" alt="A singular LLM span" style="width:100%;" >}}

### LLM workflow monitoring

Your application likely includes many contextual operations around LLM calls that play a large role in your overall application performance, for instance tool calls to external APIs or preprocessing task steps.

In addition to tracing individual LLM inferences, you can instrument your LLM application to trace and group together LLM calls and their contextual operations into workflows. This leads to a more complex trace with a workflow span as the root. This can unlock a more holistic view and more granular insights regarding your LLM application.

{{< img src="tracing/llm_observability/llm-observability-workflow-trace.png" alt="A trace visualizing a more complex LLM workflow" style="width:100%;" >}}

### LLM agent monitoring

What if your LLM application has complex autonomous logic like memory and decision making that can’t be captured by a static workflow? You are likely using an LLM Agent. LLM Agents may execute multiple different workflows depending on the user input. Agents often utilize LLMs as an internal brain to make decisions about what operation to complete.

In addition to tracing LLM workflows, you can instrument your LLM application to trace and group together all workflows and contextual operations run by a single LLM agent as an agent trace.

{{< img src="tracing/llm_observability/llm-observability-agent-trace.png" alt="A trace visualizing an LLM agent" style="width:100%;" >}}

### Span kinds

A trace can contain several kinds of spans. The *span kind* categorizes the type of work the span is performing, and can give you more granular insights on your LLM application.

## Instrument an LLM application

<div class="alert alert-info">This guide uses the LLM Observability SDK for Python. If your application is not written in Python, you can complete the steps below with API requests instead of SDK function calls.</a></div>

Datadog's LLM Observability Python SDK provides a degree of [auto-instrumentation to capture LLM calls for specific LLM providers][19]. However, if you instrument your LLM application using the Python SDK beyond individual LLM spans, you can unlock all of Datadog's LLM Observability features.

To trace an LLM application:

1. [Install the LLM Observability SDK][1].
1. Configure the SDK by providing [the required environment variables][5] in your application startup command, or programmatically [in-code][20].
1. In your code, use the SDK to create spans representing your application's operations.
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


### Span annotation example

To annotate a span, use the LLM Observability SDK's `LLMObs.annotate()` method.

The example below annotates the workflow span created in the above example:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message")
def process_message():
    ... # user application logic
    LLMObs.annotate(
        span=None,
        input_data="<ARGUMENT>",
        output_data="<OUTPUT>",
        metadata={},
        metrics={"prompt_tokens": 15, "completion_tokens": 24},
        tags={},
    )
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
[19]: /tracing/llm_observability/sdk/#llm-integrations
[19]: /tracing/llm_observability/sdk/#in-code-setup