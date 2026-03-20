---
title: Connect Redshift for Warehouse Native Experiment Analysis
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

Datadog Experiments uses a warehouse-native architecture, performing statistical calculations directly on your data. To enable this, you must establish a secure connection that allows Datadog to read your metric data and write back experiment results to a dedicated "sandbox" schema within your Redshift cluster.

Setting up the connection involves three primary phases:

1. **AWS Integration**: Configuring the standard Datadog-AWS integration with Redshift-specific IAM permissions.
2. **Database Setup**: Creating a dedicated database user and an output schema for Datadog.
3. **Datadog Configuration**: Finalizing the connection within the Datadog Experiments interface.

## Phase 1: AWS Integration and IAM Permissions

Datadog requires specific IAM permissions to discover your Redshift clusters and monitor their health. These permissions should be added to the IAM policy associated with your Datadog-AWS integration role.

### Required Permissions

Add the following permissions to your Datadog IAM policy:

- `redshift:DescribeClusters`: Allows Datadog to list and discover Redshift clusters in your account.
- `redshift:DescribeLoggingStatus`: Allows Datadog to identify where audit logs are stored for log collection.
- `tag:GetResources`: Enables Datadog to pull custom tags from your clusters for better experiment segmenting.

## Phase 2: Database-Level Setup

To interact with the data plane, you must create a dedicated user and a schema where Datadog can store experiment results and intermediate tables.

### 1. Create a Dedicated Schema

Run the following SQL to create a sandbox schema for Datadog Experiments:

```sql
CREATE SCHEMA datadog_experiments;
```

### 2. Create the Datadog User

Create a user with a strong password. This user will be used by the Datadog experimentation engine to execute queries:

```sql
CREATE USER datadog_experiments_user PASSWORD 'Your_Secure_Password';
```

### 3. Grant Write Permissions

Datadog requires write access to the dedicated schema created in step 1 to persist results.

```sql
GRANT USAGE ON SCHEMA datadog_experiments TO datadog_experiments_user;
GRANT CREATE ON SCHEMA datadog_experiments TO datadog_experiments_user;
```

### 4. Grant Read Access to Metrics

To allow Datadog to calculate results, grant the user read access to the tables or schemas containing your experiment metrics:

```sql
GRANT USAGE ON SCHEMA your_production_schema TO datadog_experiments_user;
GRANT SELECT ON ALL TABLES IN SCHEMA your_production_schema TO datadog_experiments_user;
```

## Phase 3: Finalizing the Datadog Connection

After the AWS and database-level configurations are complete, finish the setup in the Datadog platform.

1. Navigate to **Product Analytics** > **Experiments** > **Settings**.
2. Select **Amazon Redshift** as your data warehouse.
3. Enter your connection details:
   - **Cluster Identifier**: The unique name of your Redshift cluster.
   - **Database Name**: The name of the database containing your metrics.
   - **Username and Password**: The credentials for `datadog_experiments_user`.
   - **Output Schema**: Enter `datadog_experiments`.
4. Toggle **Enable Data Observability** to **ON**. This allows Datadog to sync metadata and query history, ensuring data freshness and accuracy for your experiments.
5. Click **Save and Test Connection**.

## Phase 4: Log Collection (Optional)

For real-time monitoring of guardrail metrics—such as detecting if an experiment variant is causing a spike in database errors—enable log collection.

1. **Enable Auditing**: In the AWS Redshift console, enable audit logging and point it to an S3 bucket.
2. **Configure Datadog Forwarder**: Set up the Datadog Forwarder Lambda in your AWS account.
3. **Add S3 Trigger**: Go to your Forwarder Lambda in the AWS console and add an S3 Trigger. Select the Redshift log bucket and set the event type to **All object create events**.

## Verification

After the connection is saved, Datadog begins a background sync of your information schema. Verify the health of the connection by checking:

- **Metric Flow**: Ensure `aws.redshift.cpuutilization` and `aws.redshift.health_status` are appearing in your Datadog dashboards.
- **Result Persistence**: Confirm that new tables are being created in the `datadog_experiments` schema after you launch your first test.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
