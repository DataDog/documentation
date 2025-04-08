---
title: Trace An LLM Application
aliases:
    - /tracing/llm_observability/quickstart
further_reading:
    - link: '/llm_observability'
      tag: 'Documentation'
      text: 'Learn about LLM Observability'
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

This guide uses the LLM Observability SDKs for [Python][1] and [Node.js][2]. If your application is written in another language, you can create traces by calling the [API][8] instead.

## Setup

### Jupyter notebooks

To better understand LLM Observability terms and concepts, you can explore the examples in the [LLM Observability Jupyter Notebooks repository][12]. These notebooks provide a hands-on experience, and allow you to apply these concepts in real time.

## Command line

To generate an LLM Observability trace, you can run a Python or Node.js script.

### Prerequisites

- LLM Observability requires a Datadog API key. For more information, see [the instructions for creating an API key][7].
- The following example script uses OpenAI, but you can modify it to use a different provider. To run the script as written, you need:
    - An OpenAI API key stored in your environment as `OPENAI_API_KEY`. To create one, see [Account Setup][4] and [Set up your API key][6] in the official OpenAI documentation.
    - The OpenAI Python library installed. See [Setting up Python][5] in the official OpenAI documentation for instructions.

{{< tabs >}}
{{% tab "Python" %}}

1. Install the SDK and OpenAI packages:

   ```shell
   pip install ddtrace
   pip install openai
   ```

2. Create a script, which makes a single OpenAI call.

   ```python
   import os
   from openai import OpenAI

   oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

   completion = oai_client.chat.completions.create(
       model="gpt-3.5-turbo",
       messages=[
        {"role": "system", "content": "You are a helpful customer assistant for a furniture store."},
        {"role": "user", "content": "I'd like to buy a chair for my living room."},
    ],
   )
   ```

3. Run the script with the following shell command. This sends a trace of the OpenAI call to Datadog.

   ```shell
   DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=onboarding-quickstart \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> DD_SITE=<YOUR_DD_SITE> \
   DD_LLMOBS_AGENTLESS_ENABLED=1 ddtrace-run python quickstart.py
   ```

   Replace `<YOUR_DATADOG_API_KEY>` with your Datadog API key, and replace `<YOUR_DD_SITE>` with your [Datadog site][2].

   For more information about required environment variables, see [the SDK documentation][1].

[1]: /llm_observability/setup/sdk/python/#command-line-setup
[2]: /getting_started/site/
{{% /tab %}}

{{% tab "Node.js" %}}
1. Install the SDK and OpenAI packages:

   ```shell
   npm install dd-trace
   npm install openai
   ```
2. Create a script, which makes a single OpenAI call.

   ```javascript
   const { OpenAI } = require('openai');

   const oaiClient = new OpenAI(process.env.OPENAI_API_KEY);

   function main () {
      const completion = await oaiClient.chat.completions.create({
         model: 'gpt-3.5-turbo',
         messages: [
            { role: 'system', content: 'You are a helpful customer assistant for a furniture store.' },
            { role: 'user', content: 'I\'d like to buy a chair for my living room.' },
         ]
      });
   }

   main();
   ```

3. Run the script with the following shell command. This sends a trace of the OpenAI call to Datadog.
   ```shell
   DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=onboarding-quickstart \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> DD_SITE=<YOUR_DD_SITE> \
   DD_LLMOBS_AGENTLESS_ENABLED=1 NODE_OPTIONS="--import dd-trace/initialize.mjs" node quickstart.js
   ```

   Replace `<YOUR_DATADOG_API_KEY>` with your Datadog API key, and replace `<YOUR_DD_SITE>` with your [Datadog site][2].

   For more information about required environment variables, see [the SDK documentation][1].

[1]: /llm_observability/setup/sdk/nodejs/#command-line-setup
[2]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

   **Note**: `DD_LLMOBS_AGENTLESS_ENABLED` is only required if you do not have the Datadog Agent running. If the Agent is running in your production environment, make sure this environment variable is unset.

4. View the trace of your LLM call on the **Traces** tab [of the **LLM Observability** page][3] in Datadog.

   {{< img src="llm_observability/quickstart_trace_1.png" alt="An LLM Observability trace displaying a single LLM request" style="width:100%;" >}}

The trace you see is composed of a single LLM span. The `ddtrace-run` or `NODE_OPTIONS="--import dd-trace/initialize.mjs"` command automatically traces your LLM calls from [Datadog's list of supported integrations][10].

If your application consists of more elaborate prompting or complex chains or workflows involving LLMs, you can trace it using the [Setup documentation][11] and the [SDK documentation][1].

## Tracing distributed proxy or gateway services

Like any traditionally application, LLM applications can be implemented across multiple different microservices. With LLM Observability, if one of these services is a LLM proxy or gateway service, you can trace the LLM calls made by individual LLM applications in a complete end-to-end trace.

### Enabling LLM Observability for a proxy or gateway service

To enable LLM Observability for a proxy or gateway service that might be called from several different ML applications, you can enable LLM Observability without specifying an ML application name.

As an example, create a proxy service that has a guardrail check, sensitive data scan, and finally makes an LLM call to OpenAI.

{{< tabs >}}
{{% tab "Python" %}}

Install the necessary packages:

```shell
pip install -U --quiet ddtrace openai flask
```

Add the following code to your proxy service:

```python
# proxy.py
from ddtrace.llmobs import LLMObs

LLMObs.enable(service="chat-proxy")

from flask import Flask
import os
import openai

client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
app = Flask(__name__)

def make_system_prompt(context):
  return # use the context to make a system prompt

@app.route('/chat')
def guardrail(req):
    prompt = req.prompt
    context = req.context
    with LLMObs.task(name="guardrail-check"):
      # check for harmful content
    with LLMObs.task(name="sensitive-data-scan"):
      # scan for sensitive data
    response = client.chat.completions.create(
      model="gpt-3.5-turbo",
      content=[
        {"role": "system", "content": make_system_prompt(context)},
        {"role": "user", "content": prompt}
      ]
    )
    return {
      "response": response.choices[0].message.content
    }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
```

Run the proxy service:

```shell
python proxy.py
```

{{% /tab %}}
{{% tab "Node.js" %}}

Install the necessary packages:

```shell
npm install dd-trace openai express
```

Add the following code to your proxy service:

```javascript
// proxy.js
const tracer = require('dd-trace').init({
  llmobs: true
});
const llmobs = tracer.llmobs;

const express = require('express');
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


const app = express();
app.use(express.json());

function makeSystemPrompt(context) {
  return // use the context to make a system prompt
}

app.post('/chat', async (req, res) => {
  const { prompt, context } = req.body;
  llmobs.trace({ name: 'guardrail-check', kind: 'task' }, async () => {
    // check for harmful content
  });
  llmobs.trace({ name: 'sensitive-data-scan', kind: 'task' }, async () => {
    // scan for sensitive data
  });
  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    content: [
      { role: 'system', content: makeSystemPrompt(context) },
      { role: 'user', content: prompt }
    ]
  });
  res.json({ response: response.choices[0].message.content });
});

app.listen(8080, () => {
  console.log('Server is running on port 3000');
});
```

Run the proxy service:

```shell
node proxy.js
```

{{% /tab %}}
{{< /tabs >}}


In your specific applications that orchestrate the ML applications that make calls to the proxy or gateway service, enable LLM Observability with the ML application name, and wrap the proxy call in a `task` span:

{{< tabs >}}
{{% tab "Python" %}}

Install the necessary packages:

```shell
pip install -U --quiet ddtrace requests
```

Add the following code to your proxy service:

```python
# application.py
from ddtrace.llmobs import LLMObs
LLMObs.enable(ml_app_name="my-ml-app")

import requests

prompt = "What is the status of my order?"

if __name__ == "__main__":
    with LLMObs.workflow(name="run-chat"):
      with LLMObs.retrieval(name="retrieve-context"):
        with LLMObs.embedding(name="embed-prompt"):
          embedding = # embed the prompt
        with LLMObs.task(name="fetch-documents"):
          documents = # fetch documents from embedding
      with LLMObs.task(name="chat-proxy"):
        response = requests.post("http://localhost:8080/chat", json={
          "prompt": "Hello, world!",
          "context": documents
        })

      LLMObs.annotate(
        input_data=prompt,
        output_data=response.json()
      )
```

Run the application:

```shell
python application.py
```

{{% /tab %}}
{{% tab "Node.js" %}}

Install the necessary packages:

```shell
npm install dd-trace axios
```

```javascript
// application.js
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: 'my-ml-app'
  }
});
const llmobs = tracer.llmobs;

const axios = require('axios');

async function main () {
  llmobs.trace({ name: 'run-chat', kind: 'workflow' }, async () => {
    const documents = llmobs.trace({ name: 'retrieve-context', kind: 'retrieval' }, async () => {
      const embedding = llmobs.trace({ name: 'embed-prompt', kind: 'embedding' }, async () => {
        const embedding = // embed the prompt
        return embedding;
      });
      const documents = // fetch documents from embedding
      return documents;
    });
    const response = llmobs.trace({ name: 'chat-proxy', kind: 'task' }, async () => {
      return await axios.post('http://localhost:8080/chat', {
        prompt: 'Hello, world!',
        context: documents
      });
    })

    llmobs.annotate({
      inputData: prompt,
      outputData: response.data
    })
  })
}

main();
```

Run the application:

```shell
node application.js
```

{{% /tab %}}
{{< /tabs >}}

When making requests to the proxy or gateway service, the LLM Observability SDKs automatically propagate the ML application name from the original LLM application.

### Observing LLM gateway and proxy services

To observe the LLM calls made by a variety of ML applications:

1. In the LLM trace view, view `All Applications` from the top-left dropdown.
2. Switch to the `All Spans` view in the top-right dropdown.
3. Filter the list by the `service` tag.

[PUT IMAGE HERE]

### Observing end-to-end usage of LLM applications making calls to a proxy or gateway service

To observe the complete end-to-end usage of an LLM application that makes calls to a proxy or gateway service, you can filter for traces with that ML application name:

1. In the LLM trace view, select the ML application name of interest from the top-left dropdown.
2. Switch to the `Traces` view in the top-right dropdown.

[PUT IMAGE HERE]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/setup/sdk/python
[2]: /llm_observability/setup/sdk/nodejs
[3]: https://app.datadoghq.com/llm/traces
[4]: https://platform.openai.com/docs/quickstart/account-setup
[5]: https://platform.openai.com/docs/quickstart/step-1-setting-up-python
[6]: https://platform.openai.com/docs/quickstart/step-2-set-up-your-api-key
[7]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /llm_observability/setup/api
[10]: /llm_observability/setup/auto_instrumentation/
[11]: /llm_observability/setup/
[12]: https://github.com/DataDog/llm-observability
