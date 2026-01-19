---
title: Log Message Remapper
description: "Define one or more attributes as the official log message"
processor_type: message-remapper
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

## Overview

`message` is a key attribute in Datadog. Its value is displayed in the **Content** column of the Log Explorer to provide context on the log. You can use the search bar to find a log by the log message.

Use the log message remapper processor to define one or more attributes as the official log message. Define more than one attribute for cases where the attributes might not exist and an alternative is available. For example, if the defined message attributes are `attribute1`, `attribute2`, and `attribute3`, and `attribute1` does not exist, then `attribute2` is used. Similarly, if `attribute2` does not exist, then `attribute3` is used.

To define message attributes, first use the [string builder processor](#string-builder-processor) to create a new string attribute for each of the attributes you want to use. Then, use the log message remapper to remap the string attributes as the message.

**Note**: If multiple log message remapper processors are applied to a given log within the pipeline, only the first one (according to the pipeline order) is taken into account.

## UI

Define the log message remapper processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/message_processor.png" alt="Message processor" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines

## Use cases

The Message Remapper is used to change the official message of the log event. For example, for Okta logs, we use a message remapper to map 'displayMessage' as the official message of the log.


<!-- ## Before and after state of logs -->

## API

Use the [Datadog Log Pipeline API endpoint][1] with the following log message remapper JSON payload:

```json
{
  "type": "message-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official message of the log",
  "is_enabled": true,
  "sources": ["msg"]
}
```

| Parameter    | Type             | Required | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                |
| `name`       | String           | No       | Name of the processor.                                |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`. |
| `sources`    | Array of strings | Yes      | Array of source attributes. Default: `msg`.            |

[1]: /api/v1/logs-pipelines/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

