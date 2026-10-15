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

Experiment metrics define the outcomes you use to evaluate an experiment, such as revenue, conversion rate, or pages viewed. Create these metrics manually in Datadog, or define warehouse metrics in YAML. Use the Datadog Experiments Metric Sync CLI to sync the YAML definitions to Datadog.

Use Metric Sync when you want to:

- Review metric changes in pull requests.
- Keep metric definitions in version control.
- Apply metric changes from CI after they are approved.
- Mark synced metrics as certified by default for experiment decision-making.

Metric Sync supports a plan-and-apply workflow. The `plan` command validates your YAML and previews the changes Datadog would make. The `execute` command validates the YAML, submits a write operation, and waits for completion. Results include change counts, object IDs, field changes, blocked reasons, warnings, and available error details. Plans show proposed changes; a failed operation does not confirm that those changes were applied.

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

Create one or more YAML files in a dedicated directory in your repository. The CLI accepts a file, multiple files, a directory, or multiple directories. When you pass a directory, the CLI recursively discovers `.yaml` and `.yml` files, except in hidden subdirectories. Use one YAML document per file. The CLI rejects additional documents in the same file, including an empty document after a `---` separator. Put additional definitions in separate files and submit the directory together.

The following example defines one warehouse metric source and one metric with `metric_type: simple`. The metric includes events from the US and CA. Before using the example:

- Replace the SQL query with a query for your warehouse. Return every column used by a timestamp, subject mapping, measure, or property.
- Match the YAML column names to the names returned by the query, including letter case.
- Replace `User` with an existing Datadog subject type name. Metric Sync does not create the subject type.
- Choose a stable `sync_tag` for this set of definitions and replace `reference_url` with your repository URL.
- If the organization has multiple warehouse connections, set `warehouse_connection_id` at the top level or on each source. A source-level value overrides the top-level value. If the organization has exactly one connection, the CLI selects it when the ID is omitted.

```yaml
schema_version: 1
sync_tag: example-checkout
reference_url: https://github.com/example-org/example-repo

warehouse_metric_sources:
  - sync_id: checkout_events
    name: Checkout events
    sql: |
      SELECT user_id, event_timestamp, transaction_timestamp, revenue, country, platform
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
    properties:
      - sync_id: country
        property_name: Country
        property_column: country
        property_type: STRING
      - sync_id: platform
        property_name: Platform
        property_column: platform
        property_type: STRING

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
      property_filters:
        property:
          warehouse_metric_source_sync_id: checkout_events
          property_sync_id: country
        operation: IS
        values: [US, CA]
```

## Preview and sync changes

Each submission defines the complete set of sources and metrics managed by its `sync_tag`. Objects already managed by that tag but absent from the submitted files are candidates for deletion. Submit all files for the tag together, including unchanged definitions.

| Command | What it checks or does | Changes definitions? |
| ------- | ---------------------- | -------------------- |
| `validate` | Checks YAML syntax and supported local rules. Does not call Datadog. | No |
| `plan` | Runs local checks, then requests a server preview of proposed changes. | No |
| `execute` | Runs local checks, then submits an operation to apply the definitions. Waits for completion unless you use `--no-poll`. | Yes, if the operation succeeds |

A successful plan does not confirm that an external source or selected measure exists. Datadog resolves external references during `execute`.

To preview the changes before applying them, run `plan`:

```shell
metric-sync plan ./metrics
```

The plan output shows the operation ID, sync tag, status, proposed field changes, and blocked reasons. Review these details before executing. The `plan`, `execute`, and `result` commands exit with a nonzero status if an operation fails or its result contains blocked objects or errors. To save the API response for troubleshooting, add `--log-file ./metric-sync-plan.log`.

After reviewing the plan, run `execute` to apply the changes:

```shell
metric-sync execute ./metrics
```

`execute` performs local validation, submits a Metric Sync write operation to Datadog, polls the operation until it reaches a terminal state, and prints the result summary.

`execute` reads the YAML again and creates a new operation. It does not apply a saved plan by ID. Use the same reviewed files and options for both commands.

You can also run:

```shell
metric-sync validate ./metrics
metric-sync status <METRIC_SYNC_ID>
metric-sync result <METRIC_SYNC_ID>
metric-sync version
```

The commands do the following:

- `status`: Checks an operation by ID.
- `result`: Fetches the terminal plan or execute result.
- `version`: Prints build metadata.

Use `--timeout 20m` to change the default 10-minute command timeout. If a command times out after submission, check the printed operation ID with `status` before submitting again. To submit without waiting, use `--no-poll`, then check `status` and `result`. A successful `--no-poll` command confirms submission only.

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

## Definition reference {#yaml-reference}

### Sync tags and IDs

A `sync_tag` identifies the set of metric definitions that are managed together. Use a stable `sync_tag` for each repository, team, or metric domain that you want to manage independently. For example, a growth team and a checkout team can sync metrics from different repositories by using different `sync_tag` values, such as `growth-metrics` and `checkout-metrics`.

Within a `sync_tag`, each warehouse metric source and metric has a stable `sync_id`. Each declared property and measure also requires a `sync_id`, unique within its own list on that source. Choose stable IDs; they do not need to be UUIDs. Metric aggregations use `warehouse_metric_source_sync_id` to select a warehouse metric source. Each aggregation also selects a declared measure, each row, or a subject mapping. See the [Measure references][4] section.

Changing a `sync_id` can delete the object with the old ID and create another in its place. To rename an object, change its `name` and keep the same `sync_tag` and `sync_id`.

Remove a source and its dependent metrics in two submissions. First remove the metric definitions, keep the source and all unrelated definitions, and run `plan` and `execute`. Then remove the source and submit the remaining definitions. A plan that removes both the source and its metrics in one operation can pass but fail during execution. References from other sync tags must also be removed before deleting the source.

All files in an operation must use the same `schema_version` and `sync_tag`. Their `options` must match after defaults are applied. For example, omitting `is_certified` is equivalent to setting it to `true`. Nonempty top-level `reference_url` and `warehouse_connection_id` values must also agree across files.

### Manage existing metrics and sources with YAML {#manage-existing-metrics-with-yaml}

The CLI does not export existing metrics to YAML. Create the YAML from the source and metric definitions, then store it in version control. For migrations, `existing_id` refers to an object already present in the target Datadog organization.

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
| `additional_timestamp_columns` | No | Up to four additional timestamp columns returned by `sql`. Each name must contain at least one character other than whitespace and no more than 255 characters. Names must be unique after trimming whitespace and must not include `timestamp_column`. If omitted, the source has no additional timestamp columns. |
| `warehouse_connection_id` | No | Warehouse connection UUID for this source. Overrides the top-level value. |
| `reference_url` | No | Source-specific reference URL. |
| `subject_types` | Yes | At least one subject mapping for the source. |
| `measures` | No | Columns that metrics aggregate. |
| `properties` | No | Columns used to filter metric events. Include these columns in the source SQL. |

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

### Properties

Use `properties` on a warehouse metric source to declare columns for filters.

| Field | Required | Description |
| ----- | -------- | ----------- |
| `sync_id` | Yes | Stable identifier within the source's properties list. Filters reference it with `property_sync_id`. |
| `property_name` | Yes | Display name in Datadog. |
| `property_column` | Yes | SQL result column name. |
| `property_type` | Yes | Column type, such as `STRING`. |
| `description` | No | Description for the property. |

These property field names match the API. Replace the previous property fields `name`, `column_name`, and `column_type` with `property_name`, `property_column`, and `property_type`. The CLI rejects the previous property names. Measure definitions still use `name`, `column_name`, and `column_type`.

The Datadog YAML format differs from Eppo's format. When migrating, replace `fact_sources` and `facts` with `warehouse_metric_sources` and `measures`, then update property definitions and references to use the fields in this guide.

### Metrics

| Field | Required | Description |
| ----- | -------- | ----------- |
| `sync_id` | Yes | Stable identifier for the metric within this `sync_tag`. |
| `existing_id` | No | Datadog metric UUID to adopt with `options.upgrade_mode: by_id`. |
| `name` | Yes | Display name in Datadog. |
| `description` | No | Metric description. |
| `metric_type` | Yes | Supported values are `simple`, `ratio`, and `percentile`. |
| `desired_change` | No | Direction used for experiment interpretation. Supported values are `METRIC_INCREASES` and `METRIC_DECREASES`. |
| `format_as_percent` | No | Displays the metric as a percentage. |
| `reference_url` | No | Metric-specific reference URL. |
| `guardrail_cutoff_threshold` | No | Optional guardrail cutoff threshold. |

Add the aggregation field that matches the metric type:

- For `metric_type: simple`, add `simple_metric_aggregation`.
- For `metric_type: ratio`, add `ratio_metric_aggregation`.
- For `metric_type: percentile`, add `percentile_metric_aggregation`.

<a id="simple-metric-aggregation"></a>

### Aggregation for `simple` metrics

Winsorization percentiles and percentile metrics use decimal fractions. For example, `0.95` means the 95th percentile in both cases.

| Field | Required | Description |
| ----- | -------- | ----------- |
| `operation` | Yes | Aggregation operation, such as `sum`, `average`, `count`, or `countDistinctValue`. |
| `measure` | Yes | Measure reference. |
| `property_filters` | No | Filters on events included in the aggregation. See the [Filters][5] section. |
| `timeframe_start_value` | No | Start offset for the metric time frame. |
| `timeframe_end_value` | No | End offset for the metric time frame. |
| `timeframe_unit` | No | Time frame unit. |
| `winsor_lower_percentile` | No | Lower winsorization percentile, from zero to one inclusive. Must be less than `winsor_upper_percentile` when both are set. |
| `winsor_upper_percentile` | No | Upper winsorization percentile, from zero to one inclusive. |
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
| `property_filters` | No | Filters on events included in the aggregation. See the [Filters][5] section. |
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

### Filters

Set `property_filters` in `simple_metric_aggregation`, either ratio component, or `percentile_metric_aggregation`. Every filter must reference the same source and sync tag as the aggregation's measure.

For one condition, use a single filter object:

```yaml
property_filters:
  property:
    warehouse_metric_source_sync_id: checkout_events
    property_sync_id: country
  operation: IS
  values: [US, CA]
```

Use `IS` to include any listed value or `IS_NOT` to exclude the listed values. Both operations require at least one value. The `property_sync_id` must match a declared property on the source. To filter a source from another sync tag, include `warehouse_metric_source_sync_tag` in both the property reference and the aggregation's measure reference.

For multiple conditions that must all match (AND), use a flat list:

```yaml
property_filters:
  - property:
      warehouse_metric_source_sync_id: checkout_events
      property_sync_id: country
    operation: IS
    values: [US]
  - property:
      warehouse_metric_source_sync_id: checkout_events
      property_sync_id: platform
    operation: IS
    values: [web]
```

This example includes events where country is US and platform is web. It uses the `country` and `platform` properties declared in the complete source example. A single filter or a flat list becomes one filter group in the API request.

For alternatives (OR), use nested groups. Conditions inside each group use AND; separate groups use OR:

```yaml
property_filters:
  -
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: country
      operation: IS
      values: [US]
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: platform
      operation: IS
      values: [web]
  -
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: country
      operation: IS
      values: [CA]
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: platform
      operation: IS
      values: [mobile]
```

This example includes events where country is US and platform is web, or country is CA and platform is mobile. Each group must contain at least one condition. Do not mix individual filters and groups in the same list.

Use `operation` in new YAML. The previous `operator` field remains an alias, but the CLI rejects a filter that sets both. Requests always use `operation`. Filter values retain their text, including numeric-looking values such as `001`. Quote values when you need other YAML tools to preserve them as strings. YAML anchors and aliases are optional and work within a single document.

Percentile metrics support only property filters with `IS` or `IS_NOT`. They do not support measure filters or null checks.

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

Run `validate` for local checks, then run `plan` to preview changes. Local validation checks source mappings in the submitted files. An explicit tag equal to the file's `sync_tag` still checks local mappings when that source is in the submitted files. External references are resolved during `execute`; a successful plan does not confirm that an external source or selected measure exists.

The sync API does not support `warehouse_metric_measure_id`. Replace raw measure IDs with a source and one of the preceding selectors.

## CLI limitations

Changing only `options.is_certified` does not update certification on an otherwise unchanged existing source or metric. Check certification in Datadog after managing existing definitions with YAML; a successful sync alone does not confirm a certification change.

The CLI does not export existing definitions or convert Eppo YAML automatically. Create and review the full definitions before managing existing metrics with YAML.

For adoption, use `existing_id` with `options.upgrade_mode: by_id`. Setting `upgrade_mode: by_name` alone does not adopt objects with matching names.

## Troubleshooting

| Error | What to check |
| ----- | ------------- |
| The API returns `403`. | Confirm the API/application key has the Product Analytics permissions required to write metrics. If `is_certified` is enabled, confirm the role also has Product Analytics Certified Metrics Write. |
| A warehouse connection was not found. | Confirm the target Datadog organization has a warehouse connection configured. If you set `warehouse_connection_id`, confirm that it belongs to the target organization. |
| A subject type was not found. | Confirm the `subject_types[].name` value matches an existing Datadog subject type. |
| A successful result shows no changes. | The service detected no changes to apply. If you changed only `options.is_certified`, check certification in Datadog; a successful sync does not confirm that this setting changed. A failed operation does not establish that the YAML matches Datadog. |
| A sync is blocked. | Read the object details and blocked reasons in the console output. To save the API response, run `metric-sync result <METRIC_SYNC_ID> --log-file ./metric-sync.log`. Possible causes include experiment references, metrics outside the sync tag that reference a source, and adoption conflicts. A blocked result exits with a nonzero status. |
| An operation fails. | Run `metric-sync result <METRIC_SYNC_ID> --log-file ./metric-sync-result.log` to retrieve available errors and inspect the API response. Changes shown for a failed operation are not confirmed as applied. Some server failures return no error details; keep the operation ID for support. |
| Local validation passes, but `plan` rejects the YAML. | Local checks do not verify warehouse queries. Read the error details in the console output. To save the API response, run `metric-sync plan ./metrics --log-file ./metric-sync.log`. Use those details to correct the definition. |

[1]: /experiments/guide/connecting_a_data_warehouse/
[2]: /account_management/rbac/permissions/#product-analytics
[3]: /account_management/api-app-keys/
[4]: #measure-references
[5]: #filters
