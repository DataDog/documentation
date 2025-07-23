---
title: LLM Observability Custom Instrumentation
aliases:
    - /tracing/llm_observability/trace_an_llm_application
    - /llm_observability/setup
further_reading:
    - link: 'https://www.datadoghq.com/blog/llm-observability-chain-tracing/'
      tag: 'Blog'
      text: 'Get granular LLM observability by instrumenting your LLM chains'
    - link: '/llm_observability/evaluations'
      tag: 'Guide'
      text: 'Evaluation options for LLM Observability'
---

## Overview
Datadog's LLM Observability SDK provides advanced capabilities for custom instrumentation of your LLM applications beyond auto-instrumentation. Custom instrumentation gives you granular control over tracing and enables access to additional features, including:

- Creating custom spans to track specific operations and workflows
- Nesting spans to build detailed traces showing relationships between operations
- Annotating spans with rich metadata, metrics, and tags
- Tracking user sessions and application state
- Supporting multiple LLM applications or experiments

This page explains how to use the Datadog LLM Observability SDK's custom instrumentation features to get deeper visibility into your LLM applications' behavior and performance.

## Instrument an LLM application

<div class="alert alert-info">These instructions use the <a href="/llm_observability/setup/sdk">LLM Observability SDK for Python</a>. If your application is running in a serverless environment, follow the <a href="/llm_observability/setup/sdk/#aws-lambda-setup">serverless setup instructions</a>. </br></br> If your application is not written in Python, you can complete the steps below with API requests instead of SDK function calls.</div>

To instrument an LLM application:

1. [Install the LLM Observability SDK for Python][5].
1. Configure the SDK by providing [the required environment variables][6] in your application startup command, or programmatically [in-code][7]. Ensure you have configured your configure your Datadog API key, Datadog site, and machine learning (ML) app name.

## Trace an LLM application

To trace an LLM application:

1. [Create spans](#creating-spans) in your LLM application code to represent your application's operations. For more information about spans, see [Terms and Concepts][4]. 
   
   You can [nest spans](#nesting-spans) to create more useful traces. For additional examples and detailed usage, see [Trace an LLM Application][8] and the [SDK documentation][9].

1. [Annotate your spans](#annotating-spans) with input data, output data, metadata (such as `temperature`), metrics (such as `input_tokens`), and key-value tags (such as `version:1.0.0`).
1. Optionally, add [advanced tracing features](#advanced-tracing), such as user sessions.
1. Run your LLM application. 
    - If you used the command-line setup method, the command to run your application should use `ddtrace-run`, as described in [those instructions][6].
    - If you used the in-code setup method, run your application as you normally would.

You can access the resulting traces in the **Traces** tab on the [**LLM Observability Traces** page][3] and the resulting metrics in the out-of-the-box [LLM Observability Overview dashboard][10].

### Creating spans

To create a span, the LLM Observability SDK provides two options: using a function decorator or using a context manager inline. 

Using a function decorator is the preferred method. Using a context manager is more advanced and allows more fine-grained control over tracing.

Decorators
: Use `ddtrace.llmobs.decorators.<SPAN_KIND>()` as a decorator on the function you'd like to trace, replacing `<SPAN_KIND>` with the desired [span kind][4].

Inline
: Use `ddtrace.llmobs.LLMObs.<SPAN_KIND>()` as a context manager to [trace any inline code][12], replacing `<SPAN_KIND>` with the desired [span kind][4].

The examples below create a workflow span.

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def extract_data(document):
    ... # LLM-powered workflow that extracts structure data from a document
    return
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def extract_data(document):
    with LLMObs.workflow(name="extract_data") as span:
        ... # LLM-powered workflow that extracts structure data from a document
    return
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Annotating spans

To add extra information to a span such as inputs, outputs, metadata, metrics, or tags, use the LLM Observability SDK's [`LLMObs.annotate()`][11] method.

The examples below annotate the workflow span created in the [example above](#creating-spans):

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def extract_data(document: str, generate_summary: bool):
    extracted_data = ... # user application logic
    LLMObs.annotate(
        input_data=document,
        output_data=extracted_data,
        metadata={"generate_summary": generate_summary},
        tags={"env": "dev"},
    )
    return extracted_data
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def extract_data(document: str, generate_summary: bool):
    with LLMObs.workflow(name="extract_data") as span:
        ... # user application logic
        extracted_data = ... # user application logic
        LLMObs.annotate(
            input_data=document,
            output_data=extracted_data,
            metadata={"generate_summary": generate_summary},
            tags={"env": "dev"},
        )
        return extracted_data
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Nesting spans

Starting a new span before the current span is finished automatically traces a parent-child relationship between the two spans. The parent span represents the larger operation, while the child span represents a smaller nested sub-operation within it.

The examples below create a trace with two spans.

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task, workflow

@workflow
def extract_data(document):
    preprocess_document(document)
    ... # performs data extraction on the document
    return

@task
def preprocess_document():
    ... # preprocesses a document for data extraction
    return
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def extract_data():
    with LLMObs.workflow(name="extract_data") as workflow_span:
        with LLMObs.task(name="preprocess_document") as task_span:
            ... # preprocesses a document for data extraction
        ... # performs data extraction on the document
    return
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

For more information on alternative tracing methods and tracing features, see the [SDK documentation][1].

### Advanced tracing

Depending on the complexity of your LLM application, you can also:

- [Track user sessions][12] by specifying a `session_id`.
- [Persist a span between contexts or scopes][13] by manually starting and stopping it.
- [Track multiple LLM applications][14] when starting a new trace, which can be useful for differentiating between services or running multiple experiments.
- [Submit custom evaluations][15] such as feedback from the users of your LLM application (for example, rating from 1 to 5) with the [SDK][1] or the [API][2]. 

## Permissions

By default, only users with the [Datadog Read role][16] can view LLM Observability. For more information, see the [Permissions documentation][17].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/instrumentation/sdk
[2]: /llm_observability/instrumentation/api
[3]: https://app.datadoghq.com/llm/traces
[4]: /llm_observability/terms
[5]: /llm_observability/instrumentation/sdk#installation
[6]: /llm_observability/instrumentation/sdk#command-line-setup
[7]: /llm_observability/instrumentation/sdk#in-code-setup
[8]: /llm_observability/quickstart
[9]: /llm_observability/instrumentation/sdk#tracing-spans
[10]: https://app.datadoghq.com/dash/integration/llm_analytics
[11]: /llm_observability/instrumentation/sdk#tracking-user-sessions
[12]: /llm_observability/instrumentation/sdk#tracking-user-sessions
[13]: /llm_observability/instrumentation/sdk#persisting-a-span-across-contexts
[14]: /llm_observability/instrumentation/sdk#tracing-multiple-applications
[15]: /llm_observability/evaluations/submit_evaluations
[16]: /account_management/rbac/#datadog-default-roles
[17]: /account_management/rbac/permissions/#llm-observability