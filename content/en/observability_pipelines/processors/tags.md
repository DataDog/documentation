---
title: Tags Processor
disable_toc: false
aliases:
  - /observability_pipelines/processors/tag_control/logs/
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

For logs coming from the Datadog Agent, use this processor to exclude or include specific tags in the Datadog tags (`ddtags`) array. Tags that are excluded or not included are dropped and may reduce your outbound log volume.

## Setup

To set up the processor:

1. Define a {{< ui >}}filter query{{< /ui >}}. See [Logs Search Syntax][2] for more information.
   - Only logs matching the filter are processed.
   - All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. Optionally, input a Datadog tags array for the {{< ui >}}Configure tags{{< /ui >}} section. The supported formats are `["key:value", "key"]`. See [Define Tags][1] for more information about the `key:value` format.
1. In the {{< ui >}}Configure tags{{< /ui >}} section, choose whether to {{< ui >}}Exclude tags{{< /ui >}} or {{< ui >}}Include tags{{< /ui >}}. If you provided a tag array in the previous step, select the tag keys you want to configure. You can also manually add tag keys. **Note**: You can select up to 100 tags.

[1]: /getting_started/tagging/#define-tags
[2]: /observability_pipelines/search_syntax/logs/
