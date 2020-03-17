---
title: Rehydrating from Archives
kind: Documentation
description: "Capture log events from your archives back into Datadog."
aliases:
  - /logs/historical-views
---

## Overview

Log Rehydration* enables you to capture log events from customer-owned storage-optimized archives back into Datadog's search-optimized [Log Explorer][1], so that you can use Datadog to analyze or investigate log events that are either old or were excluded from indexing.

## Historical views

With historical views, teams rehydrate archived log events precisely by timeframe and query filter to meet specific, unexpected use cases efficiently. To create a historical view, go the [Configuration page][2] of your Datadog account and select the [“Rehydrate From Archives” tab][3], then the “New Historical View” button.

{{< img src="logs/archives/log_archives_rehydrate_historical.png" alt="Historical Views"  style="width:75%;">}}

Index exclusion filters do not apply to historical views, so there is no need to modify exclusion filters when you rehydrate from archives. 

### Add new historical views

1. **Select the archive** from which you wish to rehydrate log events. Only archives that are [configured to use role delegation](#permissions) are available for rehydrating.

2. **Choose the time period** for which you wish to rehydrate log events.

3. **Input the query**. The query syntax is the same as that of the [log explorer search][4], but is limited to log attributes, [reserved attributes][5], and free text search on the message.

4. **Name your historical view**. Names must begin with a lowercase letter and can only contain lowercase letters, numbers, and the `-` character.

5. (Optional) **Add a description** to give your team context about the purpose of the historical view.

{{< img src="logs/archives/log_archives_rehydrate_reload.png" alt="Reload from Archive"  style="width:75%;">}}

#### Rehydrate by Query

By creating historical views with specific queries (for example, over one or more services, URL endpoints, or customer IDs), you can reduce the time and cost involved in rehydrating your logs. This is especially helpful when rehydrating over wider time ranges. You can rehydrate up to 300 million log events per historical view you create.

### View historical view content

#### From the historical view page

After selecting “Rehydrate from Archive,” the historical view is marked as “pending” until its content is ready to be queried.

Once the content is rehydrated, the historical view is marked as active, and the link in the query column leads to the historical view in the log explorer.

#### From the log explorer

Alternatively, teams can find the historical view from the Log Explorer directly from the index selector.   
{{ if .Inner }}When selecting a historical view, a pop-up offers to set the timeframe to one that is relevant to the selected historical view.{{ end }}

{{< img src="logs/archives/log_archives_historical_index_selector.png" alt="Log Explorer" width="75%">}}

### Deleting historical views

Historical views stay in Datadog until you opt to delete them. You can mark a historical view to be deleted by selecting and confirming the delete icon at the far right of the historical view.

24 hours later, the historical view is definitively deleted; until that time, the team is able to cancel the deletion.

{{< img src="logs/archives/log_archives_rehydrate_delete.mp4" alt="Deleting Historical Views" video="true"  width="75%" >}}

## Setting up archive rehydrating

### Define a Datadog archive

An external archive must be configured in order to rehydrate data from it. [Follow the guide][6] to archive your logs in the available destinations.

### Permissions

Datadog requires the permission to read from your archives in order to rehydrate content from them. This permission can be changed at any time.

{{< tabs >}}
{{% tab "AWS S3" %}}

In order to rehydrate log events from your archives, Datadog uses the IAM Role in your AWS account that you configured for [your AWS integration][1]. If you have not yet created that Role, [follow these steps to do so][2]. To allow that Role to rehydrate log events from your archives, add the following permission statement to its IAM policies. Be sure to edit the bucket names and, if desired, specify the paths that contain your log archives.

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

#### Adding role delegation to S3 archives

Datadog only supports rehydrating from archives that have been configured to use role delegation to grant access. Once you have modified your Datadog IAM role to include the IAM policy above, ensure that each archive in your [archive configuration page][3] has the correct AWS Account + Role combination.

{{< img src="logs/archives/log_archives_rehydrate_configure_s3.png" alt="Adding role delegation to S3 archives"  style="width:75%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /integrations/amazon_web_services/?tab=allpermissions#installation
[3]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog uses an Azure AD group with the Storage Blob Data Contributor role scoped to your archives' storage account to rehydrate log events. You can grant this role to your Datadog service account from your storage account's Access Control (IAM) page by [assigning the Storage Blob Data Contributor role to your Datadog integration app][1]. 

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Rehydration from Azure Storage requires the Storage Blob Data Contributor role"  style="width:75%;">}}


[1]: /logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

In order to rehydrate log events from your archives, Datadog uses a service account with the Storage Object Viewer role. You can grant this role to your Datadog service account from the [GCP IAM Admin page][1] by editing the service account's permissions, adding another role, and then selecting Storage > Storage Object Viewer.

{{< img src="logs/archives/log_archives_gcs_role.png" alt="Rehydration from GCS requires the Storage Object Viewer role"  style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

*Log Rehydration is a trademark of Datadog, Inc.

[1]: /logs/explorer
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/logs/pipelines/historical-views
[4]: /logs/explorer/search
[5]: /logs/?tab=ussite#reserved-attributes
[6]: /logs/archives/
