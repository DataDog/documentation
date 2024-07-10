---
title: Indexes
description: Control the volume of logs indexed by Datadog
aliases:
  - /logs/dynamic_volume_control
  - /logs/indexes/
further_reading:
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "https://www.datadoghq.com/blog/logging-without-limits/"
  tag: "Blog"
  text: "Logging without Limits*"
---

Log Indexes provide fine-grained control over your Log Management budget by allowing you to segment data into value groups for differing retention, quotas, usage monitoring, and billing. Indexes are located on the [Configuration page][1] in the Indexes section. Double click on them or click on the *edit* button to see more information about the number of logs that were indexed in the past 3 days, as well as the retention period for those logs:

{{< img src="logs/indexes/index_details.jpg" alt="index details" style="width:70%;">}}

You can use indexed logs for [faceted searching][2], [patterns][3], [analytics][4], and [monitoring][6].

## Multiple indexes

By default, each new account gets a single index representing a monolithic set of all your logs. Datadog recommends using multiple indexes if you require:

* Multiple [retention periods](#update-log-retention)
* Multiple [daily quotas](#set-daily-quota), for finer budget control.

The Log Explorer supports [queries across multiple indexes][7].

### Add indexes

Use the "New Index" button to create a new index. There is a maximum number of indexes you can create for each account, set to 100 by default.

{{< img src="logs/indexes/add-index.png" alt="Add index" style="width:70%;">}}

**Note**: Index names must start with a letter and can only contain lowercase letters, numbers, or the '-' character.

<div class="alert alert-info">
<a href="/help">Contact Datadog support</a> if you need to increase the maximum number of indexes for your account.
</div>

### Delete indexes

To delete an index from your organization, use the "Delete icon" in the index action tray. Only users with the `Logs delete data` permission can use this option.

{{< img src="logs/indexes/delete-index.png" alt="Delete index" style="width:70%;">}}

<div class="alert alert-warning">
You cannot recreate an index with the same name as the deleted one. 
</div>

**Note:** The deleted index will no longer accept new incoming logs. The logs in the deleted index are no longer available for querying. After all logs have aged out according to the applicable retention period, the index will no longer show up in the Index page.



## Indexes filters

Index filters allow dynamic control over which logs flow into which indexes. For example, if you create a first index filtered on the `status:notice` attribute, a second index filtered to the `status:error` attribute, and a final one without any filter (the equivalent of `*`), all your `status:notice` logs would go to the first index, all your `status:error` logs to the second index, and the rest would go to the final one.

{{< img src="logs/indexes/multi_index.png" alt="Multi indexes" style="width:70%;">}}

**Note**: **Logs enter the first index whose filter they match on**, use drag and drop on the list of indexes to reorder them according to your use-case.

## Exclusion filters

By default, logs indexes have no exclusion filter: that is to say all logs matching the Index Filter are indexed.

But because your logs are not all and equally valuable, exclusion filters control which logs flowing in your index should be removed. Excluded logs are discarded from indexes, but still flow through the [Livetail][8] and can be used to [generate metrics][9] and [archived][10].

To add an exclusion filter:

1. Navigate to [Log Indexes][11].
2. Expand the pipeline for which you want to add an exclusion filter. 
3. Click **Add an Exclusion Filter**.

Exclusion filters are defined by a query, a sampling rule, and an active/inactive toggle:

* Default **query** is `*`, meaning all logs flowing in the index would be excluded. Scope down exclusion filter to only a subset of logs [with a log query][12].
* Default **sampling rule** is `Exclude 100% of logs` matching the query. Adapt sampling rate from 0% to 100%, and decide if the sampling rate applies on individual logs, or group of logs defined by the unique values of any attribute.
* Default **toggle** is active, meaning logs flowing in the index are actually discarded according to the exclusion filter configuration. Toggle this to inactive to ignore this exclusion filter for new logs flowing in the index.

**Note**: Index filters for logs are only processed with the first **active** exclusion filter matched. If a log matches an exclusion filter (even if the log is not sampled out), it ignores all following exclusion filters in the sequence.

Use drag and drop on the list of exclusion filters to reorder them according to your use case.

{{< img src="logs/indexes/reorder_index_filters.png" alt="reorder index filters" style="width:80%;">}}

### Examples

#### Switch off, switch on

You might not need your DEBUG logs until you actually need them when your platform undergoes an incident, or want to carefully observe the deployment of a critical version of your application. Setup a 100% exclusion filter on the `status:DEBUG`, and toggle it on and off from Datadog UI or through the [API][13] when required.

{{< img src="logs/indexes/enable_index_filters.png" alt="enable index filters" style="width:80%;">}}

#### Keep an eye on trends

What if you don't want to keep all logs from your web access server requests? You could choose to index all 3xx, 4xx, and 5xx logs, but exclude 95% of the 2xx logs: `source:nginx AND http.status_code:[200 TO 299]` to keep track of the trends.
**Tip**: Transform web access logs into meaningful KPIs with a [metric generated from your logs][9], counting number of requests and tagged by status code, [browser][14] and [country][15].

{{< img src="logs/indexes/sample_200.png" alt="enable index filters" style="width:80%;">}}

#### Sampling consistently with higher-level entities

You have millions of users connecting to your website everyday. And although you don't need observability on every single user, you still want to keep the full picture for some. Set up an exclusion filter applying to all production logs (`env:production`) and exclude logs for 90% of the `@user.email`:

{{< img src="logs/indexes/sample_user_id.png" alt="enable index filters" style="width:80%;">}}

You can use APM in conjunction with Logs, thanks to [trace ID injection in logs][16]. As for users, you don't need to keep all your logs but making sure logs always give the full picture to a trace is critical for troubleshooting.
Set up an exclusion filter applied to logs from your instrumented service (`service:my_python_app`) and exclude logs for 50% of the `Trace ID` - make sure to use the [trace ID remapper][17] upstream in your pipelines.

{{< img src="logs/indexes/sample_trace_id.png" alt="enable index filters" style="width:80%;">}}

To ensure sampling consistency across multiple indexes:

1. Create one exclusion rule in each index.
2. Use the **same sampling rate** and the **same attribute** defining the higher level entity for all exclusion rules.
3. Double-check exclusion rules, **filters**, and **respective order** (logs only pass through the first matching exclusion rule).

In the following example:

{{< img src="logs/indexes/cross-index_sampling.png" alt="enable index filters" style="width:80%;">}}

* In general, all logs with a specific `request_id` are either kept or excluded (with 50% probability).
* Logs with a `threat:true` or `compliance:true` tag are kept regardless of the `request_id`.
* `DEBUG` logs are indexed consistently with the `request_id` sampling rule, unless the debug logs exclusion filter is enabled in which case they are sampled.
* 50% of the `2XX` web access logs with an actual `request_id` are kept. All other `2XX` web access logs are sampled based on the 90% exclusion filter rule.

## Update log retention

The index retention setting determines how long logs are stored and searchable in Datadog. You can set the retention to any value allowed in your account configuration.

To enable adding additional retentions that are not in your current contract, contact Customer Success at: `success@datadoghq.com`. After additional retentions have been enabled, you need to update the retention periods for your indexes.

{{< img src="logs/indexes/log_retention.png" alt="index details" style="width:70%;">}}

**Note**: To use retentions which are not in your current contract, [the option][21] must be enabled by an admin in your organisation settings.

## Set daily quota

You can set a daily quota to hard-limit the number of logs that are stored within an Index per day. This quota is applied for all logs that should have been stored (such as after exclusion filters are applied).
After the daily quota is reached, logs are no longer indexed but are still available in the [livetail][18], [sent to your archives][10], and used to [generate metrics from logs][9].

You can configure or remove this quota at any time when editing the Index:
- Set a daily quota in millions of logs
- (Optional) Set a custom reset time; by default, index daily quotas reset automatically at [2:00pm UTC][19]
- (Optional) Set a warning threshold as a percentage of the daily quota (minimum 50%)

**Note**: Changes to daily quotas and warning thresholds take effect immediately.

{{< img src="logs/indexes/daily_quota_config.png" alt="index details" style="width:70%;">}}

An event is generated when either the daily quota or the warning threshold is reached:

{{< img src="logs/indexes/index_quota_event.png" alt="index quota notification" style="width:70%;">}}

See [Monitor log usage][20] on how to monitor and alert on your usage.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines/
[2]: /logs/explorer/#visualization
[3]: /logs/explorer/patterns/
[4]: /logs/explorer/analytics/
[6]: /monitors/types/log/
[7]: /logs/explorer/facets/#the-index-facet
[8]: /logs/live_tail/
[9]: /logs/logs_to_metrics/
[10]: /logs/archives/
[11]: https://app.datadoghq.com/logs/pipelines/indexes
[12]: /logs/search_syntax/
[13]: /api/v1/logs-indexes/#update-an-index
[14]: /logs/log_configuration/processors/#user-agent-parser
[15]: /logs/log_configuration/processors/#geoip-parser
[16]: /tracing/other_telemetry/connect_logs_and_traces/
[17]: /logs/log_configuration/processors/#trace-remapper
[18]: /logs/live_tail/#overview
[19]: https://www.timeanddate.com/worldclock/converter.html
[20]: /logs/guide/best-practices-for-log-management/#monitor-log-usage
[21]: /account_management/org_settings/#out-of-contract-retention-periods-for-log-indexes
