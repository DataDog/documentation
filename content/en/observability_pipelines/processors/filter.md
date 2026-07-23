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
---

{{< product-availability >}}

## Overview

This processor sends all logs or metrics that match the filter query to the next step in the pipeline. Logs or metrics that do not match the filter query are dropped and are not sent to any subsequent processors or destinations. **Note**: For all other processor queries, logs or metrics that don't match the query are sent to the subsequent step in the pipeline. They are not dropped.

## Setup

To set up the filter processor:

- Define a {{< ui >}}filter query{{< /ui >}}.<br>**Notes**:
  - Logs or metrics that match the query are sent to the next component.
  - Logs or metrics that don't match the query are dropped.
  - For more information, see [Search Syntax for Logs][1] or [Search Syntax for Metrics][2].

## Metrics

For [component metrics][3] and [processor buffer metrics][4] emitted by all processors, see the [Pipelines Usage Metrics][5] documentation. To filter or group by Filter processor metrics, use the tag `component_type:opw_filter`.

[1]: /observability_pipelines/search_syntax/logs
[2]: /observability_pipelines/search_syntax/metrics
[3]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
