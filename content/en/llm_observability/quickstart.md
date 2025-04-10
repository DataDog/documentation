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

In the proxy service, enable LLM Observability without specifying an ML application name. Optionally, you can specify a service name.

{{< tabs >}}
{{% tab "Python" %}}

```python
# proxy.py
from ddtrace.llmobs import LLMObs

LLMObs.enable(service="chat-proxy")

# proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
// proxy.js
const tracer = require('dd-trace').init({
  llmobs: true
});
const llmobs = tracer.llmobs;

// proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
```

{{% /tab %}}
{{< /tabs >}}


In your specific applications that orchestrate the ML applications that make calls to the proxy or gateway service, enable LLM Observability with the ML application name, and wrap the proxy call in a `task` span:

{{< tabs >}}
{{% tab "Python" %}}

```python
# application.py
from ddtrace.llmobs import LLMObs
LLMObs.enable(ml_app_name="my-ml-app")

import requests

if __name__ == "__main__":
    with LLMObs.workflow(name="run-chat"):
      # other application-specific logic - RAG steps, parsing, etc.

      with LLMObs.task(name="chat-proxy"): # wrap the proxy call in a task span
        response = requests.post("http://localhost:8080/chat", json={
          "prompt": "Hello, world!",
          "context": documents
        })

      # other application-specific logic handling the response
```

{{% /tab %}}
{{% tab "Node.js" %}}

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
    // other application-specific logic - RAG steps, parsing, etc.

    // wrap the proxy call in a task span
    const response = llmobs.trace({ name: 'chat-proxy', kind: 'task' }, async () => {
      return await axios.post('http://localhost:8080/chat', {
        prompt: 'Hello, world!',
        context: documents
      });
    });

    // other application-specific logic handling the response
  });
}

main();
```

{{% /tab %}}
{{< /tabs >}}

When making requests to the proxy or gateway service, the LLM Observability SDKs automatically propagate the ML application name from the original LLM application. Additionally, the LLM Observability SDKs automatically tag the `task` span capturing the proxy or gateway service call with the tag `ml-proxy:custom`.

### Observing LLM gateway and proxy services

To observe the tasks performed by a variety of ML applications in the proxy service:

1. In the LLM trace view, view `All Applications` from the top-left dropdown.
2. Switch to the `All Spans` view in the top-right dropdown.
3. Filter the list by the `ml-proxy:custom` tag.

[PUT IMAGE HERE]

The spans listed are the parent spans of the any operations executed by the ML applications. To see all spans, and not just the top-level task spans, from the proxy service, you can instead filter by the `service` tag:

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
