---
title: Instrumenting Node.js Serverless Applications
kind: documentation
further_reading:
    - link: '/serverless/serverless_integrations/plugin/'
      tag: 'Documentation'
      text: 'Datadog Serverless Plugin'
    - link: '/serverless/serverless_integrations/macro/'
      tag: 'Documentation'
      text: 'Datadog Serverless Macro'
    - link: '/serverless/serverless_integrations/cli/'
      tag: 'Documentation'
      text: 'Datadog Serverless CLI'
    - link: 'serverless/serverless_tagging/'
      tag: 'Documentation'
      text: 'Tagging Serverless Applications'
    - link: 'serverless/distributed_tracing/'
      tag: 'Documentation'
      text: 'Tracing Serverless Applications'
    - link: 'serverless/custom_metrics/'
      tag: 'Documentation'
      text: 'Submitting Custom Metrics from Serverless Applications'
aliases:
    - /serverless/datadog_lambda_library/nodejs/
    - /serverless/guide/nodejs/
---

<div class="alert alert-warning">If you previously set up Datadog Serverless using the Datadog Forwarder, see the <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_node">Datadog Forwarder - Node</a> guide.</div>

## Configuration

Datadog offers many different ways to enable instrumentation for your serverless applications. Choose a method below that best suits your needs. Datadog generally recommends using the Datadog CLI, which does not require redeploying your whole application. The CLI can also be added to your CI/CD pipelines to enable instrumentation for applications across your entire organization.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

The Datadog CLI modifies existing Lambda functions' configurations to enable instrumentation without requiring a new deployment. It is the quickest way to get started with Datadog's serverless monitoring.

You can also add the command to your CI/CD pipelines to enable instrumentation for all your serverless applications. Run the command _after_ your normal serverless application deployment, so that changes made by the Datadog CLI command are not overridden.

### Install

Install the Datadog CLI with NPM or Yarn:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Configure credentials

For a quick start, configure Datadog and [AWS credentials][1] using the [instrumentation command](#instrument). For production applications, provide credentials in a more secure manner by using environment variables. For example:

```bash
export DATADOG_API_KEY="<DD_API_KEY>"
export DATADOG_SITE="<DD_SITE>" # such as datadoghq.com, datadoghq.eu, us3.datadoghq.com or ddog-gov.com
export AWS_ACCESS_KEY_ID="<ACCESS KEY ID>"
export AWS_SECRET_ACCESS_KEY="<ACCESS KEY>"
```

### Instrument

**Note**: Instrument your Lambda functions in a dev or staging environment first. Should the instrumentation result be unsatisfactory, run `uninstrument` with the same arguments to revert the changes.

To instrument the function, run the following command:

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> -e <extension_version>
```

To fill in the placeholders:

-   Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
-   Replace `<aws_region>` with the AWS region name.
-   Replace `<layer_version>` with the desired version of the Datadog Lambda Library. The latest version is `{{< latest-lambda-layer-version layer="node" >}}`.
-   Replace `<extension_version>` with the desired version of the Datadog Lambda Extension. The latest version is `{{< latest-lambda-layer-version layer="extension" >}}`.

For example:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
```

More information and additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically adds the Datadog Lambda Library to your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

To install and configure the Datadog Serverless Plugin, follow these steps:

1. Install the Datadog Serverless Plugin:
    ```
    yarn add --dev serverless-plugin-datadog
    ```
2. In your `serverless.yml`, add the following:
`plugins: - serverless-plugin-datadog`
  <div class="alert alert-info">If you are instead deploying your Serverless Framework app <a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">by natively exporting a JSON object from a Javascript file</a> (for example, by using a <code>serverless.ts</code> file), follow the <a href="https://docs.datadoghq.com/serverless/installation/nodejs?tab=custom">custom installation instructions</a>.</div>

3. In your `serverless.yml`, also add the following section:
    ```
    custom:
      datadog:
        apiKey: # Your Datadog API Key goes here.
    ```
    Find your Datadog API key on the [API Management page][3]. For additional settings, see the [plugin documentation][1].

If you encounter the "Code uncompressed size is greater than max allowed size of 272629760" error after adding `serverless-plugin-datadog`, see this [troubleshooting guide][4].


[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: /serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /serverless/guide/serverless_package_too_large
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
          stackName: !Ref 'AWS::StackName'
          apiKey: <DATADOG_API_KEY>
          nodeLayerVersion: { { < latest-lambda-layer-version layer="node" > } }
          extensionLayerVersion: { { < latest-lambda-layer-version layer="extension" > } }
          service: '<SERVICE>' # Optional
          env: '<ENV>' # Optional
```

To fill in the placeholders:

-   Replace `<DATADOG_API_KEY>` with your Datadog API key from the [API Management page][4].
-   Replace `<SERVICE>` and `<ENV>` with appropriate values.

More information and additional parameters can be found in the [macro documentation][1].


[1]: https://docs.datadoghq.com/serverless/serverless_integrations/macro
[2]: /serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS CDK" %}}

The [Datadog CDK Construct][1] automatically adds the Datadog Lambda Library to your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

### Install the Datadog CDK constructs library

Run the following Yarn or NPM command in your CDK project to install the Datadog CDK constructs library:

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
        nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}},
        extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}},
        apiKey: <DATADOG_API_KEY>
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
  }
}
```

Replace `<DATADOG_API_KEY>` with your Datadog API key from the [API Management page][3].

More information and additional parameters can be found in the [Datadog CDK NPM page][1].


[1]: https://www.npmjs.com/package/datadog-cdk-constructs
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://app.datadoghq.com/organization-settings/api-keys
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

Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. You can see a complete list of possible tags in the [Amazon ECR repository][1].

### Configure the function

1. Set your image's `CMD` value to `node_modules/datadog-lambda-js/dist/handler.handler`. You can set this in AWS or directly in your Dockerfile. **Note**: The value set in AWS overrides the value in the Dockerfile if you set both.
2. Set the following environment variables in AWS:

-   Set `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
-   Set `DD_TRACE_ENABLED` to `true`.
-   Set `DD_API_KEY` with your Datadog API key from the [API Management page][2].

3. Optionally add `service` and `env` tags with appropriate values to your function.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

### Update configurations

1. Add the following configurations to the `aws_lambda_function` resources in your .tf files:

{{< site-region region="us,us3,us5,eu" >}}

```hcl
variable "dd_api_key" {
  type        = string
  description = "Datadog API key"
}
resource "aws_lambda_function" "my_func" {
  function_name = "my_func"
  handler = "/opt/nodejs/node_modules/datadog-lambda-js/handler.handler"
  layers = [
      "arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<LIBRARY_VERSION>",
      "arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>",
  ]
  environment {
    variables = {
      DD_LAMBDA_HANDLER = "my_func.handler"
      DD_TRACE_ENABLED = true
      DD_API_KEY = var.dd_api_key
    }
  }
}
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```hcl
variable "dd_api_key" {
  type        = string
  description = "Datadog API key"
}
resource "aws_lambda_function" "my_func" {
  function_name = "my_func"
  handler = "/opt/nodejs/node_modules/datadog-lambda-js/handler.handler"
  layers = [
      "arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<LIBRARY_VERSION>",
      "arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>",
  ]
  environment {
    variables = {
      DD_LAMBDA_HANDLER = "my_func.handler"
      DD_TRACE_ENABLED = true
      DD_API_KEY = var.dd_api_key
    }
  }
}
```

{{< /site-region >}}

2. Replace the following placeholders with appropriate values:

    - Replace `<AWS_REGION>` with the AWS region to which your Lambda functions are deployed.
    - Replace `<RUNTIME>` with the appropriate Node.js runtime. The available `RUNTIME` options are `Node10-x`, `Node12-x`, and `Node14-x`.
    - Replace `<LIBRARY_VERSION>` with the desired version of the Datadog Lambda Library. The latest version is `{{< latest-lambda-layer-version layer="node" >}}`.
    - Replace `<EXTENSION_VERSION>` with the desired version of the Datadog Lambda Extension. The latest version is `{{< latest-lambda-layer-version layer="extension" >}}`.

3. Apply the Terraform configuration with your Datadog API key that can be found on the [API Management page][1]:

    ```bash
    terraform apply -var "dd_api_key=<DD_API_KEY>"
    ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-info">If you are not using a serverless development tool that Datadog supports, such as the Serverless Framework or AWS CDK, Datadog strongly encourages you instrument your serverless applications with the <a href="./?tab=datadogcli#configuration">Datadog CLI</a>.</div>

### Install the Datadog Lambda library

The Datadog Lambda Library can be imported either as a layer (recommended) _OR_ as a JavaScript package.

The minor version of the `datadog-lambda-js` package always matches the layer version. For example, datadog-lambda-js v0.5.0 matches the content of layer version 5.

#### Using the layer

[Configure the layers][1] for your Lambda function using the ARN in the following format:

{{< site-region region="us,us3,us5,eu" >}}

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

{{< /site-region >}}

The available `RUNTIME` options are `Node10-x`, `Node12-x`, and `Node14-x`. The latest `VERSION` is `{{< latest-lambda-layer-version layer="node" >}}`. For example:

{{< site-region region="us,us3,us5,eu" >}}

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node14-x:{{< latest-lambda-layer-version layer="node" >}}
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```
arn:aws-us-gov:lambda:us-gov-east-1:002406178527::layer:Datadog-Node14-x:{{< latest-lambda-layer-version layer="node" >}}
```

{{< /site-region >}}

#### Using the package

If you cannot use the prebuilt Datadog Lambda layer, alternatively you can install the packages `datadog-lambda-js` and `dd-trace` using your favorite package manager.

**NPM**:

```
npm install --save datadog-lambda-js dd-trace
```

**Yarn**:

```
yarn add datadog-lambda-js dd-trace
```

See the [latest release][2].

### Install the Datadog Lambda Extension

[Configure the layers][1] for your Lambda function using the ARN in the following format:

{{< site-region region="us,us3,us5,eu" >}}

```
// For x86 lambdas
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
// For arm64 lambdas
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:<EXTENSION_VERSION>

```

{{< /site-region >}}
{{< site-region region="gov" >}}

```
// For x86 lambdas
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>
// For arm64 lambdas
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:<EXTENSION_VERSION>
```

{{< /site-region >}}

The latest `EXTENSION_VERSION` is `{{< latest-lambda-layer-version layer="extension" >}}`.

### Configure

Follow these steps to configure the function:

1. Set your function's handler to `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` if using the layer, or `node_modules/datadog-lambda-js/dist/handler.handler` if using the package.
2. Set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
3. Set the environment variable `DD_TRACE_ENABLED` to `true`.
4. Set the environment variable `DD_API_KEY` to your Datadog API key from the [API Management page][3].
5. Optionally add a `service` and `env` tag with appropriate values to your function.


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://www.npmjs.com/package/datadog-lambda-js
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Explore Datadog serverless monitoring

After you have configured your function following the steps above, you can view metrics, logs and traces on the [Serverless Homepage][1].

### Unified service tagging

Datadog recommends tagging your serverless applications with `DD_ENV`, `DD_SERVICE`, `DD_VERSION`, and `DD_TAGS`. See the [Lambda extension documentation][2] for more details.

### Collect logs from AWS serverless resources

Serverless logs generated by managed resources besides AWS Lambda functions can be hugely valuable in helping identify the root cause of issues in your serverless applications. Datadog recommends you forward logs from the following managed resources in your environment:

-   API's: API Gateway, AppSync, ALB
-   Queues & Streams: SQS, SNS, Kinesis
-   Data Stores: DynamoDB, S3, RDS, etc.

To collect logs from non-Lambda AWS resources, install and configure the [Datadog Forwarder][3] to subscribe to each of your managed resource CloudWatch log groups.

### Monitor custom business logic

If you would like to submit a custom metric or span, see the sample code below:

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require('datadog-lambda-js');
const tracer = require('dd-trace');

// submit a custom span named "sleep"
const sleep = tracer.wrap('sleep', (ms) => {
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
        'coffee_house.order_value', // metric name
        12.45, // metric value
        'product:latte', // tag
        'order:online' // another tag
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from serverless!')
    };
    return response;
};
```

For more information on custom metric submission, see [here][4]. For additional details on custom instrumentation, see the Datadog APM documentation for [custom instrumentation][5].

If your Lambda function is running in a VPC, follow the [Datadog Lambda Extension AWS PrivateLink Setup][6] guide to ensure that the extension can reach Datadog API endpoints.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /serverless/libraries_integrations/extension/#tagging
[3]: /serverless/libraries_integrations/forwarder
[4]: /serverless/custom_metrics?tab=nodejs
[5]: /tracing/custom_instrumentation/nodejs/
[6]: /serverless/guide/extension_private_link/
