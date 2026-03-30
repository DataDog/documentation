---
title: Connect BigQuery for Warehouse-Native Experiment Analysis
description: Connect a BigQuery service account to enable warehouse-native experiment analysis.
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

- [Preparing Google Cloud resources](#step-1-prepare-the-google-cloud-resources)
- [Granting IAM roles to the service account](#step-2-grant-iam-roles-to-the-service-account)
- [Configuring experiment settings in Datadog](#step-3-configure-experiment-settings)

## Prerequisite

Datadog connects to BigQuery through a Google Cloud service account. If you already have a service account connected to Datadog, skip to [Step 1](#step-1-prepare-the-google-cloud-resources). Otherwise, expand the section below to create one.

{{% collapse-content title="Create a service account" level="h4" %}}

1. Open your [Google Cloud console][1].
1. Navigate to **IAM & Admin** > **Service Accounts**.
1. Click **Create service account**.
1. Enter the following:
    1. **Service account name**.
    1. **Service account ID** (this is required and must be unique).
    1. **Service account description**.
1. Click **Create and continue**.
1. Optionally, add **Permissions** and **Principals with access**.
1. Click **Done** to complete creating the service account.

{{% /collapse-content %}}

<div class="alert alert-info">If you plan to use other Google Cloud observability functionality in Datadog, see <a href="https://docs.datadoghq.com/integrations/google-cloud-platform/#metric-collection">Datadog's Google Cloud Platform integration documentation</a> to determine which resources to enable.</div>

## Step 1: Prepare the Google Cloud resources

Datadog Experiments uses a BigQuery dataset and a Cloud Storage bucket for caching and staging experiment results.

### Create a BigQuery dataset

To create a BigQuery dataset for Datadog Experiments to cache intermediate experiment results:

1. Open your [Google Cloud console][1].
1. In the **Search** bar, search for **BigQuery**.
1. In the **Explorer** navigation menu, click your project (for example, `datadog-sandbox`) to expand its sub-menu items.
1. Select **Datasets**, then click **Create dataset**.
   {{< img src="/product_analytics/experiment/exp_bq_gc_create_dataset.png" alt="The BigQuery Datasets page in the Google Cloud console showing the datadog-sandbox project expanded in the left Explorer menu with Datasets selected, a list of datasets with columns for Dataset ID, Type, Location, Create time, and Label, and the Create dataset button highlighted in the top right." style="width:100%;" >}}
1. Enter a **Dataset ID** (for example, `datadog_experiments_output`).
1. (Optional) Select a **Data location** from the dropdown, add **Tags**, and set **Advanced options**.
1. Click **Create dataset**.

### Create a Cloud Storage bucket

See Google's [Create a bucket][2] documentation to create a Cloud Storage bucket that Datadog Experiments can use to stage experiment exposure records.

## Step 2: Grant IAM roles to the service account

The Datadog Experiments service account requires specific permissions to run warehouse-native experiment analysis.

### Assign IAM roles at the project level

To assign IAM roles so Datadog Experiments can read and write data, and run jobs in your data warehouse:

1. Open your [Google Cloud console][1] and navigate to **IAM & Admin** > **IAM**.
1. Select the **Allow** tab and click **Grant access**.
1. In the **New principals** field, enter the service account email.
1. Add the following roles using the **Select a role** dropdown:
   1. [BigQuery Job User][4]: Allows the service account to run BigQuery jobs.
   1. [BigQuery Data Owner][5]: Grants the service account full access to the Datadog Experiments output dataset.
   1. [Storage Object User][6]: Allows the service account to read and write objects in the storage bucket used by Datadog Experiments.
   1. [BigQuery Data Viewer][7]: Allows the service account to read tables used in warehouse-native metrics.
1. Click **Save**.

   {{< img src="/product_analytics/experiment/exp_bq_gc_iam_role.png" alt="The Google Cloud IAM page showing the Grant access panel for a project, with the Grant access button highlighted on the left, a New principals field highlighted in the Add principals section, and a Select a role dropdown highlighted in the Assign roles section." style="width:100%;" >}}

### Grant read access to specific source tables

Repeat the following steps for each dataset you need to build experiment metrics:

1. In the [Google Cloud console][1] **Search** bar, search for **BigQuery**.
1. In the Explorer navigation menu, click your project (for example, `datadog-sandbox`) to expand its sub-menu items.
1. Click **Datasets**. From the list, select the **Dataset ID** containing your source tables.
1. Click the **Share** dropdown and select **Manage permissions**.
   {{< img src="/product_analytics/experiment/exp_bq_gc_permissions.png" alt="The BigQuery dataset page with the Share dropdown expanded and Manage permissions highlighted, showing additional options including Copy link, Authorize Views, Authorize Routines, Authorize Datasets, Manage Subscriptions, and Publish as Listing." style="width:100%;" >}}
1. Click **Add principal**.
1. In the **New principals** field, enter the service account email.
1. Using the **Select a role** dropdown, select the **BigQuery Data Viewer** role to grant Datadog Experiments access to view the dataset and all of its content.
1. Click **Save**.

## Step 3: Configure experiment settings

<div class="alert alert-info">Datadog supports one warehouse connection per organization. Connecting BigQuery replaces any existing warehouse connection (for example, Snowflake).</div>

After you set up your Google Cloud resources and IAM roles, configure the experiment settings in Datadog:

1. Open [Datadog Product Analytics][10].
1. In the left navigation, hover over **Settings** and click **Experiments**.
1. Select the **Warehouse Connections** tab.
1. Click **Connect a data warehouse**. If you already have a warehouse connected, click **Edit** instead.
1. Select the **BigQuery** tile.
1. Under **Select BigQuery Account**, enter:
   - **GCP service account**: The [service account](#prerequisite) you are using for Datadog Experiments.
   - **Project**: Your Google Cloud project.
1. Under **Dataset and GCS Bucket**, enter:
   - **Dataset**: The dataset you created in [Step 1](#create-a-bigquery-dataset) (for example, `datadog_experiments_output`).
   - **GCS Bucket**: The Cloud Storage bucket you created in [Step 1](#create-a-cloud-storage-bucket).
1. Click **Save**.

{{< img src="/product_analytics/experiment/guide/bigquery_experiment_setup.png" alt="The Edit Data Warehouse modal with BigQuery selected, showing two sections: Select BigQuery Account with fields for GCP Service Account and Project, and Dataset and GCS Bucket with fields for Dataset and GCS Bucket." style="width:90%;" >}}

After you save your warehouse connection, create experiment metrics using your BigQuery data. See [Create Experiment Metrics][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.cloud.google.com/
[2]: https://docs.cloud.google.com/storage/docs/creating-buckets#console
[4]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.jobUser
[5]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataOwner
[6]: https://docs.cloud.google.com/iam/docs/roles-permissions/storage#storage.objectUser
[7]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataViewer
[9]: /experiments/defining_metrics
[10]: https://app.datadoghq.com/product-analytics/
