---
title: Log Configuration
kind: Documentation
description: "Process, enrich, control, and manage your logs from the Logs Configuration page"
aliases:
  - /logs/processing
further_reading:
- link: /data_security/pci_compliance/
  tag: Documentation
  text: Set up a PCI-compliant Datadog organization
- link: "https://www.datadoghq.com/blog/logging-without-limits/"
  tag: Blog
  text: Learn more about Logging without Limits*
- link: "https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/"
  tag: Blog
  text: Investigate your log processing with the Datadog Log Pipeline Scanner
- link: /logs/guide/
  tag: Guide
  text: Additional guides about logging with Datadog
---

## Overview

Datadog Logging without Limits* decouples log ingestion and indexing. Choose which logs to index and retain, or archive, and manage settings and controls at a top-level from the log configuration page at [**Logs > Pipelines**][1].

**Note**: See [PCI DSS Compliance][2] for information on setting up a PCI-compliant Datadog organization.

## Configuration options

- Control how your logs are processed with [pipelines][3] and [processors][4].
- Set [attributes and aliasing][5] to unify your logs environment.
- [Generate metrics from ingested logs][6] as cost-efficient way to summarize log data from an entire ingested stream.
- Institute fine-grained control over your log management budget with [log indexes][7].
- Forward ingested logs to your own cloud-hosted storage bucket to keep as an [archive][8] for future troubleshooting or compliance audits.
- [Rehydrate an archive][9] to analyze or investigate log events that are older or excluded from indexing.
- Restrict [logs data access][10] with restriction queries.

## Log Explorer

Once you've completed configuration, start investigating and troubleshooting logs in the [Log Explorer][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /data_security/pci_compliance/
[3]: /logs/log_configuration/pipelines
[4]: /logs/log_configuration/processors
[5]: /logs/log_configuration/attributes_naming_convention/
[6]: /logs/log_configuration/logs_to_metrics/
[7]: /logs/log_configuration/indexes
[8]: /logs/log_configuration/archives/
[9]: /logs/log_configuration/rehydrating
[10]: /logs/guide/logs-rbac/
[11]: /logs/explorer/
