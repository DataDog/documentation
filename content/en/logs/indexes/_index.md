---
title: Indexes
kind: documentation
description: Control the volume of logs indexed by Datadog
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

You can use indexed logs for [faceted searching][2], [patterns][3], [analytics][4], [dashboarding][5], and [monitoring][6].

## Indexes

By default, Log Explorer have one unique Log Index, but datadog also offers multiple indexes if you require:

* Multiple retention periods and/or multiple [daily quotas](#set-daily-quota), for finer budget control.
* Multiple permissions, for finer user [role based access controls (RBAC)][7].

<div class="alert alert-info">
The multi-index feature is in private beta, <a href="/help">contact Datadog support</a> to turn it on for your account.
</div>

## Indexes Filters

Index filters allow dynamic control over which logs flow into which indexes.  For example, if you create a first index filtered on the `status:notice` attribute, a second index filtered to the `status:error` attribute, and a final one without any filter (the equivalent of `*`), all your `status:notice` logs would go to the first index, all your `status:error` logs to the second index, and the rest would go to the final one.

{{< img src="logs/indexes/multi_index.png" alt="Multi indexes"  style="width:70%;">}}

**Note**: **Logs enter the first index whose filter they match on**, use drag and drop on the list of indexes to reorder them according to your use-case.

## Exclusion Filters

By default, logs indexes have no exclusion filter: that is to say all logs matching the Index Filter are indexed.

But because your logs are not all and equally valuable, exclusion filters control which logs flowing in your index should be removed. Excluded logs are discarded from indexes, but still flow through the [Livetail][8] and can be used to [generate metrics][9] and [archived][10].

Exclusion filters are defined by a query, a sampling rule, and a active/inactive toggle:

* Default **query** is `*`, meaning all logs flowing in the index would be excluded. Scope down exclusion filter to only a subset of logs [with a log query][11].
* Default **sampling rule** is `Exclude 100% of logs` matching the query. Adapt sampling rate from 0% to 100%, and decide if the sampling rate applies on individual logs, or group of logs defined by the unique values of any attribute.
* Default **toggle** is active, meaning logs flowing in the index are actually discarded according to the exclusion filter configuration. Toggle this to inactive to ignore this exclusion filter for new logs flowing in the index.

**Note**: Index filters for logs are only processed with the first **active** exclusion filter matched. If a log matches an exclusion filter (even if the log is not sampled out), it ignores all following exclusion filters in the sequence.

Use drag and drop on the list of exclusion filters to reorder them according to your use case.

{{< img src="logs/indexes/reorder_index_filters.png" alt="reorder index filters"  style="width:80%;">}}

### Examples of Exclusion Filters

#### Switch off, switch on

You might not need your DEBUG logs until you actually need them when your platform undergoes an incident, or want to carefully observe the deployment of a critical version of your application. Setup a 100% exclusion filter on the `status:DEBUG`, and toggle it on and off from Datadog UI or through the [API][12] when required.

{{< img src="logs/indexes/enable_index_filters.png" alt="enable index filters"  style="width:80%;">}}

#### Keep an eye on trends

Let's say now you don't want to keep all logs from your web access server requests. You could choose to index all 3xx, 4xx, and 5xx logs, but exclude 95% of the 2xx logs: `source:nginx AND http.status_code:[200 TO 299]` to keep track of the trends.
**Tip**: Transform web access logs into meaningful KPIs with a [metric generated from your logs][10], counting number of requests and tagged by status code, [browser][13] and [country][14].

{{< img src="logs/indexes/sample_200.png" alt="enable index filters"  style="width:80%;">}}

#### Sampling consistently with higher-level entities

You have millions of users connecting to your website everyday. And although you don't need observability on every single user, you still want to keep the full picture for some. Set up an exclusion filter applying to all production logs (`env:production`) and exclude logs for 90% of the `@user.email`:

{{< img src="logs/indexes/sample_user_id.png" alt="enable index filters"  style="width:80%;">}}

You can use APM in conjunction with Logs, thanks to [trace ID injection in logs][15]. As for users, you don't need to keep all your logs but making sure logs always give the full picture to a trace is critical for troubleshooting.
Set up an exclusion filter applied to logs from your instrumented service (`service:my_python_app`) and exclude logs for 50% of the `Trace ID` - make sure to use the [trace ID remapper][16] upstream in your pipelines.

{{< img src="logs/indexes/sample_trace_id.png" alt="enable index filters"  style="width:80%;">}}

## Set daily quota

You can set a daily quota to hard-limit the number of logs that are stored within an Index per day. This quota is applied for all logs that should have been stored (i.e. after exclusion filters are applied).
Once the daily quota is reached, logs are no longer indexed but are still available in the [livetail][17], [sent to your archives][18], and used to [generate metrics from logs][19].

Update or remove this quota at any time when editing the Index:

{{< img src="logs/indexes/index_quota.png" alt="index details"  style="width:70%;">}}

**Note**: Indexes daily quotas reset automatically at 2:00pm UTC (4:00pm CET, 10:00am EDT, 7:00am PDT).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/indexes
[2]: /logs/explorer/?tab=facets#visualization
[3]: /logs/explorer/patterns
[4]: /logs/explorer/analytics
[5]: /logs/explorer/analytics/#dashboard
[6]: /monitors/monitor_types/log
[7]: /account_management/rbac
[8]: /logs/live_tail
[9]: /logs/archives
[10]: /logs/logs_to_metrics
[11]: /logs/explorer/search/
[12]: /api/?lang=bash#update-an-index
[13]: /logs/processing/processors/?tab=ui#user-agent-parser
[14]: /logs/processing/processors/?tab=ui#geoip-parser
[15]: /tracing/connect_logs_and_traces/
[16]: /logs/processing/processors/?tab=ui#trace-remapper
[17]: https://docs.datadoghq.com/logs/live_tail/#overview
[18]: https://docs.datadoghq.com/logs/archives/
[19]: https://docs.datadoghq.com/logs/logs_to_metrics/
