---
title: Add Custom Metadata to Logs with Reference Tables
kind: guide
beta: true
aliases:
  - /logs/guide/enrichment-tables/
further_reading:
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Discover how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
---

<div class="alert alert-warning">
The Reference Tables feature is currently in public beta. There are no billing implications for defining and querying Reference Tables. For more information, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.
During the beta, there is a limit of 100 Reference Tables per account.
</div>

## Overview

Define new entities in Datadog like customer details, service names and information, or IP addresses by uploading a CSV file containing a table of information. This is represented by a primary key in an Reference Table and the associated metadata. This data can be applied as tags to logs at ingest time in the [Lookup Processor][1].

{{< img src="logs/guide/enrichment-tables/overview.png" alt="Reference Tables" style="width:100%;">}}

## Create a Reference Table

{{< tabs >}}
{{% tab "Manual upload" %}}

Click **New Reference Table +**, then upload a CSV file, name the appropriate columns, and define the primary key for lookups.

{{< img src="logs/guide/enrichment-tables/configure-enrichment-table.png" alt="Create an Reference Table" style="width:100%;">}}

**Note**: The manual CSV upload method supports files up to 4MB.

{{% /tab %}}

{{% tab "AWS S3 upload" %}}

Reference Tables can automatically pull a CSV file from an AWS S3 bucket to keep your data up to date. The integration looks for changes to the CSV file in S3, and when the file is updated it replaces the Reference Table with the new data. This also enables API updating with the S3 API once the initial Reference Table is configured.

To update Reference Tables from S3, Datadog uses the IAM role in your AWS account that you configured for the [AWS integration][1]. If you have not yet created that role, [follow these steps][2] to do so. To allow that role to update your Reference Tables, add the following permission statement to its IAM policies. Be sure to edit the bucket names to match your environment.


```json
{
	"Statement": [
		{
			"Sid": "EnrichmentTablesS3",
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
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
### Define the table

Click **New Reference Table +**, then add a name, select AWS S3, fill out all fields, click import, and define the primary key for lookups.

{{< img src="logs/guide/enrichment-tables/configure-s3-reference-table.png" alt="Create an Reference Table" style="width:100%;">}}

**Note**: The upload from an S3 bucket method supports files up to 200MB.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#installation
{{% /tab %}}
{{< /tabs >}}

This Reference Table can be used to add additional attributes to logs with the [Lookup Processor][1].

## Modify a Reference Table

To modify an existing Reference Table with new data, select a table then click **Update Config** in the top right corner.
The selected CSV is upserted into the table, meaning that:

* All existing rows with the same primary key are updated
* All new rows are added
* All old rows that are not in the new file are deleted
 
Once the table is saved, the upserted rows are processed asynchronously and updated in the preview. It may take up to 10 minutes for the update to complete. 

## Delete a Reference Table

To delete a Reference Table, select a table, click the gear icon in the top right corner, and then click **Delete Table**.
The table and all associated rows is deleted.

If there is a Lookup Processor using a Reference Table for Log enrichment, then the enrichment stops. It may take up to 10 minutes for the enrichment to stop.

## Monitoring Reference Table Activity

Reference table activity can be monitored with [Audit Trail][2] or [Change Events][3]. To view the audit trail and change events for a specific reference table, select a table and click the cog dropdown in the top right next to **Update Config** (you will need org management permissions to view audit trail).

### Audit Trail

Audit trail for reference tables is used for tracking user triggered actions. Audit trail events are sent when a user initially uploads or imports a csv file, or creates, modifies, or deletes a reference table. The `reference_table_file` Asset Type will show import/upload events, and the `reference_table` Asset Type will show reference table events. The purpose of the audit trail is to provide observability into the content of a reference table.

### Change Events

Change events for reference tables are used for tracking either automated or user triggered actions. They are sent when a cloud file is imported either from a user or automatic refresh. While events track user triggered actions as well, they are mainly used for tracking imports triggered when Reference Tables automatically pull a new csv file. Events contain information for the success status, path, and table name of the import. If an error is encountered, information on the type of error is also provided.

### Alerting

To be alerted on errors encountered during imports, reference table change events can be tracked with [Event Monitors][4]. Reference table change events are sent from the `reference_tables` source. Monitors can be created from the Monitors tab, but a pre-filled monitor can be created by clicking on the cog dropdown in the top right next to **New Reference Table +**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/processors/#lookup-processor
[2]: /account_management/audit_trail/
[3]: /events/
[4]: /monitors/create/types/event/
