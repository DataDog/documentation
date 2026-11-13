---
title: Spike Protection Processor
description: Learn how to use the Spike Protection processor to detect unexpected surges in log volume and drop, keep, or route the excess logs.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
The Spike Protection processor is in Preview. Contact your account manager to request access.
{{< /callout >}}

## Overview

The Spike Protection processor detects unexpected surges in log volume and acts on the logs while the spike lasts. Instead of a fixed limit, the processor compares the volume of logs that match its filter against their own volume over the last 24 hours. When the volume is abnormally high, the processor drops the logs, keeps them, or sends them to an overflow destination.

Use this processor to protect your destinations and budget from sudden bursts, such as a service stuck in an error loop or a misconfigured debug log level. To cap volume at a fixed daily limit, use the [Quota processor][1] instead.

**Note**: The Spike Protection processor requires Worker version 2.24.0 or later.

### How spike detection works

1. The processor groups the logs that match its filter by the attributes you select, such as `service` and `status`. Each unique combination of attribute values is tracked separately, with its own baseline.
1. The Workers report the byte volume of each group to Datadog. Datadog computes the average volume and the standard deviation of each group over the last 24 hours, in one-hour intervals.
1. A group is spiking when both of these conditions are true:
    - Its volume is higher than the average by more than the configured number of standard deviations (the spike threshold). The default threshold is 5 standard deviations.
    - Its volume is higher than the configured minimum threshold. The default minimum threshold is 100 GB.
1. While a group is spiking, the processor applies the spike action to the group's logs. Logs from other groups are not affected.
1. After a spike is triggered, it stays active for 12 hours, even if the group's volume returns to normal before then. To stop the spike action earlier, [dismiss the spike](#manage-spikes). After the spike expires, the group is evaluated again against its baseline. If the volume is still abnormally high, a new spike is triggered.

**Notes**:

- A new group needs about five hours of history before a spike can be detected for it.
- Workers synchronize their volumes and the spike state with Datadog about every 15 seconds. A spike can take up to that long to apply to all Workers.

### Limits

- Each pipeline can track up to 1000 groups. The limit applies to the whole pipeline: if the pipeline has more than one Spike Protection processor, the groups of all processors count toward the same limit. When this limit is reached, logs that belong to new groups are handled according to the spike action.

## Setup

To set up the Spike Protection processor:

1. Define a {{< ui >}}filter query{{< /ui >}}. Only logs that match the specified filter query are evaluated for spikes. See [Search Syntax][3] for more information.
    - Logs that match the filter query and are not part of a spiking group are sent to the next step in the pipeline.
    - Logs that do not match the filter query are sent to the next step in the pipeline.
1. Click {{< ui >}}Configure spike groups{{< /ui >}}.
1. In the {{< ui >}}Group by attributes{{< /ui >}} field, select or enter up to five attributes to group logs by. The default attributes are `service` and `status`. If you don't select any attributes, the processor tracks all matching logs as a single group. See [Group by example](#group-by-example) for more information.
1. Leave {{< ui >}}Always keep error logs{{< /ui >}} enabled to never drop or reroute logs with a `status` of `error`, `critical`, `alert`, or `emergency`, even during a spike. This option requires `status` to be one of the group-by attributes.
1. (Optional) In the {{< ui >}}Spike threshold{{< /ui >}} field, enter the number of standard deviations above the average that counts as a spike. Defaults to `5`. Use a lower value to detect smaller spikes.
1. (Optional) In the {{< ui >}}Minimum threshold{{< /ui >}} field, enter the volume below which spikes are not detected, and select the unit. Defaults to 100 GB.
1. If you selected group-by attributes, select what to do with {{< ui >}}Logs missing a group-by attribute{{< /ui >}}:
    - {{< ui >}}Group into a single default bucket{{< /ui >}}: Track all logs that are missing one or more of the attributes as a single group.
    - {{< ui >}}Ignore (never treated as a spike){{< /ui >}}: Send logs that are missing one or more of the attributes to the next step in the pipeline without evaluating them.
1. In the {{< ui >}}Where to route a spike{{< /ui >}} dropdown menu, select what to do with the logs of a spiking group:
    - {{< ui >}}Drop events{{< /ui >}}: Drop the logs.
    - {{< ui >}}Keep (route to destination){{< /ui >}}: Send the logs to the next step in the pipeline. Use this option to monitor spikes without acting on them.
    - {{< ui >}}Send to overflow destination{{< /ui >}}: Send the logs to an overflow destination. An overflow destination is added with the following cloud storage options: **Amazon S3**, **Azure Blob**, and **Google Cloud**. See the setup instructions for your cloud storage: [Amazon S3][4], [Azure Blob Storage][5], or [Google Cloud Storage][6].
1. Click {{< ui >}}Done{{< /ui >}}.

### Group by example

If you group logs by `service` and `status`, the processor tracks a separate baseline for each combination of values, such as `service:checkout` with `status:info` and `service:checkout` with `status:error`. If the `checkout` service starts sending 50 times more `info` logs than usual, only the `service:checkout` and `status:info` group is spiking. The processor keeps sending the `checkout` service's `error` logs and the logs from all other services to the next step in the pipeline.

## Manage spikes

After you deploy the pipeline, you can view and manage the spikes for each group:

1. Navigate to the pipeline and click the Spike Protection processor.
1. Click {{< ui >}}Manage spikes{{< /ui >}}.
1. In the {{< ui >}}Spike Details{{< /ui >}} tab, the table lists the tracked groups with their status and the time the current spike started. A group's status is one of the following:
    - {{< ui >}}Active{{< /ui >}}: The group is spiking and the spike action applies to its logs.
    - {{< ui >}}Dismissed{{< /ui >}}: The spike was dismissed. The spike action does not apply to the group's logs until the spike expires.
    - {{< ui >}}Not triggered{{< /ui >}}: The group is not spiking.
1. Click a group to see its graphs:
    - {{< ui >}}Bucket volume{{< /ui >}}: The byte volume the group is receiving. Use it to see how close the group is to spiking.
    - {{< ui >}}Events spike protected{{< /ui >}}: The number of logs the processor acted on while the group was spiking.

You can take the following actions on a spiking group:

- {{< ui >}}Dismiss{{< /ui >}}: Stop applying the spike action to the group right away, for example, if the volume increase is expected. The group stays unprotected until the current spike expires, even if its volume is still above the baseline.
- {{< ui >}}Delete{{< /ui >}}: Remove the spike event. The group goes back to being evaluated against its baseline, and can spike again as soon as its volume is above the threshold.

## Health metrics

For [component metrics][7] and [processor buffer metrics][8] emitted by all processors, see the [Pipelines Usage Metrics][9] documentation.

### Spike Protection metrics

`pipelines.spike_protection_triggered_events_total`
: **Description**: The number of events received while their group was spiking. Use the `spike_name` and `partition` tags to filter or group by spike protection processor and group.
: **Metric type**: count

`pipelines.spike_protection_bucket_event_bytes_total`
: **Description**: The size, in bytes, of events evaluated for each group. Use the `spike_name` and `partition` tags to filter or group by spike protection processor and group.
: **Metric type**: count

`pipelines.spike_protection_overflow_destination_sent_events_total`
: **Description**: The number of events routed to the overflow destination. The `reason` tag is `spike_active` for events from a spiking group and `too_many_buckets` for events from new groups after the group limit is reached.
: **Metric type**: count

`pipelines.spike_protection_buckets_count`
: **Description**: The number of groups tracked in the pipeline.
: **Metric type**: gauge

`pipelines.spike_protection_buckets_usage`
: **Description**: The number of groups tracked in the pipeline as a percentage of the group limit, value ranges from `0` to `100`.
: **Metric type**: gauge

[1]: /observability_pipelines/processors/quota/
[3]: /observability_pipelines/search_syntax/logs/
[4]: /observability_pipelines/destinations/datadog_archives/
[5]: /observability_pipelines/destinations/azure_storage/
[6]: /observability_pipelines/destinations/google_cloud_storage/
[7]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[9]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
