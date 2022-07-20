---
title: Logs Show Info Status for Warnings or Errors
kind: guide
aliases:
  - /logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors
further_reading:
- link: "/logs/guide/remap-custom-severity-to-official-log-status/"
  tag: "Guide"
  text: "Learn how to remap custom severity values to the official log status"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/faq/how-to-investigate-a-log-parsing-issue/"
  tag: "FAQ"
  text: "How to investigate a log parsing issue?"
---

By default, when Datadog's intake API receives a log, a status `INFO` is generated and appended as the `status` attribute. However, this default `status` does not always reflect the actual status that might be contained in the log itself. This guide walks through how to override the default value with the actual status.

{{< img src="logs/guide/original_log.png" alt="Log panel showing a log with info status but the message showing warning." style="width:50%;">}}

## Raw logs

If your raw logs are not showing the correct status in Datadog, [extract](#extract-the-status-value-with-a-parser) the correct log status from the raw logs and then [remap](#define-a-log-status-remapper) it.

#### Extract the status value with a parser

Use a Grok parser to define a rule with the [word() matcher][1] to extract the actual log status.

1. Go to your [Logs Pipeline][2].
2. Click **Add Processor**.
3. Select **Grok Parser** for the processor type.
4. Use the [word() matcher][1] to extract the status and pass it into a custom `log_status` attribute. 

Log example:

```
WARNING: John disconnected on 09/26/2017
```

Rule:

```
MyParsingRule %{word:log_status}: %{word:user.name} %{word:action}.*
```

The output for MyParsingRule's extraction:

```
{
  "action": "disconnected",
  "log_status": "WARNING",
  "user": {
    "name": "John"
  }
}
```

#### Define a log status remapper

The `log_status` attribute contains the correct status. Add a [Log Status remapper][3] to make sure the status value in the `log_status` attribute overrides the default log status.

1. Go to your [Logs Pipeline][2].
2. Click **Add Processor**.
3. Select Status remapper as the processor type.
4. Enter a name for the processor.
5. Add **log_status** to the Set status attribute(s) section.
6. Click **Create**.

**Note**: Any modification on a Pipeline only impacts new logs as all the processing is done during the intake process.

{{< img src="logs/guide/log_post_processing.png" alt="Log panel showing a log with a warn status that matches the severity attribute's value of warning" style="width:50%;">}}

## JSON logs

JSON logs are automatically parsed in Datadog. The log `status` attribute is a [reserved attribute][4], so it goes through preprocessing operations for JSON logs. 

In the below example, the actual status of the log is the value of the `logger_severity` attribute and not the default log status `INFO`.

{{< img src="logs/guide/new_log.png" alt="Log panel showing a log with info status but the logger_severity attribute value is error" style="width:50%;">}}

To make sure the `logger_severity` attribute value overrides the default log status, add `logger_severity` to the list of status attributes.

1. Go to your [Logs Pipeline][2].
2. Hover over Preprocessing for JSON Logs, and click the pencil icon.
3. Add `logger_severity` to the list of Status attributes. The status remapper looks for each of the reserved attributes in the order they are listed. To ensure the status comes from the `logger_severity` attribute, place it first in the list.
4. Click **Save**.

**Note**: Any modification on the Pipeline only impacts new logs as all the processing is done at ingestion.

New logs are correctly configured with the `logger_severity` attribute value.

{{< img src="logs/guide/new_log_remapped.png" alt="Log panel showing a log with an error status that matches the logger_severity attribute value of error" style="width:50%;">}}

There are specific status formats that must be adhered to for the remapping to work. The recognized status formats are explained in the [status remapper description][3]. 

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/parsing
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /logs/log_configuration/processors/#log-status-remapper
[4]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
