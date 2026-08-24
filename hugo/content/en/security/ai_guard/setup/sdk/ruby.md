---
title: AI Guard SDK for Ruby
disable_toc: false
further_reading:
- link: /security/ai_guard/setup/sdk/
  tag: Documentation
  text: AI Guard SDK
- link: /security/ai_guard/setup/automatic_integrations/
  tag: Documentation
  text: Automatic integrations
- link: https://github.com/DataDog/dd-trace-rb
  tag: Source Code
  text: Ruby Datadog library source code
---

{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

## Install the SDK

To use AI Guard and see AI Guard activity in Datadog, install the Ruby SDK. The SDK requires the [Datadog Agent][2] to send data to Datadog, and the [environment variables][3] described in the SDK setup instructions.

Install dd-trace-rb v2.25.0 or later:

```shell
gem install ddtrace -v '>= 2.25.0'
```

## Use the SDK

The Ruby SDK ([dd-trace-rb v2.25.0][1] or later) offers a simplified interface for interacting with the REST API directly from Ruby applications.

The following sections provide practical usage examples:

### Example: Evaluate a user prompt {#ruby-example-evaluate-user-prompt}

```ruby
result = Datadog::AIGuard.evaluate(
  Datadog::AIGuard.message(role: :system, content: "You are an AI Assistant"),
  Datadog::AIGuard.message(role: :user, content: "What is the weather like today?"),
  allow_raise: false
)
```

The evaluate method receives the following parameters:
- `messages` (required): list of messages (prompts or tool calls) for AI Guard to evaluate.
- `allow_raise` (optional): Boolean flag; if set to `false`, the method does not raise an `AIGuardAbortError` when the assessment is `DENY` or `ABORT`.

This SDK method raises an `AIGuardAbortError` when the assessment is `DENY` or `ABORT` and if the service is configured with blocking enabled.

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

### Example: Evaluate a user prompt with content parts {#ruby-example-evaluate-user-prompt-content-parts}

For multi-modal inputs, you can pass an array of content parts instead of a string. This is useful when including images or other media:

```ruby
Datadog::AIGuard.evaluate(
  Datadog::AIGuard.message(role: :user) do |message|
    message.text("What's in this image?")
    message.image_url("data:image/jpeg;base64,...")
  end
)
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.25.0
[2]: /agent/?tab=Host-based
[3]: /security/ai_guard/setup/sdk/#required-environment-variables
