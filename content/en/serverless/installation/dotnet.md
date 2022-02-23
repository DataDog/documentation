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

To instrument your .NET serverless application, you must use **either** the [Datadog Lambda Extension][1] (beta) or the [Datadog Forwarder Lambda function][2].

If you use the Datadog Lambda Extension, you can use Datadog's native .NET APM tracer to instrument your function. If you use the Datadog Forwarder Lambda function, you can use Datadog's integration with AWS X-Ray tracing.

**Note**: The Datadog Lambda Extension only supports the `x86_64` architecture for .NET Lambda functions. If your .NET Lambda function uses the `arm64` architecture, you must use the Datadog Forwarder for instrumentation.

## Instrumentation
### Using the Datadog Lambda Extension

<div class="alert alert-warning">
Instrumenting .NET applications with the Datadog Lambda Extension is in beta.
</div>

Datadog offers many different ways to enable instrumentation for your serverless applications. Choose a method below that best suits your needs.

{{< tabs >}}
{{% tab "Serverless Framework" %}}

1. Add the following layers and environment variables to each .NET Lambda function you wish to instrument:

    ```yml
    your-function:
      layers:
        - arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
        - arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
      environment:
        DD_TRACE_ENABLED: true
        DD_API_KEY: "<YOUR_DD_API_KEY>"
        CORECLR_ENABLE_PROFILING: 1
        CORECLR_PROFILER: "{846F5F1C-F9AE-4B07-969E-05C26BC060D8}"
        CORECLR_PROFILER_PATH: "/opt/datadog/Datadog.Trace.ClrProfiler.Native.so"
        DD_DOTNET_TRACER_HOME: "/opt/datadog"
    ```

    Replace `<YOUR_DD_API_KEY>` with your Datadog API key, found on the [API Management page][1].

2. Optionally add `service` and `env` tags with appropriate values to your function.


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

1. Add the following layers and environment variables to each .NET Lambda function you wish to instrument:

    ```yml
    Type: AWS::Serverless::Function
    Properties:
      Environment:
        Variables:
          DD_TRACE_ENABLED: true
          DD_API_KEY: "<YOUR_DD_API_KEY>"
          CORECLR_ENABLE_PROFILING: 1
          CORECLR_PROFILER: "{846F5F1C-F9AE-4B07-969E-05C26BC060D8}"
          CORECLR_PROFILER_PATH: "/opt/datadog/Datadog.Trace.ClrProfiler.Native.so"
          DD_DOTNET_TRACER_HOME: "/opt/datadog"
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

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dotnet" >}}`

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
- APIs: API Gateway, AppSync, Application Load Balancer (ALB)
- Queues and streams: SQS, SNS, Kinesis
- Data stores: DynamoDB, S3, RDS, etc.

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
