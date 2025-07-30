---
title: Instrumenting a .NET Cloud Run Container In-Process
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 50
---

## 1. Install the Tracer

Install the tracer in your Dockerfile. Note that GitHub requests are rate limited, so pass a Github token saved in the environment variable `GITHUB_TOKEN` as a [Docker build secret][1] `--secret id=github-token,env=GITHUB_TOKEN`.

For linux/amd64, include:
```Dockerfile
RUN --mount=type=secret,id=github-token,env=GITHUB_TOKEN \
    chmod +x /app/dotnet.sh && /app/dotnet.sh \
```

For alpine builds, configure your Dockerfile like so:

```Dockerfile
# For arm64 use datadog-dotnet-apm-2.57.0.arm64.tar.gz
# For alpine use datadog-dotnet-apm-2.57.0-musl.tar.gz
ARG TRACER_VERSION
ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz

RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
```

For more information, see [Tracing .NET applications][2].

## 2. Install Serverless-Init

{{% gcr-install-serverless-init cmd="\"dotnet\", \"dotnet.dll\"" %}}

## 3. Setup Logs

To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows serverless-init to read logs from stdout and stderr.

If you want multiline logs to be preserved in a single log message, we recommend writing your logs in JSON format. For example, you can use a third-party logging library such as `Serilog`:
```csharp
using Serilog;

builder.Host.UseSerilog((context, config) =>
{
    config.WriteTo.Console(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true));
});

logger.LogInformation("Hello World!");
```

For more information, see [Correlating .NET Logs and Traces][3].

## 4. Configure your application

{{% gcr-configure-env-vars %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/build/building/secrets/
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux
[3]: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
