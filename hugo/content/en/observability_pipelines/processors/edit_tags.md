---
title: Edit Tags Processor
disable_toc: false
products:
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
---

{{< product-availability >}}

## Overview

The Edit Tags processor can add or rename tags in your metrics. Use this processor to enrich your metrics with additional context and standardize naming across important attributes.

The following tags and tag prefixes can't be renamed because they provide specific platform functionality:

- `host`
- `service`
- `ddsource`
- `function_arn`
- `datadog_*`
- `_dd.*`

## Setup

### Add tag

Use **Add tag** to append a new key-value tag to your metric.

To set up the **Add tag** action:

1. Select **Add tag** in the **Action** dropdown menu.
1. Define a filter query. See [Metrics Search Syntax][1] for information on creating queries.
    - Only metrics matching the filter are processed.
    - All metrics, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. Enter the tag key and value you want to add to metrics. **Note**: If the tag you want to add already exists, the Worker logs an error and the existing tag remains unchanged.

### Rename tag

Use **Rename tag** to rename a tag in your metric.

To set up the **Rename tag** action:

1. Select **Rename tag** in the **Action** dropdown menu.
1. Define a filter query. See [Metrics Search Syntax][1] for information on creating queries.
    - Only metrics matching the filter are processed.

    - All metrics, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. Enter the name of the tag key you want to rename in the **From** field.
1. In the **To** field, enter the tag key you want to rename the original tag to. **Note**: If the tag name in the **To** field already exists, the Worker logs an error and does not rename the tag key in the **From** field.

[1]: /observability_pipelines/search_syntax/metrics/
