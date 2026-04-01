---
title: Connect Databricks for Warehouse-Native Experiment Analysis
description: Connect a Databricks service account to enable warehouse-native experiment analysis.
further_reading:
- link: "https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-volumes"
  tag: "Documentation"
  text: "Volumes"
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

Datadog Experiments connects to Databricks through the [Datadog Databricks integration][1]. If you already have a Databricks integration configured for the workspace you plan to use, skip to [Step 1](#step-1-grant-permissions-to-the-service-principal). Otherwise, expand the section below to create a service principal.

{{% collapse-content title="Create a Databricks service principal" level="h4" %}}

**In your Databricks Workspace**:

1. Click your profile in the top right corner and select **Settings**.
1. In the **Settings** menu, click **Identity and access**.
1. On the **Service principals** row, click **Manage**, then:
   1. Click **Add service principal**, then **Add new**.
   1. Enter a service principal name and click **Add**.
1. Click the name of the new service principal to open its details page.
1. Select the **Permissions** tab, then:
   1. Click **Grant access**.
   1. Under **User, Group or Service Principal**, enter the service principal name.
   1. Using the **Permission** dropdown, select **Manage**.
   1. Click **Save**.
1. Select the **Secrets** tab, then:
   1. Click **Generate secret**.
   1. Set the **Lifetime (days)** value to the maximum allowed (for example, 730).
   1. Click **Generate**.
   1. Note your **Secret** and **Client ID**.
   1. Click **Done**.
1. In the **Settings** menu, click **Identity and access**.
1. On the **Groups** row, click **Manage**, then:
   1. Click **admins**, then **Add members**.
   1. Enter the service principal name and click **Add**.

After you create the service principal, continue to [Step 1](#step-1-grant-permissions-to-the-service-principal) to grant the required permissions.

{{% /collapse-content %}}

<div class="alert alert-info">If you plan to use other warehouse observability functionality in Datadog, see <a href="https://docs.datadoghq.com/integrations/databricks/">Datadog's Databricks integration documentation</a> to determine which resources to enable.</div>

## Step 1: Grant permissions to the service principal

<div class="alert alert-info">You must be an account admin to grant these permissions.</div>

In your Databricks Workspace, open the **SQL Editor** to run the following commands and grant the service principal permissions for warehouse-native experiment analysis.

{{< img src="/product_analytics/experiment/guide/databricks_experiments_sql_editor.png" alt="The Databricks Workspace with SQL Editor highlighted in the left navigation under the SQL section, Queries listed below it, a New Query tab open with the New SQL editor: ON toggle at the top, an empty query editor, and a Run all (1000) button with a dropdown arrow." style="width:90%;" >}}

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

### Create an output schema

Run the following commands to create a schema where Datadog Experiments can write intermediate results and temporary tables. Replace `datadog_experiments_output` with your output schema name, and `<catalog>` and `<principal>` with the appropriate values.

```sql
CREATE SCHEMA IF NOT EXISTS <catalog>.datadog_experiments_output;
GRANT USE SCHEMA ON SCHEMA <catalog>.datadog_experiments_output TO `<principal>`;
GRANT CREATE TABLE ON SCHEMA <catalog>.datadog_experiments_output TO `<principal>`;
```

### Configure a volume for temporary data staging

Datadog Experiments uses a [volume][2] to temporarily save exposure data before copying it into a Databricks table. Run the following commands to create and grant access to this volume. Replace `datadog_experiments_output` with your output schema name, and `<catalog>` and `<principal>` with the appropriate values.

```sql
CREATE VOLUME IF NOT EXISTS <catalog>.datadog_experiments_output.datadog_experiments_volume;
GRANT READ VOLUME ON VOLUME <catalog>.datadog_experiments_output.datadog_experiments_volume TO `<principal>`;
GRANT WRITE VOLUME ON VOLUME <catalog>.datadog_experiments_output.datadog_experiments_volume TO `<principal>`;
```

### Grant SQL warehouse access

Grant the service principal access to the SQL warehouse that Datadog Experiments uses to run queries.

1. Navigate to **SQL Warehouses** in your Databricks Workspace.
1. Select the warehouse for Datadog Experiments.
1. At the top right corner, click **Permissions**.
1. Grant the service principal the **Can use** permission.
1. Close the **Manage permissions** modal.

## Step 2: Connect Databricks to Datadog

To connect your Databricks Workspace to Datadog for warehouse-native experiment analysis:

1. Navigate to [Datadog's integrations page][6] and search for **Databricks**.
1. Click the **Databricks** tile to open its modal.
1. Select the **Configure** tab and click **Add Databricks Workspace**. If this is your first Databricks account, the setup form appears automatically.
1. Under the **Connect a new Databricks Workspace** section, enter:
   - **Workspace Name**.
   - **Workspace URL**.
   - **Client ID**.
   - **Client Secret**.
   - **System Tables SQL Warehouse ID**.
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
1. Using the **Account** dropdown, select the Databricks Workspace you configured in [Step 2](#step-2-connect-databricks-to-datadog).
1. Enter the **Catalog**, **Schema**, and **Volume name** you configured in [Step 1](#step-1-grant-permissions-to-the-service-principal). If your catalog and schema do not appear in the dropdown, enter them manually to add them to the list.
1. Click **Save**.

{{< img src="/product_analytics/experiment/guide/databricks_experiment_setup_1.png" alt="The Edit Data Warehouse modal with Databricks selected, showing input fields for Account, Catalog, Schema, and Volume Name." style="width:90%;" >}}

After you save your warehouse connection, [create experiment metrics][4] using your Databricks data.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/databricks/?tab=useaserviceprincipalforoauth
[2]: https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-volumes
[4]: /experiments/defining_metrics
[5]: https://app.datadoghq.com/product-analytics
[6]: https://app.datadoghq.com/integrations/
