---
title: Manual Integrations
description: Protect agents built on Amazon Strands, and LLM traffic that passes through LiteLLM Proxy, with AI Guard by adding a plugin or guardrail.
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard manual integrations protect agents built on frameworks that the Datadog SDK doesn't instrument automatically. You register an AI Guard component with the framework, and the framework sends each model call and tool call to AI Guard for evaluation.

AI Guard provides two manual integrations:

- **Amazon Strands**: A plugin that you add to a Strands agent in your application code.
- **LiteLLM Proxy**: A guardrail that you add to the LiteLLM Proxy configuration. LiteLLM Proxy evaluates the LLM traffic of every agent that routes through the proxy, so agents behind the proxy can be written in any language.

## Supported frameworks and libraries

Manual integrations work only with specific framework and Datadog SDK versions. Check the agent's framework to confirm that a manual integration applies.

| Language | Framework | Framework version | Datadog SDK version |
| --- | --- | --- | --- |
| Python | Amazon Strands | `strands-agents` 1.29.0 or later. | `dd-trace-py` 4.7.0 or later. |
| Python | LiteLLM Proxy | `litellm` 1.78.5 or later. <!-- TODO: confirm the minimum. The `dd-trace-py` 4.8.0 release notes say `litellm` 1.46.1 or later. --> | `dd-trace-py` 4.8.0 or later. |

For LiteLLM Proxy, the language and Datadog SDK version apply to the proxy, not to the agents that route traffic through the proxy.

For other frameworks, check [automatic integrations][1]. If no integration covers your framework, use the [SDK][2].

### Evaluated operations

Each manual integration evaluates the agent's activity at specific points, and the integration responds to a block differently at each point. Check these points to understand what AI Guard covers and how a block affects your agent.

The Amazon Strands integration evaluates these Strands events:

| Event | What AI Guard evaluates | When AI Guard blocks |
| --- | --- | --- |
| `BeforeModelCallEvent` | The system prompt and conversation history before each model call. | The plugin raises `AIGuardAbortError`. |
| `AfterModelCallEvent` | The text of the model's response. | The plugin raises `AIGuardAbortError`. |
| `BeforeToolCallEvent` | The conversation history and the pending tool call. | The plugin cancels the tool call and returns a canceled message to the agent. |
| `AfterToolCallEvent` | The conversation history, the tool call, and the tool's result. | The plugin replaces the tool result with a blocked message. |

The LiteLLM Proxy integration evaluates traffic in each mode that you set in the proxy configuration:

| Mode | What AI Guard evaluates | When AI Guard blocks |
| --- | --- | --- |
| `pre_call` | The request messages, including tool calls, before the proxy sends the request to the model. | The proxy rejects the request. |
| `during_call` | The request messages, in parallel with the model call. | The proxy rejects the request. |
| `post_call` | The model's response, together with the request messages from a `pre_call` or `during_call` evaluation. | The proxy rejects the response. |

<!-- TODO: confirm the HTTP status code and error body that the client receives when the proxy rejects a request. The guardrail raises an exception with status 403. -->

### Limitations

Some activity through manual integrations isn't evaluated or can't be blocked, so review these limits before you rely on a manual integration alone.

- If AI Guard returns an error or doesn't respond, both integrations allow the request to proceed.
- The Amazon Strands plugin doesn't evaluate images, documents, or video. With `dd-trace-py` 4.12.0 or later, the plugin sends a placeholder for non-text content. With earlier versions, non-text content can cause AI Guard to skip the evaluation.
- The LiteLLM Proxy guardrail can't block streamed responses. With `post_call`, AI Guard evaluates a streamed response only after the proxy delivers every chunk to the client.
- If the LiteLLM Proxy guardrail runs only in `post_call` mode, AI Guard evaluates the response without the request messages. Combine `post_call` with `pre_call` or `during_call` so AI Guard has the full conversation.

## Enable Amazon Strands integrations

Enable the Amazon Strands integration for each Strands agent you want to protect, so every model call and tool call in the agent goes to AI Guard for evaluation.

**Before you begin**: [Check prerequisites][3], [Create API and application keys][4], and install a [supported Datadog SDK version](#supported-frameworks-and-libraries) in the application.

1. Set these environment variables in the application's environment:

   - `DD_AI_GUARD_ENABLED=true`.
   - `DD_API_KEY=<DATADOG_API_KEY>`.
   - `DD_APP_KEY=<DATADOG_APPLICATION_KEY>`. The application key needs the `ai_guard_evaluate` scope.
   - `DD_SERVICE=<SERVICE_NAME>`. Use the name the agent reports to APM.
   - `DD_ENV=<ENVIRONMENT>`.

1. In the application code, add the AI Guard plugin to each Strands agent you create:

   ```python
   from strands import Agent
   from ddtrace.aiguard.integrations.strands import AIGuardStrandsPlugin

   agent = Agent(
       model=model,
       # Send each model call and tool call to AI Guard.
       plugins=[AIGuardStrandsPlugin()],
   )
   ```

   With `dd-trace-py` versions earlier than 4.13.0, import `AIGuardStrandsPlugin` from `ddtrace.appsec.ai_guard` instead.

   With `strands-agents` versions earlier than 1.29.0, use the hook provider instead of the plugin: import `AIGuardStrandsHookProvider` from the same module, and pass `hooks=[AIGuardStrandsHookProvider()]` to the agent.

   `AIGuardStrandsPlugin()` and `AIGuardStrandsHookProvider()` accept these optional arguments:

   - `detailed_error=True`: Add the AI Guard reason to the blocked message. Default: `False`.
   - `raise_error_on_tool_calls=True`: Raise `AIGuardAbortError` for blocked tool calls, instead of canceling the tool call or replacing the tool result. Default: `False`.

<!-- TODO: confirm whether the application must start with `ddtrace-run` or `import ddtrace.auto` for AI Guard spans to reach Datadog. -->

**What's next?** [Create a retention filter for AI Guard spans][5], optionally [limit access to AI Guard spans][6], then [verify the setup][7].

## Enable LiteLLM Proxy integrations {#litellm-proxy}

Enable the LiteLLM Proxy integration for each LiteLLM Proxy, so AI Guard evaluates the LLM traffic of every agent that routes through the proxy, whatever language the agent uses.

**Before you begin**: [Check prerequisites][3], [Create API and application keys][4], and install a [supported Datadog SDK version](#supported-frameworks-and-libraries) in the LiteLLM Proxy's environment. The agents you want to protect must send their LLM requests through the proxy.

1. Set these environment variables in the LiteLLM Proxy's environment:

   - `DD_AI_GUARD_ENABLED=true`.
   - `DD_API_KEY=<DATADOG_API_KEY>`.
   - `DD_APP_KEY=<DATADOG_APPLICATION_KEY>`. The application key needs the `ai_guard_evaluate` scope.
   - `DD_SERVICE=<SERVICE_NAME>`.
   - `DD_ENV=<ENVIRONMENT>`.

   <!-- TODO: confirm that every agent behind the proxy shares the AI Guard policy for the proxy's service and environment. -->

1. In the directory of the LiteLLM Proxy configuration file, create a `guardrails.py` file that imports the AI Guard guardrail:

   ```python
   from ddtrace.aiguard.integrations.litellm import DatadogAIGuardGuardrail

   __all__ = ["DatadogAIGuardGuardrail"]
   ```

   With `dd-trace-py` versions earlier than 4.13.0, import `DatadogAIGuardGuardrail` from `ddtrace.appsec.ai_guard.integrations.litellm` instead.

1. Add the guardrail to the `guardrails` section of the LiteLLM Proxy configuration file:

   ```yaml
   guardrails:
     - guardrail_name: datadog_ai_guard
       litellm_params:
         guardrail: guardrails.DatadogAIGuardGuardrail
         # Evaluate each request before the model call and each response after it.
         mode: [pre_call, post_call]
         # Run the guardrail on every request, not only on requests that name it.
         default_on: true
   ```

   Without `default_on: true`, LiteLLM Proxy runs the guardrail only on requests that name the guardrail in their `guardrails` field. For the other modes, see [Evaluated operations](#evaluated-operations).

   <div class="alert alert-tip">By default, the guardrail follows the blocking setting in the AI Guard policy for the proxy's service and environment. To keep the proxy in monitoring only, also add <code>block: false</code> under <code>litellm_params</code>.</div>

   <!-- TODO: same question as `DD_AI_GUARD_BLOCK` on the automatic integrations page. What is the use case for `block: false`, given that policy overrides already turn off blocking per service and environment? -->

1. Restart the LiteLLM Proxy so the proxy loads the guardrail.

For more about LiteLLM Proxy guardrails, see the [LiteLLM custom guardrail documentation][8].

**What's next?** [Create a retention filter for AI Guard spans][5], optionally [limit access to AI Guard spans][6], then [verify the setup][7].

[1]: /security/ai_guard/setup/automatic_integrations/
[2]: /security/ai_guard/setup/sdk/
[3]: /security/ai_guard/setup/#prerequisites
[4]: /security/ai_guard/setup/#create-keys
[5]: /security/ai_guard/setup/#retention-filter
[6]: /security/ai_guard/setup/#limit-access
[7]: /security/ai_guard/setup/#verify
[8]: https://docs.litellm.ai/docs/proxy/guardrails/custom_guardrail
