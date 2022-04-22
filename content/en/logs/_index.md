---
title: Log Management
kind: Documentation
description: "Configure your Datadog Agent to gather logs from your host, containers & services."
disable_sidebar: true
aliases:
  - /guides/logs/
  - /logs/logging_without_limits
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Log%20Management"
    tag: "Release Notes"
    text: "Check out the latest Datadog Log Management releases! (App login required)."
  - link: "/logs/log_collection/"
    tag: "Documentation"
    text: "Starting collecting your logs"
  - link: "https://learn.datadoghq.com"
    tag: "Learning Center"
    text: "Learn more about Datadog Log Management"\
  - link: "https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/"
    tag: "Blog"
    text: "Accelerate Incident Investigations with Log Anomaly Detection"
---

## Overview

Logging the important parts of your system's operations is crucial for maintaining infrastructure health. Modern infrastructure has the capability to generate thousands of log events per minute. In this situation, you need to choose which logs to send to a log management solution, and which logs to archive. Filtering your logs before sending them, however, may lead to gaps in coverage or the accidental removal of valuable data.

Datadog Log Management, also referred to as Datadog logs or logging, removes these limitations by decoupling log ingestion from indexing. This enables you to cost-effectively collect, process, archive, explore, and monitor all of your logs without limitations, also known as Logging without Limits\*.

Logging without Limits\* enables a streamlined troubleshooting experience in the [Log Explorer][1], which empowers you and your teams to quickly assess and fix your infrastructure issues. It provides intuitive archiving to support your security and IT teams during audits and assessments. Logging without Limits* also powers [Datadog Cloud SIEM][2], which detects security threats in your environment, without requiring you to index logs.

{{< vimeo 293195142 >}}

</br>

## Collect

Begin [ingesting logs][3] from your hosts, containers, cloud providers, and other sources to get started with Datadog Log Management.

## Configure

{{< img src="/logs/configure.png" alt="Configure your logs all in one place" style="width:80%;">}}

Once your logs are ingested, process and enrich all your logs with pipelines and processors, provide control of your log management budget with indexes, generate metrics from ingested logs, or manage your logs within storage-optimized archives with [Log Configuration options][4].

## Connect

{{< img src="/logs/connect.png" alt="Correlate logs with metrics or traces" style="width:80%;">}}

Leverage the pillars of observability by connecting your logs to metrics and traces:

- [Connect your logs and traces][5] to gain observability into your applications.
- [Correlate logs and metrics][6] to gain context of an issue and map it throughout your service.

## Explore

Start exploring your ingested logs in the [Log Explorer][1].

{{< img src="/logs/explore.jpg" alt="Explore your ingested logs" style="width:80%;">}}

- [Search][7]: Search through all of your logs.
- [Live Tail][8]: See your ingested logs in real time across all your environments.
- [Analytics][9]: Perform Log Analytics over your indexed logs.
- [Patterns][10]: Spot log patterns by clustering your indexed logs together.
- [Saved Views][11]: Use saved views to automatically configure your Log Explorer.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/explorer/
[2]: /security_platform/cloud_siem/
[3]: /logs/log_collection/
[4]: /logs/log_configuration/
[5]: /tracing/connect_logs_and_traces/
[6]: /logs/guide/correlate-logs-with-metrics/
[7]: /logs/explorer/search_syntax/
[8]: /logs/live_tail/
[9]: /logs/explorer/analytics/
[10]: /logs/explorer/patterns/
[11]: /logs/explorer/saved_views/
