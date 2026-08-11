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
- **Extract key-value pairs from an array**

Each operation is configured through a dedicated processor.

Define the array processor on the [{{< ui >}}Pipelines{{< /ui >}} page][1].


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

- {{< ui >}}Array path{{< /ui >}}: `httpRequest.headers`
- {{< ui >}}Condition{{< /ui >}}: `name:Referrer`
- {{< ui >}}Extract value of{{< /ui >}}: `value`
- {{< ui >}}Target attribute{{< /ui >}}: `referrer`

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

Use the [Datadog Log Pipeline API endpoint][100] with the following array processor JSON payload:

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

[100]: /api/v1/logs-pipelines/
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

- {{< ui >}}Array attribute{{< /ui >}}: `tags`
- {{< ui >}}Target attribute{{< /ui >}}: `tagCount`

**Result:**

```json
{
  "tags": ["prod", "internal", "critical"],
  "tagCount": 3
}
```
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][100] with the following array processor JSON payload:

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

[100]: /api/v1/logs-pipelines/
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

- {{< ui >}}Attribute to append{{< /ui >}}: `"network.client.ip"`
- {{< ui >}}Array attribute to append to{{< /ui >}}: `sourceIps`

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

Use the [Datadog Log Pipeline API endpoint][100] with the following array processor JSON payload:

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

[100]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

### Extract key-value pairs

Flatten an array of key-value objects into individual attributes, creating one attribute per element. Use this operation when a log carries data as a list of `{key, value}` objects, such as the request headers in AWS WAF and HTTP logs. Each entry becomes its own searchable, facetable attribute. Keys are handled automatically, even when they differ from one log to the next.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array_processor_key_value.png" alt="Array processor - Extract key-value pairs" style="width:80%;" >}}

**Example input:**

```json
{
  "httpRequest": {
    "headers": [
      {"name": "host", "value": "api.example.com"},
      {"name": "user-agent", "value": "curl/8.4.0"},
      {"name": "x-forwarded-for", "value": "203.0.113.7"}
    ]
  }
}
```

**Configuration steps:**

- {{< ui >}}Array path{{< /ui >}}: `httpRequest.headers`
- {{< ui >}}Key attribute{{< /ui >}}: `name`
- {{< ui >}}Value attribute{{< /ui >}}: `value`
- {{< ui >}}Target attribute{{< /ui >}}: Leave blank to add the extracted attributes at the root level of the log.

**Result:**

```json
{
  "httpRequest": {
    "headers": [...]
  },
  "host": "api.example.com",
  "user-agent": "curl/8.4.0",
  "x-forwarded-for": "203.0.113.7"
}
```
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][100] with the following array processor JSON payload:

```json
{
  "type": "array-processor",
  "name": "Extract HTTP headers",
  "is_enabled": true,
  "operation" : {
    "type" : "key-value",
    "source": "httpRequest.headers",
    "key_to_extract": "name",
    "value_to_extract": "value"
  }
}
```

| Parameter                      | Type    | Required | Description                                                                                    |
|---------------------------------|---------|----------|--------------------------------------------------------------------------------------------------|
| `type`                          | String  | Yes      | Type of the processor.                                                                          |
| `name`                          | String  | No       | Name of the processor.                                                                           |
| `is_enabled`                    | Boolean | No       | Whether the processor is enabled. Default: `false`.                                           |
| `operation.type`                | String  | Yes      | Type of array processor operation.                                                               |
| `operation.source`              | String  | Yes      | Attribute path of the array to extract key-value pairs from.                                     |
| `operation.target`              | String  | No       | Attribute that receives the extracted key-value pairs. If not specified, the extracted attributes are added at the root level of the log. |
| `operation.key_to_extract`      | String  | Yes      | Key of the attribute in each array element that holds the name to use for the extracted attribute. |
| `operation.value_to_extract`    | String  | Yes      | Key of the attribute in each array element that holds the value to use for the extracted attribute. |
| `operation.override_on_conflict`| Boolean | No       | Whether to override the target attribute if it's already set. Default: `false`.               |

[100]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines

