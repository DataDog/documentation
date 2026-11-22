---
title: Migrate from Metaplane to Data Observability
description: "Prepare for the migration of your Metaplane monitors to Datadog Data Observability, learn how monitors, notifications, schedules, and history carry over, and check the migrated monitors."
further_reading:
  - link: '/data_observability/quality_monitoring/'
    tag: 'Documentation'
    text: 'Quality Monitoring'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitor'
  - link: '/data_observability/quality_monitoring/guides/anomaly_detection/'
    tag: 'Guide'
    text: 'Anomaly Detection for Data Observability Monitors'
---

## Overview

Metaplane reaches end of life on December 15, 2026. Datadog runs the migration of your Metaplane monitors to [Data Observability monitors][1] for your organization. The migration reads each monitor's configuration, alert destinations, and evaluation history from Metaplane. It then creates matching monitors in your Datadog organization.

To request the migration, contact [Datadog Support][2] or your Datadog account team, and mention your Metaplane migration. Run Metaplane and Datadog side by side until you have confirmed that the migrated monitors work. See [Check the migrated monitors](#check-the-migrated-monitors).

Use this page to prepare your Datadog organization for the migration, to understand how your monitors look afterward, and to check them.

## Prerequisites

### Connect your data warehouses

Datadog creates migrated monitors only on warehouses that are connected to Data Observability. The migration supports Metaplane connections to the following platforms. Connect each one by following its setup page:

- [Snowflake][3]
- [BigQuery][4]
- [Databricks][5]
- [Amazon Redshift][6]
- [PostgreSQL][7] (Preview)
- [ClickHouse Cloud][8] (Preview)

Monitors on Metaplane connections to other platforms aren't migrated.

The migration doesn't copy credentials from your Metaplane connections. You can connect with the user, role, or service account that Metaplane uses. It must meet the requirements on the setup page, including the authentication method and grants. PostgreSQL connects through the Datadog Agent instead of a direct connection.

Grant the Datadog user, role, or service account access to every database and schema that your Metaplane monitors cover. Then confirm that those tables appear in the [Data Catalog][9]. The migration still creates monitors on tables that Datadog hasn't synced, but it doesn't migrate their history.

Keep each integration connected until the migration finishes. Datadog matches Metaplane connections only to integrations that have synced in the last five days.

### Set up notification integrations

Metaplane alert destinations become notification handles in the migrated monitors. For Slack, PagerDuty, Microsoft Teams, and webhook handles to deliver alerts, set up the matching Datadog integration: [Slack][10], [PagerDuty][11], [Microsoft Teams][12], or [Webhooks][13]. To avoid editing handles after the migration, name each Datadog Microsoft Teams handle and webhook after its Metaplane destination. Replace spaces in the name with hyphens. For details, see [Notifications](#notifications).

## Migration process

### Matching Metaplane connections to Datadog accounts

Datadog links each Metaplane connection to a connected Datadog account on the same platform:

| Platform | Matched by |
|---|---|
| Snowflake | Account host |
| BigQuery | Project |
| Databricks | Workspace URL |
| Amazon Redshift | Cluster identifier or Serverless workgroup name, and AWS region |
| PostgreSQL, ClickHouse Cloud | Host |

If your Metaplane organization and your Datadog organization each have exactly one connection for a platform, Datadog matches the two automatically. When automatic matching fails, for example because several Datadog accounts share a host, Datadog can match the connection manually.

Snowflake connections made through the Snowflake Native App in Metaplane have no host. Datadog matches them manually, unless each side has only one Snowflake connection.

Monitors on a Metaplane connection that isn't matched to a Datadog account aren't migrated.

### Dry run

Before creating any monitors, Datadog runs the migration as a dry run. A dry run doesn't create or change monitors in your Datadog organization. It reports:

- Which Metaplane connections matched a Datadog account, and which have no match.
- How many Datadog monitors the migration would create, and how many already exist.
- Which Metaplane monitors the migration would skip, and why.

After reviewing the dry run, Datadog creates the monitors. Running the migration again doesn't duplicate monitors that already exist. Datadog migrates [history](#history) in a separate step, after it creates the monitors.

### Monitor grouping

By default, each Metaplane monitor becomes one Datadog monitor. Partition monitors and manual monitors with several thresholds follow the rules in [Partition monitors](#partition-monitors) and [Detection method](#detection-method).

Datadog can instead combine compatible monitors on the same type of asset in the same schema, or column monitors on the same table. The combined Datadog monitor covers several tables or columns. Monitors are compatible when they have the same metric type, filters, group-by columns, model type, thresholds, schedule, and alert destinations. Custom SQL monitors are never combined.

## Monitor mapping

### Metric types

| Metaplane metric | Datadog metric type |
|---|---|
| Freshness | Freshness |
| Row count | Row Count |
| Nullness, Uniqueness, Cardinality, Percent zero, Percent negative | The column metric of the same name |
| Min, Max, Mean, Sum, Standard deviation | The column metric of the same name |
| Custom SQL | Custom SQL |
| Column count | Not migrated |

Metaplane source-to-target monitors become [source to target monitors][14] (Preview). The source and the target must be on matched connections and measure the same metric. Unless they use Custom SQL, both sides must be tables, or both must be columns.

Datadog expresses percentage metrics, such as Nullness and Uniqueness, on a scale of 0 to 100. The migration converts thresholds and history values for these metrics to that scale.

### Detection method

- Anomaly monitors use the {{< ui >}}Anomalies{{< /ui >}} detection method.
- Manual monitors with one threshold use the {{< ui >}}Thresholds{{< /ui >}} detection method, with the same comparison operator and value.
- Manual monitors with two to 10 distinct thresholds, such as an expected range, become a [composite monitor][15].

For a multi-threshold monitor, the migration creates one sub-monitor per threshold, named `<MONITOR_NAME> (<OPERATOR> <VALUE>)`. It also creates a composite monitor with the original name, which alerts when any sub-monitor alerts. The composite monitor has the notification handles, owner mentions, and Metaplane tags. The sub-monitor messages contain only the monitor description, so the sub-monitors don't send notifications of their own.

### Monitor settings

| Metaplane setting | Datadog monitor |
|---|---|
| Name | Same name. A Metaplane monitor without a name is named after its metric and table, for example `Row count - ANALYTICS.PROD.ORDERS`. |
| Description | Top of the monitor message, under a `## Description` heading. |
| WHERE filter and incremental time window | [WHERE clause][16]. |
| Group-by columns | [Group by][17] columns. Each group keeps its own history. |
| Sensitivity (anomaly monitors) | Sensitivity, a [model configuration][18] setting (Preview), within the Datadog range of 0.1 to 6. |
| Alert only above or only below the expected range (anomaly monitors) | The migrated monitor alerts on the same side of the expected range as in Metaplane. Freshness monitors keep the default, and alert on both sides. |
| Schedule | See [Schedules and time zones](#schedules-and-time-zones). |

If your Metaplane organization allowed more groups per monitor than your Datadog organization does, the dry run reports both limits. To increase the Datadog limit before the monitors are created, contact [Datadog Support][2].

When the migration combines monitors that have different sensitivities, the Datadog monitor uses the default sensitivity of 3. When the combined monitors alert on different sides of the expected range, the Datadog monitor alerts on both sides.

### Partition monitors

In Metaplane, a partition monitor creates one monitor for each partition value. When every partition value of a table has a monitor with the same metric and settings, the migration combines them. The result is one Datadog monitor grouped by the partition columns. For example, row count monitors for each value of `region` become one row count monitor grouped by `region`. Each partition's history becomes the history of its group.

In the following cases, each partition monitor becomes a separate Datadog monitor, with a WHERE clause for its partition value:

- The partition monitors have different settings.
- Some partition values have no monitor.
- The partition values come from a query that filters the table.

### Custom SQL monitors

Migrated Custom SQL monitors keep their query as written. Datadog reads the monitor value from a column aliased `dd_value` or `mp_value`, or from the only column when the query returns a single column. When you write a Custom SQL query in Datadog, alias the value as `dd_value`.

The columns that a Metaplane Custom SQL query returns as labels become the monitor's {{< ui >}}Group by{{< /ui >}} columns. Some Custom SQL anomaly monitors use a freshness or percentage model in Metaplane. The matching Datadog monitors use the {{< ui >}}Freshness{{< /ui >}} or {{< ui >}}Percentage{{< /ui >}} model type.

## Skipped monitors

The migration skips these Metaplane monitors:

- Disabled monitors, and monitors on disabled Metaplane connections.
- Column count monitors.
- Monitors on assets other than databases, schemas, tables, and columns, such as dbt models and dbt job duration monitors. To alert on dbt job duration in Datadog, set up [dbt in Jobs Monitoring][19] and add a [Job duration][20] check to a job monitor.
- Manual monitors with more than 10 distinct thresholds.
- Monitors that cover more than one asset or more than one metric.
- Monitors whose schedule can't be converted to UTC, such as some schedules restricted to days of the month.
- Monitors on Metaplane connections that aren't matched to a Datadog account.
- Source to target monitors whose source and target don't meet the requirements in [Metric types](#metric-types).

Datadog records which monitors the migration skips, and why. To get this list and recreate the monitors you still need, contact [Datadog Support][2].

## Notifications

Metaplane alert destinations become `@` handles in the monitor message:

| Metaplane destination | Datadog handle |
|---|---|
| Email | `@<EMAIL_ADDRESS>` |
| Slack channel | `@slack-<CHANNEL_NAME>` |
| PagerDuty | `@pagerduty-<DESTINATION_ADDRESS>` |
| Microsoft Teams | `@teams-<DESTINATION_NAME>` |
| Webhook | `@webhook-<DESTINATION_NAME>` |

PagerDuty handles use the destination's address in Metaplane, not its name. Spaces in Slack, Microsoft Teams, and webhook destination names become hyphens. Other destination types aren't carried over. If a handle doesn't match a channel, service, or webhook configured in Datadog, update it across the migrated monitors with [bulk editing of @-handles][21].

If a monitor's owner has a Slack account linked in Metaplane, the message ends with a `Monitor owners:` line. That line mentions the owner in Slack notifications.

## Tags

Migrated monitors have these tags:

- `metaplane_migration:true` on every migrated monitor.
- `metaplane_monitor_id:<METAPLANE_MONITOR_ID>` for each Metaplane monitor that the Datadog monitor replaces. If these tags would put a Datadog monitor over the limit of 80 monitor tags, the monitor doesn't get them.
- The tags from the Metaplane monitor.

The sub-monitors of a migrated composite monitor have the `metaplane_migration:true`, `metaplane_monitor_id`, and `dq_composite_sub_monitor:true` tags only.

## Schedules and time zones

Metaplane monitors that ran on their connection's default hourly schedule get the {{< ui >}}Default schedule{{< /ui >}} option in Datadog. With this option, the monitor runs each time Datadog collects metrics from the warehouse, which is hourly by default. Metaplane monitors that weren't scheduled get the {{< ui >}}Manual{{< /ui >}} schedule (Preview), and run only when triggered through the API. Other schedules become a cron expression in the monitor's [custom schedule][22].

Datadog evaluates custom schedules in UTC. Metaplane evaluates schedules in the monitor's time zone, or in your Metaplane organization's default time zone. The migration converts each schedule to UTC, using the UTC offset in effect on the day of the migration. The monitor then runs at the same local time as it did in Metaplane.

In time zones that observe daylight saving time, the monitor runs one hour off that local time for part of the year. To change when a monitor runs, edit its custom schedule.

## History

After it creates the monitors, Datadog migrates up to 450 days of Metaplane history for each monitor:

- Observed values, which become part of the metric's history in Datadog.
- For anomaly monitors, the bounds and predicted values that Metaplane calculated at each evaluation.
- Annotations that were active in Metaplane, which become [bound annotations][23].

The following limits apply:

- If Datadog already collected values for a metric, Datadog keeps its own values. Metaplane history fills only the period before the earliest Datadog value. This happens, for example, when the table was connected to Datadog before the migration.
- If a Metaplane monitor's model was reset, only history from after the reset carries over.
- History migrates only for tables that Datadog has synced from your warehouse.

## Bounds after the migration

Metaplane and Datadog use different anomaly detection models. The chart of a migrated monitor shows the bounds that Metaplane calculated for the migrated history. After the migration, the Datadog model calculates the bounds, so their width and shape can change from the migration date onward.

The Datadog model learns from the metric's history, including the migrated observed values, and adjusts for seasonal patterns, trends, and annotations. It needs at least two complete cycles of history to detect a seasonal pattern. Hour-of-day patterns use about the last month of history, and day-of-month patterns use up to 400 days. A monitor with little history, for example because its model was reset in Metaplane, gives the model fewer cycles to learn from. For details, see [Seasonality][24] in the anomaly detection guide.

To tune bounds on a migrated monitor, adjust its [model configuration][18] or [annotate its bounds][23].

## Check the migrated monitors

After Datadog creates the monitors and migrates their history, check them before you turn off monitoring in Metaplane:

1. On the [Monitor List][25], search for `tag:"metaplane_migration:true"` to list every migrated monitor, including composite monitors and their sub-monitors. To hide the sub-monitors, add `-tag:"dq_composite_sub_monitor:true"` to the search.
2. To find the Datadog monitor that replaces a specific Metaplane monitor, search for `tag:"metaplane_monitor_id:<METAPLANE_MONITOR_ID>"`. If a combined monitor has no `metaplane_monitor_id` tags because of the tag limit, search for the monitor by name.
3. Open the monitors your team relies on, and confirm that they show values and evaluate on their schedule.
4. Confirm that each `@` handle in the monitor messages matches a configured Slack channel, PagerDuty service, Microsoft Teams handle, or webhook. See [Notifications](#notifications).
5. Recreate the skipped monitors you still need. See [Skipped monitors](#skipped-monitors).
6. When the migrated monitors behave as expected, pause your connections in Metaplane.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/data_observability/
[2]: /help/
[3]: /data_observability/quality_monitoring/data_warehouses/snowflake/
[4]: /data_observability/quality_monitoring/data_warehouses/bigquery/
[5]: /data_observability/quality_monitoring/data_warehouses/databricks/
[6]: /data_observability/quality_monitoring/data_warehouses/redshift/
[7]: /data_observability/quality_monitoring/transactional_databases/postgres/
[8]: /data_observability/quality_monitoring/data_warehouses/clickhouse/
[9]: /data_observability/data_catalog/
[10]: /integrations/slack/
[11]: /integrations/pagerduty/
[12]: /integrations/microsoft-teams/
[13]: /integrations/webhooks/
[14]: /monitors/types/data_observability/#source-to-target-monitors
[15]: /monitors/types/composite/
[16]: /monitors/types/data_observability/#where-clause
[17]: /monitors/types/data_observability/#group-by
[18]: /monitors/types/data_observability/#model-configuration
[19]: /data_observability/jobs_monitoring/dbt/
[20]: /monitors/types/data_observability/#job-duration
[21]: /monitors/notify/#bulk-editing-monitor--handles
[22]: /monitors/types/data_observability/#monitor-schedule
[23]: /monitors/types/data_observability/#annotate-bounds
[24]: /data_observability/quality_monitoring/guides/anomaly_detection/#seasonality
[25]: https://app.datadoghq.com/monitors/manage
