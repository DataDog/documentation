---
title: Logs Not Showing the Expected Timestamp
kind: guide
aliases:
  - /logs/faq/why-do-my-logs-not-have-the-expected-timestamp
further_reading:
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

By default, when logs are received by the Datadog intake API, a timestamp is generated and appended as a date attribute. However, this default timestamp does not always reflect the actual timestamp that might be contained in the log itself. This guides walks you through how to override the default timestamp with the actual timestamp.

{{< img src="logs/guide/log_timestamp_1.png" alt="Log panel showing the log timestamp that is different from the timestamp in the message" style="width:70%;">}}

## Displayed timestamp

The log timestamp is located at the top section of the log panel. Timestamps are stored in UTC and displayed in the user's local timezone. In the above screenshot, the local profile is set to `UTC+1`, therefore the time the log was received is `11:06:16.807 UTC`.

The timestamp may not show the expected value because the timezone is incorrectly set. To check if this is the case, go to [Preferences][1] and look at the **Time zone** section.

If the timezone is correct, extract the timestamp from the message to override the log timestamp being shown.

## Raw logs

If your raw logs are not showing the expected timestamp in Datadog, [extract](#extract-the-timestamp-value-with-a-parser) the correct log timestamp from the raw logs and then [remap](#define-a-log-date-remapper) it.

#### Extract the timestamp value with a parser

1. Navigate to [Logs Pipelines][2] and click on the pipeline processing the logs.
2. Click **Add Processor**. 
3. Select **Grok Parser** for the processor type. 
4. Use the [date() matcher][3] to extract the date and pass it into a custom date attribute. See the below example, as well as [parsing dates examples][4], for details.

For a log example like this:

```
2017-12-13 11:01:03 EST | INFO | (tagger.go:80 in Init) | starting the tagging system
```

Add a parsing rule like:

```
MyParsingRule %{date("yyyy-MM-dd HH:mm:ss z"):date} \| %{word:severity} \| \(%{notSpace:logger.name}:%{integer:logger.line}[^)]*\) \|.*
``` 

The output for `MyParsingRule`'s extraction:

```
{
  "date": 1513180863000,
  "logger": {
    "line": 80,
    "name": "tagger.go"
  },
  "severity": "INFO"
}
```

The `date` attribute stores the `mytimestamp` value.

#### Define a Log Date Remapper

Add a [Log Date Remapper][5] to make sure that the value of the `date` attribute overrides the current log timestamp.

1. Navigate to [Logs Pipelines][2] and click on the pipeline processing the logs.
2. Click **Add Processor**. 
3. Select **Date remapper** as the processor type.
4. Enter a name for the processor.
5. Add **date** to the Set date attribute(s) section.
6. Click **Create**.

The following log generated at `06:01:03 EST`, which correspond to `11:01:03 UTC`, is correctly displayed as 12:01:03 (the display timezone is UTC+1 in this case).

{{< img src="logs/guide/log_timestamp_5.png" alt="Log panel showing the correct timestamp" style="width:70%;" >}}

**Note**: Any modification on a Pipeline only impacts new logs as all the processing is done at ingestion.

## JSON logs

JSON logs are automatically parsed in Datadog. The log `date` attribute is a [reserved attribute][6], so it goes through preprocessing operations for JSON logs. 

In the below example, the actual timestamp of the log is the value of the `mytimestamp` attribute and not the log timestamp `Dec 13, 2017 at 14:16:45.158`.

{{< img src="logs/guide/log_timestamp_6.png" alt="Log panel showing the log timestamp which is different from the mytimestamp attribute value in the message" style="width:50%;">}}

### Supported date formats
        
To make sure the `mytimestamp` attribute value overrides the current log timestamp being shown, you must add it as a date attribute.
        
1. Go to your [Logs Pipeline][2]. 
2. Hover over Preprocessing for JSON Logs, and click the pencil icon. 
3. Add `mytimestamp` to the list of date attributes. The date remapper looks for each of the reserved attributes in the order they are listed. To ensure the date comes from the `mytimestamp` attribute, place it first in the list.
4. Click **Save**.

There are specific date formats to follow for the remapping to work. The recognized date formats are: [ISO8601][7], [UNIX (the milliseconds EPOCH format)][8], and [RFC3164][9].

If a different date format is being used, see [Custom date format](#custom-date-format).

**Note**: Any modification on the Pipeline only impacts new logs as all the processing is done at ingestion.

### Custom date format

If the date format is not supported by the remapper by default, you can parse the date using a [Grok parser][5] and then convert it to a supported format. 

1. Go to the [Pipeline][2] that is processing the logs. If you do not have a Pipeline configured for those logs yet, create a new Pipeline for it.
2. Click **Add Processor**. 
3. Select **Grok Parser** for the processor type. 
4. Define the parsing rule based on your date format. See these [parsing dates examples][4] for details.
5. In the Advanced Settings section, add `mytimestamp` to the `Extract from` section so that this parser is applied only to the custom `mytimestamp` attribute.
6. Click **Create**.
7. Add a [Log Date Remapper][5] to map the correct timestamp to the new logs.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/preferences
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /logs/log_configuration/parsing
[4]: /logs/log_configuration/parsing/#parsing-dates
[5]: /logs/log_configuration/processors/?tabs=ui#log-date-remapper
[6]: /logs/log_configuration/pipelines/?tab=date#preprocessing
[7]: https://www.iso.org/iso-8601-date-and-time-format.html
[8]: https://en.wikipedia.org/wiki/Unix_time
[9]: https://www.ietf.org/rfc/rfc3164.txt
