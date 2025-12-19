---
title: Log Status Remapper
description: "Assign attributes as an official status to your logs"
processor_type: status-remapper
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
---

## Overview

Use the status remapper processor to assign attributes as an official status to your logs. For example, add a log severity level to your logs with the status remapper.

Each incoming status value is mapped as follows:

* Integers from 0 to 7 map to the [Syslog severity standards][4]
* Strings beginning with **emerg** or **f** (case-insensitive) map to **emerg (0)**
* Strings beginning with **a** (case-insensitive) map to **alert (1)**
* Strings beginning with **c** (case-insensitive) map to **critical (2)**
* Strings beginning with **err** (case-insensitive) map to **error (3)**
* Strings beginning with **w** (case-insensitive) map to **warning (4)**
* Strings beginning with **n** (case-insensitive) map to **notice (5)**
* Strings beginning with **i** (case-insensitive) map to **info (6)**
* Strings beginning with **d**, **t**, **v**, **trace**, or **verbose** (case-insensitive) map to **debug (7)**
* Strings beginning with **o** or **s**, or matching **OK** or **Success** (case-insensitive) map to **OK**
* All others map to **info (6)**

**Note**: If multiple log status remapper processors are applied to a log within a pipeline, only the first one in the pipeline's order is considered. Additionally, for all pipelines that match the log, only the first status remapper encountered (from all applicable pipelines) is applied.


## Use cases

The Status Remapper is typically used to:
- Select another attribute as the status to be used for the log event, if it doesn't match our default status attributes. For example, logs coming from Genesys use 'eventDate' as the status attribute. We can use a Status Remapper to set that attribute as the status.
- Select an attribute after a grok parser. For example, Golang logs contain the status in the message attribute that first needs to be parsed.


<!-- ## Before and after state of logs -->

## API

Use the [Datadog Log Pipeline API endpoint][1] with the following log status remapper JSON payload:

```json
{
  "type": "status-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official status of the log",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Parameter    | Type             | Required | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                |
| `name`       | String           | No       | Name of the processor.                                |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`. |
| `sources`    | Array of strings | Yes      | Array of source attributes.                           |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/logs-pipelines/
[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level

