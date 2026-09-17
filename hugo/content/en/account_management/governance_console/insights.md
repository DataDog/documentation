---
title: Insights
description: How to use Governance Console Insights to monitor adoption, configuration hygiene, and optimization opportunities across your Datadog organization.
further_reading:
    - link: '/account_management/governance_console/'
      tag: 'Documentation'
      text: 'Governance Console'
    - link: '/account_management/governance_console/controls/'
      tag: 'Documentation'
      text: 'Governance Console Controls'
---

## Overview

View Governance Console Insights to monitor adoption, configuration hygiene, and optimization opportunities across your Datadog organization.

The Governance Console [Summary][1] and [Products][2] pages display insights: metrics about how your organization uses and configures Datadog. Each insight shows a current value, a trend sparkline, and a deep link to the underlying Datadog page.

### Required permissions

The `governance_console_read` permission controls access to insights. Users with `governance_console_read` assigned to their role can view all insights in the Governance Console.

## Insight cards

Each insight is displayed as a card. A card shows:

- **Value** - The current measurement for the insight, in the unit shown on the card.  
- **Time range** - Either a point-in-time count or an activity window, such as the past 7 days. The time range is fixed per insight.  
- **Trend** - A sparkline of recent intervals.  
- **Deep link** - Selecting the card opens the underlying Datadog page filtered to the resources behind the value.

*\[Screenshot placeholder: insight card showing metric value, trend sparkline, and link to underlying Datadog page\]*

## Trend direction

Insights are interpreted relative to their goal. Some insights are better when increasing (such as **Active Dashboards** or **Users using Logs**), and some are better when decreasing (such as **Unqueried Metrics** or **Monitors with Broken @-handles**). The sparkline shows the direction of recent change; the goal direction is encoded in the insight itself.

## Insights and controls

Insights surface a metric. [Controls][3] automate detection and remediation for the conditions that those metrics help identify. For example, the **Unqueried Metrics** insight reports the count of custom metrics not used by any monitor, dashboard, SLO, or notebook. Enable the **Unqueried Metrics** control to detect these metrics and automatically drop unused tags with Metrics without Limits™.

## Available insights

Insights are organized by Datadog product.

### Access Controls

| Insight | Description |
| :---- | :---- |
| Custom Roles | Roles your organization has defined beyond the built-in Admin, Standard, and Read-Only roles. Custom roles allow fine-grained permission scoping. |
| Inactive API Keys | API keys that have not been used in the past 90 days. |
| Inactive Users | Users on the org roster who have not logged in or interacted with Datadog in the last 30 days. |
| Service Accounts | Service accounts used for non-human programmatic access to Datadog. |
| Users without MFA | Users in your organization who do not have multi-factor authentication (MFA) enabled. |

### APM

| Insight | Description |
| :---- | :---- |
| Hosts | Hosts running a Datadog Agent with APM tracing enabled and sending application traces to Datadog. |
| Indexed Spans | Spans indexed and retained beyond the live 15-minute search window, based on your trace retention filters. |
| Ingested Spans | Total spans ingested by Datadog APM from all instrumented services before any retention filters are applied. |

### Dashboards

| Insight | Description |
| :---- | :---- |
| Active Dashboard Authors | Users who created or edited dashboards. |
| Active Dashboards | Dashboards that were viewed in the last 30 days. |
| Custom Dashboards | Custom dashboards created by users, excluding integration dashboards. |
| Dashboard Reports Sent | Scheduled dashboard reports sent by email or Slack. |
| Dashboard Views | Dashboards viewed across your organization. |
| Dashboards Linked from Monitors | Dashboards linked from one or more monitors, providing visual context for alerting conditions. |
| Dashboards with 3+ Widgets | Percentage of dashboards that contain three or more widgets. |
| Newly Created Dashboards | New dashboards created in your organization. |
| Total Dashboards | Dashboards that exist in your organization across all teams and users. |
| Unused Dashboards | Dashboards that have not been viewed within the configured inactivity threshold. |

### Infrastructure

| Insight | Description |
| :---- | :---- |
| Containers | Containers detected across your infrastructure, based on data collected from the Datadog Agent running on containerized environments such as Kubernetes, ECS, or Docker. |
| Hosts | Hosts reporting to Datadog, including physical machines, virtual machines, cloud instances, and on-prem servers that have a Datadog Agent installed or are otherwise sending host-level telemetry. |
| Hosts with Agent | Hosts that have the Datadog Agent installed and actively reporting telemetry, such as metrics, logs, traces, or events. |
| Hosts without Agent | Hosts sending data to Datadog without the Datadog Agent installed, typically detected through cloud integrations such as AWS, GCP, or Azure. |
| Percentage of Hosts with Agent | Percentage of all detected hosts that have the Datadog Agent installed. |
| Percentage of Hosts with "team" Tag | Percentage of all detected hosts with a `team` tag. |
| Percentage of Hosts without "env" Tag | Percentage of all detected hosts that are missing an `env` tag. |

### Logs

| Insight | Description |
| :---- | :---- |
| Archives | Long-term, low-cost storage locations that export logs after ingestion and allow you to rehydrate them later for investigations or audits. |
| Custom Destinations | Destinations that stream logs from Datadog to any external system in real time. |
| Disabled Logs Pipelines | Log processing pipelines that exist in your account but no longer process or transform incoming logs. |
| Indexed Logs | Logs that are stored, made fully searchable, and retained for the duration of your indexing retention period. |
| Indexes with Daily Quota | Log indexes that have daily volume limits applied to help control costs and produce predictable usage. |
| Indexes with Exclusion Filters | Log indexes that use exclusion filters to prevent certain ingested logs from being indexed. |
| Indexes with Flex Tier Retention | Log indexes using Datadog's Flex Tier, a lower-cost retention option that keeps logs searchable for longer periods than standard indexing. |
| Indexes with Standard Tier Retention | Log indexes using Datadog's Standard Tier, where indexed logs are stored with full search performance for the default retention period. |
| Indexes without Daily Quota | Log indexes that do not have a daily indexing volume limit applied. |
| Indexes without Exclusion Filters | Log indexes that do not use exclusion filters. All logs matching each index's query are fully indexed. |
| Ingested Logs | Logs received by Datadog before any indexing rules, exclusion filters, sampling, or archiving are applied. |
| Logs Pipelines | Sets of processors and routing rules that parse, enrich, transform, or route logs as they flow through the log processing pipeline. |
| Monitors | Alerting rules that detect issues or patterns in your log data and notify you when certain conditions occur. |
| Standard Attributes | Standardized log fields that Datadog recognizes and uses to normalize logs for consistent search, filtering, and analytics. |
| Unparsed Logs | Logs that Datadog has ingested but not successfully parsed into structured attributes such as status, service, host, or custom fields. |
| Users using Logs | Users who interacted with log-related features such as Log Explorer, Log Pipelines, or Log Monitors. |

### Metrics

| Insight | Description |
| :---- | :---- |
| Custom Metrics | Distinct custom metric timeseries your organization ingests across all sources. Custom metrics are metrics not included in a Datadog integration. |
| Metrics Monitors | Monitors that use metric data as their data source. |
| Unqueried Metrics | Metrics that have not been queried through any Datadog tool or API for a certain period of time. |
| Users using Metrics | Users actively querying metrics in dashboards, monitors, notebooks, or the Metrics Explorer. |

### Monitors

| Insight | Description |
| :---- | :---- |
| Active Downtimes | Downtimes that temporarily silence monitors during a scheduled maintenance window or manual pause. |
| Composite Monitors with Deleted Constituents | Composite monitors whose underlying component monitors have been deleted. |
| Downtimes | Downtimes created in your Datadog organization, including both active and scheduled periods during which selected monitors are temporarily silenced. |
| Long-term Alerting Monitors | Monitors configured to evaluate long-term trends using extended time windows such as hours, days, or weeks. |
| Long-term Muted Monitors | Monitors that have been muted over a long-duration mute window rather than a short temporary silence. |
| Monitor Alerts | Alerts triggered by all monitors. |
| Monitors | Monitors that exist in your Datadog organization, across all monitor types, regardless of status, configuration, or usage. |
| Monitors Created | New monitors created in your Datadog organization. |
| Monitors Missing Evaluation Delay | Monitors that do not have an evaluation delay configured, which can produce noisy alerts on out-of-order or late-arriving data. |
| Monitors Missing Recipients | Monitors that do not have any notification recipients configured. |
| Monitors with Broken @-handles | Monitors containing `@`\-mentions that no longer resolve, because the referenced user, team, or integration no longer exists. |
| Muted Monitors | Monitors that are currently muted. |
| Noisy Monitors | Monitors that generate an unusually high volume of alerts, often due to overly sensitive thresholds, data fluctuations, or misconfigurations. |
| Recurring Downtimes | Downtimes scheduled to automatically repeat on a regular cadence. |
| Triggered Monitors | Monitors that have entered a triggered (alert or warning) state within the measurement period. |

### Notebooks

| Insight | Description |
| :---- | :---- |
| Active Notebook Authors | Users who created or edited notebooks. |
| Documentation Notebooks | Notebooks created for documentation purposes, such as written analyses, troubleshooting steps, or explanatory content. |
| Investigation Notebooks | Notebooks created for investigative workflows, such as analyzing incidents, exploring data, debugging issues, or performing root-cause analysis. |
| Notebooks | Notebooks that exist in your organization across all use cases. |
| Notebooks Created | New notebooks created in your organization. |
| Postmortem Notebooks | Notebooks created for incident postmortems, where teams document what happened, analyze root causes, and record follow-up actions. |
| Report Notebooks | Notebooks created for reporting purposes, such as summaries, analyses, or regularly shared updates. |
| Runbook Notebooks | Notebooks created to serve as runbooks, with step-by-step guides or operational procedures. |

### Security

| Insight | Description |
| :---- | :---- |
| Analyzed Log Events | Log events analyzed by Cloud SIEM detection rules. |
| Security Contacts | Users in your organization who receive security-related notifications from Datadog. |
| Security Log Volume | Total bytes of log data analyzed by Cloud SIEM detection rules. |
| Users using Security | Users interacting with Cloud Security Platform features, such as security rules, signals, or suppressions. |

### Usage

| Insight | Description |
| :---- | :---- |
| Active Users | Users who have logged into or interacted with Datadog. |
| Teams | Teams created in Datadog for organizing users, assigning ownership, and managing resources such as dashboards, monitors, and services. |
| Time Spent | Amount of time users collectively spent interacting with Datadog each week. |
| Users Created | New user accounts added to your Datadog organization. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/governance/summary
[2]: https://app.datadoghq.com/governance/products
[3]: https://app.datadoghq.com/governance/controls