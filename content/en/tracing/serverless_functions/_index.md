---
title: Trace Serverless Functions
kind: documentation
description: 'Send traces from your Serverless Functions to Datadog'
further_reading:
    - link: 'serverless'
      text: 'Serverless Monitoring with Datadog'
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Trace Serverless Functions"  style="width:100%;">}}

In hybrid architectures, Serverless functions can form an important core of requests your application processes. Including these functions in your Distributed Traces can be critical for detecting performance bottlenecks and service outages in your distributed systems.

## Install the AWS Integration

As a first step, make sure to [install the AWS integration][1] before proceeding.

Next, depending on your language and configuration, choose between using the Datadog Lambda Library or Amazon X-Ray for your traces.

{{< img src="tracing/serverless_functions/LambdaLibraryXRay.png" alt="Lambda Library or X-Ray"  style="width:100%;">}}

## Use the Datadog Lambda Library

For [Java][2], [Node][3], [Python][4], [Ruby][5] and [Go][6], the [Datadog Lambda Library][7] is recommended and has several options available for installation.

## Use the X-Ray Integration

If you cannot or do not want to use the Lambda Library, use the X-Ray Integration.

Ensure the following permissions are present in the policy document for your AWS/Datadog Role:

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

The `GetTraceSummaries` permission is used to get the list of recent traces. `BatchGetTraces` actually returns the full traces themselves.

Then, [enable the X-Ray integration within Datadog][8].

If you are using a Customer Master Key to encrypt traces, add the `kms:Decrypt` method to your policy where the Resource is the Customer Master Key used for X-Ray.

**Note:** Enabling the AWS X-Ray integration increases the amount of consumed Analyzed Spans which can impact your bill.

### Enabling AWS X-Ray for your functions

To get the most out of the AWS X-Ray integration, you'll need to enable it _on_ your Lambda functions and API Gateways, **and** install the tracing libraries _in_ your Lambda functions.

#### Recommended: Using the Serverless Framework plugin

The [Datadog Serverless Framework plugin][9] automatically enables X-Ray for your Lambda functions and API Gateway instances. The plugin also automatically adds the [Datadog Lambda Layer][10] to all of your Node and Python functions.

[Get started with the Serverless Framework plugin][11] and [read the docs][9].

Lastly, [install and import the X-Ray client library in your Lambda function](#installing-the-x-ray-client-libraries).

#### Manual setup

1. Navigate to the Lambda function in the AWS console you want to instrument. In the “Debugging and error handling” section, check the box to **Enable active tracing**. This turns on X-Ray for that function.
2. Navigate to the [API Gateway console][12]. Select your API and then the stage. Then on the **Logs/Tracing** tab, select **Enable X-Ray Tracing**. To make these changes take effect, go to **Resources** in the left navigation panel and select **Actions**. Then, click **Deploy API**.

**Note:** The Datadog Lambda Layer and client libraries include the X-Ray SDK as a dependency, so you don't need to explicitly install it in your projects.

Lastly, [install and import the X-Ray client library in your Lambda function](#installing-the-x-ray-client-libraries).

### Installing the X-Ray client libraries

The X-Ray client library offers insights into your HTTP requests to APIs and into calls to DynamoDB, S3, MySQL and PostgreSQL (self-hosted, Amazon RDS, and Amazon Aurora), SQS, and SNS.

Install the library, import it into your Lambda projects, and patch the services you wish to instrument.

{{< tabs >}}
{{% tab "Node.js" %}}

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

For further configuration, creating subsegments, and recording annotations, consult the [X-Ray Node.js docs][1].


[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-nodejs.html
{{% /tab %}}
{{% tab "Python" %}}

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

For further configuration, creating subsegments, and recording annotations, consult the [X-Ray Python docs][3].


[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-patching.html
[2]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-httpclients.html
[3]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python.html
{{% /tab %}}
{{% tab "Go, Ruby, Java, .NET" %}}

For all other runtimes, consult the X-Ray SDK docs:

- [X-Ray SDK for Go][1]
- [X-Ray SDK for Ruby][2]
- [X-Ray SDK for Java][3]
- [X-Ray SDK for .NET & Core][4]


[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-go.html
[2]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-ruby.html
[3]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-java.html
[4]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-dotnet.html
{{% /tab %}}
{{< /tabs >}}

### Data Collected

The AWS X-Ray integration pulls in trace data from AWS, and does not collect any metrics or logs.

## Tracing across AWS Lambda and hosts

When applicable, Datadog merges AWS X-Ray traces with native Datadog APM traces. This means that your traces will show the complete picture of requests that cross infrastructure boundaries, whether it be AWS Lambda, containers, on-prem hosts, or managed services.

1. Enable the [AWS X-Ray integration][13] for tracing your Lambda functions.
2. Add the [Datadog Lambda Library](#Datadog-Lambda-Library) to your Lambda functions.
3. [Set up Datadog APM][14] on your hosts and container-based infrastructure.

**Note**: For X-Ray and Datadog APM traces to appear in the same flame graph, all services must have the [same `env` tag](#the-env-tag).

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="trace of a request from a host to a Lambda function" >}}

### Organizing your infrastructure with tags

Any [tag][15] applied to your Lambda function automatically becomes a new dimension on which your can slice and dice your traces.

Tags are especially powerful in Datadog APM, the Service Map, and the Services List, which have [first-class support][16] for the `env` and `service` tags.

**Note**: If you are tracing with Datadog APM, set the parameter `DdFetchLambdaTags` to `true` on the forwarder CloudFormation stack to ensure your traces are tagged with the resource tags on the originating Lambda function. Lambda function resource tags are automatically surfaced to X-Ray traces in Datadog without any additional configuration.

#### The env tag

Use `env` to separate out your staging, development, and production environments. This works for any kind of infrastructure, not just for your serverless functions. As an example, you could tag your production EU Lambda functions with `env:prod-eu`.

By default, Lambda functions are tagged with `env:none` in Datadog. Add your own tag to override this.

#### The service tag

Add the `service` [tag][17] in order to group related Lambda functions into a [service][18]. The [Service Map][17] and [Services List][19] use this tag to show relationships between services and the health of their monitors. Services are represented as individual nodes on the Service Map.

By default, each Lambda function is treated as its own `service`. Add your own tag to override this.

**Note**: The default behavior for new Datadog customers is for all Lambda functions to be grouped under the `aws.lambda` service, and represented as a single node on the Service map. Tag your functions by `service` to override this.

{{< img src="integrations/amazon_lambda/animated_service_map.gif" alt="animated service map of Lambda functions" >}}


[1]: integrations/amazon_web_services/#setup
[2]: /serverless/installation/java
[3]: /serverless/installation/nodejs
[4]: /serverless/installation/python
[5]: /serverless/installation/ruby
[6]: /serverless/installation/go
[7]: /serverless/installation
[8]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[9]: https://github.com/DataDog/serverless-plugin-datadog
[10]: https://docs.datadoghq.com/integrations/amazon_lambda/?tab=python#installing-and-using-the-datadog-layer
[11]: https://www.datadoghq.com/blog/serverless-framework-plugin
[12]: https://console.aws.amazon.com/apigateway/
[13]: https://docs.datadoghq.com/integrations/amazon_xray/
[14]: https://docs.datadoghq.com/tracing/send_traces/
[15]: https://docs.datadoghq.com/tagging/
[16]: https://docs.datadoghq.com/tracing/visualization/services_map/#filtering-vs-changing-scopes
[17]: https://docs.datadoghq.com/tracing/visualization/services_map/#the-service-tag
[18]: https://docs.datadoghq.com/tracing/visualization/#services
[19]: https://docs.datadoghq.com/tracing/visualization/services_list/
