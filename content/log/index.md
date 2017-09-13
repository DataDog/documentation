---
title: Log
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---
<div class="alert alert-info">
Datadog's log management solution is actualy in private beta. If you'd like to apply to participate in the private beta, please fill out <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## Overview

{{< img src="log/index/pipeline_sketch.png" alt="Pipelines sketch" >}}

## Getting started with the Agent

Collecting logs is disabled by default in the Datadog-Agent.
In order to start to gather your logs you need to:

1. [Install the latest Datadog Agent](https://app.datadoghq.com/account/settings#agent).
2. Uncomment those lines in your `datadog.conf` file:

{{< highlight yaml >}}
# ====================================================================== #
#   Logs                                                                 #
# ====================================================================== #
# The host of the Datadog intake server to send log data to
log_dd_url: intake.sheepdog.datadoghq.com
# The port to use when submitting the log lines
log_dd_port: 10515
{{< /highlight >}}

## Collect logs with an Integrations
To start collecting logs for an integration, you need to add a log sections in your integration yaml file, this log section need to contain:

* `type`
* `port` / `path`
* `appname`
* `source`

You have 3 `type` of log collection available:

* tcp : listening on a tcp port
* udp : listening on a udp port 
* file : tailing a log file

For `tcp`/`udp` type you have to specify the `port`
For `file` type you have to specify a `path`

`appname`  is the name of the application owning the log
`source` is \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

### Examples
#### Java Log collection configuration
For java log collection, you can forward your logs into the local 10514 port in TCP and edit your `java.yaml` file as such:


{{< highlight yaml >}}
init_config:
instances:
(...)
#Log section
logs:
    - type: tcp
      port: 10514
      appname: java
      source: java

{{< /highlight >}}

#### Nginx Log collection configuration
If you want to gather you nginx logs stored in **/var/log/access.log** and **/var/log/error.log** you would edit your `nginx.yaml` file as follow

{{< highlight yaml >}}
init_config:
instances:
(...)
#Log section
logs:
  - type: file:
    path: /var/log/access.log
    appname: nginx
    source: http_access, nginx
    tags: env:prod 

  - type: file
    file: /var/log/error.log
    appname: nginx
    source: http_error, nginx
{{< /highlight >}}

## Collect log from a custom log file

To send custom log file that would not be part of an existing integration. Rename `custom-logs.yaml.example` in `custom-logs.yaml` and edit the desired parameters as seen in the previous section.

{{< highlight yaml >}}
logs:
  - type: file
    path: /path/to/your/file.log
    appname: name_of_your_app
    tags: my_tag_name:my_tag_value
    source: source_name
{{< /highlight >}}

## Reserved attributes 

This section is relevant only if you log are JSON formated.
If so, you need to be aware that some JSON attributes have a specific interaction with your datadog application:

### The `date` attribute
By default your datadog application generates a timestamp for your lag that corresponds to the reception date. This field is used to display your data over the timeline.

But if your log contain a date reserved attribute, then its value is considered as the official log timestamp, date reserved attributes are:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

You can also define any attribute as the official timestamp of your logs with the [log date remapper processor](/log/pipeline/#log-date-remapper)
<div class="alert alert-info">
The recognized date formats are: `ISO8601`, `UNIX` (the milliseconds EPOCH format) and `RFC3164`.
</div>

### The `message` attribute

By default, your datadog application considers the `message` attribute as the content to display in priority in your [log list](/log/explore/#log-list).

The `message` attribute is indexed as text for the [search bar](/log/explore/#search-bar) so you can search over any tokenized word without mentioning the path to the attribute.

## What's next

* Learn how to parse your logs [here](/log/pipeline)
* Learn how to explore your logs [here](/log/explore)
* Learn more about parsing [here](/log/parsing)