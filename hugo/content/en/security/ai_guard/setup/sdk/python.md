---
title: AI Guard SDK for Python
disable_toc: false
further_reading:
- link: /security/ai_guard/setup/sdk/
  tag: Documentation
  text: AI Guard SDK
- link: /security/ai_guard/setup/automatic_integrations/
  tag: Documentation
  text: Automatic integrations
- link: https://github.com/DataDog/dd-trace-py
  tag: Source Code
  text: Python Datadog library source code
---

{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

## Install the SDK

To use AI Guard and see AI Guard activity in Datadog, install the Python SDK. The SDK requires the [Datadog Agent][2] to send data to Datadog, and the [environment variables][3] described in the SDK setup instructions.

Install dd-trace-py v3.19.0 or later:

```shell
pip install ddtrace>=3.19.0
```

## Use the SDK

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
- `messages` (required): list of `Message` objects (prompts or tool calls) for AI Guard to evaluate.
- `options` (optional): an `Options` object with a `block` flag. When set to `True`, the SDK raises an `AIGuardAbortError` when the assessment is `DENY` or `ABORT` and the service is configured with blocking enabled. When omitted, blocking follows the remote `is_blocking_enabled` setting.

The method returns an `Evaluation` object containing:
- `action`: `ALLOW`, `DENY`, or `ABORT`.
- `reason`: natural language summary of the decision.
- `tags`: list of attack category tags detected (for example, `["indirect-prompt-injection", "destructive-tool-call"]`).
- `sds`: list of Sensitive Data Scanner findings.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v3.18.0
[2]: /agent/?tab=Host-based
[3]: /security/ai_guard/setup/sdk/#required-environment-variables
