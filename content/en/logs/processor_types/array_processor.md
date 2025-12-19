---
title: Array Processor
description: "Extract, aggregate, or transform values from JSON arrays within your logs"
processor_type: array-processor
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
---

## Overview

Use the array processor to extract, aggregate, or transform values from JSON arrays within your logs.

Supported operations include:

- **Select value from a matching element**
- **Compute the length of an array**
- **Append a value to an array**

Each operation is configured through a dedicated processor.

Define the array processor on the [**Pipelines** page][1].


### Select value from matching element

Extract a specific value from an object inside an array when it matches a condition.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array_processor_select_value.png" alt="Array processor - Select value from element" style="width:80%;" >}}

**Example input:**

```json
{
  "httpRequest": {
    "headers": [
      {"name": "Referrer", "value": "https://example.com"},
      {"name": "Accept", "value": "application/json"}
    ]
  }
}
```

**Configuration steps:**

- **Array path**: `httpRequest.headers`
- **Condition**: `name:Referrer`
- **Extract value of**: `value`
- **Target attribute**: `referrer`

**Result:**

```json
{
  "httpRequest": {
    "headers": [...]
  },
  "referrer": "https://example.com"
}
```

{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following array processor JSON payload:

```json
{
  "type": "array-processor",
  "name": "Extract Referrer URL",
  "is_enabled": true,
  "operation" : {
    "type" : "select",
    "source": "httpRequest.headers",
    "target": "referrer",
    "filter": "name:Referrer",
    "value_to_extract": "value"
  }
}
```

| Parameter    | Type             | Required | Description                                                   |
|--------------|------------------|----------|---------------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                        |
| `name`       | String           | No       | Name of the processor.                                        |
| `is_enabled` | Boolean          | No       | Whether the processor is enabled. Default: `false`.        |
| `operation.type`  | String      | Yes      | Type of array processor operation.                            |
| `operation.source`  | String    | Yes      | Path of the array you want to select from.                    |
| `operation.target`  | String    | Yes      | Target attribute.                                             |
| `operation.filter`  | String    | Yes      | Expression to match an array element. The first matching element is selected. |
| `operation.value_to_extract`  | String | Yes | Attribute to read in the selected element.                  |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

### Array length

Compute the number of elements in an array.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array_processor_length.png" alt="Array processor - Length" style="width:80%;" >}}

**Example input:**

```json
{
  "tags": ["prod", "internal", "critical"]
}
```

**Configuration steps:**

- **Array attribute**: `tags`
- **Target attribute**: `tagCount`

**Result:**

```json
{
  "tags": ["prod", "internal", "critical"],
  "tagCount": 3
}
```
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following array processor JSON payload:

```json
{
  "type": "array-processor",
  "name": "Compute number of tags",
  "is_enabled": true,
  "operation" : {
    "type" : "length",
    "source": "tags",
    "target": "tagCount"
  }
}
```

| Parameter           | Type      | Required | Description                                                   |
|---------------------|-----------|----------|---------------------------------------------------------------|
| `type`              | String    | Yes      | Type of the processor.                                        |
| `name`              | String    | No       | Name of the processor.                                        |
| `is_enabled`        | Boolean   | No       | Whether the processor is enabled. Default: `false`.        |
| `operation.type`    | String    | Yes      | Type of array processor operation.                            |
| `operation.source`  | String    | Yes      | Path of the array to extract the length of.                   |
| `operation.target`  | String    | Yes      | Target attribute.                                             |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

### Append to array

Add an attribute value to the end of a target array attribute in the log.

**Note**: If the target array attribute does not exist in the log, it is automatically created.


{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array_processor_append.png" alt="Array processor - Append" style="width:80%;" >}}

**Example input:**

```json
{
  "network": {
    "client": {
      "ip": "198.51.100.23"
    }
  },
  "sourceIps": ["203.0.113.1"]
}

```
**Configuration steps:**

- **Attribute to append**: `"network.client.ip"`
- **Array attribute to append to**: `sourceIps`

**Result:**

```json
{
  "network": {
    "client": {
      "ip": "198.51.100.23"
    }
  },
  "sourceIps": ["203.0.113.1", "198.51.100.23"]
}
```
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following array processor JSON payload:

```json
{
  "type": "array-processor",
  "name": "Append client IP to sourceIps",
  "is_enabled": true,
  "operation" : {
    "type" : "append",
    "source": "network.client.ip",
    "target": "sourceIps"
  }
}
```

| Parameter                    | Type       | Required | Description                                                        |
|------------------------------|------------|----------|--------------------------------------------------------------------|
| `type`                       | String     | Yes      | Type of the processor.                                             |
| `name`                       | String     | No       | Name of the processor.                                             |
| `is_enabled`                 | Boolean    | No       | Whether the processor is enabled. Default: `false`.             |
| `operation.type`             | String     | Yes      | Type of array processor operation.                                 |
| `operation.source`           | String     | Yes      | Attribute to append.                                               |
| `operation.target`           | String     | Yes      | Array attribute to append to.                                      |
| `operation.preserve_source`  | Boolean    | No      | Whether to preserve the original source after remapping. Default: `false`.   |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines

