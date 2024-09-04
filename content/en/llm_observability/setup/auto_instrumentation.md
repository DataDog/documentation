---
title: Auto Instrumentation
aliases:
    - /tracing/llm_observability/auto_instrumentation
    - /llm_observability/auto_instrumentation
further_reading:
    - link: '/llm_observability/setup/sdk'
      tag: 'Documentation'
      text: 'Learn about the LLM Observability SDK for Python'
---

<div class="alert alert-info">Datadog offers a variety of artificial intelligence (AI) and machine learning (ML) capabilities. The <a href="/integrations/#cat-aiml">AI/ML integrations on the Integrations page and the Datadog Marketplace</a> are platform-wide Datadog functionalities. <br><br> For example, APM offers a native integration with OpenAI for monitoring your OpenAI usage, while Infrastructure Monitoring offers an integration with NVIDIA DCGM Exporter for monitoring compute-intensive AI workloads. These integrations are different from the LLM Observability offering.</div>

## Overview

Datadog's [LLM Observability Python SDK][16] provides integrations that automatically trace and annotate calls to LLM frameworks and libraries. Without changing your code, you can get out-of-the-box traces and observability for calls that your LLM application makes to the following frameworks:


| Framework                               | Supported Versions |
|-----------------------------------------|--------------------|
| [OpenAI](#openai)                       | >= 0.26.5          |
| [Langchain](#langchain)                 | >= 0.0.192         |
| [AWS Bedrock](#aws-bedrock)             | >= 1.31.57         |
| [Anthropic](#anthropic)                 | >= 0.28.0          |

You can programmatically enable automatic tracing of LLM calls to a supported LLM model like OpenAI or a framework like LangChain by setting `integrations_enabled` to `true` in the `LLMOBs.enable()` function. In addition to capturing latency and errors, the integrations capture the input parameters, input and output messages, and token usage (when available) of each traced call.

**Note:** When using the supported LLM Observability frameworks or libraries, no additional manual instrumentation (such as function decorators) is required to capture these calls. For custom or additional calls within your LLM application that are not automatically traced (like API calls, database queries, or internal functions), you can use [function decorators][18] to manually trace these operations and capture detailed spans for any part of your application that is not covered by auto-instrumentation.

## Enabling and disabling integrations

All integrations are enabled by default.

To disable all integrations, use the [in-code SDK setup][12] and specify `integrations_enabled=False`.

To only enable specific integrations:
1. Use the [in-code SDK setup][12], specifying `integrations_enabled=False`.
2. Manually enable the integration with `ddtrace.patch()` at the top of the entrypoint file of your LLM application:

{{< code-block lang="python">}}
from ddtrace import patch
from ddtrace.llmobs import LLMObs

LLMObs.enable(integrations_enabled=False, ...)
patch(<INTEGRATION_NAME_IN_LOWERCASE>=True)
{{< /code-block >}}

**Note**: Use `botocore` as the name of the [AWS Bedrock](#aws-bedrock) integration when manually enabling.

## OpenAI

The OpenAI integration provides automatic tracing for the [OpenAI Python SDK's][1] completion and chat completion endpoints.

### Traced methods

The OpenAI integration instruments the following methods, including streamed calls:

- [Completions][2]:
   - `OpenAI().completions.create()`
   - `AsyncOpenAI().completions.create()`
- [Chat completions][3]:
   - `OpenAI().chat.completions.create()`
   - `AsyncOpenAI().chat.completions.create()`

## LangChain

The LangChain integration provides automatic tracing for the [LangChain Python SDK's][4] LLM, chat model, and chain calls.

### Traced methods

The LangChain integration instruments the following methods:

- [LLMs][13]: 
  - `llm.invoke()`, `llm.ainvoke()`
- [Chat models][14] 
  - `chat_model.invoke()`, `chat_model.ainvoke()`
- [Chains/LCEL][15]
  - `chain.invoke()`, `chain.ainvoke()`
  - `chain.batch()`, `chain.abatch()`
- [Embeddings][17]
  - OpenAI : `OpenAIEmbeddings.embed_documents()`, `OpenAIEmbeddings.embed_query()`

**Note:** The LangChain integration does not yet support tracing streamed calls.

## AWS Bedrock

The AWS Bedrock integration provides automatic tracing for the AWS Bedrock Runtime Python SDK's chat model calls (using [Boto3][5]/[Botocore][6]).

### Traced methods

The AWS Bedrock integration instruments the following methods:

- [Chat messages][7]:
  - `InvokeModel`
- [Streamed chat messages][8]:
  -  `InvokeModelWithResponseStream`

**Note:** The AWS Bedrock integration does not yet support tracing embedding calls.

## Anthropic

The Anthropic integration provides automatic tracing for the [Anthropic Python SDK's][9] chat message calls. 

### Traced methods

The Anthropic integration instruments the following methods:

- [Chat messages][10] (including streamed calls):
  - `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
- [Streamed chat messages][11]:
  - `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://platform.openai.com/docs/api-reference/introduction
[2]: https://platform.openai.com/docs/api-reference/completions
[3]: https://platform.openai.com/docs/api-reference/chat
[4]: https://python.langchain.com/v0.2/docs/introduction/
[5]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[6]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[7]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[8]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html
[9]: https://docs.anthropic.com/en/api/client-sdks#python
[10]: https://docs.anthropic.com/en/api/messages
[11]: https://docs.anthropic.com/en/api/messages-streaming
[12]: /llm_observability/setup/sdk/#in-code-setup
[13]: https://python.langchain.com/v0.2/docs/concepts/#llms
[14]: https://python.langchain.com/v0.2/docs/concepts/#chat-models
[15]: https://python.langchain.com/v0.2/docs/concepts/#runnable-interface
[16]: /llm_observability/setup/sdk/
[17]: https://python.langchain.com/v0.2/docs/concepts/#embedding-models
[18]: /llm_observability/setup/sdk/#tracing-spans
