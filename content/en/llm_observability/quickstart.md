---
title: Quickstart
description: Get started with Datadog LLM Observability by instrumenting a Python, Node.js, or Java LLM application using the LLM Observability SDK.
aliases:
    - /tracing/llm_observability/quickstart
further_reading:
    - link: '/llm_observability/instrumentation/auto_instrumentation'
      tag: 'Documentation'
      text: 'Supported auto-instrumentation frameworks and libraries'
    - link: '/llm_observability/instrumentation/sdk'
      tag: 'Documentation'
      text: 'LLM Observability SDK Reference for manual instrumentation'
    - link: '/llm_observability/instrumentation/api'
      tag: 'Documentation'
      text: 'LLM Observability HTTP API for language-agnostic instrumentation'
    - link: '/llm_observability/instrumentation/otel_instrumentation'
      tag: 'Documentation'
      text: 'Instrument with OpenTelemetry'
    - link: '/llm_observability/evaluations'
      tag: 'Evaluations'
      text: 'Configure Evaluations on your application'
---

This page demonstrates using Datadog's LLM Observability SDK to instrument a Python, Node.js, or Java LLM application.

### Prerequisites

LLM Observability requires a Datadog API key if you don't have a Datadog Agent running. Find your API key [in Datadog](https://app.datadoghq.com/organization-settings/api-keys).

### Setup

Follow the setup instructions in Datadog's [in-app onboarding flow](https://app.datadoghq.com/llm/applications?setupMethod=manual&showOnboarding=true) for an interactive quickstart experience.

{{< tabs >}}
{{% tab "Python" %}}

1. Install the SDK:

   ```shell
   pip install ddtrace
   ```

2. Prefix your Python start command with `ddtrace-run`:

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_SITE=<YOUR_DD_SITE> \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run <your application command>
   ```

After enabling, the SDK automatically traces calls to [supported Python frameworks][auto-instr-py] such as OpenAI, LangChain, LangGraph, Bedrock, Anthropic, and more. If your framework is not listed, add [manual instrumentation][sdk] to trace your LLM calls directly.

[auto-instr-py]: /llm_observability/instrumentation/auto_instrumentation/?tab=python
[sdk]: /llm_observability/instrumentation/sdk?tab=python

{{% /tab %}}

{{% tab "Node.js" %}}
1. Install the SDK:

   ```shell
   npm install dd-trace
   ```

2. Import and initialize `dd-trace` with LLM Observability as the first dependency in your application entrypoint:
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_SITE=<YOUR_DD_SITE> \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

After enabling, the SDK automatically traces calls to [supported Node.js frameworks][1] such as OpenAI, LangChain, Vercel AI SDK, Bedrock, Anthropic, and more. If your framework is not listed, add [manual instrumentation][2] to trace your LLM calls directly.

**Note**: Next.js and bundled applications (esbuild, Webpack) require additional configuration. See [Supported Node.js frameworks][1] for setup details.

[1]: /llm_observability/instrumentation/auto_instrumentation/?tab=nodejs
[2]: /llm_observability/instrumentation/sdk?tab=nodejs

{{% /tab %}}
{{% tab "Java" %}}
1. Install the SDK:

   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Add the `-javaagent` JVM argument to your Java start command:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar \
   -Ddd.llmobs.enabled=true \
   -Ddd.llmobs.ml.app=quickstart-app \
   -Ddd.site=<YOUR_DD_SITE> \
   -Ddd.api.key=<YOUR_DATADOG_API_KEY> \
   -jar path/to/your/app.jar
   ```

After enabling, the SDK automatically traces calls to [supported Java frameworks][1]. Java auto-instrumentation supports OpenAI and Azure OpenAI. For other libraries such as Bedrock or LangChain4j, use [manual instrumentation][2] instead.

[1]: /llm_observability/instrumentation/auto_instrumentation/?tab=java
[2]: /llm_observability/instrumentation/sdk?tab=java

{{% /tab %}}
{{% tab "Other languages / HTTP API" %}}

For languages other than Python, Node.js, or Java, use the [LLM Observability HTTP API][1] to send spans directly to Datadog without an SDK.

If your application emits [OpenTelemetry GenAI semantic convention][2]-compliant spans, see [OpenTelemetry Instrumentation][2] instead.

[1]: /llm_observability/instrumentation/api
[2]: /llm_observability/instrumentation/otel_instrumentation

{{% /tab %}}
{{< /tabs >}}

Your Datadog site is {{< region-param key="dd_site" code="true" >}}. Replace `<YOUR_DATADOG_API_KEY>` with your Datadog API key.

### View traces

Make requests to your application triggering LLM calls and then view traces in the {{< ui >}}Traces{{< /ui >}} tab [of the {{< ui >}}LLM Observability{{< /ui >}} page][3] in Datadog.

If you don't see any traces:

- **Check that your library is auto-instrumented**: Auto-instrumentation only captures calls to [supported frameworks and libraries][6]. Check the supported list for [Python][7], [Node.js][8], or [Java][9]. If your library is not listed, you need to add instrumentation manually.
- **Add manual instrumentation**: Use the [LLM Observability SDK][5] to wrap your LLM calls with spans directly in code. This works for any library or model provider.
- **Use the HTTP API**: The [LLM Observability HTTP API][10] accepts spans from any language or framework and does not require an SDK.
- **Use OpenTelemetry**: If your framework emits [OpenTelemetry GenAI semantic convention][11]-compliant spans, see [OpenTelemetry Instrumentation][11] for setup details.


### Next steps

After traces are being submitted from your application, you can:

- [Configure evaluations][4] that you can use to assess the effectiveness of your LLM application.
- Add [manual instrumentation][5] to your application and extract data that automatic instrumentation cannot.


## Example "Hello World" application

See below for a simple application that can be used to begin exploring the LLM Observability product.


{{< tabs >}}
{{% tab "Python" %}}

1. Install OpenAI with `pip install openai`.

2. Save example script `app.py`:

   ```python
   import os
   from openai import OpenAI

   oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
   completion = oai_client.chat.completions.create(
       model="gpt-4o-mini",
       messages=[
        {"role": "system", "content": "You are a helpful customer assistant for a furniture store."},
        {"role": "user", "content": "I'd like to buy a chair for my living room."},
    ],
   )
   ```

3. Run the application:

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run app.py
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
1. Install OpenAI with `npm install openai`.

2. Save example script `app.js`:

   ```js
   const { OpenAI } = require('openai');
   const oaiClient = new OpenAI(process.env.OPENAI_API_KEY);

   async function main () {
       const completion = await oaiClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
             { role: 'system', content: 'You are a helpful customer assistant for a furniture store.' },
             { role: 'user', content: 'I\'d like to buy a chair for my living room.' },
          ]
       });
       return completion;
   }

   main().then(console.log)
   ```

3. Run the application:
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```

{{% /tab %}}
{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://app.datadoghq.com/llm/traces
[4]: /llm_observability/evaluations
[5]: /llm_observability/instrumentation/sdk#manual-instrumentation
[6]: /llm_observability/instrumentation/auto_instrumentation
[7]: /llm_observability/instrumentation/auto_instrumentation/?tab=python
[8]: /llm_observability/instrumentation/auto_instrumentation/?tab=nodejs
[9]: /llm_observability/instrumentation/auto_instrumentation/?tab=java
[10]: /llm_observability/instrumentation/api
[11]: /llm_observability/instrumentation/otel_instrumentation
