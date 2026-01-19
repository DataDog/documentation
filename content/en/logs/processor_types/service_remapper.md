---
title: Service Remapper
description: "Assign one or more attributes as the official service"
processor_type: service-remapper
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
---

## Overview

The service remapper processor assigns one or more attributes to your logs as the official service.

**Note**: If multiple service remapper processors are applied to a given log within the pipeline, only the first one (according to the pipeline's order) is taken into account.

## Use cases

The Status Remapper is typically used to:
- Select another attribute as the service to be used for the log event, if it doesn't match our default service attribute. For example, logs coming from Microsoft 365 use 'Workload' as the service attribute. You can use a Service Remapper to set that attribute as the service.
- Select an attribute after a grok parser. For example, Bitdefender logs contains the service in the message attribute that first needs to be parsed.


<!-- ## Before and after state of logs -->

## API

Use the [Datadog Log Pipeline API endpoint][1] with the following log service remapper JSON payload:

```json
{
  "type": "service-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official log service",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Parameter    | Type             | Required | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                |
| `name`       | String           | No       | Name of the processor.                                |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`. |
| `sources`    | Array of strings | Yes      | Array of source attributes.                           |

[1]: /api/v1/logs-pipelines/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

