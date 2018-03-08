---
title: APM resource monitors
kind: documentation
aliases:
    - /tracing/faq/how-to-create-a-monitor-over-every-resource-apm
---

Datadog’s Application Performance Monitoring component consists of a few key components: [services](/tracing/visualization/service) and [resources](/tracing/visualization/resource) being the top most layers.  

Each graph within the APM service and resource Dashboards consist of some `trace.*` metrics.  
Utilize [the download button at the top of the graph](/tracing/visualization/service/#export-to-timeboard) to save those Metrics to an existing Timeboard. This can be done for both service level and resource level metrics:

{{< img src="tracing/faq/apm_save_1.png" alt="APM save" responsive="true" popup="true">}}

**Note**: To build Monitors over resources, utilize the resource tag that contains a hash of the resource Name. Find this by saving the metric to a Timeboard and utilizing the same query in a Metric Monitor:

## Creating a Monitor from this

While the current APM monitor has the ability to set up Alerts on a per [service basis](/monitors/monitor_types/apm), use the metric query taken from above to setup a Metric or even Anomaly monitor over a specific service or resource.  

Since these are regular Datadog Metrics and Tags, copy that query into a New Monitor.  
The downside here is that see the resource hash in the field, as opposed to the more readable name. However, to work around this, construct your Monitor message to send a link to the resource Page of the resource that caused the monitor to trigger. Each resource APM Page has the following format:

```
/apm/resource/<Service>/<top_level_name>/<Resource_Name>?env=<env>
```

Since each service contains a single Top Level Name and we can setup a multi alert by [environment](/tracing/setup/environment) and resource and service, we only need to obtain the top level name to create the URL.  
This Top level name can be found by clicking on the service you are interested in. For example, for our Mcnulty-Web service, the top level name is `pylons.request`:

{{< img src="tracing/faq/top_level_name.png" alt="Top level name" responsive="true" popup="true">}}

Then our Monitor configuration would resemble the following:

{{< img src="tracing/faq/top_level_monitor.png" alt="Top level monitor" responsive="true" popup="true">}}