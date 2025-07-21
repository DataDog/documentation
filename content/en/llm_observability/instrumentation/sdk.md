---
title: LLM Observability SDK Reference
aliases:
    - /tracing/llm_observability/sdk/python
    - /llm_observability/sdk/python
    - /llm_observability/setup/sdk/python
    - /llm_observability/setup/sdk/nodejs
    - /llm_observability/setup/sdk
---

## Overview

Datadog's LLM Observability SDK provides automatic instrumentation as well as manual APIs that give you deep and rich insights into the cost, health and quality of your LLM applications.


You can install and configure tracing of various operations such as workflows, tasks, and API calls with function decorators or context managers. You can also annotate these traces with metadata for deeper insights into the performance and behavior of your applications, supporting multiple LLM services or models from the same environment.

## Installation

## Enabling

## Configuration

## Automatic Instrumentation

## Manual Instrumentation

### Capturing LLM operations

#### Distributed workflows

#### Annotating LLM operations

#### Tagging user sessions

### Submitting evaluations

### Modifying operation input and output

### Prerequisites

{{< tabs >}}
{{% tab "Python" %}}
- The latest `ddtrace` package is installed:
   ```shell
   pip install ddtrace
   ```
- A [Datadog API key][1]

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "Node.js" %}}
- The latest `dd-trace` package is installed:
   ```shell
   npm install dd-trace
   ```
- A [Datadog API key][1]

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Command-line setup" level="h3" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
Enable LLM Observability by running your application using the `ddtrace-run` command and specifying the required environment variables.

**Note**: `ddtrace-run` automatically turns on all LLM Observability integrations.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
Enable LLM Observability by running your application with `NODE_OPTIONS="--import dd-trace/initialize.mjs"` and specifying the required environment variables.

**Note**: `dd-trace/initialize.mjs` automatically turns on all APM integrations.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```
{{% /tab %}}
{{< /tabs >}}

#### Environment variables for command-line setup

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

{{% /collapse-content %}}

{{% collapse-content title="In-code setup" level="h3" expanded=false id="in-code-setup" %}}

Instead of using [command-line setup](#command-line-setup), you can also enable LLM Observability programmatically.

{{< tabs >}}
{{% tab "Python" %}}

Use the `LLMObs.enable()` function to enable LLM Observability.

<div class="alert alert-info">
Do not use this setup method with the <code>ddtrace-run</code> command.
</div>

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  site="<YOUR_DATADOG_SITE>",
  agentless_enabled=True,
)
{{< /code-block >}}

##### Parameters

`ml_app`
: optional - _string_
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given trace, see [Tracing multiple applications](#tracing-multiple-applications). If not provided, this defaults to the value of `DD_LLMOBS_ML_APP`.

`integrations_enabled` - **default**: `true`
: optional - _boolean_
<br />A flag to enable automatically tracing LLM calls for Datadog's supported [LLM integrations][1]. If not provided, all supported LLM integrations are enabled by default. To avoid using the LLM integrations, set this value to `false`.

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

[1]: /llm_observability/setup/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
Do not use this setup method with the <code>dd-trace/initialize.mjs</code> command.
</div>

Use the `init()` function to enable LLM Observability.

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
    agentlessEnabled: true,
  },
  site: "<YOUR_DATADOG_SITE>",
  env: "<YOUR_ENV>",
});

const llmobs = tracer.llmobs;
{{< /code-block >}}

**Options for `llmobs` configuration**

`mlApp`
: optional - _string_
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given trace, see [Tracing multiple applications](#tracing-multiple-applications). If not provided, this defaults to the value of `DD_LLMOBS_ML_APP`.

`agentlessEnabled`
: optional - _boolean_ - **default**: `false`
<br />Only required if you are not using the Datadog Agent, in which case this should be set to `true`. This configures the `dd-trace` library to not send any data that requires the Datadog Agent. If not provided, this defaults to the value of `DD_LLMOBS_AGENTLESS_ENABLED`.

**Options for general tracer configuration**:

`env`
: optional - _string_
<br />The name of your application's environment (examples: `prod`, `pre-prod`, `staging`). If not provided, this defaults to the value of `DD_ENV`.

`service`
: optional - _string_
<br />The name of the service used for your application. If not provided, this defaults to the value of `DD_SERVICE`.

##### Environment variables

Set the following values as environment variables. They cannot be configured programmatically.

`DD_SITE`
: required - _string_
<br />The Datadog site to submit your LLM data. Your site is {{< region-param key="dd_site" code="true" >}}.

`DD_API_KEY`
: optional - _string_
<br />Your Datadog API key. Only required if you are not using the Datadog Agent.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

### AWS Lambda setup

See [Quickstart: Trace an LLM application in AWS Lambda][15].

### Application naming guidelines

Your application name (the value of `DD_LLMOBS_ML_APP`) must follow these guidelines:

- Must be a lowercase Unicode string
- Can be up to 193 characters long
- Cannot contain contiguous or trailing underscores
- Can contain the following characters:
   - Alphanumerics
   - Underscores
   - Minuses
   - Colons
   - Periods
   - Slashes

## Tracing spans

{{< tabs >}}
{{% tab "Python" %}}

To trace a span, use `ddtrace.llmobs.decorators.<SPAN_KIND>()` as a function decorator (for example, `llmobs.decorators.task()` for a task span) for the function you'd like to trace. For a list of available span kinds, see the [Span Kinds documentation][1]. For more granular tracing of operations within functions, see [Tracing spans using inline methods](#tracing-spans-using-inline-methods).

[1]: /llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

To trace a span, use `llmobs.wrap(options, function)` as a function wrapper for the function you'd like to trace. For a list of available span kinds, see the [Span Kinds documentation][1]. For more granular tracing of operations within functions, see [Tracing spans using inline methods](#tracing-spans-using-inline-methods).

### Span Kinds

Span kinds are required, and are specified on the `options` object passed to the `llmobs` tracing functions (`trace`, `wrap`, and `decorate`). See the [Span Kinds documentation][1] for a list of supported span kinds.

**Note:** Spans with an invalid span kind are not submitted to LLM Observability.

### Automatic function argument/output/name capturing

`llmobs.wrap` (along with [`llmobs.decorate`](#function-decorators-in-typescript) for TypeScript) tries to automatically capture inputs, outputs, and the name of the function being traced. If you need to manually annotate a span, see [Annotating a span](#annotating-a-span). Inputs and outputs you annotate will override the automatic capturing. Additionally, to override the function name, pass the `name` property on the options object to the `llmobs.wrap` function:

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### Conditions for finishing a span for a wrapped function

`llmobs.wrap` extends the underlying behavior of [`tracer.wrap`][2]. The underlying span created when the function is called is finished under the following conditions:

- If the function returns a Promise, then the span finishes when the promise is resolved or rejected.
- If the function takes a callback as its last parameter, then the span finishes when that callback is called.
- If t function doesn't accept a callback and doesn't return a Promise, then the span finishes at the end of the function execution.

The following example demonstrates the second condition, where the last argument is a callback:

#### Example

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res, next) {
  const err = ... // user application logic
  // the span for this function is finished when `next` is called
  next(err)
}
myAgentMiddleware = llmobs.wrap({ kind: 'agent' }, myAgentMiddleware)

app.use(myAgentMiddleware)

{{< /code-block >}}

If the application does not use the callback function, it is recommended to use an inline traced block instead. See [Tracing spans using inline methods](#tracing-spans-using-inline-methods) for more information.

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res) {
  // the `next` callback is not being used here
  return llmobs.trace({ kind: 'agent', name: 'myAgentMiddleware' }, () => {
    return res.status(200).send('Hello World!')
  })
}

app.use(myAgentMiddleware)

{{< /code-block >}}

[1]: /llm_observability/terms/
[2]: /tracing/trace_collection/custom_instrumentation/nodejs/dd-api/?tab=wrapper
{{% /tab %}}
{{< /tabs >}}

### LLM span

<div class="alert alert-info">If you are using any LLM providers or frameworks that are supported by <a href="/llm_observability/sdk/auto_instrumentation/">Datadog's LLM integrations</a>, you do not need to manually start an LLM span to trace these operations.</div>

{{< tabs >}}
{{% tab "Python" %}}
To trace an LLM span, use the function decorator `ddtrace.llmobs.decorators.llm()`.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    return completion
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

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

{{% /collapse-content %}}
{{% /tab %}}

{{% tab "Node.js" %}}
To trace an LLM span, specify the span kind as `llm`, and optionally specify the following arguments on the options object.

#### Example

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
: optional - _string_ - **default**: `"custom"`
<br/>The name of the invoked LLM.

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`modelProvider`
: optional - _string_ - **default**: `"custom"`
<br/>The name of the model provider.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}


### Workflow span

{{< tabs >}}
{{% tab "Python" %}}
To trace a workflow span, use the function decorator `ddtrace.llmobs.decorators.workflow()`.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Node.js" %}}

To trace a workflow span, specify the span kind as `workflow`, and optionally specify arguments on the options object.

#### Example

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow' }, processMessage)
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}


### Agent span

{{< tabs >}}
{{% tab "Python" %}}
To trace an agent span, use the function decorator `ddtrace.llmobs.decorators.agent()`.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import agent

@agent
def react_agent():
    ... # user application logic
    return
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.
{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Node.js" %}}
To trace an agent span, specify the span kind as `agent`, and optionally specify arguments on the options object.

#### Example

{{< code-block lang="javascript" >}}
function reactAgent () {
  ... // user application logic
  return
}
reactAgent = llmobs.wrap({ kind: 'agent' }, reactAgent)
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Tool span

{{< tabs >}}
{{% tab "Python" %}}
To trace a tool span, use the function decorator `ddtrace.llmobs.decorators.tool()`.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import tool

@tool
def call_weather_api():
    ... # user application logic
    return
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}
{{% /tab %}}

{{% tab "Node.js" %}}
To trace a tool span, specify the span kind as `tool`, and optionally specify arguments on the options object.

#### Example

{{< code-block lang="javascript" >}}
function callWeatherApi () {
  ... // user application logic
  return
}
callWeatherApi = llmobs.wrap({ kind: 'tool' }, callWeatherApi)
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}

### Task span

{{< tabs >}}
{{% tab "Python" %}}
To trace a task span, use the function decorator `LLMObs.task()`.


#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task

@task
def sanitize_input():
    ... # user application logic
    return
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}
{{% /tab %}}

{{% tab "Node.js" %}}
To trace a task span, specify the span kind as `task`, and optionally specify arguments on the options object.


#### Example

{{< code-block lang="javascript" >}}
function sanitizeInput () {
  ... // user application logic
  return
}
sanitizeInput = llmobs.wrap({ kind: 'task' }, sanitizeInput)
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}

### Embedding span

{{< tabs >}}
{{% tab "Python" %}}
To trace an embedding span, use the function decorator `LLMObs.embedding()`.

**Note**: Annotating an embedding span's input requires different formatting than other span types. See [Annotating a span](#annotating-a-span) for more details on how to specify embedding inputs.

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import embedding

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    return
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="embedding-span-arguments" %}}

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

{{% /collapse-content %}}
{{% /tab %}}

{{% tab "Node.js" %}}
To trace an embedding span, specify the span kind as `embedding`, and optionally specify arguments on the options object.

**Note**: Annotating an embedding span's input requires different formatting than other span types. See [Annotating a span](#annotating-a-span) for more details on how to specify embedding inputs.

#### Example

{{< code-block lang="javascript" >}}
function performEmbedding () {
  ... // user application logic
  return
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="embedding-span-arguments" %}}

`modelName`
: optional - _string_ - **default**: `"custom"`
<br/>The name of the invoked LLM.

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` is set to the name of the traced function.

`modelProvider`
: optional - _string_ - **default**: `"custom"`
<br/>The name of the model provider.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}

### Retrieval span

{{< tabs >}}
{{% tab "Python" %}}
To trace a retrieval span, use the function decorator `ddtrace.llmobs.decorators.retrieval()`.

**Note**: Annotating a retrieval span's output requires different formatting than other span types. See [Annotating a span](#annotating-a-span) for more details on how to specify retrieval outputs.

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

{{% collapse-content title="Arguments" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Node.js" %}}

To trace a retrieval span, specify the span kind as `retrieval`, and optionally specify the following arguments on the options object.

**Note**: Annotating a retrieval span's output requires different formatting than other span types. See [Annotating a span](#annotating-a-span) for more details on how to specify retrieval outputs.

#### Example

The following also includes an example of annotating a span. See [Annotating a span](#annotating-a-span) for more information.

{{< code-block lang="javascript" >}}
function getRelevantDocs (question) {
  const contextDocuments = ... // user application logic
  llmobs.annotate({
    inputData: question,
    outputData: contextDocuments.map(doc => ({
      id: doc.id,
      score: doc.score,
      text: doc.text,
      name: doc.name
    }))
  })
  return
}
getRelevantDocs = llmobs.wrap({ kind: 'retrieval' }, getRelevantDocs)
{{< /code-block >}}

{{% collapse-content title="Arguments" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}


## Tracking user sessions

Session tracking allows you to associate multiple interactions with a given user.

{{< tabs >}}
{{% tab "Python" %}}
When starting a root span for a new trace or span in a new process, specify the `session_id` argument with the string ID of the underlying user session, which is submitted as a tag on the span. Optionally, you can also specify the `user_handle`, `user_name`, and `user_id` tags.

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

### Session tracking tags

| Tag | Description |
|---|---|
| `session_id` | The ID representing a single user session, for example, a chat session. |
| `user_handle` | The handle for the user of the chat session. |
| `user_name` | The name for the user of the chat session. |
| `user_id` | The ID for the user of the chat session. |
{{% /tab %}}

{{% tab "Node.js" %}}
When starting a root span for a new trace or span in a new process, specify the `sessionId` argument with the string ID of the underlying user session:

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Annotating a span

{{< tabs >}}
{{% tab "Python" %}}
The SDK provides the method `LLMObs.annotate()` to annotate spans with inputs, outputs, and metadata.

The `LLMObs.annotate()` method accepts the following arguments:

{{% collapse-content title="Arguments" level="h4" expanded=false id="annotating-span-arguments" %}}

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

{{% /collapse-content %}}

#### Example

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
{{% /tab %}}

{{% tab "Node.js" %}}
The SDK provides the method `llmobs.annotate()` to annotate spans with inputs, outputs, and metadata.

The `LLMObs.annotate()` method accepts the following arguments:

{{% collapse-content title="Arguments" level="h4" expanded=false id="annotating-span-arguments" %}}
`span`
: optional - _Span_ - **default**: the current active span
<br />The span to annotate. If `span` is not provided (as when using function wrappers), the SDK annotates the current active span.

`annotationOptions`
: required - _object_
<br />An object of different types of data to annotate the span with.

The `annotationOptions` object can contain the following:

`inputData`
: optional - _JSON serializable type or list of objects_
<br />Either a JSON serializable type (for non-LLM spans) or a list of dictionaries with this format: `{role: "...", content: "..."}` (for LLM spans).  **Note**: Embedding spans are a special case and require a string or an object (or a list of objects) with this format: `{text: "..."}`.

`outputData`
: optional - _JSON serializable type or list of objects_
<br />Either a JSON serializable type (for non-LLM spans) or a list of objects with this format: `{role: "...", content: "..."}` (for LLM spans). **Note**: Retrieval spans are a special case and require a string or an object (or a list of objects) with this format: `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: optional - _object_
<br />An object of JSON serializable key-value pairs that users can add as metadata information relevant to the input or output operation described by the span (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: optional - _object_
<br />An object of JSON serializable keys and numeric values that users can add as metrics relevant to the operation described by the span (`input_tokens`, `output_tokens`, `total_tokens`, etc.).

`tags`
: optional - _object_
<br />An object of JSON serializable key-value pairs that users can add as tags regarding the span's context (`session`, `environment`, `system`, `versioning`, etc.). For more information about tags, see [Getting Started with Tags][1].

{{% /collapse-content %}}

#### Example

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const completion = ... // user application logic to invoke LLM
  llmobs.annotate({
    inputData: [{ role: "user", content: "Hello world!" }],
    outputData: [{ role: "assistant", content: "How can I help?" }],
    metadata: { temperature: 0, max_tokens: 200 },
    metrics: { input_tokens: 4, output_tokens: 6, total_tokens: 10 },
    tags: { host: "host_name" }
  })
  return completion
}
llmCall = llmobs.wrap({ kind:'llm', modelName: 'modelName', modelProvider: 'modelProvider' }, llmCall)

function extractData (document) {
  const resp = llmCall(document)
  llmobs.annotate({
    inputData: document,
    outputData: resp,
    tags: { host: "host_name" }
  })
  return resp
}
extractData = llmobs.wrap({ kind: 'workflow' }, extractData)

function performEmbedding () {
  ... // user application logic
  llmobs.annotate(
    undefined, { // this can be set to undefined or left out entirely
      inputData: { text: "Hello world!" },
      outputData: [0.0023064255, -0.009327292, ...],
      metrics: { input_tokens: 4 },
      tags: { host: "host_name" }
    }
  )
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)

function similaritySearch () {
  ... // user application logic
  llmobs.annotate(undefined, {
    inputData: "Hello world!",
    outputData: [{ text: "Hello world is ...", name: "Hello, World! program", id: "document_id", score: 0.9893 }],
    tags: { host: "host_name" }
  })
  return
}
similaritySearch = llmobs.wrap({ kind: 'retrieval', name: 'getRelevantDocs' }, similaritySearch)

{{< /code-block >}}

[1]: /getting_started/tagging/

{{% /tab %}}
{{< /tabs >}}

### Annotating auto-instrumented spans

{{< tabs >}}
{{% tab "Python" %}}

The SDK's `LLMObs.annotate_context()` method returns a context manager that can be used to modify all auto-instrumented spans started while the annotation context is active.

The `LLMObs.annotation_context()` method accepts the following arguments:

{{% collapse-content title="Arguments" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: optional - _str_
<br />Name that overrides the span name for any auto-instrumented spans that are started within the annotation context.

`prompt`
: optional - _dictionary_
<br />A dictionary that represents the prompt used for an LLM call in the following format:<br />`{"template": "...", "id": "...", "version": "...", "variables": {"variable_1": "...", ...}}`.<br />You can also import the `Prompt` object from `ddtrace.utils` and pass it in as the `prompt` argument. **Note**: This argument only applies to LLM spans.

`tags`
: optional - _dictionary_
<br />A dictionary of JSON serializable key-value pairs that users can add as tags on the span. Example keys: `session`, `env`, `system`, and `version`. For more information about tags, see [Getting Started with Tags][1].

{{% /collapse-content %}}

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

[1]: /getting_started/tagging/

{{% /tab %}}
{{< /tabs >}}



## Evaluations

The LLM Observability SDK provides methods to export and submit your evaluations to Datadog.

Evaluations must be joined to a single span. You can identify the target span using either of these two methods:
- _Tag-based joining_ - Join an evaluation using a unique key-value tag pair that is set on a single span. The evaluation will fail to join if the tag key-value pair matches multiple spans or no spans.
- _Direct span reference_ - Join an evaluation using the span's unique trace ID and span ID combination.

### Exporting a span
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()` can be used to extract the span context from a span. This method is helpful for associating your evaluation with the corresponding span.

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

{{% /tab %}}

{{% tab "Node.js" %}}
`llmobs.exportSpan()` can be used to extract the span context from a span. You'll need to use this method to associate your evaluation with the corresponding span.

#### Arguments

The `llmobs.exportSpan()` method accepts the following argument:

`span`
: optional - _Span_
<br />The span to extract the span context (span and trace IDs) from. If not provided (as when using function wrappers), the SDK exports the current active span.

#### Example

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Submitting evaluations

{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.submit_evaluation_for()` can be used to submit your custom evaluation associated with a given span.

<div class="alert alert-info"><code>LLMObs.submit_evaluation</code> is deprecated and will be removed in ddtrace 3.0.0. As an alternative, use <code>LLMObs.submit_evaluation_for</code>.</div>

**Note**: Custom evaluations are evaluators that you implement and host yourself. These differ from out-of-the-box evaluations, which are automatically computed by Datadog using built-in evaluators. To configure out-of-the-box evaluations for your application, use the [**LLM Observability** > **Settings** > **Evaluations**][1] page in Datadog.

The `LLMObs.submit_evaluation_for()` method accepts the following arguments:

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}
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
: optional - _dictionary_
<br />A dictionary that uniquely identifies the span associated with this evaluation. Must contain `span_id` (string) and `trace_id` (string). Use [`LLMObs.export_span()`](#exporting-a-span) to generate this dictionary.

`span_with_tag_value`
: optional - _dictionary_
<br />A dictionary that uniquely identifies the span associated with this evaluation. Must contain `tag_key` (string) and `tag_value` (string).

   **Note**: Exactly one of `span` or `span_with_tag_value` is required. Supplying both, or neither, raises a ValueError.

`ml_app`
: required - _string_
<br />The name of the ML application.

`timestamp_ms`
: optional - _integer_
<br />The unix timestamp in milliseconds when the evaluation metric result was generated. If not provided, this defaults to the current time.

`tags`
: optional - _dictionary_
<br />A dictionary of string key-value pairs that users can add as tags regarding the evaluation. For more information about tags, see [Getting Started with Tags][2].
{{% /collapse-content %}}

#### Example

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

    LLMObs.submit_evaluation_for(
        span_with_tag_value = {
            "tag_key": "msg_id",
            "tag_value": msg_id
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

[1]: https://app.datadoghq.com/llm/settings/evaluations
[2]: /getting_started/tagging/
{{% /tab %}}

{{% tab "Node.js" %}}

`llmobs.submitEvaluation()` can be used to submit your custom evaluation associated with a given span.

The `llmobs.submitEvaluation()` method accepts the following arguments:

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
: required - _dictionary_
<br />The span context to associate the evaluation with. This should be the output of `LLMObs.export_span()`.

`evaluationOptions`
: required - _object_
<br />An object of the evaluation data.

The `evaluationOptions` object can contain the following:

`label`
: required - _string_
<br />The name of the evaluation.

`metricType`
: required - _string_
<br />The type of the evaluation. Must be one of "categorical" or "score".

`value`
: required - _string or numeric type_
<br />The value of the evaluation. Must be a string (for categorical `metric_type`) or number (for score `metric_type`).

`tags`
: optional - _dictionary_
<br />A dictionary of string key-value pairs that users can add as tags regarding the evaluation. For more information about tags, see [Getting Started with Tags][1].
{{% /collapse-content %}}

#### Example

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()
  llmobs.submitEvaluation(spanContext, {
    label: "harmfulness",
    metricType: "score",
    value: 10,
    tags: { evaluationProvider: "ragas" }
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

[1]: /getting_started/tagging/
{{% /tab %}}
{{< /tabs >}}

## Span processing

{{< tabs >}}
{{% tab "Python" %}}
To modify input and output data on spans, you can configure a processor function. The processor function has access to span tags to enable conditional input/output modification. See the following examples for usage.

### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan

def redact_processor(span: LLMObsSpan) -> LLMObsSpan:
    if span.get_tag("no_output") == "true":
        for message in span.output:
            message["content"] = ""
    return span


# If using LLMObs.enable()
LLMObs.enable(
  ...
  span_processor=redact_processor,
)
# else when using `ddtrace-run`
LLMObs.register_processor(redact_processor)

with LLMObs.llm("invoke_llm_with_no_output"):
    LLMObs.annotate(tags={"no_output": "true"})
{{< /code-block >}}


### Example: conditional modification with auto-instrumentation

When using auto instrumentation, the span is not always contextually accessible. To conditionally modify the inputs and outputs on auto-instrumented spans, `annotation_context()` can be used in addition to a span processor.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan

def redact_processor(span: LLMObsSpan) -> LLMObsSpan:
    if span.get_tag("no_input") == "true":
        for message in span.input:
            message["content"] = ""
    return span

LLMObs.register_processor(redact_processor)


def call_openai():
    with LLMObs.annotation_context(tags={"no_input": "true"}):
        # make call to openai
        ...
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}


## Advanced tracing

{{< tabs >}}
{{% tab "Python" %}}
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

The `ddtrace` library provides some out-of-the-box integrations that support distributed tracing for popular [web framework][1] and [HTTP][2] libraries. If your application makes requests using these supported libraries, you can enable distributed tracing by running:
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

[1]: /tracing/trace_collection/compatibility/python/#integrations
[2]: /tracing/trace_collection/compatibility/python/#library-compatibility
{{% /tab %}}

{{% tab "Node.js" %}}
### Tracing spans using inline methods

The `llmobs` SDK provides a corresponding inline method to automatically trace the operation a given code block entails. These methods have the same argument signature as their function wrapper counterparts, with the addition that `name` is required, as the name cannot be inferred from an anonymous callback. This method will finish the span under the following conditions:

- If the function returns a Promise, then the span finishes when the promise is resolved or rejected.
- If the function takes a callback as its last parameter, then the span finishes when that callback is called.
- If the function doesn't accept a callback and doesn't return a Promise, then the span finishes at the end of the function execution.

#### Example without a callback

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

#### Example with a callback

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, (workflowSpan, cb) => {
    ... // user application logic
    let maybeError = ...
    cb(maybeError) // the span will finish here, and tag the error if it is not null or undefined
    return
  })
}
{{< /code-block >}}

The return type of this function matches the return type of the traced function:

{{< code-block lang="javascript" >}}
function processMessage () {
  const result = llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return 'hello world'
  })

  console.log(result) // 'hello world'
  return result
}
{{< /code-block >}}

### Function decorators in TypeScript

The Node.js LLM Observability SDK offers an `llmobs.decorate` function which serves as a function decorator for TypeScript applications. This functions tracing behavior is the same as `llmobs.wrap`.

#### Example

{{< code-block lang="javascript" >}}
// index.ts
import tracer from 'dd-trace';
tracer.init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
  },
});

const { llmobs } = tracer;

class MyAgent {
  @llmobs.decorate({ kind: 'agent' })
  async runChain () {
    ... // user application logic
    return
  }
}

{{< /code-block >}}

### Force flushing in serverless environments

`llmobs.flush()` is a blocking function that submits all buffered LLM Observability data to the Datadog backend. This can be useful in serverless environments to prevent an application from exiting until all LLM Observability traces are submitted.

### Tracing multiple applications

The SDK supports tracing multiple LLM applications from the same service.

You can configure an environment variable `DD_LLMOBS_ML_APP` to the name of your LLM application, which all generated spans are grouped into by default.

To override this configuration and use a different LLM application name for a given root span, pass the `mlApp` argument with the string name of the underlying LLM application when starting a root span for a new trace or a span in a new process.

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

### Distributed tracing

The SDK supports tracing across distributed services or hosts. Distributed tracing works by propagating span information across web requests.

The `dd-trace` library provides out-of-the-box integrations that support distributed tracing for popular [web frameworks][1]. Requiring the tracer automatically enables these integrations, but you can disable them optionally with:

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
{{% /tab %}}
{{< /tabs >}}


### Compatibility

#### Supported runtimes

| Runtime | Version |
| ------- | ------- |
| Python  | 3.8+    |
| Node.js | 16+     |
| Java    | 18+     |


#### Supported LLM integrations




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
[15]: /llm_observability/quickstart?tab=python#trace-an-llm-application-in-aws-lambda
[16]: https://app.datadoghq.com/llm/settings/evaluations
