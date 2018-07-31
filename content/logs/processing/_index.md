---
title: Processing
kind: documentation
description: "Parse & Enrich your logs to create valuable facets & metrics in the Logs Explorer."
further_reading:
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: Learn more about parsing.
- link: "logs/processing/attributes_naming_convention"
  tag: "Documentation"
  text: Datadog log attributes naming convention.
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: Control the volume of logs indexed by Datadog.
---

## Overview

To access the processing panel use the left `Logs` menu:

{{< img src="logs/processing/processing_panel.png" alt="Pipelines panel" responsive="true" style="width:50%;" >}}

## Log Processing

For logs that originate from an integration, you can skip this section since Datadog’s integration processing pipelines will be automatically enabled and parse out your logs in appropriate and useful ways. Even for custom logs, if they are in JSON or Syslog format, we have integration processors to automatically extract meaningful attributes from the raw logs. As a result, you can get maximum value from many logs without any manual setup.

That said, if you have modified your integration logs, or if your custom logs are not in JSON or Syslog format, you still have full control over how your logs are processed from the Processing Pipeline page in your centralized Datadog app. Thanks to this, in order to change how your log management consumes your logs, you do not need to change how you log, and you don’t need to deploy changes to server-side processing rules.

### JSON logs

In Datadog we have [reserved attributes][24] such as `timestamp`, `status`, `host`, `service`, and even the log `message`.
If you have different attribute names for those, no worries: we have [reserved attributes remappers][25] available in the pipeline.

For example: A service generates the below logs:

```json
{
    "myhost": "host123",
    "myapp": "test-web-2",
    "logger_severity": "Error",
    "log": "cannot establish connection with /api/v1/test",
    "status_code": 500
}
```

Going to the pipeline and changing the default mapping to this one:

{{< img src="logs/processing/reserved_attribute_remapper.png" alt="Reserved attribute remapper" responsive="true" style="width:70%;">}}

Would then give the following log:

{{< img src="logs/processing/log_post_remapping.png" alt="Log post remapping" responsive="true" style="width:70%;">}}

### Custom log processing rules

For integration logs, we automatically install a pipeline that takes care of parsing your logs as on this example for ELB logs:

{{< img src="logs/processing/elb_log_post_processing.png" alt="ELB log post processing" responsive="true" style="width:70%;">}}

* A [pipeline][7] takes a filtered subset of incoming logs and applies over them a list of sequential processors.
* A processor executes within a [pipeline][7] a data-structuring action ([Remapping an attribute][9], [Grok parsing][10]…) on a log.


However we know that log formats can be totally custom which is why you can define custom processing rules.
With any log syntax, you can extract all your attributes and, when necessary, remap them to more global or canonical attributes.

So for instance with custom processing rules you can transform this log:

{{< img src="logs/processing/log_pre_processing.png" alt="Log pre processing" responsive="true" style="width:50%;">}}

Into this one:

{{< img src="logs/processing/log_post_processing.png" alt="Log post processing" responsive="true" style="width:50%;">}}

Follow our [parsing training guide][11] to learn more about parsing.
We also have a [parsing best practice][12] and a [parsing troubleshooting][13] guide that might be interesting for you.
There are many kinds of processors; find the full list and how to use them [here][14].

## Reserved attributes

If your logs are formatted as JSON, be aware that some attributes are reserved for use by Datadog:

### *date* attribute

By default Datadog generates a timestamp and appends it in a date attribute when logs are received.
However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the the log’s official date:

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

You can also specify alternate attributes to use as the source of a log's date by setting a [log date remapper processor][4]

**Note**: Datadog rejects a log entry if its official date is older than 6 hours in the past.

<div class="alert alert-info">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

### *message* attribute

By default, Datadog ingests the value of message as the body of the log entry. That value is then highlighted and displayed in the [logstream][16], where it is indexed for [full text search][17].

### *status* attribute

Each log entry may specify a status level which is made available for faceted search within Datadog. However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the the log’s official status:

* `status`
* `severity`
* `level`
* `syslog.severity`

If you would like to remap some status existing in the `status` attribute, you can do so with the [log status remapper][18]

### *host* attribute

Using the Datadog Agent or the RFC5424 format automatically sets the host value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the the log’s host:

* `host`
* `hostname`
* `syslog.hostname`

### *service* attribute

Using the Datadog Agent or the RFC5424 format automatically sets the service value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the the log’s service:

* `service`
* `syslog.appname`

### Edit reserved attributes

You can now control the global hostname, service, timestamp, and status main mapping that are applied before the processing pipelines. This is particularly helpful if logs are sent in JSON or from an external Agent.

{{< img src="logs/processing/reserved_attribute.png" alt="Reserved Attribute" responsive="true" style="width:80%;">}}

To change the default values for each of the reserved attributes, go to the pipeline page and edit the `Reserved Attribute mapping`:

{{< img src="logs/processing/reserved_attribute_tile.png" alt="Reserved Attribute Tile" responsive="true" style="width:80%;">}}

## Technical limits

To make sure the Log Management solution functions in an optimal way we set the following technical limits and rules to your log events as well as to some product features. These have been designed so you may never reach them.

### Limits applied to ingested log events

* The size of a log event should not exceed 25K bytes.
* Log events can be submitted up to 6h in the past and 2h in the future.
* A log event once converted to JSON format should contain less than 256 attributes, each of those attribute’s key should be less than 50 characters, be nested in less than 10 successive levels and their respective value be less than 1024 characters if promoted as a facet.
* A log event should not have more than 100 tags and each tag should not exceed 256 characters for a maximum of 10 millions unique tag per day.

Log events which do not comply with these limits might be transformed or truncated by the system. Or simply not indexed if outside of the provided time range. However, be sure that Datadog always tries to do its best to preserve as much as possible the provided user data.

### Limits applied to provided features

* The maximum number of facets is 100.
* The maximum number of processing pipeline on a platform is 100.
* The maximum number of processor per pipeline is 20.
* The maximum number of parsing rule within a grok processor is 10. We reserve the right to disable underperforming parsing rules that might impact our service performance.

[Contact support][15] if you reach one of these limits as Datadog might be able to provide you more.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explore/#facets
[2]: /logs/explore/#search-bar
[3]: /logs/processing/parsing
[4]: /logs/processing/processors/#log-date-remapper
[5]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[6]: https://docs.datadoghq.com/getting_started/tagging/#tags-best-practices
[7]: /logs/processing/#processing-pipelines
[8]: /logs/processing/#reserved-attributes
[9]: /logs/processing/#attribute-remapper
[10]: /logs/processing/processors/#grok-parser
[11]: /logs/processing/parsing/
[12]: /logs/faq/log-parsing-best-practice/
[13]: /logs/faq/how-to-investigate-a-log-parsing-issue/
[14]: /logs/processing/processors/
[15]: /help
[16]: /logs/explore/#logstream
[17]: /logs/explore/#search-bar
[18]: /logs/processing/processors/#log-status-remapper