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
---

## Required setup

If not already configured:

- Install the [AWS integration][1]. This allows Datadog to ingest Lambda metrics from AWS.
- Install the [Datadog Forwarder Lambda function][2], which is required to ingest AWS Lambda traces, enhanced metrics, custom metrics, and logs.

After you have installed the [AWS integration][1] and the [Datadog Forwarder][2], follow these steps to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically adds the Datadog Lambda Library to your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

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
        addExtension: true
        apiKey: # Your Datadog API Key goes here.
        apiKMSKey: # Your Datadog API Key using KMS goes here (recommended).
    ```
    Find your Datadog API key on the [API Management page][4]. For additional settings, see the [plugin documentation][1].


4. (Optional - only applies if you're using Webpack)

    `dd-trace` is known to be not compatible with webpack due to the use of conditional import and other issues. If using webpack, make sure to mark `datadog-lambda-js` and `dd-trace` as [externals][5] for webpack, so webpack knows these dependencies will be available in the runtime. You should also remove `datadog-lambda-js` and `dd-trace` from `package.json` and the build process to ensure you're using the versions provided by the Datadog Lambda Layer.

    If using `serverless-webpack`, make sure to also exclude `datadog-lambda-js` and `dd-trace` in your `serverless.yml` in addition to declaring them as external in your webpack config file.

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // we use webpack-node-externals to excludes all node deps.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

    **serverless.yml**

    ```
    custom:
      webpack:
        includeModules:
          forceExclude:
            - dd-trace
            - datadog-lambda-js
    ```



[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://webpack.js.org/configuration/externals/
{{% /tab %}}
{{% tab "AWS SAM" %}}

The [Datadog CloudFormation macro][1] automatically transforms your SAM application template to add the Datadog Lambda library to your functions using layers, and configure your functions to send metrics, traces, and logs to Datadog through the [Datadog Forwarder][2].

### Install the Datadog CloudFormation macro

Run the following command with your [AWS credentials][3] to deploy a CloudFormation stack that installs the macro AWS resource. You only need to install the macro once for a given region in your account. Replace `create-stack` with `update-stack` to update the macro to the latest version.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

The macro is now deployed and ready to use.

### Instrument the function

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

The [Datadog CDK Construct][1] automatically adds the Datadog Lambda Library to your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

### Install the Datadog CDK Construct Library

Run the following Yarn or NPM command in your CDK project:

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
        apiKMSKey: <ENCRYPTED_DATADOG_API_KEY>, // If using KMS, your encrypted Datadog API key (recommended).
        service: <SERVICE> // Optional
        env: <ENV> // Optional 
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);    
  }
}
```

To fill in the placeholders:

- Replace `<DATADOG_API_KEY>` or `<ENCRYPTED_DATADOG_API_KEY>` your Datadog API key on the [API Management page][3]. 
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

Use the Datadog CLI to set up instrumentation on your Lambda functions in your CI/CD pipelines. The CLI command automatically adds the Datadog Lambda library to your functions using layers, and configures your functions to send metrics, traces, and logs to Datadog.

### Install the Datadog CLI

Install the Datadog CLI with NPM or Yarn:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Instrument the function

Run the following command with your [AWS credentials][1]. Replace `<functionname>` and `<another_functionname>` with your Lambda function names, `<aws_region>` with the AWS region name, `<layer_version>` with the desired version of the Datadog Lambda layer (see [latest releases][2]) and `<forwarder_arn>` with Forwarder ARN (see the [Forwarder documentation][3]).

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder	<forwarder_arn>
```

For example:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 26 --forwarder arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
```

More information and additional parameters can be found in the [CLI documentation][4].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://docs.datadoghq.com/serverless/forwarder/
[4]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Container Image" %}}

### Install the Datadog Lambda Library

If you are deploying your Lambda function as a container image, you cannot use the Datadog Lambda Library as a layer. Instead, you must install the Datadog Lambda Library as a dependency of your function within the image. If you are using Datadog tracing, you must also install `dd-trace`.

**NPM**:

```sh
npm install --save datadog-lambda-js dd-trace
```

**Yarn**:


```sh
yarn add datadog-lambda-js dd-trace
```

Note that the minor version of the `datadog-lambda-js` package always matches the layer version. For example, `datadog-lambda-js v0.5.0` matches the content of layer version 5.


### Install the Datadog Lambda Extension

Add the Datadog Lambda Extension to your container image by adding the following to your Dockerfile:

```
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

Replace `<TAG>` with either a specific version number (for example, `7`) or with `latest`. You can see a complete list of possible tags in the [Amazon ECR repository][1].

### Configure the function

1. Set your image's `CMD` value to `node_modules/datadog-lambda-js/dist/handler.handler`. You can set this in AWS or directly in your Dockerfile. Note that the value set in AWS overrides the value in the Dockerfile if you set both.
2. Set the following environment variables in AWS:
  - Set `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
  - Set `DD_TRACE_ENABLED` to `true`.
  - Set `DD_FLUSH_TO_LOG` to `true`.
  - Set `DD_API_KEY` or `DD_KMS_API_KEY` with your Datadog API key on the [API Management page][2]. 
3. Optionally add `service` and `env` tags with appropriate values to your function.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Custom" %}}

### Install the Datadog Lambda Library

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

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
```

For `EXTENSION_VERSION`, see the [latest release][4].

### Configure the function

1. Set your function's handler to `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` if using the layer, or `node_modules/datadog-lambda-js/dist/handler.handler` if using the package.
2. Set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
3. Set the environment variable `DD_TRACE_ENABLED` to `true`.
4. Set the environment variable `DD_API_KEY` or `DD_KMS_API_KEY` to your Datadog API key on the [API Management page][5]. 
5. Optionally add a `service` and `env` tag with appropriate values to your function.
6. If you're using webpack, please note that `dd-trace` is known to be not compatible with webpack due to the use of conditional import and other issues. Make sure to mark `datadog-lambda-js` and `dd-trace` as [externals][6] for webpack, so webpack knows these dependencies will be available in the runtime. You should also remove `datadog-lambda-js` and `dd-trace` from `package.json` and the build process to ensure you're using the versions provided by the Datadog Lambda Layer.



[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://www.npmjs.com/package/datadog-lambda-js
[4]: https://gallery.ecr.aws/datadog/lambda-extension
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://webpack.js.org/configuration/externals/
{{% /tab %}}
{{< /tabs >}}

### Unified service tagging

Although it's optional, Datadog highly recommends tagging you serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][3].

## Explore Datadog serverless monitoring

After you have configured your function following the steps above, you can view metrics, logs and traces on the [Serverless Homepage][4].

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

For more information on custom metric submission, see [here][5]. For additional details on custom instrumentation, see the Datadog APM documentation for [custom instrumentation][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
[2]: /serverless/forwarder
[3]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[4]: https://app.datadoghq.com/functions
[5]: /serverless/custom_metrics?tab=nodejs
[6]: /tracing/custom_instrumentation/nodejs/
