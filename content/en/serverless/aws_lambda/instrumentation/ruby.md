---
title: Instrumenting Ruby Serverless Applications
further_reading:
- link: 'serverless/datadog_lambda_library/ruby'
  tag: 'Documentation'
  text: 'Datadog Lambda Library for Ruby'
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
    - /serverless/datadog_lambda_library/ruby/
    - /serverless/installation/ruby
    - /serverless/aws_lambda/installation/ruby
---

<div class="alert alert-danger">If you previously set up your Lambda functions using the Datadog Forwarder, see <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_ruby">instrumenting using the Datadog Forwarder</a>. Otherwise, follow the instructions in this guide to instrument using the Datadog Lambda Extension.</div>

<div class="alert alert-info">Version 67+ of the Datadog Lambda Extension is optimized to significantly reduce cold start duration. <a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">Read more</a>.</div>

## Setup

If your application is deployed as a container image, use the _Container Image_ method.

{{< tabs >}}
{{% tab "Datadog UI" %}}
You can instrument your Ruby AWS Lambda application directly within Datadog.

1. Configure your Lambda functions

    Enable Datadog APM and wrap your Lambda handler function using the wrapper provided by the Datadog Lambda library.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

2. Navigate to the [Serverless > AWS Lambda][2] page and select [**Instrument Functions**][3].

For more information, see [Remote instrumentation for AWS Lambda][1].

[1]: /serverless/aws_lambda/remote_instrumentation
[2]: https://app.datadoghq.com/functions?cloud=aws
[3]: https://app.datadoghq.com/serverless/aws/lambda/setup
{{% /tab %}}
{{% tab "Datadog CLI" %}}

The Datadog CLI modifies existing Lambda functions' configurations to enable instrumentation without requiring a new deployment. It is the quickest way to get started with Datadog's serverless monitoring.

1. Configure your Lambda functions

    Enable Datadog APM and wrap your Lambda handler function using the wrapper provided by the Datadog Lambda library.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

2. Install the Datadog CLI client

    ```sh
    npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-lambda
    ```

3. If you are new to Datadog serverless monitoring, launch the Datadog CLI in the interactive mode to guide your first installation for a quick start, and you can ignore the remaining steps. To permanently install Datadog for your production applications, skip this step and follow the remaining ones to run the Datadog CLI command in your CI/CD pipelines _after_ your normal deployment.

    ```sh
    datadog-ci lambda instrument -i
    ```

4. Configure the AWS credentials

    Datadog CLI requires access to the AWS Lambda service, and depends on the AWS JavaScript SDK to [resolve the credentials][1]. Ensure your AWS credentials are configured using the same method you would use when invoking the AWS CLI.

5. Configure the Datadog site

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).

6. Configure the Datadog API key

    Datadog recommends saving the Datadog API key in AWS Secrets Manager for security and easy rotation. The key needs to be stored as a plaintext string (not a JSON blob). Ensure your Lambda functions have the required `secretsmanager:GetSecretValue` IAM permission.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For quick testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

7. Instrument your Lambda functions

    **Note**: Instrument your Lambda functions in a dev or staging environment first! Should the instrumentation result be unsatisfactory, run `uninstrument` with the same arguments to revert the changes.

    To instrument your Lambda functions, run the following command.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="ruby" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names. Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

    Additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

To install and configure the Datadog Serverless Plugin, follow these steps:

1. Configure your Lambda functions

    Enable Datadog APM and wrap your Lambda handler function using the wrapper provided by the Datadog Lambda library.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

2. Install the Datadog Serverless Plugin:

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

3. Update your `serverless.yml`:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
    - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][3] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can instead use `apiKey` and set the Datadog API key in plaintext.

    For more information and additional settings, see the [plugin documentation][1].

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "AWS CDK" %}}
{{< lambda-install-cdk language="ruby" layer="ruby" layerParamTypescript="rubyLayerVersion" layerParamPython="ruby_layer_version">}}
{{% /tab %}}

{{% tab "AWS SAM" %}}

The [Datadog CloudFormation macro][1] automatically transforms your SAM application template to install Datadog on your functions using Lambda layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

1. Configure your Lambda functions

    Enable Datadog APM and wrap your Lambda handler function using the wrapper provided by the Datadog Lambda library.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

2. Install the Datadog CloudFormation macro

    Run the following command with your [AWS credentials][3] to deploy a CloudFormation stack that installs the macro AWS resource. You only need to install the macro **once** for a given region in your account. Replace `create-stack` with `update-stack` to update the macro to the latest version.

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

    The macro is now deployed and ready to use.

3. Configure your Lambda functions

    Enable Datadog APM and wrap your Lambda handler function using the wrapper provided by the Datadog Lambda library.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

4. Instrument your Lambda functions

    Add the `DatadogServerless` transform **after** the `AWS::Serverless` transform under the `Transform` section in your for SAM `template.yml`.

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          rubyLayerVersion: {{< latest-lambda-layer-version layer="ruby" >}}
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
    - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][4] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can use `apiKey` instead and set the Datadog API key in plaintext.

    More information and additional parameters can be found in the [macro documentation][1].


[1]: https://docs.datadoghq.com/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "Container Image" %}}

1. Install the Datadog Lambda Library

    If you are deploying your Lambda function as a container image, you cannot use the Datadog Lambda library as a Lambda Layer. Instead, you must package the Datadog Lambda and tracing libraries within the image.

    Add the following to your Gemfile:

    ```Gemfile
    gem 'datadog'
    gem 'datadog-lambda'
    ```

    `datadog` contains native extensions that must be compiled for Amazon Linux to work with AWS Lambda.

    Install `gcc`, `gmp-devel`, and `make` prior to running `bundle install` in your function's Dockerfile to ensure that the native extensions can be successfully compiled.

    ```dockerfile
    FROM <base image>

    # assemble your container image

    RUN yum -y install gcc gmp-devel make
    RUN bundle config set path 'vendor/bundle'
    RUN bundle install
    ```

2. Install the Datadog Lambda Extension

    Add the Datadog Lambda Extension to your container image by adding the following to your Dockerfile:

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. Alpine is also supported with specific version numbers (such as `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) or with `latest-alpine`. You can see a complete list of possible tags in the [Amazon ECR repository][1].

3. Configure your Lambda functions

    Enable Datadog APM and wrap your Lambda handler function using the wrapper provided by the Datadog Lambda library.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

4. Configure the Datadog site and API key

    - Set the environment variable `DD_SITE` to {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
    - Set the environment variable `DD_API_KEY_SECRET_ARN` with the ARN of the AWS secret where your [Datadog API key][3] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can use `DD_API_KEY` instead and set the Datadog API key in plaintext.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

The [`lambda-datadog`][1] Terraform module wraps the [`aws_lambda_function`][2] resource and automatically configures your Lambda function for Datadog Serverless Monitoring by:

- Adding the Datadog Lambda layers
- Redirecting the Lambda handler
- Enabling the collection and sending of metrics, traces, and logs to Datadog

1. Configure your Lambda functions

    Enable Datadog APM and wrap your Lambda handler function using the wrapper provided by the Datadog Lambda library.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

2. Install the Terraform module

    ```tf
    module "lambda-datadog" {
      source  = "DataDog/lambda-datadog/aws"
      version = "4.0.0"

      environment_variables = {
        "DD_API_KEY_SECRET_ARN" : "<DATADOG_API_KEY_SECRET_ARN>"
        "DD_ENV" : "<ENVIRONMENT>"
        "DD_SERVICE" : "<SERVICE_NAME>"
        "DD_SITE": "<DATADOG_SITE>"
        "DD_VERSION" : "<VERSION>"
      }

      datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
      datadog_ruby_layer_version = {{< latest-lambda-layer-version layer="ruby" >}}

      # aws_lambda_function arguments
    }
    ```

3. Replace the `aws_lambda_function` resource with the `lambda-datadog` Terraform module then specify the `source` and `version` of the module.

4. Set the `aws_lambda_function` arguments:

   All of the arguments available in the `aws_lambda_function` resource are available in this Terraform module. Arguments defined as blocks in the `aws_lambda_function` resource are redefined as variables with their nested arguments.

   For example, in `aws_lambda_function`, `environment` is defined as a block with a `variables` argument. In the `lambda-datadog` Terraform module, the value for the `environment_variables` is passed to the `environment.variables` argument in `aws_lambda_function`. See [inputs][3] for a complete list of variables in this module.

5. Fill in the environment variable placeholders:

   - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your Datadog API key is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can instead use the environment variable `DD_API_KEY` and set your Datadog API key in plaintext.
   - Replace `<ENVIRONMENT>` with the Lambda function's environment, such as `prod` or `staging`
   - Replace `<SERVICE_NAME>` with the name of the Lambda function's service
   - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}}. (Ensure the correct [Datadog site][4] is selected on this page).
   - Replace `<VERSION>` with the version number of the Lambda function

6. Select the versions of the Datadog Extension Lambda layer and Datadog Ruby Lambda layer to use. Defaults to the latest layer versions.

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_ruby_layer_version = {{< latest-lambda-layer-version layer="ruby" >}}
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /getting_started/site/
{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-info">If you are not using a serverless development tool that Datadog supports, such as the Serverless Framework, Datadog strongly encourages you instrument your serverless applications with the <a href="./?tab=datadogcli">Datadog CLI</a>.</div>

1. Install the Datadog Lambda library

    The Datadog Lambda Library can be installed as a layer or a gem. For most functions, Datadog recommends installing the library as a layer. If your Lambda function is deployed as a container image, you must install the library as a gem.

    The minor version of the `datadog-lambda` gem always matches the layer version. For example, datadog-lambda v0.5.0 matches the content of layer version 5.

    - Option A: [Configure the layers][1] for your Lambda function using the ARN in the following format:

      ```sh
      # Use this format for x86-based Lambda deployed in AWS commercial regions

      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}

      # Use this format for arm64-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="ruby" >}}


      # Use this format for x86-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}

      # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="ruby" >}}
      ```

      Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`. The available `RUNTIME` options are `Ruby2-7`, and `Ruby3-2`.

    - Option B: If you cannot use the prebuilt Datadog Lambda layer, alternatively you can install the gems `datadog-lambda` and `datadog` by adding them to your Gemfile as an alternative:

      ```Gemfile
      gem 'datadog'
      gem 'datadog-lambda'
      ```

      `datadog` contains native extensions that must be compiled for Amazon Linux to work with AWS Lambda. Datadog therefore recommends that you build and deploy your Lambda as a container image. If your function cannot be deployed as a container image and you would like to use Datadog APM, Datadog recommends installing the Lambda Library as a layer instead of as a gem.

      Install `gcc`, `gmp-devel`, and `make` prior to running `bundle install` in your function's Dockerfile to ensure that the native extensions can be successfully compiled.

      ```dockerfile
      FROM <base image>

      # assemble your container image

      RUN yum -y install gcc gmp-devel make
      RUN bundle config set path 'vendor/bundle'
      RUN bundle install
      ```

2. Install the Datadog Lambda Extension

    - Option A: [Configure the layers][1] for your Lambda function using the ARN in the following format:

      ```sh
      # Use this format for x86-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for arm64-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for x86-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
      ```

      Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`.

    - Option B: Add the Datadog Lambda Extension to your container image by adding the following to your Dockerfile:

      ```dockerfile
      COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
      ```

      Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. You can see a complete list of possible tags in the [Amazon ECR repository][2].

3. Configure your Lambda functions

    Enable Datadog APM and wrap your Lambda handler function using the wrapper provided by the Datadog Lambda library.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

4. Configure Datadog site and API key

    - Set the environment variable `DD_SITE` to {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
    - Set the environment variable `DD_API_KEY_SECRET_ARN` with the ARN of the AWS secret where your [Datadog API key][3] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can use `DD_API_KEY` instead and set the Datadog API key in plaintext.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## FIPS compliance

{{% svl-lambda-fips %}}

## AWS Lambda and VPC

{{% svl-lambda-vpc %}}

## What's next?

- Add custom tags to your telemetry by using the `DD_TAGS` environment variable
- If you are using the Datadog Lambda Extension, turn off the Datadog Forwarder's Lambda logs
- See [Configure Serverless Monitoring for AWS Lambda][6] for further capabilities

### Monitor custom business logic

To monitor your custom business logic, submit a custom metric or span using the sample code below. For additional options, see [custom metric submission for serverless applications][7] and the APM guide for [custom instrumentation][8].

```ruby
require 'datadog'
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Enable the instrumentation
end

def handler(event:, context:)
    # Apply the Datadog wrapper
    Datadog::Lambda::wrap(event, context) do
        # Add custom tags to the lambda function span,
        # does NOT work when X-Ray tracing is enabled
        current_span = Datadog::Tracing.active_span
        current_span.set_tag('customer.id', '123456')

        some_operation()

        Datadog::Tracing.trace('hello.world') do |span|
          puts "Hello, World!"
        end

        # Submit a custom metric
        Datadog::Lambda.metric(
          'coffee_house.order_value', # metric name
          12.45, # metric value
          time: Time.now.utc, # optional, must be within last 20 mins
          "product":"latte", # tag
          "order":"online" # another tag
        )
    end
end

# Instrument the function
def some_operation()
    Datadog::Tracing.trace('some_operation') do |span|
        # Do something here
    end
end
```

For more information on custom metric submission, see [Serverless Custom Metrics][7]. For additional details on custom instrumentation, see the Datadog APM documentation for [custom instrumentation][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /serverless/forwarder/
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[4]: https://app.datadoghq.com/functions
[5]: /serverless/guide/troubleshoot_serverless_monitoring/
[6]: /serverless/configuration
[7]: /serverless/custom_metrics?tab=ruby
[8]: /tracing/custom_instrumentation/ruby/
[9]: /security/application_security/serverless/
[10]: https://github.com/DataDog/datadog-lambda-extension
[11]: https://github.com/DataDog/datadog-lambda-extension/issues
