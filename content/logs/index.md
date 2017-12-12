---
title: Log Collection
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
description: "Configure your Datadog agent to gather logs from your host, containers & services."
beta: true
---

<div class="alert alert-info">
Datadog's Logs is currently available via public beta. You can apply for inclusion in the beta via <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## Overview
{{< img src="logs/index/pipeline_sketch.png" alt="Pipelines sketch" responsive="true" >}}

## Getting started with the Agent

Log collection requires an Agent version >= 6.0. Older versions of the Agent do not include the `Log collection` interface that we'll be using.
If you are not using it already, please follow the installation instructions [here](https://github.com/DataDog/datadog-agent/blob/master/docs/beta/upgrade.md).

Collecting logs is **disabled** by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

    log_enabled: true

## Enabling log collection from integrations

To start collecting logs for a given integration, you need to uncomment the logs section in that integration's yaml file, and configure it for your environment.

If an integration does not support logs by default, you may need to use the custom file configuration below.

<div class="alert alert-warning">
During the beta phase of Datadog Logs, not all integrations include log configurations out of the box. A current list of supported integrations is available below.
</div>

### Cloud
* [AWS](/logs/aws)

### Frameworks

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


## Custom log collection

The Datadog Agent can collect logs from files or the network (TCP or UDP) and forward them to Datadog. To configure this, create a new repository and yaml file named after your log source  in the Agent's **conf.d** directory ( `conf.d/python.d/conf.yaml` for python logs, ...) and set these options:


* `type` : (mandatory) type of log input source (**tcp** / **udp** / **file**)
* `port` / `path` : (mandatory) Set `port` if `type` is **tcp** or **udp**. Set `path` if `type` is **file**.
* `service` : (mandatory) name of the service owning the log
* `source` : (mandatory) attribute that defines which integration is sending the logs. "If the logs do not come from an existing integration then this field may include a custom source name. But we recommend matching this value to the namespace of any related custom metrics you are collecting, e.g, `myapp` from `myapp.request.count`)"
* `sourcecategory` : (optional) Multiple value attribute. Can be used to refine the source attribtue. Example: source:mongodb, sourcecategory:db_slow_logs
* `tags`: (optional) add tags to each log collected.

### Tail existing files
Set `type` to **file** then specify the absolute `path` to the log file you want to tail.

Example: 
If you want to gather your python app logs for instance stored in **/var/log/myapp1.log** and **/var/log/python.log** you would create a `python.d/conf.yaml` file as follows:

Please note that for the yaml file to be considered valid by the agent, they must include an "init_config" section and have at least one "instance" defined as shown below:

```yaml
init_config:

instances:
    [{}]
#Log section
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
If your PHP application does not log to a file, but instead forwards its logs via TCP, you will need to create a configuration file that specifies the port to receive as in the example below:

```yaml
init_config:

instances:
    [{}]
#Log section
logs:
  - type: tcp
    port: 10518
    service: webapp
    source: php
    sourcecategory: front

```
* [Restart your agent](https://help.datadoghq.com/hc/en-us/articles/203764515-Start-Stop-Restart-the-Datadog-Agent)

### Docker log collection

Agent 6 is able to collect logs from containers. It can be installed [on the host](https://github.com/DataDog/datadog-agent/blob/master/docs/beta/upgrade.md) or [in a container](https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent).

For containerized installation, here are the command related to log collection:

* `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`: Store on disk where to pick log file or container stdout when we restart
* `-v /var/run/docker.sock:/var/run/docker.sock:ro`: Give access to docker api to collect container stdout and stderr
* `-v /my/path/to/conf.d:/conf.d:ro`: mount configuration repository
* `-v /my/file/to/tail:/tail.log:ro`: Foreach log file that should be tailed by the agent (not required if you only want to collect container stdout or stderr)
* `DD_LOG_ENABLED=true`: Activate log collection (disable by default)
* `-e DD_API_KEY=<YOUR_API_KEY>`: Set the api key

To start collecting logs for a given container filtered by image or label, update the integration log section in its yaml file, or create a custom yaml file.
Set the type to `docker` and set the proper image or label as shown in the below example for nginx containers with a `httpd` image:

{{< highlight yaml >}}
init_config:

instances:
    [{}]

#Log section

logs:
   - type: docker
     image: httpd    #or label: mylabel:mylabelvalue
     service: nginx
     source: nginx
     sourcecategory: http_web_access

{{< /highlight >}}

If the agent is containerized, see [here](https://github.com/DataDog/docker-dd-agent#configuration-files) how to mount the YAML configuration files to the agent container.

* [Restart your agent](https://help.datadoghq.com/hc/en-us/articles/203764515-Start-Stop-Restart-the-Datadog-Agent)

### Filter logs

All logs are not equal and you may want to send only a specific subset of logs to Datadog.
To achieve this use the `log_processing_rules` parameter in your configuration file with the **exclude_at_match** `type`

If the pattern is contained in the message the log is excluded, and not sent to Datadog.

Example: Filter out logs where the user field matches the datadoghq.com domain

```yaml
init_config:

instances:
    [{}]

logs:
 - type: file
   path: /my/test/file.log
   service: cardpayment
   source: java
   log_processing_rules:
    - type: exclude_at_match
      name: exclude_datadoghq_users
      # Regexp can be anything
      pattern: User=\w+@datadoghq.com
```

### Search and replace content in your logs

If your logs contain sensitive information that you wish you redact, you can configure sequences to mask in your configuration file. This is accomplished by using the `log_processing_rules` parameter in your configuration file with the **mask_sequences** `type`.

This replaces all matched groups with `replace_placeholder` parameter value.
Example: Redact credit card numbers

```yaml
init_config:

instances:
    [{}]

logs:
 - type: file
   path: /my/test/file.log
   service: cardpayment
   source: java
   log_processing_rules:
      - type: mask_sequences
        name: mask_credit_cards
        replace_placeholder: "[masked_credit_card]"
        #One pattern that contains capture groups
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

### Multi-line

If your logs are not sent in JSON and you want to aggregate several lines into one single log, you can configure the agent to detect a new log using a specific regex pattern instead of having one log per line. This is accomplished by using the `log_processing_rules` parameter in your configuration file with the **multi_line** `type`.

This aggregates all lines into one single log until the given pattern is detected again. This is especially useful for database logs and stack traces.
Example: Every postgres log line starts with a timestamp in `YYYY-dd-mm` format. The below lines would be sent as two logs.

```
2017-12-05 10:10:46.981 UTC [1107] postgres psql postgres [local] 5a0c58f6.453 LOG:  statement: SELECT d.datname as “Name”,
               pg_catalog.pg_get_userbyid(d.datdba) as “Owner”,
               pg_catalog.pg_encoding_to_char(d.encoding) as “Encoding”,
               d.datcollate as “Collate”,
               d.datctype as “Ctype”,
               pg_catalog.array_to_string(d.datacl, E’\n’) AS “Access privileges”
        FROM pg_catalog.pg_database d
        ORDER BY 1;
2017-12-05 10:55:49.061 UTC [20535] postgres psql postgres [local] 5a0d60a5.5037 LOG:  incomplete startup packet
```

To achieve this, you need to use the following `log_processing_rules`:

```yaml
init_config:

instances:
    [{}]

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

## Reserved attributes 

If your logs are formatted as JSON, please note that some attributes are reserved for use by Datadog:

### *date* attribute

By default Datadog generates a timestamp and appends it in a date attribute when logs are received.
However, if a JSON formatted log file includes one of the following attributes, Datadog will interpret its value as the the log’s official date:

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

By default, Datadog will ingest the value of message as the body of the log entry. That value will then be highlighted and display in the [log list](/logs/explore/#log-list), where it will be indexed for [full text search](/logs/explore/#search-bar).

### *severity* attribute

Each log entry may specify a severity level which will be made available for faceted search within Datadog. However, if a JSON formatted log file includes one of the following attributes, Datadog will interpret its value as the the log’s official severity:

* `syslog.severity`

If you would like to remap some severities existing in the `severity` attribute, you can do so with the [log severity remapper](/logs/processing/#log-severity-remapper)

### *host* attribute

Using the Datadog Agent or the RFC5424 format automatically set the host value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog will interpret its value as the the log’s host:

* `syslog.hostname`

### *service* attribute

Using the Datadog Agent or the RFC5424 format automatically set the service value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog will interpret its value as the the log’s service:

* `syslog.appname`

### Edit reserved attributes

You can now control the global hostname, service, timestamp, and severity main mapping that are applied before the processing pipelines. This is particularly helpful if logs are sent in JSON or from an external agent.

{{< img src="logs/index/reserved_attribute.png" alt="Reserved Attribute" responsive="true" >}}

To change the default values for each of the reserved attributes, go to the pipeline page and edit the `Reserved Attribute mapping`:

{{< img src="logs/index/reserved_attribute_tile.png" alt="Reserved Attribute Tile" responsive="true" >}}

## What's next

* Learn how to [explore your logs](/logs/explore)
* Learn how to [process your logs](/logs/processing)
* Learn more about [parsing](/logs/parsing)
