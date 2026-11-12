---
title: Spike Protection Processor
description: Learn how to use the Spike Protection processor to detect unexpected surges in log volume and drop, keep, or route logs in spiking groups.
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

The Spike Protection processor detects unexpected surges in log volume and acts on the logs while the spike lasts. Instead of a fixed limit, the processor compares the current log volume of each group of matching logs to that group's log volume over the last 24 hours. When the volume is abnormally high, the processor applies the configured spike action: it drops the logs, keeps them, or sends them to an overflow destination.

Use this processor to protect your destinations and control costs during sudden bursts of logs, such as when a service is stuck in an error loop or debug logging is misconfigured. To cap volume at a fixed daily limit, use the [Quota processor][1] instead.

**Note**: The Spike Protection processor requires Worker version 2.24.0 or later.

### Limits

Each pipeline can track up to 1,000 log groups. If the pipeline has more than one Spike Protection processor, log groups from all processors count toward the 1,000-group limit. The processor applies the configured spike action to logs that belong to groups created after the limit was reached.

## Setup

To set up the Spike Protection processor:

1. Define a {{< ui >}}filter query{{< /ui >}}. See [Search Syntax][2] for more information.
    - Only logs that match the specified filter query are evaluated for spikes.
    - Logs are sent to the next step in the pipeline if they do not match the filter query or if they match but are not part of a spiking group.
1. Click {{< ui >}}Configure spike groups{{< /ui >}}.
1. In the {{< ui >}}Group by attributes{{< /ui >}} field, select or enter up to five attributes to group logs by. The default attributes are `service` and `status`. If you don't select any attributes, the processor tracks all matching logs as a single group. See the [Group by example](#group-by-example) section for more information.
1. Leave {{< ui >}}Always keep error logs{{< /ui >}} enabled to never drop or reroute logs with a `status` of `error`, `critical`, `alert`, or `emergency`, even during a spike. This option requires `status` to be one of the group-by attributes.
1. (Optional) In the {{< ui >}}Spike threshold{{< /ui >}} field, enter the number of standard deviations above the average that counts as a spike. The default is 5. Use a lower value to detect smaller spikes.
1. (Optional) In the {{< ui >}}Minimum threshold{{< /ui >}} field, enter the volume below which spikes are not detected, and select the unit. The default is 100 GB.
1. If you use group-by attributes, choose how to handle logs that are missing an attribute from the {{< ui >}}Logs missing a group-by attribute{{< /ui >}} dropdown menu:
    - {{< ui >}}Group logs into a single default bucket{{< /ui >}}: Track logs that are missing one or more of the attributes as a single log group.
    - {{< ui >}}Ignore (never treated as a spike){{< /ui >}}: Send logs that are missing one or more of the attributes to the next step in the pipeline without evaluating them.
1. In the {{< ui >}}Where to route a spike{{< /ui >}} dropdown menu, choose what to do with logs in a spiking group:
    - {{< ui >}}Drop events{{< /ui >}}: Drop the logs.
    - {{< ui >}}Keep (route to destination){{< /ui >}}: Send the logs to the next step in the pipeline. Use this option to monitor spikes without acting on them.
    - {{< ui >}}Send to overflow destination{{< /ui >}}: Send the logs to an overflow destination in **Amazon S3**, **Azure Blob Storage**, or **Google Cloud Storage**. See the setup instructions for your cloud storage: [Amazon S3][3], [Azure Blob Storage][4], or [Google Cloud Storage][5].
1. Click {{< ui >}}Done{{< /ui >}}.

### Group by example

If you group logs by `service`, `status`, and `env` the processor tracks a separate baseline for each combination of values, such as:

- `service:checkout` with `env:prod` and `status:info`
- `service:checkout` with `env:prod` and `status:error`
- `service:checkout` with `env:dev` and `status:info`
- `service:checkout` with `env:dev` and `status:error`

If the `checkout` service in the `prod` environment starts sending 50 times more `info` logs than usual, only the `service:checkout`, `env:prod`, and `status:info` group is spiking. The processor continues to send the following logs from all other services to the next step in the pipeline:

- `service:checkout` with `env:prod` and `status:error`
- `service:checkout` with `env:dev` and `status:info`
- `service:checkout` with `env:dev` and `status:error`

## Manage spikes

After you deploy the pipeline, you can view and manage the spikes for each group:

1. Navigate to [Observability Pipelines][7].
1. Select your pipeline and click {{< ui >}}Edit Pipeline{{< /ui >}}.
1. Click the down arrow on the Spike Protection processor to expand it.
1. Click {{< ui >}}Manage spikes{{< /ui >}}.
1. Click the {{< ui >}}Spike Details{{< /ui >}} tab to see tracked log groups, their status, and the time the current spike started. Each group has one of the following statuses:
    - {{< ui >}}Active{{< /ui >}}: The log group is currently spiking and the spike action applies to its logs.
    - {{< ui >}}Dismissed{{< /ui >}}: The spike was dismissed, so the spike action does not apply to the group's logs for the remainder of the spike. A spike stays active for 12 hours after it is first triggered. See [How the processor works](#how-the-processor-works) for more information.
    - {{< ui >}}Not triggered{{< /ui >}}: The log group is not spiking.
1. Click a log group to see its graphs:
    - {{< ui >}}Bucket volume{{< /ui >}}: The byte volume of logs the group is receiving. Use it to see how close the group is to spiking.
    - {{< ui >}}Events spike protected{{< /ui >}}: The number of logs the processor acted on while the group was spiking.

You can take the following actions on a spiking group:

- {{< ui >}}Dismiss{{< /ui >}}: Stop applying the spike action to the log group immediately, such as when the volume increase is expected. The spike action remains disabled for the group until the current spike expires, even if the group's volume remains above the baseline. A spike expires 12 hours after it is first triggered. See [How the processor works](#how-the-processor-works) for more information.
- {{< ui >}}Delete{{< /ui >}}: Remove the spike event. The log group goes back to being evaluated against its baseline and can spike again as soon as its volume is above the threshold.

## Health metrics

See [Processor buffer metrics][6] for more information on metrics emitted by all processors.

### Spike Protection metrics

The following metrics are specific to the Spike Protection processor:

`pipelines.spike_protection_triggered_events_total`
: **Description**: The number of events received while their group was spiking. Use the `spike_name` and `partition` tags to filter or group by Spike Protection processor and group. The `partition` tag values correspond to the configured group-by attributes.
: **Metric type**: count

`pipelines.spike_protection_bucket_event_bytes_total`
: **Description**: The size, in bytes, of events evaluated for each group. Use the `spike_name` and `partition` tags to filter or group by Spike Protection processor and group. The `partition` tag values correspond to the configured group-by attributes.
: **Metric type**: count

`pipelines.spike_protection_overflow_destination_sent_events_total`
: **Description**: The number of events routed to the overflow destination. The `reason` tag has the value:<br>- `spike_active` for events from a spiking group<br>-  `too_many_buckets` for events from new log groups created after the group limit has been reached.
: **Metric type**: count

`pipelines.spike_protection_buckets_count`
: **Description**: The number of groups tracked in the pipeline.
: **Metric type**: gauge

`pipelines.spike_protection_buckets_usage`
: **Description**: The number of groups tracked in the pipeline as a percentage of the group limit. The value ranges from `0` to `100`.
: **Metric type**: gauge

## How the processor works

The Spike Protection processor detects and responds to log volume spikes as follows:

1. The processor groups logs that match its filter by the configured group-by attributes, such as `service` and `status`. Each unique combination of attribute values is tracked separately with its own baseline.
1. For each log group, the Worker computes the average log volume and the standard deviation across one-hour intervals over the previous 24 hours.
1. A group is spiking when both of these conditions are true:
    - The group's log volume is higher than the average by more than the configured number of standard deviations (the spike threshold). The default threshold is 5 standard deviations.
    - The group's log volume is higher than the configured minimum threshold. The default minimum threshold is 100 GB.
1. When a log group is spiking, the processor applies the action selected in {{< ui >}}Where to route a spike{{< /ui >}} to that group's logs. Logs from groups that are not spiking are not affected. See [Group by example](#group-by-example) for more information.
1. After a spike is triggered, it stays active for 12 hours, even if the group's volume returns to baseline before then. To stop the spike action sooner, dismiss the spike. See the [Manage spikes](#manage-spikes) section for more information. A spike expires 12 hours after it is triggered. The processor then evaluates the group against its baseline again. If the volume is still abnormally high, the processor triggers a new spike.

**Notes**:

- A new log group requires approximately 5 hours of history before a spike can be detected for it.
- Workers synchronize their log volumes and the spike state approximately every 15 seconds. As a result, a detected spike can take up to 15 seconds to apply to all Workers.

[1]: /observability_pipelines/processors/quota/
[2]: /observability_pipelines/search_syntax/logs/
[3]: /observability_pipelines/destinations/datadog_archives/
[4]: /observability_pipelines/destinations/azure_storage/
[5]: /observability_pipelines/destinations/google_cloud_storage/
[6]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/?tab=processors#component-metrics
[7]: https://app.datadoghq.com/observability-pipelines
