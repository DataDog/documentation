---
title: APM Monitor
description: "Compare an APM metric to a user defined threshold"
aliases:
  - /monitors/monitor_types/app_analytics
  - /monitors/monitor_types/trace_search
  - /tracing/guide/resource_monitor/
  - /monitors/monitor_types/apm
  - /monitors/create/types/apm/
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/status/"
  tag: "Documentation"
  text: "Check your monitor status"
- link: "https://learn.datadoghq.com/courses/apm-monitors-and-alerting"
  tag: "Learning Center"
  text: "APM Monitors and Alerting"

---

## Overview

APM metric monitors work like regular [metric monitors][1], but with controls tailored specifically to APM. Use these monitors to receive alerts at the service level on hits, errors, and a variety of latency measures.

Analytics monitors allow you to visualize APM data over time and set up alerts based on Indexed Spans. For example, use an Analytics monitor to receive alerts on a spike in slow requests.

### Automatic APM monitors

Automatic Monitors for APM are available to new organizations and activate as soon as the Datadog Agent is installed and spans begin flowing into Datadog. This provides immediate alerting coverage on your key services with minimal configuration, and helps you to maintain coverage without gaps.

Monitors are automatically created for service entry points, which are identified by operations tagged with <code>[span.kind][6]:server</code> or `span.kind:consumer` and represent where requests enter your service. 

Automatic monitors for APM include:

#### Error rate threshold monitors

Error rate threshold monitors are created per service entry point using APM trace metrics. These alert you when error behavior spikes and help ensure your most critical endpoints are covered by default. The default error rate is 10%, but can be configured for your environment. 

#### Watchdog anomaly monitors

Watchdog anomaly monitors automatically detect unusual patterns in latency, errors, and request volume (hits) for all services without requiring you to manually configure thresholds.


**Note**: Automatic monitor creation is only available during a trial.

You can view and manage all automatically created monitors on the [Monitors page][7], where they can be edited, cloned, or disabled.


## Monitor creation

To create an [APM monitor][2] in Datadog, use the main navigation: {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}APM{{< /ui >}}.

Choose between an {{< ui >}}APM Metrics{{< /ui >}} or a {{< ui >}}Trace Analytics{{< /ui >}} monitor:

{{< tabs >}}
{{% tab "APM Metrics" %}}

### Select monitor scope

Choose your [primary tags][1], [service][2], and [resource][3] from the dropdown menus.

### Set alert conditions

Choose a {{< ui >}}Threshold{{< /ui >}} or {{< ui >}}Anomaly{{< /ui >}} alert:

#### Threshold alert

An alert is triggered whenever a metric crosses a threshold.

* Alert when {{< ui >}}Requests per second{{< /ui >}}, {{< ui >}}Errors per second{{< /ui >}}, {{< ui >}}Apdex{{< /ui >}}, {{< ui >}}Error rate{{< /ui >}}, {{< ui >}}Avg latency{{< /ui >}}, {{< ui >}}p50 latency{{< /ui >}},  {{< ui >}}p75 latency{{< /ui >}},  {{< ui >}}p90 latency{{< /ui >}}, or  {{< ui >}}p99 latency{{< /ui >}}
* is {{< ui >}}above{{< /ui >}}, {{< ui >}}above or equal to{{< /ui >}}, {{< ui >}}below{{< /ui >}}, or {{< ui >}}below or equal to{{< /ui >}}
* Alert threshold `<NUMBER>`
* Warning threshold `<NUMBER>`
* over the last {{< ui >}}5 minutes{{< /ui >}}, {{< ui >}}15 minutes{{< /ui >}}, {{< ui >}}1 hour{{< /ui >}}, etc. or {{< ui >}}custom{{< /ui >}} to set a value between 1 minute and 48 hours.

#### Anomaly alert

An alert is triggered whenever a metric deviates from an expected pattern.

* For {{< ui >}}Requests per second{{< /ui >}}, {{< ui >}}Errors per second{{< /ui >}}, {{< ui >}}Apdex{{< /ui >}}, {{< ui >}}Error rate{{< /ui >}}, {{< ui >}}Avg latency{{< /ui >}}, {{< ui >}}p50 latency{{< /ui >}},  {{< ui >}}p75 latency{{< /ui >}},  {{< ui >}}p90 latency{{< /ui >}}, or  {{< ui >}}p99 latency{{< /ui >}}
* Alert when `<ALERT_THRESHOLD>`%, `<WARNING_THRESHOLD>`%
* of values are `<NUMBER>` deviations {{< ui >}}above or below{{< /ui >}}, {{< ui >}}above{{< /ui >}}, or {{< ui >}}below{{< /ui >}}
* the prediction during the past {{< ui >}}5 minutes{{< /ui >}}, {{< ui >}}15 minutes{{< /ui >}}, {{< ui >}}1 hour{{< /ui >}}, etc. or {{< ui >}}custom{{< /ui >}} to set a value between 1 minute and 48 hours.

#### Advanced alert conditions

For detailed instructions on the advanced alert options (no data, evaluation delay, etc.), see the [Monitor configuration][4] page. For the metric-specific option full data window, see the [Metric monitor][5] page.

[1]: /tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /tracing/services/service_page/
[3]: /tracing/services/resource_page/
[4]: /monitors/configuration/#advanced-alert-conditions
[5]: /monitors/types/metric/#data-window
{{% /tab %}}
{{% tab "Trace Analytics" %}}

<div class="alert alert-info">There is a default limit of 1000 Trace Analytics monitors per account. If you are encountering this limit, consider using <a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">multi alerts</a>, or <a href="/help/">Contact Support</a>.</div>

### Define the search query

1. Construct a search query using the same logic as a [trace search][1].
2. Choose to monitor over a trace count, [facet][2], or [measure][3]:
    * {{< ui >}}Monitor over a trace count{{< /ui >}}: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of traces over a selected time frame and then compares it to the threshold conditions.
    * {{< ui >}}Monitor over a facet or measure{{< /ui >}}: If a facet is selected, the monitor alerts over the {{< ui >}}Unique value count{{< /ui >}} of the facet. If a measure is selected, then it's similar to a metric monitor, and aggregation needs to be selected ({{< ui >}}min{{< /ui >}}, {{< ui >}}avg{{< /ui >}}, {{< ui >}}sum{{< /ui >}}, {{< ui >}}median{{< /ui >}}, {{< ui >}}pc75{{< /ui >}}, {{< ui >}}pc90{{< /ui >}}, {{< ui >}}pc95{{< /ui >}}, {{< ui >}}pc98{{< /ui >}}, {{< ui >}}pc99{{< /ui >}}, or {{< ui >}}max{{< /ui >}}).
3. Group traces by multiple dimensions (optional):
    All traces matching the query are aggregated into groups based on the value of up to four facets.
4. Configure the alerting grouping strategy (optional):
    * {{< ui >}}Simple alert{{< /ui >}}: Simple alerts aggregate over all reporting sources. You receive one alert when the aggregated value meets the set conditions.</br>
    If the query has a `group by` and you select simple alert mode, you get **one** alert when one or multiple groups' values breach the threshold. This strategy may be selected to reduce notification noise.
    * {{< ui >}}Multi alert{{< /ui >}}: Multi alerts apply the alert to each source according to your group parameters. An alerting event is generated for each group that meets the set conditions. For example, you could group a query by `@resource.name` to receive a separate alert for each resource when a span's error rate is high.

{{< img src="monitors/monitor_types/apm/define-the-search-query.png" alt="Define the search query" style="width:80%;" >}}

**Note:** Analytics monitors only evaluate spans retained by [custom retention filters][6] (not the intelligent retention filter). Additionally, spans indirectly indexed by [trace-level retention filters][7] (that is, spans that don't match the query directly but belong to traces that do) are not evaluated by trace analytics monitors.

### Select alert conditions

* Trigger when the query result is {{< ui >}}above{{< /ui >}}, {{< ui >}}above or equal to{{< /ui >}}, {{< ui >}}below{{< /ui >}}, or {{< ui >}}below or equal to{{< /ui >}}.
* The threshold during the last {{< ui >}}5 minutes{{< /ui >}}, {{< ui >}}15 minutes{{< /ui >}}, {{< ui >}}1 hour{{< /ui >}}, or {{< ui >}}custom{{< /ui >}} to set a value between 5 minutes and 48 hours.
* Alert threshold: `<NUMBER>`
* Warning threshold: `<NUMBER>`

#### No data and below alerts

To receive a notification when a group matching a specific query stops sending spans, set the condition to below `1`. This notifies you when no spans match the monitor query in the defined evaluation period for the group.

#### Advanced alert conditions

For detailed instructions on the advanced alert options (evaluation delay, etc.), see the [Monitor configuration][5] page.

[1]: /tracing/trace_explorer/query_syntax/#search-bar
[2]: /tracing/trace_explorer/query_syntax/#facet-search
[3]: /tracing/trace_explorer/query_syntax/#numerical-values
[4]: /tracing/glossary/#indexed-span
[5]: /monitors/configuration/#advanced-alert-conditions
[6]: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[7]: /tracing/trace_pipeline/trace_retention/#retention-filter-types
{{% /tab %}}
{{< /tabs >}}

### Notifications

For detailed instructions on the {{< ui >}}Configure notifications and automations{{< /ui >}} section, see the [Notifications][3] page.

**Note**: Find service level monitors on the [Catalog][4] and on the [Service Map][5], and find resource level monitors on the individual resource pages (you can get there by clicking on the specific resource listed on the a service details page).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/metric/
[2]: https://app.datadoghq.com/monitors/create/apm
[3]: /monitors/notify/
[4]: https://app.datadoghq.com/services
[5]: https://app.datadoghq.com/apm/map
[6]: /standard-attributes/?search=span.kind&product=apm
[7]: https://app.datadoghq.com/monitors/
