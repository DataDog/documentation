---
title: Logs Show Info Status For Warnings Or Errors
kind: guide
aliases:
  - /logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors
further_reading:
- link: /logs/guide/remap-custom-severity-to-official-log-status/
  tag: Documentation
  text: Learn how to remap custom severity values to the official log status
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Learn how to process your logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: Learn about parsing
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: Documentation
  text: Learn how to investigate a log parsing issue
---

## Overview

By default, when Datadog's Intake API receives a log, an `INFO` status generates and appends itself as the `status` attribute.

{{< img src="logs/guide/original_log.png" alt="Log panel showing a log with info status but the message showing warning." style="width:50%;">}}

This default `status` may not always reflect the actual status contained in the log itself. This guide walks you through how to override the default value with the actual status.

## Raw logs

If your raw logs are not showing the correct status in Datadog, [extract](#extract-the-status-value-with-a-parser) the correct log status from the raw logs and [remap](#define-a-log-status-remapper) it to the right status.

### Extract the status value with a parser

Use a Grok parser to define a rule with the [`word()` matcher][1] and extract the actual log status.

1. Navigate to [Logs Pipelines][2] and click on the pipeline processing the logs.
2. Click **Add Processor**.
3. Select **Grok Parser** for the processor type.
4. Use the [`word()` matcher][1] to extract the status and pass it into a custom `log_status` attribute. 

For example, the log may look like:

```
WARNING: John disconnected on 09/26/2017
```

Add a rule like:

```
MyParsingRule %{word:log_status}: %{word:user.name} %{word:action}.*
```

The output for `MyParsingRule`'s extraction:

```
{
  "action": "disconnected",
  "log_status": "WARNING",
  "user": {
    "name": "John"
  }
}
```

### Define a log status remapper

The `log_status` attribute contains the correct status. Add a [Log Status remapper][3] to make sure the status value in the `log_status` attribute overrides the default log status.

1. Navigate to [Logs Pipelines][2] and click on the pipeline processing the logs.
2. Click **Add Processor**.
3. Select Status remapper as the processor type.
4. Enter a name for the processor.
5. Add **log_status** to the Set status attribute(s) section.
6. Click **Create**.

{{< img src="logs/guide/log_post_processing.png" alt="Log panel showing a log with a warn status that matches the severity attribute's value of warning" style="width:50%;">}}

Modifications of a pipeline impacts new logs only because all the processing is done in the intake process.

## JSON logs

JSON logs are automatically parsed in Datadog. Because the log `status` attribute is a [reserved attribute][4], it goes through pre-processing operations for JSON logs. 

In this example, the actual status of the log is the value of the `logger_severity` attribute, not the default `INFO` log status.

{{< img src="logs/guide/new_log.png" alt="Log panel showing a log with info status but the logger_severity attribute value is error" style="width:50%;">}}

To make sure the `logger_severity` attribute value overrides the default log status, add `logger_severity` to the list of status attributes.

1. Navigate to [Logs Pipelines][2] and click on the pipeline processing the logs.
2. Hover over Preprocessing for JSON Logs, and click the pencil icon.
3. Add `logger_severity` to the list of status attributes. The status remapper looks for every reserved attribute in the order they are listed. To ensure the status comes from the `logger_severity` attribute, place it first in the list.
4. Click **Save**.

{{< img src="logs/guide/new_log_remapped.png" alt="Log panel showing a log with an error status that matches the logger_severity attribute value of error" style="width:50%;">}}

Modifications of a pipeline impacts new logs only because all the processing is done in the ingestion process. New logs are correctly configured with the `logger_severity` attribute value.

In order for the remapping to work, you must adhere to the status formats specified in the [Processors documentation][3]. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/parsing
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /logs/log_configuration/processors/#log-status-remapper
[4]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
