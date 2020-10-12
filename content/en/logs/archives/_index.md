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

## Archives

Configure your Datadog account to forward all the logs ingested to a cloud storage system. Keeping your logs in a storage-optimized archive for longer periods of time enables you to meet compliance requirements, and to keep auditability for ad hoc investigations within budget. Once your logs are archived for the long term, [you have access to them][1] should you ever need to investigate something unexpected—or that might have happened a long time ago.

This guide shows you how to set up an archive for forwarding ingested logs to your own cloud-hosted storage bucket.

**Note:** only Datadog users with admin status can create, modify, or delete log archive configurations.

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="Archive page view"  style="width:75%;">}}

## Create and configure a storage bucket


#### Set Integration

{{< tabs >}}
{{% tab "AWS S3" %}}

If not already configured, set up the [AWS integration][1] for the AWS account that holds your S3 bucket. 

* In the general case, this involves creating a role that Datadog can use to integrate with AWS S3.
* Specifically for AWS GovCloud or China accounts, use Access Keys as an alternative to Role Delegation.

[1]: integrations/amazon_web_services/?tab=automaticcloudformation#setup

{{% /tab %}}
{{% tab "Azure Storage" %}}

Set up the [Azure integration][1] within the subscription that holds your new storage account, if you haven't already. This involves [creating an App Registration that Datadog can use][2] to integrate with.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal

{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Set up the [GCP integration][1] for the project that holds your GCS storage bucket, if you haven’t already. This involves [creating a GCS Service Account that Datadog can use][2] to integrate with.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /integrations/google_cloud_platform/?tab=datadogussite#setup

{{% /tab %}}
{{< /tabs >}}


### Create a Storage Bucket

{{< tabs >}}
{{% tab "AWS S3" %}}

Go into your [AWS console][1] and [create an S3 bucket][2] to send your archives to. Be careful not to make your bucket publicly readable.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html

{{% /tab %}}

{{% tab "Azure Storage" %}}

Go to your [Azure Portal][1] and [create a storage account][2] to send your archives to. Give your storage account a name, any account kind, and select the **hot** access tier.

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal

{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Go to your [GCP account][1] and [create a GCS bucket][2] to send your archives to. Under "Choose how to control access to objects", select "Set object-level and bucket-level permissions."

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console


{{% /tab %}}
{{< /tabs >}}

### Set Permissions


{{< tabs >}}
{{% tab "AWS S3" %}}

Add the following two permission statements to the IAM policies. Edit the bucket names and, if desired, specify the paths that contain your log archives. 

*Note*: 

* The `GetObject` and `ListBucket` permissions allow for [Rehydrating from Archives][1]. 
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

Grant your Datadog GCP Service Account sufficient permissions to write your archives to your bucket.

* If you’re creating a new Service Account, this can be done from the [GCP Credentials page][1]. 
* If you’re updating an existing Service Account, this can be done from the [GCP IAM Admin page][2]). 

Add the roles under **Storage** called **Storage Object Creator** (for generating archives) and **Storage Object Viewer** (for rehydrating from archives).


  {{< img src="logs/archives/gcp_role_storage_object_creator.png" alt="Add the Storage Object Creator role to your Datadogh GCP Service Account." style="width:75%;">}}

[1]: https://console.cloud.google.com/apis/credentials
[2]: https://console.cloud.google.com/iam-admin/iam

{{% /tab %}}
{{< /tabs >}}


### Route your Logs to a Bucket

Go to your [Archives page][99] in Datadog and select the **Add a new archive** option at the bottom. 

Only Datadog users with [Logs Write Archive permission][98] can complete this and the following step.

[98]: /account_management/rbac/permissions/?tab=ui#logs_write_archives
[99]: https://app.datadoghq.com/logs/pipelines/archives


{{< tabs >}}
{{% tab "AWS S3" %}}

Select the appropriate AWS account + role combination for your S3 bucket. 

Input your bucket name. **Optional**: input a prefix directory for all the content of your log archives.

{{< img src="logs/archives/logs_archive_aws_setup.png" alt="Set your S3 bucket info in Datadog"  style="width:75%;">}}

{{% /tab %}}
{{% tab "Azure Storage" %}}


Select the **Azure Storage** archive type, and the Azure Tenant and Client for the Datadog App that has the Storage Blob Data Contributor role on your storage account. 

Input your storage account name and a container name for your archive. **Optional**: input a prefix directory for all the content of your log archives.

{{< img src="logs/archives/logs_archive_azure_setup.png" alt="Set your Azure storage account info in Datadog"  style="width:75%;">}}


{{% /tab %}}
{{% tab "Google Cloud Storage" %}}


Select the **GCS** archive type, and the GCS Service Account that has permissions to write on your storage bucket. 

Input your bucket name. **Optional**: input a prefix directory for all the content of your log archives.

{{< img src="logs/archives/logs_archive_gcp_setup.png" alt="Set your Azure storage account info in Datadog"  style="width:75%;">}}


{{% /tab %}}
{{< /tabs >}}

### Advanced Settings

{{< tabs >}}
{{% tab "AWS S3" %}}

#### Storage Class

You can [set a lifecycle configuration on your S3 bucket][3] to automatically transition your log archives to optimal storage classes. 

[Rehydration][4] supports all storage classes except for Glacier and Glacier Deep Archive. If you wish to rehydrate from archives in the Glacier or Glacier Deep Archive storage classes, you must first move them to a different storage class.

#### Server side encryption (SSE)

##### SSE-S3

The easiest method to add server side encryption to your S3 log archives is with S3's native server side encryption, [SSE-S3][5]. 
To enable it, go to the **Properties** tab in your S3 bucket and select **Default Encryption**. Select the `AES-256` option and **Save**.

{{< img src="logs/archives/log_archives_s3_encryption.png" alt="Select the AES-256 option and Save."  style="width:75%;">}}

##### SSE-KMS

Alternatively, Datadog supports server side encryption with a CMK from [AWS KMS][6]. To enable it, take the following steps:

1. Create your CMK
2. Attach a CMK policy to your CMK with the following content, replacing the AWS account number and Datadog IAM role name approproiately:

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


[3]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html

[5]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html
[6]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html


{{% /tab %}}
{{% tab "Azure Storage" %}}

-

{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

-

{{% /tab %}}
{{< /tabs >}}


## Validation

Once your archive settings are successfully configured in your Datadog account, your processing pipelines begin to enrich all the logs that Datadog ingests. These logs are subsequently forwarded to your archive.

However, after creating or updating your archive configurations, it can take several minutes before the next archive upload is attempted. Logs are uploaded to the archive every 15 minutes, so **you should check back on your storage bucket in 15 minutes** maximum to make sure the archives are successfully being uploaded from your Datadog account. 

## Format of the Archives

The log archives that Datadog forwards to your storage bucket are in compressed JSON format (`.json.gz`). Under whatever prefix you indicate (or `/` if there is none), the archives are stored in a directory structure that indicates on what date and at what time the archive files were generated, like so:

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.7dq1a9mnSya3bFotoErfxl.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<DATADOG_ID>.json.gz
```

This directory structure simplifies the process of querying your historical log archives based on their date.

Within the zipped JSON file, each event’s content is formatted as follows:

```text
{
    "_id": "123456789abcdefg",
    "date": "2018-05-15T14:31:16.003Z",
    "host": "i-12345abced6789efg",
    "source": "source_name",
    "service": "service_name",
    "status": "status_level",
    "message": " ... log message content ... ",
    "attributes": { ... log attributes content ... }
}
```

**Note**: Archives only include log content, which consists of the message, custom attributes, and reserved attributes of your log events. The log tags (metadata that connects your log data to related metrics and traces) are not included.

## Multiple Archives

Admins can route specific logs to an archive by adding a query in the archive’s filter field. Logs enter the first archive whose filter they match on, so it is important to order your archives carefully.

For example, if you create a first archive filtered to the `env:prod` tag and a second archive without any filter (the equivalent of `*`), all your production logs would go to one storage bucket/path, and the rest would go to the other.

Logs enter the first archive whose filter they match on.

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="Logs enter the first archive whose filter they match on."  style="width:75%;">}}

{{< whatsnext desc="Next, learn how to access your archived log content from Datadog:" >}}
    {{< nextlink href="/logs/archives/rehydrating" >}}<u>Rehydrate from Archives</u>: Capture log events from your archives back into Datadog's Log Explorer.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/archives/rehydrating/
