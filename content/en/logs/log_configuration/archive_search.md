---
title: Archive Search
description: Instantly search and analyze logs from long-term archives without re-indexing.
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Explore logs in Datadog"
- link: "/logs/log_configuration/archives/"
  tag: "Documentation"
  text: "Configure Log Archives"
- link: "/logs/indexes/"
  tag: "Documentation"
  text: "Manage log retention and indexing"
---

{{< callout url="https://www.datadoghq.com/product-preview/flex-frozen-archive-search/" btn_hidden="false" >}}
Archive Search is in Preview. Request access to search archived logs in real time. No re-indexing, no delays. Instantly access years of data when you need it.
{{< /callout >}}

## Overview

Archive Search lets you query logs directly from long-term object storage archives, without rehydrating them in advance. Use Archive Search for **immediate access to archived logs**, for investigations, audits, or troubleshooting beyond your indexing retention period.

Archive Search differs from Rehydration by streaming results in real time as data is scanned, rather than running as a background batch job. It's more cost-effective, charging only for the scan itself with the first 100,000 logs retained temporarily at no cost, and faster.

When you launch a search:

* Logs stream into a dedicated results page.
* Up to **100,000 logs** are retained for **24 hours**.
* You can optionally **Rehydrate results** before or after the search to keep them longer and make them available throughout Datadog.

This feature supports logs archived through:

- [Datadog Log Management archives][1]
- [Observability Pipelines archives][2]

### Typical use cases

Archive Search is ideal when you need to query logs that are stored in an external archive.
Common use cases include:

- **Incident investigations:** Retrieve logs tied to a `transaction_id`, `user_id`, or `session_id` that fall outside your indexing retention.<br>
  *Example: Query logs from three weeks ago using a specific `user_id`, even if your indexed retention is only 15 days.*

- **Security analysis:** Examine archived logs to investigate login attempts or other activity by IP or user.<br>
  *Example: Retrieve all login attempts from a specific IP address across the last 12 months.*

- **Compliance and audit support:** Access archived customer or billing logs for audits without permanently re-indexing large volumes of data.<br>
  *Example: Query invoice-related logs (`customer_id:12345`, `service:billing`) from the past 18 months for a tax audit.*

## Prerequisites

Before using Archive Search:

1. Configure an external archive (Amazon S3, Azure Storage, or Google Cloud Storage). See [Log Archives][3].
1. Ensure Datadog has permission to read from the archive, see [Cloud-specific permissions](#cloud-specific-permissions).
   * **Amazon S3:** IAM role delegation
   * **Azure Storage:** Azure AD with *Storage Blob Data Contributor* role
   * **Google Cloud Storage:** Service account with *Storage Object Viewer* role

### Permissions

Running an **Archive Search** requires the **`logs_write_historical_views`** permission. It is a **global** permission, but users can only search logs from archives for which they also have the **Logs Read Archive** permission.

Archive Search results are visible to all users in your organization who have access to the Archive Search feature. However, **restriction queries**, such as log security filters and data restrictions configured in Datadog, are still enforced on the result page and apply to all users. This means each user may only see logs they are authorized to view based on organization-wide permissions and filters.

For more information on access controls and log security, see [How to Set Up RBAC for Logs][6].

## Launching a search

1. Go to [**Logs > Archive Search > New Search**][4].
2. Select an Archive and time range.
3. Enter a query, such as `user_id:abc123`.
4. (Optional) Rename the search.
5. Under **Mode**, choose the kind of search you want to perform.
   - Choose **Search** to limit your search to the last 100,000 logs from the last 24 hours.
   - Choose **Search & Rehydration** to specify your own volume and time limit for your search.
6. Click **Search**.

Logs stream into the results page in real time. A progress bar shows scan status, and you can cancel the search at any time.

## Query preview

When you perform a search, Datadog downloads a small sample (up to 1,000 logs) from the selected archive and time range.
Use this preview to verify query syntax, inspect log structure, and adjust filters.

**Note**: The preview sample may not include logs that match your query. It is for validation and exploration only.

## View and retain results

By default, you are charged only for the scan. The first 100,000 logs are stored temporarily (24 hours) at no cost and accessible directly in Archive Search results page, where you can click on any log to see its full details and context. After 24 hours, results expire automatically.

To retain more data or access logs in other Datadog products, choose one of the following:

- **Rehydrate before launch**:
  Retain more than 100,000 logs, set a custom retention period (for example, 7, 15, or 30 days), and access results across the platform immediately.
- **Rehydrate after completion**:
  During the 24-hour window, you can rehydrate results to extend retention and make them available in Log Explorer, Dashboards, and Notebooks.

## Analyze results

After launching a search, logs stream into the **Archive Search Results** page. From this page, you can use filters to narrow down the results and open specific log details to investigate issues.

### Limitations

While Archive Search  provides access to archived logs, it has limited analytical capabilities compared to indexed logs:

- **No aggregations or analytics**: You cannot run aggregations, create visualizations, or perform advanced analytics directly on Archive Search results.
- **Results page only**: Archive Search results are only available in the dedicated results page and cannot be queried from other parts of the Datadog platform (such as Dashboards, Notebooks, or Log Explorer).

To enable full analytics and platform-wide visibility, you need to rehydarte the search results (either before launching the search or after completion within the 24-hour window). When rehydrated, your logs become available across all Datadog products with full aggregation, visualization, and analytics capabilities.

## Manage searches

<!-- {{< img src="path/to/your/image-name-here.png" alt="Your image description" style="width:100%;" >}} -->

From the [**Archive Search list view**][5], you can:

- **Stop** a running search: preserves logs already retrieved.
- **Duplicate** a search: opens the Archive Search creation form with the same parameters for efficient reruns.

## Search performance and scan volume

Archive Search scans archived log files within the selected time range. **Scan volume** is the total size of those files read during the query. Large scan volumes can increase search time and cost.

To improve query performance and reduce scan volume:
- Narrow the time range and use selective filters.
- Administrators with **Logs Write Archives** permission can set maximum scan size per Archive.

## Cloud-specific permissions

Datadog requires the permission to read your archives to search content from them. This permission can be changed at any time.

{{< tabs >}}
{{% tab "Amazon S3" %}}

To rehydrate log events from your archives, Datadog uses the IAM Role in your AWS account that you configured for [your AWS integration][1]. If you have not yet created that Role, [follow these steps to do so][2]. To allow that Role to rehydrate log events from your archives, add the following permission statement to its IAM policies. Be sure to edit the bucket names and, if desired, specify the paths that contain your log archives.

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

### Adding role delegation to S3 archives

Datadog only supports searching from archives that have been configured to use role delegation to grant access. After you have modified your Datadog IAM role to include the IAM policy above, ensure that each archive in your [archive configuration page][3] has the correct AWS Account + Role combination.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /integrations/amazon-web-services/#aws-iam-permissions
[3]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog uses an Azure AD group with the Storage Blob Data Contributor role scoped to your archives' storage account to search log events. You can grant this role to your Datadog service account from your storage account's Access Control (IAM) page by [assigning the Storage Blob Data Contributor role to your Datadog integration app][1].

[1]: /logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

In order to search log events from your archives, Datadog uses a service account with the Storage Object Viewer role. You can grant this role to your Datadog service account from the [Google Cloud IAM Admin page][1] by editing the service account's permissions, adding another role, and then selecting **Storage > Storage Object Viewer**.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/logs/log_configuration/archives/?tab=awss3&site=us
[2]: https://docs.datadoghq.com/observability_pipelines/destinations/amazon_s3/?tab=docker
[3]: https://docs.datadoghq.com/logs/log_configuration/archives/?tab=awss3&site=us
[4]: https://app.datadoghq.com/logs/archive-search/new
[5]: https://app.datadoghq.com/logs/archive-search/
[6]: /logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs
