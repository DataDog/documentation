---
title: Indexes
kind: documentation
description: Control the volume of logs indexed by Datadog
disable_toc: true
aliases:
  - /logs/dynamic_volume_control
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "https://www.datadoghq.com/blog/logging-without-limits/"
  tag: "Blog"
  text: "Logging without Limits*"
---


Indexes are located on the [Configuration page][1] in the Indexes section. Double click on them or click on the *edit* button to see more information about the number of logs that were indexed in the past 3 days, as well as the retention period for those logs:

{{< img src="logs/indexes/index_details.png" alt="index details"  style="width:70%;">}}

You can use indexed logs for [faceted Searching][2], [patterns][11], [analytics][3], [dashboarding][4], and [monitoring][5]. 


## Indexes

By default, Log Explorer comes with one unique Log Index.

Datadog also offers multiple indexes (**currently in private beta**) if you require:
* multiple retention periods and/or [daily quotas](#daily-quotas), for finer grained budget control 
* multiple permissions, for finer grained access controls. More information available in the [role base access control (RBAC) documentation][9].


## Indexes Filters

Index filters give dynamic control over which logs flow into which indexes. Logs enter the first index whose filter they match on, so it is important to order your indexes carefully.

For example, if you create a first index filtered to the `status:notice` attribute, a second index filtered to the `status:error` attribute, and a final one without any filter (the equivalent of `*`), all your notice logs would go to the first index, all your error logs to the second index, and the rest would go to the final one.

{{< img src="logs/indexes/multi_index.png" alt="Multi indexes"  style="width:70%;">}}

Use drag and drop on the list of indexes to reorder them.


## Exclusion Filters

By default, logs indexes come without exclusion filter: meaning all logs matching the [Index Filter](#indexes-filters) are eventually indexed.

But because your logs are not all and equally valuable, and because some logs are useful only under some circumstances, exclusion filters control which logs flowing in are eventually indexed. Excluded logs are discarded from indexes, but would still flow through the [Livetail][12], [Metrics Generation][13] and/or [Archives][14].

Add as many exclusion filters as you need to control your flow. Exclusion filters come with a query, a sampling rule and a active/inactive toggle:

* Default **query** is `*`, meaning all logs flowing in the index (that is to say logs that matched the index filter). Scope down exclusion filter to only a subset of the logs if you need finer control.  
* Default **sampling rule** is `Exclude 100% of logs` matching the query. Adapt sampling rate from 0% to 100%, and decide if the sampling rate applies on individual logs, or group of logs defined by the unique values of any attribute. . 
* Default **toggle** is active, meaning the logs flowing in are actually discarded according to the rule. Toggle this to inactive to ignore this exclusion filter for new logs flowing in the index. 

As for Index Filters, logs will be processed by the only first **active** exclusion filter they match. Which means that order matters: use drag and drop to reorder exclusion filter accordingly.

{{< img src="logs/indexes/reorder_index_filters.png" alt="reorder index filters"  style="width:80%;">}}


### Examples of Exclusion Filters

You don't need your DEBUG logs... until you actually need them when your platform undergoes an incident, or want to carefully observe the deployment of a critical version of your application. Setup a 100% exclusion filter on the `status:DEBUG`, and toggle it on and off from UI or [API] when required.


{{< img src="logs/indexes/enable_index_filters.png" alt="enable index filters"  style="width:80%;">}}


You don't need to keep track of every single web access server log generated. Index all 3xx, 4xx and 5xx logs, but exclude 95% of the 2xx logs `source:nginx http.status_code:[200 TO 299]` to keep track of the trends. Pro tip, summarize these web access logs into a meaningful KPI with a [custom metric generated from logs][14], counting number of requests and tagged by status code, [browser][17] and [country][16].

{{< img src="logs/indexes/sample_200.png" alt="enable index filters"  style="width:80%;">}}

You have millions of users connecting to your marketplace everyday. And although you don't need obersability on every single user, you still want to keep the full picture for the one you'll observe. Set up an exclusion filter applying to all logs (`*`) and exclude logs for 90% of the `@http.user_id`. 

{{< img src="logs/indexes/sample_user_id.png" alt="enable index filters"  style="width:80%;">}}

You use APM in conjunction with Logs, thanks to [Trace ID injection in logs][10]. As for users, you don't need to keep all your logs, but making sure logs always give the full picture of a Trace is critical for troubleshooting. Set up an exclusion filter applying to logs from your instrumented service (`service:my_python_app`) and exclude logs for 50% of the `Trace ID` - make sure you use the [Trace ID remapper][18] upstream in your pipelines. 

{{< img src="logs/indexes/sample_trace_id.png" alt="enable index filters"  style="width:80%;">}}


## Set daily quota

You can set a daily quota to hard-limit the number of logs that are stored within an Index per day. This quota is applied for all logs that should have been stored (i.e after exclusion filters are applied).
Once the daily quota is reached, logs are no longer indexed but are still available in the [livetail][6], [sent to your archives][7], and used to [generate metrics from logs][8].

Update or remove this quota at any time when editing the Index:

{{< img src="logs/indexes/index_quota.png" alt="index details"  style="width:70%;">}}

**Note**: Indexes daily quotas reset automatically at 2:00pm UTC (4:00pm CET, 10:00am EDT, 7:00am PDT).


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /logs/explorer/?tab=facets#setup
[3]: /logs/explorer/analytics
[4]: /logs/explorer/analytics/#dashboard
[5]: /monitors/monitor_types/log
[6]: https://docs.datadoghq.com/logs/live_tail/#overview
[7]: https://docs.datadoghq.com/logs/archives/
[8]: https://docs.datadoghq.com/logs/logs_to_metrics/
[9]: /account_management/rbac
[10]: /tracing/advanced/connect_logs_and_traces/?tab=java
[11]: /logs/explorer/patterns
[12]: /logs/livetail
[13]: /logs/pipelines/archives
[14]: /logs/pipelines/generate-metrics
[15]: /api/?lang=bash#update-an-index
[16]: /logs/processing/processors/?tab=ui#geoip-parser
[17]: /logs/processing/processors/?tab=ui#user-agent-parser
[18]: /logs/processing/processors/?tab=ui#trace-remapper
