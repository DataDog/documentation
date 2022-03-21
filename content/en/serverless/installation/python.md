---
title: Instrumenting Python Serverless Applications
kind: documentation
further_reading:
    - link: 'serverless/datadog_lambda_library/python'
      tag: 'Documentation'
      text: 'Datadog Lambda Library for Python'
    - link: 'serverless/distributed_tracing/'
      tag: 'Documentation'
      text: 'Tracing Serverless Applications'
    - link: 'serverless/custom_metrics/'
      tag: 'Documentation'
      text: 'Submitting Custom Metrics from Serverless Applications'
    - link: '/serverless/guide/troubleshoot_serverless_monitoring'
      tag: 'Documentation'
      text: 'Troubleshoot Serverless Monitoring'
aliases:
    - /serverless/datadog_lambda_library/python/
    - /serverless/guide/python/
---

<div class="alert alert-warning">If your Python Lambda functions are written in <a href="https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html">Python 3.6 or less</a>, or you previously set up Datadog Serverless using the Datadog Forwarder, see the <a href="http://docs.datadoghq.com/serverless/guide/datadog_forwarder_python">Using the Datadog Forwarder - Python</a> guide.</div>

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

**Note**: Instrument your Lambda functions in a dev or staging environment first! Should the instrumentation result be unsatisfactory, run `uninstrument` with the same arguments to revert the changes.

To instrument your Lambda functions, run the following command:

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> -e <extension_version>
```

To fill in the placeholders:

-   Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
-   Replace `<aws_region>` with the AWS region name.
-   Replace `<layer_version>` with the desired version of the Datadog Lambda Library. The latest version is `{{< latest-lambda-layer-version layer="python" >}}`.
-   Replace `<extension_version>` with the desired version of the Datadog Lambda Extension. The latest version is `{{< latest-lambda-layer-version layer="extension" >}}`.

For example:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
```

More information and additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically adds the Datadog Lambda Library to your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

To install and configure the Datadog Serverless Plugin, follow these steps:

1. Install the Datadog Serverless Plugin:
    ```sh
    yarn add --dev serverless-plugin-datadog
    ```
2. In your `serverless.yml`, add the following:
    ```yaml
    plugins:
        - serverless-plugin-datadog
    ```

<div class="alert alert-info">If you are instead deploying your Serverless Framework app <a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">by natively exporting a JSON object from a JavaScript file</a> (for example, by using a <code>serverless.ts</code> file), follow the <a href="https://docs.datadoghq.com/serverless/installation/python?tab=custom">custom installation instructions</a>.</div>

3. In your `serverless.yml`, also add the following section:
    ```yaml
    custom:
        datadog:
            apiKey: # Your Datadog API Key goes here.
    ```
    Find your Datadog API key on the [API Management page][3]. For additional settings, see the [plugin documentation][1].


[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

The [Datadog CloudFormation macro][1] automatically transforms your SAM application template to add the Datadog Lambda library to your functions using layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

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
          stackName: !Ref 'AWS::StackName'
          apiKey: <DATADOG_API_KEY>
          pythonLayerVersion: { { < latest-lambda-layer-version layer="python" > } }
          extensionLayerVersion: { { < latest-lambda-layer-version layer="extension" > } }
          service: '<SERVICE>' # Optional
          env: '<ENV>' # Optional
```

To fill in the placeholders:

-   Replace `<DATADOG_API_KEY>` with your Datadog API key from the [API Management page][4].
-   Replace `<SERVICE>` and `<ENV>` with appropriate values.

More information and additional parameters can be found in the [macro documentation][1].


[1]: https://docs.datadoghq.com/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS CDK" %}}

The [Datadog CDK Construct][1] automatically adds the Datadog Lambda Library to your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

### Install the Datadog CDK constructs library

Run the following command in your CDK project:

```sh
#PyPI
pip install datadog-cdk-constructs
```

### Instrument the function

Import the `datadog-cdk-construct` module in your AWS CDK app and add the following configuration:

```python
from datadog_cdk_constructs import Datadog

datadog = Datadog(self, "Datadog",
    python_layer_version={{< latest-lambda-layer-version layer="python" >}},
    extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
    api_key=<DATADOG_API_KEY>
)
datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
```

Replace `<DATADOG_API_KEY>` with your Datadog API key on the [API Management page][1].

More information and additional parameters can be found on the [Datadog CDK NPM page][2].


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://www.npmjs.com/package/datadog-cdk-constructs
{{% /tab %}}
{{% tab "Zappa" %}}

### Update settings

1. Add the following settings to your `zappa_settings.json`:

{{< site-region region="us,us3,us5,eu" >}}

```json
{
    "dev": {
        "layers": [
            "arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<LIBRARY_VERSION>",
            "arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>"
        ],
        "lambda_handler": "datadog_lambda.handler.handler",
        "aws_environment_variables": {
            "DD_LAMBDA_HANDLER": "handler.lambda_handler",
            "DD_TRACE_ENABLED": "true",
            "DD_API_KEY": "<DATADOG_API_KEY>"
        }
    }
}
```

{{< /site-region >}}
{{< site-region region="gov" >}}

````json
{
  "dev": {
    "layers": [
      "arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<LIBRARY_VERSION>", "arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>"
    ],
    "lambda_handler": "datadog_lambda.handler.handler",
    "aws_environment_variables": {
      "DD_LAMBDA_HANDLER": "handler.lambda_handler",
      "DD_TRACE_ENABLED": "true",
      "DD_API_KEY": "<DATADOG_API_KEY>"
    },
    }
  }
  ```
{{< /site-region >}}
2. Replace the following placeholders with appropriate values:

- Replace `<AWS_REGION>` with the AWS region to which your Lambda functions are deployed.
- Replace `<RUNTIME>` with the appropriate Python runtime. The available `RUNTIME` options are `Python27`, `Python36`, `Python37`, and `Python38`.
- Replace `<LIBRARY_VERSION>` with the desired version of the Datadog Lambda Library. The latest version is `{{< latest-lambda-layer-version layer="python" >}}`.
- Replace `<EXTENSION_VERSION>` with the desired version of the Datadog Lambda Extension. The latest version is `{{< latest-lambda-layer-version layer="extension" >}}`.
- Replace `<DATADOG_API_KEY>` with your Datadog API key on the [API Management page][1].
- If the lambda is using the arm64 architecture, add -ARM to the layer name.

For example:

{{< site-region region="us,us3,us5,eu" >}}
````

// For x86 architecture
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python38:{{< latest-lambda-layer-version layer="python" >}}
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
// For arm64 architecture
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python38-ARM:{{< latest-lambda-layer-version layer="python" >}}
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

```
{{< /site-region >}}
{{< site-region region="gov" >}}
```

// For x86 architecture
arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Python38:{{< latest-lambda-layer-version layer="python" >}}
arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
// For arm64 architecture
arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Python38-ARM:{{< latest-lambda-layer-version layer="python" >}}
arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

````
{{< /site-region >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Chalice" %}}

### Update the project

1. Add the [Datadog Lambda Extension][1] and the following environment variables in your `config.json`:
  {{< site-region region="us,us3,us5,eu" >}}
  ```json
  {
    "version": "2.0",
    "app_name": "hello-chalice",
    "stages": {
      "dev": {
        "api_gateway_stage": "api",
        "environment_variables": {
          "DD_TRACE_ENABLED": "true",
          "DD_API_KEY": "<DATADOG_API_KEY>",
        },
        "layers": ["arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>"],
      }
    }
  }
````

{{< /site-region >}}
{{< site-region region="gov" >}}

````json
{
  "version": "2.0",
  "app_name": "hello-chalice",
  "stages": {
    "dev": {
      "api_gateway_stage": "api",
      "environment_variables": {
        "DD_TRACE_ENABLED": "true",
        "DD_API_KEY": "<DATADOG_API_KEY>",
      },
      "layers": ["arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>"],
    }
  }
  ```
  {{< /site-region >}}

  **Note**: For security, you may wish to store your Datadog API key in AWS Secrets Manager. In this case, set the environment variable `DD_API_KEY_SECRET_ARN` with the ARN of the Secrets Manager secret containing your Datadog API key. In other words, you can replace the line `"DD_API_KEY": "<DATADOG_API_KEY>"` in the configuration above with `"DD_API_KEY_SECRET_ARN": "<SECRET_ARN_DATADOG_API_KEY>"`. Accessing this key during a cold start adds extra latency.

2. Replace the following placeholders with appropriate values:

- Replace `<AWS_REGION>` with the AWS region to which your Lambda functions are deployed.
- Replace `<EXTENSION_VERSION>` with the desired version of the Datadog Lambda Extension. The latest version is `{{< latest-lambda-layer-version layer="extension" >}}`.
- If the lambda is using the arm64 architecture, add -ARM to the layer name.

3. Add `datadog_lambda` to your `requirements.txt`.
4. Register `datadog_lambda_wrapper` as a [middleware][2] in your `app.py`:
  ```python
  from chalice import Chalice, ConvertToMiddleware
  from datadog_lambda.wrapper import datadog_lambda_wrapper

  app = Chalice(app_name='hello-chalice')

  app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

  @app.route('/')
  def index():
      return {'hello': 'world'}
  ```

[1]: /serverless/libraries_integrations/extension/
[2]: https://aws.github.io/chalice/topics/middleware.html?highlight=handler#registering-middleware
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
handler = "datadog_lambda.handler.handler"
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
````

{{< /site-region >}}
{{< site-region region="gov" >}}

```hcl
variable "dd_api_key" {
  type        = string
  description = "Datadog API key"
}
resource "aws_lambda_function" "my_func" {
  function_name = "my_func"
  handler = "datadog_lambda.handler.handler"
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
    - Replace `<RUNTIME>` with the appropriate Python runtime. The available `RUNTIME` options are `Python27`, `Python36`, `Python37`, and `Python38`.
    - Replace `<LIBRARY_VERSION>` with the desired version of the Datadog Lambda Library. The latest version is `{{< latest-lambda-layer-version layer="python" >}}`.
    - Replace `<EXTENSION_VERSION>` with the desired version of the Datadog Lambda Extension. The latest version is `{{< latest-lambda-layer-version layer="extension" >}}`.

3. Apply the Terraform configuration with your Datadog API key that can be found on the [API Management page][1]:

    ```bash
    terraform apply -var "dd_api_key=<DD_API_KEY>"
    ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container Image" %}}

### Install

If you are deploying your Lambda function as a container image, you cannot use the Datadog Lambda Library as a Lambda Layer. Instead, you must install the Datadog Lambda library as a dependency of your function within the image.

```sh
pip install datadog-lambda
```

Note that the minor version of the `datadog-lambda` package always matches the layer version. For example, `datadog-lambda v0.5.0` matches the content of layer version 5.

### Install the Datadog Lambda Extension

Add the Datadog Lambda Extension to your container image by adding the following to your Dockerfile:

```dockerfile
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. You can see a complete list of possible tags in the [Amazon ECR repository][1].

### Configure the function

1. Set your image's `CMD` value to `datadog_lambda.handler.handler`. You can set this in AWS or directly in your Dockerfile. Note that the value set in AWS overrides the value in the Dockerfile if you set both.
2. Set the following environment variables in AWS:

-   Set `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
-   Set `DD_TRACE_ENABLED` to `true`.
-   Set `DD_API_KEY` with your Datadog API key on the [API Management page][2].

3. Optionally add `service` and `env` tags with appropriate values to your function.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-info">If you are not using a serverless development tool that Datadog supports, such as the Serverless Framework or AWS CDK, Datadog strongly encourages you instrument your serverless applications with the <a href="./?tab=datadogcli#configuration">Datadog CLI</a>.</div>

### Install the Datadog Lambda library

The Datadog Lambda Library can be imported either as a layer (recommended) _OR_ as a Python package.

The minor version of the `datadog-lambda` package always matches the layer version. For example, datadog-lambda v0.5.0 matches the content of layer version 5.

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

The available `RUNTIME` options are `Python27`, `Python36`, `Python37`, and `Python38`. The latest `VERSION` is `{{< latest-lambda-layer-version layer="python" >}}`. For example:

{{< site-region region="us,us3,us5,eu" >}}

```
// If using x86 architecture
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:{{< latest-lambda-layer-version layer="python" >}}

// If using arm64 architecture
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37-ARM:{{< latest-lambda-layer-version layer="python" >}}
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```
// If using x86 architecture
arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Python37:{{< latest-lambda-layer-version layer="python" >}}
// If using arm64 architecture
arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Python37-ARM:{{< latest-lambda-layer-version layer="python" >}}

```

{{< /site-region >}}

#### Using the package

If you cannot use the prebuilt Datadog Lambda layer for some reason, alternatively install the `datadog-lambda` package and its dependencies locally to your function project folder using your favorite Python package manager, such as `pip`.

```sh
pip install datadog-lambda -t ./
```

**Note**: `datadog-lambda` depends on `ddtrace`, which uses native extensions; therefore they must be installed and compiled in a Linux environment on the right architecture (`x86_64` or `arm64`). For example, you can use [dockerizePip][2] for the Serverless Framework and [--use-container][3] for AWS SAM. For more details, see [how to add dependencies to your function deployment package][4].

See the [latest release][5].

### Install the Datadog Lambda Extension

[Configure the layers][1] for your Lambda function using the ARN in the following format:

{{< site-region region="us,us3,us5,eu" >}}

```
// For x86 architecture
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
// For arm64 architecture
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:<EXTENSION_VERSION>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```
// For x86 architecture
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>
// For arm64 architecture
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:<EXTENSION_VERSION>
```

{{< /site-region >}}

The latest `EXTENSION_VERSION` is {{< latest-lambda-layer-version layer="extension" >}}.

### Configure

Follow these steps to configure the function:

1. Set your function's handler to `datadog_lambda.handler.handler`.
2. Set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
3. Set the environment variable `DD_TRACE_ENABLED` to `true`.
4. Set the environment variable `DD_API_KEY` to your Datadog API key on the [API Management page][6].
5. Optionally add a `service` and `env` tag with appropriate values to your function.


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[3]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[5]: https://pypi.org/project/datadog-lambda/
[6]: https://app.datadoghq.com/organization-settings/api-keys
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

If your Lambda function is running in a VPC, follow these [instructions][6] to ensure that the extension can reach Datadog API endpoints.

## Troubleshooting

If you have trouble collecting monitoring data after following the instructions above, see the [serverless monitoring troubleshooting guide][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /serverless/libraries_integrations/extension/#tagging
[3]: /serverless/libraries_integrations/forwarder
[4]: /serverless/custom_metrics?tab=python
[5]: /tracing/custom_instrumentation/python/
[6]: /serverless/libraries_integrations/extension/#vpc
[7]: /serverless/guide/troubleshoot_serverless_monitoring/
