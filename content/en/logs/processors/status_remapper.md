---
title: Log Status Remapper
processor_name: status-remapper
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
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

| Use case | Example |
| :--- | :--- |
| Select a custom attribute to define the log event's official status. | For logs from Genesys, remap the `eventDate` attribute as the log status. |
| Remap an attribute that becomes available only after preliminary parsing. | Remap the status contained within the `message` attribute of Golang logs after a Grok Parser has extracted it. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level

