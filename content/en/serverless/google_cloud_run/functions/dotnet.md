---
title: Instrumenting a .NET Cloud Run Function
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 50
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux'
    tag: 'Documentation'
    text: 'Tracing .NET Core Applications'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/dotnet/'
    tag: 'Documentation'
    text: 'Correlating .NET Logs and Traces'
---

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/dotnet">available on GitHub</a>.</div>

## Setup

1. **Install the Datadog .NET tracer**.

   Add the `Datadog.Trace.Bundle` [NuGet package][1] to your application.

   Set the following environment variables to enable automatic instrumentation:
   {{< code-block lang="text" disable_copy="false" >}}
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=/layers/google.dotnet.publish/publish/bin/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so
DD_DOTNET_TRACER_HOME=/layers/google.dotnet.publish/publish/bin/datadog
{{< /code-block >}}

   For more information, see [Tracing .NET applications][2].

2. **Install serverless-init as a sidecar**.

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform function="true" %}}
   {{% /tab %}}

   {{% tab "Other" %}}
   {{% gcr-install-sidecar-other function="true" %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. You may have also set the `DD_SERVERLESS_LOG_PATH` environment variable, which defaults to `/shared-volume/logs/app.log`.

   In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. In .NET, Datadog recommends writing logs in JSON format. For example, you can use a third-party logging library such as `Serilog`:
   {{< code-block lang="csharp" disable_copy="false" >}}
using Serilog;

const string LOG_FILE = "/shared-volume/logs/app.log";

builder.Host.UseSerilog((context, config) =>
{
    // Ensure the directory exists
    Directory.CreateDirectory(Path.GetDirectoryName(LOG_FILE)!);

    config.WriteTo.Console(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true))
          .WriteTo.File(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true), LOG_FILE);
});

logger.LogInformation("Hello World!");
{{< /code-block >}}

   Datadog recommends setting the environment variables `DD_LOGS_INJECTION=true` (in your main container) and `DD_SOURCE=csharp` (in your sidecar container) to enable advanced Datadog log parsing.

   For more information, see [Correlating .NET Logs and Traces][3].

4. {{% gcr-service-label %}}

5. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][4] and [view code examples][5]. In Serverless Monitoring, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-sidecar language="csharp" function="true" defaultSource="cloudrun" %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux
[3]: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
[4]: /developers/dogstatsd/?tab=dotnet#install-the-dogstatsd-client
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=dotnet#code-examples-5
