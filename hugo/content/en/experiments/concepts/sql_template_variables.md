---
title: SQL Template Variables
description: Use SQL template variables to reduce the data scanned by warehouse-native experiment pipelines.
further_reading:
- link: "/experiments/defining_metrics/?tab=warehouse"
  tag: "Documentation"
  text: "Create experiment metrics from warehouse data"
- link: "/experiments/concepts/exposure_sql/"
  tag: "Documentation"
  text: "Exposure SQL Models"
- link: "/experiments/guide/connecting_a_data_warehouse/"
  tag: "Documentation"
  text: "Connecting a Data Warehouse"
---

## Overview

By default, Datadog wraps Metric SQL Models and Exposure SQL Models in date filters so each pipeline run only scans data from the window it is analyzing. If your warehouse tables are large, add template variables to your queries to push these filters into your SQL and reduce the amount of data your warehouse scans on each run.

Reference template variables using the `{{variable}}` syntax. Datadog replaces them at query time:

| Variable | Description |
|----------|-------------|
| `{{analysis_start_timestamp}}`, `{{analysis_end_timestamp}}` | The window the current update is materializing. On a full refresh, this spans the experiment; on an incremental refresh, it is only the new tranche of data being added. Use these to scan the minimum amount of data on each run. |
| `{{experiment_events_start_timestamp}}`, `{{experiment_events_end_timestamp}}` | The full experiment event window, even during an incremental refresh. Use these when your query must always see the entire window, regardless of the current update. |
| `{{assignments_start_timestamp}}`, `{{assignments_end_timestamp}}` | The experiment's assignment window. |
| `{{experiment_key}}` | The experiment's flag-allocation key, rendered as a quoted string literal. |
| `{{experiment_keys}}` | A comma-separated list of quoted flag-allocation keys, for use in an `IN (...)` clause. |
| `{{allocation_key}}` | The allocation portion of the flag-allocation key, rendered as a quoted string literal. |

Timestamp variables render as ISO 8601 strings, so wrap them in quotes and cast them as needed. Key variables are already quoted, so use them without adding quotes.

## Metric SQL Model example

To scan only the rows Datadog needs on each run:

```sql
SELECT user_id, event_timestamp, amount
FROM analytics.orders
WHERE event_timestamp BETWEEN '{{analysis_start_timestamp}}' AND '{{analysis_end_timestamp}}'
```

## Exposure SQL Model example

To scan only the recent exposures for the experiment being analyzed:

```sql
SELECT user_id, exposed_at, experiment_id, variant_id
FROM analytics.experiment_exposures
WHERE experiment_id = {{experiment_key}}
  AND exposed_at BETWEEN '{{analysis_start_timestamp}}' AND '{{analysis_end_timestamp}}'
```

<div class="alert alert-info">Template variables are optional. If you omit them, Datadog still applies its own date filter to your query. Use <code>{{analysis_start_timestamp}}</code> and <code>{{analysis_end_timestamp}}</code> for incremental scanning, or <code>{{experiment_events_start_timestamp}}</code> and <code>{{experiment_events_end_timestamp}}</code> when your query must always see the full experiment window.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
