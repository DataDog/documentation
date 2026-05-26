---
title: Export Pipelines
description: Forward your RUM and Product Analytics events to your own cloud storage for warehouse loading or long-term retention.
private: true
further_reading:
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Learn about the RUM Explorer"
- link: "/real_user_monitoring/rum_without_limits/"
  tag: "Documentation"
  text: "Learn about RUM without Limits"
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Learn about Product Analytics"
---

<div class="alert alert-warning">Export Pipelines is in Preview. Contact your Customer Success Manager or <a href="/help/">Datadog support</a> to request access.</div>

## Overview

Export Pipelines stream your ingested Real User Monitoring (RUM) and Product Analytics events to a cloud storage bucket you own — Amazon S3, Azure Blob Storage, or Google Cloud Storage — in JSON or Parquet format. From there you can load the data into your own data warehouse (such as Snowflake, BigQuery, or Databricks), or keep it as a long-term archive for compliance and ad-hoc investigations.

{{< img src="real_user_monitoring/rum_export/rum-export-overview.png" alt="Export Pipelines list on the RUM application settings page" style="width:100%;">}}
<!-- TODO: refresh screenshot to match the current Export Pipelines UI -->

Datadog manages the export from your account to your cloud storage. Loading the data into a downstream warehouse is something you set up on your side.

## How it works

Export Pipelines are configured per RUM application. For each application you can create up to three pipelines:

| Source             | Pipelines per application | Available presets                                                |
|--------------------|---------------------------|------------------------------------------------------------------|
| RUM                | One                       | *All RUM Event Types* **or** *Sessions, Views & Actions*         |
| Product Analytics  | Up to two                 | *All Product Analytics Events* and *User and Account Profiles*   |

Each pipeline exports continuously and independently of the others. Events are not deduplicated across pipelines.

## Prerequisites

- RUM is enabled on the application (or Product Analytics, for PA presets).
- The Datadog integration for your cloud provider — AWS, Azure, or Google Cloud — is set up.
- Your Datadog user has the `rum_write_archives` permission. See [Role Based Access Control][1].

## Set up an export pipeline

### 1. Set up your cloud integration

{{< tabs >}}
{{% tab "AWS S3" %}}

If not already configured, set up the [AWS integration][1] for the account that holds your S3 bucket. This usually means creating a role that Datadog can assume.

For AWS China accounts, use access keys instead of role delegation.

[1]: /integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

Set up the [Azure integration][1] in the subscription that holds your storage account, if you haven't already. This involves [creating an app registration that Datadog can use][2].

**Note:** Exporting to Azure ChinaCloud and Azure GermanyCloud is not supported. Exporting to Azure GovCloud is supported in Preview — contact Datadog support to request access.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

Set up the [Google Cloud integration][1] for the project that holds your GCS bucket, if you haven't already. This involves [creating a Google Cloud service account that Datadog can use][2].

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### 2. Create a storage bucket

{{< tabs >}}
{{% tab "AWS S3" %}}

In the [AWS console][1], [create an S3 bucket][2] for your exports.

**Notes:**

- Do not make the bucket publicly readable.
- For [US1, US3, and US5 sites][3], see [AWS pricing][4] for inter-region data transfer fees. Consider creating the bucket in `us-east-1` to minimize transfer costs.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

- In the [Azure Portal][1], [create a storage account][2]. Choose **Standard** performance or **Block blobs premium**, and select either the **hot** or **cool** access tier.
- Create a **container** inside that storage account. Note the container name — you reference it when configuring the pipeline.

**Note:** Do not set [immutability policies][3]. Some events occasionally need to be rewritten (typically on retry after a timeout).

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

In the [Google Cloud console][1], [create a GCS bucket][2] for your exports. Under **Choose how to control access to objects**, select **Set object-level and bucket-level permissions.**

**Note:** Do not add a [retention policy][3]. Some events occasionally need to be rewritten (typically on retry after a timeout).

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### 3. Grant Datadog access to the bucket

{{< tabs >}}
{{% tab "AWS S3" %}}

1. [Create a policy][1] with the following statements:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "DatadogUploadAndRehydrateRUMArchives",
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject"],
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
           "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
         ]
       },
       {
         "Sid": "DatadogRehydrateRUMArchivesListBucket",
         "Effect": "Allow",
         "Action": "s3:ListBucket",
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1>",
           "arn:aws:s3:::<MY_BUCKET_NAME_2>"
         ]
       }
     ]
   }
   ```

   * `PutObject` is sufficient to upload exports.
   * `GetObject` and `ListBucket` are required only if you plan to rehydrate archives back into Datadog.
   * The resource value under `s3:PutObject` and `s3:GetObject` must end with `/*` — these permissions apply to objects inside the buckets.

2. Edit the bucket names.
3. Optionally, restrict the policy to specific paths.
4. Attach the policy to the Datadog integration role:
   * In the AWS IAM console, go to **Roles** and open the role used by the Datadog integration. By default it is named `DatadogIntegrationRole`, but the name may differ if your organization renamed it.
   * Click **Add permissions**, then **Attach policies**.
   * Enter the name of the policy you just created.
   * Click **Attach policies**.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Grant the Datadog app permission to write to your storage account.
2. On the [Storage accounts page][1], select your storage account, open **Access Control (IAM)**, and choose **Add → Add Role Assignment**.
3. Assign the **Storage Blob Data Contributor** role to the Datadog app you created when integrating with Azure, then save.

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Grant your Datadog Google Cloud service account permission to write to your bucket.
2. On the [Google Cloud IAM Admin page][1], select your Datadog service account principal and click **Edit principal**.
3. Click **ADD ANOTHER ROLE**, select **Storage Object Admin**, and save.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

**Note:** If your bucket restricts network access by IP, add the webhook IP ranges from the {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} to the allowlist.

### 4. Configure the pipeline in Datadog

1. Go to **[Real User Monitoring][2]**, open the application you want to export from, and select **Export Pipelines** in the application settings.
2. Click **New Export Pipeline**.
3. Fill in each section of the side panel:

   **Define Data to Export**
   - **Source**: Real User Monitoring or Product Analytics.
   - **Preset**:
     - RUM — *All RUM Event Types* or *Sessions, Views & Actions*
     - Product Analytics — *All Product Analytics Events* or *User and Account Profiles*

   **File format**
   - **Parquet**: best for loading directly into a data warehouse such as BigQuery, Snowflake, or Databricks.
   - **JSON**: best when you want to process the data with your own pipeline.

   **Select Storage Type**
   - Amazon S3, Google Cloud Storage, or Azure Blob Storage.

   **Configure Bucket**

   | Provider | Fields |
   |---|---|
   | **Amazon S3** | AWS account and role (from your AWS integration); **Bucket** (required); **Path** (optional prefix) |
   | **Azure Blob Storage** | Azure tenant and client (from your Azure integration); **Storage Account** (required); **Container** (required); **Path** (optional prefix) |
   | **Google Cloud Storage** | GCP service account (from your Google Cloud integration); **Bucket** (required); **Path** (optional prefix) |

4. Click **Test Configuration**. Datadog writes a small test file to your bucket and reads it back to verify both directions. Fix any reported permissions or naming issues before saving.
5. Click **Save** to start the pipeline.

## Pipeline statuses

Once created, a pipeline shows one of these states on the Export Pipelines page:

| Status   | Meaning                                                                                                                        |
|----------|--------------------------------------------------------------------------------------------------------------------------------|
| Active   | Datadog is exporting events successfully.                                                                                      |
| Pending  | The pipeline was just created or updated. Allow a few minutes before the first upload.                                         |
| Error    | Datadog could not write to the bucket — typically a permissions or naming issue. Open the pipeline and run **Test Configuration** to see details. |
| Paused   | The pipeline is disabled. No events are exported.                                                                              |

If a pipeline stays in **Pending** for more than 15 minutes, run **Test Configuration** to surface the underlying issue.

## File format

Files are organized in a directory structure that makes it easy to query archives by date:

```
/<path>/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.<ext>
```

| Format  | Extension     | Notes                                                          |
|---------|---------------|----------------------------------------------------------------|
| JSON    | `.json.gz`    | Gzip-compressed newline-delimited JSON.                        |
| Parquet | `.parquet`    | <!-- TODO: confirm Parquet file naming convention and per-record schema with the Product Analytics team --> |

<!-- TODO: confirm the directory structure above still applies for both formats in the new Export Pipelines backend -->

## Programmatic management

A public REST API for managing RUM exports is available at `/api/v2/rum/forwarding`. The API exposes a few advanced options that are not currently surfaced in the UI:

- A custom RUM query filter on events to forward.
- For S3 destinations: server-side encryption — `SSE_S3` or `SSE_KMS` with a customer-managed key — and storage class (`STANDARD`, `STANDARD_IA`, `ONEZONE_IA`, `INTELLIGENT_TIERING`, `GLACIER_IR`).
- An `include_tags` toggle.
- Rehydration tags and an optional `rehydration_max_scan_size_gb` for rehydration jobs.

The API requires the `rum_write_archives` permission. See the [Datadog API reference][3] for full request and response schemas.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/
[2]: https://app.datadoghq.com/rum/list
[3]: /api/latest/rum/
