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

## Generating your first trace

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

## AWS Lambda
This generates an LLM Observability trace in an AWS Lambda environment and creates an Amazon Bedrock based chatbot running with LLM Observability in AWS Lambda.

{{< tabs >}}
{{% tab "Python" %}}

1. Create a [Lambda function chatbot using Amazon Bedrock][1]
2. Instrument your Lambda function with the [Datadog Python extension][2]:
    1. Open a Cloudshell
    2. Install the Datadog CLI client
    ```shell
    npm install -g @datadog/datadog-ci
    ```
    3. Set the Datadog API key and site
    ```shell
    export DD_SITE=<YOUR_DD_SITE>
    export DD_API_KEY=<YOUR_DATADOG_API_KEY>
    ```
    If you already have or prefer to use a secret in Secrets Manager, you can set the API key by using the secret ARN:
    ```shell
    export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
    ```
    4. Instrument your Lambda function
    ```shell
    datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```
3. Verify that your function was instrumented.
    1. In the Datadog UI, navigate to `Infrastructure > Serverless`
    2. Search for the name of your function.
    3. Click on it to open the details panel.
    4. Under the `Configuration` tab are the details of the Lambda function, attached layers, and a list of `DD_` Datadog-related environment variables under the `Datadog Environment Variables` section.
4. Add the LLM Observability environment variables to your Lambda function environment variables (`Configuration > Environment Variables`).
    1. In the AWS console, go to your Lambda function in `Configuration > Environment` variables. Click "Edit" and add the following environment variables:
        | Environment Variable | Value                   |
        |----------------------|-------------------------|
        | DD_LLMOBS_ENABLED    | 1                       |
        | DD_LLMOBS_ML_APP     | <NAME_YOUR_APPLICATION> |
5. Invoke your Lambda function and verify that LLM Observability traces are visible in the Datadog UI.

[1]: https://repost.aws/articles/ARixmsXALpSWuxI02zHgv1YA/bedrock-unveiled-a-quick-lambda-example
[2]: https://docs.datadoghq.com/serverless/aws_lambda/installation/python/?tab=datadogcli#installation

{{% /tab %}}

{{% tab "Node.js" %}}

1. Create a [Lambda function chatbot using Amazon Bedrock][1]
2. Instrument your Lambda function with the [Datadog Node.js extension][2]:
    1. Open a Cloudshell
    2. Install the Datadog CLI client
    ```shell
    npm install -g @datadog/datadog-ci
    ```
    3. Set the Datadog API key and site
    ```shell
    export DD_SITE=<YOUR_DD_SITE>
    export DD_API_KEY=<YOUR_DATADOG_API_KEY>
    ```
    If you already have or prefer to use a secret in Secrets Manager, you can set the API key via the secret ARN:
    ```shell
    export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
    ```
    4. Instrument your Lambda function
    ```shell
    datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```
3. Verify that your function was instrumented.
    1. In the Datadog UI, navigate to `Infrastructure > Serverless`
    2. Search for the name of your function.
    3. Click on it to open the details panel.
    4. Under the `Configuration` tab are the details of the Lambda function, attached layers, and a list of `DD_` Datadog-related environment variables under the `Datadog Environment Variables` section.
4. Add the necessary LLM Observability environment variables to your Lambda function environment variables.
    1. In the AWS console, go to your Lambda function in `Configuration > Environment` variables. Click "Edit" and add the following environment variables:
        | Environment Variable | Value                          |
        |-----------------------------|-------------------------|
        | DD_LLMOBS_ENABLED           | 1                       |
        | DD_LLMOBS_ML_APP            | <NAME_YOUR_APPLICATION> |
        | DD_LLMOBS_AGENTLESS_ENABLED | 1                       |
5. Flush the LLM Observability SDK before your Lambda handler returns
```javascript
import tracer from 'dd-trace';
const llmobs = tracer.llmobs;

export const handler = async (event) => {
  // your lambda body
  llmobs.flush(); // if your lambda has a `finally` block, make sure it is included there instead
  return response;
};
```
6. Invoke your Lambda function and verify that LLM Observability traces are visible in the Datadog UI.

[1]: https://repost.aws/articles/ARixmsXALpSWuxI02zHgv1YA/bedrock-unveiled-a-quick-lambda-example
[2]: https://docs.datadoghq.com/serverless/aws_lambda/installation/nodejs/?tab=datadogcli#installation

{{% /tab %}}
{{< /tabs >}}

For serverless environments other than AWS Lambda, use the `flush` method to ensure traces are flushed before the process exits.

{{< tabs >}}

{{% tab "Python" %}}

```python
from ddtrace.llmobs import LLMObs
def handler():
  # function body
  LLMObs.flush()
```

{{% /tab %}}

{{% tab "Node.js" %}}

```javascript
import tracer from 'dd-trace';
const llmobs = tracer.llmobs;

export const handler = async (event) => {
  // your function body
  llmobs.flush();
};
```

{{% /tab %}}

{{< /tabs >}}

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
