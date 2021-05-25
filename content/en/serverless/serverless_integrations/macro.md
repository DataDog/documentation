---
dependencies:
- https://github.com/DataDog/datadog-cloudformation-macro/blob/master/serverless/README.md
kind: documentation
title: Datadog Serverless Macro
---
![build_serverless][1]
[![Slack][2]][12]

Datadog recommends the Serverless CloudFormation macro for customers using AWS SAM or AWS CDK to deploy their serverless applications.

The plugin automatically configures ingestion of metrics, traces, and logs from your serverless applications by:

- Installing and configuring the Datadog Lambda library for your [Python][3] and [Node.js][4] Lambda functions.
- Enabling the collection of enhanced Lambda metrics and custom metrics from your Lambda functions.
- Managing subscriptions from the Datadog Forwarder to your Lambda function log groups.

## Installation

To make the macro available for use in your AWS account, deploy a CloudFormation stack with a Datadog provided template. This deployment includes a CloudFormation macro resource and a Lambda function that is invoked when the macro is run. Deploying this stack enables you to use the macro on other CloudFormation stacks deployed in the same account. For more details about defining a macro in your accoun, see the [CloudFormation documentation page][5].

If you are installing for the first time, deploy with:

```bash
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

If you are updating the macro after a new release, use the `update-stack` method instead with the same parameters. Alternatively, you may also specify a version of the macro from the latest [releases][6] by replacing `latest.yml` with the release version, e.g. `0.1.2.yml`:

```bash
aws cloudformation update-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

**Note:** You only need to deploy the macro once for a given region in your account, and it can be used for all CloudFormation stacks deployed in that same region.

## Usage

### AWS SAM

To deploy your serverless application with SAM, add the Datadog Serverless CloudFormation macro under the `Transform` section in your `template.yml` file, after the required SAM transform:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      pythonLayerVersion: "<LAYER_VERSION>" # Use nodeLayerVersion for Node.js
      stackName: !Ref "AWS::StackName"
      forwarderArn: "<FORWARDER_ARN>"
      service: "<SERVICE>" # Optional
      env: "<ENV>" # Optional
      # For additional parameters, see the Configuration section
```

### AWS CDK

To deploy your serverless application with CDK, add the Datadog Serverless CloudFormation macro to your [Stack object][7] constructor.

**Typescript**

```typescript
import * as cdk from "@aws-cdk/core";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.addTransform("DatadogServerless");

    new cdk.CfnMapping(this, "Datadog", {
      mapping: {
        Parameters: {
          nodeLayerVersion: "<LAYER_VERSION>",
          forwarderArn: "<FORWARDER_ARN>",
          stackName: this.stackName,
          service: "<SERVICE>", // Optional
          env: "<ENV>", // Optional
          // For additional parameters, see the Configuration section
        },
      },
    });
  }
}
```

**Python**

```python
from aws_cdk import core

class CdkStack(core.Stack):
  def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
    super().__init__(scope, id, **kwargs)
    self.add_transform("DatadogServerless")

    mapping = core.CfnMapping(self, "Datadog",
      mapping={
        "Parameters": {
          "pythonLayerVersion": "<LAYER_VERSION>",
          "forwarderArn": "<FORWARDER_ARN>",
          "stackName": self.stackName,
          "service": "<SERVICE>",  # Optional
          "env": "<ENV>",  # Optional
          # For additional parameters, see the Configuration section
        }
      })
```

Note: For both SAM and CDK deployments, if you did not modify the provided `template.yml` file when you installed the macro, then the name of the macro defined in your account will be `DatadogServerless`. If you have modified the original template, make sure the name of the transform you add here matches the `Name` property of the `AWS::CloudFormation::Macro` resource.

## Configuration

To further configure your plugin, use the following custom parameters:

| Parameter               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addLayers`             | Whether to add the Lambda Layers or expect the user to bring their own. Defaults to true. When true, the Lambda Library version variables are also required. When false, you must include the Datadog Lambda library in your functions' deployment packages.                                                                                                                                                                                                                                        |
| `pythonLayerVersion`    | Version of the Python Lambda layer to install, such as "21". Required if you are deploying at least one Lambda function written in Python and `addLayers` is true. Find the latest version number from [https://github.com/DataDog/datadog-lambda-python/releases][8].                                                                                                                                                                                                                              |
| `nodeLayerVersion`      | Version of the Node.js Lambda layer to install, such as "29". Required if you are deploying at least one Lambda function written in Node.js and `addLayers` is true. Find the latest version number from [https://github.com/DataDog/datadog-lambda-js/releases][9].                                                                                                                                                                                                                                |
| `extensionLayerVersion`      | Version of the Datadog Lambda Extension layer to install, such as 5. When  `extensionLayerVersion`  is set, `apiKey` (or  `apiKMSKey`) needs to be set as well. While using `extensionLayerVersion` do not set `forwarderArn`. The Datadog Lambda Extension layer is in public preview. Learn more about the Lambda extension [here][10].                                                                                                                                                                                                                                |
| `forwarderArn:`         | When set, the plugin will automatically subscribe the functions' log groups to the Datadog Forwarder. Alternatively, you can define the log subscription using the [AWS::Logs::SubscriptionFilter][11] resource. **Note**: The 'FunctionName' property must be defined for functions that are deployed for the first time because the macro needs the function name to create the log groups and subscription filters. 'FunctionName' must NOT contain any CloudFormation functions, such as `!Sub`. |
| `stackName`             | The name of the CloudFormation stack being deployed. Only required when a `forwarderArn` is provided and Lambda functions are dynamically named (when the `FunctionName` property isn't provided for a Lambda). For more information on how to add this parameter for SAM and CDK, see the examples below.                                                                                                                                                                                          |
| `flushMetricsToLogs`    | Send custom metrics via logs with the Datadog Forwarder Lambda function (recommended). Defaults to `true`. When set to `false`, the Datadog API key must be defined using `apiKey` or `apiKMSKey`.                                                                                                                                                                                                                                                                                                  |
| `site`                  | Set which Datadog site to send data, only needed when flushMetricsToLogs is `false`. Possible values are `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com` and `ddog-gov.com`. The default is `datadoghq.com`.                                                                                                                                                                                                                                                                                   |
| `apiKey`                | The Datadog API Key, only needed when `flushMetricsToLogs` is set to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `apiKMSKey`             | Datadog API Key encrypted using KMS. Use this parameter in place of `apiKey` when `flushMetricsToLogs` is false, and you are using KMS encryption.                                                                                                                                                                                                                                                                                                                                                  |
| `enableEnhancedMetrics` | Enable enhanced metrics for Lambda functions. Defaults to `true`. The Datadog Forwarder Lambda function must subscribe the function log group.                                                                                                                                                                                                                                                                                                                                                      |
| `enableXrayTracing`     | Enable tracing on Lambda functions. Defaults to false.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `enableDDTracing`       | Enable tracing on Lambda function using dd-trace, Datadog's APM library. Defaults to `true`. The Datadog Forwarder Lambda function must subscribe the function log group.                                                                                                                                                                                                                                                                                                                           |
| `service`               | When set, the macro adds a `service` tag to all Lambda functions with the provided value.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `env`                   | When set, the macro adds an `env` tag to all Lambda functions with the provided value.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `logLevel`              | Sets the log level. Set to `DEBUG` for extended logging.                                                                                                                                                                                                                                                                                                                                                                                                                           |

## How it works

This macro modifies your CloudFormation template to install the Datadog Lambda Library by attaching the Lambda Layers for [Node.js][4] and [Python][3] to your functions. It redirects to a replacement handler that initializes the Lambda Library without any required code changes.

## Troubleshooting

### Debug Logs

In order to help debug issues, you can look at the CloudWatch Logs for the macro Lambda function. To find the CloudWatch logs:

- Find the macro CloudFormation stack (named `datadog-serverless-macro` if you copied the command under instructions)
- Click on the resources tab and the CloudWatch Log Group should be available with Logical ID `MacroFunctionLogGroup`

### Error message: 'FunctionName' property is undefined for...

This error occurs when you provide a `forwarderArn` and are deploying your Lambda function for the first time, so no log group currently exists, and the macro cannot create this log group or subscribe to the Forwarder for you. One way to fix this issue is to explicitly define the `FunctionName` property on your Lambda (see the example below).

**AWS SAM**

```yml
Resources:
  MyLambda:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs12.x
      FunctionName: MyFunctionName # Add this property to your Lambdas
```

**AWS CDK (Node.js)**

```js
import * as lambda from "@aws-cdk/aws-lambda";

const myLambda = new lambda.Function(this, "function-id", {
  runtime: lambda.Runtime.NODEJS_12_X,
  code: lambda.Code.fromAsset("lambda"),
  handler: "index.handler",
  functionName: "MyFunctionName", // Add this property to your Lambdas
});
```

If you cannot (or prefer not) define the `FunctionName` explicitly, then remove the `forwarderArn` parameter from the SAM template or CDK source code, and instead define the subscription filters using the [AWS::Logs::SubscriptionFilter][11] resource like below..

**AWS SAM**

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

**AWS CDK (Node.js)**

```js
import { CfnSubscriptionFilter } from "@aws-cdk/aws-logs";

const subscription = new CfnSubscriptionFilter(this, `DatadogForwarderSubscriptionFilter`, {
  logGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>",
  destinationArn: "<DATADOG_FORWARDER_ARN>",
  filterPattern: "",
});
```

### Error message: 'logGroupNamePrefix' failed to satisfy constraint...

The `forwarderArn` option does not work when `FunctionName` contains CloudFormation functions, such as `!Sub`. In this case, the macro does not have access to the actual function name (CloudFormation executes functions after transformations). It therefore cannot create log groups and subscription filters for your functions.

Remove the `forwarderArn` parameter from the SAM template or CDK source code, and instead define the subscription filters using the [AWS::Logs::SubscriptionFilter][11] resource like below.

**AWS SAM**

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

**AWS CDK (Node.js)**

```js
import { CfnSubscriptionFilter } from "@aws-cdk/aws-logs";

const subscription = new CfnSubscriptionFilter(this, `DatadogForwarderSubscriptionFilter`, {
  logGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>",
  destinationArn: "<DATADOG_FORWARDER_ARN>",
  filterPattern: "",
});
```

## Community

For product feedback and questions, join the `#serverless` channel in the [Datadog community on Slack][12].

[1]: https://github.com/DataDog/datadog-cloudformation-macro/workflows/build_serverless/badge.svg
[2]: https://chat.datadoghq.com/badge.svg?bg=632CA6
[3]: https://github.com/DataDog/datadog-lambda-layer-python
[4]: https://github.com/DataDog/datadog-lambda-layer-js
[5]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
[6]: https://github.com/DataDog/datadog-cloudformation-macro/releases
[7]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stack.html
[8]: https://github.com/DataDog/datadog-lambda-python/releases
[9]: https://github.com/DataDog/datadog-lambda-js/releases
[10]: https://docs.datadoghq.com/serverless/datadog_lambda_library/extension/
[11]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[12]: https://chat.datadoghq.com/
