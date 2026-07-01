---
title: Array Map Processor
description: "Transform each element of a source array and collect results into a target array"
processor_type: array-map-processor
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
---

## Overview

Use the array map processor to transform each element of a source array to a different target array. This processor allows running a sequence of sub-processors on every element.

Inside each sub-processor, use `$sourceElem` to reference the current input element and `$targetElem` to write to the current output element. Attributes that do not start with `$sourceElem` are read from the parent log instead of the element itself.

**Notes**:

- Sub-processors support: [Attribute Remapper](#attribute-remapper), [String Builder](#string-builder-processor), [Arithmetic Processor](#arithmetic-processor), and [Category Processor](#category-processor).
- Sub-processor targets must start with `$targetElem`. `$targetElem` used alone maps the entire element to a single primitive value.
- `$targetElem` cannot be used as a source.
- Processing is limited to the first 50 elements of the source array.
- If `source` and `target` are the same attribute, elements are transformed in place.
- If `target` array exists, attributes are written to existing elements.

## Setup

Define the array map processor on the [{{< ui >}}Pipelines{{< /ui >}} page][1]:

1. **Set the source attribute**: Enter the path to the array you want to transform (for example, `detail.resources`).
1. **Set the target attribute**: Enter the path where the transformed array is written (for example, `ocsf.resources`).
1. **Configure preserve source**: Choose whether to keep the original source array after processing.
1. **Add sub-processors**: Add one or more sub-processors and configure them using `$sourceElem.<field>` as sources and `$targetElem.<field>` as targets.

## Before and after state of logs

{{% collapse-content title="Example: Normalizing an array of AWS resources to OCSF format" level="h4" %}}

**Before:**

```json
{
  "detail": {
    "region": "us-east-1",
    "resources": [
      {"type": "AWS::EC2::Instance", "arn": "arn:aws:ec2:us-east-1:123456789012:instance/i-0abcd1234"},
      {"type": "AWS::S3::Bucket",    "arn": "arn:aws:s3:::my-bucket"}
    ]
  }
}
```

**Array Map Processor configuration:**

- Source: `detail.resources`
- Target: `ocsf.resources`
- Sub-processors:
  - Attribute Remapper: `$sourceElem.arn` → `$targetElem.uid`
  - Attribute Remapper: `detail.region` → `$targetElem.region` (parent-scoped source)

**After processing:**

```json
{
  "detail": {
    "region": "us-east-1",
    "resources": [...]
  },
  "ocsf": {
    "resources": [
      {"uid": "arn:aws:ec2:us-east-1:123456789012:instance/i-0abcd1234", "region": "us-east-1"},
      {"uid": "arn:aws:s3:::my-bucket", "region": "us-east-1"}
    ]
  }
}
```

{{% /collapse-content %}}

## API

Use the [Datadog Log Pipeline API endpoint][2] with the following array map processor JSON payload:

```json
{
  "type": "array-map-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "source": "<SOURCE_ARRAY_ATTRIBUTE>",
  "target": "<TARGET_ARRAY_ATTRIBUTE>",
  "preserve_source": true,
  "processors": [
    "<SUB_PROCESSOR_1>",
    "<SUB_PROCESSOR_2>"
  ]
}
```

| Parameter        | Type            | Required | Description                                                                                 |
|------------------|-----------------|----------|---------------------------------------------------------------------------------------------|
| `type`           | String          | Yes      | Must be `array-map-processor`.                                                              |
| `name`           | String          | No       | Name of the processor.                                                                      |
| `is_enabled`     | Boolean         | No       | Whether the processor is enabled. Default: `false`.                                         |
| `source`         | String          | Yes      | Path to the source array attribute.                                                         |
| `target`         | String          | Yes      | Path to the target array attribute. If equal to `source`, elements are transformed in place.|
| `preserve_source`| Boolean         | No       | Whether to keep the source array after processing. Default: `true`.                         |
| `processors`     | Array of Object | Yes      | Sub-processors applied to each element, in order. At least one is required.                |

### Sub-processors

Sub-processors do not support `is_enabled`. Attribute Remapper does not support `source_type` or `target_type` and only remaps attributes. All sub-processor targets must start with `$targetElem`.

#### Attribute remapper

```json
{
  "type": "attribute-remapper",
  "name": "<SUB_PROCESSOR_NAME>",
  "sources": ["$sourceElem.<FIELD>"],
  "target": "$targetElem.<FIELD>",
  "target_format": "auto",
  "preserve_source": false,
  "override_on_conflict": false
}
```

| Parameter              | Type             | Required | Description                                                                                                             |
|------------------------|------------------|----------|-------------------------------------------------------------------------------------------------------------------------|
| `type`                 | String           | Yes      | Must be `attribute-remapper`.                                                                                           |
| `name`                 | String           | No       | Name of the sub-processor.                                                                                              |
| `sources`              | Array of strings | Yes      | Source attributes. Use `$sourceElem.<field>` to read from the current element, or a plain path to read from the parent log. |
| `target`               | String           | Yes      | Target attribute. Must start with `$targetElem`.                                                                        |
| `target_format`        | String           | No       | Cast the value to another type. Possible values: `auto`, `string`, `integer`, `double`. Default: `auto`.                |
| `preserve_source`      | Boolean          | No       | Whether to keep the source attribute after remapping. Default: `false`.                                                 |
| `override_on_conflict` | Boolean          | No       | Whether to overwrite the target if it already has a value. Default: `false`.                                            |

#### String builder processor

```json
{
  "type": "string-builder-processor",
  "name": "<SUB_PROCESSOR_NAME>",
  "template": "%{$sourceElem.<FIELD>} <RAW_TEXT>",
  "target": "$targetElem.<FIELD>",
  "is_replace_missing": false
}
```

| Parameter            | Type    | Required | Description                                                                                                             |
|----------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------|
| `type`               | String  | Yes      | Must be `string-builder-processor`.                                                                                     |
| `name`               | String  | No       | Name of the sub-processor.                                                                                              |
| `template`           | String  | Yes      | Template string. Use `%{$sourceElem.<field>}` to interpolate element attributes or `%{<path>}` for parent log attributes.|
| `target`             | String  | Yes      | Target attribute. Must start with `$targetElem`.                                                                        |
| `is_replace_missing` | Boolean | No       | If `true`, replaces missing attributes with an empty string. If `false`, skips the operation. Default: `false`.         |

#### Arithmetic processor

```json
{
  "type": "arithmetic-processor",
  "name": "<SUB_PROCESSOR_NAME>",
  "expression": "$sourceElem.<FIELD> <OPERATOR> <VALUE>",
  "target": "$targetElem.<FIELD>",
  "is_replace_missing": false
}
```

| Parameter            | Type    | Required | Description                                                                                                          |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------|
| `type`               | String  | Yes      | Must be `arithmetic-processor`.                                                                                      |
| `name`               | String  | No       | Name of the sub-processor.                                                                                           |
| `expression`         | String  | Yes      | Arithmetic expression. Use `$sourceElem.<field>` to reference element attributes.                                   |
| `target`             | String  | Yes      | Target attribute. Must start with `$targetElem`.                                                                     |
| `is_replace_missing` | Boolean | No       | If `true`, treats missing attributes in the expression as `0`. If `false`, skips the operation. Default: `false`.   |

#### Category processor

```json
{
  "type": "category-processor",
  "name": "<SUB_PROCESSOR_NAME>",
  "target": "$targetElem.<FIELD>",
  "categories": [
    {"filter": {"query": "@$sourceElem.<FIELD>:<VALUE>"}, "name": "<CATEGORY_NAME>"}
  ]
}
```

| Parameter    | Type            | Required | Description                                                                                                                |
|--------------|-----------------|----------|----------------------------------------------------------------------------------------------------------------------------|
| `type`       | String          | Yes      | Must be `category-processor`.                                                                                              |
| `name`       | String          | No       | Name of the sub-processor.                                                                                                 |
| `target`     | String          | Yes      | Target attribute. Must start with `$targetElem`.                                                                           |
| `categories` | Array of Object | Yes      | Ordered list of category rules. Each has a `filter.query` (use `@$sourceElem.<field>` syntax) and a `name` to assign.    |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /api/v1/logs-pipelines/
