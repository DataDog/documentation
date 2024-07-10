---
title: Logs Troubleshooting
---

If you experience unexpected behavior with Datadog Logs, there are a few common issues you can investigate and this guide may help resolve issues quickly. If you continue to have trouble, reach out to [Datadog support][1] for further assistance.

## Missing logs - logs daily quota reached

You have not made any changes to your log configuration, but the [Logs Explorer][2] shows that logs are missing for today. This may be happening because you have reached your daily quota.

{{< img src="logs/troubleshooting/daily_quota_reached.png" alt="A bar graph showing missing logs and a message saying daily quota reached" style="width:90%" >}}

See [Set daily quota][3] for more information on setting up, updating or removing the quota.

## Missing logs - timestamp outside of the ingestion window

Logs with a timestamp further than 18 hours in the past are dropped at intake.
Fix the issue at the source by checking which `service` and `source` are impacted with the `datadog.estimated_usage.logs.drop_count` metric.

## Unable to parse timestamp key from JSON logs

If you are unable to convert the timestamp of JSON logs to a [recognized date format][4] before they are ingested into Datadog, follow these steps to convert and map the timestamps using Datadog's [arithmetic processor][5] and [log date remapper][6]:

1. Navigate to the [Pipelines][7] page.

2. In **Pipelines**, hover over **Preprocessing for JSON logs**, and click the pencil icon.

3. Remove `timestamp` from the reserved attribute mapping list. The attribute is not being parsed as the official timestamp of the log during preprocessing.

{{< img src="logs/troubleshooting/preprocessing_json_timestamp.png" alt="The preprocessing for JSON logs configuration box with the date attributes, which includes timestamp by default" style="width:90%" >}}

2. Set up the [arithmetic processor][5] so that the formula multiples your timestamp by 1000 to convert it to milliseconds. The formula's result is a new attribute.

3. Set up the [log date remapper][6] to use the new attribute as the official timestamp.

Go to [Logs Explorer][2] to see new JSON logs with their mapped timestamp.

## Truncated logs

Logs above 1MB are truncated.
Fix the issue at the source by checking which `service` and `source` are impacted with the `datadog.estimated_usage.logs.truncated_count` and `datadog.estimated_usage.logs.truncated_bytes` metrics.

[1]: /help/
[2]: https://app.datadoghq.com/logs
[3]: /logs/log_configuration/indexes/#set-daily-quota
[4]: /logs/log_configuration/pipelines/?tab=date#date-attribute
[5]: /logs/log_configuration/processors/?tab=ui#arithmetic-processor
[6]: /logs/log_configuration/processors/?tab=ui#log-date-remapper
[7]: https://app.datadoghq.com/logs/pipelines
