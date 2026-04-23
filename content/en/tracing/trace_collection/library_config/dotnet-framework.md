---
title: Configuring the .NET Framework Tracing Library
code_lang: dotnet-framework
type: multi-code-lang
code_lang_weight: 70
further_reading:
  - link: "/tracing/other_telemetry/connect_logs_and_traces/dotnet/"
    tag: "Documentation"
    text: "Connect .NET application logs to traces"
  - link: "/tracing/metrics/runtime_metrics/dotnet/"
    tag: "Documentation"
    text: "Runtime metrics"
  - link: "/tracing/trace_collection/trace_context_propagation/"
    tag: "Documentation"
    text: "Propagating trace context"
  - link: "/serverless/azure_app_services/"
    tag: "Documentation"
    text: "Microsoft Azure App Service extension"
  - link: "/tracing/glossary/"
    tag: "Documentation"
    text: "Explore your services, resources, and traces"
  - link: "https://www.datadoghq.com/blog/net-monitoring-apm/"
    tag: "Blog"
    text: ".NET monitoring with Datadog APM and distributed tracing"
  - link: "https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/"
    tag: "Blog"
    text: "Monitor containerized ASP.NET Core applications"
  - link: "https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/"
    tag: "Blog"
    text: "Monitor containerized ASP.NET Core applications on AWS Fargate"
  - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples"
    tag: "Source Code"
    text: "Examples of custom instrumentation"
  - link: "https://github.com/DataDog/dd-trace-dotnet"
    tag: "Source Code"
    text: "Source code"
  - link: "/opentelemetry/interoperability/environment_variable_support"
    tag: "Documentation"
    text: "OpenTelemetry Environment Variable Configurations"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][4].

{{% apm-config-visibility %}}

{{< img src="tracing/dotnet/dotnet_framework_configuration.png" alt=".NET Framework Tracer configuration setting precedence" style="width:100%" >}}

You can set configuration settings in the .NET Tracer with any of the following methods:

{{< tabs >}}

{{% tab "Environment variables" %}}

To configure the tracer using environment variables, set the variables before launching the instrumented application. To learn how to set environment variables in different environments, see [Configuring process environment variables][1].

[1]: /tracing/trace_collection/dd_libraries/dotnet-framework/#configuring-process-environment-variables

{{% /tab %}}

{{% tab "Code" %}}

To configure the Tracer in application code, create a `TracerSettings` instance from the default configuration sources. Set properties on this `TracerSettings` instance before calling `Tracer.Configure()`. For example:

<div class="alert alert-danger">
  Settings must be set on <code>TracerSettings</code> <em>before</em> creating the <code>Tracer</code>. Changes made to <code>TracerSettings</code> properties after the <code>Tracer</code> is created are ignored.
</div>

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

// read default configuration sources (env vars, web.config, datadog.json)
var settings = TracerSettings.FromDefaultSources();

// change some settings
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
// In v2 of Datadog.Trace, use settings.Exporter.AgentUri
settings.AgentUri = new Uri("http://localhost:8126/");

// configure the global Tracer settings
Tracer.Configure(settings);
```

{{% /tab %}}

{{% tab "web.config" %}}

To configure the Tracer using an `app.config` or `web.config` file, use the `<appSettings>` section. For example:

```xml
<configuration>
  <appSettings>
    <add key="DD_TRACE_AGENT_URL" value="http://localhost:8126"/>
    <add key="DD_ENV" value="prod"/>
    <add key="DD_SERVICE" value="MyService"/>
    <add key="DD_VERSION" value="abc123"/>
  </appSettings>
</configuration>
```

{{% /tab %}}

{{% tab "JSON file" %}}

To configure the Tracer using a JSON file, create `datadog.json` in the instrumented application's directory. The root JSON object must be an object with a key-value pair for each setting. For example:

```json
{
  "DD_TRACE_AGENT_URL": "http://localhost:8126",
  "DD_ENV": "prod",
  "DD_SERVICE": "MyService",
  "DD_VERSION": "abc123",
}
```

{{% /tab %}}

{{< /tabs >}}

## Configurations keys

The previous version of this configuration documentation is still available at [Configuring the .NET Framework Tracing Library (legacy)][24].

{{< partial name="apm/registry-config-list.html" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /tracing/trace_pipeline/ingestion_mechanisms/
[4]: /getting_started/tagging/unified_service_tagging/
[5]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel#trace_id-option
[6]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=environmentvariables#head-based-sampling
[7]: /tracing/trace_collection/compatibility/dotnet-framework/#integrations
[8]: /tracing/trace_collection/custom_instrumentation/dotnet/
[9]: https://github.com/openzipkin/b3-propagation
[10]: https://www.w3.org/TR/trace-context/#traceparent-header
[12]: /tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection
[13]: /agent/configuration/network/#configure-ports
[14]: /tracing/configure_data_security/#redacting-the-query-in-the-url
[15]: /tracing/configure_data_security#telemetry-collection
[16]: /remote_configuration
[17]: https://app.datadoghq.com/services
[18]: /tracing/trace_collection/otel_instrumentation/dotnet/
[19]: /tracing/trace_collection/compatibility/dotnet-core/#opentelemetry-based-integrations
[20]: /opentelemetry/interoperability/environment_variable_support
[21]: /tracing/trace_collection/trace_context_propagation/
[22]: /tracing/trace_collection/library_config_legacy/#traces
[23]: /profiler/
[24]: /tracing/trace_collection/library_config_legacy/dotnet-framework/
