---
title: Tracing LLM Applications
kind: guide
---

<div class="alert alert-info">If your application is not written in Python, you can still complete the steps below by making API requests instead of calling SDK functions.</a></div>

## Overview

This guide describes the steps for instrumenting LLM applications. For a higher-level product overview, see [LLM Observability][1].

To trace a given LLM application:

1. [Install the Python SDK](#install-the-python-sdk)
1. [Start your application with the required env variables](#pass-the-required-environment-variables)
1. In your code, [use the SDK to create spans](#create-spans) representing your application's tasks
1. Explore the resulting traces on the [traces list page][2].

Optionally, you can also:

- [Track a user session] by specifying a `session_id` to associate with traces representing your application's interactions with that user
- [Annotate a span] with input data, output data, metadata (such as max tokens), and key-value tags (such as version).
- [Persist a span between contexts or scopes] by manually starting and stopping it

## Install the Python SDK

Install the latest `ddtrace` package hash:

{{< code-block lang="shell">}}
pip install git+https://github.com/DataDog/dd-trace-py.git@main
{{< /code-block >}}

## Pass the required environment variables

In your application startup command, specify the [environment variables required by the SDK]. If you don't have a Datadog API key, you can [create one in Datadog][3].

## Create spans

<div class="alert alert-info">The SDK creates some spans are automatically, depending on the span kind and on the LLM provider. For details, see the [span documentation].</div>

A *span* represents some unit of work that your application is performing. One or more spans combine to form a *trace* that can be queried in Datadog. See the [span documentation][4] for details on the available span kinds, span attributes, and more.

To create a span, use the SDK's `LLMObs.<SPAN_KIND>()` as a context manager, replacing `<SPAN_KIND>` with the desired [span kind]. The example below creates a workflow span:

{{< code-block lang="Python" filename="block.java" >}}
from ddtrace.llmobs import LLMObs

def process_message():
	with LLMObs.workflow(name="process_message") as workflow_span:
		... # user application logic
	return 
{{< /code-block >}}

For additional examples and detailed usage, see the [SDK Quickstart] and [SDK Usage] documentation.

[2]: /tracing/llm_observability/exploring_llm_traces
[3]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: /tracing/llm_observability/spans





