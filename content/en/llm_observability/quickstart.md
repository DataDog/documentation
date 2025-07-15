---
title: Trace An LLM Application
aliases:
    - /tracing/llm_observability/quickstart
further_reading:
    - link: '/llm_observability'
      tag: 'Documentation'
      text: 'Learn about LLM Observability'
---


## Trace an LLM application

### Prerequisites

- LLM Observability requires a Datadog API key if you don't have an Agent running. Find your API key [in Datadog](https://app.datadoghq.com/organization-settings/api-keys).

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
   DD_LLMOBS_AGENTLESS_ENABLED=1 \
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

2. Add `NODE_OPTIONS` your Node.js start command:
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   DD_SITE={{< region-param key="dd_site" code="true" >}} \
   DD_LLMOBS_AGENTLESS_ENABLED=1 \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

   Replace `<YOUR_DATADOG_API_KEY>` with your Datadog API key.

[1]: /llm_observability/setup/sdk/nodejs/#command-line-setup
[2]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

3. Make requests to your application triggering LLM calls and then view traces in the **Traces** tab [of the **LLM Observability** page][3] in Datadog. If you don't see any traces, make sure you are using a supported library else you may need to instrument your application's LLM calls manually.

## Trace an LLM application in AWS Lambda

1. Instrument your Lambda function:
    1. Open a Cloudshell
    2. Install the Datadog CLI client
    ```shell
    npm install -g @datadog/datadog-ci
    ```
    3. Set the Datadog API key and site
    ```shell
    export DD_API_KEY=<YOUR_DATADOG_API_KEY>

    # If you already have or prefer to use a secret in Secrets Manager, you can set the API key by using the secret ARN:
    export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
    ```
    4. Instrument your Lambda function with LLM Observability (this requires at least version 77 of the Datadog Extension layer).

{{< tabs >}}
{{% tab "Python" %}}
```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs quickstart-app
```
{{% /tab %}}
{{% tab "Node.js" %}}
```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs quickstart-app
```
{{% /tab %}}
{{< /tabs >}}
2. Verify that your function was instrumented.
    1. In the Datadog UI, navigate to `Infrastructure > Serverless`
    2. Search for the name of your function.
    3. Click on it to open the details panel.
    4. Under the `Configuration` tab are the details of the Lambda function, attached layers, and a list of `DD_` Datadog-related environment variables under the `Datadog Environment Variables` section.
3. Invoke your Lambda function and verify that LLM Observability traces are visible in the Datadog UI.

### Force flushing traces

For either serverless environments other than AWS Lambda or issues seeing traces from AWS Lambdas, use the `flush` method to ensure traces are flushed before the process exits.

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
[13]: https://repost.aws/articles/ARixmsXALpSWuxI02zHgv1YA/bedrock-unveiled-a-quick-lambda-example
