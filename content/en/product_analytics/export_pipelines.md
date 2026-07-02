---
title: Export Pipelines
description: Forward your RUM and Product Analytics events to your own cloud storage for warehouse loading or long-term retention.
private: true
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Learn about Product Analytics"
- link: "/real_user_monitoring/rum_without_limits/"
  tag: "Documentation"
  text: "Learn about RUM without Limits"
- link: "/real_user_monitoring/"
  tag: "Documentation"
  text: "Learn about Real User Monitoring"
---

{{< callout url="https://www.datadoghq.com/product-preview/export-pipelines/" btn_hidden="false" header="Join the Preview!">}}
Export Pipelines is in Preview.
{{< /callout >}}

## Overview

Export Pipelines stream your ingested Real User Monitoring (RUM) and Product Analytics events to a cloud storage bucket you own — Amazon S3, Azure Blob Storage, or Google Cloud Storage — in JSON or Parquet format.

{{< img src="real_user_monitoring/rum_export/rum-export-overview.png" alt="Export Pipelines list on the RUM application settings page" style="width:100%;">}}

Use Export Pipelines to:
- Load your event data into your own data warehouse (such as Snowflake, BigQuery, or Databricks) for custom analytics and reporting.
- Meet compliance requirements or retain raw events for long-term archival and ad-hoc investigations.

Datadog only manages the export from your Datadog account to your cloud storage system.

## How it works

Export Pipelines is a shared feature between [Real User Monitoring][4] and [Product Analytics][5]. Pipelines are configured at two different levels:

| Scope | Source | Max pipelines | Available presets |
|---|---|---|---|
| Per application | RUM | 1 | *All RUM event types*, or *Sessions, Views & Actions only* |
| Per application | Product Analytics | 1 | *All Product Analytics Events* (sessions, views, actions & server-side events) |
| Per organization | Product Analytics | 1 | *User and Account Profiles* |

The *User and Account Profiles* preset is limited to one pipeline per organization. Because user and profile data is shared across all your applications, creating one pipeline per application would result in duplicate records in your storage.

Each pipeline exports continuously and independently of the others.

## Prerequisites

- Product Analytics is enabled on the application (or RUM, or both).
- The Datadog integration for your cloud provider is set up: [Amazon Web Services][6], [Azure][7], or [Google Cloud][8].
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
         "Sid": "DatadogExportPipelineFiles",
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject"],
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
           "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
         ]
       }
     ]
   }
   ```

   * `PutObject` is required to upload export files.
   * `GetObject` is required to run **Test Configuration**, which writes a test file and reads it back to verify access.
   * The resource value must end with `/*` — these permissions apply to objects inside the buckets.

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

1. From Product Analytics, navigate to **App Management** in the bottom left of the navigation.
2. Select your application, then go to **Routing > Export Pipelines**.
3. Click **New Export Pipeline**.
4. Fill in each section of the side panel:

   **Define Data to Export**

   Choose the data you want to export. The source and preset options are clearly labeled in the UI.

   **File format**

   {{< img src="real_user_monitoring/rum_export/rum-export-data-format.png" alt="Data selection and file format options in the Export Pipeline configuration panel" style="width:85%;">}}

   - **Parquet**: best for loading directly into a data warehouse such as BigQuery, Snowflake, or Databricks.
   - **JSON**: best when you want to process the data with your own pipeline.

   **Select Storage Type and Configure Bucket**

   | Provider | Fields |
   |---|---|
   | **Amazon S3** | AWS account and role (from your AWS integration); **Bucket** (required); **Path** (optional prefix) |
   | **Azure Blob Storage** | Azure tenant and client (from your Azure integration); **Storage Account** (required); **Container** (required); **Path** (optional prefix) |
   | **Google Cloud Storage** | GCP service account (from your Google Cloud integration); **Bucket** (required); **Path** (optional prefix) |

5. Optionally, click **Test Configuration**. Datadog writes a small test file to your bucket and reads it back to verify access. Fix any reported permissions or naming issues before saving.
6. Click **Add Export Pipeline** to start the pipeline.

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
| Parquet | `.parquet`    | Native Parquet encoding (no gzip wrapper). One row per event with typed columns. Directly loadable by Snowflake, BigQuery, and Databricks without preprocessing. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/
[2]: https://app.datadoghq.com/rum/list
[3]: /api/latest/rum/
[4]: /real_user_monitoring/
[5]: /product_analytics/
[6]: /integrations/amazon-web-services/
[7]: /integrations/azure/
[8]: /integrations/google_cloud_platform/
