---
title: Processing
kind: documentation
description: "Parse & Enrich your logs to create valuable facets & metrics in the Logs Explorer."
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "logs/processing/processors"
  tag: "Documentation"
  text: "Consult the full list of available Processors."
- link: "logs/processing/attributes_naming_convention"
  tag: "Documentation"
  text: "Datadog log attributes naming convention"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

{{< img src="logs/processing/processing.png" alt="Processing" responsive="true">}}

## Overview

To access the processing panel use the left `Logs` menu:

{{< img src="logs/processing/processing_panel.png" alt="Pipelines panel" responsive="true" style="width:40%;" >}}

Log processing allows you to have full control over how your logs are processed with Datadog [Pipelines][1] and [Processors][2].

* A [Pipeline][1] takes a filtered subset of incoming logs and applies over them a list of sequential Processors.
* A [Processor][2] executes within a [Pipeline][1] a data-structuring action ([Remapping an attribute][3], [Grok parsing][4]...) on a log.

[Pipelines][1] and [Processors][2] can be applied to any type of logs:

* [Integration logs](#integration-logs)
* [Custom JSON/Syslog/full text logs](#custom-logs)

Thanks to this you do not need to change how you log, and you don't need to deploy changes to any server-side processing rules, everything is happening and can be configured directly in the [Datadog processing page][5].

The other benefit to implement a log processing strategy is to implement an [attribute naming convention][6] for your organization.

## Log Processing

### Integration logs

For integration logs, we automatically install a [Integration Pipeline][7] that takes care of parsing your logs and adds the corresponding facet in your Explorer view as on this example for ELB logs:

{{< img src="logs/processing/elb_log_post_processing.png" alt="ELB log post processing" responsive="true" style="width:70%;">}}

<div class="alert alert-warning">
<a href="/integrations/#cat-log-collection">Consult the current list of available supported integrations</a>.
</div>

### Custom logs

However we know that log formats can be totally custom which is why you can define custom processing rules.
With any log syntax, you can extract all your attributes and, when necessary, remap them to more global or canonical attributes.

So for instance with custom processing rules you can transform this log:

{{< img src="logs/processing/log_pre_processing.png" alt="Log pre processing" responsive="true" style="width:50%;">}}

Into this one:

{{< img src="logs/processing/log_post_processing.png" alt="Log post processing" responsive="true" style="width:50%;">}}

Consult the dedicated [Pipelines documentation pages][1] to learn more on how to perform actions only on some subset of your logs with the [Pipeline filters][8].

To discover the full list of Processors available, refer to the dedicated [Processor documentation page][2].

If you want to learn more about pure parsing possibilities of the Datadog application, follow the [parsing training guide][9]. We also have a [parsing best practice][10] and a [parsing troubleshooting][11] guide that might be interesting for you.

## Reserved attributes

If your logs are formatted as JSON, be aware that some attributes are reserved for use by Datadog:

### *date* attribute

By default Datadog generates a timestamp and appends it in a date attribute when logs are received.
However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the the log's official date:

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

You can also specify alternate attributes to use as the source of a log's date by setting a [log date remapper Processor][12]

**Note**: Datadog rejects a log entry if its official date is older than 6 hours in the past.

<div class="alert alert-info">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

### *message* attribute

By default, Datadog ingests the value of message as the body of the log entry. That value is then highlighted and displayed in the [logstream][13], where it is indexed for [full text search][14].

### *status* attribute

Each log entry may specify a status level which is made available for faceted search within Datadog. However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the the log's official status:

* `status`
* `severity`
* `level`
* `syslog.severity`

If you would like to remap some status existing in the `status` attribute, you can do so with the [log status remapper][15]

### *host* attribute

Using the Datadog Agent or the RFC5424 format automatically sets the host value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the the log's host:

* `host`
* `hostname`
* `syslog.hostname`

### *service* attribute

Using the Datadog Agent or the RFC5424 format automatically sets the service value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the the log's service:

* `service`
* `syslog.appname`

### Edit reserved attributes

You can now control the global hostname, service, timestamp, and status main mapping that are applied before the processing Pipelines. This is particularly helpful if logs are sent in JSON or from an external Agent.

{{< img src="logs/processing/reserved_attribute.png" alt="Reserved Attribute" responsive="true" style="width:80%;">}}

To change the default values for each of the reserved attributes, go to the Pipeline page and edit the `Reserved Attribute mapping`:

{{< img src="logs/processing/reserved_attribute_tile.png" alt="Reserved Attribute Tile" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/pipelines
[2]: /logs/processing/processors
[3]: /logs/processing/processors/#attribute-remapper
[4]: /logs/processing/processors/#grok-parser
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /logs/processing/attributes_naming_convention
[7]: /logs/processing/pipelines/#integration-pipelines
[8]: /logs/processing/pipelines/#pipeline-filters
[9]: /logs/processing/parsing
[10]: /logs/faq/log-parsing-best-practice
[11]: /logs/faq/how-to-investigate-a-log-parsing-issue
[12]: /logs/processing/processors/#log-date-remapper
[13]: /logs/explorer/?tab=logstream#visualization
[14]: /logs/explorer/search
[15]: /logs/processing/processors/#log-status-remapper
