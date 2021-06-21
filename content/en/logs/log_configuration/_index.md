---
title: Log Configuration
kind: Documentation
description: "Process, enrich, control, and manage your logs from the Logs Configuration page"
further_reading:
- link: "https://www.datadoghq.com/blog/logging-without-limits/"
  tag: "Blog"
  text: Learn more about Logging without Limits*
- link: "/logs/guide/"
  tag: "Guide"
  text: Additional guides about logging with Datadog
---

## Overview

Datadog Logging without Limits* decouples log ingestion and indexing. Choose which logs to index and retain, or archive, and manage settings and controls at a top-level from the [log configuration section][1].

{{< img src="logs/log_configuration_overview.gif" alt="The log configuration section in the Datadog app">}}

## Configuration options

- Control how your logs are processed with [pipelines][2] and [processors][3].
- Set [attributes and aliasing][4] to unify your logs environment.
- [Generate metrics from ingested logs][5] as cost-efficient way to summarize log data from an entire ingested stream.
- Institute fine-grained control over your log management budget with [log indexes][6].
- Forward ingested logs to your own cloud-hosted storage bucket to keep as an [archive][7] for future troubleshooting or compliance audits.
- [Rehydrate an archive][8] to analyze or investigate log events that are older or excluded from indexing.
- Restrict [logs data access][9] with restriction queries.

## Log Explorer

Once you've completed configuration, start investigating and troubleshooting logs in the [Log Explorer][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /logs/processing/pipelines/
[3]: /logs/processing/processors/
[4]: /logs/log_configuration/attributes_naming_convention/
[5]: /logs/log_configuration/logs_to_metrics/
[6]: /logs/log_configuration/indexes
[7]: /logs/log_configuration/archives/
[8]: /logs/log_configuration/rehydrating
[9]: /logs/guide/logs-rbac/
[10]: /logs/explorer/
