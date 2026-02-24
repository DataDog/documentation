---
title: BigQuery
description: 'Connect BigQuery to Datadog Data Observability to monitor data quality, track usage, and detect issues.'
aliases:
  - /data_observability/datasets/?tab=bigquery
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Learn about Data Observability'
---

## Overview

The BigQuery integration connects Datadog to your Google Cloud project to sync metadata, query history, and table-level metrics. Use it to monitor data freshness, detect anomalies, and trace lineage across your data stack.

## Configure the BigQuery integration in Datadog

To configure the BigQuery integration in Datadog:

1. Navigate to [**Datadog Data Observability** > **Settings**][8].
2. Click the **Configure** button for the BigQuery option.

You can now choose to use a service account that you've [already connected to Datadog](#using-an-existing-service-account) or [set up a new one](#using-a-new-service-account) specifically for Data Observability.

### Using an existing service account

Choose this option if you've previously connected a service account to Datadog.

1. Select the **Use connected Service Account** option.
2. Select the service account from the dropdown list.
3. Click **Next**.
4. Turn on the **Enable Data Observability** toggle and click **Add Account**.
Data Observability functionality requires additional roles and API access beyond the basic BigQuery integration.

#### Additional roles

Apply the following roles to the service account in your GCP IAM console.

| Role | Role ID | Description |
|------|---------|-------------|
| [BigQuery Data Viewer][1] | `roles/bigquery.dataViewer` | Provides visibility into datasets |
| [BigQuery Resource Viewer][2] | `roles/bigquery.resourceViewer` | Provides visibility into jobs |
| [Job User][3] | `roles/bigquery.jobUser` | Required to run data quality queries |

#### Additional APIs

Make sure the following APIs have been enabled in the project associated with the service account.

| API | API ID | Description |
|-----|--------|-------------|
| [BigQuery API][13] | `bigquery.googleapis.com` | Required to access BigQuery |

### Using a new service account

1. Select the **Add new Service Account** option.
2. Choose one of the setup methods. **Quick Start** is recommended for most users since it requires no manual permissions setup.

After you've completed the **Quick Start** flow, click **Next** to proceed to the next page and enable the **Enable Data Observability** toggle before clicking **Add Account**.

#### Manual setup

In your Google Cloud console's IAM page, create a service account with the following roles:

| Role | Role ID | Description |
|------|---------|-------------|
| [Monitoring Viewer][5] | `roles/monitoring.viewer` | Provides read-only access to the monitoring data available in your Google Cloud environment |
| [Cloud Asset Viewer][6] | `roles/cloudasset.viewer` | Provides read-only access to cloud assets metadata |
| [Browser][7] | `roles/browser` | Provides read-only access to browse the hierarchy of a project |
| [BigQuery Data Viewer][1] | `roles/bigquery.dataViewer` | Provides visibility into datasets |
| [BigQuery Resource Viewer][2] | `roles/bigquery.resourceViewer` | Provides visibility into jobs |
| [Job User][3] | `roles/bigquery.jobUser` | Required to run data quality queries |
| [Compute Viewer][4] | `roles/compute.viewer` | Provides read-only access to get and list Compute Engine resources |

In Datadog, after you've selected the **Manual** setup method:

1. Copy the generated **Datadog Principal** to your clipboard. If this is your first time configuration GCP you'll need to first click the **Generate Principal** button.
2. In the Google Cloud console, under **Service Accounts**, find the service account you recently created and click on it.
3. Navigate to the **Principals with access** tab and click the **Grant access** button.
4. Paste the **Datadog Principal** into the **New principals** text box.
5. Under the **Assign roles** section, select the **Service Account Token Creator** role. This will allow the Datadog Principal to impersonate the service account you just created.
6. Click the **Save** button.

Finally, you need to enable the following APIs for **every project** you want to monitor, including the project where the service account has been created.

| API | API ID | Description |
|-----|--------|-------------|
| [Cloud Monitoring API][9] | `monitoring.googleapis.com` | Allows Datadog to query your Google Cloud metric data |
| [Cloud Asset API][10] | `cloudasset.googleapis.com` | Allows Datadog to request Google Cloud resources and link relevant labels to metrics as tags |
| [Compute Engine API][11] | `compute.googleapis.com` | Allows Datadog to discover compute instance data |
| [Cloud Resource Manager API][12] | `cloudresourcemanager.googleapis.com` | Allows Datadog to append metrics with the correct resources and tags |
| [BigQuery API][13] | `bigquery.googleapis.com` | Required to access BigQuery |

Once the service account has been created and the necessary roles and APIs have been applied, you can return to Datadog.

1. Click **Verify and save account**.
2. Click **Next**.
3. Turn on the **Enable Data Observability** toggle and click **Add Account**.

## Next steps

After you configure the integration, Datadog begins syncing your information schema and query history in the background. Initial syncs can take several hours depending on the size of your BigQuery deployment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/bigquery/docs/access-control#bigquery.dataViewer
[2]: https://cloud.google.com/bigquery/docs/access-control#bigquery.resourceViewer
[3]: https://cloud.google.com/bigquery/docs/access-control#bigquery.jobUser
[4]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[5]: https://cloud.google.com/iam/docs/roles-permissions/monitoring#monitoring.viewer
[6]: https://cloud.google.com/iam/docs/roles-permissions/cloudasset#cloudasset.viewer
[7]: https://cloud.google.com/iam/docs/roles-permissions/browser#browser
[8]: https://app.datadoghq.com/datasets/settings/integrations
[9]: https://cloud.google.com/monitoring/api/enable-api
[10]: https://cloud.google.com/asset-inventory/docs/reference/rest
[11]: https://cloud.google.com/compute/docs/reference/rest/v1
[12]: https://cloud.google.com/resource-manager/reference/rest
[13]: https://cloud.google.com/bigquery/docs/reference/rest