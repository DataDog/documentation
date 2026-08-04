---
title: Reduce Processor
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

The reduce processor groups multiple log events into a single log, based on the fields specified and the merge strategies selected. Logs are grouped at 10-second intervals. After the interval has elapsed for the group, the reduced log for that group is sent to the next step in the pipeline.

## Setup

To set up the reduce processor:
1. Define a {{< ui >}}filter query{{< /ui >}}. Only logs that match the specified filter query are processed. Reduced logs and logs that do not match the filter query are sent to the next step in the pipeline. See [Search Syntax][1] for more information.
2. In the {{< ui >}}Group By{{< /ui >}} section, enter the field you want to group the logs by.
3. Click {{< ui >}}Add Group by Field{{< /ui >}} to add additional fields.
4. In the {{< ui >}}Merge Strategy{{< /ui >}} section:
   - In {{< ui >}}On Field{{< /ui >}}, enter the name of the field you want to merge the logs on.
   - Select the merge strategy in the {{< ui >}}Apply{{< /ui >}} dropdown menu. This is the strategy used to combine events. See the [Merge strategies](#merge-strategies) section for descriptions of the available strategies.
   - Click {{< ui >}}Add Merge Strategy{{< /ui >}} to add additional strategies.

### Merge strategies

These are the available merge strategies for combining log events.


| Name           | Description                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| Array          | Appends each value to an array.                                                                                    |
| Concat         | Concatenates each string value, delimited with a space.                                                            |
| Concat newline | Concatenates each string value, delimited with a newline.                                                          |
| Concat raw     | Concatenates each string value, without a delimiter.                                                               |
| Discard        | Discards all values except the first value that was received.                                                      |
| Flat unique    | Creates a flattened array of all unique values that were received.                                                 |
| Longest array  | Keeps the longest array that was received.                                                                         |
| Max            | Keeps the maximum numeric value that was received.                                                                 |
| Min            | Keeps the minimum numeric value that was received.                                                                 |
| Retain         | Discards all values except the last value that was received. Works as a way to coalesce by not retaining \`null\`. |
| Shortest array | Keeps the shortest array that was received.                                                                        |
| Sum            | Sums all numeric values that were received.                                                                        |

## Metrics

For [component metrics][2] and [processor buffer metrics][3] emitted by all processors, see the [Pipelines Usage Metrics][4] documentation.

### Reduce metrics

- Use the `component_id` tag to filter or group by individual components.
- The `component_type` tag is `reduce` for these metrics.

`pipelines.stale_events_flushed_total`
: **Description**: The number of stale events that the processor has flushed.
: **Metric type**: count

[1]: /observability_pipelines/search_syntax/logs/
[2]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
