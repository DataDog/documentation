---
title: Instrumenting Python Serverless Applications Using the Datadog Forwarder

---
## Overview

<div class="alert alert-warning">
If you are a new user of Datadog Serverless, follow the <a href="/serverless/installation/python">instructions to instrument your Lambda functions using the Datadog Lambda Extension</a> instead. If you have setup Datadog Serverless with the Datadog Forwarder before Lambda offered out-of-the-box functionality, use this guide to maintain your instance.
</div>

## Prerequisites

The [Datadog Forwarder Lambda function][1] is required to ingest AWS Lambda traces, enhanced metrics, custom metrics, and logs.

## Configuration

{{< tabs >}}
{{% tab "Datadog CLI" %}}

The Datadog CLI modifies existing Lambda functions' configurations to enable instrumentation without requiring a new deployment. It is the quickest way to get started with Datadog's serverless monitoring.

You can also add the command to your CI/CD pipelines to enable instrumentation for all your serverless applications. Run the command *after* your normal serverless application deployment, so that changes made by the Datadog CLI command are not overridden.

### Install

Install the Datadog CLI with NPM or Yarn:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Instrument

To instrument the function, run the following command with your [AWS credentials][1].

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder	<forwarder_arn>
```

To fill in the placeholders:
- Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
- Replace `<aws_region>` with the AWS region name.
- Replace `<layer_version>` with the desired version of the Datadog Lambda Library. The latest version is `{{< latest-lambda-layer-version layer="python" >}}`.
- Replace `<forwarder_arn>` with the Forwarder ARN (see the [Forwarder documentation][2]).

For example:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="python" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][5] before you can instrument it with the Datadog CLI.

More information and additional parameters can be found in the [CLI documentation][4].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/serverless/forwarder/
[4]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically adds the Datadog Lambda library to your functions using a layer, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Forwarder][2].

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

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS SAM" %}}

The [Datadog CloudFormation macro][1] automatically transforms your SAM application template to add the Datadog Lambda library to your functions using layers, and configure your functions to send metrics, traces, and logs to Datadog through the [Datadog Forwarder][2].

### Install

Run the following command with your [AWS credentials][3] to deploy a CloudFormation stack that installs the macro AWS resource. You only need to install the macro **once** for a given region in your account. Replace `create-stack` with `update-stack` to update the macro to the latest version.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

The macro is now deployed and ready to use.

### Instrument

To instrument your function, add the following to `template.yml` under the `Transform` section, **after** the `AWS::Serverless` transform for SAM.

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      pythonLayerVersion: "{{< latest-lambda-layer-version layer="python" >}}"
      stackName: !Ref "AWS::StackName"
      forwarderArn: "<FORWARDER_ARN>"
      service: "<SERVICE>" # Optional
      env: "<ENV>" # Optional
```

To fill in the placeholders:
- Replace `<FORWARDER_ARN>` with Forwarder ARN (see the [Forwarder documentation][2]).
- Replace `<SERVICE>` and `<ENV>` with your service and environment values.

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][4] before you can use the macro.

More information and additional parameters can be found in the [macro documentation][1].

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS CDK" %}}

The [Datadog CloudFormation macro][1] automatically transforms the CloudFormation template generated by the AWS CDK to add the Datadog Lambda library to your functions using layers, and configure your functions to send metrics, traces, and logs to Datadog through the [Datadog Forwarder][2].

### Install

Run the following command with your [AWS credentials][3] to deploy a CloudFormation stack that installs the macro AWS resource. You only need to install the macro **once** for a given region in your account. Replace `create-stack` with `update-stack` to update the macro to the latest version.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

The macro is now deployed and ready to use.

### Instrument

To instrument the function, add the `DatadogServerless` transform and the `CfnMapping` to your `Stack` object in your AWS CDK app. See the sample code below in Python (the usage in other language should be similar).

```python
from aws_cdk import core

class CdkStack(core.Stack):
  def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
    super().__init__(scope, id, **kwargs)
    self.add_transform("DatadogServerless")

    mapping = core.CfnMapping(self, "Datadog",
      mapping={
        "Parameters": {
          "pythonLayerVersion": "{{< latest-lambda-layer-version layer="python" >}}",
          "forwarderArn": "<FORWARDER_ARN>",
          "stackName": self.stackName,
          "service": "<SERVICE>",  # Optional
          "env": "<ENV>",  # Optional
        }
      })
```

To fill in the placeholders:
- Replace `<FORWARDER_ARN>` with Forwarder ARN (see the [Forwarder documentation][2]).
- Replace `<SERVICE>` and `<ENV>` with your service and environment values.

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][4] before you can use the macro.

More information and additional parameters can be found in the [macro documentation][1].

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Zappa" %}}

### Update settings

1. Add the following settings to your `zappa_settings.json`:
    ```json
    {
        "dev": {
            "layers": ["arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>"],
            "lambda_handler": "datadog_lambda.handler.handler",
            "aws_environment_variables": {
                "DD_LAMBDA_HANDLER": "handler.lambda_handler",
                "DD_TRACE_ENABLED": "true",
                "DD_FLUSH_TO_LOG": "true",
            },
        }
    }
    ```
1. Replace the placeholder `<AWS_REGION>`, `<RUNTIME>` and `<VERSION>` in the layer ARN with appropriate values. The available `RUNTIME` options are {{< latest-lambda-layer-version layer="python-versions" >}}. The latest `VERSION` is `{{< latest-lambda-layer-version layer="python" >}}`. For example:
    ```
    # For regular regions
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}

    # For us-gov regions
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}
    ```
1. If your Lambda function is configured to use code signing, add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][1].

### Subscribe

Subscribe the Datadog Forwarder Lambda function to each of your function's log groups, to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder][2] if you haven't.
2. [Subscribe the Datadog Forwarder to your function's log groups][3].

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Chalice" %}}

### Update the project

1. Set environment variables `DD_TRACE_ENABLED` and `DD_FLUSH_TO_LOG` to `"true"` in your `config.json`:
    ```json
    {
      "version": "2.0",
      "app_name": "hello-chalice",
      "stages": {
        "dev": {
          "api_gateway_stage": "api",
          "environment_variables": {
            "DD_TRACE_ENABLED": "true",
            "DD_FLUSH_TO_LOG": "true"
          }
        }
      }
    }
    ```
1. Add `datadog_lambda` to your `requirements.txt`.
1. Register `datadog_lambda_wrapper` as a [middleware][1] in your `app.py`:
    ```python
    from chalice import Chalice, ConvertToMiddleware
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    app = Chalice(app_name='hello-chalice')

    app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

    @app.route('/')
    def index():
        return {'hello': 'world'}
    ```

1. If your Lambda function is configured to use code signing, add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][5].

### Subscribe

Subscribe the Datadog Forwarder Lambda function for each of your function's log groups, to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder][3] if you haven't.
2. [Subscribe the Datadog Forwarder to your function's log groups][4].

[1]: https://aws.github.io/chalice/topics/middleware.html?highlight=handler#registering-middleware
[3]: https://docs.datadoghq.com/serverless/forwarder/
[4]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Container Image" %}}

### Install

If you are deploying your Lambda function as a container image, you cannot use the Datadog Lambda library as a layer. Instead, you must install the Datadog Lambda library as a dependency of your function within the image.


```sh
pip install datadog-lambda
```

Note that the minor version of the `datadog-lambda` package always matches the layer version. For example, `datadog-lambda v0.5.0` matches the content of layer version 5.

### Configure

Follow these steps to configure the function:

1. Set your image's `CMD` value to `datadog_lambda.handler.handler`. You can set this in AWS or directly in your Dockerfile. Note that the value set in AWS overrides the value in the Dockerfile if you set both.
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

You can either install the Datadog Lambda library as a layer (recommended) or Python package.

The minor version of the `datadog-lambda` package always matches the layer version. For example, datadog-lambda v0.5.0 matches the content of layer version 5.

#### Using the layer

[Configure the layers][1] for your Lambda function using the ARN in the following format:

```
# For us,us3,us5,ap1, and eu regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# For us-gov regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

The available `RUNTIME` options are {{< latest-lambda-layer-version layer="python-versions" >}}. The latest `VERSION` is `{{< latest-lambda-layer-version layer="python" >}}`. For example:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}
```

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][9] before you can add the Datadog Lambda library as a layer.


#### Using the package

Install `datadog-lambda` and its dependencies locally to your function project folder. **Note**: `datadog-lambda` depends on `ddtrace`, which uses native extensions; therefore they must be installed and compiled in a Linux environment. For example, you can use [dockerizePip][3] for the Serverless Framework and [--use-container][4] for AWS SAM. For more details, see [how to add dependencies to your function deployment package][5].

```
pip install datadog-lambda -t ./
```

See the [latest release][6].

### Configure

Follow these steps to configure the function:

1. Set your function's handler to `datadog_lambda.handler.handler`.
2. Set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
3. Set the environment variable `DD_TRACE_ENABLED` to `true`.
4. Set the environment variable `DD_FLUSH_TO_LOG` to `true`.
5. Optionally add a `service` and `env` tag with appropriate values to your function.

### Subscribe

Subscribe the Datadog Forwarder Lambda function to each of your function's log groups, to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder][7] if you haven't.
2. [Subscribe the Datadog Forwarder to your function's log groups][8].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[4]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[5]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[6]: https://pypi.org/project/datadog-lambda/
[7]: https://docs.datadoghq.com/serverless/forwarder/
[8]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[9]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{< /tabs >}}

### Tag

Although it's optional, Datadog recommends tagging your serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][2].

## Explore

After configuring your function following the steps above, view your metrics, logs, and traces on the [Serverless homepage][3].

## Monitor custom business logic

If you would like to submit a custom metric or span, see the sample code below:

```python
import time
from ddtrace import tracer
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    # add custom tags to the lambda function span,
    # does NOT work when X-Ray tracing is enabled
    current_span = tracer.current_span()
    if current_span:
        current_span.set_tag('customer.id', '123456')

    # submit a custom span
    with tracer.trace("hello.world"):
        print('Hello, World!')

    # submit a custom metric
    lambda_metric(
        metric_name='coffee_house.order_value',
        value=12.45,
        timestamp=int(time.time()), # optional, must be within last 20 mins
        tags=['product:latte', 'order:online']
    )

    return {
        'statusCode': 200,
        'body': get_message()
    }

# trace a function
@tracer.wrap()
def get_message():
    return 'Hello from serverless!'
```

For more information on custom metric submission, see [here][4]. For additional details on custom instrumentation, see the Datadog APM documentation for [custom instrumentation][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /serverless/forwarder
[2]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /serverless/custom_metrics?tab=python
[5]: /tracing/custom_instrumentation/python/
