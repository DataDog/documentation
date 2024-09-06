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

Observability Pipelines allows you to collect and process logs, and determine where you want to route them, before they leave your on-premises or cloud environment.

Logs do not all have equal value. For example, error logs are often more useful than info logs for troubleshooting live operations. Production logs are also more important than logs from non-production environments. Routing all of your logs to an indexed solution can dilute the data's overall value and also cause you to exceed your budget.

The following situations can also increase your log volume significantly:

- An application team inadvertently turns on debug logging, and then a new build triggers a flood of errors.
- Teams attempt to add as much performance and metric data into the logs because it's easier than separating the data out.
- Logs contain extra fields and values that are never used.

This guide walks you through strategies on reducing your log volume using Observability Pipelines' processors, so that you can stay cost-compliant and increase the value of your stored data.

## Strategies for reducing your log volume

Use the following strategies to reduce your log volume:

### Sample your logs

Reduce your overall log volume by dropping a percentage of high-volume logs that you know are repetitive, noisy, or less valuable. Use the [sample processor][1] to match a subset of logs based on the filter query and keep only the percentage of logs you've specified. This provide you a representative view of high volume log streams, while maintaining visibility and the ability for analysis.

### Filter your logs

Not all logs are valuable and need to be stored. For example, keeping hundreds of thousands of debug logs from non-production systems is probably not critical for your organization. Therefore, the simplest strategy to reduce your log volume is to drop those logs and not send them onto your log management solutions. See the [filter processor][2] for more information.

### Drop attributes in your logs

Sometimes logs can contain hundreds of attributes, and often only a small number of attributes are used for investigation and analysis. Reduce the overall size of your logs by dropping unused an non-useful attributes, thus lowering your log ingestion cost. See the [edit fields][3] processor for more information.

### Reduce your logs

Some systems can emit hundreds, if not thousands, of logs per second, many of which can be collapsed into a single event by merging fields together using different strategies. For example, concatenation, summing, creating an array of values, and more. Use the [reduce processor][4] to collapse multiple log events into one based on the selected merge strategy. This reduces the total number of events that get sent to your destination.

### Deduplicate your logs

Deduplicating your logs can help maintain the accuracy and consistency of your data and protect against upstream mistakes that accidentally duplicates your logs. The [deduplication processor][5] compares fields to see if there is identical content and then drops the duplicates, thus reducing the total volume of logs.

### Implement quotas

You can govern and control your logs at different levels using quotas. For example, at a granular level, you can apply a quota limit to specific application logs (`app:xyz`). Or, at a higher level, apply a limit to info logs (`status:info`). This can help you meet budget and usage requirements.

Use the [quota processor][6] to:
1. Define a filter for the logs you are interested in. This could filter for high-level logs, such as for an environment, or scoped down to a specific team. You can also filter using a combination of log attributes.
1. Define the quota in bytes or number of events. You can choose to drop the logs received after the quota has been met, or just be alerted that the limit has been reached so that you can investigate and remediate.

### Route your logs directly to an archive

Route logs directly to your own storage (Amazon S3, Google Cloud Storage, or Azure Storage) in a Datadog-rehydratable format. You can then rehydrate the archive into Datadog on an ad-hoc as-needed basis. See [Archive Logs][7] for more information.

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
[7]:  /observability_pipelines/set_up_pipelines/archive_logs