---
title: Using USM Metrics in Monitors, SLOs, and Dashboards

description: Learn how to create monitors, SLOs, and dashboards using your USM metrics.
further_reading:
- link: "https://www.datadoghq.com/blog/universal-service-monitoring-datadog/"
  tag: "Blog"
  text: "Automatically discover, map, and monitor all your services in seconds with Universal Service Monitoring"
- link: "/universal_service_monitoring"
  tag: "Documentation"
  text: "Learn about Universal Service Monitoring"
- link: "/tracing/metrics"
  tag: "Documentation"
  text: "Learn about APM Metrics"
---

## Overview

[Universal Service Monitoring][1] discovers services using popular container tags (such as `app`, `short_image`, and `kube_deployment`) and generates entries in the [Service Catalog][2] for those services. 

You can access request, error, and duration metrics in Datadog for both inbound and outbound traffic on all services discovered with Universal Service Monitoring. These service health metrics are useful for creating alerts, [tracking deployments][3], and getting started with [service level objectives (SLOs)][4] so you can get broad visibility into all services running on your infrastructure. 

{{< img src="universal_service_monitoring/guide/usm_slo.png" alt="Universal Service Monitoring SLOs for BITSBOUTIQUE" style="width:100%;" >}}

This guide describes how to search for USM metrics such as `universal.http.*` and use them in your monitors, SLOs, and dashboards.

## USM metrics vs APM metrics

| Metric Name                 | Units   | Type         | Description                                       |
|-----------------------------|---------|--------------|---------------------------------------------------|
| universal.http.client       | Seconds | Distribution | Outbound request latency, counts, errors, and rates.                |
| universal.http.client.hits  | Hits    | Count        | Total number of outbound requests and errors.                |
| universal.http.client.apdex | Score   | Gauge        | The Apdex score of outbound requests for this service.                |
| universal.http.server       | Seconds | Distribution | Inbound request latency, counts, errors, and rates.  |
| universal.http.server.hits  | Hits    | Count        | Total number of inbound requests and errors.                 |
| universal.http.server.apdex | Score   | Gauge        | The Apdex score for this web service.             |

Unlike APM metrics, errors are available under the `error:true` tag instead of as a separate metric.

**Note:** The `.hits` metrics have all of your infrastructure tags and are the recommended way to query request and error counts. You can also add [second primary tags][5] to all USM metrics.

### Metric syntax

The USM metric query syntax differs from the [APM metric query syntax][6], which uses `trace.*`. USM Metrics fall under a single distribution metric name. 

For example:

| APM                                             | USM                                                  |
|-------------------------------------------------|------------------------------------------------------|
| trace.universal.http.client.hits{*}             | count:universal.http.client{*}                       |
| trace.universal.http.client.errors              | count:universal.http.client{error:true}              |
| trace.universal.http.client.hits.by_http_status | count:universal.http.client{*} by http_status_family |
| pXX:trace.universal.http.client{*}              | pXX:universal.http.client{*}                         |
| trace.universal.http.client.apdex{*}            | universal.http.client.apdex{*}                       |

The same translations apply for the `universal.http.server` operation that captures inbound traffic. For more information about distribution metrics, see [DDSketch-based Metrics in APM][7].

## Usage

Navigate to [**Infrastructure > Universal Service Monitoring**][8], filter by Universal Service Monitoring telemetry type, and click on a service. The **Performance** tab displays service-level graphs on hits, latency, requests, errors, and more. You can also access these metrics when creating a [monitor](#create-a-monitor) or an [SLO](#create-an-slo), or by looking at a [dashboard](#access-a-defined-dashboard) in the [Service Catalog][2].

### Create a monitor

You can create an [**APM Monitor**][9] to trigger an alert when a USM metric such as `universal.http.client` either crosses a threshold or deviates from an expected pattern.

1. Navigate to [**Monitors > New Monitor**][10] and click [**APM**][9].
2. Select **APM Metrics** and define a service or resource's `env` and any other [primary tags][11]. Select a service or resource to monitor and define time interval for the monitor to evaluate the query over. 
3. Select **Threshold Alert** and select a USM metric such as `Requests per Second` for the monitor to trigger on. Then, define if the value should be **above** or **below** the alert and warning thresholds. Enter a value for the alert threshold, and optionally, for the warning threshold.
4. The notification section contains a prepopulated message for the monitor. Customize the alert name and message and define the permissions for this monitor.
5. Click **Create**.

{{< img src="universal_service_monitoring/guide/usm_monitor.png" alt="Universal Service Monitoring Monitor for BITSBOUTIQUE" style="width:100%;" >}}

For more information, see the [APM Monitor documentation][12].

### Create an SLO

You can create an [**SLO**][13] on a per-service basis to ensure you are meeting objectives set by USM metrics and improving availability over time. Datadog recommends [creating an SLO programmatically][14] to cover a lot of services. 

To create an SLO from the Service Catalog:

1. Navigate to the **Reliability** tab of the [Service Catalog][8].
2. Under the **SLOs** column, hover over a service and click **+ Create Availability SLO** or **+ Create Latency SLO**.

{{< img src="universal_service_monitoring/guide/service_catalog_slo_setup.png" alt="Setting up a Universal Service Monitoring SLO for BITSBOUTIQUE" style="width:100%;" >}}

Optionally, to create an SLO manually using USM metrics:
 
1. Navigate to [**Service Management > SLOs**][15] and click [**New SLO**][13].
2. Select **Metric Based** and create two queries in the **Good events (numerator)** section:
   
   * Query A: Enter a USM metric such as `universal.http.server`, filter to a specific service by adding primary `service` and `env` tags in the `from` field, and select `count` in the `as` field. 
   * Query B: Enter a USM metric such as `universal.http.server`, filter to a specific service by adding primary `service` and `env` tags, in addition to an `error:true` tag in the `from` field, and select `count` in the `as` field. 

3. Click **+ Add Formula** and enter `a-b`.
4. In the **Total events (denominator)** section, enter a USM metric such as `universal.http.server`, filter to a specific service by adding primary `service` and `env` tags in the `from` field, and select `count` in the `as` field.
5. Click **+ New Target** to create a target threshold with the following settings:

   * The time window is `7 Days`, the target threshold is `95%`, and the warning threshold is `99.5%`. Datadog recommends setting the same target threshold across all time windows.

6. Enter a name and description for this SLO. Set primary `env` and `service` tags, in addition to the `team` tag.
7. Click **Save and Set Alert**.

{{< img src="universal_service_monitoring/guide/usm_slo_setup.png" alt="Setting up a Universal Service Monitoring SLO for BITSBOUTIQUE" style="width:100%;" >}}

For more information, see the [Service Level Objectives documentation][17].

### Access a defined dashboard

The [Service Catalog][2] identifies dashboards defined in your service definition file and lists them on the **Dashboards** tab. Click **Manage Dashboards** to access and edit the service definition directly in GitHub. 

{{< img src="universal_service_monitoring/guide/manage_dashboards.png" alt="Manage Dashboards button in the Dashboards tab of a service in the Service Catalog" style="width:90%;" >}}

For more information, see the [Dashboards documentation][16].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /universal_service_monitoring
[2]: /tracing/service_catalog
[3]: /tracing/services/deployment_tracking/
[4]: /service_management/service_level_objectives
[5]: /tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[6]: /tracing/metrics/metrics_namespace
[7]: /tracing/guide/ddsketch_trace_metrics/
[8]: https://app.datadoghq.com/services
[9]: https://app.datadoghq.com/monitors/create/apm
[10]: https://app.datadoghq.com/monitors/create
[11]: /metrics/advanced-filtering/
[12]: /monitors/create/types/apm
[13]: https://app.datadoghq.com/slo/new
[14]: /api/latest/service-level-objectives/
[15]: https://app.datadoghq.com/slo/manage
[16]: /dashboards
[17]: /service_management/service_level_objectives/
