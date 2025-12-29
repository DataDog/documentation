---
title: Logs Troubleshooting
---

If you experience unexpected behavior with Datadog Logs, there are a few common issues you can investigate and this guide may help resolve issues quickly. If you continue to have trouble, reach out to [Datadog support][1] for further assistance.

## Missing logs - data access restrictions

You cannot see any logs in the [Log Explorer][2] or [Live Tail][3]. This may be happening because your role is part of a restriction query.

If you are unable to access your Restriction Queries in Datadog, please contact your Datadog Administrator to verify if your role is affected.

See [Check Restrictions Queries][4] for more information on configuring Logs RBAC data access controls.

Furthermore, Legacy Permissions can also affect the ability to see Logs, particularly in the [Log Explorer][2] . You may find yourself unable to view logs from certain indexes, or only one index at a time. See [Legacy Permissions][10] for more information on how these can be applied to your role and organisation.

## Missing logs - logs daily quota reached

You have not made any changes to your log configuration, but the [Log Explorer][2] shows that logs are missing for today. This may be happening because you have reached your daily quota.

{{< img src="logs/troubleshooting/daily_quota_reached.png" alt="A bar graph showing missing logs and a message saying daily quota reached" style="width:90%" >}}

See [Set daily quota][5] for more information on setting up, updating or removing the quota.

If you are unsure whether or when a daily quota has been reached historically, you can verify this in the Event Explorer by searching through the tag datadog_index:{index_name}.

{{< img src="logs/troubleshooting/daily_quota_event.png" alt="An event explaining the time at which a daily quota was reached" style="width:90%" >}}

## Missing logs - timestamp outside of the ingestion window

Logs with a timestamp further than 18 hours in the past are dropped at intake.
Fix the issue at the source by checking which `service` and `source` are impacted with the `datadog.estimated_usage.logs.drop_count` metric.

## Missing logs - timestamp not aligned with timezone

By default, Datadog parses all epoch timestamps in Logs with the default timezone set as UTC.
If logs are arriving with timestamps ahead or behind this time, you may see logs shifted by the number of hours from UTC that the timezone is set to.

To adjust the timezone of the logs during processing, please refer to the footnotes in Datadog's [Parsing][11] guide in using the timezone parameter as part of the date matcher.
Epoch timestamps can be adjusted using the timezone parameter in a Grok Parser processor to adjust localizations.

Follow these steps to convert a timestamp localization to UTC using the steps from the example provided using Datadog's [Grok Parser]

1. Navigate to the [Pipelines][9] page.

2. In **Pipelines**, select the correct pipeline matching to your logs (example here?)

3. Open the Grok Parser processor that is parsing your logs.

4. Given that a local host is logging in UTC+1, we want to adjust the date matcher to account for this difference. The result is that we are adding a comma, and a new string defining the timezone to UTC+1.

5. Ensure that the [Log Date Remapper][8] is using the parsed attribute as the official timestamp for the matching logs.

Go to the [Log Explorer][2] to see the logs now appearing in line with their original timestamp.


## Unable to parse timestamp key from JSON logs

By default, Datadog expects timestamp attributes to be configured to a recognised date format. The recognised formats are ISO8601, UNIX (the milliseconds EPOCH format), and RFC3164.

Timestamps similar to but not matching this format may still be dropped even if similar in nature, such as the nanoseconds EPOCH format.

If you are unable to convert the timestamp of JSON logs to a [recognized date format][6] before they are ingested into Datadog, follow these steps to convert and map the timestamps using Datadog's [arithmetic processor][5] and [log date remapper][6]:

1. Navigate to the [Pipelines][9] page.

2. In **Pipelines**, hover over **Preprocessing for JSON logs**, and click the pencil icon.

3. Remove `timestamp` from the reserved attribute mapping list. The attribute is not being parsed as the official timestamp of the log during preprocessing.

{{< img src="logs/troubleshooting/preprocessing_json_timestamp.png" alt="The preprocessing for JSON logs configuration box with the date attributes, which includes timestamp by default" style="width:90%" >}}

2. Set up the [arithmetic processor][7] so that the formula multiplies your timestamp by 1000 to convert it to milliseconds. The formula's result is a new attribute.

3. Set up the [log date remapper][8] to use the new attribute as the official timestamp.

Go to [Log Explorer][2] to see new JSON logs with their mapped timestamp.

## Truncated logs

Logs above 1MB are truncated. Fix the issue at the source by checking which `service` and `source` are impacted with the `datadog.estimated_usage.logs.truncated_count` and `datadog.estimated_usage.logs.truncated_bytes` metrics.

## Truncated log messages

There is an additional truncation in fields that applies only to indexed logs: the value is truncated to 75 KiB for the message field and 25 KiB for non-message fields. Datadog stores the full text, and it remains visible in regular list queries in the Log Explorer. However, the truncated version is displayed when performing a grouped query, such as when grouping logs by that truncated field or performing similar operations that display that specific field.

## Logs present in Live Tail, but missing from Logs Explorer

[Logging Without Limits™][14] allows decoupling of log ingestion and indexation, to allow you to save what logs matter most to your organisation. However, when Exclusion Filters are applied to indexes, coverage that is too broad can cause more logs to be excluded than in the intended result.

Make sure to heavily check exclusion filters and index filters. Parsed JSON logs and unparsed logs may match unexpectedly on index filters, especially when using free text search to match on logs to exclude small strings in logs from indexation. This can cause the entire log, which may have other valuable information, to be dropped from indexing. You can read more about the difference between full text and free text search in [Search Syntax][12].

## Estimated Usage Metrics

If Logs do not appear to be indexed, or at a smaller or higher rate than expected, check Estimated Usage Metric volumes to verify 

Tag such as `datadog_index`, `datadog_is_excluded`, `service` and `status` are available, depending on the metric, for filtering your query down to specific reserved attributes such as `service` and `status`. You can then also filter metrics such as `datadog.estimated_usage.logs.ingested_events` by whether they are excluded, and the specific index that is either indexing the log, or excluding the log based on filters.

If a datadog_index tag is presented as N/A for a metric datapoint, the log for that datapoint does not match any of the indexes in your organisation. Consider the order and filter queries of your indexes, if they may be excluding certain types of logs. Estimated Usage Metrics do not respect [Daily Quotas][13].

## Create a support ticket
If the above troubleshooting steps do not resolve your issues with missing logs in Datadog, create a [support ticket][15]. If possible, include the following information in your support ticket:

### Raw Log
To collect a raw log, collect the log directly from the source that is generating the log, dependent on your architecture or logger setup.
Attach the log either as a text file, or as JSON directly to your support ticket.

###
If the log appears in the Live Tail, but is not appearing in the Log Explorer, please share the result of the call to the [Get All Indexes][16] API endpoint in your support ticket.
- If you have a large number of indexes in your organisation, please be sure to check estimated usage metrics using the steps above to verify if possible, which 
- Then, you can use the [Get an Index][17] API call to return the result for that index, and upload that to the support ticket.

### Upload a Flare
If using the Agent to send logs, and logs are not appearing at all in the Datadog UI, send an [Agent Flare][18] to the support ticket.

[1]: /help/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/logs/livetail
[4]: /logs/guide/logs-rbac-permissions/?tab=ui#check-restriction-queries
[5]: /logs/log_configuration/indexes/#set-daily-quota
[6]: /logs/log_configuration/pipelines/?tab=date#date-attribute
[7]: /logs/log_configuration/processors/?tab=ui#arithmetic-processor
[8]: /logs/log_configuration/processors/?tab=ui#log-date-remapper
[9]: https://app.datadoghq.com/logs/pipelines
[10]: /logs/guide/logs-rbac-permissions/?tab=ui#legacy-permissions
[11]: /logs/log_configuration/parsing/?tab=matchers#parsing-dates
[12]: /logs/explorer/search_syntax/#full-text-search
[13]: /logs/log_configuration/indexes/#set-daily-quota
[14]: /logs/guide/getting-started-lwl/
[15]: https://help.datadoghq.com/hc/en-us/requests/new
[16]: https://docs.datadoghq.com/api/latest/logs-indexes/#get-an-index
[17]: https://docs.datadoghq.com/api/latest/logs-indexes/#get-an-index
[18]: https://docs.datadoghq.com/agent/troubleshooting/send_a_flare/?tab=agent