---
title: SDK
private: true
further_reading:
- link: /security/ai_guard/
  tag: Documentation
  text: AI Guard
- link: /security/ai_guard/setup/http_api/
  tag: Documentation
  text: HTTP API
---

{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Use an SDK to call the AI Guard REST API and monitor AI Guard activity in real time in Datadog.

## Set up the Datadog Agent

Datadog SDKs use the [Datadog Agent][1] to send AI Guard data to Datadog. The Agent must be running and accessible to the SDK for you to see data in Datadog.

If you don't use the Datadog Agent, the AI Guard evaluator API still works, but you can't see AI Guard traces in Datadog.

## Install the tracer library

To use AI Guard with the SDK and see AI Guard activity in Datadog, install the appropriate tracer library for your language. The tracer library requires the Datadog Agent to send data to Datadog.

{{< tabs >}}
{{% tab "Python" %}}
Install dd-trace-py v3.18.0 or later:

```shell
pip install ddtrace>=3.18.0
```
{{% /tab %}}
{{% tab "JavaScript" %}}
Install dd-trace-js v5.69.0 or later:

```shell
npm install dd-trace@^5.69.0
```

{{% /tab %}}
{{% tab "Java" %}}
Install dd-trace-java v1.54.0 or later. Follow the [Java installation instructions][2] to add the tracer to your application.

[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}
{{% tab "Ruby" %}}
Install dd-trace-rb v2.25.0 or later:

```shell
gem install ddtrace -v '>= 2.25.0'
```
{{% /tab %}}
{{< /tabs >}}

## Use the SDK

{{< tabs >}}
{{% tab "Python" %}}
The Python SDK ([dd-trace-py v3.18.0][1] or later) provides a streamlined interface for invoking the REST API directly from Python code. The following examples demonstrate its usage:

<div class="alert alert-info">
Starting with dd-trace-py v3.18.0, the Python SDK uses the standardized common message format.
</div>

```py
from ddtrace.appsec.ai_guard import new_ai_guard_client, Function, Message, Options, ToolCall

client = new_ai_guard_client()
```

### Example: Evaluate a user prompt {#python-example-evaluate-user-prompt}

```py
# Check if processing the user prompt is considered safe
result = client.evaluate(
    messages=[
        Message(role="system", content="You are an AI Assistant"),
        Message(role="user", content="What is the weather like today?"),
    ],
    options=Options(block=True)
)
```

The `evaluate` method accepts the following parameters:
- `messages` (required): list of messages (prompts or tool calls) for AI Guard to evaluate.
- `opts` (optional): dictionary with a block flag; if set to `true`, the SDK raises an `AIGuardAbortError` when the assessment is `DENY` or `ABORT` and the service is configured with blocking enabled.

The method returns an Evaluation object containing:
- `action`: `ALLOW`, `DENY`, or `ABORT`.
- `reason`: natural language summary of the decision.

### Example: Evaluate a user prompt with content parts {#python-example-evaluate-user-prompt-content-parts}

For multi-modal inputs, you can pass an array of content parts instead of a string. This is useful when including images or other media:

```py
from ddtrace.appsec.ai_guard import ContentPart, ImageURL

# Evaluate a user prompt with both text and image content
result = client.evaluate(
    messages=[
        Message(role="system", content="You are an AI Assistant"),
        Message(
            role="user",
            content=[
                ContentPart(type="text", text="What is in this image?"),
                ContentPart(
                    type="image_url",
                    image_url=ImageURL(url="data:image/jpeg;base64,...")
                )
            ]
        ),
    ]
)
```

### Example: Evaluate a tool call {#python-example-evaluate-tool-call}

Like evaluating user prompts, the method can also be used to evaluate tool calls:

```py
# Check if executing the shell tool is considered safe
result = client.evaluate(
    messages=[
        Message(
            role="assistant",
            tool_calls=[
                ToolCall(
                    id="call_1",
                    function=Function(name="shell", arguments='{ "command": "shutdown" }'))
            ],
        )
    ]
)
```

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v3.18.0
{{% /tab %}}
{{% tab "Javascript" %}}
The JavaScript SDK ([dd-trace-js v5.69.0][1] or later) offers a simplified interface for interacting with the REST API directly from JavaScript applications.

The SDK is described in a dedicated [TypeScript][2] definition file. For convenience, the following sections provide practical usage examples:

### Example: Evaluate a user prompt {#javascript-example-evaluate-user-prompt}

```javascript
import tracer from 'dd-trace';

const result = await tracer.aiguard.evaluate([
    { role: 'system', content: 'You are an AI Assistant' },
    { role: 'user', content: 'What is the weather like today?' }
  ],
  { block: true }
)
```

The evaluate method returns a promise and receives the following parameters:
- `messages` (required): list of messages (prompts or tool calls) for AI Guard to evaluate.
- `opts` (optional): dictionary with a block flag; if set to `true`, the SDK rejects the promise with `AIGuardAbortError` when the assessment is `DENY` or `ABORT` and the service is configured with blocking enabled.

The method returns a promise that resolves to an Evaluation object containing:
- `action`: `ALLOW`, `DENY`, or `ABORT`.
- `reason`: natural language summary of the decision.

### Example: Evaluate a tool call {#javascript-example-evaluate-tool-call}

Similar to evaluating user prompts, this method can also be used to evaluate tool calls:

```javascript
import tracer from 'dd-trace';

const result = await tracer.aiguard.evaluate([
    {
      role: 'assistant',
      tool_calls: [
        {
          id: 'call_1',
          function: {
            name: 'shell',
            arguments: '{ "command": "shutdown" }'
          }
        },
      ],
    }
  ]
)
```

[1]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.69.0
[2]: https://github.com/DataDog/dd-trace-js/blob/master/index.d.ts
{{% /tab %}}
{{% tab "Java" %}}
The Java SDK ([dd-trace-java v1.54.0][1] or later) provides a streamlined interface for directly interacting with the REST API from Java applications.

The following sections provide practical usage examples:

### Example: Evaluate a user prompt {#java-example-evaluate-user-prompt}

```java
import datadog.trace.api.aiguard.AIGuard;

final AIGuard.Evaluation evaluation = AIGuard.evaluate(
    Arrays.asList(
      AIGuard.Message.message("system", "You are an AI Assistant"),
      AIGuard.Message.message("user", "What is the weather like today?")
    ),
    new AIGuard.Options().block(true)
);
```

The evaluate method receives the following parameters:
- `messages` (required): list of messages (prompts or tool calls) for AI Guard to evaluate.
- `options` (optional): object with a block flag; if set to `true`, the SDK throws an `AIGuardAbortError` when the assessment is `DENY` or `ABORT` and the service is configured with blocking enabled.

The method returns an Evaluation object containing:
- `action`: `ALLOW`, `DENY`, or `ABORT`.
- `reason`: natural language summary of the decision.

### Example: Evaluate a user prompt with content parts {#java-example-evaluate-user-prompt-content-parts}

For multi-modal inputs, you can pass a list of content parts instead of a string. This is useful when including images or other media:

```java
import datadog.trace.api.aiguard.AIGuard;

// Evaluate a user prompt with both text and image content
final AIGuard.Evaluation evaluation = AIGuard.evaluate(
    Arrays.asList(
        AIGuard.Message.message("system", "You are an AI Assistant"),
        AIGuard.Message.message("user", Arrays.asList(
            AIGuard.ContentPart.text("What is in this image?"),
            AIGuard.ContentPart.imageUrl("data:image/jpeg;base64,...")
        ))
    )
);
```

### Example: Evaluate a tool call {#java-example-evaluate-tool-call}

Like evaluating user prompts, the method can also be used to evaluate tool calls:

```java
import datadog.trace.api.aiguard.AIGuard;

final AIGuard.Evaluation evaluation = AIGuard.evaluate(
    Collections.singletonList(
        AIGuard.Message.assistant(
            AIGuard.ToolCall.toolCall(
                "call_1",
                "shell",
                "{\"command\": \"shutdown\"}"
            )
        )
    )
);
```

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.54.0
{{% /tab %}}
{{% tab "Ruby" %}}
The Ruby SDK ([dd-trace-rb v2.25.0][1] or later) offers a simplified interface for interacting with the REST API directly from Ruby applications.

The following sections provide practical usage examples:

### Example: Evaluate a user prompt {#ruby-example-evaluate-user-prompt}

```ruby
result = Datadog::AIGuard.evaluate(
  Datadog::AIGuard.message(role: :system, content: "You are an AI Assistant"),
  Datadog::AIGuard.message(role: :user, content: "What is the weather like today?"),
  allow_raise: true
)
```

The evaluate method receives the following parameters:
- `messages` (required): list of messages (prompts or tool calls) for AI Guard to evaluate.
- `allow_raise` (optional): Boolean flag; if set to `true`, the SDK raises an `AIGuardAbortError` when the assessment is `DENY` or `ABORT` and the service is configured with blocking enabled.

The method returns an Evaluation object containing:
- `action`: `ALLOW`, `DENY`, or `ABORT`.
- `reason`: natural language summary of the decision.
- `tags`: list of tags linked to the evaluation (for example, ```["indirect-prompt-injection", "instruction-override", "destructive-tool-call"]```)

### Example: Evaluate a tool call {#ruby-example-evaluate-tool-call}

Like evaluating user prompts, the method can also be used to evaluate tool calls:

```ruby
result = Datadog::AIGuard.evaluate(
  Datadog::AIGuard.assistant(id: "call_1", tool_name: "shell", arguments: '{"command": "shutdown"}'),
)
```

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.25.0
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/?tab=Host-based
