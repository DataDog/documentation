---
title: APM Basic
description: "Monitor service health metrics across your infrastructure without code instrumentation using APM Basic and the Datadog Agent."
aliases:
- /universal_service_monitoring/
- /tracing/universal_service_monitoring/
further_reading:
- link: "/tracing/apm_basic/setup/"
  tag: "Documentation"
  text: "Setting up APM Basic"
- link: "https://www.datadoghq.com/blog/universal-service-monitoring-datadog/"
  tag: "Blog"
  text: "Golden signals in seconds with Universal Service Monitoring"
- link: "/getting_started/tagging/unified_service_tagging/"
  tag: "Documentation"
  text: "Unified Service Tagging"
- link: "/tracing/software_catalog/"
  tag: "Documentation"
  text: "Discover and catalog the services reporting to Datadog"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/services/services_map/"
  tag: "Documentation"
  text: "Read about the Service Map"
- link: "https://www.datadoghq.com/blog/monitor-connection-churn-datadog/"
  tag: "Blog"
  text: "Best practices for monitoring and remediating connection churn"
cascade:
    algolia:
        rank: 70
---

## Overview

APM Basic provides visibility into your service health metrics _without requiring code instrumentation_. It relies solely on the presence of a configured Datadog Agent and [Unified Service Tagging][6] to automatically discover services and collect request, error, and duration (RED) metrics from network traffic.

APM Basic is designed for services that are not yet instrumented with tracing libraries. On hosts where [Single Step Instrumentation][1] is not applicable, APM Basic provides automatic baseline monitoring. Services monitored by APM Basic appear in the [Software Catalog][2] and [Service Map][3] alongside your fully instrumented services, and work with [Deployment Tracking][7], Monitors, Dashboards, and SLOs.

<div class="alert alert-info">Hosts monitored with APM Basic are billed at the APM Basic host rate. After you add instrumentation to a service, that host automatically moves to the standard APM tier. For details, see <a href="/account_management/billing/apm_tracing_profiler/">APM Billing</a>.</div>

## What APM Basic monitors

APM Basic collects RED metrics for every discovered service:

| Metric | Description |
|--------|-------------|
| Request count | Total number of inbound and outbound HTTP requests |
| Error rate | Percentage of requests that returned error status codes |
| Latency (duration) | Response time distribution for requests |

These metrics are reported under two operation names:

- `universal.http.server`: health metrics for inbound traffic to your service
- `universal.http.client`: health metrics for outbound traffic from your service

An operation name of `universal.http.server` or `universal.http.client` on a service page indicates that the service telemetry comes from APM Basic.

<div class="alert alert-info">APM Basic uses the <code>service_monitoring_config</code> Agent configuration and reports metrics under the <code>universal.http.*</code> namespace. These names are unchanged from the former Universal Service Monitoring feature.</div>

### Supported protocols

| Protocol | Status |
|----------|--------|
| HTTP/1.1 | Generally available |
| HTTP/2 | Generally available |
| gRPC | Generally available |
| HTTPS/TLS (Linux) | Generally available |
| HTTPS/TLS (Windows, IIS only) | Generally available |
| HTTPS/TLS (Windows, non-IIS) | Not supported |
| Additional protocols | [Preview][4] |

## How it works

When APM Basic is enabled, the Datadog Agent's `system-probe` component uses eBPF to observe network traffic at the kernel level. It parses HTTP request and response metadata from this traffic and aggregates the data into service health metrics. Because this operates at the kernel level, it works regardless of the programming language or framework your services use.

**Note**: On Windows, APM Basic uses Event Tracing for Windows (ETW) through the `Microsoft-Windows-HttpService` provider instead of eBPF. This provider is only available for IIS-based services. Non-IIS services on Windows support HTTP monitoring only, not HTTPS.

## APM Basic and full APM

APM Basic provides baseline service monitoring. For distributed tracing and deeper application-level insights, instrument your services with [Datadog tracing libraries][5] or [Single Step Instrumentation][1].

| Capability | APM Basic | APM |
|------------|-----------|-----|
| RED metrics (requests, errors, duration) | {{< X >}} | {{< X >}} |
| Service List and Service Pages | {{< X >}} | {{< X >}} |
| Service Map | {{< X >}} | {{< X >}} |
| No code instrumentation required | {{< X >}} | |
| Distributed traces | | {{< X >}} |
| Trace search and analytics | | {{< X >}} |
| Flame graphs and span-level detail | | {{< X >}} |

## Automatic service tagging

APM Basic automatically discovers services running in your infrastructure. If it does not find [unified service tags][6], it assigns them a name based on one of the following tags: `app`, `short_image`, `kube_container_name`, `container_name`, `kube_deployment`, `kube_service`.

To update a service's name, set up [Unified Service Tagging][6].

## Exploring your services

After you configure the Agent, wait about five minutes for your services to appear in the [Software Catalog][2]. Click a service to see the service details page.

After enabling APM Basic, you can:

- Navigate to **APM** > **Software Catalog** or **APM** > **Service Map** to [visualize your services and their dependencies][2].
- Click into specific Service pages to see golden signal metrics (requests, errors, and duration), and correlate these against recent code changes with [Deployment Tracking][7].
- Create [monitors][8], [dashboards][9], and [SLOs][10] using the `universal.http.*` metrics.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/single-step-apm/
[2]: /tracing/software_catalog/
[3]: /tracing/services/services_map/
[4]: /tracing/apm_basic/setup/#additional-configuration
[5]: /tracing/trace_collection/
[6]: /getting_started/tagging/unified_service_tagging
[7]: /tracing/services/deployment_tracking/
[8]: /monitors/types/apm/?tab=apmmetrics
[9]: /dashboards/
[10]: /service_level_objectives/metric/
