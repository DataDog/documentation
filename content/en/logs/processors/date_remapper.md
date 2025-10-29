---
title: Log Date Remapper
processor_name: date-remapper
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
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

| Use case | Example |
| :--- | :--- |
| Select a custom attribute to define the log event's official timestamp. | For logs from Akamai Stream, remap the `reqTimeMillis` attribute as the log timestamp. |
| Remap an attribute that becomes available only after preliminary parsing. | Remap the log timestamp contained within the `message` attribute of Ruby logs after a Grok Parser has extracted it. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /logs/log_configuration/parsing/?tab=matchers#parsing-dates

