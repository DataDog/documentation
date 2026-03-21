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

Datadog Experiments uses a warehouse-native architecture, executing statistical models directly on your data. This integration requires a secure connection that allows Datadog to read your metrics and write back experimental results and cohort definitions to a dedicated sandbox in your Unity Catalog.

The setup process consists of four primary phases:

1. **Identity Setup**: Creating a Databricks Service Principal and OAuth credentials.
2. **Data Access**: Granting permissions to your metrics and system tables.
3. **Write-Back Setup**: Configuring a dedicated catalog and schema for results.
4. **Compute & Finalization**: Assigning a SQL Warehouse and completing the Datadog UI setup.

## Prerequisites

- **Unity Catalog**: This integration requires Unity Catalog to be enabled in your Databricks workspace.
- **Account Admin Access**: You must be a Databricks Account Admin to create service principals and OAuth secrets.
- **Datadog Permissions**: You need the `connections_write` and `connections_resolve` permissions in Datadog.

## Phase 1: Identity and OAuth Setup

Datadog recommends using Service Principals with OAuth for authentication. Legacy Personal Access Tokens (PATs) are supported for existing connections but are being phased out for new workspaces.

1. **Create Service Principal**: In the Databricks Account Console, navigate to **User Management** > **Service Principals** and click **Add service principal** (e.g., `datadog-experiments-sp`).
2. **Generate OAuth Secret**: Under the **Credentials & secrets** tab for your new principal, click **Generate secret**. Copy the **Client ID** and **Client Secret** immediately — you cannot view them again.
3. **Workspace Assignment**: Assign the service principal to the target workspace and grant it the **Workspace access** and **Databricks SQL access** entitlements.

## Phase 2: Data Access and Governance

Datadog needs to read your existing data to calculate experiment results and access system tables for metadata synchronization.

### 1. Grant System Table Access

To enable lineage tracking and metadata sync, grant the service principal read access to the Unity Catalog system catalog. Run these commands as a metastore admin:

```sql
GRANT USE CATALOG ON CATALOG system TO `application_id`;
GRANT USE SCHEMA ON CATALOG system TO `application_id`;
GRANT SELECT ON CATALOG system TO `application_id`;
```

### 2. Grant Read Access to Metrics

Grant the service principal SELECT privileges on the production catalogs and schemas containing your experiment metrics:

```sql
GRANT USE CATALOG ON CATALOG production_data TO `application_id`;
GRANT USE SCHEMA ON SCHEMA production_data.metrics_schema TO `application_id`;
GRANT SELECT ON ALL TABLES IN SCHEMA production_data.metrics_schema TO `application_id`;
```

## Phase 3: Write-Back Sandbox Setup

Datadog Experiments requires a dedicated space to write results. Create a new catalog for this purpose and set the service principal as the owner or grant it full privileges.

```sql
CREATE CATALOG IF NOT EXISTS datadog_experiments;
GRANT USE CATALOG ON CATALOG datadog_experiments TO `application_id`;

CREATE SCHEMA IF NOT EXISTS datadog_experiments.output;
GRANT ALL PRIVILEGES ON SCHEMA datadog_experiments.output TO `application_id`;
```

## Phase 4: Compute and Finalization

Datadog uses a Databricks SQL Warehouse to perform its calculations.

1. **Assign SQL Warehouse**: Identify a Pro or Serverless SQL Warehouse. Datadog does not support Classic warehouses for this integration.
2. **Grant Compute Access**: In the Warehouse settings, grant the service principal the **CAN USE** permission.
3. **Configure Datadog UI**:
   - Navigate to **Product Analytics** > **Experiments** > **Settings**.
   - Enter your **Workspace URL** and **Account ID** (found in your Databricks Account Console).
   - Paste your **Client ID** and **Client Secret**.
   - Enter the **SQL Warehouse ID**.
   - Specify the **Output Catalog** and **Output Schema** (e.g., `datadog_experiments` and `output`).
   - Toggle **Enable Data Observability** to **ON** to sync metadata and trace lineage.
   - Click **Save and Test Connection**.

## Verification

After the connection is saved, Datadog initiates a sync of your Unity Catalog metadata. Verify the setup by checking:

- **Schema Sync**: Confirm that your Databricks tables are visible in the Datadog Data Observability settings.
- **Result Persistence**: After launching a test experiment, check your `datadog_experiments.output` schema in Databricks to confirm Datadog is successfully writing result tables.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
