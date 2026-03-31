---
title: Connect Databricks for Warehouse-Native Experiment Analysis
description: Connect a Databricks service account to enable warehouse native experiment analysis.
further_reading:
- link: "/experiments/defining_metrics"
  tag: "Documentation"
  text: "Defining metrics in Datadog Experiments"
- link: "https://www.datadoghq.com/blog/experimental-data-datadog/"
  tag: "Blog"
  text: "How to bridge speed and quality in experiments through unified data"
---

## Overview

Warehouse-native experiment analysis lets you run statistical computations directly in your data warehouse.

To set this up for Databricks, connect a Databricks service account to Datadog and configure your experiment settings. This guide covers:

- [Granting permissions to the service principal](#step-1-grant-permissions-to-the-service-principal)
- [Connecting Databricks to Datadog](#step-2-connect-databricks-to-datadog)
- [Configuring experiment settings in Datadog](#step-3-configure-experiment-settings)

## Prerequisites

Datadog Experiments connects to Databricks through the [Datadog Databricks integration][1]. If you already have a Databricks integration configured for the workspace you'd like to use, skip to [Step 1](#step-1-grant-permissions-to-the-service-principal). Otherwise, expand the section below to create a service principal.

{{% collapse-content title="Create a Databricks service principal" level="h4" %}}

**In your Databricks Workspace**:

1. Click your profile in the upper-right corner and select **Settings**.
1. Open the **Identity and access** tab.
1. On the **Service principals** row, click **Manage**.
1. Click **Add service principal**, then **Add new**.
1. Enter a service principal name and click **Add**.
1. Click the name of the new service principal to open its details page.
1. On the **Permissions** tab:
   1. Click **Grant access**.
   1. Under the **User, Group or Service Principal**, enter the service principal name.
   1. In the **Permission** dropdown, select **Manage**.
1. On the **Secrets** tab:
   1. Click **Generate secret**.
   1. Set the **Lifetime (days)** value to 730 (the maximum allowed).
   1. Click **Generate**.
   1. Note your **Client ID** and **Secret**.
   1. Click **Done**.
1. Return to the **Identity and access** tab.
1. On the **Groups** row, click **Manage**.
1. Click the **admins** group, then click **Add members**.
1. Enter the **service principal** and click **Add**.

After you create the service principal, continue to [Step 1](#step-1-grant-permissions-to-the-service-principal) to grant the required permissions.

{{% /collapse-content %}}

<div class="alert alert-info">If you plan to use other warehouse observability functionality in Datadog, see <a href="https://docs.datadoghq.com/integrations/databricks/">Datadog's Databricks integration documentation</a> to determine which resources to enable.</div>


## Step 1: Grant permissions to the service principal

Navigate to the **SQL Editor** in your Databricks Workspace and run the following commands to give the service principal access to run warehouse-native experiment analysis.

### Grant read access to source tables

Grant the service principal read access to the tables containing your experiment metrics. Run both `GRANT USE` commands, then run the `GRANT SELECT` option that matches your access needs. Replace `<catalog>`, `<schema>`, `<table>`, and `<principal>` with the appropriate values.

```sql
GRANT USE CATALOG ON CATALOG <catalog> TO `<principal>`;
GRANT USE SCHEMA ON SCHEMA <catalog>.<schema> TO `<principal>`;

-- Option 1: Give read access to a single table
GRANT SELECT ON TABLE <catalog>.<schema>.<table> TO `<principal>`;

-- Option 2: Give read access to all tables in the schema
GRANT SELECT ON ALL TABLES IN SCHEMA <catalog>.<schema> TO `<principal>`;
```

### Create a schema for Datadog Experiments output

Run the following commands to create a schema for Datadog Experiments to write intermediate results and temporary tables. Replace `<catalog>` and `<principal>` with the appropriate values.

```sql
CREATE SCHEMA IF NOT EXISTS <catalog>.datadog_experiments_output;
GRANT USE SCHEMA ON SCHEMA <catalog>.datadog_experiments_output TO `<principal>`;
GRANT CREATE TABLE ON SCHEMA <catalog>.datadog_experiments_output TO `<principal>`;
```

### Configure a volume for temporary data staging

Datadog Experiments uses a [volume][2] to temporarily save exposure data before copying it into a Databricks table. Run the following commands to create and grant access to this volume. Replace `<catalog>` and `<principal>` with the appropriate values.

```sql
CREATE VOLUME IF NOT EXISTS <catalog>.datadog_experiments_output.datadog_experiments_volume;
GRANT READ VOLUME ON VOLUME <catalog>.datadog_experiments_output.datadog_experiments_volume TO `<principal>`;
GRANT WRITE VOLUME ON VOLUME <catalog>.datadog_experiments_output.datadog_experiments_volume TO `<principal>`;
```

### Grant SQL warehouse access

Grant the service principal access to the SQL warehouse that Datadog Experiments uses to run queries.

1. Navigate to **SQL Warehouses** in your Databricks Workspace.
1. Select the warehouse for Datadog Experiments.
1. Click **Permissions** at the top right corner.
1. Grant the service principal the **Can use** permission.

## Step 2: Connect Databricks to Datadog

To connect your Databricks Workspace to Datadog for warehouse-native experiment analysis:

1. Navigate to [Datadog's integrations page][6] and search for **Databricks**.
1. Click the **Databricks** tile to open its modal.
1. Select the **Configure** tab and click **Add Databricks Workspace**.
1. Under the **Connect a new Databricks Workspace** section, enter:
   1. **Workspace Name**.
   1. **Workspace URL**.
   1. **Client ID**.
   1. **Client secret**.
   1. **System Tables SQL Warehouse ID**.
1. Toggle off **Jobs Monitoring** and all other products.
1. Toggle off the **Metrics - Model Serving** resource.
1. Click **Save Databricks Workspace**.

## Step 3: Configure experiment settings

<div class="alert alert-info">Datadog supports one warehouse connection per organization. Connecting Databricks replaces any existing warehouse connection (for example, Snowflake).</div>

After you set up your Databricks integration and workspace, configure the experiment settings in Datadog:

1. Open [Datadog Product Analytics][5].
1. In the left navigation, hover over **Settings** and click **Experiments**.
1. Select the **Warehouse Connections** tab.
1. Click **Connect a data warehouse**. If you already have a warehouse connected, click **Edit** instead.
1. Select the **Databricks** tile.
1. Select the **Databricks account** you configured in [Step 2](#step-2-connect-databricks-to-datadog).
1. Enter the **Catalog**, **Schema**, and **Volume name** you configured in [Step 1](#step-1-grant-permissions-to-the-service-principal). If your catalog and schema do not appear in the dropdown, type them in manually.
1. Click **Save**.

{{< img src="/product_analytics/experiment/guide/databricks_experiment_setup_1.png" alt="The Edit Data Warehouse modal with Databricks selected, showing input fields for Account, Catalog, Schema, and Volume Name." style="width:90%;" >}}

After you save your warehouse connection, create experiment metrics using your Databricks data. See [Create Experiment Metrics][4].


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/databricks/?tab=useaserviceprincipalforoauth
[2]: https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-volumes
[4]: /experiments/defining_metrics
[5]: https://app.datadoghq.com/product-analytics
[6]: https://app.datadoghq.com/integrations/
