---
title: Instrumenting Node.js Applications
kind: documentation
further_reading:
    - link: 'serverless/installation/node'
      tag: 'Documentation'
      text: 'Installing Node.js Serverless Monitoring'
    - link: 'serverless/installation/ruby'
      tag: 'Documentation'
      text: 'Installing Ruby Serverless Monitoring'
---

After you have [installed the AWS integration][1], choose one of the following methods to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

{{< tabs >}}
{{% tab "Serverless Framework" %}}

Use the [Datadog Serverless Plugin][1] to send metrics, logs and traces from your application to Datadog without any code changes. The plugin automatically attaches the Datadog Lambda Library for Node.js to your functions using layers. At deploy time, it swaps your original function handler with the Datadog-provided handler that initializes the Datadog Lambda Library and invokes your original function handler. It also enables Datadog and X-Ray tracing for your Lambda functions.

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
        flushMetricsToLogs: true
        forwarder: # The Datadog Forwarder ARN goes here.
    ```
    For more information on the Forwarder ARN, or to install the forwarder see the [forwarder documentation][2].
4. Redeploy your serverless application.

[1]: https://github.com/DataDog/serverless-plugin-datadog
[2]: https://docs.datadoghq.com/serverless/troubleshooting/installing_the_forwarder
{{% /tab %}}
{{% tab "AWS SAM" %}}

<div class="alert alert-warning">This service is in public beta. If you have any feedback, contact <a href="/help">Datadog support</a>.</div>

### Deploy the Datadog CloudFormation Macro

Use the [Datadog CloudFormation macro][1] to ingest traces from your application without any code instrumentation. The macro automatically attaches the Datadog Lambda Library for Node.js and Python to your functions using layers. At deploy time, it generates new handler functions that wrap your existing functions and initializes the Lambda Library.

To install the macro, follow these steps:

1. Clone the Datadog CloudFormation macro repository in your local environment:
```
git clone https://github.com/DataDog/datadog-cloudformation-macro.git
```
2. Install the macro and it's dependencies:
```
yarn install # Yarn users
npm install  # NPM users
```
3. Run the build script:
```
yarn build    # Yarn users
npm run build # NPM users
```

Deploy the macro to the same region as your Lambda functions. You need to deploy the macro in every region where you are monitoring Lambda functions:

4. You will need an S3 bucket to store the CloudFormation artifacts for the macro. If you don't have one already, you can create one with:

    ```bash
      aws s3 mb s3://<bucket name>
    ```

5. Package the provided CloudFormation template (`macro_template.yml`). This includes a Lambda function and a CloudFormation macro resource. The provided template uses the AWS Serverless Application Model (SAM), so it must be transformed before deployment:

 ```bash
    aws cloudformation package \
        --template-file macro_template.yml \
        --s3-bucket <your bucket name here> \
        --output-template-file packaged.template
    ```

6. Deploy the packaged CloudFormation template to a CloudFormation stack:

    ```bash
    aws cloudformation deploy \
        --stack-name datadog-cfn-macro \
        --template-file packaged.template \
        --capabilities CAPABILITY_IAM
    ```

The macro is now deployed and ready to use.

### Install the Datadog Lambda Library

Use the Datadog CloudFormation macro to ingest traces, logs, and enhanced metrics from your application without any code instrumentation. The macro automatically attaches the Datadog Lambda Library for Node.js and Python to your functions using layers. At deploy time, it generates new handler functions that wrap your existing functions and initializes the Lambda Library.

To install the Datadog Lambda Library with the CloudFormation macro, follow these steps:

1. In your `template.yml`, add the following:
  ```
  Transform:
	  - Name: DatadogCfnMacro
      Parameters:
        enableDDTracing: true
			  flushMetricsToLogs: true
        stackName: !Ref "AWS::StackName"
			  forwarderArn: "arn:aws:lambda:<REGION>:<ACCOUNT-ID>:function:datadog-forwarder"
  ```
  Find your Datadog Forwarder ARN in the [AWS Console][2]. For more information on installing the Forwarder, see the [official documentation][3].

2. Redeploy your serverless application.


[1]: https://github.com/DataDog/datadog-cloudformation-macro
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[3]: https://docs.datadoghq.com/serverless/troubleshooting/installing_the_forwarder
{{% /tab %}}

{{% tab "AWS CDK" %}}

<div class="alert alert-warning">This service is in public beta. If you have any feedback, contact <a href="/help">Datadog support</a>.</div>

### Deploy the Datadog CloudFormation Macro

Use the [Datadog CloudFormation macro][1] to ingest traces from your application without any code instrumentation. The macro automatically attaches the Datadog Lambda Library for Node.js and Python to your functions using layers. At deploy time, it generates new handler functions that wrap your existing functions and initializes the Lambda Library.

To install the macro, follow these steps:

1. Clone the Datadog CloudFormation macro repository in your local environment:

    ```
    git clone https://github.com/DataDog/datadog-cloudformation-macro.git
    ```

2. Install the macro and it's dependencies:

    ```
    yarn install # Yarn users
    npm install  # NPM users
    ```

3. Run the build script:

    ```
    yarn build    # Yarn users
    npm run build # NPM users
    ```

Deploy the macro to the same region as your Lambda functions. You need to deploy the macro in every region where you are monitoring Lambda functions.

4. You will need an S3 bucket to store the CloudFormation artifacts for the macro. If you don't have one already, you can create one with:

    ```bash
      aws s3 mb s3://<bucket name>
    ```

5. Package the provided CloudFormation template (`macro_template.yml`). This includes a Lambda function and a CloudFormation macro resource. The provided template uses the AWS Serverless Application Model (SAM), so it must be transformed before deployment:

    ```bash
    aws cloudformation package \
        --template-file macro_template.yml \
        --s3-bucket <your bucket name here> \
        --output-template-file packaged.template
    ```

6. Deploy the packaged CloudFormation template to a CloudFormation stack:

    ```bash
    aws cloudformation deploy \
        --stack-name datadog-cfn-macro \
        --template-file packaged.template \
        --capabilities CAPABILITY_IAM
    ```

The macro is now deployed and ready to use.

### Install the Datadog Lambda Library

Use the Datadog CloudFormation macro to ingest traces, logs, and enhanced metrics from your application without any code instrumentation. The macro automatically attaches the Datadog Lambda Library for Node.js and Python to your functions using layers. At deploy time, it generates new handler functions that wrap your existing functions and initializes the Lambda Library.

To install the Datadog Lambda Library with the CloudFormation macro, follow these steps:

1. Add a `CfnMapping` to your `Stack` object in your AWS CDK app:
  ```typescript
      import * as cdk from "@aws-cdk/core";

      class CdkStack extends cdk.Stack {
        constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
          super(scope, id, props);
          this.addTransform("DatadogCfnMacro");

          new cdk.CfnMapping(this, "Datadog", {
            mapping: {
              Parameters: {
                forwarderArn: "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder",
                stackName: this.stackName,
                enableDDTracing: true,
                flushMetricsToLogs: true,
              },
            },
          });
        }
      }
  ```
    Find your Datadog Forwarder ARN in the [AWS Console][2]. For more information on installing the Forwarder, see the [official documentation][3].

2. Redeploy your serverless application.


[1]: https://github.com/DataDog/datadog-cloudformation-macro
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[3]: https://docs.datadoghq.com/serverless/troubleshooting/installing_the_forwarder
{{% /tab %}}
{{% tab "Custom" %}}

### Install the Datadog Lambda Library

The Datadog Lambda Library can be imported as a layer or JavaScript package.

The minor version of the `datadog-lambda-js` package always matches the layer version. E.g., datadog-lambda-js v0.5.0 matches the content of layer version 5.

#### Using the Layer

[Configure the layers][1] for your Lambda function using the ARN in the following format.

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

For example:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node12-x:11
```

The available `RUNTIME` options are `Node8-10`, `Node10-x`, and `Node12-x`. For more information, see the [latest release][2].

#### Using the Package

**NPM**:

```
npm install --save datadog-lambda-js
```

**Yarn**:

```
yarn add datadog-lambda-js
```

See the [latest release][3].

### Configure the Function

1. Set your function's handler to `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` if using the layer, or `node_modules/datadog-lambda-js/dist/handler.handler` if using the package.
2. Set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
3. Set the environment variable `DD_TRACE_ENABLED` to `true`.
4. Set the environment variable `DD_FLUSH_TO_LOG` to `true`.
5. Optionally add a `service` and `env` tag with appropriate values to your function.

### Subscribe the Datadog Forwarder to the Log Groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups, in order to send metrics, traces and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][4].
2. [Ensure the option DdFetchLambdaTags is enabled][5].
3. [Subscribe the Datadog Forwarder to your function's log groups][6].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://www.npmjs.com/package/datadog-lambda-js
[4]: https://docs.datadoghq.com/serverless/troubleshooting/installing_the_forwarder
[5]: https://docs.datadoghq.com/serverless/troubleshooting/installing_the_forwarder/#ddfetchlambdatags
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#send-aws-service-logs-to-datadog
{{% /tab %}}
{{< /tabs >}}

## Explore Datadog Serverless Monitoring

After you have configured your function following the steps above, you can view metrics, logs and traces on the [Serverless page][2]. If you would like to submit a custom metric or manually instrument a function, see the sample code below:

```javascript
const { sendDistributionMetric } = require("datadog-lambda-js");
const tracer = require("dd-trace");

// This emits a span named "sleep"
const sleep = tracer.wrap("sleep", (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
});

exports.handler = async (event) => {
  await sleep(1000);
  sendDistributionMetric(
    "coffee_house.order_value", // metric name
    12.45, // metric Value
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

[1]: /serverless/#1-install-the-cloud-integration
[2]: https://app.datadoghq.com/functions
