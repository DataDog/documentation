---
title: Instrumenting .NET Serverless Applications
kind: documentation
further_reading:
    - link: '/serverless/troubleshooting/serverless_tagging/'
      tag: 'Documentation'
      text: 'Tagging Serverless Applications'
    - link: 'serverless/distributed_tracing/'
      tag: 'Documentation'
      text: 'Tracing Serverless Applications'
    - link: 'serverless/custom_metrics/'
      tag: 'Documentation'
      text: 'Submitting Custom Metrics from Serverless Applications'
    - link: '/serverless/guide/troubleshoot_serverless_monitoring'
      tag: 'Documentation'
      text: 'Troubleshoot Serverless Monitoring'
---

To instrument your .NET serverless application, you must use **either** the [Datadog Lambda Extension][1] or the [Datadog Forwarder Lambda function][2].

If you use the Datadog Lambda Extension, you can use Datadog's native .NET APM tracer to instrument your function. If you use the Datadog Forwarder Lambda function, you can use Datadog's integration with AWS X-Ray tracing.

**Note**: The Datadog Lambda Extension only supports the `x86_64` architecture for .NET Lambda functions. If your .NET Lambda function uses the `arm64` architecture, you must use the Datadog Forwarder for instrumentation.

## Instrumentation

### Using the Datadog Lambda Extension

Datadog offers many different ways to enable instrumentation for your serverless applications. Choose a method below that best suits your needs.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

The Datadog CLI modifies existing Lambda functions' configurations to enable instrumentation without requiring a new deployment. It is the quickest way to get started with Datadog's serverless monitoring.

You can also add the [instrumentation command](#instrument) to your CI/CD pipelines to enable instrumentation for all your serverless applications. Run the command _after_ your normal serverless application deployment, so that changes made by the Datadog CLI command are not overridden.

### Install

Install the Datadog CLI with NPM:

```sh
npm install -g @datadog/datadog-ci
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

**Note**: Instrument your Lambda functions in a dev or staging environment first. If the instrumentation needs to be reverted, run `uninstrument` with the same arguments that was used for instrumentation.

To instrument your Lambda functions, run the following command:

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -e <extension_version>
```

To fill in the placeholders:

-   Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
-   Replace `<aws_region>` with the AWS region name.
-   Replace `<extension_version>` with the desired version of the Datadog Lambda Extension. The latest version is `{{< latest-lambda-layer-version layer="extension" >}}`.

For example:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -e {{< latest-lambda-layer-version layer="extension" >}}
```

More information and additional parameters can be found in [Datadog Serverless CLI][2].


[1]: https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/net-dg-config-creds.html
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

To install and configure the Datadog Serverless Plugin, follow these steps:

1. Install the Datadog Serverless Plugin:
    ```sh
    npm install serverless-plugin-datadog --save-dev
    ```
2. In your `serverless.yml`, add the following:
    ```yaml
    plugins:
        - serverless-plugin-datadog
    ```

<div class="alert alert-info">If you are instead deploying your Serverless Framework app <a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">by natively exporting a JSON object from a JavaScript file</a> (for example, by using a <code>serverless.ts</code> file), follow the <a href="https://docs.datadoghq.com/serverless/installation/dotnet?tab=custom">custom installation instructions</a>.</div>

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

1. Add the following layers and environment variables to each .NET Lambda function you wish to instrument:

    ```yml
    Type: AWS::Serverless::Function
    Properties:
        Environment:
            Variables:
                DD_TRACE_ENABLED: true
                DD_API_KEY: '<YOUR_DD_API_KEY>'
                CORECLR_ENABLE_PROFILING: 1
                CORECLR_PROFILER: '{846F5F1C-F9AE-4B07-969E-05C26BC060D8}'
                CORECLR_PROFILER_PATH: '/opt/datadog/Datadog.Trace.ClrProfiler.Native.so'
                DD_DOTNET_TRACER_HOME: '/opt/datadog'
        Layers:
            - arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
            - arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
    ```

    Replace `<YOUR_DD_API_KEY>` with your Datadog API key, found on the [API Management page][1].

2. Optionally add `service` and `env` tags with appropriate values to your function.


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS CDK" %}}

1. Add the following layers and environment variables to each .NET Lambda function you wish to instrument:

    ```typescript
    const fn = new lambda.Function(this, 'MyFunc', {
      // ...
      environment: {
        DD_TRACE_ENABLED: true
        DD_API_KEY: '<YOUR_DD_API_KEY>'
        CORECLR_ENABLE_PROFILING: 1
        CORECLR_PROFILER: '{846F5F1C-F9AE-4B07-969E-05C26BC060D8}'
        CORECLR_PROFILER_PATH: '/opt/datadog/Datadog.Trace.ClrProfiler.Native.so'
        DD_DOTNET_TRACER_HOME: '/opt/datadog'
      }
    });

    fn.addLayers(
        lambda.LayerVersion.fromLayerVersionArn(this, 'extension', 'arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}'),
        lambda.LayerVersion.fromLayerVersionArn(this, 'dd-trace-dotnet', 'arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}'),
    )
    ```

    Replace `<YOUR_DD_API_KEY>` with your Datadog API key, found on the [API Management page][1].

2. Optionally add `service` and `env` tags with appropriate values to your function.


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container image" %}}

1. Add the Datadog Lambda Extension to your container image by adding the following to your Dockerfile:

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. You can see a complete list of possible tags in the [Amazon ECR repository][1].

2. Add the Datadog .NET APM tracer to your container image and configure it with the required environment variables by adding the following to your Dockerfile:

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    RUN mkdir /opt/datadog
    RUN tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    ENV CORECLR_ENABLE_PROFILING=1
    ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    ENV DD_DOTNET_TRACER_HOME=/opt/datadog
    ```

    Replace `<TRACER_VERSION>` with the version number of `dd-trace-dotnet` you would like to use (for example, `2.3.0`). The minimum supported version is `2.3.0`. You can see the latest versions of `dd-trace-dotnet` in [GitHub][2].

3. Set the following environment variables in AWS:
    - Set `DD_TRACE_ENABLED` to `true`.
    - Set `DD_API_KEY` with your Datadog API key, found on the [API Management page][3].
4. Optionally add `service` and `env` tags with appropriate values to your function.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://github.com/DataDog/dd-trace-dotnet/releases
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

1. Add the [Datadog Lambda Extension][1] layer to your Lambda function:

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`

    Note that only the `x86_64` version of the Datadog Lambda Extension is supported for .NET Lambda functions. If your .NET Lambda function uses the `arm64` architecture, you must use the Datadog Forwarder for instrumentation.

2. Add the dd-trace-dotnet layer to your Lambda function:

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}`

3. Add your [Datadog API Key][2] to the Lambda function using the environment variable `DD_API_KEY`.

4. Configure your Lambda function with the following additional environment variables:

    ```
    DD_TRACE_ENABLED = true
    CORECLR_ENABLE_PROFILING = 1
    CORECLR_PROFILER = {846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH = /opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_DOTNET_TRACER_HOME = /opt/datadog
    ```


[1]: /serverless/libraries_integrations/extension/
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

### Using the Datadog Forwarder

As an alternative to the [Datadog Lambda Extension][1], you can use the [Datadog Forwarder Lambda function][2].

#### Install

1. Enable [AWS X-Ray active tracing][3] for your Lambda function.
2. Install the [AWS X-Ray SDK for .NET][4].

#### Subscribe

Subscribe the Datadog Forwarder Lambda function to each of your function's log groups to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][2].
2. [Subscribe the Datadog Forwarder to your function's log groups][5].

#### Monitor custom business logic

If you would like to submit a custom metric using the Datadog Forwarder, see the sample code below:

```csharp
var myMetric = new Dictionary<string, object>();
myMetric.Add("m", "coffee_house.order_value");
myMetric.Add("v", 12.45);
myMetric.Add("e", (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds);
myMetric.Add("t", new string[] {"product:latte", "order:online"});
LambdaLogger.Log(JsonConvert.SerializeObject(myMetric));
```

For more information on custom metric submission, see the [Serverless Custom Metrics documentation][6].

#### Tagging

Although it's optional, Datadog recommends tagging your serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][7].

## Collect logs from AWS serverless resources

Serverless logs generated by managed resources besides AWS Lambda functions can be valuable in helping identify the root cause of issues in your serverless applications. Datadog recommends you forward logs from the following managed resources in your environment:

-   APIs: API Gateway, AppSync, Application Load Balancer (ALB)
-   Queues and streams: SQS, SNS, Kinesis
-   Data stores: DynamoDB, S3, RDS, etc.

To collect logs from non-Lambda AWS resources, install and configure the [Datadog Forwarder][2] to subscribe to each of your managed resource CloudWatch log groups.

## Troubleshooting

If you have trouble collecting monitoring data after following the instructions above, see the [serverless monitoring troubleshooting guide][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/libraries_integrations/extension/
[2]: /serverless/forwarder/
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[5]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[6]: /serverless/custom_metrics?tab=otherruntimes
[7]: /serverless/troubleshooting/serverless_tagging/
[8]: /serverless/guide/troubleshoot_serverless_monitoring/
