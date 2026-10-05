---
title: Custom Metrics
description: Use the custom_queries option to collect metrics from your own database tables and view them in Database Monitoring.
aliases:
- /database_monitoring/custom_metrics/exploring_custom_metrics
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/metrics/types/"
  tag: "Documentation"
  text: "Metric Types"
---

Use `custom_queries` to collect metrics from any table the Agent's database user can read. This extends the data available in Datadog beyond the query performance metrics that Database Monitoring collects natively, such as application state tables, business counters, or queue depths.

## Before you begin

The Datadog Agent must be installed and the database integration configured. The Agent's database user needs `SELECT` on any tables you query.

## Configuration

Add `custom_queries` to your integration's `conf.yaml` file. Each entry in the list runs one SQL query and maps its output columns to metrics or tags.

| Option | Required | Description |
| --- | --- | --- |
| `metric_prefix` | Yes | All metrics emitted by this query begin with this prefix. |
| `query` | Yes | The SQL to execute. All returned rows are evaluated. Use the pipe character (`\|`) for multi-line queries. |
| `columns` | Yes | A list of columns in the same order as your `SELECT`. Each column requires a `name` and a `type`. Set `type` to one of the [column types](#column-types) to emit a metric, or `tag` to apply the column value as a tag on every metric from this query. |
| `tags` | No | A list of static tags applied to every metric from this query. |
| `collection_interval` | No | How often, in seconds, the Agent runs the query. Defaults to every 15 seconds. |

**Notes:**
- The number of `columns` entries must equal the number of columns returned by the query.
- The order of `columns` entries must match the order of columns returned by the query.
- At least one entry in `columns` must be a metric type (not `tag`).

### Column types

Each column's `type` controls how the metric is submitted and aggregated. For more information, see [Metric Types][1].

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

## Examples

{{< tabs >}}
{{% tab "PostgreSQL" %}}

Add `custom_queries` to your `postgres.d/conf.yaml` file.

If the query reads from a table the `datadog` user cannot already access, grant the permission first:

```sql
GRANT SELECT ON <TABLE_NAME> TO datadog;
```

**Example:** The following `company` table contains employee records:

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

To collect `age` and `salary` as metrics with `name` and `address` as tags:

```yaml
custom_queries:
  - metric_prefix: postgresql.employee
    query: SELECT age, salary, name, address FROM company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

After you update the file, [restart the Agent][2].

For the full configuration reference, see [Postgres Custom Metric Collection][3].

[2]: /agent/configuration/agent-commands/#restart-the-agent
[3]: /integrations/faq/postgres-custom-metric-collection-explained/
{{% /tab %}}

{{% tab "MySQL" %}}

Add `custom_queries` to your `mysql.d/conf.yaml` file.

**Important:** All table references must include the database name (`database_name.table_name`). If you omit the database name, the Agent fails with the error: `No database selected`.

**Example:** The following `company` table in the `testdb` database contains employee records:

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

To collect `age` and `salary` as metrics with `name` and `address` as tags:

```yaml
custom_queries:
  - metric_prefix: mysql.employee
    query: SELECT age, salary, name, address FROM testdb.company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

After you update the file, [restart the Agent][2].

For the full configuration reference, see [MySQL Custom Queries][3].

[2]: /agent/configuration/agent-commands/#restart-the-agent
[3]: /integrations/guide/mysql-custom-queries/
{{% /tab %}}

{{% tab "SQL Server" %}}

SQL Server supports two approaches for collecting custom metrics: [custom queries](#custom-queries) or [performance counters](#performance-counters).

### Custom queries

Add `custom_queries` to your `sqlserver.d/conf.yaml` file to collect metrics from any table.

**Example:** The following `company` table in `testdb` contains employee records:

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

To collect `age` and `salary` as metrics with `name` and `address` as tags:

```yaml
custom_queries:
  - metric_prefix: sqlserver.employee
    query: SELECT age, salary, name, address FROM testdb.dbo.company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

### Performance counters

Use `custom_metrics` to collect metrics from `sys.dm_os_performance_counters` and other system DMVs.

```yaml
custom_metrics:
  - name: sqlserver.clr.execution
    counter_name: CLR Execution
```

| Option | Required | Description |
| --- | --- | --- |
| `name` | Yes | The metric name in Datadog. |
| `counter_name` | Yes | The counter name from `sys.dm_os_performance_counters`. |
| `instance_name` | No | A specific counter instance. Use `ALL` to collect all instances (requires `tag_by`). |
| `tag_by` | No | Tag name used to differentiate instances when `instance_name: ALL`. |

After you update the file, [restart the Agent][2].

For the full configuration reference, including performance counter details and the legacy stored procedure method, see [Collect SQL Server Custom Metrics][3].

[2]: /agent/configuration/agent-commands/#restart-the-agent
[3]: /integrations/guide/collect-sql-server-custom-metrics/
{{% /tab %}}
{{< /tabs >}}

## Validation

After the Agent runs, search for your metrics in the [Metrics Explorer][4].

To check for configuration errors, [run the Agent's status subcommand][5] and look for your integration under the Checks section:

```text
postgres
--------
  - instance #0 [ERROR]: 'Missing metric_prefix parameter in custom_queries'
  - Collected 0 metrics, 0 events & 0 service checks
```

## Explore custom metrics in Database Monitoring

The {{< ui >}}Custom Metrics{{< /ui >}} section of the database instance detail page displays a timeseries graph for each metric column in your custom queries, scoped to that instance. This lets you monitor business-specific or environment-specific metrics alongside the standard Database Monitoring metrics. The section is hidden if no custom queries are configured.

Metrics are named `<metric_prefix>.<column_name>`. For example, the PostgreSQL example above produces `postgresql.employee.employee_age` and `postgresql.employee.employee_salary`, each tagged by `name` and `address`.

- **Aggregation**: `count` and `monotonic_count` columns are aggregated as `sum`. All other metric types are aggregated as `avg`.
- **Source SQL**: Click {{< ui >}}View SQL query{{< /ui >}} in the top-right corner of a graph to see the SQL statement that produces the metric.
- **Collection interval**: The section subtitle shows how often the metrics are collected (for example, "collected every 15s"). If your custom queries use different intervals, the range is shown (for example, "collected every 15s–60s").

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/types/
[4]: /metrics/explorer/
[5]: /agent/configuration/agent-commands/#agent-status-and-information
