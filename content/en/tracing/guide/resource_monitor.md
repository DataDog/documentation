---
title: APM resource monitors
kind: documentation
aliases:
    - /tracing/faq/how-to-create-a-monitor-over-every-resource-apm
    - /tracing/getting_further/resource_monitor
---

Datadog's Application Performance Monitoring component consists of a few key components: [services][1] and [resources][2] being the top most layers.

Each graph within the APM [service][3] and [resource][4] Dashboards consist of some `trace.*` metrics.
Use [the download button at the top of the graph][5] to save those Metrics to an existing Timeboard. This can be done for both service level and resource level metrics:

{{< img src="tracing/faq/apm_save_1.png" alt="APM save"  >}}

**Note**: To build Monitors over resources, use the resource tag that contains a hash of the resource Name. Find this by saving the metric to a Timeboard and utilizing the same query in a Metric Monitor:

## Creating a monitor

While the current APM monitor has the ability to set up Alerts on a per [service basis][6], use the metric query taken from above to setup a Metric or even Anomaly monitor over a specific service or resource.

Since these are regular Datadog Metrics and Tags, copy that query into a New Monitor.
The downside here is that see the resource hash in the field, as opposed to the more readable name. However, to work around this, construct your Monitor message to send a link to the resource Page of the resource that caused the monitor to trigger. Each resource APM Page has the following format:

```text
/apm/resource/<Service>/<TOP_LEVEL_NAME>/<Resource_Name>?env=<env>
```

Since each service contains a single Top Level Name and we can setup a multi alert by [environment][7] and resource and service, we only need to obtain the top level name to create the URL.
This Top Level Name can be found by clicking on the service you are interested in. For example, for Datadog's Mcnulty-Web service, the Top Level Name is `pylons.request`:

{{< img src="tracing/faq/top_level_name.png" alt="Top level name"  >}}

Then the Monitor configuration would resemble the following:

{{< img src="tracing/faq/top_level_monitor.png" alt="Top level monitor"  >}}

[1]: /tracing/visualization/service/
[2]: /tracing/visualization/resource/
[3]: /tracing/visualization/#services
[4]: /tracing/visualization/#resources
[5]: /tracing/visualization/service/#export-to-timeboard
[6]: /monitors/monitor_types/apm/
[7]: /tracing/guide/setting_primary_tags_to_scope/#environment
