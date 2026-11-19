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

Use this page to check which Datadog products and features each OpenTelemetry (OTel) setup supports. Select your SDK and destination in the menus at the top of the page. For setup guidance, see [Instrument Your Applications][47].

## Feature compatibility

<!-- Setups in Preview -->
{% if or(equals($otel_sdk, "ddot_sdk"), and(equals($otel_sdk, "opentelemetry_sdk"), equals($otel_destination, "ddot_collector"))) %}
**Note**: This setup is in Preview.
{% /if %}

<!--
How to edit this table

Each row has one cell per support state. A setup that matches no condition in
the cell shows a blank cell, which means not supported. Each setup must match
at most one condition in a row.

- Check mark: the `if` that wraps the `x` tag. List the SDKs and destinations
  that support the feature. The destination menu only offers valid pairs, so
  you can list SDKs and destinations separately.
- ?: the `if` that wraps `?`. Match the setups that aren't documented yet.
  Delete it when every setup for the row is documented.
- Short labels, such as Sampled, N/A, Preview, or With Agent: their own
  `if`, for setups with partial support. Wrap the label in a tooltip that
  explains it.

To add an SDK or destination, add the option to
customization_config/en/options/general.yaml. Then create `_v2` versions of
the option groups in customization_config/en/option_groups/opentelemetry.yaml,
point the frontmatter at them, and update each row.
-->

{% table %}
- Feature
- Support
---
- [Cloud SIEM][7]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])) %}{% x/ %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Correlated Traces, Metrics, Logs][8]
-
  {% if or(and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])), and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector"))) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Distributed Tracing][9]
-
  {% if and(includes($otel_sdk, ["ddot_sdk", "datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])) %}{% x/ %}{% /if %}
---
- [Agent Observability][10]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])) %}{% x/ %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Runtime Metrics][11]
-
  {% if and(includes($otel_sdk, ["ddot_sdk", "datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])) %}{% x/ %}{% /if %}
---
- [Span Links][12]
-
  {% if or(and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])), and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector"))) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Trace Metrics][13]
-
  {% if or(and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector"])), and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector"))) %}{% x/ %}{% /if %}
  {% if equals($otel_destination, "direct_otlp_ingest") %}{% x/ %} ({% tooltip contents="Calculated from spans that reach Datadog; reflects any OTel-side sampling you configure." %}Sampled{% /tooltip %}){% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Infrastructure Host List][14]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector"])) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Kubernetes Monitoring][15]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector"])) %}{% x/ %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Source Code Integration][16]
-
  {% if or(and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector"])), and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector"))) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Database Monitoring][17] (DBM)
-
  {% if or(equals($otel_sdk, "ddot_sdk"), and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), equals($otel_destination, "agents_collector"))) %}{% x/ %}{% /if %}
---
- [Cloud Network Monitoring][18] (CNM)
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "opentelemetry_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Live Container Monitoring][19]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(includes($otel_sdk, ["opentelemetry_sdk", "ddot_sdk"]), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Live Processes][20]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "opentelemetry_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Universal Service Monitoring][21] (USM)
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "opentelemetry_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "opentelemetry_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [App and API Protection][22] (AAP)
-
  {% if or(equals($otel_sdk, "ddot_sdk"), and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector"))) %}{% x/ %}{% /if %}
---
- [Code Security][48]
-
  {% if or(equals($otel_sdk, "ddot_sdk"), and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector"))) %}{% x/ %}{% /if %}
---
- [Continuous Profiler][23]
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
---
- [Data Observability: Jobs Monitoring][24] (DJM)
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Data Streams Monitoring][25] (DSM)
-
  {% if or(equals($otel_sdk, "ddot_sdk"), and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector"))) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "opentelemetry_sdk"), includes($otel_destination, ["upstream_otel_collector", "direct_otlp_ingest", "ddot_collector"])) %}{% tooltip contents="Upstream OpenTelemetry SDKs don't offer DSM." %}N/A{% /tooltip %}{% /if %}
---
- [Dynamic Instrumentation][49]
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Feature Flags][50]
-
  {% if or(equals($otel_sdk, "ddot_sdk"), and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector"))) %}{% x/ %}{% /if %}
  {% if equals($otel_sdk, "opentelemetry_sdk") %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Live Debugger][51]
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Real User Monitoring][26] (RUM)
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if equals($otel_sdk, "ddot_sdk") %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Remotely configured head sampling][52]
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
---
- [Remote Configuration of the Collector][3]
-
  {% if equals($otel_destination, "agents_collector") %}{% tooltip contents="This feature is in Preview." %}Preview{% /tooltip %}{% /if %}
  {% if includes($otel_destination, ["ddot_collector", "upstream_otel_collector"]) %}{% tooltip contents="Not documented yet." %}?{% /tooltip %}{% /if %}
  {% if equals($otel_destination, "direct_otlp_ingest") %}{% tooltip contents="This setup doesn't use a Collector." %}N/A{% /tooltip %}{% /if %}
{% /table %}

<!-- DDOT Collector -->
{% if equals($otel_destination, "ddot_collector") %}
**Note**: Features that need the Datadog Agent, such as [Cloud Network Monitoring][18], [Live Container Monitoring][19], [Live Processes][20], and [Universal Service Monitoring][21], work with the DDOT Collector when you also run the Agent. See [Add the Datadog Agent][27].
{% /if %}

### DDOT SDK setups {% #ddot-sdk-setups %}

DDOT SDKs send traces, metrics, and logs over OTLP to the DDOT Collector or an upstream OpenTelemetry Collector. These signals don't need the Datadog Agent. Because DDOT SDKs use standard OTLP, you can also send their data to other OTLP-compatible backends.

Datadog recommends that you run the Datadog Agent with DDOT SDKs, because some features depend on it:

- [Live Debugger][51], [Dynamic Instrumentation][49], and [remotely configured head sampling][52] need the Agent.
- [App and API Protection][22], [Code Security][48], and [Feature Flags][50] work without the Agent, but need it for Remote Configuration.

Availability varies by language and SDK version. See [DDOT SDKs][1].

## API support

Datadog SDKs support the OpenTelemetry Traces, Metrics, and Logs APIs. Select a language for setup guides and support details.

| Language | Traces API | Metrics API | Logs API |
| :--- | :---: | :---: | :---: |
| [.NET][28] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Python][29] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Node.js][30] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Java][31] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Go][32] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Ruby][33] | {% x/ %} | Alpha | {% x/ %} |
| [PHP][34] | {% x/ %} | {% x/ %} | {% x/ %} |

## More details

### Agent Observability

OpenTelemetry traces that have [generative AI attributes](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) are automatically converted into Agent Observability traces. To disable this conversion, see [Disabling Agent Observability conversion][10].

### Runtime metrics

- **Datadog SDK with the Agent**: Sends [runtime metrics][11] with DogStatsD (UDP port 8125). Turn on DogStatsD in the Agent.
- **DDOT SDKs**: Send [OpenTelemetry runtime metrics][35] over OTLP.
- **Upstream OpenTelemetry SDK setups**: Follow the [OpenTelemetry Runtime Metrics][35] specification and are typically sent using OTLP (port 4317/4318).

### Real User Monitoring (RUM)

To enable full RUM functionality, you need to [inject supported headers][36] to correlate RUM and traces.

### Cloud Network Monitoring (CNM)

Span-level or endpoint-level monitoring is **not** supported.

For more information, see [Cloud Network Monitoring Setup][37].

### Source Code Integration

For unsupported languages in OpenTelemetry setups, [configure telemetry tagging][38] to link data to a specific commit.

## Support levels

Datadog supports OpenTelemetry components at three levels, based on who maintains a component and whether it comes with the DDOT Collector or the Agent's Collector.

| Level | Components | Fixes | Datadog Support |
|---|---|---|---|
| Datadog Supported | Components Datadog owns, such as the [Datadog Exporter][39], [Datadog Connector][39], [Infrastructure Attribute Processor][40], and [Datadog Extension][41], and the DDOT Collector image | Datadog maintains these components and fixes bugs and security issues without waiting for an upstream release. | Troubleshoots them under your support agreement. |
| Community Supported | Upstream OpenTelemetry components [included by default in the DDOT Collector][42] or the Agent's Collector | Datadog tests them in each release and ships security fixes. Fixes to a component's own behavior happen upstream in the OpenTelemetry project, on a best-effort basis. | Helps you configure them. |
| Custom | Components that aren't included by default, such as ones you add to the DDOT Collector or [the Agent's Collector][43], and [instrumentation of unsupported runtimes][44] | Datadog provides documentation as a starting point. | Basic troubleshooting only. For more help, contact the [OpenTelemetry community][45] or the component's maintainers. |

## Platform and environment support

While the OpenTelemetry Collector can be deployed in many environments, certain platforms have specific limitations or support requirements.

* **AWS EKS Fargate**: This environment is **not currently supported** and will result in incorrect infrastructure host billing when used with the upstream OpenTelemetry Collector. Official support is planned for a future release. See the [Collector setup guide][5] for the most up-to-date information.

## Best practices

When using Datadog and OpenTelemetry together, Datadog recommends the following best practices to ensure optimal performance and to avoid potential issues:

- **Avoid mixed instrumentation**: In most cases, you should not use both a Datadog SDK and an upstream OpenTelemetry SDK in the same application, as this leads to undefined behavior.
  - **Exception**: Support for some languages, such as Python, requires both the Datadog SDK and upstream OpenTelemetry SDK packages to be installed.
  - Always follow the specific [language-specific instrumentation documentation][46] to ensure you are using the correct and supported setup.
- **Run the Datadog Agent with the DDOT Collector**: Datadog recommends running the Agent alongside the DDOT Collector, including on the same nodes. To avoid duplicate logs and port conflicts, check the settings in [Add the Datadog Agent][27] before you deploy the Agent.

[1]: /opentelemetry/instrument/ddot_sdks/
[3]: /opentelemetry/setup/agent/#agents-collector
[5]: /opentelemetry/collector_exporter/
[7]: /security/cloud_siem/
[8]: /opentelemetry/correlate/
[9]: /tracing/trace_collection/
[10]: /llm_observability/instrument/otel_instrumentation/
[11]: /tracing/metrics/runtime_metrics/
[12]: /tracing/trace_collection/span_links/
[13]: /tracing/metrics/metrics_namespace/
[14]: /infrastructure/list/
[15]: /containers/monitoring/kubernetes_explorer/
[16]: /integrations/guide/source-code-integration/
[17]: /opentelemetry/correlate/dbm_and_traces/
[18]: /network_monitoring/performance/
[19]: /containers/
[20]: /infrastructure/process/
[21]: /universal_service_monitoring/
[22]: /security/application_security/
[23]: /profiler/
[24]: /data_jobs/
[25]: /data_streams/
[26]: /opentelemetry/correlate/rum_and_traces/?tab=browserrum#opentelemetry-support
[27]: /opentelemetry/setup/ddot_collector/kubernetes/#install-the-core-datadog-agent-alongside-ddot
[28]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=dot_net&platform=traces
[29]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=python&platform=traces
[30]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=node_js&platform=traces
[31]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=java&platform=traces
[32]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=go&platform=traces
[33]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=ruby&platform=traces
[34]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=php&platform=traces
[35]: /opentelemetry/integrations/runtime_metrics/
[36]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[37]: /network_monitoring/cloud_network_monitoring/setup/
[38]: /integrations/guide/source-code-integration/?tab=go#configure-telemetry-tagging
[39]: /opentelemetry/setup/collector_exporter/datadog_exporter/
[40]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[41]: /opentelemetry/integrations/datadog_extension/
[42]: /opentelemetry/setup/ddot_collector/#opentelemetry-collector-components
[43]: /opentelemetry/setup/ddot_collector/custom_components
[44]: /opentelemetry/guide/instrument_unsupported_runtimes
[45]: https://opentelemetry.io/community/
[46]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[47]: /opentelemetry/instrument/
[48]: /security/code_security/
[49]: /tracing/trace_collection/dynamic_instrumentation/
[50]: /feature_flags/
[51]: /tracing/live_debugger/
[52]: /tracing/guide/resource_based_sampling/
