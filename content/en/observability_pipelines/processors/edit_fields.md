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

The remap processor can add, drop, or rename fields within your individual log data. Use this processor to enrich your logs with additional context, remove low-value fields to reduce volume, and standardize naming across important attributes. Select **add field**, **drop field**, or **rename field** in the dropdown menu to get started.

See the [Remap Reserved Attributes][1] guide on how to use the Edit Fields processor to remap attributes.

## Setup

##### Add field
Use **add field** to append a new key-value field to your log.

To set up the add field processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. Enter the field and value you want to add. To specify a nested field for your key, use the [path notation](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`. All values are stored as strings.
    **Note**: If the field you want to add already exists, the Worker throws an error and the existing field remains unchanged.

##### Drop field

Use **drop field** to drop a field from logging data that matches the filter you specify below. It can delete objects, so you can use the processor to drop nested keys.

To set up the drop field processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. Enter the key of the field you want to drop. To specify a nested field for your specified key, use the [path notation](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`.
    **Note**: If your specified key does not exist, your log is unimpacted.

##### Rename field

Use **rename field** to rename a field within your log.

To set up the rename field processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. Enter the name of the field you want to rename in the **Source field**. To specify a nested field for your key, use the [path notation](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`. After it is renamed, your original field is deleted unless you enable the **Preserve source tag** checkbox described below.<br>**Note**: If the source key you specify doesn't exist, a default `null` value is applied to your target.
1. In the **Target field**, enter the name you want the source field to be renamed to. To specify a nested field for your specified key, use the [path notation](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`.<br>**Note**: If the target field you specify already exists, the Worker throws an error and does not overwrite the existing target field.
1. Optionally, check the **Preserve source tag** box if you want to retain the original source field and duplicate the information from your source key to your specified target key. If this box is not checked, the source key is dropped after it is renamed.

##### Path notation example {#path-notation-example-remap}

 For the following message structure:

```json
{
    "outer_key": {
        "inner_key": "inner_value",
        "a": {
            "double_inner_key": "double_inner_value",
            "b": "b value"
        },
        "c": "c value"
    },
    "d": "d value"
}
```

- Use `outer_key.inner_key` to see the key with the value `inner_value`.
- Use `outer_key.inner_key.double_inner_key` to see the key with the value `double_inner_value`.

[1]: /observability_pipelines/guide/remap_reserved_attributes

{{% observability_pipelines/processors/filter_syntax %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}