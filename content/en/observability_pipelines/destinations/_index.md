---
title: Destinations
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Use the Observability Pipelines Worker to send your processed logs to different destinations. Most Observability Pipelines destinations send events in batches to the downstream integration. See [Event batching](#event-batching) for more information. Some Observability Pipelines' destinations also have fields that support template syntax so you can set those fields based on specific log fields. See [Template syntax](#template-syntax) for more information.

Select a destination in the left navigation menu to see more information about it.

## Template syntax

Logs are often stored in separate indexes based on log data, such as the service or environment the logs are coming from or another log attribute. In Observability Pipelines, you can use template syntax to route your logs to different indexes based on specific log fields.

When the Observability Pipelines Worker cannot resolve the field with the template syntax, the Worker defaults to a specified behavior for that destination. For example, if you are using the template `{{application_id}}` for the Amazon S3 destination's **Prefix** field, but there isn't an `application_id` field in the log, the Worker creates a folder called `OP_UNRESOLVED_TEMPLATE_LOGS/` and publishes the logs there.

The following table lists the destinations and fields that support template syntax, and what happens when the Worker cannot resolve the field:

| Destination       | Fields that support template syntax | Behavior when the field cannot be resolved                                                                                 |
|-------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Amazon Opensearch | Index                               | The Worker writes logs to the `datadog-op` index.                                                                          |
| Amazon S3         | Prefix                              | The Worker creates a folder named `OP_UNRESOLVED_TEMPLATE_LOGS/` and writes the logs there.                                |
| Azure Blob        | Prefix                              | The Worker creates a folder named `OP_UNRESOLVED_TEMPLATE_LOGS/` and writes the logs there.                                |
| Elasticsearch     | Index                               | The Worker writes logs to the `datadog-op` index.                                                                          |
| Google Chronicle  | Log type                            | Defaults to `DATADOG` log type.                                                                                            |
| Google Cloud      | Prefix                              | The Worker creates a folder named `OP_UNRESOLVED_TEMPLATE_LOGS/` and writes the logs there.                                |
| Opensearch        | Index                               | The Worker writes logs to the `datadog-op` index.                                                                          |
| Splunk HEC        | Index<br>Source type                | The Worker sends the logs to the default index configured in Splunk.<br>The Worker defaults to the `httpevent` sourcetype. |

#### Example

If you want to route logs based on the log's application ID field (for example, `application_id`) to the Amazon S3 destination, use the event fields syntax in the **Prefix to apply to all object keys** field.

{{< img src="observability_pipelines/amazon_s3_prefix.png" alt="The Amazon S3 destination showing the prefix field using the event fields syntax /application_id={{ application_id }}/" style="width:40%;" >}}

### Syntax

#### Event fields

Use `{{ <field_name> }}` to access individual log event fields. For example:

```
{{ application_id }}
```

#### Strftime specifiers

Use [strftime specifiers][3] for the date and time. For example:

```
year=%Y/month=%m/day=%d
```

#### Escape characters

Prefix a character with `\` to escape the character. This example escapes the event field syntax:

```
\{{ field_name }}
```

This example escapes the strftime specifiers:

```
year=\%Y/month=\%m/day=\%d/
```

## Event batching

Observability Pipelines destinations send events in batches to the downstream integration. A batch of events is flushed when one of the following parameters is met:

- Maximum number of events
- Maximum number of bytes
- Timeout (seconds)

For example, if a destination's parameters are:

- Maximum number of events = 2
- Maximum number of bytes = 100,000
- Timeout (seconds) = 5

And the destination receives 1 event in a 5-second window, it flushes the batch at the 5-second timeout.

If the destination receives 3 events within 2 seconds, it flushes a batch with 2 events and then flushes a second batch with the remaining event after 5 seconds. If the destination receives 1 event that is more than 100,000 bytes, it flushes this batch with the 1 event.

{{% observability_pipelines/destination_batching %}}

[1]: /observability_pipelines/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: https://docs.rs/chrono/0.4.19/chrono/format/strftime/index.html#specifiers
