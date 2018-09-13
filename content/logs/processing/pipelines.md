---
title: Pipelines
kind: documentation
description: "Parse your logs using the Grok Processor"
further_reading:
- link: "logs/processing/processors"
  tag: "Documentation"
  text: Consult the full list of available Processors
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: Logging without limit
- link: "logs/explorer"
  tag: "Documentation"
  text: Learn how to explore your logs
---

{{< img src="logs/processing/pipelines/pipelines_overview.png" alt="original log" responsive="true">}}

## Pipelines Goal

**A processing Pipeline takes a filtered subset of incoming logs and applies over them a list of sequential Processors.**

Datadog automatically parses JSON-formatted logs. When your logs are not JSON-formatted, Datadog enables you to add value to your raw logs by sending them through a processing pipeline.

With pipelines, you parse and enrich your logs by chaining them sequentially through [processors](#processors). This lets you extract meaningful information or attributes from semi-structured text to reuse them as [facets][1].

Each log that comes through the Pipelines is tested against every Pipeline filter. If it matches one then all the [processors](#processors) are applied sequentially before moving to the next pipeline.

So for instance a processing Pipeline can transform this log:

{{< img src="logs/processing/pipelines/log_pre_processing.png" alt="original log" responsive="true" style="width:50%;">}}

into this log:

{{< img src="logs/processing/pipelines/log_post_processing.png" alt=" Log post severity " responsive="true" style="width:50%;">}}

With one single pipeline:

{{< img src="logs/processing/pipelines/pipeline_example.png" alt="Pipelines example" responsive="true" style="width:75%;">}}

Pipelines take logs from a wide variety of formats and translate them into a common format in Datadog.

For instance, a first Pipeline can be defined to extract application log prefix and then each team is free to define their own Pipeline to process the rest of the log message.

## Pipeline filters

Filters let you limit what kinds of logs a Pipeline applies to.

The filter syntax is the same as the [search bar][1].

**Be aware that the Pipeline filtering is applied before any of the pipeline's Processors, hence you cannot filter on an attribute that is extracted in the Pipeline itself** 

The logstream shows which logs your Pipeline applies to:

{{< img src="logs/processing/pipelines/pipeline_filters.png" alt="Pipelines filters" responsive="true" style="width:80%;">}}

## Restrict Pipelines access to Admin users

By default pipelines can be edited by all users. As an administrator, you can activate Read-Only mode, disabling all non-admin edits to your pipelines. You can change these preferences at anytime by clicking on the below lock:

{{< img src="logs/processing/pipelines/pipeline_lock.png" alt="Reserved attribute remapper" responsive="true" style="width:70%;">}}

## Special Pipelines

### Reserved attribute Pipeline

Datadog has [a list of reserved attributes][3] such as `timestamp`, `status`, `host`, `service`, and even the log `message`, those attributes have a specific behavior within Datadog.
If you have different attribute names for those in your JSON logs, use the reserved attribute Pipeline to remap your logs attribute to one of the reserved attribute list.

For example: A service that generates the below logs:

```json
{
    "myhost": "host123",
    "myapp": "test-web-2",
    "logger_severity": "Error",
    "log": "cannot establish connection with /api/v1/test",
    "status_code": 500
}
```

Going into the reserved attribute Pipeline and changing the default mapping to this one:

{{< img src="logs/processing/pipelines/reserved_attribute_remapper.png" alt="Reserved attribute remapper" responsive="true" style="width:70%;">}}

Would then produce the following log:

{{< img src="logs/processing/pipelines/log_post_remapping.png" alt="Log post remapping" responsive="true" style="width:70%;">}}

If you want to remap an attribute to one of the reserved attributes in a custom Pipeline, use the [Log Status Remapper][4] or the [Log Date Remapper][5].

### Integration Pipelines

Datadog's integration processing Pipelines are automatically enabled and parse out your logs in appropriate and useful ways. 
As a result, you can get maximum value from many logs without any manual setup.
Note that these Pipelines are read-only, but you can clone them and then edit the clone:

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Cloning pipeline" responsive="true" style="width:80%;">}}

## Pipelines limitations

To make sure the Log Management solution functions in an optimal way, we set the following technical limits and rules to your log events, as well as to some product features. These have been designed so that you may never reach them.

### Limits applied to ingested log events

* The size of a log event should not exceed 25K bytes.
* Log events can be submitted up to 6h in the past and 2h in the future.
* A log event once converted to JSON format should contain less than 256 attributes. Each of those attribute's key should be less than 50 characters, be nested in less than 10 successive levels, and their respective value should be less than 1024 characters if promoted as a facet.
* A log event should not have more than 100 tags and each tag should not exceed 256 characters for a maximum of 10 million unique tags per day.

Log events which do not comply with these limits might be transformed or truncated by the system-or simply not indexed if outside of the provided time range. However, Datadog always tries to do its best to preserve as much as possible to preserve provided user data.

### Limits applied to provided features

* The maximum number of facets is 100.
* The maximum number of processing Pipeline on a platform is 100.
* The maximum number of Processor per Pipeline is 20.
* The maximum number of parsing rule within a grok Processor is 10. We reserve the right to disable underperforming parsing rules that might impact Datadog's service performance.

[Contact support][2] if you reach one of these limits as Datadog might be able to provide you more.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /help
[3]: /logs/processing/#reserved-attributes
[4]: /logs/processing/processors/#log-status-remapper
[5]: /logs/processing/processors/#log-date-remapper
