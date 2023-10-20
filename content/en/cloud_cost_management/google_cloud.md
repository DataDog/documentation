---
title: Google Cloud
kind: documentation
is_beta: true
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

{{< beta-callout url="https://docs.google.com/forms/d/e/1FAIpQLScNSzkTAmmpmxEY5Xoo-xPOyKXG0n_6IgdlU66mWXp445pNdA/viewform" btn_hidden="false" >}}
Cloud Cost Google Cloud support is in private beta
{{< /beta-callout >}}

## Overview

To use Cloud Cost Management with Google Cloud, you must set up a Datadog [Google Cloud Platform Integration][12] in Datadog. You must also enable a Detailed Usage Cost billing export for your desired billing account in Google Cloud.

The Google Cloud Platform Datadog Integration Service Account must have necessary permissions configured to interact with Google Cloud Storage and BigQuery.

## Setup

### Enable Detailed Usage cost billing export
<div class="alert alert-info"> <a href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage">Detailed Usage Cost</a> data includes resource-level cost data. </div>

1. Navigate to [Billing Export][1] under Google Cloud console *Billing*.
2. Enable [Detailed Usage cost][2] export, (select or create a project and a BigQuery dataset).
3. Document the billing account id for the billing account where the export was configured as well as export project id and dataset name

### Create or select a Google Cloud Storage bucket
You can use an existing GCS bucket or create a new one. Data is extracted regularly from your Detailed Usage Cost BigQuery dataset to a `datadog_cloud_cost_detailed_usage_export` prefix in the selected bucket.

**Note:** The bucket [must be co-located][9] with the BigQuery export dataset.

### Configure the Google Cloud Platform integration
Navigate to [Setup & Configuration][3] and select an integrated Google Cloud Platform service account from the menu. If you do not see your desired Service Account in the list, go to [Google Cloud Platform integration][4] to add it. Follow the instructions on the integration page to properly configure your Service Account being integrated.

<div class="alert alert-warning"> LEGACY project integrations are deprecated and not supported </div>

Datadog Google Cloud Platform Integrations monitor the entire project when a related service account is integrated. Using a previously integrated project prevents monitoring resources in a new project. If your billing is associated with a non-integrated project, those resources will start to be monitored.

**Note:** You can limit Metrics Collection per integration - this limits automatically monitoring resources in the project - but does not exclude data from Cloud Cost processing. </div>

### Provide Datadog integration service account necessary permissions
The APIs and permissions below enable Datadog to access your Detailed Usage billing export data and extract it in a useful format. This dumps data from BigQuery, where Google Cloud exports it, to your specified GCS bucket through a scheduled BigQuery query. The data is exported in a useful manner in your cloud storage bucket where it can then be processed by Datadog.

#### Enable necessary Google Service APIs
[Enable BigQuery and BigQuery Data Transfer Service APIs][5] if not already enabled

#### Configure required bucket access
[Add the service account as a principal on the GCS bucket resource][6] and assign a role with the following permissions:
* `storage.buckets.get`
* `storage.objects.create`
* `storage.objects.delete`
* `storage.objects.get`
* `storage.objects.list`

**Note:** This can be a custom role, or you can use existing Google Cloud roles `roles/storage.legacyObjectReader` and `roles/storage.legacyBucketWriter`

#### Configure required export project access
[Add the service account as a principal on the export dataset project resource][7] and assign a role with the following permissions:
* `bigquery.jobs.create`
* `bigquery.transfers.get`
* `bigquery.transfers.update`

**Note:** This can be a custom role, or you can use existing Google Cloud role `roles/bigquery.admin`

#### Configure required export BigQuery dataset access
[Add the service account as a principal on the export BigQuery dataset resource][8] and assign a role with the following permissions:
* `bigquery.datasets.get`
* `bigquery.tables.create`
* `bigquery.tables.delete`
* `bigquery.tables.export`
* `bigquery.tables.get`
* `bigquery.tables.getData`
* `bigquery.tables.list`
* `bigquery.tables.update`
* `bigquery.tables.updateData`

**Note:** This can be a custom role, or you can use existing Google Cloud role `roles/bigquery.dataEditor`

#### If necessary - configure required cross-project service authorization
If your integrated Service Account exists in a different Google Cloud Platform project than your billing export dataset you need to [grant cross-project service account authorization][10]:

[Trigger service agent creation][11] using the following values:
* ENDPOINT: `bigquerydatatransfer.googleapis.com`
* RESOURCE_TYPE: `project`
* RESOURCE_ID: export dataset project

This should create a new service agent that looks like `service-<billing project id>@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com`

Add the BigQuery Data Transfer Service Account role created by the trigger as a principal on your Service Account resource with the `roles/iam.serviceAccountTokenCreator` role


### Configure Cloud Costs for Google Cloud in Datadog
Navigate to [Setup & Configuration][3] and follow the steps.

### Cost types
You can visualize your ingested data using the following cost types:

| Cost Type             | Description                                                                                                                                           |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `gcp.cost.usage_date` | Total cost of resources allocated at the time of usage over an interval. Costs include promotion credits as well as committed usage discount credits. |

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
