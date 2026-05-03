---
title: Connect your Data Warehouse for Warehouse-Native Experiment Analysis
description: Connect a data warehouse to Datadog to enable warehouse-native experiment analysis.
aliases:
  - /experiments/guide/connecting_bigquery/
  - /experiments/guide/connecting_databricks/
  - /experiments/guide/connecting_redshift/
  - /experiments/guide/connecting_snowflake/
further_reading:
- link: "/experiments/defining_metrics"
  tag: "Documentation"
  text: "Defining metrics in Datadog Experiments"
- link: "https://www.datadoghq.com/blog/experimental-data-datadog/"
  tag: "Blog"
  text: "How to bridge speed and quality in experiments through unified data"
content_filters:
  - trait_id: database
    option_group_id: experiments_warehouse_options
    label: "Data warehouse"
---

## Overview

Warehouse-native experiment analysis lets you run statistical computations directly in your data warehouse.

<!-- BigQuery -->
{% if equals($database, "bigquery") %}

To set this up for BigQuery, connect a BigQuery service account to Datadog and configure your experiment settings. This guide covers:

- [Preparing Google Cloud resources](#step-1-prepare-the-google-cloud-resources)
- [Granting permissions to the Datadog service account](#step-2-grant-permissions-to-the-datadog-service-account)
- [Configuring experiment settings in Datadog](#step-3-configure-experiment-settings)

## Prerequisites

Datadog connects to BigQuery through a Google Cloud service account. If you already have a service account connected to Datadog, skip to [Step 1](#step-1-prepare-the-google-cloud-resources). Otherwise, expand the section below to create one.

{% collapse-content title="Create a Google Cloud service account" level="h4" %}

1. Open your [Google Cloud console][4].
1. Navigate to **IAM & Admin** > **Service Accounts**.
1. Click **Create service account**.
1. Enter the following:
    1. **Service account name**.
    1. **Service account ID**.
    1. **Service account description**.
1. Click **Create and continue**.
   1. **Note**: The **Permissions** and **Principals with access** settings are optional here. These are configured in [Step 2](#step-2-grant-permissions-to-the-datadog-service-account).
1. Click **Done**.

After you create the service account, continue to [Step 1](#step-1-prepare-the-google-cloud-resources) to set up the Google Cloud resources.

{% /collapse-content %}

{% alert %}
If you plan to use other Google Cloud observability functionality in Datadog, see [Datadog's Google Cloud Platform integration documentation][10] to determine which resources to enable.
{% /alert %}

## Step 1: Prepare the Google Cloud resources

Datadog Experiments uses a BigQuery dataset for caching experiment results and a Cloud Storage bucket for staging experiment records.

### Create a BigQuery dataset

1. Open your [Google Cloud console][4].
1. In the **Search** bar, search for **BigQuery**.
1. In the **Explorer** panel, expand your project (for example, `datadog-sandbox`).
1. Select **Datasets**, then click **Create dataset**.
   {% img src="/product_analytics/experiment/exp_bq_gc_create_dataset.png" alt="The BigQuery Datasets page in the Google Cloud console showing the datadog-sandbox project expanded in the left Explorer menu with Datasets selected, a list of datasets with columns for Dataset ID, Type, Location, Create time, and Label, and the Create dataset button highlighted in the top right." style="width:100%;" /%}
1. Enter a **Dataset ID** (for example, `datadog_experiments_output`).
1. (Optional) Select a **Data location** from the dropdown, add **Tags**, and set **Advanced options**.
1. Click **Create dataset**.

### Create a Cloud Storage bucket

Create a Cloud Storage bucket that Datadog Experiments can use to stage experiment exposure records. See Google's [Create a bucket][5] documentation.

## Step 2: Grant permissions to the Datadog service account

The Datadog Experiments service account requires specific permissions to run warehouse-native experiment analysis.

### Assign IAM roles at the project level

To assign IAM roles so Datadog Experiments can read and write data, and run jobs in your data warehouse:

1. Open your [Google Cloud console][4] and navigate to **IAM & Admin** > **IAM**.
1. Select the **Allow** tab and click **Grant access**.
1. In the **New principals** field, enter the service account email.
1. Using the **Select a role** dropdown, add the following roles:
   1. [BigQuery Job User][6]: Allows the service account to run BigQuery jobs.
   1. [BigQuery Data Owner][7]: Grants the service account full access to the Datadog Experiments output dataset.
   1. [Storage Object User][8]: Allows the service account to read and write objects in the storage bucket that Datadog Experiments uses.
   1. [BigQuery Data Viewer][9]: Allows the service account to read tables used in warehouse-native metrics.
1. Click **Save**.

{% img src="/product_analytics/experiment/exp_bq_gc_iam_role.png" alt="The Google Cloud IAM page showing the Grant access panel for a project, with the Grant access button highlighted on the left, a New principals field highlighted in the Add principals section, and a Select a role dropdown highlighted in the Assign roles section." style="width:100%;" /%}

### Grant read access to specific source tables

Repeat the following steps for each dataset you plan to use for experiment metrics:

1. In the [Google Cloud console][4] **Search** bar, search for **BigQuery**.
1. In the **Explorer** panel, expand your project (for example, `datadog-sandbox`).
1. Click **Datasets**, then select the dataset containing your source tables.
1. Click the **Share** dropdown and select **Manage permissions**.
   {% img src="/product_analytics/experiment/exp_bq_gc_permissions.png" alt="The BigQuery dataset page with the Share dropdown expanded and Manage permissions highlighted, showing additional options including Copy link, Authorize Views, Authorize Routines, Authorize Datasets, Manage Subscriptions, and Publish as Listing." style="width:100%;" /%}
1. Click **Add principal**.
1. In the **New principals** field, enter the service account email.
1. Using the **Select a role** dropdown, select the **BigQuery Data Viewer** role.
1. Click **Save**.

{% /if %}
<!-- end BigQuery -->

<!-- Databricks -->
{% if equals($database, "databricks") %}

To set this up for Databricks, connect a Databricks service account to Datadog and configure your experiment settings. This guide covers:

- [Granting permissions to the service principal](#step-1-grant-permissions-to-the-service-principal)
- [Connecting Databricks to Datadog](#step-2-connect-databricks-to-datadog)
- [Configuring experiment settings in Datadog](#step-3-configure-experiment-settings)

## Prerequisites

Datadog Experiments connects to Databricks through the [Datadog Databricks integration][11]. If you already have a Databricks integration configured for the workspace you plan to use, skip to [Step 1](#step-1-grant-permissions-to-the-service-principal). Otherwise, expand the section below to create a service principal.

{% collapse-content title="Create a Databricks service principal" level="h4" %}

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

{% /collapse-content %}

{% alert %}
If you plan to use other warehouse observability functionality in Datadog, see [Datadog's Databricks integration documentation][13] to determine which resources to enable.
{% /alert %}

## Step 1: Grant permissions to the service principal

{% alert %}
You must be an account admin to grant these permissions.
{% /alert %}

In your Databricks Workspace, open the **SQL Editor** to run the following commands and grant the service principal permissions for warehouse-native experiment analysis.

{% img src="/product_analytics/experiment/guide/databricks_experiments_sql_editor.png" alt="The Databricks Workspace with SQL Editor highlighted in the left navigation under the SQL section, Queries listed below it, a New Query tab open with the New SQL editor: ON toggle at the top, an empty query editor, and a Run all (1000) button with a dropdown arrow." style="width:90%;" /%}

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

Datadog Experiments uses a [volume][12] to temporarily save exposure data before copying it into a Databricks table. Run the following commands to create and grant access to this volume. Replace `datadog_experiments_output` with your output schema name, and `<catalog>` and `<principal>` with the appropriate values.

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

1. Navigate to [Datadog's integrations page][3] and search for **Databricks**.
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

{% /if %}
<!-- end Databricks -->

<!-- Redshift -->
{% if equals($database, "redshift") %}

To set this up for Amazon Redshift, connect a Redshift cluster to Datadog using the AWS integration and configure your experiment settings. This guide covers:

- [Preparing the Redshift cluster](#step-1-prepare-the-redshift-cluster)
- [Creating AWS resources and granting IAM permissions](#step-2-create-aws-resources-and-grant-iam-permissions)
- [Configuring experiment settings in Datadog](#step-3-configure-experiment-settings)

## Prerequisites

Datadog Experiments connects to Redshift through [Datadog's Amazon Web Services (AWS) integration][14]. If you already have the AWS integration configured for the account containing your Redshift cluster, skip to [Step 1](#step-1-prepare-the-redshift-cluster).

{% collapse-content title="Set up the AWS integration" level="h4" %}

{% alert %}
Adding an AWS account requires the **AWS Configurations Manage** permission. If your organization uses custom roles, verify that your role includes this permission.
{% /alert %}

1. Navigate to [Datadog's integrations page][3] and search for **Amazon Web Services**.
1. Click the **Amazon Web Services** tile to open its modal.
1. Click **Add AWS Account(s)** under the **Configuration** tab.
   1. If you do not yet have the AWS integration installed, **Add AWS Account(s)** appears on the AWS landing page after you open the integration tile.
1. Follow the **CloudFormation** setup flow to create an IAM role that allows Datadog to make API calls to your AWS account:
   1. Select your **AWS Region**.
   1. Choose your **Datadog API Key**.
   1. Create a **Datadog Application Key**.
   1. Toggle off **Deploy log forwarder** and **Disable All** Log Resources (these are not needed for experiment analysis).
   1. Select **No** for **Detect security issues**.
   1. Click **Open in AWS Console** to launch your CloudFormation template. See the [Getting Started with AWS documentation][16] for instructions on navigating the AWS console.

You can follow your configuration's completion steps under **Deployment Status** on the integration setup page in Datadog.

{% /collapse-content %}

{% alert %}
If you plan to use other warehouse observability functionality in Datadog, see [Datadog's Amazon Web Services integration documentation][17] to determine which resources to enable.
{% /alert %}

## Step 1: Prepare the Redshift cluster

Create a Datadog service user and a dedicated schema for Datadog to store experiment results and intermediate tables.

{% alert %}
You must have `superuser` or `admin` privileges in the Redshift database to create the Datadog service user.
{% /alert %}

### Create a Datadog service user in your Redshift database

Run the following command to create a service user with a strong password that Datadog can use to execute queries. Replace `datadog_experiments_user` with your user value and `Your_Strong_Password` with your password.

```sql
CREATE USER datadog_experiments_user PASSWORD 'Your_Strong_Password';
```

### Create a Redshift output schema

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

In addition to the permissions listed in the [AWS integration documentation][15], Datadog Experiments requires additional IAM permissions to run warehouse-native experiment analysis.

Use the following table to gather the values for your environment, then add the policy statement below to the IAM role that your Datadog AWS integration uses.

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

{% /if %}
<!-- end Redshift -->

<!-- Snowflake -->
{% if equals($database, "snowflake") %}

To set this up for Snowflake, connect a Snowflake service account to Datadog and configure your experiment settings. This guide covers:

- [Preparing a Snowflake service account](#step-1-prepare-the-snowflake-service-account)
- [Connecting it to Datadog](#step-2-connect-snowflake-to-datadog)
- [Configuring experiment settings](#step-3-configure-experiment-settings)

## Step 1: Prepare the Snowflake service account

The examples in this guide use `datadog_experiments_user` and `datadog_experiments_role` as the service account's user and role. Replace these with your own values.

### Create a dedicated service user and role in Snowflake

1. Use the [Snowflake documentation][18] to create a public-private key pair for enhanced authentication. Datadog only supports unencrypted private keys.
1. Run the following commands in Snowflake to create the user and role in the service account. Replace `<public_key>` with the public key you generated in the previous step.

```sql
USE ROLE ACCOUNTADMIN;
CREATE ROLE IF NOT EXISTS datadog_experiments_role;
CREATE USER IF NOT EXISTS datadog_experiments_user
    RSA_PUBLIC_KEY = '<public_key>';
GRANT ROLE datadog_experiments_role TO USER datadog_experiments_user;
ALTER USER datadog_experiments_user SET DEFAULT_ROLE = datadog_experiments_role;
```

### Grant privileges to the role

1. Identify the tables in Snowflake from which you intend to create metrics.
1. Run the following commands to grant read privileges to the new role, replacing `<database>`, `<schema>`, and `<table>` with their appropriate values. Run both `GRANT USAGE` commands, then run the `GRANT SELECT` option or options that match your access needs.

```sql
GRANT USAGE ON DATABASE <database> TO ROLE datadog_experiments_role;
GRANT USAGE ON SCHEMA <database>.<schema> TO ROLE datadog_experiments_role;

-- Option 1: Give read access to a single table
GRANT SELECT ON TABLE <database>.<schema>.<table> TO ROLE datadog_experiments_role;

-- Option 2: Give read access to all existing tables in the schema
GRANT SELECT ON ALL TABLES IN SCHEMA <database>.<schema> TO ROLE datadog_experiments_role;

-- Option 3: Give read access to all future tables in the schema
GRANT SELECT ON FUTURE TABLES IN SCHEMA <database>.<schema> TO ROLE datadog_experiments_role;
```

### Grant the role access to the output schema

Datadog writes experiment exposure logs and intermediate metric results to tables in a dedicated output schema. Run the following commands to create the schema and grant the role full access. Replace `<database>` with the appropriate value.

```sql
CREATE SCHEMA IF NOT EXISTS <database>.datadog_experiments_output;
GRANT ALL ON SCHEMA <database>.datadog_experiments_output TO ROLE datadog_experiments_role;
GRANT ALL PRIVILEGES ON FUTURE TABLES IN SCHEMA <database>.datadog_experiments_output TO ROLE datadog_experiments_role;
```

### Create a dedicated warehouse for Datadog Experiments (optional)

{% alert %}
The [role you created](#create-a-dedicated-service-user-and-role-in-snowflake) must have access to at least one warehouse to compute results. You must enter the warehouse name when configuring experiment settings in [Step 3](#step-3-configure-experiment-settings).
{% /alert %}

Creating a dedicated warehouse for Datadog Experiments is optional. Run the following commands to create one. Replace `<wh_size>` with the appropriate value.

```sql
CREATE WAREHOUSE IF NOT EXISTS datadog_experiments_wh
    WAREHOUSE_SIZE = <wh_size>
    AUTO_SUSPEND = 300
    INITIALLY_SUSPENDED = true;
GRANT ALL PRIVILEGES ON WAREHOUSE datadog_experiments_wh TO ROLE datadog_experiments_role;
```

## Step 2: Connect Snowflake to Datadog

To connect your Snowflake account to Datadog for warehouse-native experiment analysis:

1. Navigate to [Datadog's integrations page][3] and search for **Snowflake**.
1. Click the **Snowflake** tile to open its modal.
1. Select the **Configure** tab and click **Add Snowflake Account**.
1. Add your **Account URL**. To find your account URL, see the [Snowflake guide][19].
1. Toggle off all resources (these are not needed for experiment analysis).
1. Enter the Snowflake **User Name** you created in [Step 1](#step-1-prepare-the-snowflake-service-account) (for example, `datadog_experiments_user`).
1. Scroll to the **Configure a key pair authentication** section and upload your unencrypted **private key**.
1. Click **Save**.

{% alert %}
The grants in the **Recommended Warehouse Settings** section of the Snowflake integration tile are not needed for warehouse-native experiment analysis. The privileges granted in [Step 1](#grant-privileges-to-the-role) are sufficient.

If you plan to use other warehouse observability functionality in Datadog, see [Datadog's Snowflake integration documentation][20] to determine which resources to enable.
{% /alert %}

{% img src="/product_analytics/experiment/guide/snowflake_main_integration.png" alt="The Snowflake integration tile in Datadog showing the Configure tab with the Add a new Snowflake account form, including an Account URL field and resource toggles for Metrics and Logs." style="width:90%;" /%}

{% /if %}
<!-- end Snowflake -->

## Step 3: Configure experiment settings

<!-- BigQuery Step 3 -->
{% if equals($database, "bigquery") %}

{% alert %}
Datadog supports one warehouse connection per organization. Connecting BigQuery replaces any existing warehouse connection (for example, Snowflake).
{% /alert %}

After you set up your Google Cloud resources and IAM roles, configure the experiment settings in Datadog:

1. Open [Datadog Product Analytics][2].
1. In the left navigation, hover over **Settings** and click **Experiments**.
1. Select the **Warehouse Connections** tab.
1. Click **Connect a data warehouse**. If you already have a warehouse connected, click **Edit** instead.
1. Select the **BigQuery** tile.
1. Under **Select BigQuery Account**, enter:
   - **GCP service account**: The [service account](#prerequisites) you are using for Datadog Experiments.
   - **Project**: Your Google Cloud project.
1. Under **Dataset and GCS Bucket**, enter:
   - **Dataset**: The dataset you created in [Step 1](#create-a-bigquery-dataset) (for example, `datadog_experiments_output`).
   - **GCS Bucket**: The Cloud Storage bucket you created in [Step 1](#create-a-cloud-storage-bucket).
1. Click **Save**.

{% img src="/product_analytics/experiment/guide/bigquery_experiment_setup_dd.png" alt="The Edit Data Warehouse modal with BigQuery selected, showing two sections: Select BigQuery Account with fields for GCP service account and Project, and Dataset and GCS Bucket with fields for Dataset and GCS Bucket." style="width:90%;" /%}

After you save your warehouse connection, [create experiment metrics][1] using your BigQuery data.

{% /if %}
<!-- end BigQuery Step 3 -->

<!-- Databricks Step 3 -->
{% if equals($database, "databricks") %}

{% alert %}
Datadog supports one warehouse connection per organization. Connecting Databricks replaces any existing warehouse connection (for example, Snowflake).
{% /alert %}

After you set up your Databricks integration and workspace, configure the experiment settings in Datadog:

1. Open [Datadog Product Analytics][2].
1. In the left navigation, hover over **Settings** and click **Experiments**.
1. Select the **Warehouse Connections** tab.
1. Click **Connect a data warehouse**. If you already have a warehouse connected, click **Edit** instead.
1. Select the **Databricks** tile.
1. Using the **Account** dropdown, select the Databricks Workspace you configured in [Step 2](#step-2-connect-databricks-to-datadog).
1. Enter the **Catalog**, **Schema**, and **Volume name** you configured in [Step 1](#step-1-grant-permissions-to-the-service-principal). If your catalog and schema do not appear in the dropdown, enter them manually to add them to the list.
1. Click **Save**.

{% img src="/product_analytics/experiment/guide/databricks_experiment_setup_1.png" alt="The Edit Data Warehouse modal with Databricks selected, showing input fields for Account, Catalog, Schema, and Volume Name." style="width:90%;" /%}

After you save your warehouse connection, [create experiment metrics][1] using your Databricks data.

{% /if %}
<!-- end Databricks Step 3 -->

<!-- Redshift Step 3 -->
{% if equals($database, "redshift") %}

{% alert %}
Datadog supports one warehouse connection per organization. Connecting Redshift replaces any existing warehouse connection (for example, Snowflake).

Configuring experiment settings requires the **Product Analytics Settings Write** permission. If your organization uses custom roles, verify that your role includes this permission.
{% /alert %}

After you set up your AWS integration and Redshift cluster, configure the experiment settings in Datadog:

1. Open [Datadog Product Analytics][2].
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
   - **Schema**: The schema you created in [Step 1](#create-a-redshift-output-schema) for Datadog Experiments to write to (for example, `datadog_experiments_output`).
   - **Temp S3 bucket**: The S3 bucket you created in [Step 2](#create-an-s3-bucket) (for example, `datadog-experimentation-[aws_account_id]`).
1. Click **Save**.

{% img src="/product_analytics/experiment/guide/redshift_pa_setup.png" alt="The Redshift connection setup page in Datadog showing warehouse type tiles for Snowflake, BigQuery, Redshift (selected), and Databricks, with three sections: Select AWS Account with an AWS account dropdown, Cluster Connection with fields for AWS region, Cluster identifier, Cluster endpoint, and Port, and Database and Storage with fields for Database, Database user, Schema, and Temp S3 bucket." style="width:90%;" /%}

After you save your warehouse connection, [create experiment metrics][1] using your Redshift data.

{% /if %}
<!-- end Redshift Step 3 -->

<!-- Snowflake Step 3 -->
{% if equals($database, "snowflake") %}

{% alert %}
Datadog supports one warehouse connection per organization. Connecting Snowflake replaces any existing warehouse connection (for example, Redshift).
{% /alert %}

After you set up your Snowflake integration, configure the experiment settings in [Datadog Product Analytics][2]:

1. In the left navigation, hover over **Settings**, then click **Experiments**.
1. Select the **Warehouse Connections** tab.
1. Click **Connect a data warehouse**. If you already have a warehouse connected, click **Edit** instead.
1. Select the **Snowflake** tile.
1. Enter the **Account**, **Role**, **Warehouse**, **Database**, and **Schema** you configured in [Step 1](#step-1-prepare-the-snowflake-service-account). If your database and schema do not appear in the dropdown, enter them manually to add them to the list.
1. Click **Save**.

{% img src="/product_analytics/experiment/guide/snowflake_experiment_setup.png" alt="The Edit Data Warehouse modal with Snowflake selected, showing two sections: Select Snowflake Account with fields for Account, Role, and Warehouse, and Select Database and Schema with fields for Database and Schema." style="width:90%;" /%}

After you save your warehouse connection, create experiment metrics using your Snowflake data. See [Create Experiment Metrics][1].

{% /if %}
<!-- end Snowflake Step 3 -->

[1]: /experiments/defining_metrics
[2]: https://app.datadoghq.com/product-analytics
[3]: https://app.datadoghq.com/integrations/
[4]: https://console.cloud.google.com/
[5]: https://docs.cloud.google.com/storage/docs/creating-buckets#console
[6]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.jobUser
[7]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataOwner
[8]: https://docs.cloud.google.com/iam/docs/roles-permissions/storage#storage.objectUser
[9]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataViewer
[10]: https://docs.datadoghq.com/integrations/google-cloud-platform/#metric-collection
[11]: https://docs.datadoghq.com/integrations/databricks/?tab=useaserviceprincipalforoauth
[12]: https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-volumes
[13]: https://docs.datadoghq.com/integrations/databricks/
[14]: https://docs.datadoghq.com/integrations/amazon-web-services/
[15]: https://docs.datadoghq.com/getting_started/integrations/aws/#prerequisites
[16]: https://docs.datadoghq.com/getting_started/integrations/aws/
[17]: https://docs.datadoghq.com/integrations/amazon-web-services/#resource-collection
[18]: https://docs.snowflake.com/en/user-guide/key-pair-auth
[19]: https://docs.snowflake.com/en/user-guide/organizations-connect
[20]: https://docs.datadoghq.com/integrations/snowflake-web/
