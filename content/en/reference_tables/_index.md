---
title: Reference Tables
description: "Combine custom metadata with Datadog data by uploading CSV files or connecting cloud storage to enrich logs, security data, and analytics."
aliases:
  - /logs/guide/enrichment-tables/
  - /logs/guide/reference-tables/
  - /integrations/guide/reference-tables
further_reading:
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Use the lookup processor to enrich logs from a Reference Table"
- link: "/logs/explorer/advanced_search#filter-logs-based-on-reference-tables"
  tag: "Documentation"
  text: "Filter logs based on Reference Tables"
- link: "/sheets/#lookup"
  tag: "Documentation"
  text: "Sheets lookup"
- link: "/service_management/events/pipelines_and_processors/lookup_processor/"
  tag: "Documentation"
  text: "Lookup processor for Events"
- link: "/cloud_cost_management/tag_pipelines/#map-multiple-tags"
  tag: "Documentation"
  text: "Use Reference Tables to add multiple tags to cost data"
- link: 'https://www.datadoghq.com/blog/add-context-with-reference-tables/'
  tag: 'Blog'
  text: 'Add more context to your logs with Reference Tables'
- link: 'https://www.datadoghq.com/blog/reference-tables/'
  tag: 'Blog'
  text: 'Enrich your existing Datadog telemetry with custom metadata using Reference Tables'
- link: 'https://www.datadoghq.com/blog/add-context-with-reference-tables-in-cloud-siem/'
  tag: 'Blog'
  text: 'Add more context to Cloud SIEM detections and investigations with Datadog Reference Tables'
---

## Overview

Reference Tables allow you to combine custom metadata with information already in Datadog. You can define new entities like customer details, service names and information, or IP addresses by uploading a CSV file containing a table of information. The entities are represented by a primary key in a Reference Table and the associated metadata.

{{< img src="reference_tables/reference-table.png" alt="A reference table with data populated in the columns for org id, org name, parent org, account owner, and csm" style="width:100%;">}}

For example, you can:

- **Enrich logs and security data for faster investigations:** Correlate logs, traces, and security events with up-to-date business context—such as customer names, account owners, threat intelligence, or error code descriptions—to accelerate troubleshooting and analysis.
- **Segment users and resources for targeted analytics and cost management:** Group users, customers, or cloud resources into meaningful segments (like user tiers, teams, or business units) for deeper product analytics and precise cost attribution using tools like Tag Pipelines.
- **Enhance data for advanced querying and reporting:** Join external data from Reference Tables in Sheets, DDSQL Editor, or Notebooks to perform complex queries, aggregations, and build custom reports without technical expertise.

## Create a Reference Table

Datadog supports the following data sources, including integrations and manual CSV upload:

{{< tabs >}}
{{% tab "Cloud storage" %}}

{{% collapse-content title="Manual upload" level="h4" expanded=true %}}

Click **New Reference Table +**, then upload a CSV file, name the appropriate columns, and define the primary key for lookups.

{{< img src="reference_tables/enrichment-table-setup.png" alt="The Define the Schema section showing a table with org_id marked as the primary key and columns with data for org id, org name, parent org, account owner, and csm " style="width:100%;">}}

**Note**: The manual CSV upload method supports files up to 4MB.

{{% /collapse-content %}}

{{% collapse-content title="Amazon S3" level="h4" id="amazon-s3" %}}

Reference Tables can automatically pull a CSV file from an Amazon S3 bucket to keep your data up to date. The integration looks for changes to the CSV file in S3, and when the file is updated it replaces the Reference Table with the new data. This also enables API updating with the S3 API once the initial Reference Table is configured. **Note**: Reference Tables are not replaced if the content of the CSV file is unchanged.

To update Reference Tables from S3, Datadog uses the IAM role in your AWS account that you configured for the [AWS integration][1]. If you have not yet created that role, [follow these steps][2] to do so. To allow that role to update your Reference Tables, add the following permission statement to its IAM policies. Be sure to edit the bucket names to match your environment.

**Note**: If using server-side encryption, you can upload Reference Tables encrypted with Amazon S3-managed keys (SSE-S3) or AWS Key Management Service keys (SSE-KMS).

```json
{
	"Statement": [
		{
			"Sid": "EnrichmentTablesS3",
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
				// Grant KMS decrypt permissions if uploading KMS-encrypted object
				// "kms:Decrypt",
				"s3:ListBucket"
			],
			"Resource": [
				"arn:aws:s3:::<MY_BUCKET_NAME_1/*>",
				"arn:aws:s3:::<MY_BUCKET_NAME_2>"
			]
		}
	],
	"Version": "2012-10-17"
}
```
#### Define the table

Click **New Reference Table +**, then add a name, select Amazon S3, fill out all fields, click import, and define the primary key for lookups.

{{< img src="reference_tables/configure-s3-reference-table.png" alt="The upload your data section with the Amazon S3 tile selected and data filled in for AWS Account, Bucket, and Path" style="width:100%;">}}

**Note**: The upload from an S3 bucket method supports files up to 200MB.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#installation

{{% /collapse-content %}} 
{{% collapse-content title="Azure storage" level="h4" id="azure-storage" %}}

1. If you haven't already, set up the [Azure integration][1] within the subscription that holds the storage account from which you want to import your Reference Table. This involves [creating an app registration that Datadog can][2] integrate with.
2. In the Azure Portal, select the storage account that stores your Reference Table files.
3. Within your storage account, navigate to **Access Control (IAM)** and select **Add** > **Add Role Assignment**.
4. Input and select the **Storage Blob Data Reader** Role. The [Storage Blob Data Reader role][3] allows Datadog to read and list storage containers and blobs.
5. In the **Members** tab, click **+ Select members**. Select the app registration you created in Step 1.

   {{< img src="reference_tables/add_members.png" alt="The Members section in the Azure Portal where a member is selected and data filled in for the Name, Object ID, and Type" style="width:85%;">}}

After reviewing and assigning the role, you can import into Reference Tables from Azure. It may take a few minutes for your Azure configuration to update in Datadog.

{{< img src="reference_tables/azure_storage.png" alt="An Azure Storage tile in the Upload or import data section of a new reference table workflow" style="width:80%;">}}

For more information, see the [Azure integration documentation][4].

**Note**: The upload from cloud object storage supports files up to 200MB.

[1]: https://app.datadoghq.com/integrations/azure
[2]: /integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
[3]: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#storage-blob-data-reader
[4]: /integrations/azure/

{{% /collapse-content %}} 
{{% collapse-content title="Google Cloud storage" level="h4" id="google-cloud-storage" %}}

### Google Cloud storage

{{% site-region region="gov" %}}
<div class="alert alert-danger">Reference Tables are not available for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}})</div>
{{% /site-region %}}

1. If you have not set up a Google Cloud integration with Datadog or you are using legacy Google project ID files (legacy projects are indicated in your GCP integration tile), follow the instructions for setting up the [Google Cloud Platform integration][1]. This involves creating a [Google Cloud service account][2].

1. From the Google Cloud console, navigate to the **Cloud Storage** page.

1. Find the bucket you'd like to grant access to and click on it.

1. Click on the **Permissions** tab. Under "View By Principals", click the **Grant Access** button.

1. In the window that appears, under the "New principals" field, enter the service account email that you created and added to the GCP tile in Step 1. Under "Assign roles", select the **Storage Object Viewer** role. Click **Save**.

{{< img src="reference_tables/grant_access.png" alt="Google Cloud console showing the configuration to grant access" style="width:100%;" >}}

After reviewing and assigning the role, you can import into Reference Tables from Google Cloud. It may take a few minutes for your configuration to update in Datadog.

{{< img src="reference_tables/gcp_upload_import_ui.png" alt="Select GCP Storage in Upload or import data when creating a new reference table" style="width:100%;" >}}

**Note**: The upload from cloud object storage supports files up to 200MB.

[1]: /integrations/google_cloud_platform/#setup
[2]: /integrations/google_cloud_platform/#1-create-your-google-cloud-service-account

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Integrations" %}}

{{< partial name="reference_tables/ref-tables-saas-integrations.html" >}}

{{% /tab %}}
{{< /tabs >}}

This Reference Table can be used to add additional attributes to logs with the [Lookup Processor][1].

## Validation rules

Reference Table names and column headers are validated using the following naming conventions and automatically updated or normalized, if necessary.

| Rule     | Normalization |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Names and headers cannot be duplicated.											| Duplicated names are enumerated. For example, if `fileid` is used twice as a name, the first instance becomes `fileid1` and the second instance becomes `fileid2`. If a name or header is enumerated and it exceeds the 56 characters, it is rejected and needs to be renamed. |
| Names and headers cannot contain uppercase letters. 								| Names with uppercase letters are converted to lowercase. This conversion may result in duplicate names, which are then enumerated. For example, `Fileid` and `FileID` both become `fileid` and are enumerated to `fileid1` and `fileid2` respectively. |
| Names and headers cannot contain spaces. 											| Spaces other than leading and trailing spaces are replaced with underscore `_` characters. Leading and trailing spaces are removed. For example, `customer names` is replaced with `customer_names`. |
| Names and headers must start with a lowercase letter. 							| Uppercase characters are converted to lowercase. Non-letter leading characters are removed. For example, `23Two_three` becomes `two_three`.	|
| Names and headers support only lowercase letters, numbers, and the `_` character. | Unsupported characters are replaced with the underscore `_` character, unless it breaks one of the rules above. In that case, the unsupported characters are normalized by the respective rule.				|
| Names and headers must be 56 characters or less. 									| No normalization is done. Names and headers that have more than 56 characters are rejected and need to be renamed. |

## Modify a Reference Table

To modify an existing Reference Table with new data, select a table and click **Update Config** on the top right corner.
The selected CSV is upserted into the table, meaning that:

* All existing rows with the same primary key are updated
* All new rows are added
* All old rows that are not in the new file are deleted

Once the table is saved, the upserted rows are processed asynchronously and updated in the preview. It may take up to 10 minutes for the update to complete.

## Export a Reference Table

To export a Reference Table, select a table and click **Query in DDSQL Editor**. From there, you can use the [DDSQL Editor][7] to export to CSV, Dashboard, and more.

{{< img src="reference_tables/query_ddsql_editor.png" alt="Table preview with a blue button labeled Query in DDSQL Editor positioned above the results" style="width:100%;" >}}

## Delete a Reference Table

To delete a Reference Table, select a table, click the gear icon in the top right corner, and then click **Delete Table**.
The table and all associated rows is deleted.

If there is a Lookup Processor using a Reference Table for Log enrichment, then the enrichment stops. It may take up to 10 minutes for the enrichment to stop.

## Monitor Reference Table Activity

You can monitor reference table activity with [Audit Trail][2] or [Change Events][3]. To view the audit trail and change events for a specific reference table, select the table and click the Settings icon next to **Update Config**. You need org management permissions to view the audit trail.

### Audit Trail

Use the audit trail for reference tables to track user-triggered actions. Audit trail events are sent when a user initially uploads or imports a CSV file, or when a user creates, modifies, or deletes a reference table.

The `reference_table_file` Asset Type displays import/upload events and the `reference_table` Asset Type displays reference table events. The audit trail provides observability into the content of a reference table.

### Change Events

Use change events for reference tables to track automated or user-triggered actions. They are sent when a cloud file is imported from a user or automatic refresh. (Uploading a local file does not generate a change event.) While events can track user-triggered actions, they are mainly used to track triggered imports when a reference table automatically pulls a new CSV file.

Events contain information about the success status, path, and table name of the import. If an error occurs, information about the error type is provided.

### Alerting

To be alerted on errors encountered during imports, use [Event Monitors][4] for reference table change events. Reference table change events are sent from the `reference_tables` source.

You can create monitors from the **Monitors** tab, or click on the Settings icon next to **New Reference Table +** to generate a pre-filled monitor.

## Reference Table limits
- A reference table can have up to 50 columns
- The size of a reference table file uploaded through the UI can be up to 4 MB
- The size of a reference table file uploaded through a cloud bucket file can be up to 200 MB
- The size of a reference table file uploaded through an integration can be up to 200 MB
- You can have up to 100 reference tables per organization

Reach out to [support][5] if you have a use case that exceeds these limits.

## Automatic update frequency

Reference Tables can be updated automatically, depending on the data source:

- **Cloud file storage** (Amazon S3, Azure Storage, Google Cloud Storage): Every 5 minutes
- **Integrations**: Every hour
- **CSV manual uploads**: Automatic updates are not supported

## Permissions

### Role based access
To view Reference Tables, users require the `reference_tables_read` permission. To create or modify Reference Tables, users require the `reference_tables_write` permission.

For more information on permissions, see the [RBAC documentation][6].

### Granular access controls
Restrict access to individual tables by specifying a list of teams, roles, or users that are allowed to view or edit them.

{{< img src="reference_tables/granular_access_permissions.png" alt="The Permissions cog option that supports setting granular access permissions on a table" style="width:100%;">}}

1. Click on a table to open its detail page.
2. Click the cog icon in the upper-right corner.
3. Select **Permissions** from the menu.
4. Click **Restrict Access**.
5. Use the dropdown to select one or more teams, roles, or users.
6. Click **Add**.
7. Select either **Editor** or **Viewer**.
8. Click **Save** to apply changes.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/processors/#lookup-processor
[2]: /account_management/audit_trail/
[3]: /events/
[4]: /monitors/types/event/
[5]: /help/
[6]: /account_management/rbac/permissions/#reference-tables
[7]: /ddsql_editor/#save-and-share-queries
