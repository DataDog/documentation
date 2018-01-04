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

Collecting logs is **disabled** by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

    log_enabled: true

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

* Apache: [apache.d/conf.yaml.example](https://github.com/DataDog/integrations-core/blob/nils/Logs-integration-beta/apache/conf.yaml.example)
* Haproxy: [haproxy.d/conf.yaml.example](https://github.com/DataDog/integrations-core/blob/nils/Logs-integration-beta/haproxy/conf.yaml.example)
* IIS: [iis.d/conf.yaml.example](https://github.com/DataDog/integrations-core/blob/nils/Logs-integration-beta/iis/conf.yaml.example)
* Mongo: [mongo.d/conf.yaml.example](https://github.com/DataDog/integrations-core/blob/nils/Logs-integration-beta/mongo/conf.yaml.example)
* Nginx: [nginx.d/conf.yaml.example](https://github.com/DataDog/integrations-core/blob/nils/Logs-integration-beta/nginx/conf.yaml.example)
* PostgreSQL: [postgres.d/conf.yaml.example](https://github.com/DataDog/integrations-core/blob/nils/Logs-integration-beta/postgres/conf.yaml.example)

## Custom log collection

The Datadog Agent can collect logs from files or the network (TCP or UDP) and forward them to Datadog. To configure this, create a new repository and yaml file named after your log source  in the Agent's **conf.d** directory ( `conf.d/python.d/conf.yaml` for python logs, ...) and set these options:

* `type` : (mandatory) type of log input source (**tcp** / **udp** / **file**)
* `port` / `path` : (mandatory) Set `port` if `type` is **tcp** or **udp**. Set `path` if `type` is **file**.
* `service` : (mandatory) name of the service owning the log
* `source` : (mandatory) attribute that defines which integration is sending the logs. "If the logs do not come from an existing integration then this field may include a custom source name. But we recommend matching this value to the namespace of any related [custom metrics](/getting_started/custom_metrics/) you are collecting, e.g, `myapp` from `myapp.request.count`)"
* `sourcecategory` : (optional) Multiple value attribute. Can be used to refine the source attribtue. Example: source:mongodb, sourcecategory:db_slow_logs
* `tags`: (optional) add tags to each log collected.

### Tail existing files
Set `type` to **file** then specify the absolute `path` to the log file you want to tail.

Example: 
To gather python applications stored in **/var/log/myapp1.log** and **/var/log/python.log** create a `python.d/conf.yaml` file as follows::

Note that for the yaml file to be considered valid by the agent, they must include an "init_config" section and have at least one "instance" defined as shown below:

```yaml
init_config:
instances:

##Log section
logs:

  - type: file
    path: /var/log/myapp1.log
    service: myapp1
    source: python
    sourcecategory: sourcecode
    tags: env:prod

  - type: file
    path: /var/log/python.log
    service: myapplication
    source: python
    sourcecategory: sourcecode
```
* [Restart your agent](https://help.datadoghq.com/hc/en-us/articles/203764515-Start-Stop-Restart-the-Datadog-Agent)

### Stream logs through TCP/UDP
Set `type` to **tcp** or **udp** depending of your protocol then specify the `port` of your incomming connection.

Example:
If your PHP application does not log to a file, but instead forwards its logs via TCP, create a configuration file that specifies the port to receive as in the example below:

```yaml
init_config:
instances:

##Log section
logs:
  - type: tcp
    port: 10518
    service: webapp
    source: php
    sourcecategory: front

```
* [Restart your agent](https://help.datadoghq.com/hc/en-us/articles/203764515-Start-Stop-Restart-the-Datadog-Agent)

### Filter logs

All logs are not equal and you may want to send only a specific subset of logs to Datadog.  
To achieve this use the `log_processing_rules` parameter in your configuration file with the **exclude_at_match** or **include_at_match** `type`.

* **exclude_at_match**: If the pattern is contained in the message the log is excluded, and not sent to Datadog.
  Example: Filtering out logs that contain a Datadog email

```yaml
init_config:
instances:

logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_at_match
      name: exclude_datadoghq_users
      ## Regexp can be anything
      pattern: User=\w+@datadoghq.com
```

* **include_at_match**: Only log with a message that includes the pattern are sent to Datadog.
  Example: Sending only logs that contain a Datadog email

```yaml
init_config:
instances:

logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```


### Search and replace content in your logs

If your logs contain sensitive information that you wish you redact, configure the Datadog Agent to mask sensitive sequences by using the `log_processing_rules` parameter in your configuration file with the **mask_sequences** `type`.

This replaces all matched groups with `replace_placeholder` parameter value.
Example: Redact credit card numbers

```yaml
init_config:
instances:

logs:
 - type: file
   path: /my/test/file.log
   service: cardpayment
   source: java
   log_processing_rules:
      - type: mask_sequences
        name: mask_credit_cards
        replace_placeholder: "[masked_credit_card]"
        ##One pattern that contains capture groups
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

### Multi-line aggregation

If your logs are not sent in JSON and you want to aggregate several lines into one single entry, configure the Datadog Agent to detect a new log using a specific regex pattern instead of having one log per line.  

This is accomplished by using the `log_processing_rules` parameter in your configuration file with the **multi_line** `type`.

This aggregates all lines into one single entry until the given pattern is detected again. This is especially useful for database logs and stack traces.
Example: Every java log line starts with a timestamp with `YYYY-dd-mm` format. The below lines including a stack trace would be sent as two logs.

```
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz

```

To achieve this, you need to use the following `log_processing_rules`:

```yaml
init_config:
instances:

logs:
 - type: file
   path: /var/log/pg_log.log
   service: database
   source: postgresql
   log_processing_rules:
      - type: multi_line
        name: new_log_start_with_date
        pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

### Tail multiple directories or whole directories by using wildcards

If your log files are labeled by date or all stored in the same directory, configure your Datadog Agent to monitor them all and automatically detect new ones by using wildcards in the `path` attribute.

* Using `path: /var/log/myapp/*.log`:
  * Matches all `.log` file contained in the `/var/log/myapp/` directory. 
  * Doesn't match `/var/log/myapp/myapp.conf`.

* Using `path: /var/log/myapp/*/*.log`:
  * Matches `/var/log/myapp/log/myfile.log`.
  * Matches `/var/log/myapp/errorLog/myerrorfile.log` 
  * Doesn't match `/var/log/myapp/mylogfile.log`.

Configuration example:

```yaml
init_config:
instances:

logs:
 - type: file
   path: /var/log/myapp/*.log
   service: mywebapp
   source: go
```


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

<div class="alert alert-info">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>  and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

### *message* attribute

By default, Datadog ingests the value of message as the body of the log entry. That value is then highlighted and display in the [logstream](/logs/explore/#logstream), where it is indexed for [full text search](/logs/explore/#search-bar).

### *severity* attribute

Each log entry may specify a severity level which is made available for faceted search within Datadog. However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the the log’s official severity:

* `syslog.severity`

If you would like to remap some severities existing in the `severity` attribute, you can do so with the [log severity remapper](/logs/processing/#log-severity-remapper)

### *host* attribute

Using the Datadog Agent or the RFC5424 format automatically set the host value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the the log’s host:

* `syslog.hostname`

### *service* attribute

Using the Datadog Agent or the RFC5424 format automatically set the service value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the the log’s service:

* `syslog.appname`

### Edit reserved attributes

You can now control the global hostname, service, timestamp, and severity main mapping that are applied before the processing pipelines. This is particularly helpful if logs are sent in JSON or from an external agent.

{{< img src="logs/index/reserved_attribute.png" alt="Reserved Attribute" responsive="true" popup="true">}}

To change the default values for each of the reserved attributes, go to the pipeline page and edit the `Reserved Attribute mapping`:

{{< img src="logs/index/reserved_attribute_tile.png" alt="Reserved Attribute Tile" responsive="true" popup="true">}}

## Further Reading

{{< whatsnext >}}
    {{< nextlink href="/logs/explore" tag="Documentation" >}}Learn how to explore your logs{{< /nextlink >}}
    {{< nextlink href="/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers" tag="FAQ" >}}How to Send Logs to Datadog via External Log Shippers{{< /nextlink >}}
    {{< nextlink href="/logs/parsing" tag="Documentation" >}}Learn more about parsing{{< /nextlink >}}
{{< /whatsnext >}}
