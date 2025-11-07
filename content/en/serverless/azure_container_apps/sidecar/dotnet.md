---
title: Instrumenting a .NET Container App with Sidecar
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

## Setup

1. **Install the Datadog .NET tracer** in your Dockerfile.

   {{< tabs >}}
   {{% tab "Standard Linux (glibc)" %}}
{{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
ARG TRACER_VERSION
RUN curl -L -s "https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm_${TRACER_VERSION}_amd64.deb" --output datadog-dotnet-apm.deb && \
   dpkg -i datadog-dotnet-apm.deb
{{< /code-block >}}
   {{% /tab %}}

   {{% tab "Alpine (musl)" %}}
{{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
# For alpine use datadog-dotnet-apm-2.57.0-musl.tar.gz
ARG TRACER_VERSION
ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz

RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
{{< /code-block >}}
   {{% /tab %}}
   {{< /tabs >}}

   See the [dd-trace-dotnet releases][1] to view the latest tracer version.

   For more information, see [Tracing .NET applications][2].

2. **Install serverless-init as a sidecar**.

   {{< tabs >}}

   {{% tab "Terraform" %}}
   {{% aca-install-sidecar-terraform %}}
   {{% /tab %}}

   {{% tab "Manual" %}}
   {{% aca-install-sidecar-manual %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. In this step, configure your logging library to write logs to that file set in `DD_SERVERLESS_LOG_PATH`. In .NET, we recommend writing logs in a JSON format. For example, you can use a third-party logging library such as `Serilog`:
   {{< code-block lang="csharp" disable_copy="false" >}}
using Serilog;

const string LOG_FILE = "/LogFiles/app.log";

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

4. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][4] and [view code examples][5]. In serverless, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-sidecar language="csharp" defaultSource="containerapp" %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Azure Container Apps" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux
[3]: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
[4]: /developers/dogstatsd/?tab=dotnet#install-the-dogstatsd-client
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=dotnet#code-examples-5
