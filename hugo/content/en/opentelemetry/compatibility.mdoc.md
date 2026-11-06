---
title: Datadog and OpenTelemetry Compatibility
disable_sidebar: false
content_filters:
  - trait_id: otel_sdk
    option_group_id: otel_compatibility_sdk_options
    label: "SDK"
  - trait_id: otel_destination
    option_group_id: otel_compatibility_<OTEL_SDK>_destination_options
    label: "Destination"
further_reading:
- link: /opentelemetry/troubleshooting/
  tag: "Documentation"
  text: "OpenTelemetry Troubleshooting"
---

## Overview

Use this page to check which Datadog products and features each OpenTelemetry (OTel) setup supports.

## Setups

Datadog supports several configurations for using OpenTelemetry. The primary difference between these setups is the choice of SDK (OpenTelemetry or Datadog) and the Collector or Agent used to process and forward telemetry data.

| Setup Type                                           | API                     | SDK         | Collector/Agent                                        |
|------------------------------------------------------|-------------------------|-------------|--------------------------------------------------------|
| [**DDOT SDK + DDOT Collector**][49]                  | Datadog API or OTel API | DDOT SDK    | DDOT Collector (the Datadog Agent is optional)          |
| [**Datadog SDK + Agent's Collector**][48]       | Datadog API or OTel API | Datadog SDK | Agent's Collector (runs alongside the Datadog Agent) |
| [**OTel SDK + Agent's Collector**][48]          | OTel API                | OTel SDK    | Agent's Collector (runs alongside the Datadog Agent) |
| [**OTel SDK + Upstream OpenTelemetry Collector**][7] | OTel API                | OTel SDK    | OpenTelemetry Collector Contrib               |
| [**Direct OTLP Ingest**][28]                         | OTel API                | OTel SDK    | N/A (Direct to Datadog endpoint)              |

## Feature compatibility

Select your SDK and destination in the menus at the top of this page. The table shows which Datadog features that setup supports:

- {% x/ %}: Supported
- Blank: Not supported
- ?: Not documented yet

{% if equals($otel_destination, "ddot_collector") %}
The DDOT Collector doesn't need the Datadog Agent. Features marked **With Agent** work after you [add the Datadog Agent][47] alongside the Collector.
{% /if %}

<!--
How to edit this table

Each row has one cell per support state. A setup that matches no condition in
the cell shows a blank cell, which means not supported.

- Check mark: the `if` that wraps the `x` tag. List the SDKs and destinations
  that support the feature. The destination menu only offers valid pairs, so
  you can list SDKs and destinations separately.
- ?: the `if` that wraps `?`. Match the setups that aren't documented yet.
  Delete it when every setup for the row is documented.
- Short labels, such as Sampled or Preview: their own `if`, for setups with
  partial support.
- With Agent: for features that need the Datadog Agent alongside the DDOT
  Collector. Match the `ddot_collector` destination and wrap the label in a
  tooltip with the text "Add the Datadog Agent alongside the DDOT Collector."
  Remove `ddot_collector` from the row's `?` condition.

To add an SDK or destination, add the option to
customization_config/en/options/general.yaml. Then create `_v2` versions of
the option groups in customization_config/en/option_groups/opentelemetry.yaml,
point the frontmatter at them, and update each row.
-->

{% table %}
- Feature
- Supported
---
- [Cloud SIEM][18]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["agents_collector", "upstream_otel_collector", "otlp_intake"])) %}{% x/ %}{% /if %}
  {% if or(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"])) %}?{% /if %}
---
- [Correlated Traces, Metrics, Logs][19]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["agents_collector", "upstream_otel_collector", "otlp_intake"])) %}{% x/ %}{% /if %}
  {% if or(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"])) %}?{% /if %}
---
- [Distributed Tracing][27]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["agents_collector", "upstream_otel_collector", "otlp_intake"])) %}{% x/ %}{% /if %}
  {% if or(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"])) %}?{% /if %}
---
- [Agent Observability][38]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["agents_collector", "upstream_otel_collector", "otlp_intake"])) %}{% x/ %}{% /if %}
  {% if or(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"])) %}?{% /if %}
---
- [Runtime Metrics][23]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["agents_collector", "upstream_otel_collector", "otlp_intake"])) %}{% x/ %}{% /if %}
  {% if or(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"])) %}?{% /if %}
---
- [Span Links][25]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["agents_collector", "upstream_otel_collector", "otlp_intake"])) %}{% x/ %}{% /if %}
  {% if or(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"])) %}?{% /if %}
---
- [Trace Metrics][26]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["agents_collector", "upstream_otel_collector"])) %}{% x/ %}{% /if %}
  {% if equals($otel_destination, "otlp_intake") %}{% tooltip contents="Calculated from spans that reach Datadog; reflects any OTel-side sampling you configure." %}Sampled{% /tooltip %}{% /if %}
  {% if or(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"])) %}?{% /if %}
---
- [Database Monitoring][14] (DBM)
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"]) %}?{% /if %}
---
- [Infrastructure Host List][30]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["agents_collector", "upstream_otel_collector"])) %}{% x/ %}{% /if %}
  {% if or(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"])) %}?{% /if %}
---
- [Cloud Network Monitoring][21] (CNM)
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"]) %}?{% /if %}
---
- [Kubernetes Monitoring][20]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["agents_collector", "upstream_otel_collector"])) %}{% x/ %}{% /if %}
  {% if or(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"])) %}?{% /if %}
---
- [Live Container Monitoring][46]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"]) %}?{% /if %}
---
- [Live Processes][16]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"]) %}?{% /if %}
---
- [Universal Service Monitoring][17] (USM)
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if includes($otel_destination, ["ddot_collector", "agent_otlp_endpoint"]) %}?{% /if %}
---
- [App and API Protection][11] (AAP)
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}?{% /if %}
---
- [Continuous Profiler][12]
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}?{% /if %}
---
- [Data Observability: Jobs Monitoring][13] (DJM)
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}?{% /if %}
---
- [Data Streams Monitoring][15] (DSM)
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if includes($otel_destination, ["upstream_otel_collector", "otlp_intake"]) %}{% tooltip contents="OTel does not offer DSM functionality." %}N/A{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}?{% /if %}
---
- [Real User Monitoring][22] (RUM)
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}?{% /if %}
---
- [Source code integration][24]
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}?{% /if %}
---
- [Remote Configuration][50]
-
  {% if equals($otel_destination, "agents_collector") %}Preview{% /if %}
  {% if includes($otel_destination, ["upstream_otel_collector", "agent_otlp_endpoint", "otlp_intake"]) %}?{% /if %}
{% /table %}

## API support

Datadog SDKs provide support for the OpenTelemetry Traces, Metrics, and Logs APIs across various languages. Find your language in the table below for setup guides and support details.

| Language | Traces API | Metrics API | Logs API |
| :--- | :---: | :---: | :---: |
| [.NET][31] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Python][32] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Node.js][33] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Java][34] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Go][35] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Ruby][36] | {% x/ %} | Alpha | {% x/ %} |
| [PHP][37] | {% x/ %} | {% x/ %} | {% x/ %} |

## More details

### Agent Observability

OpenTelemetry traces that have [generative AI attributes](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) are automatically converted into Agent Observability traces. To disable this conversion, see [Disabling Agent Observability conversion][38].

### Runtime metrics

- **Datadog SDK with the Agent**: Sends [runtime metrics][23] with DogStatsD (UDP port 8125). Turn on DogStatsD in the Agent.
- **OpenTelemetry SDK setups**: Follow the [OpenTelemetry Runtime Metrics][1] specification and are typically sent using OTLP (port 4317/4318).

### Real User Monitoring (RUM)

To enable full RUM functionality, you need to [inject supported headers][2] to correlate RUM and traces.

### Cloud Network Monitoring (CNM)

Span-level or endpoint-level monitoring is **not** supported.

For more information, see [Cloud Network Monitoring Setup][3].

### Source Code Integration

For unsupported languages in OpenTelemetry setups, [configure telemetry tagging][5] to link data to a specific commit.

## Support levels

Datadog provides different levels of support for OpenTelemetry components and configurations:

- **Datadog Supported Components**: Datadog-owned components such as the [Datadog Connector][39], [Datadog Exporter][40], and [Infra Attribute Processor][41]. These components are maintained by Datadog, receive regular updates, and are prioritized for bug fixes and feature enhancements.

- **Community Supported Components**: OpenTelemetry components [included with the DDOT Collector][42] by default. Datadog helps ensure these components are secure, stable, and compatible.

- **Custom Components**: OpenTelemetry components or configurations not included by default, such as [custom Collector components][43] or [instrumentation of unsupported runtimes][44]. Datadog provides guidance and documentation as a starting point but does not directly support these components' functionality. For issues with custom components, engage with the [OpenTelemetry community][45] or the component maintainers.

## Platform and environment support

While the OpenTelemetry Collector can be deployed in many environments, certain platforms have specific limitations or support requirements.

* **AWS EKS Fargate**: This environment is **not currently supported** and will result in incorrect infrastructure host billing when used with the OpenTelemetry Collector. Official support is planned for a future release. See the [Collector setup guide][7] for the most up-to-date information.

## Best practices

When using Datadog and OpenTelemetry together, Datadog recommends the following best practices to ensure optimal performance and to avoid potential issues:

- **Avoid mixed instrumentation**: In most cases, you should not use both a Datadog SDK and an OpenTelemetry SDK in the same application, as this leads to undefined behavior.
  - **Exception**: Support for some languages, such as Python, requires both the Datadog SDK and the OpenTelemetry SDK to be installed.
  - Always follow the specific [language-specific instrumentation documentation][8] to ensure you are using the correct and supported setup.
- **Avoid Agent and separate Collector on same host**: Do not run the Datadog Agent and a separate OpenTelemetry Collector on the same host, as this may cause issues. However, you can run Agents and Collectors on different hosts within the same fleet.
  - **Exception**: You can run the Datadog Agent on the same nodes as the DDOT Collector. See [Add the Datadog Agent][47].

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
[30]: /infrastructure/list/
[31]: /opentelemetry/instrument/api_support/dotnet/
[32]: /opentelemetry/instrument/api_support/python/
[33]: /opentelemetry/instrument/api_support/nodejs/
[34]: /opentelemetry/instrument/api_support/java/
[35]: /opentelemetry/instrument/api_support/go/
[36]: /opentelemetry/instrument/api_support/ruby/
[37]: /opentelemetry/instrument/api_support/php/
[38]: /llm_observability/instrument/otel_instrumentation/
[39]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[41]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[42]: /opentelemetry/setup/ddot_collector/#opentelemetry-collector-components
[43]: /opentelemetry/setup/ddot_collector/custom_components
[44]: /opentelemetry/guide/instrument_unsupported_runtimes
[45]: https://opentelemetry.io/community/
[46]: /containers/
[47]: /opentelemetry/setup/ddot_collector/kubernetes/#install-the-core-datadog-agent-alongside-ddot
[48]: /opentelemetry/setup/agent/#agents-collector
[49]: /opentelemetry/setup/ddot_collector/
[50]: /remote_configuration/
