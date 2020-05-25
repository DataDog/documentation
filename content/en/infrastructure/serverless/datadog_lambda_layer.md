---
title: Datadog Lambda Layer
kind: documentation
aliases:
  - infrastructure/serverless/datadog-lambda-layer
  - infrastructure/serverless/lambda_layer
  - infrastructure/serverless/lambda-layer
further_reading:
- link: "/integrations/amazon_lambda/"
  tag: "AWS Lambda Integration"
  text: "AWS Lambda Integration"
---

The Datadog Lambda Layer is responsible for:

- Generating real-time [enhanced Lambda metrics][1] for invocations, errors, cold starts, etc.
- Submitting custom metrics (synchronously and asynchronously)
- Automatically propagating tracing headers from upstream requests to downstream services. This enables full distributed tracing across Lambda functions, hosts, containers, and other infrastructure running the Datadog Agent.

Datadog offers Lambda Layers for Python, Node.js, and Ruby. Go is also supported with a [package][7] to include in your project. Datadog is working on support for new languages and runtimes; if there is another runtime you would like Datadog to support, reach out to the [Datadog support team][8].

# Setup

## AWS Console

The Datadog Lambda Layer ARN includes a region, language runtime, and version. Construct yours in the following format:

```text
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

For example:

```text
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:11
```

| Language | Runtime                                        | Releases             |
| -------- | ---------------------------------------------- | -------------------- |
| Python   | `Python27`, `Python36`, `Python37`, `Python38` | [Latest release][3] |
| Node.js  | `Node8-10`, `Node10-x`, `Node12-x`             | [Latest release][4] |
| Ruby     | `Ruby`                                         | [Latest release][5] |

**Golang:** Since Go binaries are statically-linked, Datadog offers a [package][7] you can import into your project. No Lambda layer is required.

**Java:** Datadog offers a [library][15] you can import into your project. No Lambda layer is required.

**Note:** The Datadog Lambda Layer and client libraries include the X-Ray SDK as a dependency, so you don't need to explicitly install it in your projects.

Installation steps:  

1. Navigate to the Lambda function to which you want to add the Layer in your AWS console.
2. Click on **Layers** on the main page of your function.
3. Scroll down, and click on **Add a Layer**.
3. Select the option to **Provide a layer version ARN**.
4. Enter the Datadog Lambda Layer ARN from the table above.
5. Navigate to the **Environment Variables** section of your function to configure your Datadog API key, and any other options (see table below).

## Serverless Framework

This plugin attaches the Datadog Lambda Layers for Node.js and Python to your functions. At deploy time, it generates new handler functions that wrap your existing functions and initializes the Lambda Layers.

You can install the plugin with one of the following commands.

```bash
npm install --save-dev serverless-plugin-datadog  # for NPM users
yarn add --dev serverless-plugin-datadog          # for Yarn users
```

Then, in your `serverless.yml`, add the following:

```yaml
plugins:
    - serverless-plugin-datadog
```

Configure the library by adding the following section to your `serverless.yml`. The default values are listed, as well as whether the field is required.

```yaml
custom:
  datadog:
    # Whether to add the Lambda Layers, or expect the user to bring their own. Defaults to true.
    addLayers: true

    # The log level, set to DEBUG for extended logging. Defaults to info.
    logLevel: "info"

    # Send custom metrics via logs with the help of Datadog Forwarder Lambda function (recommended). Defaults to false.
    flushMetricsToLogs: false

    # Which Datadog Site to send data to, only needed when flushMetricsToLogs is false. Defaults to datadoghq.com.
    site: datadoghq.com # datadoghq.eu for Datadog EU

    # Datadog API Key, only needed when flushMetricsToLogs is false
    apiKey: ""

    # Datadog API Key encrypted using KMS, only needed when flushMetricsToLogs is false
    apiKMSKey: ""

    # Enable tracing on Lambda functions and API Gateway integrations. Defaults to true
    enableXrayTracing: true

    # Enable tracing on Lambda function using dd-trace, datadog's APM library. Requires datadog log forwarder to be set up. Defaults to true.
    enableDDTracing: true

    # When set, the plugin will try to subscribe the lambda's cloudwatch log groups to the forwarder with the given arn.
    forwarder: arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
```

Setting `flushMetricsToLogs: true` is recommended for submitting custom metrics via CloudWatch logs with the help of [Datadog Forwarder][2].

[Serverless Framework docs][1]

[1]: https://serverless.com/framework/docs/providers/aws/

## AWS SAM

To enable X-Ray tracing by default for your Lambda functions and API Gateways, add the `Function::Tracing` and `Api::TracingEnabled` keys to the [Globals section][1] of your `template.yaml`. Also, add your Datadog API key and any other environment variables (see table below):

```yaml
Globals:
    Function:
        Tracing: Active
        Environment:
            Variables:
                DD_API_KEY: YOUR_DATADOG_API_KEY
    Api:
        TracingEnabled: true
```

[AWS SAM docs][2]

[1]: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#globals-section
[2]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html

## Local Development

You can also include the Datadog Lambda package directly in your project either from source or with the standard package manager for your runtime.

| Language | Repository   | Approximate Size |
| -------- | ------------ | ---------------- |
| Node.js  | [GitHub][9] | 2.6 MB           |
| Python   | [GitHub][10] | 10 MB            |
| Ruby     | [GitHub][11] | 2.3 MB           |
| Go       | [GitHub][12] | 68 KB            |
| Java     | [GitHub][14] | 51 KB            |


**Note:** AWS SAM supports [downloading Lambda Layers][13] for local development.

## Environment Variables

You can configure the Datadog Lambda Layer by adding [environment variables][16] to your Lambda functions:

| Environment Variable | Description                                                                              | Required | Default         | Accepted Values                 |
| -------------------- | ---------------------------------------------------------------------------------------- | -------- | --------------- | ------------------------------- |
| `DD_API_KEY`         | Your Datadog API key                                                                     | Yes      |                 | Datadog API key                 |
| `DD_KMS_API_KEY`     | Use instead of `DD_API_KEY` if using KMS                                                 | No       |                 | KMS-encrypted Datadog API key   |
| `DD_SITE`            | Set if using the EU instance of Datadog                                                  | No       | `datadoghq.com` | `datadoghq.eu`, `datadoghq.com` |
| `DD_FLUSH_TO_LOG`    | Enable zero latency [asynchronous custom metrics][17]									  | No       | `False`         | `True`, `False`                 |
| `DD_LOG_LEVEL`       | Enable detailed logs for the Datadog Lambda Layer                                        | No       | `INFO`          | `INFO`, `DEBUG`                 |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]:  https://docs.datadoghq.com/integrations/amazon_lambda/#real-time-enhanced-lambda-metrics
[2]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#installation
[3]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[4]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[5]: https://github.com/DataDog/datadog-lambda-layer-rb/releases
[6]: https://app.datadoghq.com/screen/integration/30306/aws-lambda-enhanced-metrics
[7]: https://github.com/DataDog/datadog-lambda-go/releases
[8]: https://docs.datadoghq.com/help/
[9]: https://github.com/DataDog/datadog-lambda-layer-js
[10]: https://github.com/DataDog/datadog-lambda-layer-python
[11]: https://github.com/DataDog/datadog-lambda-layer-rb
[12]: https://github.com/DataDog/datadog-lambda-go
[13]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-layers.html
[14]: https://github.com/DataDog/datadog-lambda-java/releases
[15]: https://github.com/DataDog/datadog-lambda-java
[16]: https://github.com/DataDog/datadog-lambda-layer-python#environment-variables
[17]:  https://docs.datadoghq.com/integrations/amazon_lambda/#enabling-asynchronous-custom-metrics