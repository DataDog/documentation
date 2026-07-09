---
title: Quota Processor
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

The quota processor measures the logging traffic for logs that match the filter you specify. It uses a fixed 24-hour window that resets at midnight UTC. When the configured daily quota is met inside the window, the processor can either keep or drop additional logs, or send them to a storage bucket. For example, you can configure this processor to drop new logs or trigger an alert without dropping logs after the processor has received 10 million events from a certain service in the last 24 hours.

You can also use field-based partitioning, such as `service`, `env`, `status`. Each unique fields uses a separate quota bucket with its own daily quota limit. See [Partition example](#partition-example) for more information.

**Note**: The pipeline uses the name of the quota to identify the same quota across multiple Remote Configuration deployments of the Worker.

### Limits

- Each pipeline can have up to 1000 buckets. If you need to increase the bucket limit, [contact support][5].
- The quota processor is synchronized across all Workers in a Datadog organization. For the synchronization, there is a default rate limit of 100 Workers per organization (300 for worker versions 2.16+). When there are more than this limit of Workers for an organization:
    - The processor continues to run, but does not sync correctly with the other Workers, which can result in logs being sent after the quota limit has been reached.
    - The Worker prints `Failed to sync quota state` errors.
    - [Contact support][5] if you want to increase the default number of Workers per organization.
- The quota processor periodically synchronizes counts across Workers a few times per minute. The limit set on the processor can therefore be overshot, depending on the number of Workers and the logs throughput. Datadog recommends setting a limit that is at least one order of magnitude higher than the volume of logs that the processor is expected to receive per minute. You can use a throttle processor with the quota processor to control these short bursts by limiting the number of logs allowed per minute.

## Setup

To set up the quota processor:
1. Enter a name for the quota processor.
1. Define a {{< ui >}}filter query{{< /ui >}}. Only logs that match the specified filter query are counted towards the daily limit. See [Search Syntax][6] for more information.
    - Logs that match the quota filter and are within the daily quota are sent to the next step in the pipeline.
    - Logs that do not match the quota filter are sent to the next step of the pipeline.
1. In the {{< ui >}}Unit for quota{{< /ui >}} dropdown menu, select if you want to measure the quota by the number of `Events` or by the `Volume` in bytes.
1. Set the daily quota limit and select the unit of magnitude for your desired quota.
1. Optional: Click {{< ui >}}Add Field{{< /ui >}} if you want to set a quota on a specific service or region field.
   1. Enter the field name you want to partition by. See the [Partition example](#partition-example) for more information.
      1. Select the {{< ui >}}Ignore when missing{{< /ui >}} if you want the quota applied only to events that match the partition. See the [Ignore when missing example](#example-for-the-ignore-when-missing-option) for more information.
      1. Optional: Click {{< ui >}}Overrides{{< /ui >}} if you want to set different quotas for the partitioned field.
         - Click {{< ui >}}Download as CSV{{< /ui >}} for an example of how to structure the CSV.
         - Drag and drop your overrides CSV to upload it. You can also click {{< ui >}}Browse{{< /ui >}} to select the file to upload it. See the [Overrides example](#overrides-example) for more information.
   1. Click {{< ui >}}Add Field{{< /ui >}} if you want to add another partition.
1. In the {{< ui >}}When quota is met{{< /ui >}} dropdown menu, select if you want to {{< ui >}}drop events{{< /ui >}}, {{< ui >}}keep events{{< /ui >}}, or {{< ui >}}send events to overflow destination{{< /ui >}}, when the quota has been met.
   1. If you select {{< ui >}}send events to overflow destination{{< /ui >}}, an overflow destination is added with the following cloud storage options: **Amazon S3**, **Azure Blob**, and **Google Cloud**.
   1. Select the cloud storage you want to send overflow logs to. See the setup instructions for your cloud storage: [Amazon S3][2], [Azure Blob Storage][3], or [Google Cloud Storage][4].

### Examples

#### Partition example

Use {{< ui >}}Partition by{{< /ui >}} if you want to set a quota on a specific service or region. For example, if you want to set a quota for 10 events per day and group the events by the `service` field, enter `service` into the {{< ui >}}Partition by{{< /ui >}} field.

#### Example for the "ignore when missing" option

Select {{< ui >}}Ignore when missing{{< /ui >}} if you want the quota applied only to events that match the partition. For example, if the Worker receives the following set of events:

```
{"service":"a", "source":"foo", "message": "..."}
{"service":"b", "source":"bar", "message": "..."}
{"service":"b", "message": "..."}
{"source":"redis", "message": "..."}
{"message": "..."}
```

And the {{< ui >}}Ignore when missing{{< /ui >}} is selected, then the Worker:
- creates a set for logs with `service:a` and `source:foo`
- creates a set for logs with `service:b` and `source:bar`
- ignores the last three events

The quota is applied to the two sets of logs and not to the last three events.

If the {{< ui >}}Ignore when missing{{< /ui >}} is not selected, the quota is applied to all five events.

#### Overrides example

If you are partitioning by `service` and have two services: `a` and `b`, you can use overrides to apply different quotas for them. For example, if you want `service:a` to have a quota limit of 5,000 bytes and `service:b` to have a limit of 50 events, the override rules look like this:

| Service | Type   | Limit |
| ------- | ------ | ----- |
|  `a`    | Bytes  | 5,000 |
|  `b`    | Events | 50    |

[1]: /monitors/types/metric/?tab=threshold
[2]: /observability_pipelines/destinations/datadog_archives/
[3]: /observability_pipelines/destinations/azure_storage/
[4]: /observability_pipelines/destinations/google_cloud_storage/
[5]: /help/
[6]: /observability_pipelines/search_syntax/logs/
