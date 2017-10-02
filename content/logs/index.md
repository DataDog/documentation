---
title: Collection
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---

<div class="alert alert-info">
Datadog's log management is currently in private beta. If you would like to apply for it, please fill out <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## Overview
{{< img src="logs/index/pipeline_sketch.png" alt="Pipelines sketch" >}}

## Getting started with the Agent

Collecting logs is **disabled** by default in the Datadog Agent.
To start gathering logs:

Install the Log-Specific Datadog Agent:

    sudo sh -c "echo 'deb http://apt.datad0g.com/ beta main' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys C7A7DA52
    sudo apt-get update

To validate apt is properly configured,  you can check if the following command returns results like 1:5.17.3~logsbeta.1-1 500

    apt-cache policy datadog-agent | grep logs

Then to install the agent:

    sudo apt-get install datadog-agent=1:5.17.3~logsbeta.2-1 -y


* In the `conf.d` folder, create the `logs-agent.yaml` file with the following content: 

{{< highlight yaml >}}
init_config:
instances:
    [{}]

#(mandatory)Same api_key than in datadog.conf
api_key: <YOUR_DATADOG_API_KEY>
#(optional): same hostname than in Datadog.conf - used for host tags and links with metrics
#hostname:  
#If you need to change the port used to send the log - default is secured
#log_dd_port: 10516
#If you do not want to use ssl to send your logs
#skip_ssl_validation: false

{{< /highlight >}}

* [Restart your agent](https://help.datadoghq.com/hc/en-us/articles/203764515-Start-Stop-Restart-the-Datadog-Agent)

## Enabling log collection from integrations

To start collecting logs for an integration, you need to uncomment the log sections in your integration yaml file, and then set its parameters' values according to your infrastructure.

If you don't find a log section in your file you need to use the custom file configuration below instead. 

<div class="alert alert-warning">
You might not find any log section in your yaml files during the private beta, however please find below the list of integrations and their yaml files that are supported:
</div>

* Apache: [apache.yaml.example](https://github.com/DataDog/integrations-core/blob/nils/Logs-integration-beta/apache/conf.yaml.example)
* Haproxy: [haproxy.yaml.example](https://github.com/DataDog/integrations-core/blob/nils/Logs-integration-beta/haproxy/conf.yaml.example)
* IIS: [iis.yaml.example](https://github.com/DataDog/integrations-core/blob/nils/Logs-integration-beta/iis/conf.yaml.example)
* Java: [java.yaml.example](https://gist.github.com/NBParis/d977edbb2fc3fb4c1d47f8542661ceff)
* Mongo: [mongo.yaml.example](https://github.com/DataDog/integrations-core/blob/nils/Logs-integration-beta/mongo/conf.yaml.example)
* Nginx: [nginx.yaml.example](https://github.com/DataDog/integrations-core/blob/nils/Logs-integration-beta/nginx/conf.yaml.example)

## Custom log collection

The Datadog Agent can collect logs from files or the network (TCP or UDP) and forward them to Datadog. To configure this, rename the `custom-logs.yaml.example` file to `custom-logs.yaml` (or to some other unused `*.yaml` name) and set these options:


* `type` : (mandatory) type of log input source (**tcp** / **udp** / **file**)
* `port` / `path` : (mandatory) Set `port` if `type` is **tcp** or **udp**. Set `path` if `type` is **file**.
* `service` : (mandatory) name of the service owning the log
* `source` : (mandatory) attribute that defines which integration is sending the logs. If the logs don't come from any integration, set this to anything you like (but we recommend matching this value to the namespace of any related custom metrics you are collecting, e.g, `myapp` from `myapp.request.count`)
* `sourcecategory` : (optional) Multiple value attribute. Can be used to refine the source attribtue. Example: source:mongodb, sourcecategory:db_slow_logs
* `tags`: (optional) add tags to each log collected.

### Tail existing files
Set `type` to **file** then specify the absolute `path` to the log file you want to tail.

Example: 
If you want to gather your python app logs for instance stored in **/var/log/myapp1.log** and **/var/log/python.log** you would create a `python.yaml` file as follows:

Please note that for the yaml file to be considered as correct by the agent, you need to add the “init_config” section and have at least one “instance" defined as we show below."

{{< highlight yaml >}}
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
{{< /highlight >}}

### Stream logs through TCP/UDP
Set `type` to **tcp** or **udp** depending of your protocol then specify the `port` of your incomming connection.

Example: 
If your PHP application doesn't log into a file but forwards its logs locally to TCP port 10518, create a `php.yaml` file like so in order to listen to this port and forward those logs to your datadog application:

{{< highlight yaml >}}
init_config:

instances:
    [{}]
#Log section
logs:
  - type: tcp
    path: 10518
    service: webapp
    source: php
    sourcecategory: front

{{< /highlight >}}

## Reserved attributes 

This section is relevant only if your logs are JSON formatted.
If so, you need to be aware that some JSON attributes have some special meanings for Datadog.

### `date` attribute
By default Datadog generates a timestamp on any logs that come through.

However, if a JSON log includes one of the following attributes, Datadog will interpret its value as the the log’s official date:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

You can also ask Datadog to interpret the value of any other attribute as the log’s official date if you set a [log date remapper processor](/logs/processing/#log-date-remapper)
<div class="alert alert-info">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>  and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

### `message` attribute

By default, Datadog considers the `message` value as the main content of the log. That value will then have a special display in the [log list](/logs/explore/#log-list) and you can run full text search on it.

The `message` attribute is indexed as text for the [search bar](/logs/explore/#search-bar), allowing you to search over any tokenized word without mentioning the path to the attribute.

### `severity` attribute

Each log has its own severity, and your datadog application will levrage a lot with this information.

If you would like to remap some severities existing in the `severity` attribute, you can do so with the [log severity remapper](/logs/processing/#log-severity-remapper)

## What's next

* Learn how to [explore your logs](/logs/explore)
* Learn how to [process your logs](/logs/processing)
* Learn more about [parsing](/logs/parsing)