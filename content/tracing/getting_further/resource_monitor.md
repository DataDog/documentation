---
title: How to create a Monitor over every Resource (APM)? 
kind: documentation
aliases:
    - /tracing/faq/how-to-create-a-monitor-over-every-resource-apm
---

Datadog’s Application Performance Monitoring component consists of a few key components: Services and Resources being the top most layers.  

Each Graph within the APM Service and Resource Dashboards consist of some `trace.*` metrics. You can also utilize the download button at the top of the graph to save those Metrics to an existing Timeboard. This can be done for both Service level and Resource level metrics.

{{< img src="tracing/faq/apm_save_1.png" alt="APM save" responsive="true" popup="true">}}

Note that when constructing Monitors over resources, you must utilize the Resource tag that contains a hash of the Resource Name. You can find this by saving the metric to a Timeboard and utilizing the same query in a Metric Monitor.

## Creating a Monitor from this

While the current APM monitor has the ability to set up Alerts on a per Service basis, you can utilize the metric query taken from above to setup a Metric or even Anomaly monitor over a specific Service or Resource.

Since these are regular Datadog Metrics and Tags, you can copy that query into a New Monitor. You can even setup a Multi Alert over the Resource and Env tags. More information about Multi Alert monitors can be found [here](https://help.datadoghq.com/hc/en-us/articles/204989575-Simple-Alerts-vs-Multi-Alerts). The downside here is that you will see the resource hash in the field, as opposed to the more readable name. However, to work around this, you can construct your Monitor message to send a link to the Resource Page of the Resource that caused the monitor to trigger. Each Resource APM Page has the following format:

```
/apm/resource/<Service>/<top_level_name>/<Resource_Name>?env=<env>
```

Since each Service contains a single Top Level Name, more information about this here, and we can setup a multi alert by env and resource and service, we only need to obtain the top level name to create the URL. This Top level name can be found by clicking on the Service you are interested in. For example, for our Mcnulty-Web Service, the top level name is `pylons.request`:

{{< img src="tracing/faq/top_level_name.png" alt="Top level name" responsive="true" popup="true">}}

Then our Monitor configuration would resemble the following:

{{< img src="tracing/faq/top_level_monitor.png" alt="Top level monitor" responsive="true" popup="true">}}