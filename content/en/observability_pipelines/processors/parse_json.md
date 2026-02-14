---
title: Parse JSON Processor
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types

further_reading:
- link: "https://www.datadoghq.com/blog/observability-pipelines-mssp"
  tag: "Blog"
  text: "Simplify log collection and aggregation for MSSPs with Datadog Observability Pipelines"

---

{{< product-availability >}}

## Overview

This processor parses the specified JSON field into objects. For example, if you have a `message` field that contains stringified JSON:

```json
{
    "foo": "bar",
    "team": "my-team",
    "message": "{\"level\":\"info\",\"timestamp\":\"2024-01-15T10:30:00Z\",\"service\":\"user-service\",\"user_id\":\"12345\",\"action\":\"login\",\"success\":true,\"ip_address\":\"192.168.1.100\"}"
    "app_id":"streaming-services",
    "ddtags": [
    "kube_service:my-service",
    "k8_deployment :your-host"
    ]
}
```

Use the Parse JSON processor to parse the `message` field so the `message` field has all the attributes within a nested object.

{{< img src="observability_pipelines/processors/parse-json-example.png" alt="The parse json processor with message as the field to parse on" style="width:60%;" >}}

This output contains the `message` field with the parsed JSON:

```json
{
    "foo": "bar",
    "team": "my-team",
    "message": {
        "action": "login",
        "ip_address": "192.168.1.100",
        "level": "info",
        "service": "user-service",
        "success": true,
        "timestamp": "2024-01-15T10:30:00Z",
        "user_id": "12345"
    }
    "app_id":"streaming-services",
    "ddtags": [
    "kube_service:my-service",
    "k8_deployment :your-host"
    ]
}
```

## Setup

To set up this processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
2. Enter the name of the field you want to parse JSON on.<br>**Note**: The parsed JSON overwrites what was originally contained in the field.

{{% observability_pipelines/processors/filter_syntax %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
