---
title: LLM Observability SDK for Python
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
LLM Observability is not available in the US1-FED site.
</div>
{{% /site-region %}}

<div class="alert alert-info">LLM Observability is in public beta.</a></div>

## Overview

The LLM Observability SDK for Python enhances the observability of your Python-based LLM applications. The SDK supports Python versions 3.7 and newer. For information about LLM Observability's integration support, see [LLM integrations](#llm-integrations).

You can install and configure tracing of various operations such as workflows, tasks, and API calls with simple context managers or function decorators. You can also annotate these traces with metadata for deeper insights into the performance and behavior of your applications, supporting multiple LLM services or models from the same environment.

## Setup

### Prerequisites

1. The latest `ddtrace` package must be installed:

{{< code-block lang="shell">}}
pip install git+https://github.com/DataDog/dd-trace-py.git@main
{{< /code-block >}}

2. LLM Observability requires a Datadog API key (see [the instructions for creating an API key][7]).

#### Command-line setup

Enable LLM Observability by running your application using the `ddtrace-run` command and specifying the required environment variables.

**Note**: `ddtrace-run` automatically turns on all LLM Observability integrations.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_APP_NAME=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

`DD_API_KEY`
: required - _string_
<br />Your Datadog API key.

`DD_SITE`
: required - _string_ 
<br />The Datadog site to submit your LLM data. Your site is {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: required - _integer or string_ 
<br />Toggle to enable submitting data to LLM Observability. Should be set to `1` or `true`.

`DD_LLMOBS_APP_NAME`
: required - _string_ 
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given root span, see [Tracing multiple applications](#tracing-multiple-applications).

`DD_LLMOBS_NO_APM`
: optional - _integer or string_ - **default**: `false`
<br />Only required if you are not a Datadog APM customer, in which case this should be set to `1` or `true`.

#### In-code setup

Enable LLM Observability programatically through the `LLMOBs.enable()` function instead of running with the `ddtrace-run` command. **Note**: This setup method will not work if used with `ddtrace-run`.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  dd_api_key="<YOUR_DATADOG_API_KEY>",
  dd_site=“<YOUR_DATADOG_SITE>”,
  dd_llmobs_no_apm=True,
  integrations=["langchain", "openai"],
)
{{< /code-block >}}

`ml_app`
: optional - _string_
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given trace, see [Tracing multiple applications](#tracing-multiple-applications). If not provided, this will default to the value of `DD_LLMOBS_ML_APP`.

`integrations`
: optional - _list_ 
<br />A list of integration names to enable automatically tracing LLM calls for (e.g. `["openai", "langchain"]`). See [LLM integrations](#llm-integrations) for more information about Datadog's supported LLM integrations. **Note**: if not provided, all supported LLM integrations will be enabled by default. To disable all integrations, pass in an empty list `[]`.

`dd_llmobs_no_apm`
: optional - _boolean_ 
<br />Only required if you are not a Datadog APM customer, in which case this should be set to `True`. This configures the `ddtrace` library to not send any data that requires Datadog APM. If not provided, this will default to the value of `DD_LLMOBS_NO_APM`.

`dd_site`
: optional - _string_ 
<br />The Datadog site to submit your LLM data. Your site is {{< region-param key="dd_site" code="true" >}}. If not provided, this will default to the value of `DD_SITE`.

`dd_api_key`
: optional - _string_ 
<br />Your Datadog API key. If not provided, this will default to the value of `DD_API_KEY`.

`dd_env`
: optional - _string_
<br />The name of your application's environment (e.g. `prod`, `pre-prod`, `staging`). If not provided, this will default to the value of `DD_ENV`.

`dd_service`
: optional - _string_
<br />The name of the service used for your application. If not provided, this will default to the value of `DD_SERVICE`.

#### Application naming guidelines

Your application name (the value of `DD_LLMOBS_APP_NAME`) must start with a letter. It may contain the characters listed below:

- Alphanumerics
- Underscores
- Minuses
- Colons
- Periods
- Slashes

The name can be up to 200 characters long and contain Unicode letters (which includes most character sets, including languages such as Japanese).

## Tracing spans

To trace a span, use `LLMObs.<SPAN_KIND>()` as a context manager (for example, `LLMObs.task()` for a task span). For a list of available span kinds, see the [Span Kinds documentation][8].

### Agent span

To trace an agent span, use `LLMObs.agent()` as a context manager.

#### Arguments

`name`
: optional - _string_ - **default**: `"agent"`
<br/>The name of the operation.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def run_agent():
    with LLMObs.agent(name="react_agent") as agent_span:
        ... # user application logic
    return 
{{< /code-block >}}

### Workflow span

To trace a workflow span, use `LLMObs.workflow()` as a context manager.

#### Arguments

`name`
: optional - _string_ - **default**: `"workflow"`
<br/>The name of the operation.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message") as workflow_span:
        ... # user application logic
    return 
{{< /code-block >}}

### LLM span

**Note**: If you are using one of the following LLM providers, you do not need to manually start a LLM span to trace these operations, as Datadog's existing integrations automatically trace and annotate the LLM calls:

- OpenAI (using the [OpenAI Python SDK][1])
- AWS Bedrock (using [Boto3][2]/[Botocore][3])
- LangChain LLM/Chat Models/Chains (using [LangChain][4])

For more information about Datadog's LLM integrations, see [LLM integrations](#llm-integrations).

To trace an LLM span, use `LLMObs.llm()` as a context manager.

#### Arguments

`model_name`
: required - _string_
<br/>The name of the invoked LLM.

`name`
: optional - _string_ - **default**: `"llm"`
<br/>The name of the operation.

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
from ddtrace.llmobs import LLMObs

def llm_call():
    with LLMObs.llm(name="invoke_llm", model_name="claude", model_provider="anthropic") as llm_span:
        completion = ... # user application logic to invoke LLM
    return completion
{{< /code-block >}}

### Tool span

To trace a tool span, use `LLMObs.tool()` as a context manager.

#### Arguments

`name`
: optional - _string_ - **default**: `"tool"`
<br/>The name of the operation.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def call_weather_api():
    with LLMObs.tool(name="get_current_weather") as tool_span:
        ... # user application logic
    return 
{{< /code-block >}}

### Embedding span

To trace an embedding span, use `LLMObs.embedding()` as a context manager.

**Note**: Annotating an embedding span's input requires different formatting than other span types. See [Annotating a span](#annotating-a-span) for more details on how to specify embedding inputs.

#### Arguments

`model_name`
: required - _string_
<br/>The name of the invoked LLM.

`name`
: optional - _string_ - **default**: `"embedding"`
<br/>The name of the operation.

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
from ddtrace.llmobs import LLMObs

def perform_embedding():
    with LLMObs.embedding(model_name="text-embedding-3", name="openai_embedding") as embedding_span:
        ... # user application logic
    return 
{{< /code-block >}}

### Retrieval span

To trace a retrieval span, use `LLMObs.retrieval()` as a context manager.

**Note**: Annotating a retrieval span's output requires different formatting than other span types. See [Annotating a span](#annotating-a-span) for more details on how to specify retrieval outputs.

#### Arguments

`name`
: optional - _string_ - **default**: `"retrieval"`
<br/>The name of the operation.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def similarity_search():
    with LLMObs.retrieval(name="get_relevant_docs") as retrieval_span:
        ... # user application logic
    return 
{{< /code-block >}}

### Task span

To trace a task span, use `LLMObs.task()` as a context manager.

#### Arguments

`name`
: optional - _string_ - **default**: `"task"`
<br/>The name of the operation.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def sanitize_input():
    with LLMObs.task(name="sanitize_input") as task_span:
        ... # user application logic
    return 
{{< /code-block >}}

## Tracking user sessions

Session tracking allows you to associate multiple interactions with a given user. When starting a root span for a new trace or span in a new process, specify the `session_id` argument with the string ID of the underlying user session:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>") as workflow_span:
        ... # user application logic
    return 
{{< /code-block >}}

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
<br />A dictionary of JSON serializable key-value pairs that users can add as metadata information relevant to the input or output operation described by the span (`model_temperature`, `max_tokens`, `top_k`, and so on).

`metrics`
: optional - _dictionary_
<br />A dictionary of JSON serializable keys and numeric values that users can add as metrics relevant to the operation described by the span (`input_tokens`, `output_tokens`, `total_tokens`, and so on).

`tags`
: optional - _dictionary_
<br />A dictionary of JSON serializable key-value pairs that users can add as tags regarding the span's context (`session`, `environment`, `system`, `versioning`, and so on). For more information about tags, see [Getting Started with Tags][9].

### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

def llm_call(prompt):
    with LLMObs.llm(name="llm_call", model="model_name", model_provider="model_provider") as llm_span:
        resp = ... # llm call here
        LLMObs.annotate(
            span=llm_span,
            input_data=[{"role": "user", "content": "Hello world!"}],
            output_data=[{"role": "assistant", "content": "How can I help?"}],
            metadata={"temperature": 0, "max_tokens": 200},
            metrics={"input_tokens": 4, "output_tokens": 6, "total_tokens": 10},
            tags={"host": "host_name"},
        )
    return resp

@workflow(name="process_message")
def process_message(prompt):
    resp = llm_call_inline(prompt)
    LLMObs.annotate(
        span=None,
        input_data="prompt",
        output_data="output",
        tags={"host": "host_name"},
    )
    return resp

def perform_embedding():
    with LLMObs.embedding(model_name="text-embedding-3", name="openai_embedding") as embedding_span:
        ... # user application logic
        LLMObs.annotate(
            span=embedding_span,
            input_data={"text": "Hello world!"},
            output_data=[0.0023064255, -0.009327292, ...],
            metrics={"input_tokens": 4},
            tags={"host": "host_name"},
        )
    return

def similarity_search():
    with LLMObs.retrieval(name="get_relevant_docs") as retrieval_span:
        ... # user application logic
        LLMObs.annotate(
            span=retrieval_span,
            input_data="Hello world!",
            output_data=[{"text": "Hello world is ...", "name": "Hello, World! program", "id": "document_id", "score": 0.9893}],
            tags={"host": "host_name"},
        )
    return

{{< /code-block >}}

## Submitting evaluation metrics

To submit evaluation metrics for a span to Datadog:

1. Extract the span context from the given span by using `LLMObs.export_span(span)`. If `span` is not provided (as when using function decorators), the SDK will export the current active span.
2. Use `LLMObs.submit_evaluation()` with the extracted span context and evaluation metric information.

### Arguments

The `LLMObs.submit_evaluation()` method accepts the following arguments:

`span_context`
: required - _dictionary_
<br />The span context to correlate the evaluation metric to.

`label`
: required - _string_
<br />The name of the evaluation metric.

`metric_type`
: required - _string_
<br />The type of the evaluation metric. Must be one of "categorical", "numerical", and "score".

`value`
: required - _string or numeric type_
<br />The value of the evaluation metric. Must be a string (for categorical `metric_type`) or integer/float (for numerical/score `metric_type`).

## LLM integrations

The Python SDK includes out-of-the-box integrations to automatically trace and annotate the LLM calls for:

- `openai` - OpenAI (using the [OpenAI Python SDK][1]): supports all versions
- `bedrock` - AWS Bedrock Runtime (using [Boto3][2]/[Botocore][3]): supports all versions
- `langchain` - LangChain LLM/Chat Models/Chains (using [LangChain][4]): supports all versions

This means that you do not need to manually instrument your LLM calls with `LLMObs.llm()` as the SDK will capture them automatically.

## Advanced tracing

### Tracing spans using function decorators

For each span kind, the `ddtrace.llmobs.decorators` module provides a corresponding function decorator to automatically trace the operation a given function entails. These function decorators have the same argument signature as their inline counterparts, with the addition that `name` will default to the name of the given function.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

### Persisting a span across contexts

To manually start and stop a span across different contexts or scopes:

1. Start a span manually using the same methods (for example, the `LLMObs.workflow` method for a workflow span), but inline rather than as a context manager.
2. Pass the span object as an argument to other functions.
3. Stop the span manually with the `span.finish()` method.

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

### Flushing in serverless environments

`LLMObs.flush()` is a blocking function that submits all buffered LLM Observability data to the Datadog backend. This can be useful in serverless environments to prevent an application from exiting until all LLM Observability traces are submitted.

### Tracing multiple applications

The SDK supports tracking multiple LLM applications from the same service.

You can configure an environment variable `DD_LLMOBS_APP_NAME` to the name of your LLM application, which all generated spans are grouped into by default.

To override this configuration and use a different LLM application name for a given root span, pass the `ml_app` argument with the string name of the underlying LLM application when starting a root span for a new trace or a span in a new process.

{{< code-block lang="python">}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", ml_app="<NON_DEFAULT_LLM_APP_NAME>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

[1]: https://github.com/openai/openai-python
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[4]: https://github.com/langchain-ai/langchain
[7]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /tracing/llm_observability/span_kinds/
[9]: /getting_started/tagging/