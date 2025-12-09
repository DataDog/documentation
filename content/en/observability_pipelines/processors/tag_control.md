---
title: Tag Control
description: Learn how to use the Tag Control processor for metrics.
disable_toc: false
products:
- name: Metrics
  icon: metrics
---

{{< product-availability >}}

## Overview

Use this processor to include or exclude specific tags in your metrics. Tags that are excluded or not included are dropped and may reduce your outbound metrics tag volume.

The following table lists tags that can't be dropped and why.

| Tag            | Reason                                                                           |
| -------------- | -------------------------------------------------------------------------------- |
| `host`         | Critical for infrastructure mapping, metrics aggregation, and platform features. |
| `service`      | Used to group data.                                                              |
| `ddsource`     | Used in Log Management to identify sources and apply integration pipelines.      |
| `function_arn` | Equivalent to the `host_id` in Lambda.                                           |
| `datadog_`     | Platform specific tags.                                                         |
| `_dd.*`        | System-reserved tags, such as `_dd.hostname`.                                    |

## Setup

To set up the processor:

Click **Add tag rule**.
- If you haven't added any rules yet, enter the rule details as described in the [Add a tag rule](#add-a-tag-rule) section to create a rule.
- If you have already added rules, you can:
  - Click on a rule in the table to edit or delete it.
  - Use the search bar to find a specific rule by rule query, tag rule type, or tags applied and then select the metric to edit or delete it.
  - Click **New Tag Rule** to add a rule.

### Add a tag rule

{{< img src="observability_pipelines/processors/tag_control_settings.png" alt="The tag control settings panel" style="width:70%;" >}}

1. Define a filter query. Only matching metrics are processed by this processor, but all metrics continue to the next step in the pipeline.
1. In the **Configure tags** section, choose whether to **Include tags** or **Exclude tags**.
1. Optionally, input a sample tags object to help you select the tags you want to include or exclude in the next step.
    - The supported input formats are `{"key1":"value1", "key2":"value2"}`.
   - See [Define Tags][1] for more information about the `key:value` format.
1. If you provided a tag array in the previous step, select the tag keys you want to configure in the dropdown menu. You can also manually add tag keys.
    - Note: You can select up to 15 tags.
1. Click **Save**.

[1]: /may/op-metrics-pipelines-components/getting_started/tagging/#define-tags
