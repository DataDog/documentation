---
title: Filter Processor
disable_toc: false
further_reading:
- link: "/getting_started/search/"
  tag: "Documentation"
  text: "Getting Started with Search in Datadog"
- link: /logs/explorer/search_syntax/
  tag: "Documentation"
  text: Log Management Search Syntax
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
- name: Traces
  icon: apm
  url: /observability_pipelines/configuration/?tab=traces#pipeline-types
---

{{< product-availability >}}

## Overview

This processor sends all logs, metrics, or {{< tooltip text="traces" tooltip="Contact your account manager to request access." >}} that match the filter query to the next step in the pipeline. Events that do not match the filter query are dropped and are not sent to any subsequent processors or destinations.

**Note**: For all other processor queries, events that don't match the query are sent to the subsequent step in the pipeline. They are not dropped.

## Setup

To set up the filter processor:

- Define a {{< ui >}}filter query{{< /ui >}}. See [Logs Search Syntax][1], [Metrics Search Syntax][2], or [APM Query Syntax][6] for more information.
  - Events that match the query are sent to the next component.
  - Events that don't match the query are dropped.

### Filter out custom metrics in metrics pipelines

For metrics pipelines, you can search for and {{< tooltip text="filter out custom metrics" tooltip="Contact your account manager to request access." >}} that have not been queried in the selected time frame.

1. Click {{< ui >}}Select Unused Metrics to Filter{{< /ui >}} in the Filter processor.
1. Select the time frame in the dropdown menu to check metric queries against. For example, if you select `90d`, the Worker looks for metrics that have not been queried in the last 90 days.
1. In the {{< ui >}}Asset usage{{< /ui >}} dropdown menu, select whether to find metrics used in assets, such as dashboards and monitors.
1. In the list of metrics found:
    - Check the {{< ui >}}Vol/Mo{{< /ui >}} column to see the metric's monthly ingested volume for the entire organization. **Note**: The volume is not for this specific pipeline.
    - Check the {{< ui >}}Origin{{< /ui >}} column to see which product sent the custom metric.
    - In the {{< ui >}}Asset Usage{{< /ui >}} column, hover over the asset usage total for a metric to see which assets are using that metric. Click on an asset to go to that asset.
    - In the search bar, enter a metric name to find it in the list.
1. Select the custom metrics in the list to filter them out. The selected metrics are added to the {{< ui >}}Filter query{{< /ui >}} field.
1. Click {{< ui >}}Save Filters{{< /ui >}}.

## Health metrics

For [component metrics][3] and [processor buffer metrics][4] emitted by all processors, see the [Pipelines Usage Metrics][5] documentation. To filter or group by Filter processor metrics, use the tag `component_type:opw_filter`.

[1]: /observability_pipelines/search_syntax/logs
[2]: /observability_pipelines/search_syntax/metrics
[3]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[6]: /tracing/trace_explorer/query_syntax/


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
