---
title: Connect Redshift for Warehouse-Native Experiment Analysis
description: Connect a Redshift service account to enable warehouse-native experiment analysis.
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

To set this up for Redshift, connect a Redshift cluster to Datadog using the AWS integration and configure your experiment settings. This guide covers:

- [Preparing the Redshift cluster](#step-1-prepare-the-redshift-cluster)
- [Creating AWS resources and granting IAM permissions](#step-2-create-aws-resources-and-grant-iam-permissions)
- [Configuring experiment settings in Datadog](#step-3-configure-experiment-settings)

## Prerequisites

Datadog Experiments connects to Redshift through [Datadog's Amazon Web Services (AWS) integration][1]. If you already have the AWS integration configured for the account containing your Redshift cluster, skip to [Step 1](#step-1-prepare-the-redshift-cluster).

{{% collapse-content title="Set up the AWS integration" level="h4" %}}

1. Navigate to [Datadog's integrations page][5] and search for **Amazon Web Services**.
1. Click the **Amazon Web Services** tile to open its modal.
1. Click **Add AWS Account(s)** under the **Configuration** tab.
   1. If you do not yet have the AWS integration installed, **Add AWS Account(s)** appears on the AWS landing page after you open the integration tile.
1. Follow the **CloudFormation** setup flow to create an IAM role that allows Datadog to make API calls to your AWS account:
   1. Select your **AWS Region**.
   1. Choose your **Datadog API Key**.
   1. Create a **Datadog Application Key**.
   1. Toggle off **Deploy log forwarder** and **Disable All** Log Resources (these are not needed for experiment analysis).
   1. Select **No** for **Detect security issues**.
   1. Click **Open in AWS Console** to launch your CloudFormation template. See the [Getting Started with AWS documentation][6] for instructions navigating the AWS console.

You can follow your configuration's completion steps under **Deployment Status** on the integration setup page in Datadog.

{{% /collapse-content %}}

<div class="alert alert-info">If you plan to use other warehouse observability functionality in Datadog, see <a href="https://docs.datadoghq.com/integrations/amazon-web-services/#resource-collection">Datadog's Amazon Web Services integration documentation</a> to determine which resources to enable.</div>

## Step 1: Prepare the Redshift cluster

Create a Datadog service user and a dedicated schema for Datadog to store experiment results and intermediate tables.

<div class="alert alert-info">You must have <code>superuser</code> or <code>admin</code> privileges in the Redshift database to create the Datadog service user.</div>


### Create a Datadog service user in your Redshift database

Run the following command to create a service user with a strong password that Datadog can use to execute queries. Replace `datadog_experiments_user` with your user value and `Your_Strong_Password` with your password.

```sql
CREATE USER datadog_experiments_user PASSWORD 'Your_Strong_Password';
```

### Create an output schema

Run the following commands to create a schema where Datadog can store experiment results and intermediate tables. Replace `datadog_experiments_output` with your schema name and `datadog_experiments_user` with your service user value.

```sql
CREATE SCHEMA IF NOT EXISTS datadog_experiments_output;
GRANT ALL ON SCHEMA datadog_experiments_output TO datadog_experiments_user;
```

### Grant the service user read access to your metric data

Grant the service user read access to the tables or schemas that contain your source data. These are the tables you plan to use for experiment metrics, and are typically in a different schema than the output schema created above. Run the `GRANT USAGE` command, then run the `GRANT SELECT` option that matches your access needs. Replace `datadog_experiments_user`, `<schema>`, and `<table>` with the appropriate values.

```sql
GRANT USAGE ON SCHEMA <schema> TO datadog_experiments_user;

-- Option 1: Give read access to a single table
GRANT SELECT ON TABLE <schema>.<table> TO datadog_experiments_user;

-- Option 2: Give read access to all tables in the schema
GRANT SELECT ON ALL TABLES IN SCHEMA <schema> TO datadog_experiments_user;
```

## Step 2: Create AWS resources and grant IAM permissions

### Create an S3 bucket

Create an S3 bucket for importing exposure events into your warehouse. The bucket name must start with `datadog-experimentation-` (for example, `datadog-experimentation-[aws_account_id]`). You can use the bucket's default settings.

### Grant additional IAM permissions

In addition to the permissions listed in the [AWS integration documentation][3], Datadog Experiments requires the following permissions to write data to your warehouse. Replace the placeholder fields with values from your environment.


| Field | Example |
|-------|---------|
| `[Redshift cluster ARN]` | `arn:aws:redshift:us-east-1:[account-id]:namespace:[namespace-id]` |
| `[Redshift user ARN]` | `arn:aws:redshift:us-east-1:[account-id]:dbuser:[cluster-name]/[user]` |
| `[Redshift database ARN]` | `arn:aws:redshift:us-east-1:[account-id]:dbname:[cluster-name]` |
| `[S3 bucket ARN]` | `arn:aws:s3:::[bucket-name]` |


```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RedshiftGetClusterCredentials",
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
      "Sid": "ListExperimentationBucket",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "[S3 bucket ARN]"
    },
    {
      "Sid": "ReadWriteExperimentationBucket",
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


## Step 3: Configure experiment settings

<div class="alert alert-info">Datadog supports one warehouse connection per organization. Connecting Redshift replaces any existing warehouse connection (for example, Snowflake).</div>

After you set up your AWS integration and Redshift cluster, configure the experiment settings in [Datadog Product Analytics][2]:

1. In the left navigation, hover over **Settings** and click **Experiments**.
1. Select the **Warehouse Connections** tab.
1. Click **Connect a data warehouse**. If you already have a warehouse connected, click **Edit** instead.
1. Select the **Redshift** tile.
1. Select your **AWS account** from the dropdown.
1. Under **Cluster Connection**, enter:
   - **AWS region**: The region your Redshift cluster is in (for example, `us-east-1`).
   - **Cluster identifier**: The name of your Redshift cluster.
   - **Cluster endpoint**: The full endpoint URL for your cluster.
   - **Port**: The port your cluster is listening on (default: `5439`).
1. Under **Database and Storage**, enter:
   - **Database**: The name of the database containing your source tables.
   - **Database user**: The service user you created in [Step 1](#create-a-datadog-service-user-in-your-redshift-database) (for example, `datadog_experiments_user`).
   - **Schema**: The schema you created in [Step 1](#create-an-output-schema) for Datadog Experiments to write to (for example, `datadog_experiments_output`).
   - **Temp S3 bucket**: The S3 bucket you created in [Step 2](#create-an-s3-bucket) (for example, `datadog-experimentation-[aws_account_id]`).
1. Click **Save**.

{{< img src="/product_analytics/experiment/guide/redshift_pa_setup.png" alt="The Redshift connection setup page in Datadog showing warehouse type tiles for Snowflake, BigQuery, Redshift (selected), and Databricks, with three sections: Select AWS Account with an AWS account dropdown, Cluster Connection with fields for AWS region, Cluster identifier, Cluster endpoint, and Port, and Database and Storage with fields for Database, Database user, Schema, and Temp S3 bucket." style="width:90%;" >}}

After you save your warehouse connection, create experiment metrics using your Redshift data. See [Create Experiment Metrics][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon-web-services/
[2]: https://app.datadoghq.com/product-analytics
[3]: https://docs.datadoghq.com/getting_started/integrations/aws/#prerequisites
[4]: /experiments/defining_metrics
[5]: https://app.datadoghq.com/integrations/
[6]: https://docs.datadoghq.com/getting_started/integrations/aws/

