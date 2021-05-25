---
title: Using the Datadog Forwarder - Node
kind: guide
---

If you are a new user of Datadog Serverless, Datadog recommends using the [out-of-the-box Lambda functionality][1]. However, if you got set up on Datadog Serverless using the Datadog Forwarder before Lambda offered out-of-the-box functionality, use this guide to maintain your instance.

## Required setup

If not already configured:

- Install the [AWS integration][2]. This allows Datadog to ingest Lambda metrics from AWS.
- Install the [Datadog Forwarder Lambda function][3], which is required to ingest AWS Lambda traces, enhanced metrics, custom metrics, and logs.

After you have installed the [AWS integration][2] and the [Datadog Forwarder][3], follow these steps to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically adds the Datadog Lambda library to your functions using layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Forwarder][2].

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][3] before you install the Datadog Serverless Plugin.

To install and configure the Datadog Serverless Plugin, follow these steps:

1. Install the Datadog Serverless Plugin:
	```
    yarn add --dev serverless-plugin-datadog
    ```
2. In your `serverless.yml`, add the following:
    ```
    plugins:
      - serverless-plugin-datadog
    ```
3. In your `serverless.yml`, also add the following section:
    ```
    custom:
      datadog:
        forwarderArn: # The Datadog Forwarder ARN goes here.
    ```
    More information on the Datadog Forwarder ARN or installation can be found [here][2]. For additional settings, see the [plugin documentation][1].

**Note**: You need to follow these [additional configuration steps][4] if your Lambda function is simultaneously using Datadog's tracing libraries and [webpack][5].


[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: /serverless/troubleshooting/serverless_tracing_and_webpack/
[5]: https://webpack.js.org/
{{% /tab %}}
{{% tab "AWS SAM" %}}

The [Datadog CloudFormation macro][1] automatically transforms your SAM application template to add the Datadog Lambda library to your functions using layers, and configure your functions to send metrics, traces, and logs to Datadog through the [Datadog Forwarder][2].

### Install

Run the following command with your [AWS credentials][3] to deploy a CloudFormation stack that installs the macro AWS resource. You only need to install the macro once for a given region in your account. Replace `create-stack` with `update-stack` to update the macro to the latest version.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

The macro is now deployed and ready to use.

### Instrument

In your `template.yml`, add the following under the `Transform` section, **after** the `AWS::Serverless` transform for SAM.

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      stackName: !Ref "AWS::StackName"
      nodeLayerVersion: "<LAYER_VERSION>"
      forwarderArn: "<FORWARDER_ARN>"
      service: "<SERVICE>" # Optional
      env: "<ENV>" # Optional
```

Replace `<SERVICE>` and `<ENV>` with appropriate values, `<LAYER_VERSION>` with the desired version of Datadog Lambda layer (see the [latest releases][4]), and `<FORWARDER_ARN>` with Forwarder ARN (see the [Forwarder documentation][2]).

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][5] before you can use the macro.

More information and additional parameters can be found in the [macro documentation][1].

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://github.com/DataDog/datadog-lambda-js/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS CDK" %}}

The [Datadog CDK Constructs][1] automatically configure ingestion of metrics, traces, and logs from your serverless applications by:

- Installing and configuring the Datadog Lambda library for your Python and Node.js Lambda functions.
- Enabling the collection of traces and custom metrics from your Lambda functions.
- Managing subscriptions from the Datadog Forwarder to your Lambda function log groups.

### Install

Run the following Yarn or NPM command in your CDK project to install the Datadog CDK Constructs library:

```sh
#Yarn
yarn add --dev datadog-cdk-constructs

#NPM
npm install datadog-cdk-constructs --save-dev
```

### Instrument

To instrument the function, import the `datadog-cdk-construct` module in your AWS CDK app and add the following configurations (this example is TypeScript, but usage in other languages is similar):

```typescript
import * as cdk from "@aws-cdk/core";
import { Datadog } from "datadog-cdk-constructs";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: <LAYER_VERSION>,
      pythonLayerVersion: <LAYER_VERSION>,
      addLayers: <BOOLEAN>,
      forwarderArn: "<FORWARDER_ARN>",
      flushMetricsToLogs: <BOOLEAN>,
      site: "<SITE>",
      apiKey: "{Datadog_API_Key}",
      apiKMSKey: "{Encrypted_Datadog_API_Key}",
      enableDDTracing: <BOOLEAN>,
      injectLogContext: <BOOLEAN>
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
  }
}
```

Replace `<SERVICE>` and `<ENV>` with appropriate values, `<LAYER_VERSION>` with the desired version of Datadog Lambda layer (see the [latest releases][2]), and `<FORWARDER_ARN>` with Forwarder ARN (see the [Forwarder documentation][3]).

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][4] before you can use the macro.

More information and additional parameters can be found in the [Datadog CDK NPM page][1].


[1]: https://www.npmjs.com/package/datadog-cdk-constructs
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://docs.datadoghq.com/serverless/forwarder/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Datadog CLI" %}}

<div class="alert alert-warning">This service is in public beta. If you have any feedback, contact <a href="/help">Datadog support</a>.</div>

Use the Datadog CLI to set up instrumentation on your Lambda functions in your CI/CD pipelines. The CLI command automatically adds the Datadog Lambda library to your functions using layers, and configures your functions to send metrics, traces, and logs to Datadog.

### Install

Install the Datadog CLI with NPM or Yarn:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Instrument

To instrument the function, run the following command with your [AWS credentials][1]. Replace `<functionname>` and `<another_functionname>` with your Lambda function names, `<aws_region>` with the AWS region name, `<layer_version>` with the desired version of the Datadog Lambda layer (see [latest releases][2]) and `<forwarder_arn>` with Forwarder ARN (see the [Forwarder documentation][3]).

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder	<forwarder_arn>
```

For example:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 26 --forwarder arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
```

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][4] before you can instrument it with the Datadog CLI.

More information and additional parameters can be found in the [CLI documentation][5].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://docs.datadoghq.com/serverless/forwarder/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[5]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Container Image" %}}

### Install

If you are deploying your Lambda function as a container image, you cannot use the Datadog Lambda Library as a layer. Instead, you must install the Datadog Lambda Library as a dependency of your function within the image. If you are using Datadog tracing, you must also install `dd-trace`.

**NPM**:

```sh
npm install --save datadog-lambda-js dd-trace
```

**Yarn**:

```sh
yarn add datadog-lambda-js dd-trace
```

**Note**: The minor version of the `datadog-lambda-js` package always matches the layer version. For example, `datadog-lambda-js v0.5.0` matches the content of layer version 5.

### Configure

Follow these steps to configure the function:

1. Set your image's `CMD` value to `node_modules/datadog-lambda-js/dist/handler.handler`. You can set this in AWS or directly in your Dockerfile. **Note**: The value set in AWS overrides the value in the Dockerfile if you set both.
2. Set the following environment variables in AWS:
  - Set `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
  - Set `DD_TRACE_ENABLED` to `true`.
  - Set `DD_FLUSH_TO_LOG` to `true`.
3. Optionally add `service` and `env` tags with appropriate values to your function.

### Subscribe

Subscribe the Datadog Forwarder Lambda function to each of your functions' log groups in order to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][1].
2. [Subscribe the Datadog Forwarder to your function's log groups][2].


[1]: https://docs.datadoghq.com/serverless/forwarder/
[2]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Custom" %}}

### Install

The Datadog Lambda Library can be imported as a layer or JavaScript package.

The minor version of the `datadog-lambda-js` package always matches the layer version. E.g., datadog-lambda-js v0.5.0 matches the content of layer version 5.

#### Using the layer

[Configure the layers][1] for your Lambda function using the ARN in the following format.

```
# For regular regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# For us-gov regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

The available `RUNTIME` options are `Node10-x` and `Node12-x`. For `VERSION`, see the [latest release][2]. For example:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node12-x:25
```

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][3] before you can add the Datadog Lambda library as a layer.

#### Using the package

**NPM**:

```
npm install --save datadog-lambda-js
```

**Yarn**:

```
yarn add datadog-lambda-js
```

See the [latest release][4].

### Configure

Follow these steps to configure the function:

1. Set your function's handler to `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` if using the layer, or `node_modules/datadog-lambda-js/dist/handler.handler` if using the package.
2. Set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
3. Set the environment variable `DD_TRACE_ENABLED` to `true`.
4. Set the environment variable `DD_FLUSH_TO_LOG` to `true`.
5. Optionally add a `service` and `env` tag with appropriate values to your function.

**Note**: You need to follow these [additional configuration steps][5] if your Lambda function is simultaneously using Datadog's tracing libraries and [webpack][6].

### Subscribe

Subscribe the Datadog Forwarder Lambda function to each of your function’s log groups, in order to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][7].
2. [Subscribe the Datadog Forwarder to your function's log groups][8].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: https://www.npmjs.com/package/datadog-lambda-js
[5]: /serverless/troubleshooting/serverless_tracing_and_webpack/
[6]: https://webpack.js.org/
[7]: https://docs.datadoghq.com/serverless/forwarder/
[8]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{< /tabs >}}

### Tag

Although it's optional, Datadog highly recommends tagging you serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][4].

## Explore

After configuring your function following the steps above, view your metrics, logs, and traces on the [Serverless homepage][5].

## Monitor custom business logic

If you would like to submit a custom metric or span, see the sample code below:

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require("datadog-lambda-js");
const tracer = require("dd-trace");

// submit a custom span named "sleep"
const sleep = tracer.wrap("sleep", (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
});

exports.handler = async (event) => {
  // add custom tags to the lambda function span,
  // does NOT work when X-Ray tracing is enabled
  const span = tracer.scope().active();
  span.setTag('customer_id', '123456');

  await sleep(100);

  // submit a custom span
  const sandwich = tracer.trace('hello.world', () => {
    console.log('Hello, World!');
  });

  // submit a custom metric
  sendDistributionMetric(
    "coffee_house.order_value", // metric name
    12.45, // metric value
    "product:latte", // tag
    "order:online", // another tag
  );

  // submit a custom metric with timestamp
  sendDistributionMetricWithDate(
    "coffee_house.order_value", // metric name
    12.45, // metric value
    new Date(Date.now()), // date, must be within last 20 mins
    "product:latte", // tag
    "order:online", // another tag
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from serverless!"),
  };
  return response;
};
```

For more information on custom metric submission, see [here][6]. For additional details on custom instrumentation, see the Datadog APM documentation for [custom instrumentation][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /serverless/installation
[2]: /integrations/amazon_web_services/
[3]: /serverless/forwarder
[4]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[5]: https://app.datadoghq.com/functions
[6]: /serverless/custom_metrics?tab=nodejs
[7]: /tracing/custom_instrumentation/nodejs/
