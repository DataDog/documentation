---
title: Edit Fields Processor
disable_toc: false
further_reading:
- link: "/observability_pipelines/guide/remap_reserved_attributes/"
  tag: "documentation"
  text: "Remap reserved attributes"
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

The Edit Fields processor can add, drop, or rename fields within your individual log data. Use this processor to enrich your logs with additional context, remove low-value fields to reduce volume, and standardize naming across important attributes. Select {{< ui >}}add field{{< /ui >}}, {{< ui >}}drop field{{< /ui >}}, or {{< ui >}}rename field{{< /ui >}} in the dropdown menu to get started.

See the [Remap Reserved Attributes][1] guide on how to use the Edit Fields processor to remap attributes.

## Setup

### Add field
Use {{< ui >}}add field{{< /ui >}} to append a new key-value field to your log.

To set up the add field processor:
1. Define a {{< ui >}}filter query{{< /ui >}}. Only logs that match the specified filter query are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline. See [Search Syntax][2] for more information.
1. Enter the field and value you want to add. To specify a nested field for your key, use the [path notation](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`. All values are stored as strings.
    **Note**: If the field you want to add already exists, the Worker logs an error and the existing field remains unchanged.

### Drop field

Use {{< ui >}}drop field{{< /ui >}} to drop a field from logging data that matches the filter you specify below. It can delete objects, so you can use the processor to drop nested keys.

To set up the drop field processor:
1. Define a {{< ui >}}filter query{{< /ui >}}. Only logs that match the specified filter query are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline. See [Search Syntax][2] for more information.
1. Enter the key of the field you want to drop. To specify a nested field for your specified key, use the [path notation](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`.
    **Note**: If your specified key does not exist, your log is unimpacted.

### Rename field

Use {{< ui >}}rename field{{< /ui >}} to rename a field within your log.

To set up the rename field processor:
1. Define a {{< ui >}}filter query{{< /ui >}}. Only logs that match the specified filter query are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline. See [Search Syntax][2] for more information.
1. Enter the name of the field you want to rename in the {{< ui >}}Source field{{< /ui >}}. To specify a nested field for your key, use the [path notation](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`. After it is renamed, your original field is deleted unless you enable the {{< ui >}}Preserve source tag{{< /ui >}} checkbox described below.<br>**Note**: If the source key you specify doesn't exist, a default `null` value is applied to your target.
1. In the {{< ui >}}Target field{{< /ui >}}, enter the name you want the source field to be renamed to. To specify a nested field for your specified key, use the [path notation](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`.<br>**Note**: If the target field you specify already exists, the Worker logs an error and does not overwrite the existing target field.
1. Optionally, check the {{< ui >}}Preserve source tag{{< /ui >}} box if you want to retain the original source field and duplicate the information from your source key to your specified target key. If this box is not checked, the source key is dropped after it is renamed.

### Path notation example {#path-notation-example-remap}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

## Metrics

For [component metrics][3] and [processor buffer metrics][4] emitted by all processors, see the [Pipelines Usage Metrics][5] documentation. To filter or group by Edit Fields processor metrics, use the tag `component_type:add_fields`, `component_type:remove_fields`, or `component_type:rename_fields`, depending on the configured action.

[1]: /observability_pipelines/guide/remap_reserved_attributes
[2]: /observability_pipelines/search_syntax/logs/
[3]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
