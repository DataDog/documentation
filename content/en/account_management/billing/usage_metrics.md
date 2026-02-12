---
title: Estimated Usage Metrics
further_reading:
    - link: "https://www.datadoghq.com/blog/zendesk-cost-optimization/#measuring-the-impact-of-our-optimizations"
      tag: "Blog"
      text: "Optimizing Datadog at scale: Cost-efficient observability at Zendesk"
---

<style>tbody code {word-break: break-word !important;}</style>

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
| Infrastructure Hosts          | `datadog.estimated_usage.hosts`, `datadog.estimated_usage.hosts.by_tag`          | Unique hosts seen in the last hour. |
| Containers                    | `datadog.estimated_usage.containers`, `datadog.estimated_usage.containers.by_tag`     | Unique containers seen in the last hour. |
| Fargate Tasks                 | `datadog.estimated_usage.fargate_tasks`, `datadog.estimated_usage.fargate_tasks.by_tag`  | Unique Fargate Tasks seen in the last 5 minutes.<br/><br/>**Note**: This metric tracks both ECS Fargate and EKS Fargate usage. |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`, `datadog.estimated_usage.metrics.custom.by_tag`  | Unique indexed Custom Metrics seen in the last hour. |
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag`  | Unique ingested Custom Metrics seen in the last hour. |
| Logs Ingested Bytes           | `datadog.estimated_usage.logs.ingested_bytes` | Total ingestion of logs in bytes. |
| Logs Ingested Events          | `datadog.estimated_usage.logs.ingested_events` | Total number of ingested events, including excluded logs. |
| Logs Drop Count               | `datadog.estimated_usage.logs.drop_count` | Total number of events dropped during ingestion. |
| Logs Truncated Count          | `datadog.estimated_usage.logs.truncated_count` | Total number of events truncated at ingestion. |
| Logs Truncated Bytes          | `datadog.estimated_usage.logs.truncated_bytes` | Volume of truncated events in bytes. |
| Error Tracking Logs Events    | `datadog.estimated_usage.error_tracking.logs.events` | Volume of error logs ingested into Error Tracking. |
| Analyzed Logs (security)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Total ingestion of Cloud SIEM logs in bytes. |
| APM Hosts                     | `datadog.estimated_usage.apm_hosts`, `datadog.estimated_usage.apm_hosts.by_tag` | Unique APM hosts seen in last hour. Does not include Azure App Services hosts. |
| APM Indexed Spans             | `datadog.estimated_usage.apm.indexed_spans` | Total number of spans indexed by tag-based retention filters. |
| APM Ingested Bytes            | `datadog.estimated_usage.apm.ingested_bytes` | Volume of ingested spans in bytes. |
| APM Ingested Spans            | `datadog.estimated_usage.apm.ingested_spans` | Total number of ingested spans. |
| APM Fargate Tasks             | `datadog.estimated_usage.apm.fargate_tasks`, `datadog.estimated_usage.apm.fargate_tasks.by_tag` | Unique APM Fargate Tasks seen in last 5 minutes. |
| RUM Sessions                  | `datadog.estimated_usage.rum.sessions` | Total number of RUM sessions. |
| Serverless Lambda Functions   | `datadog.estimated_usage.serverless.aws_lambda_functions`, `datadog.estimated_usage.serverless.aws_lambda_functions.by_tag` | Unique serverless functions seen in the last hour. |
| Serverless Invocations        | `datadog.estimated_usage.serverless.invocations`| Sum of serverless invocations in the last hour. |
| API test runs                 | `datadog.estimated_usage.synthetics.api_test_runs` | Estimated usage for API tests. |
| Browser test runs             | `datadog.estimated_usage.synthetics.browser_test_runs`| Estimated usage for browser tests. |
| Parallel Testing Slots        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | Estimated usage for parallel testing slots. |
| Network Hosts                 | `datadog.estimated_usage.network.hosts`, `datadog.estimated_usage.network.hosts.by_tag` | Unique CNM hosts seen in the last hour. |
| Network Devices               | `datadog.estimated_usage.network.devices`, `datadog.estimated_usage.network.devices.by_tag` | Unique NDM devices seen in the last hour. |
| Profiled Hosts                | `datadog.estimated_usage.profiling.hosts`, `datadog.estimated_usage.profiling.hosts.by_tag` | Unique profiling hosts seen in the last hour. |
| Profiled Containers           | `datadog.estimated_usage.profiling.containers`, `datadog.estimated_usage.profiling.containers.by_tag` | Unique profiling containers seen in last 5 minutes. |
| Profiler Fargate Tasks        | `datadog.estimated_usage.profiling.fargate_tasks`, `datadog.estimated_usage.profiling.fargate_tasks.by_tag` | Unique profiling Fargate Tasks seen in the last 5 minutes. |
| CSPM Hosts                    | `datadog.estimated_usage.cspm.hosts`, `datadog.estimated_usage.cspm.hosts.by_tag` | Unique CSPM hosts seen in the last hour. |
| CSPM Containers               | `datadog.estimated_usage.cspm.containers`, `datadog.estimated_usage.cspm.containers.by_tag` | Unique CSPM containers seen in the last 5 minutes. |
| CWS Hosts                     | `datadog.estimated_usage.cws.hosts`, `datadog.estimated_usage.cws.hosts.by_tag` | Unique CWS hosts seen in the last hour. |
| CWS Containers                | `datadog.estimated_usage.cws.containers`, `datadog.estimated_usage.cws.containers.by_tag` | Unique CWS containers seen in the last 5 minutes. |
| Database Hosts                | `datadog.estimated_usage.dbm.hosts`, `datadog.estimated_usage.dbm.hosts.by_tag` | Unique DBM hosts seen in the last hour. |
| AAP Hosts                     | `datadog.estimated_usage.asm.hosts`, `datadog.estimated_usage.asm.hosts.by_tag` | Unique AAP hosts seen in the last hour. |
| AAP Tasks                     | `datadog.estimated_usage.asm.tasks`, `datadog.estimated_usage.asm.tasks.by_tag` | Unique AAP Fargate Tasks seen in the last 5 minutes. |
| CI Visibility Pipeline Committers | `datadog.estimated_usage.ci_visibility.pipeline.committers` | Pipeline committers seen from (calendar) month-to-date. |
| CI Visibility Test Committers | `datadog.estimated_usage.ci_visibility.test.committers` | Test committers seen from (calendar) month-to-date. |
| IOT devices                   | `datadog.estimated_usage.iot.devices`, `datadog.estimated_usage.iot.devices.by_tag` | Unique IoT devices seen in the last hour. |
| Observability Pipelines Ingested Bytes | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Volume of data ingested by Observability Pipelines. |
| Custom Events                 | `datadog.estimated_usage.events.custom_events` | Volume of custom events submitted. |
| Events Ingested               | `datadog.estimated_usage.events.ingested_events` | Volume of data ingested by Events. |
| Code Security SAST Committers | `datadog.estimated_usage.code_security.sast.committers` | SAST committers seen from (calendar) month-to-date. |
| Code Security SCA Committers  | `datadog.estimated_usage.code_security.sca.committers`  | SCA committers seen from (calendar) month-to-date.  |
| Code Security SCA Hosts       | `datadog.estimated_usage.asm.vulnerability_oss_host`, `datadog.estimated_usage.asm.vulnerability_oss_host.by_tag` | Unique SCA hosts seen in the last hour. |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Metric Names" >}}

## Setting tags for your by_tag Estimated Usage Metrics
To set tag breakdowns in your by_tag Estimated Usage Metrics, configure your desired tags—such as team or env—on the [Usage Attribution][6] page (If you're on a PRO plan, you can request access to this feature through your [Customer Success Manager][2]). Changes take effect at the next 00:00 UTC.

{{< img src="account_management/billing/setting-eum-tags-in-ua.png" alt="Setting by_tag EUM tags in Usage Attribution" >}}

## Dashboards

Out-of-the-box estimated usage dashboards are available, offering useful queries with these metrics. You can clone these dashboards to help you get started with usage metrics. To find these dashboards, navigate to [Dashboards preset lists][5] and search for "Estimated Usage."

## Multi-Org usage

For accounts with multiple organizations, you can roll up estimated usage from child organizations using the `from` field to monitor usage across your entire account.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Multi-Org Usage" >}}

## Troubleshooting

For technical questions, contact [Datadog support][1].

For billing questions, contact your [Customer Success][2] Manager.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: mailto:success@datadoghq.com
[3]: /monitors/types/metric/?tab=threshold
[4]: /logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?q=estimated%20usage
[6]: /account_management/billing/usage_attribution/

