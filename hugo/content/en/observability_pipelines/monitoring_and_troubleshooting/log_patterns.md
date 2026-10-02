---
title: Log Patterns
description: Learn how Observability Pipelines groups similar logs into patterns before the logs reach any destination.
disable_toc: false
further_reading:
- link: "/logs/explorer/analytics/patterns/"
  tag: "Documentation"
  text: "Log Patterns in Log Explorer"
- link: "/observability_pipelines/monitoring_and_troubleshooting/log_anomaly_detection/"
  tag: "Documentation"
  text: "Log Anomaly Detection in Observability Pipelines"
- link: "/observability_pipelines/monitoring_and_troubleshooting/monitoring_pipelines/"
  tag: "Documentation"
  text: "Monitoring Pipelines"
---

## Overview

Observability Pipelines groups your logs into patterns as they stream through a pipeline. A pattern is a group of logs with a similar structure. Observability Pipelines finds these patterns before it sends any data to a destination, such as Splunk or Microsoft Sentinel.

Use patterns to find noisy or repeated log messages. You can also use patterns to spot new or unusual log messages as soon as they appear in the pipeline. This works no matter which destinations you route your logs to.

## How patterns are grouped

Observability Pipelines groups logs by the `message` field. It groups the results further by the `status` and `service` fields.

For patterns to appear, each log must have the following attributes at the root level:

- `message`
- `service`
- `status`
- `env`
- `source`

If a log doesn't have these attributes, Observability Pipelines doesn't include it in a pattern.

**Note**: Place the processors that add or correct these attributes earlier in your pipeline. Observability Pipelines groups logs into patterns after all other processors run.

## View patterns

Observability Pipelines shows patterns for each pipeline. For each pipeline, you can:

- View the patterns found in that pipeline's logs.
- View a sample of the logs that make up a pattern.

[1]: /logs/explorer/analytics/patterns/
