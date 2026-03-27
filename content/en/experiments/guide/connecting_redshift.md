---
title: Connect Redshift for Warehouse-Native Experiment Analysis
description: Connect a Redshift service account to enable warehouse native experiment analysis.
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

Warehouse-native experiment analysis lets you run statistical computations directly in your data warehouse.

To set this up for Redshift, connect a Redshift cluster to Datadog and configure your experiment settings. This guide covers:

- [Configuring AWS integration and IAM permissions](#phase-1-aws-integration-and-iam-permissions)
- [Setting up the database](#phase-2-database-level-setup)
- [Finalizing the connection in Datadog](#phase-3-finalizing-the-datadog-connection)
- [Setting up log collection (optional)](#log-collection-optional)

## Phase 1: AWS integration and IAM permissions
Datadog requires specific IAM permissions to discover and collect metrics from your Redshift clusters. 

To set up the AWS integration for Redshift, see the [Amazon Redshift][1] guide to:
1. Install and configure the **Amazon Web Services** integration.

1. Enable **Redshift** under the **Metrics Collection** tab of the AWS integration page.

1. Add the required permissions to the **IAM policy** associated with your Datadog-AWS integration role:
    - `redshift:DescribeClusters`: Allows Datadog to list and discover Redshift clusters in your account.
    - `redshift:DescribeLoggingStatus`: Allows Datadog to identify where audit logs are stored for log collection.
    - `tag:GetResources`: Enables Datadog to pull custom tags from your clusters to better segment your experiment.
    
1. Install the Datadog **Amazon Redshift** integration.

## Phase 2: Data warehouse setup

To give Datadog access to your data warehouse, you must create a user and a dedicated schema where Datadog can store experiment results and intermediate tables.

### 1. Create the Datadog user

Create a user with a strong password that Datadog can use to execute queries. Replace `datadog_experiments_user` with your user value and `Your_Secure_Password` with your password.

```sql
CREATE USER datadog_experiments_user PASSWORD 'Your_Secure_Password';
```

### 2. Create a dedicated schema

Run the following SQL to create a dedicated schema where Datadog stores experiment results. Replace `datadog_experiments` with the name of your schema.

```sql
CREATE SCHEMA datadog_experiments;
```

### 3. Grant write permissions

Grant Datadog write access to the dedicated schema to persist results. Replace `datadog_experiments` with the name of the schema and `datadog_experiments_user` with your user value.

```sql
GRANT USAGE ON SCHEMA datadog_experiments TO datadog_experiments_user;
GRANT CREATE ON SCHEMA datadog_experiments TO datadog_experiments_user;
```

### 4. Grant read access to metrics

Grant the user read access to the tables or schemas containing your experiment metrics so Datadog can calculate results. Replace `your_production_schema` with the name of the schema and `datadog_experiments_user` with your user value.

```sql
GRANT USAGE ON SCHEMA your_production_schema TO datadog_experiments_user;
GRANT SELECT ON ALL TABLES IN SCHEMA your_production_schema TO datadog_experiments_user;
```

## Phase 3: Connect Redshift to Datadog

After you configure your AWS integrations and complete the data warehouse setup, connect Redshift to Datadog:

1. Navigate to [Product Analytics][2]. In the left navigation, hover over **Settings**, then click **Experiments**.

1. Select the **Warehouse Connections** tab.

1. Click **Connect a data warehouse**. If you already have a warehouse connected, click **Edit** instead.

1. Select **Redshift** as your data warehouse.

1. Select your **AWS account** from the dropdown.

1. Enter your connection details:
   - **AWS region**: `<NEEDS DEFINITION>`
   - **Cluster identifier**: The unique name of your Redshift cluster.
   - **Cluster endpoint**: `<NEEDS DEFINITION>`
   - **Username and Password**: The credentials for `datadog_experiments_user`.
   - **Output Schema**: Enter `datadog_experiments`.

1. Enter your database and storage details:
   - **Database**: The name of the database containing your metrics.
   - **Database user**: The credentials for `datadog_experiments_user`.
   - **Schema**: The credentials for the schema you created (for example, `datadog_experiments`).
   - **Temp S3 bucket**: `<NEEDS DEFINITION>`

`<PLEASE CONFIRM THIS - NOT IN THE UI>`
1. Toggle **Enable Data Observability** to **ON**. This allows Datadog to sync metadata and query history, ensuring data freshness and accuracy for your experiments.

1. Click **Save**.

{{< img src="/product_analytics/experiment/guide/redshift_pa_setup.png" alt="The Redshift connection setup page in Datadog showing warehouse type tiles for Snowflake, BigQuery, Redshift (selected), and Databricks, with three sections: Select AWS Account with an AWS account dropdown, Cluster Connection with fields for AWS region, Cluster identifier, Cluster endpoint, and Port, and Database and Storage with fields for Database, Database user, Schema, and Temp S3 bucket." style="width:90%;" >}}

## Log Collection (Optional)

Enable log collection for real-time monitoring of guardrail metrics, such as detecting if an experiment variant is causing a spike in database errors. See the [Amazon Redshift Log collection][3] guide to:

1. **Enable Auditing**: In the AWS Redshift console, enable audit logging and point it to an S3 bucket.
2. **Configure Datadog Forwarder**: Set up the Datadog Forwarder Lambda in your AWS account.
3. **Add S3 Trigger**: Go to your Forwarder Lambda in the AWS console and add an S3 Trigger. Select the Redshift log bucket and set the event type to **All object create events**.

## Verify Datadog's connection to Redshift

After you save the connection, Datadog begins a background sync of your information schema. Verify the health of the connection by checking:

- **Metric Flow**: Ensure `aws.redshift.cpuutilization` and `aws.redshift.health_status` appear in your Datadog dashboards.
- **Result Persistence**: Confirm that new tables are being created in the `datadog_experiments` schema after you launch your first test.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon-redshift/
[2]: https://app.datadoghq.com/product-analytics
[3]: https://docs.datadoghq.com/integrations/amazon-redshift/#log-collection

