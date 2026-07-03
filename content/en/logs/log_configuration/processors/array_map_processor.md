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

Use the array map processor to apply a sequence of sub-processors to each element of a source array, producing a target array. Currently only 4 sub-processors are supported: Attribute Remapper, String Builder, Arithmetic Processor and Category Processor.

**Notes**:

- If `source` and `target` are the same attribute, elements are transformed in place.
- If `target` array exists, attributes are written to existing elements.
- Processing is limited to the first 50 elements of the source array.

## Setup

Define the array map processor on the [{{< ui >}}Pipelines{{< /ui >}} page][2]:

1. Set the {{< ui >}}Source{{< /ui >}}: path to the array attribute to iterate over.
1. Toggle {{< ui >}}Preserve source{{< /ui >}} to keep or remove the original source array after processing.
1. Set the {{< ui >}}Target{{< /ui >}}: path where the output array is written.
1. Add one or more [sub-processors](#sub-processors) to apply to each element.

{{< img src="logs/log_configuration/processor/array-map-processor.png" alt="Screenshot of the Array Map Processor configuration panel" style="width:80%;" >}}

## Before and after state of logs

{{% collapse-content title="Example: Normalizing an array of network connections" level="h4" %}}

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

{{% /collapse-content %}}

## API

Use the [Datadog Log Pipeline API endpoint][1] with the following Array Map processor JSON payload:

```json
{
  "type": "array-map-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "source": "<SOURCE_ARRAY_ATTRIBUTE>",
  "target": "<TARGET_ARRAY_ATTRIBUTE>",
  "preserve_source": true,
  "processors": [
    {"type": "<SUB_PROCESSOR_TYPE>", ...},
    {"type": "<SUB_PROCESSOR_TYPE>", ...}
  ]
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

Remaps an existing field to a field in the output element.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array-map-attribute-remapper.png" alt="Screenshot of the Attribute Remapper sub-processor configuration" style="width:80%;" >}}

**Example input:**

```json
{
  "items": ["10.0.0.1", "10.0.0.2"]
}
```

**Configuration steps:**

- {{< ui >}}Source attributes{{< /ui >}}: `$sourceElem`
- {{< ui >}}Target attribute{{< /ui >}}: `$targetElem.ip`
- {{< ui >}}Preserve source{{< /ui >}}: `enabled`

**Result:**

```json
{
  "items": [...],
  "out": [
    {"ip": "10.0.0.1"},
    {"ip": "10.0.0.2"}
  ]
}
```

{{% /tab %}}
{{% tab "API" %}}

```json
{
  "type": "attribute-remapper",
  "name": "Map primitive IP to object field",
  "sources": ["$sourceElem"],
  "target": "$targetElem.ip",
  "target_format": "auto",
  "preserve_source": true,
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

{{% /tab %}}
{{< /tabs >}}

#### String Builder Processor

Builds a new field in the output element from a template.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array-map-string-builder.png" alt="Screenshot of the String Builder sub-processor configuration" style="width:80%;" >}}

**Example input:**

```json
{
  "region": "us-east-1",
  "items": [
    {"name": "db-1"},
    {"name": "db-2"}
  ]
}
```

**Configuration steps:**

- {{< ui >}}Template{{< /ui >}}: `%{$sourceElem.name}.%{region}`
- {{< ui >}}Target attribute{{< /ui >}}: `$targetElem.fqdn`
- {{< ui >}}Replace missing{{< /ui >}}: disabled

**Result:**

```json
{
  "region": "us-east-1",
  "items": [...],
  "out": [
    {"fqdn": "db-1.us-east-1"},
    {"fqdn": "db-2.us-east-1"}
  ]
}
```

{{% /tab %}}
{{% tab "API" %}}

```json
{
  "type": "string-builder-processor",
  "name": "Build FQDN from element and parent attribute",
  "template": "%{$sourceElem.name}.%{region}",
  "target": "$targetElem.fqdn",
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

{{% /tab %}}
{{< /tabs >}}

#### Arithmetic Processor

Computes a numeric expression using element or log attributes and writes the result to the output element.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array-map-arithmetic.png" alt="Screenshot of the Arithmetic Processor sub-processor configuration" style="width:80%;" >}}

**Example input:**

```json
{
  "items": [
    {"bytes": 1024},
    {"bytes": 2048}
  ]
}
```

**Configuration steps:**

- {{< ui >}}Formula{{< /ui >}}: `$sourceElem.bytes / 1024`
- {{< ui >}}Target attribute{{< /ui >}}: `$targetElem.kb`
- {{< ui >}}Replace missing value{{< /ui >}}: disabled

**Result:**

```json
{
  "items": [...],
  "out": [
    {"kb": 1},
    {"kb": 2}
  ]
}
```

{{% /tab %}}
{{% tab "API" %}}

```json
{
  "type": "arithmetic-processor",
  "name": "Convert bytes to KB",
  "expression": "$sourceElem.bytes / 1024",
  "target": "$targetElem.kb",
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

{{% /tab %}}
{{< /tabs >}}

#### Category Processor

Assigns a category to each output element based on a filter query matching element attributes.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array-map-category.png" alt="Screenshot of the Category Processor sub-processor configuration" style="width:80%;" >}}

**Example input:**

```json
{
  "items": [
    {"status": "critical"},
    {"status": "warning"}
  ]
}
```

**Configuration steps:**

- {{< ui >}}Target attribute{{< /ui >}}: `$targetElem.severity`
- Category 1: All events that match `@$sourceElem.status:critical` are mapped to value  `high`
- Category 2: All events that match `@$sourceElem.status:warning` are mapped to value `medium`

**Result:**

```json
{
  "items": [...],
  "out": [
    {"severity": "high"},
    {"severity": "medium"}
  ]
}
```

{{% /tab %}}
{{% tab "API" %}}

```json
{
  "type": "category-processor",
  "name": "Map status to severity",
  "target": "$targetElem.severity",
  "categories": [
    {"filter": {"query": "@$sourceElem.status:critical"}, "name": "high"},
    {"filter": {"query": "@$sourceElem.status:warning"},  "name": "medium"}
  ]
}
```

| Parameter    | Type            | Required | Description                                                                                                |
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       | String          | Yes      | Must be `category-processor`.                                                                              |
| `name`       | String          | No       | Name of the sub-processor.                                                                                 |
| `categories` | Array of Object | Yes      | Array of filters to match or not a log and their corresponding `name` to assign a custom value to the log. |
| `target`     | String          | Yes      | Name of the target attribute which value is defined by the matching category.                              |

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/logs-pipelines/
[2]: https://app.datadoghq.com/logs/pipelines
