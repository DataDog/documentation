---
title: Auto Instrumentation
aliases:
    - /tracing/llm_observability/auto_instrumentation
    - /llm_observability/auto_instrumentation
    - /llm_observability/setup/auto_instrumentation
    - /llm_observability/sdk/auto_instrumentation
further_reading:
    - link: '/llm_observability/setup/sdk/python'
      tag: 'Documentation'
      text: 'Learn about the LLM Observability SDK for Python'
---


{{< tabs >}}
{{% tab "Python" %}}

## Overview

Datadog's [LLM Observability Python SDK][16] provides integrations that automatically trace and annotate calls to LLM frameworks and libraries. Without changing your code, you can get out-of-the-box traces and observability for calls that your LLM application makes to the following frameworks:

| Framework                                       | Supported Versions | Tracer Version |
|-------------------------------------------------|--------------------|----------------|
| [OpenAI](#openai), [Azure OpenAI](#openai)      | >= 0.26.5          | >= 2.9.0       |
| [Langchain](#langchain)                         | >= 0.0.192         | >= 2.9.0       |
| [Amazon Bedrock](#amazon-bedrock)               | >= 1.31.57         | >= 2.9.0       |
| [Amazon Bedrock Agents](#amazon-bedrock-agents) | >= 1.38.26         | >= 3.10.0      |
| [Anthropic](#anthropic)                         | >= 0.28.0          | >= 2.10.0      |
| [Google GenAI](#google-genai)                   | >= 1.21.1          | >= 3.11.0      |
| [Google GenerativeAI](#google-generativeai)     | >= 0.7.2           | >= 2.14.0      |
| [Vertex AI](#vertex-ai)                         | >= 1.71.1          | >= 2.18.0      |
| [LangGraph](#langgraph)                         | >= 0.2.23          | >= 3.10.1      |
| [Crew AI](#crew-ai)                             | >= 0.105.0         | >= 3.5.0       |
| [OpenAI Agents](#openai-agents)                 | >= 0.0.2           | >= 3.5.0       |
| [LiteLLM](#litellm)                             | >= 1.70.0          | >= 3.9.0       |
| [Pydantic AI](#pydantic-ai)                     | >= 0.3.0           | >= 3.11.0      |
| [MCP](#mcp)                                     | >= 1.10.0          | >= 3.11.0      |
| [Google ADK](#google-adk)                       | >= 1.0.0           | >= 3.15.0      |


You can programmatically enable automatic tracing of LLM calls to a supported LLM model like OpenAI or a framework like LangChain by setting `integrations_enabled` to `true` in the `LLMOBs.enable()` function. In addition to capturing latency and errors, the integrations capture the input parameters, input and output messages, and token usage (when available) of each traced call.

**Note:** When using the supported LLM Observability frameworks or libraries, no additional manual instrumentation (such as function decorators) is required to capture these calls. For custom or additional calls within your LLM application that are not automatically traced (like API calls, database queries, or internal functions), you can use [function decorators][18] to manually trace these operations and capture detailed spans for any part of your application that is not covered by auto-instrumentation.

## Enabling and disabling integrations

All integrations are enabled by default.

To disable all integrations, use the [in-code SDK setup][12] and specify `integrations_enabled=False`.

To only enable specific integrations:
1. Use the [in-code SDK setup][12], specifying `integrations_enabled=False`.
2. Manually enable the integration with `ddtrace.patch()` at the top of the entrypoint file of your LLM application:

```python
from ddtrace import patch
from ddtrace.llmobs import LLMObs

LLMObs.enable(integrations_enabled=False, ...)
patch(openai=True, langchain=True, botocore=["bedrock-runtime"], anthropic=True, gemini=True, vertexai=True, crewai=True, openai_agents=True, langgraph=True, litellm=True, google_genai=True)
```

## OpenAI

The OpenAI integration provides automatic tracing for the [OpenAI Python SDK's][1] completion and chat completion endpoints to OpenAI and Azure OpenAI.

### Traced methods

The OpenAI integration instruments the following methods, including streamed calls:

- [Completions][2]:
   - `OpenAI().completions.create()`, `AzureOpenAI().completions.create()`
   - `AsyncOpenAI().completions.create()`, `AsyncAzureOpenAI().completions.create()`
- [Chat completions][3]:
   - `OpenAI().chat.completions.create()`, `AzureOpenAI().chat.completions.create()`
   - `AsyncOpenAI().chat.completions.create()`, `AsyncAzureOpenAI().chat.completions.create()`
- [Responses][50]:
   - `OpenAI().responses.create()`
   - `AsyncOpenAI().responses.create()`
-  [Calls made to DeepSeek through the OpenAI Python SDK][54] (as of `ddtrace==3.1.0`)

## LangChain

The LangChain integration provides automatic tracing for the [LangChain Python SDK's][4] LLM, chat model, and chain calls.

### Traced methods

The LangChain integration instruments the following methods:

- [LLMs][13]:
  - `llm.invoke()`, `llm.ainvoke()`
  - `llm.stream()`, `llm.astream()`
- [Chat models][14]
  - `chat_model.invoke()`, `chat_model.ainvoke()`
  - `chat_model.stream()`, `chat_model.astream()`
- [Chains/LCEL][15]
  - `chain.invoke()`, `chain.ainvoke()`
  - `chain.batch()`, `chain.abatch()`
  - `chain.stream()`, `chain.astream()`
- [Embeddings][17]
  - OpenAI : `OpenAIEmbeddings.embed_documents()`, `OpenAIEmbeddings.embed_query()`
- [Tools][24]
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`
- [Retrieval][25]
  - `langchain_community.<vectorstore>.similarity_search()`
  - `langchain_pinecone.similarity_search()`
- [Prompt Templating][64]
  - `BasePromptTemplate.invoke()`, `BasePromptTemplate.ainvoke()`

  **Note**: For best results, assign templates to variables with meaningful names, as auto-instrumentation uses these names to identify prompts.

  ```python
  # "translation_template" will be used to identify the template in Datadog
  translation_template = PromptTemplate.from_template("Translate {text} to {language}")
  chain = translation_template | llm
  ```

## Amazon Bedrock

The Amazon Bedrock integration provides automatic tracing for the Amazon Bedrock Runtime Python SDK's chat model calls (using [Boto3][5]/[Botocore][6]).

### Traced methods

The Amazon Bedrock integration instruments the following methods:

- [Chat messages][7]:
  - `InvokeModel`
- [Streamed chat messages][8]:
  -  `InvokeModelWithResponseStream`
- [Chat messages][31]:
  - `Converse` (requires ddtrace>=3.4.0)
- [Streamed chat messages][32]:
  - `ConverseStream` (requires ddtrace>=3.5.0)

**Note:** The Amazon Bedrock integration does not yet support tracing embedding calls

## Amazon Bedrock Agents

The Amazon Bedrock Agents integration provides automatic tracing for the Amazon Bedrock Agents Runtime Python SDK's agent invoke calls (using [Boto3][5]/[Botocore][6]).

### Traced methods

The Amazon Bedrock Agents integration instruments the following methods:

- [Invoke Agent][53]:
  - `InvokeAgent` (requires ddtrace>=3.10.0)

**Note:** The Amazon Bedrock Agents integration will only trace the overall `InvokeAgent` method by default. To enable
tracing intra-agent steps, you must set `enableTrace=True` in the `InvokeAgent` request parameters.

## Anthropic

The Anthropic integration provides automatic tracing for the [Anthropic Python SDK's][9] chat message calls.

### Traced methods

The Anthropic integration instruments the following methods:

- [Chat messages][10] (including streamed calls):
  - `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
- [Streamed chat messages][11]:
  - `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

## Google GenAI

The Google GenAI integration automatically traces methods in the [Google GenAI Python SDK][19].

**Note:** The [Google GenAI Python SDK][19] succeeds the Google GenerativeAI SDK, and exposes both Gemini Developer API as well as Vertex.

### Traced methods

The Google GenAI integration instruments the following methods:

- [Generating content][20] (including streamed calls):
  - `models.generate_content()` (Also captures `chat.send_message()`)
  - `aio.models.generate_content()` (Also captures `aio.chat.send_message()`)
- [Embedding content][51]
  -`models.embed_content()`
  -`aio.models.embed_content()`


## Google GenerativeAI

The Google GenerativeAI integration provides automatic tracing for the Google GenerativeAI Python SDK content generation calls.

**Note:** The [Google Generative AI SDK][52] is deprecated, and succeeded by Google GenAI.

### Traced methods

The Google GenerativeAI integration instruments the following methods:

- Generating content (including streamed calls):
  - `model.generate_content()` (Also captures `chat.send_message()`)
  - `model.generate_content_async()` (Also captures `chat.send_message_async()`)

## Vertex AI

The Vertex AI integration automatically traces content generation and chat message calls made through [Google's Vertex AI Python SDK][21].

### Traced methods

The Vertex AI integration instruments the following methods:

- [Generating content][22] (including streamed calls):
  - `model.generate_content()`
  - `model.generate_content_async()`

- [Chat Messages][23] (including streamed calls):
  - `chat.send_message()`
  - `chat.send_message_async()`

## Crew AI

The Crew AI integration automatically traces execution of Crew kickoffs, including task/agent/tool invocations, made through [CrewAI's Python SDK][26].

### Traced methods

The Crew AI integration instruments the following methods:

- [Crew Kickoff][27]:
  - `crew.kickoff()`
  - `crew.kickoff_async()`
  - `crew.kickoff_for_each()`
  - `crew.kickoff_for_each_async()`

- [Task Execution][28]:
  - `task.execute_sync()`
  - `task.execute_async()`

- [Agent Execution][29]:
  - `agent.execute_task()`

- [Tool Invocation][30]:
  - `tool.invoke()`

## OpenAI Agents

The OpenAI Agents integration converts the [built-in tracing][33] from the [OpenAI Agents SDK][34] into
LLM Observability format and sends it to Datadog's LLM Observability product by adding a Datadog trace processor.

The following operations are supported:
- [`traces`][35]
- [`agent`][36]
- [`generation`][37] using Datadog's [OpenAI](#openai) integration
- [`response`][38]
- [`guardrail`][39]
- [`handoff`][40]
- [`function`][41]
- [`custom`][42]

## LangGraph

The LangGraph integration automatically traces `Pregel/CompiledGraph` and `RunnableSeq (node)` invocations made through the [LangGraph Python SDK][43].

### Traced methods

The LangGraph integration instruments synchronous and asynchronous versions of the following methods:

- [CompiledGraph.invoke(), Pregel.invoke(), CompiledGraph.stream(), Pregel.stream()][44]
- [RunnableSeq.invoke()][45]


## LiteLLM

The LiteLLM integration provides automatic tracing for the [LiteLLM Python SDK][46] and [proxy server router methods][47].

### Traced methods

The LiteLLM integration instruments the following methods:

- [Chat Completions][48] (including streamed calls):
  - `litellm.completion`
  - `litellm.acompletion`
- [Completions][49] (including streamed calls):
  - `litellm.text_completion`
  - `litellm.atext_completion`
- Router Chat Completions (including streamed calls):
  - `router.Router.completion`
  - `router.Router.acompletion`
- Router Completions (including streamed calls):
  - `router.Router.text_completion`
  - `router.Router.atext_completion`

## Pydantic AI

The Pydantic AI integration instruments agent invocations and tool calls made using the [Pydantic AI][55] agent framework.

### Traced methods

The Pydantic AI integration instruments the following methods:

- [Agent Invocations][56] (including any tools or toolsets associated with the agent):
  - `agent.Agent.iter` (also traces `agent.Agent.run` and `agent.Agent.run_sync`)
  - `agent.Agent.run_stream`

## MCP

The Model Context Protocol (MCP) integration instruments client and server tool calls in the [MCP][57] SDK.

### Traced methods

The MCP integration instruments the following methods:

- [Client Tool Calls][58]:
  - `mcp.client.session.ClientSession.call_tool`

- [Server Tool Calls][59]:
  - `mcp.server.fastmcp.tools.tool_manager.ToolManager.call_tool`


## Google ADK

The Google ADK integration provides automatic tracing for agent runs, tool calls, and code executions made through [Google's ADK Python SDK][60].

### Traced methods

The Google ADK integration instruments the following methods:

- [Agent Runs][61]
- [Tool Calls][62]
- [Code Executions][63]

Both the `run_live` and `run_async` methods are supported.

[1]: https://platform.openai.com/docs/api-reference/introduction
[2]: https://platform.openai.com/docs/api-reference/completions
[3]: https://platform.openai.com/docs/api-reference/chat
[4]: https://python.langchain.com/docs/introduction/
[5]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[6]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[7]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[8]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html
[9]: https://docs.anthropic.com/en/api/client-sdks#python
[10]: https://docs.anthropic.com/en/api/messages
[11]: https://docs.anthropic.com/en/api/messages-streaming
[12]: /llm_observability/setup/sdk/python/#in-code-setup
[13]: https://python.langchain.com/v0.2/docs/concepts/#llms
[14]: https://python.langchain.com/docs/concepts/chat_models/
[15]: https://python.langchain.com/docs/concepts/runnables/
[16]: /llm_observability/setup/sdk/python
[17]: https://python.langchain.com/docs/concepts/embedding_models/
[18]: /llm_observability/setup/sdk/#tracing-spans
[19]: https://ai.google.dev/gemini-api/docs
[20]: https://ai.google.dev/api/generate-content#method:-models.generatecontent
[21]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest
[22]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_preview_generative_models_GenerativeModel_generate_content_summary
[23]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_generative_models_ChatSession_send_message_summary
[24]: https://python.langchain.com/docs/concepts/tools/
[25]: https://python.langchain.com/docs/concepts/retrieval/
[26]: https://docs.crewai.com/introduction
[27]: https://docs.crewai.com/concepts/crews#kicking-off-a-crew
[28]: https://docs.crewai.com/concepts/tasks
[29]: https://docs.crewai.com/concepts/agents
[30]: https://docs.crewai.com/concepts/tools
[31]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html
[32]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html
[33]: https://openai.github.io/openai-agents-python/tracing/
[34]: https://openai.github.io/openai-agents-python/
[35]: https://openai.github.io/openai-agents-python/ref/tracing/traces/
[36]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.agent_span
[37]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.generation_span
[38]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.response_span
[39]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.guardrail_span
[40]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.handoff_span
[41]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.function_span
[42]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.custom_span
[43]: https://langchain-ai.github.io/langgraph/concepts/sdk/
[44]: https://blog.langchain.dev/langgraph/#compile
[45]: https://blog.langchain.dev/langgraph/#nodes
[46]: https://docs.litellm.ai/docs/#litellm-python-sdk
[47]: https://docs.litellm.ai/docs/routing
[48]: https://docs.litellm.ai/docs/completion
[49]: https://docs.litellm.ai/docs/text_completion
[50]: https://platform.openai.com/docs/api-reference/responses
[51]: https://ai.google.dev/api/embeddings#method:-models.embedcontent
[52]: https://github.com/google-gemini/deprecated-generative-ai-python
[53]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_InvokeAgent.html
[54]: https://api-docs.deepseek.com/
[55]: https://ai.pydantic.dev/
[56]: https://ai.pydantic.dev/agents/
[57]: https://modelcontextprotocol.io/docs/getting-started/intro
[58]: https://github.com/modelcontextprotocol/python-sdk?tab=readme-ov-file#writing-mcp-clients
[59]: https://github.com/modelcontextprotocol/python-sdk?tab=readme-ov-file#tools
[60]: https://google.github.io/adk-docs/#python
[61]: https://google.github.io/adk-docs/agents/
[62]: https://google.github.io/adk-docs/tools
[63]: https://google.github.io/adk-docs/agents/llm-agents/#code-execution
[64]: https://docs.langchain.com/langsmith/manage-prompts-programmatically#pull-a-prompt

{{% /tab %}}
{{% tab "Node.js" %}}

## Overview

Datadog's [LLM Observability Node.js SDK][4] provides integrations that automatically trace and annotate calls to LLM frameworks and libraries. Without changing your code, you can get out-of-the-box traces and observability for calls that your LLM application makes to the following frameworks:


| Framework                                  | Supported Versions | Tracer Version                              |
|--------------------------------------------|--------------------|---------------------------------------------|
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 4.49.0, >= 5.25.0 (CJS), >= 5.38.0 (ESM) |
| [LangChain](#langchain)                    | >= 0.1.0           | >= 5.32.0 (CJS), >=5.38.0 (ESM)             |
| [Amazon Bedrock](#amazon-bedrock)          | >= 3.422.0         | >= 5.35.0 (CJS), >=5.35.0 (ESM)             |
| [VertexAI](#vertex-ai)                     | >= 1.0.0           | >= 5.44.0 (CJS), >=5.44.0 (ESM)             |
| [Vercel AI SDK](#vercel-ai-sdk)            | >=4.0.0            | >= 5.63.0 (CJS), >=5.63.0 (ESM)             |
| [Anthropic](#anthropic)                    | >= 0.14.0          | >= 5.71.0 (CJS), >=5.71.0 (ESM)             |

In addition to capturing latency and errors, the integrations capture the input parameters, input and output messages, and token usage (when available) of each traced call.

## Enabling and disabling integrations

All integrations are enabled by default.

To disable all integrations, use the [in-code SDK setup][6] and specify `plugins: false` on the general tracer configuration.

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
```

To only enable specific integrations:
1. Use the [in-code SDK setup][6], specifying `plugins: false`.
2. Manually enable the integration with `tracer.use()` at the top of the entrypoint file of your LLM application:

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});

const { llmobs } = tracer;
tracer.use('openai', true);
```

Additionally, you can set the following environment variables for more specific control over library patching and the integration that starts the span:

`DD_TRACE_DISABLED_PLUGINS`
: **Example**: `DD_TRACE_DISABLED_PLUGINS=openai,http`<br>
A comma-separated string of integration names automatically disabled when the tracer is initialized.

`DD_TRACE_DISABLED_INSTRUMENTATIONS`
: **Example**: `DD_TRACE_DISABLED_INSTRUMENTATIONS=openai,http`<br>
A comma-separated string of library names that are not patched when the tracer is initialized.

## OpenAI

The OpenAI integration provides automatic tracing for the [OpenAI Node.js SDK's][1] completion, chat completion, and embeddings endpoints to OpenAI and [Azure OpenAI][28].

### Traced methods

The OpenAI integration instruments the following methods, including streamed calls:

- [Completions][2]:
  - `openai.completions.create()` and `azureopenai.completions.create()`
- [Chat completions][3]:
  - `openai.chat.completions.create()` and `azureopenai.chat.completions.create()`
- [Embeddings][5]:
  - `openai.embeddings.create()` and `azureopenai.embeddings.create()`
- [Calls made to DeepSeek through the OpenAI Node.js SDK][21] (as of `dd-trace@5.42.0`)

## LangChain

The LangChain integration provides automatic tracing for the [LangChain Node.js SDK's][9] LLM, chat model, chain, and OpenAI embeddings calls.

### Traced methods

The LangChain integration instruments the following methods:

- [LLMs][10]:
  - `llm.invoke()`
- [Chat models][11]
  - `chat_model.invoke()`
- [Chains][12]
  - `chain.invoke()`
  - `chain.batch()`
- [Embeddings][13]
  - `embeddings.embedQuery()`
  - `embeddings.embedDocuments()`

## Amazon Bedrock

The Amazon Bedrock integration provides automatic tracing for the Amazon Bedrock Runtime Node.js SDK's chat model calls (using [BedrockRuntimeClient][20]).

### Traced methods

The Amazon Bedrock integration instruments the following methods:

- [Chat messages][16]:
  - `InvokeModel`

## Vertex AI

The Vertex AI integration automatically traces content generation and chat message calls made through [Google's Vertex AI Node.js SDK][17].

### Traced methods

The Vertex AI integration instruments the following methods:

- [Generating content][18]:
  - `model.generateContent()`
  - `model.generateContentStream()`
- [Chat Messages][19]:
  - `chat.sendMessage()`
  - `chat.sendMessageStream()`

## Vercel AI SDK

The [Vercel AI SDK][22] integration automatically traces text and object generation, embeddings, and tool calls by intercepting the OpenTelemetry spans created by the underlying core Vercel AI SDK and converting them into Datadog LLM Observability spans.

### Traced methods
- [Text generation][24]:
  - `generateText`
  - `streamText`
- [Object generation][25]:
  - `generateObject`
  - `streamObject`
- [Embedding][26]:
  - `embed`
  - `embedMany`
- [Tool calling][27]:
  - `tool.execute`

### Vercel AI Core SDK telemetry

This integration automatically patches the tracer passed into each of the traced methods under the [`experimental_telemetry` option][23]. If no `experimental_telemetry` configuration is passed in, the integration enables it to still send LLM Observability spans.

```javascript
require('dd-trace').init({
  llmobs: {
    mlApp: 'my-ml-app',
  }
});

const { generateText } = require('ai');
const { openai } = require('@ai-sdk/openai');

async function main () {
  let result = await generateText({
    model: openai('gpt-4o'),
    ...
    experimental_telemetry: {
      isEnabled: true,
      tracer: someTracerProvider.getTracer('ai'), // this tracer will be patched to format and send created spans to Datadog LLM Observability
    }
  });

  result = await generateText({
    model: openai('gpt-4o'),
    ...
  }); // since no tracer is passed in, the integration will enable it to still send LLM Observability spans
}
```

**Note**: If `experimental_telemetry.isEnabled` is set to `false`, the integration does not turn it on, and does not send spans to LLM Observability.

## Anthropic

The Anthropic integration provides automatic tracing for the [Anthropic Python SDK's][29] chat message calls.

### Traced methods

The Anthropic integration instruments the following methods:

- [Chat messages][30] (including streamed calls):
  - `anthropic.messages.create()`
- [Streamed chat messages][31]:
  - `anthropic.messages.stream()`

## ESM support

Auto-instrumentation for ECMAScript Module projects is supported starting from `dd-trace@>=5.38.0`. To enable auto-instrumentation in your ESM projects, run your application with the following Node option:

```bash
--import dd-trace/register.js
```

For [command-line setup][14], use the following option instead:

```bash
--import dd-trace/initialize.mjs
# or
--loader dd-trace/initialize.mjs
```

If there are errors launching your application when using this option, it is likely a module incompatibility. You can create your own hook file with the module and file in question excluded:

```javascript
// hook.mjs

import { register } from 'node:module';

register('import-in-the-middle/hook.mjs', import.meta.url, {
  parentURL: import.meta.url,
  data: { exclude: [
    /langsmith/,
    /openai\/_shims/,
    /openai\/resources\/chat\/completions\/messages/,
    // Add any other modules you want to exclude
  ]}
});
```

To use this custom loader, run your application with the following Node option:

```bash
--import ./hook.mjs
```

## Bundling support
To use LLM Observability integrations in bundled applications (esbuild, Webpack, Next.js), you must exclude those integrations' modules from bundling.

If you are using esbuild, or for more specific information on why tracing does not work directly with bundlers, refer to [Bundling with the Node.js tracer][8].

For Webpack or Next.js bundling, specify the corresponding integration in the `externals` section of the webpack configuration:

```javascript
// next.config.js
module.exports = {
  webpack: (config) => {
    // this may be a necessary inclusion
    config.resolve.fallback = {
      ...config.resolve.fallback,
      graphql: false,
    }

    // exclude OpenAI from bundling
    config.externals.push('openai')

    return config
  }
}

// webpack.config.js
module.exports = {
  resolve: {
    fallback: {
      graphql: false,
    }
  },
  externals: {
    openai: 'openai'
  }
}
```

[1]: https://platform.openai.com/docs/api-reference/introduction
[2]: https://platform.openai.com/docs/api-reference/completions
[3]: https://platform.openai.com/docs/api-reference/chat
[4]: /llm_observability/setup/sdk/nodejs
[5]: https://platform.openai.com/docs/api-reference/embeddings
[6]: /llm_observability/setup/sdk/nodejs/#in-code-setup
[7]: /llm_observability/setup/sdk/nodejs/#tracing-spans-using-inline-methods
[8]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling
[9]: https://js.langchain.com/docs/introduction/
[10]: https://js.langchain.com/docs/integrations/llms/
[11]: https://js.langchain.com/docs/concepts/chat_models
[12]: https://js.langchain.com/docs/how_to/sequence/
[13]: https://js.langchain.com/docs/integrations/text_embedding/
[14]: /llm_observability/setup/sdk/nodejs/#command-line-setup
[15]: https://www.npmjs.com/package/@aws-sdk/client-bedrock-runtime
[16]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[17]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest
[18]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest#send-text-prompt-requests
[19]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest#send-multiturn-chat-requests
[20]: https://www.npmjs.com/package/@aws-sdk/client-bedrock-runtime
[21]: https://api-docs.deepseek.com/
[22]: https://ai-sdk.dev/docs/introduction
[23]: https://ai-sdk.dev/docs/ai-sdk-core/telemetry
[24]: https://ai-sdk.dev/docs/ai-sdk-core/generating-text
[25]: https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
[26]: https://ai-sdk.dev/docs/ai-sdk-core/embeddings
[27]: https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
[28]: https://www.npmjs.com/package/openai#microsoft-azure-openai
[29]: https://docs.claude.com/en/api/client-sdks#typescript
[30]: https://docs.anthropic.com/en/api/messages
[31]: https://docs.anthropic.com/en/api/messages-streaming
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
