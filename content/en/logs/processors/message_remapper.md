---
title: Log Message Remapper
processor_name: message-remapper
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
---

## Overview

`message` is a key attribute in Datadog. Its value is displayed in the **Content** column of the Log Explorer to provide context on the log. You can use the search bar to find a log by the log message.

Use the log message remapper processor to define one or more attributes as the official log message. Define more than one attribute for cases where the attributes might not exist and an alternative is available. For example, if the defined message attributes are `attribute1`, `attribute2`, and `attribute3`, and `attribute1` does not exist, then `attribute2` is used. Similarly, if `attribute2` does not exist, then `attribute3` is used.

To define message attributes, first use the [string builder processor](#string-builder-processor) to create a new string attribute for each of the attributes you want to use. Then, use the log message remapper to remap the string attributes as the message.

**Note**: If multiple log message remapper processors are applied to a given log within the pipeline, only the first one (according to the pipeline order) is taken into account.

## Use cases

| Use case | Example |
| :--- | :--- |
| Override the log event's default message with a value from another attribute. | For Okta logs, map the `displayMessage` attribute as the log's official message. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

