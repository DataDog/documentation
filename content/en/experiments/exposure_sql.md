---
title: Define Exposure SQL Models
description: Analyze experiments tracked in your data warehouse
further_reading:
- link: "/experiments/guide/"
  tag: "Documentation"
  text: "Connecting a Data Warehouse"
- link: "/experiments/defining_metrics/?tab=warehouse"
  tag: "Documentation"
  text: "Create experiment metrics from warehouse data"
- link: "https://www.datadoghq.com/blog/experiments/"
  tag: "Blog"
  text: "Measure the business impact of every product change with Datadog Experiments"
---

## Overview

Use this page when you randomize subjects outside [Datadog Feature Flags][1] and need Datadog to read exposure records from your warehouse.

Datadog Experiments analyzes experiments run with Datadog Feature Flags or an independent randomization system. To measure experiments randomized outside of Datadog, create **Exposure SQL Models** to tell Datadog who was exposed to your experiment and when.

Similar to [Metric SQL Models][2], Exposure SQL Models are SQL snippets that describe exposure data in your warehouse. Exposure SQL Models return the following columns:

| Column | Required | Description |
|--------|----------|-------------|
| Subject Key | Yes | A unique identifier for the subject randomized into the experiment. This is typically a `user_id`. |
| Timestamp | Yes | The moment that a user was exposed to the experiment. |
| Experiment ID | Yes | The experiment that the user was exposed to. One Exposure SQL Model can track many experiments; this column filters records to a specific experiment. |
| Variant ID | Yes | The variant the user was assigned to (for example, `treatment` or `control`). |
| Split by properties | No | Categorical data used to create dimensional split-by charts, such as customer tier, device type, or region. |

When you create an experiment, Datadog Feature Flags and warehouse exposures both appear during flag selection:

{{< img src="/product_analytics/experiment/exposure-sql/whn-flag-selection.png" alt="The feature flag selection interface during experiment creation, with a warehouse exposure source selected in the list." style="width:80%;" >}}

<div class="alert alert-info">Metrics built on events from the Datadog SDK are not supported when exposures come from your warehouse instead of Datadog Feature Flags. You do not need to deduplicate exposure data upstream of Datadog. If multiple records exist for the same user-experiment pair, Datadog uses the first record. If one user was exposed to multiple variants in the same experiment, Datadog excludes that user from the analysis.</div>

## Prerequisites

Before you create Exposure SQL Models:

- [Connect your warehouse to Datadog][3]. Datadog supports BigQuery, Databricks, Redshift, and Snowflake.
- Create at least one [Metric SQL Model][2] and warehouse metric to measure experiment outcomes.
- Store exposure records in your warehouse with the columns listed above.

## Create Exposure SQL models

### Write your SQL

Exposure SQL Models use SQL to query exposure data in your warehouse. For example:

```sql
SELECT
  user_id,
  exposed_at,
  experiment_id,
  variant_id,
  customer_tier
FROM analytics.experiment_exposures
```

To create an Exposure SQL Model:

1. Navigate to {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Exposure SQL Models{{< /ui >}} in Datadog Product Analytics.
1. Click {{< ui >}}Create Exposure SQL Model{{< /ui >}}.
1. Enter a SQL query that returns the required columns. Column names in your query do not need to match the Datadog field names.
1. Click {{< ui >}}Run{{< /ui >}} to preview your data.

### Map columns to Datadog

1. In the mapping panel on the right, map each query column to the corresponding Datadog field (Subject Key, Timestamp, Experiment ID, Variant ID, and optional split-by properties).
1. Click {{< ui >}}Create Exposure SQL Model{{< /ui >}} to save the model.

{{< img src="/product_analytics/experiment/exposure-sql/create-exposure-sql-model.png" alt="The Create Exposure SQL Model page showing a SQL editor with an example exposure query and a mapping panel that maps query columns to Datadog fields." style="width:80%;" >}}

## Create experiments using Exposure SQL models

After you save an Exposure SQL Model, Datadog scans for distinct experiment and variant values. To [create an experiment][4] with warehouse exposures:

1. On the experiment setup page, open the feature flag selector.
1. Select a warehouse experiment ID from the list, or enter an experiment ID manually if it does not appear in the latest scan.

{{< img src="/product_analytics/experiment/exposure-sql/manually-add-flag.png" alt="The feature flag selection modal with a text field to manually enter an experiment ID that was not found in the latest warehouse scan." style="width:80%;" >}}

1. Select the Exposure SQL Model that tracks the flag.

{{< img src="/product_analytics/experiment/exposure-sql/select-exposure-sql.png" alt="The experiment setup page with a dropdown to select which Exposure SQL Model tracks a manually entered experiment ID." style="width:80%;" >}}

## How Datadog computes results

After you create an experiment from an Exposure SQL Model, Datadog runs a data pipeline that:

1. Filters exposures to the relevant experiment and timeframe.
1. Deduplicates by subject (user) and removes users exposed to multiple variants.
1. Joins to metric events by user and timestamp (only metric events after experiment exposure are included).
1. Aggregates to the user level and applies winsorization.
1. Aggregates to the variant level and computes summary statistics (mean, variance, and more).

### Update schedule

Datadog updates experiment results nightly. To refresh results immediately, open the experiment overview page and click {{< ui >}}Run an update now{{< /ui >}}.

{{< img src="/product_analytics/experiment/exposure-sql/manual-trigger.png" alt="The experiment results overview page with the Run an update now button highlighted." style="width:80%;" >}}

To view a simplified version of the pipeline logic, click {{< ui >}}Copy SQL{{< /ui >}} on any warehouse metric.

{{< img src="/product_analytics/experiment/exposure-sql/copy-sql.png" alt="The experiment results page with the Copy SQL button highlighted on a warehouse metric." style="width:80%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/
[2]: /experiments/defining_metrics/?tab=warehouse#create-a-sql-model
[3]: /experiments/guide/
[4]: /experiments/plan_and_launch_experiments/
