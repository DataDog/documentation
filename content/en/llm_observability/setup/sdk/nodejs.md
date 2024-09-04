---
title: LLM Observability Node.js SDK Reference
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 30
aliases:
    - /tracing/llm_observability/sdk/nodejs
    - /llm_observability/sdk/nodejs
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

The LLM Observability SDK for Node.js enhances the observability of your Javascript-based LLM applications. The SDK supports Node.js versions 16 and newer. For information about LLM Observability's integration support, see [Auto Instrumentation][13].

You can install and configure tracing of various operations such as workflows, tasks, and API calls with wrapped functions or traced blocks. You can also annotate these traces with metadata for deeper insights into the performance and behavior of your applications, supporting multiple LLM services or models from the same environment.

## Setup

### Prerequisites

1. The latest `dd-trace` package must be installed:

{{< code-block lang="shell">}}
npm install git+https://git@github.com/DataDog/dd-trace-js.git#sabrenner/llmobs-sdk
{{< /code-block >}}

2. LLM Observability requires a Datadog API key (see [the instructions for creating an API key][7]).

### Command-line setup

Enable LLM Observability by running your application with `NODE_OPTIONS="--import dd-trace/initialize.mjs"`  and specifying the required environment variables.

**Note**: `dd-trace/initialize.mjs` automatically turns on all APM integrations.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
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

`DD_LLMOBS_ML_APP`
: required - _string_ 
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given root span, see [Tracing multiple applications](#tracing-multiple-applications).

`DD_LLMOBS_AGENTLESS_ENABLED`
: optional - _integer or string_ - **default**: `false`
<br />Only required if you are not using the Datadog Agent, in which case this should be set to `1` or `true`.

### In-code setup

Enable LLM Observability programatically through the `init()` function instead of running with the `dd-trace/initialize.mjs` command. **Note**: Do not use this setup method with the `dd-trace/initialize.mjs` command.

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
    agentlessEnabled: true,
    apiKey: "<YOUR_DATADOG_API_KEY>",
  },
  site: "<YOUR_DATADOG_SITE>",
  env: "<YOUR_ENV>",
  service: "<YOUR_SERVICE>",
});

const llmobs = tracer.llmobs;
{{< /code-block >}}

These options are set on the `llmobs` configuration:

`mlApp`
: optional - _string_
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given trace, see [Tracing multiple applications](#tracing-multiple-applications). If not provided, this defaults to the value of `DD_LLMOBS_ML_APP`.

`agentlessEnabled`
: optional - _boolean_ - **default**: `false`
<br />Only required if you are not using the Datadog Agent, in which case this should be set to `true`. This configures the `ddtrace` library to not send any data that requires the Datadog Agent. If not provided, this defaults to the value of `DD_LLMOBS_AGENTLESS_ENABLED`.

`apiKey`
: optional - _string_ 
<br />Your Datadog API key. If not provided, this defaults to the value of `DD_API_KEY`.

These options can be set on the general tracer configuration:

`site`
: optional - _string_ 
<br />The Datadog site to submit your LLM data. Your site is {{< region-param key="dd_site" code="true" >}}. If not provided, this defaults to the value of `DD_SITE`.

`env`
: optional - _string_
<br />The name of your application's environment (examples: `prod`, `pre-prod`, `staging`). If not provided, this defaults to the value of `DD_ENV`.

`service`
: optional - _string_
<br />The name of the service used for your application. If not provided, this defaults to the value of `DD_SERVICE`.

### AWS Lambda setup

Use the `llmobs.flush()` function to flush all remaining spans from the tracer to LLM Observability at the end of the Lambda function.

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

To trace a span, use `llmobs.wrap(spanKind, options, function)` as a function wrapper for the function you'd like to trace. For a list of available span kinds, see the [Span Kinds documentation][8]. For more granular tracing of operations within functions, see [Tracing spans using inline methods](#tracing-spans-using-inline-methods).

### Automatic function argument/output/name capturing

`llmobs.wrap` (along with [`llmobs.decorate`](#function-decorators-in-typescript) for typescript) will try to automatically capure inputs, outputs, and the name of the function being traced. If you need to manually annotate a span, see [Annotating a span](#annotating-a-span). Inputs and outputs you annotate will override the automatic capturing. Additionally, to override the function name, pass the `name` property on the options object to the `llmobs.wrap` function:

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap('workflow', { name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### LLM span

**Note**: If you are using any LLM providers or frameworks that are supported by [Datadog's LLM integrations][13], you do not need to manually start a LLM span to trace these operations.

To trace an LLM span, specify the span kind as `llm`, with optionally specifying the following arguments.

#### Arguments

`modelName`
: required - _string_
<br/>The name of the invoked LLM.

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`modelProvider`
: optional - _string_ - **default**: `"custom"`

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  return completion
}
llmCall = llmobs.wrap('llm', { name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

### Workflow span

To trace an LLM span, specify the span kind as `workflow`, with optionally specifying the following arguments.

#### Arguments

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap('workflow', processMessage)
{{< /code-block >}}

### Agent span

To trace an LLM span, specify the span kind as `agent`, with optionally specifying the following arguments.

#### Arguments

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="javascript" >}}
function reactAgent () {
  ... // user application logic
  return
}
reactAgent = llmobs.wrap('agent', reactAgent)
{{< /code-block >}}

### Tool span

To trace an LLM span, specify the span kind as `tool`, with optionally specifying the following arguments.

#### Arguments

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="javascript" >}}
function callWeatherApi () {
  ... // user application logic
  return
}
callWeatherApi = llmobs.wrap('tool', callWeatherApi)
{{< /code-block >}}

### Task span

To trace an LLM span, specify the span kind as `task`, with optionally specifying the following arguments.

#### Arguments

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="javascript" >}}
function sanitizeInput () {
  ... // user application logic
  return
}
sanitizeInput = llmobs.wrap('task', sanitizeInput)
{{< /code-block >}}

### Embedding span

To trace an LLM span, specify the span kind as `embedding`, with optionally specifying the following arguments.

**Note**: Annotating an embedding span's input requires different formatting than other span types. See [Annotating a span](#annotating-a-span) for more details on how to specify embedding inputs.

#### Arguments

`modelName`
: required - _string_
<br/>The name of the invoked LLM.

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` is set to the name of the traced function.

`modelProvider`
: optional - _string_ - **default**: `"custom"`

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

{{< code-block lang="javascript" >}}
function performEmbedding () {
  ... // user application logic
  return
}
performEmbedding = llmobs.wrap('embedding', { modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)
{{< /code-block >}}

### Retrieval span

To trace an LLM span, specify the span kind as `retrieval`, with optionally specifying the following arguments.

**Note**: Annotating a retrieval span's output requires different formatting than other span types. See [Annotating a span](#annotating-a-span) for more details on how to specify retrieval outputs.

#### Arguments

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

#### Example

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
getRelevantDocs = llmobs.wrap('retrieval', getRelevantDocs)
{{< /code-block >}}

### Conditions for finishing a span for a wrapped function

`llmobs.wrap` extends the underlying behavior of `tracer.wrap`. The underlying span created when the function is called is finished under the following conditions:

1. The function returns a Promise, in which case the span will finish when the promise is resolved or rejected.
2. The function takes a callback as its last parameter, in which case the span will finish when that callback is called.
3. The function doesn't accept a callback and doesn't return a Promise, in which case the span will finish at the end of the function execution.

#### Example
  
{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res, next) {
  const err = ... // user application logic
  // the span for this function is finished when `next` is called
  next(err)
}
myAgentMiddleware = llmobs.wrap('agent', myAgentMiddleware)

app.use(myAgentMiddleware)

{{< /code-block >}}

If the application does not use the callback function, it is recommended to use an inline traced block instead. See [Tracing spans using inline methods](#tracing-spans-using-inline-methods) for more information.

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res) {
  // the `next` callback is not being used here
  return llmobs.trace('agent', { name: 'myAgentMiddleware' }, () => {
    return res.status(200).send('Hello World!')
  })
}
myAgentMiddleware = llmobs.wrap('agent', myAgentMiddleware)

app.use(myAgentMiddleware)

{{< /code-block >}}

## Tracking user sessions

Session tracking allows you to associate multiple interactions with a given user. When starting a root span for a new trace or span in a new process, specify the `session_id` argument with the string ID of the underlying user session:

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap('workflow', { sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}

## Annotating a span

The SDK provides the method `llmobs.annotate()` to annotate spans with inputs, outputs, and metadata. 

### Arguments

The `LLMObs.annotate()` method accepts the following arguments:

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
<br />An object of JSON serializable key-value pairs that users can add as metadata information relevant to the input or output operation described by the span (`model_temperature`, `max_tokens`, `top_k`, and so on).

`metrics`
: optional - _object_
<br />An object of JSON serializable keys and numeric values that users can add as metrics relevant to the operation described by the span (`input_tokens`, `output_tokens`, `total_tokens`, and so on).

`tags`
: optional - _object_
<br />An object of JSON serializable key-value pairs that users can add as tags regarding the span's context (`session`, `environment`, `system`, `versioning`, and so on). For more information about tags, see [Getting Started with Tags][9].

### Example

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
llmCall = llmobs.wrap('llm', { modelName: 'modelName', modelProvider: 'modelProvider' }, llmCall)

function extractData (document) {
  const resp = llmCall(document)
  llmobs.annotate({
    inputData: document,
    outputData: resp,
    tags: { host: "host_name" }
  })
  return resp
}
extractData = llmobs.wrap('workflow', extractData)

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
performEmbedding = llmobs.wrap('embedding', { modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)

function similaritySearch () {
  ... // user application logic
  llmobs.annotate(undefined, {
    inputData: "Hello world!",
    outputData: [{ text: "Hello world is ...", name: "Hello, World! program", id: "document_id", score: 0.9893 }],
    tags: { host: "host_name" }
  })
  return
}
similaritySearch = llmobs.wrap('retrieval', { name: 'getRelevantDocs' }, similaritySearch)

{{< /code-block >}}

## Evaluations

The LLM Observability SDK provides the methods `llmobs.exportSpan()` and `llmobs.submitEvaluation()` to help your traced LLM application submit evaluations to LLM Observability.

### Exporting a span

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
llmCall = llmobs.wrap('llm', { name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}


### Submit evaluations

`llmobs.submitEvaluation()` can be used to submit your custom evaluation associated with a given span.

#### Arguments

The `llmobs.submitEvaluation()` method accepts the following arguments:

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
<br />A dictionary of string key-value pairs that users can add as tags regarding the evaluation. For more information about tags, see [Getting Started with Tags][9].

### Example

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
llmCall = llmobs.wrap('llm', { name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

## Advanced tracing

### Tracing spans using inline methods

The `llmobs` SDK provides a corresponding inline method to automatically trace the operation a given code block entails. These methods have the same argument signature as their function wrapper counterparts, with the addition that `name` defaults to the span kind (`llm`, `workflow`, and so on) if not provided. This method will finish the span under the following conditions:

1. The function returns a Promise, in which case the span will finish when the promise is resolved or rejected.
2. The function takes a callback as its last parameter, in which case the span will finish when that callback is called.
3. The function doesn't accept a callback and doesn't return a Promise, in which case the span will finish at the end of the function execution.

Additionally, the return value of this function is the return value of the function provided.

#### Example

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace('workflow', { name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

### Persisting a span across contexts

To manually start and stop a span across different contexts or scopes:

1. Start a span manually using `llmobs.startSpan(spanKind, options)`
2. Pass the span object as an argument to other functions.
3. Stop the span manually with the `span.finish()` method. **Note**: the span must be manually finished, otherwise it will not be submitted.

#### Example

{{< code-block lang="javascript" >}}
function processMessage() {
    const workflowSpan = llmobs.startSpan('workflow', { name: 'processMessage' })
    ... // user application logic
    separateTask(workflowSpan)
    return
}

function separateTask(workflowSpan) {
    ... // user application logic
    workflowSpan.finish()
    return
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
  @llmobs.decorate('agent')
  async runChain () {
    ... // user application logic
    return
  }
}

{{< /code-block >}}

### Force flushing in serverless environments

`llmobs.flush()` is a blocking function that submits all buffered LLM Observability data to the Datadog backend. This can be useful in serverless environments to prevent an application from exiting until all LLM Observability traces are submitted.

### Tracing multiple applications

The SDK supports tracking multiple LLM applications from the same service.

You can configure an environment variable `DD_LLMOBS_ML_APP` to the name of your LLM application, which all generated spans are grouped into by default.

To override this configuration and use a different LLM application name for a given root span, pass the `ml_app` argument with the string name of the underlying LLM application when starting a root span for a new trace or a span in a new process.

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap('workflow', { name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

### Distributed tracing

The SDK supports tracing across distributed services or hosts. Distributed tracing works by propagating span information across web requests.

The `dd-trace` library provides some out-of-the-box integrations that support distributed tracing for popular [web frameworks][12]. Requiring the tracer automatically enables these integrations, but you can disable them optionally with:

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}


[1]: https://github.com/openai/openai-node
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[4]: https://github.com/langchain-ai/langchain
[7]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /llm_observability/terms/
[9]: /getting_started/tagging/
[10]: https://github.com/DataDog/llm-observability
[11]: /tracing/trace_collection/compatibility/nodejs/#supported-integrations
[12]: /tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
[13]: /llm_observability/setup/auto_instrumentation/
