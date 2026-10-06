---
title: Log Anomaly Detection in Observability Pipelines
description: Learn how Observability Pipelines uses Watchdog to detect log anomalies before logs reach any destination.
disable_toc: false
further_reading:
- link: "/logs/explorer/watchdog_insights/"
  tag: "Documentation"
  text: "Watchdog Insights for Logs"
- link: "/observability_pipelines/monitoring_and_troubleshooting/log_patterns/"
  tag: "Documentation"
  text: "Log Patterns in Observability Pipelines"
- link: "/observability_pipelines/monitoring_and_troubleshooting/monitoring_pipelines/"
  tag: "Documentation"
  text: "Monitoring Pipelines"
---

## Overview

Observability Pipelines uses Watchdog to find log anomalies before it sends any data to a destination. Watchdog looks at [log patterns][1] for unusual or new spikes in warning and error logs.

This detection happens on-stream. You get anomaly alerts even if you route your logs to a different SIEM or log management tool, such as Splunk or Microsoft Sentinel.

For example, a security team routes production logs to Splunk. This team can use Watchdog Insights in Observability Pipelines to find an issue before the logs reach Splunk.

## How anomaly detection works

Observability Pipelines groups your logs into [patterns][1] and aggregates them by the `env`, `service`, `source`, and `status` attributes. Watchdog scans these aggregated patterns for anomalies, such as:

- A new type of warning or error log.
- A spike in the rate of warning or error logs.

## View anomalies

Observability Pipelines shows Watchdog insights in the following places:

- The Observability Pipelines landing page, which shows anomalies detected across all of your pipelines.
- Each pipeline's page, which shows anomalies detected in that pipeline's logs.

[1]: /observability_pipelines/monitoring_and_troubleshooting/log_patterns/
