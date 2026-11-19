---
title: Create Data Observability Monitors with the API or Terraform
description: "Create data quality, source to target, schema change, and job monitors with the Datadog API or Terraform, with a validated example for each monitor type."
further_reading:
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitor'
  - link: '/data_observability/quality_monitoring/guides/anomaly_detection/'
    tag: 'Guide'
    text: 'Anomaly Detection for Data Observability Monitors'
  - link: '/api/latest/monitors/'
    tag: 'API'
    text: 'Monitors API'
  - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor'
    tag: 'External Site'
    text: 'Terraform datadog_monitor resource'
---

## Overview

Data Observability monitors are standard Datadog monitors. You create, update, and delete them with the [Monitors API][1] and the Terraform [`datadog_monitor`][2] resource, the same way you manage any other monitor. There is no separate Data Observability monitor resource.

This guide covers each Data Observability monitor type and shows a definition you can copy for the API and for Terraform. For what each setting does, see [Data Observability Monitor][3].

| Monitor | API `type` | Terraform |
|---|---|---|
| Data quality (table metrics, column metrics, custom SQL) | `data-quality alert` | `datadog_monitor` |
| Source to target | `data-quality alert` | `datadog_monitor` |
| Schema change | `schema-change alert` | `datadog_monitor_json` |
| Job failed runs | `data-jobs alert` | `datadog_monitor` |
| Job duration | `data-jobs alert` | `datadog_monitor_json` |

The [`datadog_monitor_json`][4] resource sends a monitor definition to the API as-is. Use it for any monitor or setting the typed `datadog_monitor` resource doesn't support.

## Before you start

- Create an [API key and an application key][5] with the `monitors_write` permission.
- Connect the warehouse or job platform you want to monitor. Monitors only find assets that Data Observability has already collected.
- For Terraform, use version 4.21.0 or later of the [Datadog provider][6]. Sensitivity, model configuration, and source to target settings require 4.21.0.

### Start from a monitor created in the UI

The fastest way to get a correct definition is to build the monitor in the UI, then export it. Open the monitor, click the settings menu, and select **Export** to copy its JSON or Terraform. Exported definitions reference assets by `entity_id`, which avoids matching two tables that share a name.

### Validate before you create

Send a definition to the [validate endpoint][7] to check it without creating anything:

```shell
curl -X POST "https://api.datadoghq.com/api/v1/monitor/validate" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d @monitor.json
```

Replace `datadoghq.com` with your [Datadog site][8]. A valid definition returns `{}`. Validation checks syntax only: a filter that matches no assets passes validation and creates a monitor that never reports data. Confirm that your filter returns the assets you expect in the [Catalog][9] or with the [MCP Server][10] `search_data_entities` tool before you deploy.

## Data quality monitors

A data quality monitor has a `query` and exactly one query variable, named `query1`, that selects the assets and the metric.

{{< tabs >}}
{{% tab "API" %}}

```json
{
  "name": "Freshness anomaly on ANALYTICS_DB.PROD.ORDERS",
  "type": "data-quality alert",
  "query": "formula(\"anomalies(query1)\").last(\"2h\") > 0",
  "message": "{{database.name}}.{{schema.name}}.{{table.name}} is anomalous: observed {{observed}}, expected {{lower_bound}} to {{upper_bound}}. @slack-data-alerts",
  "tags": ["team:data-platform"],
  "options": {
    "include_tags": true,
    "on_missing_data": "default",
    "variables": [
      {
        "name": "query1",
        "data_source": "data_quality_metrics",
        "schema_version": "0.0.1",
        "measure": "freshness",
        "filter": "search for database_table where `database:ANALYTICS_DB AND schema:PROD AND name:ORDERS`",
        "group_by": ["entity_id", "table", "schema", "database"]
      }
    ]
  }
}
```

{{% /tab %}}
{{% tab "Terraform" %}}

```hcl
resource "datadog_monitor" "orders_freshness" {
  name            = "Freshness anomaly on ANALYTICS_DB.PROD.ORDERS"
  type            = "data-quality alert"
  message         = "{{database.name}}.{{schema.name}}.{{table.name}} is anomalous: observed {{observed}}, expected {{lower_bound}} to {{upper_bound}}. @slack-data-alerts"
  query           = "formula(\"anomalies(query1)\").last(\"2h\") > 0"
  tags            = ["team:data-platform"]
  on_missing_data = "default"

  monitor_thresholds {
    critical = 0
  }

  variables {
    data_quality_query {
      name           = "query1"
      data_source    = "data_quality_metrics"
      schema_version = "0.0.1"
      measure        = "freshness"
      filter         = "search for database_table where `database:ANALYTICS_DB AND schema:PROD AND name:ORDERS`"
      group_by       = ["entity_id", "table", "schema", "database"]
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Query

The `query` sets the detection method:

| Detection | Query | Thresholds |
|---|---|---|
| Anomaly | `formula("anomalies(query1)").last("2h") > 0` | `critical` is `0`, or omit thresholds in the API. |
| Threshold | `formula("query1").last("2h") > 21600` | `critical` must equal the number in the query. You can add a `warning` threshold. |

Threshold queries accept `>`, `>=`, `<`, `<=`, `==`, and `!=`. If the `critical` threshold doesn't match the number in the query, the API rejects the monitor.

Set the `last()` window to the longest gap between scheduled runs plus one hour. The UI uses these windows:

| Schedule | Window |
|---|---|
| Default or hourly | `2h` |
| Every 3, 6, or 12 hours | `4h`, `7h`, `13h` |
| Daily | `25h` |
| Weekdays only | `73h` (covers the weekend gap) |

### Metrics

Set `measure` to the metric you want to monitor. Table metrics need a `database_table` filter, and column metrics need a `database_column` filter.

| `measure` | Asset | Unit |
|---|---|---|
| `freshness` | Table or column | Seconds since the last update. A 6-hour threshold is `21600`. |
| `row_count` | Table | Rows |
| `nullness`, `uniqueness`, `percent_zero`, `percent_negative` | Column | Percent on a 0 to 100 scale. A 2% threshold is `2`, not `0.02`. |
| `cardinality`, `min`, `max`, `mean`, `sum`, `stddev` | Column | The column's values |
| `custom` | Table | The value your SQL returns. See [Custom SQL](#custom-sql). |

### Select assets with `filter`

The `filter` names an asset type followed by a search in backticks:

```text
search for database_table where `database:ANALYTICS_DB AND schema:PROD AND name:ORDERS`
search for database_column where `database:ANALYTICS_DB AND schema:PROD AND table:USERS AND name:EMAIL`
```

For both tables and columns, `name:` is the asset's own name. A column filter uses `table:` for the parent table. Filters support the same syntax as [asset selection in the UI][11]:

- Attributes: `name:`, `schema:`, `database:`, `account:`, `entity_id:`, and any tag key, such as `owner:data-platform`.
- Lineage score: `lineage_score:(0.90 OR 1.00)`.
- Operators: `AND`, `OR`, `-` to exclude, parentheses, and `*` wildcards.
- Relations: add ``{ that is_upstream_of <TYPE> where `<SEARCH>` }`` after the search. You can also use `is_downstream_of`, `is_parent_of`, and `is_child_of`.

For example, this filter covers every table in two schemas except temporary tables:

```text
search for database_table where `database:ANALYTICS_DB AND (schema:PROD OR schema:MARTS) AND -name:TMP_*`
```

This filter covers every table upstream of a Tableau dashboard:

```text
search for database_table where `database:ANALYTICS_DB` { that is_upstream_of tableau_dashboard where `name:Revenue*` }
```

A monitor covers up to 5,000 assets. Each table a filter matches counts as a monitored table for billing, so check how many assets a broad filter matches before you create the monitor.

### Group by

Always include the asset keys in `group_by` so each asset reports its own status and chart:

- Tables: `["entity_id", "table", "schema", "database"]`
- Columns: `["entity_id", "column", "table", "schema", "database"]`

To split a metric by the values of a warehouse column, add the column names to `monitor_options.group_by_columns` and the lowercase column names to `group_by`:

```json
"group_by": ["entity_id", "table", "schema", "database", "channel"],
"monitor_options": {
  "custom_where": "REGION = 'US'",
  "group_by_columns": ["CHANNEL"]
}
```

`custom_where` is the [WHERE clause][12]. It filters the rows the metric is computed on. A monitor reports up to 500 groups by default.

### Custom SQL

Set `measure` to `custom` and put the query in `monitor_options.custom_sql`. The query returns one numeric column named `dd_value`. Any other column it returns must be listed in `group_by_columns`, or the API rejects the monitor.

{{< tabs >}}
{{% tab "API" %}}

```json
"variables": [
  {
    "name": "query1",
    "data_source": "data_quality_metrics",
    "schema_version": "0.0.1",
    "measure": "custom",
    "filter": "search for database_table where `database:ANALYTICS_DB AND schema:PROD AND name:ORDERS`",
    "group_by": ["entity_id", "table", "schema", "database", "region"],
    "monitor_options": {
      "custom_sql": "SELECT REGION, COUNT(*) AS dd_value FROM ANALYTICS_DB.PROD.ORDERS WHERE STATUS = 'FAILED' GROUP BY REGION",
      "group_by_columns": ["REGION"],
      "model_type_override": "any"
    }
  }
]
```

{{% /tab %}}
{{% tab "Terraform" %}}

```hcl
data_quality_query {
  name           = "query1"
  data_source    = "data_quality_metrics"
  schema_version = "0.0.1"
  measure        = "custom"
  filter         = "search for database_table where `database:ANALYTICS_DB AND schema:PROD AND name:ORDERS`"
  group_by       = ["entity_id", "table", "schema", "database", "region"]
  monitor_options {
    custom_sql          = "SELECT REGION, COUNT(*) AS dd_value FROM ANALYTICS_DB.PROD.ORDERS WHERE STATUS = 'FAILED' GROUP BY REGION"
    group_by_columns    = ["REGION"]
    model_type_override = "any"
  }
}
```

{{% /tab %}}
{{< /tabs >}}

`model_type_override` matches the model choice in the UI: `any` (Default), `freshness` (the value is an age in seconds), or `percentage` (the value is on a 0 to 100 scale). `custom_where` isn't allowed with custom SQL. Put the condition in the SQL instead.

### Schedule

By default, table freshness and row count monitors use the metrics the integration collects. To run a monitor on its own schedule, set `monitor_options.crontab_override`:

| Schedule | `crontab_override` |
|---|---|
| Hourly | `0 * * * *` |
| Every 3, 6, or 12 hours | `0 */3 * * *`, `0 */6 * * *`, `0 */12 * * *` |
| Daily | `0 0 * * *` |
| Custom | Any 5-field cron expression, such as `30 6 * * 1-5` |
| Manual (Preview) | `not_scheduled`. The monitor runs only when you [trigger a run](#run-a-monitor-on-demand). |

Cron expressions are in UTC, so the local run time shifts by an hour when daylight saving time starts or ends. The shortest interval is 15 minutes. A scheduled monitor runs its own query against your warehouse on each run.

### Model configuration

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Model configuration is in Preview.
{{< /callout >}}

Anomaly monitors accept these settings in `monitor_options`. For what each one does, see [Model configuration][13].

```json
"monitor_options": {
  "sensitivity": 2.5,
  "model_configuration": {
    "min_lower_bound_size": 1000,
    "min_upper_bound_size": 1000,
    "model_bounds_override": "LOWER_ONLY",
    "model_instructions": "Volume drops about 40% on US public holidays. Don't alert on those days."
  }
}
```

| Setting | Values |
|---|---|
| `sensitivity` | 0.1 to 6, default 3. Higher values widen the expected range, so the monitor alerts less. |
| `min_lower_bound_size`, `min_upper_bound_size` | The smallest distance between the prediction and each bound, in the metric's unit. |
| `model_bounds_override` | Alert direction: `UPPER_ONLY` alerts above the range, `LOWER_ONLY` below it. Omit to alert in both directions. Values are case sensitive. |
| `model_instructions` | Up to 500 characters of plain-language context about behavior you expect. |

The Terraform `datadog_monitor` resource supports `sensitivity`, `min_lower_bound_size`, `min_upper_bound_size`, and `model_bounds_override`. It doesn't support `model_instructions`, so use `datadog_monitor_json` if you set instructions. If you apply a `datadog_monitor` resource to a monitor whose instructions were set in the UI, Terraform removes them.

To alert only after several anomalies in a row, widen the window and add a trigger window. For three consecutive anomalies on an hourly monitor:

```json
"query": "formula(\"anomalies(query1)\").last(\"3h\") >= 1",
"options": {
  "thresholds": { "critical": 1 },
  "threshold_windows": { "trigger_window": "last_3h" }
}
```

In Terraform, set `monitor_thresholds { critical = 1 }` and `monitor_threshold_windows { trigger_window = "last_3h" }`.

### Missing data

Set `on_missing_data` to `default`, `show_no_data`, `show_and_notify_no_data`, or `resolve`. See [Missing data][14].

## Source to target monitors

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Source to target monitors are in Preview. Contact your Datadog representative or <a href="/help/">support</a> to request access.
{{< /callout >}}

A source to target monitor is a `data-quality alert` with a `source_to_target_config` in `monitor_options`. The `filter` selects the target asset. Source to target monitors reference both assets by `entity_id`, so export a monitor from the UI or look up the IDs in the Catalog. A table that Data Observability hasn't crawled yet has no `entity_id`.

{{< tabs >}}
{{% tab "API" %}}

```json
{
  "name": "Rows lost between POSTGRES_DB.PUBLIC.ORDERS and ANALYTICS_DB.PROD.ORDERS",
  "type": "data-quality alert",
  "query": "formula(\"anomalies(query1)\").last(\"2h\") > 0",
  "message": "Source and target row counts diverged. @slack-data-alerts",
  "options": {
    "variables": [
      {
        "name": "query1",
        "data_source": "data_quality_metrics",
        "schema_version": "0.0.1",
        "measure": "row_count",
        "filter": "search for database_table where `entity_id:9f8e7d6c5b4a3921`",
        "group_by": ["entity_id", "table", "schema", "database"],
        "monitor_options": {
          "crontab_override": "0 * * * *",
          "source_to_target_config": {
            "source": { "entity_id": "1a2b3c4d5e6f7081", "entity_type": "database_table" },
            "target": { "entity_id": "9f8e7d6c5b4a3921", "entity_type": "database_table" },
            "diff_type": "absolute"
          }
        }
      }
    ]
  }
}
```

{{% /tab %}}
{{% tab "Terraform" %}}

```hcl
resource "datadog_monitor" "orders_replication" {
  name    = "Rows lost between POSTGRES_DB.PUBLIC.ORDERS and ANALYTICS_DB.PROD.ORDERS"
  type    = "data-quality alert"
  message = "Source and target row counts diverged. @slack-data-alerts"
  query   = "formula(\"anomalies(query1)\").last(\"2h\") > 0"

  monitor_thresholds {
    critical = 0
  }

  variables {
    data_quality_query {
      name           = "query1"
      data_source    = "data_quality_metrics"
      schema_version = "0.0.1"
      measure        = "row_count"
      filter         = "search for database_table where `entity_id:9f8e7d6c5b4a3921`"
      group_by       = ["entity_id", "table", "schema", "database"]
      monitor_options {
        crontab_override = "0 * * * *"
        source_to_target_config {
          diff_type   = "absolute"
          entity_type = "database_table"
          source {
            entity_id   = "1a2b3c4d5e6f7081"
            entity_type = "database_table"
          }
          target {
            entity_id   = "9f8e7d6c5b4a3921"
            entity_type = "database_table"
          }
        }
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

- `diff_type` is `absolute` (target minus source) or `diff_percent` (the difference as a percent of the source).
- `entity_type` is `database_table` or `database_column`, and must be the same for the source and the target.
- To compare custom metrics, set `measure` to `custom` and add `custom_sql` to both `source` and `target`.
- An anomaly monitor learns the current difference as normal, so it doesn't alert on a mismatch that already exists when you create it. To alert on any difference, use a threshold, such as `formula("query1").last("2h") != 0` with `critical` set to `0`.

## Schema change monitors

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Schema change monitors are in Preview.
{{< /callout >}}

Schema change monitors use the `schema-change alert` type. The Terraform `datadog_monitor` resource doesn't accept this type, so use `datadog_monitor_json`. Build the JSON with `jsonencode()` rather than a heredoc, because heredocs change the escaped quotes inside the query.

{{< tabs >}}
{{% tab "API" %}}

```json
{
  "name": "Columns removed, renamed, or retyped in ANALYTICS_DB.PROD",
  "type": "schema-change alert",
  "query": "schema-changes(\"@account_entity_id:1a2b3c4d5e6f7081 AND @database:ANALYTICS_DB AND @schema:PROD AND @change_type:(removed OR renamed OR type_changed)\").rollup(\"count\").last(\"10m\") > 0",
  "message": "Schema change detected in ANALYTICS_DB.PROD. @slack-data-alerts",
  "options": {
    "thresholds": { "critical": 0 }
  }
}
```

{{% /tab %}}
{{% tab "Terraform" %}}

```hcl
resource "datadog_monitor_json" "prod_schema_changes" {
  monitor = jsonencode({
    name    = "Columns removed, renamed, or retyped in ANALYTICS_DB.PROD"
    type    = "schema-change alert"
    query   = "schema-changes(\"@account_entity_id:1a2b3c4d5e6f7081 AND @database:ANALYTICS_DB AND @schema:PROD AND @change_type:(removed OR renamed OR type_changed)\").rollup(\"count\").last(\"10m\") > 0"
    message = "Schema change detected in ANALYTICS_DB.PROD. @slack-data-alerts"
    options = {
      thresholds = { critical = 0 }
    }
  })
}
```

{{% /tab %}}
{{< /tabs >}}

The query filter accepts:

- `@account_entity_id`: the warehouse account. Export a schema change monitor created in the UI to find this ID.
- `@database`, `@schema`, `@table`, `@column`: the assets to watch.
- `@change_type`: `added`, `removed`, `renamed`, or `type_changed`. Omit it to alert on every change.

## Job monitors

Job monitors use the `data-jobs alert` type. The query variable must be named `run_query`, and it selects jobs with a `search for <job type>` filter.

### Failed runs

{{< tabs >}}
{{% tab "API" %}}

```json
{
  "name": "Databricks nightly job failed",
  "type": "data-jobs alert",
  "query": "formula(\"failed_runs(run_query)\").by(job_name,workspace_name,entity_id).last(1d) > 0",
  "message": "A Databricks nightly job failed. @slack-data-alerts",
  "options": {
    "thresholds": { "critical": 0 },
    "variables": [
      {
        "name": "run_query",
        "jobs_query": "search for databricks_job where `name:nightly_* AND workspace_name:prod`",
        "job_type": "databricks.job",
        "query_dialect": "aastra",
        "run_filter": ""
      }
    ]
  }
}
```

{{% /tab %}}
{{% tab "Terraform" %}}

```hcl
resource "datadog_monitor" "databricks_nightly_failed" {
  name    = "Databricks nightly job failed"
  type    = "data-jobs alert"
  message = "A Databricks nightly job failed. @slack-data-alerts"
  query   = "formula(\"failed_runs(run_query)\").by(job_name,workspace_name,entity_id).last(1d) > 0"

  monitor_thresholds {
    critical = 0
  }

  variables {
    data_jobs_query {
      name          = "run_query"
      jobs_query    = "search for databricks_job where `name:nightly_* AND workspace_name:prod`"
      job_type      = "databricks.job"
      query_dialect = "aastra"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

The threshold counts consecutive failed runs: `> 0` alerts on the first failure, and `> 2` alerts after three failures in a row. The window can be up to `10d`.

`run_filter` filters individual runs by tag, such as `env:prod`. The Terraform `data_jobs_query` block doesn't support `run_filter`, so use `datadog_monitor_json` if you need it.

Use the `job_type` and group-by keys that match the jobs you select. These are the keys the UI uses, and `entity_id` always comes last in `.by()`:

| Jobs | `jobs_query` asset type | `job_type` | `.by()` keys |
|---|---|---|---|
| Databricks jobs | `databricks_job` | `databricks.job` | `job_name`, `workspace_name` |
| Spark applications | `spark_application` | `spark.application` | `job_name`, `env` |
| Airflow DAGs | `airflow_dag` | `airflow.dag` | `name`, `env` |
| Airflow tasks | `airflow_job` | `airflow.job` | `name`, `dag_name`, `env` |
| dbt jobs, models, snapshots, tests | `dbt_job`, `dbt_model`, `dbt_snapshot`, `dbt_test` | `dbt.job`, `dbt.model`, `dbt.snapshot`, `dbt.test` | `name`, `project`, `env` |
| AWS Glue jobs | `glue_job` | `glue.job` | `name`, `env`, `account`, `region` |
| Azure Data Factory pipelines | `azure_data_factory_pipeline` | `adf.pipeline` | `name`, `tenant`, `subscription`, `factory` |
| Custom jobs from OpenLineage | `data_job` with `platform:custom AND integration:<NAME>` | `custom.ol.<NAME>` | `integration`, `name`, `env` |

The API doesn't check that `job_type` matches the asset type in `jobs_query`. A mismatch creates a monitor that watches the wrong jobs.

### Duration

Duration monitors alert when a run takes longer than a threshold, or longer than usual. The Terraform `datadog_monitor` resource doesn't support duration monitors, so use `datadog_monitor_json`.

{{< tabs >}}
{{% tab "API" %}}

```json
{
  "name": "Databricks nightly job ran longer than 2 hours",
  "type": "data-jobs alert",
  "query": "formula(\"job_duration(run_query)\").detection(static).by(job_name,workspace_name,entity_id) > 7200",
  "message": "A Databricks nightly job ran longer than 2 hours. @slack-data-alerts",
  "options": {
    "thresholds": { "critical": 7200, "warning": 5400 },
    "variables": [
      {
        "name": "run_query",
        "data_source": "data_quality_metrics",
        "schema_version": "0.0.1",
        "measure": "duration",
        "filter": "search for databricks_job where `name:nightly_* AND workspace_name:prod`",
        "group_by": ["job_name", "workspace_name", "entity_id"],
        "run_filter": "",
        "job_duration": {},
        "monitor_options": { "detection_type": "static", "consecutive_runs": 1 }
      }
    ]
  }
}
```

{{% /tab %}}
{{% tab "Terraform" %}}

```hcl
resource "datadog_monitor_json" "databricks_nightly_duration" {
  monitor = jsonencode({
    name    = "Databricks nightly job ran longer than 2 hours"
    type    = "data-jobs alert"
    query   = "formula(\"job_duration(run_query)\").detection(static).by(job_name,workspace_name,entity_id) > 7200"
    message = "A Databricks nightly job ran longer than 2 hours. @slack-data-alerts"
    options = {
      thresholds = { critical = 7200, warning = 5400 }
      variables = [{
        name            = "run_query"
        data_source     = "data_quality_metrics"
        schema_version  = "0.0.1"
        measure         = "duration"
        filter          = "search for databricks_job where `name:nightly_* AND workspace_name:prod`"
        group_by        = ["job_name", "workspace_name", "entity_id"]
        run_filter      = ""
        job_duration    = {}
        monitor_options = { detection_type = "static", consecutive_runs = 1 }
      }]
    }
  })
}
```

{{% /tab %}}
{{< /tabs >}}

- Thresholds are in seconds.
- For anomaly detection, use `.detection(anomaly)` with `> 0`, set `detection_type` to `anomaly`, and omit thresholds.
- `group_by` must list the same keys as `.by()`, and `detection_type` must match `.detection()`.

## Run a monitor on demand

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Running monitors on demand is in Preview.
{{< /callout >}}

Trigger a run with the [Data Observability API][15], for example after a pipeline finishes:

```shell
curl -X POST "https://api.datadoghq.com/api/v2/data-observability/monitors/<MONITOR_ID>/run" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

The response includes a `run_id`. Check the result with `GET /api/v2/data-observability/monitors/runs/<RUN_ID>/status`, which returns `pending`, `ok`, `warn`, `alert`, or `error`. Table freshness and row count monitors on the default schedule can't run on demand. Set a `crontab_override`, such as `not_scheduled`, first.

## Troubleshooting

The monitor shows no data or no groups
: The filter matches no assets, or the assets haven't been collected yet. Search for the assets in the Catalog with the same filter. Names are case sensitive.

The API rejects the threshold
: The `critical` threshold must equal the number in the query. For anomaly monitors, use `> 0` with `critical` set to `0`.

`Measure 'nullness' is not supported for 'table' filters`
: Column metrics need a `search for database_column` filter.

The API rejects custom SQL with an error about extra columns
: Every column the SQL returns other than `dd_value` must be listed in `group_by_columns`.

Terraform reverts changes made in the UI
: Terraform resets a monitor to its configuration on each apply. Make changes in one place, either Terraform or the UI.

Resolving the monitor has no effect
: The Resolve action doesn't change Data Observability monitor state. To reset an alert, [annotate the bounds][16].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/monitors/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[3]: /monitors/types/data_observability/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor_json
[5]: /account_management/api-app-keys/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest
[7]: /api/latest/monitors/#validate-a-monitor
[8]: /getting_started/site/
[9]: /data_observability/data_catalog/
[10]: /mcp_server/tools/#data-observability
[11]: /monitors/types/data_observability/#choose-data-to-monitor
[12]: /monitors/types/data_observability/#where-clause
[13]: /monitors/types/data_observability/#model-configuration
[14]: /monitors/types/data_observability/#missing-data
[15]: /api/latest/data-observability/
[16]: /monitors/types/data_observability/#annotate-bounds
