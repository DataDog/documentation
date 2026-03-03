---
title: Configuring the .NET Core Tracing Library
code_lang: dotnet-core
type: multi-code-lang
code_lang_weight: 60
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
  - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples"
    tag: "Source Code"
    text: "Examples of custom instrumentation"
  - link: "https://github.com/DataDog/dd-trace-dotnet"
    tag: "Source Code"
    text: "Source code"
  - link: "https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/"
    tag: "Blog"
    text: "Deploy ASP.NET Core applications to Azure App Service"
  - link: "/opentelemetry/interoperability/environment_variable_support"
    tag: "Documentation"
    text: "OpenTelemetry Environment Variable Configurations"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][4].

{{% apm-config-visibility %}}

{{< img src="tracing/dotnet/dotnet_core_configuration.png" alt=".NET Core Tracer configuration setting precedence" style="width:100%" >}}

You can set configuration settings in the .NET Tracer with any of the following methods:

{{< tabs >}}

{{% tab "Environment variables" %}}

To configure the tracer using environment variables, set the variables before launching the instrumented application. To learn how to set environment variables in different environments, see [Configuring process environment variables][1].

[1]: /tracing/trace_collection/dd_libraries/dotnet-core/#configuring-process-environment-variables
{{% /tab %}}

{{% tab "Code" %}}

To configure the tracer in application code, create a `TracerSettings` instance from the default configuration sources. Set properties on this `TracerSettings` instance before calling `Tracer.Configure()`. For example:

<div class="alert alert-danger">
  Settings must be set on <code>TracerSettings</code> <em>before</em> creating the <code>Tracer</code>. Changes made to <code>TracerSettings</code> properties after the <code>Tracer</code> is created are ignored.
</div>

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

// read default configuration sources (env vars or datadog.json)
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

{{% tab "JSON file" %}}

To configure the tracer using a JSON file, create `datadog.json` in the instrumented application's directory. The root JSON object must be an object with a key-value pair for each setting. For example:

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

## Configuration settings

<div class="alert alert-danger">
  On Linux, the names of environment variables are case-sensitive.
</div>

Using the methods described above, customize your tracing configuration with the following variables. Use the environment variable name (for example, `DD_TRACE_AGENT_URL`) when setting environment variables or configuration files. Use the TracerSettings property (for example, `Exporter.AgentUri`) when changing settings in code.

### Automatic instrumentation integration configuration

The following table lists configuration variables that are available **only** when using automatic instrumentation and can be set for each integration.

<!-- FEATURE_PARITY_AUTOGEN_START -->
{{% collapse-content title="Application Security" level="h4" expanded=false id="feature-parity-dotnet-core-application_security" %}}
{{< include-markdown "tracing/trace_collection/library_config/dotnet-core/application_security" >}}
{{% /collapse-content %}}

{{% collapse-content title="Continuous Integration Visibility" level="h4" expanded=false id="feature-parity-dotnet-core-tests" %}}
{{< include-markdown "tracing/trace_collection/library_config/dotnet-core/tests" >}}
{{% /collapse-content %}}

{{% collapse-content title="Data Streams" level="h4" expanded=false id="feature-parity-dotnet-core-data_streams" %}}
{{< include-markdown "tracing/trace_collection/library_config/dotnet-core/data_streams" >}}
{{% /collapse-content %}}

{{% collapse-content title="Dynamic Instrumentation" level="h4" expanded=false id="feature-parity-dotnet-core-dynamic_instrumentation" %}}
{{< include-markdown "tracing/trace_collection/library_config/dotnet-core/dynamic_instrumentation" >}}
{{% /collapse-content %}}

{{% collapse-content title="Profiler" level="h4" expanded=false id="feature-parity-dotnet-core-profiler" %}}
{{< include-markdown "tracing/trace_collection/library_config/dotnet-core/profiler" >}}
{{% /collapse-content %}}

{{% collapse-content title="Runtime Metrics" level="h4" expanded=false id="feature-parity-dotnet-core-runtime_metrics" %}}
{{< include-markdown "tracing/trace_collection/library_config/dotnet-core/runtime_metrics" >}}
{{% /collapse-content %}}

{{% collapse-content title="Tracing" level="h4" expanded=false id="feature-parity-dotnet-core-tracing" %}}
{{< include-markdown "tracing/trace_collection/library_config/dotnet-core/tracing" >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenTelemetry" level="h4" expanded=false id="feature-parity-dotnet-core-opentelemetry" %}}
{{< include-markdown "tracing/trace_collection/library_config/dotnet-core/opentelemetry" >}}
{{% /collapse-content %}}

{{% collapse-content title="Other" level="h4" expanded=false id="feature-parity-dotnet-core-other" %}}
{{< include-markdown "tracing/trace_collection/library_config/dotnet-core/other" >}}
{{% /collapse-content %}}
<!-- FEATURE_PARITY_AUTOGEN_END -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_pipeline/ingestion_mechanisms/
[4]: /getting_started/tagging/unified_service_tagging/
[5]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel#trace_id-option
[6]: /tracing/trace_collection/compatibility/dotnet-core#integrations
[7]: /tracing/trace_collection/custom_instrumentation/dotnet/
[8]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[9]: https://github.com/openzipkin/b3-propagation
[10]: https://www.w3.org/TR/trace-context/#traceparent-header
[11]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=net#pagetitle
[12]: /tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection
[13]: /agent/configuration/network/#configure-ports
[14]: /tracing/configure_data_security/#redacting-the-query-in-the-url
[15]: /tracing/configure_data_security#telemetry-collection
[16]: /tracing/guide/remote_config
[17]: https://app.datadoghq.com/services
[18]: /tracing/trace_collection/otel_instrumentation/dotnet/
[19]: /tracing/trace_collection/compatibility/dotnet-core/#opentelemetry-based-integrations
[20]: /opentelemetry/interoperability/environment_variable_support
[21]: /tracing/trace_collection/trace_context_propagation/
[22]: /tracing/trace_collection/library_config/#traces
[23]: /profiler/
