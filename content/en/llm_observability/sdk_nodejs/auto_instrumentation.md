---
title: Auto Instrumentation
further_reading:
    - link: '/llm_observability/setup/sdk/nodejs'
      tag: 'Documentation'
      text: 'Learn about the LLM Observability SDK for Node.js'
---

<div class="alert alert-info">Datadog offers a variety of artificial intelligence (AI) and machine learning (ML) capabilities. The <a href="/integrations/#cat-aiml">AI/ML integrations on the Integrations page and the Datadog Marketplace</a> are platform-wide Datadog functionalities. <br><br> For example, APM offers a native integration with OpenAI for monitoring your OpenAI usage, while Infrastructure Monitoring offers an integration with NVIDIA DCGM Exporter for monitoring compute-intensive AI workloads. These integrations are different from the LLM Observability offering.</div>

## Overview

Datadog's [LLM Observability Node.js SDK][4] provides integrations that automatically trace and annotate calls to LLM frameworks and libraries. Without changing your code, you can get out-of-the-box traces and observability for calls that your LLM application makes to the following frameworks:


| Framework                               | Supported Versions | Tracer Version                              |
|-----------------------------------------|--------------------|---------------------------------------------|
| [OpenAI](#openai)                       | >= 3.0.0           | >= 4.49.0, >= 5.25.0 (CJS), >= 5.38.0 (ESM) |
| [LangChain](#langchain)                 | >= 0.1.0           | >= 5.32.0 (CJS), >=5.38.0 (ESM)             |
| [Amazon Bedrock](#amazon-bedrock)       | >= 3.422.0         | >= 5.35.0 (CJS), >=5.35.0 (ESM)             |
| [VertexAI](#vertex-ai)                  | >= 1.0.0           | >= 5.44.0 (CJS), >=5.44.0 (ESM)             |

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

### ESM support

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}