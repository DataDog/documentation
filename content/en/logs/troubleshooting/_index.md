---
title: Logs Troubleshooting
---

If you experience unexpected behavior with Datadog Logs, there are a few common issues you can investigate and this guide may help resolve issues quickly. If you continue to have trouble, reach out to [Datadog support][1] for further assistance.

## Missing logs - data access restrictions

You cannot see any logs in the [Log Explorer][2] or [Live Tail][3]. This may be happening because your role is part of a restriction query.

If you are unable to access your Restriction Queries in Datadog, contact your Datadog Administrator to verify if your role is affected.

See [Check Restrictions Queries][4] for more information on configuring Logs RBAC data access controls.

**Legacy Permissions** can also restrict access to Logs, particularly in the [Log Explorer][2]. Depending on configuration, access may be limited to specific indexes or to a single index at a time. For more information on how Legacy Permissions are applied at the role and organization level, see [Legacy Permissions][10].

## Missing logs - logs daily quota reached

You have not made any changes to your log configuration, but the [Log Explorer][2] shows that logs are missing for today. This may be happening because you have reached your daily quota.

{{< img src="logs/troubleshooting/daily_quota_reached.png" alt="A bar graph showing missing logs and a message saying daily quota reached" style="width:90%" >}}

See [Set daily quota][5] for more information on setting up, updating or removing the quota.

To verify if a daily quota has been reached historically, you can search in the Event Explorer with the tag `datadog_index:{index_name}`.

{{< img src="logs/troubleshooting/daily_quota_event.png" alt="An event explaining the time at which a daily quota was reached" style="width:90%" >}}

## Missing logs - timestamp outside of the ingestion window

Logs with a timestamp further than 18 hours in the past are dropped at intake.
Fix the issue at the source by checking which `service` and `source` are impacted with the `datadog.estimated_usage.logs.drop_count` metric.

## Missing logs - timestamp not aligned with timezone

By default, Datadog parses all epoch timestamps in Logs using UTC. If incoming logs use a different timezone, timestamps may appear shifted by the corresponding offset from UTC. For example, if logs are sent from New York (EST -5), they may appear 5 hours in the past, or if logs are sent from Australia (AEST +10), they may appear 10 hours ahead of the expected time frame.

To adjust the timezone of the logs during processing, see the footnotes in Datadog's [Parsing][11] guide on using the `timezone` parameter with the date matcher.
Epoch timestamps can be adjusted using the timezone parameter in a Grok Parser processor to adjust localizations.

Epoch timestamps can be adjusted using the `timezone` parameter in a Grok Parser processor. Follow these steps to convert a localized timestamp to UTC using the example in Datadog’s [Grok Parser][19] guide.

1. Navigate to the [Pipelines][9] page.
2. In **Pipelines**, select the correct pipeline matching to your logs.
3. Open the Grok Parser processor that is parsing your logs.
4. Given that a local host is logging in UTC+1, adjust the date matcher to account for this difference. The resulting rule will have a comma and a new string defining the timezone to UTC+1.
5. Verify that the [Log Date Remapper][8] is using the parsed attribute as the official timestamp for the matching logs.

Go to the [Log Explorer][2] and verify that the logs appear in line with their original timestamp.


## Unable to parse timestamp key from JSON logs

Datadog requires timestamp attributes to use one of the supported date formats:
- ISO8601
- UNIX (the milliseconds EPOCH format)
- RFC3164

Timestamps that do not exactly match these formats may be dropped, even if they are similar (for example, epoch timestamps in nanoseconds).

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

[Logging Without Limits™][14] decouples log ingestion from indexing, allowing you to retain the logs that matter most. When exclusion filters applied to indexes are too broad, they may exclude more logs than intended.

Review both exclusion filters and index filters carefully. Parsed and unparsed JSON logs can match index filters in unexpected ways, particularly when free-text search is used to exclude short strings. This can result in entire logs being dropped from indexing, even when they contain other valuable data. For details on the differences between full-text and free-text search, see [Search Syntax][12].

## Estimated Usage Metrics

If Logs do not appear to be indexed, or at a smaller or higher rate than expected, check Estimated Usage Metric volumes in your [Log Management dashboard][20].

Depending on the metric, tags such as `datadog_index`, `datadog_is_excluded`, `service,` and `status` are available for filtering. Use these tags to filter metrics such as `datadog.estimated_usage.logs.ingested_events` by exclusion status and by the index that is indexing or excluding the logs.

If the `datadog_index` tag is set to `N/A` for a metric datapoint, the corresponding logs do not match any index in your organization. Review index order and filter queries to identify potential exclusions.

**Note**: Estimated Usage Metrics do not respect [Daily Quotas][13].

## Create a support ticket
If the above troubleshooting steps do not resolve your issues with missing logs in Datadog, create a [support ticket][15]. If possible, include the following information:

| Information | Description |
|------------|-------------|
| **Raw log sample** | Collect the log directly from the source generating it, based on your architecture or logger configuration. Attach the log to the support ticket as a **text file** or **raw JSON**. |
| **Indexes configuration** | If the log appears in Live Tail but not in the Log Explorer, include the response from the [Get All Indexes][16] API call. If your organization has many indexes, review Estimated Usage Metrics to identify the relevant index, then include the response from the [Get an Index][17] API call for that index. |
| **Agent flare** | If logs are sent using the Agent and do not appear anywhere in the Datadog UI, submit an [Agent Flare][18] with the support ticket. |
| **Other sources** | If logs are sent using a source other than the Agent, include details on the originating source of the logs (for example, Lambda Forwarder or Kinesis Firehose). |


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
[16]: /api/latest/logs-indexes/#get-an-index
[17]: /api/latest/logs-indexes/#get-an-index
[18]: /agent/troubleshooting/send_a_flare/?tab=agent
[19]: /logs/log_configuration/processors/?tab=ui#grok-parser
[20]: https://app.datadoghq.com/dashboard/lists/preset/3?q=Log%20Management%20estimated%20usage&p=1