---
title: Auto Instrumentation
aliases:
    - /tracing/llm_observability/auto_instrumentation
    - /llm_observability/auto_instrumentation
    - /llm_observability/setup/auto_instrumentation
further_reading:
    - link: '/llm_observability/setup/sdk/python'
      tag: 'Documentation'
      text: 'Learn about the LLM Observability SDK for Python'
---

<div class="alert alert-info">Datadog offers a variety of artificial intelligence (AI) and machine learning (ML) capabilities. The <a href="/integrations/#cat-aiml">AI/ML integrations on the Integrations page and the Datadog Marketplace</a> are platform-wide Datadog functionalities. <br><br> For example, APM offers a native integration with OpenAI for monitoring your OpenAI usage, while Infrastructure Monitoring offers an integration with NVIDIA DCGM Exporter for monitoring compute-intensive AI workloads. These integrations are different from the LLM Observability offering.</div>

## Overview

Datadog's [LLM Observability Python SDK][16] provides integrations that automatically trace and annotate calls to LLM frameworks and libraries. Without changing your code, you can get out-of-the-box traces and observability for calls that your LLM application makes to the following frameworks:

| Framework                                  | Supported Versions | Tracer Version    |
|--------------------------------------------|--------------------|-------------------|
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 0.26.5          | >= 2.9.0          |
| [Langchain](#langchain)                    | >= 0.0.192         | >= 2.9.0          |
| [Amazon Bedrock](#amazon-bedrock)          | >= 1.31.57         | >= 2.9.0          |
| [Anthropic](#anthropic)                    | >= 0.28.0          | >= 2.10.0         |
| [Google Gemini](#google-gemini)            | >= 0.7.2           | >= 2.14.0         |
| [Vertex AI](#vertex-ai)                    | >= 1.71.1          | >= 2.18.0         |
| [LangGraph](#langgraph)                    | >= 0.2.23          | >= 3.5.0          |
| [Crew AI](#crew-ai)                        | >= 0.105.0         | >= 3.5.0          |
| [OpenAI Agents](#openai-agents)            | >= 0.0.2           | >= 3.5.0          |
| [LiteLLM](#litellm)                        | >= 1.70.0          | >= 3.9.0          |


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
patch(openai=True, langchain=True, botocore=["bedrock-runtime"], anthropic=True, gemini=True, vertexai=True, crewai=True, openai_agents=True, langgraph=True, litellm=True)
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

## Anthropic

The Anthropic integration provides automatic tracing for the [Anthropic Python SDK's][9] chat message calls.

### Traced methods

The Anthropic integration instruments the following methods:

- [Chat messages][10] (including streamed calls):
  - `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
- [Streamed chat messages][11]:
  - `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

## Google Gemini

The Google Gemini integration provides automatic tracing for the [Google AI Python SDK's][19] content generation calls.

### Traced methods

The Google Gemini integration instruments the following methods:

- [Generating content][20] (including streamed calls):
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
[20]: https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent
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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}