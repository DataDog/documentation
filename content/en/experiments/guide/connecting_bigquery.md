---
title: Connect BigQuery for Warehouse-Native Experiment Analysis
description: Connect a BigQuery service account to enable warehouse native experiment analysis.
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

To set this up for BigQuery, connect a BigQuery service account to Datadog and configure your experiment settings. This guide covers:

- [Preparing the Google Cloud service account and resources](#step-1-prepare-the-google-cloud-service-account)
- [Granting IAM roles to the service account](#step-2-grant-iam-roles-to-the-service-account)
- [Configuring experiment settings in Datadog](#step-3-configure-experiment-settings)

## Step 1: Prepare the Google Cloud service account

### Connect a Google Cloud service account

Datadog connects to BigQuery using a service account created for Datadog. If you have already connected BigQuery to Datadog you can continue to use that service account for Datadog Experiments. Otherwise, see the [Google Cloud Platform integration page][1] to create a new service account.

Once you have created a service account, continue on to the next section.

<div class="alert alert-info">If you're only using the Google Cloud integration for warehouse native experiment analysis, you can opt out of collecting other resources.</div>

### Create a BigQuery dataset

Datadog Experiments uses a BigQuery dataset to cache intermediate experiment results.

1. In the Google Cloud Console, navigate to **BigQuery**.
1. Click your project, then click **Create Dataset**.
1. Enter a dataset ID (for example, `datadog_experiments_output`).
1. Select a data location and click **Create Dataset**.

### Create a Cloud Storage bucket

Datadog Experiments uses a Cloud Storage bucket to stage experiment exposure records. See [Google's documentation][2] to create a new bucket.


## Step 2: Grant IAM roles to the service account

In addition to the permissions listed in the [Google Cloud Platform integration page][1], the Datadog Experiments service account requires the following permissions:

1. [BigQuery Job User][4]: Allows the service account to run BigQuery jobs.
1. [BigQuery Data Owner][5]: Grants the service account full access to the Datadog Experiments output dataset.
1. [Storage Object User][6]: Aallows the service account to read and write objects in the storage bucket used by Datadog Experiment.
1. [BigQuery Data Viewer][7]: Allows the service account to read table used in warehouse native metrics.

To assign these roles at the project level:

1. Navigate to **IAM & Admin** > **IAM** in the Google Cloud Console.
2. Click **Grant Access**.
3. Enter the service account email in the **New principals** field.
4. Add the roles listed above, then click **Save**.

To grant read access to specific source tables:

1. Navigate to **BigQuery** in the Google Cloud Console.
1. Select the dataset containing your source tables.
1. Click **Sharing** > **Permissions**.
1. Click **Add Principal**, enter the service account email, and assign the **BigQuery Data Viewer** role.

Repeat these last four steps to grant read access to each dataset that is needed for building experiment metrics.

## Step 3: Configure experiment settings

Once your BigQuery service account is connected to Datadog, navigate to the [Experiment Warehouse Connection][8] page and click **Connect a data warehouse** to configure experiment settings.

Select the appropriate service account and project as well as the dataset and Google Cloud Storage bucket created in step 2. Click **Save** to finish the setup.

{{< img src="/product_analytics/experiment/guide/bigquery_experiment_setup.png" alt="The Edit Data Warehouse modal with BigQuery selected, showing two sections: Select BigQuery Account with fields for GCP Service Account and Project, and Dataset and GCS Bucket with fields for Dataset and GCS Bucket." style="width:90%;" >}}

After you save your warehouse connection, create experiment metrics using your BigQuery data. See [Create Experiment Metrics][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/google-cloud-platform/
[2]: https://docs.cloud.google.com/storage/docs/creating-buckets#console
[4]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.jobUser
[5]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataOwner
[6]: https://docs.cloud.google.com/iam/docs/roles-permissions/storage#storage.objectUser
[7]: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataViewer
[8]: https://app.datadoghq.com/product-analytics/experiments/settings/warehouse-connections
[9]: /experiments/defining_metrics

