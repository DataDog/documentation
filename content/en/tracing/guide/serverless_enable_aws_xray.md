---
title: Decide When to Use Datadog APM and AWS X-Ray
description: 'Compare Datadog APM and AWS X-Ray for serverless tracing to make the right choice for your use case'
aliases:
    - /tracing/serverless_functions/enable_aws_xray/
---

## Overview

When implementing distributed tracing for serverless applications, you have two primary options: Datadog APM and AWS X-Ray. While both provide tracing capabilities, they serve different use cases and have distinct trade-offs. This guide helps you understand which solution best fits your requirements.

## Understanding AWS X-Ray

AWS X-Ray provides a straightforward way to trace requests in serverless environments. Its biggest strength lies in simplicity—you can enable tracing with just a few clicks in the AWS console, and it works seamlessly with managed services like API Gateway and Lambda.

However, X-Ray comes with some notable constraints. The span attributes are quite limited, making it challenging to perform detailed queries or filter traces effectively. You won't see payload data (inputs and outputs), which can make debugging complex issues more difficult. Custom tags aren't supported, so adding business context to your traces isn't possible.

X-Ray also doesn't provide distributed tracing across Step Functions and Lambda functions, and there's no built-in correlation with logs. This can make root cause analysis more time-consuming when issues span multiple services.

From a cost perspective, X-Ray can be expensive both when used directly through AWS and when ingesting data into Datadog. The service automatically samples traces with limited retention, giving you less control over what data you keep and for how long.

Despite these limitations, X-Ray shines in environments where simplicity trumps advanced features. If your serverless services are lightweight and most issues can be resolved with basic tracing data, X-Ray's ease of use may be exactly what you need.

## Understanding Datadog APM

Datadog APM takes a more comprehensive approach to observability. You get full payload visibility, extensive custom tagging capabilities, and complete distributed tracing across all AWS services including Step Functions. The platform excels at correlating traces with logs, metrics, and infrastructure data.

With Datadog APM, you have control over retention policies and sampling rules. This means you can retain full fidelity traces for as long as needed and perform long-term historical analysis. The real-time visibility comes without sampling gaps, ensuring you don't miss critical traces when you need them most.

The trade-off is complexity. Datadog APM requires more initial setup and configuration compared to X-Ray's one-click approach. However, this investment pays off with advanced analytics, service dependency mapping, and deep integration with the broader Datadog observability platform.

## When to Choose Each Solution

The choice often comes down to your current needs and future growth plans. X-Ray works well when cost isn't a major concern, real-time visibility isn't critical, and your team is already comfortable with its capabilities. It's particularly suitable for lightweight serverless services where engineers can resolve most issues with basic tracing information.

Many teams find X-Ray sufficient if they've already established service monitoring workflows and the operational cost of changing tools outweighs the potential benefits. There's real value in not disrupting working processes, especially when current tools meet most requirements.

Datadog APM becomes the better choice when you need comprehensive observability features. If payload visibility, custom tagging, and business context are important for your debugging process, Datadog APM provides these capabilities out of the box. Teams building complex serverless architectures often find the enhanced tracing across Step Functions and Lambda functions invaluable.

The platform really shines when log correlation is essential for debugging, or when you want granular control over sampling rules and retention policies. Real-time visibility and advanced analytics become critical as your serverless environment grows in complexity.

## Trace Retention and Storage Differences

Datadog offers custom retention policies with full trace ingestion and control over sampling rules, while X-Ray samples traces automatically with limited retention by default. This difference matters most when you need to retain full fidelity traces or run long-term historical analysis.

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