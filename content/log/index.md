---
title: Collection
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

Collecting logs is **disabled** by default in the Datadog-Agent.
In order to start to gather your logs you need to:

1. [Install the latest Datadog Agent](https://app.datadoghq.com/account/settings#agent).
2. Uncomment those lines in your `datadog.conf` file:

{{< highlight yaml >}}
# ====================================================================== #
#   Logs                                                                 #
# ====================================================================== #
# The host of the Datadog intake server to send log data to
log_dd_url: intake.logs.datadoghq.com
# The port to use when submitting the log lines
log_dd_port: 10515
{{< /highlight >}}

## Collect logs with an Integrations
To start collecting logs for an integration, you need to add a log sections in your integration yaml file, this log section need to contain:

* `type` : type of log input source (**tcp** / **udp** / **file**)
* `port` / `path` : mandatory option to specify depending on `type`. For **tcp**/**udp** `type` you have to specify the `port`, for **file** you need to specify its `path`
* `service` : name of the service owning the log
* `source` : \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
* `sourcecategory` : \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

### Examples
#### File log collection configuration
If you want to gather you nginx logs for instance stored in **/var/log/access.log** and **/var/log/error.log** you would edit your `nginx.yaml` file as follow

{{< highlight yaml >}}
init_config:
instances:
(...)
#Log section
logs:
  - type: file
    path: /var/log/access.log
    appname: nginx
    source: nginx
    sourcecategory: http_access
    tags: env:prod 

  - type: file
    path: /var/log/error.log
    appname: nginx
    source: nginx
    sourcecategory: http_error
{{< /highlight >}}

#### TCP/UDP Log collection configuration

If your java application doesn't log into a file but forwards its logs on the local 10514 port in TCP you can edit your `jmx.yaml` file as such in order to listen to this port and forward those logs to your datadog application.:

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

### `date` attribute
By default your datadog application generates a timestamp for your lag that corresponds to the reception date. This field is used to display your data over the timeline.

But if your log contain a date reserved attribute, then its value is considered as the official log timestamp, date reserved attributes are:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

You can also define any attribute as the official timestamp of your logs with the [log date remapper processor](/log/processing/#log-date-remapper)
<div class="alert alert-info">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>  and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

### `message` attribute

By default, your datadog application considers the `message` attribute as the content to display in priority in your [log list](/log/explore/#log-list).

The `message` attribute is indexed as text for the [search bar](/log/explore/#search-bar) so you can search over any tokenized word without mentioning the path to the attribute.

### `severity` attribute

Each log has its own severity, and your datadog application levrage a lot this information. Hence the `severity` attribute is unique.

If you have the log severity information in another attribute you can always remap it to the `severity` attribute with the [log severity remapper](/log/processing/#log-severity-remapper)

## What's next

* Learn how to explore your logs [here](/log/explore)
* Learn how to process your logs [here](/log/processing)
* Learn more about parsing [here](/log/parsing)