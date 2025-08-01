---
title: Rehydrating from Archives
description: "Capture log events from your archives back into Datadog."
aliases:
  - /logs/historical-views
  - /logs/archives/rehydrating/
further_reading:
- link: "logs/archives"
  tag: "Documentation"
  text: "Log Archives documentation"
---

## Overview

Log Rehydration* enables you to capture log events from customer-owned storage-optimized archives back into Datadog's search-optimized [Log Explorer][1], so that you can use Datadog to analyze or investigate log events that are either old or were excluded from indexing.

### Historical views

With historical views, teams rehydrate archived log events by time frame and query filter to meet specific, unexpected use cases efficiently. By creating historical views with specific queries (for example, over one or more services, URL endpoints, or customer IDs), you can reduce the time and cost involved in rehydrating your logs. This is especially helpful when rehydrating over wider time ranges.

**Key features:**
- Rehydrate up to 1 billion log events per historical view
- Index exclusion filters do not apply to historical views, so there is no need to modify exclusion filters when you rehydrate from archives
- If you download historical views as a CSV, the data is limited to the last 90 days

## Prerequisites

Before you can rehydrate logs from archives, you need to complete the following setup steps:

### Archive configuration

You must have an external archive configured to rehydrate data from it. To archive your logs in the available destinations (Amazon S3, Azure Storage, or Google Cloud Storage), see [Log Archives][8].

### Permissions and authentication

Datadog requires permission to read from your archives to rehydrate content. Archives must be configured with appropriate authentication:

- **S3**: Must use role delegation (IAM roles)
- **Azure Storage**: Must use Azure AD with Storage Blob Data Contributor role
- **Google Cloud Storage**: Must use service account with Storage Object Viewer role

Only archives with proper authentication are available for rehydrating. For detailed setup instructions, see [Cloud-specific permissions](#cloud-specific-permissions).

## Rehydrating logs with historical views

1. Navigate to the [Rehydration][3] page.
2. Click **New Historical View**.
3. Select the time period for rehydration.
4. Choose the archive you want to rehydrate log events from. Only archives that are [configured to use role delegation](#permissions) are available for rehydrating.
5. (Optional) Estimate scan size and get the total amount of compressed data that is contained in your archive for the selected time frame.
6. Name your historical view. Names must begin with a lowercase letter and can only contain lowercase letters, numbers, and the `-` character.
7. Set the indexing query using the [Log Explorer search syntax][4]. Make sure your logs are [archived with their tags][5] if you use tags (such as `env:prod` or `version:x.y.z`) in the rehydration query.
8. Define the log limit (maximum logs to rehydrate). When the limit of the rehydration is reached, log reloading stops, but you still have access to the rehydrated logs.
9. Set the retention period of the rehydrated logs. This defines how long rehydrated logs stay searchable. Available retentions are based on your contract, default is 15 days.
10. (Optional) [Configure completion notifications](#rehydration-notifications) through [integrations][6] with the @handle syntax.

For more information on the rehydration scan size, see [Understanding rehydration scan sizes](#understanding-rehydration-scan-sizes).


## Historical views management

### Viewing historical view content

**From the historical view page**:
After selecting "Rehydrate from Archive," the historical view is marked as "PENDING" until its content is ready to be queried.

After the content is rehydrated, the historical view is marked as "ACTIVE", and the link in the query column leads to the historical view in the Log Explorer.

**From the Log Explorer**:
In the Log Explorer, open the Index facet in the index selector. Select the Historical indexes to include in your search.

{{< img src="logs/archives/log_archives_historical_index_selector.png" alt="Log Explorer" width="90%">}}

### Canceling ongoing historical views

Cancel ongoing rehydrations from the [Rehydration][3] page to stop jobs with the incorrect time ranges or with typos in the indexing query.

Logs that have already been indexed remain queryable until the end of the retention period selected for the historical view. All scanned and indexed logs will still be billed.

{{< img src="logs/archives/log_archives_cancel_ongoing_rehydration_settings.png" alt="Canceling ongoing historical view rehydrations in Datadog" width="90%" >}}

### Deleting historical views

Historical views remain in Datadog until they exceed the selected retention period, unless you choose to delete them earlier. To delete a historical view manually, select the delete icon at the far right of the view and confirm the action.

The historical view is permanently deleted one day after the deletion is initiated. Until then, the team can cancel the deletion.

### Viewing deleted historical views

View deleted historical views for up to 1 year in the past using the `View` dropdown menu:

{{< img src="logs/archives/log_archives_deleted_rehydrations_settings.png" alt="Viewing deleted historical views in Datadog" width="90%" >}}

## Advanced configuration

### Rehydration notifications

Events are triggered automatically when a rehydration starts and finishes. These events are available in your [Events Explorer][7].

You can use the built-in template variables to customize the notification triggered at the end of the rehydration:

| Variable                      | Description                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| `{{archive}}`                 | Name of the archives used for the rehydration.                           |
| `{{from}}`                    | Start of the time range selected for the rehydration.                    |
| `{{to}}`                      | End of the time range selected for the rehydration.                      |
| `{{scan_size}}`               | Total size of the files processed during the rehydration.                |
| `{{number_of_indexed_logs}}`  | Total number of rehydrated logs.                                         |
| `{{explorer_url}}`            | Direct link to the rehydrated logs.                                      |

### Default limit for historical views

Admins with the `Logs Write Archives` permission can configure default controls to ensure efficient use of Log Rehydration* across teams. Click **Settings** to configure:

- **Default Rehydration volume limit**: Define the default number of logs (in millions) that can be rehydrated per historical view. If the limit is reached, the rehydration automatically stops, but already rehydrated logs remain accessible. Admins can also allow this limit to be overridden during view creation.

- **Rehydration retention periods**: Choose which retention periods are available when creating rehydrations. Only the selected durations (for example, 3, 7, 15, 30, 45, 60, 90, or 180 days) appear in the dropdown menu when selecting how long logs should remain searchable in Datadog.

### Cloud-specific permissions

Datadog requires the permission to read from your archives in order to rehydrate content from them. This permission can be changed at any time.

{{< tabs >}}
{{% tab "Amazon S3" %}}

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

{{< img src="logs/archives/log_archives_rehydrate_configure_s3.png" alt="Adding role delegation to S3 archives" style="width:75%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /integrations/amazon_web_services/?tab=allpermissions#installation
[3]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog uses an Azure AD group with the Storage Blob Data Contributor role scoped to your archives' storage account to rehydrate log events. You can grant this role to your Datadog service account from your storage account's Access Control (IAM) page by [assigning the Storage Blob Data Contributor role to your Datadog integration app][1].

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Rehydration from Azure Storage requires the Storage Blob Data Contributor role" style="width:75%;">}}


[1]: /logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

In order to rehydrate log events from your archives, Datadog uses a service account with the Storage Object Viewer role. You can grant this role to your Datadog service account from the [Google Cloud IAM Admin page][1] by editing the service account's permissions, adding another role, and then selecting Storage > Storage Object Viewer.

{{< img src="logs/archives/log_archives_gcs_role.png" alt="Rehydration from GCS requires the Storage Object Viewer role" style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}


## Understanding rehydration scan sizes

The query is applied _after_ the files matching the time period are downloaded from your archive. As a result, the rehydration scan size is based on the **total volume of logs retrieved from the archive**, not the number of logs matching the query. Archive storage is time-based, so queries scoped to specific filters (such as `service:A`) still retrieve all logs within the selected time window. This includes logs from other services (such as `service:A` and `service:B`).

Reducing the date range is the most effective way to limit scan size and minimize cloud data transfer costs, because query filters are applied after data is downloaded

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration is a trademark of Datadog, Inc.

[1]: /logs/explorer/
[3]: https://app.datadoghq.com/logs/pipelines/historical-views
[4]: /logs/explorer/search/
[5]: /logs/archives/?tab=awss3#datadog-tags
[6]: /integrations/#cat-notification
[7]: /events/
[8]: /logs/archives/