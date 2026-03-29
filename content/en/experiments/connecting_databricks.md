---
title: Connect Databricks for Warehouse Native Experiment Analysis
description: Connect a Databricks service account to enable warehouse native experiment analysis.
private: true
further_reading:
- link: "/experiments/defining_metrics"
  tag: "Documentation"
  text: "Defining metrics in Datadog Experiments"
- link: "https://www.datadoghq.com/blog/experimental-data-datadog/"
  tag: "Blog"
  text: "How to bridge speed and quality in experiments through unified data"
---

## Overview

This guide walks through connecting Databricks to Datadog to enable warehouse-native experiment analysis in three steps: connecting Databricks to Datadog, setting up resources in Databricks, and configuring experiment-specific settings in Datadog.

## Step 1: Set up the Databricks integration

Datadog Experiments connects to Databricks through the [Datadog Databricks integration][1]. If you already have a Databricks integration configured for the workspace you'd like to use, you can skip to the next step.

If you haven't set up the Databricks integration yet, see the [Databricks integration documentation][1].

If you're only using the Databricks integration for warehouse native experiment analysis, you can disable the toggles for collecting other resources.

## Step 2: Configure the Databricks workspace for experiments

The Service Principal used by the Databricks integration needs additional permissions for Datadog Experiments. You will need to grant it read access to your source tables, create an output schema and volume, and grant SQL Warehouse access.

This can all be done from a SQL Editor if you are logged into your Databricks workspace with a user that has sufficient permissions. Click on “SQL Editor” on the left nav of your workspace.

### Grant Read Access to Source Tables

Grant the Service Principal read access to the tables you'd like to use to create experiment metrics. Replace `<catalog>`, `<schema>`, and `<table>` with the appropriate values.

```sql
GRANT USE CATALOG ON CATALOG <catalog> TO `<principal>`;
GRANT USE SCHEMA ON SCHEMA <catalog>.<schema> TO `<principal>`;

-- individual tables
GRANT SELECT ON TABLE <catalog>.<schema>.<table> TO `<principal>`;

-- all tables
GRANT SELECT ON ALL TABLES IN SCHEMA <catalog>.<schema> TO `<principal>`;
```

### Create a schema for Datadog Experiment output

Create a schema for Datadog Experiments to write intermediate results and temporary tables by running the following, replacing `<catalog>` and `<principal>` with the appropriate values.

```sql
CREATE SCHEMA IF NOT EXISTS <catalog>.datadog_experiments_output;
GRANT USE SCHEMA ON SCHEMA <catalog>.datadog_experiments_output TO `<principal>`;
GRANT CREATE TABLE ON SCHEMA <catalog>.datadog_experiments_output TO `<principal>`;
```

### Configure a volume for temporary data staging

Datadog Experiments uses a [Volume][2] to temporarily save exposure data before copying it into a Databricks table. Create and grant access to this Volume, again replacing `<catalog>` and `<principal>` with the appropriate values.

```sql
CREATE VOLUME IF NOT EXISTS <catalog>.datadog_experiments_output.datadog_experiments_volume;
GRANT READ VOLUME ON VOLUME <catalog>.datadog_experiments_output.datadog_experiments_volume TO `<principal>`;
GRANT WRITE VOLUME ON VOLUME <catalog>.datadog_experiments_output.datadog_experiments_volume TO `<principal>`;
```

### Grant SQL warehouse access

The service principal must have access to the SQL warehouse that Datadog Experiments will use to run queries.

1. Navigate to the **SQL Warehouses** page in your Databricks workspace.
2. Select the warehouse you want Datadog Experiments to use.
3. Click **Permissions** (top right) and grant the Service Principal `CAN USE` permission.

## Step 3: Configure experiment settings

1. Navigate to the [Warehouse Connections page][3].
2. Click **Databricks**.
3. Select the Databricks account you configured above.
4. Enter the catalog, schema, and volume name you configured earlier.

{{< img src="/product_analytics/experiment/guide/databricks_experiment_setup.png" alt="The Edit Data Warehouse modal with Databricks selected, showing input fields for Account, Catalog, Schema, and Volume Name" style="width:90%;" >}}

If your catalog and schema do not show up in the dropdown, you can type them in to add manually.

After you save your warehouse connection, create experiment metrics using your Databricks data. See [Create Experiment Metrics][4].


[1]: /integrations/databricks/?tab=useaserviceprincipalforoauth
[2]: https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-volumes
[3]: https://app.datadoghq.com/product-analytics/experiments/settings/warehouse-connections
[4]: /experiments/defining_metrics

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
