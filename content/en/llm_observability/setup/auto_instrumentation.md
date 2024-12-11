---
title: Auto Instrumentation
aliases:
    - /tracing/llm_observability/auto_instrumentation
    - /llm_observability/auto_instrumentation
further_reading:
    - link: '/llm_observability/setup/sdk/python'
      tag: 'Documentation'
      text: 'Learn about the LLM Observability SDK for Python'
    - link: '/llm_observability/setup/sdk/nodejs'
      tag: 'Documentation'
      text: 'Learn about the LLM Observability SDK for Node.js'
---

<div class="alert alert-info">Datadog offers a variety of artificial intelligence (AI) and machine learning (ML) capabilities. The <a href="/integrations/#cat-aiml">AI/ML integrations on the Integrations page and the Datadog Marketplace</a> are platform-wide Datadog functionalities. <br><br> For example, APM offers a native integration with OpenAI for monitoring your OpenAI usage, while Infrastructure Monitoring offers an integration with NVIDIA DCGM Exporter for monitoring compute-intensive AI workloads. These integrations are different from the LLM Observability offering.</div>

{{< tabs >}}
{{% tab "Python" %}}

## Overview

Datadog's [LLM Observability Python SDK][16] provides integrations that automatically trace and annotate calls to LLM frameworks and libraries. Without changing your code, you can get out-of-the-box traces and observability for calls that your LLM application makes to the following frameworks:

| Framework                                  | Supported Versions | Tracer Version    |
|--------------------------------------------|--------------------|-------------------|
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 0.26.5          | >= 2.9.0          |
| [Langchain](#langchain)                    | >= 0.0.192         | >= 2.9.0          |
| [Amazon Bedrock](#amazon-bedrock)          | >= 1.31.57         | >= 2.9.0          |
| [Anthropic](#anthropic)                    | >= 0.28.0          | >= 2.10.0         |
| [Google Gemini](#google-gemini)            | >= 0.7.2           | >= 2.14.0         |

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
patch(openai=True)
patch(langchain=True)
patch(anthropic=True)
patch(gemini=True)
patch(botocore=True)
```

**Note**: Use `botocore` as the name of the [Amazon Bedrock](#amazon-bedrock) integration when manually enabling.

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
- [Tools][21]
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`
- [Retrieval][22]
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

**Note:** The Amazon Bedrock integration does not yet support tracing embedding calls.

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
[12]: /llm_observability/setup/sdk/python/#in-code-setup
[13]: https://python.langchain.com/v0.2/docs/concepts/#llms
[14]: https://python.langchain.com/v0.2/docs/concepts/#chat-models
[15]: https://python.langchain.com/v0.2/docs/concepts/#runnable-interface
[16]: /llm_observability/setup/sdk/python
[17]: https://python.langchain.com/v0.2/docs/concepts/#embedding-models
[18]: /llm_observability/setup/sdk/#tracing-spans
[19]: https://ai.google.dev/gemini-api/docs
[20]: https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent
[21]: https://python.langchain.com/v0.2/docs/concepts/#tools
[22]: https://python.langchain.com/v0.2/docs/concepts/#retrieval

{{% /tab %}}
{{% tab "Node.js" %}}

## Overview

Datadog's [LLM Observability Node.js SDK][4] provides integrations that automatically trace and annotate calls to LLM frameworks and libraries. Without changing your code, you can get out-of-the-box traces and observability for calls that your LLM application makes to the following frameworks:


| Framework                               | Supported Versions | Tracer Version       |
|-----------------------------------------|--------------------|----------------------|
| [OpenAI](#openai) (common JS)           | >= 3.0.0           | >= 4.49.0, >= 5.25.0 |

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

The OpenAI integration provides automatic tracing for the [OpenAI Node.js SDK's][1] completion, chat completion, and embeddings endpoints.

### Traced methods

The OpenAI integration instruments the following methods, including streamed calls:

- [Completions][2]:
  - `openai.completions.create()`
- [Chat completions][3]:
  - `openai.chat.completions.create()`
- [Embeddings][5]:
  - `openai.embeddings.create()`

### ESM support

The OpenAI integration for the Node.js tracer is not supported in ESM. To use OpenAI along with `dd-trace` in your ESM projects without errors, create the following script:

```javascript
// register.mjs

import { register } from 'node:module';

register("import-in-the-middle/hook.mjs", import.meta.url, {
  parentURL: import.meta.url,
  data: { include: ["openai"]}, // this is the important bit here
});
```

And start your application with:

```bash
DD_SITE=<YOUR_DATADOG_SITE> node --import ./register.js --require dd-trace/init script.js
```

This avoids any compatability issues with OpenAI and `dd-trace` in ESM projects.

In this case, tracing is not used for OpenAI calls. To add this tracing for LLM Observability, you can instrument your OpenAI calls with the [`llmobs.trace()`][7] method.

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... }
});

// user application code

function makeOpenAICall (input) {
  // user code
  const response = await llmobs.trace({ kind: 'llm', name: 'openai.createChatCompletion', modelName: 'gpt-4', modelProvider: 'openai' }, async () => {
    const res = await openai.chat.completions.create({ ... });
    llmobs.annotate({
      inputData: input,
      outputData: res.choices[0].message.content
    })

    return res;
  });

  // user code to do something with `response`
}
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
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}