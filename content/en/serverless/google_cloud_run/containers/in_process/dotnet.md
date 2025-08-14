---
title: Instrumenting a .NET Cloud Run Container In-Process
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

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-process/dotnet">available on GitHub</a>.</div>

1. **Install the Datadog .NET tracer** in your Dockerfile.

   Because GitHub requests are rate limited, you must pass a GitHub token saved in the environment variable `GITHUB_TOKEN` as a [Docker build secret][1] `--secret id=github-token,env=GITHUB_TOKEN`.

   {{< tabs >}}
   {{% tab "Linux/AMD64" %}}
{{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN --mount=type=secret,id=github-token,env=GITHUB_TOKEN \
    chmod +x /app/dotnet.sh && /app/dotnet.sh
{{< /code-block >}}
   {{% /tab %}}

   {{% tab "Alpine" %}}
{{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
# For alpine use datadog-dotnet-apm-2.57.0-musl.tar.gz
ARG TRACER_VERSION
ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz

RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
{{< /code-block >}}
   {{% /tab %}}
   {{< /tabs >}}

   For more information, see [Tracing .NET applications][2].

2. **Install serverless-init**.

   {{% gcr-install-serverless-init cmd="\"dotnet\", \"dotnet.dll\"" %}}

3. **Set up logs**.

   To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

   Datadog also recommends setting the environment variable `DD_SOURCE=csharp` to enable advanced Datadog log parsing.

   If you want multiline logs to be preserved in a single log message, Datadog recommends writing your logs in JSON format. For example, you can use a third-party logging library such as `Serilog`:

   {{< code-block lang="csharp" disable_copy="false" >}}
using Serilog;

builder.Host.UseSerilog((context, config) =>
{
    config.WriteTo.Console(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true));
});

logger.LogInformation("Hello World!");
{{< /code-block >}}

   For more information, see [Correlating .NET Logs and Traces][3].

4. **Configure your application**.

{{% gcr-configure-env-vars language="csharp" %}}

## Troubleshooting

{{% gcr-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/build/building/secrets/
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux
[3]: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
