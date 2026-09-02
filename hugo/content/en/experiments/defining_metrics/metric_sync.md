---
title: Sync Experiment Metrics from YAML
description: Define experiment metrics in YAML, preview changes, and sync them to Datadog from CI.
further_reading:
- link: "/experiments/defining_metrics/"
  tag: "Documentation"
  text: "Create Experiment Metrics"
- link: "/experiments/guide/connecting_a_data_warehouse/"
  tag: "Documentation"
  text: "Connect a data warehouse"
- link: "/account_management/api-app-keys/"
  tag: "Documentation"
  text: "API and application keys"
---

## Overview

Experiment metrics define the outcomes you use to evaluate an experiment, such as revenue, conversion rate, or pages viewed. You can create these metrics manually in Datadog, or you can define warehouse-native metrics in YAML and sync them to Datadog with the Datadog Experiments Metric Sync CLI.

Use Metric Sync when you want to:

- Review metric changes in pull requests.
- Keep metric definitions in version control.
- Apply metric changes from CI after they are approved.
- Mark synced metrics as certified by default for experiment decision-making.

Metric Sync supports a plan-and-apply workflow. The `plan` command validates your YAML and previews the changes Datadog would make. The `execute` command validates the same YAML, submits the write operation, waits for completion, and prints a summary of created, updated, deleted, upgraded, blocked, and failed changes.

## Prerequisites

Before using Metric Sync, you need:

- A Datadog account with Product Analytics and Experiments enabled.
- A connected warehouse. See [Connect a data warehouse][1].
- The Product Analytics permissions required to create and update experiment metrics. Synced metrics are certified by default, so custom roles also need the Product Analytics Certified Metrics Write permission. See [Product Analytics permissions][2].
- A Datadog API key and application key for CI authentication. See [API and application keys][3].

## Install the CLI

Install the latest Metric Sync CLI release:

```shell
curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
```

The install script detects macOS or Linux, downloads the matching GitHub release archive, verifies the SHA-256 checksum, and installs the `metric-sync` binary to `/usr/local/bin`. Depending on your system permissions, installing to `/usr/local/bin` may require `sudo`. To install without elevated permissions, set `INSTALL_DIR` to a directory you own.

To install a specific version or install to a different directory:

```shell
curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | env VERSION=<VERSION> INSTALL_DIR="$HOME/.local/bin" sh
```

Set Datadog credentials with environment variables:

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_APP_KEY=<DATADOG_APPLICATION_KEY>
```

By default, the CLI sends requests to `datadoghq.com`. Set `DD_SITE` if your organization uses a different Datadog site:

```shell
export DD_SITE={{< region-param key="dd_site" >}}
```

## Create a metric definition

Create one or more YAML files in your repository. The CLI accepts a file, multiple files, a directory, or multiple directories. When you pass a directory, the CLI recursively discovers YAML files.

The following example defines one warehouse metric source and one simple metric. By default, the CLI uses the warehouse connection configured in Datadog under {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Warehouse Connections{{< /ui >}}. Datadog supports one warehouse connection per organization. If your organization has more than one warehouse connection, set `warehouse_connection_id` in the YAML to choose one explicitly.

```yaml
schema_version: 1
sync_tag: example-checkout
reference_url: https://github.com/example-org/example-repo

warehouse_metric_sources:
  - sync_id: checkout_events
    name: Checkout events
    sql: |
      SELECT user_id, event_timestamp, revenue
      FROM analytics.checkout_events
    timestamp_column: event_timestamp
    subject_types:
      - name: User
        column_name: user_id
    measures:
      - sync_id: revenue
        name: Revenue
        column_name: revenue
        column_type: FLOAT

metrics:
  - sync_id: checkout_revenue
    name: Checkout revenue
    metric_type: simple
    desired_change: METRIC_INCREASES
    simple_metric_aggregation:
      operation: sum
      measure:
        warehouse_metric_source_sync_id: checkout_events
        measure_sync_id: revenue
      timeframe_start_value: 0
```

## Preview and sync changes

To preview the changes before applying them, run `plan`:

```shell
metric-sync plan ./metrics
```

The plan output shows the operation ID, sync tag, status, and a summary of the changes Datadog would make.

After reviewing the plan, run `execute` to apply the changes:

```shell
metric-sync execute ./metrics
```

`execute` performs local validation, submits a Metric Sync write operation to Datadog, polls the operation until it reaches a terminal state, and prints the result summary.

You can also run:

```shell
metric-sync validate ./metrics
metric-sync status <metric_sync_id>
metric-sync result <metric_sync_id>
metric-sync version
```

The commands do the following:

- `validate`: Checks only the local YAML and does not call Datadog.
- `status`: Checks an operation by ID.
- `result`: Fetches the terminal plan or execute result.
- `version`: Prints build metadata.

## GitHub Actions example

The following workflow runs `plan` on pull requests and `execute` after changes merge to `main`:

```yaml
name: Sync Datadog experiment metrics

on:
  pull_request:
    paths:
      - "metrics/**/*.yaml"
      - "metrics/**/*.yml"
      - ".github/workflows/datadog-metric-sync.yml"
  push:
    branches:
      - main
    paths:
      - "metrics/**/*.yaml"
      - "metrics/**/*.yml"

jobs:
  plan:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Metric Sync CLI
        run: curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
      - name: Plan metric changes
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        run: metric-sync plan ./metrics

  execute:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Metric Sync CLI
        run: curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
      - name: Apply metric changes
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        run: metric-sync execute ./metrics
```

Store your Datadog API and application keys as GitHub Actions secrets. If your organization uses a Datadog site other than `datadoghq.com`, add `DD_SITE` to the workflow environment.

## YAML reference

### Sync tags and IDs

A `sync_tag` identifies the set of metric definitions that are managed together. Use a stable `sync_tag` for each repository, team, or metric domain that you want to manage independently. For example, a growth team and a checkout team can sync metrics from different repositories by using different `sync_tag` values, such as `growth-metrics` and `checkout-metrics`.

Within a `sync_tag`, each warehouse metric source and metric has a stable `sync_id`. Metric aggregations use `warehouse_metric_source_sync_id` to reference warehouse metric sources and `measure_sync_id` to reference measures. The source ID is required because measure IDs are scoped to their warehouse metric source.

### Top-level fields

| Field | Required | Description |
| ----- | -------- | ----------- |
| `schema_version` | Yes | Must be `1`. |
| `sync_tag` | Yes | Stable ownership key for this group of metric definitions. All files in a single operation must use the same `sync_tag`.<br>Must start with an alphanumeric character and can contain alphanumeric characters, underscores, dots, colons, and dashes. |
| `reference_url` | No | URL to the source repository, runbook, or other reference for the synced metrics. |
| `warehouse_connection_id` | No | Warehouse connection ID for the organization. If omitted, the CLI uses the organization's configured warehouse connection. |
| `warehouse_metric_sources` | No | Warehouse SQL models, measures, and properties that metrics use. |
| `metrics` | No | Experiment metrics to create, update, or manage in future syncs. |
| `options` | No | Sync options such as certification and upgrade behavior. |

### Options

| Field | Default | Description |
| ----- | ------- | ----------- |
| `is_certified` | `true` | Marks synced metrics as certified. Because this option defaults to `true`, syncing metrics requires the Product Analytics Certified Metrics Write permission unless you set it to `false`. |
| `upgrade_mode` | `none` | Controls whether existing objects are adopted into sync ownership. Supported values are `none`, `by_id`, and `by_name`. |
| `force_delete` | `false` | Allows destructive deletes when supported by the API. |

### Warehouse metric sources

| Field | Required | Description |
| ----- | -------- | ----------- |
| `sync_id` | Yes | Stable identifier for the source within this `sync_tag`.<br>Must start with an alphanumeric character and can contain alphanumeric characters, underscores, dots, colons, and dashes. |
| `existing_id` | No | Existing Datadog warehouse metric source ID to adopt or update. |
| `name` | Yes | Display name in Datadog. |
| `description` | No | Description for the source. |
| `sql` | Yes | SQL query that returns the timestamp, subject columns, measures, and properties used by metrics. |
| `timestamp_column` | Yes | Column containing the event or metric timestamp. |
| `reference_url` | No | Source-specific reference URL. |
| `subject_types` | Yes | Subject mappings for the source. |
| `measures` | No | Numeric columns that metrics aggregate. |
| `properties` | No | Columns that can be used for metric filters and breakouts. |

### Subject types

| Field | Required | Description |
| ----- | -------- | ----------- |
| `name` | Yes | Datadog subject type name, such as `User` or `Account`. |
| `column_name` | Yes | SQL result column that contains the subject identifier. |

### Measures and properties

Measures and properties share the same field shape:

| Field | Required | Description |
| ----- | -------- | ----------- |
| `sync_id` | Yes | Stable identifier within the warehouse metric source. |
| `name` | Yes | Display name in Datadog. |
| `column_name` | Yes | SQL result column name. |
| `column_type` | Yes | Required so Datadog can validate the column and show the correct metric configuration options. Supported values are `STRING`, `INTEGER`, `FLOAT`, `BOOLEAN`, `DATE`, and `TIMESTAMP`. |
| `description` | No | Description for the measure or property. |

### Metrics

| Field | Required | Description |
| ----- | -------- | ----------- |
| `sync_id` | Yes | Stable identifier for the metric within this `sync_tag`. |
| `existing_id` | No | Existing Datadog metric ID to adopt or update. |
| `name` | Yes | Display name in Datadog. |
| `description` | No | Metric description. |
| `metric_type` | Yes | Supported values are `simple`, `ratio`, and `percentile`. |
| `desired_change` | No | Direction used for experiment interpretation. Supported values are `METRIC_INCREASES` and `METRIC_DECREASES`. |
| `format_as_percent` | No | Displays the metric as a percent. |
| `reference_url` | No | Metric-specific reference URL. |
| `guardrail_cutoff_threshold` | No | Optional guardrail cutoff threshold. |

Add the aggregation field that matches the metric type:

- For `metric_type: simple`, add `simple_metric_aggregation`.
- For `metric_type: ratio`, add `ratio_metric_aggregation`.
- For `metric_type: percentile`, add `percentile_metric_aggregation`.

### Simple metric aggregation

| Field | Required | Description |
| ----- | -------- | ----------- |
| `operation` | Yes | Aggregation operation, such as `sum`, `average`, `count`, or `uniqueSubjects`. |
| `measure` | Yes | Measure reference. |
| `timeframe_start_value` | No | Start offset for the metric timeframe. |
| `timeframe_end_value` | No | End offset for the metric timeframe. |
| `timeframe_unit` | No | Timeframe unit. |
| `property_filters` | No | Filters applied to the metric aggregation. |
| `winsor_lower_percentile` | No | Lower winsorization percentile. |
| `winsor_upper_percentile` | No | Upper winsorization percentile. |
| `winsor_lower_fixed_value` | No | Lower fixed winsorization value. |
| `winsor_upper_fixed_value` | No | Upper fixed winsorization value. |

### Ratio metric aggregation

Use `ratio_metric_aggregation` to define a metric as a numerator divided by a denominator. Both `numerator` and `denominator` use the same fields as `simple_metric_aggregation`.

| Field | Required | Description |
| ----- | -------- | ----------- |
| `numerator` | Yes | Simple metric aggregation used as the numerator. |
| `denominator` | Yes | Simple metric aggregation used as the denominator. |

Example ratio metric aggregation:

```yaml
ratio_metric_aggregation:
  numerator:
    operation: sum
    measure:
      warehouse_metric_source_sync_id: checkout_events
      measure_sync_id: revenue
  denominator:
    operation: count
    measure:
      warehouse_metric_source_sync_id: checkout_events
      kind: each_record
```

### Percentile metric aggregation

| Field | Required | Description |
| ----- | -------- | ----------- |
| `operation` | Yes | Percentile aggregation operation. Set to `percentile`. |
| `measure` | Yes | Measure reference. |
| `percentile` | Yes | Percentile to calculate, such as `95`. |
| `timeframe_start_value` | No | Start offset for the metric timeframe. |
| `timeframe_end_value` | No | End offset for the metric timeframe. |
| `timeframe_unit` | No | Timeframe unit. |

Example percentile metric aggregation:

```yaml
percentile_metric_aggregation:
  operation: percentile
  percentile: 95
  measure:
    warehouse_metric_source_sync_id: checkout_events
    measure_sync_id: page_load_time
```

### Property filters

Use `property_filters` to restrict a simple aggregation to rows with matching property values:

```yaml
property_filters:
  - property:
      warehouse_metric_source_sync_id: checkout_events
      property_sync_id: country
    operator: IS
    values:
      - US
```

Supported operators are `IS` and `IS_NOT`. When referencing a property:

- Include `warehouse_metric_source_sync_tag` to reference a property from another sync tag.
- Use `warehouse_metric_property_id` to reference an existing Datadog property directly.

### Measure references

To reference a measure defined in the same sync payload, use `warehouse_metric_source_sync_id` and `measure_sync_id`:

```yaml
measure:
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

To reference a measure from another sync tag, include `warehouse_metric_source_sync_tag`:

```yaml
measure:
  warehouse_metric_source_sync_tag: shared-sources
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

To reference an existing Datadog measure directly, use `warehouse_metric_measure_id`.

## Troubleshooting

| Error | What to check |
| ----- | ------------- |
| The API returns `403`. | Confirm the API/application key has the Product Analytics permissions required to write metrics. If `is_certified` is enabled, confirm the role also has Product Analytics Certified Metrics Write. |
| A warehouse connection was not found. | Confirm the target Datadog organization has a warehouse connection configured. If you set `warehouse_connection_id`, confirm that it belongs to the target organization. |
| A subject type was not found. | Confirm the `subject_types[].name` value matches an existing Datadog subject type. |
| The plan or execute result shows no changes. | The YAML already matches Datadog for that `sync_tag`. |
| A sync is blocked. | Check the result output for objects that cannot be deleted or changed because they are referenced by active or in-flight experiments. |

[1]: /experiments/guide/connecting_a_data_warehouse/
[2]: /account_management/rbac/permissions/#product-analytics
[3]: /account_management/api-app-keys/
