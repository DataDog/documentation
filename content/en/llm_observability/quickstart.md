---
title: Quickstart
aliases:
    - /tracing/llm_observability/quickstart
further_reading:
    - link: '/llm_observability'
      tag: 'Documentation'
      text: 'Learn about LLM Observability'
    - link: '/llm_observability/evaluations'
      tag: 'Evaluations'
      text: 'Configure Evaluations on your application'
    - link: '/llm_observability/instrumentation/custom'
      tag: 'Custom Instrumentation'
      text: 'Custom instrumentation'
---

This page demonstrates using Datadog's LLM Observability SDK to instrument a "Hello World" LLM application.

### Prerequisites

LLM Observability requires a Datadog API key if you don't have a Datadog Agent running. Find your API key [in Datadog](https://app.datadoghq.com/organization-settings/api-keys).

### Setup

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
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run <your application command>
   ```

   Replace `<YOUR_DATADOG_API_KEY>` with your Datadog API key.


[1]: /llm_observability/setup/sdk/python/#command-line-setup
[2]: /getting_started/site/
{{% /tab %}}

{{% tab "Node.js" %}}
1. Install the SDK:

   ```shell
   npm install dd-trace
   ```

2. Add `NODE_OPTIONS` to your Node.js start command:
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

   Replace `<YOUR_DATADOG_API_KEY>` with your Datadog API key.

[1]: /llm_observability/setup/sdk/nodejs/#command-line-setup
[2]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### View traces

Make requests to your application triggering LLM calls and then view traces in the **Traces** tab [of the **LLM Observability** page][3] in Datadog. If you don't see any traces, make sure you are using a supported library. Otherwise, you may need to instrument your application's LLM calls manually.


### Next steps

After traces are being submitted from your application, you can:

- [Configure evaluations][4] that you can use to assess the effectiveness of your LLM application.
- Add [custom instrumentation][5] to your application and extract data that automatic instrumentation cannot.


## Example "Hello World" application

See below for a simple application that can be used to begin exploring the LLM Observability product.


{{< tabs >}}
{{% tab "Python" %}}

1. Install OpenAI with `pip install openai`.

2. Save example script `app.py`.

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
   # Make sure you have the required environment variables listed above
   DD_...= \
   ddtrace-run app.py
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
1. Install OpenAI `npm install openai`.

2. Save example script `app.js`

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

3. Run the application:

   ```
   # Make sure you have the required environment variables listed above
   DD_...= \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```
{{% /tab %}}
{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/setup/sdk/python
[2]: /llm_observability/setup/sdk/nodejs
[3]: https://app.datadoghq.com/llm/traces
[4]: /llm_observability/evaluations
[5]: /llm_observability/instrumentation/custom_instrumentation
