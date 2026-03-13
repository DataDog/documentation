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

This is the new page with registry configurations
-> Backport everything needed from the current one.

## All registry configurations

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
[22]: /tracing/trace_collection/library_config/#traces
[23]: /profiler/
