---
title: Enabling App and API Protection for AWS Lambda functions in Ruby
further_reading:
    - link: "/security/application_security/how-it-works/"
      tag: "Documentation"
      text: "How App and API Protection Works"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
    - link: "/security/application_security/threats/"
      tag: "Documentation"
      text: "App and API Protection"
    - link: "https://www.datadoghq.com/blog/datadog-security-google-cloud/"
      tag: "Blog"
      text: "Datadog Security extends compliance and threat protection capabilities for Google Cloud"
---

Configuring App and API Protection for AWS Lambda involves:

1. Identifying functions that are vulnerable or are under attack, which would most benefit from App and API Protection. Find them on [the Security tab of your Software Catalog][1].
2. Setting up App and API Protection instrumentation by using either the [Datadog CLI][8], [AWS CDK][9], [Datadog Serverless Framework plugin][2], or manually by using the Datadog tracing layers.
3. Triggering security signals in your application and seeing how Datadog displays the resulting information.

## Supported trigger types
Threat Detection supports HTTP requests as function input only, as that channel has the highest likelihood of attackers exploiting a serverless application. HTTP requests typically come from AWS services such as:
- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- Function URL

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, fill out this <a href="https://forms.gle/gHrxGQMEnAobukfn7">form</a> to send feedback.</div>

## Get started

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Framework plugin][1] can be used to automatically configure and deploy your Lambda with App and API Protection.

To install and configure the Datadog Serverless Framework plugin:

1. Install the Datadog Serverless Framework plugin:
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```

2. Enable App and API Protection by updating your `serverless.yml` with the `enableASM` configuration parameter:
   ```yaml
   custom:
     datadog:
       appSecMode: on
   ```

   Overall, your new `serverless.yml` file should contain at least:
   ```yaml
   custom:
     datadog:
       apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}" # or apiKey
       appSecMode: on
   ```
   See also the complete list of [plugin parameters][2] to further configure your lambda settings.

4. Redeploy the function and invoke it. After a few minutes, it appears in [App and API Protection views][3].

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/plugin/#configuration-parameters
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc
{{% /tab %}}
{{% tab "Datadog CLI" %}}

The Datadog CLI modifies existing Lambda function configurations to enable instrumentation without requiring a new deployment. It is the quickest way to get started with Datadog's serverless monitoring.

**If you are configuring initial tracing for your functions**, perform the following steps:

1. Install the Datadog CLI client:

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. If you are new to Datadog serverless monitoring, launch the Datadog CLI in interactive mode to guide your first installation for a quick start, and you can ignore the remaining steps. To permanently install Datadog for your production applications, skip this step and follow the remaining ones to run the Datadog CLI command in your CI/CD pipelines after your normal deployment.

    ```sh
    datadog-ci lambda instrument -i --appsec
    ```

3. Configure the AWS credentials:

    Datadog CLI requires access to the AWS Lambda service, and depends on the AWS JavaScript SDK to [resolve the credentials][1]. Ensure your AWS credentials are configured using the same method you would use when invoking the AWS CLI.

4. Configure the Datadog site:

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct **Datadog site** is selected on the right-hand side of this page).

5. Configure the Datadog API key:

    Datadog recommends saving the Datadog API key in AWS Secrets Manager for security. The key needs to be stored as a plaintext string (not a JSON blob). Ensure your Lambda functions have the required `secretsmanager:GetSecretValue` IAM permission.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrument your Lambda functions:

    To instrument your Lambda functions, run the following command.

    ```sh
    datadog-ci lambda instrument --appsec -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
    - Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

   **Note**: Instrument your Lambda functions in a development or staging environment first. If the instrumentation result is unsatisfactory, run `uninstrument` with the same arguments to revert the changes.

    Additional parameters can be found in the [CLI documentation][2].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/cli

{{% /tab %}}
{{% tab "AWS CDK" %}}

The [Datadog CDK Construct][1] automatically installs Datadog on your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the Datadog Lambda Extension.

1. Install the Datadog CDK constructs library:

    ```sh
    # For AWS CDK v1
    pip install datadog-cdk-constructs

    # For AWS CDK v2
    pip install datadog-cdk-constructs-v2
    ```

2. Instrument your Lambda functions

    ```python
    # For AWS CDK v1
    from datadog_cdk_constructs import Datadog
    # NOT SUPPORTED IN V1

    # For AWS CDK v2
    from datadog_cdk_constructs_v2 import Datadog, DatadogAppSecMode

    datadog = Datadog(self, "Datadog",
        python_layer_version={{< latest-lambda-layer-version layer="python" >}},
        extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
        site="<DATADOG_SITE>",
        api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>", // or api_key
        datadog_app_sec_mode=DatadogAppSecMode.ON,
      )
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
    - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][2] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can use `apiKey` instead and set the Datadog API key in plaintext.

    More information and additional parameters can be found on the [Datadog CDK documentation][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

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

5. Enable App and API Protection by adding the following environment variables on your function deployment:
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```

6. Redeploy the function and invoke it. After a few minutes, it appears in [App and API Protection views][4].

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://gallery.ecr.aws/datadoghq/lambda-extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[5]: https://docs.datadoghq.com/serverless/libraries_integrations/plugin/#configuration-parameters
[6]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[7]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[8]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
[9]: https://github.com/DataDog/datadog-cdk-constructs
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[12]: https://gallery.ecr.aws/datadog/lambda-extension
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/
