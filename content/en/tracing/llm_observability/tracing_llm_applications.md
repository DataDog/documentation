---
title: Tracing LLM Applications
kind: guide
---
<div class="alert alert-info">LLM Observability is in public beta.</a></div>

## Overview

Your application can submit data to LLM Observability in two ways: with Datadog's Python SDK, or with the LLM Observability API.

Each request fulfilled by your application is represented as a trace on the [LLM Observability traces list page][3] in Datadog:

{{< img src="tracing/llm_observability/llm-observability-overview.png" alt="An LLM Observability trace displaying each span of a request" style="width:90%;" >}}

A given trace contains spans representing each choice made by an agent or each step of a workflow. A *span* represents some unit of work that your application is performing. Spans have a start time, duration, name, tags, and attributes.

Multiple spans combine to form a trace, and a *root span* is the first span in a trace.

A trace can contain several kinds of spans: Agent, LLM, Workflow, and so on. The *span kind* categorizes the type of work the span is performing in an LLM application. Different span kinds have different parent-child relationships, and only some kinds can be the root span of a trace. For details, see [Span Kinds].

## Instrument an LLM application

<div class="alert alert-info">This guide uses the Python SDK. If your application is not written in Python, you can complete the steps below with API requests instead of SDK function calls.</a></div>

To trace a given LLM application:

1. [Install the Python SDK](#install-the-python-sdk)
1. [Start your application with the required env variables][5], including your Datadog API key. If you don't have an API key, you can [create one in Datadog][3].
1. In your code, [use the SDK to create spans](#create-spans) representing your application's tasks, as described below.
1. Explore the resulting traces on the [traces list page][2].

Optionally, you can also:

- Associate multiple interactions with one user by specifying a `session_id`. See [Tracking user sessions][6] in the SDK documentation.
- [Annotate a span][7] with input data, output data, metadata (such as max tokens), and key-value tags (such as version).
- [Persist a span between contexts or scopes][8] by manually starting and stopping it.
- [Override the name of the LLM application with a different name][9] when starting a root span, which can be useful for differentiating between services or running an experiment.

### Create spans

<div class="alert alert-info">The SDK creates some spans are automatically, depending on the span kind and on the LLM provider. For details, see the <a href="/tracing/llm_observability/span_kinds/">span documentation</a>.</div>

A *span* represents some unit of work that your application is performing. One or more spans combine to form a *trace* that can be queried in Datadog. See the [span documentation][4] for details on the available span kinds, span attributes, and more.

To create a span, use the SDK's `LLMObs.<SPAN_KIND>()` as a context manager, replacing `<SPAN_KIND>` with the desired [span kind]. The example below creates a workflow span:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
	with LLMObs.workflow(name="process_message") as workflow_span:
		... # user application logic
	return 
{{< /code-block >}}

For additional examples and detailed usage, see the [Quickstart][10] and the [SDK documentation for tracing spans][11].

[1]: /tracing/llm_observability/sdk/#installation
[2]: /tracing/llm_observability/exploring_llm_traces
[3]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: /tracing/llm_observability/span_kinds
[5]: /tracing/llm_observability/sdk/#running-an-llm-application
[6]: /tracing/llm_observability/sdk/#tracking-user-sessions
[7]: /tracing/llm_observability/sdk/#annotating-a-span
[8]: /tracing/llm_observability/sdk/#persisting-a-span-across-contexts
[9]: /tracing/llm_observability/sdk/#tracing-multiple-applications
[10]: /tracing/llm_observability/quickstart/
[11]: /tracing/llm_observability/sdk/#tracing-spans
