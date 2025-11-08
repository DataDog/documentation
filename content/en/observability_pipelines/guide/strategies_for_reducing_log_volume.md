---
title: Strategies for Reducing Log Volume
disable_toc: false
further_reading:
- link: "/observability_pipelines/set_up_pipelines"
  tag: "documentation"
  text: "Set up a pipeline"
- link: "/observability_pipelines/processors/"
  tag: "documemtation"
  text: "Observability Pipelines processors"
---

## Overview

Observability Pipelines allows you to collect and process logs, as well as determine where you want to route them, all before the data leaves your on-premises or cloud environment.

Logs are not equal value. For example, error logs are often more useful than info logs when troubleshooting live operations. Logs from production environments are also more important than logs from non-production environments. Therefore, routing all of your logs to an indexed solution can dilute the overall value of your data and cause you to exceed your budget.

The following situations can also unnecessarily increase your log volume and cost:

- An application team inadvertently turns on debug logging.
- You ship a new build with an error loop condition that triggers a flood of errors.
- Teams attempt to add as much performance and metric data into the logs because it seems easier than implementing other telemetry solutions.
- Logs contain extra fields and values that are never used.

This guide walks you through strategies on how to reduce your log volume using Observability Pipelines' processors, so that you can stay cost-compliant and increase the value of your stored data.

## Strategies for reducing your log volume

Follow these strategies to reduce your log volume:

### Sample your logs

Reduce your overall log volume by dropping a percentage of high-volume logs that you know are repetitive, noisy, or less valuable. Use the [sample processor][1] to match a subset of logs based on the filter query and keep only the percentage of logs you've specified. This provides you a representative view of high volume log streams, while maintaining visibility and the ability for analysis.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/sample_example.png" alt="A sample processor that retains 50% of logs that match the filter query for http.status_code:200 and http.method:GET" style="width:100%;" >}}

### Filter your logs

Not all logs are valuable and need to be stored. For example, keeping debug logs from non-production systems is likely not critical for your organization. Therefore, use the [filter processor][2] to drop those logs, so they do not get sent to your log management solutions.

### Drop attributes in your logs

Logs can contain hundreds of attributes, and often only a small number of attributes are used for investigation and analysis. Use the [edit fields][3] processor to reduce the overall size of your logs by dropping unused or unuseful attributes, which lowers your log ingestion cost.

### Reduce your logs

Systems can emit hundreds, if not thousands, of logs per second. Collapse these logs into a single event by merging fields using different strategies, such as concatenation, summing, creating an array of the values, and more. Use the [reduce processor][4] to collapse multiple log events into one event, based on the selected merge strategy. This reduces the total number of events that get sent to your destination.

### Deduplicate your logs

Deduplicating your logs can help maintain the accuracy and consistency of your data and protect against upstream mistakes that accidentally duplicates your logs. Use the [deduplication processor][5] to compare fields and see if there is identical content and then drop the duplicates, thus reducing your total log volume.

### Implement quotas

Govern and control your logs at different levels using quotas. For example, at a granular level, you can apply a quota limit to specific application logs (`app:xyz`) or, at a higher level, apply a limit to info logs (`status:info`). This can help you meet budget and usage requirements.

Use the [quota processor][6] to:
1. Define a filter for the logs you are interested in. This could filter logs at a high level, such as for an environment or at a more granular level like for a specific team. You can also filter using a combination of log attributes.
1. Define a quota based on the number of bytes or events. You can choose to drop the logs received after the quota has been met, or just be alerted that the limit has been reached so that you can investigate and remediate.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/quota_example.png" alt="A quota processor with a filter query for http.status_code:200 and a limit set to 1 TB per day" style="width:100%;" >}}

### Route your logs directly to an archive

Route logs directly to your own cloud storage (Amazon S3, Google Cloud Storage, or Azure Storage) in a Datadog-rehydratable format. You can then rehydrate the archive into Datadog on an as-needed basis. See [Archive Logs][7] for more information.

## Strong candidates for log volume reduction strategies

Users have implemented the above strategies to reduce their overall log volumes. The following list is an example of log sources that are strong candidates for using log reduction strategies:

- CDN
- VPC and network flow
- Web server activity
- Load balancers
- CI/CD services
- Control planes
- Service Mesh
- Firewalls
- Network appliances
- DNS
- Debug logs
- Audit logs
- Non-production environment logs

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/processors/sample
[2]: /observability_pipelines/processors/filter
[3]: /observability_pipelines/processors/edit_fields
[4]: /observability_pipelines/processors/reduce
[5]: /observability_pipelines/processors/dedupe
[6]: /observability_pipelines/processors/quota
[7]:  /observability_pipelines/configuration/set_up_pipelines/archive_logs