---
title: Split Array Processor
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

This processor splits nested arrays into distinct events so that you can query, filter, alert, and visualize data within an array. The arrays need to already be parsed. For example, the processor can process `[item_1, item_2]`, but cannot process `"[item_1, item2]"`. The items in the array can be JSON objects, strings, integers, floats, or Booleans. All unmodified fields are added to the child events. For example, if you are sending the following items to the Observability Pipelines Worker:

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": [item_1, item_2]
}
```

Use the Split Array processor to send each item in `batched_items` as a separate event:

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": item_1
}
```

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": item_2
}
```

See the [split array example](#split-array-example) for a more detailed example.

## Setup

To set up this processor:

Click **Manage arrays to split** to add an array to split or edit an existing array to split. This opens a side panel.

- If you have not created any arrays yet, enter the array parameters as described in the [Add a new array](#add-a-new-array) section below.
- If you have already created arrays, click on the array's row in the table to edit or delete it. Use the search bar to find a specific array, and then select the array to edit or delete it. Click **Add Array to Split** to add a new array.

##### Add a new array

1. Define a filter query. Only logs that match the specified filter query are processed. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. Enter the path to the array field. Use the path notation `<OUTER_FIELD>.<INNER_FIELD>` to match subfields. See the [Path notation example](#path-notation-example-split-array) below.
1. Click **Save**.

##### Split array example

This is an example event:

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {
            "timestamp":14500000,
            "firstarray":["one", 2]
        },
    },
    "secondarray": [
    {
        "some":"json",
        "Object":"works"
    }, 44]
}
```

If the processor is splitting the arrays `"message.myfield.firstarray"` and `"secondarray"`, it outputs child events that are identical to the parent event, except for the values of `"message.myfield.firstarray"` and `"secondarray",` which becomes a single item from their respective original array. Each child event is a unique combination of items from the two arrays, so four child events (2 items * 2 items = 4 combinations) are created in this example.

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":"one"},
    },
    "secondarray": {
        "some":"json",
        "Object":"works"
    }
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":"one"},
        },
    "secondarray": 44
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":2},
        },
    "secondarray": {
            "some":"json",
            "object":"works"
        }
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":2},
        },
    "secondarray": 44
}
```

##### Path notation example {#path-notation-example-split-array}

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

{{% observability_pipelines/processors/filter_syntax %}}