---
title: Logs Troubleshooting
---

If you experience unexpected behavior with Datadog Logs, there are a few common issues you can investigate and this guide may help resolve issues quickly. If you continue to have trouble, reach out to [Datadog support][1] for further assistance.

## Missing logs - data access restrictions

You cannot see any logs in the [Log Explorer][2] or [Live Tail][3]. This may be happening because your role is part of a restriction query.

See [Check Restrictions Queries][4] for more information on configuring Logs RBAC data access controls.

## Missing logs - logs daily quota reached

You have not made any changes to your log configuration, but the [Log Explorer][2] shows that logs are missing for today. This may be happening because you have reached your daily quota.

{{< img src="logs/troubleshooting/daily_quota_reached.png" alt="A bar graph showing missing logs and a message saying daily quota reached" style="width:90%" >}}

See [Set daily quota][5] for more information on setting up, updating or removing the quota.

## Missing logs - timestamp outside of the ingestion window

Logs with a timestamp further than 18 hours in the past are dropped at intake.
Fix the issue at the source by checking which `service` and `source` are impacted with the `datadog.estimated_usage.logs.drop_count` metric.

## Unable to parse timestamp key from JSON logs

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

[1]: /help/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/logs/livetail
[4]: /logs/guide/logs-rbac-permissions/?tab=ui#check-restriction-queries
[5]: /logs/log_configuration/indexes/#set-daily-quota
[6]: /logs/log_configuration/pipelines/?tab=date#date-attribute
[7]: /logs/log_configuration/processors/?tab=ui#arithmetic-processor
[8]: /logs/log_configuration/processors/?tab=ui#log-date-remapper
[9]: https://app.datadoghq.com/logs/pipelines
