---
title: Automatic Integrations
description: Protect agents built on supported LLM frameworks and client libraries with AI Guard, without changing application code.
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard automatic integrations protect agents built on supported LLM frameworks and client libraries without any changes to application code. If your agent calls a supported package, you can enable AI Guard with environment variables instead of adding evaluation calls by hand.

When the application starts with the Datadog SDK loaded, the SDK detects supported packages and instruments them. Each instrumented model call and tool call goes to AI Guard for evaluation before the call proceeds.

## Supported frameworks and libraries

Automatic integrations work only with specific packages and versions. Check the agent's packages to confirm that an automatic integration applies.

| Language | Package | Package version | Datadog SDK version |
| --- | --- | --- | --- |
| Python | LangChain | 0.1.20 or later. | `dd-trace-py` 3.19.0 or later. |
| Python | OpenAI | 1.102.0 or later. | `dd-trace-py` 4.10.0 or later. |
| Python | Anthropic | 0.28.0 or later. | `dd-trace-py` 4.11.0 or later. |
| Node.js | AI SDK | v6. | `dd-trace-js` 5.96.0 or later. |
| Node.js | OpenAI | 4.87.0 or later. | `dd-trace-js` 5.105.0 or later. |
| Node.js | Anthropic | 0.14.0 or later. | `dd-trace-js` 5.122.0 or later in the v5 release line, or 6.11.0 or later. |
| Ruby | RubyLLM | 2.0.0 or later. With `dd-trace-rb` 2.28.0 through 2.43.x, 1.0.0 or later. | `dd-trace-rb` 2.28.0 or later. |

<!-- TODO: Confirm the RubyLLM package versions. Changed from "1.0.0 or later", because current dd-trace-rb sets the RubyLLM minimum to 2.0.0 (`MINIMUM_VERSION` in `lib/datadog/ai_guard/contrib/ruby_llm/integration.rb`, checked). The claim that the minimum changed in dd-trace-rb 2.44.0, so 2.28.0 through 2.43.x still support RubyLLM 1.0.0, comes from the v2.44.0 release notes as reported in a source review and wasn't re-checked. -->

<!-- TODO: Confirm the Node.js Anthropic minimum. dd-trace-js v5.122.0 and v6.11.0 both shipped 2026-08-17, and both release notes list Anthropic AI Guard support. -->

Automatic integrations don't support Java. For Java agents, use the [SDK][1]. For Amazon Strands and LiteLLM Proxy, use [manual integrations][2].

In Python, if LangChain calls a supported provider SDK such as OpenAI, AI Guard evaluates the call once, through the LangChain integration. Duplicate-evaluation prevention requires `dd-trace-py` 4.9.0 or later.

### Evaluated operations

Each automatic integration evaluates a specific set of operations, so check the operations your agent calls to confirm that AI Guard covers them. To evaluate calls not shown here, add [SDK][1] calls in your code.

| Language | Package | Evaluated operations |
| --- | --- | --- |
| Python | LangChain | LLM `invoke()` and `ainvoke()`, chat model `invoke()` and `ainvoke()`, and `BaseTool.invoke()` and `BaseTool.ainvoke()`. |
| Python | OpenAI | `client.chat.completions.create()`, `client.chat.completions.parse()`, `client.responses.create()`, and `client.responses.parse()`. |
| Python | Anthropic | `client.messages.create()` and `client.messages.stream()`. With the `anthropic` package 0.37.0 or later, also `client.beta.messages.create()` and `client.beta.messages.stream()`. |
| Node.js | AI SDK | `generateText`, `streamText`, `generateObject`, `streamObject`, and `tool.execute`. |
| Node.js | OpenAI | `client.chat.completions.create()`, `client.chat.completions.parse()`, and `client.responses.create()`. |
| Node.js | Anthropic | `client.messages.create()`. With the `@anthropic-ai/sdk` package 0.33.0 or later, also `client.beta.messages.create()`. |
| Ruby | RubyLLM | `RubyLLM::Chat#ask`, `RubyLLM::Chat#complete`, and `RubyLLM::Chat#handle_tool_calls`. |

### Limitations

Some calls through supported packages aren't evaluated or can't be blocked by default, so review these limits before you rely on automatic integrations alone.

- When an agent framework calls Amazon Bedrock, Google Gemini, or Ollama, AI Guard evaluates the calls but can't block them.

   <!-- TODO: Confirm. Source: internal support notes, June 2026. No public source found. -->

- By default, AI Guard doesn't evaluate streamed model responses.

   To enable evaluation of streamed responses, set `DD_AI_GUARD_ANALYZE_STREAM_RESPONSES_ENABLED=true`. The Datadog SDK then buffers each streamed response until AI Guard returns a result, and buffering delays the first token. Streamed response evaluation is supported for these packages at the specified Datadog SDK versions:

   | Language | Package | Datadog SDK version |
   | --- | --- | --- |
   | Python | OpenAI and Anthropic | `dd-trace-py` 4.12.0 or later. |
   | Node.js | AI SDK | `dd-trace-js` 6.16.0 or later. |
   | Node.js | OpenAI | `dd-trace-js` 6.17.0 or later. |
   | Node.js | Anthropic | `dd-trace-js` 6.19.0 or later. |

   <!-- TODO: Confirm non-support for LangChain and RubyLLM. Absence inferred from tracer source. -->

## Enable automatic integrations

Enable automatic integrations so the Datadog SDK sends every supported model call and tool call from the agent to AI Guard for evaluation.

**Before you begin**: [Check prerequisites][3], [Create API and application keys][4], and install a [supported Datadog SDK version](#supported-frameworks-and-libraries) in the application.

1. Set these environment variables in the application's environment:

   - `DD_AI_GUARD_ENABLED=true`. Without this value, AI Guard evaluates nothing.
   - `DD_API_KEY=<DATADOG_API_KEY>`.
   - `DD_APP_KEY=<DATADOG_APPLICATION_KEY>`. The application key needs the `ai_guard_evaluate` scope.
   - `DD_SERVICE=<SERVICE_NAME>`. Use the name the agent reports to APM.
   - `DD_ENV=<ENVIRONMENT>`.
   - `DD_TRACE_ENABLED=true`.

   <div class="alert alert-tip">To keep a Python or Node.js service in monitoring only, even when the service's AI Guard policy blocks unsafe requests, also set <code>DD_AI_GUARD_BLOCK=false</code>. <code>DD_AI_GUARD_BLOCK</code> can only turn blocking off. Ruby doesn't support <code>DD_AI_GUARD_BLOCK</code>, so for a Ruby service, change the enforcement mode in the service's <a href="/security/ai_guard/policies/">AI Guard policy</a> instead.</div>

   <!-- TODO: What is the use case for `DD_AI_GUARD_BLOCK`, given that policy overrides already turn off blocking per service and environment. Is this earning its space here? -->

1. Start the application with the Datadog SDK loaded:

   - **Python**: Run the application with `ddtrace-run`, or add `import ddtrace.auto` as the first import in the application.
   - **Node.js**: Start the application with `node --require dd-trace/init`, or call `require('dd-trace').init()` before any other module loads.
   - **Ruby**: Enable the RubyLLM integration in your Datadog configuration. RubyLLM isn't instrumented automatically, so `require 'datadog/auto_instrument'` alone doesn't enable it:

     ```ruby
     Datadog.configure do |config|
       config.ai_guard.instrument :ruby_llm
     end
     ```

   For other loading options, see [tracing setup for your language][5].

**What's next?** [Create a retention filter for AI Guard spans][6], optionally [limit access to AI Guard spans][7], then [verify the setup][8].

[1]: /security/ai_guard/setup/sdk/
[2]: /security/ai_guard/setup/manual_integrations/
[3]: /security/ai_guard/setup/#prerequisites
[4]: /security/ai_guard/setup/#create-keys
[5]: /tracing/trace_collection/
[6]: /security/ai_guard/setup/#retention-filter
[7]: /security/ai_guard/setup/#limit-access
[8]: /security/ai_guard/setup/#verify
