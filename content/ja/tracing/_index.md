---
algolia:
  tags:
  - apm
  - application performance monitoring
  - distributed tracing
aliases:
- /ja/tracing/faq/terminology
- /ja/tracing/guide/terminology
- /ja/tracing/guide/distributed_tracing/
- /ja/tracing/advanced/
- /ja/tracing/api
- /ja/tracing/faq/distributed-tracing/
cascade:
  algolia:
    rank: 70
description: Instrument your code to improve performance
further_reading:
- link: https://app.datadoghq.com/release-notes?category=APM
  tag: Release Notes
  text: Check out the latest Datadog APM releases! (App login required)
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: Blog
  text: Generate span-based metrics to track historical trends in application performance
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gain visibility into risks, vulnerabilities, and attacks with APM Security
    View
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Monitor your Linux web apps on Azure App Service with Datadog
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: Blog
  text: Manage API performance, security, and ownership with Datadog API Catalog
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Join an interactive session to boost your APM understanding
kind: documentation
title: APM
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>

## Overview

Datadog Application Performance Monitoring (APM) provides deep visibility into your applications, enabling you to identify performance bottlenecks, troubleshoot issues, and optimize your services. With distributed tracing, out-of-the-box dashboards, and seamless correlation with other telemetry data, Datadog APM helps ensure the best possible performance and user experience for your applications.

For an introduction to terminology used in Datadog APM, see [APM Terms and Concepts][1].

## Getting started

The simplest way to start with Datadog APM is with Single Step Instrumentation. This approach installs the Datadog Agent and instruments your application in one step, with no additional configuration steps required. To learn more, read [Single Step Instrumentation][27].

For setups that require more customization, Datadog supports custom instrumentation with Datadog tracing libraries. To learn more, read [Application Instrumentation][2].

## Use cases

Discover some ways Datadog APM can help support your use cases:

| You want to...| How Datadog APM can help |
| ----------- | ----------- |
| Understand how requests flow through your system. | Use the [Trace Explorer][21] to query and visualize end-to-end traces across distributed services. |
| Monitor service health and performance of individual services. | Use the [service][26] and [resource pages][28] to assess service health by analyzing performance metrics, tracking deployments, and identifying problematic resources. |
| Correlate traces with DBM, RUM, logs, synthetics, and profiles. | [Correlate APM Data with Other Telemetry][20] to give context to your data for more comprehensive analysis. |
| Control how data flows into Datadog. | Use [Ingestion Controls][6] to adjust ingestion configuration and sampling rates by service and resource. Use [Retention filters][7] to choose which spans to retain for 15 days. |

### Trace Explorer

The [Trace Explorer][21] allows you search and analyze your traces in real-time. Identify performance bottlenecks, troubleshoot errors, and pivot to related logs and metrics to understand the full context around any issue.

{{< img src="/tracing/trace_explorer/trace_explorer.png" alt="Trace explorer view." style="width:100%;" >}}

### Service page

The [service page][26] helps you monitor service performance and [compare between versions during deployments][15].

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions on the Service Page" style="width:100%;">}}

### Correlating traces with other telemetry

Datadog APM integrates seamlessly with logs, real user monitoring (RUM), synthetic monitoring, and more:

- [View your application logs side-by-side with traces][9] to find logs for specific requests, services, or versions.
- [Associate RUM sessions with backend traces][10] to understand how backend performance affects user experience.
- [Associate synthetic tests with traces][11] to troubleshoot failures across frontend and backend requests.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Connect Logs And Traces" style="width:100%;">}}

### Ingestion controls and retention filters

Traces start in your instrumented applications and flow into Datadog.

Datadog APM provides tools to manage the volume and retention of your trace data. Use [Ingestion Controls][6] to adjust sampling rates and [retention filters][7] to control which spans are are stored.

{{< img src="/tracing/apm_lifecycle/apm_lifecycle_0.png" alt="Flow of data through Datadog APM." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/
[2]: /ja/tracing/trace_collection/
[3]: /ja/tracing/trace_collection/proxy_setup/
[4]: /ja/serverless/distributed_tracing
[5]: /ja/tracing/trace_collection/otel_instrumentation/
[6]: /ja/tracing/trace_pipeline/ingestion_controls/
[7]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[8]: /ja/tracing/trace_pipeline/generate_metrics/
[9]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[10]: /ja/real_user_monitoring/platform/connect_rum_and_traces
[11]: /ja/synthetics/apm/
[12]: /ja/tracing/trace_explorer/#live-search-for-15-minutes
[13]: /ja/tracing/services/services_map/
[14]: /ja/tracing/services/service_page/
[15]: /ja/tracing/services/deployment_tracking/
[16]: /ja/profiler/
[17]: /ja/tracing/trace_collection/automatic_instrumentation/
[18]: /ja/tracing/trace_collection/custom_instrumentation/
[19]: /ja/tracing/metrics/
[20]: /ja/tracing/other_telemetry/
[21]: /ja/tracing/trace_explorer/
[22]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[23]: /ja/agent/
[24]: /ja/tracing/metrics/metrics_namespace/
[25]: /ja/tracing/metrics/runtime_metrics/
[26]: /ja/tracing/services/service_page/
[27]: /ja/tracing/trace_collection/single-step-apm/
[28]: /ja/tracing/services/resource_page/