---
title: Agent Observability SDK Reference
description: Reference documentation for the Agent Observability SDKs for Python, Node.js, Java, and Go (experimental), covering automatic and manual instrumentation.
aliases:
    - /tracing/llm_observability/sdk/python
    - /llm_observability/sdk/python
    - /llm_observability/setup/sdk/python
    - /llm_observability/setup/sdk/nodejs
    - /llm_observability/setup/sdk
    - /llm_observability/setup/sdk/java
    - /llm_observability/sdk/java
    - /llm_observability/sdk/
    - /llm_observability/instrumentation/custom_instrumentation
    - /llm_observability/instrument/custom_instrumentation
    - /tracing/llm_observability/trace_an_llm_application
    - /llm_observability/setup
    - /llm_observability/instrumentation/sdk/

further_reading:
  - link: https://www.datadoghq.com/blog/llm-prompt-tracking
    tag: Blog
    text: Track, compare, and optimize your LLM prompts with Datadog LLM Observability

---

## Overview

Agent Observability SDKs provide automatic instrumentation as well as manual instrumentation APIs to provide observability and insights into your LLM applications.

SDKs are available for Python, Node.js, and Java. Feature coverage varies by language: sections that do not show a tab for your language are not supported by that SDK.

The Go SDK is **experimental** and is not yet generally available. It provides manual instrumentation only, because `dd-trace-go` has no LLM provider integrations. Its API may change in a future release.

## Setup

### Requirements

- A [Datadog API key][1].

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{< tabs >}}
{{% tab "Python" %}}
- The latest `ddtrace` package is installed (Python 3.7+ required):
   ```shell
   pip install ddtrace
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
- The latest `dd-trace` package is installed (Node.js 16+ required):
   ```shell
   npm install dd-trace
   ```

{{% /tab %}}

{{% tab "Java" %}}
- You have downloaded the latest [`dd-trace-java` JAR][1]. The Agent Observability SDK is supported in `dd-trace-java` v1.51.0+ (Java 8+ required).

[1]: https://github.com/DataDog/dd-trace-java
{{% /tab %}}
{{% tab "Go (Experimental)" %}}
<div class="alert alert-warning">The Go SDK is experimental and not yet generally available. Its API may change in a future release.</div>

- The latest `dd-trace-go/v2` module is installed. The Agent Observability SDK is supported in `dd-trace-go` v2.3.0+ (v2.10.0+ recommended for the full feature set):
   ```shell
   go get github.com/DataDog/dd-trace-go/v2
   ```
   **Note**: `dd-trace-go` v2.8.0 and later require Go 1.25+. v2.3.0 through v2.7.0 require Go 1.24+.
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Command-line setup" level="h4" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
Enable Agent Observability by running your application using the `ddtrace-run` command and specifying the required environment variables.

**Note**: `ddtrace-run` automatically turns on all Agent Observability integrations.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### Environment variables for command-line setup

`DD_SITE`
: required - _string_
<br />Destination Datadog site for LLM data submission. Your site is {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: required - _integer or string_
<br />Toggle to enable submitting data to Agent Observability. Should be set to `1` or `true`.

`DD_LLMOBS_ML_APP`
: optional - _string_
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given root span, see [Tracing multiple applications](#tracing-multiple-applications). If not provided, this defaults to the value of [`DD_SERVICE`][1], or the value of a propagated `DD_LLMOBS_ML_APP` from an upstream service.
<br />**Note**: Before version `ddtrace==3.14.0`, this is a **required field**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: optional - _integer or string_ - **default**: `false`
<br />Only required if you are not using the Datadog Agent, in which case this should be set to `1` or `true`.

`DD_LLMOBS_SAMPLE_RATE`
: optional - _float_ - **default**: `1.0`
<br />The fraction of traces retained by Agent Observability. See [Trace sampling](#trace-sampling).

`DD_API_KEY`
: optional - _string_
<br />Your Datadog API key. Only required if you are not using the Datadog Agent.

`DD_MCP_CAPTURE_INTENT`
: optional - _integer or string_ - **default**: `false`
<br />When set to `1` or `true`, adds an argument to every MCP server tool requesting that the calling model describe why it chose to call the tool. The intent is recorded on the tool span.

[1]: /getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}


{{% tab "Node.js" %}}
Enable Agent Observability by running your application with `NODE_OPTIONS="--import dd-trace/initialize.mjs"` and specifying the required environment variables.

**Note**: `dd-trace/initialize.mjs` automatically turns on all APM integrations.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

#### Environment variables for command-line setup

`DD_SITE`
: required - _string_
<br />The Datadog site to submit your LLM data. Your site is {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: required - _integer or string_
<br />Toggle to enable submitting data to Agent Observability. Should be set to `1` or `true`.

`DD_LLMOBS_ML_APP`
: optional - _string_
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given root span, see [Tracing multiple applications](#tracing-multiple-applications). If not provided, this defaults to the value of [`DD_SERVICE`][1], or the value of a propagated `DD_LLMOBS_ML_APP` from an upstream service.
<br />**Note**: Before version `dd-trace@5.66.0`, this is a **required field**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: optional - _integer or string_ - **default**: `false`
<br />Only required if you are not using the Datadog Agent, in which case this should be set to `1` or `true`.

`DD_LLMOBS_SAMPLE_RATE`
: optional - _float_ - **default**: `1.0`
<br />The fraction of traces retained by Agent Observability. See [Trace sampling](#trace-sampling).

`DD_API_KEY`
: optional - _string_
<br />Your Datadog API key. Only required if you are not using the Datadog Agent.

[1]: /getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{% tab "Java" %}}

Enable Agent Observability by running your application with `dd-trace-java` and specifying the required parameters as environment variables or system properties.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### Environment variables and system properties

You can supply the following parameters as environment variables (for example, `DD_LLMOBS_ENABLED`) or as Java system properties (for example, `dd.llmobs_enabled`).

`DD_SITE` or `dd.site`
: required - _string_
<br />Destination Datadog site for LLM data submission. Your site is {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED` or `dd.llmobs.enabled`
: required - _integer or string_
<br />Toggle to enable submitting data to Agent Observability. Should be set to `1` or `true`.

`DD_LLMOBS_ML_APP` or `dd.llmobs.ml.app`
: optional - _string_
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given root span, see [Tracing multiple applications](#tracing-multiple-applications). If not provided, this defaults to the value of [`DD_SERVICE`][1], or the value of a propagated `DD_LLMOBS_ML_APP` from an upstream service.
<br />**Note**: Before version 1.54.0 of `dd-trace-java`, this is a **required field**.

`DD_LLMOBS_AGENTLESS_ENABLED` or `dd.llmobs.agentless.enabled`
: optional - _integer or string_ - **default**: `false`
<br />Only required if you are not using the Datadog Agent, in which case this should be set to `1` or `true`.

`DD_LLMOBS_SAMPLE_RATE` or `dd.llmobs.sample.rate`
: optional - _float_ - **default**: `1.0`
<br />The fraction of traces retained by Agent Observability. Requires `dd-trace-java` 1.66.0 or later. See [Trace sampling](#trace-sampling).

`DD_API_KEY` or `dd.api.key`
: optional - _string_
<br />Your Datadog API key. Only required if you are not using the Datadog Agent.

[1]: /getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{% tab "Go (Experimental)" %}}
The Go SDK has no command-line wrapper equivalent to `ddtrace-run`, because the tracer is started from your application code. Supply the parameters below as environment variables, then call `tracer.Start()` as shown in [in-code setup](#in-code-setup).

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### Environment variables for command-line setup

`DD_SITE`
: required - _string_
<br />Destination Datadog site for LLM data submission. Your site is {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: required - _integer or string_
<br />Toggle to enable submitting data to Agent Observability. Should be set to `1` or `true`. Equivalent to `tracer.WithLLMObsEnabled(true)`.

`DD_LLMOBS_ML_APP`
: optional - _string_
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given root span, see [Tracing multiple applications](#tracing-multiple-applications). If not provided, this defaults to the value of [`DD_SERVICE`][1]. Equivalent to `tracer.WithLLMObsMLApp()`.

`DD_LLMOBS_AGENTLESS_ENABLED`
: optional - _integer or string_ - **default**: `false`
<br />Only required if you are not using the Datadog Agent, in which case this should be set to `1` or `true`. Equivalent to `tracer.WithLLMObsAgentlessEnabled()`.

`DD_LLMOBS_PROJECT_NAME`
: optional - _string_
<br />The name of the project that [datasets and experiments](/llm_observability/improve/experiments/) are grouped under. Equivalent to `tracer.WithLLMObsProjectName()`.

`DD_API_KEY`
: optional - _string_
<br />Your Datadog API key. Only required if you are not using the Datadog Agent.

**Note**: The Go SDK does not support `DD_LLMOBS_SAMPLE_RATE`. See [Trace sampling](#trace-sampling).

[1]: /getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="In-code setup" level="h4" expanded=false id="in-code-setup" %}}

Instead of using [command-line setup](#command-line-setup), you can also enable Agent Observability programmatically.

{{< tabs >}}
{{% tab "Python" %}}

Use the `LLMObs.enable()` function to enable Agent Observability.

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

`sample_rate`
: optional - _float_
<br />The fraction of traces retained by Agent Observability. Requires `ddtrace` 4.12.0 or later. When set, this takes precedence over `DD_LLMOBS_SAMPLE_RATE`. See [Trace sampling](#trace-sampling).

`capture_intent`
: optional - _boolean_ - **default**: `false`
<br />When set to `True`, adds an argument to every MCP server tool requesting that the calling model describe why it chose to call the tool. The intent is recorded on the tool span. If not provided, this defaults to the value of `DD_MCP_CAPTURE_INTENT`.

[1]: /llm_observability/instrument/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
Do not use this setup method with the <code>dd-trace/initialize.mjs</code> command.
</div>

Use the `init()` function to enable Agent Observability.

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

`sampleRate`
: optional - _number_
<br />The fraction of traces retained by Agent Observability. Requires `dd-trace` 5.110.0 or later. When set, this takes precedence over `DD_LLMOBS_SAMPLE_RATE`. See [Trace sampling](#trace-sampling).

**Options for general tracer configuration**:

`site`
: optional - _string_
<br />The Datadog site to submit your LLM data. Your site is {{< region-param key="dd_site" code="true" >}}. If not provided, this defaults to the value of `DD_SITE`.

`env`
: optional - _string_
<br />The name of your application's environment (examples: `prod`, `pre-prod`, `staging`). If not provided, this defaults to the value of `DD_ENV`.

`service`
: optional - _string_
<br />The name of the service used for your application. If not provided, this defaults to the value of `DD_SERVICE`.

##### Environment variables

Set the following values as environment variables. They cannot be configured programmatically.

`DD_API_KEY`
: optional - _string_
<br />Your Datadog API key. Only required if you are not using the Datadog Agent.

{{% /tab %}}
{{% tab "Go (Experimental)" %}}
Enable Agent Observability by passing the LLMObs options to `tracer.Start()`.

{{< code-block lang="go" >}}
package main

import (
	"log"

	"github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
	if err := tracer.Start(
		tracer.WithLLMObsEnabled(true),
		tracer.WithLLMObsMLApp("<YOUR_ML_APP_NAME>"),
		tracer.WithLLMObsAgentlessEnabled(true),
	); err != nil {
		log.Fatalf("failed to start tracer: %v", err)
	}
	defer tracer.Stop()

	// your application logic
}
{{< /code-block >}}

##### Options

`tracer.WithLLMObsEnabled`
: required - _bool_
<br />Toggle to enable submitting data to Agent Observability. If not provided, this defaults to the value of `DD_LLMOBS_ENABLED`.

`tracer.WithLLMObsMLApp`
: optional - _string_
<br />The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. To override this value for a given trace, see [Tracing multiple applications](#tracing-multiple-applications). If not provided, this defaults to the value of `DD_LLMOBS_ML_APP`.

`tracer.WithLLMObsAgentlessEnabled`
: optional - _bool_ - **default**: `false`
<br />Only required if you are not using the Datadog Agent, in which case this should be set to `true`. If not provided, this defaults to the value of `DD_LLMOBS_AGENTLESS_ENABLED`.

`tracer.WithLLMObsProjectName`
: optional - _string_
<br />The name of the project that [datasets and experiments](/llm_observability/improve/experiments/) are grouped under. If not provided, this defaults to the value of `DD_LLMOBS_PROJECT_NAME`.

Set `DD_SITE`, `DD_API_KEY`, `DD_ENV`, and `DD_SERVICE` as environment variables. `DD_API_KEY` is only required if you are not using the Datadog Agent.

**Note**: Agent mode requires Datadog Agent v7.72.0 or later when using [datasets and experiments](/llm_observability/improve/experiments/). Earlier Agent versions do not proxy the datasets and experiments endpoints correctly.
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

For AWS Lambda, see [Trace an LLM Application in AWS Lambda][17].


After installing the SDK and running your application you should expect to see some data in Agent Observability from auto-instrumentation. Manual instrumentation can be used to capture custom built frameworks or operations from libraries that are not yet supported.

## Trace sampling

<div class="alert alert-info">Trace sampling is available in the Python SDK (<code>ddtrace</code> 4.12.0 or later), the Node.js SDK (<code>dd-trace</code> 5.110.0 or later), and the Java SDK (<code>dd-trace-java</code> 1.66.0 or later). It is not supported in the Go SDK.</div>

Trace sampling sets the fraction of traces that Agent Observability retains. Because Agent Observability billing is based on the volume of spans you send, setting a sample rate is one way to control your Agent Observability cost. The SDK makes the sampling decision on the root span and applies it to all of that root span's child spans, including spans created in downstream services through [distributed tracing](#distributed-tracing).

Sampling does not affect your [Agent Observability metrics](/llm_observability/investigate/metrics/), including [token and cost metrics](/llm_observability/investigate/cost/) and other operational metrics. Because unsampled spans are dropped after Datadog ingests your traces, these metrics remain based on 100% of your application's instrumented traffic, regardless of the specified sample rate. Trace sampling is also independent of in-app controls such as [automation rules](/llm_observability/configure/automation_rules/) and [APM trace sampling](/tracing/trace_pipeline/ingestion_mechanisms/), which apply after ingestion.

Configure the sample rate through either of two mechanisms:

- **Environment variable** (`DD_LLMOBS_SAMPLE_RATE`): applies to both [command-line setup](#command-line-setup) and [in-code setup](#in-code-setup). In Java, the `dd.llmobs.sample.rate` system property sets the same value.
- **In-code parameter** (`sample_rate` in Python, `sampleRate` in Node.js): passed to `LLMObs.enable()` in Python, or under `llmobs` in Node.js, when you enable the SDK with [in-code setup](#in-code-setup). When set, it takes precedence over `DD_LLMOBS_SAMPLE_RATE`. The Java and Go SDKs have no in-code equivalent.

The sample rate is a float between `0.0` (retain no traces) and `1.0` (retain all traces). The default is `1.0`. Out-of-range values are ignored.

{{< tabs >}}
{{% tab "Python" %}}
Set the sample rate with the environment variable:

{{< code-block lang="shell" >}}
DD_LLMOBS_SAMPLE_RATE=0.5 ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

Or pass `sample_rate` to `LLMObs.enable()`, which takes precedence over the environment variable:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  sample_rate=0.5,
)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
Set the sample rate with the environment variable:

{{< code-block lang="shell" >}}
DD_LLMOBS_SAMPLE_RATE=0.5 NODE_OPTIONS="--import dd-trace/initialize.mjs" <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

Or pass `sampleRate` under `llmobs` to `init()`, which takes precedence over the environment variable:

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
    sampleRate: 0.5,
  },
});

const llmobs = tracer.llmobs;
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Set the sample rate with the environment variable:

{{< code-block lang="shell" >}}
DD_LLMOBS_SAMPLE_RATE=0.5 \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=<YOUR_ML_APP_NAME> \
-jar path/to/your/app.jar
{{< /code-block >}}

Or set the equivalent `dd.llmobs.sample.rate` system property:

{{< code-block lang="shell" >}}
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=<YOUR_ML_APP_NAME> \
-Ddd.llmobs.sample.rate=0.5 -jar path/to/your/app.jar
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Manual instrumentation

{{< tabs >}}
{{% tab "Python" %}}

To capture an LLM operation a function decorator can be used to easily instrument workflows:

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def handle_user_request():
    ...
{{< /code-block >}}

or a context-manager based approach to capture fine-grained operations:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

with LLMObs.llm(model="gpt-4o"):
    call_llm()
    LLMObs.annotate(
        metrics={
            "input_tokens": ...,
            "output_tokens": ...,
        },
    )
{{< /code-block >}}


For a list of available span kinds, see the [Span Kinds documentation][1]. For more granular tracing of operations within functions, see [Tracing spans using inline methods](#tracing-spans-using-inline-methods).

[1]: /llm_observability/quickstart/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

To trace a span, use `llmobs.wrap(options, function)` as a function wrapper for the function you'd like to trace. For a list of available span kinds, see the [Span Kinds documentation][1]. For more granular tracing of operations within functions, see [Tracing spans using inline methods](#tracing-spans-using-inline-methods).

### Span Kinds

Span kinds are required, and are specified on the `options` object passed to the `llmobs` tracing functions (`trace`, `wrap`, and `decorate`). See the [Span Kinds documentation][1] for a list of supported span kinds.

**Note:** Spans with an invalid span kind are not submitted to Agent Observability.

### Automatic function argument/output/name capturing

`llmobs.wrap` (along with [`llmobs.decorate`](#function-decorators-in-typescript) for TypeScript) tries to automatically capture inputs, outputs, and the name of the function being traced. If you need to manually annotate a span, see [Enriching spans](#enriching-spans). Inputs and outputs you annotate will override the automatic capturing. Additionally, to override the function name, pass the `name` property on the options object to the `llmobs.wrap` function:

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

[1]: /llm_observability/quickstart/terms/
[2]: /tracing/trace_collection/custom_instrumentation/nodejs/dd-api/?tab=wrapper
{{% /tab %}}
{{% tab "Java" %}}

### Starting a span

There are multiple methods to start a span, based on the kind of span that you are starting. See the [Span Kinds documentation][1] for a list of supported span kinds.

All spans are started as an object instance of `LLMObsSpan`. Each span has methods that you can use to interact with the span and record data.

### Finishing a span

Spans must be finished for the trace to be submitted and visible in the Datadog app.

To finish a span, call `finish()` on a span object instance. If possible, wrap the span in a `try/finally` block to ensure the span is submitted even if an exception occurs.

#### Example
```java
    try {
        LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", "ml-app-override", "session-141");
        // user logic
        // interact with started span
    } finally {
      workflowSpan.finish();
    }
```

[1]: /llm_observability/quickstart/terms/#span-kinds
{{% /tab %}}
{{% tab "Go (Experimental)" %}}
### Starting a span

Each span kind has its own constructor in the `llmobs` package. See the [Span Kinds documentation][1] for a list of supported span kinds.

Every constructor takes a `context.Context` and returns the started span along with a new `context.Context` that carries the span. Pass that returned context into the next call to nest spans automatically. See [Nesting spans](#nesting-spans).

{{< code-block lang="go" >}}
span, ctx := llmobs.StartWorkflowSpan(ctx, "handle-user-request")
defer span.Finish()
{{< /code-block >}}

| Span kind | Constructor | Annotation method |
|---|---|---|
| `llm` | `llmobs.StartLLMSpan` | `AnnotateLLMIO` |
| `workflow` | `llmobs.StartWorkflowSpan` | `AnnotateTextIO` |
| `agent` | `llmobs.StartAgentSpan` | `AnnotateTextIO` |
| `tool` | `llmobs.StartToolSpan` | `AnnotateTextIO` |
| `task` | `llmobs.StartTaskSpan` | `AnnotateTextIO` |
| `embedding` | `llmobs.StartEmbeddingSpan` | `AnnotateEmbeddingIO` |
| `retrieval` | `llmobs.StartRetrievalSpan` | `AnnotateRetrievalIO` |

Every constructor accepts the following `llmobs.StartSpanOption` values:

{{% collapse-content title="Start span options" level="h4" expanded=false id="go-start-span-options" %}}

`llmobs.WithMLApp`
: optional - _string_
<br />The name of the ML application that the operation belongs to. Overrides the ML app supplied at tracer start. See [Tracing multiple applications](#tracing-multiple-applications).

`llmobs.WithSessionID`
: optional - _string_
<br />The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions).

`llmobs.WithModelName`
: optional - _string_ - **default**: `"custom"`
<br />The name of the invoked model. Ignored for span kinds other than `llm` and `embedding`.

`llmobs.WithModelProvider`
: optional - _string_ - **default**: `"custom"`
<br />The name of the model provider. Ignored for span kinds other than `llm` and `embedding`.
<br />**Note**: To display the estimated cost in US dollars, set the model provider to a [supported provider](#use-case-using-a-common-model-provider).

`llmobs.WithStartTime`
: optional - `time.Time`
<br />An explicit start time for the span. Defaults to the current time.

`llmobs.WithIntegration`
: optional - _string_
<br />The name of the integration that produced the span.

{{% /collapse-content %}}

### Finishing a span

Spans must be finished for the trace to be submitted and visible in Datadog. Use `defer` to guarantee the span is finished even if the function returns early or panics.

{{< code-block lang="go" >}}
span, ctx := llmobs.StartWorkflowSpan(ctx, "handle-user-request")
defer span.Finish()
{{< /code-block >}}

`Finish` accepts the following `llmobs.FinishSpanOption` values:

`llmobs.WithError`
: optional - _error_
<br />Marks the span as errored and records the error message, type, and stack trace. See [Annotating errors](#annotating-errors).

`llmobs.WithFinishTime`
: optional - `time.Time`
<br />An explicit finish time for the span. Defaults to the current time.

### Retrieving the active span

`llmobs.SpanFromContext` returns the active LLMObs span as an `*llmobs.AnySpan`. Convert it to a concrete span kind with the `As*` methods to reach that kind's annotation method.

{{< code-block lang="go" >}}
if span, ok := llmobs.SpanFromContext(ctx); ok {
	if llmSpan, ok := span.AsLLM(); ok {
		llmSpan.AnnotateLLMIO(nil, []llmobs.LLMMessage{{Role: "assistant", Content: "..."}})
	}
}
{{< /code-block >}}

**Note**: The Go SDK has no decorator or function-wrapper API, so it does not automatically capture function arguments, return values, or names. Annotate inputs and outputs explicitly. See [Enriching spans](#enriching-spans).

[1]: /llm_observability/quickstart/terms/
{{% /tab %}}
{{< /tabs >}}

### LLM calls

<div class="alert alert-info">If you are using any LLM providers or frameworks that are supported by <a href="/llm_observability/instrument/auto_instrumentation/">Datadog's LLM integrations</a>, you do not need to manually start an LLM span to trace these operations.</div>

<div class="alert alert-info">If you are manually instrumenting an LLM span, you must record token counts (such as <code>input_tokens</code>, <code>output_tokens</code>, and <code>total_tokens</code>) yourself by annotating the span. See <a href="#enriching-spans">Enriching spans</a> for more information.</div>

{{< tabs >}}
{{% tab "Python" %}}
To trace an LLM call, use the function decorator `ddtrace.llmobs.decorators.llm()`.

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
: required - _string_
<br/>The name of the invoked LLM.

`name`
: optional - _string_
<br/>The name of the operation. If not provided, `name` defaults to the name of the traced function.

`model_provider`
: optional - _string_ - **default**: `"custom"`
<br />The name of the model provider.
<br />**Note**: To display the estimated cost in US dollars, set `model_provider` to one of the following values: `openai`, `azure_openai`, or `anthropic`.

`session_id`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`ml_app`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call(prompt):
    completion = ... # user application logic to invoke LLM
    LLMObs.annotate(
        input_data=[{"role": "user", "content": prompt}],
        output_data=[{"role": "assistant", "content": completion}],
        metrics={"input_tokens": 4, "output_tokens": 6, "total_tokens": 10},
    )
    return completion
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
To trace an LLM call, specify the span kind as `llm`, and optionally specify the following arguments on the options object.

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
<br />**Note**: To display the estimated cost in US dollars, set `modelProvider` to one of the following values: `openai`, `azure_openai`, or `anthropic`.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

{{% /collapse-content %}}

#### Example

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const completion = ... // user application logic to invoke LLM
  llmobs.annotate({
    inputData: [{ role: "user", content: prompt }],
    outputData: [{ role: "assistant", content: completion }],
    metrics: { input_tokens: 4, output_tokens: 6, total_tokens: 10 }
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
To trace an LLM call, import and call the following method with the arguments listed below:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
: optional - _String_
<br/>The name of the operation. If not provided, `spanName` defaults to the span kind.

`modelName`
: optional - _String_ - **default**: `"custom"`
<br/>The name of the invoked LLM.

`modelProvider`
: optional - _String_ - **default**: `"custom"`
<br/>The name of the model provider.
<br />**Note**: To display the estimated cost in US dollars, set `modelProvider` to one of the following values: `openai`, `azure_openai`, or `anthropic`.

`mlApp`
: optional - _String_
<br/>The name of the ML application that the operation belongs to. Supplying a non-null value overrides the ML app name supplied at the start of the application. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

`sessionId`
: optional - _String_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

{{% /collapse-content %}}

#### Example

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeModel() {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String inference = ... // user application logic to invoke LLM
    llmSpan.annotateIO(...); // record the input and output
    llmSpan.setMetrics(Map.of(
      "input_tokens", 617,
      "output_tokens", 338,
      "total_tokens", 955
    ));
    llmSpan.finish();
    return inference;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go (Experimental)" %}}
Use `llmobs.StartLLMSpan` to trace an LLM call, then record the prompt and completion with `AnnotateLLMIO`.

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func invokeModel(ctx context.Context, userInput string) string {
	span, _ := llmobs.StartLLMSpan(ctx, "invoke-llm",
		llmobs.WithModelName("gpt-5.1"),
		llmobs.WithModelProvider("openai"),
	)
	defer span.Finish()

	completion := callProvider(userInput) // user application logic to invoke LLM

	span.AnnotateLLMIO(
		[]llmobs.LLMMessage{
			{Role: "system", Content: "You are a helpful assistant"},
			{Role: "user", Content: userInput},
		},
		[]llmobs.LLMMessage{
			{Role: "assistant", Content: completion},
		},
		llmobs.WithAnnotatedMetrics(map[string]float64{
			llmobs.MetricKeyInputTokens:  50,
			llmobs.MetricKeyOutputTokens: 120,
			llmobs.MetricKeyTotalTokens:  170,
		}),
	)
	return completion
}
{{< /code-block >}}

#### Tool calls and tool results

An `llmobs.LLMMessage` can also carry the tool calls a model requested and the results returned to it.

{{< code-block lang="go" >}}
args, _ := json.Marshal(map[string]any{"city": "Paris"})

span.AnnotateLLMIO(
	[]llmobs.LLMMessage{{Role: "user", Content: "What is the weather in Paris?"}},
	[]llmobs.LLMMessage{{
		Role: "assistant",
		ToolCalls: []llmobs.ToolCall{
			{Name: "get_weather", Arguments: args, ToolID: "call_1", Type: "function"},
		},
	}},
)
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}


### Workflows

{{< tabs >}}
{{% tab "Python" %}}
To trace a workflow span, use the function decorator `ddtrace.llmobs.decorators.workflow()`.

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

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

To trace a workflow span, specify the span kind as `workflow`, and optionally specify arguments on the options object.

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

#### Example

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
To trace a workflow span, import and call the following method with the arguments listed below:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
: optional - _String_
<br/>The name of the operation. If not provided, `spanName` defaults to the span kind.

`mlApp`
: optional - _String_
<br/>The name of the ML application that the operation belongs to. Supplying a non-null value overrides the ML app name supplied at the start of the application. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

`sessionId`
: optional - _String_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

{{% /collapse-content %}}

#### Example

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String executeWorkflow() {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", null, "session-141");
    String workflowResult = workflowFn(); // user application logic
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
    return workflowResult;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go (Experimental)" %}}
Use `llmobs.StartWorkflowSpan` to trace a workflow span, then record its input and output with `AnnotateTextIO`.

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func executeWorkflow(ctx context.Context, question string) string {
	span, ctx := llmobs.StartWorkflowSpan(ctx, "handle-user-request")
	defer span.Finish()

	answer := workflowFn(ctx, question) // user application logic

	span.AnnotateTextIO(question, answer)
	return answer
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}


### Agents

{{< tabs >}}
{{% tab "Python" %}}
To trace an agent execution, use the function decorator `ddtrace.llmobs.decorators.agent()`.

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

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import agent

@agent
def react_agent():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
To trace an agent execution, specify the span kind as `agent`, and optionally specify arguments on the options object.

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

#### Example

{{< code-block lang="javascript" >}}
function reactAgent () {
  ... // user application logic
  return
}
reactAgent = llmobs.wrap({ kind: 'agent' }, reactAgent)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
To trace an agent execution, import and call the following method with the arguments listed below
```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="agent-span-arguments" %}}

`spanName`
: optional - _String_
<br/>The name of the operation. If not provided, `spanName` defaults to the name of the traced function.

`mlApp`
: optional - _String_
<br/>The name of the ML application that the operation belongs to. Supplying a non-null value overrides the ML app name supplied at the start of the application. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

`sessionId`
: optional - _String_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Go (Experimental)" %}}
Use `llmobs.StartAgentSpan` to trace an agent span, then record its input and output with `AnnotateTextIO`.

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func runAgent(ctx context.Context, task string) string {
	span, ctx := llmobs.StartAgentSpan(ctx, "research-agent")
	defer span.Finish()

	result := agentLoop(ctx, task) // user application logic

	span.AnnotateTextIO(task, result)
	return result
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Tool calls

{{< tabs >}}
{{% tab "Python" %}}
To trace a tool call, use the function decorator `ddtrace.llmobs.decorators.tool()`.

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

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import tool

@tool
def call_weather_api():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
To trace a tool call, specify the span kind as `tool`, and optionally specify arguments on the options object.

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

#### Example

{{< code-block lang="javascript" >}}
function callWeatherApi () {
  ... // user application logic
  return
}
callWeatherApi = llmobs.wrap({ kind: 'tool' }, callWeatherApi)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
To trace a tool call, import and call the following method with the arguments listed below:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
: optional - _String_
<br/>The name of the operation. If not provided, `spanName` defaults to the name of the traced function.

`mlApp`
: optional - _String_
<br/>The name of the ML application that the operation belongs to. Supplying a non-null value overrides the ML app name supplied at the start of the application. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

`sessionId`
: optional - _String_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Go (Experimental)" %}}
Use `llmobs.StartToolSpan` to trace a tool span, then record its input and output with `AnnotateTextIO`.

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func getWeather(ctx context.Context, city string) string {
	span, ctx := llmobs.StartToolSpan(ctx, "get_weather")
	defer span.Finish()

	result := weatherAPI(ctx, city) // user application logic

	span.AnnotateTextIO(city, result)
	return result
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Tasks

{{< tabs >}}
{{% tab "Python" %}}
To trace a task span, use the function decorator `LLMObs.task()`.

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

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task

@task
def sanitize_input():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
To trace a task span, specify the span kind as `task`, and optionally specify arguments on the options object.

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

#### Example

{{< code-block lang="javascript" >}}
function sanitizeInput () {
  ... // user application logic
  return
}
sanitizeInput = llmobs.wrap({ kind: 'task' }, sanitizeInput)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
To trace a task span, import and call the following method with the arguments listed below:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Arguments" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
: optional - _String_
<br/>The name of the operation. If not provided, `spanName` defaults to the name of the traced function.

`mlApp`
: optional - _String_
<br/>The name of the ML application that the operation belongs to. Supplying a non-null value overrides the ML app name supplied at the start of the application. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

`sessionId`
: optional - _String_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.


{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Go (Experimental)" %}}
Use `llmobs.StartTaskSpan` to trace a task span, then record its input and output with `AnnotateTextIO`.

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func parseInput(ctx context.Context, raw string) string {
	span, ctx := llmobs.StartTaskSpan(ctx, "parse-input")
	defer span.Finish()

	parsed := parse(ctx, raw) // user application logic

	span.AnnotateTextIO(raw, parsed)
	return parsed
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Embeddings

{{< tabs >}}
{{% tab "Python" %}}
To trace an embedding operation, use the function decorator `LLMObs.embedding()`.

**Note**: Annotating an embedding span's input requires different formatting than other span types. See [Enriching spans](#enriching-spans) for more details on how to specify embedding inputs.

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

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import embedding

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
To trace an embedding operation, specify the span kind as `embedding`, and optionally specify arguments on the options object.

**Note**: Annotating an embedding span's input requires different formatting than other span types. See [Enriching spans](#enriching-spans) for more details on how to specify embedding inputs.

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

#### Example

{{< code-block lang="javascript" >}}
function performEmbedding () {
  ... // user application logic
  return
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)
{{< /code-block >}}


{{% /tab %}}
{{% tab "Go (Experimental)" %}}
Use `llmobs.StartEmbeddingSpan` to trace an embedding span. `AnnotateEmbeddingIO` takes a slice of `llmobs.EmbeddedDocument` as the input and a string as the output.

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func embedQuery(ctx context.Context, query string) []float64 {
	span, _ := llmobs.StartEmbeddingSpan(ctx, "embed-query",
		llmobs.WithModelName("text-embedding-3-small"),
		llmobs.WithModelProvider("openai"),
	)
	defer span.Finish()

	vector := embed(query) // user application logic

	span.AnnotateEmbeddingIO(
		[]llmobs.EmbeddedDocument{{Text: query}},
		"[0.023, -0.918, ...]",
		llmobs.WithAnnotatedMetrics(map[string]float64{
			llmobs.MetricKeyInputTokens: 8,
		}),
	)
	return vector
}
{{< /code-block >}}

`llmobs.EmbeddedDocument` has the following fields:

`Text`
: required - _string_
<br />The text content of the document.

`Name`
: optional - _string_
<br />The name or title of the document.

`ID`
: optional - _string_
<br />The unique identifier of the document.

`Score`
: optional - _float64_
<br />The relevance score of the document, typically between `0.0` and `1.0`.
{{% /tab %}}
{{< /tabs >}}

### Retrievals

{{< tabs >}}
{{% tab "Python" %}}
To trace a retrieval span, use the function decorator `ddtrace.llmobs.decorators.retrieval()`.

**Note**: Annotating a retrieval span's output requires different formatting than other span types. See [Enriching spans](#enriching-spans) for more details on how to specify retrieval outputs.

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

{{% /tab %}}

{{% tab "Node.js" %}}

To trace a retrieval span, specify the span kind as `retrieval`, and optionally specify the following arguments on the options object.

**Note**: Annotating a retrieval span's output requires different formatting than other span types. See [Enriching spans](#enriching-spans) for more details on how to specify retrieval outputs.

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

#### Example

The following also includes an example of annotating a span. See [Enriching spans](#enriching-spans) for more information.

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

{{% /tab %}}
{{% tab "Go (Experimental)" %}}
Use `llmobs.StartRetrievalSpan` to trace a retrieval span. `AnnotateRetrievalIO` takes a string as the input and a slice of `llmobs.RetrievedDocument` as the output.

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func searchDocs(ctx context.Context, query string) []Doc {
	span, _ := llmobs.StartRetrievalSpan(ctx, "search-docs")
	defer span.Finish()

	docs := vectorSearch(query) // user application logic

	span.AnnotateRetrievalIO(
		query,
		[]llmobs.RetrievedDocument{
			{Text: "Paris is the capital of France.", Name: "geography.md", ID: "doc-1", Score: 0.91},
		},
	)
	return docs
}
{{< /code-block >}}

`llmobs.RetrievedDocument` has the following fields:

`Text`
: required - _string_
<br />The text content of the document.

`Name`
: optional - _string_
<br />The name or title of the document.

`ID`
: optional - _string_
<br />The unique identifier of the document.

`Score`
: optional - _float64_
<br />The relevance score of the document, typically between `0.0` and `1.0`.
{{% /tab %}}
{{< /tabs >}}

## Nesting spans

Starting a new span before the current span is finished automatically traces a parent-child relationship between the two spans. The parent span represents the larger operation, while the child span represents a smaller nested sub-operation within it.

{{< tabs >}}
{{% tab "Python" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task, workflow

@workflow
def extract_data(document):
    preprocess_document(document)
    ... # performs data extraction on the document
    return

@task
def preprocess_document(document):
    ... # preprocesses a document for data extraction
    return
{{< /code-block >}}
{{% /tab %}}
{{% tab "Node.js" %}}
{{< code-block lang="javascript" >}}
function preprocessDocument (document) {
  ... // preprocesses a document for data extraction
  return
}
preprocessDocument = llmobs.wrap({ kind: 'task' }, preprocessDocument)

function extractData (document) {
  preprocessDocument(document)
  ... // performs data extraction on the document
  return
}
extractData = llmobs.wrap({ kind: 'workflow' }, extractData)
{{< /code-block >}}
{{% /tab %}}
{{% tab "Java" %}}
{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;

public class MyJavaClass {
  public void preprocessDocument(String document) {
  LLMObsSpan taskSpan = LLMObs.startTaskSpan("preprocessDocument", null, "session-141");
   ...   // preprocess document for data extraction
   taskSpan.annotateIO(...); // record the input and output
   taskSpan.finish();
  }

  public String extractData(String document) {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("extractData", null, "session-141");
    preprocessDocument(document);
    ... // perform data extraction on the document
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
  }
}

{{< /code-block >}}
{{% /tab %}}
{{% tab "Go (Experimental)" %}}
Span constructors return a new `context.Context` carrying the started span. Pass that context to the next constructor to make the new span a child of the current one.

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func handleRequest(ctx context.Context) {
	workflowSpan, ctx := llmobs.StartWorkflowSpan(ctx, "workflow-1")
	defer workflowSpan.Finish()

	// child of workflow-1, because it receives the workflow's context
	llmSpan, ctx := llmobs.StartLLMSpan(ctx, "llm-1", llmobs.WithModelName("gpt-5.1"))
	defer llmSpan.Finish()

	// APM spans can be mixed into the same trace
	apmSpan, _ := tracer.StartSpanFromContext(ctx, "post-process")
	defer apmSpan.Finish()
}
{{< /code-block >}}

**Note**: Parenting is carried on the context. A span started with a context that holds no parent span becomes the root of a new trace. When you launch a goroutine, pass it the context returned by the parent's constructor, so its spans attach to the right parent.
{{% /tab %}}
{{< /tabs >}}


## Enriching spans

<div class="alert alert-info">
The <code>metrics</code> parameter here refers to numeric values attached as attributes on individual spans — not <a href="/llm_observability/investigate/metrics/">Datadog platform metrics</a>. For certain recognized keys such as <code>input_tokens</code>, <code>output_tokens</code>, and <code>total_tokens</code>, Datadog uses these span attributes to generate corresponding platform metrics (such as <code>ml_obs.span.llm.input.tokens</code>) for use in dashboards and monitors.
</div>

{{< tabs >}}
{{% tab "Python" %}}
The SDK provides the method `LLMObs.annotate()` to enrich spans with inputs, outputs, and metadata.

The `LLMObs.annotate()` method accepts the following arguments:

{{% collapse-content title="Arguments" level="h3" expanded=false id="annotating-span-arguments" %}}

`span`
: optional - _Span_ - **default**: the current active span
<br />The span to annotate. If `span` is not provided (as when using function decorators), the SDK annotates the current active span.

`input_data`
: optional - _JSON serializable type or list of dictionaries_
<br />Either a JSON serializable type (for non-LLM spans) or a list of dictionaries with this format: `{"content": "...", "role": "...", "tool_calls": ..., "tool_results": ..., "audio_parts": ..., "image_parts": ...}`, where `"tool_calls"` are an optional list of tool call dictionaries with required keys: `"name"`, `"arguments"`, and optional keys: `"tool_id"`, `"type"`, and `"tool_results"` are an optional list of tool result dictionaries with required key: `"result"`, and optional keys: `"name"`, `"tool_id"`, `"type"` for function calling scenarios. `"audio_parts"` and `"image_parts"` are optional lists of media dictionaries for multimodal spans, each with a required `"mime_type"` and `"content"` (base64-encoded media, carried inline). **Note**: Embedding spans are a special case and require a string or a dictionary (or a list of dictionaries) with this format: `{"text": "..."}`.

`output_data`
: optional - _JSON serializable type or list of dictionaries_
<br />Either a JSON serializable type (for non-LLM spans) or a list of dictionaries with this format: `{"content": "...", "role": "...", "tool_calls": ..., "audio_parts": ..., "image_parts": ...}`, where `"tool_calls"` are an optional list of tool call dictionaries with required keys: `"name"`, `"arguments"`, and optional keys: `"tool_id"`, `"type"` for function calling scenarios. `"audio_parts"` and `"image_parts"` are optional lists of media dictionaries for multimodal spans, each with a required `"mime_type"` and `"content"` (base64-encoded media, carried inline). **Note**: Retrieval spans are a special case and require a string or a dictionary (or a list of dictionaries) with this format: `{"text": "...", "name": "...", "score": float, "id": "..."}`.

`tool_definitions`
: optional - _list of dictionaries_
<br />List of tool definition dictionaries for function calling scenarios. Each tool definition should have a required `"name": "..."` key and optional `"description": "..."` and `"schema": {...}` keys.

`metadata`
: optional - _dictionary_
<br />A dictionary of JSON serializable key-value pairs that users can add as metadata information relevant to the input or output operation described by the span (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: optional - _dictionary_
<br />A dictionary of JSON serializable keys and numeric values that users can add as metrics relevant to the operation described by the span (`input_tokens`, `output_tokens`, `total_tokens`, `time_to_first_token`, etc.). The unit for `time_to_first_token` is in seconds, similar to the `duration` metric which is emitted by default.

`tags`
: optional - _dictionary_
<br />A dictionary of JSON serializable key-value pairs that users can add as tags on the span. Example keys: `session`, `env`, `system`, and `version`. For more information about tags, see [Getting Started with Tags](/getting_started/tagging/).

`cost_tags`
: optional - _list of strings_
<br />A list of tag keys (already set with `tags` or annotated previously on the same span) to propagate as custom tags on the generated LLM cost and token metrics. Entries that don't reference an existing tag key are skipped. See [Cost monitoring](#cost-monitoring) for details.

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

@llm(model_name="gpt-realtime", model_provider="openai")
def voice_turn(user_audio_bytes):
    import base64
    resp = ... # multimodal (audio) llm call here
    LLMObs.annotate(
        span=None,
        input_data=[
            {
                "role": "user",
                "content": "Hey, how are you?",  # transcript of the input audio
                "audio_parts": [
                    {"mime_type": "audio/wav", "content": base64.b64encode(user_audio_bytes).decode("utf-8")}
                ],
            }
        ],
        output_data=[
            {
                "role": "assistant",
                "content": "Hey! I'm doing great, thanks for asking. How about you?",
                "audio_parts": [
                    {"mime_type": "audio/wav", "content": base64.b64encode(resp.audio_bytes).decode("utf-8")}
                ],
            }
        ],
    )
    return resp

@llm(model_name="gpt-4o", model_provider="openai")
def describe_image(image_bytes):
    import base64
    resp = ... # multimodal (vision) llm call here
    LLMObs.annotate(
        span=None,
        input_data=[
            {
                "role": "user",
                "content": "What is in this image?",
                "image_parts": [
                    {"mime_type": "image/png", "content": base64.b64encode(image_bytes).decode("utf-8")}
                ],
            }
        ],
        output_data=[{"role": "assistant", "content": "The image shows a golden retriever puppy."}],
    )
    return resp

{{< /code-block >}}

Messages annotated with `audio_parts` or `image_parts` render as inline audio players and images in the trace view. For rendered examples, supported formats, size limits, and the integrations that populate these fields automatically, see [Multimodal Support](/llm_observability/instrument/multimodal/).

{{% /tab %}}

{{% tab "Node.js" %}}
The SDK provides the method `llmobs.annotate()` to annotate spans with inputs, outputs, and metadata.

The `LLMObs.annotate()` method accepts the following arguments:

{{% collapse-content title="Arguments" level="h3" expanded=false id="annotating-span-arguments" %}}
`span`
: optional - _Span_ - **default**: the current active span
<br />The span to annotate. If `span` is not provided (as when using function wrappers), the SDK annotates the current active span.

`annotationOptions`
: required - _object_
<br />An object of different types of data to annotate the span with.

The `annotationOptions` object can contain the following:

`inputData`
: optional - _JSON serializable type or list of objects_
<br />Either a JSON serializable type (for non-LLM spans) or a list of dictionaries with this format: `{role: "...", content: "...", audioParts: [...], imageParts: [...]}` (for LLM spans). `audioParts` and `imageParts` are optional lists of media objects for multimodal spans, each with a required `mimeType` and `content` (base64-encoded media, carried inline). **Note**: Embedding spans are a special case and require a string or an object (or a list of objects) with this format: `{text: "..."}`.

`outputData`
: optional - _JSON serializable type or list of objects_
<br />Either a JSON serializable type (for non-LLM spans) or a list of objects with this format: `{role: "...", content: "...", audioParts: [...], imageParts: [...]}` (for LLM spans). `audioParts` and `imageParts` are optional lists of media objects for multimodal spans, each with a required `mimeType` and `content` (base64-encoded media, carried inline). **Note**: Retrieval spans are a special case and require a string or an object (or a list of objects) with this format: `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: optional - _object_
<br />An object of JSON serializable key-value pairs that users can add as metadata information relevant to the input or output operation described by the span (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: optional - _object_
<br />An object of JSON serializable keys and numeric values that users can add as metrics relevant to the operation described by the span (`input_tokens`, `output_tokens`, `total_tokens`, etc.).

`tags`
: optional - _object_
<br />An object of JSON serializable key-value pairs that users can add as tags regarding the span's context (`session`, `environment`, `system`, `versioning`, etc.). For more information about tags, see [Getting Started with Tags](/getting_started/tagging/).

`costTags`
: optional - _array of strings_
<br />A list of tag keys (already set with `tags` or annotated previously on the same span) to propagate as custom tags on the generated LLM cost and token metrics. Entries that don't reference an existing tag key are skipped. See [Cost monitoring](#cost-monitoring) for details.

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

function voiceTurn (userAudioBytes) {
  const resp = ... // multimodal (audio) llm call here
  llmobs.annotate({
    inputData: [
      {
        role: "user",
        content: "Hey, how are you?", // transcript of the input audio
        audioParts: [{ mimeType: "audio/wav", content: userAudioBytes.toString("base64") }]
      }
    ],
    outputData: [
      {
        role: "assistant",
        content: "Hey! I'm doing great, thanks for asking. How about you?",
        audioParts: [{ mimeType: "audio/wav", content: resp.audioBuffer.toString("base64") }]
      }
    ]
  })
  return resp
}
voiceTurn = llmobs.wrap({ kind: 'llm', modelName: 'gpt-audio', modelProvider: 'openai' }, voiceTurn)

function describeImage (imageBytes) {
  const resp = ... // multimodal (vision) llm call here
  llmobs.annotate({
    inputData: [
      {
        role: "user",
        content: "What is in this image?",
        imageParts: [{ mimeType: "image/png", content: imageBytes.toString("base64") }]
      }
    ],
    outputData: [{ role: "assistant", content: "The image shows a golden retriever puppy." }]
  })
  return resp
}
describeImage = llmobs.wrap({ kind: 'llm', modelName: 'gpt-4o', modelProvider: 'openai' }, describeImage)

{{< /code-block >}}

Messages annotated with `audioParts` or `imageParts` render as inline audio players and images in the trace view. For rendered examples, supported formats, size limits, and the integrations that populate these fields automatically, see [Multimodal Support](/llm_observability/instrument/multimodal/).

For OpenAI audio chat completions, `audioParts` are also captured automatically by [Datadog's LLM integrations](/llm_observability/instrument/auto_instrumentation/), with no manual annotation required. The Node.js SDK does not capture `imageParts` automatically. Annotate them as shown above.

{{% /tab %}}
{{% tab "Java" %}}
The SDK provides several methods to annotate spans with inputs, outputs, metrics, and metadata.

### Annotating inputs and outputs

Use the `annotateIO()` member method of the `LLMObsSpan` interface to add structured input and output data to an `LLMObsSpan`. This includes optional arguments and LLM message objects.

#### Arguments

If an argument is null or empty, nothing happens. For example, if `inputData` is a non-empty string while `outputData` is null, then only `inputData` is recorded.

`inputData`
: optional - _String_ or _List<LLMObs.LLMMessage>_
<br />Either a string (for non-LLM spans) or a list of `LLMObs.LLMMessage`s for LLM spans.

`outputData`
: optional - _String_ or _List<LLMObs.LLMMessage>_
<br />Either a string (for non-LLM spans) or a list of `LLMObs.LLMMessage`s for LLM spans.

#### LLM Messages
LLM spans must be annotated with LLM Messages using the `LLMObs.LLMMessage` object.

The `LLMObs.LLMMessage` object can be instantiated by calling `LLMObs.LLMMessage.from()` with the following arguments:

`role`
: required - _String_
<br />A string describing the role of the author of the message.

`content`
: required - _String_
<br />A string containing the content of the message.

#### Example

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String systemMessage = "You are a helpful assistant";
    Response chatResponse = ... // user application logic to invoke LLM
    llmSpan.annotateIO(
      Arrays.asList(
        LLMObs.LLMMessage.from("user", userInput),
        LLMObs.LLMMessage.from("system", systemMessage)
      ),
      Arrays.asList(
        LLMObs.LLMMessage.from(chatResponse.role, chatResponse.content)
      )
    );
    llmSpan.finish();
    return chatResponse;
  }
}
```

### Adding metrics

#### Bulk add metrics

The `setMetrics()` member method of the `LLMObsSpan` interface accepts the following arguments to attach multiple metrics in bulk:

##### Arguments

`metrics`
: required - _Map<String, Number>_
<br /> A map of JSON-serializable keys and numeric values that users can add to record metrics relevant to the operation described by the span (for example, `input_tokens`, `output_tokens`, or `total_tokens`).

#### Add a single metric

The `setMetric()` member method of the `LLMObsSpan` interface accepts the following arguments to attach a single metric:

##### Arguments

`key`
: required - _CharSequence_
<br /> The name of the metric.

`value`
: required - _int_, _long_, or _double_
<br /> The value of the metric.

#### Examples

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = ... // user application logic to invoke LLM
    llmSpan.setMetrics(Map.of(
      "input_tokens", 617,
      "output_tokens", 338,
      "time_per_output_token", 0.1773
    ));
    llmSpan.setMetric("total_tokens", 955);
    llmSpan.setMetric("time_to_first_token", 0.23);
    llmSpan.finish();
    return chatResponse;
  }
}
```

### Adding tags

For more information about tags, see [Getting Started with Tags][1].

#### Bulk add tags

The `setTags()` member method of the `LLMObsSpan` interface accepts the following arguments to attach multiple tags in bulk:

##### Arguments

`tags`
: required - _Map<String, Object>_
<br /> A map of JSON-serializable key-value pairs that users can add as tags to describe the span's context (for example, `session`, `environment`, `system`, or `version`).

#### Add a single tag

The `setTag()` member method of the `LLMObsSpan` interface accepts the following arguments to attach a single tag:

##### Arguments

`key`
: required - _String_
<br /> The key of the tag.

`value`
: required - _int_, _long_, _double_, _boolean_, or _String_
<br /> The value of the tag.

#### Examples

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = ... // user application logic to invoke LLM
    llmSpan.setTags(Map.of(
      "chat_source", "web",
      "users_in_chat", 3
    ));
    llmSpan.setTag("is_premium_user", true);
    llmSpan.finish();
    return chatResponse;
  }
}
```

### Annotating errors

#### Adding a Throwable (recommended)

The `addThrowable()` member method of the `LLMObsSpan` interface accepts the following argument to attach a throwable with a stack trace:

##### Arguments

`throwable`
: required - _Throwable_
<br /> The throwable/exception that occurred.

#### Adding an error message

The `setErrorMessage()` member method of the `LLMObsSpan` interface accepts the following argument to attach an error string:

##### Arguments

`errorMessage`
: required - _String_
<br /> The message of the error.

#### Setting an error flag

The `setError()` member method of the `LLMObsSpan` interface accepts the following argument to indicate an error with the operation:

##### Arguments

`error`
: required - _boolean_
<br /> `true` if the span errored.

#### Examples

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      llmSpan.finish();
    }
    return chatResponse;
  }
}
```

### Annotating metadata

The `setMetadata()` member method of the `LLMObsSpan` interface accepts the following arguments:

`metadata`
: required - _Map<String, Object>_
<br />A map of JSON-serializable key-value pairs that contains metadata relevant to the input or output operation described by the span.

#### Example
```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    llmSpan.setMetadata(
      Map.of(
        "temperature", 0.5,
        "is_premium_member", true,
        "class", "e1"
      )
    );
    String chatResponse = ... // user application logic to invoke LLM
    return chatResponse;
  }
}
```

[1]: /getting_started/tagging/
{{% /tab %}}
{{% tab "Go (Experimental)" %}}
Each span kind exposes a typed method for annotating its input and output, and every span exposes a generic `Annotate` method that accepts the `llmobs.AnnotateOption` values below.

### Annotating inputs and outputs

Use the annotation method matching the span kind:

- `AnnotateLLMIO(input, output []llmobs.LLMMessage, opts ...)` on `llm` spans
- `AnnotateEmbeddingIO(input []llmobs.EmbeddedDocument, output string, opts ...)` on `embedding` spans
- `AnnotateRetrievalIO(input string, output []llmobs.RetrievedDocument, opts ...)` on `retrieval` spans
- `AnnotateTextIO(input, output string, opts ...)` on `workflow`, `agent`, `tool`, and `task` spans

`llmobs.LLMMessage` has the following fields:

`Role`
: required - _string_
<br />The role of the message author, for example `system`, `user`, or `assistant`.

`Content`
: required - _string_
<br />The text content of the message.

`ToolCalls`
: optional - _[]llmobs.ToolCall_
<br />The tool calls made in this message.

`ToolResults`
: optional - _[]llmobs.ToolResult_
<br />The results of tool calls in this message.

### Adding metrics

Use `llmobs.WithAnnotatedMetrics` with a `map[string]float64`. The `llmobs` package exports constants for the recognized keys.

{{< code-block lang="go" >}}
span.Annotate(llmobs.WithAnnotatedMetrics(map[string]float64{
	llmobs.MetricKeyInputTokens:            50,
	llmobs.MetricKeyOutputTokens:           120,
	llmobs.MetricKeyTotalTokens:            170,
	llmobs.MetricKeyCacheReadInputTokens:   22,
	llmobs.MetricKeyCacheWriteInputTokens:  15,
	llmobs.MetricKeyReasoningOutputTokens:  30,
	llmobs.MetricKeyTimeToFirstToken:       0.25,
	llmobs.MetricKeyBillableCharacterCount: 900,
}))
{{< /code-block >}}

| Constant | Key |
|---|---|
| `llmobs.MetricKeyInputTokens` | `input_tokens` |
| `llmobs.MetricKeyOutputTokens` | `output_tokens` |
| `llmobs.MetricKeyTotalTokens` | `total_tokens` |
| `llmobs.MetricKeyCacheReadInputTokens` | `cache_read_input_tokens` |
| `llmobs.MetricKeyCacheWriteInputTokens` | `cache_write_input_tokens` |
| `llmobs.MetricKeyReasoningOutputTokens` | `reasoning_output_tokens` |
| `llmobs.MetricKeyBillableCharacterCount` | `billable_character_count` |
| `llmobs.MetricKeyTimeToFirstToken` | `time_to_first_token` |

Keys that are not in this list are accepted as custom metrics, including the `input_cost` and `output_cost` keys used for [manual cost tracking](#use-case-using-a-custom-model).

### Adding tags

Use `llmobs.WithAnnotatedTags` with a `map[string]string`.

{{< code-block lang="go" >}}
span.Annotate(llmobs.WithAnnotatedTags(map[string]string{
	"team":        "nlp",
	"host":        "host_name",
	"feature":     "chatbot",
	"user_handle": "poodle@dog.com",
}))
{{< /code-block >}}

### Annotating errors

Pass `llmobs.WithError` to `Finish` to mark the span as errored. The SDK records the error message, type, and stack trace.

{{< code-block lang="go" >}}
func invokeModel(ctx context.Context) (string, error) {
	span, _ := llmobs.StartLLMSpan(ctx, "invoke-llm")

	completion, err := invokeProvider(ctx)
	if err != nil {
		span.Finish(llmobs.WithError(err))
		return "", err
	}

	span.Finish()
	return completion, nil
}
{{< /code-block >}}

To keep a single `defer`, capture the error in a named return value:

{{< code-block lang="go" >}}
func invokeModel(ctx context.Context) (completion string, err error) {
	span, _ := llmobs.StartLLMSpan(ctx, "invoke-llm")
	defer func() { span.Finish(llmobs.WithError(err)) }()

	completion, err = invokeProvider(ctx)
	return completion, err
}
{{< /code-block >}}

**Note**: `llmobs.WithError(nil)` is a no-op, so the deferred call above does not mark successful spans as errored.

### Annotating metadata

Use `llmobs.WithAnnotatedMetadata` with a `map[string]any` to record parameters and other contextual data.

{{< code-block lang="go" >}}
span.Annotate(llmobs.WithAnnotatedMetadata(map[string]any{
	"temperature": 0.7,
	"max_tokens":  200,
}))
{{< /code-block >}}

### Other annotation options

`llmobs.WithAnnotatedSessionID`
: optional - _string_
<br />The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions).

`llmobs.WithAnnotatedPrompt`
: optional - _llmobs.Prompt_
<br />Structured prompt metadata. Requires `dd-trace-go` v2.8.0+. See [Prompt tracking](#prompt-tracking).

`llmobs.WithAnnotatedToolDefinitions`
: optional - _[]llmobs.ToolDefinition_
<br />The tool definitions made available to the model for this call. Requires `dd-trace-go` v2.8.0+.

`llmobs.WithAnnotatedCostTagKeys`
: optional - _[]string_
<br />Span tag keys to propagate onto the cost and token metrics. Requires `dd-trace-go` v2.10.0+. See [Adding custom tags to cost and tokens metrics](#adding-custom-tags-to-cost-and-tokens-metrics).

`llmobs.WithAnnotatedIntent`
: optional - _string_
<br />A description of why a tool was called, recorded on `tool` spans. Requires `dd-trace-go` v2.8.0+.
{{% /tab %}}
{{< /tabs >}}

### Annotating auto-instrumented spans

{{< tabs >}}
{{% tab "Python" %}}

The SDK's `LLMObs.annotation_context()` method returns a context manager that can be used to modify all auto-instrumented spans started while the annotation context is active.

The `LLMObs.annotation_context()` method accepts the following arguments:

{{% collapse-content title="Arguments" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: optional - _str_
<br />Name that overrides the span name for any auto-instrumented spans that are started within the annotation context.

`prompt`
: optional - _dictionary_
<br />A dictionary that represents the prompt used for an LLM call. See the [Prompt object](#prompt-tracking-arguments) documentation for the complete schema and supported keys. You can also import the `Prompt` object from `ddtrace.llmobs.utils` and pass it in as the `prompt` argument. **Note**: This argument only applies to LLM spans.

`tags`
: optional - _dictionary_
<br />A dictionary of JSON serializable key-value pairs that users can add as tags on the span. Example keys: `session`, `env`, `system`, and `version`. For more information about tags, see [Getting Started with Tags](/getting_started/tagging/).

`cost_tags`
: optional - _list of strings_
<br />A list of tag keys to propagate as custom tags on the generated LLM cost and token metrics. Each entry must reference a key present in `tags` at span start (supplied to the same context or a parent context); tag keys added later with `LLMObs.annotate()` are not retained. See [Cost monitoring](#cost-monitoring) for details.

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
            id="chatbot_prompt",
            version="1.0.0",
            template="Please answer the question using the provided context: {{question}}\n\nContext:\n{{context}}",
            variables={
                "question": user_question,
                "context": context_str,
            }
        ),
        tags = {
            "retrieval_strategy": "semantic_similarity"
        },
        name = "augmented_generation"
    ):
        completion = openai_client.chat.completions.create(...)
    return completion.choices[0].message.content

{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

The SDK's `llmobs.annotationContext()` accepts a callback function that can be used to modify all auto-instrumented spans started while inside the scope of the callback function.

The `llmobs.annotationContext()` method accepts the following options on the first argument:

{{% collapse-content title="Options" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: optional - _str_
<br />Name that overrides the span name for any auto-instrumented spans that are started within the annotation context.

`tags`
: optional - _object_
<br />An object of JSON serializable key-value pairs that users can add as tags on the span. Example keys: `session`, `env`, `system`, and `version`. For more information about tags, see [Getting Started with Tags](/getting_started/tagging/).

`costTags`
: optional - _array of strings_
<br />A list of tag keys to propagate as custom tags on the generated LLM cost and token metrics. Each entry must reference a key present in `tags` at span start (supplied to the same context or a parent context); tag keys added later with `llmobs.annotate()` are not retained. See [Cost monitoring](#cost-monitoring) for details.

{{% /collapse-content %}}

#### Example

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function ragWorkflow(userQuestion) {
    const contextStr = retrieveDocuments(userQuestion).join(" ");

    const completion = await llmobs.annotationContext({
      tags: {
        retrieval_strategy: "semantic_similarity"
      },
      name: "augmented_generation"
    }, async () => {
      const completion = await openai_client.chat.completions.create(...);
      return completion.choices[0].message.content;
    });
}

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Prompt tracking

Attach structured prompt metadata to the LLM span so you can reproduce results, audit changes, and compare prompt performance across versions. When using templates, Agent Observability also provides [version tracking](#version-tracking) based on template content changes.

{{< tabs >}}
{{% tab "Python" %}}
Use `LLMObs.annotation_context(prompt=...)` to attach prompt metadata before the LLM call. For more details on span annotation, see [Enriching spans](#enriching-spans).

#### Arguments

{{% collapse-content title="Arguments" level="h5" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: required - dictionary
<br />A typed dictionary that follows the Prompt schema below.

{{% /collapse-content %}}

{{% collapse-content title="Prompt structure" level="h5" expanded=false id="prompt-structure" %}}

Supported keys:

- `id` (str): Logical identifier for this prompt. Should be unique per `ml_app`. Defaults to `{ml_app}-unnamed_prompt`
- `version` (str): Version tag for the prompt (for example, "1.0.0"). See [version tracking](#version-tracking) for more details.
- `variables` (Dict[str, str]): Variables used to populate the template placeholders.
- `template` (str): Template string with placeholders (for example, `"Translate {{text}} to {{lang}}"`).
- `chat_template` (List[Message]): Multi-message template form. Provide a list of `{ "role": "<role>", "content": "<template string with placeholders>" }` objects.
- `tags` (Dict[str, str]): Tags to attach to the prompt run.
- `rag_context_variables` (List[str]): Variable keys that contain ground-truth/context content. Used for [hallucination detection](/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#hallucination).
- `rag_query_variables` (List[str]): Variable keys that contain the user query. Used for [hallucination detection](/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#hallucination).

{{% /collapse-content %}}

#### Example: single-template prompt

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def answer_question(text):
    # Attach prompt metadata to the upcoming LLM span using LLMObs.annotation_context()
    with LLMObs.annotation_context(prompt={
        "id": "translation-template",
        "version": "1.0.0",
        "chat_template": [{"role": "user", "content": "Translate to {{lang}}: {{text}}"}],
        "variables": {"lang": "fr", "text": text},
        "tags": {"team": "nlp"}
    }):
        # Example provider call (replace with your client)
        completion = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": f"Translate to fr: {text}"}]
        )
    return completion
{{< /code-block >}}

#### Example: LangChain prompt templates

When you use LangChain's prompt templating with auto-instrumentation, assign templates to variables with meaningful names. Auto-instrumentation uses these names to identify prompts.

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Use `llmobs.annotationContext({ prompt: ... }, () => { ... })` to attach prompt metadata before the LLM call. For more details on span annotation, see [Enriching spans](#enriching-spans).

#### Arguments

{{% collapse-content title="Options" level="h5" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: required - object
<br />An object that follows the Prompt schema below.

{{% /collapse-content %}}

{{% collapse-content title="Prompt structure" level="h5" expanded=false id="prompt-structure" %}}

Supported properties:

- `id` (string): Logical identifier for this prompt. Should be unique per `ml_app`. Defaults to `{ml_app}-unnamed_prompt`
- `version` (string): Version tag for the prompt (for example, "1.0.0"). See [version tracking](#version-tracking) for more details.
- `variables` (Record<string, string>): Variables used to populate the template placeholders.
- `template` (string | List[Message]): Template string with placeholders (for example, `"Translate {{text}} to {{lang}}"`). Alternatively, a list of `{ "role": "<role>", "content": "<template string with placeholders>" }` objects.
- `tags` (Record<string, string>): Tags to attach to the prompt run.
- `contextVariables` (string[]): Variable keys that contain ground-truth/context content. Used for [hallucination detection](/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#hallucination).
- `queryVariables` (string[]): Variable keys that contain the user query. Used for [hallucination detection](/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#hallucination).

{{% /collapse-content %}}

#### Example: single-template prompt

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function answerQuestion(text) {
    // Attach prompt metadata to the upcoming LLM span using LLMObs.annotation_context()
    return llmobs.annotationContext({
      prompt: {
        id: "translation-template",
        version: "1.0.0",
        chat_template: [{"role": "user", "content": "Translate to {{lang}}: {{text}}"}],
        variables: {"lang": "fr", "text": text},
        tags: {"team": "nlp"}
      }
    }, () => {
      // Example provider call (replace with your client)
      return openaiClient.chat.completions.create({
          model: "gpt-4o",
          messages: [{"role": "user", "content": f"Translate to fr: {text}"}]
        });
    });
}
{{< /code-block >}}

{{% /tab %}}

{{% tab "Go (Experimental)" %}}
Use `llmobs.WithAnnotatedPrompt` to attach prompt metadata to an LLM span. Requires `dd-trace-go` v2.8.0+. For more details on span annotation, see [Enriching spans](#enriching-spans).

{{% collapse-content title="Prompt structure" level="h5" expanded=false id="go-prompt-structure" %}}

`llmobs.Prompt` has the following fields:

- `ID` (_string_): Logical identifier for this prompt. Should be unique per ML app.
- `Version` (_string_): Version tag for the prompt, for example `"1.0.0"`. See [version tracking](#version-tracking).
- `Label` (_string_): Deployment label for the prompt, for example `"production"` or `"staging"`.
- `Template` (_string_): Template string with placeholders, for example `"Translate {{text}} to {{lang}}"`. Mutually exclusive with `ChatTemplate`; if both are set, `Template` is dropped.
- `ChatTemplate` (_[]llmobs.LLMMessage_): Multi-message template form. Mutually exclusive with `Template`.
- `Variables` (_map[string]string_): Variables used to populate the template placeholders.
- `Tags` (_map[string]string_): Tags to attach to the prompt run.
- `RAGContextVariables` (_[]string_): Variable keys that contain ground-truth or context content. Used for [hallucination detection](/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#hallucination).
- `RAGQueryVariables` (_[]string_): Variable keys that contain the user query. Used for [hallucination detection](/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#hallucination).

{{% /collapse-content %}}

#### Example: chat-template prompt

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func answerQuestion(ctx context.Context, text string) string {
	span, _ := llmobs.StartLLMSpan(ctx, "answer-question",
		llmobs.WithModelName("gpt-5.1"),
		llmobs.WithModelProvider("openai"),
	)
	defer span.Finish()

	span.Annotate(llmobs.WithAnnotatedPrompt(llmobs.Prompt{
		ID:      "translation-template",
		Version: "1.0.0",
		ChatTemplate: []llmobs.LLMMessage{
			{Role: "user", Content: "Translate to {{lang}}: {{text}}"},
		},
		Variables: map[string]string{"lang": "fr", "text": text},
		Tags:      map[string]string{"team": "nlp"},
	}))

	completion := callProvider(text) // user application logic
	span.AnnotateLLMIO(
		[]llmobs.LLMMessage{{Role: "user", Content: "Translate to fr: " + text}},
		[]llmobs.LLMMessage{{Role: "assistant", Content: completion}},
	)
	return completion
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### Notes
- Annotating a prompt is only available on LLM spans.
- Place the annotation immediately before the provider call so it applies to the correct LLM span.
- Use a unique prompt `id` to distinguish different prompts within your application.
- Keep templates static by using placeholder syntax (like `{{variable_name}}`) and define dynamic content in the `variables` section.
- For multiple auto-instrumented LLM calls within a block, use an annotation context to apply the same prompt metadata across calls. See [Annotating auto-instrumented spans](#annotating-auto-instrumented-spans).

### Version tracking

Agent Observability provides automatic versioning for your prompts when no explicit version is specified. When you provide a `template` or `chat_template` in your prompt metadata without a `version` tag, the system automatically generates a version by computing a hash of the template content. If you do provide a `version` tag, Agent Observability uses your specified version label instead of auto-generating one.

The versioning system works as follows:
- **Auto versioning**: When no `version` tag is provided, Agent Observability computes a hash of the `template` or `chat_template` content to automatically generate a numerical version identifier
- **Manual versioning**: When a `version` tag is provided, Agent Observability uses your specified version label exactly as provided
- **Version history**: Both auto-generated and manual versions are maintained in the version history to track prompt evolution over time

This gives you the flexibility to either rely on automatic version management based on template content changes, or maintain full control over versioning with your own version labels.

## MCP intent capture

To gain insight into why your MCP tools were called, enable intent capture on your MCP server. When enabled, the SDK adds an argument to every MCP server tool requesting that the calling model describe why it chose to call the tool. The intent is recorded on the tool span, helping you improve your tool definitions and descriptions.

{{< tabs >}}
{{% tab "Python" %}}

Enable MCP intent capture with the `DD_MCP_CAPTURE_INTENT` environment variable:

{{< code-block lang="shell" >}}
DD_MCP_CAPTURE_INTENT=1 DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

Or, enable it programmatically with the `capture_intent` parameter on `LLMObs.enable()`:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  capture_intent=True,
)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Cost monitoring
Attach token metrics (for automatic cost tracking) or cost metrics (for manual cost tracking) to your LLM/embedding spans. Token metrics allow Datadog to calculate costs using provider pricing, while cost metrics let you supply your own pricing when using custom or unsupported models. For more details, see [Costs][14].

If you're using automatic instrumentation, token and cost metrics appear on your spans automatically. If you're instrumenting manually, follow the guidance below.

<div class="alert alert-info">In this context, "token metrics" and "cost metrics" refer to numeric key-value pairs you attach to spans through the <code>metrics</code> parameter of the <code>LLMObs.annotate()</code> method. These are distinct from <a href="/llm_observability/investigate/metrics/">Datadog platform Agent Observability metrics</a>. For recognized keys such as <code>input_tokens</code>, <code>output_tokens</code>, <code>input_cost</code>, and <code>output_cost</code>, Datadog uses these span attributes to generate corresponding platform metrics (such as <code>ml_obs.span.llm.input.cost</code>) for use in dashboards and monitors.</div>

### Use case: Using a common model provider
Datadog supports common model providers such as OpenAI, Azure OpenAI, Anthropic, and Google Gemini. When using these providers, you only need to annotate your LLM request with the model name, model provider, and token usage. Datadog automatically calculates the estimated cost based on the provider's pricing.

To learn more about what each token represents and how Datadog calculates them, see [How token counts are calculated][16].

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="gpt-5.1", model_provider="openai")
def llm_call(prompt):
    resp = ... # llm call here
    # Annotate token metrics
    LLMObs.annotate(
        metrics={
          "input_tokens": 50,
          "output_tokens": 120,
          "total_tokens": 170,
          "non_cached_input_tokens": 13,  # optional
          "cache_read_input_tokens": 22,  # optional
          "cache_write_input_tokens": 15, # optional
        },
    )
    return resp
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: {
      input_tokens: 50,
      output_tokens: 120,
      total_tokens: 170,
      non_cached_input_tokens: 13,  // optional
      cache_read_input_tokens: 22,  // optional
      cache_write_input_tokens: 15  // optional
    }
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'gpt-5.1', modelProvider: 'openai' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;
import java.util.Map;

public class MyJavaClass {
  public String llmCall(String prompt) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("llm-call", "gpt-5.1", "openai", null, null);
    String resp = ... // llm call here
    llmSpan.setMetrics(Map.of(
      "input_tokens", 50,
      "output_tokens", 120,
      "total_tokens", 170,
      "non_cached_input_tokens", 13,  // optional
      "cache_read_input_tokens", 22,  // optional
      "cache_write_input_tokens", 15  // optional
    ));
    llmSpan.finish();
    return resp;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go (Experimental)" %}}
{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func llmCall(ctx context.Context, prompt string) string {
	span, _ := llmobs.StartLLMSpan(ctx, "llm-call",
		llmobs.WithModelName("gpt-5.1"),
		llmobs.WithModelProvider("openai"),
	)
	defer span.Finish()

	resp := callProvider(prompt) // llm call here

	span.Annotate(llmobs.WithAnnotatedMetrics(map[string]float64{
		llmobs.MetricKeyInputTokens:           50,
		llmobs.MetricKeyOutputTokens:          120,
		llmobs.MetricKeyTotalTokens:           170,
		llmobs.MetricKeyCacheReadInputTokens:  22, // optional
		llmobs.MetricKeyCacheWriteInputTokens: 15, // optional
	}))
	return resp
}
{{< /code-block >}}

**Note**: `dd-trace-go` has no LLM provider integrations, so token counts are never captured automatically. Record them yourself on every manually instrumented `llm` and `embedding` span, otherwise Datadog cannot estimate cost.
{{% /tab %}}
{{< /tabs >}}

### Use case: Using a custom model
For custom or unsupported models, you must annotate the span manually with the cost data in dollars.

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="custom_model", model_provider="model_provider")
def llm_call(prompt):
    resp = ... # llm call here
    # Annotate cost metrics
    LLMObs.annotate(
        metrics={
          "input_cost": 3,
          "output_cost": 7,
          "total_cost": 10,
          "non_cached_input_cost": 1,    # optional
          "cache_read_input_cost": 0.6,  # optional
          "cache_write_input_cost": 1.4, # optional
        },
    )
    return resp
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: {
      input_cost: 3,
      output_cost: 7,
      total_cost: 10,
      non_cached_input_cost: 1,    // optional
      cache_read_input_cost: 0.6,  // optional
      cache_write_input_cost: 1.4  // optional
    }
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'custom_model', modelProvider: 'model_provider' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;
import java.util.Map;

public class MyJavaClass {
  public String llmCall(String prompt) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("llm-call", "custom_model", "model_provider", null, null);
    String resp = ... // llm call here
    llmSpan.setMetrics(Map.of(
      "input_cost", 3,
      "output_cost", 7,
      "total_cost", 10,
      "non_cached_input_cost", 1,    // optional
      "cache_read_input_cost", 0.6,  // optional
      "cache_write_input_cost", 1.4  // optional
    ));
    llmSpan.finish();
    return resp;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go (Experimental)" %}}
{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func llmCall(ctx context.Context, prompt string) string {
	span, _ := llmobs.StartLLMSpan(ctx, "llm-call",
		llmobs.WithModelName("my-custom-model"),
		llmobs.WithModelProvider("my-company"),
	)
	defer span.Finish()

	resp := callProvider(prompt) // llm call here

	span.Annotate(llmobs.WithAnnotatedMetrics(map[string]float64{
		"input_cost":  0.0021,
		"output_cost": 0.0048,
	}))
	return resp
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Adding custom tags to cost and tokens metrics
By default, the LLM cost and token metrics carry a fixed set of OOTB tags such as `model_name`, `model_provider`, and `ml_app`. To slice LLM spend by attributes specific to your application — such as team, customer, or feature — mark a subset of the span's existing tag keys to propagate to those metrics as custom tags. For example use cases like custom dashboards and monitors, see [Custom tags on cost and tokens metrics][15].

Each entry must be a string and must reference a key already supplied through the span's `tags` parameter at the time the annotation is applied. When annotating a single span, the key can be supplied through `tags` in the same annotation call or in an earlier annotation on the same span. When using an annotation context, only keys present in `tags` at span start qualify — keys added later through individual span annotations are not retained. Entries that don't reference an existing tag key are skipped.

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="gpt-5.1", model_provider="openai")
def llm_call(prompt):
    resp = ... # llm call here
    LLMObs.annotate(
        metrics={"input_tokens": 50, "output_tokens": 120, "total_tokens": 170},
        tags={"team": "nlp", "customer_tier": "enterprise", "host": "host_name"},
        cost_tags=["team", "customer_tier"],
    )
    return resp
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: { input_tokens: 50, output_tokens: 120, total_tokens: 170 },
    tags: { team: 'nlp', customer_tier: 'enterprise', host: 'host_name' },
    costTags: ['team', 'customer_tier']
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'gpt-5.1', modelProvider: 'openai' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go (Experimental)" %}}
Requires `dd-trace-go` v2.10.0+.

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func llmCall(ctx context.Context, prompt string) string {
	span, _ := llmobs.StartLLMSpan(ctx, "llm-call",
		llmobs.WithModelName("gpt-5.1"),
		llmobs.WithModelProvider("openai"),
	)
	defer span.Finish()

	resp := callProvider(prompt) // llm call here

	span.Annotate(
		llmobs.WithAnnotatedMetrics(map[string]float64{
			llmobs.MetricKeyInputTokens:  50,
			llmobs.MetricKeyOutputTokens: 120,
			llmobs.MetricKeyTotalTokens:  170,
		}),
		llmobs.WithAnnotatedTags(map[string]string{
			"team":          "nlp",
			"customer_tier": "enterprise",
			"host":          "host_name",
		}),
		llmobs.WithAnnotatedCostTagKeys([]string{"team", "customer_tier"}),
	)
	return resp
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

You can also propagate tags this way through an annotation context to apply it to all auto-instrumented spans started inside the context.

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
with LLMObs.annotation_context(
    tags={"team": "nlp", "customer_tier": "enterprise"},
    cost_tags=["team", "customer_tier"],
):
    resp = ... # llm call here
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
llmobs.annotationContext({
  tags: { team: 'nlp', customer_tier: 'enterprise' },
  costTags: ['team', 'customer_tier']
}, () => {
  const resp = ... // llm call here
})
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Evaluations

The Agent Observability SDK provides methods to export and submit your evaluations to Datadog.

<div class="alert alert-info">For building reusable, class-based evaluators (<code>BaseEvaluator</code>, <code>BaseSummaryEvaluator</code>) with rich result metadata, see the <a href="/llm_observability/investigate/evaluations/evaluation_developer_guide/">Evaluation Developer Guide</a>.</div>

Evaluations must be joined to a single span. You can identify the target span using either of these two methods:
- _Tag-based joining_ - Join an evaluation using a unique key-value tag pair that is set on a single span. The evaluation will fail to join if the tag key-value pair matches multiple spans or no spans.
- _Direct span reference_ - Join an evaluation using the span's unique trace ID and span ID combination.

### Exporting a span

<div class="alert alert-info">The Go SDK has no span export method. Pass the span directly to <code>llmobs.SubmitEvaluationFromSpan</code> instead. See <a href="#submitting-evaluations">Submitting evaluations</a>.</div>

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
`LLMObs.submit_evaluation()` can be used to submit your custom evaluation associated with a given span.

<div class="alert alert-info"><code>LLMObs.submit_evaluation_for</code> is deprecated and will be removed in the next major version of ddtrace (4.0). To migrate, rename your <code>LLMObs.submit_evaluation_for</code> calls with <code>LLMObs.submit_evaluation</code>.</div>

**Note**: Custom evaluations are evaluators that you implement and host yourself. These differ from out-of-the-box evaluations, which are automatically computed by Datadog using built-in evaluators. To configure out-of-the-box evaluations for your application, use the [**Agent Observability** > **Settings** > **Evaluations**][1] page in Datadog.

The `LLMObs.submit_evaluation()` method accepts the following arguments:

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}
`label`
: required - _string_
<br />The name of the evaluation.

`metric_type`
: required - _string_
<br />The type of the evaluation. Must be `categorical`, `score`, `boolean` or `json`.

`value`
: required - _string, numeric type, or dict_
<br />The value of the evaluation. Must be a string (`metric_type==categorical`), integer/float (`metric_type==score`), boolean (`metric_type==boolean`), or dict (`metric_type==json`).

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
<br />A dictionary of string key-value pairs that users can add as tags regarding the evaluation. For more information about tags, see [Getting Started with Tags](/getting_started/tagging/).

`assessment`
: optional - _string_
<br />An assessment of this evaluation. Accepted values are `pass` and `fail`.

`reasoning`
: optional - _string_
<br />A text explanation of the evaluation result.

`metadata`
: optional - _dictionary_
<br />A dictionary containing arbitrary structured metadata associated with the evaluation result.
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

    LLMObs.submit_evaluation(
        span_with_tag_value = {
            "tag_key": "msg_id",
            "tag_value": msg_id
        },
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
        assessment="fail",
        reasoning="Malicious intent was detected in the user instructions.",
        metadata={"details": ["jailbreak", "SQL injection"]}
    )

    # joining an evaluation to a span via span ID and trace ID
    span_context = LLMObs.export_span(span=None)
    LLMObs.submit_evaluation(
        span_context = span_context,
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
        assessment="fail",
        reasoning="Malicious intent was detected in the user instructions.",
        metadata={"details": ["jailbreak", "SQL injection"]}
    )
    return completion
{{< /code-block >}}

[1]: https://app.datadoghq.com/llm/evaluations

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
<br />The type of the evaluation. Must be one of "categorical", "score", "boolean" or "json".

`value`
: required - _string or numeric type_
<br />The value of the evaluation. Must be a string (for categorical `metric_type`), number (for score `metric_type`), boolean (for boolean `metric_type`), or a JSON object (for json `metric_type`).

`tags`
: optional - _dictionary_
<br />A dictionary of string key-value pairs that users can add as tags regarding the evaluation. For more information about tags, see [Getting Started with Tags](/getting_started/tagging/).

`assessment`
: optional - _string_
<br />An assessment of this evaluation. Accepted values are `pass` and `fail`.

`reasoning`
: optional - _string_
<br />A text explanation of the evaluation result.

`metadata`
: optional - _dictionary_
<br />A JSON object containing arbitrary structured metadata associated with the evaluation result.
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
{{% tab "Java" %}}

Use `LLMObs.SubmitEvaluation()` to submit your custom evaluation associated with a given span.

The `LLMObs.SubmitEvaluation()` method accepts the following arguments:

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan`
: required - _LLMObsSpan_
<br />The span context to associate the evaluation with.

`label`
: required - _String_
<br />The name of the evaluation.

`categoricalValue` or `scoreValue`
: required - _String_ or _double_
<br />The value of the evaluation. Must be a string (for categorical evaluations) or a double (for score evaluations).

`tags`
: optional - _Map<String, Object>_
<br />A dictionary of string key-value pairs used to tag the evaluation. For more information about tags, see [Getting Started with Tags](/getting_started/tagging/).
{{% /collapse-content %}}

#### Example

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      llmSpan.finish();

      // submit evaluations
      LLMObs.SubmitEvaluation(llmSpan, "toxicity", "toxic", Map.of("language", "english"));
      LLMObs.SubmitEvaluation(llmSpan, "f1-similarity", 0.02, Map.of("provider", "f1-calculator"));
    }
    return chatResponse;
  }
}
{{< /code-block >}}

[1]: /getting_started/tagging/
{{% /tab %}}
{{% tab "Go (Experimental)" %}}
The Go SDK provides two generic functions for submitting evaluations. Both infer the evaluation type from the Go type of `value`: `bool` becomes a `boolean` evaluation, `string` becomes `categorical`, and any numeric type becomes `score`.

**Note**: The Go SDK does not support `json` evaluations.

### Direct span reference

`llmobs.SubmitEvaluationFromSpan` takes the span itself, so no separate export step is needed.

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func evaluate(ctx context.Context) {
	span, _ := llmobs.StartLLMSpan(ctx, "invoke-llm",
		llmobs.WithModelName("claude-opus-4-6"),
		llmobs.WithModelProvider("anthropic"),
	)
	defer span.Finish()

	// ... user application logic

	llmobs.SubmitEvaluationFromSpan("correctness", "correct", span) // categorical
	llmobs.SubmitEvaluationFromSpan("relevance_score", 0.95, span)  // score
	llmobs.SubmitEvaluationFromSpan("is_safe", true, span)          // boolean
}
{{< /code-block >}}

### Tag-based joining

`llmobs.SubmitEvaluationFromTag` joins the evaluation to the span carrying a matching tag key-value pair. The evaluation fails to join if the pair matches multiple spans or no spans.

{{< code-block lang="go" >}}
joinTag := llmobs.JoinTag{Key: "session_id", Value: sessionID}

llmobs.SubmitEvaluationFromTag("user_feedback", "positive", joinTag)
llmobs.SubmitEvaluationFromTag("user_rating", 4.2, joinTag)
llmobs.SubmitEvaluationFromTag("thumbs_up", true, joinTag)
{{< /code-block >}}

### Options

Both functions accept the following `llmobs.EvaluationOption` values:

`llmobs.WithEvaluationTags`
: optional - _[]string_
<br />A list of tags, formatted as `key:value` strings, to attach to the evaluation.

`llmobs.WithEvaluationMLApp`
: optional - _string_
<br />The name of the ML application. Defaults to the ML app configured for the SDK.

`llmobs.WithEvaluationTimestamp`
: optional - `time.Time`
<br />The time the evaluation was generated. Defaults to the current time.

{{< code-block lang="go" >}}
llmobs.SubmitEvaluationFromSpan("is_safe", true, span,
	llmobs.WithEvaluationTags([]string{"evaluator:custom", "env:prod"}),
	llmobs.WithEvaluationMLApp("<YOUR_ML_APP_NAME>"),
)
{{< /code-block >}}

**Note**: These functions do not return an error. Failures are reported through the tracer's debug log. Enable `DD_TRACE_DEBUG=1` to surface them.
{{% /tab %}}
{{< /tabs >}}

### Submitting end-user feedback

End-user feedback captures input from the users of your LLM application, such as thumbs-up or thumbs-down ratings, whether a user accepted an agent's change, and free-text comments. Unlike an evaluation, feedback carries the identity of the submitter and can target a span, a trace, a session, or a customer-defined entity. For more information, see [End-User Feedback](/llm_observability/evaluations/end_user_feedback/).

{{< tabs >}}
{{% tab "Python" %}}
Use `LLMObs.submit_feedback()` to submit end-user feedback associated with a span, trace, session, or customer-defined entity.

The `LLMObs.submit_feedback()` method accepts the following arguments:

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label`
: required - _string_
<br />The name of the feedback metric. Must not contain a `.`.

`metric_type`
: required - _string_
<br />The type of the feedback. Must be `categorical`, `score`, `boolean`, `json`, or `text`.

`value`
: required - _string, numeric type, boolean, or dict_
<br />The value of the feedback. Must be a string (`metric_type==categorical` or `metric_type==text`), integer or float (`metric_type==score`), boolean (`metric_type==boolean`), or dict (`metric_type==json`).

`submitter`
: required - _dictionary_
<br />A dictionary that identifies who submitted the feedback. Must contain a non-empty `id` (string), and can contain an optional `type` (string), such as `user`.

`span`
: optional - _dictionary_
<br />A dictionary that identifies the span associated with this feedback. Use [`LLMObs.export_span()`](#exporting-a-span) to generate this dictionary.

`span_id`
: optional - _string_
<br />The ID of the span associated with this feedback.

`trace_id`
: optional - _string_
<br />The ID of the trace associated with this feedback.

`session_id`
: optional - _string_
<br />The ID of the session associated with this feedback.

`feedback_join_key`
: optional - _string_
<br />A customer-defined key associated with this feedback, such as an incident ID or a ticket ID. To connect the feedback to your spans, first annotate them with a `feedback_join_key` tag holding the same value. See [Enriching spans](#enriching-spans).

   **Note**: Exactly one of `span`, `span_id`, `trace_id`, `session_id`, or `feedback_join_key` is required. Supplying more than one, or none, raises a `ValueError`.

`ml_app`
: optional - _string_
<br />The name of the ML application. If not provided, this defaults to the ML application configured for the SDK.

`timestamp_ms`
: optional - _integer_
<br />The Unix timestamp in milliseconds when the feedback was generated. If not provided, this defaults to the current time.

`tags`
: optional - _dictionary_
<br />A dictionary of string key-value pairs that users can add as tags regarding the feedback. For more information about tags, see [Getting Started with Tags](/getting_started/tagging/).

`assessment`
: optional - _string_
<br />An assessment of this feedback. Accepted values are `pass` and `fail`.

`reasoning`
: optional - _string_
<br />A text explanation of the feedback.
{{% /collapse-content %}}

#### Example

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    span_context = LLMObs.export_span(span=None)

    # submitting feedback for a trace
    LLMObs.submit_feedback(
        label="thumbs",
        metric_type="categorical",
        value="down",
        submitter={"id": "user-123", "type": "user"},
        trace_id=span_context["trace_id"],
        assessment="fail",
    )

    # connecting the span to a customer-defined entity
    LLMObs.annotate(tags={"feedback_join_key": "incident-123"})

    # submitting feedback for that entity
    LLMObs.submit_feedback(
        label="user_comment",
        metric_type="text",
        value="The investigation missed the customer impact.",
        submitter={"id": "user-123", "type": "user"},
        feedback_join_key="incident-123",
    )
    return completion
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Use `llmobs.submitFeedback()` to submit end-user feedback associated with a span, trace, session, or customer-defined entity.

The `llmobs.submitFeedback()` method accepts an options object with the following properties:

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label`
: required - _string_
<br />The name of the feedback metric. Must not contain a `.`.

`metricType`
: required - _string_
<br />The type of the feedback. Must be one of `categorical`, `score`, `boolean`, `json`, or `text`.

`value`
: required - _string, number, boolean, or object_
<br />The value of the feedback. Must be a string (for `categorical` and `text` metric types), number (for `score`), boolean (for `boolean`), or a JSON object (for `json`).

`submitter`
: required - _object_
<br />An object that identifies who submitted the feedback. Must contain a non-empty `id` (string), and can contain an optional `type` (string), such as `user`.

`span`
: optional - _object_
<br />The span context of the span to attach the feedback to. This should be the output of [`llmobs.exportSpan()`](#exporting-a-span).

`spanId`
: optional - _string_
<br />The ID of the span to attach the feedback to.

`traceId`
: optional - _string_
<br />The ID of the trace to attach the feedback to.

`sessionId`
: optional - _string_
<br />The ID of the session to attach the feedback to.

`feedbackJoinKey`
: optional - _string_
<br />A customer-defined key to attach the feedback to, such as an incident ID or a ticket ID. Set the same key on your spans to connect the feedback to them.

   **Note**: Exactly one of `span`, `spanId`, `traceId`, `sessionId`, or `feedbackJoinKey` is required. Supplying more than one, or none, throws an error.

`mlApp`
: optional - _string_
<br />The name of the ML application. If not provided, this defaults to the ML application configured for the SDK.

`timestampMs`
: optional - _number_
<br />The Unix timestamp in milliseconds when the feedback was generated. If not provided, this defaults to the current time.

`tags`
: optional - _object_
<br />An object of string key-value pairs that users can add as tags regarding the feedback. For more information about tags, see [Getting Started with Tags](/getting_started/tagging/).

`assessment`
: optional - _string_
<br />An assessment of this feedback. Accepted values are `pass` and `fail`.

`reasoning`
: optional - _string_
<br />A text explanation of the feedback.
{{% /collapse-content %}}

#### Example

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()

  // submitting feedback for a trace
  llmobs.submitFeedback({
    label: 'thumbs',
    metricType: 'boolean',
    value: true,
    submitter: { id: 'user-123', type: 'user' },
    traceId: spanContext.traceId,
    assessment: 'pass'
  })

  // connecting the span to a customer-defined entity
  llmobs.annotate({
    tags: { feedback_join_key: 'incident-123' }
  })

  // submitting feedback for that entity
  llmobs.submitFeedback({
    label: 'user_comment',
    metricType: 'text',
    value: 'This answer was helpful.',
    submitter: { id: 'user-123', type: 'user' },
    feedbackJoinKey: 'incident-123'
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Use `LLMObs.submitFeedback()` to submit end-user feedback associated with a span, trace, session, or customer-defined entity. Build the feedback with `LLMObs.Feedback.builder()`.

The builder accepts the following methods:

{{% collapse-content title="Arguments" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label(String label)`
: required
<br />The name of the feedback metric. Must not contain a `.`.

`categoricalValue(String)`, `scoreValue(double)`, `booleanValue(boolean)`, `jsonValue(Map<String, Object>)`, or `textValue(String)`
: required
<br />The value of the feedback. Set exactly one of these methods, which also determines the metric type.

`submitter(String id, String type)` or `submitter(Submitter submitter)`
: required
<br />Identifies who submitted the feedback. The `id` must be a non-empty string. The `type` is an optional qualifier, such as `user`.

`span(LLMObsSpan span)`, `spanId(String)`, `traceId(String)`, `sessionId(String)`, or `feedbackJoinKey(String)`
: required
<br />The entity to attach the feedback to. Set exactly one of these methods. Use `feedbackJoinKey` for a customer-defined entity, such as an incident ID or a ticket ID, and set the same key on your spans to connect the feedback to them.

`mlApp(String mlApp)`
: optional
<br />The name of the ML application. If not provided, this defaults to the ML application configured for the tracer.

`timestampMs(long timestampMs)`
: optional
<br />The Unix timestamp in milliseconds when the feedback was generated. If not provided, this defaults to the current time.

`tags(Map<String, Object> tags)` or `tag(String key, Object value)`
: optional
<br />Key-value pairs used to tag the feedback. For more information about tags, see [Getting Started with Tags](/getting_started/tagging/).

`assessment(Assessment assessment)`
: optional
<br />An assessment of this feedback. Accepted values are `LLMObs.Feedback.Assessment.PASS` and `LLMObs.Feedback.Assessment.FAIL`.

`reasoning(String reasoning)`
: optional
<br />A text explanation of the feedback.
{{% /collapse-content %}}

**Note**: `LLMObs.submitFeedback()` validates the feedback and throws an `IllegalArgumentException` when Agent Observability is enabled and the feedback is invalid, such as when the target, value, or submitter is missing. When Agent Observability is disabled, or the Agent is not attached, the call is a no-op.

#### Example

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      // connecting the span to a customer-defined entity
      llmSpan.setTag("feedback_join_key", "incident-123");
      llmSpan.finish();

      // submitting feedback for a trace
      LLMObs.submitFeedback(
          LLMObs.Feedback.builder()
              .traceId(llmSpan.getTraceId().toString())
              .label("thumbs")
              .booleanValue(true)
              .submitter("user-123", "end_user")
              .assessment(LLMObs.Feedback.Assessment.PASS)
              .reasoning("answered the question")
              .build());

      // submitting feedback for that entity
      LLMObs.submitFeedback(
          LLMObs.Feedback.builder()
              .feedbackJoinKey("incident-123")
              .label("user_comment")
              .textValue("The answer missed the customer impact.")
              .submitter("user-123", "end_user")
              .assessment(LLMObs.Feedback.Assessment.FAIL)
              .build());
    }
    return chatResponse;
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Span processing

To modify input and output data on spans, you can configure a processor function. The processor function has access to span tags to enable conditional input/output modification. Processor functions can either return the modified span to emit it, or return `None`/`null` to prevent the span from being emitted entirely. This is useful for filtering out spans that contain sensitive data or meet certain criteria.

{{< tabs >}}
{{% tab "Python" %}}

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

### Example: preventing spans from being emitted

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan
from typing import Optional

def filter_processor(span: LLMObsSpan) -> Optional[LLMObsSpan]:
    # Skip spans that are marked as internal or contain sensitive data
    if span.get_tag("internal") == "true" or span.get_tag("sensitive") == "true":
        return None  # This span will not be emitted

    # Process and return the span normally
    return span

LLMObs.register_processor(filter_processor)

# This span will be filtered out and not sent to Datadog
with LLMObs.workflow("internal_workflow"):
    LLMObs.annotate(tags={"internal": "true"})
    # ... workflow logic
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

### Example

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>"
  }
})

const llmobs = tracer.llmobs

function redactProcessor(span) {
  if (span.getTag("no_output") === "true") {
    for (const message of span.output) {
      message.content = ""
    }
  }
  return span
}

llmobs.registerProcessor(redactProcessor)
{{< /code-block >}}

### Example: conditional modification with auto-instrumentation

When using auto instrumentation, the span is not always contextually accessible. To conditionally modify the inputs and outputs on auto-instrumented spans, `llmobs.annotationContext()` can be used in addition to a span processor.

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function redactProcessor(span) {
  if (span.getTag("no_input") == "true") {
    for (const message of span.input) {
      message.content = "";
    }
  }

  return span;
}

llmobs.registerProcessor(redactProcessor);

async function callOpenai() {
  await llmobs.annotationContext({ tags: { no_input: "true" } }, async () => {
    // make call to openai
  });
}
{{< /code-block >}}

### Example: preventing spans from being emitted

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>"
  }
})

const llmobs = tracer.llmobs

function filterProcessor(span) {
  // Skip spans that are marked as internal or contain sensitive data
  if (span.getTag("internal") === "true" || span.getTag("sensitive") === "true") {
    return null  // This span will not be emitted
  }

  // Process and return the span normally
  return span
}

llmobs.registerProcessor(filterProcessor)

// This span will be filtered out and not sent to Datadog
function internalWorkflow() {
  return llmobs.trace({ kind: 'workflow', name: 'internalWorkflow' }, (span) => {
    llmobs.annotate({ tags: { internal: "true" } })
    // ... workflow logic
  })
}
{{< /code-block >}}

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

{{% tab "Java" %}}
When starting a root span for a new trace or span in a new process, specify the `sessionId` argument with the string ID of the underlying user session:

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String processChat(int userID) {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("incoming-chat", null, "session-" + System.currentTimeMillis() + "-" + userID);
    String chatResponse = answerChat(); // user application logic
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
    return chatResponse;
  }
}
{{< /code-block >}}
{{% /tab %}}
{{% tab "Go (Experimental)" %}}
When starting a root span for a new trace or span in a new process, pass `llmobs.WithSessionID` with the string ID of the underlying user session. Optionally, add the `user_handle`, `user_name`, and `user_id` tags.

{{< code-block lang="go" >}}
package main

import (
	"context"

	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func processChat(ctx context.Context, sessionID, message string) string {
	span, ctx := llmobs.StartWorkflowSpan(ctx, "incoming-chat",
		llmobs.WithSessionID(sessionID),
	)
	defer span.Finish()

	span.Annotate(llmobs.WithAnnotatedTags(map[string]string{
		"user_handle": "poodle@dog.com",
		"user_id":     "1234",
		"user_name":   "poodle",
	}))

	response := answerChat(ctx, message) // user application logic
	span.AnnotateTextIO(message, response)
	return response
}
{{< /code-block >}}

You can also set the session ID on an existing span with `llmobs.WithAnnotatedSessionID`.

### Session tracking tags

| Tag | Description |
|---|---|
| `session_id` | The ID representing a single user session, for example, a chat session. |
| `user_handle` | The handle for the user of the chat session. |
| `user_name` | The name for the user of the chat session. |
| `user_id` | The ID for the user of the chat session. |
{{% /tab %}}
{{< /tabs >}}

## Distributed tracing

The SDK supports tracing across distributed services or hosts. Distributed tracing works by propagating span information across web requests.

{{< tabs >}}
{{% tab "Python" %}}

The `ddtrace` library provides some out-of-the-box integrations that support distributed tracing for popular [web framework][1] and [HTTP][2] libraries. If your application makes requests using these supported libraries, you can enable distributed tracing by running:
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

If your application does not use any of these supported libraries, you can enable distributed tracing by manually propagating span information to and from HTTP headers. The SDK provides the helper methods `LLMObs.inject_distributed_headers()` and `LLMObs.activate_distributed_headers()` to inject and activate tracing contexts in request headers.

### Injecting distributed headers

The `LLMObs.inject_distributed_headers()` method takes a span and injects its context into the HTTP headers to be included in the request. This method accepts the following arguments:

`request_headers`
: required - _dictionary_
<br />The HTTP headers to extend with tracing context attributes.

`span`
: optional - _Span_ - **default**: `The current active span.`
<br />The span to inject its context into the provided request headers. Any spans (including those with function decorators), this defaults to the current active span.

### Activating distributed headers

The `LLMObs.activate_distributed_headers()` method takes HTTP headers and extracts tracing context attributes to activate in the new service.

**Note**: You must call `LLMObs.activate_distributed_headers()` before starting any spans in your downstream service. Spans started prior (including function decorator spans) do not get captured in the distributed trace.

This method accepts the following argument:

`request_headers`
: required - _dictionary_
<br />The HTTP headers to extract tracing context attributes.


### Example

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

The `dd-trace` library provides out-of-the-box integrations that support distributed tracing for popular [web frameworks][1]. Requiring the tracer automatically enables these integrations, but you can disable them optionally with:

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
{{% /tab %}}
{{% tab "Go (Experimental)" %}}
LLMObs span context travels on the standard APM distributed tracing headers, so there is no LLMObs-specific inject or extract API. Propagate the APM context with `tracer.Inject` and `tracer.Extract`, or use an instrumented [HTTP integration][1]. LLMObs spans in the downstream service then attach to the upstream LLMObs parent automatically.

### Example

{{< code-block lang="go" filename="client.go" >}}
package main

import (
	"context"
	"net/http"

	"github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func clientSendRequest(ctx context.Context, req *http.Request) error {
	span, ctx := llmobs.StartWorkflowSpan(ctx, "client-send-request")
	defer span.Finish()

	apmSpan, _ := tracer.StartSpanFromContext(ctx, "http.request")
	defer apmSpan.Finish()

	// inject the trace context into the outgoing request headers
	return tracer.Inject(apmSpan.Context(), tracer.HTTPHeadersCarrier(req.Header))
}
{{< /code-block >}}

{{< code-block lang="go" filename="server.go" >}}
package main

import (
	"net/http"

	"github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
	"github.com/DataDog/dd-trace-go/v2/llmobs"
)

func serverHandler(w http.ResponseWriter, r *http.Request) {
	var opts []tracer.StartSpanOption
	if sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header)); err == nil {
		opts = append(opts, tracer.ChildOf(sctx))
	}
	// if extraction fails, the span simply starts a new trace

	apmSpan, ctx := tracer.StartSpanFromContext(r.Context(), "http.handler", opts...)
	defer apmSpan.Finish()

	// this span joins the distributed trace and the upstream LLMObs parent
	span, _ := llmobs.StartTaskSpan(ctx, "process-request")
	defer span.Finish()
}
{{< /code-block >}}

**Note**: Extract the upstream context before starting any LLMObs spans in the downstream service. Spans started beforehand are not captured in the distributed trace.

[1]: /tracing/trace_collection/compatibility/go/
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

`LLMObs.flush()` is a blocking function that submits all buffered Agent Observability data to the Datadog backend. This can be useful in serverless environments to prevent an application from exiting until all Agent Observability traces are submitted.

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

The Node.js Agent Observability SDK offers an `llmobs.decorate` function which serves as a function decorator for TypeScript applications. This functions tracing behavior is the same as `llmobs.wrap`.

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

`llmobs.flush()` is a blocking function that submits all buffered Agent Observability data to the Datadog backend. This can be useful in serverless environments to prevent an application from exiting until all Agent Observability traces are submitted.

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

{{% /tab %}}
{{% tab "Go (Experimental)" %}}
### Tracing multiple applications

The SDK supports tracing multiple LLM applications from the same service.

You can configure an environment variable `DD_LLMOBS_ML_APP` to the name of your LLM application, which all generated spans are grouped into by default.

To override this configuration and use a different LLM application name for a given root span, pass `llmobs.WithMLApp` when starting a root span for a new trace or a span in a new process.

{{< code-block lang="go">}}
span, ctx := llmobs.StartWorkflowSpan(ctx, "process-message",
	llmobs.WithMLApp("<NON_DEFAULT_ML_APP_NAME>"),
)
defer span.Finish()
{{< /code-block >}}

### Force flushing before exit

The tracer flushes spans in the background. Call `tracer.Stop()` before your process exits so buffered LLMObs spans are submitted. In short-lived processes and serverless handlers, `defer tracer.Stop()` in `main` is the simplest way to guarantee this.

{{< code-block lang="go">}}
func main() {
	if err := tracer.Start(
		tracer.WithLLMObsEnabled(true),
		tracer.WithLLMObsMLApp("<YOUR_ML_APP_NAME>"),
	); err != nil {
		log.Fatalf("failed to start tracer: %v", err)
	}
	defer tracer.Stop()

	// your application logic
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/openai/openai-python
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[4]: https://github.com/langchain-ai/langchain
[7]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /llm_observability/quickstart/terms/
[9]: /getting_started/tagging/
[10]: https://github.com/DataDog/llm-observability
[11]: /tracing/trace_collection/compatibility/python/#integrations
[12]: /tracing/trace_collection/compatibility/python/#library-compatibility
[13]: /llm_observability/instrument/auto_instrumentation/
[14]: /llm_observability/investigate/cost
[15]: /llm_observability/investigate/cost/#custom-tags-on-cost-and-tokens-metrics
[16]: /llm_observability/investigate/cost/#how-token-counts-are-calculated
[17]: /llm_observability/guide/trace-an-llm-application-in-aws-lambda
