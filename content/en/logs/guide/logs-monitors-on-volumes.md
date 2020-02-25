---
title: Setting up monitors on log usage
kind: guide
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
---

## Monitor indexed logs with fixed threshold

Get notified if the indexed log volumes in any scope (`service`, `availability-zone`, etc...) of your infrastructure are growing unexpectedly:

1. Go to the [Datadog Log Explorer][1] view
2. Build a [search query][2] that represents the volume to monitor (keep the query empty to monitor all the logs from that index)
3. Click on **Export to monitor**.
4. Define the rate you would like to set as *warning* or *error*.
5. Define an explicit notification: `The volume on this service just got too high. Define an additional exclusion filter or increase the sampling rate to get it back under control.`

{{< img src="logs/guide/example_notification.png" alt=" example notification"  style="width:70%;">}}

It is also possible to [setup a daily quota on indexes][8] to prevent indexing more than a given amount of logs per day. When doing this, we recommend to setup the above monitor to alert when 80% of this quota is reached within the past 24h.

## Alert on unexpected spikes

### Activate recommended log usage metrics

Turn on [recommended log usage metrics][3] to start tracking the number of ingested logs, ingested bytes and indexed logs. Navigate to the [Generate Metrics][5] page to enable log usage metrics:

{{< img src="logs/processing/logs_to_metrics/recommended_usage_metrics.png" alt="Recommended Usage Metrics" responsive="true" style="width:80%;">}}

Those metrics are free and kept for 15 months. Let's now see how to leverage them in [anomaly detection monitors][4].
It is **recommended** to set the unit to `Byte` for the `logs.estimated.ingested_bytes` in the [metric summary page][6]:

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="Metric unit definition"  style="width:70%;">}}

### Anomaly detection monitors

Let's now define anomaly detection monitors to be alerted of any unexpected indexing log spikes:

1. [Create a new Anomaly monitor][7]
2. Select the `logs.estimated.ingested_events.count` metric
3. Add `datadog_is_excluded:false` in the `from` section (to monitor indexed logs and not ingested ones)
4. Add the tag `service` and `datadog_index` in the group by (to be notified if a specific service spikes or stops sending logs in any indexes)
5. Set the alert condition to match your use case (evaluation window, number of times outside the expected range, ...)
6. Set the notification message with actionnable instructions:

{{< img src="logs/guide/anomaly_usage_notification.png" alt=" example anomaly notification"  style="width:70%;">}}

Example of notification with contextual links:

```
An unexpected amount of logs has been indexed in index {{datadog_index.name}} 

1. [Check Log patterns for this service](https://app.datadoghq.com/logs/patterns?from_ts=1582549794112&live=true&to_ts=1582550694112&query=service%3A{{service.name}})
2. [Add an exclusion filter on the noisy pattern](https://app.datadoghq.com/logs/pipelines/indexes)
```

## Estimated usage dashboard

From those metrics, an estimated usage Dashboard might also be built to monitor your Log Management usage across Datadog.
Here is an example of such a Dashboard:

{{< img src="logs/guide/log_usage_dashboard.png" alt="Log estimated usage dashboard"  style="width:70%;">}}

**Reminder**: The metrics used in this dashboard are estimates and might differ from official billing numbers.

To import this dashboard, copy paste the below JSON definition and import it in a new Screenboard:

{{< img src="logs/guide/import_dashboard.png" alt="Log estimated usage dashboard"  style="width:70%;">}}

And the JSON definition of this dashboard:

```
{"title":"Log Management - estimated usage dashboard","description":null,"widgets":[{"id":0,"definition":{"type":"timeseries","requests":[{"q":"sum:logs.estimated.ingested_bytes{$service,$index}.rollup(sum, 86400)","display_type":"bars","style":{"palette":"dog_classic","line_type":"solid","line_width":"normal"}}],"yaxis":{"label":"","scale":"linear","min":"auto","max":"auto","include_zero":true},"title":"Ingested bytes","title_size":"16","title_align":"left","time":{},"show_legend":false},"layout":{"x":23,"y":0,"width":45,"height":14}},{"id":1,"definition":{"type":"toplist","requests":[{"q":"top(sum:logs.estimated.ingested_bytes{$service,$index} by {service}, 50, 'sum', 'desc')"}],"title":"Ingested bytes per service","title_size":"16","title_align":"left"},"layout":{"x":142,"y":-2,"width":28,"height":28}},{"id":3,"definition":{"type":"toplist","requests":[{"q":"top(sum:logs.estimated.ingested_events.count{$service,$index} by {service}.as_count(), 50, 'sum', 'desc')"}],"title":"Ingested logs per service","title_size":"16","title_align":"left"},"layout":{"x":69,"y":0,"width":28,"height":28}},{"id":4,"definition":{"type":"timeseries","requests":[{"q":"sum:logs.estimated.ingested_events.count{$service,$index} by {service}.as_count()","display_type":"line","style":{"palette":"dog_classic","line_type":"solid","line_width":"normal"}}],"yaxis":{"label":"","scale":"linear","min":"auto","max":"auto","include_zero":true},"title":"Ingested logs per service","title_size":"16","title_align":"left","show_legend":false,"legend_size":"0"},"layout":{"x":97,"y":14,"width":45,"height":14}},{"id":6,"definition":{"type":"timeseries","requests":[{"q":"sum:logs.estimated.ingested_events.count{datadog_is_excluded:true,$service,$index}.as_count()/sum:logs.estimated.ingested_events.count{$service,$index}.as_count()*100","display_type":"line","style":{"palette":"dog_classic","line_type":"solid","line_width":"normal"}}],"yaxis":{"label":"","scale":"linear","min":"auto","max":"auto","include_zero":true},"title":"% of excluded logs","title_size":"16","title_align":"left","time":{},"show_legend":false},"layout":{"x":23,"y":60,"width":45,"height":14}},{"id":7,"definition":{"type":"toplist","requests":[{"q":"top(sum:logs.estimated.ingested_events.count{datadog_is_excluded:true,$service,$index} by {service}.as_count()/sum:logs.estimated.ingested_events.count{$service,$index} by {service}.as_count()*100,50,'sum','desc')"}],"title":"Service excluding the most logs","title_size":"16","title_align":"left"},"layout":{"x":69,"y":60,"width":28,"height":28}},{"id":8,"definition":{"type":"query_value","requests":[{"q":"sum:logs.estimated.ingested_events.count{datadog_is_excluded:true,$service,$index} by {service}.as_count()/sum:logs.estimated.ingested_events.count{$service,$index} by {service}.as_count()*100","aggregator":"sum"}],"title":"Overall exclusion ratio","title_size":"16","title_align":"left","custom_unit":"%","precision":2},"layout":{"x":3,"y":68,"width":15,"height":10}},{"id":9,"definition":{"type":"query_value","requests":[{"q":"sum:logs.estimated.ingested_events.count{$service,$index}.as_count()","aggregator":"sum"}],"title":"Ingested logs","title_size":"16","title_align":"left","time":{},"autoscale":true,"custom_unit":"","precision":2},"layout":{"x":3,"y":18,"width":15,"height":10}},{"id":10,"definition":{"type":"toplist","requests":[{"q":"top(sum:logs.estimated.ingested_events.count{datadog_is_excluded:true,$service,$index} by {service}.as_count()/sum:logs.estimated.ingested_events.count{$service,$index} by {service}.as_count()*100,50,'sum','asc')"}],"title":"Service excluding the less logs","title_size":"16","title_align":"left"},"layout":{"x":97,"y":60,"width":28,"height":28}},{"id":12,"definition":{"type":"toplist","requests":[{"q":"top(sum:logs.estimated.ingested_events.count{datadog_is_excluded:false,$service,$index} by {datadog_index}.as_count(), 50, 'sum', 'desc')"}],"title":"Indexed logs by index","title_size":"16","title_align":"left"},"layout":{"x":69,"y":30,"width":28,"height":28}},{"id":13,"definition":{"type":"timeseries","requests":[{"q":"sum:logs.estimated.ingested_events.count{datadog_is_excluded:false,$service,$index} by {datadog_index}.as_count().rollup(sum, 86400)","display_type":"bars","style":{"palette":"dog_classic","line_type":"solid","line_width":"normal"}}],"yaxis":{"label":"","scale":"linear","min":"auto","max":"auto","include_zero":true},"title":"Indexed logs per index","title_size":"16","title_align":"left","time":{},"show_legend":false,"legend_size":"0"},"layout":{"x":97,"y":44,"width":45,"height":14}},{"id":14,"definition":{"type":"timeseries","requests":[{"q":"sum:logs.estimated.ingested_events.count{datadog_is_excluded:false,$service,$index} by {service}.as_count()","display_type":"line","style":{"palette":"dog_classic","line_type":"solid","line_width":"normal"}}],"yaxis":{"label":"","scale":"linear","min":"auto","max":"auto","include_zero":true},"title":"Indexed logs per service","title_size":"16","title_align":"left","show_legend":false,"legend_size":"0"},"layout":{"x":97,"y":30,"width":45,"height":14}},{"id":23,"definition":{"type":"note","content":"Ingestion","background_color":"yellow","font_size":"24","text_align":"center","show_tick":true,"tick_pos":"50%","tick_edge":"right"},"layout":{"x":0,"y":0,"width":22,"height":8}},{"id":25,"definition":{"type":"note","content":"Indexing","background_color":"yellow","font_size":"24","text_align":"center","show_tick":true,"tick_pos":"50%","tick_edge":"right"},"layout":{"x":0,"y":30,"width":22,"height":8}},{"id":26,"definition":{"type":"note","content":"Sampling","background_color":"yellow","font_size":"24","text_align":"center","show_tick":true,"tick_pos":"50%","tick_edge":"right"},"layout":{"x":-1,"y":60,"width":22,"height":8}},{"id":27,"definition":{"type":"timeseries","requests":[{"q":"sum:logs.estimated.ingested_events.count{datadog_is_excluded:true,$service,$index} by {service}.as_count()/sum:logs.estimated.ingested_events.count{$service,$index} by {service}.as_count()*100","display_type":"line","style":{"palette":"dog_classic","line_type":"solid","line_width":"normal"}}],"yaxis":{"label":"","scale":"linear","min":"auto","max":"auto","include_zero":true},"title":"% of excluded logs by service","title_size":"16","title_align":"left","time":{},"show_legend":false,"legend_size":"0"},"layout":{"x":23,"y":74,"width":45,"height":14}},{"id":29,"definition":{"type":"timeseries","requests":[{"q":"sum:logs.estimated.ingested_events.count{$service,$index}.as_count().rollup(sum, 86400)","display_type":"bars","style":{"palette":"dog_classic","line_type":"solid","line_width":"normal"}}],"yaxis":{"label":"","scale":"linear","min":"auto","max":"auto","include_zero":true},"title":"Ingested logs","title_size":"16","title_align":"left","time":{},"show_legend":false,"legend_size":"0"},"layout":{"x":23,"y":14,"width":45,"height":14}},{"id":30,"definition":{"type":"timeseries","requests":[{"q":"sum:logs.estimated.ingested_bytes{$service,$index} by {service}","display_type":"line","style":{"palette":"dog_classic","line_type":"solid","line_width":"normal"}}],"yaxis":{"label":"","scale":"linear","min":"auto","max":"auto","include_zero":true},"title":"Ingested bytes per service","title_size":"16","title_align":"left","time":{},"show_legend":false,"legend_size":"0"},"layout":{"x":97,"y":0,"width":45,"height":14}},{"id":31,"definition":{"type":"timeseries","requests":[{"q":"sum:logs.estimated.ingested_events.count{datadog_is_excluded:false,$service,$index}.as_count().rollup(sum, 86400)","display_type":"bars","style":{"palette":"dog_classic","line_type":"solid","line_width":"normal"}}],"yaxis":{"label":"","scale":"linear","min":"auto","max":"auto","include_zero":true},"title":"Indexed logs","title_size":"16","title_align":"left","time":{},"show_legend":false,"legend_size":"0"},"layout":{"x":23,"y":30,"width":45,"height":14}},{"id":34,"definition":{"type":"query_value","requests":[{"q":"sum:logs.estimated.ingested_events.count{$service,$index,datadog_is_excluded:false}.as_count()","aggregator":"sum"}],"title":"Indexed logs","title_size":"16","title_align":"left","time":{},"autoscale":true,"custom_unit":"","precision":2},"layout":{"x":3,"y":38,"width":15,"height":10}},{"id":36,"definition":{"type":"query_value","requests":[{"q":"sum:logs.estimated.ingested_events.count{$service,$index,datadog_is_excluded:true}.as_count()","aggregator":"sum"}],"title":"Excluded logs","title_size":"16","title_align":"left","time":{},"autoscale":true,"custom_unit":"","precision":2},"layout":{"x":3,"y":78,"width":15,"height":10}},{"id":37,"definition":{"type":"timeseries","requests":[{"q":"sum:logs.estimated.ingested_events.count{datadog_is_excluded:false,$service,$index}.as_count().rollup(sum, 86400)","display_type":"bars","style":{"palette":"dog_classic","line_type":"solid","line_width":"normal"}},{"q":"sum:logs.estimated.ingested_events.count{$service,$index}.as_count().rollup(sum, 86400)","display_type":"line","style":{"palette":"dog_classic","line_type":"solid","line_width":"normal"}}],"yaxis":{"label":"","scale":"linear","min":"auto","max":"auto","include_zero":true},"title":"Indexed vs ingested logs","title_size":"16","title_align":"left","time":{},"show_legend":false,"legend_size":"0"},"layout":{"x":23,"y":44,"width":45,"height":14}},{"id":38,"definition":{"type":"query_value","requests":[{"q":"sum:logs.estimated.ingested_bytes{$service,$index}.rollup(sum, 86400)","aggregator":"sum"}],"title":"Ingested bytes","title_size":"16","title_align":"left","time":{},"autoscale":true,"precision":2},"layout":{"x":3,"y":8,"width":15,"height":10}}],"template_variables":[{"name":"service","default":"*","prefix":"service"},{"name":"index","default":"*","prefix":"datadog_index"}],"layout_type":"free","is_read_only":false,"notify_list":[],"id":"95k-i35-z2a"}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/explorer/search
[3]: https://docs.datadoghq.com/logs/logs_to_metrics/#recommended-usage-metrics
[4]: https://docs.datadoghq.com/monitors/monitor_types/anomaly/
[5]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[6]: https://app.datadoghq.com/metric/summary?filter=logs.estimated.ingested_bytes&metric=logs.estimated.ingested_bytes
[7]: https://app.datadoghq.com/monitors#create/anomaly
[8]: https://docs.datadoghq.com/logs/indexes/#set-daily-quota
