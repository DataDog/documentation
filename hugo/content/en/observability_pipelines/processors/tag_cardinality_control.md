---
title: Tag Cardinality Control Processor
disable_toc: false
products:
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
---

{{< product-availability >}}

{{< callout url="#"
 btn_hidden="true" header="Join the Preview!">}}
The Tag Cardinality Control processor is in Preview. Contact your account manager to request access.
{{< /callout >}}

## Overview

The Tag Cardinality Control processor limits the number of tag values for each metric. For example, a metric with unbounded tag keys, such as `userID`, can cause the metric's cardinality to spike and impact ingestion and indexing costs. To prevent these unexpected spikes, use the processor to set a cardinality limit for metrics that match the filter query, and either drop metrics received after the limit is reached or drop the tags for those metrics.

Optionally, you can also configure [per-metric overrides](#optional-per-metric-override-settings) to set a limit for a specific metric or to exclude the metric from any cardinality limits. For each per-metric override, you can also set a custom limit for individual tags within the metric, or exclude them from the per-metric cardinality limit.

## Setup

To set up the Tag Cardinality Control processor:

1. Define a filter query. See [Metrics Search Syntax][1] for more information.
    - Only metrics matching the filter are processed.
    - All metrics, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. Enter a cardinality limit for the maximum number of distinct values per tag. This limit is applied to all metrics that match the filter query.
1. In the **When the limit is reached** dropdown menu, select whether to **Drop tag** or **Drop event** for metrics that have exceeded the cardinality limit.

{{< img src="observability_pipelines/processors/tag_cardinality_control_settings.png" alt="The Tag Cardinality Control processor set to a cardinality limit of 200 and to drop tag when the limit is reached." style="width:40%;" >}}

### Optional per-metric override settings

If you want to set a cardinality limit for a specific metric:

1. Click **Manage Overrides** and then **Add Metric Override** in the side panel.
1. Enter the name of the metric.
1. Select the override mode in the dropdown menu.
    - **Custom limit**: Sets a cardinality limit for this metric.
    - **Exclude from limit**: Excludes this metric from being counted toward the cardinality limit. This is useful when you are tracking an important metric and you don't want to drop any samples or tags due to a cardinality limit.
1. In the **When the limit is reached** dropdown menu, select whether to **Drop tag** or **Drop event** for metrics that have exceeded the cardinality limit.

#### Per-tag overrides

To add specific tag overrides for this metric:

1. Click **Add Tag Override**.
1. Enter the tag key you want to set a limit for.
1. Select the override mode in the dropdown menu:
    - **Custom limit**: Sets a limit on the number of unique values per tag. For example, if the tag limit is set to `5`, the first five tag values received are used.
        - **Note**: Tag values persist until the Worker restarts or the pipeline configuration is updated. Any pipeline configuration update resets the tag values, even if the update doesn't modify the Tag Cardinality Control processor.
    - **Exclude from limit**: Excludes metrics with the specified tag from being counted toward the cardinality limit.
1. Enter the limit for the maximum number of tag key values.
1. Click **Add Override**.

{{< img src="observability_pipelines/processors/tag_cardinality_control_overrides.png" alt="The per-metric override panel with a custom limit set to 100 with per-tag overrides for the host tag excluded from the limit and the region tag limited to five." style="width:80%;" >}}

[1]: /observability_pipelines/search_syntax/metrics/
