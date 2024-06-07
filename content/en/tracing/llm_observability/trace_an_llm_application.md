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

Your application can submit data to LLM Observability in two ways: with LLM Observability's [Python SDK][1], or with the LLM Observability [API][2].

Each request fulfilled by your application is represented as a trace on the [LLM Observability traces page][2] in Datadog. Before proceeding, please read the LLM Observability [Tracing concepts][3] guide.

{{< img src="tracing/llm_observability/llm-observability-overview.png" alt="An LLM Observability trace displaying each span of a request" style="width:100%;" >}}

## Instrument your LLM application

<div class="alert alert-info">This guide uses the LLM Observability SDK for Python. If your application is not written in Python, you can complete the steps below with API requests instead of SDK function calls.</a></div>

Datadog provides [auto-instrumentation][4] to capture LLM calls for specific LLM provider libraries. However, manually instrumenting your LLM application using the Python SDK can unlock even more of Datadog's LLM Observability features.

To trace an LLM application:

1. [Install the LLM Observability SDK][5].
2. Configure the SDK by providing [the required environment variables][6] in your application startup command, or programmatically [in-code][7].
    - Remember to configure your Datadog API key, Datadog site, and ML app name.
3. [Create spans](#creating-spans) in your LLM application code to represent your application's operations.
    - For additional examples and detailed usage, see the [Quickstart][8] and the [SDK documentation][9].
    - [Nest spans](#nesting-spans) to create more useful traces.
4. [Annotate your spans](#annotating-spans) with input data, output data, metadata (such as `temperature`), metrics (such as `prompt_tokens`), and key-value tags (such as `version:1.0.0`).
5. Run your LLM application. 
    - Use the `ddtrace-run` command if you used the command-line setup method, otherwise run your application as normal if you used the in-code setup method.
6. Explore the resulting traces on the [LLM Observability traces page][10], and the resulting metrics on the out-of-the-box [LLM Observability dashboard][11].

### Creating spans

To create a span, use the LLM Observability SDK's `ddtrace.llmobs.decorators.<SPAN_KIND>()` as a function decorator, replacing `<SPAN_KIND>` with the desired [span kind][4].

In addition, the LLM Observability SDK provides equivalent inline methods to [create and track spans][12]. Use `ddtrace.llmobs.LLMObs.<SPAN_KIND>()` as a context manager, replacing `<SPAN_KIND>` with the desired [span kind][4].

The examples below create a workflow span.

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # user application logic
    return
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow() as span:
        ... # user application logic
    return
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Nesting spans

Starting a new span before the current span is finished will automatically trace a parent-child relationship between the two spans. The parent span represents the larger operation while the child span represents a smaller nested sub-operation within it.

The examples below create a trace with two spans.

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    perform_preprocessing()
    ... # user application logic
    return

@task
def perform_preprocessing():
    ... # user application logic
    return
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message") as workflow_span:
        with LLMObs.task(name="perform_preprocessing") as task_span:
            ... # user application logic
    return
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Annotating spans

To [annotate a span][13], use the LLM Observability SDK's `LLMObs.annotate()` method.

The examples below annotate the workflow span created in the [above example](#creating-spans):

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message")
def process_message():
    ... # user application logic
    LLMObs.annotate(
        input_data="<ARGUMENT>",
        output_data="<OUTPUT>",
        metadata={},
        metrics={"prompt_tokens": 15, "completion_tokens": 24},
        tags={},
    )
    return
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow() as span:
        ... # user application logic
        LLMObs.annotate(
            input_data="<ARGUMENT>",
            output_data="<OUTPUT>",
            metadata={},
            metrics={"prompt_tokens": 15, "completion_tokens": 24},
            tags={},
        )
    return
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

For more information on alternative tracing methods and tracing features, see the [SDK documentation][12].

### Advanced Tracing

Depending on the complexity of your LLM application, you can also:

- [Track user sessions][13] by specifying a `session_id`.
- [Persist a span between contexts or scopes][14] by manually starting and stopping it.
- [Track multiple LLM applications][15] when starting a new trace, which can be useful for differentiating between services or running multiple experiments.
- [Submit custom evaluations][16] such as feedback from the users of your LLM application (e.g. rating from 1 to 5) via the [SDK][1] or the [API][2]. 


[1]: /tracing/llm_observability/sdk
[2]: /tracing/llm_observability/api
[3]: /tracing/llm_observability/tracing_concepts
[4]: /tracing/llm_observability/auto_instrumentation
[5]: /tracing/llm_observability/sdk/#installation
[6]: /tracing/llm_observability/sdk/#command-line-setup
[7]: /tracing/llm_observability/sdk/#in-code-setup
[8]: /tracing/llm_observability/quickstart/
[9]: /tracing/llm_observability/sdk/#tracing-spans
[10]: https://app.datadoghq.com/llm/traces
[11]: https://app.datadoghq.com/dash/integration/llm_analytics
[12]: /tracing/llm_observability/sdk/#tracing-spans-using-inline-methods
[13]: /tracing/llm_observability/sdk/#annotating-a-span
[14]: /tracing/llm_observability/sdk/#tracking-user-sessions
[15]: /tracing/llm_observability/sdk/#persisting-a-span-across-contexts
[16]: /tracing/llm_observability/sdk/#tracing-multiple-applications
[17]: /tracing/llm_observability/submit_evaluations