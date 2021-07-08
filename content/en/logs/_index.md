---
title: Log Management
kind: Documentation
description: "Configure your Datadog Agent to gather logs from your host, containers & services."
disable_sidebar: true
aliases:
    - /guides/logs/
    - /logs/logging_without_limits
further_reading:
- link: "/logs/guide/"
  tag: "Guide"
  text: Additional guides about logging with Datadog
- link: "https://learn.datadoghq.com"
  tag: "Learning Center"
  text: "Introduction to Logs in Datadog"
---

{{< vimeo 293195142 >}}

</br>

Sometimes, your infrastructure may generate a volume of log events that is too large or has significant fluctuations. In this situation, you may need to choose which logs to send to a log management solution, and which logs to archive. Filtering your logs before sending them, however, may lead to gaps in coverage or the accidental removal of valuable data.

Datadog Log Management removes these limitations by decoupling log ingestion from indexing. This enables you to cost-effectively collect, process, archive, explore, and monitor all your logs with no log limits. This is called Logging without Limits\*. Logging without Limits\* also powers Datadog’s [Security Monitoring][1] by not requiring you to index your logs to detect security threats in your environment.

## Collect

{{< img src="/logs/collect.png" alt="Collect logs from multiple sources" style="width:80%;">}}

[Log Collection & Integrations][2]: Begin ingesting logs from your hosts, containers, cloud providers, and other sources.

## Configure

{{< img src="/logs/configure.png" alt="Configure your logs all in one place" style="width:80%;">}}

[Log Configuration][3]: Process and enrich all your logs with pipelines and processors, provide control of your log management budget with indexes, generate metrics from ingested logs, or manage your logs within storage-optimized archives.

## Connect

{{< img src="/logs/connect.png" alt="Correlate logs with metrics or traces" style="width:80%;">}}

Leverage the pillars of observability with metrics and traces:

- [Connect Logs and Traces][4]</u>: Correlate your logs and traces to gain observability into your applications.
- [Correlate Logs and Metrics][5]: Learn how to correlate logs and metrics throughout Datadog.

## Explore

Start exploring your ingested logs:

{{< img src="/logs/explore.png" alt="Explore your ingested logs" style="width:80%;">}}

- [Log Explorer][6]: Discover the Log Explorer view, and how to add Facets and Measures.
- [Search][7]: Search through all of your logs.
- [Live Tail][8]: See your ingested logs in real time across all your environments.
- [Analytics][9]: Perform Log Analytics over your indexed logs.
- [Patterns][10]: Spot Log Patterns by clustering your indexed logs together.
- [Saved Views][11]: Use Saved Views to automatically configure your Log Explorer.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits is a trademark of Datadog, Inc.

[1]: /security_monitoring/
[2]: /logs/log_collection/
[3]: /logs/log_configuration/
[4]: /tracing/connect_logs_and_traces/
[5]: /logs/guide/correlate-logs-with-metrics/
[6]: /logs/explorer/
[7]: /logs/explorer/search_syntax/
[8]: /logs/live_tail/
[9]: /logs/explorer/analytics/
[10]: /logs/explorer/patterns/
[11]: /logs/explorer/saved_views/
