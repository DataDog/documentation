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

- [Preparing a Redshift service account](#step-1-prepare-the-redshift-service-account)
- [Connecting it to Datadog using the AWS integration](#step-2-connect-redshift-to-datadog-using-aws)
- [Configuring experiment settings](#step-3-configure-experiment-settings)

## Step 1: Install the AWS Integration

Datadog Experiments connects to Redshift through the Datadog AWS integration. If you already have the [AWS integration][1] configured for the account containing your Redshift cluster, skip to [Step 2](#step-2-prepare-the-redshift-service-account).

To set up the AWS integration:

1. Navigate to [Datadog's integrations page][2] and search for **Amazon Web Services**.
1. Click the **Amazon Web Services** tile to open its modal.
1. Click **Add AWS Account(s)** under the **Configuration** tab.
   1. If you do not yet have the AWS integration installed, **Add AWS Account(s)** appears on the AWS landing page after you select the integration tile. 
1. Follow the **CloudFormation** setup flow to create an IAM role that allows Datadog to make API calls to your AWS account. See the [AWS integration documentation][1], for more information. 

<!-- does this mean logs in the Send AWS Logs to Datadog section? -->
<div class="alert alert-info">If you are only using the AWS integration for warehouse-native experiment analysis, you can opt out of collecting other resources.</div>

## Step 2: Prepare the Redshift service account

To give Datadog access to your data warehouse, you must create a user and a dedicated schema where Datadog can store experiment results and intermediate tables.

### Create the Datadog user

1. Your Datadog user in Redshift must have superuser or admin privileges to connect to your Redshift cluster.
1. Run the following command to create a user with a strong password that Datadog can use to execute queries. Replace `datadog_experiments_user` with your user value and `Your_Secure_Password` with your password.

```sql
CREATE USER datadog_experiments_user PASSWORD 'Your_Secure_Password';
```

### Grant read access to metrics

Grant the user read access to the tables or schemas containing your experiment metrics so Datadog can calculate results. Run the `GRANT USAGE` command, then run the `GRANT SELECT` option that match your access needs. Replace `<schema>` and `<table>` with the appropriate values.

```sql
GRANT USAGE ON SCHEMA <schema> TO datadog_experiments_user;

-- individual tables
GRANT SELECT ON TABLE <schema>.<table> TO datadog_experiments_user;

-- all tables
GRANT SELECT ON ALL TABLES IN SCHEMA <schema> TO datadog_experiments_user;
```

### 3. Create an output schema

Run the following SQL to create a schema where Datadog stores experiment results and intermediate tables.

```sql
CREATE SCHEMA IF NOT EXISTS datadog_experiments_output;
GRANT ALL ON SCHEMA datadog_experiments_output TO datadog_experiments_user;
```

### Create an S3 bucket

Create an S3 bucket for importing exposure events into your warehouse. The bucket name must start with `datadog-experimentation-` (for example, `datadog-experimentation-[AWS account ID]`). Default settings can be used.

### Grant additional IAM permissions

Because Datadog Experiments writes data into your warehouse, your AWS IAM role needs additional permissions beyond those required for the [standard Amazon Redshift integration][3].

Add the following permissions to the IAM role used by your Datadog AWS integration:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "GetClusterCreds",
      "Effect": "Allow",
      "Action": [
        "redshift:GetClusterCredentials"
      ],
      "Resource": [
        "[Redshift cluster ARN]",
        "[Redshift user ARN]",
        "[Redshift database ARN]"
      ]
    },
    {
      "Sid": "QueryRedshift",
      "Effect": "Allow",
      "Action": [
        "redshift-data:ExecuteStatement",
        "redshift-data:GetStatementResult",
        "redshift-data:DescribeStatement",
        "redshift-data:ListStatements",
        "redshift-data:CancelStatement"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ListTheBucket",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "[S3 bucket ARN]"
    },
    {
      "Sid": "ObjectRW",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "[S3 bucket ARN]/*"
    }
  ]
}
```

Replace the following with the appropriate values:

| Field | Example |
|-------|---------|
| `[Redshift cluster ARN]` | `arn:aws:redshift:us-east-1:[account-id]:namespace:[namespace-id]` |
| `[Redshift user ARN]` | `arn:aws:redshift:us-east-1:[account-id]:dbuser:[cluster-name]/[user]` |
| `[Redshift database ARN]` | `arn:aws:redshift:us-east-1:[account-id]:dbname:[cluster-name]` |
| `[S3 bucket ARN]` | `arn:aws:s3:::[bucket-name]` |


## Step 3: Configure Experiment settings

After you configure your AWS integrations and complete the data warehouse setup, connect Redshift to Datadog:

1. Navigate to [Product Analytics][2]. In the left navigation, hover over **Settings**, then click **Experiments**.

1. Select the **Warehouse Connections** tab.

1. Click **Connect a data warehouse**. If you already have a warehouse connected, click **Edit** instead.

1. Select **Redshift** as your data warehouse.

1. Select your **AWS account** from the dropdown.

1. Under **Cluster Connection**, enter:
   - **AWS region**: The region your Redshift cluster is in (for example, `us-east-1`).
   - **Cluster identifier**: The name of your Redshift cluster.
   - **Cluster endpoint**: The full endpoint URL for your cluster.
   - **Port**: The port your cluster is listening on (default: `5439`).

1. Under **Database and Storage**, enter:
   - **Database**: The database containing your source tables.
   - **Database user**: The service user you created earlier (for example, `datadog_experiments_user`).
   - **Schema**: The schema you created for Datadog Experiments to write to (for example, `datadog_experiments_output`).
   - **Temp S3 bucket**: The S3 bucket you created earlier (for example, `datadog-experimentation-[AWS account ID]`).

1. Click **Save**.

{{< img src="/product_analytics/experiment/guide/redshift_pa_setup.png" alt="The Redshift connection setup page in Datadog showing warehouse type tiles for Snowflake, BigQuery, Redshift (selected), and Databricks, with three sections: Select AWS Account with an AWS account dropdown, Cluster Connection with fields for AWS region, Cluster identifier, Cluster endpoint, and Port, and Database and Storage with fields for Database, Database user, Schema, and Temp S3 bucket." style="width:90%;" >}}

After you save your warehouse connection, create experiment metrics using your Redshift data. See [Create Experiment Metrics][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon-web-services/
[2]: https://app.datadoghq.com/product-analytics
[3]: https://docs.datadoghq.com/integrations/amazon-redshift/#log-collection
[4]: /experiments/defining_metrics
[5]: https://app.datadoghq.com/integrations/aws

