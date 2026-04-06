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
cascade:
    algolia:
        rank: 70
---

## Overview

<!-- TODO: Write overview. Key points:
- APM Basic provides RED metrics (requests, errors, duration) for services that are not
  instrumented with tracing libraries.
- It uses eBPF in the Datadog Agent to detect HTTP traffic at the kernel level.
- No code changes or library installation required.
- APM Basic automatically covers hosts where Single Step Instrumentation (SSI) is not
  applicable, providing baseline service visibility across your entire infrastructure.
- Frame as a complement to full APM, not a competing entry point.
-->

APM Basic provides visibility into your service health metrics _without requiring code instrumentation_. It uses eBPF (extended Berkeley Packet Filter) in the Datadog Agent to automatically discover services and collect request, error, and duration (RED) metrics from network traffic.

APM Basic is designed for services that are not yet instrumented with tracing libraries. On hosts where [Single Step Instrumentation][1] is not applicable, APM Basic provides automatic baseline monitoring. Services monitored by APM Basic appear in the [Software Catalog][2] and [Service Map][3] alongside your fully instrumented services.

<div class="alert alert-info">For billing information about APM Basic, see <a href="/account_management/billing/apm_tracing_profiler/">APM Billing</a>.</div>

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

<!-- TODO: Confirm whether universal.http.* metric names are changing with this launch
or later. The config key service_monitoring_config is also staying as-is for now. -->

<div class="alert alert-info">APM Basic uses the <code>service_monitoring_config</code> Agent configuration and reports metrics under the <code>universal.http.*</code> namespace. These names reflect the underlying technology and are unchanged from the former Universal Service Monitoring feature.</div>

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

When APM Basic is enabled, the Datadog Agent's `system-probe` component loads eBPF programs into the Linux kernel. These programs:

1. Hook into network-related system calls to observe inbound and outbound traffic.
2. Parse traffic at the application layer (Layer 7), extracting HTTP request and response metadata.
3. Aggregate the data into service health metrics and report them to Datadog.

Because eBPF operates at the kernel level, it works regardless of the programming language or framework your services use.

**Note**: On Windows, APM Basic uses Event Tracing for Windows (ETW) through the `Microsoft-Windows-HttpService` provider instead of eBPF. This provider is only available for IIS-based services.

## APM Basic and full APM

<!-- TODO: Confirm feature comparison with PM. This table should match what's on the
pricing page once that's updated. -->

APM Basic provides baseline service monitoring. For distributed tracing and deeper
application-level insights, instrument your services with [Datadog tracing libraries][5] or
[Single Step Instrumentation][1].

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

After you configure the Agent, wait about five minutes for your services to appear in the [Software Catalog][2]. Click a service to see the service details page. An operation name of `universal.http.server` or `universal.http.client` in the upper left indicates that the service telemetry comes from APM Basic.

The `universal.http.server` operation name captures health metrics for inbound traffic to your service. The corresponding `universal.http.client` operation name represents outbound traffic to other destinations.

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
