---
title: Log Archives
kind: documentation
description: Forward all your ingested logs to long term storage.
aliases:
  - /logs/s3/
  - /logs/gcs/
  - /logs/archives/s3/
  - /logs/archives/gcs/
  - /logs/archives/gcp/
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Log Explorer"
- link: "/logs/logging_without_limits/"
  tag: "Documentation"
  text: "Logging without Limits*"
---

## Overview

Configure your Datadog account to forward all the logs ingested - whether [indexed][1] or not - to a cloud storage system of your own. Keep your logs in a storage-optimized archive for longer periods of time and meet compliance requirements while also keeping auditability for ad hoc investigations, with [Rehydration][2].

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="Archive page view"  style="width:75%;">}}

This guide shows you how to set up an archive for forwarding ingested logs to your own cloud-hosted storage bucket:

1. Set up a Datadog [integration](#set-up-an-integration) for your cloud provider (if you haven't already)
2. Create a [storage bucket](#create-a-storage-bucket)
3. Set [permissions](#set-permissions) to read and/or write on that archive
4. [Route your logs](#route-your-logs-to-a-bucket) to and from that archive
5. Configure [advanced settings](#advanced-settings) such as encryption, storage class, and tags
6. [Validate](#validation) your setup checking for possible misconfigurations that Datadog would be able to detect for you

**Note:** only Datadog users with [Logs Write Archive permission][3] can create, modify, or delete log archive configurations.

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

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Set up the [GCP integration][1] for the project that holds your GCS storage bucket, if you haven’t already. This involves [creating a GCP service account that Datadog can use][2] to integrate with.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### Create a storage bucket

{{< tabs >}}
{{% tab "AWS S3" %}}

Go into your [AWS console][1] and [create an S3 bucket][2] to send your archives to. Be careful not to make your bucket publicly readable.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
{{% /tab %}}

{{% tab "Azure Storage" %}}

* Go to your [Azure Portal][1] and [create a storage account][2] to send your archives to. Give your storage account a name, any account kind, and select the **hot** access tier.
* Create a **container** service into that storage account. Please take a note of the container name as you will need to add this in Datadog Archive Page. 

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Go to your [GCP account][1] and [create a GCS bucket][2] to send your archives to. Under "Choose how to control access to objects", select "Set object-level and bucket-level permissions."

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
{{% /tab %}}
{{< /tabs >}}

### Set permissions

{{< tabs >}}
{{% tab "AWS S3" %}}

Add the following two permission statements to the IAM policies. Edit the bucket names and, if desired, specify the paths that contain your log archives.

*Note*:

* The `GetObject` and `ListBucket` permissions allow for [rehydrating from archives][1].
* The `PutObject` permission is sufficient for uploading archives.


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


[1]: /logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Azure Storage" %}}

* Grant your Datadog App sufficient permission to write to and rehydrate from your storage account.
* Select your storage account from the [Storage Accounts page][1], go to **Access Control (IAM)**, and select **Add -> Add Role Assignment**.
* Input the Role called **Storage Blob Data Contributor**, select the Datadog App that you created for integrating with Azure, and save.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Add the Storage Blob Data Contributor role to your Datadog App." style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

Grant your Datadog GCP service account sufficient permissions to write your archives to your bucket.

* If you’re creating a new Service Account, this can be done from the [GCP Credentials page][1].
* If you’re updating an existing Service Account, this can be done from the [GCP IAM Admin page][2]).

Add the roles under **Storage** called **Storage Object Creator** (for generating archives) and **Storage Object Viewer** (for rehydrating from archives).

  {{< img src="logs/archives/gcp_role_storage_object_creator.png" alt="Add the Storage Object Creator role to your Datadogh GCP Service Account." style="width:75%;">}}


[1]: https://console.cloud.google.com/apis/credentials
[2]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### Route your logs to a bucket

Go to your [Archives page][4] in Datadog and select the **Add a new archive** option at the bottom.

Only Datadog users with [Logs Write Archive permission][3] can complete this and the following step.

{{< tabs >}}
{{% tab "AWS S3" %}}

Select the appropriate AWS account and role combination for your S3 bucket.

Input your bucket name. **Optional**: Input a prefix directory for all the content of your log archives.

{{< img src="logs/archives/logs_archive_aws_setup.png" alt="Set your S3 bucket info in Datadog"  style="width:75%;">}}

{{% /tab %}}
{{% tab "Azure Storage" %}}

Select the **Azure Storage** archive type, and the Azure tenant and client for the Datadog App that has the Storage Blob Data Contributor role on your storage account.

Input your storage account name and the container name for your archive. **Optional**: Input a prefix directory for all the content of your log archives.

{{< img src="logs/archives/logs_archive_azure_setup.png" alt="Set your Azure storage account info in Datadog"  style="width:75%;">}}


{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

Select the **GCS** archive type, and the GCS Service Account that has permissions to write on your storage bucket.

Input your bucket name. **Optional**: Input a prefix directory for all the content of your log archives.

{{< img src="logs/archives/logs_archive_gcp_setup.png" alt="Set your Azure storage account info in Datadog"  style="width:75%;">}}

{{% /tab %}}
{{< /tabs >}}

### Advanced settings

#### Datadog permissions

By default:

* All Datadog Admin users can create, edit and reorder (see [Configure Multiple Archives](#configure-multiple-archives) archives
* All Datadog Admin and Standard users can rehydrate from archives
* All users, including Datadog Read Only users, can access rehydrated logs

Use this optional configuration step to assign roles on that archive and restrict who can:

* Edit that archive configuration. See the [logs_write_archive][5] permission.
* Rehydrate from that archive. See the [logs_read_archives][6] and [logs_write_historical_view][7].
* Access rehydrated logs in case you use the legacy [Read Index Data permission][8].

{{< img src="logs/archives/archive_restriction.png" alt="Restrict access to Archives and Rehydrated logs"  style="width:75%;">}}

#### Datadog tags

Use this configuration optional step to:

* Include all log tags in your archives (activated by default on all new archives). **Note**: This increases the size of resulting archives.  
* Add tags on rehydrated logs according to your Restriction Queries policy. See [logs_read_data][9] permission.

{{< img src="logs/archives/tags_in_out.png" alt="Configure Archive Tags"  style="width:75%;">}}

#### Storage class

{{< tabs >}}
{{% tab "AWS S3" %}}

You can [set a lifecycle configuration on your S3 bucket][1] to automatically transition your log archives to optimal storage classes.

[Rehydration][2] supports all storage classes except for Glacier and Glacier Deep Archive. If you wish to rehydrate from archives in the Glacier or Glacier Deep Archive storage classes, you must first move them to a different storage class.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /logs/archives/rehydrating/
{{% /tab %}}

{{< /tabs >}}

#### Server side encryption (SSE)

{{< tabs >}}
{{% tab "AWS S3" %}}

##### SSE-S3

The easiest method to add server side encryption to your S3 log archives is with S3's native server side encryption, [SSE-S3][1].

To enable it, go to the **Properties** tab in your S3 bucket and select **Default Encryption**. Select the `AES-256` option and **Save**.

{{< img src="logs/archives/log_archives_s3_encryption.png" alt="Select the AES-256 option and Save."  style="width:75%;">}}

##### SSE-KMS

Alternatively, Datadog supports server side encryption with a CMK from [AWS KMS][2]. To enable it, take the following steps:

1. Create your CMK
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


[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
{{% /tab %}}

{{< /tabs >}}

### Validation

Once your archive settings are successfully configured in your Datadog account, your processing pipelines begin to enrich all the logs that Datadog ingests. These logs are subsequently forwarded to your archive.

However, after creating or updating your archive configurations, it can take several minutes before the next archive upload is attempted. Logs are uploaded to the archive every 15 minutes, so **you should check back on your storage bucket in 15 minutes** maximum to make sure the archives are successfully being uploaded from your Datadog account. After that, if the archive is still in a pending state, you may want to check your inclusion filters to make sure the query is valid and matches log events in [live tail][10]. 

In case Datadog detects some broken configuration, the corresponding archive is highlighted in the configuration page. Check on the error icon what actions to take in order to fix it.

{{< img src="logs/archives/archive_validation.png" alt="Check that your archives are properly set up."  style="width:75%;">}}

## Multiple archives

In case multiple archives are defined, logs enter the first archive whose filter they match on. So it is important to order your archives carefully.

For example, if you create a first archive filtered to the `env:prod` tag and a second archive without any filter (the equivalent of `*`), all your production logs would go to one storage bucket/path, and the rest would go to the other.

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="Logs enter the first archive whose filter they match on."  style="width:75%;">}}

## Format of the archives

The log archives that Datadog forwards to your storage bucket are in compressed JSON format (`.json.gz`). Under whatever prefix you indicate (or `/` if there is none), the archives are stored in a directory structure that indicates on what date and at what time the archive files were generated, like so:

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.7dq1a9mnSya3bFotoErfxl.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<DATADOG_ID>.json.gz
```

This directory structure simplifies the process of querying your historical log archives based on their date.

Within the zipped JSON file, each event’s content is formatted as follows:

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

**Note**: Adding tags in archives is an opt-in feature - see in the [Datadog tags section](#datadog-tags) to enable it for an archive.

## Further Reading

{{< whatsnext desc="Next, learn how to access your archived log content from Datadog:" >}}
    {{< nextlink href="/logs/archives/rehydrating" >}}<u>Rehydrate from Archives</u>: Capture log events from your archives back into Datadog's Log Explorer.{{< /nextlink >}}
{{< /whatsnext >}}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/indexes/#exclusion-filters
[2]: /logs/archives/rehydrating/
[3]: /account_management/rbac/permissions/?tab=ui#logs_write_archives
[4]: https://app.datadoghq.com/logs/pipelines/archives
[5]: /account_management/rbac/permissions#logs_write_archives
[6]: /account_management/rbac/permissions#logs_read_archives
[7]: /account_management/rbac/permissions#logs_write_historical_view
[8]: /account_management/rbac/permissions#logs_read_index_data
[9]: /account_management/rbac/permissions#logs_read_data
[10]: /logs/explorer/live_tail/
