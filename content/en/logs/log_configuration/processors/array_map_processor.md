---
title: Array Map Processor
description: Learn how to transform each element of a source array, and collect results into a target array, in your log processors.
processor_type: array-map-processor
further_reading:
- link: /logs/log_configuration/pipelines
  tag: Documentation
  text: Pipelines Overview
---

## Overview

Use the array map processor to apply a sequence of sub-processors to each element of a source array, producing a target array. Datadog supports the following sub-processors: 
- [Attribute Remapper][3]
- [String Builder][4]
- [Arithmetic Processor][5]
- [Category Processor][6]

<div class="alert alert-info">
  <ul>
    <li>If <code>source</code> and <code>target</code> are the same attribute, the processor transforms elements in place.</li>
    <li>If the <code>target</code> array already exists, the process overwrites attributes on existing elements.</li>
    <li>Processing is limited to the first 50 elements of the source array.</li>
  </ul>
</div>

## Setup

Define the array map processor on the [{{< ui >}}Pipelines{{< /ui >}} page][2]:

1. Under {{< ui >}}Source array attribute{{< /ui >}}, enter the path to the array attribute to iterate over.
1. Select or clear the {{< ui >}}Preserve source array{{< /ui >}} checkbox to keep or remove the original source array after processing.
1. Under {{< ui >}}Target array attribute{{< /ui >}}, enter the path to where to write the output array.
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
| `preserve_source` | Boolean          | No       | If the source array should be preserved after processing. Default: `true`.                   |
| `processors`      | Array of Objects | Yes      | Sub-processors applied to each element, in order. At least one is required.                  |

## Sub-processors

The following rules apply when defining sub-processors:

- Inside each sub-processor, use:
  - `$sourceElem` to reference the current input element.
  - `$targetElem` to write to the current output element.
- If an attribute does not start with `$sourceElem`, the processor reads from the parent log instead of the element itself.
- `$sourceElem.<field>`/`$targetElem.<field>` refer to a nested attribute in the element object, while `$sourceElem`/`$targetElem` refer to a primitive element (for example, string, integer, double, Boolean).
- All targets must start with `$targetElem`.

### Attribute Remapper

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

| Parameter              | Type             | Required | Description                                                                                                                                                                       |
|------------------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`                 | String           | Yes      | Type of the sub-processor.                                                                                                                                                        |
| `name`                 | String           | No       | Name of the sub-processor.                                                                                                                                                        |
| `sources`              | Array of strings | Yes      | Array of source attributes.                                                                                                                                                       |
| `target`               | String           | Yes      | Target attribute.                                                                                                                                                                 |
| `target_format`        | String           | No       | Defines if the attribute value should be cast to another type. Possible values: `auto`, `string`, `double` or `integer`. Default: `auto`. When set to `auto`, no cast is applied. |
| `preserve_source`      | Boolean          | No       | If the remapped source element should be preserved after processing. Default: `false`.                                                                                            |
| `override_on_conflict` | Boolean          | No       | If the target element is already set, whether it should be overridden. Default: `false`.                                                                                          |

{{% /tab %}}
{{< /tabs >}}

### String Builder Processor

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

- {{< ui >}}Target attribute{{< /ui >}}: `$targetElem.fqdn`
- {{< ui >}}Template{{< /ui >}}: `%{$sourceElem.name}.%{region}`
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

| Parameter            | Type    | Required | Description                                                                                                                                              |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | String  | Yes      | Type of the sub-processor.                                                                                                                               |
| `name`               | String  | No       | Name of the sub-processor.                                                                                                                               |
| `template`           | String  | Yes      | A formula with one or more attributes and raw text.                                                                                                      |
| `target`             | String  | Yes      | The name of the attribute that contains the result of the template.                                                                                      |
| `is_replace_missing` | Boolean | No       | If `true`, replaces all missing attributes of `template` with an empty string. If `false`, skips the operation for missing attributes. Default: `false`. |

{{% /tab %}}
{{< /tabs >}}

### Arithmetic Processor

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

- {{< ui >}}Target attribute{{< /ui >}}: `$targetElem.kb`
- {{< ui >}}Formula{{< /ui >}}: `$sourceElem.bytes / 1024`
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

| Parameter            | Type    | Required | Description                                                                                                                                      |
|----------------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | String  | Yes      | Type of the sub-processor.                                                                                                                       |
| `name`               | String  | No       | Name of the sub-processor.                                                                                                                       |
| `expression`         | String  | Yes      | Arithmetic operation between one or more log attributes.                                                                                         |
| `target`             | String  | Yes      | Name of the attribute that contains the result of the arithmetic operation.                                                                      |
| `is_replace_missing` | Boolean | No       | If `true`, replaces all missing attributes of `expression` with 0. If `false`, skips the operation if an attribute is missing. Default: `false`. |

{{% /tab %}}
{{< /tabs >}}

### Category Processor

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
- {{< ui >}}Categories{{< /ui >}}:
  - All events that match `@$sourceElem.status:critical` are mapped to value  `high`
  - All events that match `@$sourceElem.status:warning` are mapped to value `medium`

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

| Parameter    | Type            | Required | Description                                                                                            |
|--------------|-----------------|----------|--------------------------------------------------------------------------------------------------------|
| `type`       | String          | Yes      | Must be `category-processor`.                                                                          |
| `name`       | String          | No       | Name of the sub-processor.                                                                             |
| `categories` | Array of Object | Yes      | Array of filters to match to a log, and their corresponding custom `name` values to assign to the log. |
| `target`     | String          | Yes      | Name of the target attribute whose value is defined by the matching category.                          |

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/logs-pipelines/
[2]: https://app.datadoghq.com/logs/pipelines
[3]: /logs/log_configuration/processors/remapper/
[4]: /logs/log_configuration/processors/string_builder_processor/
[5]: /logs/log_configuration/processors/arithmetic_processor/
[6]: /logs/log_configuration/processors/category_processor/