---
title: Automatic Integrations
description: Protect agents built on supported LLM frameworks and client libraries with AI Guard, without changing application code.
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard automatic integrations protect agents built on supported LLM frameworks and client libraries without adding AI Guard evaluation calls to your code. If your agent calls a supported package, you can enable AI Guard with environment variables instead of adding evaluation calls by hand.

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

<!-- TODO: Does it make sense that every package has a different supported Datadog SDK version? Is it possible to align them, for example on one minimum per language? The SDK and manual integrations require `dd-trace-py` 4.13.0 or later, but the automatic integrations table lists lower Python versions: LangChain at 3.19.0 (3.14.0 on the published page), OpenAI at 4.10.0, and Anthropic at 4.11.0. -->

<!-- TODO: Which RubyLLM versions should the docs list? Should they keep the older range for `dd-trace-rb` 2.28.0 through 2.43.x, or list only RubyLLM 2.0.0 or later?
- `dd-trace-rb` 2.28.0 added the RubyLLM integration, according to its release notes. The published docs pair it with RubyLLM 1.0.0 or later.
- The `dd-trace-rb` 2.44.0 release notes (October 7, 2026) say: "Require `ruby_llm` 2.0 or later for the `RubyLLM` integration." Current `dd-trace-rb` source sets the minimum to 2.0.0.
- The draft lists both: RubyLLM 2.0.0 or later, and RubyLLM 1.0.0 or later with `dd-trace-rb` 2.28.0 through 2.43.x.
-->

<!-- TODO: Is AI SDK v7 supported? If so, the AI SDK row can say "v6 or later." The `dd-trace-js` model-call hook has no upper version bound, but other AI SDK hooks stop before 7.0.0. -->

Automatic integrations don't support Java. For Java agents, use the [SDK][1]. For Amazon Strands and LiteLLM Proxy, use [manual integrations][2].

In Python, if LangChain calls a supported provider SDK such as OpenAI, AI Guard evaluates the call once, through the LangChain integration. Duplicate-evaluation prevention requires `dd-trace-py` 4.9.0 or later.

### Evaluated operations

Each automatic integration evaluates a specific set of operations, so check the operations your agent calls to confirm that AI Guard covers them. To evaluate calls not shown here, add [SDK][1] calls in your code.

| Language | Package | Evaluated operations |
| --- | --- | --- |
| Python | LangChain | LLM `invoke()` and `ainvoke()`, chat model `invoke()` and `ainvoke()`, and the tool calls that LangChain agents decide to run: AgentExecutor agents, and `create_agent` agents in LangChain 1.0 and later (`dd-trace-py` 4.12.0 or later). |
| Python | OpenAI | `client.chat.completions.create()`, `client.chat.completions.parse()`, `client.responses.create()`, and `client.responses.parse()`. |
| Python | Anthropic | `client.messages.create()` and `client.messages.stream()`. With the `anthropic` package 0.37.0 or later, also `client.beta.messages.create()` and `client.beta.messages.stream()`. |
| Node.js | AI SDK | Model calls from `generateText`, `streamText`, `generateObject`, and `streamObject`, including the tool calls and tool results they carry. |
| Node.js | OpenAI | `client.chat.completions.create()`, `client.chat.completions.parse()`, and `client.responses.create()`. |
| Node.js | Anthropic | `client.messages.create()`. With the `@anthropic-ai/sdk` package 0.33.0 or later, also `client.beta.messages.create()`. |
| Ruby | RubyLLM | `RubyLLM::Chat#ask` and `RubyLLM::Chat#complete`, including the tool calls the model requests. |

### Streamed responses

A streamed response arrives in pieces while the model generates it, instead of all at once. By default, AI Guard doesn't evaluate streamed model responses, so if your agent streams responses, the model's output reaches the user without an evaluation.

To enable evaluation of streamed responses, set `DD_AI_GUARD_ANALYZE_STREAM_RESPONSES_ENABLED=true`. The Datadog SDK then buffers each streamed response until AI Guard returns a result, and buffering delays the first token.

<!-- TODO: With `DD_AI_GUARD_ANALYZE_STREAM_RESPONSES_ENABLED=true`, does the SDK hold the whole stream until evaluation finishes, so a blocked response never reaches the client? The page says the SDK buffers each streamed response until AI Guard returns a result. If any part of the stream reaches the client earlier, blocking can't fully stop an unsafe response. -->

Streamed response evaluation is supported for these packages at the specified Datadog SDK versions:

| Language | Package | Datadog SDK version |
| --- | --- | --- |
| Python | OpenAI and Anthropic | `dd-trace-py` 4.12.0 or later. |
| Node.js | AI SDK | `dd-trace-js` 6.16.0 or later. |
| Node.js | OpenAI | `dd-trace-js` 6.17.0 or later. |
| Node.js | Anthropic | `dd-trace-js` 6.19.0 or later. |

<!-- TODO: Which other packages support streamed response evaluation?
- RubyLLM: Does AI Guard evaluate streamed RubyLLM responses, and does `DD_AI_GUARD_ANALYZE_STREAM_RESPONSES_ENABLED` work in Ruby? If so, add a row for it.
- LangChain: Which `dd-trace-py` release will add it? The `dd-trace-py` v4.16.0 release notes say streamed LangChain responses aren't evaluated, but `dd-trace-py` main has unreleased code that evaluates them when stream analysis is on.
-->

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

   To turn off APM tracing but keep AI Guard, set `DD_APM_TRACING_ENABLED=false`. Don't set `DD_TRACE_ENABLED` to `false`, because it breaks AI Guard in various ways depending on your agent's language.

   <div class="alert alert-tip">In Python, to turn off AI Guard for one integration without turning it off for the others, set <code>DD_AI_GUARD_OPENAI_ENABLED</code>, <code>DD_AI_GUARD_ANTHROPIC_ENABLED</code>, or <code>DD_AI_GUARD_LANGCHAIN_ENABLED</code> to <code>false</code>.</div>

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
