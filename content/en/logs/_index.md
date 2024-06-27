---
title: Log Management
kind: Documentation
description: "Configure your Datadog Agent to gather logs from your host, containers & services."
disable_sidebar: true
aliases:
  - /guides/logs/
  - /en/logs
  - /logs/logging_without_limits
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Log%20Management"
    tag: "Release Notes"
    text: "Check out the latest Datadog Log Management releases (App login required)"
  - link: "/logs/log_collection/"
    tag: "Documentation"
    text: "Start collecting your logs"
  - link: "https://learn.datadoghq.com/courses/intro-to-log-management"
    tag: "Learning Center"
    text: "Introduction to Log Management"
  - link: 'https://dtdg.co/fe'
    tag: 'Foundation Enablement'
    text: 'Join an interactive session to optimize your Log Management'
  - link: "https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/"
    tag: "Blog"
    text: "Accelerate Incident Investigations with Log Anomaly Detection"
  - link: "https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/"
    tag: "Blog"
    text: "Monitor your IoT devices at scale with Datadog Log Management"
  - link: "https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/"
    tag: "Blog"
    text: "Monitor your firewall logs with Datadog"
  - link: "https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/"
    tag: "Blog"
    text: "Use CIDR notation queries to filter your network traffic logs"
  - link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
    tag: "Blog"
    text: "Monitor 1Password with Datadog Cloud SIEM"
  - link: "https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/"
    tag: "Blog"
    text: "Filter and correlate logs dynamically using Subqueries"
  - link: "https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/"
    tag: "Blog"
    text: "Monitor DNS logs for network and security analysis"
cascade:
    algolia:
        rank: 70
---

## Overview

Logging the important parts of your system's operations is crucial for maintaining infrastructure health. Modern infrastructure has the capability to generate thousands of log events per minute. In this situation, you need to choose which logs to send to a log management solution, and which logs to archive. Filtering your logs before sending them, however, may lead to gaps in coverage or the accidental removal of valuable data.

Datadog Log Management, also referred to as Datadog logs or logging, removes these limitations by decoupling log ingestion from indexing. This enables you to cost-effectively collect, process, archive, explore, and monitor all of your logs without limitations, also known as Logging without Limits\*.

Logging without Limits\* enables a streamlined troubleshooting experience in the [Log Explorer][1], which empowers you and your teams to quickly assess and fix your infrastructure issues. It provides intuitive archiving to support your security and IT teams during audits and assessments. Logging without Limits* also powers [Datadog Cloud SIEM][2], which detects security threats in your environment, without requiring you to index logs.

**Note**: See [PCI DSS Compliance][3] for information on setting up a PCI-compliant Datadog organization.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## Collect

Begin [ingesting logs][4] from your hosts, containers, cloud providers, and other sources to get started with Datadog Log Management.

## Configure

{{< img src="logs/lwl_marketecture_20231030.png" alt="Configure your logs all in one place" >}}

Once your logs are ingested, process and enrich all your logs with pipelines and processors, provide control of your log management budget with indexes, generate metrics from ingested logs, or manage your logs within storage-optimized archives with [Log Configuration options][5].

## Connect

{{< img src="/logs/connect.png" alt="Correlate logs with metrics or traces" style="width:80%;">}}

Leverage the pillars of observability by connecting your logs to metrics and traces:

- [Connect your logs and traces][6] to gain observability into your applications.
- [Correlate your logs and metrics][7] to gain context of an issue and map it throughout your service.

## Explore

Start exploring your ingested logs in the [Log Explorer][1].

{{< img src="/logs/explore.png" alt="Explore your ingested logs" style="width:80%;">}}

- [Search][8]: Search through all of your logs.
- [Live Tail][9]: See your ingested logs in real time across all your environments.
- [Analytics][10]: Perform Log Analytics over your indexed logs.
- [Patterns][11]: Spot log patterns by clustering your indexed logs together.
- [Saved Views][12]: Use saved views to automatically configure your Log Explorer.


{{< learning-center-callout header="Try Introduction to Log Management in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  Learn without cost on real cloud compute capacity and a Datadog trial account. Enroll today to learn more about log collection, querying, analytics, metrics, monitoring, processing, storage, and access control.
{{< /learning-center-callout >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/explorer/
[2]: /security/cloud_siem/
[3]: /data_security/pci_compliance/
[4]: /logs/log_collection/
[5]: /logs/log_configuration/
[6]: /tracing/other_telemetry/connect_logs_and_traces/
[7]: /logs/guide/correlate-logs-with-metrics/
[8]: /logs/explorer/search_syntax/
[9]: /logs/live_tail/
[10]: /logs/explorer/analytics/
[11]: /logs/explorer/patterns/
[12]: /logs/explorer/saved_views/