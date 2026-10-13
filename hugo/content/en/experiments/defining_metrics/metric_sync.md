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

Metric Sync supports a plan-and-apply workflow. The `plan` command validates your YAML and previews the changes Datadog would make. The `execute` command validates the YAML, submits a write operation, and waits for completion. Successful operations print a summary of created, updated, deleted, upgraded, and blocked objects, plus an error count.

## Prerequisites

Before using Metric Sync, you need:

- A Datadog account with Product Analytics and Experiments enabled.
- A connected warehouse. See [Connect a data warehouse][1].
- An existing subject type, such as `User`, to map to a column in the source query.
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
export PATH="$HOME/.local/bin:$PATH"
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

Create one or more YAML files in a dedicated directory in your repository. The CLI accepts a file, multiple files, a directory, or multiple directories. When you pass a directory, the CLI recursively discovers `.yaml` and `.yml` files, except in hidden subdirectories. Use one YAML document per file.

The following example defines one warehouse metric source and one metric with `metric_type: simple`. If the organization has exactly one warehouse connection, the CLI selects it when the YAML omits `warehouse_connection_id`. If the organization has multiple connections, set `warehouse_connection_id` at the top level or on each source. A source-level value overrides the top-level value.

```yaml
schema_version: 1
sync_tag: example-checkout
reference_url: https://github.com/example-org/example-repo

warehouse_metric_sources:
  - sync_id: checkout_events
    name: Checkout events
    sql: |
      SELECT user_id, event_timestamp, transaction_timestamp, revenue
      FROM analytics.checkout_events
    timestamp_column: event_timestamp
    additional_timestamp_columns:
      - transaction_timestamp
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
      winsor_upper_percentile: 0.99
      winsorization_strategy: nonzero
```

## Preview and sync changes

To preview the changes before applying them, run `plan`:

```shell
metric-sync plan ./metrics
```

The plan output shows the operation ID, sync tag, status, and counts of the changes Datadog would make. A completed plan can contain blocked objects; check the `Blocked` count before executing. To save object IDs, field changes, and error details, run `plan` with `--log-file ./metric-sync-plan.log` and inspect that log.

After reviewing the plan, run `execute` to apply the changes:

```shell
metric-sync execute ./metrics
```

`execute` performs local validation, submits a Metric Sync write operation to Datadog, polls the operation until it reaches a terminal state, and prints the result summary.

`execute` reads the YAML again and creates a new operation. It does not apply a saved plan by ID. Use the same reviewed files and options for both commands.

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

Use `--timeout 20m` to change the default ten-minute command timeout. If a command times out after submission, check the printed operation ID with `status` before submitting again. To submit without waiting, use `--no-poll`, then check `status` and `result`. A successful `--no-poll` command confirms submission only.

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
    if: github.event_name == 'pull_request' && github.event.pull_request.head.repo.full_name == github.repository
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
    concurrency:
      group: metric-sync-example-checkout
      cancel-in-progress: false
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

Use a concurrency group for each sync tag to prevent overlapping executions from this workflow. The plan job runs only for pull requests from the same repository. Fork pull requests do not receive these secrets; run `validate` without credentials for those contributions, then run `plan` in a trusted workflow.

## YAML reference

### Sync tags and IDs

A `sync_tag` identifies the set of metric definitions that are managed together. Use a stable `sync_tag` for each repository, team, or metric domain that you want to manage independently. For example, a growth team and a checkout team can sync metrics from different repositories by using different `sync_tag` values, such as `growth-metrics` and `checkout-metrics`.

Within a `sync_tag`, each warehouse metric source and metric has a stable `sync_id`. Metric aggregations use `warehouse_metric_source_sync_id` to select a warehouse metric source. Each aggregation also selects a declared measure, each row, or a subject mapping. See [Measure references][4].

Each submission defines the complete set of sources and metrics managed by its `sync_tag`. Objects already managed by that tag but absent from the submitted files are candidates for deletion. Submit all files for the tag together, including unchanged definitions. Changing a `sync_id` can result in deletion of the old object and creation of another object.

All files in an operation must use the same `schema_version`, `sync_tag`, and effective `options`. Nonempty top-level `reference_url` and `warehouse_connection_id` values must also agree across files.

### Adopt existing objects

To manage an existing manual source or metric with YAML:

1. Include its full definition and assign a stable `sync_id`.
2. Set `existing_id` on that source or metric to its Datadog object UUID. This differs from the `sync_id` that you choose for YAML.
3. Set `options.upgrade_mode: by_id` in every submitted file, then run `plan` and review the changes before `execute`.

Adoption applies the YAML definition and assigns sync ownership to the existing object. Later syncs identify it by the same `sync_tag` and `sync_id`. Include the settings and source mappings you want to keep; omitted fields can use defaults or remove mappings.

### Top-level fields

| Field | Required | Description |
| ----- | -------- | ----------- |
| `schema_version` | Yes | Must be `1`. |
| `sync_tag` | Yes | Stable ownership key for this group of metric definitions. All files in a single operation must use the same `sync_tag`.<br>Must start with an alphanumeric character and can contain alphanumeric characters, underscores, dots, colons, and dashes. |
| `reference_url` | No | URL to the source repository, runbook, or other reference for the synced metrics. |
| `warehouse_connection_id` | No | Default warehouse connection UUID for sources in this submission. If a source needs a connection and no ID is set, the CLI selects the organization's only connection or reports an error if the choice is not unique. |
| `warehouse_metric_sources` | No | Warehouse SQL models and measures that metrics use. Include every source managed by this tag that you want to keep. |
| `metrics` | No | Experiment metrics to create or update. Include every metric managed by this tag that you want to keep. |
| `options` | No | Sync options such as certification and upgrade behavior. |

### Options

| Field | Default | Description |
| ----- | ------- | ----------- |
| `is_certified` | `true` | Marks synced metrics as certified. Because this option defaults to `true`, syncing metrics requires the Product Analytics Certified Metrics Write permission unless you set it to `false`. |
| `upgrade_mode` | `none` | Use `by_id` with an object's `existing_id` to adopt it into sync ownership. The CLI does not support adoption by name. |
| `force_delete` | `false` | Allows deletion despite references from active or in-flight experiments. Sources referenced by metrics outside this sync tag remain blocked. Ordinary deletions of unreferenced objects do not require this option. |

### Warehouse metric sources

| Field | Required | Description |
| ----- | -------- | ----------- |
| `sync_id` | Yes | Stable identifier for the source within this `sync_tag`.<br>Must start with an alphanumeric character and can contain alphanumeric characters, underscores, dots, colons, and dashes. |
| `existing_id` | No | Datadog warehouse metric source UUID to adopt with `options.upgrade_mode: by_id`. |
| `name` | Yes | Display name in Datadog. |
| `description` | No | Description for the source. |
| `sql` | Yes | SQL query that returns the timestamp, subject columns, and measures used by metrics. |
| `timestamp_column` | Yes | Column containing the event or metric timestamp. |
| `additional_timestamp_columns` | No | Up to four additional timestamp columns returned by `sql`. Each name must be nonblank and contain at most 255 characters. Names must be unique after trimming whitespace and must not include `timestamp_column`. If omitted, the source has no additional timestamp columns. |
| `warehouse_connection_id` | No | Warehouse connection UUID for this source. Overrides the top-level value. |
| `reference_url` | No | Source-specific reference URL. |
| `subject_types` | Yes | At least one subject mapping for the source. |
| `measures` | No | Columns that metrics aggregate. |

### Subject types

| Field | Required | Description |
| ----- | -------- | ----------- |
| `name` | Yes | Datadog subject type name, such as `User` or `Account`. |
| `column_name` | Yes | SQL result column that contains the subject identifier. |

### Measures

| Field | Required | Description |
| ----- | -------- | ----------- |
| `sync_id` | Yes | Stable identifier within the warehouse metric source. |
| `name` | Yes | Display name in Datadog. |
| `column_name` | Yes | SQL result column name. |
| `column_type` | Yes | Required so Datadog can validate the column and show the correct metric configuration options. Supported values are `STRING`, `INTEGER`, `FLOAT`, `BOOLEAN`, `DATE`, and `TIMESTAMP`. |
| `description` | No | Description for the measure. |

### Metrics

| Field | Required | Description |
| ----- | -------- | ----------- |
| `sync_id` | Yes | Stable identifier for the metric within this `sync_tag`. |
| `existing_id` | No | Datadog metric UUID to adopt with `options.upgrade_mode: by_id`. |
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
| `operation` | Yes | Aggregation operation, such as `sum`, `average`, `count`, or `countDistinctValue`. |
| `measure` | Yes | Measure reference. |
| `timeframe_start_value` | No | Start offset for the metric timeframe. |
| `timeframe_end_value` | No | End offset for the metric timeframe. |
| `timeframe_unit` | No | Timeframe unit. |
| `winsor_lower_percentile` | No | Lower winsorization percentile, from zero to one. Must be less than `winsor_upper_percentile` when both are set. |
| `winsor_upper_percentile` | No | Upper winsorization percentile, from zero to one. |
| `winsor_lower_fixed_value` | No | Lower fixed winsorization value. |
| `winsor_upper_fixed_value` | No | Upper fixed winsorization value. |
| `winsorization_strategy` | No | Supported values are `all_assigned_subjects` (default) and `nonzero`. For `operation: threshold`, omit this field or use `all_assigned_subjects`. |

Omitting `additional_timestamp_columns` or `winsorization_strategy` applies the defaults above, including when you update or adopt an existing object. Include these fields in YAML to set their values.

### Ratio metric aggregation

Use `ratio_metric_aggregation` to define a metric as a numerator divided by a denominator. Both `numerator_aggregation` and `denominator_aggregation` use the same fields as `simple_metric_aggregation`, but neither component supports `operation: average`.

Set `winsorization_strategy` separately on each aggregation. If omitted, each aggregation uses `all_assigned_subjects`.

| Field | Required | Description |
| ----- | -------- | ----------- |
| `numerator_aggregation` | Yes | Aggregation used as the numerator. |
| `denominator_aggregation` | Yes | Aggregation used as the denominator. |

Example ratio metric aggregation:

```yaml
ratio_metric_aggregation:
  numerator_aggregation:
    operation: sum
    measure:
      warehouse_metric_source_sync_id: checkout_events
      measure_sync_id: revenue
    winsor_upper_percentile: 0.99
    winsorization_strategy: nonzero
  denominator_aggregation:
    operation: count
    measure:
      warehouse_metric_source_sync_id: checkout_events
      kind: each_record
    winsorization_strategy: all_assigned_subjects
```

### Percentile metric aggregation

| Field | Required | Description |
| ----- | -------- | ----------- |
| `measure` | Yes | Measure reference. |
| `percentile` | Yes | Decimal greater than zero and less than one. Use `0.95` for the 95th percentile. |

Time frame fields do not configure percentile metrics.

Example percentile metric aggregation:

```yaml
percentile_metric_aggregation:
  percentile: 0.95
  measure:
    warehouse_metric_source_sync_id: checkout_events
    measure_sync_id: revenue
```

### CLI limitations

The CLI does not support source property definitions or property filters. Do not use it to manage sources or metrics that require these settings.

For adoption, use `existing_id` with `options.upgrade_mode: by_id`. Setting `upgrade_mode: by_name` alone does not adopt objects with matching names.

### Measure references

Each aggregation must select a source with `warehouse_metric_source_sync_id` and exactly one of these measure selectors:

| Selector | What it selects |
| -------- | --------------- |
| `measure_sync_id` | A measure declared in the source's `measures` list. |
| `kind: each_record` | Each row returned by the source. No measure declaration is required. |
| `subject_type_name` | The column mapped to a name in the source's `subject_types` list. No measure declaration is required. |

Use this reference format in `simple_metric_aggregation`, both ratio components, and `percentile_metric_aggregation`. The aggregation operation determines which selector to use:

- `count` requires `kind: each_record`.
- `sum` and `average` require `measure_sync_id`.
- `countDistinctValue` accepts `measure_sync_id` or `subject_type_name`. It cannot use `each_record`.
- `uniqueSubjects` requires `subject_type_name`. Use `countDistinctValue` for new definitions.

To select a declared measure, use its `sync_id`:

```yaml
measure:
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

To count rows returned by the source:

```yaml
simple_metric_aggregation:
  operation: count
  measure:
    warehouse_metric_source_sync_id: checkout_events
    kind: each_record
  timeframe_start_value: 0
```

To count distinct users, first map the `User` subject type to a column on the `checkout_events` source:

```yaml
subject_types:
  - name: User
    column_name: user_id
```

Then select that subject mapping in the metric:

```yaml
simple_metric_aggregation:
  operation: countDistinctValue
  measure:
    warehouse_metric_source_sync_id: checkout_events
    subject_type_name: User
  timeframe_start_value: 0
```

`User` must exist as a subject type in the organization. The selected name must match a `subject_types[].name` entry on the referenced source.

To reference a source from another sync tag, include `warehouse_metric_source_sync_tag` with any of the three selectors:

```yaml
measure:
  warehouse_metric_source_sync_tag: shared-sources
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

Run `validate` for local checks, then run `plan` to check references against Datadog and preview changes. Local validation checks source mappings in the submitted files. An explicit tag equal to the file's `sync_tag` still checks local mappings when that source is in the submitted files. For external sources, `plan` checks that the source and selected measure exist.

The sync API does not support `warehouse_metric_measure_id`. Replace raw measure IDs with a source and one of the selectors above.

## Troubleshooting

| Error | What to check |
| ----- | ------------- |
| The API returns `403`. | Confirm the API/application key has the Product Analytics permissions required to write metrics. If `is_certified` is enabled, confirm the role also has Product Analytics Certified Metrics Write. |
| A warehouse connection was not found. | Confirm the target Datadog organization has a warehouse connection configured. If you set `warehouse_connection_id`, confirm that it belongs to the target organization. |
| A subject type was not found. | Confirm the `subject_types[].name` value matches an existing Datadog subject type. |
| The plan or execute result shows no changes. | The YAML already matches Datadog for that `sync_tag`. |
| A sync is blocked. | Check the debug log for the affected objects and reasons. Possible causes include experiment references, metrics outside the sync tag that reference a source, and adoption conflicts. |
| A command reports a failed operation without details. | Run `result <metric_sync_id> --log-file ./metric-sync-result.log` and inspect the log for the API response. Console output contains counts, not individual field changes or error details. |
| Local validation passes, but `plan` rejects the YAML. | Local checks do not cover every API rule. For example, percentile metrics require a value between zero and one, and ratio components cannot use `average`. Use the error details in the debug log to correct the definition. |

[1]: /experiments/guide/connecting_a_data_warehouse/
[2]: /account_management/rbac/permissions/#product-analytics
[3]: /account_management/api-app-keys/
[4]: #measure-references
