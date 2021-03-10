---
title: Instrumenting Python Applications
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
  tag: 'Documentation'
  text: 'Tagging Serverless Applications'
- link: 'serverless/distributed_tracing/'
  tag: 'Documentation'
  text: 'Tracing Serverless Applications'
- link: 'serverless/custom_metrics/'
  tag: 'Documentation'
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
        forwarder: # The Datadog Forwarder ARN goes here.
    ```
    More information on the Datadog Forwarder ARN or installation can be found [here][2]. For additional settings, see the [plugin documentation][1].

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS SAM" %}}

The [Datadog CloudFormation macro][1] automatically transforms your SAM application template to add the Datadog Lambda library to your functions using layers, and configure your functions to send metrics, traces, and logs to Datadog through the [Datadog Forwarder][2].

### Install the Datadog CloudFormation macro

Run the following command with your [AWS credentials][3] to deploy a CloudFormation stack that installs the macro AWS resource. You only need to install the macro **once** for a given region in your account. Replace `create-stack` with `update-stack` to update the macro to the latest version.

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
      pythonLayerVersion: "<LAYER_VERSION>"
      stackName: !Ref "AWS::StackName"
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
[4]: https://github.com/DataDog/datadog-lambda-python/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS CDK" %}}

The [Datadog CloudFormation macro][1] automatically transforms the CloudFormation template generated by the AWS CDK to add the Datadog Lambda library to your functions using layers, and configure your functions to send metrics, traces, and logs to Datadog through the [Datadog Forwarder][2].

### Install the Datadog CloudFormation macro

Run the following command with your [AWS credentials][3] to deploy a CloudFormation stack that installs the macro AWS resource. You only need to install the macro **once** for a given region in your account. Replace `create-stack` with `update-stack` to update the macro to the latest version.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

The macro is now deployed and ready to use.

### Instrument the function

Add the `DatadogServerless` transform and the `CfnMapping` to your `Stack` object in your AWS CDK app. See the sample code below in Python (the usage in other language should be similar).

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
        }
      })
```

Replace `<SERVICE>` and `<ENV>` with appropriate values, `<LAYER_VERSION>` with the desired version of Datadog Lambda layer (see the [latest releases][4]), and `<FORWARDER_ARN>` with Forwarder ARN (see the [Forwarder documentation][2]).

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][5] before you can use the macro.

More information and additional parameters can be found in the [macro documentation][1].

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://github.com/DataDog/datadog-lambda-python/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Zappa" %}}

### Update the Zappa settings

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
1. Replace the placeholder `<AWS_REGION>`, `<RUNTIME>` and `<VERSION>` in the layer ARN with appropriate values. The available `RUNTIME` options are `Python27`, `Python36`, `Python37`, and `Python38`. For `VERSION`, see the [latest release][1]. For example:
    ```
    # For regular regions
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:19
    
    # For us-gov regions
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Python37:19
    ```
1. If your Lambda function is configured to use code signing, add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][2]. 

### Subscribe the Datadog Forwarder to the log groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups, to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder][3] if you haven't.
2. [Subscribe the Datadog Forwarder to your function's log groups][4].


[1]: https://github.com/DataDog/datadog-lambda-python/releases
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[3]: https://docs.datadoghq.com/serverless/forwarder/
[4]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Chalice" %}}

### Update the Chalice project

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
1. Register `datadog_lambda_wrapper` as a [middleware][1]:
    ```python
    from chalice import Chalice, ConvertToMiddleware
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    app = Chalice(app_name='hello-chalice')

    app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

    @app.route('/')
    def index():
        return {'hello': 'world'}
    ```
1. If your Lambda function is configured to use code signing, add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][2].

### Subscribe the Datadog Forwarder to the log groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups, to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder][3] if you haven't.
2. [Subscribe the Datadog Forwarder to your function's log groups][4].


[1]: https://aws.github.io/chalice/topics/middleware.html?highlight=handler#registering-middleware
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[3]: https://docs.datadoghq.com/serverless/forwarder/
[4]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
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
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 19 --forwarder arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
```

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][4] before you can instrument it with the Datadog CLI. 

More information and additional parameters can be found in the [CLI documentation][5].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://docs.datadoghq.com/serverless/forwarder/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[5]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Container Image" %}}

### Install the Datadog Lambda Library

If you are deploying your Lambda function as a container image, you cannot use the Datadog Lambda library as a layer. Instead, you must install the Datadog Lambda library directly within the image.


```sh
pip install datadog-lambda
```

Note that the minor version of the `datadog-lambda` package always matches the layer version. For example, `datadog-lambda v0.5.0` matches the content of layer version 5.

### Configure the function

1. Set your image's `CMD` value to `datadog_lambda.handler.handler`. You can either set this directly in your Dockerfile or override the value using AWS.
2. Set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
3. Set the environment variable `DD_TRACE_ENABLED` to `true`.
4. Set the environment variable `DD_FLUSH_TO_LOG` to `true`.
5. Optionally add a `service` and `env` tag with appropriate values to your function.

### Subscribe the Datadog Forwarder to the log groups

You need to subscribe the Datadog Forwarder Lambda function to each of your functions' log groups in order to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][1].
2. [Subscribe the Datadog Forwarder to your function's log groups][2].


[1]: https://docs.datadoghq.com/serverless/forwarder/
[2]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Custom" %}}

### Install the Datadog Lambda Library

You can either install the Datadog Lambda library as a layer (recommended) or as a Python package.

The minor version of the `datadog-lambda` package always matches the layer version. E.g., datadog-lambda v0.5.0 matches the content of layer version 5.

#### Using the layer

[Configure the layers][1] for your Lambda function using the ARN in the following format:

```
# For regular regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# For us-gov regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

The available `RUNTIME` options are `Python27`, `Python36`, `Python37`, and `Python38`. For `VERSION`, see the [latest release][2]. For example:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:19
```

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][3] before you can add the Datadog Lambda library as a layer.

#### Using the package

Install `datadog-lambda` and its dependencies locally to your function project folder. **Note**: `datadog-lambda` depends on `ddtrace`, which uses native extensions; therefore they must be installed and compiled in a Linux environment. For example, you can use [dockerizePip][4] for the Serverless Framework and [--use-container][5] for AWS SAM. For more details, see [how to add dependencies to your function deployment package][6].

```
pip install datadog-lambda -t ./
```

See the [latest release][7]. 

### Configure the function

1. Set your function's handler to `datadog_lambda.handler.handler`.
2. Set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
3. Set the environment variable `DD_TRACE_ENABLED` to `true`.
4. Set the environment variable `DD_FLUSH_TO_LOG` to `true`.
5. Optionally add a `service` and `env` tag with appropriate values to your function.

### Subscribe the Datadog Forwarder to the log groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups, to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder][8] if you haven't.
2. [Subscribe the Datadog Forwarder to your function's log groups][9].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[5]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[6]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[7]: https://pypi.org/project/datadog-lambda/
[8]: https://docs.datadoghq.com/serverless/forwarder/
[9]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{< /tabs >}}

### Unified service tagging

Although it's optional, Datadog highly recommends tagging you serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][3].

## Explore Datadog serverless monitoring

After you have configured your function following the steps above, you can view metrics, logs and traces on the [Serverless Homepage][4].

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

For more information on custom metric submission, see [here][5]. For additional details on custom instrumentation, see the Datadog APM documentation for [custom instrumentation][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
[2]: /serverless/forwarder
[3]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[4]: https://app.datadoghq.com/functions
[5]: /serverless/custom_metrics?tab=python
[6]: /tracing/custom_instrumentation/python/
