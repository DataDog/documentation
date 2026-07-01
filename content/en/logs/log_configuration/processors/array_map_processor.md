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

Use the array map processor to transform each element of a source array to a different target array. This processor allows running a sequence of sub-processors on every element. Currently only 4 sub-processors are supported: Attribute Remapper, String Builder, Arithmetic Processor and Category Processor.

**Notes**:

- If `source` and `target` are the same attribute, elements are transformed in place.
- If `target` array exists, attributes are written to existing elements.
- Processing is limited to the first 50 elements of the source array.
- Sub-processors do not support `is_enabled` parameter.
- Attribute Remapper sub-processor doesn't support `source_type` and `target_type` parameters and only remaps attributes.

## Example: Normalizing an array of network connections

**Before:**

```json
{
  "connections": [
    { "src_ip": "10.0.0.1", "dst_port": 443, "proto": "tcp" },
    { "src_ip": "10.0.0.2", "dst_port": 22,  "proto": "tcp" }
  ]
}
```

**Array Map Processor**

Create an Array Map Processor with source `connections` and target `network.connections`. Add an Attribute Remapper sub-processor mapping `$sourceElem.src_ip` to `$targetElem.source`, and a String Builder sub-processor with template `%{$sourceElem.proto}/%{$sourceElem.dst_port}` writing to `$targetElem.service`.

**After:**

```json
{
  "connections": [...],
  "network": {
    "connections": [
      {"source": "10.0.0.1", "service": "tcp/443"},
      {"source": "10.0.0.2", "service": "tcp/22"}
    ]
  }
}
```

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
  "processors": ["<SUB_PROCESSOR_1>", "<SUB_PROCESSOR_2>"]
}
```

| Parameter         | Type             | Required | Description                                                                                  |
|-------------------|------------------|----------|----------------------------------------------------------------------------------------------|
| `type`            | String           | Yes      | Type of the processor.                                                                       |
| `name`            | String           | No       | Name of the processor.                                                                       |
| `is_enabled`      | Boolean          | No       | If the processor is enabled or not. Default: `false`.                                        |
| `source`          | String           | Yes      | Name of the source array attribute.                                                          |
| `target`          | String           | Yes      | Name of the target array attribute. If equal to `source`, elements are transformed in place. |
| `preserve_source` | Boolean          | No       | Remove or preserve source array after processing. Default: `true`.                           |
| `processors`      | Array of Objects | Yes      | Sub-processors applied to each element, in order. At least one is required.                  |

### Sub-processors

Following rules apply when defining sub-processors:

- Inside each sub-processor, use `$sourceElem` to reference the current input element and `$targetElem` to write to the current output element.
- Attributes that do not start with `$sourceElem` are read from the parent log instead of the element itself.
- `$sourceElem.<field>`/`$targetElem.<field>` refer to a nested attribute in the element object, while `$sourceElem`/`$targetElem` refer to a primitive element (String, Integer, Double, Boolean).
- All targets must start with `$targetElem`.

#### Attribute Remapper

```json
{
  "type": "attribute-remapper",
  "name": "<NAME>",
  "sources": ["$sourceElem[.<FIELD>]"],
  "target": "$targetElem[.<FIELD>]",
  "target_format": "auto",
  "preserve_source": false,
  "override_on_conflict": false
}
```

| Parameter              | Type             | Required | Description                                                                                                                                                                     |
|------------------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`                 | String           | Yes      | Type of the sub-processor.                                                                                                                                                      |
| `name`                 | String           | No       | Name of the sub-processor.                                                                                                                                                      |
| `sources`              | Array of strings | Yes      | Array of source attributes.                                                                                                                                                     |
| `target`               | String           | Yes      | Target attribute.                                                                                                                                                               |
| `target_format`        | String           | No       | Defines if the attribute value should be cast to another type. Possible values: `auto`, `string`, `double` or `integer`. Default: `auto`. When set to `auto`, no cast is applied. |
| `preserve_source`      | Boolean          | No       | Remove or preserve the remapped source element. Default: `false`.                                                                                                               |
| `override_on_conflict` | Boolean          | No       | Override or not the target element if already set. Default: `false`.                                                                                                            |

#### String Builder Processor

```json
{
  "type": "string-builder-processor",
  "name": "<NAME>",
  "template": "%{$sourceElem[.<FIELD>]} <RAW_TEXT>",
  "target": "$targetElem[.<FIELD>]",
  "is_replace_missing": false
}
```

| Parameter            | Type    | Required | Description                                                                                                                                            |
|----------------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | String  | Yes      | Type of the sub-processor.                                                                                                                             |
| `name`               | String  | No       | Name of the sub-processor.                                                                                                                             |
| `template`           | String  | Yes      | A formula with one or more attributes and raw text.                                                                                                    |
| `target`             | String  | Yes      | The name of the attribute that contains the result of the template.                                                                                    |
| `is_replace_missing` | Boolean | No       | If `true`, replaces all missing attributes of `template` by an empty string. If `false`, skips the operation for missing attributes. Default: `false`. |

#### Arithmetic Processor

```json
{
  "type": "arithmetic-processor",
  "name": "<NAME>",
  "expression": "$sourceElem[.<FIELD>] <OPERATOR> <VALUE>",
  "target": "$targetElem[.<FIELD>]",
  "is_replace_missing": false
}
```

| Parameter            | Type    | Required | Description                                                                                                                                    |
|----------------------|---------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | String  | Yes      | Type of the sub-processor.                                                                                                                     |
| `name`               | String  | No       | Name of the sub-processor.                                                                                                                     |
| `expression`         | String  | Yes      | Arithmetic operation between one or more log attributes.                                                                                       |
| `target`             | String  | Yes      | Name of the attribute that contains the result of the arithmetic operation.                                                                    |
| `is_replace_missing` | Boolean | No       | If `true`, replaces all missing attributes of `expression` by 0, if `false`, skips the operation if an attribute is missing. Default: `false`. |

#### Category Processor

```json
{
  "type": "category-processor",
  "name": "<NAME>",
  "target": "$targetElem[.<FIELD>]",
  "categories": [
    {
      "filter": {"query": "@$sourceElem[.<FIELD>]:<VALUE>"},
      "name": "<CATEGORY_NAME>"
    }
  ]
}
```

| Parameter    | Type            | Required | Description                                                                                                |
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       | String          | Yes      | Must be `category-processor`.                                                                              |
| `name`       | String          | No       | Name of the sub-processor.                                                                                 |
| `categories` | Array of Object | Yes      | Array of filters to match or not a log and their corresponding `name` to assign a custom value to the log. |
| `target`     | String          | Yes      | Name of the target attribute which value is defined by the matching category.                              |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /api/v1/logs-pipelines/
