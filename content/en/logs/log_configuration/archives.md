---
title: Log Archives
description: Forward all your ingested logs to long term storage.
aliases:
  - /logs/s3/
  - /logs/gcs/
  - /logs/archives/s3/
  - /logs/archives/gcs/
  - /logs/archives/gcp/
  - /logs/archives/
further_reading:
- link: "/logs/archives/rehydrating"
  tag: "Documentation"
  text: "Learn how to access your archived log content in Datadog"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn about the Log Explorer"
- link: "/logs/logging_without_limits/"
  tag: "Documentation"
  text: "Learn about Logging without Limits*"
---

## Overview

Configure your Datadog account to forward all the logs ingested—whether [indexed][1] or not—to a cloud storage system of your own. Keep your logs in a storage-optimized archive for longer periods of time and meet compliance requirements while also keeping auditability for ad-hoc investigations, with [Rehydration][2].

{{< img src="logs/archives/log_forwarding_archives_tab.png" alt="Archives tab on the Log Forwarding page" style="width:100%;">}}

Navigate to the [**Log Forwarding** page][3] to set up an archive for forwarding ingested logs to your own cloud-hosted storage bucket.

1. If you haven't already, set up a Datadog [integration](#set-up-an-integration) for your cloud provider.
2. Create a [storage bucket](#create-a-storage-bucket).
3. Set [permissions](#set-permissions) to `read` and/or `write` on that archive.
4. [Route your logs](#route-your-logs-to-a-bucket) to and from that archive.
5. Configure [advanced settings](#advanced-settings) such as encryption, storage class, and tags.
6. [Validate](#validation) your setup and check for possible misconfigurations that Datadog would be able to detect for you.

See how to [archive your logs with Observability Pipelines][4] if you want to route your logs to a storage-optimized archive directly from your environment.

## Configure an archive

### Set up an integration

{{< tabs >}}
{{% tab "AWS S3" %}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">AWS Role Delegation is not supported on the Datadog for Government site. Access keys must be used.</div>
{{< /site-region >}}

If not already configured, set up the [AWS integration][1] for the AWS account that holds your S3 bucket.

* In the general case, this involves creating a role that Datadog can use to integrate with AWS S3.
* Specifically for AWS GovCloud or China accounts, use access keys as an alternative to role delegation.

[1]: /integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

Set up the [Azure integration][1] within the subscription that holds your new storage account, if you haven't already. This involves [creating an app registration that Datadog can use][2] to integrate with.

**Note:** Archiving to Azure ChinaCloud, GermanyCloud, and GovCloud is not supported.

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

{{< site-region region="gov" >}}
<div class="alert alert-warning">Sending logs to an archive is outside of the Datadog GovCloud environment, which is outside the control of Datadog. Datadog shall not be responsible for any logs that have left the Datadog GovCloud environment, including without limitation, any obligations or requirements that the user may have related to FedRAMP, DoD Impact Levels, ITAR, export compliance, data residency or similar regulations applicable to such logs.</div>
{{< /site-region >}}

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
* Create a **container** service into that storage account. Take note of the container name as you will need to add this in the Datadog Archive Page.

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

Only Datadog users with the [`logs_write_archive` permission][5] can create, modify, or delete log archive configurations.

{{< tabs >}}
{{% tab "AWS S3" %}}

1. [Create a policy][1] with the following permission statements:  

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "DatadogUploadAndRehydrateLogArchives",
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject"],
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
           "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
         ]
       },
       {
         "Sid": "DatadogRehydrateLogArchivesListBucket",
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
     * The `GetObject` and `ListBucket` permissions allow for [rehydrating from archives][2].
     * The `PutObject` permission is sufficient for uploading archives.
     * Ensure that the resource value under the `s3:PutObject` and `s3:GetObject` actions ends with `/*` because these permissions are applied to objects within the buckets. 

2. Edit the bucket names.
3. Optionally, specify the paths that contain your log archives.
4. Attach the new policy to the Datadog integration role.  
   * Navigate to **Roles** in the AWS IAM console.  
   * Locate the role used by the Datadog integration. By default it is named **DatadogIntegrationRole**, but the name may vary if your organization has renamed it. Click the role name to open the role summary page.  
   * Click **Add permissions**, and then **Attach policies**.  
   * Enter the name of the policy created above.  
   * Click **Attach policies**.  
 

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Grant the Datadog app permission to write to and rehydrate from your storage account.
2. Select your storage account from the [Storage Accounts page][1], go to **Access Control (IAM)**, and select **Add -> Add Role Assignment**.
3. Input the Role called **Storage Blob Data Contributor**, select the Datadog app which you created to integrate with Azure, and save.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Add the Storage Blob Data Contributor role to your Datadog App." style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Grant your Datadog Google Cloud service account permissions to write your archives to your bucket.
2. Select your Datadog Google Cloud service account principal from the [Google Cloud IAM Admin page][1] and select **Edit principal**.
3. Click **ADD ANOTHER ROLE**, select the **Storage Object Admin** role, and save.

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Add the Storage Object Admin role to your Datadog Google Cloud Service Account." style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### Route your logs to a bucket

Navigate to the [Log Forwarding page][6] and select **Add a new archive** on the **Archives** tab.

**Notes:**
* Only Datadog users with the [`logs_write_archive` permission][5] can complete this and the following step.  
* Archiving logs to Azure Blob Storage requires an App Registration. See instructions [on the Azure integration page][7], and set the "site" on the right-hand side of the documentation page to "US." App Registration(s) created for archiving purposes only need the "Storage Blob Data Contributor" role. If your storage bucket is in a subscription being monitored through a Datadog Resource, a warning is displayed about the App Registration being redundant. You can ignore this warning.
* If your bucket restricts network access to specified IPs, add the webhook IPs from the {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} to the allowlist.

{{< tabs >}}
{{% tab "AWS S3" %}}

Select the appropriate AWS account and role combination for your S3 bucket.

Input your bucket name. **Optional**: Input a prefix directory for all the content of your log archives.

{{< img src="logs/archives/logs_archive_aws_setup.png" alt="Set your S3 bucket info in Datadog" style="width:75%;">}}

{{% /tab %}}
{{% tab "Azure Storage" %}}

Select the **Azure Storage** archive type, and the Azure tenant and client for the Datadog App that has the Storage Blob Data Contributor role on your storage account.

Input your storage account name and the container name for your archive. **Optional**: Input a prefix directory for all the content of your log archives.

{{< img src="logs/archives/logs_archive_azure_setup.png" alt="Set your Azure storage account info in Datadog" style="width:75%;">}}


{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

Select the **GCS** archive type, and the GCS Service Account that has permissions to write on your storage bucket.

Input your bucket name. **Optional**: Input a prefix directory for all the content of your log archives.

{{< img src="logs/archives/logs_archive_gcp_setup.png" alt="Set your Azure storage account info in Datadog" style="width:75%;">}}

{{% /tab %}}
{{< /tabs >}}

### Advanced settings

#### Datadog permissions

By default:

* All Datadog Admin users can create, edit and reorder. See [Configure Multiple Archives](#multiple-archives) for more information.
* All Datadog Admin and Standard users can rehydrate from archives.
* All users, including Datadog Read Only users, can access rehydrated logs.

Use this optional configuration step to assign roles on that archive and restrict who can:

* Edit that archive configuration. See the [`logs_write_archive`][9] permission.
* Rehydrate from that archive. See the [`logs_read_archives`][10] and [`logs_write_historical_view`][11] permissions.
* Access rehydrated logs in case you use the legacy [`read_index_data` permission][12].

{{< img src="logs/archives/archive_restriction.png" alt="Restrict access to Archives and Rehydrated logs" style="width:75%;">}}

#### Datadog tags

Use this optional configuration step to:

* Include all log tags in your archives (activated by default on all new archives). **Note**: This increases the size of resulting archives.
* Add tags on rehydrated logs according to your Restriction Queries policy. See the [`logs_read_data`][13] permission.

{{< img src="logs/archives/tags_in_out.png" alt="Configure Archive Tags" style="width:75%;">}}

#### Define maximum scan size

Use this optional configuration step to define the maximum volume of log data (in GB) that can be scanned for Rehydration on your Log Archives.

For Archives with a maximum scan size defined, all users need to estimate the scan size before they are allowed to start a Rehydration. If the estimated scan size is greater than what is permitted for that Archive, users must reduce the time range over which they are requesting the Rehydration. Reducing the time range will reduce the scan size and allow the user to start a Rehydration.

{{< img src="logs/archives/max_scan_size.png" alt="Define maximum scan size on Archive" style="width:75%;">}}

{{< site-region region="us3" >}}
#### Firewall rules

{{< tabs >}}
{{% tab "Azure storage" %}}

Firewall rules are not supported.

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}
#### Storage class

{{< tabs >}}
{{% tab "AWS S3" %}}

You can [set a lifecycle configuration on your S3 bucket][1] to automatically transition your log archives to optimal storage classes.

[Rehydration][2] only supports the following storage classes:

* S3 Standard
* S3 Standard-IA
* S3 One Zone-IA
* S3 Glacier Instant Retrieval

If you wish to rehydrate from archives in another storage class, you must first move them to one of the supported storage classes above.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Azure Storage" %}}

Archiving and [Rehydration][1] only supports the following access tiers:

- Hot access tier
- Cool access tier

If you wish to rehydrate from archives in another access tier, you must first move them to one of the supported tiers above.

[1]: /logs/archives/rehydrating/
{{% /tab %}}
{{< /tabs >}}

#### Server side encryption (SSE)

{{< tabs >}}
{{% tab "AWS S3" %}}

##### SSE-S3

The default encryption for Amazon S3 buckets is server-side encryption with Amazon S3 management keys ([SSE-S3][1]).

To confirm your S3 bucket is encrypted with SSE-S3:

1. Navigate to your S3 bucket.
1. Click the **Properties** tab.
1. In the **Default Encryption** section, check that the **Encryption key type** is **Amazon S3 managed keys (SSE-S3)**.

##### SSE-KMS

Alternatively, Datadog supports server-side encryption with a CMK from [AWS KMS][2]. To enable it, take the following steps:

1. Create your CMK.
2. Attach a CMK policy to your CMK with the following content, replacing the AWS account number and Datadog IAM role name appropriately:

```
{
    "Id": "key-consolepolicy-3",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        },
        {
            "Sid": "Allow use of the key",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:role/<MY_DATADOG_IAM_ROLE_NAME>"
            },
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:DescribeKey"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow attachment of persistent resources",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:role/<MY_DATADOG_IAM_ROLE_NAME>"
            },
            "Action": [
                "kms:CreateGrant",
                "kms:ListGrants",
                "kms:RevokeGrant"
            ],
            "Resource": "*",
            "Condition": {
                "Bool": {
                    "kms:GrantIsForAWSResource": "true"
                }
            }
        }
    ]
}
```

3. Go to the **Properties** tab in your S3 bucket and select **Default Encryption**. Choose the "AWS-KMS" option, select your CMK ARN, and save.

For any changes to existing KSM keys, reach out to [Datadog support][3] for further assistance.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
[3]: /help/
{{% /tab %}}

{{< /tabs >}}

### Validation

Once your archive settings are successfully configured in your Datadog account, your processing pipelines begin to enrich all logs ingested into Datadog. These logs are subsequently forwarded to your archive.

However, after creating or updating your archive configurations, it can take several minutes before the next archive upload is attempted. The frequency at which archives are uploaded can vary. **Check back on your storage bucket in 15 minutes** to make sure the archives are successfully being uploaded from your Datadog account. 

After that, if the archive is still in a pending state, check your inclusion filters to make sure the query is valid and matches log events in [Live Tail][14]. When Datadog fails to upload logs to an external archive, due to unintentional changes in settings or permissions, the corresponding Log Archive is highlighted in the configuration page. 

{{< img src="logs/archives/archive_errors_details.png" alt="Check that your archives are properly set up" style="width:100%;">}}

Hover over the archive to view the error details and the actions to take to resolve the issue. An event is also generated in the [Events Explorer][15]. You can create a monitor for these events to detect and remediate failures quickly.

## Multiple archives

If multiple archives are defined, logs enter the first archive based on filter. 

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="Logs enter the first archive whose filter they match on." style="width:100%;">}}

It is important to order your archives carefully. For example, if you create a first archive filtered to the `env:prod` tag and a second archive without any filter (the equivalent of `*`), all your production logs would go to one storage bucket or path, and the rest would go to the other.

## Format of the archives

The log archives that Datadog forwards to your storage bucket are in compressed JSON format (`.json.gz`). Using the prefix you indicate (or `/` if there is none), the archives are stored in a directory structure that indicates on what date and at what time the archive files were generated, such as the following:

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.7dq1a9mnSya3bFotoErfxl.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<DATADOG_ID>.json.gz
```

This directory structure simplifies the process of querying your historical log archives based on their date.

Within the zipped JSON file, each event's content is formatted as follows:

```json
{
    "_id": "123456789abcdefg",
    "date": "2018-05-15T14:31:16.003Z",
    "host": "i-12345abced6789efg",
    "source": "source_name",
    "service": "service_name",
    "status": "status_level",
    "message": "2018-05-15T14:31:16.003Z INFO rid='acb-123' status=403 method=PUT",
    "attributes": { "rid": "abc-123", "http": { "status_code": 403, "method": "PUT" } },
    "tags": [ "env:prod", "team:acme" ]
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/indexes/#exclusion-filters
[2]: /logs/archives/rehydrating/
[3]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[4]: /observability_pipelines/archive_logs/
[5]: /account_management/rbac/permissions/?tab=ui#logs_write_archives
[6]: https://app.datadoghq.com/logs/pipelines/archives
[7]: /integrations/azure/
[8]: https://ip-ranges.datadoghq.com/
[9]: /account_management/rbac/permissions#logs_write_archives
[10]: /account_management/rbac/permissions#logs_read_archives
[11]: /account_management/rbac/permissions#logs_write_historical_view
[12]: /account_management/rbac/permissions#logs_read_index_data
[13]: /account_management/rbac/permissions#logs_read_data
[14]: /logs/explorer/live_tail/
[15]: /service_management/events/explorer/
