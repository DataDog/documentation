---
title: LLM Observability Java SDK Reference [BETA]
code_lang: java
type: multi-code-lang
code_lang_weight: 30
aliases:
    - /tracing/llm_observability/sdk/java
    - /llm_observability/sdk/java
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

The LLM Observability SDK for Java (BETA) enhances the observability of your Java-based LLM applications. The SDK supports Java versions 8 and newer. For information about LLM Observability's integration support, see [Auto Instrumentation][4].

You can install and configure tracing of various operations such as workflows, tasks, and API calls with wrapped functions or traced blocks. You can also annotate these traces with metadata for deeper insights into the performance and behavior of your applications, supporting multiple LLM services or models from the same environment.

## Setup

### Prerequisites

1. The beta `dd-trace-java` JAR must be downloaded to a folder that is accessible by your Datadog user, please contact our team for access.

2. LLM Observability requires a Datadog API key (see [the instructions for creating an API key][1]).

### Command-line setup

```shell
DD_SITE={{< region-param key="dd_site" code="true" >}} DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```


| Environment Variable      | System Property               | Description                                                                                                                                                                                                                                                                                  |
| --------- |-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SITE`      | `dd.site`                     | The Datadog site to submit your LLM data. Your site is {{< region-param key="dd_site" code="true" >}}.                                                                                                                                                                                       |
| `DD_LLMOBS_ENABLED`   | `dd.llmobs.enabled`           | Toggle to enable submitting data to LLM Observability. Should be set to `true`.                                                                                                                                                                                                              |
| `DD_LLMOBS_ML_APP`      | `dd.llmobs.ml.app`            | The name of your LLM application, service, or project, under which all traces and spans are grouped. This helps distinguish between different applications or experiments. See [Application naming guidelines](#application-naming-guidelines) for allowed characters and other constraints. |
| `DD_SERVICE`   | `dd.service`                  | The name of a set of processes that do the same job. Used for grouping stats for your application.                                                                                                                                                                                           |
| `DD_LLMOBS_AGENTLESS_ENABLED` | `dd.llmobs.agentless.enabled` | Only required if you are not using the Datadog Agent, in which case this should be set to `true`. Defaults to `false`.                                                                                                                                                                       |
| `DD_API_KEY` | `dd.api.key`                  | Your Datadog API key. Only required if you are not using the Datadog Agent.                                                                                                                                                                                                                  |

#### Application naming guidelines

Your application name (the value of `DD_LLMOBS_ML_APP` or `dd.llmobs.ml.app`) must be a lowercase Unicode string. It may contain the characters listed below:

- Alphanumerics
- Underscores
- Minuses
- Colons
- Periods
- Slashes

The name can be up to 193 characters long and may not contain contiguous or trailing underscores.

### Starting a Span & Span Kinds

There are several different methods to start a span, based on the kind of span that you are starting. See the [Span Kinds documentation][2] for a list of supported span kinds.

All spans are started as an object instance of `LLMObsSpan`. And spans have methods that you can use to interact with and record data with.

### Finishing a span

Spans must be finished for the trace to be submitted and visible in the Datadog app.

Spans can be finished by calling `finish()` on a span object instance. It is recommended, if possible, to wrap the span with a `try/finally` block, to ensure the span is submitted in case of exceptions.

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

### LLM span

To trace an LLM span, import and call the following method with the arguments listed below
```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

#### Arguments

`spanName`
: optional - _string_
<br/>The name of the operation. If not provided, `spanName` defaults to the kind of the span.

`modelName`
: optional - _string_ - **default**: `"custom"`
<br/>The name of the invoked LLM.

`modelProvider`
: optional - _string_ - **default**: `"custom"`
<br/>The name of the model provider.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. Supplying a non null value will result in overriding the ML App supplied at the start of the application. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

#### Example
```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeModel() {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String inference = ... // user application logic to invoke LLM
    llmSpan.annotateIO(...); // record the input and output
    llmSpan.finish();
    return inference;
  }
}
```


### Workflow span
To trace a workflow span, import and call the following method with the arguments listed below
```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

#### Arguments

`spanName`
: optional - _string_
<br/>The name of the operation. If not provided, `spanName` defaults to the kind of the span.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. Supplying a non null value will result in overriding the ML App supplied at the start of the application. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

#### Example

```java
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
```

### Agent span

To trace an agent span, import and call the following method with the arguments listed below
```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

#### Arguments

`spanName`
: optional - _string_
<br/>The name of the operation. If not provided, `spanName` defaults to the name of the traced function.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. Supplying a non null value will result in overriding the ML App supplied at the start of the application. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

### Tool span

To trace a tool span, import and call the following method with the arguments listed below
```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

#### Arguments

`spanName`
: optional - _string_
<br/>The name of the operation. If not provided, `spanName` defaults to the name of the traced function.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. Supplying a non null value will result in overriding the ML App supplied at the start of the application. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

### Task span

To trace a task span, import and call the following method with the arguments listed below
```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

#### Arguments

`spanName`
: optional - _string_
<br/>The name of the operation. If not provided, `spanName` defaults to the name of the traced function.

`mlApp`
: optional - _string_
<br/>The name of the ML application that the operation belongs to. Supplying a non null value will result in overriding the ML App supplied at the start of the application. See [Tracing multiple applications](#tracing-multiple-applications) for more information.

`sessionId`
: optional - _string_
<br/>The ID of the underlying user session. See [Tracking user sessions](#tracking-user-sessions) for more information.

## Tracking user sessions

Session tracking allows you to associate multiple interactions with a given user. When starting a root span for a new trace or span in a new process, specify the `sessionId` argument with the string ID of the underlying user session:

```java
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
```


## Annotating a span

The SDK provides several methods to annotate spans with inputs, outputs, metrics, and metadata.

### Annotating Inputs & Outputs

The `annotateIO()` member method of a span (specifically the `LLMObsSpan` interface) accepts the following arguments:

#### Arguments

If any of these arguments are null or empty, nothing will happen. For example, if `inputData` is a non empty string while `outputData` is null, then only the `inputData` will be recorded.

`inputData`
: optional - `String` or `List<LLMObs.LLMMessage>`
<br />Either a String (for non-LLM spans) or a list of `LLMObs.LLMMessage`'s for LLM spans.

`outputData`
: optional - `String` or `List<LLMObs.LLMMessage>`
<br />Either a String (for non-LLM spans) or a list of `LLMObs.LLMMessage`'s for LLM spans.

#### LLM Messages
LLM spans must be annotated with LLM Messages using the `LLMObs.LLMMessage` object.

The `LLMObs.LLMMessage` object can be instantiated by callling `LLMObs.LLMMessage.from()` with the following arguments:

`role`
: required - String
<br />A string describing the role of the author of the message

`content`
: required - String
<br />A string containing the content of the message

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

### Adding Metrics

#### Bulk Add Metrics

The `setMetrics()` member method of a span (specifically the `LLMObsSpan` interface) accepts the following arguments to attach multiple metrics in bulk:

##### Arguments

`metrics`
: required - `Map<String, Number>`
<br /> A map of JSON serializable keys and numeric values that users can add as metrics relevant to the operation described by the span (input_tokens, output_tokens, total_tokens, etc.).

#### Add a Single Metric

The `setMetric()` member method of a span (specifically the `LLMObsSpan` interface) accepts the following arguments to attach a single metric:

##### Arguments

`key`
: required - `CharSequence`
<br /> the name of the metric

`value`
: required - One of `int`, `long`, `double`
<br /> The value of the metric

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

### Adding Tags

For more information about tags, see [Getting Started with Tags][3].

#### Bulk Add Tags

The `setTags()` member method of a span (specifically the `LLMObsSpan` interface) accepts the following arguments to attach multiple tags in bulk:

##### Arguments

`tags`
: required - `Map<String, Object>`
<br /> A map of JSON serializable key-value pairs that users can add as tags regarding the span’s context (session, environment, system, versioning, etc.).

#### Add a Single Tag

The `setTag()` member method of a span (specifically the `LLMObsSpan` interface) accepts the following arguments to attach a single tag:

##### Arguments

`key`
: required - `String`
<br /> The key of the tag

`value`
: required - One of `int`, `long`, `double`, `boolean`, `String`
<br /> The value of the tag

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

### Annotating Errors

#### Adding a Throwable (Recommended)

The `addThrowable()` member method of a span (specifically the `LLMObsSpan` interface) accepts the following argument to attach a throwable with a stack trace:

##### Arguments

`throwable`
: required - `Throwable`
<br /> The throwable / exception that occurred.

#### Adding an error message

The `setErrorMessage()` member method of a span (specifically the `LLMObsSpan` interface) accepts the following argument to attach an error string:

##### Arguments

`errorMessage`
: required - `String`
<br /> The message of the error

#### Setting an Error Flag

The `setError()` member method of a span (specifically the `LLMObsSpan` interface) accepts the following argument to indicate an error with the operation:

##### Arguments

`error`
: required - `boolean`
<br /> `true` if the span errored

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

### Annotating Metadata

The `setMetadata()` member method of the `LLMObsSpan` interface accepts the following arguments:

`metadata`
: required - Map<String, Object>
<br />A map of JSON serializable key-value pairs that contains metadata information relevant to the input or output operation described by the span

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


[1]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /llm_observability/terms/
[3]: /getting_started/tagging/
[4]: /llm_observability/setup/auto_instrumentation/?tab=java
