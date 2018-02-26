---
title: Log Collection
kind: Documentation
description: "Configure your Datadog agent to gather logs from your host, containers & services."
---

<div class="alert alert-info">
Datadog's Logs is currently available via public beta. You can apply for inclusion in the beta via <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## Overview

{{< img src="logs/index/pipeline_sketch.png" alt="Pipelines sketch" responsive="true" popup="true">}}

## Getting started with the Agent

Log collection requires an Agent version >= 6.0. Older versions of the Agent do not include the `Log collection` interface that is used for log collection.

If you are not using it already, please follow [the agent installation instruction](https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md).

Collecting logs is **disabled** by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

```
logs_enabled: true
```

The Datadog agent sends its logs to Datadog over TLS-encrypted TCP. This requires outbound communication over port `10516`.

## Agent setup 

Refer to [the dedicated Datadog Agent documentation](/agent/log_collection) to learn about all agent configuration options:

* [Tail existing files](/agent/log_collection/#tail-existing-files)
* [Stream logs through TCP/UDP](/agent/log_collection/#stream-logs-through tcp-udp)
* [Filter logs](/agent/log_collection/#filter-logs)
* [Scrub sensitive data in your logs](/agent/log_collection/#Scrub-sensitive-data-in-your-logs)
* [Multi-line aggregation](/agent/log_collection/#multi-line-aggregation)
* [Tail multiple directories or whole directories by using wildcards](/agent/log_collection/#tail-multiple-directories-or-whole-directories-by-using-wildcards)


## Enabling log collection from integrations

To start collecting logs for a given integration, you need to uncomment the logs section in that integration's yaml file, and configure it for your environment.

If an integration does not support logs by default, you may need to use the custom file configuration below.

<div class="alert alert-warning">
During the beta phase of Datadog Logs, not all integrations include log configurations out of the box. A current list of supported integrations is available below.
</div>

### Containers 
* [Docker](/logs/docker)

### Cloud
* [AWS](/logs/aws)

### Languages

* [Java](/logs/languages/java) 
* [C#](/logs/languages/csharp)
* [Go](/logs/languages/go)
* [NodeJs](/logs/languages/nodejs)
* [Ruby](/logs/languages/ruby)

### Agent checks

* [Apache](/integrations/apache/#log-collection)
* [Haproxy](/integrations/haproxy/#log-collection)
* [IIS](/integrations/iis/#log-collection)
* [Mongo](/integrations/mongo/#log-collection)
* [MySQL](/integrations/mysql/#log-collection)
* [Nginx](/integrations/nginx/#log-collection)
* [PostgreSQL](/integrations/postgres/#log-collection)
* [Varnish](/integrations/varnish/#log-collection)

### The Advantage of Collecting JSON-formatted logs

Datadog automatically parses JSON-formatted logs. For this reason, when you have control over the log format you send to Datadog, we encourage you to format them as JSON to avoid the need for custom parsing rules.

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

You can also specify alternate attributes to use as the source of a log's date by setting a [log date remapper processor](/logs/processing/#log-date-remapper)

**Note**: Datadog rejects a log entry if its official date is older than 18 hours in the past.

<div class="alert alert-info">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>  and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

### *message* attribute

By default, Datadog ingests the value of message as the body of the log entry. That value is then highlighted and display in the [logstream](/logs/explore/#logstream), where it is indexed for [full text search](/logs/explore/#search-bar).

### *status* attribute

Each log entry may specify a status level which is made available for faceted search within Datadog. However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the the log’s official status:

* `severity`
* `level`
* `syslog.severity`

If you would like to remap some status existing in the `status` attribute, you can do so with the [log status remapper](/logs/processing/#log-status-remapper)

### *host* attribute

Using the Datadog Agent or the RFC5424 format automatically set the host value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the the log’s host:

* `syslog.hostname`

### *service* attribute

Using the Datadog Agent or the RFC5424 format automatically set the service value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the the log’s service:

* `syslog.appname`

### Edit reserved attributes

You can now control the global hostname, service, timestamp, and status main mapping that are applied before the processing pipelines. This is particularly helpful if logs are sent in JSON or from an external agent.

{{< img src="logs/index/reserved_attribute.png" alt="Reserved Attribute" responsive="true" popup="true" style="width:80%;">}}

To change the default values for each of the reserved attributes, go to the pipeline page and edit the `Reserved Attribute mapping`:

{{< img src="logs/index/reserved_attribute_tile.png" alt="Reserved Attribute Tile" responsive="true" popup="true" style="width:80%;">}}

## Further Reading

{{< whatsnext >}}
    {{< nextlink href="/logs/explore" tag="Documentation" >}}Learn how to explore your logs{{< /nextlink >}}
    {{< nextlink href="/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers" tag="FAQ" >}}How to Send Logs to Datadog via External Log Shippers{{< /nextlink >}}
    {{< nextlink href="/logs/parsing" tag="Documentation" >}}Learn more about parsing{{< /nextlink >}}
{{< /whatsnext >}}
