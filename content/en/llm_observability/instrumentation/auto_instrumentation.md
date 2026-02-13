---
title: Automatic Instrumentation for LLM Observability
aliases:
    - /tracing/llm_observability/auto_instrumentation
    - /llm_observability/auto_instrumentation
    - /llm_observability/setup/auto_instrumentation
    - /llm_observability/sdk/auto_instrumentation
further_reading:
    - link: '/llm_observability/instrumentation/sdk/'
      tag: 'Documentation'
      text: 'LLM Observability SDK Reference'
    - link: https://www.datadoghq.com/blog/llm-prompt-tracking
      tag: Blog
      text: Track, compare, and optimize your LLM prompts with Datadog LLM Observability
    - link: https://www.datadoghq.com/blog/mcp-client-monitoring
      tag: Blog
      text: Gain end-to-end visibility into MCP clients with Datadog LLM Observability
---

## Overview

Datadog's LLM Observability can automatically trace and annotate calls to supported LLM frameworks and libraries through various [LLM integrations](#llm-integrations). When you [run your LLM application with the LLM Observability SDK][2], these LLM integrations are enabled by default and provide out-of-the-box traces and observability, without you having to change your code.

<div class="alert alert-info">Automatic instrumentation works for calls to <a href="#supported-frameworks-and-libraries">supported frameworks and libraries</a>. To trace other calls (for example: API calls, database queries, internal functions), see the <a href="/llm_observability/instrumentation/sdk">LLM Observability SDK reference</a> for how to add manual instrumentation.</div>


### Supported frameworks and libraries
{{< tabs >}}
{{% tab "Python" %}}
| Framework                                       | Supported Versions | Tracer Version |
|-------------------------------------------------|--------------------|----------------|
| [Amazon Bedrock](#amazon-bedrock)               | >= 1.31.57         | >= 2.9.0       |
| [Amazon Bedrock Agents](#amazon-bedrock-agents) | >= 1.38.26         | >= 3.10.0      |
| [Anthropic](#anthropic)                         | >= 0.28.0          | >= 2.10.0      |
| [CrewAI](#crewai)                               | >= 0.105.0         | >= 3.5.0       |
| [Google ADK](#google-adk)                       | >= 1.0.0           | >= 3.15.0      |
| [Google GenAI](#google-genai)                   | >= 1.21.1          | >= 3.11.0      |
| [LangChain](#langchain)                         | >= 0.0.192         | >= 2.9.0       |
| [LangGraph](#langgraph)                         | >= 0.2.23          | >= 3.10.1      |
| [LiteLLM](#litellm)                             | >= 1.70.0          | >= 3.9.0       |
| [MCP](#mcp)                                     | >= 1.10.0          | >= 3.11.0      |
| [OpenAI](#openai), [Azure OpenAI](#openai)      | >= 0.26.5          | >= 2.9.0       |
| [OpenAI Agents](#openai-agents)                 | >= 0.0.2           | >= 3.5.0       |
| [Pydantic AI](#pydantic-ai)                     | >= 0.3.0           | >= 3.11.0      |
| [Vertex AI](#vertex-ai)                         | >= 1.71.1          | >= 2.18.0      |


{{% /tab %}}
{{% tab "Node.js" %}}
| Framework                                  | Supported Versions | Tracer Version                              |
|--------------------------------------------|--------------------|---------------------------------------------|
| [Amazon Bedrock](#amazon-bedrock)          | >= 3.422.0         | >= 5.35.0 (CJS), >=5.35.0 (ESM)             |
| [Anthropic](#anthropic)                    | >= 0.14.0          | >= 5.71.0 (CJS), >=5.71.0 (ESM)             |
| [LangChain](#langchain)                    | >= 0.1.0           | >= 5.32.0 (CJS), >=5.38.0 (ESM)             |
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 4.49.0, >= 5.25.0 (CJS), >= 5.38.0 (ESM) |
| [Vercel AI SDK](#vercel-ai-sdk)            | >=4.0.0            | >= 5.63.0 (CJS), >=5.63.0 (ESM)             |
| [VertexAI](#vertex-ai)                     | >= 1.0.0           | >= 5.44.0 (CJS), >=5.44.0 (ESM)             |
| [Google GenAI](#google-genai)              | >= 1.19.0          | >= 5.81.0 (CJS), >=5.81.0 (ESM)             |

{{% collapse-content title="Support for ESMAScript Modules (ESM)" level="h4" expanded=false id="esm-support" %}}
Automatic instrumentation for ESM projects is supported starting from `dd-trace@>=5.38.0`. To enable automatic instrumentation in your ESM projects, use the [command-line setup](/llm_observability/instrumentation/sdk/?tab=nodejs#command-line-setup) and the following Node option when running your application:

```bash
--import dd-trace/initialize.mjs
```

For example:

```bash
node --import dd-trace/initialize.mjs app.js
# or
NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
```
{{% /collapse-content %}}

{{% collapse-content title="Support for bundled applications (esbuild, Webpack)" level="h4" expanded=false id="bundling-support" %}}
To use LLM Observability integrations in bundled applications (esbuild, Webpack), you must exclude these integrations' modules from bundling.

##### esbuild
If you are using esbuild, see [Bundling with the Node.js tracer](/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling).

##### Webpack
For Webpack, specify the corresponding integration in the `externals` section of the webpack configuration:

```javascript
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
{{% /collapse-content %}}

{{% collapse-content title="Support for Next.js" level="h4" expanded=false id="nextjs-support" %}}
Properly initialize the tracer in your application to ensure auto-instrumentation works correctly. If using TypeScript or ESM for your Next.js application, initialize the tracer in a `instrumentation.{ts/js}` file as follows, specifying your configuration options as environment variables:

```typescript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const initializeImportName = 'dd-trace/initialize.mjs';
    await import(/* webpackIgnore: true */ initializeImportName as 'dd-trace/initialize.mjs')
  }

  // ...
}
```

Otherwise, for CommonJS Next.js applications, you can use the `init` function directly:

```javascript
// instrumentation.js
const tracer = require('dd-trace')

function register () {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    tracer.init({}); // specify options here or they will be read from environment variables
  }

  // ...
}

module.exports = register;
```


Then, make sure to specify `dd-trace` and any other supported integration package names in `serverExternalPackages` in your `next.config.{ts/js}` file:
```javascript
// next.config.ts
module.exports = {
  serverExternalPackages: ['dd-trace', '<INTEGRATION_PACKAGE_NAME>'], // add any other supported integration package names here to be auto-instrumented
}
```
{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

## LLM integrations

Datadog's LLM integrations capture latency, errors, input parameters, input and output messages, and token usage (when available) for traced calls.

{{% collapse-content title="Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock" %}}
{{< tabs >}}
{{% tab "Python" %}}
The [Amazon Bedrock integration][1] provides automatic instrumentation for the Amazon Bedrock Runtime Python SDK's chat model calls (using [Boto3][2]/[Botocore][3]).

**Package name:** `boto3`
**Integration name:** `botocore`

### Traced methods

The Amazon Bedrock integration instruments the following methods:

- [Chat messages][4]:
  - `InvokeModel`
- [Streamed chat messages][5]:
  -  `InvokeModelWithResponseStream`
- [Chat messages][6]:
  - `Converse` (requires `ddtrace>=3.4.0`)
- [Streamed chat messages][7]:
  - `ConverseStream` (requires `ddtrace>=3.5.0`)

<div class="alert alert-info">The Amazon Bedrock integration does not support tracing embedding calls.</div>

[1]: /integrations/amazon-bedrock
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[4]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[5]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html
[6]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html
[7]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html
{{% /tab %}}

{{% tab "Node.js" %}}
The [Amazon Bedrock integration][1] provides automatic tracing for the Amazon Bedrock Runtime Node.js SDK's chat model calls (using [BedrockRuntimeClient][2]).

**Package name:** `@aws-sdk/client-bedrock-runtime`
**Integration name:** `aws-sdk`

### Traced methods

The Amazon Bedrock integration instruments the following methods:

- [Chat messages][3]:
  - `InvokeModel`
  - `InvokeModelWithResponseStream`

[1]: /integrations/amazon-bedrock
[2]: https://www.npmjs.com/package/@aws-sdk/client-bedrock-runtime
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Amazon Bedrock Agents" level="h3" expanded=false id="amazon-bedrock-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
The Amazon Bedrock Agents integration provides automatic tracing for the Amazon Bedrock Agents Runtime Python SDK's agent invoke calls (using [Boto3][1]/[Botocore][2]).

**Package name:** `boto3`
**Integration name:** `botocore`

### Traced methods

The Amazon Bedrock Agents integration instruments the following methods:

- [Invoke Agent][3]:
  - `InvokeAgent` (requires ddtrace>=3.10.0)

<div class="alert alert-info">The Amazon Bedrock Agents integration, by default, only traces the overall <code>InvokeAgent</code> method. To enable
tracing intra-agent steps, you must set <code>enableTrace=True</code> in the <code>InvokeAgent</code> request parameters.</div>

[1]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[2]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_InvokeAgent.html
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Anthropic" level="h3" expanded=false id="anthropic" %}}
{{< tabs >}}
{{% tab "Python" %}}
The [Anthropic integration][1] provides automatic tracing for the [Anthropic Python SDK's][2] chat message calls.

**Package name:** `anthropic`
**Integration name:** `anthropic`

### Traced methods

The Anthropic integration instruments the following methods:

- [Chat messages][3] (including streamed calls):
  - `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
- [Streamed chat messages][4]:
  - `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

[1]: /integrations/anthropic
[2]: https://docs.anthropic.com/en/api/client-sdks#python
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messages-streaming
{{% /tab %}}

{{% tab "Node.js" %}}
The [Anthropic integration][1] provides automatic tracing for the [Anthropic Node.js SDK's][2] chat message calls.

**Package name:** `@anthropic-ai/sdk`
**Integration name:** `anthropic`

### Traced methods

The Anthropic integration instruments the following methods:

- [Chat messages][3] (including streamed calls):
  - `anthropic.messages.create()`
- [Streamed chat messages][4]:
  - `anthropic.messages.stream()`

[1]: /integrations/anthropic
[2]: https://docs.claude.com/en/api/client-sdks#typescript
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messages-streaming
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="CrewAI" level="h3" expanded=false id="crewai" %}}
{{< tabs >}}
{{% tab "Python" %}}
The [CrewAI integration][1] automatically traces execution of Crew kickoffs, including task/agent/tool invocations, made through [CrewAI's Python SDK][2].

**Package name:** `crewai`
**Integration name:** `crewai`

### Traced methods

The CrewAI integration instruments the following methods:

- [Crew Kickoff][3]:
  - `crew.kickoff()`
  - `crew.kickoff_async()`
  - `crew.kickoff_for_each()`
  - `crew.kickoff_for_each_async()`

- [Task Execution][4]:
  - `task.execute_sync()`
  - `task.execute_async()`

- [Agent Execution][5]:
  - `agent.execute_task()`

- [Tool Invocation][6]:
  - `tool.invoke()`

[1]: /integrations/crewai
[2]: https://docs.crewai.com/introduction
[3]: https://docs.crewai.com/concepts/crews#kicking-off-a-crew
[4]: https://docs.crewai.com/concepts/tasks
[5]: https://docs.crewai.com/concepts/agents
[6]: https://docs.crewai.com/concepts/tools
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Google ADK" level="h3" expanded=false id="google-adk" %}}
{{< tabs >}}
{{% tab "Python" %}}
The Google ADK integration provides automatic tracing for agent runs, tool calls, and code executions made through [Google's ADK Python SDK][1].

**Package name:** `google-adk`
**Integration name:** `google_adk`

### Traced methods

The Google ADK integration instruments the following methods:

- [Agent Runs][2]
- [Tool Calls][3]
- [Code Executions][4]

Both `run_live` and `run_async` methods are supported.

[1]: https://google.github.io/adk-docs/#python
[2]: https://google.github.io/adk-docs/agents/
[3]: https://google.github.io/adk-docs/tools
[4]: https://google.github.io/adk-docs/agents/llm-agents/#code-execution
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Google GenAI" level="h3" expanded=false id="google-genai" %}}
{{< tabs >}}
{{% tab "Python" %}}
The Google GenAI integration automatically traces methods in the [Google GenAI Python SDK][1].

**Package name:** `google-genai`
**Integration name:** `google_genai`

**Note:** The [Google GenAI Python SDK][1] succeeds the Google GenerativeAI SDK, and exposes both Gemini Developer API as well as Vertex.

### Traced methods

The Google GenAI integration instruments the following methods:

- [Generating content][2] (including streamed calls):
  - `models.generate_content()` (Also captures `chat.send_message()`)
  - `aio.models.generate_content()` (Also captures `aio.chat.send_message()`)
- [Embedding content][3]
  -`models.embed_content()`
  -`aio.models.embed_content()`

[1]: https://ai.google.dev/gemini-api/docs
[2]: https://ai.google.dev/api/generate-content#method:-models.generatecontent
[3]: https://ai.google.dev/api/embeddings#method:-models.embedcontent
{{% /tab %}}
{{% tab "Node.js" %}}
The Google GenAI integration automatically traces methods in the [Google GenAI Node.js SDK][1] by instrumenting the [`@google/genai` package][4].

**Note:** The [Google GenAI Node.js SDK][1] succeeds the [Google GenerativeAI SDK][6], and exposes both Gemini Developer API as well as Vertex.

**Package name:** `@google/genai`
**Integration name:** `google-genai`

### Traced methods

The Google GenAI integration instruments the following methods:

- [Generating content][2] (including [streamed calls][5])
- [Embedding content][3]

[1]: https://ai.google.dev/gemini-api/docs#javascript
[2]: https://ai.google.dev/api/generate-content#text_gen_text_only_prompt-JAVASCRIPT
[3]: https://ai.google.dev/api/embeddings#embed_content-JAVASCRIPT
[4]: https://www.npmjs.com/package/@google/genai
[5]: https://ai.google.dev/api/generate-content#text_gen_text_only_prompt_streaming-JAVASCRIPT
[6]: https://www.npmjs.com/package/@google/generative-ai
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="LangChain" level="h3" expanded=false id="langchain" %}}
{{< tabs >}}
{{% tab "Python" %}}
The [LangChain integration][1] provides automatic tracing for the [LangChain Python SDK's][2] LLM, chat model, and chain calls.

**Package name:** `langchain`, `langchain_openai`, `langchain_anthropic`, and [other langchain partner packages][10]
**Integration name:** `langchain`

### Traced methods

The LangChain integration instruments the following methods:

- [LLMs][3]:
  - `llm.invoke()`, `llm.ainvoke()`
  - `llm.stream()`, `llm.astream()`
- [Chat models][4]
  - `chat_model.invoke()`, `chat_model.ainvoke()`
  - `chat_model.stream()`, `chat_model.astream()`
- [Chains/LCEL][5]
  - `chain.invoke()`, `chain.ainvoke()`
  - `chain.batch()`, `chain.abatch()`
  - `chain.stream()`, `chain.astream()`
- [Embeddings][6]
  - OpenAI : `OpenAIEmbeddings.embed_documents()`, `OpenAIEmbeddings.embed_query()`
- [Tools][7]
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`
- [Retrieval][8]
  - `langchain_community.<vectorstore>.similarity_search()`
  - `langchain_pinecone.similarity_search()`
- [Prompt Templating][9]
  - `BasePromptTemplate.invoke()`, `BasePromptTemplate.ainvoke()`

  <div class="alert alert-info">For best results, assign templates to variables with meaningful names. Automatic instrumentation uses these names to identify prompts.</div>

  ```python
  # "translation_template" will be used to identify the template in Datadog
  translation_template = PromptTemplate.from_template("Translate {text} to {language}")
  chain = translation_template | llm
  ```
[1]: /integrations/langchain/
[2]: https://python.langchain.com/docs/introduction/
[3]: https://python.langchain.com/v0.2/docs/concepts/#llms
[4]: https://python.langchain.com/docs/concepts/chat_models/
[5]: https://python.langchain.com/docs/concepts/runnables/
[6]: https://python.langchain.com/docs/concepts/embedding_models/
[7]: https://python.langchain.com/docs/concepts/tools/
[8]: https://python.langchain.com/docs/concepts/retrieval/
[9]: https://docs.langchain.com/langsmith/manage-prompts-programmatically#pull-a-prompt
[10]: https://docs.langchain.com/oss/python/integrations/providers/all_providers
{{% /tab %}}

{{% tab "Node.js" %}}
The [LangChain integration][1] provides automatic tracing for the [LangChain Node.js SDK's][2] LLM, chat model, chain, and OpenAI embeddings calls.

**Package name:** `langchain`, `@langchain/openai`, `@langchain/anthropic`, and [other langchain partner packages][7]
**Integration name:** `langchain`

### Traced methods

The LangChain integration instruments the following methods:

- [LLMs][3]:
  - `llm.invoke()`
- [Chat models][4]
  - `chat_model.invoke()`
- [Chains][5]
  - `chain.invoke()`
  - `chain.batch()`
- [Embeddings][6]
  - `embeddings.embedQuery()`
  - `embeddings.embedDocuments()`

[1]: /integrations/langchain/
[2]: https://js.langchain.com/docs/introduction/
[3]: https://js.langchain.com/docs/integrations/llms/
[4]: https://js.langchain.com/docs/concepts/chat_models
[5]: https://js.langchain.com/docs/how_to/sequence/
[6]: https://js.langchain.com/docs/integrations/text_embedding/
[7]: https://docs.langchain.com/oss/javascript/integrations/providers/all_providers
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="LangGraph" level="h3" expanded=false id="langgraph" %}}
{{< tabs >}}
{{% tab "Python" %}}
The LangGraph integration automatically traces `Pregel/CompiledGraph` and `RunnableSeq (node)` invocations made through the [LangGraph Python SDK][1].

**Package name:** `langgraph`
**Integration name:** `langgraph`

### Traced methods

The LangGraph integration instruments synchronous and asynchronous versions of the following methods:

- [CompiledGraph.invoke(), Pregel.invoke(), CompiledGraph.stream(), Pregel.stream()][2]
- [RunnableSeq.invoke()][3]

[1]: https://langchain-ai.github.io/langgraph/concepts/sdk/
[2]: https://blog.langchain.dev/langgraph/#compile
[3]: https://blog.langchain.dev/langgraph/#nodes
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="LiteLLM" level="h3" expanded=false id="litellm" %}}
{{< tabs >}}
{{% tab "Python" %}}
The [LiteLLM integration][1] provides automatic tracing for the [LiteLLM Python SDK][2] and [proxy server router methods][3].

**Package name:** `litellm`
**Integration name:** `litellm`

### Traced methods

The LiteLLM integration instruments the following methods:

- [Chat Completions][4] (including streamed calls):
  - `litellm.completion`
  - `litellm.acompletion`
- [Completions][5] (including streamed calls):
  - `litellm.text_completion`
  - `litellm.atext_completion`
- Router Chat Completions (including streamed calls):
  - `router.Router.completion`
  - `router.Router.acompletion`
- Router Completions (including streamed calls):
  - `router.Router.text_completion`
  - `router.Router.atext_completion`

[1]: /integrations/litellm
[2]: https://docs.litellm.ai/docs/#litellm-python-sdk
[3]: https://docs.litellm.ai/docs/routing
[4]: https://docs.litellm.ai/docs/completion
[5]: https://docs.litellm.ai/docs/text_completion
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="MCP" level="h3" expanded=false id="mcp" %}}
{{< tabs >}}
{{% tab "Python" %}}
The Model Context Protocol (MCP) integration instruments client and server tool calls in the [MCP][1] SDK.

**Package name:** `mcp`
**Integration name:** `mcp`

### Traced methods

The MCP integration instruments the following methods:

- [Client Tool Calls][2]:
  - `mcp.client.session.ClientSession.call_tool`

- [Server Tool Calls][3]:
  - `mcp.server.fastmcp.tools.tool_manager.ToolManager.call_tool`

[1]: https://modelcontextprotocol.io/docs/getting-started/intro
[2]: https://github.com/modelcontextprotocol/python-sdk?tab=readme-ov-file#writing-mcp-clients
[3]: https://github.com/modelcontextprotocol/python-sdk?tab=readme-ov-file#tools
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenAI, Azure OpenAI" level="h3" expanded=false id="openai" %}}
{{< tabs >}}
{{% tab "Python" %}}
The [OpenAI integration][1] provides automatic tracing for the [OpenAI Python SDK's][2] completion and chat completion endpoints to OpenAI and Azure OpenAI.

**Package name:** `openai`
**Integration name:** `openai`

### Traced methods

The OpenAI integration instruments the following methods, including streamed calls:

- [Completions][3]:
   - `OpenAI().completions.create()`, `AzureOpenAI().completions.create()`
   - `AsyncOpenAI().completions.create()`, `AsyncAzureOpenAI().completions.create()`
- [Chat completions][4]:
   - `OpenAI().chat.completions.create()`, `AzureOpenAI().chat.completions.create()`
   - `AsyncOpenAI().chat.completions.create()`, `AsyncAzureOpenAI().chat.completions.create()`
- [Responses][5]:
   - `OpenAI().responses.create()`
   - `AsyncOpenAI().responses.create()`
   - `OpenAI().responses.parse()` (as of `ddtrace==3.17.0`)
   - `AsyncOpenAI().responses.parse()` (as of `ddtrace==3.17.0`)
-  [Calls made to DeepSeek through the OpenAI Python SDK][6] (as of `ddtrace==3.1.0`)

[1]: /integrations/openai/
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://platform.openai.com/docs/api-reference/completions
[4]: https://platform.openai.com/docs/api-reference/chat
[5]: https://platform.openai.com/docs/api-reference/responses
[6]: https://api-docs.deepseek.com/

{{% /tab %}}

{{% tab "Node.js" %}}
The [OpenAI integration][1] provides automatic tracing for the [OpenAI Node.js SDK's][2] completion, chat completion, and embeddings endpoints to OpenAI and [Azure OpenAI][3].

**Package name:** `openai`
**Integration name:** `openai`

### Traced methods

The OpenAI integration instruments the following methods, including streamed calls:

- [Completions][4]:
  - `openai.completions.create()` and `azureopenai.completions.create()`
- [Chat completions][5]:
  - `openai.chat.completions.create()` and `azureopenai.chat.completions.create()`
- [Embeddings][6]:
  - `openai.embeddings.create()` and `azureopenai.embeddings.create()`
- [Calls made to DeepSeek through the OpenAI Node.js SDK][7] (as of `dd-trace@5.42.0`)
- [Responses][8]
  - `openai.responses.create()` (as of `dd-trace@5.76.0`)

[1]: /integrations/openai/
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://www.npmjs.com/package/openai#microsoft-azure-openai
[4]: https://platform.openai.com/docs/api-reference/completions
[5]: https://platform.openai.com/docs/api-reference/chat
[6]: https://platform.openai.com/docs/api-reference/embeddings
[7]: https://api-docs.deepseek.com/
[8]: https://platform.openai.com/docs/api-reference/responses

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenAI Agents" level="h3" expanded=false id="openai-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
The OpenAI Agents integration converts the [built-in tracing][1] from the [OpenAI Agents SDK][2] into
LLM Observability format and sends it to Datadog's LLM Observability product by adding a Datadog trace processor.

**Package name:** `openai-agents`
**Integration name:** `openai_agents`

The following operations are supported:
- [`traces`][3]
- [`agent`][4]
- [`generation`][5] using Datadog's [OpenAI](#openai) integration
- [`response`][6]
- [`guardrail`][7]
- [`handoff`][8]
- [`function`][9]
- [`custom`][10]

[1]: https://openai.github.io/openai-agents-python/tracing/
[2]: https://openai.github.io/openai-agents-python/
[3]: https://openai.github.io/openai-agents-python/ref/tracing/traces/
[4]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.agent_span
[5]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.generation_span
[6]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.response_span
[7]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.guardrail_span
[8]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.handoff_span
[9]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.function_span
[10]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.custom_span
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Pydantic AI" level="h3" expanded=false id="pydantic-ai" %}}
{{< tabs >}}
{{% tab "Python" %}}
The Pydantic AI integration instruments agent invocations and tool calls made using the [Pydantic AI][1] agent framework.

**Package name:** `pydantic-ai`
**Integration name:** `pydantic_ai`

### Traced methods

The Pydantic AI integration instruments the following methods:

- [Agent Invocations][2] (including any tools or toolsets associated with the agent):
  - `agent.Agent.iter` (also traces `agent.Agent.run` and `agent.Agent.run_sync`)
  - `agent.Agent.run_stream`

[1]: https://ai.pydantic.dev/
[2]: https://ai.pydantic.dev/agents/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Vercel AI SDK" level="h3" expanded=false id="vercel-ai-sdk" %}}
{{< tabs >}}
{{% tab "Node.js" %}}
The [Vercel AI SDK][1] integration automatically traces text and object generation, embeddings, and tool calls by intercepting the OpenTelemetry spans created by the underlying core [Vercel AI SDK][2] and converting them into Datadog LLM Observability spans.

**Package name:** `ai`
**Integration name:** `ai`

### Traced methods
- [Text generation][3]:
  - `generateText`
  - `streamText`
- [Object generation][4]:
  - `generateObject`
  - `streamObject`
- [Embedding][5]:
  - `embed`
  - `embedMany`
- [Tool calling][6]:
  - `tool.execute`

### Vercel AI Core SDK telemetry

This integration automatically patches the tracer passed into each of the traced methods under the [`experimental_telemetry` option][7]. If no `experimental_telemetry` configuration is passed in, the integration enables it to still send LLM Observability spans.

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

[1]: /integrations/vercel-ai-sdk
[2]: https://ai-sdk.dev/docs/introduction
[3]: https://ai-sdk.dev/docs/ai-sdk-core/generating-text
[4]: https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
[5]: https://ai-sdk.dev/docs/ai-sdk-core/embeddings
[6]: https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
[7]: https://ai-sdk.dev/docs/ai-sdk-core/telemetry
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Vertex AI" level="h3" expanded=false id="vertex-ai" %}}
{{< tabs >}}
{{% tab "Python" %}}
The [Vertex AI integration][1] automatically traces content generation and chat message calls made through [Google's Vertex AI Python SDK][2].

**Package name:** `vertexai`
**Integration name:** `vertexai`

### Traced methods

The Vertex AI integration instruments the following methods:

- [Generating content][3] (including streamed calls):
  - `model.generate_content()`
  - `model.generate_content_async()`

- [Chat Messages][4] (including streamed calls):
  - `chat.send_message()`
  - `chat.send_message_async()`

[1]: /integrations/google-cloud-vertex-ai/
[2]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest
[3]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_preview_generative_models_GenerativeModel_generate_content_summary
[4]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_generative_models_ChatSession_send_message_summary
{{% /tab %}}

{{% tab "Node.js" %}}
The [Vertex AI integration][1] automatically traces content generation and chat message calls made through [Google's Vertex AI Node.js SDK][2].

**Package name:** `@google-cloud/vertexai`
**Integration name:** `google-cloud-vertexai`

### Traced methods

The Vertex AI integration instruments the following methods:

- [Generating content][3]:
  - `model.generateContent()`
  - `model.generateContentStream()`
- [Chat Messages][4]:
  - `chat.sendMessage()`
  - `chat.sendMessageStream()`

[1]: /integrations/google-cloud-vertex-ai/
[2]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest
[3]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest#send-text-prompt-requests
[4]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest#send-multiturn-chat-requests
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## Enable or disable LLM integrations

All integrations are **enabled by default**.

### Disable all LLM integrations

{{< tabs >}}
{{% tab "Python" %}}
Use the [in-code SDK setup][1] and specify `integrations_enabled=False`.

**Example**: In-code SDK setup that disables all LLM integrations

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  integrations_enabled=False
)
```

[1]: /llm_observability/instrumentation/sdk?tab=python#in-code-setup
{{% /tab %}}

{{% tab "Node.js" %}}
Use the [in-code SDK setup][1] and specify `plugins: false`.

**Example**: In-code SDK setup that disables all LLM integrations

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
```

[1]: /llm_observability/instrumentation/sdk?tab=nodejs#in-code-setup
{{% /tab %}}
{{< /tabs >}}

### Only enable specific LLM integrations

{{< tabs >}}
{{% tab "Python" %}}
1. Use the [in-code SDK setup][1] and disable all integrations with `integrations_enabled=False`.
2. Manually enable select integrations with `ddtrace.patch()`.

**Example**: In-code SDK setup that only enables the LangChain integration

```python
from ddtrace import patch
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  integrations_enabled=False
)

patch(langchain=True)
```

[1]: /llm_observability/instrumentation/sdk?tab=python#in-code-setup
{{% /tab %}}

{{% tab "Node.js" %}}
1. Use the [in-code SDK setup][1] and disable all integrations with `plugins: false`.
2. Manually enable select integrations with `use()`.

**Example**: In-code SDK setup that only enables the LangChain integration

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
tracer.use('langchain', true);
```

[1]: /llm_observability/instrumentation/sdk?tab=nodejs#in-code-setup
{{% /tab %}}
{{< /tabs >}}

For more specific control over library patching and the integration that starts the span, you can set the following environment variables:

`DD_TRACE_DISABLED_PLUGINS`
: A comma-separated string of integration names that are automatically disabled when the tracer is initialized.<br>
**Example**: `DD_TRACE_DISABLED_PLUGINS=openai,http`

`DD_TRACE_DISABLED_INSTRUMENTATIONS`
: A comma-separated string of library names that are not patched when the tracer is initialized.<br>
**Example**: `DD_TRACE_DISABLED_INSTRUMENTATIONS=openai,http`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/instrumentation/sdk
[2]: /llm_observability/quickstart/
