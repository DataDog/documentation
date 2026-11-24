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

Use this page to check which Datadog products and features each OpenTelemetry (OTel) setup supports. For setup guidance, see [Instrument Your Applications][47].

## Feature compatibility

*To view another setup, change the **SDK** and **Destination** menus at the top of the page.*

<!-- Selected setup summary. Keep one block per valid SDK and destination pair. -->
{% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}

### DDOT SDK + DDOT Collector

[DDOT SDKs][1] export OTLP telemetry through the [DDOT Collector][54] to Datadog. Run the Datadog Agent alongside the Collector to enable features marked **With Agent**. See [Add the Datadog Agent][27].

{% /if %}
{% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}

### DDOT SDK + Upstream OpenTelemetry Collector

[DDOT SDKs][1] export OTLP telemetry through the [upstream OpenTelemetry Collector][55] to Datadog. Run the Datadog Agent alongside the Collector to enable features marked **With Agent**.

{% /if %}
{% if and(equals($otel_sdk, "upstream_otel_sdk"), equals($otel_destination, "ddot_collector")) %}

### Upstream OpenTelemetry SDK + DDOT Collector

[Upstream OpenTelemetry SDKs][57] export OTLP telemetry through the [DDOT Collector][54] to Datadog. Run the Datadog Agent alongside the Collector to enable features marked **With Agent**. See [Add the Datadog Agent][27].

{% /if %}
{% if and(equals($otel_sdk, "upstream_otel_sdk"), equals($otel_destination, "upstream_otel_collector")) %}

### Upstream OpenTelemetry SDK + Upstream OpenTelemetry Collector

[Upstream OpenTelemetry SDKs][57] export OTLP telemetry through the [upstream OpenTelemetry Collector][55] to Datadog.

{% /if %}
{% if and(equals($otel_sdk, "upstream_otel_sdk"), equals($otel_destination, "agents_collector")) %}

### Upstream OpenTelemetry SDK + Agent's Collector

[Upstream OpenTelemetry SDKs][57] export OTLP telemetry to the [Agent's Collector][3], which runs alongside the Datadog Agent.

{% /if %}
{% if and(equals($otel_sdk, "upstream_otel_sdk"), equals($otel_destination, "direct_otlp_ingest")) %}

### Upstream OpenTelemetry SDK + Direct OTLP Ingest

[Upstream OpenTelemetry SDKs][57] export OTLP telemetry directly to the [Datadog OTLP intake endpoint][56], without a Collector or the Datadog Agent.

{% /if %}
{% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}

### Datadog SDK + Agent's Collector

[Datadog SDKs][9] support both Datadog and [OpenTelemetry APIs][58] and send telemetry to the Datadog Agent. The [Agent's Collector][3] runs alongside the Datadog Agent for OpenTelemetry Collector pipelines.

{% /if %}

{% if or(equals($otel_sdk, "ddot_sdk"), and(equals($otel_sdk, "upstream_otel_sdk"), equals($otel_destination, "ddot_collector"))) %}
{% alert level="info" %}
This setup is in Preview.
{% /alert %}
{% /if %}

<!--
How to edit this table

Each row has one cell per support state. A setup that matches no condition in
the cell shows a blank cell, which means not supported or not applicable. Each
setup must match at most one condition in a row.

- Check mark: the `if` that wraps the `x` tag. List the SDKs and destinations
  that support the feature. The destination menu only offers valid pairs, so
  you can list SDKs and destinations separately.
- Short labels, such as Sampled, Preview, or With Agent: their own
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
  {% if or(and(includes($otel_sdk, ["datadog_sdk", "upstream_otel_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])), and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector"))) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the upstream OpenTelemetry Collector." %}With Agent{% /tooltip %}{% /if %}
---
- [Correlated Traces, Metrics, Logs][8]
-
  {% if or(and(includes($otel_sdk, ["datadog_sdk", "upstream_otel_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])), and(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "upstream_otel_collector"]))) %}{% x/ %}{% /if %}
---
- [Distributed Tracing][9]
-
  {% if and(includes($otel_sdk, ["ddot_sdk", "datadog_sdk", "upstream_otel_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])) %}{% x/ %}{% /if %}
---
- [Agent Observability][10]
-
  {% if and(includes($otel_sdk, ["ddot_sdk", "datadog_sdk", "upstream_otel_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])) %}{% x/ %}{% /if %}
---
- [Runtime Metrics][11]
-
  {% if and(includes($otel_sdk, ["ddot_sdk", "datadog_sdk", "upstream_otel_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])) %}{% x/ %}{% /if %}
---
- [Span Links][12]
-
  {% if or(and(includes($otel_sdk, ["datadog_sdk", "upstream_otel_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector", "direct_otlp_ingest"])), and(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "upstream_otel_collector"]))) %}{% x/ %}{% /if %}
---
- [Trace Metrics][13]
-
  {% if or(and(includes($otel_sdk, ["datadog_sdk", "upstream_otel_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector"])), and(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "upstream_otel_collector"]))) %}{% x/ %}{% /if %}
  {% if equals($otel_destination, "direct_otlp_ingest") %}{% x/ %} ({% tooltip contents="Calculated from spans that reach Datadog; reflects any OTel-side sampling you configure." %}Sampled{% /tooltip %}){% /if %}
---
- [Infrastructure Host List][14]
-
  {% if or(and(includes($otel_sdk, ["datadog_sdk", "upstream_otel_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector"])), and(equals($otel_sdk, "ddot_sdk"), includes($otel_destination, ["ddot_collector", "upstream_otel_collector"]))) %}{% x/ %}{% /if %}
---
- [Kubernetes Monitoring][15]
-
  {% if or(and(includes($otel_sdk, ["datadog_sdk", "upstream_otel_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector"])), and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector"))) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the upstream OpenTelemetry Collector." %}With Agent{% /tooltip %}{% /if %}
---
- [Source Code Integration][16]
-
  {% if or(and(includes($otel_sdk, ["datadog_sdk", "upstream_otel_sdk"]), includes($otel_destination, ["ddot_collector", "agents_collector", "upstream_otel_collector"])), and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector"))) %}{% x/ %}{% /if %}
---
- [Database Monitoring][17] (DBM)
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "upstream_otel_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %} ({% tooltip contents="Doesn't include SQL query-level monitoring, which needs a DDOT SDK." %}Partial{% /tooltip %}){% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Needs the Datadog Agent to monitor your databases. The Datadog Agent can run on your database hosts instead of your application hosts." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Needs the Datadog Agent to monitor your databases. The Datadog Agent can run on your database hosts instead of your application hosts." %}With Agent{% /tooltip %}{% /if %}
---
- [Cloud Network Monitoring][18] (CNM)
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "upstream_otel_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(includes($otel_sdk, ["upstream_otel_sdk", "ddot_sdk"]), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the upstream OpenTelemetry Collector." %}With Agent{% /tooltip %}{% /if %}
---
- [Live Container Monitoring][19]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "upstream_otel_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(includes($otel_sdk, ["upstream_otel_sdk", "ddot_sdk"]), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the upstream OpenTelemetry Collector." %}With Agent{% /tooltip %}{% /if %}
---
- [Live Processes][20]
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "upstream_otel_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(includes($otel_sdk, ["upstream_otel_sdk", "ddot_sdk"]), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the upstream OpenTelemetry Collector." %}With Agent{% /tooltip %}{% /if %}
---
- [Universal Service Monitoring][21] (USM)
-
  {% if and(includes($otel_sdk, ["datadog_sdk", "upstream_otel_sdk"]), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(includes($otel_sdk, ["upstream_otel_sdk", "ddot_sdk"]), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the upstream OpenTelemetry Collector." %}With Agent{% /tooltip %}{% /if %}
---
- [App and API Protection][22] (AAP)
-
  {% if or(and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")), and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector"))) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the upstream OpenTelemetry Collector." %}With Agent{% /tooltip %}{% /if %}
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
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the upstream OpenTelemetry Collector." %}With Agent{% /tooltip %}{% /if %}
---
- [Data Streams Monitoring][25] (DSM)
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Needs the Datadog Agent to monitor your message brokers. The Datadog Agent can run on your broker hosts instead of your application hosts." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Needs the Datadog Agent to monitor your message brokers. The Datadog Agent can run on your broker hosts instead of your application hosts." %}With Agent{% /tooltip %}{% /if %}
---
- [Dynamic Instrumentation][49]
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the upstream OpenTelemetry Collector." %}With Agent{% /tooltip %}{% /if %}
---
- [Feature Flags][50]
-
  {% if or(and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")), and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector"))) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the upstream OpenTelemetry Collector." %}With Agent{% /tooltip %}{% /if %}
---
- [Live Debugger][51]
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the upstream OpenTelemetry Collector." %}With Agent{% /tooltip %}{% /if %}
---
- [Real User Monitoring][26] (RUM)
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
---
- [Remotely configured head sampling][52]
-
  {% if and(equals($otel_sdk, "datadog_sdk"), equals($otel_destination, "agents_collector")) %}{% x/ %}{% /if %}
  {% if and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "ddot_collector")) %}{% tooltip contents="Works when you also run the Datadog Agent alongside the DDOT Collector." %}With Agent{% /tooltip %}{% /if %}
---
- [Remote Configuration of the Collector][3]
-
  {% if equals($otel_destination, "agents_collector") %}{% tooltip contents="This feature is in Preview." %}Preview{% /tooltip %}{% /if %}
{% /table %}

<!-- Shown only for DDOT SDKs. -->
{% if equals($otel_sdk, "ddot_sdk") %}
## DDOT SDK setups {% #ddot-sdk-setups %}

DDOT SDKs export traces, metrics, and logs over standard OTLP. These signals don't need the Datadog Agent, and you can also send them to other OTLP-compatible backends. Availability varies by language and SDK version. See [DDOT SDKs][1].

Datadog recommends that you run the Datadog Agent with DDOT SDKs. Features marked **With Agent** need it:

- **Remote Configuration**: For [Dynamic Instrumentation][49], [Live Debugger][51], and [remotely configured head sampling][52], the Datadog Agent proxies Remote Configuration. With an upstream OpenTelemetry Collector, [App and API Protection][22] and [Feature Flags][50] also need it. The Datadog Agent doesn't change how your OTLP telemetry flows.
- **Host data**: For [Cloud Network Monitoring][18], [Live Container Monitoring][19], [Live Processes][20], and [Universal Service Monitoring][21], the Datadog Agent collects data from the host.
- **Database and broker monitoring**: For [Database Monitoring][17] and [Data Streams Monitoring][25], DDOT SDKs instrument your application while the Datadog Agent monitors the database or message broker. You can run the Datadog Agent on those hosts instead of alongside your applications.
{% /if %}

## API support

DDOT SDKs (Java, .NET, Node.js, Python, and Go) support the OpenTelemetry Traces, Metrics, and Logs APIs. The Datadog SDKs for Ruby and PHP also support these APIs, but they don't export traces over OTLP, so they aren't DDOT SDKs. The Datadog SDK for Rust also supports these APIs. Select a language for setup guides and support details.

| Language | Traces API | Metrics API | Logs API |
| :--- | :---: | :---: | :---: |
| [.NET][28] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Python][29] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Node.js][30] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Java][31] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Go][32] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Ruby][33] | {% x/ %} | Alpha | {% x/ %} |
| [PHP][34] | {% x/ %} | {% x/ %} | {% x/ %} |
| [Rust][59] | {% x/ %} | {% x/ %} | {% x/ %} |

## Feature notes

- **Agent Observability**: Datadog automatically converts OpenTelemetry traces with [generative AI attributes](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) into Agent Observability traces. To disable this conversion, see [OpenTelemetry Instrumentation for Agent Observability][10].
{% if or(includes($otel_destination, ["agents_collector", "ddot_collector"]), and(equals($otel_sdk, "ddot_sdk"), equals($otel_destination, "upstream_otel_collector"))) %}
- **Cloud Network Monitoring (CNM)**: Datadog does **not** support span-level or endpoint-level monitoring. For setup details, see [Cloud Network Monitoring Setup][37].
{% /if %}
- **Real User Monitoring (RUM)**: To enable full RUM functionality, [inject supported headers][36] to correlate RUM and traces.
{% if equals($otel_sdk, "datadog_sdk") %}
- **Runtime metrics**: Datadog SDKs send [runtime metrics][11] with DogStatsD (UDP port 8125). Turn on DogStatsD in the Datadog Agent.
{% /if %}
{% if equals($otel_sdk, "ddot_sdk") %}
- **Runtime metrics**: Supported languages and versions send [runtime metrics][11] over OTLP. See [Export runtime metrics over OTLP][53]. Python sends runtime metrics with DogStatsD (UDP port 8125), so turn on DogStatsD in the Datadog Agent.
{% /if %}
{% if equals($otel_sdk, "upstream_otel_sdk") %}
- **Runtime metrics**: Upstream OpenTelemetry SDKs follow the [OpenTelemetry Runtime Metrics][35] specification and typically send [runtime metrics][11] over OTLP (ports 4317/4318).
{% /if %}
{% if not(equals($otel_destination, "direct_otlp_ingest")) %}
- **Source Code Integration**: For unsupported languages in OpenTelemetry setups, [configure telemetry tagging][38] to link data to a specific commit.
{% /if %}

## Support levels

### SDKs

- **Datadog SDKs**: Datadog maintains and supports Datadog SDKs.
- **DDOT SDKs**: Datadog maintains and supports DDOT SDKs. During Preview, support is best-effort.
- **Upstream OpenTelemetry SDKs**: The OpenTelemetry community maintains and supports upstream OpenTelemetry SDKs. Datadog supports the traces, metrics, and logs they send.
- **Unsupported runtimes**: For [instrumentation of unsupported runtimes][44], Datadog provides documentation as a starting point and basic troubleshooting only. For more help, contact the [OpenTelemetry community][45] or the instrumentation maintainers.

### Collector components

The OpenTelemetry community maintains and supports the upstream OpenTelemetry Collector. Datadog supports the traces, metrics, and logs it sends. The Datadog Exporter and Datadog Connector are community supported when they run in the upstream OpenTelemetry Collector.

For the DDOT Collector and the Agent's Collector, support depends on who maintains a component and whether it ships with the Collector:

| Level | Components | Fixes | Datadog Support |
|---|---|---|---|
| **Datadog Supported** | The DDOT Collector image and Datadog-owned components, such as the [Datadog Exporter][39], [Datadog Connector][39], [Infrastructure Attribute Processor][40], and [Datadog Extension][41]. | Datadog maintains these components and fixes bugs and security issues without waiting for an upstream release. | Troubleshoots them under your support agreement. |
| **Community Supported** | Upstream OpenTelemetry components [included by default in the DDOT Collector][42] or the Agent's Collector. | Datadog tests them in each release and ships security fixes. The OpenTelemetry community handles behavior fixes upstream on a best-effort basis. | Helps you configure them. |
| **Custom** | Components not included by default, such as ones you add to the DDOT Collector or [the Agent's Collector][43]. | Limited. Datadog provides setup documentation as a starting point. | Provides basic troubleshooting only. For more help, contact the [OpenTelemetry community][45] or the component maintainers. |

<!-- Only the upstream OpenTelemetry Collector has platform limits to list. Remove the condition if you add one for another destination. -->
{% if equals($otel_destination, "upstream_otel_collector") %}

## Platform and environment support

Datadog doesn't support the upstream OpenTelemetry Collector on **AWS EKS Fargate**. Running it there causes incorrect infrastructure host billing. For supported environments, see [Set Up the OpenTelemetry Collector][55].

{% /if %}

## Best practices

Follow these practices when using Datadog with OpenTelemetry:

- **Avoid mixed instrumentation**: Run one SDK per application process. Don't activate a DDOT SDK and an upstream OpenTelemetry SDK in the same process. Follow the [language-specific instrumentation documentation][46] for required SDK components and dependencies.
- **Run the Datadog Agent with the DDOT Collector**: Datadog recommends that you run the Datadog Agent alongside the DDOT Collector, including on the same nodes. To avoid duplicate logs and port conflicts, check the settings in [Add the Datadog Agent][27] before you deploy the Datadog Agent.

[1]: /opentelemetry/instrument/ddot_sdks/
[3]: /opentelemetry/setup/agent/#agents-collector
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
[53]: /tracing/metrics/runtime_metrics/#export-runtime-metrics-over-otlp
[54]: /opentelemetry/setup/ddot_collector/
[55]: /opentelemetry/setup/collector_exporter/
[56]: /opentelemetry/setup/otlp_ingest/
[57]: /opentelemetry/instrument/upstream_otel_sdks/
[58]: /opentelemetry/instrument/ddot_sdks/api_support/
[59]: /opentelemetry/instrument/ddot_sdks/api_support/?prog_lang=rust&platform=traces
