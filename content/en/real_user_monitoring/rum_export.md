---
title: RUM Export
description: Forward all your ingested RUM sessions to long term storage.
further_reading:
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Learn about the RUM Explorer"
- link: "/real_user_monitoring/rum_without_limits/"
  tag: "Documentation"
  text: "Learn about RUM without Limits"
---

## Overview

Configure your Datadog account to forward all the RUM sessions ingested—whether [indexed][1] or not—to a cloud storage system of your own. Keep your RUM sessions in a storage-optimized archive for longer periods of time and meet compliance requirements while also keeping auditability for ad-hoc investigations.

{{< img src="real_user_monitoring/rum_export/rum-export-overview.png" alt="Archives tab on the RUM Export page" style="width:100%;">}}

Navigate to the [**RUM Export** page][3] to set up an export for forwarding ingested RUM sessions to your own cloud-hosted storage bucket.

1. If you haven't already, set up a Datadog [integration](#set-up-an-integration) for your cloud provider.
2. Create a [storage bucket](#create-a-storage-bucket).
3. Set [permissions](#set-permissions) to `read` and/or `write` on that archive.
4. [Route your RUM sessions](#route-your-rum-sessions-to-a-bucket) to and from that archive.
5. Configure [advanced settings](#advanced-settings) such as encryption, storage class, and tags.
6. [Validate](#validation) your setup and check for possible misconfigurations that Datadog would be able to detect for you.

## Configure an export

### Set up an integration

{{< tabs >}}
{{% tab "AWS S3" %}}

If not already configured, set up the [AWS integration][1] for the AWS account that holds your S3 bucket.
   * In the general case, this involves creating a role that Datadog can use to integrate with AWS S3.
   * Specifically for AWS China accounts, use access keys as an alternative to role delegation.

[1]: /integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

Set up the [Azure integration][1] within the subscription that holds your new storage account, if you haven't already. This involves [creating an app registration that Datadog can use][2] to integrate with.

**Note:** Archiving to Azure ChinaCloud and Azure GermanyCloud is not supported. Archiving to Azure GovCloud is supported in Preview. To request access, contact Datadog support.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Set up the [Google Cloud integration][1] for the project that holds your GCS storage bucket, if you haven't already. This involves [creating a Google Cloud service account that Datadog can use][2] to integrate with.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### Create a storage bucket

{{< tabs >}}
{{% tab "AWS S3" %}}

Go into your [AWS console][1] and [create an S3 bucket][2] to send your archives to.

**Notes:**

- Do not make your bucket publicly readable.
- For [US1, US3, and US5 sites][3], see [AWS Pricing][4] for inter-region data transfer fees and how cloud storage costs may be impacted. Consider creating your storage bucket in `us-east-1` to manage your inter-region data transfer fees.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

* Go to your [Azure Portal][1] and [create a storage account][2] to send your archives to. Give your storage account a name, select either standard performance or **Block blobs** premium account type, and select the **hot** or **cool** access tier.
* Create a **container** service into that storage account. Take note of the container name as you will need to add this in the Datadog RUM Export page.

**Note:** Do not set [immutability policies][3] because the last data needs to be rewritten in some rare cases (typically a timeout).

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Go to your [Google Cloud account][1] and [create a GCS bucket][2] to send your archives to. Under **Choose how to control access to objects**, select **Set object-level and bucket-level permissions.**

**Note:** Do not add [retention policy][3] because the last data needs to be rewritten in some rare cases (typically a timeout).

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### Set permissions

Only Datadog users with the [`rum_write_archives` permission][5] can create, modify, or delete RUM export configurations.

{{< tabs >}}
{{% tab "AWS S3" %}}

1. [Create a policy][1] with the following permission statements:

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
     * The `GetObject` and `ListBucket` permissions allow for rehydrating from archives.
     * The `PutObject` permission is sufficient for uploading archives.
     * Ensure that the resource value under the `s3:PutObject` and `s3:GetObject` actions ends with `/*` because these permissions are applied to objects within the buckets.

2. Edit the bucket names.
3. Optionally, specify the paths that contain your RUM archives.
4. Attach the new policy to the Datadog integration role.
   * Navigate to **Roles** in the AWS IAM console.
   * Locate the role used by the Datadog integration. By default it is named **DatadogIntegrationRole**, but the name may vary if your organization has renamed it. Click the role name to open the role summary page.
   * Click **Add permissions**, and then **Attach policies**.
   * Enter the name of the policy created above.
   * Click **Attach policies**.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Grant the Datadog app permission to write to and rehydrate from your storage account.
2. Select your storage account from the [Storage Accounts page][1], go to **Access Control (IAM)**, and select **Add -> Add Role Assignment**.
3. Input the Role called **Storage Blob Data Contributor**, select the Datadog app which you created to integrate with Azure, and save.

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Grant your Datadog Google Cloud service account permissions to write your archives to your bucket.
2. Select your Datadog Google Cloud service account principal from the [Google Cloud IAM Admin page][1] and select **Edit principal**.
3. Click **ADD ANOTHER ROLE**, select the **Storage Object Admin** role, and save.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### Route your RUM sessions to a bucket

Navigate to the [RUM Export page][3] and select **Add a new archive**.

**Notes:**
* Only Datadog users with the [`rum_write_archives` permission][5] can complete this and the following step.
* If your bucket restricts network access to specified IPs, add the webhook IPs from the {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} to the allowlist.

| Service                  | Steps                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Amazon S3**               | - Select the appropriate AWS account and role combination for your S3 bucket.<br>- Input your bucket name.<br>**Optional**: Input a prefix directory for all the content of your RUM archives. |
| **Azure Storage**        | - Select the **Azure Storage** archive type, and the Azure tenant and client for the Datadog App that has the Storage Blob Data Contributor role on your storage account.<br>- Input your storage account name and the container name for your archive.<br>**Optional**: Input a prefix directory for all the content of your RUM archives. |
| **Google Cloud Storage** | - Select the **Google Cloud Storage** archive type, and the GCS Service Account that has permissions to write on your storage bucket.<br>- Input your bucket name.<br>**Optional**: Input a prefix directory for all the content of your RUM archives. |

### Advanced settings

#### Datadog tags

Use this optional configuration step to include all RUM session tags in your archives (activated by default on all new archives).

**Note**: This increases the size of resulting archives.

#### Storage class

{{< tabs >}}
{{% tab "AWS S3" %}}

You can either select a storage class for your archive or [set a lifecycle configuration on your S3 bucket][1] to automatically transition your RUM archives to optimal storage classes.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
{{% /tab %}}
{{% tab "Azure Storage" %}}

Archiving only supports the following access tiers:

- Hot access tier
- Cool access tier

{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

Archiving supports the following access tiers:

- Standard
- Nearline
- Coldline
- Archive

{{% /tab %}}

{{< /tabs >}}

#### Server-side encryption (SSE) for S3 archives

When creating or updating an S3 archive in Datadog, you can optionally configure **Advanced Encryption**. Three options are available under the **Encryption Type** dropdown:

- **Default S3 Bucket-Level Encryption** (Default): Datadog does not override your S3 bucket's default encryption settings.
- **Amazon S3 managed keys**: Forces server-side encryption using Amazon S3 managed keys ([SSE-S3][6]), regardless of the S3 bucket's default encryption.
- **AWS Key Management Service**: Forces server-side encryption using a customer-managed key (CMK) from [AWS KMS][7], regardless of the S3 bucket's default encryption. You will need to provide the CMK ARN.

### Validation

After your archive settings are successfully configured in your Datadog account, your processing pipelines begin to enrich all RUM sessions ingested into Datadog. These sessions are subsequently forwarded to your archive.

However, after creating or updating your archive configurations, it can take several minutes before the next archive upload is attempted. **Check back on your storage bucket in 15 minutes** to make sure the archives are successfully being uploaded from your Datadog account.

After that, if the archive is still in a pending state, check your inclusion filters to make sure the query is valid. When Datadog fails to upload RUM sessions to an external archive due to unintentional changes in settings or permissions, the corresponding RUM Export is highlighted in the configuration page.

## Multiple archives

If multiple archives are defined, RUM sessions enter the first archive based on filter.

It is important to order your archives carefully. For example, if you create a first archive filtered to the `env:prod` tag and a second archive without any filter (the equivalent of `*`), all your production sessions would go to one storage bucket or path, and the rest would go to the other.

## Format of the archives

The RUM archives that Datadog forwards to your storage bucket are in compressed JSON format (`.json.gz`). Using the prefix you indicate (or `/` if there is none), the archives are stored in a directory structure that indicates on what date and at what time the archive files were generated, such as the following:

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.02aafad5-f525-4592-905e-e962d1a5b2f7.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.json.gz
```

This directory structure simplifies the process of querying your historical RUM archives based on their date.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/rum_without_limits/retention_filters/
[2]: /real_user_monitoring/explorer/
[3]: https://app.datadoghq.com/rum/export
[4]: /real_user_monitoring/rum_without_limits/
[5]: /account_management/rbac/permissions/
[6]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
[7]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
