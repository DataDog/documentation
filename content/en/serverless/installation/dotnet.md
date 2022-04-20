---
title: Instrumenting .NET Serverless Applications
kind: documentation
further_reading:
    - link: '/serverless/configuration'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring'
    - link: '/serverless/guide/troubleshoot_serverless_monitoring'
      tag: 'Documentation'
      text: 'Troubleshoot Serverless Monitoring'
    - link: 'serverless/custom_metrics/'
      tag: 'Documentation'
      text: 'Submitting Custom Metrics from Serverless Applications'
---

<div class="alert alert-warning">The Datadog Lambda Extension only supports the `x86_64` architecture for .NET Lambda functions. If your .NET Lambda function uses the `arm64` architecture, you must <a href="serverless/guide/datadog_forwarder_dotnet">instrument using the Datadog Forwarder</a> instead.</div>

<div class="alert alert-warning">If your Lambda functions are deployed in VPC without access to the public internet, you can send data either <a href="/agent/guide/private-link/">using AWS PrivateLink</a> for the US1 (`datadoghq.com`) <a href="/getting_started/site/">Datadog site</a>, or <a href="/agent/proxy/">using a proxy</a> for all other sites.</div>

## Installation

Datadog offers many different ways to enable instrumentation for your serverless applications. Choose a method below that best suits your needs. Datadog generally recommends using the Datadog CLI.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

The Datadog CLI modifies existing Lambda functions' configurations to enable instrumentation without requiring a new deployment. It is the quickest way to get started with Datadog's serverless monitoring.

1. Install the Datadog CLI client

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. If you are new to Datadog serverless monitoring, launch the Datadog CLI in the interactive mode to guide your first installation for a quick start, and you can ignore the remaining steps. To permanently install Datadog for your production applications, skip this step and follow the remaining ones to run the Datadog CLI command in your CI/CD pipelines _after_ your normal deployment.

    ```sh
    datadog-ci lambda instrument -i
    ```

3. Configure the AWS credentials

    Datadog CLI requires access to the AWS Lambda service, and depends on the AWS JavaScript SDK to [resolve the credentials][1]. Ensure your AWS credentials are configured using the same method you would use when invoking the AWS CLI.

4. Configure the Datadog site

    Specify the [Datadog site][2] where the telemetry should be sent to. The default is `datadoghq.com`.

    ```sh
    export DATADOG_SITE="<DD_SITE>" # such as datadoghq.com, datadoghq.eu or ddog-gov.com
    ```

5. Configure the Datadog API key

    Datadog recommends saving the Datadog API key in AWS Secrets Manager for security and easy rotation. The key needs to be stored as a plaintext string, instead of being inside a json blob. Ensure your Lambda functions have the required `secretsmanager:GetSecretValue` IAM permission.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For quick testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrument your Lambda functions

    **Note**: Instrument your Lambda functions in a dev or staging environment first! Should the instrumentation result be unsatisfactory, run `uninstrument` with the same arguments to revert the changes.

    To instrument your Lambda functions, run the following command.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="dd-trace-dotnet" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names. Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

    Additional parameters can be found in the [CLI documentation][3].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/getting_started/site/
[3]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

To install and configure the Datadog Serverless Plugin, follow these steps:

1. Install the Datadog Serverless Plugin:

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Update your `serverless.yml`:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with your [Datadog site][3] to send the telemetry to.
    - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][4] is securely stored. The key needs to be stored as a plaintext string, instead of being inside a json blob. The `secretsmanager:GetSecretValue` permission is required. For quick testings, you can instead use `apiKey` and set the Datadog API key in plaintext.

    For more information and additional settings, see the [plugin documentation][1].

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/extension
[3]: https://docs.datadoghq.com/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container image" %}}

1. Install the Datadog Lambda Extension

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. You can see a complete list of possible tags in the [Amazon ECR repository][1].

2. Install the Datadog .NET APM client

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    RUN mkdir /opt/datadog
    RUN tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    ```

    Replace `<TRACER_VERSION>` with the version number of `dd-trace-dotnet` you would like to use (for example, `2.3.0`). The minimum supported version is `2.3.0`. You can see the latest versions of `dd-trace-dotnet` in [GitHub][2].

3. Set the required environment variables

    - Set the environment variable `DD_SITE` with your [Datadog site][3] to send the telemetry to.
    - Set the environment variable `DD_API_KEY_SECRET_ARN` with the ARN of the AWS secret where your [Datadog API key][4] is securely stored. The key needs to be stored as a plaintext string, instead of being inside a json blob. The `secretsmanager:GetSecretValue` permission is required. For quick testings, you can use `DD_API_KEY` instead and set the Datadog API key in plaintext.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://github.com/DataDog/dd-trace-dotnet/releases
[3]: https://docs.datadoghq.com/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

1. Install the Datadog Lambda Extension

    [Configure the layers][1] for your Lambda function using the ARN in the following format:

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`

2. Install the Datadog .NET APM client

    [Configure the layers][1] for your Lambda function using the ARN in the following format:

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}`

3. Configure your Lambda function with the following environment variables:

    ```
    DD_SITE = <DD_SITE>
    DD_API_KEY_SECRET_ARN = <DD_API_KEY_SECRET_ARN>
    ```

    - Replace `<DD_SITE>` with your [Datadog site][2] to send the telemetry to.
    - Replace `<DD_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][3] is securely stored. The key needs to be stored as a plaintext string, instead of being inside a json blob. The `secretsmanager:GetSecretValue` permission is required. For quick testings, you can use `DD_API_KEY` instead and set the Datadog API key in plaintext.


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/getting_started/site/
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## What's next?

- Congratulations! You can now view metrics, logs, and traces on the [Serverless Homepage][1].
- Submit a [custom metric][2] or [APM span][3] to monitor your business logic.
- See the [troubleshooting guide][4] if you have trouble collecting the telemetry
- See the [advanced configurations][5] to
    - connect your telemetry using tags
    - collect telemetry for AWS API Gateway, SQS, etc.
    - capture the Lambda request and response payloads
    - link errors of your Lambda functions to your source code
    - filter or scrub sensitive information from logs or traces

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/metrics/dogstatsd_metrics_submission/
[3]: /tracing/custom_instrumentation/dotnet/
[4]: /serverless/guide/troubleshoot_serverless_monitoring/
[5]: /serverless/configuration/
