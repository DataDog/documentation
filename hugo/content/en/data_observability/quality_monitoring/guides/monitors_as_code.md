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
| Job failure | `data-jobs alert` | `datadog_monitor` |
| Job duration | `data-jobs alert` | `datadog_monitor_json` |

The [`datadog_monitor_json`][4] resource sends a monitor definition to the API as-is. Use it for any monitor or setting the typed `datadog_monitor` resource doesn't support.

## Before you start

- Create an [API key and an application key][5]. The application key acts as the user who created it, so that user needs a role with the Monitors Write permission. If you restrict the application key with scopes, include `monitors_write`, and add `data_observability_monitors_write` to [run monitors on demand](#run-a-monitor-on-demand).
- Connect the warehouse or job platform you want to monitor. Monitors only find assets that Data Observability has already collected.
- For Terraform, use version 4.21.0 or later of the [Datadog provider][6]. Sensitivity, model configuration, and source to target settings require 4.21.0.

### Configure the Terraform provider

Set `api_url` to the API endpoint for your [Datadog site][8]. Without it, the provider sends requests to US1 (`https://api.datadoghq.com/`), and requests for an organization on another site fail with an authentication error.

```hcl
terraform {
  required_providers {
    datadog = {
      source  = "DataDog/datadog"
      version = ">= 4.21.0"
    }
  }
}

provider "datadog" {
  # When api_key and app_key are omitted, the provider reads DD_API_KEY and DD_APP_KEY from the environment.
  api_url = "https://api.datadoghq.eu/"
}
```

### Start from a monitor created in the UI

The fastest way to get a correct definition is to build the monitor in the UI, then export it. Open the monitor, open the {{< ui >}}More{{< /ui >}} menu, and select {{< ui >}}Export{{< /ui >}} to copy its JSON or Terraform. Exported definitions reference assets by `entity_id`, which avoids matching two tables that share a name.

### Find an entity ID

Data Observability gives every asset it collects, such as a table, column, job, or warehouse account, an `entity_id`, a hexadecimal ID such as `9f8e7d6c5b4a3921`. [Source to target monitors](#source-to-target-monitors) and [schema change monitors](#schema-change-monitors) require entity IDs. In any monitor, filtering by `entity_id` is the most precise way to select an asset.

To find an entity ID:

- **From the Data Catalog URL**: Open the asset in the [Data Catalog][9]. The entity ID is the part of the URL after `/data-obs/catalog/`, before any `?`. For example, in `https://app.datadoghq.com/data-obs/catalog/9f8e7d6c5b4a3921?section=schema-changes`, the entity ID is `9f8e7d6c5b4a3921`.
- **From an existing monitor**: Export a monitor that covers the asset. The ID appears in the `filter`, for example ``search for database_table where `entity_id:9f8e7d6c5b4a3921` ``.
- **From an alert**: When a monitor's `group_by` includes `entity_id`, its alerts include an `entity_id:<ID>` tag for each asset.
- **With the MCP Server**: To look up many assets at once, for example during a migration, use the [Datadog MCP Server](#look-up-entity-ids-with-the-mcp-server).

#### Look up entity IDs with the MCP Server

The [Datadog MCP Server][19] lets an AI agent, such as Claude Code, Cursor, or Codex, search the Data Observability catalog. To look up entity IDs:

1. [Connect your AI client to the MCP Server][19] and enable the `data-observability` toolset, for example by adding `?toolsets=core,data-observability` to the endpoint URL. The tools require the Monitors Read or APM Read permission.
2. Ask the agent for the IDs you need. For example:
   - "Find the entity IDs of the ORDERS table in ANALYTICS_DB.PROD and in ANALYTICS_DB.REPLICA."
   - "List the entity IDs of all Snowflake tables in the ANALYTICS_DB.PROD schema."
   - "What is the entity ID of the Snowflake account?"

The agent uses these [tools][10]:

| Tool | Use it to |
|---|---|
| `search_data_entities` | Find assets by name, wildcard, platform, account, database, or schema. Each result includes its `entity_id`. Set `entity_type` to `account` to find the account entity ID for a schema change monitor, or to a type such as `database_column` or `dbt_model` for other assets. |
| `get_data_entity_details` | Confirm the name, type, platform, database, and schema of an `entity_id`, for example before you add it to a monitor. |
| `get_data_entity_hierarchy` | List the columns in a table, or the tables in a schema, with their entity IDs. |

To find the account entity ID without the MCP Server, export a schema change monitor created in the UI.

### Validate before you create

Send a definition to the [validate endpoint][7] to check it without creating anything:

```shell
curl -X POST "https://api.datadoghq.com/api/v1/monitor/validate" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d @monitor.json
```

Replace `datadoghq.com` with your [Datadog site][8]. A valid definition returns `{}`. Validation checks syntax only: a filter that matches no assets passes validation and creates a monitor that never reports data. Confirm that your filter returns the assets you expect in the [Data Catalog][9] or with the [MCP Server][10] `search_data_entities` tool before you deploy.

Validation also doesn't check every value against its limits. For example, it accepts:

- A `sensitivity` outside 0.1 to 6.
- `model_instructions` longer than 500 characters.
- A schedule that runs more often than every 15 minutes.
- Custom SQL that doesn't return a `dd_value` column.
- A `job_type` that doesn't match the jobs in `jobs_query`.

Check these settings against this guide before you deploy.

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

The `@slack-data-alerts` handle in `message` sends notifications to a Slack channel and requires the [Slack integration][17]. For other notification channels and template variables, see [Notifications][18].

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
| Default schedule or hourly | `2h` |
| Every 3, 6, or 12 hours | `4h`, `7h`, `13h` |
| Daily | `25h` |
| Custom schedule that skips weekends, such as `0 6 * * 1-5` | `73h` (covers the weekend gap) |

### Metrics

Set `measure` to the metric you want to monitor. Table metrics need a `database_table` filter, and column metrics need a `database_column` filter.

| `measure` | Asset | Unit |
|---|---|---|
| `freshness` | Table or column | Seconds since the last update. A 6-hour threshold is `21600`. |
| `row_count` | Table | Rows |
| `nullness`, `uniqueness`, `percent_zero`, `percent_negative` | Column | A percentage on a 0 to 100 scale. A 2% threshold is `2`, not `0.02`. |
| `cardinality`, `min`, `max`, `mean`, `sum`, `stddev` | Column | The column's values |
| `custom` | Table | The value your SQL returns. See [Custom SQL](#custom-sql). |

### Select assets with `filter`

The `filter` names an asset type followed by a search in backticks:

```text
search for database_table where `database:ANALYTICS_DB AND schema:PROD AND name:ORDERS`
search for database_column where `database:ANALYTICS_DB AND schema:PROD AND table:USERS AND name:EMAIL`
```

For both tables and columns, `name:` is the asset's own name. A column filter uses `table:` for the parent table. `search for table` and `search for column` are equivalent to `search for database_table` and `search for database_column`, and exported monitors can use either form. Filters support the same syntax as [asset selection in the UI][11]:

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

A monitor covers up to 5,000 assets. Check how many assets a broad filter matches before you create the monitor, because the tables it covers count toward billing:

- Freshness, row count, and column metric monitors: each table counts as one monitored table, however many of these monitors cover the table or its columns.
- Custom SQL monitors: each one counts as one more monitored table.
- Source to target monitors: each one counts toward its target table only.
- Schema change monitors: not billed.
- Monitors that return no data: don't add monitored tables.

### Group by

To get a separate status, alert, and chart for each asset, include the asset keys in `group_by`. The UI uses these keys by default:

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

Without `crontab_override`, a monitor uses the {{< ui >}}Default schedule{{< /ui >}} and runs each time Datadog collects metrics from the warehouse, which is typically every hour. Table freshness and row count monitors on the default schedule use the metrics the integration collects. To run a monitor on its own schedule, set `monitor_options.crontab_override`. For the schedule options in the UI, see [Monitor schedule][20].

| Schedule | `crontab_override` |
|---|---|
| Hourly | `0 * * * *` |
| Every 3, 6, or 12 hours | `0 */3 * * *`, `0 */6 * * *`, `0 */12 * * *` |
| Daily | `0 0 * * *` |
| Custom | Any 5-field cron expression, such as `30 6 * * 1-5` |
| Manual (Preview) | `not_scheduled`. The monitor runs only when you [trigger a run](#run-a-monitor-on-demand). As in the UI, use it for custom SQL and column metric monitors. Manual monitors don't run on databases that connect through the Datadog Agent, such as PostgreSQL. |

Cron expressions are in UTC, so runs shift by an hour in local time when daylight saving time starts or ends. The UI accepts schedules that run at most every 15 minutes. Validation doesn't enforce that limit, so keep the interval at 15 minutes or longer. A scheduled monitor runs its own query against your warehouse on each run.

### Model configuration

{{< callout url="#" btn_hidden="true" header="Preview" >}}
The following model configuration settings are in Preview.
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
| `min_lower_bound_size`, `min_upper_bound_size` | The smallest distance between the prediction and each bound, in the metric's unit. Freshness monitors, including custom SQL monitors with `model_type_override` set to `freshness`, don't apply these settings. |
| `model_bounds_override` | Alert direction: `UPPER_ONLY` alerts above the range, `LOWER_ONLY` below it. Omit to alert in both directions. Values are case sensitive. |
| `model_instructions` | Up to 500 characters of plain-language context about behavior you expect. |
| `auto_resolve_days` | Resolves an open alert automatically after this many days, from 1 to 365. When unset, an alert stays open until the metric returns within the bounds. |
| `enable_flatline_detection` | Whether to alert when the metric stops changing. Default `true`. |
| `function` | `DIFF` or `DIFF_PERCENT`. Tells the model that each value is a difference that can be negative (`DIFF`) or a percentage difference (`DIFF_PERCENT`). It doesn't change the values. Source to target monitors derive it from `diff_type`, so you don't need to set it. |

`model_instructions` is saved with the rest of the monitor definition, so the API returns it when you get the monitor. The Terraform `datadog_monitor` resource supports every setting in this table except `model_instructions`, so use `datadog_monitor_json` if you set instructions. If you apply a `datadog_monitor` resource to a monitor whose instructions were set in the UI, Terraform removes them.

When a `model_configuration` block is present, the provider always sends `enable_flatline_detection`, which defaults to `true`. If you turned off flatline detection in the UI, set `enable_flatline_detection = false` in Terraform, or the next apply turns it back on.

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

A source to target monitor is a `data-quality alert` with a `source_to_target_config` in `monitor_options`. The `filter` selects the target asset. Source to target monitors reference both assets by `entity_id`. See [Find an entity ID](#find-an-entity-id). A table that Data Observability hasn't collected yet has no `entity_id`.

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
        "filter": "search for database_table where `entity_id:<TARGET_ENTITY_ID>`",
        "group_by": ["entity_id", "table", "schema", "database"],
        "monitor_options": {
          "crontab_override": "0 * * * *",
          "source_to_target_config": {
            "source": { "entity_id": "<SOURCE_ENTITY_ID>", "entity_type": "database_table" },
            "target": { "entity_id": "<TARGET_ENTITY_ID>", "entity_type": "database_table" },
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
      filter         = "search for database_table where `entity_id:<TARGET_ENTITY_ID>`"
      group_by       = ["entity_id", "table", "schema", "database"]
      monitor_options {
        crontab_override = "0 * * * *"
        source_to_target_config {
          diff_type   = "absolute"
          entity_type = "database_table"
          source {
            entity_id   = "<SOURCE_ENTITY_ID>"
            entity_type = "database_table"
          }
          target {
            entity_id   = "<TARGET_ENTITY_ID>"
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

- `diff_type` is `absolute` (target minus source) or `diff_percent` (the difference as a percentage of the source).
- `entity_type` is `database_table` or `database_column`. Use the same type for the source and the target. The Terraform resource also requires `entity_type` directly under `source_to_target_config`. The API doesn't.
- To compare custom metrics, set `measure` to `custom` and add `custom_sql` to both `source` and `target`.
- An anomaly monitor learns the current difference as normal, so it doesn't alert on a mismatch that already exists when you create it. To alert on any difference, use a threshold, such as `formula("query1").last("2h") != 0` with `critical` set to `0`.

## Schema change monitors

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Schema change monitors are in Preview.
{{< /callout >}}

Schema change monitors use the `schema-change alert` type. The Terraform `datadog_monitor` resource doesn't accept this type, so use `datadog_monitor_json`. Some Datadog API client libraries also reject this type before they send the request, so call the HTTP API directly. Build the JSON with `jsonencode()` rather than a heredoc, because heredocs change the escaped quotes inside the query.

{{< tabs >}}
{{% tab "API" %}}

```json
{
  "name": "Columns removed, renamed, or retyped in ANALYTICS_DB.PROD",
  "type": "schema-change alert",
  "query": "schema-changes(\"@account_entity_id:<ACCOUNT_ENTITY_ID> @database:ANALYTICS_DB @schema:PROD @change_type:(removed OR renamed OR type_changed)\").rollup(\"count\").last(\"10m\") > 0",
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
    query   = "schema-changes(\"@account_entity_id:<ACCOUNT_ENTITY_ID> @database:ANALYTICS_DB @schema:PROD @change_type:(removed OR renamed OR type_changed)\").rollup(\"count\").last(\"10m\") > 0"
    message = "Schema change detected in ANALYTICS_DB.PROD. @slack-data-alerts"
    options = {
      thresholds = { critical = 0 }
    }
  })
}
```

{{% /tab %}}
{{< /tabs >}}

The query filter accepts the following attributes. Separate them with spaces, as the UI does:

- `@account_entity_id`: the warehouse account. Export a schema change monitor created in the UI to find this ID.
- `@database`, `@schema`, `@table`, `@column`: the assets to watch.
- `@entity_id`: specific assets, such as `@entity_id:(<ENTITY_ID_1> OR <ENTITY_ID_2>)`. It matches changes to the asset itself, so a table's ID doesn't match changes to that table's columns. To watch a table and its columns, use `@table`.
- `@change_type`: `added`, `removed`, `renamed`, or `type_changed`. To match several, use `@change_type:(removed OR renamed)`. Omit it to alert on every change.

## Job monitors

Job monitors use the `data-jobs alert` type. The query variable must be named `run_query`, and it selects jobs with a `search for <job type>` filter.

### Job failure

{{< tabs >}}
{{% tab "API" %}}

```json
{
  "name": "Databricks nightly job failed",
  "type": "data-jobs alert",
  "query": "formula(\"failed_runs(run_query)\").by(name,platform,workspace_id,workspace_name,entity_id).last(1d) > 0",
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
  query   = "formula(\"failed_runs(run_query)\").by(name,platform,workspace_id,workspace_name,entity_id).last(1d) > 0"

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

`run_filter` filters individual runs by tag, such as `env:prod`. Run filters are available for Airflow DAGs and tasks, Databricks jobs, and custom OpenLineage jobs. The Terraform `data_jobs_query` block doesn't support `run_filter` in provider version 4.31.0 and earlier, so use `datadog_monitor_json` if you need it.

Use the `job_type` and group-by keys that match the jobs you select. These are the keys the UI uses by default, with `entity_id` last in `.by()`:

| Jobs | `jobs_query` asset type | `job_type` | `.by()` keys |
|---|---|---|---|
| Databricks jobs | `databricks_job` | `databricks.job` | `name`, `platform`, `workspace_id`, `workspace_name` |
| Spark applications | `spark_application` | `spark.application` | `name`, `env` |
| Airflow DAGs | `airflow_dag` | `airflow.dag` | `name`, `env` |
| Airflow tasks | `airflow_job` | `airflow.job` | `name`, `dag_name`, `env` |
| dbt jobs, models, tests | `dbt_job`, `dbt_model`, `dbt_test` | `dbt.job`, `dbt.model`, `dbt.test` | `name`, `project`, `env` |
| AWS Glue jobs | `glue_job` | `glue.job` | `name`, `env`, `account`, `region` |
| Azure Data Factory pipelines | `azure_data_factory_pipeline` | `adf.pipeline` | `name`, `tenant`, `subscription`, `factory` |
| Custom jobs from OpenLineage | `data_job` with `platform:custom AND integration:<NAME>` | `custom.ol.<NAME>` | `integration`, `name`, `env` |

The API doesn't check that `job_type` matches the asset type in `jobs_query`. A mismatch creates a monitor that watches the wrong jobs. The API also doesn't check the group-by keys. To confirm the keys for your jobs, export a job monitor created in the UI, and use its keys if they differ from this table. When you update an existing monitor, keep its keys in the same order. Changing the keys or their order starts the monitor's groups over.

### Duration

Duration monitors alert when a run takes longer than a threshold, or longer than usual. The Terraform `datadog_monitor` resource doesn't support duration monitors in provider version 4.31.0 and earlier, so use `datadog_monitor_json`.

{{< tabs >}}
{{% tab "API" %}}

```json
{
  "name": "Databricks nightly job ran longer than 2 hours",
  "type": "data-jobs alert",
  "query": "formula(\"job_duration(run_query)\").detection(static).by(name,platform,workspace_id,workspace_name,entity_id) > 7200",
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
        "group_by": ["name", "platform", "workspace_id", "workspace_name", "entity_id"],
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
    query   = "formula(\"job_duration(run_query)\").detection(static).by(name,platform,workspace_id,workspace_name,entity_id) > 7200"
    message = "A Databricks nightly job ran longer than 2 hours. @slack-data-alerts"
    options = {
      thresholds = { critical = 7200, warning = 5400 }
      variables = [{
        name            = "run_query"
        data_source     = "data_quality_metrics"
        schema_version  = "0.0.1"
        measure         = "duration"
        filter          = "search for databricks_job where `name:nightly_* AND workspace_name:prod`"
        group_by        = ["name", "platform", "workspace_id", "workspace_name", "entity_id"]
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

Trigger a run with the [Data Observability API][15], for example after a pipeline finishes. To run a monitor only when you trigger it, set its `crontab_override` to `not_scheduled`. See [Schedule](#schedule).

```shell
curl -X POST "https://api.datadoghq.com/api/v2/data-observability/monitors/<MONITOR_ID>/run" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

The response returns the run ID in `data.id`:

```json
{ "data": { "id": "abc123def456", "type": "monitor_run" } }
```

Poll `GET /api/v2/data-observability/monitors/runs/<RUN_ID>/status` until `data.attributes.status` is no longer `pending`. The final status is `ok`, `warn`, `alert`, or `error`. When the status is `error`, `data.attributes.error_message` explains why.

## Troubleshooting

The monitor shows no data or no groups
: The filter matches no assets, or the assets haven't been collected yet. Search for the assets in the Data Catalog with the same filter.

The API rejects the threshold
: The `critical` threshold must equal the number in the query. For anomaly monitors, use `> 0` with `critical` set to `0`.

`Measure 'nullness' is not supported for 'database_table' filters`
: Column metrics need a `search for database_column` filter. The message names `table` instead if the filter uses `search for table`.

`group_by_columns is required when custom_sql returns group columns`
: Every column the SQL returns other than `dd_value` must be listed in `group_by_columns`.

`job_type must be one of [...]`
: Use a `job_type` from the table in [Job failure](#job-failure), or `custom.ol.<NAME>` for custom jobs.

The monitor is created but never evaluates
: Validation doesn't catch every mistake. Check that the filter matches assets in the Data Catalog, that custom SQL returns a numeric `dd_value` column, and that `job_type` matches the asset type in `jobs_query`.

Terraform requests fail with an authentication error
: The provider sends requests to US1 by default. Set `api_url` for your site. See [Configure the Terraform provider](#configure-the-terraform-provider).

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
[17]: /integrations/slack/
[18]: /monitors/notify/
[19]: /mcp_server/setup/
[20]: /monitors/types/data_observability/#monitor-schedule
