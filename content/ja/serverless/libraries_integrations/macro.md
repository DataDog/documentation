---
aliases:
- /serverless/serverless_integrations/macro/
dependencies:
- "https://github.com/DataDog/datadog-cloudformation-macro/blob/main/serverless/README.md"
kind: documentation
title: Datadog Serverless Macro
---
![build_serverless](https://github.com/DataDog/datadog-cloudformation-macro/workflows/build_serverless/badge.svg)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)

Datadog recommends the Serverless CloudFormation macro for customers using AWS SAM to deploy their serverless applications.

The macro automatically configures ingestion of metrics, traces, and logs from your serverless applications by:

- Installing and configuring the Datadog Lambda Library and Lambda Extension for your [Python][1], [Node.js][2], [.NET][9], and [Java][10] Lambda functions.
- Enabling the collection of enhanced Lambda metrics and custom metrics from your Lambda functions.
- Managing subscriptions from the Datadog Forwarder to your Lambda function log groups, if desired.

## Installation

To make the Datadog serverless macro available for use in your AWS account, deploy a CloudFormation stack with a Datadog-provided template. This deployment includes a CloudFormation macro resource and a Lambda function that is invoked when the macro is run. Deploying this stack enables you to use the macro on other CloudFormation stacks deployed in the same account. For more details about defining a macro in your account, see the [CloudFormation documentation page][3].

**Note:** The Datadog serverless macro needs to be created once in each region that contains stacks you wish to transform.

### Option 1: AWS Console

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/quickCreate?stackName=datadog-serverless-macro&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml)

Create the Datadog serverless macro stack in your AWS account using the `Launch Stack` template link above.

### Option 2: AWS CLI

If you are installing for the first time, deploy with:

```bash
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

## Usage with AWS SAM

To deploy your serverless application with SAM, add the Datadog Serverless CloudFormation macro under the `Transform` section in your `template.yml` file, after the required SAM transform. Also add a `DDGitData` parameter and pass it to the macro to enable Datadog Source Code Integration:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      stackName: !Ref "AWS::StackName"
      apiKey: "<DATADOG_API_KEY>"
      pythonLayerVersion: "<LAYER_VERSION>" # Use appropriate parameter for other runtimes
      extensionLayerVersion: "<LAYER_VERSION>"
      service: "<SERVICE>" # Optional
      env: "<ENV>" # Optional
      version: "<VERSION>" # Optional
      tags: "<TAGS>" # Optional
      # Pass DDGitData here to enable Source Code Integration tagging
      gitData: !Ref DDGitData
      # For additional parameters, see the Configuration section

Parameters:
  DDGitData:
    Type: String
    Default: ""
    Description: "The output of $(git rev-parse HEAD),$(git config --get remote.origin.url). Used for Datadog Source Code Integration tagging"
```

To set the `DDGitData` parameter for Datadog's Source Code Integration, use SAM's `--parameter-overrides` option:

```bash
sam deploy --parameter-overrides  DDGitData="$(git rev-parse HEAD),$(git config --get remote.origin.url)"
```

Note: If you did not modify the provided `template.yml` file when you installed the macro, then the name of the macro defined in your account will be `DatadogServerless`. If you have modified the original template, make sure the name of the transform you add here matches the `Name` property of the `AWS::CloudFormation::Macro` resource.

Note: If you want to specify some of the configuration only once, you can modify `template.yml` and add the environment variables you want to configure for that region. This is a way to control additional default values. The example below sets `DD_API_KEY_SECRET_ARN` and `DD_ENV`, which the macro will treats as default values:

```yaml
Resources:
  MacroFunction:
    Type: AWS::Serverless::Function
    DependsOn: MacroFunctionZip
    Properties:
      FunctionName:
        Fn::If:
          - SetFunctionName
          - Ref: FunctionName
          - Ref: AWS::NoValue
      Description: Processes a CloudFormation template to install Datadog Lambda layers for Lambda functions.
      Handler: src/index.handler
      ...
      Environment:
        Variables:
          DD_API_KEY_SECRET_ARN: "arn:aws:secretsmanager:us-west-2:123456789012:secret:DdApiKeySecret-e1v5Yn7TvIPc-d1Qc4E"
          DD_ENV: "dev"
```

## Updating

If you are updating the macro after a new release, use the `update-stack` method:

```bash
aws cloudformation update-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

You may also specify a version of the macro from the latest [releases](https://github.com/DataDog/datadog-cloudformation-macro/releases) by replacing `latest.yml` with the release version, e.g. `0.1.2.yml`.

## Configuration

To further configure your plugin, use the following custom parameters:

| Parameter                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addLayers`                 | Whether to add the Lambda Layers or expect the user to bring their own. Defaults to true. When true, the Lambda Library version variables are also required. When false, you must include the Datadog Lambda library in your functions' deployment packages.                                                                                                                                                                                                                                        |
| `pythonLayerVersion`        | Version of the Python Lambda layer to install, such as "21". Required if you are deploying at least one Lambda function written in Python and `addLayers` is true. Find the latest version number from [https://github.com/DataDog/datadog-lambda-python/releases][5].                                                                                                                                                                                                                              |
| `nodeLayerVersion`          | Version of the Node.js Lambda layer to install, such as "29". Required if you are deploying at least one Lambda function written in Node.js and `addLayers` is true. Find the latest version number from [https://github.com/DataDog/datadog-lambda-js/releases][6].                                                                                                                                                                                                                                |
| `dotnetLayerVersion`        | Version of the .NET Lambda layer to install, such as "14". Required if you are deploying at least one Lambda function written in .NET and `addLayers` is true. Find the latest version number from [https://github.com/DataDog/dd-trace-dotnet-aws-lambda-layer/releases][9].
| `javaLayerVersion`        | Version of the Java Lambda layer to install, such as "12". Required if you are deploying at least one Lambda function written in Java and `addLayers` is true. Find the latest version number from [https://github.com/DataDog/datadog-lambda-java/releases][10].
| `extensionLayerVersion`     | Version of the Datadog Lambda Extension layer to install, such as "5". When `extensionLayerVersion` is set, `apiKey` (or if encrypted, `apiKMSKey` or `apiKeySecretArn`) needs to be set as well. While using `extensionLayerVersion` do not set `forwarderArn`. Learn more about the Lambda extension [here][8].                                                                                                                                                                                   |
| `forwarderArn`              | When set, the plugin will automatically subscribe the functions' log groups to the Datadog Forwarder. Alternatively, you can define the log subscription using the [AWS::Logs::SubscriptionFilter][7] resource. **Note**: The 'FunctionName' property must be defined for functions that are deployed for the first time because the macro needs the function name to create the log groups and subscription filters. 'FunctionName' must NOT contain any CloudFormation functions, such as `!Sub`. |
| `stackName`                 | The name of the CloudFormation stack being deployed. Only required when a `forwarderArn` is provided and Lambda functions are dynamically named (when the `FunctionName` property isn't provided for a Lambda). For more information on how to add this parameter for SAM and CDK, see the examples below.                                                                                                                                                                                          |
| `flushMetricsToLogs`        | Send custom metrics via logs with the Datadog Forwarder Lambda function (recommended). Defaults to `true`. When set to `false`, the Datadog API key must be defined using `apiKey` (or if encrypted, `apiKMSKey` or `apiKeySecretArn`).                                                                                                                                                                                                                                                             |
| `site`                      | Set which Datadog site to send data, only needed when flushMetricsToLogs is `false`. Possible values are `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com`, and `ddog-gov.com`. The default is `datadoghq.com`.                                                                                                                                                                                                                                        |
| `apiKey`                    | The Datadog API Key, only needed when `flushMetricsToLogs` is set to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `apiKeySecretArn`           | The ARN of the secret storing the Datadog API key in AWS Secrets Manager. Use this parameter in place of `apiKey` when `flushMetricsToLogs` is `false` or `extensionLayerVersion` is set. Remember to add the `secretsmanager:GetSecretValue` permission to the Lambda execution role.                                                                                                                                                                                                              |
| `apiKMSKey`                 | Datadog API Key encrypted using KMS. Use this parameter in place of `apiKey` when `flushMetricsToLogs` is false, and you are using KMS encryption.                                                                                                                                                                                                                                                                                                                                                  |
| `enableEnhancedMetrics`     | Enable enhanced metrics for Lambda functions. Defaults to `true`. The Datadog Forwarder Lambda function must subscribe the function log group.                                                                                                                                                                                                                                                                                                                                                      |
| `enableXrayTracing`         | Enable tracing on Lambda functions. Defaults to false.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `enableDDTracing`           | Enable tracing on Lambda function using dd-trace, Datadog's APM library. Defaults to `true`. The Datadog Forwarder Lambda function must subscribe the function log group.                                                                                                                                                                                                                                                                                                                           |
| `enableDDLogs`              | Enable Datadog log collection for the Lambda function. Note: This setting has no effect on logs sent via the Datadog Forwarder. Defaults to true.                                                                                                                                                                                                                                                                                                                                                   |
| `service`                   | When set along with the `extensionLayerVersion`, the macro adds a `DD_SERVICE` environment variable to all lambda functions with the provided value. When set along with the `forwarderArn`, the macro adds a `service` tag to all Lambda functions with the provided value.                                                                                                                                                                                                                        |
| `env`                       | When set along with the `extensionLayerVersion`, the macro adds a `DD_ENV` environment variable to all lambda functions with the provided value. When set along with the `forwarderArn`, the macro adds an `env` tag to all Lambda functions with the provided value.                                                                                                                                                                                                                               |
| `version`                   | When set along with the `extensionLayerVersion`, the macro adds a `DD_VERSION` environment variable to all lambda functions with the provided value. When set along with the `forwarderArn`, the macro adds a `version` tag to all Lambda functions with the provided value.                                                                                                                                                                                                                        |
| `tags`                      | A comma separated list of key:value pairs as a single string. When set along with `extensionLayerVersion`, a `DD_TAGS` environment variable is added on all Lambda functions with the provided value. When set along with `forwarderArn`, the macro parses the string and sets each key:value pair as a tag on all Lambda functions.                                                                                                                                                                |
| `logLevel`                  | Sets the log level. Set to `DEBUG` for extended logging.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `captureLambdaPayload`      | Automatically tags the function execution span with request and response payloads, so they can be displayed in the APM application.                                                                                                                                                                                                                                                                                                                                                                 |
| `enableColdStartTracing`    | Set to `false` to disable Cold Start Tracing. Used in NodeJS and Python. Defaults to `true`.                                                                                                                                                                                                                                                                                                                                                                                                        |
| `coldStartTraceMinDuration` | Sets the minimum duration (in milliseconds) for a module load event to be traced via Cold Start Tracing. Number. Defaults to `3`.                                                                                                                                                                                                                                                                                                                                                                   |
| `coldStartTraceSkipLibs`    | optionally skip creating Cold Start Spans for a comma-separated list of libraries. Useful to limit depth or skip known libraries. Default depends on runtime.                                                                                                                                                                                                                                                                                                                                       |
| `enableProfiling`           | Enable the Datadog Continuous Profiler with `true`. Supported in Beta for NodeJS and Python. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                   |
| `encodeAuthorizerContext`   | When set to `true` for Lambda authorizers, the tracing context will be encoded into the response for propagation. Supported for NodeJS and Python. Defaults to `true`.                                                                                                                                                                                                                                                                                                                              |
| `decodeAuthorizerContext`   | When set to `true` for Lambdas that are authorized via Lambda authorizers, it will parse and use the encoded tracing context (if found). Supported for NodeJS and Python. Defaults to `true`.                                                                                                                                                                                                                                                                                                       |
| `apmFlushDeadline`          | Used to determine when to submit spans before a timeout occurs, in milliseconds. When the remaining time in an AWS Lambda invocation is less than the value set, the tracer attempts to submit the current active spans and all finished spans. Supported for NodeJS and Python. Defaults to `100` milliseconds.                                                                                                                                                                                    |

## How it works

This macro modifies your CloudFormation template to install the Datadog Lambda Library by attaching the Lambda Layers for [Node.js][2], [Python][1], [.NET][9], and [Java][10] to your functions. It redirects to a replacement handler that initializes the Lambda Library without any required code changes.

## Troubleshooting

### Debug Logs

In order to help debug issues, you can look at the CloudWatch Logs for the macro Lambda function. To find the CloudWatch logs:

- Find the macro CloudFormation stack (named `datadog-serverless-macro` if you copied the command under instructions)
- Click on the resources tab and the CloudWatch Log Group should be available with Logical ID `MacroFunctionLogGroup`

### Error message: 'FunctionName' property is undefined for...

This error occurs when you provide a `forwarderArn` and are deploying your Lambda function for the first time, so no log group currently exists, and the macro cannot create this log group or subscribe to the Forwarder for you. One way to fix this issue is to explicitly define the `FunctionName` property on your Lambda (see the example below).

```yml
Resources:
  MyLambda:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs12.x
      FunctionName: MyFunctionName # Add this property to your Lambdas
```

If you cannot (or prefer not) define the `FunctionName` explicitly, then remove the `forwarderArn` parameter from the SAM template or CDK source code, and instead define the subscription filters using the [AWS::Logs::SubscriptionFilter][7] resource like below.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

### Error message: 'logGroupNamePrefix' failed to satisfy constraint...

The `forwarderArn` option does not work when `FunctionName` contains CloudFormation functions, such as `!Sub`. In this case, the macro does not have access to the actual function name (CloudFormation executes functions after transformations). It therefore cannot create log groups and subscription filters for your functions.

Remove the `forwarderArn` parameter from the SAM template or CDK source code, and instead define the subscription filters using the [AWS::Logs::SubscriptionFilter][7] resource like below.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

### Error message: 'Failed to execute transform DatadogServerless'

This error can occur if the IAM user executing the command lacks the `lambda:InvokeFunction` permission. Add the permission to the user's IAM role.

## Community

For product feedback and questions, join the `#serverless` channel in the [Datadog community on Slack](https://chat.datadoghq.com/).

[1]: https://github.com/DataDog/datadog-lambda-layer-python
[2]: https://github.com/DataDog/datadog-lambda-layer-js
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
[4]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stack.html
[5]: https://github.com/DataDog/datadog-lambda-python/releases
[6]: https://github.com/DataDog/datadog-lambda-js/releases
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[8]: https://docs.datadoghq.com/serverless/datadog_lambda_library/extension/
[9]: https://github.com/DataDog/dd-trace-dotnet-aws-lambda-layer/releases
[10]: https://github.com/DataDog/datadog-lambda-java/releases
