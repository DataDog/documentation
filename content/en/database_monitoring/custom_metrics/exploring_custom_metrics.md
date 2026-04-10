---
title: Exploring Custom Metrics
description: Explore timeseries graphs for custom queries on the database instance detail page.
further_reading:
- link: "/database_monitoring/custom_metrics/"
  tag: "Documentation"
  text: "Collecting Custom Metrics with Database Monitoring"
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
---

The **Custom Metrics** section appears on the database instance detail page and displays timeseries graphs for any custom queries you have defined in your Datadog Agent configuration.

## Overview

If you have configured `custom_queries` in your Datadog Agent's database integration, this section automatically discovers those queries from the Agent's configuration and visualizes each metric column as a timeseries graph. This lets you monitor business-specific or environment-specific database metrics alongside the standard Database Monitoring metrics, all in one place.

## How it works

1. Define custom queries in your Agent config. Each query specifies a SQL statement, one or more metric columns (with types like `gauge`, `count`, `rate`, and so on), optional tag columns, an optional metric prefix, and an optional collection interval.
2. The Agent collects the metrics by running your SQL queries on the configured interval (default: every 15 seconds) and emitting the results as Datadog metrics.
3. The Custom Metrics section displays a graph for each metric column from your custom queries, scoped to the current database instance. Metrics are named `<prefix>.<column_name>`, for example `postgresql.my_table_row_count`.

## Example Agent configuration

The following PostgreSQL example tracks table size and row counts per table:

```yaml
init_config:

instances:
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: <PASSWORD>
    custom_queries:
      - metric_prefix: postgresql.custom
        query: |
          SELECT
            table_name,
            pg_total_relation_size(quote_ident(table_name)) AS total_bytes,
            n_live_tup                                       AS live_rows,
            n_dead_tup                                       AS dead_rows
          FROM information_schema.tables
          JOIN pg_stat_user_tables USING (table_name)
          WHERE table_schema = 'public'
        columns:
          - name: table_name
            type: tag
          - name: total_bytes
            type: gauge
          - name: live_rows
            type: gauge
          - name: dead_rows
            type: gauge
        collection_interval: 60
        tags:
          - env:production
          - service:my-app
```

This configuration produces three metrics, each broken down by `table_name`:

- `postgresql.custom.total_bytes`
- `postgresql.custom.live_rows`
- `postgresql.custom.dead_rows`

All three appear as separate timeseries graphs in the Custom Metrics section of the instance detail page.

## Column types

Each column in a custom query is assigned a type that controls how the metric is aggregated and displayed:

| Type | Description |
| --- | --- |
| `gauge` | A value that can go up or down (for example, table size). |
| `count` | A count of events since the last collection. |
| `rate` | A per-second rate. |
| `monotonic_count` | A counter that only increases. |
| `monotonic_gauge` | A monotonically increasing gauge. |
| `temporal_percent` | A percentage of time. |
| `time_elapsed` | Duration in time units. |
| `tag` | Groups or filters metrics; not plotted as its own graph. |

`count` and `monotonic_count` columns are aggregated as `sum`. All other metric types are aggregated as `avg`.

## Viewing the source SQL

Each graph has a **View SQL query** button (code icon) in the top-right corner. Clicking it shows the raw SQL statement that produces the metric, so you can understand and audit what is being measured.

## Collection interval

The section subtitle shows how often the metrics are collected (for example, "collected every 15s"). If you have multiple custom queries with different intervals, the range is shown (for example, "collected every 15s–60s").

## Requirements

Custom queries must be defined under the `custom_queries` key in the database integration configuration. The Custom Metrics section is hidden if no custom queries are configured.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
