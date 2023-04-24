---
title: Estimated Usage Metrics
kind: documentation
---

## Overview

Datadog calculates your current estimated usage in near real-time. Estimated usage metrics enable you to:

* Graph your estimated usage
* Create monitors around your estimated usage based on thresholds of your choosing
* Get instant alerts of spikes or drops in your usage
* Assess the potential impact of code changes on your usage in near real-time

**Note**: These usage metrics are estimates that are not always matched to billable usage given their real-time nature. There is a 10-20% difference between estimated usage and billable usage on average. Due to the nature of the estimations, the margin of error is larger for small usage.

{{< img src="account_management/billing/usage-metrics-01.png" alt="Dashboard Example" >}}

## Types of usage

Estimated usage metrics are generally available for the following usage types:

| Usage Type                    | Metric                                   |
|-------------------------------|------------------------------------------|
| Infrastructure Hosts          | `datadog.estimated_usage.hosts`          |
| Containers                    | `datadog.estimated_usage.containers`     |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric` |
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric` |
| Logs Ingested Bytes           | `datadog.estimated_usage.logs.ingested_bytes`    |
| Logs Ingested Events          | `datadog.estimated_usage.logs.ingested_events`   |
| Analyzed Logs (security)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes`   |
| APM Hosts                     | `datadog.estimated_usage.apm_hosts` (does not include Azure App Services hosts)      |
| APM Indexed Spans             | `datadog.estimated_usage.apm.indexed_spans` |
| APM Ingested Bytes            | `datadog.estimated_usage.apm.ingested_bytes` |
| APM Ingested Spans            | `datadog.estimated_usage.apm.ingested_spans` |
| APM Fargate Tasks             | `datadog.estimated_usage.apm.fargate_tasks` |
| RUM Sessions                  | `datadog.estimated_usage.rum.sessions`  |
| Serverless Lambda Functions   | `datadog.estimated_usage.serverless.aws_lambda_functions` |
| Serverless Invocations        | `datadog.estimated_usage.serverless.invocations`|
| API test runs                 | `datadog.estimated_usage.synthetics.api_test_runs` |
| Browser test runs             | `datadog.estimated_usage.synthetics.browser_test_runs`|
| Network Hosts                 | `datadog.estimated_usage.network.hosts` |
| Network Devices               | `datadog.estimated_usage.network.devices` |
| Profiled Hosts                | `datadog.estimated_usage.profiling.hosts` |
| Profiled Containers           | `datadog.estimated_usage.profiling.containers` |
| Profiler Fargate Tasks        | `datadog.estimated_usage.profiler.fargate_tasks` |
| CSPM Hosts                    | `datadog.estimated_usage.cspm.hosts` |
| CSPM Containers               | `datadog.estimated_usage.cspm.containers` |
| CWS Hosts                     | `datadog.estimated_usage.cws.hosts` |
| CWS Containers                | `datadog.estimated_usage.cws.containers` | 
| Database Hosts                | `datadog.estimated_usage.dbm.hosts` |
| ASM Hosts                     | `datadog.estimated_usage.asm.hosts` |
| ASM Tasks                     | `datadog.estimated_usage.asm.tasks` |
| Incident Management (Active Users)   | `datadog.estimated_usage.incident_management.active_users` |
| CI Visibility                 | `datadog.estimated_usage.ci_visibility.pipeline.committers`, `datadog.estimated_usage.ci_visibility.test.committers` |
| IOT devices                   | `datadog.estimated_usage.iot.devices` |


{{< img src="account_management/billing/usage-metrics-02.png" alt="Metric Names" >}}

## Multi-Org usage

For accounts with multiple organizations, you can roll up estimated usage from child organizations using the `from` field to monitor usage across your entire account.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Multi-Org Usage" >}}

## Troubleshooting

For technical questions, contact [Datadog support][1].

For billing questions, contact your [Customer Success][2] Manager.

[1]: /help/
[2]: mailto:success@datadoghq.com
