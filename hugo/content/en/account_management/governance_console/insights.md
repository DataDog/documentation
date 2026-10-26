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

Governance Console insights are metrics about how your organization uses and configures Datadog. Use insights to monitor adoption, configuration hygiene, and optimization opportunities across your organization.

Insights appear on the Governance Console [Summary][1] and [Products][2] pages. Each insight shows a current value, the change from the previous period, and a trend chart. Most insights also link to the underlying Datadog page.

### Required permissions

The `governance_console_read` permission controls access to insights. Users with `governance_console_read` assigned to their role can view all insights in the Governance Console.

## Insight cards

Each insight is displayed as a card. A card shows:

- **Value**: The current measurement for the insight, in the unit shown on the card.
- **Change**: The percentage change from the previous period. See [Trend direction](#trend-direction).
- **Time range**: The period the value covers, shown as a label next to the insight name, such as `1w` or `1mo`. See [Time range](#time-range).
- **Trend**: A chart of the value over the time range.

Hover over a card to show its actions:

- **Expand**: Opens a larger view of the insight.
- **More information**: Shows a description of the insight.
- **Open in new tab**: Opens the underlying Datadog page. Not every insight has a link.
- **Export**: Copies the graph, saves it to a dashboard, adds it to an incident, or creates a monitor from it, depending on the insight.

*\[Screenshot placeholder: insight card showing metric value, percentage change, time range label, and trend chart\]*

### Time range

To change the time range on the Products page, select {{< ui >}}1 Week{{< /ui >}}, {{< ui >}}1 Month{{< /ui >}}, {{< ui >}}3 Months{{< /ui >}}, or {{< ui >}}6 Months{{< /ui >}}. The default is {{< ui >}}1 Month{{< /ui >}}.

Insights based on usage or audit data always cover the past 7 days, and the selector does not change them. These insights are:

- APM: {{< ui >}}Hosts{{< /ui >}}, {{< ui >}}Indexed spans{{< /ui >}}, and {{< ui >}}Ingested spans{{< /ui >}}
- Logs: {{< ui >}}Ingested logs{{< /ui >}} and {{< ui >}}Users using logs{{< /ui >}}
- Metrics: {{< ui >}}Custom metrics{{< /ui >}} and {{< ui >}}Users using metrics{{< /ui >}}
- Monitors: {{< ui >}}Monitors created{{< /ui >}}
- Security: {{< ui >}}Analyzed log events{{< /ui >}}, {{< ui >}}Security log volume{{< /ui >}}, and {{< ui >}}Users using security{{< /ui >}}

## Trend direction

Each insight has a goal direction. Some insights are better when the value increases, such as {{< ui >}}Active dashboards{{< /ui >}}. Others are better when the value decreases, such as {{< ui >}}Unqueried metrics{{< /ui >}} or {{< ui >}}Monitors with broken @-handles{{< /ui >}}.

The percentage change on each card is colored relative to that goal:

- **Green**: The value moved in the better direction.
- **Red**: The value moved in the worse direction.
- **Gray**: The value did not change, or the insight has no preferred direction.

For example, a drop in {{< ui >}}Unqueried metrics{{< /ui >}} shows as green.

## Insights and controls

Insights surface a metric. [Controls][3] automate detection and remediation for the conditions that those metrics help identify. For example, the {{< ui >}}Unqueried metrics{{< /ui >}} insight counts custom metrics that have not been queried in the past 30 days. These metrics are also not used by any dashboards, monitors, SLOs, or notebooks. Enable the {{< ui >}}Unqueried Metrics{{< /ui >}} control to detect these metrics and automatically drop unused tags with Metrics without Limits™.

## Available insights

Insights are grouped by product area.

### Access Controls

| Insight | Description |
| :---- | :---- |
| Custom roles | Roles your organization has defined beyond the built-in Admin, Standard, and Read-Only roles. Custom roles allow fine-grained permission scoping. |
| Inactive API keys | API keys that have not been used in the past 90 days. |
| Inactive users | Users in your organization who have not logged in or interacted with Datadog in the past 30 days. |
| Service accounts | Service accounts used for non-human programmatic access to Datadog. |
| Users without MFA | Users in your organization who do not have multi-factor authentication (MFA) enabled. |

### APM

| Insight | Description |
| :---- | :---- |
| Hosts | Hosts running a Datadog Agent with APM tracing enabled and sending application traces to Datadog. |
| Indexed spans | Spans indexed and retained beyond the live 15-minute search window, based on your trace retention filters. |
| Ingested spans | Total spans ingested by Datadog APM from all instrumented services before any retention filters are applied. |

### Dashboards

| Insight | Description |
| :---- | :---- |
| Active dashboard authors | Users who created or edited dashboards. |
| Active dashboards | Dashboards that were viewed in the past 30 days. |
| Custom dashboards | Custom dashboards created by users, excluding integration dashboards. |
| Dashboard reports sent | Scheduled dashboard reports sent by email or Slack. |
| Dashboard views | Dashboards viewed across your organization. |
| Dashboards linked from monitors | Dashboards linked from one or more monitors, providing visual context for alerting conditions. |
| Dashboards with 3+ widgets | Percentage of dashboards that contain three or more widgets. |
| Newly created dashboards | New dashboards created in your organization. |
| Total dashboards | Dashboards that exist in your organization across all teams and users. |
| Unused dashboards | Dashboards flagged by the [Unused Dashboards control][3] because they have not been viewed within the control's inactivity threshold. |

### Infrastructure

| Insight | Description |
| :---- | :---- |
| Containers | Containers detected across your infrastructure, based on data collected from the Datadog Agent running in containerized environments such as Kubernetes, ECS, or Docker. |
| Hosts | Hosts reporting to Datadog, including physical machines, virtual machines, cloud instances, and on-premises servers. A host reports through the Datadog Agent or by sending host-level telemetry data. |
| Hosts with Agent | Hosts that have the Datadog Agent installed and actively reporting telemetry data, such as metrics, logs, traces, or events. |
| Hosts without Agent | Hosts sending data to Datadog without the Datadog Agent installed, typically detected through cloud integrations such as AWS, Google Cloud, or Azure. |
| Percentage of hosts with Agent | Percentage of all detected hosts that have the Datadog Agent installed. |
| Percentage of hosts with "team" tag | Percentage of all detected hosts with a `team` tag. |
| Percentage of hosts without "env" tag | Percentage of all detected hosts that are missing an `env` tag. |

### Logs

| Insight | Description |
| :---- | :---- |
| Archives | Long-term, low-cost storage locations that export logs after ingestion and allow you to rehydrate them later for investigations or audits. |
| Custom destinations | Destinations that stream logs from Datadog to any external system in real time. |
| Disabled logs pipelines | Log processing pipelines that exist in your account but no longer process or transform incoming logs. |
| Indexed logs | Logs that are stored, made fully searchable, and retained for the duration of your indexing retention period. |
| Indexes with daily quota | Log indexes that have daily volume limits applied to help control costs and produce predictable usage. |
| Indexes with exclusion filters | Log indexes that use exclusion filters to prevent certain ingested logs from being indexed. |
| Indexes with Flex Tier retention | Log indexes using Datadog's Flex Tier, a lower-cost retention option that keeps logs searchable for longer periods than standard indexing. |
| Indexes with Standard Tier retention | Log indexes using Datadog's Standard Tier, where indexed logs are stored with full search performance for the default retention period. |
| Indexes without daily quota | Log indexes that do not have a daily indexing volume limit applied. |
| Indexes without exclusion filters | Log indexes that do not use exclusion filters. All logs matching each index's query are fully indexed. |
| Ingested logs | Logs received by Datadog before any indexing rules, exclusion filters, sampling, or archiving are applied. |
| Logs pipelines | Sets of processors and routing rules that parse, enrich, transform, or route logs as they flow through the log processing pipeline. |
| Monitors | Monitors that use log data as their data source. |
| Standard attributes | Standardized log fields that Datadog recognizes and uses to normalize logs for consistent search, filtering, and analytics. |
| Unparsed logs | Logs that Datadog has ingested but not successfully parsed into structured attributes such as status, service, host, or custom fields. |
| Users using logs | Users who interacted with log-related features such as Log Explorer, Log Pipelines, or Log Monitors. |

### Metrics

| Insight | Description |
| :---- | :---- |
| Custom metrics | Distinct custom metric timeseries your organization ingests across all sources. Custom metrics are metrics not included in a Datadog integration. |
| Metrics monitors | Monitors that use metric data as their data source. |
| Unqueried metrics | Custom metrics that have not been queried in the past 30 days and are not used by any dashboards, monitors, SLOs, or notebooks. |
| Users using metrics | Users actively querying metrics in dashboards, monitors, notebooks, or the Metrics Explorer. |

### Monitors

| Insight | Description |
| :---- | :---- |
| Active downtimes | Downtimes that temporarily silence monitors during a scheduled maintenance window or manual pause. |
| Composite monitors with deleted constituents | Composite monitors whose underlying component monitors have been deleted. |
| Downtimes | Downtimes created in your Datadog organization, including both active and scheduled periods during which selected monitors are temporarily silenced. |
| Long-term alerting monitors | Monitors that have been in an alert state for more than 7 days. |
| Long-term muted monitors | Monitors that have been muted for more than 60 days. |
| Monitor alerts | Alerts triggered by all monitors. |
| Monitors | Monitors that exist in your Datadog organization, across all monitor types, regardless of status, configuration, or usage. |
| Monitors created | New monitors created in your Datadog organization. |
| Monitors missing evaluation delay | Monitors that do not have an evaluation delay configured, which can produce noisy alerts on out-of-order or late-arriving data. |
| Monitors missing recipients | Monitors that do not have any notification recipients configured. |
| Monitors with broken @-handles | Monitors containing `@`-mentions that no longer resolve, because the referenced user, team, or integration no longer exists. |
| Muted monitors | Monitors in a muted state. |
| Noisy monitors | Monitors that generate an unusually high volume of alerts, often due to overly sensitive thresholds, data fluctuations, or misconfigurations. |
| Recurring downtimes | Downtimes scheduled to automatically repeat on a regular cadence. |
| Triggered monitors | Monitors that have entered a triggered (alert or warning) state within the measurement period. |

### Notebooks

| Insight | Description |
| :---- | :---- |
| Active notebook authors | Users who created or edited notebooks. |
| Documentation notebooks | Notebooks created for documentation purposes, such as written analyses, troubleshooting steps, or explanatory content. |
| Investigation notebooks | Notebooks created for investigative workflows, such as analyzing incidents, exploring data, debugging issues, or performing root-cause analysis. |
| Notebooks | Notebooks that exist in your organization across all use cases. |
| Notebooks created | New notebooks created in your organization. |
| Postmortem notebooks | Notebooks created for incident postmortems, where teams document what happened, analyze root causes, and record follow-up actions. |
| Report notebooks | Notebooks created for reporting purposes, such as summaries, analyses, or regularly shared updates. |
| Runbook notebooks | Notebooks created to serve as runbooks, with step-by-step guides or operational procedures. |

### Security

| Insight | Description |
| :---- | :---- |
| Analyzed log events | Log events analyzed by Cloud SIEM detection rules. |
| Security contacts | Users in your organization who receive security-related notifications from Datadog. |
| Security log volume | Total bytes of log data analyzed by Cloud SIEM detection rules. |
| Users using security | Users interacting with Cloud Security Platform features, such as security rules, signals, or suppressions. |

### Usage

| Insight | Description |
| :---- | :---- |
| Active users | Users who have logged in to or interacted with Datadog. |
| Teams | Teams created in Datadog for organizing users, assigning ownership, and managing resources such as dashboards, monitors, and services. |
| Time spent | Amount of time users collectively spent interacting with Datadog each week. |
| Users created | New user accounts added to your Datadog organization. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/governance/summary
[2]: https://app.datadoghq.com/governance/products
[3]: /account_management/governance_console/controls/
