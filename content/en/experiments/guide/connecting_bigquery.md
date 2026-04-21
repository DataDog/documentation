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
- [Granting permissions to the Datadog service account](#step-2-grant-permissions-to-the-datadog-service-account)
- [Configuring experiment settings in Datadog](#step-3-configure-experiment-settings)

## Prerequisites

Datadog connects to BigQuery through a Google Cloud service account. If you already have a service account connected to Datadog, skip to [Step 1](#step-1-prepare-the-google-cloud-resources). Otherwise, expand the section below to create one.

{{% collapse-content title="Create a Google Cloud service account" level="h4" %}}

1. Open your [Google Cloud console][1].
1. Navigate to {{< ui >}}IAM & Admin{{< /ui >}} > {{< ui >}}Service Accounts{{< /ui >}}.
1. Click {{< ui >}}Create service account{{< /ui >}}.
1. Enter the following:
    1. {{< ui >}}Service account name{{< /ui >}}.
    1. {{< ui >}}Service account ID{{< /ui >}}.
    1. {{< ui >}}Service account description{{< /ui >}}.
1. Click {{< ui >}}Create and continue{{< /ui >}}.
   1. **Note**: The {{< ui >}}Permissions{{< /ui >}} and {{< ui >}}Principals with access{{< /ui >}} settings are optional here. These are configured in [Step 2](#step-2-grant-permissions-to-the-datadog-service-account).
1. Click {{< ui >}}Done{{< /ui >}}.

After you create the service account, continue to [Step 1](#step-1-prepare-the-google-cloud-resources) to set up the Google Cloud resources.

{{% /collapse-content %}}

<div class="alert alert-info">If you plan to use other Google Cloud observability functionality in Datadog, see <a href="https://docs.datadoghq.com/integrations/google-cloud-platform/#metric-collection">Datadog's Google Cloud Platform integration documentation</a> to determine which resources to enable.</div>

## Step 1: Prepare the Google Cloud resources

Datadog Experiments uses a BigQuery dataset for caching experiment results and a Cloud Storage bucket for staging experiment records.

### Create a BigQuery dataset

1. Open your [Google Cloud console][1].
1. In the {{< ui >}}Search{{< /ui >}} bar, search for {{< ui >}}BigQuery{{< /ui >}}.
1. In the {{< ui >}}Explorer{{< /ui >}} panel, expand your project (for example, `datadog-sandbox`).
1. Select {{< ui >}}Datasets{{< /ui >}}, then click {{< ui >}}Create dataset{{< /ui >}}.
   {{< img src="/product_analytics/experiment/exp_bq_gc_create_dataset.png" alt="The BigQuery Datasets page in the Google Cloud console showing the datadog-sandbox project expanded in the left Explorer menu with Datasets selected, a list of datasets with columns for Dataset ID, Type, Location, Create time, and Label, and the Create dataset button highlighted in the top right." style="width:100%;" >}}
1. Enter a {{< ui >}}Dataset ID{{< /ui >}} (for example, `datadog_experiments_output`).
1. (Optional) Select a {{< ui >}}Data location{{< /ui >}} from the dropdown, add {{< ui >}}Tags{{< /ui >}}, and set {{< ui >}}Advanced options{{< /ui >}}.
1. Click {{< ui >}}Create dataset{{< /ui >}}.

### Create a Cloud Storage bucket

Create a Cloud Storage bucket that Datadog Experiments can use to stage experiment exposure records. See Google's [Create a bucket][2] documentation.

## Step 2: Grant permissions to the Datadog service account

The Datadog Experiments service account requires specific permissions to run warehouse-native experiment analysis.

### Assign IAM roles at the project level

To assign IAM roles so Datadog Experiments can read and write data, and run jobs in your data warehouse:

1. Open your [Google Cloud console][1] and navigate to {{< ui >}}IAM & Admin{{< /ui >}} > {{< ui >}}IAM{{< /ui >}}.
1. Select the {{< ui >}}Allow{{< /ui >}} tab and click {{< ui >}}Grant access{{< /ui >}}.
1. In the {{< ui >}}New principals{{< /ui >}} field, enter the service account email.
1. Using the {{< ui >}}Select a role{{< /ui >}} dropdown, add the following roles:
   1. [BigQuery Job User][4]: Allows the service account to run BigQuery jobs.
   1. [BigQuery Data Owner][5]: Grants the service account full access to the Datadog Experiments output dataset.
   1. [Storage Object User][6]: Allows the service account to read and write objects in the storage bucket that Datadog Experiments uses.
   1. [BigQuery Data Viewer][7]: Allows the service account to read tables used in warehouse-native metrics.
1. Click {{< ui >}}Save{{< /ui >}}.

{{< img src="/product_analytics/experiment/exp_bq_gc_iam_role.png" alt="The Google Cloud IAM page showing the Grant access panel for a project, with the Grant access button highlighted on the left, a New principals field highlighted in the Add principals section, and a Select a role dropdown highlighted in the Assign roles section." style="width:100%;" >}}

### Grant read access to specific source tables

Repeat the following steps for each dataset you plan to use for experiment metrics:

1. In the [Google Cloud console][1] {{< ui >}}Search{{< /ui >}} bar, search for {{< ui >}}BigQuery{{< /ui >}}.
1. In the {{< ui >}}Explorer{{< /ui >}} panel, expand your project (for example, `datadog-sandbox`).
1. Click {{< ui >}}Datasets{{< /ui >}}, then select the dataset containing your source tables.
1. Click the {{< ui >}}Share{{< /ui >}} dropdown and select {{< ui >}}Manage permissions{{< /ui >}}.
   {{< img src="/product_analytics/experiment/exp_bq_gc_permissions.png" alt="The BigQuery dataset page with the Share dropdown expanded and Manage permissions highlighted, showing additional options including Copy link, Authorize Views, Authorize Routines, Authorize Datasets, Manage Subscriptions, and Publish as Listing." style="width:100%;" >}}
1. Click {{< ui >}}Add principal{{< /ui >}}.
1. In the {{< ui >}}New principals{{< /ui >}} field, enter the service account email.
1. Using the {{< ui >}}Select a role{{< /ui >}} dropdown, select the {{< ui >}}BigQuery Data Viewer{{< /ui >}} role.
1. Click {{< ui >}}Save{{< /ui >}}.

## Step 3: Configure experiment settings

<div class="alert alert-info">Datadog supports one warehouse connection per organization. Connecting BigQuery replaces any existing warehouse connection (for example, Snowflake).</div>

After you set up your Google Cloud resources and IAM roles, configure the experiment settings in Datadog:

1. Open [Datadog Product Analytics][10].
1. In the left navigation, hover over {{< ui >}}Settings{{< /ui >}} and click {{< ui >}}Experiments{{< /ui >}}.
1. Select the {{< ui >}}Warehouse Connections{{< /ui >}} tab.
1. Click {{< ui >}}Connect a data warehouse{{< /ui >}}. If you already have a warehouse connected, click {{< ui >}}Edit{{< /ui >}} instead.
1. Select the {{< ui >}}BigQuery{{< /ui >}} tile.
1. Under {{< ui >}}Select BigQuery Account{{< /ui >}}, enter:
   - {{< ui >}}GCP service account{{< /ui >}}: The [service account](#prerequisites) you are using for Datadog Experiments.
   - {{< ui >}}Project{{< /ui >}}: Your Google Cloud project.
1. Under {{< ui >}}Dataset and GCS Bucket{{< /ui >}}, enter:
   - {{< ui >}}Dataset{{< /ui >}}: The dataset you created in [Step 1](#create-a-bigquery-dataset) (for example, `datadog_experiments_output`).
   - {{< ui >}}GCS Bucket{{< /ui >}}: The Cloud Storage bucket you created in [Step 1](#create-a-cloud-storage-bucket).
1. Click {{< ui >}}Save{{< /ui >}}.

{{< img src="/product_analytics/experiment/guide/bigquery_experiment_setup_dd.png" alt="The Edit Data Warehouse modal with BigQuery selected, showing two sections: Select BigQuery Account with fields for GCP service account and Project, and Dataset and GCS Bucket with fields for Dataset and GCS Bucket." style="width:90%;" >}}

After you save your warehouse connection, [create experiment metrics][9] using your BigQuery data.

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
