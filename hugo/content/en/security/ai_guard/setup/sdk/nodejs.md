---
title: AI Guard SDK for Node.js
disable_toc: false
further_reading:
- link: /security/ai_guard/setup/sdk/
  tag: Documentation
  text: AI Guard SDK
- link: /security/ai_guard/setup/automatic_integrations/
  tag: Documentation
  text: Automatic integrations
- link: https://github.com/DataDog/dd-trace-js
  tag: Source Code
  text: Node.js Datadog library source code
---

{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

## Install the SDK

To use AI Guard and see AI Guard activity in Datadog, install the JavaScript SDK. The SDK requires the [Datadog Agent][3] to send data to Datadog, and the [environment variables][4] described in the SDK setup instructions.

Install dd-trace-js v5.69.0 or later:

```shell
npm install dd-trace@^5.69.0
```

## Use the SDK

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
- `messages` (required): array of message objects (prompts or tool calls) for AI Guard to evaluate.
- `opts` (optional): object with a `block` flag. When set to `true`, the SDK rejects the promise with `AIGuardAbortError` when the assessment is `DENY` or `ABORT` and the service is configured with blocking enabled. When omitted, blocking follows the remote `is_blocking_enabled` setting.

The method returns a promise that resolves to an Evaluation object containing:
- `action`: `ALLOW`, `DENY`, or `ABORT`.
- `reason`: natural language summary of the decision.
- `tags`: array of attack category tags detected (for example, `["indirect-prompt-injection", "destructive-tool-call"]`).
- `sds`: array of Sensitive Data Scanner findings.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.69.0
[2]: https://github.com/DataDog/dd-trace-js/blob/master/index.d.ts
[3]: /agent/?tab=Host-based
[4]: /security/ai_guard/setup/sdk/#required-environment-variables
