---
title: APM
kind: documentation
description: Instrument your code to improve performance
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=APM"
    tag: "Release Notes"
    text: "Check out the latest Datadog APM releases! (App login required)"
  - link: "/profiler/"
    tag: "Documentation"
    text: "Profile your production code"
  - link: "/profiler/"
    tag: "Documentation"
    text: "Monitor databases across hosts"
  - link: "/universal_service_monitoring/"
    tag: "Documentation"
    text: "See service health metrics without instrumenting any code"
  - link: "/logs/"
    tag: "Documentation"
    text: "Collect, process, explore, and monitor logs"
  - link: "/metrics/"
    tag: "Documentation"
    text: "Submit and query metrics about your environment"
  - link: "https://www.datadoghq.com/blog/span-based-metrics/"
    tag: "Blog"
    text: "Generate span-based metrics to track historical trends in application performance"
  - link: "https://www.datadoghq.com/blog/apm-security-view/"
    tag: "Blog"
    text: "Gain visibility into risks, vulnerabilities, and attacks with APM Security View"
  - link: "https://www.datadoghq.com/blog/monitor-azure-app-service-linux/"
    tag: "Blog"
    text: "Monitor your Linux web apps on Azure App Service with Datadog"
  - link: "https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/"
    tag: "Blog"
    text: "Manage API performance, security, and ownership with Datadog API Catalog"
  - link: "https://dtdg.co/fe"
    tag: "Foundation Enablement"
    text: "Join an interactive session to boost your APM understanding"  

aliases:
  - /tracing/faq/terminology
  - /tracing/guide/terminology
  - /tracing/guide/distributed_tracing/
  - /tracing/advanced/
  - /tracing/api
  - /tracing/faq/distributed-tracing/
algolia:
  tags: ['apm', 'application performance monitoring', 'distributed tracing']
cascade:
    algolia:
        rank: 70
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>

## Overview

Datadog Application Performance Monitoring (APM) provides deep visibility into your applications, enabling you to identify performance bottlenecks, troubleshoot issues, and optimize your services. With distributed tracing, out-of-the-box dashboards, and seamless correlation with other telemetry data, Datadog APM helps ensure the best possible performance and user experience for your applications.

For an introduction to terminology used in Datadog APM, see [APM Terms and Concepts][1].

## Getting started

To get started, you need to:

1. [Install the Datadog Agent][23].
2. [Instrument your application][2].
3. [Explore your application's observability data in Datadog][21].

<div class="alert alert-info"><strong>Simplify your setup!</strong> Install the Agent and instrument your application in one step with <a href="https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/">Single Step Instrumentation</a>.</div>

## Use cases

| You want to...| How Datadog APM can help |
| ----------- | ----------- |
| Control data flowing into Datadog. | Use [Ingestion Controls][6] to access service-level ingestion configuration and adjust trace sampling rates. |
| Generate metrics like request counts, error counts, and latency measures. | Instrument your application to generate [trace metrics][24] or [runtime metrics][25]. |
| Correlate traces with DBM, RUM, logs, synthetics, and profiles. | [Correlate APM Data with Other Telemetry][20] to give more context to your data and analysis. |
| Explore application performance in Datadog. | Use the [Trace Explorer][21] to explore performance for live and indexed traces. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/
[2]: /tracing/trace_collection/
[3]: /tracing/trace_collection/proxy_setup/
[4]: /serverless/distributed_tracing
[5]: /tracing/trace_collection/otel_instrumentation/
[6]: /tracing/trace_pipeline/ingestion_controls/
[7]: /tracing/trace_pipeline/trace_retention/#retention-filters
[8]: /tracing/trace_pipeline/generate_metrics/
[9]: /tracing/other_telemetry/connect_logs_and_traces/
[10]: /real_user_monitoring/connect_rum_and_traces
[11]: /synthetics/apm/
[12]: /tracing/trace_explorer/#live-search-for-15-minutes
[13]: /tracing/services/services_map/
[14]: /tracing/services/service_page/
[15]: /tracing/services/deployment_tracking/
[16]: /profiler/
[17]: /tracing/trace_collection/automatic_instrumentation/
[18]: /tracing/trace_collection/custom_instrumentation/
[19]: /tracing/metrics/
[20]: /tracing/other_telemetry/
[21]: /tracing/trace_explorer/
[22]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
[23]: /agent/
[24]: /tracing/metrics/metrics_namespace/
[25]: /tracing/metrics/runtime_metrics/
