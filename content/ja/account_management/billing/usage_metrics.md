---
title: Estimated Usage Metrics
---

## Overview

Datadog calculates your current estimated usage in near real-time. Estimated usage metrics enable you to:

* Graph your estimated usage
* Create [monitors][3] around your estimated usage based on thresholds of your choosing
* Get [monitor alerts][4] of spikes or drops in your usage
* Assess the potential impact of code changes on your usage in near real-time

**Note**: These usage metrics are estimates that are not always matched to billable usage given their real-time nature. There is a 10-20% difference between estimated usage and billable usage on average. Due to the nature of the estimations, the margin of error is larger for small usage.

{{< img src="account_management/billing/usage-metrics-01.png" alt="Dashboard Example" >}}

## Types of usage

Estimated usage metrics are generally available for the following usage types:

| Usage Type                    | Metric                                   | Description |
|-------------------------------|------------------------------------------| ----------- |
| Infrastructure Hosts          | `datadog.estimated_usage.hosts`          | Unique hosts seen in the last hour. |
| Containers                    | `datadog.estimated_usage.containers`     | Unique containers seen in the last hour. |
| Fargate Tasks                 | `datadog.estimated_usage.fargate_tasks`  | Unique Fargate Tasks seen in the last 5 minutes. |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric` | Unique indexed Custom Metrics seen in the last hour. |
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric` | Unique ingested Custom Metrics seen in the last hour. |
| Logs Ingested Bytes           | `datadog.estimated_usage.logs.ingested_bytes` | Total ingestion of logs in bytes. |
| Logs Ingested Events          | `datadog.estimated_usage.logs.ingested_events` | Total number of ingested events, including excluded logs. |
| Logs Drop Count               | `datadog.estimated_usage.logs.drop_count` | Total number of events dropped during ingestion. |
| Logs Truncated Count          | `datadog.estimated_usage.logs.truncated_count` | Total number of events truncated at ingestion. |
| Logs Truncated Bytes          | `datadog.estimated_usage.logs.truncated_bytes` | Volume of truncated events in bytes. |
| Error Tracking Logs Events    | `datadog.estimated_usage.error_tracking.logs.events` | Volume of error logs ingested into Error Tracking. |
| Analyzed Logs (security)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Total ingestion of Cloud SIEM logs in bytes. |
| APM Hosts                     | `datadog.estimated_usage.apm_hosts` | Unique APM hosts seen in last hour. Does not include Azure App Services hosts. |
| APM Indexed Spans             | `datadog.estimated_usage.apm.indexed_spans` | Total number of spans indexed by tag-based retention filters. |
| APM Ingested Bytes            | `datadog.estimated_usage.apm.ingested_bytes` | Volume of ingested spans in bytes. |
| APM Ingested Spans            | `datadog.estimated_usage.apm.ingested_spans` | Total number of ingested spans. |
| APM Fargate Tasks             | `datadog.estimated_usage.apm.fargate_tasks` | Unique APM Fargate Tasks seen in last 5 minutes. |
| RUM Sessions                  | `datadog.estimated_usage.rum.sessions` | Total number of RUM sessions. |
| Serverless Lambda Functions   | `datadog.estimated_usage.serverless.aws_lambda_functions` | Unique serverless functions seen in the last hour. |
| Serverless Invocations        | `datadog.estimated_usage.serverless.invocations`| Sum of serverless invocations in the last hour. |
| API test runs                 | `datadog.estimated_usage.synthetics.api_test_runs` | Estimated usage for API tests. |
| Browser test runs             | `datadog.estimated_usage.synthetics.browser_test_runs`| Estimated usage for browser tests. |
| Parallel Testing Slots        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | Estimated usage for parallel testing slots. |
| Network Hosts                 | `datadog.estimated_usage.network.hosts` | Unique NPM hosts seen in the last hour. |
| Network Devices               | `datadog.estimated_usage.network.devices` | Unique NDM devices seen in the last hour. |
| Profiled Hosts                | `datadog.estimated_usage.profiling.hosts` | Unique profiling hosts seen in the last hour. |
| Profiled Containers           | `datadog.estimated_usage.profiling.containers` | Unique profiling containers seen in last 5 minutes. |
| Profiler Fargate Tasks        | `datadog.estimated_usage.profiling.fargate_tasks` | Unique profiling Fargate Tasks seen in the last 5 minutes. |
| CSPM Hosts                    | `datadog.estimated_usage.cspm.hosts` | Unique CSPM hosts seen in the last hour. |
| CSPM Containers               | `datadog.estimated_usage.cspm.containers` | Unique CSPM containers seen in the last 5 minutes. |
| CWS Hosts                     | `datadog.estimated_usage.cws.hosts` | Unique CWS hosts seen in the last hour. |
| CWS Containers                | `datadog.estimated_usage.cws.containers` | Unique CWS containers seen in the last 5 minutes. |
| Database Hosts                | `datadog.estimated_usage.dbm.hosts` | Unique DBM hosts seen in the last hour. |
| ASM Hosts                     | `datadog.estimated_usage.asm.hosts` | Unique ASM hosts seen in the last hour. |
| ASM Tasks                     | `datadog.estimated_usage.asm.tasks` | Unique ASM Fargate Tasks seen in the last 5 minutes. |
| Incident Management (Active Users)   | `datadog.estimated_usage.incident_management.active_users` | Active IM users seen from (calendar) month-to-date. |
| CI Visibility Pipeline Committers | `datadog.estimated_usage.ci_visibility.pipeline.committers` | Pipeline committers seen from (calendar) month-to-date. |
| CI Visibility Test Committers | `datadog.estimated_usage.ci_visibility.test.committers` | Test committers seen from (calendar) month-to-date. |
| IOT devices                   | `datadog.estimated_usage.iot.devices` | Unique IoT devices seen in the last hour. |
| Observability Pipelines Ingested Bytes | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Volume of data ingested by Observability Pipelines. |
| Custom Events                   | `datadog.estimated_usage.events.custom_events` | Volume of custom events submitted. |
| Events Ingested                        | `datadog.estimated_usage.events.ingested_events` | Volume of data ingested by Events. |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Metric Names" >}}

## Multi-Org usage

For accounts with multiple organizations, you can roll up estimated usage from child organizations using the `from` field to monitor usage across your entire account.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Multi-Org Usage" >}}

## Troubleshooting

For technical questions, contact [Datadog support][1].

For billing questions, contact your [Customer Success][2] Manager.

[1]: /help/
[2]: mailto:success@datadoghq.com
[3]: /monitors/types/metric/?tab=threshold
[4]: /logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
