---
title: Connect BigQuery for Warehouse-Native Experiment Analysis
description: Connect a BigQuery service account to enable warehouse native experiment analysis.
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

To set this up for BigQuery, connect a BigQuery service account to Datadog and configure your experiment settings. This guide covers:

- [Preparing the Google Cloud service account and resources](#step-1-prepare-the-google-cloud-service-account)
- [Granting IAM roles to the service account](#step-2-grant-iam-roles-to-the-service-account)
- [Configuring experiment settings in Datadog](#step-3-configure-experiment-settings)

## Step 1: Prepare the Google Cloud service account

### Connect a Google Cloud service account

Datadog connects to BigQuery using a service account. If you have already connected BigQuery to Datadog, you can use that service account for Datadog Experiments. Otherwise, see the [Google Cloud Platform integration page][1] to create a new service account.

<!-- Is it the Project-level steps that they must follow? https://docs.datadoghq.com/integrations/google-cloud-platform/?tab=projectlevelmetriccollection 

1. Open your Google Cloud console.
1. Navigate to IAM & Admin > Service Accounts.
1. Click on Create service account at the top.
1. Give the service account a unique name, then click Create and continue.
1. Add the following roles to the service account:
1. Monitoring Viewer provides read-only access to the monitoring data availabile in your Google Cloud environment
1. Compute Viewer provides read-only access to get and list Compute Engine resources
1. Cloud Asset Viewer provides read-only access to cloud assets metadata
1. Browser provides read-only access to discover accessible projects
1. Click Continue, then Done to complete creating the service account. -->

<div class="alert alert-info">If you plan to use other Google Cloud observability functionality in Datadog, see <a href="https://docs.datadoghq.com/integrations/google-cloud-platform/#metric-collection">Datadog's Google Cloud Platform integration documentation</a> to determine which resources to enable.</div>

### Create a BigQuery dataset

Datadog Experiments uses a BigQuery dataset to cache intermediate experiment results.

1. In the Google Cloud Console, navigate to **BigQuery**.
1. In the left navigation menu, click your project to expand sub-menu items, and select **Dataset**.
1. Click **Create Dataset** to open the panel.
1. Enter a Dataset ID (for example, `datadog_experiments_output`).
1. (Optional) Add a **Data location**, **Tags**, and scope the **Advanced options**.
1. Select a data location and click **Create Dataset**.

{{< img src="/product_analytics/experiment/exp_bq_gc_dataset.png" alt="The experiment creation form with fields for experiment name and hypothesis." style="width:100%;" >}}

### Create a Cloud Storage bucket

Datadog Experiments uses a Cloud Storage bucket to stage experiment exposure records. See [Google's documentation][2] to create a new bucket.

## Step 2: Grant IAM roles to the service account

In addition to the permissions listed in the [Google Cloud Platform integration page][1], the Datadog Experiments service account requires additional permissions for its functions in your data warehouse.

### Assign additional roles at the project level

1. Navigate to **IAM & Admin** > **IAM** in the Google Cloud Console.
1. Click **Grant access**, under the **Allow** tab.
1. Enter the service account email in the **New principals** field.
1. Add the following roles using the **Select a role** dropdown:
   1. [BigQuery Job User][4]: Allows the service account to run BigQuery jobs.
   1. [BigQuery Data Owner][5]: Grants the service account full access to the Datadog Experiments output dataset.
   1. [Storage Object User][6]: Allows the service account to read and write objects in the storage bucket used by Datadog Experiments.
   1. [BigQuery Data Viewer][7]: Allows the service account to read tables used in warehouse-native metrics.
1. Click **Save**.

{{< img src="/product_analytics/experiment/exp_bq_gc_iam.png" alt="The experiment creation form with fields for experiment name and hypothesis." style="width:100%;" >}}


### Grant read access to specific source tables
Repeat these steps for each dataset needed for building experiment metrics:

1. Navigate to **BigQuery** in the Google Cloud Console.
1. Select the dataset containing your source tables.
1. Click **Sharing** > **Permissions**.
1. Click **Add Principal**, enter the service account email, and assign the **BigQuery Data Viewer** role.

## Step 3: Configure experiment settings

After you set up your Google Cloud resources and IAM roles, configure the experiment settings in Datadog.

<div class="alert alert-info">Datadog supports one warehouse connection per organization. Connecting BigQuery replaces any existing warehouse connection (for example, Snowflake).</div>

1. Navigate to [Product Analytics][10]. In the left navigation, hover over **Settings** and click **Experiments**.
1. Select the **Warehouse Connections** tab.
1. Click **Connect a data warehouse**. If you already have a warehouse connected, click **Edit** instead.
1. Select the **BigQuery** tile.
1. Under **Select BigQuery Account**, enter:
   - **GCP Service Account**: The service account you configured in [Step 1](#connect-a-google-cloud-service-account).
   - **Project**: Your Google Cloud project.
1. Under **Dataset and GCS Bucket**, enter:
   - **Dataset**: The dataset you created in [Step 1](#create-a-bigquery-dataset) (for example, `datadog_experiments_output`).
   - **GCS Bucket**: The Cloud Storage bucket you created in [Step 1](#create-a-cloud-storage-bucket).
1. Click **Save**.

{{< img src="/product_analytics/experiment/guide/bigquery_experiment_setup.png" alt="The Edit Data Warehouse modal with BigQuery selected, showing two sections: Select BigQuery Account with fields for GCP Service Account and Project, and Dataset and GCS Bucket with fields for Dataset and GCS Bucket." style="width:90%;" >}}

After you save your warehouse connection, create experiment metrics using your BigQuery data. See [Create Experiment Metrics][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/google-cloud-platform/
[2]: https://docs.cloud.google.com/storage/docs/creating-buckets#console
[4]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.jobUser
[5]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataOwner
[6]: https://docs.cloud.google.com/iam/docs/roles-permissions/storage#storage.objectUser
[7]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataViewer
[8]: https://app.datadoghq.com/product-analytics/experiments/settings/warehouse-connections
[9]: /experiments/defining_metrics
[10]: https://app.datadoghq.com/product-analytics

