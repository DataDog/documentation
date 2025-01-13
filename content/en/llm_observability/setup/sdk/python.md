---
title: LLM Observability Python SDK Reference
code_lang: python
type: multi-code-lang
code_lang_weight: 20
aliases:
    - /tracing/llm_observability/sdk/python
    - /llm_observability/sdk/python
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

The LLM Observability SDK for Python enhances the observability of your Python-based LLM applications. The SDK supports Python versions 3.7 and newer. For information about LLM Observability's integration support, see [Auto Instrumentation][13].

You can install and configure tracing of various operations such as workflows, tasks, and API calls with function decorators or context managers. You can also annotate these traces with metadata for deeper insights into the performance and behavior of your applications, supporting multiple LLM services or models from the same environment.

For usage examples you can run from a Jupyter notebook, see the [LLM Observability Jupyter Notebooks repository][10].

## Setup

### Prerequisites

1. The latest `ddtrace` package must be installed:

{{< code-block lang="shell">}}
pip install ddtrace
{{< /code-block >}}

2. LLM Observability requires a Datadog API key (see [the instructions for creating an API key][7]).

### Command-line setup

Enable LLM Observability by running your application using the `ddtrace-run` command and specifying the required environment variables.

**Note**: `ddtrace-run` automatically turns on all LLM Observability integrations.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

`DD_SITE`
: required - _string_
<br />The Datadog site to submit your LLM data. Your site is {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: required - _integer or string_
<br />Toggle to enable submitting data to LLM Observability. Should be set to `1` or `true`.

`DD_LLMOBS_ML_APP`
: required - _string_
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given root span, see [Tracing multiple applications](#tracing-multiple-applications).

`DD_LLMOBS_AGENTLESS_ENABLED`
: optional - _integer or string_ - **default**: `false`
<br />Only required if you are not using the Datadog Agent, in which case this should be set to `1` or `true`.

`DD_API_KEY`
: optional - _string_
<br />Your Datadog API key. Only required if you are not using the Datadog Agent.

### In-code setup

Enable LLM Observability programatically through the `LLMObs.enable()` function instead of running with the `ddtrace-run` command. **Note**: Do not use this setup method with the `ddtrace-run` command.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  site="<YOUR_DATADOG_SITE>",
  agentless_enabled=True,
)
{{< /code-block >}}

`ml_app`
: optional - _string_
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given trace, see [Tracing multiple applications](#tracing-multiple-applications). If not provided, this defaults to the value of `DD_LLMOBS_ML_APP`.

`integrations_enabled` - **default**: `true`
: optional - _boolean_
<br />A flag to enable automatically tracing LLM calls for Datadog's supported [LLM integrations][13]. If not provided, all supported LLM integrations are enabled by default. To avoid using the LLM integrations, set this value to `false`.

`agentless_enabled`
: optional - _boolean_ - **default**: `false`
<br />Only required if you are not using the Datadog Agent, in which case this should be set to `True`. This configures the `ddtrace` library to not send any data that requires the Datadog Agent. If not provided, this defaults to the value of `DD_LLMOBS_AGENTLESS_ENABLED`.

`site`
: optional - _string_
<br />The Datadog site to submit your LLM data. Your site is {{< region-param key="dd_site" code="true" >}}. If not provided, this defaults to the value of `DD_SITE`.

`api_key`
: optional - _string_
<br />Your Datadog API key. Only required if you are not using the Datadog Agent. If not provided, this defaults to the value of `DD_API_KEY`.

`env`
: optional - _string_
<br />The name of your application's environment (examples: `prod`, `pre-prod`, `staging`). If not provided, this defaults to the value of `DD_ENV`.

`service`
: optional - _string_
<br />The name of the service used for your application. If not provided, this defaults to the value of `DD_SERVICE`.

### AWS Lambda setup

Enable LLM Observability by specifying the required environment variables in your [command line setup](#command-line-setup) and following the setup instructions for the [Datadog-Python and Datadog-Extension][14] AWS Lambda layers.

**Note**: Using the `Datadog-Python` and `Datadog-Extension` layers automatically turns on all LLM Observability integrations, and force flushes spans at the end of the Lambda function.

#### Application naming guidelines

Your application name (the value of `DD_LLMOBS_ML_APP`) must be a lowercase Unicode string. It may contain the characters listed below:

- Alphanumerics
- Underscores
- Minuses
- Colons
- Periods
- Slashes

The name can be up to 193 characters long and may not contain contiguous or trailing underscores.

## Tracing spans

To trace a span, use `ddtrace.llmobs.decorators.<SPAN_KIND>()` as a function decorator (for example, `llmobs.decorators.task()` for a task span) for the function you'd like to trace. For a list of available span kinds, see the [Span Kinds documentation][8]. For more granular tracing of operations within functions, see [Tracing spans using inline methods](#tracing-spans-using-inline-methods).

### LLM span

**Note**: If you are using any LLM providers or frameworks that are supported by [Datadog's LLM integrations][13], you do not need to manually start a LLM span to trace these operations.

To trace an LLM span, use the function decorator `ddtrace.llmobs.decorators.llm()`.

#### Arguments

`model_name`
: required - _string_
<br/>The name of the invoked LLM.

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`model_provider`
: optional - _string_ - **default**: `"custom"`

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    return completion
{{< /code-block >}}

### Workflow span

To trace a workflow span, use the function decorator `ddtrace.llmobs.decorators.workflow()`.

#### Arguments

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

### Agent span

To trace an agent span, use the function decorator `ddtrace.llmobs.decorators.agent()`.

#### Arguments

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import agent

@agent
def react_agent():
    ... # user application logic
    return
{{< /code-block >}}

### Tool span

To trace a tool span, use the function decorator `ddtrace.llmobs.decorators.tool()`.

#### Arguments

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import tool

@tool
def call_weather_api():
    ... # user application logic
    return
{{< /code-block >}}

### Task span

To trace a task span, use the function decorator `LLMObs.task()`.

#### Arguments

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task

@task
def sanitize_input():
    ... # user application logic
    return
{{< /code-block >}}

### Embedding span

To trace an embedding span, use the function decorator `LLMObs.embedding()`.

**Note**: Annotating an embedding span's input requires different formatting than other span types. See [Annotating a span](#annotating-a-span) for more details on how to specify embedding inputs.

#### Arguments

`model_name`
: required - _string_
<br/>The name of the invoked LLM.

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` is set to the name of the traced function.

`model_provider`
: optional - _string_ - **default**: `"custom"`

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import embedding

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    return
{{< /code-block >}}

### Retrieval span

To trace a retrieval span, use the function decorator `ddtrace.llmobs.decorators.retrieval()`.

**Note**: Annotating a retrieval span's output requires different formatting than other span types. See [Annotating a span](#annotating-a-span) for more details on how to specify retrieval outputs.

#### Arguments

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import retrieval

@retrieval
def get_relevant_docs(question):
    context_documents = ... # user application logic
    LLMObs.annotate(
        input_data=question,
        output_data = [
            {"id": doc.id, "score": doc.score, "text": doc.text, "name": doc.name} for doc in context_documents
        ]
    )
    return
{{< /code-block >}}

## Tracking user sessions

Session tracking allows you to associate multiple interactions with a given user. When starting a root span for a new trace or span in a new process, specify the `session_id` argument with the string ID of the underlying user session, which is submitted as a tag on the span. Optionally, you can also specify the `user_handle`, `user_name`, and `user_id` tags.

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow(session_id="<SESSION_ID>")
def process_user_message():
    LLMObs.annotate(
        ...
        tags = {"user_handle": "poodle@dog.com", "user_id": "1234", "user_name": "poodle"}
    )
    return
{{< /code-block >}}

### Session Tracking Tags

| Tag | Description |
|---|---|
| `session_id` | The ID representing a single user session, for example, a chat session. |
| `user_handle` | The handle for the user of the chat session. |
| `user_name` | The name for the user of the chat session. |
| `user_id` | The ID for the user of the chat session. |

## Annotating a span

The SDK provides the method `LLMObs.annotate()` to annotate spans with inputs, outputs, and metadata.

### Arguments

The `LLMObs.annotate()` method accepts the following arguments:

`span`
: optional - _Span_ - **default**: the current active span
<br />The span to annotate. If `span` is not provided (as when using function decorators), the SDK annotates the current active span.

`input_data`
: optional - _JSON serializable type or list of dictionaries_
<br />Either a JSON serializable type (for non-LLM spans) or a list of dictionaries with this format: `{"role": "...", "content": "..."}` (for LLM spans).  **Note**: Embedding spans are a special case and require a string or a dictionary (or a list of dictionaries) with this format: `{"text": "..."}`.

`output_data`
: optional - _JSON serializable type or list of dictionaries_
<br />Either a JSON serializable type (for non-LLM spans) or a list of dictionaries with this format: `{"role": "...", "content": "..."}` (for LLM spans). **Note**: Retrieval spans are a special case and require a string or a dictionary (or a list of dictionaries) with this format: `{"text": "...", "name": "...", "score": float, "id": "..."}`.

`metadata`
: optional - _dictionary_
<br />A dictionary of JSON serializable key-value pairs that users can add as metadata information relevant to the input or output operation described by the span (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: optional - _dictionary_
<br />A dictionary of JSON serializable keys and numeric values that users can add as metrics relevant to the operation described by the span (`input_tokens`, `output_tokens`, `total_tokens`, `time_to_first_token`, etc.). The unit for `time_to_first_token` is in seconds, similar to the `duration` metric which is emitted by default.

`tags`
: optional - _dictionary_
<br />A dictionary of JSON serializable key-value pairs that users can add as tags on the span. Example keys: `session`, `env`, `system`, and `version`. For more information about tags, see [Getting Started with Tags][9].

### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import embedding, llm, retrieval, workflow

@llm(model_name="model_name", model_provider="model_provider")
def llm_call(prompt):
    resp = ... # llm call here
    LLMObs.annotate(
        span=None,
        input_data=[{"role": "user", "content": "Hello world!"}],
        output_data=[{"role": "assistant", "content": "How can I help?"}],
        metadata={"temperature": 0, "max_tokens": 200},
        metrics={"input_tokens": 4, "output_tokens": 6, "total_tokens": 10},
        tags={"host": "host_name"},
    )
    return resp

@workflow
def extract_data(document):
    resp = llm_call(document)
    LLMObs.annotate(
        input_data=document,
        output_data=resp,
        tags={"host": "host_name"},
    )
    return resp

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    LLMObs.annotate(
        span=None,
        input_data={"text": "Hello world!"},
        output_data=[0.0023064255, -0.009327292, ...],
        metrics={"input_tokens": 4},
        tags={"host": "host_name"},
    )
    return

@retrieval(name="get_relevant_docs")
def similarity_search():
    ... # user application logic
    LLMObs.annotate(
        span=None,
        input_data="Hello world!",
        output_data=[{"text": "Hello world is ...", "name": "Hello, World! program", "id": "document_id", "score": 0.9893}],
        tags={"host": "host_name"},
    )
    return

{{< /code-block >}}

### Annotating auto-instrumented spans

The SDK's `LLMObs.annotate_context()` method returns a context manager that can be used to modify all auto-instrumented spans started while the annotation context is active.

#### Arguments

The `LLMObs.annotation_context()` method accepts the following arguments:

`name` 
: optional - _str_
<br />Name that overrides the span name for any auto-instrumented spans that are started within the annotation context.

`prompt` 
: optional - _dictionary_ 
<br />A dictionary that represents the prompt used for an LLM call in the following format:<br />`{"template": "...", "id": "...", "version": "...", "variables": {"variable_1": "...", ...}}`.<br />You can also import the `Prompt` object from `ddtrace.utils` and pass it in as the `prompt` argument. **Note**: This argument only applies to LLM spans.

`tags`
: optional - _dictionary_
<br />A dictionary of JSON serializable key-value pairs that users can add as tags on the span. Example keys: `session`, `env`, `system`, and `version`. For more information about tags, see [Getting Started with Tags][9].

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def rag_workflow(user_question):
    context_str = retrieve_documents(user_question).join(" ")

    with LLMObs.annotation_context(
        prompt = Prompt(
            variables = {
                "question": user_question,
                "context": context_str,
            },
            template = "Please answer the..."
        ),
        tags = {
            "retrieval_strategy": "semantic_similarity"
        },
        name = "augmented_generation"
    ):
        completion = openai_client.chat.completions.create(...)
    return completion.choices[0].message.content

{{< /code-block >}}


## Evaluations

The LLM Observability SDK provides the method `LLMObs.submit_evaluation_for()` and s `LLMObs.export_span()` to help your traced LLM application submit evaluations to LLM Observability.

Evaluations must be joined to a unique span. You can identify the target span using either of these two methods:
1. Tag based joining - Join an evaluation using a custom tag key-value pair that uniquely identifies a single span. The evaluation will fail to join if the tag key-value pair matches multiple spans or no spans.
2. Direct span reference - join an evaluation using the span's unique trace ID and span ID combination.

### Submit evaluations

`LLMObs.submit_evaluation_for()` can be used to submit your custom evaluation associated with a given span.

<div class="alert alert-info"><code>`LLMObs.submit_evaluation`</code> is deprecated and will be removed in ddtrace 3.0.0. As an alternative to <code>`LLMObs.submit_evaluation`</code>, use <code>`LLMObs.submit_evaluation_for`</code>.</div>

#### Arguments

The `LLMObs.submit_evaluation_for()` method accepts the following arguments:

`label`
: required - _string_
<br />The name of the evaluation.

`metric_type`
: required - _string_
<br />The type of the evaluation. Must be `categorical` or `score`.

`value`
: required - _string or numeric type_
<br />The value of the evaluation. Must be a string (`metric_type==categorical`) or integer/float (`metric_type==score`).

`span`
: required - _dictionary_
<br />A dictionary that uniquely identifies the span associated with this evaluation. Must contain span_id (string) and trace_id (string). Use [LLMObs.export_span()](#exporting-a-span) to generate this dictionary.

`span_with_tag_value`
: required - _dictionary_
<br />A dictionary that uniquely identifies the span associated with this evaluation. Must contain tag_key (string) and tag_value (string).

`ml_app`
: required - _string_
<br />The name of the ML application.

`timestamp_ms`
: optional - _integer_
<br />The unix timestamp in milliseconds when the evaluation metric result was generated. If not provided, the current time will be used.

`tags`
: optional - _dictionary_
<br />A dictionary of string key-value pairs that users can add as tags regarding the evaluation. For more information about tags, see [Getting Started with Tags][9].

### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM

    # joining an evaluation to a span via a tag key-value pair
    msg_id = get_msg_id()
    LLMObs.annotate(
        tags = {'msg_id': msg_id}
    )

    LLMObs.submit_evaluation(
        span_with_tag_value = {
            "tag": "msg_id",
            "value": msg_id
        },
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
    )

    # joining an evaluation to a span via span ID and trace ID
    span_context = LLMObs.export_span(span=None)
    LLMObs.submit_evaluation(
        span = span_context,
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
    )
    return completion
{{< /code-block >}}

### Exporting a span

`LLMObs.export_span()` can be used to extract the span context from a span. You'll need to use this method to associate your evaluation with the corresponding span.

#### Arguments

The `LLMObs.export_span()` method accepts the following argument:

`span`
: optional - _Span_
<br />The span to extract the span context (span and trace IDs) from. If not provided (as when using function decorators), the SDK exports the current active span.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    span_context = LLMObs.export_span(span=None)
    return completion
{{< /code-block >}}

## Advanced tracing

### Tracing spans using inline methods

For each span kind, the `ddtrace.llmobs.LLMObs` class provides a corresponding inline method to automatically trace the operation a given code block entails. These methods have the same argument signature as their function decorator counterparts, with the addition that `name` defaults to the span kind (`llm`, `workflow`, etc.) if not provided. These methods can be used as context managers to automatically finish the span after the enclosed code block is completed.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

### Persisting a span across contexts

To manually start and stop a span across different contexts or scopes:

1. Start a span manually using the same methods (for example, the `LLMObs.workflow` method for a workflow span), but as a plain function call rather than as a context manager.
2. Pass the span object as an argument to other functions.
3. Stop the span manually with the `span.finish()` method. **Note**: the span must be manually finished, otherwise it is not submitted.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    workflow_span = LLMObs.workflow(name="process_message")
    ... # user application logic
    separate_task(workflow_span)
    return

def separate_task(workflow_span):
    ... # user application logic
    workflow_span.finish()
    return
{{< /code-block >}}

#### Force flushing in serverless environments

`LLMObs.flush()` is a blocking function that submits all buffered LLM Observability data to the Datadog backend. This can be useful in serverless environments to prevent an application from exiting until all LLM Observability traces are submitted.

### Tracing multiple applications

The SDK supports tracing multiple LLM applications from the same service.

You can configure an environment variable `DD_LLMOBS_ML_APP` to the name of your LLM application, which all generated spans are grouped into by default.

To override this configuration and use a different LLM application name for a given root span, pass the `ml_app` argument with the string name of the underlying LLM application when starting a root span for a new trace or a span in a new process.

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

### Distributed tracing

The SDK supports tracing across distributed services or hosts. Distributed tracing works by propagating span information across web requests.

The `ddtrace` library provides some out-of-the-box integrations that support distributed tracing for popular [web framework][11] and [HTTP][12] libraries. If your application makes requests using these supported libraries, you can enable distributed tracing by running:
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

If your application does not use any of these supported libraries, you can enable distributed tracing by manually propagating span information to and from HTTP headers. The SDK provides the helper methods `LLMObs.inject_distributed_headers()` and `LLMObs.activate_distributed_headers()` to inject and activate tracing contexts in request headers.

#### Injecting distributed headers

The `LLMObs.inject_distributed_headers()` method takes a span and injects its context into the HTTP headers to be included in the request. This method accepts the following arguments:

`request_headers`
: required - _dictionary_
<br />The HTTP headers to extend with tracing context attributes.

`span`
: optional - _Span_ - **default**: `The current active span.`
<br />The span to inject its context into the provided request headers. Any spans (including those with function decorators), this defaults to the current active span.

#### Activating distributed headers

The `LLMObs.activate_distributed_headers()` method takes HTTP headers and extracts tracing context attributes to activate in the new service.

**Note**: You must call `LLMObs.activate_distributed_headers()` before starting any spans in your downstream service. Spans started prior (including function decorator spans) do not get captured in the distributed trace.

This method accepts the following argument:

`request_headers`
: required - _dictionary_
<br />The HTTP headers to extract tracing context attributes.


#### Example

{{< code-block lang="python" filename="client.py" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def client_send_request():
    request_headers = {}
    request_headers = LLMObs.inject_distributed_headers(request_headers)
    send_request("<method>", request_headers)  # arbitrary HTTP call
{{< /code-block >}}

{{< code-block lang="python" filename="server.py" >}}
from ddtrace.llmobs import LLMObs

def server_process_request(request):
    LLMObs.activate_distributed_headers(request.headers)
    with LLMObs.task(name="process_request") as span:
        pass  # arbitrary server work
{{< /code-block >}}


[1]: https://github.com/openai/openai-python
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[4]: https://github.com/langchain-ai/langchain
[7]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /llm_observability/terms/
[9]: /getting_started/tagging/
[10]: https://github.com/DataDog/llm-observability
[11]: /tracing/trace_collection/compatibility/python/#integrations
[12]: /tracing/trace_collection/compatibility/python/#library-compatibility
[13]: /llm_observability/setup/auto_instrumentation/
[14]: /serverless/aws_lambda/installation/python/?tab=custom#installation
