---
title: Decide When to Use Datadog APM and AWS X-Ray
description: 'Compare Datadog APM and AWS X-Ray for serverless tracing to make the right choice for your use case'
aliases:
    - /tracing/serverless_functions/enable_aws_xray/
---

## Which One Should You Use?

### Use AWS X-Ray if:

- You need a fast, lightweight way to get visibility into simple Serverless services.
- You primarily use Lambda and API Gateway.
- You're okay with AWS-managed sampling and limited trace retention.
- You don’t need access to payload data, custom tags, or trace/log correlation.

X-Ray is built into AWS and can be enabled with just a few clicks. It’s well-suited for teams that need to debug basic issues or visualize service calls in low-complexity systems. However, you won’t get function inputs and outputs, and the trace data is limited to what AWS provides. There’s also no way to add custom metadata or correlate traces with logs. If you're debugging lightweight workflows and real-time gaps in trace visibility are acceptable, X-Ray is often “good enough.”

### Use Datadog APM if:

- You need full visibility into function inputs, outputs, and downstream calls.
- Your system involves complex orchestration with services like Step Functions, SQS, DynamoDB, or third-party APIs.
- You want to correlate traces with logs and metrics for faster debugging.
- You need control over what data is retained and for how long, including full-fidelity traces.

Datadog APM goes far beyond what X-Ray offers. You can tag traces with business or customer context, trace asynchronous workflows end-to-end, and inspect payloads at each step. Sampling rules and retention policies are configurable, so you can reduce ingestion for high-throughput paths while preserving key traces for longer. This flexibility makes it ideal for growing systems and debugging hard-to-reproduce issues.

## Feature Comparison

| Capability | AWS X-Ray | Datadog APM |
|------------|-----------|-------------|
| Setup | One-click in AWS Console | Requires config, but integrates with IaC and CI/CD |
| Payload Visibility | ❌ | ✅ |
| Custom Tags | ❌ | ✅ |
| Step Functions Support | ❌ | ✅ |
| Trace → Log Correlation | ❌ | ✅ |
| Retention Control | ❌ (AWS-managed sampling & TTL) | ✅ (User-defined sampling & retention) |
| Breadth of Integration | Limited to core AWS services | Full AWS + infrastructure + 3rd party services |

## Enable AWS X-Ray

If AWS X-Ray meets your current requirements, here's how to set it up:

**Prerequisite:** [Install the AWS integration][1].

1. Ensure the following permissions are present in the policy document for your AWS/Datadog Role:

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

The `BatchGetTraces` permission is used to return the full traces. The `GetTraceSummaries` permission is used to get a list of summaries of recent traces.

2. [Enable the X-Ray integration within Datadog][2].

3. If you are using a Customer Master Key to encrypt traces, add the `kms:Decrypt` method to your policy where the Resource is the Customer Master Key used for X-Ray.

**Note:** Enabling the AWS X-Ray integration increases the amount of consumed Indexed Spans which can increase your bill.

### Enabling AWS X-Ray for your functions

To get the most out of the AWS X-Ray integration:

- Enable it on your Lambda functions and API Gateways, either using the Serverless Framework plugin or manually; and
- Install the tracing libraries in your Lambda functions.

#### [Recommended] Datadog Serverless Framework plugin

The [Datadog Serverless Framework plugin][3] automatically enables X-Ray for your Lambda functions and API Gateway instances. The plugin also automatically adds the [Datadog Lambda Layer][4] to all of your Node.js and Python functions.

[Get started with the Serverless Framework plugin][5] and [read the docs][3].

Lastly, [install and import the X-Ray client library in your Lambda function](#installing-the-x-ray-client-libraries).

#### Manual setup

If you do not use the Serverless Framework to deploy your serverless application, follow these instructions for manual setup:

1. Navigate to the Lambda function in the AWS console you want to instrument. In the "Debugging and error handling" section, check the box to **Enable active tracing**. This turns on X-Ray for that function.
2. Navigate to the [API Gateway console][6]. Select your API and then the stage.
3. On the **Logs/Tracing** tab, select **Enable X-Ray Tracing**.
4. To make these changes take effect, go to **Resources** in the left navigation panel and select **Actions** and click **Deploy API**.

**Note:** The Datadog Lambda Layer and client libraries include the X-Ray SDK as a dependency, so you don't need to explicitly install it in your projects.

Lastly, [install and import the X-Ray client library in your Lambda function](#installing-the-x-ray-client-libraries).

#### Installing the X-Ray client libraries

The X-Ray client library offers insights into your HTTP requests to APIs and into calls to DynamoDB, S3, MySQL and PostgreSQL (self-hosted, Amazon RDS, and Amazon Aurora), SQS, and SNS.

Install the library, import it into your Lambda projects, and patch the services you wish to instrument.

{{< programming-lang-wrapper langs="nodejs,python,go,ruby,java,.NET" >}}

{{< programming-lang lang="nodejs" >}}

Install the X-Ray tracing library:

```bash

npm install aws-xray-sdk

# for Yarn users
yarn add aws-xray-sdk
```

To instrument the AWS SDK:

```js
var AWSXRay = require('aws-xray-sdk-core');
var AWS = AWSXRay.captureAWS(require('aws-sdk'));
```

To instrument all downstream HTTP calls:

```js
var AWSXRay = require('aws-xray-sdk');
AWSXRay.captureHTTPsGlobal(require('http'));
var http = require('http');
```

To instrument PostgreSQL queries:

```js
var AWSXRay = require('aws-xray-sdk');
var pg = AWSXRay.capturePostgres(require('pg'));
var client = new pg.Client();
```

To instrument MySQL queries:

```js
var AWSXRay = require('aws-xray-sdk');
var mysql = AWSXRay.captureMySQL(require('mysql'));
//...
var connection = mysql.createConnection(config);
```

For further configuration, creating subsegments, and recording annotations, see the [X-Ray Node.js docs][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-nodejs.html
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Install the X-Ray tracing library:

```bash
pip install aws-xray-sdk
```

To patch [all libraries][1] by default, add the following to the file containing your Lambda handlers:

```python
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all
patch_all()
```

Note that tracing `aiohttp` requires [specific instrumentation][2].

For further configuration, creating subsegments, and recording annotations, see the [X-Ray Python docs][3].


[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-patching.html
[2]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-httpclients.html
[3]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python.html
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
See:
- [X-Ray SDK for Go docs][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-go.html
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
See:
- [X-Ray SDK for Ruby docs][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-ruby.html
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

See:
- [X-Ray SDK for Java docs][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-java.html
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

See:
- [X-Ray SDK for .Net docs][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-dotnet.html
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

[1]: /integrations/amazon_web_services/#setup
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[3]: https://github.com/DataDog/serverless-plugin-datadog
[4]: https://docs.datadoghq.com/integrations/amazon_lambda/?tab=python#installing-and-using-the-datadog-layer
[5]: https://www.datadoghq.com/blog/serverless-framework-plugin
[6]: https://console.aws.amazon.com/apigateway/