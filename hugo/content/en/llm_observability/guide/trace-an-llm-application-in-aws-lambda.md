---
title: Trace an LLM Application in AWS Lambda
description: Instrument an existing AWS Lambda function with Agent Observability by using the Datadog Extension and language layers.
further_reading:
- link: "/llm_observability/instrument/sdk/"
  tag: "Documentation"
  text: "Agent Observability SDK Reference"
---

To instrument an existing AWS Lambda function with Agent Observability, you can use the Datadog Extension and respective language layers.

1. Open a Cloudshell in the AWS console.
2. Install the Datadog CLI client
```shell
npm install -g @datadog/datadog-ci
```
3. Set the Datadog API key and site
```shell
export DD_API_KEY=<YOUR_DATADOG_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
```
If you already have or prefer to use a secret in Secrets Manager, you can set the API key by using the secret ARN:
```shell
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
```
4. Install your Lambda function with Agent Observability (this requires at least version 77 of the Datadog Extension layer)
{{< tabs >}}
{{% tab "Python" %}}
```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Node.js" %}}
```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Java" %}}
```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="dd-trace-java" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}
{{< /tabs >}}

4. Invoke your Lambda function and verify that Agent Observability traces are visible in the Datadog UI.

Manually flush Agent Observability traces by using the `flush` method before the Lambda function returns.

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
