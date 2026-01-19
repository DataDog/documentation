---
title: Log Date Remapper
description: "Define a date attribute as the official log timestamp"
processor_type: date-remapper
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing dates"
---

## Overview

As Datadog receives logs, it timestamps them using the value(s) from any of these default attributes:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

If your logs have dates in an attribute that are not in this list, use the log date remapper processor to define their date attribute as the official log timestamp:

<div class="alert alert-info">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

If your logs don't have a timestamp that conforms to the formats listed above, use the grok processor to extract the epoch time from the timestamp to a new attribute. The date remapper uses the newly defined attribute.

To see how a custom date and time format can be parsed in Datadog, see [Parsing dates][3].

**Notes**:

* Log events can be submitted up to 18 hours in the past and two hours in the future.
* As of ISO 8601-1:2019, the basic format is `T[hh][mm][ss]` and the extended format is `T[hh]:[mm]:[ss]`. Earlier versions omitted the T (representing time) in both formats.
* If your logs don't contain any of the default attributes and you haven't defined your own date attribute, Datadog timestamps the logs with the date it received them.
* If multiple log date remapper processors are applied to a given log within the pipeline, the last one (according to the pipeline's order) is taken into account.

## Use cases

The Log Date Remapper is typically used to:
- Select another attribute as the date to be used for the log event, if it doesn't match our default date attributes. For example, logs coming from Akamai Stream use 'reqTimeMillis' as the timestamp. We use a Log Date Remapper to set that attribute as the log timestamp.
- Select an attribute after a grok parser. For example, logs coming from Ruby contain the log timestamp in the message attribute which is only accessible after parsing it.


## Before and after state of logs

The images below illustrate the difference between the timestamp originally present in the log message and the timestamp Datadog uses for the log event.

In the "Before" image, you can see that Datadog references its own ingestion time as the log timestamp, which may not match the actual event time found in the log message.

{{< img src="/logs/processing/processors/Date-Remapper-Before.png" alt="Logs before applying Date Remapper" style="width:100%;" >}}

After applying the Log Date Remapper, as shown in the "After" image, Datadog uses the custom timestamp from the specified attribute, aligning the log's timestamp in Datadog with the true event time recorded in the log message. This ensures historical accuracy when analyzing or searching your logs.

{{< img src="/logs/processing/processors/Date-Remapper-After.png" alt="Logs after applying Date Remapper" style="width:100%;" >}}

## API

Use the [Datadog Log Pipeline API endpoint][1] with the following log date remapper JSON payload:

```json
{
  "type": "date-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official Date of the log",
  "is_enabled": false,
  "sources": ["<SOURCE_ATTRIBUTE_1>"]
}
```

| Parameter    | Type             | Required | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                |
| `name`       | String           | no       | Name of the processor.                                |
| `is_enabled` | Boolean          | no       | If the processors is enabled or not. Default: `false`. |
| `sources`    | Array of strings | Yes      | Array of source attributes.                           |

[1]: /api/v1/logs-pipelines/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /logs/log_configuration/parsing/?tab=matchers#parsing-dates

