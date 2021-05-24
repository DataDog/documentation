---
title: Instrumenting Node.js Applications
kind: documentation
further_reading:
- link: "/serverless/serverless_integrations/plugin/"
  tag: "Documentation"
  text: "Datadog Serverless Plugin"
- link: "/serverless/serverless_integrations/macro/"
  tag: "Documentation"
  text: "Datadog Serverless Macro"
- link: "/serverless/serverless_integrations/cli/"
  tag: "Documentation"
  text: "Datadog Serverless CLI"
- link: 'serverless/serverless_tagging/'
  tag: "Documentation"
  text: 'Tagging Serverless Applications'
- link: 'serverless/distributed_tracing/'
  tag: "Documentation"
  text: 'Tracing Serverless Applications'
- link: 'serverless/custom_metrics/'
  tag: "Documentation"
  text: 'Submitting Custom Metrics from Serverless Applications'
aliases:
    - /serverless/datadog_lambda_library/nodejs/
    - /serverless/guide/nodejs/
---

## Required setup

If not already configured, install the [AWS integration][1]. This allows Datadog to ingest Lambda metrics from AWS. After you have installed the [AWS integration][1], follow these steps to instrument your application to send metrics, logs, and traces to Datadog.

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="Instrument AWS Serverless Applications"  style="width:100%;">}}

If you previously set up Datadog Serverless using the Datadog Forwarder, see the [installation instructions here][2].

## Configuration

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically adds the Datadog Lambda Library to your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

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
        addExtension: true
        apiKey: # Your Datadog API Key goes here.
    ```
    Find your Datadog API key on the [API Management page][3]. For additional settings, see the [plugin documentation][1].


[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: /serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "AWS SAM" %}}

The [Datadog CloudFormation macro][1] automatically transforms your SAM application template to add the Datadog Lambda library to your functions using layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

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
      extensionLayerVersion: "<EXTENSION_VERSION>"
      service: "<SERVICE>" # Optional
      env: "<ENV>" # Optional
```

Replace `<SERVICE>` and `<ENV>` with appropriate values, `<LAYER_VERSION>` with the [desired version][4] of Datadog Lambda Library, and `<EXTENSION_VERSION>` with the [desired version][5] of the Datadog Lambda Extension.

More information and additional parameters can be found in the [macro documentation][1].


[1]: https://docs.datadoghq.com/serverless/serverless_integrations/macro
[2]: /serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://github.com/DataDog/datadog-lambda-js/releases
[5]: https://gallery.ecr.aws/datadog/lambda-extension
{{% /tab %}}
{{% tab "AWS CDK" %}}

The [Datadog CDK Construct][1] automatically adds the Datadog Lambda Library to your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

### Install the Datadog CDK Construct Library

Run the following Yarn or NPM command in your CDK project to install the Datadog CDK Constructs library:

```sh
#Yarn
yarn add --dev datadog-cdk-constructs

#NPM
npm install datadog-cdk-constructs --save-dev
```

### Instrument the function

Import the `datadog-cdk-construct` module in your AWS CDK app and add the following configurations:

```typescript
import * as cdk from "@aws-cdk/core";
import { Datadog } from "datadog-cdk-constructs";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const datadog = new Datadog(this, "Datadog", { 
        nodeLayerVersion: <LAYER_VERSION>, 
        extensionLayerVersion: <EXTENSION_VERSION>, 
        apiKey: <DATADOG_API_KEY>,
        service: <SERVICE> // Optional
        env: <ENV> // Optional 
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);    
  }
}
```

To fill in the placeholders:

- Replace `<DATADOG_API_KEY>` with your Datadog API key on the [API Management page][3]. 
- Replace `<SERVICE>` and `<ENV>` with appropriate values.
- Replace `<LAYER_VERSION>` with the desired version of the Datadog Lambda layer (see the [latest releases][2]).
- Replace `<EXTENSION_VERSION>` with the desired version of the Datadog Lambda Extension (see the [latest releases][4]).

More information and additional parameters can be found in the [Datadog CDK NPM page][1].


[1]: https://www.npmjs.com/package/datadog-cdk-constructs
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://gallery.ecr.aws/datadog/lambda-extension
{{% /tab %}}
{{% tab "Datadog CLI" %}}

<div class="alert alert-warning">This service is in public beta. If you have any feedback, contact <a href="/help">Datadog support</a>.</div>

Use the Datadog CLI to set up instrumentation on your Lambda functions in your CI/CD pipelines. The CLI command automatically adds the Datadog Lambda Library to your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog.

### Install

Install the Datadog CLI with NPM or Yarn:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Instrument

To instrument the function, run the following command with your [AWS credentials][1]. Replace `<functionname>` and `<another_functionname>` with your Lambda function names, `<aws_region>` with the AWS region name, `<layer_version>` with the [desired version][2] of the Datadog Lambda Library and `<extension_version>` with the [desired version][3] of the Datadog Lambda Extension.

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> -e <extension_version>
```

For example:

{{< site-region region="us,us3,eu" >}}

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 26 -e 8
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 26 -e 8
```
{{< /site-region >}}

More information and additional parameters can be found in the [CLI documentation][4].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://gallery.ecr.aws/datadog/lambda-extension
[4]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
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


### Install the Datadog Lambda Extension

Add the Datadog Lambda Extension to your container image by adding the following to your Dockerfile:

```
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

Replace `<TAG>` with either a specific version number (for example, `7`) or with `latest`. You can see a complete list of possible tags in the [Amazon ECR repository][1].

### Configure the function

1. Set your image's `CMD` value to `node_modules/datadog-lambda-js/dist/handler.handler`. You can set this in AWS or directly in your Dockerfile. **Note**: The value set in AWS overrides the value in the Dockerfile if you set both.
2. Set the following environment variables in AWS:
  - Set `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
  - Set `DD_TRACE_ENABLED` to `true`.
  - Set `DD_FLUSH_TO_LOG` to `true`.
  - Set `DD_API_KEY` with your Datadog API key on the [API Management page][2]. 
3. Optionally add `service` and `env` tags with appropriate values to your function.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Custom" %}}

### Install

The Datadog Lambda Library can be imported as a layer or JavaScript package.

The minor version of the `datadog-lambda-js` package always matches the layer version. E.g., datadog-lambda-js v0.5.0 matches the content of layer version 5.

#### Using the layer

[Configure the layers][1] for your Lambda function using the ARN in the following format:

{{< site-region region="us,us3,eu" >}} 

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```
{{< /site-region >}}

The available `RUNTIME` options are `Node10-x` and `Node12-x`. For `VERSION`, see the [latest release][2]. For example:

{{< site-region region="us,us3,eu" >}} 

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node12-x:25
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```
arn:aws-us-gov:lambda:us-gov-east-1:002406178527::layer:Datadog-Node12-x:25
```

{{< /site-region >}}

#### Using the package

**NPM**:

```
npm install --save datadog-lambda-js
```

**Yarn**:

```
yarn add datadog-lambda-js
```

See the [latest release][3].


### Install the Datadog Lambda Extension

[Configure the layers][1] for your Lambda function using the ARN in the following format:

{{< site-region region="us,us3,eu" >}} 

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>
```

{{< /site-region >}}

For `EXTENSION_VERSION`, see the [latest release][4].

### Configure

Follow these steps to configure the function:

1. Set your function's handler to `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` if using the layer, or `node_modules/datadog-lambda-js/dist/handler.handler` if using the package.
2. Set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
3. Set the environment variable `DD_TRACE_ENABLED` to `true`.
4. Set the environment variable `DD_API_KEY` to your Datadog API key on the [API Management page][5]. 
5. Optionally add a `service` and `env` tag with appropriate values to your function.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://www.npmjs.com/package/datadog-lambda-js
[4]: https://gallery.ecr.aws/datadog/lambda-extension
[5]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

## Explore Datadog serverless monitoring

After you have configured your function following the steps above, you can view metrics, logs and traces on the [Serverless Homepage][3].

### Unified service tagging

Although it's optional, Datadog highly recommends tagging you serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][4].

### Collect logs from AWS serverless resources

Serverless logs generated by managed resources besides AWS Lambda functions can be hugely valuable in helping identify the root cause of issues in your serverless applications. We recommend you forward logs from the following managed resources in your environment:
- API's: API Gateway, AppSync, ALB
- Queues & Streams: SQS, SNS, Kinesis
- Data Stores: DynamoDB, S3, RDS, etc.

To collect logs from non-Lambda AWS resources, install and configure the [Datadog Forwarder][5] to subscribe to each of your managed resource CloudWatch log groups.

### Monitor custom business logic

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

[1]: /integrations/amazon_web_services/
[2]: /serverless/guide/datadog_forwarder_node
[3]: https://app.datadoghq.com/functions
[4]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[5]: /serverless/libraries_integrations/forwarder
[6]: /serverless/custom_metrics?tab=nodejs
[7]: /tracing/custom_instrumentation/nodejs/
