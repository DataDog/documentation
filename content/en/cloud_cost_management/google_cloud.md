---
title: Google Cloud
kind: documentation
disable_toc: false
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/aws"
  tag: "Documentation"
  text: "Gain insights into your AWS bill"
- link: "/cloud_cost_management/azure"
  tag: "Documentation"
  text: "Gain insights into your Azure bill"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for this site.</div>
{{< /site-region >}}

## Overview

To use Google Cloud Cost Management in Datadog, you must configure the [Google Cloud Platform Integration][12] and set up the [detailed usage cost][14] billing export for your desired billing account.
Additionally, the Google Cloud Platform Datadog Integration Service Account must have the [necessary permissions][13] configured to interact with Google Cloud Storage and BigQuery.

## Setup

### Configure the Google Cloud Platform integration
Navigate to [Setup & Configuration][3], and select a Google Cloud Platform integration.
If you do not see your desired Service Account in the list, go to the [Google Cloud Platform integration][4] to configure it.

**Note**: [Datadog Google Cloud Platform integration][4] will automatically monitor any projects this Service Account has access to.
Cloud Cost processes all resources in a project, regardless of the Metrics Collection limits defined per integration.

### Enable detailed usage cost export
<div class="alert alert-info">
The <a href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage">detailed usage cost data</a> provides all the information included in the standard usage cost data, along with additional fields that provide granular, resource-level cost data.
</div>

 1. Navigate to [Billing Export][1] under Google Cloud console *Billing*.
 2. Enable the [Detailed Usage cost][2] export (select or create a project and a BigQuery dataset).
 3. Document the `Billing Account ID` for the billing account where the export was configured, as well as the export `Project ID` and `Dataset Name`.

#### Enable Google Service APIs
The following permissions allow Datadog to access and transfer the billing export into the storage bucket using a scheduled BigQuery query.

- Enable the [BigQuery API][5].
  1. In the Google Cloud console, go to the project selector page and select your Google Cloud project.
  2. Enable billing on your project for all transfers.

- Enable the [BigQuery Data Transfer Service][5].
  1. Open the BigQuery Data Transfer API page in the API library.
  2. From the dropdown menu, select the project that contains the service account.
  3. Click the ENABLE button.

  **Note:** BigQuery Data Transfer API needs to be enabled on the Google Project that contains the service account.


#### Configure export project access
[Add the service account as a principal on the export dataset project resource][7]:
1. Navigate to the IAM page in the Google Cloud console and select the export dataset project.
2. Select the service account as a principal.
3. Select a role with the following permissions to grant from the drop-down list:
  * `bigquery.jobs.create`
  * `bigquery.transfers.get`
  * `bigquery.transfers.update`

  **Note:** This can be a custom role, or you can use the existing Google Cloud role `roles/bigquery.admin`.

#### Configure export BigQuery dataset access
[Add the service account as a principal on the export BigQuery dataset resource][8]:
1. In the Explorer pane on the BigQuery page, expand your project and select the export BigQuery dataset.
2. Click **Sharing > Permissions** and then **add principal**.
3. In the new principals field, enter the service account.
4. Using the select a role list, assign a role with the following permissions:
  * `bigquery.datasets.get`
  * `bigquery.tables.create`
  * `bigquery.tables.delete`
  * `bigquery.tables.export`
  * `bigquery.tables.get`
  * `bigquery.tables.getData`
  * `bigquery.tables.list`
  * `bigquery.tables.update`
  * `bigquery.tables.updateData`

  **Note:** This can be a custom role, or you can use the existing Google Cloud role `roles/bigquery.dataEditor`.

### Create or select a Google Cloud Storage bucket
Use an existing Google Cloud Storage bucket or create a new one.
Data is extracted regularly from your Detailed Usage Cost BigQuery dataset to the selected bucket and prefixed with `datadog_cloud_cost_detailed_usage_export`.

**Note:** The bucket [must be co-located][9] with the BigQuery export dataset.

#### Configure bucket access
[Add the service account as a principal on the GCS bucket resource][6]:
1. Navigate to the Cloud Storage Buckets page in the Google Cloud console, and select your bucket.
2. Select the permissions tab and click the **grant access** button.
3. In the new principals field, enter the service account.
4. Assign a role with the following permissions:
   * `storage.buckets.get`
   * `storage.objects.create`
   * `storage.objects.delete`
   * `storage.objects.get`
   * `storage.objects.list`

  **Note:** This can be a custom role, or you can use the existing Google Cloud roles `roles/storage.legacyObjectReader` and `roles/storage.legacyBucketWriter`.

### (Optional) Configure cross-project service authorization:
If your integrated Service Account exists in a different Google Cloud Platform project than your billing export dataset, you need to [grant cross-project service account authorization][10]:

1. Trigger the service agent creation by following the [official documentation][11] using the following values:
   * ENDPOINT: `bigquerydatatransfer.googleapis.com`
   * RESOURCE_TYPE: `project`
   * RESOURCE_ID: export dataset project</br></br>

     This creates a new service agent that looks like `service-<billing project number>@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com`.


2. Add the BigQuery Data Transfer Service Account role created by the trigger as a principal on your service account
3. Assign it the `roles/iam.serviceAccountTokenCreator` role.

### Configure Cloud Costs
Continue to follow the steps indicated in [Setup & Configuration][3].

## Cost types
You can visualize your ingested data using the following cost types:

| Cost Type | Description |
| ----------| ----------------------------------|
| `gcp.cost.amortized` | Total cost of resources allocated at the time of usage over an interval. Costs include promotion credits as well as committed usage discount credits. |
| `gcp.cost.amortized.shared.resources.allocated` | All of your GCP amortized costs, with additional breakdowns and insights for container workloads. Requires [container cost allocation][15].|

### Container allocation
**Container allocation** metrics contain all of the same costs as the GCP metrics, but with additional breakdowns and insights for container workloads. See [container cost allocation][15] for more details.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.cloud.google.com/billing/export/
[2]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup
[3]: https://app.datadoghq.com/cost/setup?cloud=gcp
[4]: https://app.datadoghq.com/integrations/google-cloud-platform
[5]: https://cloud.google.com/bigquery/docs/enable-transfer-service
[6]: https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-add
[7]: https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role
[8]: https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset
[9]: https://cloud.google.com/bigquery/docs/exporting-data#data-locations
[10]: https://cloud.google.com/bigquery/docs/enable-transfer-service#cross-project_service_account_authorization
[11]: https://cloud.google.com/iam/docs/create-service-agents#create
[12]: /integrations/google_cloud_platform/
[13]: /cloud_cost_management/google_cloud/#provide-service-account-necessary-permissions
[14]: /cloud_cost_management/google_cloud/#enable-detailed-usage-cost-export
[15]: https://docs.datadoghq.com/cloud_cost_management/container_cost_allocation/
