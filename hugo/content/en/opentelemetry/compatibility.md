---
title: Datadog and OpenTelemetry Compatibility
disable_sidebar: false
further_reading:
- link: /opentelemetry/troubleshooting/
  tag: "Documentation"
  text: "OpenTelemetry Troubleshooting"
---

## Overview

Use this page to choose an OpenTelemetry setup based on the Datadog products and features you need.

## Setups

Choose an SDK and a Collector or Datadog Agent to process and forward telemetry. For SDK deployment guidance, see [Instrument Your Applications][50].

| Setup Type                                           | API                     | SDK         | Collector/Agent                               |
|------------------------------------------------------|-------------------------|-------------|-----------------------------------------------|
| [**DDOT SDK + OpenTelemetry Collector**][49] (Preview) | OTel API              | DDOT SDK    | DDOT Collector or upstream OpenTelemetry Collector (the Datadog Agent is optional) |
| [**Upstream OpenTelemetry SDK + DDOT Collector**][47] (Preview)        | OTel API                | Upstream OpenTelemetry SDK | DDOT Collector (the Datadog Agent is optional) |
| [**Datadog SDK + Datadog Agent's Collector**][29]            | Datadog API or OTel API | Datadog SDK | Datadog Agent's Collector (runs alongside the Datadog Agent) |
| [**Upstream OpenTelemetry SDK + Datadog Agent's Collector**][29]               | OTel API                | Upstream OpenTelemetry SDK | Datadog Agent's Collector (runs alongside the Datadog Agent) |
| [**Upstream OpenTelemetry SDK + Upstream OpenTelemetry Collector**][7] | OTel API                | Upstream OpenTelemetry SDK | OpenTelemetry Collector Contrib               |
| [**Direct OTLP Ingest**][28]                         | OTel API                | Upstream OpenTelemetry SDK | N/A (Direct to Datadog endpoint)              |

## Feature compatibility

Use the tables below to check feature availability for your SDK and telemetry route.

### DDOT SDK setups

DDOT SDKs send traces, metrics, and logs over OTLP to an OpenTelemetry Collector. The Datadog Agent is optional for these signals.

Capabilities and configuration requirements vary by language and SDK version.

| Capability | Without the Datadog Agent | With the Datadog Agent |
|---|---|---|
| [Core traces, metrics, and logs][50] | {{< X >}} | {{< X >}} |
| [Live Debugger][55] |  | {{< X >}} |
| [Dynamic Instrumentation][56] |  | {{< X >}} |
| [Remotely configured head sampling][57] |  | {{< X >}} |
| [SQL query-level DBM correlation][51] | {{< X >}} | {{< X >}} |
| [Data Streams Monitoring][15] | {{< X >}} | {{< X >}} |
| [Feature Flag Management][52] | {{< X >}}<br>(without Remote Configuration) | {{< X >}} |
| [App and API Protection][11] (AAP) | {{< X >}}<br>(without Remote Configuration) | {{< X >}} |
| [Code Security][53] (IAST, SCA) | {{< X >}}<br>(without Remote Configuration) | {{< X >}} |
| [Continuous Profiler][12] | Not supported | Not supported |

Datadog-specific capabilities can also use OTLP. Some require product-specific configuration or additional data destinations. See the linked product documentation for setup requirements.

### Datadog platform features by setup

This table covers Datadog platform features for each setup. DDOT SDKs and upstream OpenTelemetry SDKs send telemetry over OTLP. Datadog SDKs send traces to the Datadog Agent using Datadog semantics and protocols.

| Feature | DDOT SDK + DDOT Collector (Preview) | Upstream OpenTelemetry SDK + DDOT Collector (Preview) | Datadog SDK + Agent's Collector | Upstream OpenTelemetry SDK + Agent's Collector | Upstream OpenTelemetry SDK + Upstream OpenTelemetry Collector | Direct OTLP Ingest |
|---|---|---|---|---|---|---|
| [Cloud SIEM][18] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Correlated Traces, Metrics, Logs][19] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Distributed Tracing][27] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Agent Observability][38] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Runtime Metrics][23] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Span Links][25] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Trace Metrics][26] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}<br>({{< tooltip text="Sampled" tooltip="Calculated from spans that reach Datadog; reflects any OTel-side sampling you configure." >}}) |
| [Infrastructure Host List][30] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| [Kubernetes Monitoring][20] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| [Source Code Integration][24] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| [Database Monitoring][14] (DBM) | {{< X >}} |  | {{< X >}} | {{< X >}}<br>(without SQL query-level monitoring, which requires DDOT SDKs) |  |  |
| [Cloud Network Monitoring][21] (CNM) |  | | {{< X >}} | {{< X >}} | | |
| [Live Container Monitoring][46] |  | | {{< X >}} | {{< X >}} | | |
| [Live Processes][16] |  | | {{< X >}} | {{< X >}} | | |
| [Universal Service Monitoring][17] (USM) |  | | {{< X >}} | {{< X >}} | | |
| [App and API Protection][11] (AAP) | {{< X >}} | | {{< X >}} | | | |
| [Continuous Profiler][12] |  | | {{< X >}} | | | |
| [Data Observability: Jobs Monitoring][13] (DJM) |  | | {{< X >}} | | | |
| [Data Streams Monitoring][15] (DSM) | {{< X >}} | {{< tooltip text="N/A" tooltip="Not available with upstream OpenTelemetry SDKs" >}} | {{< X >}} | | {{< tooltip text="N/A" tooltip="Not available with upstream OpenTelemetry SDKs" >}} | {{< tooltip text="N/A" tooltip="Not available with upstream OpenTelemetry SDKs" >}} |
| [Real User Monitoring][22] (RUM) |  | | {{< X >}} | | | |

**Note**: Features that need the Datadog Agent, such as [Cloud Network Monitoring][21], [Live Container Monitoring][46], [Live Processes][16], and [Universal Service Monitoring][17], work with the DDOT Collector when you also run the Datadog Agent. See [Add the Datadog Agent][48].

## API support

DDOT SDKs (Java, .NET, Node.js, Python, and Go) support the OpenTelemetry Traces, Metrics, and Logs APIs. The Datadog SDKs for Ruby and PHP also support these OpenTelemetry APIs, but they don't export traces over OTLP, so they aren't DDOT SDKs. Select a language for setup guides and support details.

| Language | Traces API | Metrics API | Logs API |
| :--- | :---: | :---: | :---: |
| [.NET][31] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Python][32] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Node.js][33] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Java][34] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Go][35] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Ruby][36] | {{< X >}} | Alpha | {{< X >}} |
| [PHP][37] | {{< X >}} | {{< X >}} | {{< X >}} |

## More details

### Agent Observability

OpenTelemetry traces that have [generative AI attributes](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) are automatically converted into Agent Observability traces. To disable this conversion, see [Disabling Agent Observability conversion][38].

### Runtime metrics

- **Datadog SDKs in Datadog mode**: Emit [runtime metrics][23] using DogStatsD (UDP port 8125). Enable DogStatsD in the Datadog Agent.
- **DDOT SDKs**: Supported languages and versions emit runtime metrics over OTLP. See [OTLP runtime metrics prerequisites][58].
- **Upstream OpenTelemetry SDKs**: Emit [OpenTelemetry runtime metrics][1], typically over OTLP (port 4317/4318).

### Real User Monitoring (RUM)

To enable full RUM functionality, you need to [inject supported headers][2] to correlate RUM and traces.

### Cloud Network Monitoring (CNM)

Span-level or endpoint-level monitoring is **not** supported.

For more information, see [Cloud Network Monitoring Setup][3].

### Source Code Integration

For unsupported languages in OpenTelemetry setups, [configure telemetry tagging][5] to link data to a specific commit.

## Support levels

Datadog provides different levels of support for OpenTelemetry components and configurations:

- **DDOT SDKs**: Datadog's version of OpenTelemetry SDKs, supported by Datadog. During the Preview, support is provided on a best-effort basis.

- **Upstream OpenTelemetry SDKs**: Maintained and supported by the OpenTelemetry community. Datadog supports the traces, metrics, and logs that they send.

- **Datadog Supported Components**: Datadog-owned components such as the [Datadog Connector][39], [Datadog Exporter][40], and [Infra Attribute Processor][41]. These components are maintained by Datadog, receive regular updates, and are prioritized for bug fixes and feature enhancements.

- **Community Supported Components**: OpenTelemetry components [included with the DDOT Collector][42] by default. Datadog helps ensure these components are secure, stable, and compatible.

- **Custom Components**: OpenTelemetry components or configurations not included by default, such as [custom Collector components][43] or [instrumentation of unsupported runtimes][44]. Datadog provides guidance and documentation as a starting point but does not directly support these components' functionality. For issues with custom components, engage with the [OpenTelemetry community][45] or the component maintainers.

## Platform and environment support

While the OpenTelemetry Collector can be deployed in many environments, certain platforms have specific limitations or support requirements.

* **AWS EKS Fargate**: This environment is **not currently supported** and will result in incorrect infrastructure host billing when used with the OpenTelemetry Collector. Official support is planned for a future release. See the [Collector setup guide][7] for the most up-to-date information.

## Best practices

When using Datadog and OpenTelemetry together, Datadog recommends the following best practices to ensure optimal performance and to avoid potential issues:

- **Avoid mixed instrumentation**: Run one SDK per application process. Don't activate a DDOT SDK and an upstream OpenTelemetry SDK in the same process. Follow the [language-specific instrumentation documentation][8] for required SDK components and dependencies.
- **Configure Datadog Agent and Collector coexistence**: The Datadog Agent and an OpenTelemetry Collector can run on the same host. Configure their receiver ports and telemetry collection to avoid port conflicts and duplicate data. For a DDOT Collector deployment with an optional Datadog Agent, see [Add the Datadog Agent][48].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/integrations/runtime_metrics/
[2]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /network_monitoring/cloud_network_monitoring/setup/
[4]: /infrastructure/process/
[5]: /integrations/guide/source-code-integration/?tab=go#configure-telemetry-tagging
[6]: /opentelemetry/interoperability/otlp_ingest_in_the_agent/
[7]: /opentelemetry/collector_exporter/
[8]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[9]: /opentelemetry/agent
[10]: /tracing/trace_collection/
[11]: /security/application_security/
[12]: /profiler/
[13]: /data_jobs/
[14]: /opentelemetry/correlate/dbm_and_traces/
[15]: /data_streams/
[16]: /infrastructure/process/
[17]: /universal_service_monitoring/
[18]: /security/cloud_siem/
[19]: /opentelemetry/correlate/
[20]: /containers/monitoring/kubernetes_explorer/
[21]: /network_monitoring/performance/
[22]: /opentelemetry/correlate/rum_and_traces/?tab=browserrum#opentelemetry-support
[23]: /tracing/metrics/runtime_metrics/
[24]: /integrations/guide/source-code-integration/
[25]: /tracing/trace_collection/span_links/
[26]: /tracing/metrics/metrics_namespace/
[27]: /tracing/trace_collection/
[28]: /opentelemetry/setup/agentless
[29]: /opentelemetry/setup/agent/#agents-collector
[30]: /infrastructure/list/
[31]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=dot_net&platform=traces
[32]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=python&platform=traces
[33]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=node_js&platform=traces
[34]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=java&platform=traces
[35]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=go&platform=traces
[36]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=ruby&platform=traces
[37]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=php&platform=traces
[38]: /llm_observability/instrument/otel_instrumentation/
[39]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[41]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[42]: /opentelemetry/setup/ddot_collector/#opentelemetry-collector-components
[43]: /opentelemetry/setup/ddot_collector/custom_components
[44]: /opentelemetry/guide/instrument_unsupported_runtimes
[45]: https://opentelemetry.io/community/
[46]: /containers/
[47]: /opentelemetry/setup/ddot_collector/
[48]: /opentelemetry/setup/ddot_collector/kubernetes/#install-the-core-datadog-agent-alongside-ddot
[49]: /opentelemetry/instrument/ddot_sdks/
[50]: /opentelemetry/instrument/
[51]: /database_monitoring/connect_dbm_and_apm/
[52]: /feature_flags/
[53]: /security/code_security/
[55]: /tracing/live_debugger/
[56]: /tracing/trace_collection/dynamic_instrumentation/
[57]: /tracing/trace_pipeline/ingestion_controls/
[58]: /tracing/metrics/runtime_metrics/#export-runtime-metrics-over-otlp
